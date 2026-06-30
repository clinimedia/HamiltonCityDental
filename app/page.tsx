import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { RequestAppointmentForm } from "@/components/RequestAppointmentForm";
import { ServiceCard } from "@/components/ServiceCard";
import { HeroVideo } from "@/components/HeroVideo";
import { Testimonials } from "@/components/Testimonials";
import { Faq, type FaqItem } from "@/components/Faq";
import { PhoneIcon, CheckIcon, ArrowRightIcon, PinIcon, FileTextIcon } from "@/components/Icons";
import { buildMetadata } from "@/lib/seo";
import { images } from "@/lib/images";
import { servicesByOrder } from "@/lib/services";
import { SITE, formattedAddress, formattedHours } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: `Dentist in ${SITE.city}, ${SITE.province}`,
  description: `${SITE.name} — family, emergency & cosmetic dentistry at ${SITE.address.street} in ${SITE.city}, ${SITE.provinceCode}. Now accepting new patients. CDCP & direct billing. Call ${SITE.phone}.`,
  path: "/",
});

const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  `${SITE.name}, ${formattedAddress}`
)}&output=embed`;

// Online patient forms (mirrors the live "Online Forms" section). Real form
// files/links should replace these /new-patient targets once available.
const onlineForms = [
  { label: "New Patient Form", href: "https://cliniforms.ca/hamiltoncitydental/new-patient-form/" },
  { label: "X-ray Release Form", href: "https://cliniforms.ca/hamilton-city-dental-xray-release/" },
  { label: "X-ray Refusal Form", href: "https://cliniforms.ca/hamilton-city-dental-xray-refusal/" },
];

const faqs: FaqItem[] = [
  {
    q: "Is Hamilton City Dental accepting new patients?",
    a: "Yes — we're proudly accepting new patients of all ages in Hamilton and the surrounding area. You can request an appointment using the form on this page or call us at (289) 778-3717.",
  },
  {
    q: "Where is Hamilton City Dental located?",
    a: `We're located at ${formattedAddress}, in the Corktown neighbourhood of downtown Hamilton, just off Jackson Street East.`,
  },
  {
    q: "Do you accept the Canadian Dental Care Plan (CDCP)?",
    a: "Yes, we accept the Canadian Dental Care Plan (CDCP) and offer direct billing to most private insurers. Please note we're unable to assist with CDCP applications, but we're happy to bill the plan once you're approved.",
  },
  {
    q: "Do you offer emergency dental appointments in Hamilton?",
    a: "Yes. We reserve time for dental emergencies and offer same-day relief for issues like toothaches, broken teeth and lost fillings whenever possible. Call us as early in the day as you can so we can fit you in.",
  },
  {
    q: "What are your office hours?",
    a: "We're open Monday and Tuesday 8:00 AM–6:30 PM, Wednesday and Thursday 8:00 AM–5:00 PM, and closed Friday through Sunday.",
  },
  {
    q: "Which areas do you serve?",
    a: `Along with ${SITE.city}, we welcome patients from ${SITE.nearbyAreas.join(", ")} and the surrounding ${SITE.province} communities.`,
  },
];

export default function HomePage() {
  return (
    <>
      {/* ---------- Hero (original background video) ---------- */}
      <section className="relative isolate flex min-h-[68vh] items-end overflow-hidden bg-brand-ink text-brand-inverse sm:min-h-[76vh]">
        <HeroVideo />
        {/* Bottom-weighted wash so the lower text stays legible while the video shows up top. */}
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-ink/75 via-brand-ink/20 to-transparent"
          aria-hidden
        />
        <Container className="pb-14 pt-28 sm:pb-20">
          <div className="max-w-xl">
            <div className="[text-shadow:0_2px_14px_rgba(0,0,0,0.55)]">
              <h1 className="text-3xl font-semibold leading-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                {SITE.name}
              </h1>
              <p className="mt-3 text-lg font-medium text-brand-inverse/90 sm:text-2xl lg:text-3xl">
                Family, Emergency &amp; Cosmetic Dentistry in {SITE.city}
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/book-appointment" size="lg">
                Book Appointment
              </Button>
              <Button href={`tel:${SITE.phoneE164}`} variant="outline-light" size="lg">
                <PhoneIcon width={18} height={18} /> {SITE.phone}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Request Appointment form (directly below the hero) ---------- */}
      <Section id="request">
        <RequestAppointmentForm heading="Request an Appointment in Hamilton" />
      </Section>

      {/* ---------- You're in good hands — Hamilton dentist since 1982 (live: Same-Day Emergency) ---------- */}
      <Section variant="tint" aria-labelledby="goodhands-heading">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-ink/60">
              Same-day emergency booking
            </p>
            <h2 id="goodhands-heading" className="mt-2 text-2xl font-semibold sm:text-3xl">
              You&rsquo;re in good hands — a Hamilton dentist since 1982
            </h2>
            <p className="mt-4 text-brand-ink/75">
              For over 40 years, our downtown Hamilton practice has cared for local families with comfortable,
              conservative dentistry. Today, Dr. Zaid Gabriel and our team offer comprehensive care — from routine
              checkups to same-day emergency relief — all under one roof.
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {["40+ years serving Hamilton", "Same-day emergency appointments", "Gentle, pain-free approach", "New patients always welcome"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2 text-brand-ink/80">
                    <CheckIcon width={18} height={18} className="text-brand-hover" /> {item}
                  </li>
                )
              )}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/book-appointment" size="lg">Book Now</Button>
              <Button href="/services/emergency-dentistry" variant="ghost" size="lg">
                Dental emergencies
              </Button>
            </div>
          </div>
          <Image
            src={images.hero.src}
            alt={images.hero.alt}
            width={images.hero.width}
            height={images.hero.height}
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lg"
          />
        </div>
      </Section>

      {/* ---------- CDCP eligibility band (live: blue CDCP banner) ---------- */}
      <section className="bg-brand-ink text-brand-inverse">
        <Container className="flex flex-col items-start justify-between gap-4 py-6 sm:flex-row sm:items-center">
          <p className="text-lg font-semibold">
            Now accepting patients covered by the Canadian Dental Care Plan (CDCP)
          </p>
          <a
            href="https://www.canada.ca/en/services/benefits/dental/dental-care-plan.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-5 py-2.5 font-medium text-brand-ink hover:bg-brand-hover"
          >
            Check your eligibility
          </a>
        </Container>
      </section>

      {/* ---------- Online Forms (live: Online Forms) ---------- */}
      <Section aria-labelledby="forms-heading">
        <div className="max-w-2xl">
          <h2 id="forms-heading" className="text-2xl font-semibold sm:text-3xl">
            Online Forms
          </h2>
          <p className="mt-3 text-brand-ink/70">
            Your family dentist in {SITE.city} accepting new patients — save time at your first visit by completing your
            forms ahead of time.
          </p>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {onlineForms.map((f) => (
            <a
              key={f.label}
              href={f.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-2xl border border-brand-ink/10 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/20 text-brand-ink">
                <FileTextIcon width={22} height={22} />
              </span>
              <span className="font-medium">{f.label}</span>
              <ArrowRightIcon
                width={18}
                height={18}
                className="ml-auto text-brand-ink/40 transition-transform group-hover:translate-x-0.5"
              />
            </a>
          ))}
        </div>
      </Section>

      {/* ---------- Dental Services (live: Services + Expert Services) ---------- */}
      <Section variant="tint" aria-labelledby="services-heading">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 id="services-heading" className="text-2xl font-semibold sm:text-3xl">
              Dental Services in Hamilton
            </h2>
            <p className="mt-3 text-brand-ink/70">
              From routine cleanings and fillings to implants, Invisalign and emergency care — comprehensive dentistry under one roof.
            </p>
          </div>
          <Button href="/services" variant="ghost">
            View all services
          </Button>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicesByOrder.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Section>

      {/* ---------- General & cosmetic / Hamilton dentist since 1982 (live: General & Cosmetic + mission) ---------- */}
      <Section aria-labelledby="about-heading">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Image
            src={images.office.src}
            alt={images.office.alt}
            width={images.office.width}
            height={images.office.height}
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-md"
          />
          <div>
            <h2 id="about-heading" className="text-2xl font-semibold sm:text-3xl">
              General &amp; cosmetic dental care in downtown Hamilton
            </h2>
            <p className="mt-4 text-brand-ink/75">
              Caring for {SITE.neighbourhood} and downtown Hamilton families for decades, Hamilton City Dental
              (formerly {SITE.formerName}) is built on preventive, conservative dentistry and treating every patient
              like a neighbour. We accept the Canadian Dental Care Plan (CDCP) and direct bill most insurers.
            </p>
            <p className="mt-3 text-brand-ink/75">
              We take the time to explain your options so you can make confident, informed decisions about your oral
              health.
            </p>
            <Link
              href="/about-us"
              className="mt-6 inline-flex items-center gap-1.5 font-medium text-brand-ink hover:underline"
            >
              Learn more about Hamilton City Dental
              <ArrowRightIcon width={16} height={16} />
            </Link>
          </div>
        </div>
      </Section>

      {/* ---------- Patient testimonials (live: Patient voices) ---------- */}
      <Testimonials />

      {/* ---------- Service area + map + NAP / hours (live: Trusted Dentist Downtown Hamilton) ---------- */}
      <Section variant="tint" aria-labelledby="visit-heading">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 id="visit-heading" className="text-2xl font-semibold sm:text-3xl">
              Your trusted dentist in downtown Hamilton
            </h2>
            <p className="mt-3 text-brand-ink/70">
              Conveniently located in {SITE.neighbourhood}, we welcome patients from {SITE.city} and{" "}
              {SITE.nearbyAreas.join(", ")}. CDCP &amp; direct billing welcome.
            </p>

            <address className="mt-6 not-italic">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formattedAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 font-medium hover:text-brand-hover"
              >
                <PinIcon width={20} height={20} className="mt-0.5 shrink-0" />
                {formattedAddress}
              </a>
              <a href={`tel:${SITE.phoneE164}`} className="mt-3 flex items-center gap-2 font-medium hover:text-brand-hover">
                <PhoneIcon width={20} height={20} /> {SITE.phone}
              </a>
            </address>

            <div className="mt-6">
              <h3 className="font-semibold">Office hours</h3>
              <dl className="mt-2 max-w-sm space-y-1.5 text-sm">
                {formattedHours().map((h) => (
                  <div key={h.label} className="flex justify-between gap-4 border-b border-brand-ink/10 pb-1.5">
                    <dt className="text-brand-ink/70">{h.label}</dt>
                    <dd className={h.value === "Closed" ? "text-brand-ink/40" : "font-medium"}>{h.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-7">
              <Button href="/book-appointment" size="lg">Book your appointment</Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-brand-ink/10">
            <iframe
              title={`Map to ${SITE.name}, ${formattedAddress}`}
              src={mapEmbedSrc}
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="min-h-[320px] w-full"
              style={{ border: 0 }}
            />
          </div>
        </div>
      </Section>

      {/* ---------- FAQ (before footer) ---------- */}
      <Faq
        items={faqs}
        heading="Hamilton dentist FAQs"
        description="Common questions from new and returning patients at Hamilton City Dental."
      />
    </>
  );
}
