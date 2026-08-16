"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "@/components/logo";
import { IconClose, IconMenu, IconPhone } from "@/components/icons";
import { nav, school, telHref } from "@/lib/school";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Solidify the bar once the hero starts scrolling away.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open. (The menu closes itself on
  // link click — see the nav below — so no route-change effect is needed.)
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled
          ? "border-b border-black/5 bg-white/90 backdrop-blur-md"
          : "bg-white"
      }`}
    >
      <a
        href="#main"
        className="sr-only rounded bg-navy-900 px-4 py-2 text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60]"
      >
        Skip to content
      </a>

      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-navy-50 text-navy-900"
                      : "text-ink/70 hover:bg-navy-50 hover:text-navy-900"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a href={telHref(school.phones[0])} className="btn btn-ghost !px-4 !py-2 text-sm">
            <IconPhone className="size-4" />
            {school.phones[0]}
          </a>
          <Link href="/admissions" className="btn btn-gold !px-5 !py-2.5 text-sm">
            Apply Now
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid size-11 place-items-center rounded-lg text-navy-900 hover:bg-navy-50 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <IconClose className="size-6" /> : <IconMenu className="size-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="lg:hidden">
          <nav
            aria-label="Mobile"
            className="container-page flex flex-col gap-1 border-t border-black/5 pb-6 pt-2"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-lg px-4 py-3 text-base font-medium ${
                  isActive(item.href)
                    ? "bg-navy-50 text-navy-900"
                    : "text-ink/80 hover:bg-navy-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 grid gap-2">
              <a href={telHref(school.phones[0])} className="btn btn-ghost">
                <IconPhone className="size-4" />
                Call {school.phones[0]}
              </a>
              <Link href="/admissions" className="btn btn-gold">
                Apply for Admission
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
