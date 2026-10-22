"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

import LanguageSwitcher from "./LanguageSwitcher";

const navLinks = [
  { href: "/passport-photo-online", label: "Create Photo" },
  { href: "/visa-photo-validator", label: "Free Validator" },
  { href: "/visa-checklist", label: "Visa Checklists" },
  { href: "/passport-photos", label: "Passport Sizes" },
  { href: "/blog", label: "Blog & Guides" },
  { href: "/support", label: "Support" },
];

const checkerLinks = [
  { href: "/visa-photo-validator", label: "Visa Photo Checker", desc: "Check visa photos for 60+ countries" },
  { href: "/passport-photo-checker", label: "Passport Photo Checker", desc: "Global biometric passport photo validation" },
  { href: "/us-check-photo-green-card", label: "Green Card Photo Checker", desc: "USCIS Form I-485 & DV 2×2 in photo test" },
  { href: "/australian-passport-photo-checker", label: "Australian Photo Checker", desc: "DFAT & APO 35×45mm compliance checker" },
  { href: "/diversity-visa-lottery-photo-checker", label: "DV Lottery Photo Checker", desc: "Green card lottery 600×600 px photo test" },
  { href: "/uk-passport-photo-checker-online-free", label: "UK Photo Checker", desc: "HMPO 35×45mm compliance checker" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname?.startsWith(`${href}/`);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
    
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-gray-200/80 shadow-md shadow-black/[0.04]"
            : "bg-white border-b border-gray-100"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[60px] lg:h-[66px]">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
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

            {/* ── Desktop nav links ── */}
            <div className="hidden lg:flex items-center justify-center gap-0.5 xl:gap-1 flex-1 mx-6">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                const linkClass = `relative px-2.5 xl:px-3.5 py-2 text-sm font-medium rounded-full transition-colors duration-150 whitespace-nowrap flex items-center gap-1 ${
                  active
                    ? "text-lime-800 bg-lime-50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                }`;

                if (link.href !== "/visa-photo-validator") {
                  return (
                    <Link key={link.href} href={link.href} prefetch={true} aria-current={active ? "page" : undefined} className={linkClass}>
                      {link.label}
                    </Link>
                  );
                }

                const checkerActive = active || checkerLinks.some((c) => isActive(c.href));
                return (
                  <div key={link.href} className="relative group">
                    <Link
                      href={link.href}
                      prefetch={true}
                      aria-haspopup="true"
                      aria-current={active ? "page" : undefined}
                      className={`${linkClass} ${checkerActive && !active ? "!text-lime-800" : ""}`}
                    >
                      {link.label}
                      <svg className="w-3.5 h-3.5 opacity-60 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>

                    {/* Mega menu */}
                    <div className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-200 absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[600px] z-50">
                      <div className="bg-white rounded-2xl shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/5 overflow-hidden">
                        <div className="grid grid-cols-2 gap-1 p-3">
                          {checkerLinks.map((item) => {
                            const itemActive = isActive(item.href);
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                prefetch={true}
                                className={`flex items-start gap-3 p-3 rounded-xl transition-colors group/item ${itemActive ? "bg-lime-50" : "hover:bg-slate-50"}`}
                              >
                                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-lime-100 text-lime-700 group-hover/item:bg-lime-600 group-hover/item:text-white transition-colors">
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </span>
                                <span className="flex flex-col min-w-0">
                                  <span className="text-sm font-semibold text-slate-800 group-hover/item:text-lime-700 transition-colors">
                                    {item.label}
                                  </span>
                                  <span className="text-xs text-slate-500 leading-snug mt-0.5">
                                    {item.desc}
                                  </span>
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                        <div className="flex items-center justify-between gap-4 bg-slate-50 border-t border-slate-100 px-5 py-3">
                          <span className="text-xs text-slate-500">Free instant checks against official government specs</span>
                          <Link href="/passport-photo-online" prefetch={true} className="text-xs font-bold text-lime-700 hover:text-lime-800 whitespace-nowrap">
                            Create a compliant photo →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Desktop CTA ── */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <LanguageSwitcher />
              {status === "loading" ? (
                <div className="w-36 h-10 bg-slate-100 animate-pulse rounded-full" />
              ) : (
                <Link
                  href="/passport-photo-online"
                  prefetch={true}
                  className={`text-white rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-150 shadow-sm hover:shadow-md whitespace-nowrap ${
                    session
                      ? "bg-slate-900 hover:bg-slate-800 active:bg-slate-950 hover:shadow-black/10"
                      : "bg-lime-700 hover:bg-lime-800 active:bg-lime-900 shadow-lime-700/25 hover:shadow-lime-700/30"
                  }`}
                >
                  {session ? (
                    "New Photo →"
                  ) : (
                    <>
                      <span className="xl:hidden">Create Passport Photo</span>
                      <span className="hidden xl:inline">Create Passport Photo</span>
                    </>
                  )}
                </Link>
              )}
            </div>

            {/* ── Mobile right: CTA + hamburger ── */}
            <div className="flex lg:hidden items-center gap-2">
              {/* Compact CTA on mobile */}
              {status === "loading" && (
                <div className="w-[84px] h-[32px] bg-slate-100 animate-pulse rounded-lg" />
              )}
              {status !== "loading" && !session && (
                <Link
                  href="/passport-photo-online"
                  className="bg-lime-700 text-white hover:bg-lime-800 rounded-lg px-3.5 py-2 text-xs font-bold transition-colors shadow-sm shadow-lime-600/20"
                >
                  Create Photo
                </Link>
              )}
              {status !== "loading" && session && (
                <Link
                  href="/passport-photo-online"
                  className="bg-slate-900 text-white hover:bg-slate-800 rounded-lg px-3.5 py-2 text-xs font-bold transition-colors shadow-sm"
                >
                  New Photo
                </Link>
              )}

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-gray-100 active:bg-gray-200 transition-all duration-150"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  {mobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* ── Mobile menu ── */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              mobileOpen ? "max-h-[640px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="border-t border-gray-100 pt-3 pb-5 flex flex-col gap-0.5">
              {navLinks.map((link) => (
                link.href === "/visa-photo-validator" ? (
                  <div key={link.href} className="flex flex-col">
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-700 hover:text-lime-700 hover:bg-lime-50 rounded-xl transition-all duration-150"
                    >
                      <span>{link.label}</span>
                      <span className="text-[10px] font-bold text-lime-700 bg-lime-100/80 px-2 py-0.5 rounded-full">6 Checkers</span>
                    </Link>
                    <div className="pl-4 pr-2 pb-2 grid grid-cols-2 gap-1.5">
                      {checkerLinks.slice(1).map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-lime-700 hover:bg-lime-50 rounded-lg transition-colors border border-slate-100 bg-slate-50/60"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:text-lime-700 hover:bg-lime-50 rounded-xl transition-all duration-150"
                  >
                    {link.label}
                  </Link>
                )
              ))}

              <div className="h-px bg-gray-100 my-2 mx-1" />

              <Link
                href="/faq"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-500 hover:text-lime-700 hover:bg-lime-50 rounded-xl transition-all duration-150"
              >
                FAQ
              </Link>

              {/* Auth section on mobile */}
              {status !== "loading" && (
                <div className="mt-2 mx-1 flex flex-col gap-2">
                  <div className="flex justify-center mb-2">
                    <LanguageSwitcher placement="up" />
                  </div>
                  {session ? (
                    <>
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileOpen(false)}
                        className="text-center py-2.5 text-sm font-semibold text-slate-700 hover:text-lime-700 transition-colors"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => { setMobileOpen(false); signOut({ callbackUrl: "/login" }); }}
                        className="py-2.5 text-sm font-medium text-slate-400 hover:text-slate-700 transition-colors"
                      >
                        Log out
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center justify-center gap-4 py-1">
                      <Link
                        href="/login"
                        onClick={() => setMobileOpen(false)}
                        className="text-sm font-semibold text-slate-600 hover:text-lime-700 transition-colors"
                      >
                        Log in
                      </Link>
                      <span className="text-slate-200 text-lg">·</span>
                      <Link
                        href="/signup"
                        onClick={() => setMobileOpen(false)}
                        className="text-sm font-semibold text-slate-600 hover:text-lime-700 transition-colors"
                      >
                        Sign up
                      </Link>
                    </div>
                  )}

                  <Link
                    href="/passport-photo-online"
                    onClick={() => setMobileOpen(false)}
                    className="bg-lime-600 text-white text-center hover:bg-lime-700 active:bg-lime-800 rounded-xl px-5 py-3 text-sm font-bold transition-all shadow-sm shadow-lime-600/25"
                  >
                    Get My Approved Photo →
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