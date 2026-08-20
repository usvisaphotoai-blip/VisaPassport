"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type TabId =
  | "overview"
  | "about"
  | "contact"
  | "security"
  | "privacy"
  | "terms"
  | "refund"
  | "how-it-works"
  | "compliance"
  | "disclaimer"
  | "faqs";

interface FAQItem {
  q: string;
  a: string;
  category: string;
}

const allFaqs: FAQItem[] = [
  {
    category: "orders",
    q: "How do I request a refund if my photo was rejected?",
    a: "We offer a 100% money-back guarantee. If your processed photo is rejected by any government agency, email refund@pixpassport.com within 30 days with your transaction ID and a screenshot/photo of the rejection notice. Approved refunds are returned to your original payment method in 5–10 business days.",
  },
  {
    category: "downloads",
    q: "How long are my photo download links valid?",
    a: "For security and privacy reasons, generated download URLs expire after 1 hour. You can access your processed files from your confirmation screen for up to 24 hours before our automatic background purge permanently wipes all transient files.",
  },
  {
    category: "photos",
    q: "Can I take a passport photo with my phone?",
    a: "Yes! Over 95% of our users take their photos using a standard smartphone. Stand about 4–5 feet away from the camera in good, even lighting facing a window or light source. Keep a neutral expression, and our AI engine will automatically crop, size, and replace your background with a pure white canvas.",
  },
  {
    category: "photos",
    q: "Are glasses allowed in US passport and visa photos?",
    a: "No. Since November 1, 2016, the U.S. Department of State does not allow glasses (prescription, reading glasses, or sunglasses) in official passport or visa photos unless you have a signed medical certificate.",
  },
  {
    category: "privacy",
    q: "How does PixPassport protect my biometric privacy?",
    a: "All uploads and downloads are encrypted with TLS 1.3 / 256-bit SSL. Original and processed photos are permanently purged from our servers within 24 hours. We never sell user data, and your face is never used to train public AI models.",
  },
  {
    category: "printing",
    q: "How do I print my photos at CVS, Walgreens, or Walmart for under $0.50?",
    a: "Download our 4×6 inch print template (which contains 4 to 6 identical compliant passport photos). Order it at your local pharmacy as a standard 4×6 inch photo print (usually $0.35–$0.50) instead of paying the $16.99 passport photo studio fee!",
  },
  {
    category: "photos",
    q: "What background color is required?",
    a: "Official requirements mandate a pure white background (RGB 255, 255, 255) for US and most global passports. Our AI engine automatically isolates your silhouette and replaces any messy home background with pure compliance-grade white.",
  },
  {
    category: "orders",
    q: "What is included with my photo purchase?",
    a: "Every purchase includes 1 high-resolution digital photo cropped to exact official millimeter/pixel specifications ready for online government forms, PLUS a 4×6 inch or A4 multi-photo printable sheet for physical submission.",
  },
];

export default function SupportHubClient() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const menuSections = [
    {
      groupTitle: "Support & Desks",
      items: [
        {
          id: "overview" as TabId,
          label: "Support Desks",
          badge: "24/7",
          badgeColor: "bg-lime-100 text-lime-800",
          icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          ),
        },
        {
          id: "how-it-works" as TabId,
          label: "How It Works & Tools",
          badge: "3 Steps",
          badgeColor: "bg-blue-100 text-blue-800",
          icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          ),
        },
        {
          id: "faqs" as TabId,
          label: "Help Center & FAQs",
          badge: "Q&A",
          badgeColor: "bg-purple-100 text-purple-800",
          icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        },
      ],
    },
    {
      groupTitle: "Company & Trust",
      items: [
        {
          id: "about" as TabId,
          label: "About Us",
          badge: "/about",
          badgeColor: "bg-slate-100 text-slate-700",
          icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          ),
        },
        {
          id: "contact" as TabId,
          label: "Contact Us",
          badge: "/contact",
          badgeColor: "bg-slate-100 text-slate-700",
          icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ),
        },
        {
          id: "security" as TabId,
          label: "Data Security",
          badge: "256-Bit SSL",
          badgeColor: "bg-emerald-100 text-emerald-800",
          icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          ),
        },
      ],
    },
    {
      groupTitle: "Legal & Compliance",
      items: [
        {
          id: "privacy" as TabId,
          label: "Privacy & Cookies",
          badge: "GDPR/CCPA",
          badgeColor: "bg-slate-100 text-slate-700",
          icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          ),
        },
        {
          id: "terms" as TabId,
          label: "Terms of Service",
          badge: "/terms",
          badgeColor: "bg-slate-100 text-slate-700",
          icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
        },
        {
          id: "refund" as TabId,
          label: "100% Refund Policy",
          badge: "Guarantee",
          badgeColor: "bg-lime-100 text-lime-800",
          icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ),
        },
        {
          id: "compliance" as TabId,
          label: "Photo Compliance",
          badge: "50+ Countries",
          badgeColor: "bg-slate-100 text-slate-700",
          icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        },
        {
          id: "disclaimer" as TabId,
          label: "Non-Affiliation Notice",
          badge: "Official",
          badgeColor: "bg-amber-100 text-amber-800",
          icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        },
      ],
    },
  ];

  const allItems = useMemo(
    () => menuSections.flatMap((s) => s.items),
    [menuSections]
  );

  const filteredFaqs = allFaqs.filter((f) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Mobile Horizontal Pill Scroller (Sticky on mobile for non-scroll UX) */}
      <div className="lg:hidden sticky top-[60px] z-30 bg-white/95 backdrop-blur-md py-3 -mx-4 px-4 border-b border-slate-200/80 mb-6 overflow-x-auto no-scrollbar ">
        <div className="flex items-center gap-1.5 min-w-max">
          {allItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === item.id
                  ? "bg-slate-900 text-lime-400 "
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout: Desktop Sidebar + Dynamic Content Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* PC Sidebar Navigation (Sticky) */}
        <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-24 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200  p-4 space-y-6">
            {/* Sidebar Quick Filter/Search */}
            <div>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Quick search questions..."
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-all"
                />
                <svg
                  className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Menu Groups */}
            <div className="space-y-5">
              {menuSections.map((section) => (
                <div key={section.groupTitle}>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2 px-2">
                    {section.groupTitle}
                  </p>
                  <nav className="space-y-1">
                    {section.items.map((item) => {
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveTab(item.id)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left group ${
                            isActive
                              ? "bg-slate-900 text-white "
                              : "text-slate-600 hover:bg-lime-50/80 hover:text-lime-800"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <span className={isActive ? "text-lime-400" : "text-slate-400 group-hover:text-lime-600"}>
                              {item.icon}
                            </span>
                            <span className="truncate">{item.label}</span>
                          </div>
                          <span
                            className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md shrink-0 ${
                              isActive ? "bg-lime-500 text-slate-950" : item.badgeColor
                            }`}
                          >
                            {item.badge}
                          </span>
                        </button>
                      );
                    })}
                  </nav>
                </div>
              ))}
            </div>

            {/* Sidebar Promo Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-4 rounded-xl relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-[11px] font-bold text-lime-400 uppercase tracking-wider mb-1">
                  100% Free Check
                </p>
                <p className="text-xs font-bold text-white mb-2 leading-snug">
                  Test your photo against official government standards.
                </p>
                <Link
                  href="/visa-photo-validator"
                  className="block text-center bg-lime-500 hover:bg-lime-400 text-slate-950 py-1.5 px-3 rounded-lg text-xs font-extrabold transition-colors"
                >
                  Launch Validator &rarr;
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Content Pane (Instant Tab Switching) */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
          {/* TAB 1: OVERVIEW & CONTACT DESKS */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-fadeIn">
              {/* Top Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-md">
                <div className="max-w-2xl relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/30 text-lime-400 text-xs font-bold uppercase tracking-wider mb-3">
                    <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
                    24/7 Dedicated Support Desks
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                    How Can We Assist You?
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Our team of biometric compliance reviewers and customer agents is ready to assist with photo validation, government specifications, instant downloads, and 100% money-back claims.
                  </p>
                </div>
              </div>

              {/* 3 Contact Desks Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Desk 1 */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200  flex flex-col justify-between hover:border-lime-300 transition-all">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-lime-100 text-lime-700 flex items-center justify-center mb-3">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      &lt; 2hr Response
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-2 mb-1">General Support</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      General inquiries, download link renewals, or website troubleshooting.
                    </p>
                  </div>
                  <a
                    href="mailto:support@pixpassport.com"
                    className="w-full text-center bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 px-3 rounded-xl transition-colors"
                  >
                    support@pixpassport.com
                  </a>
                </div>

                {/* Desk 2 */}
                <div className="bg-white rounded-2xl p-5 border-2 border-lime-500  flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-lime-500 text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-bl-lg">
                    100% Refund
                  </div>
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-lime-500 text-slate-950 flex items-center justify-center mb-3 ">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-lime-900 bg-lime-100 px-2 py-0.5 rounded-md">
                      Guarantee Desk
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-2 mb-1">Rejection Claims</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      Submit government rejection proof for a hassle-free 100% full refund.
                    </p>
                  </div>
                  <a
                    href="mailto:refund@pixpassport.com"
                    className="w-full text-center bg-lime-600 hover:bg-lime-700 text-white font-bold text-xs py-2 px-3 rounded-xl transition-colors"
                  >
                    refund@pixpassport.com
                  </a>
                </div>

                {/* Desk 3 */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200  flex flex-col justify-between hover:border-lime-300 transition-all">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md">
                      Manual Review
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-2 mb-1">Photo Specs Review</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      Baby photos, complex lighting, headwear, or custom country dimensions.
                    </p>
                  </div>
                  <a
                    href="mailto:photo@pixpassport.com"
                    className="w-full text-center bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 px-3 rounded-xl transition-colors"
                  >
                    photo@pixpassport.com
                  </a>
                </div>
              </div>

              {/* Quick Navigation Cards to Core Pages */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">
                  Quick Page Shortcuts
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => setActiveTab("about")}
                    className="p-3 bg-white rounded-xl border border-slate-200 hover:border-lime-400 text-left transition-all group"
                  >
                    <p className="text-xs font-bold text-slate-900 group-hover:text-lime-700">About Us</p>
                    <p className="text-[11px] text-slate-500">Our mission &amp; AI</p>
                  </button>
                  <button
                    onClick={() => setActiveTab("contact")}
                    className="p-3 bg-white rounded-xl border border-slate-200 hover:border-lime-400 text-left transition-all group"
                  >
                    <p className="text-xs font-bold text-slate-900 group-hover:text-lime-700">Contact Us</p>
                    <p className="text-[11px] text-slate-500">Business &amp; support</p>
                  </button>
                  <button
                    onClick={() => setActiveTab("security")}
                    className="p-3 bg-white rounded-xl border border-slate-200 hover:border-lime-400 text-left transition-all group"
                  >
                    <p className="text-xs font-bold text-slate-900 group-hover:text-lime-700">Data Security</p>
                    <p className="text-[11px] text-slate-500">24h purge &amp; SSL</p>
                  </button>
                  <button
                    onClick={() => setActiveTab("privacy")}
                    className="p-3 bg-white rounded-xl border border-slate-200 hover:border-lime-400 text-left transition-all group"
                  >
                    <p className="text-xs font-bold text-slate-900 group-hover:text-lime-700">Privacy Policy</p>
                    <p className="text-[11px] text-slate-500">GDPR &amp; zero selling</p>
                  </button>
                  <button
                    onClick={() => setActiveTab("terms")}
                    className="p-3 bg-white rounded-xl border border-slate-200 hover:border-lime-400 text-left transition-all group"
                  >
                    <p className="text-xs font-bold text-slate-900 group-hover:text-lime-700">Terms of Service</p>
                    <p className="text-[11px] text-slate-500">Usage agreements</p>
                  </button>
                  <button
                    onClick={() => setActiveTab("refund")}
                    className="p-3 bg-white rounded-xl border border-slate-200 hover:border-lime-400 text-left transition-all group"
                  >
                    <p className="text-xs font-bold text-slate-900 group-hover:text-lime-700">Refund Policy</p>
                    <p className="text-[11px] text-slate-500">100% guarantee</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ABOUT US */}
          {activeTab === "about" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200  space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-lime-600 bg-lime-50 px-2.5 py-1 rounded-md">
                    Company Overview
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-2">About PixPassport</h2>
                </div>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shrink-0"
                >
                  <span>Open Full About Us Page</span>
                  <span>&rarr;</span>
                </Link>
              </div>

              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-600 space-y-4 leading-relaxed">
                <p>
                  <strong>PixPassport</strong> is a dedicated biometric compliance technology platform built to eliminate the stress, cost, and delays of official passport and visa applications.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 not-prose">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="text-xs font-bold text-slate-900 mb-1">■ 15+ Biometric Scans</h4>
                    <p className="text-xs text-slate-600">Calculates eye level, head-to-image ratio (50–69%), detects glasses, and verifies lighting in &lt; 5 seconds.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="text-xs font-bold text-slate-900 mb-1">■ Pure White Background</h4>
                    <p className="text-xs text-slate-600">Strips away complex home backgrounds and replaces them with an official RGB 255,255,255 canvas.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="text-xs font-bold text-slate-900 mb-1">■ 50+ Countries Database</h4>
                    <p className="text-xs text-slate-600">Updated specifications for US DS-160, UK HMPO, India Passport, Schengen, Canada, and Australia.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="text-xs font-bold text-slate-900 mb-1">■ Zero AI Model Training</h4>
                    <p className="text-xs text-slate-600">Your photos are never used to train public models and are automatically purged in 24 hours.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONTACT US */}
          {activeTab === "contact" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200  space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-lime-600 bg-lime-50 px-2.5 py-1 rounded-md">
                    Get in Touch
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-2">Contact PixPassport</h2>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shrink-0"
                >
                  <span>Open Full Contact Page</span>
                  <span>&rarr;</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Registered Business Location</h3>
                    <p className="font-bold text-slate-900 text-sm">PixPassport</p>
                    <p className="text-xs text-slate-600">khadda kushinagar,</p>
                    <p className="text-xs text-slate-600">Uttar Pradesh, India 274802</p>
                  </div>

                  <div className="p-4 bg-lime-50/60 rounded-xl border border-lime-200">
                    <h3 className="text-xs font-bold text-lime-900 mb-1">Customer Care Hours</h3>
                    <p className="text-xs text-lime-800">
                      Our automated processing engine operates 24/7/365. Email response team active around the clock with average response time under 2 hours.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-white rounded-xl border border-slate-200  flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900">General Support</p>
                      <p className="text-[11px] text-slate-500">Inquiries &amp; questions</p>
                    </div>
                    <a href="mailto:support@pixpassport.com" className="text-xs font-bold text-lime-600 hover:underline">
                      support@pixpassport.com
                    </a>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-slate-200  flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900">Refund Claims</p>
                      <p className="text-[11px] text-slate-500">100% money-back requests</p>
                    </div>
                    <a href="mailto:refund@pixpassport.com" className="text-xs font-bold text-lime-600 hover:underline">
                      refund@pixpassport.com
                    </a>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-slate-200  flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900">Photo Review</p>
                      <p className="text-[11px] text-slate-500">Custom specs assistance</p>
                    </div>
                    <a href="mailto:photo@pixpassport.com" className="text-xs font-bold text-lime-600 hover:underline">
                      photo@pixpassport.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DATA SECURITY */}
          {activeTab === "security" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200  space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                    Bank-Grade Safeguards
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-2">Data Security &amp; Protection</h2>
                </div>
                <Link
                  href="/data-security"
                  className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shrink-0"
                >
                  <span>Open Full Security Page</span>
                  <span>&rarr;</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base">🔒</span>
                    <h3 className="text-xs font-bold text-slate-900">256-Bit SSL / TLS 1.3</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    All file uploads and downloads are strictly encrypted end-to-end via TLS 1.3 and stored transiently using AES-256 encryption.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base">⏱️</span>
                    <h3 className="text-xs font-bold text-slate-900">24-Hour Automated Purge</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Background scripts permanently delete all uploaded photos and generated sheets from our storage disks within 24 hours.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base">💳</span>
                    <h3 className="text-xs font-bold text-slate-900">Stripe PCI-DSS Level 1</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We never touch or store credit card numbers. All payments are processed securely via Stripe tokenized payment gateways.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base">🚫</span>
                    <h3 className="text-xs font-bold text-slate-900">Zero Data Selling Guarantee</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We strictly prohibit selling, renting, or sharing facial or personal data with advertising networks or third parties.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PRIVACY & COOKIES */}
          {activeTab === "privacy" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200  space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md">
                    GDPR &amp; CCPA Compliant
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-2">Privacy &amp; Cookie Policy</h2>
                </div>
                <Link
                  href="/privacy-policy"
                  className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shrink-0"
                >
                  <span>Open Full Privacy Policy</span>
                  <span>&rarr;</span>
                </Link>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>
                  Your privacy is our core engineering foundation. When you use PixPassport, we adhere to strict global privacy standards:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Ephemeral Photo Retention:</strong> Photos are held in temporary memory solely for processing and permanently wiped in 24 hours.</li>
                  <li><strong>Expiring URLs:</strong> Signed download links expire automatically after 1 hour.</li>
                  <li><strong>Cookies:</strong> We only use essential session cookies and privacy-friendly analytics to keep the platform fast and operational.</li>
                  <li><strong>User Rights:</strong> Full right to data erasure, access, and portability under EU GDPR and California CCPA.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 6: TERMS OF SERVICE */}
          {activeTab === "terms" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200  space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
                    Service Agreement
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-2">Terms of Service</h2>
                </div>
                <Link
                  href="/terms"
                  className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shrink-0"
                >
                  <span>Open Full Terms Page</span>
                  <span>&rarr;</span>
                </Link>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-900 mb-1">Key Deliverables &amp; Pricing</h4>
                  <p className="text-xs text-slate-600">
                    Each purchase delivers 1 processed digital photo formatted to government guidelines + a 4×6&quot; or A4 multi-photo printable template delivered immediately via download. No recurring subscriptions.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-900 mb-1">Acceptable Use</h4>
                  <p className="text-xs text-slate-600">
                    Users must only upload photos they have legal authority to process. Fraudulent use or identity impersonation is strictly prohibited.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: REFUND POLICY */}
          {activeTab === "refund" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-lime-500  space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-slate-950 bg-lime-500 px-2.5 py-1 rounded-md">
                    100% Money-Back Guarantee
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-2">Refund Policy</h2>
                </div>
                <Link
                  href="/refund-policy"
                  className="inline-flex items-center gap-1.5 bg-lime-600 hover:bg-lime-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shrink-0"
                >
                  <span>Open Full Refund Policy</span>
                  <span>&rarr;</span>
                </Link>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <div className="p-5 bg-lime-50/70 rounded-2xl border border-lime-200">
                  <h3 className="text-sm font-bold text-lime-950 mb-1">Our Rejection Guarantee</h3>
                  <p className="text-xs text-lime-900 leading-relaxed">
                    If your processed photo is rejected by any government agency (passport office, embassy, or immigration portal), you receive a <strong>100% full refund</strong> of your purchase price.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">3 Simple Steps to Claim:</h4>
                  <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-600">
                    <li>Contact us within <strong>30 days</strong> of original purchase.</li>
                    <li>Email <a href="mailto:refund@pixpassport.com" className="font-bold text-lime-700 underline">refund@pixpassport.com</a> with your transaction ID / purchase email.</li>
                    <li>Attach screenshot proof or an official notification of photo rejection.</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: HOW IT WORKS & PHOTO TOOLS */}
          {activeTab === "how-it-works" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200  space-y-6 animate-fadeIn">
              <div className="pb-4 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                  Step-by-Step Guide
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-2">How It Works &amp; Photo Tools</h2>
              </div>

              {/* 3 Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-lime-400 font-bold text-xs flex items-center justify-center mx-auto mb-2">
                    1
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 mb-1">Snap on Phone</h3>
                  <p className="text-[11px] text-slate-500">Stand 4–5ft away facing light with neutral expression.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-lime-400 font-bold text-xs flex items-center justify-center mx-auto mb-2">
                    2
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 mb-1">AI Biometric Scan</h3>
                  <p className="text-[11px] text-slate-500">Auto-crop, 15+ biometric checks &amp; white background.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-lime-400 font-bold text-xs flex items-center justify-center mx-auto mb-2">
                    3
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 mb-1">Download &amp; Print</h3>
                  <p className="text-[11px] text-slate-500">Instant digital file + 4×6&quot;/A4 print template.</p>
                </div>
              </div>

              {/* Tool Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <Link
                  href="/passport-photo-online"
                  className="p-4 bg-lime-50 rounded-xl border border-lime-200 hover:border-lime-400 transition-all group"
                >
                  <p className="text-xs font-bold text-lime-900 group-hover:text-lime-700">📸 Create Passport Photo Online</p>
                  <p className="text-[11px] text-lime-700 mt-0.5">Full processing &amp; background removal &rarr;</p>
                </Link>
                <Link
                  href="/visa-photo-validator"
                  className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-400 transition-all group"
                >
                  <p className="text-xs font-bold text-slate-900 group-hover:text-slate-700">✅ Free Photo Validator</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Test any existing photo for compliance &rarr;</p>
                </Link>
                <Link
                  href="/passport-photo-print-template-generator"
                  className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-400 transition-all group"
                >
                  <p className="text-xs font-bold text-slate-900 group-hover:text-slate-700">🖨️ Print Template Generator</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Print at CVS / Walgreens for under $0.50 &rarr;</p>
                </Link>
                <Link
                  href="/blog"
                  className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-400 transition-all group"
                >
                  <p className="text-xs font-bold text-slate-900 group-hover:text-slate-700">📖 Blog &amp; Application Guides</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">50+ country compliance walkthroughs &rarr;</p>
                </Link>
              </div>
            </div>
          )}

          {/* TAB 9: COMPLIANCE DIRECTORY */}
          {activeTab === "compliance" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200  space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                    Global Standards
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-2">US &amp; Global Photo Compliance</h2>
                </div>
                <Link
                  href="/passport-photos"
                  className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shrink-0"
                >
                  <span>Full 50+ Country Directory</span>
                  <span>&rarr;</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link href="/us-passport-photo-editor" className="p-3 bg-slate-50 hover:bg-lime-50 rounded-xl border border-slate-200 transition-all">
                  <p className="text-xs font-bold text-slate-900">🇺🇸 United States Passport</p>
                  <p className="text-[11px] text-slate-500">2×2 inches (51×51mm), white background, no glasses</p>
                </Link>
                <Link href="/us-visa-photo-editor" className="p-3 bg-slate-50 hover:bg-lime-50 rounded-xl border border-slate-200 transition-all">
                  <p className="text-xs font-bold text-slate-900">🇺🇸 US DS-160 Visa Photo</p>
                  <p className="text-[11px] text-slate-500">600×600 px square, &lt; 240 KB JPEG format</p>
                </Link>
                <Link href="/uk" className="p-3 bg-slate-50 hover:bg-lime-50 rounded-xl border border-slate-200 transition-all">
                  <p className="text-xs font-bold text-slate-900">🇬🇧 United Kingdom HMPO</p>
                  <p className="text-[11px] text-slate-500">35×45 mm, cream or light grey background</p>
                </Link>
                <Link href="/ca" className="p-3 bg-slate-50 hover:bg-lime-50 rounded-xl border border-slate-200 transition-all">
                  <p className="text-xs font-bold text-slate-900">🇨🇦 Canada Passport &amp; Visa</p>
                  <p className="text-[11px] text-slate-500">50×70 mm (passport) &amp; 35×45 mm (visa)</p>
                </Link>
                <Link href="/india-passport-photo-editor" className="p-3 bg-slate-50 hover:bg-lime-50 rounded-xl border border-slate-200 transition-all">
                  <p className="text-xs font-bold text-slate-900">🇮🇳 India Passport (Passport Seva)</p>
                  <p className="text-[11px] text-slate-500">51×51 mm (2×2 in) or 35×45 mm</p>
                </Link>
                <Link href="/germany-visa-photo-editor" className="p-3 bg-slate-50 hover:bg-lime-50 rounded-xl border border-slate-200 transition-all">
                  <p className="text-xs font-bold text-slate-900">🇩🇪 Germany &amp; Schengen Area</p>
                  <p className="text-[11px] text-slate-500">35×45 mm biometric template (ICAO 9303)</p>
                </Link>
              </div>
            </div>
          )}

          {/* TAB 10: NON-AFFILIATION DISCLAIMER */}
          {activeTab === "disclaimer" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200  space-y-6 animate-fadeIn">
              <div className="pb-4 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md">
                  Official Statement
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-2">Government Non-Affiliation Notice</h2>
              </div>

              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  <strong>PixPassport</strong> is an independent, privately owned commercial photo processing platform.
                </p>
                <p>
                  PixPassport is <strong>not affiliated with, authorized by, endorsed by, or in any way officially connected with the U.S. Department of State, USCIS, UK HMPO, or any other government immigration department or agency.</strong>
                </p>
                <p>
                  Our software checks and adjusts user photos according to publicly published biometric standards (e.g. ICAO Document 9303 and State Department photo guidelines). Official acceptance of any photo remains solely at the discretion of the reviewing government authority.
                </p>
              </div>
            </div>
          )}

          {/* TAB 11: FAQS & HELP CENTER */}
          {activeTab === "faqs" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200  space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md">
                    Instant Answers
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-2">Frequently Asked Questions</h2>
                </div>
                <Link
                  href="/faq"
                  className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shrink-0"
                >
                  <span>Open Full FAQ Directory</span>
                  <span>&rarr;</span>
                </Link>
              </div>

              {/* Search Bar inside FAQ tab */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions (e.g., glasses, background, refund)..."
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-lime-500 transition-all"
                />
                <svg
                  className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* FAQ Accordion List */}
              <div className="space-y-3">
                {filteredFaqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm hover:border-lime-300 transition-all"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full flex items-center justify-between p-4 text-left focus:outline-none group"
                      >
                        <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-lime-600 transition-colors pr-3">
                          {faq.q}
                        </span>
                        <div
                          className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                            isOpen
                              ? "bg-lime-500 text-slate-950 rotate-180"
                              : "bg-slate-100 text-slate-400 group-hover:bg-lime-50"
                          }`}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          </svg>
                        </div>
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-200 ${
                          isOpen ? "max-h-[300px] opacity-100 border-t border-slate-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="p-4 text-slate-600 text-xs sm:text-sm leading-relaxed bg-slate-50/50">
                          {faq.a}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
