"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import LiveActivityChip from "./LiveActivityChip";

const navLinks = [
  { href: "/tool", label: "Create Photo" },
  { href: "/visa-photo-validator", label: "Free Validator" },
  { href: "/blog", label: "Blog & Guides" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <>
      <LiveActivityChip />
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 bg-lime-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-lime-700">PixPassport</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1 flex-1 ml-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-lime-600 rounded-lg hover:bg-lime-50 transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4 shrink-0">
              {status === "loading" ? (
                <div className="w-20 h-8 bg-slate-100 animate-pulse rounded-lg" />
              ) : session ? (
                <>
                  <Link
                    href="/dashboard"
                    prefetch={true}
                    className="text-sm font-semibold text-slate-700 hover:text-lime-600 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    Log out
                  </button>
                  <Link
                    href="/tool"
                    prefetch={true}
                    className="bg-slate-900 text-white hover:bg-slate-800 rounded-lg px-5 py-2.5 text-sm font-bold transition-colors shadow-sm"
                  >
                    New Photo
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    prefetch={true}
                    className="text-sm font-semibold text-slate-700 hover:text-lime-600 transition-colors"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    prefetch={true}
                    className="text-sm font-semibold text-slate-700 hover:text-lime-600 transition-colors"
                  >
                    Sign up
                  </Link>
                  <Link
                    href="/tool"
                    prefetch={true}
                    className="bg-lime-600 text-white hover:bg-lime-700 rounded-lg px-5 py-2.5 text-sm font-bold transition-colors shadow-sm"
                  >
                    Get My Approved Photo
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="lg:hidden border-t border-gray-100 py-4 animate-fade-in">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-slate-700 hover:text-lime-600 hover:bg-lime-50 rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="my-2 border-gray-100" />
                <Link
                  href="/faq"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-slate-600 hover:text-lime-600 hover:bg-lime-50 rounded-lg transition-colors"
                >
                  FAQ
                </Link>
                <Link
                  href="/tool"
                  onClick={() => setMobileOpen(false)}
                  className="mx-4 mt-2 bg-lime-600 text-white text-center hover:bg-lime-700 rounded-lg px-5 py-3 text-sm font-bold transition-colors"
                >
                  Get My Approved Photo
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
