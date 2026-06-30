/**
 * Service catalogue — drives the Services nav dropdown, the /services hub,
 * each /services/[slug] page, metadata and JSON-LD. URL slugs are kept
 * identical to the existing site to preserve rankings. One intent per service
 * = no keyword cannibalisation.
 *
 * Content verified June 2026 by crawling the live /services hub and all 11
 * service pages. `treatments` lists the real sub-procedures named on each page
 * (surface these on the service page, NOT as separate URLs — they are intents
 * within one service). Note: the legacy site repeats the same FAQ block on
 * every service page (cannibalisation) — do NOT replicate that; write a
 * page-specific FAQ per service when building the pages.
 */

export type Service = {
  /** URL slug under /services/. MUST match the legacy site. */
  slug: string;
  /** Full service name as shown in H1s and schema. */
  name: string;
  /** Short label for nav + breadcrumbs. */
  navLabel: string;
  /** <title> (the layout appends " | Hamilton City Dental"). Keep < 38 chars. */
  metaTitle: string;
  /** 150–160 char meta description, unique per service. */
  metaDescription: string;
  /** One-line blurb for the hub card. */
  cardBlurb: string;
  /** Lead sentence used under the service H1. */
  intro: string;
  /** Real sub-treatments/procedures offered within this service. */
  treatments: string[];
  /** Display order in nav + hub. */
  order: number;
  /** Last content review (ISO date) → sitemap lastmod + "Last updated" stamp. */
  updated: string;
};

const UPDATED = "2026-06-30"; // migration review date; replace with real edit dates over time.

export const services: Service[] = [
  {
    slug: "family-dentistry",
    name: "Family Dentistry",
    navLabel: "Family Dentistry",
    metaTitle: "Family Dentist in Hamilton",
    metaDescription:
      "Family dentist in Hamilton, ON. Checkups, cleanings, fillings & gentle care for every age at Hamilton City Dental. Accepting new patients, CDCP & direct billing.",
    cardBlurb: "Comprehensive checkups, cleanings and preventive care for every age.",
    intro:
      "Friendly, preventive dental care for your whole family — from a child's first visit to senior care — right in downtown Hamilton.",
    treatments: [
      "Dental exams & checkups",
      "Professional cleanings",
      "Tooth-coloured fillings",
      "Dental sealants",
      "Fluoride treatments",
      "Gum disease prevention",
      "Tooth extractions",
    ],
    order: 1,
    updated: UPDATED,
  },
  {
    slug: "childrens-dentistry",
    name: "Children's Dentistry",
    navLabel: "Children's Dentistry",
    metaTitle: "Children's Dentist in Hamilton",
    metaDescription:
      "Gentle children's dentist in Hamilton, ON. Kid-friendly checkups, cleanings, sealants, fluoride & cavity care at Hamilton City Dental. Now accepting new patients.",
    cardBlurb: "Gentle, kid-friendly checkups and preventive care that build healthy habits.",
    intro:
      "We combine patience, education and gentle techniques to make every child's visit enjoyable — building healthy habits that last a lifetime.",
    treatments: [
      "Gentle checkups & exams",
      "Routine cleanings",
      "Dental sealants",
      "Fluoride treatments",
      "Cavity prevention & fillings",
      "Children's dental emergencies",
    ],
    order: 2,
    updated: UPDATED,
  },
  {
    slug: "emergency-dentistry",
    name: "Emergency Dentistry",
    navLabel: "Emergency Dentistry",
    metaTitle: "Emergency Dentist in Hamilton",
    metaDescription:
      "Emergency dentist in Hamilton, ON. Same-day relief for toothaches, broken teeth, lost fillings & dental pain at Hamilton City Dental. Call (289) 778-3717.",
    cardBlurb: "Same-day relief for toothaches, broken teeth and dental emergencies.",
    intro:
      "In pain? We reserve time for dental emergencies and offer prompt, same-day relief whenever possible — so an unexpected problem doesn't ruin your day.",
    treatments: [
      "Toothache & infection relief",
      "Broken or chipped tooth repair",
      "Knocked-out tooth care",
      "Lost filling or loose crown repair",
      "Abscess & swelling treatment",
      "Same-day emergency exams",
    ],
    order: 3,
    updated: UPDATED,
  },
  {
    slug: "dental-hygiene",
    name: "Dental Hygiene",
    navLabel: "Dental Hygiene",
    metaTitle: "Dental Hygiene in Hamilton",
    metaDescription:
      "Professional dental hygiene & teeth cleaning in Hamilton, ON. Gentle scaling, polishing & gum care to prevent cavities and gum disease at Hamilton City Dental.",
    cardBlurb: "Professional cleanings and gum care to keep your smile healthy.",
    intro:
      "Professional cleanings do what brushing and flossing at home can't — removing plaque and tartar to prevent cavities and gum disease between visits.",
    treatments: [
      "Professional cleanings",
      "Scaling (plaque & tartar removal)",
      "Tooth polishing",
      "Periodontal (gum) care",
      "Fluoride treatments",
      "Oral hygiene coaching",
    ],
    order: 4,
    updated: UPDATED,
  },
  {
    slug: "cosmetic-dentistry",
    name: "Cosmetic Dentistry",
    navLabel: "Cosmetic Dentistry",
    metaTitle: "Cosmetic Dentist in Hamilton",
    metaDescription:
      "Cosmetic dentist in Hamilton, ON. Veneers, bonding, smile makeovers, whitening & recontouring at Hamilton City Dental. Book a consultation — CDCP & direct billing.",
    cardBlurb: "Veneers, bonding, whitening and smile makeovers tailored to your goals.",
    intro:
      "Stains, chips, gaps or misalignment? Dr. Zaid Gabriel offers a full range of cosmetic options that deliver substantial, long-term improvements to your smile.",
    treatments: [
      "Porcelain veneers",
      "No-prep veneers",
      "Dental bonding",
      "Metal-free dental crowns",
      "Professional teeth whitening",
      "Gum recontouring",
      "Tooth recontouring",
      "Invisalign clear aligners",
    ],
    order: 5,
    updated: UPDATED,
  },
  {
    slug: "teeth-whitening",
    name: "Teeth Whitening",
    navLabel: "Teeth Whitening",
    metaTitle: "Teeth Whitening in Hamilton",
    metaDescription:
      "Professional teeth whitening in Hamilton, ON. In-office Zoom! and custom take-home whitening for a brighter smile at Hamilton City Dental. Book your appointment.",
    cardBlurb: "Safe, dentist-supervised whitening for a noticeably brighter smile.",
    intro:
      "Brighten your smile safely with dentist-supervised whitening — fast in-office treatment or custom take-home kits that deliver real, lasting results.",
    treatments: [
      "In-office Zoom! whitening",
      "One-hour SAA DENT whitening",
      "Custom take-home whitening kits",
    ],
    order: 6,
    updated: UPDATED,
  },
  {
    slug: "invisalign",
    name: "Invisalign",
    navLabel: "Invisalign",
    metaTitle: "Invisalign in Hamilton",
    metaDescription:
      "Invisalign clear aligners in Hamilton, ON. Straighten uneven or spaced teeth discreetly with custom aligners at Hamilton City Dental. Book a consultation.",
    cardBlurb: "Straighten teeth discreetly with custom clear aligners.",
    intro:
      "Straighten uneven or spaced teeth without bulky metal braces. Invisalign clear aligners are custom-made, removable and virtually invisible.",
    treatments: [
      "Invisalign clear aligners",
      "Custom treatment planning",
      "Retainers",
    ],
    order: 7,
    updated: UPDATED,
  },
  {
    slug: "implants",
    name: "Dental Implants",
    navLabel: "Dental Implants",
    metaTitle: "Dental Implants in Hamilton",
    metaDescription:
      "Dental implants in Hamilton, ON. Permanent, natural-looking tooth replacement that can anchor crowns, bridges & dentures at Hamilton City Dental. Book a consult.",
    cardBlurb: "Permanent, natural-looking replacements for missing teeth.",
    intro:
      "Replace missing teeth permanently with natural-looking dental implants, which can anchor a single crown, a bridge or a full denture — placed and restored in our Hamilton office.",
    treatments: [
      "Single tooth implants",
      "Implant-supported crowns",
      "Implant-supported bridges",
      "Implant-retained dentures",
    ],
    order: 8,
    updated: UPDATED,
  },
  {
    slug: "crown-bridges",
    name: "Crown & Bridges",
    navLabel: "Crowns & Bridges",
    metaTitle: "Crowns & Bridges in Hamilton",
    metaDescription:
      "Dental crowns & bridges in Hamilton, ON. Restore damaged or missing teeth with durable porcelain, ceramic & metal-free restorations at Hamilton City Dental.",
    cardBlurb: "Durable, natural-looking restorations for damaged or missing teeth.",
    intro:
      "A crown caps and protects a damaged tooth; a bridge closes the gap left by missing teeth. Both restore strength, function and a natural appearance.",
    treatments: [
      "Porcelain crowns",
      "Ceramic crowns",
      "Metal-free crowns",
      "Dental bridges",
      "One-visit crowns",
    ],
    order: 9,
    updated: UPDATED,
  },
  {
    slug: "root-canal-treatment",
    name: "Root Canal Treatment",
    navLabel: "Root Canal Treatment",
    metaTitle: "Root Canal in Hamilton",
    metaDescription:
      "Fast, comfortable root canal treatment in Hamilton, ON. Pain-relieving endodontic care that saves your natural tooth at Hamilton City Dental. Book today.",
    cardBlurb: "Comfortable, tooth-saving treatment that relieves pain.",
    intro:
      "Root canal therapy relieves pain and saves your natural tooth — often avoiding the need for a bridge or implant later on.",
    treatments: [
      "Root canal therapy (endodontics)",
      "Infected tooth treatment",
      "Dental fistula treatment",
      "Tooth-saving restoration",
    ],
    order: 10,
    updated: UPDATED,
  },
  {
    slug: "wisdom-teeth-removal",
    name: "Wisdom Teeth Removal",
    navLabel: "Wisdom Teeth Removal",
    metaTitle: "Wisdom Teeth Removal Hamilton",
    metaDescription:
      "Wisdom teeth removal in Hamilton, ON. Safe, comfortable extractions for impacted or painful wisdom teeth with sedation options at Hamilton City Dental.",
    cardBlurb: "Safe, comfortable extractions with sedation options.",
    intro:
      "If your wisdom teeth are causing pain or are hard to keep clean, removal may be recommended. We perform safe, comfortable extractions with sedation options.",
    treatments: [
      "Wisdom tooth extraction",
      "Impacted wisdom tooth removal",
      "Local anesthesia",
      "Sedation options",
    ],
    order: 11,
    updated: UPDATED,
  },
];

/**
 * Additional treatments the practice performs that do NOT have a dedicated
 * legacy URL (so no standalone page → no orphan/thin pages). Surface these
 * within the relevant service page and/or an "Other services" block on the
 * /services hub. `relatedSlug` points to the closest service page.
 */
export type AdditionalService = {
  name: string;
  description: string;
  relatedSlug: string;
};

export const additionalServices: AdditionalService[] = [
  {
    name: "Dentures",
    description:
      "Custom full and partial dentures — including implant-retained options — crafted and fitted by our in-house denturist.",
    relatedSlug: "implants",
  },
  {
    name: "Sedation Dentistry",
    description:
      "Oral sedation options to help anxious patients stay relaxed and comfortable during treatment.",
    relatedSlug: "wisdom-teeth-removal",
  },
  {
    name: "Gum Grafting",
    description:
      "Soft-tissue gum grafting to treat gum recession and protect exposed tooth roots.",
    relatedSlug: "dental-hygiene",
  },
  {
    name: "Tooth Extractions",
    description:
      "Gentle removal of severely damaged, decayed or problematic teeth when they can't be saved.",
    relatedSlug: "emergency-dentistry",
  },
];

/** Services sorted for display. */
export const servicesByOrder = [...services].sort((a, b) => a.order - b.order);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceSlugs = services.map((s) => s.slug);
