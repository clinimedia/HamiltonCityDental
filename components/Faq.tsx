import { Section } from "@/components/Section";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";

export type FaqItem = { q: string; a: string };

/**
 * Accessible FAQ accordion using native <details> (works without JS, zero CLS)
 * plus matching FAQPage JSON-LD. Reused on the homepage, service and blog pages
 * — pass page-specific questions so content stays unique (no cannibalisation).
 */
export function Faq({
  items,
  heading = "Frequently asked questions",
  description,
  id = "faq",
  variant = "default",
  includeSchema = true,
}: {
  items: FaqItem[];
  heading?: string;
  description?: string;
  id?: string;
  variant?: "default" | "tint";
  includeSchema?: boolean;
}) {
  if (items.length === 0) return null;

  return (
    <Section id={id} variant={variant} aria-labelledby={`${id}-heading`}>
      <div className="mx-auto max-w-3xl">
        <h2 id={`${id}-heading`} className="text-2xl font-semibold sm:text-3xl">
          {heading}
        </h2>
        {description && <p className="mt-3 text-brand-ink/70">{description}</p>}

        <div className="mt-8 divide-y divide-brand-ink/10 border-y border-brand-ink/10">
          {items.map((item, i) => (
            <details key={i} className="group py-2">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 text-left font-medium marker:hidden">
                <span>{item.q}</span>
                <span
                  aria-hidden
                  className="mt-1 shrink-0 text-xl leading-none text-brand-ink/50 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="pb-4 pr-8 text-brand-ink/75">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
      {includeSchema && <JsonLd data={faqSchema(items)} />}
    </Section>
  );
}
