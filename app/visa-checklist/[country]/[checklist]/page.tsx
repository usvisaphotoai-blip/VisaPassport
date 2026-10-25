import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllVisaChecklistPaths,
  getAllVisaCountries,
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

  const title = checklist.seoTitle || checklist.title;
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
  const crossCountryChecklists = getAllVisaCountries()
    .filter((c) => c.slug !== checklist.countrySlug)
    .flatMap((c) => (c.availableVisas || []).map((v) => ({ ...v, countrySlug: c.slug, countryName: c.name })));
  const lastVerified = new Date(checklist.lastUpdated).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  const photoTool = checklist.photoRequirements.toolLink || "/passport-photo-online";
  const photoSize =
    checklist.photoRequirements.size ||
    checklist.photoRequirements.printedSize?.split(" (")[0] ||
    "";
  const photoSpec = { ...checklist.photoRequirements, size: photoSize, toolLink: photoTool };
  const keyFacts = [
    { label: "Processing time", value: checklist.processingTime },
    { label: "Visa fee", value: checklist.fee },
    { label: "Validity", value: checklist.validity },
    { label: "Photo", value: photoSize },
  ].filter((f) => f.value);

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

      <div className="min-h-screen bg-white text-slate-900 pb-24 lg:pb-0">
        {/* ── Hero ── */}
        <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-10 sm:pt-12 sm:pb-14 border-b border-slate-100">
          <div className="max-w-6xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500">
                <li>
                  <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
                </li>
                <li aria-hidden="true" className="text-slate-300">/</li>
                <li>
                  <Link href="/visa-checklist" className="hover:text-slate-900 transition-colors">Visa Checklists</Link>
                </li>
                <li aria-hidden="true" className="text-slate-300">/</li>
                <li>
                  <Link href={`/visa-checklist/${checklist.countrySlug}`} className="hover:text-slate-900 transition-colors">
                    {checklist.country}
                  </Link>
                </li>
                <li aria-hidden="true" className="text-slate-300">/</li>
                <li className="text-slate-900 truncate max-w-[200px] sm:max-w-none" title={checklist.title}>
                  {checklist.shortTitle || checklist.visaType}
                </li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <p className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                <span className="text-lg leading-none">{checklist.countryFlag}</span>
                {checklist.officialAuthority}
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-5 text-balance">
                {checklist.title}
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed mb-4 text-pretty">{checklist.description}</p>

              <p className="text-sm text-slate-500 mb-8">
                Last verified: <time dateTime={checklist.lastUpdated}>{lastVerified}</time>
                {checklist.officialPortalUrl && (
                  <>
                    {" · Source: "}
                    <a href={checklist.officialPortalUrl} target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-slate-900">
                      {checklist.officialAuthority}
                    </a>
                  </>
                )}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#checklist-tracker"
                  className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors"
                >
                  Start the checklist
                  <span aria-hidden="true">↓</span>
                </a>
                <Link
                  href={auditUrl}
                  className="inline-flex items-center justify-center gap-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-semibold text-sm px-6 py-3.5 rounded-xl border border-slate-200 transition-colors"
                >
                  Check my documents — free
                </Link>
              </div>
            </div>

            {/* Key facts */}
            <dl className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 rounded-2xl overflow-hidden border border-slate-200">
              {keyFacts.map((fact) => (
                <div key={fact.label} className="bg-white p-5">
                  <dt className="text-xs font-medium text-slate-500 mb-1.5">{fact.label}</dt>
                  <dd className="text-sm text-slate-900 leading-relaxed">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
            {/* Desktop TOC */}
            {checklist.toc && checklist.toc.length > 0 && (
              <aside className="hidden lg:block w-64 shrink-0 order-first">
                <div className="sticky top-24">
                  <TocSidebar headings={checklist.toc} />
                </div>
              </aside>
            )}

            <div className="w-full min-w-0 max-w-3xl">
              {/* Mobile TOC */}
              {checklist.toc && checklist.toc.length > 0 && (
                <details className="lg:hidden group mb-8 rounded-xl border border-slate-200">
                  <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none text-sm font-medium text-slate-700">
                    On this page
                    <svg className="w-4 h-4 text-slate-400 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </summary>
                  <nav className="px-4 pb-3 border-t border-slate-100 pt-2">
                    {checklist.toc.map((heading) => (
                      <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className={`block text-sm py-1.5 text-slate-600 hover:text-slate-900 ${heading.level === 3 ? "pl-3" : ""}`}
                      >
                        {heading.text}
                      </a>
                    ))}
                  </nav>
                </details>
              )}

              <InteractiveChecklistTracker
                checklistSections={checklist.checklistSections}
                visaTitle={checklist.title}
                countryName={checklist.country}
                photoSpec={photoSpec}
                auditHref={auditUrl}
              />

              <div
                className="prose-premium max-w-none mt-14"
                dangerouslySetInnerHTML={{ __html: checklist.contentHtml }}
              />

              {/* Next steps */}
              <section className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4 print:hidden">
                <Link
                  href={auditUrl}
                  className="group p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors"
                >
                  <p className="text-sm font-medium text-slate-500 mb-2">Free document check</p>
                  <p className="font-semibold mb-2">Check your {checklist.country} documents</p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    Catch missing details, unexplained deposits and date mismatches before your appointment.
                  </p>
                  <span className="text-sm font-semibold text-slate-900 group-hover:underline underline-offset-4">Start check →</span>
                </Link>
                <Link
                  href={photoTool}
                  className="group p-6 rounded-2xl bg-lime-50 border border-lime-100 hover:border-lime-200 transition-colors"
                >
                  <p className="text-sm font-medium text-lime-700 mb-2">Visa photo</p>
                  <p className="font-semibold mb-2">
                    Make your {checklist.country} visa photo{photoSize ? ` (${photoSize})` : ""}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    Cropped to {checklist.officialAuthority} rules with a clean background, ready to upload or print.
                  </p>
                  <span className="text-sm font-semibold text-slate-900 group-hover:underline underline-offset-4">Make my photo →</span>
                </Link>
              </section>

              {checklist.faq && checklist.faq.length > 0 && (
                <section className="mt-16">
                  <h2 className="text-2xl font-bold tracking-tight mb-6">Frequently asked questions</h2>
                  <FaqAccordion faqs={checklist.faq.map((f) => ({ q: f.question, a: f.answer }))} />
                </section>
              )}

              {relatedChecklists.length > 0 && (
                <section className="mt-16 print:hidden">
                  <h2 className="text-lg font-semibold mb-4">Other {checklist.country} checklists</h2>
                  <ul className="divide-y divide-slate-100 border-y border-slate-100">
                    {relatedChecklists.map((rel) => (
                      <li key={rel.slug}>
                        <Link
                          href={`/visa-checklist/${checklist.countrySlug}/${rel.slug}`}
                          className="group flex items-center justify-between gap-4 py-4"
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-900 group-hover:text-lime-700 transition-colors">{rel.title}</p>
                            <p className="text-xs text-slate-500 mt-0.5 truncate">{rel.visaType} · {rel.processingTime}</p>
                          </div>
                          <span className="text-slate-300 group-hover:text-slate-600 transition-colors" aria-hidden="true">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {crossCountryChecklists.length > 0 && (
                <section className="mt-16 print:hidden">
                  <h2 className="text-lg font-semibold mb-4">Visa checklists for other countries</h2>
                  <ul className="divide-y divide-slate-100 border-y border-slate-100">
                    {crossCountryChecklists.map((rel) => (
                      <li key={`${rel.countrySlug}/${rel.slug}`}>
                        <Link
                          href={`/visa-checklist/${rel.countrySlug}/${rel.slug}`}
                          className="group flex items-center justify-between gap-4 py-4"
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-900 group-hover:text-lime-700 transition-colors">{rel.title}</p>
                            <p className="text-xs text-slate-500 mt-0.5 truncate">{rel.countryName} · {rel.visaType}</p>
                          </div>
                          <span className="text-slate-300 group-hover:text-slate-600 transition-colors" aria-hidden="true">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        </main>

        {/* Mobile action bar */}
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 px-4 py-3 print:hidden">
          <div className="max-w-md mx-auto flex gap-2">
            <Link
              href={auditUrl}
              className="flex-1 inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm py-3 rounded-xl"
            >
              Check my documents
            </Link>
            <Link
              href={photoTool}
              className="inline-flex items-center justify-center px-4 text-slate-700 font-semibold text-sm py-3 rounded-xl border border-slate-200"
            >
              Photo
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
