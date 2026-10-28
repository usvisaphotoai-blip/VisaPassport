import Link from "next/link";
import React from "react";

interface SingaporeRelatedLinksProps {
  currentPath?: string;
}

// Anchor text names the destination's own keyword so each Singapore page keeps its intent.
const singaporeLinks = [
  {
    href: "/singapore-ica-photo",
    title: "ICA Photo Requirements",
    badge: "Rules",
    icon: "🏛️",
    desc: "What ICA requires for passport, NRIC and pass photos, and why photos get rejected.",
  },
  {
    href: "/resize-passport-photo-singapore",
    title: "Resize to 400 × 514 px",
    badge: "Resizer",
    icon: "✂️",
    desc: "Crop and resize any photo to the pixel size ICA recommends for e-Service uploads.",
  },
  {
    href: "/singapore-visa-photo-editor",
    title: "Singapore Visa Photo",
    badge: "Visitors",
    icon: "🛂",
    desc: "Photo for a visa to visit Singapore, submitted through ICA's SAVE system.",
  },
  {
    href: "/passport-photo-print-template-generator",
    title: "Passport Photo Print Template",
    badge: "Print 4×6\"",
    icon: "🖨️",
    desc: "Lay out several 35 × 45 mm photos on one 4×6 inch sheet to print at a photo shop.",
  },
  {
    href: "/passport-photo-checker",
    title: "Passport Photo Checker",
    badge: "Checker",
    icon: "🔍",
    desc: "Check a photo you already have before you submit it.",
  },
];

export default function SingaporeRelatedLinks({ currentPath }: SingaporeRelatedLinksProps) {
  return (
    <section className="py-14 lg:py-18 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            🇸🇬 Singapore Photo Resources
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Related Singapore Photo Tools &amp; Guides
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Guides and tools for Singapore passport, NRIC and visa photos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {singaporeLinks
            .filter((item) => item.href !== currentPath)
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative p-5 rounded-2xl border transition-all flex flex-col justify-between bg-slate-50/70 border-slate-200 hover:bg-white hover:border-emerald-400 hover:shadow-lg hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200 group-hover:border-emerald-300 group-hover:text-emerald-700">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm mb-1.5 transition-colors line-clamp-2 text-slate-900 group-hover:text-emerald-700">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{item.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-600 group-hover:text-emerald-600 transition-colors">Open</span>
                  <span aria-hidden="true" className="text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
