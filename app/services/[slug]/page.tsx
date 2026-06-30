import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { RelatedServices } from "@/components/RelatedServices";
import { RelatedPosts } from "@/components/RelatedPosts";
import { Faq } from "@/components/Faq";
import { LastUpdated } from "@/components/LastUpdated";
import { JsonLd } from "@/components/JsonLd";
import { CheckIcon, PhoneIcon, ArrowRightIcon } from "@/components/Icons";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";
import { services, getService } from "@/lib/services";
import { getServiceContent } from "@/lib/service-content";
import { serviceImage, images } from "@/lib/images";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getService(params.slug);
  if (!service) return {};
  return buildMetadata({
    title: `${service.metaTitle}`,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    image: serviceImage(service.slug).src,
  });
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  const content = getServiceContent(params.slug);
  if (!service || !content) notFound();

  const img = serviceImage(service.slug);

  return (
    <>
      {/* Breadcrumbs */}
      <div className="border-b border-brand-ink/10 bg-brand-inverse/40">
        <Container className="py-4">
          <Breadcrumbs
            items={[
              { name: "Services", href: "/services" },
              { name: service.navLabel, href: `/services/${service.slug}` },
            ]}
          />
        </Container>
      </div>

      {/* Hero — canonical service image */}
      <Section aria-labelledby="service-h1">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 id="service-h1" className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
              {service.name} in {SITE.city}, {SITE.province}
            </h1>
            <p className="mt-4 text-lg text-brand-ink/75">{service.intro}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/book-appointment" size="lg">
                Book Appointment
              </Button>
              <Button href={`tel:${SITE.phoneE164}`} variant="ghost" size="lg">
                <PhoneIcon width={18} height={18} /> {SITE.phone}
              </Button>
            </div>
            <LastUpdated date={service.updated} className="mt-5 text-sm text-brand-ink/55" />
          </div>
          <Image
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="aspect-[3/2] w-full rounded-3xl object-cover shadow-lg"
          />
        </div>
      </Section>

      {/* What it is / who it's for */}
      <Section variant="tint" aria-labelledby="about-service">
        <div className="mx-auto max-w-3xl">
          <h2 id="about-service" className="text-2xl font-semibold sm:text-3xl">
            About {service.name.toLowerCase()} in {SITE.city}
          </h2>
          <div className="mt-4 space-y-4 text-brand-ink/80">
            {content.whatItIs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <h3 className="mt-8 text-xl font-semibold">Who it's for</h3>
          <p className="mt-3 text-brand-ink/80">{content.whoFor}</p>

          {/* Treatments offered */}
          <h3 className="mt-8 text-xl font-semibold">What's included</h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {service.treatments.map((t) => (
              <li key={t} className="flex items-center gap-2 text-brand-ink/80">
                <CheckIcon width={18} height={18} className="text-brand-hover" /> {t}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Benefits */}
      <Section aria-labelledby="benefits-heading">
        <h2 id="benefits-heading" className="text-2xl font-semibold sm:text-3xl">
          Benefits of {service.name.toLowerCase()} at {SITE.name}
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.benefits.map((b) => (
            <div key={b.title} className="rounded-2xl border border-brand-ink/10 bg-white p-6">
              <h3 className="text-lg font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm text-brand-ink/70">{b.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* What to expect */}
      <Section variant="tint" aria-labelledby="expect-heading">
        <div className="mx-auto max-w-3xl">
          <h2 id="expect-heading" className="text-2xl font-semibold sm:text-3xl">
            What to expect
          </h2>
          <ol className="mt-8 space-y-6">
            {content.whatToExpect.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-brand-ink">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="mt-1 text-brand-ink/75">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Signs + Aftercare */}
      <Section aria-labelledby="signs-heading">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 id="signs-heading" className="text-2xl font-semibold sm:text-3xl">
              Signs you may need {service.name.toLowerCase()}
            </h2>
            <ul className="mt-6 space-y-2">
              {content.signs.map((s) => (
                <li key={s} className="flex items-start gap-2 text-brand-ink/80">
                  <CheckIcon width={18} height={18} className="mt-1 shrink-0 text-brand-hover" /> {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">Aftercare &amp; maintenance</h2>
            <ul className="mt-6 space-y-2">
              {content.aftercare.map((a) => (
                <li key={a} className="flex items-start gap-2 text-brand-ink/80">
                  <CheckIcon width={18} height={18} className="mt-1 shrink-0 text-brand-hover" /> {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Supporting image + closing / insurance note */}
      <Section variant="tint" aria-labelledby="closing-heading">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Image
            src={images.office.src}
            alt={`${service.name} at ${SITE.name} in ${SITE.city}, ${SITE.province}`}
            width={images.office.width}
            height={images.office.height}
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-md"
          />
          <div>
            <h2 id="closing-heading" className="text-2xl font-semibold sm:text-3xl">
              {service.name} in {SITE.city} — affordable &amp; covered
            </h2>
            <p className="mt-4 text-brand-ink/80">{content.closing}</p>
            <div className="mt-5 rounded-xl border border-brand-ink/10 bg-white p-4 text-sm text-brand-ink/75">
              <strong className="font-semibold text-brand-ink">Insurance &amp; CDCP:</strong> We accept the Canadian
              Dental Care Plan (CDCP) and direct-bill most insurers. We'll review a clear estimate with you before any
              treatment begins.
            </div>
            <Link
              href="/new-patient"
              className="mt-5 inline-flex items-center gap-1.5 font-medium text-brand-ink hover:underline"
            >
              New patient information
              <ArrowRightIcon width={16} height={16} />
            </Link>
          </div>
        </div>
      </Section>

      {/* Internal links: related services + related posts */}
      <RelatedServices currentSlug={service.slug} />
      <RelatedPosts serviceSlug={service.slug} heading={`More on ${service.navLabel.toLowerCase()} from our blog`} />

      {/* FAQ (service-specific) + CTA */}
      <Faq
        items={content.faqs}
        heading={`${service.name} FAQs`}
        description={`Common questions about ${service.name.toLowerCase()} at ${SITE.name} in ${SITE.city}.`}
      />
      <JsonLd
        data={serviceSchema({
          name: service.name,
          description: service.metaDescription,
          path: `/services/${service.slug}`,
          image: img.src,
        })}
      />
    </>
  );
}
