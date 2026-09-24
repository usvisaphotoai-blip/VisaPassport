import type { Metadata } from "next";
import Link from "next/link";
import { getAllVisaCountries } from "@/lib/visa-checklist";
import VisaDocumentAuditHero from "./components/VisaDocumentAuditHero";
import VisaChecklistDirectoryClient from "./components/VisaChecklistDirectoryClient";
import FaqAccordion from "@/app/components/FaqAccordion";

const APP_URL = "https://www.pixpassport.com";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Check Your Visa Documents Before You Apply | Visa Checklists 2026",
  description:
    "Upload and check your visa documents before you apply. Find missing, incorrect, unreadable, or incorrectly formatted files before submitting to the embassy. Official 2026 checklists for 50+ countries.",
  alternates: {
    canonical: `${APP_URL}/visa-checklist`,
    languages: {
      en: `${APP_URL}/visa-checklist`,
      "x-default": `${APP_URL}/visa-checklist`,
    },
  },
  openGraph: {
    title: "Check Your Visa Documents Before You Apply | PixPassport",
    description:
      "A generic website says 'Here are the documents you may need.' PixPassport says 'Here is what YOU have, what you're missing, and what needs attention.' Avoid delays with pre-submission document checks.",
    url: `${APP_URL}/visa-checklist`,
    siteName: "PixPassport",
    images: [
      {
        url: `${APP_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Check Your Visa Documents Before You Apply - PixPassport",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Check Your Visa Documents Before You Apply | PixPassport",
    description:
      "Find missing, incorrect, unreadable, or incorrectly formatted files before submitting your visa application.",
    images: [`${APP_URL}/og-image.jpg`],
  },
};

const GLOBAL_FAQS = [
  {
    q: "How does the PixPassport Document & Photo Audit prevent visa refusals?",
    a: "Over 65% of visa application delays or refusals happen due to preventable technicalities: missing leave authorization clauses in employer letters, unexplained bank statement deposits, non-compliant biometric photograph dimensions, or mismatched dates between flights and hotel reservations. PixPassport audits your prepared files against the destination consulate's exact criteria so you can fix issues before you apply.",
  },
  {
    q: "What is the difference between a free generic checklist and PixPassport's audit?",
    a: "Generic websites only give you a static, one-size-fits-all list of documents. PixPassport analyzes what YOU have, identifies what you are missing, and flags formatting, readability, or biometric errors in red so you can correct them immediately.",
  },
  {
    q: "Are official embassy visa checklists free?",
    a: "Yes, official requirements are always published for free by government immigration departments (such as IRCC, US State Dept, UKVI). PixPassport provides the automated pre-submission audit engine to organize, verify, and check your personal files against those official rules.",
  },
  {
    q: "Why do visa photos cause so many application rejections?",
    a: "Consulates use automated biometric software to scan face-to-frame ratios (e.g. 70-80% / 31-36mm), eye height, background uniformity, and glare. A small shadow, wrong millimeter ratio, or wearing eyeglasses causes immediate algorithmic rejection. PixPassport generates 100% compliant photos calibrated to each country.",
  },
  {
    q: "Can I print or save a customized checklist for my appointment?",
    a: "Yes! Every country checklist on PixPassport includes an interactive tracker where you can check off prepared documents and click 'Print / Save PDF' to take a clean physical copy to your visa application center (VFS Global, TLScontact, BLS).",
  },
];

export default async function VisaChecklistHubPage() {
  const countries = getAllVisaCountries();

  // JSON-LD: WebPage + ItemList Schema
  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Check Your Visa Documents Before You Apply - PixPassport",
    description: "Upload and verify your visa documents. Find missing, unreadable, or non-compliant files before submitting to the embassy.",
    url: `${APP_URL}/visa-checklist`,
    publisher: {
      "@type": "Organization",
      name: "PixPassport",
      url: APP_URL,
      logo: {
        "@type": "ImageObject",
        url: `${APP_URL}/icon.png`,
      },
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: countries.map((country, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${country.name} Visa Document Checklist`,
        url: `${APP_URL}/visa-checklist/${country.slug}`,
      })),
    },
  };

  // JSON-LD: Breadcrumbs Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: APP_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Visa Checklists",
        item: `${APP_URL}/visa-checklist`,
      },
    ],
  };

  // JSON-LD: FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: GLOBAL_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-white">
        {/* Top Accent Bar */}
        <div className="h-1 bg-lime-600 w-full" />

        {/* ── Direct Value Hero Section ── */}
        <header className="bg-slate-50/60 border-b border-slate-200/80 pt-6 pb-12 sm:pt-10 sm:pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <li>
                  <Link href="/" className="hover:text-lime-600 transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="opacity-30">/</li>
                <li className="text-slate-900 font-bold">Visa Checklists</li>
              </ol>
            </nav>

            {/* Direct Value Showcase Component */}
            <VisaDocumentAuditHero />
          </div>
        </header>

        {/* ── Product Philosophy / Value Contrast Bar ── */}
        <section className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-[11px] font-mono font-bold text-lime-400 uppercase tracking-widest block mb-2">
                THE PIXPASSPORT DIFFERENCE
              </span>
              <h2 className="text-xl sm:text-3xl font-black text-white">
                Why Generic Checklists Aren&apos;t Enough
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                Official requirements are always free. PixPassport helps you organize and check your own personal files against them.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {/* Other websites */}
              <div className="p-6 sm:p-7 rounded-3xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3 text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-slate-500" />
                    Standard Information Websites
                  </div>
                  <blockquote className="text-base sm:text-lg text-slate-300 font-medium italic mb-4">
                    &ldquo;Here are the documents you may need.&rdquo;
                  </blockquote>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Leaves you guessing whether your specific bank statement has enough funds, whether your photo meets the exact millimeter ratio, or if your employer letter has the right wording.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2 text-xs font-bold text-rose-400">
                  <span>✕ Leaves compliance verification up to guesswork</span>
                </div>
              </div>

              {/* PixPassport */}
              <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-slate-950 to-slate-900 border-2 border-lime-500/40 shadow-xl shadow-lime-500/5 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-lime-500/10 rounded-full blur-2xl pointer-events-none" />
                <div>
                  <div className="flex items-center gap-2 mb-3 text-lime-400 text-xs font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                    PixPassport Pre-Submission Audit
                  </div>
                  <blockquote className="text-base sm:text-lg text-white font-extrabold mb-4">
                    &ldquo;Here is what <span className="text-lime-400">YOU have</span>, what you&apos;re <span className="text-amber-300">missing</span>, and what <span className="text-rose-400">needs attention</span>.&rdquo;
                  </blockquote>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Automated biometric photo validation, document quality checks, date &amp; name consistency audits, and missing-document detection before embassy submission.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2 text-xs font-bold text-lime-400">
                  <span>✓ 100% Peace of mind before submitting your application</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Main Country Checklists Directory ── */}
        <main id="country-directory" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-black text-lime-600 uppercase tracking-widest block mb-2">
              OFFICIAL EMBASSY DIRECTORY
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Select Your Destination Country
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Browse complete document checklists, official visa fees, processing times, and biometric photo specs for 50+ countries.
            </p>
          </div>

          {/* Directory Search & Filters */}
          <VisaChecklistDirectoryClient countries={countries} />

          {/* ── 4-Step Preparation Blueprint ── */}
          <section className="mt-16 sm:mt-20 pt-14 border-t border-slate-200">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-black text-lime-600 uppercase tracking-widest block mb-2">
                APPLICATION SUCCESS BLUEPRINT
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                How to Prepare a Bulletproof Visa Application
              </h2>
              <p className="text-slate-500 text-sm sm:text-base mt-2">
                Follow this standardized 4-stage document verification roadmap before submitting your visa file.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs relative group hover:border-lime-400 transition-all">
                <div className="w-9 h-9 rounded-xl bg-lime-50 text-lime-700 font-black flex items-center justify-center text-base mb-3.5">
                  1
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mb-1.5">Select Visa Category</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Choose your destination country and specific visa category (Tourist, Student, Business, Work, or Super Visa).
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs relative group hover:border-lime-400 transition-all">
                <div className="w-9 h-9 rounded-xl bg-lime-50 text-lime-700 font-black flex items-center justify-center text-base mb-3.5">
                  2
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mb-1.5">Audit Financial Dossier</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Verify 6 months bank statements, eliminate unexplained lump-sum deposits, and attach 3 years of income tax returns.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs relative group hover:border-lime-400 transition-all">
                <div className="w-9 h-9 rounded-xl bg-lime-50 text-lime-700 font-black flex items-center justify-center text-base mb-3.5">
                  3
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mb-1.5">Check Biometric Photos</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ensure photo dimensions, chin-to-crown percentages, and background color strictly match the destination consulate rules.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs relative group hover:border-lime-400 transition-all">
                <div className="w-9 h-9 rounded-xl bg-lime-50 text-lime-700 font-black flex items-center justify-center text-base mb-3.5">
                  4
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mb-1.5">Print &amp; Submit</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Use our interactive checklist to tick off documents, export your customized printable checklist, and attend your VAC appointment.
                </p>
              </div>
            </div>
          </section>

          {/* ── High-Impact Biometric CTA Banner ── */}
          <section className="mt-16 sm:mt-20 p-6 sm:p-10 lg:p-14 bg-slate-950 rounded-3xl text-center relative overflow-hidden group border border-lime-500/20 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-block text-lime-400 text-xs font-black uppercase tracking-wider mb-2.5">
                Biometric Photo Verification
              </span>
              <h2 className="text-xl sm:text-3xl font-black text-white mb-3 leading-tight">
                Don&apos;t Let a Photo Rejection Delay Your Visa
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                PixPassport AI automatically crops to official millimeter specifications, cleans background shadows, and guarantees 100% biometric compliance for any embassy worldwide.
              </p>
              <Link
                href="/passport-photo-online"
                className="inline-flex items-center justify-center bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-sm sm:text-base py-3.5 px-8 rounded-xl transition-all shadow-xl shadow-lime-500/20 group/btn"
              >
                Create Compliant Visa Photo Online
                <svg
                  className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </section>

          {/* ── Global Visa FAQs ── */}
          <section className="mt-16 sm:mt-20 pt-14 border-t border-slate-200">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-2.5 mb-7">
                <div className="w-1.5 h-7 bg-lime-500 rounded-full" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Frequently Asked Questions About Visa Checklists
                </h2>
              </div>
              <FaqAccordion faqs={GLOBAL_FAQS} />
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
