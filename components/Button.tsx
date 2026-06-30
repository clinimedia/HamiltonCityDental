import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline-light";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-brand-ink hover:bg-brand-hover",
  secondary: "bg-brand-ink text-brand-inverse hover:bg-brand-ink-soft",
  ghost: "border border-brand-ink/15 bg-transparent text-brand-ink hover:bg-brand-inverse",
  // For use on dark/ink surfaces, where `secondary` would blend in.
  "outline-light": "border border-white/40 bg-transparent text-brand-inverse hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3.5 text-base sm:text-lg",
};

type OwnProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type AnchorProps = OwnProps & { href: string; external?: boolean } & Omit<
    React.ComponentPropsWithoutRef<"a">,
    keyof OwnProps | "href"
  >;

type NativeButtonProps = OwnProps & { href?: undefined } & Omit<
    React.ComponentPropsWithoutRef<"button">,
    keyof OwnProps
  >;

type ButtonProps = AnchorProps | NativeButtonProps;

/**
 * Brand button. Renders a next/link when `href` is internal, a plain <a> for
 * external/tel:/mailto: links, or a native <button> otherwise.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.href !== undefined) {
    // Anchor branch — strip own props, keep the rest as anchor attributes.
    const { variant: _v, size: _s, className: _c, children: _ch, href, external, ...rest } =
      props as AnchorProps;
    const isExternal = external || /^(https?:|tel:|mailto:)/.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  // Native button branch.
  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } =
    props as NativeButtonProps;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
