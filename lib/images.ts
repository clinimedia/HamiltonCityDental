/**
 * Canonical image map. Each service has EXACTLY ONE image used as BOTH its hub
 * card AND its page hero — defined once here so the two never drift. All media
 * is self-hosted under /public/assets/images (downloaded from the legacy site,
 * never hotlinked). Dimensions are the true intrinsic pixel sizes (no CLS).
 */

import { blogImages } from "@/lib/blog-images";

export type Img = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const DIR = "/assets/images";

/** Service slug → its single canonical image (hub card === page hero). */
export const serviceImages: Record<string, Img> = {
  "family-dentistry": {
    src: `${DIR}/family-dentistry-hamilton.avif`,
    alt: "Family dentist welcoming a patient for a checkup at Hamilton City Dental in Hamilton, Ontario",
    width: 1500,
    height: 1000,
  },
  "childrens-dentistry": {
    src: `${DIR}/childrens-dentistry-hamilton.avif`,
    alt: "Child smiling during a gentle children's dental checkup at Hamilton City Dental in Hamilton, Ontario",
    width: 1500,
    height: 998,
  },
  "emergency-dentistry": {
    src: `${DIR}/emergency-dentistry-hamilton.avif`,
    alt: "Emergency dentist treating a patient with tooth pain at Hamilton City Dental in Hamilton, Ontario",
    width: 1500,
    height: 1000,
  },
  "dental-hygiene": {
    src: `${DIR}/dental-hygiene-hamilton.avif`,
    alt: "Dental hygienist performing a professional teeth cleaning at Hamilton City Dental in Hamilton, Ontario",
    width: 1500,
    height: 1000,
  },
  "cosmetic-dentistry": {
    src: `${DIR}/cosmetic-dentistry-hamilton.avif`,
    alt: "Patient with a bright, natural smile after cosmetic dentistry at Hamilton City Dental in Hamilton, Ontario",
    width: 1500,
    height: 1000,
  },
  "teeth-whitening": {
    src: `${DIR}/teeth-whitening-hamilton.avif`,
    alt: "Professional teeth whitening treatment for a brighter smile at Hamilton City Dental in Hamilton, Ontario",
    width: 1500,
    height: 1001,
  },
  invisalign: {
    src: `${DIR}/invisalign-hamilton.avif`,
    alt: "Hand holding a clear Invisalign aligner at Hamilton City Dental in Hamilton, Ontario",
    width: 1500,
    height: 1000,
  },
  implants: {
    src: `${DIR}/dental-implants-hamilton.avif`,
    alt: "Dental implant model used to explain tooth replacement at Hamilton City Dental in Hamilton, Ontario",
    width: 1500,
    height: 1000,
  },
  "crown-bridges": {
    src: `${DIR}/crown-bridges-hamilton.avif`,
    alt: "Dental crown and bridge restoration at Hamilton City Dental in Hamilton, Ontario",
    width: 1500,
    height: 1000,
  },
  "root-canal-treatment": {
    src: `${DIR}/root-canal-treatment-hamilton.avif`,
    alt: "Dentist explaining root canal treatment to a patient at Hamilton City Dental in Hamilton, Ontario",
    width: 1500,
    height: 998,
  },
  "wisdom-teeth-removal": {
    src: `${DIR}/wisdom-teeth-removal-hamilton.avif`,
    alt: "Dentist reviewing an X-ray before wisdom teeth removal at Hamilton City Dental in Hamilton, Ontario",
    width: 1500,
    height: 1000,
  },
};

/**
 * Distinct image per blog post. The live blog reuses one shared graphic across
 * most posts; here every post gets a topic-relevant, unique-where-possible image
 * for better UX and image SEO. Defaults to the related service image.
 */
const BLOG_IMAGES: Record<string, () => Img> = {
  "new-year-new-smile-in-hamilton-start-2026-with-better-oral-health-fresh-dental-benefits": () => imagesTeam(),
  "dental-resolutions-that-actually-work-a-hamilton-dentists-guide-to-better-oral-health": () => serviceImages["dental-hygiene"],
  "how-to-use-your-cdcp-benefits-at-hamilton-city-dental-in-2026": () => serviceImages["family-dentistry"],
  "affordable-smile-makeovers-in-hamilton-cdcp-financing-cosmetic-options": () => serviceImages["cosmetic-dentistry"],
  "invisalign-near-me-in-hamilton-what-you-need-to-know-before-starting-treatment": () => serviceImages["invisalign"],
  "professional-teeth-whitening-in-hamilton-brighter-smiles-at-hamilton-city-dental": () => serviceImages["teeth-whitening"],
  "dental-implants-in-hamilton-permanent-tooth-replacement-at-hamilton-city-dental": () => serviceImages["implants"],
  "childrens-dentist-in-hamilton-gentle-pediatric-dental-care-at-hamilton-city-dental": () => serviceImages["childrens-dentistry"],
  "root-canal-hamilton-what-to-expect-hamilton-city-dental": () => serviceImages["root-canal-treatment"],
  "wisdom-teeth-removal-in-hamilton-hamilton-city-dental": () => serviceImages["wisdom-teeth-removal"],
  "one-visit-crowns-in-hamilton": () => serviceImages["crown-bridges"],
  "emergency-dentist-in-hamilton-what-to-do-if-you-have-severe-tooth-pain": () => serviceImages["emergency-dentistry"],
  "tooth-pain-near-me-when-to-see-a-dentist-in-hamilton": () => imagesOffice(),
  "emergency-family-dental-care-in-hamilton": () => imagesClinicInterior(),
  "hamiltons-trusted-family-cosmetic-dentistry": () => imagesHeroBanner(),
  "cdcp-dentist-in-hamilton--how-hamilton-city-dental-makes-dental-care-affordable": () => imagesOffice(),
  "use-your-2025-dental-benefits-before-they-expire-hamilton-city-dentals-year-end-guide": () => imagesClinicInterior(),
  "holiday-dental-care-in-hamilton-keep-your-smile-bright-this-christmas-hamilton-city-dental": () => imagesTeam(),
};

// Lazy getters (defined after `images` below).
function imagesTeam(): Img {
  return { src: images.team.src, alt: images.team.alt, width: images.team.width, height: images.team.height };
}
function imagesOffice(): Img {
  return { src: images.office.src, alt: images.office.alt, width: images.office.width, height: images.office.height };
}
function imagesClinicInterior(): Img {
  return { src: images.clinicInterior.src, alt: images.clinicInterior.alt, width: images.clinicInterior.width, height: images.clinicInterior.height };
}
function imagesHeroBanner(): Img {
  return { src: images.heroBanner.src, alt: images.heroBanner.alt, width: images.heroBanner.width, height: images.heroBanner.height };
}

export function blogImage(slug: string, serviceSlug: string): Img {
  // Prefer the real per-post image downloaded from the live published blog.
  const live = blogImages[slug];
  if (live) return live;
  const fn = BLOG_IMAGES[slug];
  return fn ? fn() : serviceImage(serviceSlug);
}

export function serviceImage(slug: string): Img {
  return (
    serviceImages[slug] ?? {
      src: `${DIR}/dentist-office-hamilton-city-dental.avif`,
      alt: "Hamilton City Dental clinic in Hamilton, Ontario",
      width: 960,
      height: 720,
    }
  );
}

/** Brand + general-purpose imagery. */
export const images = {
  logo: {
    src: `${DIR}/logo-hamilton-city-dental.png`,
    alt: "Hamilton City Dental logo",
    width: 1250,
    height: 1250,
  },
  // Team photo (the dentist + staff group) — used in the homepage story band
  // and as the About Us hero.
  hero: {
    src: `${DIR}/hero-dentist-hamilton.jpg`,
    alt: "The dental team at Hamilton City Dental in Hamilton, Ontario",
    width: 1489,
    height: 921,
  },
  team: {
    src: `${DIR}/hero-dentist-hamilton.jpg`,
    alt: "The friendly dental team at Hamilton City Dental in Hamilton, Ontario",
    width: 1489,
    height: 921,
  },
  office: {
    src: `${DIR}/dentist-office-hamilton-city-dental.avif`,
    alt: "Dentist working with a patient at Hamilton City Dental in downtown Hamilton, Ontario",
    width: 960,
    height: 720,
  },
  // Shared hero banner used across the live service/interior pages.
  heroBanner: {
    src: `${DIR}/hero-banner-hamilton-city-dental.jpg`,
    alt: "A happy family with healthy smiles — Hamilton City Dental in Hamilton, Ontario",
    width: 600,
    height: 600,
  },
  clinicInterior: {
    src: `${DIR}/clinic-interior-hamilton-city-dental.jpg`,
    alt: "Inside Hamilton City Dental, a welcoming dental clinic in downtown Hamilton, Ontario",
    width: 600,
    height: 600,
  },
  newPatient: {
    src: `${DIR}/newpatienthero.png`,
    alt: "New patients welcome at Hamilton City Dental in Hamilton, Ontario",
    width: 1209,
    height: 831,
  },
  blogHero: {
    src: `${DIR}/BlogHero.png`,
    alt: "Dentist and hygienist treating a patient at Hamilton City Dental in Hamilton, Ontario",
    width: 1960,
    height: 1314,
  },
} as const;

/** Original hero background video from the live site (mp4 + webm + poster). */
export const heroVideo = {
  mp4: `/assets/videos/hero-hamilton-city-dental.mp4`,
  webm: `/assets/videos/hero-hamilton-city-dental.webm`,
  poster: `${DIR}/hero-hamilton-city-dental-poster.jpg`,
  width: 1280,
  height: 720,
} as const;
