import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export type Crumb = { name: string; href: string };

/**
 * Breadcrumb trail used on services + blog pages. Renders an accessible <nav>
 * with descriptive anchors and emits matching BreadcrumbList JSON-LD. Always
 * starts at Home; the final crumb is the current page (not linked).
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ name: "Home", href: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-brand-ink/60">
        {trail.map((c, i) => {
          const isLast = i === trail.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className="font-medium text-brand-ink">
                  {c.name}
                </span>
              ) : (
                <Link href={c.href} className="hover:text-brand-ink hover:underline">
                  {c.name}
                </Link>
              )}
              {!isLast && <span aria-hidden className="text-brand-ink/30">/</span>}
            </li>
          );
        })}
      </ol>
      <JsonLd data={breadcrumbSchema(trail.map((c) => ({ name: c.name, path: c.href })))} />
    </nav>
  );
}
