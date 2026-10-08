"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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

const isActive = (pathname: string | null, href: string) =>
  pathname === href || !!pathname?.startsWith(`${href}/`);

export default function SiteNavbar({ basePath, homeLabel, navLabel, menuLabel, links, cta }: SiteNavbarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b-2 border-slate-100">
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
            <span className="text-lg lg:text-xl font-extrabold text-slate-900 tracking-tight group-hover:text-lime-700 transition-colors">
              PixPassport
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive(pathname, link.href) ? "text-lime-800 bg-lime-50" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {cta && (
              <Link
                href={cta.href}
                className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-lime-700 hover:bg-lime-800 text-white text-sm font-bold transition-colors"
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
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
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
          <ul id="site-mobile-menu" className="lg:hidden pb-4 space-y-1">
            {[...links, ...(cta ? [cta] : [])].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
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
