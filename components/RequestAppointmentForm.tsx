"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { SITE } from "@/lib/site";
import { servicesByOrder } from "@/lib/services";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Request Appointment form. Posts JSON to /api/appointment (Nodemailer → SMTP).
 * Reused under the hero on Home and on /book-appointment, /contact-us,
 * /new-patient. Includes a hidden honeypot ("company") and accessible,
 * inline validation feedback.
 */
export function RequestAppointmentForm({ heading = "Request an Appointment", className }: { heading?: string; className?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");
    setFieldErrors([]);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      newPatient: data.get("patientType") === "new",
      service: data.get("service"),
      preferredTime: data.get("preferredDate"),
      message: data.get("comments"),
      company: data.get("company"), // honeypot
    };

    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok && json.ok) {
        setStatus("success");
        setMessage("Thank you! Your request has been sent. We'll be in touch shortly to confirm your appointment.");
        form.reset();
        return;
      }
      setStatus("error");
      setFieldErrors(Array.isArray(json.fields) ? json.fields : []);
      setMessage(json.error || `Something went wrong. Please call us at ${SITE.phone}.`);
    } catch {
      setStatus("error");
      setMessage(`We couldn't reach the server. Please call us at ${SITE.phone}.`);
    }
  }

  const invalid = (name: string) => fieldErrors.includes(name);

  return (
    <div className={cn("rounded-2xl border border-brand-ink/10 bg-white p-6 shadow-sm sm:p-8", className)}>
      <h2 className="text-2xl font-semibold">{heading}</h2>
      <p className="mt-1 text-sm text-brand-ink/70">
        Prefer to talk? Call{" "}
        <a href={`tel:${SITE.phoneE164}`} className="font-medium text-brand-ink underline">
          {SITE.phone}
        </a>
        .
      </p>

      {status === "success" ? (
        <div role="status" className="mt-6 rounded-xl bg-brand/15 p-5 text-brand-ink">
          {message}
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="mt-6 grid gap-4 sm:grid-cols-2">
          {/* Honeypot — visually hidden, ignored by humans, filled by bots. */}
          <div className="hidden" aria-hidden>
            <label htmlFor="company">Company</label>
            <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <Field label="Full name" name="name" autoComplete="name" required invalid={invalid("name")} />
          <Field label="Email" name="email" type="email" autoComplete="email" required invalid={invalid("email")} />
          <Field label="Phone" name="phone" type="tel" autoComplete="tel" required invalid={invalid("phone")} />

          <div className="flex flex-col gap-1.5">
            <label htmlFor="patientType" className="text-sm font-medium">Patient type</label>
            <select id="patientType" name="patientType" defaultValue="new" className={selectCls}>
              <option value="new">New patient</option>
              <option value="existing">Existing patient</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="service" className="text-sm font-medium">Service (optional)</label>
            <select id="service" name="service" defaultValue="" className={selectCls}>
              <option value="">Not sure / general checkup</option>
              {servicesByOrder.map((s) => (
                <option key={s.slug} value={s.name}>{s.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="preferredDate" className="text-sm font-medium">Preferred date</label>
            <input id="preferredDate" name="preferredDate" type="date" className={inputCls} />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor="comments" className="text-sm font-medium">Comments (optional)</label>
            <textarea id="comments" name="comments" rows={4} className={inputCls} placeholder="Tell us how we can help…" />
          </div>

          {status === "error" && message && (
            <p role="alert" className="sm:col-span-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {message}
            </p>
          )}

          <div className="sm:col-span-2">
            <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
              {status === "submitting" ? "Sending…" : "Request Appointment"}
            </Button>
            <p className="mt-3 text-xs text-brand-ink/60">
              By submitting, you agree to be contacted about your appointment request. We never share your information.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}

const inputCls =
  "rounded-lg border border-brand-ink/20 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-hover focus:ring-2 focus:ring-brand/40";
const selectCls = inputCls;

function Field({
  label,
  name,
  type = "text",
  required,
  invalid,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  invalid?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium">
        {label} {required && <span className="text-red-600" aria-hidden>*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-required={required}
        aria-invalid={invalid || undefined}
        className={cn(inputCls, invalid && "border-red-500 ring-2 ring-red-200")}
      />
    </div>
  );
}
