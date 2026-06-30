import { Container } from "@/components/Container";
import { cn } from "@/lib/cn";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
  className?: string;
  /** Background style. "tint" = pale blue, "ink" = dark brand surface. */
  variant?: "default" | "tint" | "ink";
  /** Optional id for in-page anchor links (descriptive, kebab-case). */
  id?: string;
  /** When false, renders children full-bleed without the inner Container. */
  contained?: boolean;
  as?: React.ElementType;
};

const variants = {
  default: "bg-white text-brand-ink",
  tint: "bg-brand-inverse text-brand-ink",
  ink: "bg-brand-ink text-brand-inverse",
} as const;

/** Vertical-rhythm page section with consistent padding + optional Container. */
export function Section({
  children,
  className,
  variant = "default",
  id,
  contained = true,
  as: Tag = "section",
  ...rest
}: SectionProps) {
  return (
    <Tag id={id} className={cn("py-14 sm:py-20", variants[variant], className)} {...rest}>
      {contained ? <Container>{children}</Container> : children}
    </Tag>
  );
}
