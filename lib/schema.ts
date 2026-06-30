/**
 * JSON-LD builders. Every block mirrors only what is visible on the page and
 * reads NAP/geo/hours from lib/site.ts so structured data never drifts from UI.
 */

import { SITE, formattedAddress, socialUrls } from "@/lib/site";
import { images } from "@/lib/images";
import { services } from "@/lib/services";

const ORG_ID = `${SITE.url}/#dentist`;
const WEBSITE_ID = `${SITE.url}/#website`;

/** OpeningHoursSpecification entries for open days only. */
function openingHours() {
  return SITE.hours
    .filter((h) => h.open && h.close)
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${h.day}`,
      opens: h.open,
      closes: h.close,
    }));
}

/** Dentist (a LocalBusiness subtype) — the primary entity for local SEO. */
export function dentistSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": ORG_ID,
    name: SITE.name,
    alternateName: SITE.formerName,
    url: SITE.url,
    image: new URL(images.hero.src, SITE.url).toString(),
    logo: new URL(images.logo.src, SITE.url).toString(),
    telephone: SITE.phoneE164,
    email: SITE.email,
    priceRange: "$$",
    currenciesAccepted: "CAD",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    areaServed: [SITE.city, ...SITE.nearbyAreas].map((name) => ({
      "@type": "City",
      name,
    })),
    openingHoursSpecification: openingHours(),
    sameAs: socialUrls,
    description: `${SITE.name} is a family, cosmetic and emergency dental clinic at ${formattedAddress}, accepting new patients with CDCP and direct billing.`,
    // Entity signals for answer engines / AI overviews.
    knowsAbout: [
      "Dentistry",
      "Family dentistry",
      "Emergency dentistry",
      "Cosmetic dentistry",
      "Dental implants",
      "Invisalign",
      "Root canal treatment",
      "Teeth whitening",
      "Canadian Dental Care Plan (CDCP)",
    ],
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        url: new URL(`/services/${s.slug}`, SITE.url).toString(),
      },
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Dental services at ${SITE.name}`,
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name },
      })),
    },
  };
}

/** WebSite entity (enables sitelinks search box semantics). */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-CA",
  };
}

/** FAQPage from visible Q&A pairs (text answers must match what's rendered). */
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

/** Service schema for a /services/[slug] page, tied to the clinic as provider. */
export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.name,
    url: new URL(opts.path, SITE.url).toString(),
    image: new URL(opts.image, SITE.url).toString(),
    provider: { "@id": ORG_ID },
    areaServed: [SITE.city, ...SITE.nearbyAreas].map((name) => ({ "@type": "City", name })),
    audience: { "@type": "PeopleAudience", geographicArea: { "@type": "City", name: SITE.city } },
  };
}

/** ItemList of services for the /services hub. */
export function itemListSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: new URL(item.path, SITE.url).toString(),
    })),
  };
}

/** Blog schema for the /blog index. */
export function blogSchema(opts: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: opts.name,
    description: opts.description,
    url: new URL(opts.path, SITE.url).toString(),
    publisher: { "@id": ORG_ID },
    inLanguage: "en-CA",
  };
}

/** BlogPosting schema for a single post. */
export function blogPostingSchema(opts: {
  title: string;
  description: string;
  path: string;
  image: string;
  datePublished: string;
  dateModified: string;
}) {
  const url = new URL(opts.path, SITE.url).toString();
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    image: new URL(opts.image, SITE.url).toString(),
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    inLanguage: "en-CA",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}

/** Generic page schema (AboutPage / ContactPage / WebPage / CollectionPage). */
export function pageSchema(
  type: "AboutPage" | "ContactPage" | "WebPage" | "CollectionPage",
  opts: { name: string; description: string; path: string }
) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name: opts.name,
    description: opts.description,
    url: new URL(opts.path, SITE.url).toString(),
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en-CA",
  };
}

/** Person schema for a dentist on the Meet the Team page. */
export function personSchema(opts: { name: string; jobTitle: string; image?: string; description?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: opts.name,
    jobTitle: opts.jobTitle,
    ...(opts.image ? { image: new URL(opts.image, SITE.url).toString() } : {}),
    ...(opts.description ? { description: opts.description } : {}),
    worksFor: { "@id": ORG_ID },
  };
}

/** BreadcrumbList from ordered {name, url(path)} items. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: new URL(item.path, SITE.url).toString(),
    })),
  };
}
