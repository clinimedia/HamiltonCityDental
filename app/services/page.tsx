import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { ServiceCard } from "@/components/ServiceCard";
import { RequestAppointmentForm } from "@/components/RequestAppointmentForm";
import { Faq, type FaqItem } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { itemListSchema } from "@/lib/schema";
import { images } from "@/lib/images";
import { servicesByOrder, getService, additionalServices, type Service } from "@/lib/services";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: `Dental Services in ${SITE.city}`,
  description: `Explore dental services at ${SITE.name} in ${SITE.city}, ${SITE.provinceCode} — family, cosmetic, emergency, implants, Invisalign, root canals & more. New patients welcome, CDCP & direct billing.`,
  path: "/services",
});

// Service groupings for scannability (each service still has ONE canonical page).
const groups: { title: string; blurb: string; slugs: string[] }[] = [
  {
    title: "Preventive & Family",
    blurb: "Routine care that keeps your whole family's smiles healthy.",
    slugs: ["family-dentistry", "childrens-dentistry", "dental-hygiene"],
  },
  {
    title: "Restorative",
    blurb: "Repair, rebuild and replace damaged or missing teeth.",
    slugs: ["crown-bridges", "root-canal-treatment", "implants", "wisdom-teeth-removal"],
  },
  {
    title: "Cosmetic",
    blurb: "Brighten and reshape your smile with your goals in mind.",
    slugs: ["cosmetic-dentistry", "teeth-whitening"],
  },
  {
    title: "Orthodontic",
    blurb: "Straighten teeth discreetly without metal braces.",
    slugs: ["invisalign"],
  },
  {
    title: "Emergency",
    blurb: "Same-day relief when dental pain can't wait.",
    slugs: ["emergency-dentistry"],
  },
];

const faqs: FaqItem[] = [
  {
    q: "Do you offer all of these dental services in one location?",
    a: `Yes. ${SITE.name} provides preventive, restorative, cosmetic, orthodontic and emergency dentistry under one roof at ${SITE.address.street} in ${SITE.city}, so most of your family's dental needs can be handled in one place.`,
  },
  {
    q: "Which service do I need?",
    a: "If you're not sure, that's completely normal. Book a checkup or request an appointment and our dentists will examine your teeth, explain what they find, and recommend the most conservative option that's right for you.",
  },
  {
    q: "Are your services covered by insurance or CDCP?",
    a: "We direct-bill most private insurance plans and accept the Canadian Dental Care Plan (CDCP). Coverage varies by treatment and plan, so we'll always review estimates with you before proceeding. Note that cosmetic treatments are typically not covered.",
  },
  {
    q: "Are you accepting new patients for these services?",
    a: `Yes — we're accepting new patients of all ages in ${SITE.city} and the surrounding area. You can request an appointment online or call ${SITE.phone}.`,
  },
];

const serviceListItems = servicesByOrder.map((s) => ({ name: s.name, path: `/services/${s.slug}` }));

export default function ServicesPage() {
  return (
    <>
      <Section>
        <Breadcrumbs items={[{ name: "Services", href: "/services" }]} />
        <div className="mt-6 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
              Dental Services in {SITE.city}, {SITE.province}
            </h1>
            <p className="mt-4 text-lg text-brand-ink/75">
              From routine checkups and cleanings to implants, Invisalign, root canals and same-day emergency care,
              {" "}
              {SITE.name} offers comprehensive dentistry for the whole family in downtown {SITE.city}.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/book-appointment" size="lg">Book Appointment</Button>
              <Button href={`tel:${SITE.phoneE164}`} variant="ghost" size="lg">{SITE.phone}</Button>
            </div>
          </div>
          <Image
            src={images.heroBanner.src}
            alt={images.heroBanner.alt}
            width={images.heroBanner.width}
            height={images.heroBanner.height}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="aspect-square w-full rounded-3xl object-cover shadow-lg lg:aspect-[4/3]"
          />
        </div>
      </Section>

      {groups.map((group, gi) => {
        const groupServices = group.slugs
          .map(getService)
          .filter((s): s is Service => Boolean(s));
        return (
          <Section key={group.title} variant={gi % 2 === 0 ? "default" : "tint"} aria-labelledby={`grp-${gi}`}>
            <div className="max-w-2xl">
              <h2 id={`grp-${gi}`} className="text-2xl font-semibold sm:text-3xl">
                {group.title} dentistry
              </h2>
              <p className="mt-2 text-brand-ink/70">{group.blurb}</p>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {groupServices.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </Section>
        );
      })}

      {/* Other treatments (no standalone page) */}
      <Section aria-labelledby="other-heading">
        <h2 id="other-heading" className="text-2xl font-semibold sm:text-3xl">
          Other treatments we offer
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {additionalServices.map((a) => (
            <li key={a.name} className="rounded-2xl border border-brand-ink/10 bg-white p-5">
              <h3 className="font-semibold">{a.name}</h3>
              <p className="mt-1 text-sm text-brand-ink/70">{a.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Not sure? → form + call */}
      <Section variant="tint" aria-labelledby="notsure-heading">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 id="notsure-heading" className="text-2xl font-semibold sm:text-3xl">
              Not sure which service you need?
            </h2>
            <p className="mt-3 text-brand-ink/75">
              Tell us what's going on and we'll point you in the right direction. Request an appointment and one of our
              {" "}
              {SITE.city} dentists will examine, explain and recommend the right next step — no pressure.
            </p>
            <p className="mt-3 text-brand-ink/75">
              Prefer to talk it through? Call{" "}
              <a href={`tel:${SITE.phoneE164}`} className="font-medium text-brand-ink underline">
                {SITE.phone}
              </a>
              .
            </p>
          </div>
          <RequestAppointmentForm heading="Request an Appointment" />
        </div>
      </Section>

      <Faq items={faqs} heading="Dental services FAQs" />

      <JsonLd data={itemListSchema(serviceListItems)} />
    </>
  );
}
