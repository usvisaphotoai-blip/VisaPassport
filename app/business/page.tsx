import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import rawSpecs from "@/data/countries-specs.json";

interface CountrySpec {
  id: string;
  name: string;
  country: string;
  flag: string;
  width_mm: number;
  height_mm: number;
  width_px: number;
  height_px: number;
  bg_color: string;
  print_size: string;
  dpi: number;
}

const specs = rawSpecs as CountrySpec[];
const TOTAL_SPECS = specs.length;
const UNIQUE_COUNTRIES = new Set(specs.map((s) => s.country)).size;

const BASE_URL = "https://www.pixpassport.com";
const PAGE_URL = `${BASE_URL}/business`;
const OG_IMAGE = `${BASE_URL}/og-image.jpg`;

export const metadata: Metadata = {
  title: "PixPassport for Business – Browser ID Photo & Print Software Hub",
  description: `Browser-based passport and visa photo workspace for studios, copy shops, pharmacies, and travel agencies. ${TOTAL_SPECS} templates across ${UNIQUE_COUNTRIES} countries, 300 DPI print sheets, and zero USB dongles.`,
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
  openGraph: {
    title: "PixPassport for Business – Browser ID Photo & Print Software Hub",
    description: `Prepare compliant passport & visa photos across ${TOTAL_SPECS} specs (${UNIQUE_COUNTRIES} countries) and export 300 DPI 4×6, 6×8, A4, or custom print sheets from any browser.`,
    url: PAGE_URL,
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "PixPassport for Business workspace hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PixPassport for Business – Browser ID Photo & Print Software Hub",
    description: `${TOTAL_SPECS} ID templates across ${UNIQUE_COUNTRIES} countries. Run biometric checks and build 300 DPI print sheets on Windows, macOS, iPad, or Chromebook.`,
    images: [OG_IMAGE],
  },
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "PixPassport for Business",
  url: PAGE_URL,
  description:
    "Commercial passport photo creation, biometric validation, and print sheet layout tools for photo studios, retail counters, and visa agencies.",
  hasPart: [
    {
      "@type": "WebPage",
      name: "Passport Photo Software for Business",
      url: `${BASE_URL}/business/passport-photo-software-for-business`,
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: BASE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Business",
      item: PAGE_URL,
    },
  ],
};

const CORE_SOLUTIONS = [
  {
    badge: "Flagship Guide & ROI Calculator",
    title: "Passport Photo Software for Business",
    description:
      "Full commercial breakdown comparing browser studio workflows against legacy Windows installers and REST APIs, plus an interactive print-sheet profit calculator.",
    href: "/business/passport-photo-software-for-business#pricing",
    cta: "View Plans & Pricing",
    highlight: true,
  },
  {
    badge: "Up to 300 DPI Print Sheets",
    title: "Multi-Size Print Template Generator",
    description:
      "Tile any ID size across 3.5×5, 4×6, 5×7, 6×8, 8×10, A6–A3, Letter, Legal, Tabloid, or custom mm media with crop marks in PDF, JPG, or PNG.",
    href: "/business/passport-photo-software-for-business#sheet-yields",
    cta: "See Print Sheet Capacity",
    highlight: false,
  },
  {
    badge: `${TOTAL_SPECS} Specs · ${UNIQUE_COUNTRIES} Countries`,
    title: "AI Passport & Visa Photo Workspace",
    description:
      "Remove uneven studio backgrounds, center eye lines to official geometry, and prepare digital embassy uploads or printable packs from any counter screen.",
    href: "/business/passport-photo-software-for-business#workflow",
    cta: "See the Counter Workflow",
    highlight: false,
  },
  {
    badge: "Pre-Print QA",
    title: "Biometric Compliance Checker",
    description:
      "Catch off-center eyes, uneven illumination, harsh shadows, or head-height drift before burning thermal ribbon or glossy 4×6 media.",
    href: "/business/passport-photo-software-for-business#comparison",
    cta: "Compare Software Options",
    highlight: false,
  },
];

const VERTICAL_USE_CASES = [
  {
    title: "Photo Studios & Print Shops",
    summary:
      "Standardize counter turnaround on macOS, Windows, iPad, or Chromebook without per-PC USB dongles. Route output to 4×6 (4R), 6×8 (6R), or A4 printers.",
  },
  {
    title: "Pharmacies & Shipping Counters",
    summary:
      "Allow part-time retail clerks to run repeatable walk-in ID photo checks with live biometric rules rather than eyeballing Photoshop guides.",
  },
  {
    title: "Visa Agencies & Travel Desks",
    summary:
      "Switch instantly between Schengen 35×45 mm, US 2×2 in, Green Card, and specialist national visa rules with pre-submission validation.",
  },
  {
    title: "HR, Campus & Access Credential Offices",
    summary:
      "Accept clean browser-processed headshots for staff badges and driving permits backed by TLS 1.3 transport encryption and 24-hour auto-deletion.",
  },
];

export default function BusinessHubPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <Breadcrumbs items={[{ label: "Business", href: "/business" }]} />

          <div className="mt-5 max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-lime-300 bg-lime-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-lime-800">
              PixPassport B2B & Commercial Hub
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              PixPassport for Business
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Browser-native passport, visa, and biometric ID photo software built
              for photo studios, print shops, retail pharmacy counters, and travel
              agencies. Prepare photos across {TOTAL_SPECS} compliant document
              formats in {UNIQUE_COUNTRIES} countries and export 300 DPI print
              sheets on any operating system—with no local installers or
              hardware USB dongles.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/business/passport-photo-software-for-business"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                Explore Passport Photo Software for Business
              </Link>
              <Link
                href="/business/passport-photo-software-for-business#pricing"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-lime-500 hover:bg-lime-50/40"
              >
                Plans from $100/month
              </Link>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3.5 sm:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="text-xs font-medium text-slate-500">
                Country & Visa Formats
              </div>
              <div className="mt-1 text-2xl font-bold text-slate-900">
                {TOTAL_SPECS} specs
              </div>
              <div className="mt-0.5 text-xs text-slate-600">
                Across {UNIQUE_COUNTRIES} countries
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="text-xs font-medium text-slate-500">
                Print Resolution
              </div>
              <div className="mt-1 text-2xl font-bold text-slate-900">
                Up to 300 DPI
              </div>
              <div className="mt-0.5 text-xs text-slate-600">
                PDF, JPG & PNG sheets
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="text-xs font-medium text-slate-500">
                OS Compatibility
              </div>
              <div className="mt-1 text-2xl font-bold text-slate-900">
                100% Browser
              </div>
              <div className="mt-0.5 text-xs text-slate-600">
                Windows, Mac, iPad, Linux
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="text-xs font-medium text-slate-500">
                Data Retention
              </div>
              <div className="mt-1 text-2xl font-bold text-slate-900">
                24-Hour Wipe
              </div>
              <div className="mt-0.5 text-xs text-slate-600">
                TLS 1.3 & AES-256 at rest
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Business Modules */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Commercial Tools & Documentation
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Everything your front desk or print operator needs to capture, verify,
            and output compliant government portraits.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">
          {CORE_SOLUTIONS.map((item) => (
            <article
              key={item.href}
              className={`flex flex-col justify-between rounded-2xl border p-6 transition-colors ${
                item.highlight
                  ? "border-lime-400 bg-white hover:border-lime-600"
                  : "border-slate-200 bg-white hover:border-lime-500"
              }`}
            >
              <div>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                    item.highlight
                      ? "border border-lime-300 bg-lime-50 text-lime-900"
                      : "border border-slate-200 bg-slate-50 text-slate-700"
                  }`}
                >
                  {item.badge}
                </span>
                <h3 className="mt-3.5 text-xl font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href={item.href}
                  className={`inline-flex items-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                    item.highlight
                      ? "bg-slate-900 text-white hover:bg-slate-800"
                      : "border border-slate-200 bg-slate-50 text-slate-900 hover:border-lime-500 hover:bg-lime-50"
                  }`}
                >
                  {item.cta} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Industry Verticals */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Built for Four High-Volume Counter Environments
              </h2>
              <p className="mt-2 text-sm text-slate-600 sm:text-base">
                Standardize training across locations without locking staff into a
                single Windows workstation.
              </p>
            </div>
            <Link
              href="/business/passport-photo-software-for-business#industries"
              className="text-sm font-semibold text-lime-700 hover:text-lime-800"
            >
              Compare vertical workflows →
            </Link>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VERTICAL_USE_CASES.map((vertical) => (
              <div
                key={vertical.title}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/50 p-5"
              >
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {vertical.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {vertical.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Review & Bottom CTA */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white sm:p-10">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Ready to Run Your Counter on PixPassport?
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-300 sm:text-base">
                Business Starter is $100/month for up to 2,000 photos. Business
                Unlimited is $199/month with unlimited photos and staff logins.
                Pay securely and your cloud workspace is ready within 1 business day.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              <Link
                href="/business/passport-photo-software-for-business#pricing"
                className="inline-flex items-center justify-center rounded-xl bg-lime-500 px-5 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-lime-400"
              >
                Choose a Plan
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
