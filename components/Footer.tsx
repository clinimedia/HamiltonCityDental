import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { images } from "@/lib/images";
import { servicesByOrder } from "@/lib/services";
import { SITE, formattedAddress, formattedHours } from "@/lib/site";
import { PhoneIcon, MailIcon, PinIcon, FacebookIcon, InstagramIcon } from "@/components/Icons";

const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  `${SITE.name}, ${formattedAddress}`
)}&output=embed`;

const explore = [
  { label: "About Us", href: "/about-us" },
  { label: "Meet the Team", href: "/about-us/meet-the-team" },
  { label: "New Patient Info", href: "/new-patient" },
  { label: "FAQ", href: "/faq" },
  { label: "Dental Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Book Appointment", href: "/book-appointment" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const hours = formattedHours();

  return (
    <footer className="bg-brand-ink text-brand-inverse">
      {/* Book CTA banner */}
      <div className="border-b border-white/10">
        <Container className="flex flex-col items-start justify-between gap-4 py-10 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">Ready to book your visit?</h2>
            <p className="mt-1 text-brand-inverse/75">
              {SITE.acceptingNewPatients ? "Now accepting new patients" : "Book your appointment"} in {SITE.city} — CDCP &amp; direct billing welcome.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/book-appointment" size="lg">Book Appointment</Button>
            <Button href={`tel:${SITE.phoneE164}`} variant="outline-light" size="lg">Call {SITE.phone}</Button>
          </div>
        </Container>
      </div>

      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand + local sentence + NAP */}
        <div className="lg:col-span-1">
          <Link href="/" className="flex items-center gap-2" aria-label={`${SITE.name} — home`}>
            <Image
              src={images.logo.src}
              alt={images.logo.alt}
              width={images.logo.width}
              height={images.logo.height}
              sizes="44px"
              className="h-11 w-11 rounded-full bg-white object-contain"
            />
            <span className="text-lg font-semibold">{SITE.name}</span>
          </Link>
          <p className="mt-4 text-sm text-brand-inverse/75">
            {SITE.name} is a family, cosmetic and emergency dental clinic in {SITE.neighbourhood},{" "}
            {SITE.city}, proudly serving {SITE.nearbyAreas.slice(0, 3).join(", ")} and the surrounding {SITE.province} communities.
          </p>
          <address className="mt-5 not-italic text-sm">
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formattedAddress)}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 hover:text-brand">
              <PinIcon width={18} height={18} className="mt-0.5 shrink-0" />
              <span>{formattedAddress}</span>
            </a>
            <a href={`tel:${SITE.phoneE164}`} className="mt-2 flex items-center gap-2 hover:text-brand">
              <PhoneIcon width={18} height={18} /> {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="mt-2 flex items-center gap-2 hover:text-brand">
              <MailIcon width={18} height={18} /> {SITE.email}
            </a>
          </address>
          <div className="mt-5 flex items-center gap-4">
            <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Hamilton City Dental on Facebook" className="hover:text-brand">
              <FacebookIcon width={22} height={22} />
            </a>
            <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Hamilton City Dental on Instagram" className="hover:text-brand">
              <InstagramIcon width={22} height={22} />
            </a>
          </div>
        </div>

        {/* Services */}
        <nav aria-label="Services" className="text-sm">
          <h3 className="text-base font-semibold">Dental Services</h3>
          <ul className="mt-4 space-y-2.5 text-brand-inverse/75">
            {servicesByOrder.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-brand">
                  {s.navLabel} in {SITE.city}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/services" className="font-medium text-brand hover:underline">View all services</Link>
            </li>
          </ul>
        </nav>

        {/* Explore + Areas served */}
        <div className="text-sm">
          <nav aria-label="Explore">
            <h3 className="text-base font-semibold">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-brand-inverse/75">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-brand">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-8">
            <h3 className="text-base font-semibold">Areas We Serve</h3>
            <p className="mt-4 text-brand-inverse/75">
              {SITE.city}, {SITE.nearbyAreas.join(", ")}
            </p>
          </div>
        </div>

        {/* Hours + Map */}
        <div className="text-sm">
          <h3 className="text-base font-semibold">Office Hours</h3>
          <dl className="mt-4 space-y-1.5 text-brand-inverse/75">
            {hours.map((h) => (
              <div key={h.label} className="flex justify-between gap-4">
                <dt>{h.label}</dt>
                <dd className={h.value === "Closed" ? "text-brand-inverse/50" : ""}>{h.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
            <iframe
              title={`Map to ${SITE.name}, ${formattedAddress}`}
              src={mapEmbedSrc}
              width="100%"
              height="180"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
            />
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-brand-inverse/60 sm:flex-row">
          <p>© {year} {SITE.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-brand">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-brand">Terms of Service</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
