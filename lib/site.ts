/**
 * SINGLE SOURCE OF TRUTH for NAP, brand, hours and social.
 *
 * Every component, every <Metadata> export and every JSON-LD block must read
 * from this file. NAP (Name / Address / Phone) must be byte-for-byte identical
 * across UI, schema and OpenGraph — do not retype these values anywhere else.
 *
 * Data captured from the existing hamiltoncitydental.ca site (2026-06).
 */

export const SITE = {
  name: "Hamilton City Dental",
  shortName: "Hamilton City Dental",
  legalName: "Hamilton City Dental",
  formerName: "De Benetti Dentistry",
  tagline: "Creating Healthy, Beautiful Smiles for the Whole Family",

  // Canonical origin. The live site serves www; keep ONE convention everywhere.
  url: "https://www.hamiltoncitydental.ca",
  domain: "www.hamiltoncitydental.ca",

  // Location
  city: "Hamilton",
  citySlug: "hamilton",
  province: "Ontario",
  provinceCode: "ON",
  country: "Canada",
  countryCode: "CA",
  neighbourhood: "Corktown",
  nearbyAreas: [
    "Stoney Creek",
    "Dundas",
    "Ancaster",
    "Waterdown",
    "Binbrook",
    "Westdale",
    "Stinson",
    "Durand",
  ],

  // Address (NAP)
  address: {
    street: "182 Jackson St E",
    city: "Hamilton",
    region: "ON",
    postalCode: "L8N 1L4",
    country: "CA",
  },
  // Geo for LocalBusiness schema / map (182 Jackson St E, Hamilton).
  geo: {
    latitude: 43.2538,
    longitude: -79.8612,
  },

  // Contact (NAP)
  phone: "(289) 778-3717",
  phoneE164: "+12897783717",
  phoneLegacy: "905-526-1322",
  email: "info@hamiltoncitydental.ca",

  // Patient intake
  acceptingNewPatients: true,
  billing: {
    cdcp: true, // Canadian Dental Care Plan accepted
    cdcpAssistsWithApplication: false,
    directBilling: true,
    financing: "Direct billing to most insurers; CDCP accepted.",
  },

  // Hours — single source for UI + OpeningHoursSpecification schema.
  // 24h "HH:MM"; null = closed.
  hours: [
    { day: "Monday", short: "Mon", code: "Mo", open: "08:00", close: "18:30" },
    { day: "Tuesday", short: "Tue", code: "Tu", open: "08:00", close: "18:30" },
    { day: "Wednesday", short: "Wed", code: "We", open: "08:00", close: "17:00" },
    { day: "Thursday", short: "Thu", code: "Th", open: "08:00", close: "17:00" },
    { day: "Friday", short: "Fri", code: "Fr", open: null, close: null },
    { day: "Saturday", short: "Sat", code: "Sa", open: null, close: null },
    { day: "Sunday", short: "Sun", code: "Su", open: null, close: null },
  ],

  // Social profiles (used in footer + schema sameAs). Fill in real URLs when confirmed.
  social: {
    facebook: "https://www.facebook.com/hamiltoncitydental",
    instagram: "https://www.instagram.com/hamiltoncitydental",
  },

  // Brand tokens (mirrored in tailwind.config.ts + globals.css).
  brand: {
    accent: "#74d5ff",
    accentHover: "#4bc9ff",
    ink: "#0d0f13",
    inkSoft: "#1d1f24",
    inverse: "#f0f7ff",
    font: "Jost",
  },
} as const;

export type Site = typeof SITE;

/** Ordered list of social profile URLs for schema.org `sameAs`. */
export const socialUrls: string[] = Object.values(SITE.social).filter(Boolean);

/** Human-readable address line: "182 Jackson St E, Hamilton, ON L8N 1L4". */
export const formattedAddress = `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postalCode}`;

/** Pretty hours, grouping consecutive days that share the same open/close. */
export function formattedHours(): { label: string; value: string }[] {
  const fmt = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    const period = h >= 12 ? "PM" : "AM";
    const hr = h % 12 === 0 ? 12 : h % 12;
    return m === 0 ? `${hr} ${period}` : `${hr}:${String(m).padStart(2, "0")} ${period}`;
  };

  const rows: { label: string; value: string }[] = [];
  let i = 0;
  while (i < SITE.hours.length) {
    const cur = SITE.hours[i];
    const value = cur.open && cur.close ? `${fmt(cur.open)} – ${fmt(cur.close)}` : "Closed";
    let j = i;
    while (
      j + 1 < SITE.hours.length &&
      SITE.hours[j + 1].open === cur.open &&
      SITE.hours[j + 1].close === cur.close
    ) {
      j++;
    }
    const label = i === j ? cur.short : `${cur.short} – ${SITE.hours[j].short}`;
    rows.push({ label, value });
    i = j + 1;
  }
  return rows;
}
