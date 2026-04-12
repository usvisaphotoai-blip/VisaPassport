import Link from "next/link";
import React from "react";

export default function Footer() {
  const links = [
    {
      title: "Popular Services",
      items: [
        { label: "India Passport Photo", href: "/india-passport-photo-editor" },
        { label: "UK Passport Photo", href: "/uk-passport-photo-editor" },
        { label: "US Visa Photo", href: "/us-visa-photo-editor" },
      ],
    },
    {
      title: "Global Directories",
      items: [
        { label: "Passport Photo Directory", href: "/passport-photos" },
        { label: "Visa Photo Directory", href: "/visa-photo" },
        { label: "All Blog Guides", href: "/blog" },
      ],
    },
    {
      title: "Information",
      items: [
        { label: "About Us", href: "/about" },
        { label: "Photo Validator", href: "/visa-photo-validator" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Refund Policy", href: "/refund-policy" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 py-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand & Concept */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group opacity-100 hover:opacity-90">
              <div className="w-8 h-8 bg-lime-500 rounded-lg flex items-center justify-center transform group-hover:-rotate-12 transition-transform shadow-lg shadow-lime-500/20">
                <svg className="w-5 h-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Pix<span className="text-lime-500">Passport</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
              Your global companion for secure, biometric passport and visa photos. Our AI ensures 100% compliance with government guidelines for 50+ countries.
            </p>
            <div className="flex gap-4">
              <span className="bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300">100% Private</span>
              <span className="bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300">Instant AI Check</span>
            </div>
          </div>

          {/* Mapping Service Links */}
          {links.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-black text-white uppercase tracking-wider mb-5">{section.title}</h3>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm font-medium text-slate-400 hover:text-lime-400 transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Banner */}
        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
          <p>&copy; {new Date().getFullYear()} PixPassport. All rights reserved.</p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
            <p>Disclaimer: This site is not affiliated with any government agency.</p>
            <Link href="mailto:usvisaphotoai@gmail.com" className="hover:text-white transition-colors">
              usvisaphotoai@gmail.com
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
