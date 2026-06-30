"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { ChevronDownIcon, MenuIcon, CloseIcon } from "@/components/Icons";
import { images } from "@/lib/images";
import { servicesByOrder } from "@/lib/services";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/cn";

type DropItem = { label: string; href: string };

const servicesMenu: DropItem[] = [
  ...servicesByOrder.map((s) => ({ label: s.navLabel, href: `/services/${s.slug}` })),
  { label: "View all services", href: "/services" },
];

const aboutMenu: DropItem[] = [
  { label: "About Us", href: "/about-us" },
  { label: "Meet the Team", href: "/about-us/meet-the-team" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Close everything on route change.
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  // Close dropdowns on outside click + Escape.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header ref={navRef} className="sticky top-0 z-50 border-b border-brand-ink/10 bg-white/95 backdrop-blur">
      <Container className="flex items-center justify-between gap-4 py-3">
        {/* Logo (the wordmark is part of the logo image, so no adjacent text) */}
        <Link href="/" className="flex items-center" aria-label={`${SITE.name} — home`}>
          <Image
            src={images.logo.src}
            alt={`${SITE.name} logo`}
            width={images.logo.width}
            height={images.logo.height}
            priority
            sizes="96px"
            className="h-16 w-auto object-contain sm:h-20"
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          <NavLink href="/" active={isActive("/") && pathname === "/"}>Home</NavLink>

          <Dropdown
            label="Services"
            href="/services"
            items={servicesMenu}
            open={openMenu === "services"}
            onToggle={() => setOpenMenu(openMenu === "services" ? null : "services")}
            onOpen={() => setOpenMenu("services")}
            active={isActive("/services")}
          />
          <Dropdown
            label="About Us"
            href="/about-us"
            items={aboutMenu}
            open={openMenu === "about"}
            onToggle={() => setOpenMenu(openMenu === "about" ? null : "about")}
            onOpen={() => setOpenMenu("about")}
            active={isActive("/about")}
          />

          <NavLink href="/blog" active={isActive("/blog")}>Blog</NavLink>
          <NavLink href="/faq" active={isActive("/faq")}>FAQ</NavLink>
          <NavLink href="/new-patient" active={isActive("/new-patient")}>New Patient</NavLink>
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <Button href="/book-appointment" className="hidden sm:inline-flex">
            Book Appointment
          </Button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-brand-ink lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="mobile-menu" className="border-t border-brand-ink/10 bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            <MobileLink href="/">Home</MobileLink>
            <MobileGroup label="Services" items={servicesMenu} />
            <MobileGroup label="About Us" items={aboutMenu} />
            <MobileLink href="/blog">Blog</MobileLink>
            <MobileLink href="/faq">FAQ</MobileLink>
            <MobileLink href="/new-patient">New Patient</MobileLink>
            <Button href="/book-appointment" className="mt-3 w-full">Book Appointment</Button>
          </Container>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, active, children }: { href: string; active?: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-brand-inverse",
        active ? "text-brand-ink" : "text-brand-ink/80"
      )}
    >
      {children}
    </Link>
  );
}

function Dropdown({
  label,
  href,
  items,
  open,
  onToggle,
  onOpen,
  active,
}: {
  label: string;
  href?: string;
  items: DropItem[];
  open: boolean;
  onToggle: () => void;
  onOpen: () => void;
  active?: boolean;
}) {
  const triggerCls = cn(
    "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-brand-inverse",
    active ? "text-brand-ink" : "text-brand-ink/80"
  );
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={() => open && onToggle()} onFocus={onOpen}>
      {href ? (
        // Clicking the label navigates to the section page; the caret + hover/focus open the menu.
        <Link href={href} className={triggerCls} aria-haspopup="true" aria-expanded={open}>
          {label}
          <ChevronDownIcon width={16} height={16} className={cn("transition-transform", open && "rotate-180")} aria-hidden />
        </Link>
      ) : (
        <button type="button" aria-haspopup="true" aria-expanded={open} onClick={onToggle} className={triggerCls}>
          {label}
          <ChevronDownIcon width={16} height={16} className={cn("transition-transform", open && "rotate-180")} />
        </button>
      )}
      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full z-50 mt-1 min-w-[16rem] rounded-xl border border-brand-ink/10 bg-white p-2 shadow-xl"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              className="block rounded-lg px-3 py-2 text-sm text-brand-ink/80 hover:bg-brand-inverse hover:text-brand-ink"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="rounded-md px-2 py-2.5 text-base font-medium text-brand-ink hover:bg-brand-inverse">
      {children}
    </Link>
  );
}

function MobileGroup({ label, items }: { label: string; items: DropItem[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-md px-2 py-2.5 text-base font-medium text-brand-ink hover:bg-brand-inverse"
      >
        {label}
        <ChevronDownIcon width={18} height={18} className={cn("transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="ml-3 flex flex-col border-l border-brand-ink/10 pl-3">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-md px-2 py-2 text-sm text-brand-ink/80 hover:bg-brand-inverse">
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
