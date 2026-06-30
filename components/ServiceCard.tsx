import Image from "next/image";
import Link from "next/link";
import { serviceImage } from "@/lib/images";
import { ArrowRightIcon } from "@/components/Icons";
import type { Service } from "@/lib/services";

/**
 * Service hub card. Uses the service's ONE canonical image (same path as its
 * page hero, via lib/images.ts). Descriptive anchor text names the service.
 * `priority` should be true only for above-the-fold cards.
 */
export function ServiceCard({ service, priority = false }: { service: Service; priority?: boolean }) {
  const img = serviceImage(service.slug);
  const href = `/services/${service.slug}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-brand-ink/10 bg-white transition-shadow hover:shadow-lg">
      <Link href={href} className="block overflow-hidden" tabIndex={-1} aria-hidden>
        <Image
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
          className="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold">
          <Link href={href} className="hover:text-brand-ink/80">
            {service.name} in Hamilton
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm text-brand-ink/70">{service.cardBlurb}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-ink">
          Learn about {service.navLabel.toLowerCase()}
          <ArrowRightIcon width={16} height={16} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
