import { Container } from "@/components/Container";
import { SITE, formattedAddress, formattedHours } from "@/lib/site";
import { PhoneIcon, MailIcon, PinIcon, ClockIcon, FacebookIcon, InstagramIcon } from "@/components/Icons";

const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${SITE.name}, ${formattedAddress}`
)}`;

/**
 * Top utility bar (above the navbar, every page): address, email, tap-to-call,
 * hours and social icons. Collapses to just tap-to-call on small screens.
 */
export function TopBar() {
  const hours = formattedHours().filter((h) => h.value !== "Closed");
  const hoursSummary = hours.map((h) => `${h.label} ${h.value}`).join(" · ");

  return (
    <div className="bg-brand-ink text-brand-inverse">
      <Container className="flex h-auto flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2 text-sm">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 hover:text-brand sm:flex"
          >
            <PinIcon width={16} height={16} />
            <span>{formattedAddress}</span>
          </a>
          <span className="hidden items-center gap-1.5 text-brand-inverse/80 lg:flex">
            <ClockIcon width={16} height={16} />
            <span>{hoursSummary}</span>
          </span>
        </div>

        <div className="flex items-center gap-x-5 gap-y-1">
          <a
            href={`mailto:${SITE.email}`}
            className="hidden items-center gap-1.5 hover:text-brand md:flex"
          >
            <MailIcon width={16} height={16} />
            <span>{SITE.email}</span>
          </a>
          <a href={`tel:${SITE.phoneE164}`} className="flex items-center gap-1.5 font-semibold hover:text-brand">
            <PhoneIcon width={16} height={16} />
            <span>{SITE.phone}</span>
          </a>
          <div className="flex items-center gap-3">
            <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Hamilton City Dental on Facebook" className="hover:text-brand">
              <FacebookIcon width={18} height={18} />
            </a>
            <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Hamilton City Dental on Instagram" className="hover:text-brand">
              <InstagramIcon width={18} height={18} />
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
