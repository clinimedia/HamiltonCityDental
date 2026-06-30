import { Section } from "@/components/Section";
import { StarIcon } from "@/components/Icons";

/**
 * Patient testimonials band (mirrors the live homepage's "Patient voices"
 * section). NOTE: these quotes are carried over from the existing site and
 * read as sample content — replace with real, attributable Google reviews.
 * No Review/AggregateRating JSON-LD is emitted, to avoid publishing
 * unverifiable review rich-result markup.
 */
const testimonials = [
  {
    name: "Taylor Brooks",
    quote:
      "Every visit feels welcoming and gentle. The team listens, cares, and makes my family feel right at home.",
  },
  {
    name: "Jordan Kim",
    quote:
      "From day one, I felt supported. The staff explained everything and made my dental care easy and stress-free.",
  },
  {
    name: "Morgan Patel",
    quote:
      "I needed urgent help and was seen right away. The dentists are caring, skilled, and truly put me at ease.",
  },
  {
    name: "Avery Chen",
    quote:
      "The clinic is bright and spotless. I love the personal touch and how comfortable every appointment feels.",
  },
];

export function Testimonials() {
  return (
    <Section aria-labelledby="testimonials-heading">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-ink/60">
          Stories from our dental family
        </p>
        <h2 id="testimonials-heading" className="mt-2 text-2xl font-semibold sm:text-3xl">
          Patient voices, real experiences
        </h2>
      </div>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t) => (
          <li key={t.name} className="flex flex-col rounded-2xl border border-brand-ink/10 bg-white p-6">
            <div className="flex gap-0.5 text-brand-hover" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} width={16} height={16} />
              ))}
            </div>
            <blockquote className="mt-3 flex-1 text-sm text-brand-ink/80">&ldquo;{t.quote}&rdquo;</blockquote>
            <p className="mt-4 text-sm font-semibold">{t.name}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
