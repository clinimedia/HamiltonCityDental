import Image from "next/image";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { PhoneIcon } from "@/components/Icons";
import { images, type Img } from "@/lib/images";
import { SITE } from "@/lib/site";

/**
 * Shared page header used across interior pages for a consistent look:
 * breadcrumb bar + two-column hero (H1 + intro + Book/Call) with an image.
 * Defaults to the shared hero banner (matching the live service pages).
 */
export function PageHero({
  crumbs,
  title,
  intro,
  image,
  imageAlt,
  children,
}: {
  crumbs: Crumb[];
  title: React.ReactNode;
  intro?: React.ReactNode;
  image?: Img;
  imageAlt?: string;
  children?: React.ReactNode;
}) {
  const img = image ?? images.heroBanner;
  return (
    <>
      <div className="border-b border-brand-ink/10 bg-brand-inverse/40">
        <Container className="py-4">
          <Breadcrumbs items={crumbs} />
        </Container>
      </div>
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">{title}</h1>
            {intro && <p className="mt-4 text-lg text-brand-ink/75">{intro}</p>}
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/book-appointment" size="lg">
                Book Appointment
              </Button>
              <Button href={`tel:${SITE.phoneE164}`} variant="ghost" size="lg">
                <PhoneIcon width={18} height={18} /> {SITE.phone}
              </Button>
            </div>
            {children}
          </div>
          <Image
            src={img.src}
            alt={imageAlt ?? img.alt}
            width={img.width}
            height={img.height}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="aspect-square w-full rounded-3xl object-cover shadow-lg lg:aspect-[4/3]"
          />
        </div>
      </Section>
    </>
  );
}
