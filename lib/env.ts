/**
 * SMTP environment access for the Request Appointment form.
 *
 * Values are read ONLY from process.env — never hard-coded. `getSmtpEnv()`
 * asserts the four required vars exist and is called at REQUEST time (inside
 * the API route), not at module load, so a missing var produces a clean 500
 * at runtime instead of breaking the build/deploy.
 */

export type SmtpEnv = {
  host: string;
  port: number;
  user: string;
  pass: string;
  secure: boolean;
  /** From address for outgoing mail. */
  from: string;
  /** Destination inbox for appointment requests. */
  to: string;
};

const REQUIRED = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"] as const;

export function getSmtpEnv(): SmtpEnv {
  const missing = REQUIRED.filter((k) => !process.env[k] || process.env[k]!.trim() === "");
  if (missing.length > 0) {
    throw new Error(
      `Missing required SMTP environment variable(s): ${missing.join(", ")}. ` +
        `Set them in Vercel → Settings → Environment Variables (all environments).`
    );
  }

  const port = Number(process.env.SMTP_PORT);
  if (!Number.isFinite(port) || port <= 0) {
    throw new Error(`SMTP_PORT must be a valid port number (got "${process.env.SMTP_PORT}").`);
  }

  const user = process.env.SMTP_USER!;
  return {
    host: process.env.SMTP_HOST!,
    port,
    user,
    pass: process.env.SMTP_PASS!,
    secure: port === 465, // 465 = implicit SSL; 587 uses STARTTLS.
    from: process.env.SMTP_FROM?.trim() || `Hamilton City Dental Website <${user}>`,
    to: process.env.CONTACT_TO?.trim() || "info@hamiltoncitydental.ca",
  };
}
