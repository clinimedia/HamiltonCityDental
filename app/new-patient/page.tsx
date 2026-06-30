import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { RequestAppointmentForm } from "@/components/RequestAppointmentForm";
import { Faq, type FaqItem } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { CheckIcon } from "@/components/Icons";
import { images } from "@/lib/images";
import { buildMetadata } from "@/lib/seo";
import { pageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: `New Patients Welcome`,
  description: `New patients welcome at ${SITE.name} in ${SITE.city}, ${SITE.provinceCode}. Learn what to expect at your first visit, what to bring, and our insurance, CDCP & direct-billing options.`,
  path: "/new-patient",
});

const steps = [
  { title: "Request your appointment", body: "Fill out the form below or call us. We'll confirm a time that works for you — no third-party booking system to wrestle with." },
  { title: "Complete your paperwork", body: "We'll gather your health history and insurance details so your first visit runs smoothly." },
  { title: "Meet your dentist", body: "Your dentist will get to know you, listen to your concerns and complete a thorough exam — usually with cleaning if time allows." },
  { title: "Build your plan together", body: "We'll explain what we find, walk through your options and costs, and agree on the most conservative plan for your smile." },
];

const bring = [
  "Your provincial health card",
  "Insurance details (policy / group numbers)",
  "CDCP information, if you're enrolled",
  "A list of any medications you take",
  "Any recent dental X-rays or records, if available",
];

const faqs: FaqItem[] = [
  {
    q: `Is ${SITE.name} accepting new patients?`,
    a: `Yes — we welcome new patients of all ages from ${SITE.city} and the surrounding area. Request an appointment below or call ${SITE.phone}.`,
  },
  {
    q: "How long is the first appointment?",
    a: "Plan for about an hour. This gives us time for a full exam, any necessary X-rays, and a cleaning when scheduling allows.",
  },
  {
    q: "Do you take the CDCP and insurance?",
    a: "Yes. We accept the Canadian Dental Care Plan (CDCP) and direct-bill most private insurers. We can't help with CDCP applications, but we'll happily bill the plan once you're approved.",
  },
];

const links = [
  { label: "Our dental services", href: "/services" },
  { label: "Frequently asked questions", href: "/faq" },
  { label: "About our clinic", href: "/about-us" },
  { label: "Book an appointment", href: "/book-appointment" },
];

export default function NewPatientPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "New Patient", href: "/new-patient" }]}
        image={images.newPatient}
        title={<>New Patients Welcome at {SITE.name} in {SITE.city}</>}
        intro={`We're delighted you're considering our downtown ${SITE.city} practice. Here's exactly what to expect at your first visit — and how to get started.`}
      />

      {/* First-visit steps */}
      <Section aria-labelledby="steps-heading">
        <h2 id="steps-heading" className="text-2xl font-semibold sm:text-3xl">
          Your first visit, step by step
        </h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2">
          {steps.map((s, i) => (
            <li key={s.title} className="flex gap-4 rounded-2xl border border-brand-ink/10 bg-white p-6">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-brand-ink">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-brand-ink/75">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* What to bring + Insurance */}
      <Section variant="tint" aria-labelledby="bring-heading">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 id="bring-heading" className="text-2xl font-semibold sm:text-3xl">
              What to bring
            </h2>
            <ul className="mt-6 space-y-2">
              {bring.map((b) => (
                <li key={b} className="flex items-start gap-2 text-brand-ink/80">
                  <CheckIcon width={18} height={18} className="mt-1 shrink-0 text-brand-hover" /> {b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">Insurance, CDCP &amp; financing</h2>
            <p className="mt-4 text-brand-ink/80">
              We want great dental care to be affordable. {SITE.name} accepts the Canadian Dental Care Plan (CDCP) and
              direct-bills most private insurance plans, so there's less paperwork and fewer surprises. We'll always
              review a clear estimate with you before treatment, and we're happy to discuss payment options for larger
              treatment plans.
            </p>
          </div>
        </div>
      </Section>

      {/* Form */}
      <Section id="request" aria-labelledby="form-heading">
        <div className="mb-8 max-w-2xl">
          <h2 id="form-heading" className="text-2xl font-semibold sm:text-3xl">
            Request your first appointment
          </h2>
          <p className="mt-3 text-brand-ink/70">
            Send us your details and our team will reach out to confirm your visit.
          </p>
        </div>
        <RequestAppointmentForm heading="Request an Appointment" />
      </Section>

      {/* Helpful links */}
      <Section variant="tint" aria-labelledby="np-links-heading">
        <h2 id="np-links-heading" className="text-2xl font-semibold sm:text-3xl">
          Learn more before your visit
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="block rounded-xl border border-brand-ink/10 bg-white p-4 font-medium hover:shadow-md">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Faq items={faqs} heading="New patient FAQs" />

      <JsonLd
        data={pageSchema("WebPage", {
          name: `New Patients Welcome at ${SITE.name}`,
          description: `New patient information for ${SITE.name} in ${SITE.city}.`,
          path: "/new-patient",
        })}
      />
    </>
  );
}
