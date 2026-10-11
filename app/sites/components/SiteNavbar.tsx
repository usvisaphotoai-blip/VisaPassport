"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { SiteLink } from "@/lib/country-sites";

interface SiteNavbarProps {
  basePath: string;
  homeLabel: string;
  navLabel: string;
  menuLabel: string;
  links: SiteLink[];
  cta?: SiteLink;
}

const VISIBLE_LINKS = 4;

const isActive = (pathname: string | null, href: string) =>
  pathname === href || !!pathname?.startsWith(`${href}/`);

export default function SiteNavbar({ basePath, homeLabel, navLabel, menuLabel, links, cta }: SiteNavbarProps) {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();
  const primary = links.slice(0, VISIBLE_LINKS);
  const more = links.slice(VISIBLE_LINKS);
  const moreActive = more.some((l) => isActive(pathname, l.href));

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!moreOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!moreRef.current?.contains(e.target as Node)) setMoreOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMoreOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [moreOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-200/80 shadow-md shadow-black/[0.04]"
          : "bg-white border-b border-gray-100"
      }`}
    >
      <nav aria-label={navLabel} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px] lg:h-[66px]">
          <Link href={basePath} aria-label={homeLabel} className="flex items-center gap-2.5 shrink-0 group">
            <Image
              src="/logo.png"
              alt=""
              width={36}
              height={36}
              priority
              className="w-8 h-8 lg:w-9 lg:h-9 rounded-xl shadow-sm shadow-lime-700/30"
            />
            <span className="text-lg lg:text-xl font-extrabold text-slate-900 tracking-tight group-hover:text-lime-700 transition-colors duration-200">
              PixPassport
            </span>
          </Link>

          <ul className="hidden lg:flex items-center justify-center gap-0.5 xl:gap-1 flex-1 min-w-0 mx-6">
            {primary.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  className={`px-2.5 xl:px-3.5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-150 ${
                    isActive(pathname, link.href) ? "text-lime-800 bg-lime-50" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {more.length > 0 && (
              <li ref={moreRef} className="relative">
                <button
                  type="button"
                  onClick={() => setMoreOpen(!moreOpen)}
                  aria-expanded={moreOpen}
                  aria-haspopup="true"
                  className={`inline-flex items-center gap-1 px-2.5 xl:px-3.5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-150 ${
                    moreActive || moreOpen ? "text-lime-800 bg-lime-50" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  {menuLabel}
                  <svg aria-hidden="true" className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {moreOpen && (
                  <ul className="absolute right-0 top-full mt-3 min-w-60 rounded-2xl bg-white p-2 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/5">
                    {more.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          aria-current={isActive(pathname, link.href) ? "page" : undefined}
                          className={`block px-3 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                            isActive(pathname, link.href) ? "text-lime-800 bg-lime-50" : "text-slate-700 hover:text-lime-700 hover:bg-slate-50"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )}
          </ul>

          <div className="flex items-center gap-2 shrink-0">
            {cta && (
              <Link
                href={cta.href}
                className="hidden sm:inline-flex items-center whitespace-nowrap shrink-0 px-5 py-2.5 rounded-full bg-lime-700 hover:bg-lime-800 active:bg-lime-900 text-white text-sm font-bold transition-all duration-150 shadow-sm shadow-lime-700/25 hover:shadow-md"
              >
                {cta.label}
              </Link>
            )}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="site-mobile-menu"
              aria-label={menuLabel}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-gray-100 active:bg-gray-200 transition-all duration-150"
            >
              <svg aria-hidden="true" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <ul id="site-mobile-menu" className="lg:hidden border-t border-gray-100 pt-3 pb-5 space-y-0.5">
            {[...links, ...(cta ? [cta] : [])].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:text-lime-700 hover:bg-lime-50 transition-all duration-150"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}
