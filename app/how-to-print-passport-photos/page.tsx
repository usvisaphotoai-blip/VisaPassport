import { Metadata } from "next";
import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import PrintTemplateApp from "../passport-photo-print-template-generator/PrintTemplateApp";

const SITE_URL = "https://www.pixpassport.com";
const PAGE_URL = `${SITE_URL}/how-to-print-passport-photos`;
const OG_IMAGE =
  "https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679205/MakePassportPhoto_ph2uog_ryefxt.webp";
const TITLE = "How to Print Passport Photos: Home, CVS, Walgreens & Online";
const DESCRIPTION =
  "Learn how to print passport photos at home, from your phone, at CVS, Walgreens or Walmart, or online. Free print sheet, correct sizes, settings and costs.";
const DATE_PUBLISHED = "2026-10-21";
const DATE_MODIFIED = "2026-10-21";
const TOOL_ID = "print-sheet-tool";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "article",
    url: PAGE_URL,
    // Page-level openGraph replaces the root one, so repeat the site-wide fields
    siteName: "PixPassport",
    locale: "en_US",
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "How to print passport photos at home, in store or online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const STEPS = [
  {
    title: "Get a compliant digital photo",
    text: "Start with a photo cropped to your country's size, with a plain light background and your head correctly positioned.",
  },
  {
    title: "Make a print sheet",
    text: "Upload the photo to the free tool on this page, pick the photo size and your paper (4×6, A4, Letter or any other size), and download the sheet: free in standard quality, or in 300 DPI HD.",
  },
  {
    title: "Print at 100% scale",
    text: "Print on photo paper at home, or order a standard print at a store. Always print at actual size with no cropping and no 'fit to page'.",
  },
  {
    title: "Check the size and cut",
    text: "Measure one photo with a ruler, then cut along the crop lines with scissors or a paper trimmer.",
  },
];

const SIZES = [
  { country: "United States (passport, visa, Green Card)", size: "2×2 in (51×51 mm)", note: "Head 1 to 1⅜ in (25–35 mm)" },
  { country: "United Kingdom", size: "35×45 mm", note: "Head 29–34 mm" },
  { country: "EU / Schengen countries", size: "35×45 mm", note: "Check your national rules" },
  { country: "Australia", size: "35×45 mm", note: "Printed photos for paper forms" },
  { country: "Canada", size: "50×70 mm (about 2×2¾ in)", note: "Two identical photos" },
  { country: "China", size: "33×48 mm", note: "Plain light background" },
];

const PRINT_OPTIONS = [
  {
    title: "Print at home",
    href: "#home",
    icon: "🖨️",
    best: "You own a color inkjet or photo printer",
    points: [
      "Load glossy or matte photo paper",
      "Open the PDF and match the paper size",
      "Scale 100% / Actual size, 'fit to page' off",
      "Quality: Best / Photo",
    ],
  },
  {
    title: "Print at a store",
    href: "#stores",
    icon: "🏪",
    best: "No printer, or you want lab quality",
    points: [
      "Download the JPG sheet",
      "Upload it to CVS, Walgreens, Walmart or any photo lab",
      "Order a standard 4×6 print",
      "Choose the option that does not crop the image",
    ],
  },
  {
    title: "Print online",
    href: "#online",
    icon: "📦",
    best: "You can wait a few days for delivery",
    points: [
      "Upload the JPG to a print service",
      "Pick 4×6 (10×15 cm) glossy or matte",
      "Turn off auto-enhance and auto-crop",
      "Order, then cut when it arrives",
    ],
  },
];

const PRINTER_SETTINGS = [
  { setting: "Scale", value: "100% / Actual size" },
  { setting: "Fit to page / Scale to fit", value: "Off" },
  { setting: "Borderless", value: "Off, except for six 2×2 photos on 4×6" },
  { setting: "Paper type", value: "Photo paper (glossy or matte)" },
  { setting: "Quality", value: "Best / Photo" },
  { setting: "Color", value: "Color, not grayscale" },
];

const COSTS = [
  { option: "Walmart Photo (two printed 2×2 photos)", price: "About $7.64", note: "Lowest in-store price in recent roundups" },
  { option: "USPS (where offered)", price: "About $15", note: "Often by appointment" },
  { option: "CVS passport photo service (two 2×2 photos)", price: "About $17.99", note: "Varies by store" },
  { option: "Walgreens passport photo service", price: "Varies by store", note: "Check the counter or Walgreens Photo" },
  { option: "Standard 4×6 print of your own sheet", price: "About $0.16–$0.39", note: "Depends on the retailer" },
  { option: "Home printing", price: "Well under $1 per sheet", note: "Photo paper plus a little ink" },
];

const MISTAKES = [
  { mistake: "'Fit to page' switched on", fix: "Turn it off and set scale to 100%. Otherwise every photo prints at the wrong size." },
  { mistake: "Paper size mismatch", fix: "Match the paper size in the print dialog to the paper in the tray." },
  { mistake: "Auto-enhance at the store", fix: "Disable color correction and red-eye tools. They alter skin tones and backgrounds." },
  { mistake: "Low-resolution source photo", fix: "Use the original file. Compressed copies print blurry." },
  { mistake: "Streaks or banding", fix: "Run a nozzle check, then set the paper type to photo paper." },
  { mistake: "Ink smudges when cutting", fix: "Let glossy prints dry for at least five minutes before you handle them." },
];

const faqs = [
  {
    q: "How do I print passport photos at home?",
    a: "Upload your passport photo to the print sheet tool on this page, choose the photo size and the paper in your printer, and download the sheet. Print it on photo paper at 100% (actual size) with 'fit to page' turned off. Then measure one photo and cut along the crop lines.",
  },
  {
    q: "How do I print a passport size photo?",
    a: "First crop your photo to the size your country requires, such as 2×2 inches for the US or 35×45 mm for the UK and EU. Next, place it on a print sheet with the free tool on this page. Finally, print the sheet at 100% scale on photo paper, or order it as a standard 4×6 print at a store.",
  },
  {
    q: "Can I print my own passport photos?",
    a: "Yes. Most passport offices, including the US State Department and HM Passport Office, accept self-printed photos if they meet the size and quality rules. The photo needs the correct dimensions, photo-quality paper, sharp detail, and no ink smears, banding or pixelation.",
  },
  {
    q: "How do I print passport photos at CVS?",
    a: "Download the JPG print sheet, upload it to the CVS Photo website or app, and order a standard 4×6 print for pickup. Pick the option that keeps the full image so the store does not crop or resize it. Measure one photo when you collect the print.",
  },
  {
    q: "How do I print passport photos at Walgreens?",
    a: "Upload the JPG sheet to the Walgreens Photo website or app, choose a standard 4×6 print, and select store pickup. Turn off any auto-crop or auto-enhance option. If the order flow warns about passport photos, try another store or print at home.",
  },
  {
    q: "How much is a passport photo at CVS?",
    a: "Recent price guides list the standard CVS passport photo service at about $17.99 for two printed 2×2 inch photos. Prices vary by store, so confirm at the counter. If you already have a compliant photo, a standard 4×6 print of your own sheet costs far less.",
  },
  {
    q: "How much is a passport photo at Walgreens?",
    a: "Walgreens sets passport photo prices by store and changes them often, so check the Walgreens Photo site or ask at the counter. Printing your own sheet as a standard 4×6 print usually costs a fraction of the passport service fee.",
  },
  {
    q: "What is the cheapest way to get passport photos printed?",
    a: "Printing a sheet yourself is the cheapest route. A standard 4×6 print usually costs between about $0.16 and $0.39, and home printing costs well under $1 per sheet. Among in-store passport services, Walmart Photo has recently listed about $7.64 for two prints.",
  },
  {
    q: "How do I print a 2×2 photo?",
    a: "Select the 2×2 inch size in the tool, choose your paper, and download the sheet. Print it at 100% on photo paper, then measure one photo. It must be exactly 2 inches square before you cut.",
  },
  {
    q: "How do I print a 2×2 photo on 4×6 paper?",
    a: "Six 2×2 inch photos fit a 4×6 sheet exactly, in two columns and three rows. In the tool, choose 4×6 paper and turn on Borderless print, then print at 100% with borderless printing on, so the printer does not add margins. Measure one photo to confirm the size.",
  },
  {
    q: "How do I print a passport photo from my iPhone?",
    a: "Save the sheet to Photos or Files, tap Share, then Print, and choose your AirPrint printer. Check that the preview is not cropped or zoomed. If the dialog gives no scale control, upload the sheet to a store app such as CVS or Walgreens, or print from a computer.",
  },
  {
    q: "How do I print a 2×2 photo from my phone?",
    a: "Make the sheet in your phone browser, save it, then print through AirPrint, your Android print service, or a store photo app. Always check the preview for cropping, and measure the finished photo.",
  },
  {
    q: "How do I take a 2×2 passport photo on an iPhone?",
    a: "Stand facing a window against a plain light wall, and ask someone to hold the phone at eye level. Use the rear camera, turn off filters and Portrait mode, and keep a neutral expression. Then crop the photo to a square in Photos, and upload it to the tool on this page.",
  },
  {
    q: "What size is a passport photo?",
    a: "It depends on the country. The US uses 2×2 inches (51×51 mm). The UK, EU, Australia and many other countries use 35×45 mm. Canada uses 50×70 mm and China uses 33×48 mm. Always confirm the current rules on your government's official website.",
  },
  {
    q: "Why are my printed passport photos the wrong size?",
    a: "The printer or print service almost certainly scaled the image. Turn off 'fit to page', 'scale to fit' and 'fill entire paper', set the scale to 100%, and match the paper size in the dialog to the tray. At a store, choose the no-crop option.",
  },
  {
    q: "What paper should I use to print passport photos?",
    a: "Use glossy or matte photo paper. Plain office paper is usually rejected because it is not photo quality. A pack of 4×6 photo paper is the cheapest choice for home printing, and a store 4×6 print is already on photo paper.",
  },
  {
    q: "Can I print passport photos on a laser printer?",
    a: "Avoid it. Laser printers on plain paper do not produce photo-quality prints, and passport offices often reject them. Use an inkjet or dedicated photo printer with photo paper, or order a 4×6 print from a store.",
  },
  {
    q: "How do I order passport photos online?",
    a: "Make your print sheet, then upload the JPG to an online photo print service. Choose a 4×6 (10×15 cm) glossy or matte print, switch off auto-crop and auto-enhance, and place the order. Cut the photos along the crop lines when they arrive.",
  },
  {
    q: "How do I take and print a passport photo myself?",
    a: "Take the photo in daylight against a plain light wall, crop it to your country's size, and check it with a compliance checker. Then make a print sheet with the free tool on this page and print it at home or at a store. The whole process takes about ten minutes.",
  },
  {
    q: "Is it cheaper to print passport photos yourself?",
    a: "Usually, yes. One 4×6 sheet holds several photos and costs a fraction of an in-store passport service. If you already own a printer and photo paper, home printing costs even less per photo.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${PAGE_URL}#article`,
      headline: "How to Print Passport Photos at Home, in Store or Online",
      description: DESCRIPTION,
      image: OG_IMAGE,
      datePublished: DATE_PUBLISHED,
      dateModified: DATE_MODIFIED,
      inLanguage: "en",
      mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
      author: { "@type": "Organization", name: "PixPassport", url: SITE_URL },
      publisher: {
        "@type": "Organization",
        name: "PixPassport",
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
      },
    },
    {
      "@type": "HowTo",
      "@id": `${PAGE_URL}#howto`,
      name: "How to print passport photos",
      description: DESCRIPTION,
      image: OG_IMAGE,
      totalTime: "PT10M",
      tool: [
        { "@type": "HowToTool", name: "Color inkjet or photo printer (or a photo store)" },
        { "@type": "HowToTool", name: "Ruler" },
        { "@type": "HowToTool", name: "Scissors or paper trimmer" },
      ],
      supply: [{ "@type": "HowToSupply", name: "Glossy or matte photo paper" }],
      step: STEPS.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.title,
        text: s.text,
        url: `${PAGE_URL}#steps`,
      })),
    },
    {
      "@type": "WebApplication",
      "@id": `${PAGE_URL}#app`,
      name: "PixPassport — Passport Photo Print Sheet Maker",
      url: `${PAGE_URL}#${TOOL_ID}`,
      applicationCategory: "DesignApplication",
      operatingSystem: "All",
      browserRequirements: "Requires JavaScript and a modern web browser",
      isAccessibleForFree: true,
      featureList: [
        "4×6, 5×7, A4, A3, Letter, Legal and custom paper sizes",
        "2×2 in, 35×45 mm, 33×48 mm, 50×70 mm and custom photo sizes",
        "Crop lines for easy cutting",
        "Free standard-quality JPG download",
        "HD 300 DPI PDF, JPG and PNG download (paid)",
      ],
      image: OG_IMAGE,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "How to Print Passport Photos", item: PAGE_URL },
      ],
    },
  ],
};

const TOC = [
  { href: "#steps", label: "4 steps" },
  { href: "#sizes", label: "Sizes by country" },
  { href: "#home", label: "At home" },
  { href: "#phone", label: "From your phone" },
  { href: "#stores", label: "CVS, Walgreens, Walmart" },
  { href: "#cost", label: "Costs" },
  { href: "#online", label: "Order online" },
  { href: "#two-by-two", label: "2×2 photos" },
  { href: "#mistakes", label: "Mistakes" },
  { href: "#faq", label: "FAQ" },
];

// Offsets anchor targets so headings aren't hidden under the sticky navbar
const ANCHOR = "scroll-mt-24";

const linkCls = "text-lime-700 font-semibold underline underline-offset-2 hover:text-lime-800";

const updatedLabel = new Date(DATE_MODIFIED).toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function DataTable({
  caption,
  heads,
  rows,
}: {
  caption: string;
  heads: string[];
  rows: string[][];
}) {
  return (
    <div className="not-prose bg-white border border-slate-200 rounded-xl overflow-hidden my-5">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200">
              {heads.map((h) => (
                <th key={h} scope="col" className="p-3 sm:p-4 font-bold text-slate-900 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((r) => (
              <tr key={r[0]} className="even:bg-slate-50/60">
                {r.map((c, i) =>
                  i === 0 ? (
                    <th key={i} scope="row" className="p-3 sm:p-4 font-semibold text-slate-900">
                      {c}
                    </th>
                  ) : (
                    <td key={i} className="p-3 sm:p-4 text-slate-600">
                      {c}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Callout({ tone = "tip", children }: { tone?: "tip" | "warn"; children: ReactNode }) {
  const styles =
    tone === "warn"
      ? "bg-amber-50 border-amber-200 text-amber-900"
      : "bg-lime-50 border-lime-200 text-lime-900";
  return (
    <div className={`not-prose my-5 flex gap-3 rounded-xl border p-4 text-sm leading-relaxed ${styles}`}>
      <span aria-hidden className="text-lg leading-none">{tone === "warn" ? "⚠️" : "💡"}</span>
      <div>{children}</div>
    </div>
  );
}

// To-scale sketch of a 4×6 sheet, in mm
function SheetDiagram({
  cols,
  rows,
  photoW,
  photoH,
  landscape = false,
  caption,
}: {
  cols: number;
  rows: number;
  photoW: number;
  photoH: number;
  landscape?: boolean;
  caption: string;
}) {
  const sheetW = landscape ? 152.4 : 101.6;
  const sheetH = landscape ? 101.6 : 152.4;
  const x0 = (sheetW - cols * photoW) / 2;
  const y0 = (sheetH - rows * photoH) / 2;
  return (
    <figure className="not-prose flex flex-col items-center">
      <svg
        viewBox={`0 0 ${sheetW} ${sheetH}`}
        className={`${landscape ? "w-44 sm:w-52" : "w-28 sm:w-32"} h-auto drop-shadow-sm`}
        role="img"
        aria-label={caption}
      >
        <rect width={sheetW} height={sheetH} fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
        {Array.from({ length: rows }).flatMap((_, r) =>
          Array.from({ length: cols }).map((_, c) => {
            const x = x0 + c * photoW;
            const y = y0 + r * photoH;
            return (
              <g key={`${r}-${c}`}>
                <rect x={x} y={y} width={photoW} height={photoH} fill="#f7fee7" stroke="#0f172a" strokeWidth="0.3" />
                <circle cx={x + photoW / 2} cy={y + photoH * 0.38} r={photoW * 0.17} fill="#a3e635" />
                <path
                  d={`M ${x + photoW * 0.2} ${y + photoH} Q ${x + photoW / 2} ${y + photoH * 0.5} ${x + photoW * 0.8} ${y + photoH}`}
                  fill="#a3e635"
                />
              </g>
            );
          }),
        )}
      </svg>
      <figcaption className="text-xs font-semibold text-slate-600 mt-2 text-center">{caption}</figcaption>
    </figure>
  );
}

function ToolCta({ label = "Make your free print sheet" }: { label?: string }) {
  return (
    <a
      href={`#${TOOL_ID}`}
      className="not-prose inline-flex items-center gap-2 bg-lime-600 hover:bg-lime-700 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-md shadow-lime-600/20 transition-colors no-underline"
    >
      {label}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
      </svg>
    </a>
  );
}

function ToolFallback() {
  // Mirrors the upload card's footprint so the page doesn't jump when the tool loads
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8" aria-busy="true">
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm grid lg:grid-cols-2 min-h-[460px]">
        <div className="p-6 sm:p-10 flex flex-col gap-4">
          <div className="h-6 w-40 bg-lime-50 rounded-full" />
          <div className="h-8 w-3/4 bg-slate-100 rounded-lg" />
          <div className="flex-1 min-h-[200px] border-2 border-dashed border-lime-200 rounded-2xl flex items-center justify-center">
            <p className="text-sm font-semibold text-slate-500">Loading print sheet maker…</p>
          </div>
        </div>
        <div className="hidden lg:block bg-slate-50/70 rounded-r-2xl" />
      </div>
    </div>
  );
}

export default function HowToPrintPassportPhotosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="bg-slate-50 min-h-screen">
        {/* Hero */}
        <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6">
          <nav aria-label="Breadcrumb" className="mb-2">
            <ol className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <li><Link href="/" className="hover:text-lime-700">Home</Link></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-slate-700 truncate">How to Print Passport Photos</li>
            </ol>
          </nav>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-2 lg:gap-6">
            <div className="min-w-0">
              <h1 className="text-[22px] sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                How to Print Passport Photos
              </h1>
              <p className="text-slate-500 text-sm sm:text-base mt-1">
                Make a free print sheet below, then print it at home, from your
                phone, in a store or online, at the exact official size.
              </p>
              <p className="text-xs text-slate-400 mt-1.5">
                By the PixPassport team · Updated{" "}
                <time dateTime={DATE_MODIFIED}>{updatedLabel}</time> · 8 min read
              </p>
            </div>
            <ul className="flex flex-wrap gap-1.5 shrink-0" aria-label="Highlights">
              {["Free", "Any paper size", "HD 300 DPI option", "Crop lines", "Any country"].map((t) => (
                <li key={t} className="text-[11px] sm:text-xs font-bold text-lime-800 bg-lime-50 border border-lime-200 rounded-full px-2.5 py-1">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </header>

        {/* Tool */}
        <section id={TOOL_ID} aria-label="Passport photo print sheet maker" className={ANCHOR}>
          <Suspense fallback={<ToolFallback />}>
            <PrintTemplateApp />
          </Suspense>
        </section>

        {/* Quick answer + TOC */}
        <section aria-labelledby="quick-answer" className="bg-white py-10 sm:py-14 border-t border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 id="quick-answer" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-3">
              How to Print Passport Photos: The Short Answer
            </h2>
            <p className="text-slate-700 leading-relaxed mb-5">
              Print your passport photo sheet on <strong>photo paper</strong> at{" "}
              <strong>100% (actual size)</strong>, with <strong>&quot;fit to page&quot; turned off</strong>.
              No printer? Upload the sheet to a store photo app and order a standard{" "}
              <strong>4×6 print</strong>. For a ready-made layout, start from the{" "}
              <Link href="/passport-photo-template-4x6" className="font-bold text-lime-700 underline hover:text-lime-800">4×6 passport photo template</Link>.
              Either way, measure one photo before you cut.
            </p>
            <nav aria-label="On this page" className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-sm font-bold text-slate-900 mb-2">On this page</p>
              <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
                {TOC.map((t) => (
                  <li key={t.href}>
                    <a
                      href={t.href}
                      className="inline-block px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-lime-500 hover:text-lime-800 transition-colors"
                    >
                      {t.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        {/* Steps */}
        <section aria-labelledby="steps" className="bg-slate-50 py-12 sm:py-16 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 id="steps" className={`${ANCHOR} text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-3 text-center`}>
              Print Passport Photos in 4 Steps
            </h2>
            <p className="text-slate-600 text-center mb-8 max-w-2xl mx-auto">
              The process is the same wherever you print: one correctly sized
              digital photo, one print sheet, one print.
            </p>
            <ol className="grid sm:grid-cols-2 gap-4 list-none p-0">
              {STEPS.map((s, i) => (
                <li key={s.title} className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-lime-600 text-white text-sm font-black mb-3" aria-hidden>
                    {i + 1}
                  </span>
                  <h3 className="font-bold text-slate-800 mb-1">
                    <span className="sr-only">Step {i + 1}: </span>
                    {s.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{s.text}</p>
                </li>
              ))}
            </ol>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
              <ToolCta />
              <p className="text-sm text-slate-600">
                Photo not cropped yet?{" "}
                <Link href="/passport-photo-online" className={linkCls}>Format it first</Link>
              </p>
            </div>
          </div>
        </section>

        {/* Where to print */}
        <section aria-labelledby="where-to-print" className="bg-white py-12 sm:py-16 border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 id="where-to-print" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-8 text-center">
              Where to Print Your Passport Photo Sheet
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {PRINT_OPTIONS.map((o) => (
                <a
                  key={o.title}
                  href={o.href}
                  className="group flex flex-col bg-slate-50 hover:bg-lime-50/60 border border-slate-200 hover:border-lime-300 rounded-xl p-5 transition-colors"
                >
                  <span className="text-2xl mb-2" aria-hidden>{o.icon}</span>
                  <h3 className="text-lg font-black text-slate-900">{o.title}</h3>
                  <p className="text-xs font-semibold text-lime-700 mt-1 mb-3">Best if: {o.best}</p>
                  <ul className="space-y-1.5 text-sm text-slate-600 list-none p-0 mb-4">
                    {o.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className="text-lime-600 font-bold" aria-hidden>✓</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto text-xs font-bold text-lime-700 group-hover:underline">
                    Read the full guide ↓
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Guide content */}
        <div className="bg-slate-50 py-12 sm:py-16 border-t border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 prose prose-slate prose-headings:font-black prose-headings:tracking-tight prose-h2:text-2xl sm:prose-h2:text-3xl prose-a:text-lime-700 prose-a:font-semibold">
            {/* SIZES */}
            <section aria-labelledby="sizes">
              <h2 id="sizes" className={ANCHOR}>What Size Is a Passport Photo? Sizes by Country</h2>
              <p>
                Print size depends on the country that issues your document.
                Choose the matching size in the tool, and it builds the sheet at
                that exact size.
              </p>
              <DataTable
                caption="Passport photo sizes by country"
                heads={["Country", "Photo size", "Notes"]}
                rows={SIZES.map((s) => [s.country, s.size, s.note])}
              />
              <p>
                Rules change, so confirm the current requirements on your
                government&apos;s official website before you print. For
                country-specific tools, use the{" "}
                <Link href="/us-passport-photo-editor">US passport photo editor</Link>{" "}
                or the{" "}
                <Link href="/uk-passport-size-photo-maker">UK passport size photo maker</Link>.
              </p>

              <h3>How to print a passport size photo (35×45 mm)</h3>
              <p>
                Select 35×45 mm in the tool, then print at 100% on photo paper. A
                4×6 sheet holds up to eight 35×45 mm photos when the tool turns it
                to landscape. A4 and Letter sheets hold two dozen or more, which
                suits family applications. Measure one photo: it must be exactly
                3.5 cm wide and 4.5 cm tall.
              </p>
              <SheetDiagram cols={4} rows={2} photoW={35} photoH={45} landscape caption="Eight 35×45 mm photos on a 6×4 (landscape 4×6) sheet" />
            </section>

            {/* HOME */}
            <section aria-labelledby="home">
              <h2 id="home" className={ANCHOR}>How to Print Passport Photos at Home</h2>
              <p>
                Printing at home takes about ten minutes once you have a
                correctly sized photo. You need a color printer, photo paper, a
                ruler, and scissors or a paper trimmer.
              </p>

              <h3>Printer settings that keep the right size</h3>
              <DataTable
                caption="Printer settings for passport photos"
                heads={["Setting", "Choose"]}
                rows={PRINTER_SETTINGS.map((s) => [s.setting, s.value])}
              />

              <h4>Windows</h4>
              <p>
                Open the sheet, press Ctrl+P, and choose Printer Properties. Set
                the paper type to photo paper and quality to the highest option.
                In the print dialog, pick the full-page layout and make sure the
                picture is not set to fit the frame.
              </p>
              <h4>Mac</h4>
              <p>
                Press Cmd+P and select Show Details. Set Scale to 100%, turn off
                Scale to fit paper, and choose your photo paper under Media &amp;
                Quality.
              </p>
              <Callout>
                <strong>Print the PDF, not the JPG, at home.</strong> The PDF page
                is already the exact paper size, so most print dialogs keep it at
                100% automatically.
              </Callout>

              <h3>Which paper works best?</h3>
              <p>
                Use glossy or matte photo paper. Plain office paper is usually
                rejected because it is not photo quality. A pack of 4×6 photo
                paper is the cheapest choice, while A4 or Letter paper suits
                larger batches.
              </p>

              <h3>Measure, dry and cut</h3>
              <p>
                Let glossy prints dry for a few minutes. Then measure one photo
                with a ruler and cut along the crop lines. A paper trimmer gives
                the straightest edges. Never trim into the photo itself.
              </p>
            </section>

            {/* PHONE */}
            <section aria-labelledby="phone">
              <h2 id="phone" className={ANCHOR}>How to Print Passport Photos From Your Phone</h2>
              <p>
                You can make and print the whole sheet from a phone. The only
                risk is the print dialog, which often defaults to &quot;fit&quot;
                and shrinks or crops the sheet.
              </p>

              <h3>Print a passport photo from an iPhone</h3>
              <ol>
                <li>Make the sheet in Safari and save it to Photos or Files.</li>
                <li>Tap Share, then Print, and choose your AirPrint printer.</li>
                <li>Check the preview. It must show the full sheet, not a zoomed crop.</li>
                <li>If you cannot control the scale, use a store photo app instead.</li>
              </ol>

              <h3>Print a passport photo from Android</h3>
              <p>
                Open the sheet in Google Photos or Files and tap Print. Choose
                your printer and the matching paper size, and set the scale to
                100% if the dialog offers it. Otherwise, upload the JPG to a store
                photo app.
              </p>

              <h3>How to take a 2×2 passport photo on an iPhone</h3>
              <ol>
                <li>Stand facing a window, with a plain light wall behind you.</li>
                <li>Ask someone to hold the phone at eye level, or use a tripod and the timer.</li>
                <li>Use the rear camera. Turn off filters, beauty effects and Portrait mode.</li>
                <li>Keep a neutral expression, with both eyes open and your mouth closed.</li>
                <li>In Photos, tap Edit, then Crop, and choose the square ratio.</li>
                <li>Upload the image to the tool above and check it before you print.</li>
              </ol>
              <p>
                Not sure it passes? Run it through the{" "}
                <Link href="/passport-photo-checker">passport photo checker</Link>{" "}
                first.
              </p>
            </section>

            {/* STORES */}
            <section aria-labelledby="stores">
              <h2 id="stores" className={ANCHOR}>How to Print Passport Photos at CVS, Walgreens or Walmart</h2>
              <p>
                No printer? A standard 4×6 print is one of the cheapest items at
                any pharmacy or photo counter, and one sheet holds several
                passport photos. Self-printed photos are accepted by passport
                offices when they meet the rules, so you can skip the passport
                service fee.
              </p>

              <h3>Passport photo service vs. a standard 4×6 print</h3>
              <p>
                Stores sell two different things. The <strong>passport photo
                service</strong> means an employee takes your photo and prints
                two copies. A <strong>standard 4×6 print</strong> means the store
                prints the image you upload. Because you already have a
                compliant sheet, order the standard print.
              </p>

              <h3>Steps for any store</h3>
              <ol>
                <li>Make a 4×6 sheet with the tool and download the JPG.</li>
                <li>Open the store&apos;s photo website or app and upload the file.</li>
                <li>Choose a standard 4×6 print, not the passport photo service.</li>
                <li>Select the option that keeps the full image, and turn off auto-enhance.</li>
                <li>Pick up the print, measure one photo, and cut along the crop lines.</li>
              </ol>
              <Callout tone="warn">
                Some stores may flag or refuse passport-sized layouts. If that
                happens, try another branch or print at home.
              </Callout>

              <div className="not-prose grid sm:grid-cols-3 gap-3 my-5">
                {[
                  { name: "CVS", text: "Use the CVS Photo site or app and order a 4×6 print for store pickup. The passport service is a separate counter option." },
                  { name: "Walgreens", text: "Use the Walgreens Photo site or app, pick a 4×6 print, and choose store pickup. Prices and offers vary by store." },
                  { name: "Walmart", text: "Use Walmart Photo, order a 4×6 print, and collect it in store. Walmart also lists one of the lowest prices for its own passport photo service." },
                ].map((s) => (
                  <div key={s.name} className="bg-white border border-slate-200 rounded-xl p-4">
                    <h3 className="font-black text-slate-900 mb-1">{s.name}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{s.text}</p>
                  </div>
                ))}
              </div>

              <h3 id="cost" className={ANCHOR}>How much do passport photos cost?</h3>
              <p>
                Prices below come from recent third-party price guides. They vary
                by store and change often, so confirm before you go.
              </p>
              <DataTable
                caption="Typical passport photo printing costs in the US"
                heads={["Option", "Typical price", "Notes"]}
                rows={COSTS.map((c) => [c.option, c.price, c.note])}
              />
              <p>
                The saving is clear: your own sheet as a 4×6 print costs cents,
                while the passport service costs several dollars.
              </p>
            </section>

            {/* Mid-page CTA */}
            <div className="not-prose my-10 rounded-2xl bg-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-lg font-black">Ready to print?</p>
                <p className="text-sm text-slate-300 mt-1">
                  Make a free print sheet for any paper size in under a minute.
                </p>
              </div>
              <ToolCta label="Create print sheet" />
            </div>

            {/* ONLINE */}
            <section aria-labelledby="online">
              <h2 id="online" className={ANCHOR}>How to Order Passport Photos Online</h2>
              <p>
                Online print services deliver 4×6 prints to your door. Allow a few
                days for delivery, so plan ahead if you have a deadline.
              </p>
              <ol>
                <li>Download your JPG sheet from the tool above.</li>
                <li>Upload it to an online photo print service.</li>
                <li>Choose 4×6 (10×15 cm) in glossy or matte.</li>
                <li>Switch off auto-crop and auto-enhance, then check the preview.</li>
                <li>Order, then measure and cut the photos when they arrive.</li>
              </ol>
              <p>
                Need only a digital photo? Make one with the{" "}
                <Link href="/passport-photo-online">passport photo online tool</Link>.
              </p>
            </section>

            {/* 2x2 */}
            <section aria-labelledby="two-by-two">
              <h2 id="two-by-two" className={ANCHOR}>How to Print a 2×2 Photo</h2>
              <p>
                US passport, visa and Green Card photos are 2×2 inches. Select
                the 2×2 inch size in the tool, and it places as many copies as
                fit on your paper, with crop lines between them.
              </p>
              <h3>Print a 2×2 photo on 4×6 paper</h3>
              <p>
                Six 2×2 inch photos fit a 4×6 sheet exactly, in two columns and
                three rows. In the tool, choose 4×6 paper and turn on{" "}
                <strong>Borderless print</strong>, then print borderless at 100%.
                Otherwise, the printer adds margins and shrinks the photos. See
                the{" "}
                <Link href="/passport-photo-template-4x6">4×6 passport photo template</Link>{" "}
                for more layouts, or use the{" "}
                <Link href="/passport-photo-print-template-generator">print template generator</Link>{" "}
                for other paper sizes.
              </p>
              <div className="not-prose flex flex-wrap justify-center gap-8 my-6">
                <SheetDiagram cols={2} rows={3} photoW={50.8} photoH={50.8} caption="Six 2×2 in photos, borderless 4×6" />
                <SheetDiagram cols={1} rows={2} photoW={50.8} photoH={50.8} caption="Two 2×2 in photos, with margin" />
              </div>
              <h3>Print a 2×2 photo on Letter or A4</h3>
              <p>
                Letter and A4 sheets hold up to 20 copies, which suits family
                applications. Print at 100% on photo paper, then cut along the
                crop lines.
              </p>
            </section>

            {/* MISTAKES */}
            <section aria-labelledby="mistakes">
              <h2 id="mistakes" className={ANCHOR}>Common Printing Mistakes to Avoid</h2>
              <DataTable
                caption="Common passport photo printing mistakes and fixes"
                heads={["Mistake", "How to fix it"]}
                rows={MISTAKES.map((m) => [m.mistake, m.fix])}
              />

              <h3>Check your photo before you print</h3>
              <p>
                A perfect print can still be rejected if the photo breaks the
                rules on background, head size, lighting or expression. Run it
                through the{" "}
                <Link href="/passport-photo-checker">passport photo checker</Link>{" "}
                first, so you do not waste paper and ink.
              </p>
            </section>
          </div>
        </div>

        {/* FAQ */}
        <section aria-labelledby="faq" className="bg-white py-14 sm:py-20 border-t border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 id="faq" className={`${ANCHOR} text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-6`}>
              Printing Passport Photos: Frequently Asked Questions
            </h2>
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {faqs.map((faq, idx) => (
                <details key={faq.q} className="group py-1" open={idx < 3}>
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none py-3 [&::-webkit-details-marker]:hidden">
                    <h3 className="font-bold text-slate-800 text-base">{faq.q}</h3>
                    <span
                      aria-hidden
                      className="shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-sm font-bold transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="text-slate-600 text-sm leading-relaxed pb-4 pr-8">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <nav aria-labelledby="related-tools" className="bg-slate-50 border-t border-slate-200 py-10">
          <h2 id="related-tools" className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight text-center mb-5 px-4">
            Related Passport Photo Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto px-4">
            {[
              { href: "/passport-photo-print-template-generator", label: "Passport Photo Print Template Generator" },
              { href: "/passport-photo-template-4x6", label: "Free 4x6 Passport Photo Template" },
              { href: "/passport-photo-online", label: "Passport Photo Online" },
              { href: "/passport-photo-checker", label: "Passport Photo Checker" },
              { href: "/us-passport-photo-editor", label: "US Passport Photo Editor" },
              { href: "/uk-passport-size-photo-maker", label: "UK Passport Size Photo Maker" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between gap-3 bg-white hover:bg-lime-50 border border-slate-200 hover:border-lime-200 rounded-xl px-5 py-4 text-sm font-bold text-slate-700 hover:text-lime-700 transition-colors shadow-2xs"
              >
                {label}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden>
                  <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                </svg>
              </Link>
            ))}
          </div>
        </nav>
      </article>
    </>
  );
}
