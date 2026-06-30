import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { PostCard } from "@/components/PostCard";
import { Faq, type FaqItem } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { images } from "@/lib/images";
import { blogSchema, itemListSchema } from "@/lib/schema";
import { postsByDate } from "@/lib/posts";
import { servicesByOrder } from "@/lib/services";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: `Dental Health Tips & News`,
  description: `Dental health tips, treatment guides and clinic news from ${SITE.name} in ${SITE.city}, ${SITE.provinceCode}. Practical advice on cleanings, implants, Invisalign, CDCP and more.`,
  path: "/blog",
});

const popularServices = servicesByOrder.slice(0, 6);

const faqs: FaqItem[] = [
  {
    q: "Is the information in these articles a substitute for a dental visit?",
    a: "No. Our blog offers general guidance only. For advice specific to your teeth, please book an exam — every mouth is different.",
  },
  {
    q: "How often do you publish new articles?",
    a: `We add new dental health tips regularly. Bookmark this page or follow us to keep up with the latest from ${SITE.name}.`,
  },
];

const listItems = postsByDate.map((p) => ({ name: p.title, path: `/blog/${p.slug}` }));

export default function BlogIndexPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Blog", href: "/blog" }]}
        image={images.blogHero}
        title={<>Dental Health Tips &amp; News | {SITE.shortName} in {SITE.city}</>}
        intro={`Practical advice, treatment guides and clinic updates from our ${SITE.city} dental team — written to help you make confident decisions about your smile.`}
      />

      <Section aria-label="Blog posts">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {postsByDate.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </Section>

      {/* Popular services */}
      <Section variant="tint" aria-labelledby="popular-heading">
        <h2 id="popular-heading" className="text-2xl font-semibold sm:text-3xl">
          Popular services in {SITE.city}
        </h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {popularServices.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="inline-flex rounded-full border border-brand-ink/15 bg-white px-4 py-2 text-sm font-medium hover:bg-brand-inverse"
              >
                {s.navLabel}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/services" className="inline-flex rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-ink hover:bg-brand-hover">
              View all services
            </Link>
          </li>
        </ul>
      </Section>

      <Faq items={faqs} heading="Blog FAQs" />

      <JsonLd
        data={[
          blogSchema({
            name: `${SITE.name} Blog`,
            description: `Dental health tips and news from ${SITE.name} in ${SITE.city}.`,
            path: "/blog",
          }),
          itemListSchema(listItems),
        ]}
      />
    </>
  );
}
