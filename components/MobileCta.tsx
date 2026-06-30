import { PhoneIcon } from "@/components/Icons";
import { SITE } from "@/lib/site";

/**
 * Sticky bottom action bar on phones — always-visible Book Appointment + tap-to-call.
 * Hidden on lg+ (the header CTA covers desktop). A spacer keeps page content from
 * sitting underneath it.
 */
export function MobileCta() {
  return (
    <>
      <div className="h-16 lg:hidden" aria-hidden />
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-stretch gap-2 border-t border-brand-ink/10 bg-white/95 p-2.5 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur lg:hidden">
        <a
          href="/book-appointment"
          className="flex flex-1 items-center justify-center rounded-full bg-brand px-4 py-3 text-sm font-semibold text-brand-ink"
        >
          Book Appointment
        </a>
        <a
          href={`tel:${SITE.phoneE164}`}
          aria-label={`Call ${SITE.name} at ${SITE.phone}`}
          className="flex items-center justify-center gap-2 rounded-full border border-brand-ink/15 px-4 py-3 text-sm font-semibold text-brand-ink"
        >
          <PhoneIcon width={18} height={18} /> Call
        </a>
      </div>
    </>
  );
}
