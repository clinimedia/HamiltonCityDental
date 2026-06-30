import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LastUpdated } from "@/components/LastUpdated";
import { buildMetadata } from "@/lib/seo";
import { SITE, formattedAddress } from "@/lib/site";

const UPDATED = "2026-06-30";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${SITE.name} in ${SITE.city}, ${SITE.provinceCode} collects, uses and protects your personal and health information when you use our website or book an appointment.`,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <Section>
      <Breadcrumbs items={[{ name: "Privacy Policy", href: "/privacy-policy" }]} />
      <div className="mt-6 max-w-3xl">
        <h1 className="text-3xl font-semibold sm:text-4xl">Privacy Policy</h1>
        <LastUpdated date={UPDATED} className="mt-3 text-sm text-brand-ink/60" />

        <div className="prose-style mt-8 space-y-6 text-brand-ink/80">
          <p>
            This Privacy Policy explains how {SITE.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses and
            safeguards the information you provide through our website and when you contact our {SITE.city} dental
            office. We are committed to protecting your privacy in accordance with applicable Ontario and Canadian
            privacy legislation, including PIPEDA and PHIPA.
          </p>

          <div>
            <h2 className="text-xl font-semibold text-brand-ink">Information we collect</h2>
            <p className="mt-2">
              When you submit our Request Appointment form we collect your name, email address, phone number, whether
              you are a new or existing patient, your preferred date and any comments you choose to share. We use this
              information solely to respond to and schedule your appointment.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-brand-ink">How we use your information</h2>
            <p className="mt-2">
              We use the information you provide to contact you about your request, confirm appointments, and provide
              dental care and related services. We do not sell or rent your personal information to third parties.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-brand-ink">How your information is stored</h2>
            <p className="mt-2">
              Appointment requests are delivered securely by email to our office. Clinical records are maintained in
              accordance with regulatory requirements for dental practices in Ontario.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-brand-ink">Your choices</h2>
            <p className="mt-2">
              You may request access to, correction of, or deletion of the personal information we hold about you. To
              make a request or ask a question about this policy, contact us at{" "}
              <a href={`mailto:${SITE.email}`} className="font-medium text-brand-ink underline">{SITE.email}</a> or{" "}
              <a href={`tel:${SITE.phoneE164}`} className="font-medium text-brand-ink underline">{SITE.phone}</a>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-brand-ink">Contact us</h2>
            <p className="mt-2">
              {SITE.name}<br />
              {formattedAddress}<br />
              {SITE.phone} · {SITE.email}
            </p>
          </div>

          <p className="text-sm text-brand-ink/60">
            This page is a starting template and should be reviewed by the practice (and, where appropriate, legal
            counsel) before launch.
          </p>
        </div>
      </div>
    </Section>
  );
}
