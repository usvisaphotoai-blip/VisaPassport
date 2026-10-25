import Link from "next/link";
import React from "react";

export default function Footer() {
  const links = [
    {
      title: "Passport & Visa Photos",
      items: [
        { label: "passport photo for indian passport", href: "/indian-passport-size-photograph" },
        { label: "Singapore Passport Photo", href: "/singapore-passport-photo" },
        { label: "India Passport Photo", href: "/india-passport-photo-editor" },
        { label: "Canada Passport Photo", href: "/ca" },
        { label: "UK Passport Photo", href: "/uk" },
        { label: "US Passport Photo", href: "/us-passport-photo-editor" },
        { label: "US Visa Photo", href: "/us-visa-photo-editor" },
        { label: "Australia Passport Photo", href: "/australia-passport-photo-editor" },
        { label: "Germany Visa Photo", href: "/germany-visa-photo-editor" },
        { label: "France Passport Photo", href: "/france-passport-photo-editor" },
        { label: "Canada Visa Size Photo", href: "/ca" },
      ],
    },
    {
      title: "Compliance Checkers",
      items: [
        { label: "Visa Photo Checker", href: "/visa-photo-validator" },
        { label: "Passport Photo Checker", href: "/passport-photo-checker" },
        { label: "Green Card Photo Checker", href: "/us-check-photo-green-card" },
        { label: "Australian Passport Photo Checker", href: "/australian-passport-photo-checker" },
        { label: "DV Lottery Photo Checker", href: "/diversity-visa-lottery-photo-checker" },
        { label: "UK Passport Photo Checker", href: "/uk-passport-photo-checker-online-free" },
        { label: "Digital US Visa Specs 2026", href: "/digital-visa-photo-specs-2026" },
      ],
    },
    {
      title: "Photo Tools",
      items: [
        { label: "Create Photo Online", href: "/passport-photo-online" },
        { label: "Print Template Generator", href: "/passport-photo-print-template-generator" },
        { label: "4x6 Passport Photo Template", href: "/passport-photo-template-4x6" },
        { label: "Passport Size Photo Converter", href: "/in/photo-passport-size-converter" },
        { label: "Resize Singapore Photo", href: "/resize-passport-photo-singapore" },
        { label: "Singapore ICA Photo", href: "/singapore-ica-photo" },
        { label: "Driving Licence Photo", href: "/driving-licence-photograph" },
        { label: "USA Driver License Editor", href: "/usa-driver-license-photo-editor" },
      ],
    },
    {
      title: "Guides & Resources",
      items: [
        { label: "Passport Photo Guides", href: "/guides" },
        { label: "How to Print Passport Photos", href: "/how-to-print-passport-photos" },
        { label: "Blog & Guides", href: "/blog" },
        { label: "Passport Photo Directory", href: "/passport-photos" },
        { label: "Visa Photo Directory", href: "/visa-photo" },
        { label: "Visa Checklists 2026", href: "/visa-checklist" },
        { label: "Canada Visa Checklist", href: "/visa-checklist/canada" },
        { label: "US Visa Checklist", href: "/visa-checklist/united-states" },
        { label: "UK Visa Checklist", href: "/visa-checklist/united-kingdom" },
      ],
    },
    {
      title: "Company",
      items: [
        { label: "About Us", href: "/about" },
        { label: "Contact Us", href: "/contact" },
        { label: "Support Hub", href: "/support" },
        { label: "FAQ", href: "/faq" },
        { label: "Data Security", href: "/data-security" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Refund Policy", href: "/refund-policy" },
      ],
    },
  ];

  const trustPoints = ["100% Private", "Auto-deleted in 24h", "50+ Countries", "Instant Compliance Check"];

  return (
    <footer className="relative bg-slate-950 text-slate-300 mt-20 overflow-hidden [&_a:focus-visible]:outline-none [&_a:focus-visible]:ring-2 [&_a:focus-visible]:ring-lime-400 [&_a:focus-visible]:ring-offset-2 [&_a:focus-visible]:ring-offset-slate-950">
      {/* Accent line */}
      <div aria-hidden="true" className="h-1 bg-gradient-to-r from-lime-500 via-emerald-400 to-lime-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA band */}
        <div className="relative -mb-px mt-12 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-900/40 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div aria-hidden="true" className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-lime-500/10 blur-3xl" />
          <div className="relative">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Get a compliant passport photo in seconds
            </h2>
            <p className="mt-1.5 text-sm text-slate-400 max-w-xl">
              Upload a selfie, we crop, whiten the background and check it against official rules. Free validation for every country.
            </p>
          </div>
          <div className="relative flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/passport-photo-online"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-lime-500 px-5 py-3 text-sm font-black text-slate-950 shadow-lg shadow-lime-500/20 hover:bg-lime-400 transition-colors"
            >
              Create my photo <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/passport-photo-checker"
              className="inline-flex items-center justify-center rounded-xl border border-slate-500 px-5 py-3 text-sm font-bold text-slate-200 hover:border-lime-500 hover:text-white transition-colors"
            >
              Check a photo free
            </Link>
          </div>
        </div>

        {/* Brand + links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-10 py-14">
          <div className="lg:col-span-3">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group hover:opacity-90">
              <div className="w-9 h-9 bg-lime-500 rounded-lg flex items-center justify-center transform group-hover:-rotate-12 transition-transform shadow-lg shadow-lime-500/20">
                <svg className="w-5 h-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Pix<span className="text-lime-500">Passport</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm mb-5 leading-relaxed">
              Your global companion for secure, biometric passport and visa photos. We ensure 100% compliance with official government guidelines for 50+ countries.
            </p>
            <ul className="flex flex-wrap gap-2">
              {trustPoints.map((point) => (
                <li
                  key={point}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-[11px] font-bold text-slate-300"
                >
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-lime-500" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-9 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
          {links.map((section) => (
            <nav key={section.title} aria-label={section.title}>
              <h3 className="text-xs font-black text-white uppercase tracking-wider mb-4">{section.title}</h3>
              <ul className="space-y-2.5">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-400 hover:text-lime-400 transition-colors leading-snug"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          </div>
        </div>

        {/* Featured badges */}
        <div className="flex flex-wrap items-center gap-4 border-t border-slate-800/80 py-6">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Featured on</span>
          <a href="https://startupfa.me/s/pixpassport?utm_source=www.pixpassport.com" target="_blank" rel="noopener noreferrer" className="inline-block rounded">
            <img src="https://startupfa.me/badges/featured-badge-small.webp" alt="PixPassport - Featured on Startup Fame" width="224" height="36" loading="lazy" />
          </a>
          <a href="https://findly.tools/pixpassport?utm_source=pixpassport" target="_blank" rel="noopener noreferrer" className="inline-block rounded">
            <img src="/findly-tools-badge-light.svg" alt="Featured on Findly.tools" width="140" height="44" loading="lazy" />
          </a>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800/80 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} PixPassport. All rights reserved.</p>
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-center text-center">
            <p>Disclaimer: This site is not affiliated with any government agency.</p>
            <span dangerouslySetInnerHTML={{ __html: '<!--email_off--><a href="mailto:support@pixpassport.com" rel="nofollow" class="font-semibold text-slate-300 hover:text-lime-400 transition-colors">support@pixpassport.com</a><!--/email_off-->' }} />
          </div>
        </div>
      </div>
    </footer>
  );
}
