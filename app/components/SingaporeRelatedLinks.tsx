import Link from "next/link";
import React from "react";

interface SingaporeRelatedLinksProps {
  currentPath?: string;
}

const singaporeLinks = [
  {
    href: "/singapore-passport-photo",
    title: "Singapore Passport Photo Guide",
    badge: "Official 2026",
    icon: "🇸🇬",
    desc: "Complete 35×45 mm requirements, ICA guidelines, white background rules, and online creation tool.",
  },
  {
    href: "/resize-passport-photo-singapore",
    title: "Resize Singapore Passport Photo",
    badge: "Free Online Tool",
    icon: "✂️",
    desc: "Crop, resize, and convert any selfie into an ICA-compliant 413 × 531 pixel digital passport photo.",
  },
  {
    href: "/singapore-ica-photo",
    title: "Singapore ICA Photo Requirements",
    badge: "ICA Portal",
    icon: "🏛️",
    desc: "Biometric specifications for MyICA passport renewals, NRIC registration, e-PR, and Student Passes.",
  },
  {
    href: "/passport-photo-print-template-generator",
    title: "Passport Photo Print Template",
    badge: "Print 4×6\"",
    icon: "🖨️",
    desc: "Create 4×6 inch multi-photo print layouts to print your 35×45 mm Singapore photos at local stores.",
  },
  {
    href: "/singapore-passport-photo-editor",
    title: "Singapore Passport Photo Editor",
    badge: "Instant Editor",
    icon: "🎨",
    desc: "Automatic AI background whitening, facial landmark centering, and 4×6 inch print sheet generator.",
  },
  {
    href: "/singapore-visa-photo-editor",
    title: "Singapore Visa Photo Editor",
    badge: "Visa & Passes",
    icon: "🛂",
    desc: "Create compliant photos for Singapore entry visas, SAVE portal, work passes, and LTVP applications.",
  },
  {
    href: "/visa-photo-validator",
    title: "Free Biometric Photo Validator",
    badge: "Validator",
    icon: "✅",
    desc: "Check your existing photo against 30+ biometric rules to verify PASS/FAIL status before submission.",
  },
  {
    href: "/passport-photo-checker",
    title: "Passport Photo Checker",
    badge: "Universal",
    icon: "🔍",
    desc: "Universal compliance checker for passport and visa photos for Singapore and 50+ other countries.",
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
            Explore dedicated calculators, dimension converters, and biometric tools for Singapore ICA documents.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {singaporeLinks.map((item) => {
            const isCurrent = currentPath === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isCurrent
                    ? "bg-emerald-50/60 border-emerald-300 ring-2 ring-emerald-500/20 shadow-sm"
                    : "bg-slate-50/70 border-slate-200 hover:bg-white hover:border-emerald-400 hover:shadow-lg hover:-translate-y-0.5"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-2xl">{item.icon}</span>
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                        isCurrent
                          ? "bg-emerald-200 text-emerald-900 font-black"
                          : "bg-white text-slate-600 border border-slate-200 group-hover:border-emerald-300 group-hover:text-emerald-700"
                      }`}
                    >
                      {isCurrent ? "Current Page" : item.badge}
                    </span>
                  </div>
                  <h3
                    className={`font-bold text-sm mb-1.5 transition-colors line-clamp-2 ${
                      isCurrent
                        ? "text-emerald-900"
                        : "text-slate-900 group-hover:text-emerald-700"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold">
                  <span
                    className={
                      isCurrent
                        ? "text-emerald-800"
                        : "text-slate-600 group-hover:text-emerald-600 transition-colors"
                    }
                  >
                    {isCurrent ? "Viewing Spec" : "Open Guide / Tool"}
                  </span>
                  <span className="text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
