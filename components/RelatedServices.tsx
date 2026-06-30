import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { relatedServices } from "@/lib/links";

/** Cross-links a service page to complementary services (no orphan pages). */
export function RelatedServices({
  currentSlug,
  heading = "Related dental services in Hamilton",
}: {
  currentSlug: string;
  heading?: string;
}) {
  const related = relatedServices(currentSlug, 3);
  if (related.length === 0) return null;

  return (
    <Section variant="tint" aria-labelledby="related-services-heading">
      <h2 id="related-services-heading" className="text-2xl font-semibold sm:text-3xl">
        {heading}
      </h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((s) => (
          <ServiceCard key={s.slug} service={s} />
        ))}
      </div>
    </Section>
  );
}
