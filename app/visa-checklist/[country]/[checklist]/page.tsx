import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllVisaChecklistPaths,
  getVisaChecklist,
  getVisaCountry,
} from "@/lib/visa-checklist";
import InteractiveChecklistTracker from "../../components/InteractiveChecklistTracker";
import TocSidebar from "@/app/components/TocSidebar";
import FaqAccordion from "@/app/components/FaqAccordion";
import ReadingProgressBar from "@/app/components/ReadingProgressBar";

const APP_URL = "https://www.pixpassport.com";

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllVisaChecklistPaths();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; checklist: string }>;
}): Promise<Metadata> {
  const { country: countrySlug, checklist: checklistSlug } = await params;
  const checklist = getVisaChecklist(countrySlug, checklistSlug);

  if (!checklist) {
    return {
      title: "Checklist Not Found | PixPassport",
    };
  }

  const title = `${checklist.title} | Official Requirements & Guide`;
  const description = checklist.description;
  const canonicalUrl = `${APP_URL}/visa-checklist/${checklist.countrySlug}/${checklist.slug}`;

  return {
    title: `${title} | PixPassport`,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      publishedTime: checklist.lastUpdated,
      modifiedTime: checklist.lastUpdated,
      siteName: "PixPassport",
      images: [
        {
          url: checklist.featuredImage || `${APP_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: checklist.title,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [checklist.featuredImage || `${APP_URL}/og-image.jpg`],
    },
  };
}

export default async function VisaChecklistDetailPage({
  params,
}: {
  params: Promise<{ country: string; checklist: string }>;
}) {
  const { country: countrySlug, checklist: checklistSlug } = await params;
  const checklist = getVisaChecklist(countrySlug, checklistSlug);

  if (!checklist) {
    notFound();
  }

  const auditUrl = `/visa-checklist/${checklist.countrySlug}/${checklist.slug}/audit`;
  const { checklists: otherChecklists } = getVisaCountry(countrySlug);
  const relatedChecklists = otherChecklists.filter((c) => c.slug !== checklistSlug);

  // JSON-LD: Article / Guide Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: checklist.title,
    description: checklist.description,
    datePublished: checklist.lastUpdated,
    dateModified: checklist.lastUpdated,
    author: {
      "@type": "Organization",
      name: "PixPassport Visa Research Team",
      url: APP_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "PixPassport",
      url: APP_URL,
      logo: {
        "@type": "ImageObject",
        url: `${APP_URL}/icon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${APP_URL}/visa-checklist/${checklist.countrySlug}/${checklist.slug}`,
    },
  };

  // JSON-LD: BreadcrumbList Schema
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
      {
        "@type": "ListItem",
        position: 3,
        name: checklist.country,
        item: `${APP_URL}/visa-checklist/${checklist.countrySlug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: checklist.shortTitle || checklist.title,
        item: `${APP_URL}/visa-checklist/${checklist.countrySlug}/${checklist.slug}`,
      },
    ],
  };

  // JSON-LD: FAQ Schema
  const faqSchema =
    checklist.faq && checklist.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: checklist.faq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <ReadingProgressBar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="min-h-screen bg-slate-50/50 pb-20 lg:pb-12">
        {/* ── Top Hero Header (Modern Dark Theme with Lime Accent) ── */}
        <header className="relative bg-slate-950 pt-16 pb-12 sm:pt-20 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-800 text-white">
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-72 h-72 sm:w-[500px] sm:h-[500px] bg-lime-500 rounded-full blur-[130px] animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-72 h-72 sm:w-[500px] sm:h-[500px] bg-emerald-600 rounded-full blur-[150px] animate-pulse delay-700" />
          </div>

          <div className="max-w-4xl mx-auto relative z-10 text-center">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-4 flex justify-center">
              <ol className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs font-medium text-slate-400">
                <li>
                  <Link href="/" className="hover:text-lime-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="opacity-40">/</li>
                <li>
                  <Link href="/visa-checklist" className="hover:text-lime-400 transition-colors">
                    Visa Checklists
                  </Link>
                </li>
                <li aria-hidden="true" className="opacity-40">/</li>
                <li>
                  <Link
                    href={`/visa-checklist/${checklist.countrySlug}`}
                    className="hover:text-lime-400 transition-colors inline-flex items-center gap-1"
                  >
                    <span>{checklist.countryFlag}</span>
                    <span>{checklist.country}</span>
                  </Link>
                </li>
                <li aria-hidden="true" className="opacity-40">/</li>
                <li className="text-slate-200 font-semibold truncate max-w-[150px] sm:max-w-[240px]" title={checklist.title}>
                  {checklist.shortTitle || checklist.visaType}
                </li>
              </ol>
            </nav>

            {/* Authority Badge */}
            <div className="inline-flex items-center gap-2 mb-4 bg-lime-500/10 border border-lime-500/30 px-3.5 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" />
              <span className="text-lime-400 text-[11px] sm:text-xs font-black uppercase tracking-wider">
                {checklist.countryFlag} {checklist.officialAuthority} • 2026 Guidelines
              </span>
            </div>

            {/* H1 Title */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.18] mb-4 text-pretty px-2">
              {checklist.title}
            </h1>

            <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto font-normal leading-relaxed mb-6 sm:mb-8">
              {checklist.description}
            </p>

            {/* Hero Quick CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
              <Link
                href={auditUrl}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-lime-500 hover:bg-lime-400 active:bg-lime-600 text-slate-950 font-black text-xs sm:text-sm py-3.5 px-7 rounded-xl transition-all shadow-lg shadow-lime-500/25 hover:scale-[1.02]"
              >
                <span>⚡ Free AI Document Checklist</span>
                <span className="text-base font-bold">→</span>
              </Link>
              <Link
                href={checklist.photoRequirements.toolLink || "/passport-photo-online"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-xs sm:text-sm py-3.5 px-6 rounded-xl transition-all border border-slate-700"
              >
                <span>📷 Create {checklist.photoRequirements.size} Photo</span>
              </Link>
            </div>

            {/* Quick Spec Pills Bar */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-slate-300 text-xs sm:text-sm font-medium">
              <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800/80 px-3 py-1.5 rounded-xl">
                <span className="text-lime-400">⏱</span>
                <span>Processing: <strong className="text-white">{checklist.processingTime.split('(')[0]}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800/80 px-3 py-1.5 rounded-xl">
                <span className="text-lime-400">💳</span>
                <span>Fee: <strong className="text-white">{checklist.fee.split('(')[0]}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800/80 px-3 py-1.5 rounded-xl">
                <span className="text-lime-400">📷</span>
                <span>Photo: <strong className="text-white">{checklist.photoRequirements.size}</strong></span>
              </div>
            </div>
          </div>
        </header>

        {/* ── Main Layout (PC Two-Column, Mobile Streamlined) ── */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 justify-center">
            {/* Desktop Sticky TOC Sidebar */}
            {checklist.toc && checklist.toc.length > 0 && (
              <aside className="hidden lg:block w-72 shrink-0">
                <div className="sticky top-24 space-y-5">
                  <TocSidebar headings={checklist.toc} />
                  
                  {/* Quick Sidebar Action Box */}
                  <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl border border-slate-800 shadow-md">
                    <span className="text-[10px] font-mono font-bold text-lime-400 uppercase tracking-wider block mb-1">
                      FREE DOCUMENT AUDIT
                    </span>
                    <h4 className="text-xs sm:text-sm font-black mb-2">Check Files Before Applying</h4>
                    <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                      Verify your PAL, GIC certificates, bank statements &amp; biometric photos before IRCC submission.
                    </p>
                    <Link
                      href={auditUrl}
                      className="w-full inline-flex items-center justify-center gap-1.5 bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs py-2.5 px-3 rounded-xl transition-all shadow-sm"
                    >
                      <span>⚡ Free AI Document Checklist</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </aside>
            )}

            {/* Mobile TOC Accordion */}
            {checklist.toc && checklist.toc.length > 0 && (
              <div className="lg:hidden mb-2">
                <details className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
                  <summary className="flex items-center justify-between p-4 cursor-pointer list-none text-xs sm:text-sm font-bold text-slate-800">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-lime-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                      Table of Contents ({checklist.toc.length} Sections)
                    </span>
                    <svg className="w-4 h-4 text-slate-400 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </summary>
                  <nav className="px-4 pb-4 space-y-1.5 border-t border-slate-100 pt-3">
                    {checklist.toc.map((heading) => (
                      <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className={`block text-xs py-1.5 text-slate-600 hover:text-lime-600 ${
                          heading.level === 3 ? "pl-3 font-medium" : "font-semibold text-slate-800"
                        }`}
                      >
                        {heading.text}
                      </a>
                    ))}
                  </nav>
                </details>
              </div>
            )}

            {/* ── Main Column Content ── */}
            <div className="w-full max-w-3xl">
              {/* Quick Specification Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="p-3.5 sm:p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Processing
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-900 block leading-tight">
                    {checklist.processingTime}
                  </span>
                </div>
                <div className="p-3.5 sm:p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Visa Fee
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-900 block leading-tight">
                    {checklist.fee}
                  </span>
                </div>
                <div className="p-3.5 sm:p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Validity
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-900 block leading-tight">
                    {checklist.validity}
                  </span>
                </div>
                <div className="p-3.5 sm:p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Photo Specs
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-lime-700 block leading-tight">
                    {checklist.photoRequirements.size}
                  </span>
                </div>
              </div>

              {/* Interactive Document Checklist Tracker Component */}
              <InteractiveChecklistTracker
                checklistSections={checklist.checklistSections}
                visaTitle={checklist.title}
                countryName={checklist.country}
                photoSpec={checklist.photoRequirements}
                auditHref={auditUrl}
              />

              {/* In-depth Markdown Content */}
              <div
                className="prose-premium max-w-none mt-8"
                dangerouslySetInnerHTML={{ __html: checklist.contentHtml }}
              />

              {/* ── Mid-Page Pre-Submission AI Audit Banner ── */}
              <section className="my-10 p-6 sm:p-8 bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl border border-slate-800 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <span className="inline-block text-lime-400 text-xs font-black uppercase tracking-wider mb-2">
                      Free Pre-Submission Check
                    </span>
                    <h3 className="text-lg sm:text-2xl font-black mb-2 text-white">
                      Check Your {checklist.country} Documents with AI
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
                      Find missing clauses, unexplained bank deposits, and non-compliant photos before attending your embassy or VFS appointment.
                    </p>
                  </div>
                  <Link
                    href={auditUrl}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs sm:text-sm py-3.5 px-6 rounded-xl transition-all shadow-md shadow-lime-500/20 shrink-0"
                  >
                    <span>⚡ Free AI Document Checklist</span>
                    <span>→</span>
                  </Link>
                </div>
              </section>

              {/* ── PixPassport Photo Maker Spotlight ── */}
              <section className="my-10 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm text-center relative overflow-hidden">
                <div className="max-w-lg mx-auto">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-lime-100 text-lime-800 text-[11px] font-extrabold uppercase tracking-wide mb-3">
                    <span>📷</span>
                    <span>Official {checklist.country} Biometrics</span>
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
                    Create {checklist.country} Visa Photo ({checklist.photoRequirements.size})
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                    Automatic background cleaning, biometric alignment, and exact {checklist.photoRequirements.size} cropping compliant with {checklist.officialAuthority} rules.
                  </p>
                  <Link
                    href={checklist.photoRequirements.toolLink || "/passport-photo-online"}
                    className="inline-flex items-center justify-center bg-slate-900 hover:bg-lime-600 text-white font-extrabold text-xs sm:text-sm py-3.5 px-8 rounded-xl transition-all shadow-sm"
                  >
                    Create &amp; Verify My Photo Now →
                  </Link>
                </div>
              </section>

              {/* ── FAQ Accordion Section ── */}
              {checklist.faq && checklist.faq.length > 0 && (
                <section className="mt-12 pt-8 border-t border-slate-200">
                  <div className="flex items-center gap-2.5 mb-6">
                    <div className="w-1.5 h-6 bg-lime-500 rounded-full" />
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 !m-0 !p-0 !border-0">
                      Frequently Asked Questions ({checklist.country})
                    </h2>
                  </div>
                  <FaqAccordion
                    faqs={checklist.faq.map((f) => ({ q: f.question, a: f.answer }))}
                  />
                </section>
              )}

              {/* ── Related Visa Checklists ── */}
              {relatedChecklists.length > 0 && (
                <section className="mt-12 pt-8 border-t border-slate-200">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 mb-4">
                    Other {checklist.country} Visa Checklists
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {relatedChecklists.map((rel) => (
                      <Link
                        key={rel.slug}
                        href={`/visa-checklist/${checklist.countrySlug}/${rel.slug}`}
                        className="p-4 bg-white rounded-2xl border border-slate-200/90 hover:border-lime-400 hover:shadow-sm transition-all flex items-center justify-between group"
                      >
                        <div>
                          <span className="text-xs font-bold text-slate-900 group-hover:text-lime-600 block">
                            {rel.title}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {rel.visaType} • {rel.processingTime}
                          </span>
                        </div>
                        <span className="text-slate-300 group-hover:text-lime-600 group-hover:translate-x-1 transition-transform text-base">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </main>

        {/* ── Floating Mobile Quick Action Bar (Fixed at bottom on mobile) ── */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-4 py-3 shadow-2xl print:hidden">
          <div className="max-w-md mx-auto flex items-center gap-2.5">
            <Link
              href={auditUrl}
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs py-3 px-4 rounded-xl shadow-md"
            >
              <span>⚡ Free AI Document Checklist</span>
            </Link>
            <Link
              href={checklist.photoRequirements.toolLink || "/passport-photo-online"}
              className="inline-flex items-center justify-center gap-1 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 px-3.5 rounded-xl border border-slate-700 shrink-0"
              title="Create Photo"
            >
              <span>📷 Photo</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
