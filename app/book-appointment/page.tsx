import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RequestAppointmentForm } from "@/components/RequestAppointmentForm";
import { Faq, type FaqItem } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { PhoneIcon, CheckIcon } from "@/components/Icons";
import { buildMetadata } from "@/lib/seo";
import { pageSchema } from "@/lib/schema";
import { SITE, formattedHours } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: `Book a Dental Appointment`,
  description: `Book a dental appointment in ${SITE.city}, ${SITE.provinceCode} at ${SITE.name}. Request online or call ${SITE.phone}. Same-day emergencies, CDCP & direct billing. New patients welcome.`,
  path: "/book-appointment",
});

const reassurance = [
  "Same-day emergency appointments when you need them",
  "Now accepting new patients of all ages",
  "CDCP accepted & direct billing to most insurers",
  "No third-party booking — your request reaches us directly",
];

const faqs: FaqItem[] = [
  {
    q: "How does booking work?",
    a: `Fill out the form on this page and our team will contact you to confirm a time. Prefer to talk? Call ${SITE.phone}.`,
  },
  {
    q: "Can I book a same-day emergency visit?",
    a: "For urgent dental problems, please call us as early in the day as possible rather than using the form, so we can fit you in quickly.",
  },
  {
    q: "Is my information kept private?",
    a: "Yes. Your request is emailed directly to our office and is only used to contact you about your appointment.",
  },
];

export default function BookAppointmentPage() {
  return (
    <>
      <div className="border-b border-brand-ink/10 bg-brand-inverse/40">
        <Container className="py-4">
          <Breadcrumbs items={[{ name: "Book Appointment", href: "/book-appointment" }]} />
        </Container>
      </div>

      <Section aria-labelledby="book-h1">
        <div className="max-w-3xl">
          <h1 id="book-h1" className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
            Book a Dental Appointment in {SITE.city}
          </h1>
          <p className="mt-4 text-lg text-brand-ink/75">
            Request your visit below and our team will be in touch to confirm. It only takes a minute.
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          {/* Primary: the form */}
          <RequestAppointmentForm heading="Request an Appointment in Hamilton" />

          {/* Secondary: call + hours + reassurance */}
          <div className="flex flex-col gap-6">
            <a
              href={`tel:${SITE.phoneE164}`}
              className="flex items-center justify-center gap-3 rounded-2xl bg-brand px-6 py-6 text-center text-xl font-semibold text-brand-ink hover:bg-brand-hover"
            >
              <PhoneIcon width={24} height={24} /> {SITE.phone}
            </a>

            <div className="rounded-2xl border border-brand-ink/10 bg-white p-6">
              <h2 className="font-semibold">Office hours</h2>
              <dl className="mt-3 space-y-1.5 text-sm">
                {formattedHours().map((h) => (
                  <div key={h.label} className="flex justify-between gap-4 border-b border-brand-ink/10 pb-1.5 last:border-0">
                    <dt className="text-brand-ink/70">{h.label}</dt>
                    <dd className={h.value === "Closed" ? "text-brand-ink/40" : "font-medium"}>{h.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <ul className="space-y-2">
              {reassurance.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm text-brand-ink/80">
                  <CheckIcon width={18} height={18} className="mt-0.5 shrink-0 text-brand-hover" /> {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Faq items={faqs} heading="Booking FAQs" variant="tint" />

      <JsonLd
        data={pageSchema("WebPage", {
          name: `Book a Dental Appointment in ${SITE.city}`,
          description: `Book a dental appointment at ${SITE.name} in ${SITE.city}.`,
          path: "/book-appointment",
        })}
      />
    </>
  );
}
