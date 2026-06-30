import { Section } from "@/components/Section";
import { PostCard } from "@/components/PostCard";
import { relatedPosts, postsForService } from "@/lib/links";
import type { Post } from "@/lib/posts";

/**
 * Related blog posts. Pass `postSlug` (on a post page) or `serviceSlug`
 * (on a service page) to surface relevant reading and avoid dead ends.
 */
export function RelatedPosts({
  postSlug,
  serviceSlug,
  heading = "From the Hamilton City Dental blog",
}: {
  postSlug?: string;
  serviceSlug?: string;
  heading?: string;
}) {
  let items: Post[] = [];
  if (postSlug) items = relatedPosts(postSlug, 3);
  else if (serviceSlug) items = postsForService(serviceSlug, 3);
  if (items.length === 0) return null;

  return (
    <Section aria-labelledby="related-posts-heading">
      <h2 id="related-posts-heading" className="text-2xl font-semibold sm:text-3xl">
        {heading}
      </h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </Section>
  );
}
