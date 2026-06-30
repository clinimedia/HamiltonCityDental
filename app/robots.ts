import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * Allow all crawlers full access (never block CSS/JS), disallow only private
 * API + Next internals, and point to the sitemap. Host hint reinforces the
 * single canonical origin.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/thank-you"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
