import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { Faq, type FaqItem } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { CheckIcon, ArrowRightIcon, HeartIcon, WalletIcon, SparklesIcon, ClockIcon, StarIcon, PinIcon } from "@/components/Icons";
import { buildMetadata } from "@/lib/seo";
import { pageSchema } from "@/lib/schema";
import { images } from "@/lib/images";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: `About ${SITE.name}`,
  description: `Learn about ${SITE.name}, a family dental clinic in ${SITE.neighbourhood}, ${SITE.city} caring for local smiles since 1982. Preventive, comfortable, conservative dentistry. New patients welcome.`,
  path: "/about-us",
});

const values = [
  { icon: SparklesIcon, title: "Advanced technology", body: "Modern equipment and techniques for accurate, efficient and comfortable care." },
  { icon: HeartIcon, title: "Personalised care", body: "We take time to understand your goals and explain every option so you can decide with confidence." },
  { icon: ClockIcon, title: "Same-day emergencies", body: "We reserve time for urgent dental problems and aim to see you the same day." },
  { icon: WalletIcon, title: "Direct billing & CDCP", body: "We direct-bill most insurers and accept the Canadian Dental Care Plan." },
  { icon: StarIcon, title: "Comfort first", body: "Preventive, conservative, pain-free dentistry in a relaxed, welcoming setting." },
  { icon: CheckIcon, title: "Expert team", body: "Experienced dentists, hygienists and a caring support team dedicated to your smile." },
];

const faqs: FaqItem[] = [
  {
    q: `How long has ${SITE.name} served ${SITE.city}?`,
    a: `Our downtown ${SITE.city} practice has cared for local families for decades — Dr. David De Benetti took over the practice in 1982, and today it continues as ${SITE.name} at ${SITE.address.street}.`,
  },
  {
    q: "Who are the dentists at Hamilton City Dental?",
    a: "Our dentists are Dr. Zaid Gabriel, who focuses on restorative and cosmetic dentistry, root canals, extractions and dentures, and Dr. Fadi Bahnam, who focuses on dental implants and oral surgery. You can read their full bios on our Meet the Team page.",
  },
  {
    q: "Are you accepting new patients?",
    a: `Yes — we welcome new patients of all ages from ${SITE.city} and nearby communities. Request an appointment online or call ${SITE.phone}.`,
  },
];

export default function AboutUsPage() {
  return (
    <>
      <div className="border-b border-brand-ink/10 bg-brand-inverse/40">
        <Container className="py-4">
          <Breadcrumbs items={[{ name: "About Us", href: "/about-us" }]} />
        </Container>
      </div>

      {/* Story / philosophy + photo */}
      <Section aria-labelledby="about-h1">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 id="about-h1" className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
              About {SITE.name} — Your Dental Clinic in {SITE.city}
            </h1>
            <p className="mt-4 text-lg text-brand-ink/75">
              Nestled in the heart of {SITE.neighbourhood}, {SITE.name} has cared for {SITE.city} smiles for
              generations. The practice was taken over by Dr. David De Benetti in 1982 and has grown alongside the
              community ever since, moving to our current home at {SITE.address.street} in 2021.
            </p>
            <p className="mt-3 text-brand-ink/75">
              Today, led by Dr. Zaid Gabriel and Dr. Fadi Bahnam, we practise preventive, conservative dentistry built
              on a simple belief: patients should be free from pain, comfortable during their visit, and empowered to
              make informed decisions about their oral health.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/about-us/meet-the-team" size="lg">
                Meet the Team
              </Button>
              <Button href="/book-appointment" variant="ghost" size="lg">
                Book Appointment
              </Button>
            </div>
          </div>
          <Image
            src={images.team.src}
            alt={images.team.alt}
            width={images.team.width}
            height={images.team.height}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lg"
          />
        </div>
      </Section>

      {/* Values */}
      <Section variant="tint" aria-labelledby="values-heading">
        <div className="max-w-2xl">
          <h2 id="values-heading" className="text-2xl font-semibold sm:text-3xl">
            What sets our {SITE.city} dental clinic apart
          </h2>
          <p className="mt-3 text-brand-ink/70">
            The values that guide every visit to {SITE.name}.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-brand-ink/10 bg-white p-6">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/20 text-brand-ink">
                <Icon width={24} height={24} />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-brand-ink/70">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Local roots */}
      <Section aria-labelledby="roots-heading">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-brand-ink/60">
            <PinIcon width={20} height={20} /> Proudly local
          </span>
          <h2 id="roots-heading" className="mt-3 text-2xl font-semibold sm:text-3xl">
            Rooted in downtown {SITE.city}
          </h2>
          <p className="mt-4 text-brand-ink/75">
            From our home in {SITE.neighbourhood}, we're proud to care for patients across {SITE.city} and the
            surrounding communities of {SITE.nearbyAreas.join(", ")}. Whether you've lived here for years or just
            moved to the area, we'd love to welcome you to the practice.
          </p>
          <Link
            href="/about-us/meet-the-team"
            className="mt-6 inline-flex items-center gap-1.5 font-medium text-brand-ink hover:underline"
          >
            Meet the {SITE.city} dental team
            <ArrowRightIcon width={16} height={16} />
          </Link>
        </div>
      </Section>

      {/* History of our practice (carried over from the live About page) */}
      <Section variant="tint" aria-labelledby="history-heading">
        <div className="mx-auto max-w-3xl">
          <h2 id="history-heading" className="text-2xl font-semibold sm:text-3xl">
            History of Our Dental Practice
          </h2>
          <div className="mt-6 space-y-4 text-brand-ink/80">
            <p>
              Nestled in the heart of Corktown, this dental practice has etched its legacy in Hamilton for decades. In
              June of 1982, the baton was passed as Dr. David Debenetti assumed stewardship from the esteemed Dr. Jeffrey
              Soloman, who embarked on a specialist&rsquo;s path at 199 McNab St South in Hamilton. Dr. Debenetti&rsquo;s
              commitment to dental excellence led to acquiring Dr. Stanley Holick&rsquo;s practice upon the latter&rsquo;s
              retirement in 1993. The Dental practice, too, embarked on a journey, relocating to 135 James Street South.
            </p>
            <p>
              In 1996, the torch of responsibility was upheld once more as the practice took under its wings the patients
              of Dr. George Williams, who retired due to health issues. The year 2000 marked a prominent move to 68
              Charlton Avenue West, symbolizing the practice&rsquo;s continued growth and dedication to its patients.
              Notably, in 2021, the Dental practice found a new home at 182 Jackson Street East, continuing its unwavering
              mission to provide exceptional dental care to the community.
            </p>
            <p>
              Throughout these years, the practice has touched the lives of countless patients, bringing forth new smiles
              and tending to their dental needs with unyielding commitment.
            </p>
          </div>
        </div>
      </Section>

      <Faq items={faqs} heading={`About ${SITE.name} — FAQs`} />

      <JsonLd
        data={pageSchema("AboutPage", {
          name: `About ${SITE.name}`,
          description: `About ${SITE.name}, a family dental clinic in ${SITE.city}, ${SITE.provinceCode}.`,
          path: "/about-us",
        })}
      />
    </>
  );
}
