import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const DEFAULT_OG_IMAGE = "/assets/og-hamilton-city-dental.jpg";

type BuildMetadataArgs = {
  /** Page title WITHOUT the brand suffix (the layout template appends "| …"). */
  title: string;
  /** 150–160 char meta description, unique per page. */
  description: string;
  /** Site-absolute path beginning with "/", e.g. "/services/implants". */
  path: string;
  /** Optional OG/Twitter image path (defaults to the site OG image). */
  image?: string;
  /** Set true to keep a page out of the index (e.g. /thank-you). */
  noindex?: boolean;
};

/**
 * Single helper every page uses for metadata. Produces a self-referencing
 * canonical plus matching OpenGraph + Twitter tags so NAP/branding stay
 * consistent across the whole site.
 */
export function buildMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  noindex = false,
}: BuildMetadataArgs): Metadata {
  const canonical = path; // metadataBase (layout) resolves this to an absolute URL.
  const ogImageUrl = new URL(image, SITE.url).toString();

  return {
    title,
    description,
    alternates: { canonical },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title: `${title} | ${SITE.shortName}`,
      description,
      url: new URL(path, SITE.url).toString(),
      locale: "en_CA",
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE.shortName}`,
      description,
      images: [ogImageUrl],
    },
  };
}
