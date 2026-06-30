import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LastUpdated } from "@/components/LastUpdated";
import { RelatedServices } from "@/components/RelatedServices";
import { RelatedPosts } from "@/components/RelatedPosts";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { CheckIcon, ArrowRightIcon } from "@/components/Icons";
import { buildMetadata } from "@/lib/seo";
import { blogPostingSchema } from "@/lib/schema";
import { posts, getPost } from "@/lib/posts";
import { getPostContent } from "@/lib/post-content";
import { getService } from "@/lib/services";
import { blogImage, images } from "@/lib/images";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: blogImage(post.slug, post.service).src,
  });
}

function formatDate(d: string) {
  return new Date(`${d}T00:00:00`).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  const content = getPostContent(params.slug);
  if (!post || !content) notFound();

  const service = getService(post.service);
  const img = blogImage(post.slug, post.service);

  return (
    <>
      <div className="border-b border-brand-ink/10 bg-brand-inverse/40">
        <Container className="py-4">
          <Breadcrumbs
            items={[
              { name: "Blog", href: "/blog" },
              { name: post.title, href: `/blog/${post.slug}` },
            ]}
          />
        </Container>
      </div>

      <article>
        {/* Title + featured hero */}
        <Section className="pb-0">
          <div className="mx-auto max-w-3xl">
            {service && (
              <Link href={`/services/${service.slug}`} className="text-sm font-semibold text-brand-hover hover:underline">
                {service.navLabel}
              </Link>
            )}
            <h1 className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">{post.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-brand-ink/60">
              <span>
                Published <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              <span aria-hidden>·</span>
              <LastUpdated date={post.updated} className="text-sm text-brand-ink/60" />
            </div>
          </div>
          <div className="mx-auto mt-8 max-w-4xl">
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              priority
              sizes="(max-width: 1024px) 100vw, 56rem"
              className="aspect-[16/9] w-full rounded-3xl object-cover shadow-lg"
            />
          </div>
        </Section>

        {/* Body */}
        <Section>
          <div className="mx-auto max-w-3xl">
            <div className="space-y-4 text-lg text-brand-ink/80">
              {content.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {content.sections.map((sec, si) => (
              <div key={sec.heading}>
                <h2 className="mt-10 text-2xl font-semibold sm:text-3xl">{sec.heading}</h2>
                <div className="mt-4 space-y-4 text-brand-ink/80">
                  {sec.paragraphs.map((p, pi) => (
                    <p key={pi}>{p}</p>
                  ))}
                </div>
                {/* One in-body supporting image, after the second section. */}
                {si === 1 && (
                  <Image
                    src={images.office.src}
                    alt={`${SITE.name} dental clinic in ${SITE.city}, ${SITE.province}`}
                    width={images.office.width}
                    height={images.office.height}
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 48rem"
                    className="my-8 aspect-[16/9] w-full rounded-2xl object-cover"
                  />
                )}
              </div>
            ))}

            {/* Key takeaways */}
            <div className="mt-10 rounded-2xl border border-brand-ink/10 bg-brand-inverse/50 p-6">
              <h2 className="text-xl font-semibold">Key takeaways</h2>
              <ul className="mt-4 space-y-2">
                {content.keyTakeaways.map((k) => (
                  <li key={k} className="flex items-start gap-2 text-brand-ink/80">
                    <CheckIcon width={18} height={18} className="mt-1 shrink-0 text-brand-hover" /> {k}
                  </li>
                ))}
              </ul>
            </div>

            {service && (
              <p className="mt-8">
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1.5 font-medium text-brand-ink hover:underline"
                >
                  Learn more about {service.navLabel.toLowerCase()} in {SITE.city}
                  <ArrowRightIcon width={16} height={16} />
                </Link>
              </p>
            )}
          </div>
        </Section>
      </article>

      {/* Internal links */}
      <RelatedServices currentSlug={post.service} heading="Related dental services" />
      <RelatedPosts postSlug={post.slug} heading="Keep reading" />

      <Faq items={content.faqs} heading="Frequently asked questions" variant="tint" />

      <JsonLd
        data={blogPostingSchema({
          title: post.title,
          description: post.description,
          path: `/blog/${post.slug}`,
          image: img.src,
          datePublished: post.date,
          dateModified: post.updated,
        })}
      />
    </>
  );
}
