import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/Button";
import { Faq, type FaqItem } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { personSchema } from "@/lib/schema";
import { images } from "@/lib/images";
import { teamByOrder, dentists, type TeamMember } from "@/lib/team";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: `Meet the Team`,
  description: `Meet the ${SITE.city} dental team at ${SITE.name} — Dr. Zaid Gabriel, Dr. Fadi Bahnam and our hygienists, assistant, coordinator and denturist. New patients welcome.`,
  path: "/about-us/meet-the-team",
});

const supportTeam = teamByOrder.filter((m) => !m.isDentist);

const faqs: FaqItem[] = [
  {
    q: "Which dentist will I see?",
    a: "New patients are typically seen by Dr. Zaid Gabriel for general and restorative care. Patients needing implants or oral surgery may see Dr. Fadi Bahnam. We'll match you with the right provider for your needs.",
  },
  {
    q: "Can I request a specific hygienist or dentist?",
    a: `Absolutely. Many patients prefer to see the same provider each visit. Just let our coordinator know when you book by calling ${SITE.phone}.`,
  },
  {
    q: "Are you taking new patients?",
    a: `Yes — our whole team welcomes new patients of all ages from ${SITE.city} and nearby communities.`,
  },
];

function Avatar({ name }: { name: string }) {
  const initial = name.replace(/^Dr\.?\s*/, "").charAt(0);
  return (
    <span className="flex h-full w-full items-center justify-center bg-brand/15 text-4xl font-semibold text-brand-ink/40">
      {initial}
    </span>
  );
}

function MemberCard({ member, priority, featured }: { member: TeamMember; priority?: boolean; featured?: boolean }) {
  return (
    <article id={member.slug} className="scroll-mt-28 overflow-hidden rounded-2xl border border-brand-ink/10 bg-white">
      <div className={`${featured ? "aspect-[4/5] sm:aspect-[3/4]" : "aspect-[4/5]"} w-full overflow-hidden bg-brand-inverse`}>
        {member.image ? (
          <Image
            src={member.image.src}
            alt={`${member.name}, ${member.role} at ${SITE.name} in ${SITE.city}, ${SITE.province}`}
            width={member.image.width}
            height={member.image.height}
            loading={priority ? undefined : "lazy"}
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <Avatar name={member.name} />
        )}
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold">
          {member.name}
          {member.credentials && <span className="text-brand-ink/50">, {member.credentials}</span>}
        </h3>
        <p className="text-sm font-medium text-brand-hover">{member.role}</p>
        <p className="mt-3 text-sm text-brand-ink/75">{member.bio}</p>
        {member.languages && member.languages.length > 0 && (
          <p className="mt-3 text-xs text-brand-ink/55">
            <span className="font-semibold">Languages:</span> {member.languages.join(", ")}
          </p>
        )}
      </div>
    </article>
  );
}

export default function MeetTheTeamPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "About Us", href: "/about-us" },
          { name: "Meet the Team", href: "/about-us/meet-the-team" },
        ]}
        image={images.team}
        title={<>Meet the {SITE.city} Dental Team at {SITE.name}</>}
        intro={`Friendly, experienced and genuinely caring — our dentists, hygienists, assistant and coordinator are here to make every visit to ${SITE.city}'s ${SITE.neighbourhood} comfortable.`}
      />

      {/* Our dentists */}
      <Section variant="tint" aria-labelledby="dentists-heading">
        <h2 id="dentists-heading" className="text-2xl font-semibold sm:text-3xl">
          Our dentists
        </h2>
        <p className="mt-2 max-w-2xl text-brand-ink/70">
          Experienced, gentle dentists leading your care in downtown {SITE.city}.
        </p>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {dentists.map((m, i) => (
            <MemberCard key={m.slug} member={m} priority={i < 2} featured />
          ))}
        </div>
      </Section>

      {/* Our team */}
      <Section aria-labelledby="staff-heading">
        <h2 id="staff-heading" className="text-2xl font-semibold sm:text-3xl">
          Our team
        </h2>
        <p className="mt-2 max-w-2xl text-brand-ink/70">
          The friendly faces who keep your visits smooth, comfortable and on time.
        </p>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {supportTeam.map((m) => (
            <MemberCard key={m.slug} member={m} />
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <Button href="/book-appointment" size="lg">Book Appointment</Button>
          <Button href="/about-us" variant="ghost" size="lg">About our clinic</Button>
        </div>
      </Section>

      <Faq items={faqs} heading="Meet the team — FAQs" variant="tint" />

      <JsonLd
        data={dentists.map((d) =>
          personSchema({
            name: d.name,
            jobTitle: d.role,
            image: d.image?.src,
            description: d.bio,
          })
        )}
      />
    </>
  );
}
