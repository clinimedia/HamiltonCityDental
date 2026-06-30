import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { PhoneIcon } from "@/components/Icons";
import { SITE } from "@/lib/site";

/** Reusable "book / call" CTA band placed before the FAQ on most pages. */
export function CtaBand({
  heading = "Ready to book your visit?",
  body,
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <Section variant="ink" aria-labelledby="cta-heading">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="max-w-xl">
          <h2 id="cta-heading" className="text-2xl font-semibold sm:text-3xl">
            {heading}
          </h2>
          <p className="mt-2 text-brand-inverse/80">
            {body ??
              `Now accepting new patients in ${SITE.city}. CDCP & direct billing welcome — request an appointment online or give us a call.`}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href="/book-appointment" size="lg">
            Book Appointment
          </Button>
          <Button href={`tel:${SITE.phoneE164}`} variant="outline-light" size="lg">
            <PhoneIcon width={18} height={18} /> {SITE.phone}
          </Button>
        </div>
      </div>
    </Section>
  );
}
