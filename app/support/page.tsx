import type { Metadata } from "next";
import Breadcrumbs from "../components/Breadcrumbs";
import SupportHubClient from "./SupportHubClient";

export const metadata: Metadata = {
  title: "Support & Resource Center | PixPassport",
  description:
    "PixPassport Help Center and Support Hub. Direct support desks, FAQ, biometric compliance standards, refund policy, and data privacy safeguards.",
  alternates: {
    canonical: "https://www.pixpassport.com/support",
    languages: {
      en: "https://www.pixpassport.com/support",
      "x-default": "https://www.pixpassport.com/support",
    },
  },
  openGraph: {
    title: "Support & Resource Center | PixPassport",
    description:
      "Find instant answers, contact our 24/7 support team, check official biometric photo rules, and view all legal & refund policies.",
    url: "https://www.pixpassport.com/support",
    siteName: "PixPassport",
    images: [
      {
        url: "https://www.pixpassport.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PixPassport Support & Resource Center",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function SupportPage() {
  return (
    <div className="bg-slate-50/50 min-h-screen">
      <Breadcrumbs />

      {/* Header Banner */}
      <header className="bg-slate-900 text-white py-10 sm:py-14 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#84cc16_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/30 text-lime-400 text-xs font-bold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
              Support &amp; Resource Hub
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-2">
             PixPassport Help Center &amp; Support Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Explore support desks, official photo standards, 100% money-back guarantees, and legal &amp; privacy policies.
            </p>
          </div>
        </div>
      </header>

      {/* Main Interactive Sidebar + Tabbed Layout */}
      <main>
        <SupportHubClient />
      </main>

      {/* Bottom Guarantee Banner */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-xl mb-1">🛡️</p>
              <p className="text-xs font-bold text-slate-900 uppercase">100% Refund</p>
              <p className="text-[10px] text-slate-500">Government rejection guarantee</p>
            </div>
            <div>
              <p className="text-xl mb-1">🔒</p>
              <p className="text-xs font-bold text-slate-900 uppercase">24h Auto-Purge</p>
              <p className="text-[10px] text-slate-500">Zero permanent photo storage</p>
            </div>
            <div>
              <p className="text-xl mb-1">💳</p>
              <p className="text-xs font-bold text-slate-900 uppercase">Stripe Protected</p>
              <p className="text-[10px] text-slate-500">PCI-DSS Level 1 security</p>
            </div>
            <div>
              <p className="text-xl mb-1">⚡</p>
              <p className="text-xs font-bold text-slate-900 uppercase">&lt; 5 Sec Processing</p>
              <p className="text-[10px] text-slate-500">Instant AI compliance check</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
