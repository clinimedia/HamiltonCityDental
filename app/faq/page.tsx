import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { Faq, type FaqItem } from "@/components/Faq";
import { images } from "@/lib/images";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { faqSchema } from "@/lib/schema";
import { SITE, formattedAddress, formattedHours } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: `Frequently Asked Questions`,
  description: `Answers to common questions about ${SITE.name} in ${SITE.city}, ${SITE.provinceCode} — new patients, same-day emergencies, insurance & CDCP, services, hours and location.`,
  path: "/faq",
});

const hoursText = formattedHours()
  .map((h) => `${h.label} ${h.value}`)
  .join("; ");

const groups: { id: string; heading: string; items: FaqItem[] }[] = [
  {
    id: "new-patients",
    heading: "New Patients",
    items: [
      {
        q: `Are you accepting new patients in ${SITE.city}?`,
        a: `Yes — ${SITE.name} is accepting new patients of all ages in ${SITE.city} and the surrounding area. You can request an appointment online or call ${SITE.phone}.`,
      },
      {
        q: "What should I bring to my first visit?",
        a: "Please bring your health card, your insurance details (and CDCP information if applicable), and a list of any medications you take. See our New Patient page for the full first-visit checklist.",
      },
      {
        q: "Do you see children?",
        a: "Yes, we welcome the whole family, from a child's first visit through to senior care.",
      },
      {
        q: `How do I find a dentist accepting new patients near me in ${SITE.city}?`,
        a: `${SITE.name} in downtown ${SITE.city} is currently accepting new patients. The easiest way to get started is to request an appointment online or call ${SITE.phone}, and our team will help you book your first visit.`,
      },
    ],
  },
  {
    id: "appointments-emergencies",
    heading: "Appointments & Emergencies",
    items: [
      {
        q: "Do you offer same-day emergency appointments?",
        a: "Yes. We reserve time for dental emergencies and offer same-day relief for problems like toothaches, broken teeth and lost fillings whenever possible. Call us as early in the day as you can.",
      },
      {
        q: "How do I book an appointment?",
        a: `Use the Request Appointment form on our Book Appointment page, or call ${SITE.phone}. We don't use a third-party booking system — your request comes straight to our team.`,
      },
      {
        q: "What are your office hours?",
        a: `Our hours are: ${hoursText}.`,
      },
    ],
  },
  {
    id: "insurance-cdcp",
    heading: "Insurance & CDCP",
    items: [
      {
        q: "Do you accept the Canadian Dental Care Plan (CDCP)?",
        a: "Yes, we accept the CDCP. Please note we're unable to assist with CDCP applications, but we're happy to bill the plan once you're approved.",
      },
      {
        q: "Do you direct-bill insurance?",
        a: "Yes, we direct-bill most private insurance plans so you pay less out of pocket. We'll review a clear estimate with you before treatment begins.",
      },
      {
        q: "Is cosmetic treatment covered?",
        a: "Cosmetic treatments such as whitening and veneers are usually not covered by insurance or the CDCP. We'll always be upfront about costs.",
      },
    ],
  },
  {
    id: "services",
    heading: "Services",
    items: [
      {
        q: "What dental services do you offer?",
        a: "We offer family, children's, emergency and cosmetic dentistry, dental hygiene, crowns and bridges, root canals, dental implants, Invisalign, teeth whitening and wisdom teeth removal. See our Services page for details.",
      },
      {
        q: "Do you place dental implants in-house?",
        a: "Yes — Dr. Fadi Bahnam places and restores dental implants right here in our Hamilton office.",
      },
    ],
  },
  {
    id: "costs-payment",
    heading: "Costs & Payment",
    items: [
      {
        q: "How much does a dental checkup cost in Hamilton?",
        a: "The cost of a checkup depends on what's needed (exam, cleaning, X-rays). We follow the Ontario Dental Association fee guide and will always review a clear estimate with you before treatment. If you have insurance or the CDCP, we'll factor that in.",
      },
      {
        q: "Do you offer payment options for larger treatments?",
        a: "Yes — for larger treatment plans such as implants or full smile makeovers, we're happy to discuss options to help spread out the cost. Just ask our coordinator.",
      },
      {
        q: "Is the first exam or consultation free?",
        a: `Some consultations (for example, an Invisalign or implant consult) may be complimentary. Call ${SITE.phone} and we'll let you know what to expect for your specific situation.`,
      },
    ],
  },
  {
    id: "visiting",
    heading: "Visiting Us",
    items: [
      {
        q: `Where is ${SITE.name} located?`,
        a: `We're at ${formattedAddress}, in the ${SITE.neighbourhood} neighbourhood of downtown ${SITE.city}.`,
      },
      {
        q: "Is there parking, and are you accessible?",
        a: "There's street parking nearby, and we're easy to reach from across Hamilton. If you have specific accessibility needs, let us know when you book and we'll do our best to accommodate you.",
      },
      {
        q: "Do you treat nervous or anxious patients?",
        a: "Yes. We focus on gentle, pain-free, conservative care and take time to keep you comfortable. For certain procedures, sedation options are available — just let us know about any dental anxiety.",
      },
    ],
  },
  {
    id: "service-areas",
    heading: "Service Areas",
    items: [
      {
        q: `Do you serve patients outside of ${SITE.city}?`,
        a: `Yes. While we're based in downtown ${SITE.city}, we proudly welcome patients from across the region — including ${SITE.nearbyAreas.join(", ")} and surrounding communities.`,
      },
      {
        q: `Are you a good dentist for ${SITE.nearbyAreas[0]} and ${SITE.nearbyAreas[1]} families?`,
        a: `Absolutely. Many of our patients travel from ${SITE.nearbyAreas[0]}, ${SITE.nearbyAreas[1]}, ${SITE.nearbyAreas[2]} and beyond because of our convenient downtown location and comprehensive, family-friendly care.`,
      },
      {
        q: `What's the closest dental clinic to downtown ${SITE.city}?`,
        a: `${SITE.name} is right in the heart of downtown ${SITE.city} at ${formattedAddress}, making us a convenient choice for residents and workers in the core.`,
      },
    ],
  },
];

const allItems = groups.flatMap((g) => g.items);

const helpfulLinks = [
  { label: "New Patient information", href: "/new-patient" },
  { label: "All dental services", href: "/services" },
  { label: "Book an appointment", href: "/book-appointment" },
  { label: "About our clinic", href: "/about-us" },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "FAQ", href: "/faq" }]}
        image={images.team}
        title={<>Frequently Asked Questions | Dentist in {SITE.city}</>}
        intro={
          <>
            Answers to the questions we hear most from {SITE.city} patients. Can&rsquo;t find what you&rsquo;re looking
            for? <Link href="/book-appointment" className="font-medium text-brand-ink underline">Book an appointment</Link> or call us.
          </>
        }
      />

      {groups.map((g, i) => (
        <Faq
          key={g.id}
          id={g.id}
          items={g.items}
          heading={g.heading}
          variant={i % 2 === 0 ? "default" : "tint"}
          includeSchema={false}
        />
      ))}

      <Section aria-labelledby="helpful-heading">
        <h2 id="helpful-heading" className="text-2xl font-semibold sm:text-3xl">
          Helpful links
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {helpfulLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="block rounded-xl border border-brand-ink/10 bg-white p-4 font-medium hover:shadow-md"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <JsonLd data={faqSchema(allItems)} />
    </>
  );
}
