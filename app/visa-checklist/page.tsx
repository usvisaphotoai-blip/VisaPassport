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
    "Free 2026 visa document checklists with fees, processing times and photo specs. Check your documents for missing or incorrect files before you apply.",
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
      "Free 2026 visa document checklists for the UK, US, Canada and more. Check what you have, what's missing and what needs fixing before you apply.",
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
    a: "Many visa delays and refusals come down to preventable technicalities: missing leave authorization clauses in employer letters, unexplained bank statement deposits, non-compliant biometric photograph dimensions, or mismatched dates between flights and hotel reservations. PixPassport audits your prepared files against the destination consulate's exact criteria so you can fix issues before you apply.",
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

      <div className="min-h-screen bg-white text-slate-900">
        {/* ── Hero ── */}
        <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-16 sm:pt-12 sm:pb-24">
          <div className="max-w-6xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-10">
              <ol className="flex items-center gap-2 text-sm text-slate-500">
                <li>
                  <Link href="/" className="hover:text-slate-900 transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-slate-300">/</li>
                <li className="text-slate-900">Visa Checklists</li>
              </ol>
            </nav>

            <VisaDocumentAuditHero />
          </div>
        </header>

        {/* ── Why not a generic list ── */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-slate-50 border-y border-slate-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-3">
              A list tells you what to bring. We check what you have.
            </h2>
            <p className="text-slate-600 text-center max-w-xl mx-auto mb-10">
              Official requirements are free. The hard part is knowing whether your own files meet them.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white border border-slate-200">
                <p className="text-sm font-medium text-slate-500 mb-3">Generic checklist</p>
                <p className="text-lg text-slate-700 mb-4">&ldquo;Here are the documents you may need.&rdquo;</p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  You still have to guess whether your bank balance, photo size or employer letter wording is right.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-lime-300 ring-4 ring-lime-500/10">
                <p className="text-sm font-medium text-lime-700 mb-3">PixPassport audit</p>
                <p className="text-lg text-slate-900 font-medium mb-4">
                  &ldquo;Here is what you have, what&apos;s missing, and what needs fixing.&rdquo;
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Photo checks, document quality, date and name consistency, and missing items flagged before you submit.
                </p>
              </div>
            </div>
          </div>
        </section>

        <main className="px-4 sm:px-6 lg:px-8">
          {/* ── Country directory ── */}
          <section id="country-directory" className="max-w-6xl mx-auto py-16 sm:py-24 scroll-mt-20">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">Choose your destination</h2>
              <p className="text-slate-600">
                Document checklists, fees, processing times and photo specs for {countries.length} countries, with more being added.
              </p>
            </div>

            <VisaChecklistDirectoryClient countries={countries} />
          </section>

          {/* ── 4 steps ── */}
          <section className="max-w-6xl mx-auto py-16 sm:py-20 border-t border-slate-100">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-12">
              How to prepare your application
            </h2>

            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              {[
                {
                  title: "Pick your visa",
                  body: "Choose the country and visa category: tourist, student, business, work or super visa.",
                },
                {
                  title: "Check your finances",
                  body: "Six months of bank statements, explained large deposits, and recent tax returns.",
                },
                {
                  title: "Get the photo right",
                  body: "Size, head height and background must match the consulate's exact rules.",
                },
                {
                  title: "Print and submit",
                  body: "Tick off each document, save your checklist as PDF and bring it to your appointment.",
                },
              ].map((step, i) => (
                <li key={step.title}>
                  <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-slate-900 text-white text-sm font-semibold mb-4">
                    {i + 1}
                  </span>
                  <h3 className="font-semibold mb-1.5">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.body}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* ── Photo CTA ── */}
          <section className="max-w-6xl mx-auto">
            <div className="rounded-3xl bg-lime-50 border border-lime-100 px-6 py-12 sm:px-12 sm:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-xl">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                  Don&apos;t let the photo delay your visa
                </h2>
                <p className="text-slate-600">
                  Upload a selfie and get a photo cropped to your embassy&apos;s exact size, with a clean background.
                </p>
              </div>
              <Link
                href="/passport-photo-online"
                className="shrink-0 inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm py-3.5 px-6 rounded-xl transition-colors"
              >
                Make my visa photo
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section className="max-w-3xl mx-auto py-16 sm:py-24">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-10">
              Frequently asked questions
            </h2>
            <FaqAccordion faqs={GLOBAL_FAQS} />
          </section>
        </main>
      </div>
    </>
  );
}
