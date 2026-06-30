/**
 * Internal-linking relationship map. Centralises which services and posts link
 * to each other so there are NO orphan pages and anchors stay keyword-rich.
 * Consumed by <RelatedServices> and <RelatedPosts>.
 */

import { services, servicesByOrder, getService, type Service } from "@/lib/services";
import { posts, postsByDate, type Post } from "@/lib/posts";

/** Curated complementary services (drives RelatedServices). */
const RELATED_SERVICES: Record<string, string[]> = {
  "family-dentistry": ["dental-hygiene", "childrens-dentistry", "emergency-dentistry"],
  "childrens-dentistry": ["family-dentistry", "dental-hygiene", "emergency-dentistry"],
  "emergency-dentistry": ["root-canal-treatment", "wisdom-teeth-removal", "family-dentistry"],
  "dental-hygiene": ["family-dentistry", "teeth-whitening", "cosmetic-dentistry"],
  "cosmetic-dentistry": ["teeth-whitening", "invisalign", "crown-bridges"],
  "teeth-whitening": ["cosmetic-dentistry", "dental-hygiene", "invisalign"],
  invisalign: ["cosmetic-dentistry", "teeth-whitening", "family-dentistry"],
  implants: ["crown-bridges", "wisdom-teeth-removal", "cosmetic-dentistry"],
  "crown-bridges": ["implants", "root-canal-treatment", "cosmetic-dentistry"],
  "root-canal-treatment": ["crown-bridges", "emergency-dentistry", "family-dentistry"],
  "wisdom-teeth-removal": ["emergency-dentistry", "implants", "family-dentistry"],
};

/** Up to `limit` services related to `slug` (curated, with sensible fallback). */
export function relatedServices(slug: string, limit = 3): Service[] {
  const picks = RELATED_SERVICES[slug] ?? [];
  const result = picks.map(getService).filter((s): s is Service => Boolean(s));
  if (result.length < limit) {
    for (const s of servicesByOrder) {
      if (s.slug !== slug && !result.some((r) => r.slug === s.slug)) result.push(s);
      if (result.length >= limit) break;
    }
  }
  return result.slice(0, limit);
}

/** Posts tagged to a given service, newest-first. */
export function postsForService(slug: string, limit = 3): Post[] {
  return postsByDate.filter((p) => p.service === slug).slice(0, limit);
}

/**
 * Related posts for a post: same-service posts first, then newest others.
 * Guarantees `limit` items so no post is a dead end.
 */
export function relatedPosts(postSlug: string, limit = 3): Post[] {
  const current = posts.find((p) => p.slug === postSlug);
  const sameService = postsByDate.filter(
    (p) => p.slug !== postSlug && current && p.service === current.service
  );
  const result = [...sameService];
  if (result.length < limit) {
    for (const p of postsByDate) {
      if (p.slug !== postSlug && !result.some((r) => r.slug === p.slug)) result.push(p);
      if (result.length >= limit) break;
    }
  }
  return result.slice(0, limit);
}

/** The service a post relates to (for "back to service" links). */
export function serviceForPost(post: Post): Service | undefined {
  return getService(post.service);
}

export { services, posts };
