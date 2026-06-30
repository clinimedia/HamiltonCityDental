import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LastUpdated } from "@/components/LastUpdated";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

const UPDATED = "2026-06-30";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: `The terms governing your use of the ${SITE.name} website in ${SITE.city}, ${SITE.provinceCode}, including appointment requests and the limits of online information.`,
  path: "/terms-of-service",
});

export default function TermsOfServicePage() {
  return (
    <Section>
      <Breadcrumbs items={[{ name: "Terms of Service", href: "/terms-of-service" }]} />
      <div className="mt-6 max-w-3xl">
        <h1 className="text-3xl font-semibold sm:text-4xl">Terms of Service</h1>
        <LastUpdated date={UPDATED} className="mt-3 text-sm text-brand-ink/60" />

        <div className="mt-8 space-y-6 text-brand-ink/80">
          <p>
            These Terms of Service govern your use of the {SITE.name} website. By using this site, you agree to these
            terms. If you do not agree, please discontinue use of the site.
          </p>

          <div>
            <h2 className="text-xl font-semibold text-brand-ink">No medical advice</h2>
            <p className="mt-2">
              The information on this website is provided for general educational purposes only and is not a substitute
              for professional dental or medical advice, diagnosis or treatment. Always consult a qualified dentist
              regarding any questions about your oral health. If you are experiencing a medical emergency, call 911.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-brand-ink">Appointment requests</h2>
            <p className="mt-2">
              Submitting the Request Appointment form is a request only and does not confirm a booking. A member of our
              team will contact you to confirm availability. Appointment times are not guaranteed until confirmed by our
              office.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-brand-ink">Intellectual property</h2>
            <p className="mt-2">
              All content on this site, including text, images and logos, is the property of {SITE.name} or its
              licensors and may not be reproduced without permission.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-brand-ink">Limitation of liability</h2>
            <p className="mt-2">
              {SITE.name} is not liable for any damages arising from your use of, or inability to use, this website or
              any information it contains.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-brand-ink">Contact</h2>
            <p className="mt-2">
              Questions about these terms? Email{" "}
              <a href={`mailto:${SITE.email}`} className="font-medium text-brand-ink underline">{SITE.email}</a> or call{" "}
              <a href={`tel:${SITE.phoneE164}`} className="font-medium text-brand-ink underline">{SITE.phone}</a>.
            </p>
          </div>

          <p className="text-sm text-brand-ink/60">
            This page is a starting template and should be reviewed by the practice before launch.
          </p>
        </div>
      </div>
    </Section>
  );
}
