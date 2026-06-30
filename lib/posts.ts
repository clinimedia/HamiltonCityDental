/**
 * Blog index — drives /blog, each /blog/[slug] post, related-post links and the
 * sitemap. Slugs match the legacy site exactly (including the double hyphen in
 * the CDCP post) so existing ranking URLs are preserved 1:1.
 *
 * `date` = published date shown on the post. `updated` = last content review,
 * used for sitemap <lastmod> and the "Last updated" stamp. Published dates were
 * estimated from each post's seasonal content during migration — replace with
 * the true publish dates from the legacy CMS when available.
 */

export type Post = {
  slug: string;
  title: string;
  /** 150–160 char meta description, unique per post. */
  description: string;
  /** Related service slug (internal linking + RelatedPosts grouping). */
  service: string;
  /** Published date (ISO). */
  date: string;
  /** Last reviewed/updated (ISO) → sitemap lastmod + "Last updated" stamp. */
  updated: string;
};

const UPDATED = "2026-06-30";

export const posts: Post[] = [
  {
    slug: "new-year-new-smile-in-hamilton-start-2026-with-better-oral-health-fresh-dental-benefits",
    title: "New Year, New Smile in Hamilton: Start 2026 With Better Oral Health",
    description:
      "Start 2026 with a healthier smile. A Hamilton dentist's tips for using fresh dental benefits, booking a checkup and planning cosmetic care at Hamilton City Dental.",
    service: "cosmetic-dentistry",
    date: "2026-01-02",
    updated: UPDATED,
  },
  {
    slug: "dental-resolutions-that-actually-work-a-hamilton-dentists-guide-to-better-oral-health",
    title: "Dental Resolutions That Actually Work: A Hamilton Dentist's Guide",
    description:
      "Practical, dentist-approved resolutions for better oral health in 2026 — from brushing habits to regular cleanings — from the team at Hamilton City Dental.",
    service: "dental-hygiene",
    date: "2026-01-08",
    updated: UPDATED,
  },
  {
    slug: "how-to-use-your-cdcp-benefits-at-hamilton-city-dental-in-2026",
    title: "How to Use Your CDCP Benefits at Hamilton City Dental in 2026",
    description:
      "A clear guide to using your Canadian Dental Care Plan (CDCP) benefits in Hamilton in 2026 — what's covered and how to book at Hamilton City Dental.",
    service: "family-dentistry",
    date: "2026-01-15",
    updated: UPDATED,
  },
  {
    slug: "affordable-smile-makeovers-in-hamilton-cdcp-financing-cosmetic-options",
    title: "Affordable Smile Makeovers in Hamilton: CDCP, Financing & Cosmetic Options",
    description:
      "Explore affordable smile makeover options in Hamilton — cosmetic treatments, CDCP coverage and flexible financing — at Hamilton City Dental.",
    service: "cosmetic-dentistry",
    date: "2026-02-05",
    updated: UPDATED,
  },
  {
    slug: "invisalign-near-me-in-hamilton-what-you-need-to-know-before-starting-treatment",
    title: "Invisalign Near Me in Hamilton: What to Know Before Starting Treatment",
    description:
      "Considering Invisalign in Hamilton? Learn how clear aligners work, what treatment costs and what to expect before you start, from Hamilton City Dental.",
    service: "invisalign",
    date: "2026-02-18",
    updated: UPDATED,
  },
  {
    slug: "professional-teeth-whitening-in-hamilton-brighter-smiles-at-hamilton-city-dental",
    title: "Professional Teeth Whitening in Hamilton: Brighter Smiles",
    description:
      "Discover safe, professional teeth whitening in Hamilton. Learn how dentist-supervised whitening works and lasts longer, from Hamilton City Dental.",
    service: "teeth-whitening",
    date: "2026-03-04",
    updated: UPDATED,
  },
  {
    slug: "dental-implants-in-hamilton-permanent-tooth-replacement-at-hamilton-city-dental",
    title: "Dental Implants in Hamilton: Permanent Tooth Replacement",
    description:
      "Everything you need to know about dental implants in Hamilton — how they work, who they suit and the benefits of permanent tooth replacement at Hamilton City Dental.",
    service: "implants",
    date: "2026-03-19",
    updated: UPDATED,
  },
  {
    slug: "childrens-dentist-in-hamilton-gentle-pediatric-dental-care-at-hamilton-city-dental",
    title: "Children's Dentist in Hamilton: Gentle Pediatric Dental Care",
    description:
      "Looking for a gentle children's dentist in Hamilton? Learn how we make kids' visits stress-free and build healthy habits at Hamilton City Dental.",
    service: "childrens-dentistry",
    date: "2026-04-01",
    updated: UPDATED,
  },
  {
    slug: "root-canal-hamilton-what-to-expect-hamilton-city-dental",
    title: "Root Canal in Hamilton: What to Expect",
    description:
      "Nervous about a root canal in Hamilton? Learn what the procedure involves, how we keep it comfortable and how it saves your tooth at Hamilton City Dental.",
    service: "root-canal-treatment",
    date: "2026-04-15",
    updated: UPDATED,
  },
  {
    slug: "wisdom-teeth-removal-in-hamilton-hamilton-city-dental",
    title: "Wisdom Teeth Removal in Hamilton: What You Should Know",
    description:
      "When should wisdom teeth come out? Learn about safe, comfortable wisdom teeth removal and sedation options in Hamilton at Hamilton City Dental.",
    service: "wisdom-teeth-removal",
    date: "2026-04-29",
    updated: UPDATED,
  },
  {
    slug: "one-visit-crowns-in-hamilton",
    title: "One-Visit Crowns in Hamilton",
    description:
      "Learn how one-visit dental crowns restore damaged teeth quickly in Hamilton — what they're made of and who they suit — from Hamilton City Dental.",
    service: "crown-bridges",
    date: "2026-05-13",
    updated: UPDATED,
  },
  {
    slug: "emergency-dentist-in-hamilton-what-to-do-if-you-have-severe-tooth-pain",
    title: "Emergency Dentist in Hamilton: What to Do With Severe Tooth Pain",
    description:
      "Severe tooth pain? Learn what to do, how to manage it and when to see an emergency dentist in Hamilton. Same-day relief at Hamilton City Dental.",
    service: "emergency-dentistry",
    date: "2026-05-27",
    updated: UPDATED,
  },
  {
    slug: "tooth-pain-near-me-when-to-see-a-dentist-in-hamilton",
    title: "Tooth Pain Near Me: When to See a Dentist in Hamilton",
    description:
      "Not sure if your tooth pain needs a dentist? Learn the warning signs and when to seek same-day care in Hamilton, from Hamilton City Dental.",
    service: "emergency-dentistry",
    date: "2026-06-10",
    updated: UPDATED,
  },
  {
    slug: "emergency-family-dental-care-in-hamilton",
    title: "Emergency Family Dental Care in Hamilton",
    description:
      "From knocked-out teeth to sudden pain, learn how our team handles family dental emergencies in Hamilton with prompt, same-day care at Hamilton City Dental.",
    service: "emergency-dentistry",
    date: "2026-06-24",
    updated: UPDATED,
  },
  {
    slug: "hamiltons-trusted-family-cosmetic-dentistry",
    title: "Hamilton's Trusted Family & Cosmetic Dentistry",
    description:
      "Meet the family and cosmetic dental team Hamilton trusts. Learn about our services, our approach and how to become a patient at Hamilton City Dental.",
    service: "cosmetic-dentistry",
    date: "2025-11-20",
    updated: UPDATED,
  },
  {
    slug: "cdcp-dentist-in-hamilton--how-hamilton-city-dental-makes-dental-care-affordable",
    title: "CDCP Dentist in Hamilton: How We Make Dental Care Affordable",
    description:
      "Learn how Hamilton City Dental helps patients use the Canadian Dental Care Plan (CDCP) and direct billing to make quality dental care affordable in Hamilton.",
    service: "family-dentistry",
    date: "2025-12-01",
    updated: UPDATED,
  },
  {
    slug: "use-your-2025-dental-benefits-before-they-expire-hamilton-city-dentals-year-end-guide",
    title: "Use Your 2025 Dental Benefits Before They Expire: Year-End Guide",
    description:
      "Don't leave dental benefits on the table. A Hamilton dentist's year-end guide to using your 2025 coverage before it resets at Hamilton City Dental.",
    service: "dental-hygiene",
    date: "2025-12-03",
    updated: UPDATED,
  },
  {
    slug: "holiday-dental-care-in-hamilton-keep-your-smile-bright-this-christmas-hamilton-city-dental",
    title: "Holiday Dental Care in Hamilton: Keep Your Smile Bright This Christmas",
    description:
      "Keep your smile healthy through the holidays with these tips from a Hamilton dentist — plus how to book holiday-season care at Hamilton City Dental.",
    service: "family-dentistry",
    date: "2025-12-10",
    updated: UPDATED,
  },
];

/** Posts newest-first for the blog index. */
export const postsByDate = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export const postSlugs = posts.map((p) => p.slug);
