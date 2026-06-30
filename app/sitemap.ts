import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { services } from "@/lib/services";
import { posts } from "@/lib/posts";

/**
 * XML sitemap of every INDEXABLE, canonical, 200-status URL. Excludes
 * noindex/utility routes and non-canonical variants (legacy URLs are 301'd in
 * next.config / middleware, so they are not listed here).
 */
const MIGRATION_DATE = "2026-06-30";

function url(path: string): string {
  return new URL(path, SITE.url).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: MIGRATION_DATE, changeFrequency: "weekly", priority: 1 },
    { url: url("/services"), lastModified: MIGRATION_DATE, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/about-us"), lastModified: MIGRATION_DATE, changeFrequency: "monthly", priority: 0.7 },
    { url: url("/about-us/meet-the-team"), lastModified: MIGRATION_DATE, changeFrequency: "monthly", priority: 0.6 },
    { url: url("/new-patient"), lastModified: MIGRATION_DATE, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/faq"), lastModified: MIGRATION_DATE, changeFrequency: "monthly", priority: 0.6 },
    { url: url("/book-appointment"), lastModified: MIGRATION_DATE, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/blog"), lastModified: MIGRATION_DATE, changeFrequency: "weekly", priority: 0.7 },
    { url: url("/privacy-policy"), lastModified: MIGRATION_DATE, changeFrequency: "yearly", priority: 0.2 },
    { url: url("/terms-of-service"), lastModified: MIGRATION_DATE, changeFrequency: "yearly", priority: 0.2 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: url(`/services/${s.slug}`),
    lastModified: s.updated,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: url(`/blog/${p.slug}`),
    lastModified: p.updated,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...blogPages];
}
