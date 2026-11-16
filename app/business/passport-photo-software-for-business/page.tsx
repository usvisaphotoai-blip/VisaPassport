import type { Metadata } from "next";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import rawSpecs from "@/data/countries-specs.json";
import BusinessROICalculator from "./BusinessROICalculator";
import BusinessPricing from "./BusinessPricing";
import { BUSINESS_PLAN_LIST } from "@/lib/business-plans";

interface CountrySpec {
  id: string;
  name: string;
  country: string;
  flag: string;
  width_mm: number;
  height_mm: number;
  width_px: number;
  height_px: number;
  head_min_pct: number;
  head_max_pct: number;
  eye_min_pct: number;
  eye_max_pct: number;
  bg_color: string;
  print_size: string;
  dpi: number;
}

const specs = rawSpecs as CountrySpec[];
const TOTAL_SPECS = specs.length;
const UNIQUE_COUNTRIES = new Set(specs.map((s) => s.country)).size;

const BASE_URL = "https://www.pixpassport.com";
const PAGE_URL = `${BASE_URL}/business/passport-photo-software-for-business`;
const OG_IMAGE = `${BASE_URL}/og-image.jpg`;

function fitGrid(
  sheetW: number,
  sheetH: number,
  photoW: number,
  photoH: number,
  margin = 5,
  gap = 3
) {
  const cols = Math.max(
    0,
    Math.floor((sheetW - 2 * margin + gap + 1e-6) / (photoW + gap))
  );
  const rows = Math.max(
    0,
    Math.floor((sheetH - 2 * margin + gap + 1e-6) / (photoH + gap))
  );
  return { cols, rows, max: cols * rows };
}

function bestSheetYield(
  paperW: number,
  paperH: number,
  photoW: number,
  photoH: number,
  margin = 5,
  gap = 3
) {
  const shortSide = Math.min(paperW, paperH);
  const longSide = Math.max(paperW, paperH);
  const portrait = fitGrid(shortSide, longSide, photoW, photoH, margin, gap);
  const landscape = fitGrid(longSide, shortSide, photoW, photoH, margin, gap);
  return landscape.max > portrait.max ? landscape : portrait;
}

interface DimensionGroup {
  key: string;
  widthMm: number;
  heightMm: number;
  count: number;
  examples: string[];
  yield4x6: number;
  yieldA4: number;
}

function buildDimensionSummary(): DimensionGroup[] {
  const map = new Map<
    string,
    {
      widthMm: number;
      heightMm: number;
      count: number;
      countries: Set<string>;
      examples: string[];
    }
  >();

  for (const s of specs) {
    const key = `${s.width_mm}x${s.height_mm}`;
    let entry = map.get(key);
    if (!entry) {
      entry = {
        widthMm: s.width_mm,
        heightMm: s.height_mm,
        count: 0,
        countries: new Set<string>(),
        examples: [],
      };
      map.set(key, entry);
    }
    entry.count += 1;
    if (!entry.countries.has(s.country)) {
      entry.countries.add(s.country);
      if (entry.examples.length < 4) {
        entry.examples.push(`${s.flag} ${s.country}`);
      }
    }
  }

  return Array.from(map.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 8)
    .map(([key, val]) => ({
      key,
      widthMm: val.widthMm,
      heightMm: val.heightMm,
      count: val.count,
      examples: val.examples,
      yield4x6: bestSheetYield(101.6, 152.4, val.widthMm, val.heightMm).max,
      yieldA4: bestSheetYield(210, 297, val.widthMm, val.heightMm).max,
    }));
}

const DIMENSION_GROUPS = buildDimensionSummary();

export const metadata: Metadata = {
  title:
    "Passport Photo Software for Business – Studios, Retail & Agencies | PixPassport",
  description: `Cloud passport photo software for photo studios, pharmacies, print shops, and travel agencies. ${TOTAL_SPECS} templates across ${UNIQUE_COUNTRIES} countries, 300 DPI print sheets. Plans from $100/month (2,000 photos) or $199/month unlimited.`,
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
  openGraph: {
    title:
      "Passport Photo Software for Business – Studios, Retail & Agencies | PixPassport",
    description: `Turn any counter browser into a compliant ID & visa photo station. ${TOTAL_SPECS} formats, automated biometric diagnostics, and 300 DPI 4×6, 6×8, A4, and custom print sheets.`,
    url: PAGE_URL,
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "PixPassport passport photo software for business and print studios",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Passport Photo Software for Business – Studios, Retail & Agencies | PixPassport",
    description: `${TOTAL_SPECS} templates (${UNIQUE_COUNTRIES} countries), 300 DPI print sheets, and zero hardware dongles. Built for studios, pharmacies, and visa desks.`,
    images: [OG_IMAGE],
  },
};

const FAQS = [
  {
    q: "How much does PixPassport Business cost?",
    a: "There are two plans. Business Starter is $100 per month and includes up to 2,000 processed photos and up to 3 staff logins. Business Unlimited is $199 per month with unlimited photos, unlimited staff logins and priority support. Each payment covers 30 days of access with no automatic renewal.",
  },
  {
    q: "What happens after I pay?",
    a: "Your plan is activated immediately and a tax invoice is emailed to you. You then complete a short workspace setup form (workspace name, admin and staff login emails, printer and paper sizes). Our team creates your cloud workspace and emails login details within 1 business day.",
  },
  {
    q: "What happens if we go over 2,000 photos on Business Starter?",
    a: "We will contact you before your work is interrupted. You can upgrade to Business Unlimited for $199 per month at any time and keep processing without limits.",
  },
  {
    q: "Can our studio run PixPassport on macOS, iPads, Chromebooks, or mixed Windows counters?",
    a: "Yes. Because PixPassport runs directly in modern desktop and tablet browsers without requiring a Windows-only installer or hardware license dongle, studios and retail chains can operate identically on Windows PCs, Macs, iPads, Chromebooks, or Linux terminals.",
  },
  {
    q: "Which print paper sizes and printers work with PixPassport print sheets?",
    a: "Our print template generator supports 3.5×5 in (3R), 4×6 in (4R), 5×7 in (5R), 6×8 in (6R), 8×10 in (8R), 9×13 cm, 10×15 cm, 13×18 cm, A6, A5, A4, A3, Letter, Legal, Tabloid, and custom millimeter sizes from 50 mm to 500 mm. You can export up to 300 DPI print sheets with optional cut lines as PDF, JPG, or PNG for dye-sub thermal printers (such as DNP, Citizen, or Fujifilm systems via your OS print dialog) as well as inkjet and laser lab printers.",
  },
  {
    q: "Does PixPassport require buying a physical USB dongle or installing local printer drivers?",
    a: "No USB security keys or proprietary drivers are needed. Your counter staff generate compliant 300 DPI PDF, JPG, or PNG files directly in the browser and print them through your shop's existing OS printer queue or lab hot folder.",
  },
  {
    q: "How many country passport, visa, and ID templates are included?",
    a: `PixPassport currently includes ${TOTAL_SPECS} official document templates spanning ${UNIQUE_COUNTRIES} countries, including ICAO Doc 9303 35×45 mm passports, US 2×2 in (50.8×50.8 mm) passports and visas, Green Card formats, Canada 50×70 mm, China 33×48 mm, UK digital rules, and driving licence photos.`,
  },
  {
    q: "How does automated biometric checking reduce reprints and wasted paper?",
    a: "Before you send a sheet to the thermal or inkjet printer, PixPassport checks head height ratio, horizontal eye alignment, neutral pose, shadows, and lighting uniformity. Catching framing or glare mistakes on-screen saves costly 4×6 or 6×8 paper sheets and prevents repeat customer visits.",
  },
  {
    q: "What happens if an infant photo or tricky lighting shot needs manual help?",
    a: "Instead of tying up your counter operator for 15 minutes in Photoshop, business customers can send tough edge cases such as infant portraits or subtle studio shadows to our support team, who review and advise on the fix. Business Unlimited customers get priority support.",
  },
  {
    q: "Can we give customers both physical prints and digital embassy upload files?",
    a: "Yes. Many embassies, UK passport renewals, Indian OCI/e-Visa portals, and US DS-160 forms require an exact pixel-dimension digital JPEG alongside or instead of physical prints. PixPassport prepares both pixel-exact digital downloads and multi-copy 300 DPI print sheets from one capture.",
  },
  {
    q: "How are client portraits protected for agencies and HR departments?",
    a: "Uploads are protected with TLS 1.3 and 256-bit SSL in transit, AES-256 encryption at rest during processing, and automatic permanent deletion after 24 hours. Customer photos are never sold or used for third-party advertising.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PixPassport Business Passport Photo Suite",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web Browser (Windows, macOS, Linux, iPadOS, ChromeOS)",
  url: PAGE_URL,
  description: `Browser-based passport, visa, and biometric ID photo software supporting ${TOTAL_SPECS} country templates across ${UNIQUE_COUNTRIES} countries, automated biometric checks, and 300 DPI multi-size print sheet exports.`,
  offers: BUSINESS_PLAN_LIST.map((plan) => ({
    "@type": "Offer",
    name: plan.name,
    price: plan.priceUsd.toFixed(2),
    priceCurrency: "USD",
    url: `${PAGE_URL}#pricing`,
    availability: "https://schema.org/InStock",
    description: `${plan.photoLabel}, ${plan.seats.toLowerCase()}, 30-day access`,
  })),
  featureList: [
    `${TOTAL_SPECS} country passport, visa, and licence specifications across ${UNIQUE_COUNTRIES} countries`,
    "Up to 300 DPI print sheet generation (3R, 4R 4×6, 5R, 6R 6×8, 8R, A6–A3, Letter, Legal, Tabloid, custom mm)",
    "Automated biometric compliance diagnostics (head height, eye line, background uniformity, lighting)",
    "Cross-platform browser workflow requiring no Windows-only executable or USB hardware dongle",
    "PDF, JPG, and PNG export with cut lines",
    "Multi-user cloud workspace with staff logins",
    "TLS 1.3 transport, AES-256 encryption at rest, and 24-hour auto-deletion",
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
      item: `${BASE_URL}/business`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Passport Photo Software for Business",
      item: PAGE_URL,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const INDUSTRIES = [
  {
    tag: "Studios & Photo Labs",
    title: "Photo Studios & Instant Print Counters",
    description:
      "Replace manual Photoshop templates and aging single-PC software with one fast browser station. Pack multiple copies per 4×6 (4R), 6×8 (6R), or A4 sheet at 300 DPI with crisp trim lines.",
  },
  {
    tag: "Retail & Convenience",
    title: "Pharmacies, Copy Shops & Mail Counters",
    description:
      "Any store clerk can follow guided on-screen framing and automated compliance checks without learning photo editing tools—keeping queue times short and cut accuracy high.",
  },
  {
    tag: "Immigration & Travel",
    title: "Visa Agencies & Travel Consultants",
    description:
      "Switch smoothly between US 2×2, Schengen 35×45 mm, UK digital standards, and Green Card formats while catching rejection triggers before embassy portal submission.",
  },
  {
    tag: "Institutions & HR",
    title: "Universities, HR Desks & Permit Offices",
    description:
      "Standardize employee badge, student ID, and driving permit headshots from laptops or tablets with automated 24-hour file deletion for strict privacy peace of mind.",
  },
];

const COMPARISON_ROWS = [
  {
    criterion: "Device & OS Compatibility",
    pixpassport: "Runs in Chrome, Safari, Edge on Windows, macOS, iPadOS, ChromeOS & Linux",
    desktop: "Usually Windows-only (.exe) locked per operating system version",
    api: "Server-side HTTP endpoint only; no out-of-the-box counter screen",
  },
  {
    criterion: "Installation & Licensing Friction",
    pixpassport: "Zero install; no USB security dongles to lose or break at the counter",
    desktop: "Manual installer, serial keys, or physical USB dongle per workstation",
    api: "Requires software developers to build UI, authentication & print export",
  },
  {
    criterion: "Pre-Print Biometric Checks",
    pixpassport: "30+ automated checks (head %, eye line, tilt, uniform lighting, background)",
    desktop: "Varies by tier; often relies on manual operator overlay inspection",
    api: "Depends on vendor JSON responses; operator guidance must be custom-built",
  },
  {
    criterion: "Print Sheet Flexibility",
    pixpassport: "3.5×5, 4×6, 5×7, 6×8, 8×10, A6–A3, Letter, Legal, Tabloid & custom mm up to 300 DPI",
    desktop: "Tied to local Windows print driver templates",
    api: "Typically returns a single cropped portrait; you code sheet tiling yourself",
  },
  {
    criterion: "Edge-Case & Infant Safety Net",
    pixpassport: "Escalate tricky captures to our support team (priority on Unlimited)",
    desktop: "Operator must manually fix lighting or infant framing",
    api: "Fully automated; rejected edge cases require manual external retouching",
  },
  {
    criterion: "Updates to Government Rules",
    pixpassport: "Automatic cloud updates across all counter browsers immediately",
    desktop: "Requires downloading patches or buying annual major version upgrades",
    api: "API schema updates require periodic backend integration maintenance",
  },
];

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Capture on Any Counter Hardware",
    body: "Shoot with your studio DSLR/mirrorless camera, counter webcam, or tablet/smartphone and upload the JPEG, PNG, or WebP directly into the PixPassport browser workspace.",
  },
  {
    step: "02",
    title: `Pick From ${TOTAL_SPECS} Official Templates`,
    body: `Select US 2×2 in, ICAO 35×45 mm, Canada 50×70 mm, China 33×48 mm, or any of ${UNIQUE_COUNTRIES} supported countries. Background cleanup and eye-line scaling happen automatically.`,
  },
  {
    step: "03",
    title: "Pass Biometric Checks Before Printing",
    body: "Verify chin-to-crown ratio, eye symmetry, neutral expression, and shadow-free studio backdrop on screen—preventing wasted dye-sub ribbon and customer retakes.",
  },
  {
    step: "04",
    title: "Export 300 DPI Print Sheet + Digital Copy",
    body: "Download a print-ready 4×6, 6×8, A4, or custom PDF/JPG/PNG sheet with precision crop marks alongside a portal-ready digital portrait for e-Visa and online renewals.",
  },
];

export default function BusinessSoftwarePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <Breadcrumbs
            items={[
              { label: "Business", href: "/business" },
              {
                label: "Passport Photo Software for Business",
                href: "/business/passport-photo-software-for-business",
              },
            ]}
          />

          <div className="mt-5 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center rounded-full border border-lime-300 bg-lime-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-lime-800">
                Commercial ID & Visa Photo Suite
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Passport Photo Software for Business
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                Fast, cross-platform passport and visa photo software for photo
                studios, print shops, retail pharmacies, and travel agencies.
                Process portraits across {TOTAL_SPECS} country specifications, verify
                biometrics before printing, and generate 300 DPI print sheets from
                any browser—without Windows-only installers or USB dongles.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                >
                  See Plans – from $100/month
                </a>
                <a
                  href="#roi-calculator"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-lime-500 hover:bg-lime-50/40"
                >
                  Calculate Your Profit
                </a>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Built for Counter Speed
                </div>
                <ul className="space-y-2.5 text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-lime-400 bg-lime-100 text-xs font-bold text-lime-900">
                      ✓
                    </span>
                    <span>
                      Works on existing Windows, Mac, iPad, or Chromebook screens
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-lime-400 bg-lime-100 text-xs font-bold text-lime-900">
                      ✓
                    </span>
                    <span>
                      Outputs 4×6 (4R), 6×8 (6R), A4, Letter & custom mm PDF/JPG/PNG
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-lime-400 bg-lime-100 text-xs font-bold text-lime-900">
                      ✓
                    </span>
                    <span>
                      Automated background uniforming & 30+ biometric checks
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-lime-400 bg-lime-100 text-xs font-bold text-lime-900">
                      ✓
                    </span>
                    <span>
                      Cloud workspace with staff logins — set up within 1 business day
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 4 Metric Cards */}
          <div className="mt-10 grid grid-cols-2 gap-3.5 sm:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="text-xs font-medium text-slate-500">
                Global Format Library
              </div>
              <div className="mt-1 text-2xl font-bold text-slate-900">
                {TOTAL_SPECS} specs
              </div>
              <div className="mt-0.5 text-xs text-slate-600">
                {UNIQUE_COUNTRIES} countries & visa types
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="text-xs font-medium text-slate-500">
                Lab-Grade Output
              </div>
              <div className="mt-1 text-2xl font-bold text-slate-900">
                300 DPI Max
              </div>
              <div className="mt-0.5 text-xs text-slate-600">
                Print PDF, JPG & PNG with trim guides
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="text-xs font-medium text-slate-500">
                Automated Diagnostics
              </div>
              <div className="mt-1 text-2xl font-bold text-slate-900">
                30+ Checks
              </div>
              <div className="mt-0.5 text-xs text-slate-600">
                Head ratio, eyes, backdrop & glare
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="text-xs font-medium text-slate-500">
                Deployment Model
              </div>
              <div className="mt-1 text-2xl font-bold text-slate-900">
                Zero Dongles
              </div>
              <div className="mt-0.5 text-xs text-slate-600">
                No per-PC hardware keys or installs
              </div>
            </div>
          </div>

          {/* Quick Jump Bar */}
          <nav
            aria-label="Page sections"
            className="mt-8 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-5 text-xs font-semibold"
          >
            <span className="mr-1 text-slate-500 uppercase tracking-wide">
              Jump to:
            </span>
            <a
              href="#industries"
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-700 hover:border-lime-500 hover:bg-white"
            >
              Use Cases
            </a>
            <a
              href="#pricing"
              className="rounded-lg border border-lime-400 bg-lime-50 px-3 py-1.5 text-lime-900 hover:border-lime-600"
            >
              Pricing
            </a>
            <a
              href="#roi-calculator"
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-700 hover:border-lime-500 hover:bg-white"
            >
              Profit & Sheet Yield Calculator
            </a>
            <a
              href="#comparison"
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-700 hover:border-lime-500 hover:bg-white"
            >
              Compare Software Types
            </a>
            <a
              href="#workflow"
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-700 hover:border-lime-500 hover:bg-white"
            >
              Counter Workflow
            </a>
            <a
              href="#sheet-yields"
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-700 hover:border-lime-500 hover:bg-white"
            >
              Country Print Yields
            </a>
            <a
              href="#hardware-security"
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-700 hover:border-lime-500 hover:bg-white"
            >
              Printers & Security
            </a>
            <a
              href="#faq"
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-700 hover:border-lime-500 hover:bg-white"
            >
              FAQs
            </a>
          </nav>
        </div>
      </section>

      {/* Industries */}
      <section
        id="industries"
        className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Who Uses PixPassport Business Workflows
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Designed around fast walk-in throughput and zero-reprint accuracy across
            studios, retail counters, and visa advisory desks.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">
          {INDUSTRIES.map((card) => (
            <article
              key={card.title}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6"
            >
              <div>
                <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
                  {card.tag}
                </span>
                <h3 className="mt-3 text-xl font-bold text-slate-900">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Interactive ROI & Sheet Yield Calculator */}
      <section
        id="roi-calculator"
        className="border-y border-slate-200 bg-white"
      >
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Model Your Studio Print Yield & Monthly Profit
            </h2>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Walk-in ID photography is one of the highest-margin counter services
              a shop can offer—when print layouts waste zero media and require no
              manual retouching.
            </p>
          </div>

          <BusinessROICalculator />
        </div>
      </section>

      {/* Pricing & Checkout */}
      <section
        id="pricing"
        className="scroll-mt-20 mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-lime-300 bg-lime-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-lime-800">
            Simple business pricing
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            One Cloud Workspace. Two Simple Plans.
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Every plan includes all {TOTAL_SPECS} document templates, 300 DPI print
            sheets and biometric checks. Choose a plan, enter your business details,
            pay securely, then set up your team.
          </p>
        </div>
        <div className="mt-9">
          <BusinessPricing />
        </div>
      </section>

      {/* Category Comparison */}
      <section
        id="comparison"
        className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Browser Suite vs. Legacy Desktop Software vs. REST APIs
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Traditional business options force you to pick between Windows-only
            dongle executables or raw developer APIs that provide no counter UI.
            PixPassport combines turnkey visual editing with zero-install rollout.
          </p>
        </div>

        <div className="mt-7 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="p-4 font-semibold text-slate-700 w-[22%]">
                  Evaluation Criterion
                </th>
                <th className="p-4 font-bold text-lime-950 bg-lime-50/70 w-[28%]">
                  PixPassport Browser Suite
                </th>
                <th className="p-4 font-semibold text-slate-700 w-[25%]">
                  Legacy Windows Desktop Apps
                </th>
                <th className="p-4 font-semibold text-slate-700 w-[25%]">
                  Developer-Only REST APIs
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.criterion} className="align-top">
                  <td className="p-4 font-semibold text-slate-900">
                    {row.criterion}
                  </td>
                  <td className="bg-lime-50/30 p-4 font-medium text-slate-900">
                    {row.pixpassport}
                  </td>
                  <td className="p-4 text-slate-600">{row.desktop}</td>
                  <td className="p-4 text-slate-600">{row.api}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4-Step Counter Workflow */}
      <section
        id="workflow"
        className="border-y border-slate-200 bg-white"
      >
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                How Counter Operators Process a Customer in 4 Steps
              </h2>
              <p className="mt-2 text-sm text-slate-600 sm:text-base">
                Go from shutter click or customer phone upload to cut-ready 300 DPI
                prints in under a minute.
              </p>
            </div>
            <a
              href="#pricing"
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-slate-800"
            >
              Get Your Workspace →
            </a>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WORKFLOW_STEPS.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5"
              >
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-lime-400 bg-lime-100 text-xs font-bold text-lime-900">
                  {item.step}
                </div>
                <h3 className="mt-3.5 text-base font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Country Dimensions & Exact Sheet Yield Table */}
      <section
        id="sheet-yields"
        className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Supported Document Sizes & Print Sheet Capacity
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Computed directly from our live database of {TOTAL_SPECS} specs across{" "}
            {UNIQUE_COUNTRIES} countries using standard 5 mm printer margins and 3 mm
            trim gaps (choosing portrait or landscape sheet rotation automatically for
            maximum photos per sheet).
          </p>
        </div>

        <div className="mt-7 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full min-w-[680px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="p-4 font-semibold text-slate-700">Photo Size</th>
                <th className="p-4 font-semibold text-slate-700">
                  Document Formats
                </th>
                <th className="p-4 font-semibold text-slate-700">
                  Key Issuing Countries
                </th>
                <th className="p-4 font-semibold text-slate-700">
                  4×6 in (4R) Yield
                </th>
                <th className="p-4 font-semibold text-slate-700">A4 Yield</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {DIMENSION_GROUPS.map((row) => (
                <tr key={row.key}>
                  <td className="p-4 font-mono font-semibold text-slate-900">
                    {row.widthMm} × {row.heightMm} mm
                  </td>
                  <td className="p-4 text-slate-700">
                    {row.count} {row.count === 1 ? "template" : "templates"}
                  </td>
                  <td className="p-4 text-slate-600">
                    {row.examples.join(" · ")}
                  </td>
                  <td className="p-4 font-semibold text-slate-900">
                    {row.yield4x6} photos
                  </td>
                  <td className="p-4 font-semibold text-slate-900">
                    {row.yieldA4} photos
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          5×7, 6×8 (6R), 8×10, Letter, Legal, Tabloid, borderless 0 mm margins and
          custom millimeter sizes are all available inside your business workspace.
        </p>
      </section>

      {/* Hardware Compatibility & Security */}
      <section
        id="hardware-security"
        className="border-y border-slate-200 bg-white"
      >
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Hardware Flexibility & Client Data Security
          </h2>

          <div className="mt-7 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700">
                Cameras, Terminals & Lab Printers
              </span>
              <h3 className="mt-3 text-xl font-bold text-slate-900">
                Works With Your Existing Equipment
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
                <li>
                  <strong className="text-slate-900">Cameras:</strong> Accepts
                  standard JPEG, PNG, and WebP photos from studio DSLRs, mirrorless
                  bodies, counter webcams, tablets, or customer smartphones.
                </li>
                <li>
                  <strong className="text-slate-900">Terminals:</strong> Runs inside
                  modern browsers across Windows 10/11, macOS, Linux, iPadOS, and
                  Chromebooks with zero local software patches.
                </li>
                <li>
                  <strong className="text-slate-900">Printers:</strong> Export exact
                  300 DPI PDF, JPG, or PNG sheets sized for 4×6 / 6×8 dye-sub
                  printers (DNP, Citizen, Fujifilm via system print/hot folders) or
                  studio A4/Letter photo printers.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
              <span className="inline-flex items-center rounded-full border border-lime-300 bg-lime-50 px-2.5 py-1 text-xs font-semibold text-lime-900">
                Biometric Privacy Standards
              </span>
              <h3 className="mt-3 text-xl font-bold text-slate-900">
                Zero Long-Term Storage of Customer Faces
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
                <li>
                  <strong className="text-slate-900">Encrypted Transit:</strong> All
                  uploads and processed downloads travel over TLS 1.3 and 256-bit
                  SSL connections.
                </li>
                <li>
                  <strong className="text-slate-900">Encrypted Processing:</strong>{" "}
                  Files held briefly for processing or expert QA are protected with
                  AES-256 encryption at rest.
                </li>
                <li>
                  <strong className="text-slate-900">
                    Automatic 24-Hour Deletion:
                  </strong>{" "}
                  Uploaded portraits and sheets purge automatically within 24 hours—no
                  permanent third-party profiling or ad targeting.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section
        id="faq"
        className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Business & Studio Software FAQs
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Practical answers on printer compatibility, multi-OS setup, print
            economics, and customer privacy.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {FAQS.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-slate-200 bg-white p-5 open:border-lime-500"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-bold text-slate-900">
                <span>{item.q}</span>
                <span className="shrink-0 text-slate-400 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Commercial CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white sm:p-10">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Ready to Modernize Your Passport & Visa Photo Counter?
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-300 sm:text-base">
                Pick Business Starter ($100/month, 2,000 photos) or Business Unlimited
                ($199/month). Pay securely, complete a 2-minute setup form, and your
                cloud workspace is ready within 1 business day.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center rounded-xl bg-lime-500 px-5 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-lime-400"
              >
                Choose a Plan
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
