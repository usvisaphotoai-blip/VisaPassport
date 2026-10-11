"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { de } from "../translations";
import LanguageSwitcher from "../../components/LanguageSwitcher";

const navLinks = [
  { href: "/de/biometrisches-passbild", label: de.nav.passportPhoto },
  { href: "/de/passfoto-selber-machen", label: de.nav.diyPhoto },
  { href: "/de/fuehrerschein-foto", label: de.nav.drivingLicence },
  { href: "/de/visum-foto", label: de.nav.visaPhoto },
  { href: "/de/bewerbungsfoto", label: de.nav.cvPhoto },
  { href: "/de/guides", label: de.nav.guides },
];

const isActive = (pathname: string | null, href: string) =>
  pathname === href || !!pathname?.startsWith(`${href}/`);

export default function NavbarDe() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur border-b-2 border-slate-200"
            : "bg-white border-b-2 border-slate-100"
        }`}
      >
        <nav aria-label={de.nav.mainNav} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[60px] lg:h-[66px]">
            <Link href="/de" aria-label="PixPassport – Startseite" className="flex items-center gap-2.5 shrink-0 group">
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

            <div className="hidden lg:flex items-center gap-0.5 flex-1 ml-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  className={`relative px-3.5 py-2 text-sm font-medium rounded-lg hover:bg-lime-50/80 transition-all duration-150 whitespace-nowrap group ${
                    isActive(pathname, link.href) ? "text-lime-700" : "text-slate-600 hover:text-lime-700"
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-1 left-3.5 right-3.5 h-px bg-lime-500 transition-transform duration-200 origin-left rounded-full ${
                      isActive(pathname, link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <LanguageSwitcher />
              {status === "loading" ? (
                <div className="flex items-center gap-3">
                  <div className="w-14 h-5 bg-slate-100 animate-pulse rounded-md" />
                  <div className="w-36 h-9 bg-slate-100 animate-pulse rounded-lg" />
                </div>
              ) : session ? (
                <>
                  <Link href="/dashboard" prefetch={true} className="text-sm font-semibold text-slate-600 hover:text-lime-700 transition-colors duration-150">
                    {de.nav.dashboard}
                  </Link>
                  <button onClick={() => signOut({ callbackUrl: "/de" })} className="text-sm font-medium text-slate-400 hover:text-slate-700 transition-colors duration-150">
                    {de.nav.logout}
                  </button>
                  <Link href="/de/passbild-online" prefetch={true} className="bg-lime-700 text-white hover:bg-lime-800 rounded-lg px-5 py-2.5 text-sm font-bold transition-colors">
                    {de.nav.newPhoto} →
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/de/passbild-online" prefetch={true} className="bg-lime-700 text-white hover:bg-lime-800 rounded-lg px-5 py-2.5 text-sm font-bold transition-colors whitespace-nowrap">
                    {de.nav.getPhoto} →
                  </Link>
                </>
              )}
            </div>

            <div className="flex lg:hidden items-center gap-2">
              {status !== "loading" && !session && (
                <Link href="/de/passbild-online" className="bg-lime-700 text-white hover:bg-lime-800 rounded-lg px-3.5 py-2 text-xs font-bold transition-colors">
                  {de.nav.getPhoto}
                </Link>
              )}
              {status !== "loading" && session && (
                <Link href="/de/passbild-online" className="bg-lime-700 text-white hover:bg-lime-800 rounded-lg px-3.5 py-2 text-xs font-bold transition-colors">
                  {de.nav.newPhoto}
                </Link>
              )}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-gray-100 active:bg-gray-200 transition-all duration-150"
                aria-label={mobileOpen ? de.nav.closeMenu : de.nav.openMenu}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu-de"
              >
                <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  {mobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          <div
            id="mobile-menu-de"
            inert={!mobileOpen}
            className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="border-t border-gray-100 pt-3 pb-5 flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-all duration-150 hover:bg-lime-50 ${
                    isActive(pathname, link.href) ? "text-lime-700 bg-lime-50" : "text-slate-700 hover:text-lime-700"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-gray-100 my-2 mx-1" />
              {status !== "loading" && (
                <div className="mt-2 mx-1 flex flex-col gap-2">
                  <div className="flex justify-center mb-2">
                    <LanguageSwitcher />
                  </div>
                  {session ? (
                    <>
                      <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="text-center py-2.5 text-sm font-semibold text-slate-700 hover:text-lime-700 transition-colors">
                        {de.nav.dashboard}
                      </Link>
                      <button onClick={() => { setMobileOpen(false); signOut({ callbackUrl: "/de" }); }} className="py-2.5 text-sm font-medium text-slate-400 hover:text-slate-700 transition-colors">
                        {de.nav.logout}
                      </button>
                    </>
                  ) : null}
                  <Link href="/de/passbild-online" onClick={() => setMobileOpen(false)} className="bg-lime-700 text-white text-center hover:bg-lime-800 rounded-lg px-5 py-3 text-base font-bold transition-colors">
                    {de.buttons.getApprovedPhoto}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
