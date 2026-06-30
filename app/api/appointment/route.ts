import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getSmtpEnv } from "@/lib/env";
import { rateLimit } from "@/lib/rate-limit";
import { SITE } from "@/lib/site";

// Always run on the Node.js runtime (Nodemailer needs Node APIs) and never cache.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Trim, collapse whitespace, strip control chars, and cap length. */
function clean(value: unknown, max = 2_000): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\x00-\x1F\x7F]/g, " ") // strip control chars (incl. header-injection newlines)
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Escape for safe inclusion in the HTML email body. */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: NextRequest) {
  // 1) Rate limit per IP (5 requests / minute).
  const ip = clientIp(req);
  const limit = rateLimit(`appointment:${ip}`, 5, 60_000);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a minute." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  // 2) Parse body.
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // 3) Honeypot — bots fill hidden fields. Pretend success, send nothing.
  if (clean(body.company)) {
    return NextResponse.json({ ok: true });
  }

  // 4) Validate + sanitise.
  const name = clean(body.name, 120);
  const email = clean(body.email, 200).toLowerCase();
  const phone = clean(body.phone, 40);
  const service = clean(body.service, 120);
  const preferredTime = clean(body.preferredTime, 200);
  const message = clean(body.message, 4_000);
  const newPatient = body.newPatient === true || body.newPatient === "yes";

  const errors: string[] = [];
  if (name.length < 2) errors.push("name");
  if (!EMAIL_RE.test(email)) errors.push("email");
  if (phone.replace(/\D/g, "").length < 7) errors.push("phone");
  if (errors.length > 0) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fields: errors },
      { status: 422 }
    );
  }

  // 5) Send via SMTP. Env asserted here (request time), not at build.
  let env;
  try {
    env = getSmtpEnv();
  } catch (err) {
    console.error("[appointment] SMTP env not configured:", (err as Error).message);
    return NextResponse.json(
      { ok: false, error: "The form is temporarily unavailable. Please call us at " + SITE.phone + "." },
      { status: 503 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: env.host,
    port: env.port,
    secure: env.secure, // true for 465 (SSL), false for 587 (STARTTLS)
    auth: { user: env.user, pass: env.pass },
  });

  const subject = `New appointment request — ${name}`;
  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ["Patient", newPatient ? "New patient" : "Existing / not specified"],
    ["Service", service || "Not specified"],
    ["Preferred date", preferredTime || "Not specified"],
    ["Message", message || "—"],
  ];
  const html = `
    <h2 style="font-family:Arial,sans-serif">New appointment request</h2>
    <table style="font-family:Arial,sans-serif;border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;vertical-align:top">${esc(
              k
            )}</td><td style="padding:4px 0">${esc(v)}</td></tr>`
        )
        .join("")}
    </table>
    <p style="font-family:Arial,sans-serif;color:#666;font-size:12px">Sent from the ${esc(
      SITE.name
    )} website appointment form.</p>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  try {
    await transporter.sendMail({
      from: env.from,
      to: env.to,
      replyTo: `${name} <${email}>`,
      subject,
      text,
      html,
    });
  } catch (err) {
    console.error("[appointment] sendMail failed:", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't send your request. Please call us at " + SITE.phone + "." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
