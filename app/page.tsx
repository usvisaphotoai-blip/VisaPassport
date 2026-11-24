import type { Metadata } from "next";
import Link from "next/link";
import { defaultFaqs as homeFaqs } from "./components/HomeFAQ";

export const metadata: Metadata = {
  title: "Passport Photo Maker Online – Free AI Check | PixPassport",

  description:
    "Make a passport or visa photo online for 50+ countries. Free AI check, white background and auto crop. From $6.99, 100% money back if rejected.",

  openGraph: {
    title: "Passport Photo Maker Online – Free AI Check | PixPassport",
    description:
      "Upload a selfie, get a compliant passport or visa photo for 50+ countries. Free check, money back if rejected.",
    url: "https://www.pixpassport.com/",
    siteName: "PixPassport",
    type: "website",
    images: [{ url: "https://www.pixpassport.com/og-image.jpg", width: 1200, height: 630, alt: "PixPassport passport photo maker" }],
  },

  alternates: {
    canonical: "https://www.pixpassport.com/",
    languages: {
      en: "https://www.pixpassport.com/",
      fr: "https://www.pixpassport.com/fr",
      de: "https://www.pixpassport.com/de",
      es: "https://www.pixpassport.com/es",
      "pt-BR": "https://www.pixpassport.com/br",
      "x-default": "https://www.pixpassport.com/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.pixpassport.com/#organization",
      "name": "PixPassport",
      "url": "https://www.pixpassport.com/",
      "logo": "https://www.pixpassport.com/icon.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "url": "https://www.pixpassport.com/contact",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.pixpassport.com/#website",
      "name": "PixPassport",
      "url": "https://www.pixpassport.com/",
      "publisher": { "@id": "https://www.pixpassport.com/#organization" },
    },
    {
      "@type": "WebPage",
      "@id": "https://www.pixpassport.com/#webpage",
      "url": "https://www.pixpassport.com/",
      "name": "Passport Photo Maker Online – Free AI Check | PixPassport",
      "isPartOf": { "@id": "https://www.pixpassport.com/#website" },
      "about": { "@id": "https://www.pixpassport.com/#app" },
      "publisher": { "@id": "https://www.pixpassport.com/#organization" },
    },
    {
      "@type": "WebApplication",
      "@id": "https://www.pixpassport.com/#app",
      "name": "PixPassport Passport Photo Maker",
      "url": "https://www.pixpassport.com/passport-photo-online",
      "applicationCategory": "PhotographyApplication",
      "operatingSystem": "Any (web browser)",
      "publisher": { "@id": "https://www.pixpassport.com/#organization" },
      "offers": {
        "@type": "Offer",
        "price": "6.99",
        "priceCurrency": "USD",
        "description": "Free compliance check. Paid HD photo download and print sheet.",
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "170",
        "bestRating": "5",
      },
    },
    {
      "@type": "FAQPage",
      "mainEntity": homeFaqs.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    },
  ],
};

import HomeHero from "./components/HomeHero";
import HomeSections from "./components/HomeSections";
import HomeFAQ from "./components/HomeFAQ";
import HomeGuides from "./components/guides/HomeGuides";
import toolPages from "../data/tool-seo-pages.json";
import "./home.css";

import { getDocSearchOptions } from "@/lib/doc-search-options";

export default async function Home() {
  // Use skipHeaders: true to keep the page static
  // We no longer need the full localPrice object here for display, 
  // as HomeSections will handle it via PriceDisplay client component.
  const basePrice = 6.99;
  // Built on the server so the full spec list is not bundled into the homepage JS.
  const docOptions = getDocSearchOptions();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="hcr">
        <HomeHero docOptions={docOptions} />

        {/* Price comparison + guarantee: the main reason searchers pick an online maker */}
        <section aria-labelledby="compare-heading" className="bg-white py-12 border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="compare-heading" className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight text-center mb-2">
              Online passport photo vs pharmacy or studio
            </h2>
            <p className="text-sm text-slate-500 text-center max-w-2xl mx-auto mb-8">
              Same official size and background rules, without the trip or the queue.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-sm border border-slate-200">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th scope="col" className="text-left font-semibold px-4 py-3"></th>
                    <th scope="col" className="text-left font-semibold px-4 py-3 text-lime-800">PixPassport</th>
                    <th scope="col" className="text-left font-semibold px-4 py-3">Pharmacy / post office</th>
                    <th scope="col" className="text-left font-semibold px-4 py-3">Photo studio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {[
                    ["Typical price (US)", "From $6.99, check is free", "About $15–17", "$20+"],
                    ["Time", "About 30 seconds", "Trip + wait", "Appointment"],
                    ["See result before paying", "Yes", "No", "Sometimes"],
                    ["Checked against your country's rules", "Automatic, 50+ countries", "Depends on staff", "Depends on staff"],
                    ["Digital file for online forms", "Included", "Rarely", "Extra cost"],
                    ["If the photo is rejected", "100% refund", "Retake, often paid", "Varies"],
                  ].map(([label, ...cols]) => (
                    <tr key={label}>
                      <th scope="row" className="text-left font-medium text-slate-800 px-4 py-3">{label}</th>
                      <td className="px-4 py-3 font-semibold text-lime-800">{cols[0]}</td>
                      <td className="px-4 py-3">{cols[1]}</td>
                      <td className="px-4 py-3">{cols[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 text-center mt-4">
              Pharmacy and studio prices are typical US ranges and vary by location. Refund terms:{" "}
              <Link href="/refund-policy" className="underline hover:text-slate-700">money-back guarantee</Link>.
            </p>
          </div>
        </section>
        
        {/* Master Directory Entry Points */}
        <section className="bg-white py-12 border-y border-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 text-center sm:text-left">
              <div className="bg-gradient-to-br from-lime-50 to-white p-8 rounded-sm border border-lime-100 group hover:shadow-lg transition-all">
           
                <h3 className="text-xl font-bold text-slate-900 mb-2">Passport Photo Directory</h3>
                <p className="text-sm text-slate-600 mb-6">Browse official 2026 passport photo requirements for 50+ countries. Find the exact size for your application.</p>
                <Link href="/passport-photos" className="inline-flex items-center text-blue-600 font-bold hover:underline">
                  View All Countries <span className="ml-2">→</span>
                </Link>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-sm border border-emerald-100 group hover:shadow-lg transition-all">
               
                <h3 className="text-xl font-bold text-slate-900 mb-2">Visa Photo Directory</h3>
                <p className="text-sm text-slate-600 mb-6">Database of international visa photo specifications. Support for US Visa, UK Visa, Schengen, and more.</p>
                <Link href="/visa-photo" className="inline-flex items-center text-emerald-600 font-bold hover:underline">
                  Browse Visa Specs <span className="ml-2">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Tool SEO Pages Section */}
        <section className="bg-slate-50 py-10 sm:py-12 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Popular Photo Tools &amp; Guides</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Instant biometric photo creation and government requirement checkers.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {toolPages.map((tool) => (
                <Link 
                  key={tool.slug}
                  href={`/${tool.slug}`}
                  className="group bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-lime-400 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-lime-100/80 rounded-lg flex items-center justify-center text-sm sm:text-base shrink-0 group-hover:scale-105 transition-transform">
                        📸
                      </div>
                      <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-lime-700 transition-colors line-clamp-1 leading-snug">
                        {tool.h1.split("—")[0].trim()}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {tool.metaDescription}
                    </p>
                  </div>
                </Link>
              ))}
              <Link 
                href="/us-passport-photo-editor"
                className="group bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-lime-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-lime-100/80 rounded-lg flex items-center justify-center text-sm sm:text-base shrink-0 group-hover:scale-105 transition-transform">
                      🇺🇸
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-lime-700 transition-colors line-clamp-1 leading-snug">
                      US Passport Photo Checker & 2×2 Maker
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    Convert any selfie to official 2 × 2 inch (51 × 51 mm) US passport and visa photos with instant rejection checks.
                  </p>
                </div>
              </Link>
              <Link 
                href="/uk-passport-size-photo-maker"
                className="group bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-lime-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-lime-100/80 rounded-lg flex items-center justify-center text-sm sm:text-base shrink-0 group-hover:scale-105 transition-transform">
                      📸
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-lime-700 transition-colors line-clamp-1 leading-snug">
                      UK Passport Size Photo Maker
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    Create a compliant UK passport or visa photo online. Automatic biometric checks and background removal.
                  </p>
                </div>
              </Link>
              <Link 
                href="/passport-photo-checker"
                className="group bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-lime-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-lime-100/80 rounded-lg flex items-center justify-center text-sm sm:text-base shrink-0 group-hover:scale-105 transition-transform">
                      🌍
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-lime-700 transition-colors line-clamp-1 leading-snug">
                      Passport Photo Checker
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    Universal compliance validator for 50+ countries. Instant biometric PASS/FAIL report.
                  </p>
                </div>
              </Link>
              <Link 
                href="/us-check-photo-green-card"
                className="group bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-lime-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-lime-100/80 rounded-lg flex items-center justify-center text-sm sm:text-base shrink-0 group-hover:scale-105 transition-transform">
                      🟢
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-lime-700 transition-colors line-clamp-1 leading-snug">
                      Green Card Photo Checker
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    Check 2×2 inch photos for USCIS forms like I-485, I-130 and I-765 before you file.
                  </p>
                </div>
              </Link>
              <Link 
                href="/australian-passport-photo-checker"
                className="group bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-lime-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-lime-100/80 rounded-lg flex items-center justify-center text-sm sm:text-base shrink-0 group-hover:scale-105 transition-transform">
                      🇦🇺
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-lime-700 transition-colors line-clamp-1 leading-snug">
                      Australian Passport Photo Checker
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    Verify DFAT &amp; APO rules: 35×45mm, 32–36mm face height, plain white background, and no glasses.
                  </p>
                </div>
              </Link>
              <Link 
                href="/diversity-visa-lottery-photo-checker"
                className="group bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-lime-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-lime-100/80 rounded-lg flex items-center justify-center text-sm sm:text-base shrink-0 group-hover:scale-105 transition-transform">
                      🎟️
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-lime-700 transition-colors line-clamp-1 leading-snug">
                      DV Lottery Photo Checker
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    Official US Green Card lottery 600×600 px photo validation: 50–69% head ratio, zero eyewear.
                  </p>
                </div>
              </Link>
              <Link 
                href="/singapore-ica-photo"
                className="group bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-lime-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-lime-100/80 rounded-lg flex items-center justify-center text-sm sm:text-base shrink-0 group-hover:scale-105 transition-transform">
                      🏛️
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-lime-700 transition-colors line-clamp-1 leading-snug">
                      Singapore ICA Photo Guide
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    Complete guidelines and online tool for Singapore Immigration &amp; Checkpoints Authority uploads.
                  </p>
                </div>
              </Link>
              <Link
                href="/resize-passport-photo-singapore"
                className="group bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-lime-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-lime-100/80 rounded-lg flex items-center justify-center text-sm sm:text-base shrink-0 group-hover:scale-105 transition-transform">
                      🇸🇬
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-lime-700 transition-colors line-clamp-1 leading-snug">
                      Singapore Passport Photo Resizer
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    Resize to 35 × 45 mm (413 × 531 px) with pure white background for MyICA online.
                  </p>
                </div>
              </Link>
              <Link
                href="/indian-passport-size-photograph"
                className="group bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-lime-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-lime-100/80 rounded-lg flex items-center justify-center text-sm sm:text-base shrink-0 group-hover:scale-105 transition-transform">
                      📸
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-lime-700 transition-colors line-clamp-1 leading-snug">
                      Indian Passport Size Photograph
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    Official 45 × 35 mm (630 × 810 px) ICAO compliant photo tool for Indian passport applications.
                  </p>
                </div>
              </Link>
              <a
                href="https://idphoto.us/"
                className="group bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-lime-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-lime-100/80 rounded-lg flex items-center justify-center text-sm sm:text-base shrink-0 group-hover:scale-105 transition-transform">
                      🪪
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-lime-700 transition-colors line-clamp-1 leading-snug">
                      IDPhoto.us – Our Sister Site
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    US-focused ID photo tools from the PixPassport team: 2×2 photos, driver&apos;s licence and more.
                  </p>
                </div>
              </a>
            </div>
          </div>
        </section>

        <HomeGuides />

        <HomeSections basePrice={basePrice} />
        <HomeFAQ />
      </div>
    </>
  );
}
