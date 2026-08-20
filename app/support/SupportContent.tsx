"use client";

import { useState } from "react";
import Link from "next/link";

interface FAQItem {
  q: string;
  a: string;
  category: string;
}

const faqs: FAQItem[] = [
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
];

export default function SupportContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const categories = [
    { id: "all", label: "All Topics" },
    { id: "orders", label: "Orders & Refunds" },
    { id: "photos", label: "Photo Specs & AI" },
    { id: "printing", label: "Printing & Templates" },
    { id: "privacy", label: "Privacy & Security" },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="space-y-16">
      {/* Interactive Search Bar & Quick Jump Filter */}
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 sm:p-8 -mt-12 relative z-20 max-w-4xl mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search help topics, photo requirements, refund steps, printing..."
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Quick Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Filter FAQs:</span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-lime-50 hover:text-lime-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Direct Contact Channels Section */}
      <section>
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-black uppercase tracking-widest text-lime-600 bg-lime-50 border border-lime-200 px-3 py-1 rounded-full">
            24/7 Dedicated Support
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
            Direct Support Channels
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Get rapid assistance from our biometric compliance and customer care specialists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Card 1: General Support */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-lime-100 text-lime-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 mb-2">
                Response: &lt; 2 hours
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">General Inquiries &amp; Help</h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                Questions about passport sizing, order downloads, photo delivery, or system features.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <a
                href="mailto:support@pixpassport.com"
                className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl transition-colors"
              >
                <span>support@pixpassport.com</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Card 2: 100% Refund Desk */}
          <div className="bg-white rounded-2xl p-6 border-2 border-lime-500 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-lime-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl">
              100% Guaranteed
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-lime-500 text-slate-950 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-sm shadow-lime-500/30">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-lime-100 text-lime-900 mb-2">
                Fast Rejection Claim
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Refunds &amp; Guarantee</h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                Submit government rejection proof for a hassle-free 100% refund or free re-processing.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <a
                href="mailto:refund@pixpassport.com"
                className="w-full inline-flex items-center justify-center gap-2 bg-lime-600 hover:bg-lime-700 text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl transition-colors"
              >
                <span>refund@pixpassport.com</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <div className="text-center">
                <Link href="/refund-policy" className="text-[11px] font-bold text-lime-700 hover:underline">
                  Read 100% Refund Policy &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Card 3: Photo Compliance Desk */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 mb-2">
                Expert Review
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Photo Compliance &amp; Specs</h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                Need help with baby photos, special headwear requirements, or custom country dimensions?
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <a
                href="mailto:photo@pixpassport.com"
                className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl transition-colors"
              >
                <span>photo@pixpassport.com</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <div className="text-center">
                <Link href="/visa-photo-validator" className="text-[11px] font-bold text-slate-600 hover:underline">
                  Try Free Photo Validator &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Support FAQs Accordion */}
      <section className="bg-slate-50/70 border border-slate-200/80 rounded-3xl p-6 sm:p-10 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Frequently Answered Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Showing {filteredFaqs.length} relevant {filteredFaqs.length === 1 ? "answer" : "answers"}
            </p>
          </div>
          <Link
            href="/faq"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-lime-700 bg-white border border-lime-300 hover:bg-lime-50 px-4 py-2 rounded-xl transition-colors shrink-0"
          >
            <span>View All 25+ FAQs</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
            <p className="text-sm font-semibold text-slate-600">No questions found matching &ldquo;{searchQuery}&rdquo;</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-3 text-xs font-bold text-lime-600 hover:underline"
            >
              Clear filters and search
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="border border-slate-200/80 rounded-xl overflow-hidden bg-white shadow-xs hover:border-lime-300 transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-none group"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-lime-600 transition-colors pr-4">
                    {faq.q}
                  </span>
                  <div
                    className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      openFaqIndex === index
                        ? "bg-lime-500 text-slate-950 rotate-180"
                        : "bg-slate-100 text-slate-400 group-hover:bg-lime-50 group-hover:text-lime-600"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaqIndex === index ? "max-h-[500px] opacity-100 border-t border-slate-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-4 sm:p-5 text-slate-600 text-xs sm:text-sm leading-relaxed bg-slate-50/50">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
