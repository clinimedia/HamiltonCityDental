import Image from "next/image";
import Link from "next/link";
import { blogImage } from "@/lib/images";
import type { Post } from "@/lib/posts";

/** Blog card. Each post has its own distinct, topic-relevant thumbnail. */
export function PostCard({ post }: { post: Post }) {
  const img = blogImage(post.slug, post.service);
  const href = `/blog/${post.slug}`;
  const date = new Date(`${post.date}T00:00:00`).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-brand-ink/10 bg-white transition-shadow hover:shadow-lg">
      <Link href={href} className="block overflow-hidden" tabIndex={-1} aria-hidden>
        <Image
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 380px"
          className="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <time dateTime={post.date} className="text-xs font-medium uppercase tracking-wide text-brand-ink/50">
          {date}
        </time>
        <h3 className="mt-2 text-base font-semibold leading-snug">
          <Link href={href} className="hover:text-brand-ink/80">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-brand-ink/70">{post.description}</p>
      </div>
    </article>
  );
}
