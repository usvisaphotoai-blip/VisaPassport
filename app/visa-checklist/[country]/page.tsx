import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllVisaCountryPaths, getVisaCountry } from "@/lib/visa-checklist";
import FaqAccordion from "@/app/components/FaqAccordion";

const APP_URL = "https://www.pixpassport.com";

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllVisaCountryPaths();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country: countrySlug } = await params;
  const { country } = getVisaCountry(countrySlug);

  if (!country) {
    return {
      title: "Country Not Found | PixPassport",
    };
  }

  const title = `${country.name} Visa Document Checklists 2026 | Requirements & Guidelines`;
  const description = `Complete official document checklists for ${country.name} visas (Tourist, Student, Business, Work). Check required paperwork, ${country.photoSize} biometric photo specs, fees, and processing times.`;

  return {
    title: `${title} | PixPassport`,
    description,
    alternates: {
      canonical: `${APP_URL}/visa-checklist/${country.slug}`,
      languages: {
        en: `${APP_URL}/visa-checklist/${country.slug}`,
        "x-default": `${APP_URL}/visa-checklist/${country.slug}`,
      },
    },
    openGraph: {
      title: `${country.name} Visa Document Checklists 2026`,
      description,
      url: `${APP_URL}/visa-checklist/${country.slug}`,
      siteName: "PixPassport",
      images: [
        {
          url: country.heroImage || `${APP_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${country.name} Visa Requirements`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${country.name} Visa Document Checklists 2026`,
      description,
      images: [country.heroImage || `${APP_URL}/og-image.jpg`],
    },
  };
}

export default async function VisaCountryHubPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country: countrySlug } = await params;
  const { country, checklists } = getVisaCountry(countrySlug);

  if (!country) {
    notFound();
  }

  const countryFaqs = [
    {
      q: `What is the standard processing time for a ${country.name} visa in 2026?`,
      a: country.processingOverview || `Standard processing for ${country.name} visas takes between 15 and 30 working days depending on the visa category and whether biometrics have already been enrolled.`,
    },
    {
      q: `What are the exact photo specifications for ${country.name} visas?`,
      a: `${country.name} requires a ${country.photoSize} photograph with a plain white or neutral background, taken within the last 6 months. Eyeglasses and head coverings (except religious) must be removed.`,
    },
    {
      q: `Can I apply for a ${country.name} visa online?`,
      a: `Yes, applications are submitted either directly via ${country.authorityName} official portal or through authorized visa application centers (e.g., VFS Global / TLScontact).`,
    },
  ];

  // JSON-LD: CollectionPage + ItemList Schema
  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${country.name} Visa Document Checklists 2026`,
    description: country.description,
    url: `${APP_URL}/visa-checklist/${country.slug}`,
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
      itemListElement: checklists.map((chk, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: chk.title,
        url: `${APP_URL}/visa-checklist/${country.slug}/${chk.slug}`,
      })),
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
        name: country.name,
        item: `${APP_URL}/visa-checklist/${country.slug}`,
      },
    ],
  };

  // JSON-LD: FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: countryFaqs.map((faq) => ({
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

      <div className="min-h-screen bg-slate-50/50 pb-20 lg:pb-12">
        {/* Top Accent Bar */}
        <div className="h-1 bg-lime-600 w-full" />

        {/* ── Country Hero Header ── */}
        <header className="relative bg-slate-950 pt-16 pb-12 sm:pt-20 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-800 text-white">
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-80 h-80 sm:w-[500px] sm:h-[500px] bg-lime-500 rounded-full blur-[140px] animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 sm:w-[500px] sm:h-[500px] bg-emerald-600 rounded-full blur-[160px] animate-pulse delay-700" />
          </div>

          <div className="max-w-4xl mx-auto relative z-10 text-center">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-4 flex justify-center">
              <ol className="flex items-center space-x-2 text-xs sm:text-sm font-medium text-slate-400">
                <li>
                  <Link href="/" className="hover:text-lime-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="opacity-30">/</li>
                <li>
                  <Link href="/visa-checklist" className="hover:text-lime-400 transition-colors">
                    Visa Checklists
                  </Link>
                </li>
                <li aria-hidden="true" className="opacity-30">/</li>
                <li className="text-slate-300 font-bold">{country.name}</li>
              </ol>
            </nav>

            {/* Flag & Authority Badge */}
            <div className="inline-flex items-center gap-2 mb-4 bg-slate-900/90 border border-slate-800 px-4 py-1.5 rounded-full">
              <span className="text-xl sm:text-2xl" role="img" aria-label={country.name}>{country.flag}</span>
              <span className="text-xs sm:text-sm font-bold text-slate-300">{country.authorityName}</span>
            </div>

            {/* H1 Title */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.14] mb-4 text-pretty px-2">
              {country.name} Visa Document Checklists
            </h1>

            <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto font-normal leading-relaxed mb-6 sm:mb-8">
              {country.description}
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
              <a
                href="#visa-types"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-lime-500 hover:bg-lime-400 active:bg-lime-600 text-slate-950 font-black text-xs sm:text-sm py-3.5 px-7 rounded-xl transition-all shadow-md shadow-lime-500/20 hover:scale-[1.02]"
              >
                <span>⚡ Free AI Document Checklist</span>
                <span className="text-base font-bold">↓</span>
              </a>
              <Link
                href={country.photoToolSlug || "/passport-photo-online"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-xs sm:text-sm py-3.5 px-6 rounded-xl transition-all border border-slate-700"
              >
                <span>📷 Create {country.photoSize} Photo</span>
              </Link>
            </div>

            {/* Quick Country Specs Bar */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs sm:text-sm font-bold text-slate-300">
              <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3.5 py-1.5 rounded-xl">
                <span className="text-lime-400">📷</span>
                <span>Photo: {country.photoSize}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3.5 py-1.5 rounded-xl">
                <span className="text-lime-400">⏱</span>
                <span>Processing: {country.processingOverview.split('.')[0]}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3.5 py-1.5 rounded-xl">
                <span className="text-lime-400">📋</span>
                <span>{checklists.length} Available Checklists</span>
              </div>
            </div>
          </div>
        </header>

        {/* ── Main Content Area ── */}
        <main id="visa-types" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-18">
          {/* Visa Checklists Section */}
          <section className="mb-14">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
              <div>
                <span className="text-xs font-black text-lime-600 uppercase tracking-widest block mb-1">
                  AVAILABLE VISA CATEGORIES
                </span>
                <h2 className="text-xl sm:text-3xl font-black text-slate-900">
                  Select {country.name} Visa Category
                </h2>
              </div>
              <span className="text-xs text-slate-500 font-semibold">
                {checklists.length} official {checklists.length === 1 ? 'checklist' : 'checklists'} available
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {checklists.map((checklist) => (
                <div
                  key={checklist.slug}
                  className="group bg-white rounded-3xl border border-slate-200/90 hover:border-lime-400 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300 flex flex-col p-5 sm:p-7"
                >
                  <div className="flex items-start justify-between gap-2.5 mb-3.5">
                    <span className="bg-lime-50 text-lime-800 text-[10px] font-extrabold uppercase tracking-wide px-2.5 py-1 rounded-full border border-lime-200/50">
                      {checklist.category}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">
                      2026 Rules
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-lime-600 transition-colors mb-2">
                    <Link href={`/visa-checklist/${country.slug}/${checklist.slug}`}>
                      {checklist.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-5">
                    {checklist.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-2xl mb-5 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Processing Time
                      </span>
                      <span className="font-bold text-slate-800 line-clamp-1">{checklist.processingTime}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Visa Fee
                      </span>
                      <span className="font-bold text-slate-800 line-clamp-1">{checklist.fee}</span>
                    </div>
                  </div>

                  {/* Primary CTA */}
                
                </div>
              ))}
            </div>
          </section>

          {/* Photo Requirements Spotlight Card */}
          <section className="my-12 p-6 sm:p-10 bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl border border-slate-800 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-500/20 text-lime-400 text-xs font-extrabold uppercase tracking-wider mb-2.5 border border-lime-500/30">
                  <span>⚡</span>
                  <span>Official {country.name} Biometrics</span>
                </span>
                <h3 className="text-xl sm:text-3xl font-black mb-2 text-white">
                  Need a {country.name} Visa Photo ({country.photoSize})?
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                  Avoid appointment delays or embassy rejections. PixPassport formats and verifies biometric compliance in seconds according to official {country.name} standards.
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-400">
                  <span className="flex items-center gap-1 text-slate-300">
                    <span className="text-lime-400">✓</span> Exact {country.photoSize} dimensions
                  </span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <span className="text-lime-400">✓</span> Automatic plain white background
                  </span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <span className="text-lime-400">✓</span> Guaranteed ICAO / Consular acceptance
                  </span>
                </div>
              </div>

              <div className="shrink-0 w-full sm:w-auto">
                <Link
                  href={country.photoToolSlug || "/passport-photo-online"}
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs sm:text-sm py-3.5 px-7 rounded-xl transition-all shadow-lg shadow-lime-500/25"
                >
                  Create {country.name} Photo Now →
                </Link>
              </div>
            </div>
          </section>

          {/* Country FAQs */}
          <section className="pt-8 border-t border-slate-200">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-1.5 h-6 bg-lime-500 rounded-full" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Frequently Asked Questions about {country.name} Visas
                </h2>
              </div>
              <FaqAccordion faqs={countryFaqs} />
            </div>
          </section>
        </main>

        {/* ── Floating Mobile Quick Action Bar (Fixed at bottom on mobile) ── */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-4 py-3 shadow-2xl print:hidden">
          <div className="max-w-md mx-auto flex items-center gap-2.5">
            <a
              href="#visa-types"
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs py-3 px-4 rounded-xl shadow-md"
            >
              <span>⚡ Free AI Document Checklist</span>
            </a>
            <Link
              href={country.photoToolSlug || "/passport-photo-online"}
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
