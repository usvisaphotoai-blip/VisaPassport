import type { Metadata } from "next";
import Link from "next/link";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Online Passport & Visa Photo Editor | Official Biometric Photo Tool",
  description:
    "Free online passport, visa, and ID photo validator. Instantly verify biometric compliance for 50+ countries including US, UK, India, and Canada. Fix background and size issues instantly.",
  keywords: [
    "passport photo online",
    "visa photo maker online",
    "biometric photo tool",
    "india visa photo editor",
    "uk passport photo maker",
    "passport photo maker online",
    "online photo resizer for visa",
    "background remover for passport photo",
    "official biometric photo check",
    "how to take passport photo at home",
  ],
  alternates: {
    canonical: "https://www.pixpassport.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "PixPassport",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "2.99",
        "priceCurrency": "USD",
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "17000"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What are the common passport photo requirements?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Requirements vary by country. Common standards include specific dimensions (e.g., 35x45mm or 2x2in), a plain white or light-colored background, a neutral expression, and specific head-to-image ratios for biometric scanning."
          }
        },
        {
          "@type": "Question",
          "name": "How does this tool validate my photo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We use AI to run automated checks against official government specifications for over 50 countries: dimensions, file size, background uniformity, face detection, eye position, and sharp focus — all in under 5 seconds."
          }
        },
        {
          "@type": "Question",
          "name": "Is the validation really free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Photo validation is 100% free for all countries. You only pay a small fee (starting at $2.99) if you want to download a processed, fully compliant photo and print sheet."
          }
        },
        {
          "@type": "Question",
          "name": "Are my photos safe?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. All original photos are auto-deleted after 24 hours. We are fully GDPR and CCPA compliant. We never store or share your personal photos permanently."
          }
        }
      ]
    }
  ]
};

import HomeHero from "./components/HomeHero";
import HomeSections from "./components/HomeSections";
import HomeFAQ from "./components/HomeFAQ";
import toolPages from "../data/tool-seo-pages.json";
import "./home.css";

import { getLocalPrice } from "@/lib/currency";

export default async function Home() {
  // Use skipHeaders: true to keep the page static
  // We no longer need the full localPrice object here for display, 
  // as HomeSections will handle it via PriceDisplay client component.
  const basePrice = 5.99;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="hcr">
        <HomeHero />
        
        {/* Master Directory Entry Points */}
        <section className="bg-white py-12 border-y border-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 text-center sm:text-left">
              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-3xl border border-blue-100 group hover:shadow-lg transition-all">
                <div className="text-3xl mb-4">🛂</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Passport Photo Directory</h3>
                <p className="text-sm text-slate-600 mb-6">Browse official 2026 passport photo requirements for 50+ countries. Find the exact size for your application.</p>
                <Link href="/passport-photos" className="inline-flex items-center text-blue-600 font-bold hover:underline">
                  View All Countries <span className="ml-2">→</span>
                </Link>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-3xl border border-emerald-100 group hover:shadow-lg transition-all">
                <div className="text-3xl mb-4">🌐</div>
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
        <section className="bg-slate-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black text-slate-900 mb-10 text-center">Popular Photo Tools & Guides</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolPages.map((tool) => (
                <Link 
                  key={tool.slug}
                  href={`/${tool.slug}`}
                  className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-lime-400 hover:shadow-xl transition-all"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-lime-100 rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                      📸
                    </div>
                    <h3 className="font-bold text-slate-900 group-hover:text-lime-700 transition-colors">
                      {tool.h1.split("—")[0].trim()}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                    {tool.metaDescription}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <HomeSections basePrice={basePrice} />
        <HomeFAQ />
      </div>
    </>
  );
}
