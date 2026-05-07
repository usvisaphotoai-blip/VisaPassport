"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import LiveActivityChip from "./LiveActivityChip";

const navLinks = [
  { href: "/passport-photo-online", label: "Create Photo" },
  { href: "/visa-photo-validator", label: "Free Validator" },
  { href: "/passport-photos", label: "Passport Sizes" },
  { href: "/blog", label: "Blog & Guides" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();

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
      <LiveActivityChip />
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
              <div className="w-8 h-8 lg:w-9 lg:h-9 bg-lime-600 rounded-xl flex items-center justify-center shadow-sm shadow-lime-700/30 group-hover:bg-lime-700 group-hover:shadow-lime-700/40 transition-all duration-200">
                <svg
                  className="w-4 h-4 lg:w-5 lg:h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.8}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <span className="text-lg lg:text-xl font-extrabold text-slate-900 tracking-tight group-hover:text-lime-700 transition-colors duration-200">
                PixPassport
              </span>
            </Link>

            {/* ── Desktop nav links ── */}
            <div className="hidden lg:flex items-center gap-0.5 flex-1 ml-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  className="relative px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-lime-700 rounded-lg hover:bg-lime-50/80 transition-all duration-150 whitespace-nowrap group"
                >
                  {link.label}
                  <span className="absolute bottom-1 left-3.5 right-3.5 h-px bg-lime-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
                </Link>
              ))}
            </div>

            {/* ── Desktop CTA ── */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              {status === "loading" ? (
                <div className="flex items-center gap-3">
                  <div className="w-14 h-5 bg-slate-100 animate-pulse rounded-md" />
                  <div className="w-36 h-9 bg-slate-100 animate-pulse rounded-xl" />
                </div>
              ) : session ? (
                <>
                  <Link
                    href="/dashboard"
                    prefetch={true}
                    className="text-sm font-semibold text-slate-600 hover:text-lime-700 transition-colors duration-150"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="text-sm font-medium text-slate-400 hover:text-slate-700 transition-colors duration-150"
                  >
                    Log out
                  </button>
                  <Link
                    href="/passport-photo-online"
                    prefetch={true}
                    className="bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 rounded-xl px-5 py-2.5 text-sm font-bold transition-all duration-150 shadow-sm hover:shadow-md hover:shadow-black/10 hover:-translate-y-px"
                  >
                    New Photo →
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    prefetch={true}
                    className="text-sm font-semibold text-slate-600 hover:text-lime-700 transition-colors duration-150"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    prefetch={true}
                    className="text-sm font-semibold text-slate-600 hover:text-lime-700 transition-colors duration-150 hidden xl:block"
                  >
                    Sign up
                  </Link>
                  <Link
                    href="/passport-photo-online"
                    prefetch={true}
                    className="bg-lime-600 text-white hover:bg-lime-700 active:bg-lime-800 rounded-xl px-5 py-2.5 text-sm font-bold transition-all duration-150 shadow-sm shadow-lime-600/25 hover:shadow-md hover:shadow-lime-600/30 hover:-translate-y-px whitespace-nowrap"
                  >
                    Get Approved Photo →
                  </Link>
                </>
              )}
            </div>

            {/* ── Mobile right: CTA + hamburger ── */}
            <div className="flex lg:hidden items-center gap-2">
              {/* Compact CTA on mobile */}
              {status !== "loading" && !session && (
                <Link
                  href="/passport-photo-online"
                  className="bg-lime-600 text-white hover:bg-lime-700 rounded-lg px-3.5 py-2 text-xs font-bold transition-colors shadow-sm shadow-lime-600/20"
                >
                  Get Photo
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
              mobileOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="border-t border-gray-100 pt-3 pb-5 flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:text-lime-700 hover:bg-lime-50 rounded-xl transition-all duration-150"
                >
                  {link.label}
                </Link>
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