import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Image from "next/image";
import ComparisonSlider from "@/app/components/ComparisonSlider";
import DrivingLicenceTool from "./DrivingLicenceTool";

const PAGE_URL = "https://www.pixpassport.com/driving-licence-photograph";
const OG_IMAGE =
  "https://res.cloudinary.com/dipzpwbbk/image/upload/v1784690540/uk-hero_m4cc8l.webp";
const PAGE_TITLE = "Driving Licence Photo Maker: US, UK & India Rules (2026)";
const PAGE_DESCRIPTION =
  "Make a driving licence photo online. Check US 2×2 in, UK 35×45 mm and India upload rules, plus glasses and smile rules and how to change your photo.";

const REVIEWED_ON = "8 November 2026";
const REVIEWED_ISO = "2026-11-08";
/* Add a real reviewer to show a named "Reviewed by" line. Leave null until you have one. */
type Reviewer = { name: string; role: string };
const REVIEWER: Reviewer | null = null;

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
   
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      "en-GB": PAGE_URL,
      "en-US": PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
  openGraph: {
    title: PAGE_TITLE,
    description:
      "Make a driving licence photo online. Get the US 2×2 in, UK 35×45 mm and India sizes, check the glasses and smile rules, and print at home or in store.",
    url: PAGE_URL,
    siteName: "PixPassport",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Driving licence photo maker for US, UK and India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description:
      "Make a driving licence photo online. US 2×2 in, UK 35×45 mm and India upload rules explained.",
    images: [OG_IMAGE],
  },
};

const supportedDocuments = [
  {
    id: "us-driving",
    name: "USA Driver’s License & ID",
    flag: "🇺🇸",
    size: "2 × 2 in (51 × 51 mm)",
    note: "DMV takes the licence photo; use 2×2 for supporting IDs",
    link: "#tool:us-driver-license",
  },
  {
    id: "uk-driving",
    name: "UK Driving Licence (DVLA)",
    flag: "🇬🇧",
    size: "35 × 45 mm",
    note: "Head 29–34 mm, cream or light grey background",
    link: "#tool:uk-driving",
  },
  {
    id: "in-driving",
    name: "India Driving Licence (Sarathi)",
    flag: "🇮🇳",
    size: "35 × 45 mm",
    note: "Upload limits vary by form, so check the portal",
    link: "#tool:india-driving",
  },
  {
    id: "idp-photo",
    name: "International Driving Permit",
    flag: "🌍",
    size: "Varies by issuer",
    note: "Check your issuer’s photo rules before printing",
    link: "#tool:us-idp",
  },
  {
    id: "de-driving",
    name: "Germany Führerschein",
    flag: "🇩🇪",
    size: "35 × 45 mm",
    note: "Standard European biometric size",
    link: "#tool:germany-driving",
  },
  {
    id: "fr-driving",
    name: "France Permis de Conduire",
    flag: "🇫🇷",
    size: "35 × 45 mm",
    note: "Standard European biometric size",
    link: "#tool:france-driving",
  },
];

const usSpecs = [
  {
    req: "Printed size",
    spec: "2 × 2 in (51 × 51 mm)",
    pix: "Exact 2×2 in crop",
  },
  {
    req: "Digital size",
    spec: "600 × 600 px at 300 DPI",
    pix: "Exported at 600×600 px",
  },
  {
    req: "Head height",
    spec: "1 to 1⅜ in (25–35 mm), chin to crown",
    pix: "Head scaled into range",
  },
  {
    req: "Background",
    spec: "Plain white or off-white",
    pix: "Shoot against a plain white wall",
  },
  {
    req: "Expression",
    spec: "Neutral, or a natural smile",
    pix: "Centres your head and eye line",
  },
  {
    req: "Glasses",
    spec: "Not allowed in passport photos",
    pix: "Reminds you to remove them",
  },
  {
    req: "Edits",
    spec: "No filters, apps or AI changes to the photo",
    pix: "Crops and sizes only for these photos",
  },
  {
    req: "Recency",
    spec: "Taken within the last 6 months",
    pix: "You take a fresh photo",
  },
  {
    req: "Printing",
    spec: "Photographic paper, no border",
    pix: "4×6 in print sheet",
  },
];

const ukSpecs = [
  {
    req: "Printed size",
    spec: "45 mm high × 35 mm wide",
    pix: "Exact 35×45 mm crop",
  },
  {
    req: "Head height",
    spec: "29–34 mm, crown to chin",
    pix: "Head scaled into range",
  },
  {
    req: "Digital size",
    spec: "At least 600 × 750 pixels",
    pix: "High-resolution JPEG",
  },
  {
    req: "File size (online)",
    spec: "50 KB to 10 MB",
    pix: "Within the online limit",
  },
  {
    req: "Background",
    spec: "Plain cream or light grey, no shadows",
    pix: "Plain light background",
  },
  {
    req: "Pose and expression",
    spec: "Facing forward, mouth closed, eyes open",
    pix: "Centres your head and eye line",
  },
  {
    req: "Recency",
    spec: "Taken within the last month",
    pix: "You take a fresh photo",
  },
  {
    req: "Printing",
    spec: "Plain photographic paper, no border",
    pix: "4×6 in print sheet",
  },
];

const faqs = [
  {
    question: "Can I use my own photo for a US driver’s license?",
    answer:
      "Usually not. In most US states, the DMV takes your driver’s license photo on site, so you cannot bring your own. A small number of states accept an uploaded photo for some online services, so check your state DMV website first. You can still use a 2×2 inch photo for supporting documents such as a passport or visa.",
  },
  {
    question: "What size is a US driver’s license photo?",
    answer:
      "In most states, the DMV captures your driver’s license photo itself, so you do not submit a size. The 2×2 inch (51×51 mm) size is the US State Department rule for passport and visa photos, not a DMV submission rule. In a 2×2 passport photo, the head measures 1 to 1⅜ inches from chin to crown.",
  },
  {
    question:
      "What is the difference between a US driver’s license, state ID and passport photo?",
    answer:
      "A driver’s license and a state ID photo are usually taken by DMV staff at the counter, and your state sets the rules. A passport photo is a 2×2 inch photo that you supply, and the State Department sets the rules. Do not assume a passport photo works at the DMV, and check your state DMV before you upload anything.",
  },
  {
    question: "Can I wear glasses in my driving licence photo?",
    answer:
      "Take them off whenever you can. In the UK, you must remove glasses unless you have to wear them. If you must keep them on, avoid sunglasses and tinted lenses, and make sure the frames, glare, reflections and shadows do not cover your eyes. Many US DMVs also ask you to remove glasses, but rules differ by state, so check yours before your visit.",
  },
  {
    question: "Can you smile on a driving licence photo?",
    answer:
      "Not in the UK. DVLA photos follow passport rules, which ask for a plain expression with your mouth closed. In the US, the rule depends on your state. For example, the Colorado DMV announced in 2022 that residents can smile for licence, ID and permit photos, while other states ask for a neutral face. Check your state DMV before your appointment.",
  },
  {
    question: "What size is a UK driving licence photo?",
    answer:
      "A UK driving licence photo measures 45 mm high by 35 mm wide, the same size as a UK passport photo. Your head must measure 29 mm to 34 mm from crown to chin. For a digital upload, use a photo at least 600 pixels wide and 750 pixels tall, between 50 KB and 10 MB.",
  },
  {
    question: "What are the UK driving licence photo requirements?",
    answer:
      "Follow the passport photo rules. Face the camera with a plain expression and your mouth closed. Keep your eyes open and visible. Stand against a plain cream or light grey background with no shadows on your face or behind you. Use a clear, in-focus colour photo with no filters or retouching, taken within the last month.",
  },
  {
    question: "How do I change my driving licence photo?",
    answer:
      "In the UK, you change your photo by renewing your licence. In Great Britain, you can renew online on GOV.UK for £14 and use your passport photo or upload a new one. You can also apply by post with a D1 form, a recent printed passport-type photo and a £17 fee. Northern Ireland uses a separate DVA service. In the US, ask your state DMV, because most states retake your photo at the counter.",
  },
  {
    question: "How much does it cost to change my driving licence photo?",
    answer:
      "In Great Britain, it costs £14 online and £17 by post. The fee is waived if you are over 70 or have a medical short period licence. Photo booths and shops charge separately for the photo itself. US fees depend on your state.",
  },
  {
    question: "How often do I need to change my driving licence photo?",
    answer:
      "A UK photocard licence must be renewed every 10 years, and you supply a new photo each time. You can change your photo earlier at any time by renewing. US renewal periods depend on your state.",
  },
  {
    question: "Can I use a passport photo for my driving licence?",
    answer:
      "In the UK, yes. The DVLA asks for a passport-type photo, and applying online often lets you reuse the photo stored with your passport. Take a new photo if yours is more than a month old. In the US, the DMV takes its own photo, so a passport photo does not replace it.",
  },
  {
    question: "Do I need a different photo for a provisional driving licence?",
    answer:
      "No. A UK provisional driving licence uses the same photo size, background and expression rules as a full licence.",
  },
  {
    question: "Does someone need to sign the back of my driving licence photo?",
    answer:
      "Not for most online renewals in Great Britain. For some first applications or postal renewals, such as those in Northern Ireland, someone may need to sign the back of your photo. The signer must live in the UK and know you personally for at least two years. Follow the instructions in your application pack.",
  },
  {
    question: "What are the driving licence photo requirements for India?",
    answer:
      "Online applications on the Sarathi Parivahan portal ask you to upload a JPEG photo and a signature. Pixel and file-size limits differ by form and state, so read the limits on the upload screen. Start with a clear 35×45 mm photo on a plain light background, with your face centred and your eyes open, then compress the file to fit the limit shown.",
  },
  {
    question: "Do I upload a signature with my Sarathi driving licence photo?",
    answer:
      "Online Sarathi applications for a learner licence or driving licence usually ask for a photo and a signature image. The portal shows the format and size limit for each upload, so follow the limits on screen for your state and form.",
  },
  {
    question: "Can I take my driving licence photo with my phone?",
    answer:
      "Yes, where your authority accepts an uploaded photo. Ask a friend to hold the phone at eye level about 1.5 metres (5 feet) away, facing a window. Keep your shoulders square and look at the lens. Upload the photo to PixPassport and the tool crops it to the right size and centres your head. Official rules for UK and US passport-style photos do not allow filters or retouching, so shoot against a plain wall and never edit your face. Photos from a booth or shop with a photo code are more likely to pass than photos from your own device.",
  },
  {
    question: "What should I wear for a driving licence photo?",
    answer:
      "Wear a plain top in a darker colour such as navy, black, green or burgundy, so your shoulders stand out against a light background. Avoid white, cream and light grey tops. Skip uniforms and busy patterns.",
  },
  {
    question: "How do I print my driving licence photo?",
    answer:
      "Download the 4×6 inch print sheet from PixPassport and print it at a photo kiosk or on a home printer. Use photographic paper with no border, then cut along the guides to the exact size. Do not cut down a larger photo by hand.",
  },
];

const howToSteps = [
  {
    name: "Choose your photo standard",
    text: "Select US (2×2 in), UK DVLA (35×45 mm), India or another country in the PixPassport tool.",
  },
  {
    name: "Upload a clear portrait",
    text: "Upload a photo taken at eye level in daylight against a plain wall. Face the camera with your mouth closed.",
  },
  {
    name: "Let the tool size your photo",
    text: "The tool crops your photo to the exact size, scales your head into the required range and gives you a plain light background.",
  },
  {
    name: "Download and print or upload",
    text: "Download a digital JPEG for online portals and a 4×6 inch sheet for printing at a kiosk or at home.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PixPassport Driving Licence Photo Maker",
    url: PAGE_URL,
    description:
      "Online tool that crops and sizes driving licence photos for the US, UK, India and other countries.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: PAGE_TITLE,
    url: PAGE_URL,
    description: PAGE_DESCRIPTION,
    inLanguage: "en",
    dateModified: REVIEWED_ISO,
    lastReviewed: REVIEWED_ISO,
    author: {
      "@type": "Organization",
      name: "PixPassport Editorial Team",
      url: "https://www.pixpassport.com/",
    },
    publisher: {
      "@type": "Organization",
      name: "PixPassport",
      url: "https://www.pixpassport.com/",
    },
    ...(REVIEWER as Reviewer | null
      ? {
          reviewedBy: {
            "@type": "Person",
            name: (REVIEWER as unknown as Reviewer).name,
            jobTitle: (REVIEWER as unknown as Reviewer).role,
          },
        }
      : {}),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.pixpassport.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Driving Licence Photo Maker",
        item: PAGE_URL,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to make a driving licence photo online",
    description:
      "Four steps to create and print a driving licence photo for the US, UK, India or another country.",
    step: howToSteps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  },
];

const comparisonRows = [
  {
    country: "🇺🇸 United States",
    who: "DMV staff take the photo on site in most states",
    size: "No size to submit. 2×2 in applies to passport and visa photos",
    glasses: "Many DMVs ask you to remove them. Check your state",
    smile: "Varies by state. Colorado allows smiling",
    source: "Your state DMV",
  },
  {
    country: "🇬🇧 United Kingdom",
    who: "You upload or post your own passport-type photo",
    size: "35 × 45 mm, head 29–34 mm",
    glasses: "Only if you must. No sunglasses or tint, no glare",
    smile: "No. Plain expression, mouth closed",
    source: "GOV.UK",
  },
  {
    country: "🇮🇳 India",
    who: "You upload a photo on the Sarathi portal for online services",
    size: "Start at 35 × 45 mm, then match the portal’s file limit",
    glasses: "Not stated here. Remove them to avoid glare",
    smile: "Not stated here. Keep a neutral face",
    source: "Sarathi Parivahan",
  },
];

const tocItems = [
  { label: "Make Photo", href: "#tool" },
  { label: "US Rules", href: "#us" },
  { label: "UK Rules", href: "#uk" },
  { label: "India Rules", href: "#india" },
  { label: "Compare", href: "#compare" },
  { label: "Country Sizes", href: "#sizes" },
  { label: "Glasses", href: "#glasses" },
  { label: "Smiling", href: "#smile" },
  { label: "Change Photo", href: "#change-photo" },
  { label: "Photo Tips", href: "#photo-tips" },
  { label: "Mistakes", href: "#mistakes" },
  { label: "FAQ", href: "#faq" },
];

const SPEC_TABLE_HEAD = [
  "Requirement",
  "Official standard",
  "How PixPassport helps",
];

export default function DrivingLicencePhotographPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      <div className="min-h-screen overflow-x-hidden bg-white text-slate-900 antialiased">
        <div className="h-1 bg-lime-700 w-full" />

        {/* ── BREADCRUMB ── */}
        <nav
          aria-label="Breadcrumb"
          className="border-b border-slate-100 bg-slate-50/60 py-3"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ol className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <li>
                <Link
                  href="/"
                  className="hover:text-lime-700 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2 min-w-0">
                <span className="text-slate-300">/</span>
                <span className="text-slate-800 font-bold truncate">
                  Driving Licence Photo Maker
                </span>
              </li>
            </ol>
          </div>
        </nav>

        {/* ── HERO ── */}
        <header className="bg-white border-b border-slate-200 py-8 sm:py-10 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                <div className="inline-flex items-start sm:items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-1.5">
                  <span
                    className="w-2 h-2 mt-1.5 sm:mt-0 rounded-full bg-slate-400 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-xs font-bold text-slate-700 tracking-wide">
                    Updated for 2026 US, UK &amp; India rules
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                  Driving Licence Photo Maker:{" "}
                  <span className="text-slate-600">
                    US, UK &amp; India Size and Rules
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 font-medium leading-snug max-w-2xl">
                  Crop and size your driving licence photo in seconds. Get the
                  US 2×2&nbsp;in photo, the UK 35×45&nbsp;mm photo and India
                  upload-ready files.
                </p>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl">
                  Upload one portrait. PixPassport crops it to your country’s
                  size, centres your head and builds a{" "}
                  <Link
                    href="/passport-photo-template-4x6"
                    className="text-slate-900 font-semibold underline decoration-slate-300 underline-offset-2 hover:decoration-slate-500"
                  >
                    4×6 inch print sheet
                  </Link>
                  . Then use the rules below to check glasses, smiling and photo
                  age before you apply.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <a
                    href="#tool"
                    className="inline-flex items-center justify-center gap-2 bg-lime-700 hover:bg-lime-800 text-white font-bold text-base px-7 py-4 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.99] text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-700"
                  >
                    <span>Make My Driving Photo</span>
                    <span aria-hidden="true">→</span>
                  </a>
                  <Link
                    href="/passport-photo-checker"
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base px-6 py-4 rounded-xl border border-slate-300 transition-colors text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700"
                  >
                    <span>Free Photo Validator</span>
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                  {[
                    { icon: "🔒", text: "24h auto-delete" },
                    { icon: "⚡", text: "Fast results" },
                    { icon: "📐", text: "9 licence sizes" },
                    { icon: "🖨️", text: "4×6 print sheet" },
                  ].map((badge) => (
                    <div
                      key={badge.text}
                      className="flex items-center gap-2 bg-slate-50 border border-slate-200/90 rounded-lg px-2.5 py-2 text-xs font-semibold text-slate-700"
                    >
                      <span className="text-base" aria-hidden="true">
                        {badge.icon}
                      </span>
                      <span>{badge.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="w-full max-w-[380px] ">
                  <div className="w-full aspect-square rounded-xl overflow-hidden ">
                    <ComparisonSlider
                      beforeSrc="/us_non_imigrant_before.webp"
                      afterSrc="/us_non_imigrant.png"
                      beforeAlt="Casual selfie before driving licence photo processing"
                      afterAlt="Driving licence photo after automatic background clean-up and crop"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ── PHOTO TOOL (client) ── */}
        <DrivingLicenceTool />

        {/* ── QUICK ANSWER ── */}
        <section
          className="bg-slate-50 py-8 border-b border-slate-200"
          aria-labelledby="quick-answer"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border-l-4 border-lime-700 border-y border-r border-slate-200 bg-white p-5 sm:p-7">
              <h2
                id="quick-answer"
                className="text-base sm:text-lg font-bold text-slate-900 mb-3"
              >
                Quick answer: driving licence photo size by country
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-600 leading-relaxed">
                <div>
                  <h3 className="font-bold text-slate-900">🇺🇸 United States</h3>
                  <p>
                    The DMV takes your licence photo on site. Supporting ID
                    photos are{" "}
                    <strong className="text-slate-900">
                      2 × 2 in (51 × 51 mm)
                    </strong>
                    .
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">
                    🇬🇧 United Kingdom
                  </h3>
                  <p>
                    <strong className="text-slate-900">35 × 45 mm</strong>, head
                    29–34 mm, plain cream or light grey background, mouth
                    closed.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">🇮🇳 India</h3>
                  <p>
                    Upload a clear{" "}
                    <strong className="text-slate-900">JPEG</strong> on the
                    Sarathi portal. Check the size limit on each form.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── BYLINE & TRUST ── */}
        <section
          className="bg-white border-b border-slate-200 py-5"
          aria-label="About this guide"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-xs sm:text-sm text-slate-600 space-y-1.5">
            <p>
              <strong className="text-slate-900">Written by:</strong>{" "}
              PixPassport Editorial Team
              {REVIEWER ? (
                <>
                  {" "}
                  · <strong className="text-slate-900">
                    Reviewed by:
                  </strong>{" "}
                  {(REVIEWER as unknown as Reviewer).name}, {(REVIEWER as unknown as Reviewer).role}
                </>
              ) : null}{" "}
              · <strong className="text-slate-900">Last reviewed:</strong>{" "}
              {REVIEWED_ON}
            </p>
            <p>
              We check each rule against official sources, listed at the end of
              this page. Photo rules differ by state and licensing authority and
              can change, so confirm the details with your own DMV, DVLA or
              Sarathi portal before you apply.
            </p>
          </div>
        </section>

        {/* ── JUMP NAV ── */}
        <nav
          aria-label="On this page"
          className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 overflow-x-auto"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 whitespace-nowrap text-xs font-semibold text-slate-600">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px] mr-1">
                Jump to:
              </span>
              {tocItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="bg-slate-100 hover:bg-lime-100 hover:text-lime-900 px-3 py-2 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-lime-700"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* ── US ── */}
        <section
          id="us"
          className="scroll-mt-16 py-12 lg:py-16 bg-white border-b border-slate-200"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-bold text-lime-700 block mb-1">
                🇺🇸 United States
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                US Driver’s License Photo Requirements
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                Three different US photos get mixed up. Each has its own rules
                and its own issuer, so check which one you need before you take
                or upload anything.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-bold text-slate-900 mb-1.5">
                  1. Driver’s license photo
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  In most states, DMV staff take this photo at the counter. You
                  usually cannot bring your own, and your state sets the rules.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-bold text-slate-900 mb-1.5">
                  2. State ID photo
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Your DMV also takes this photo in most cases. A few states
                  accept an uploaded photo for some online services, so check
                  your state first.
                </p>
              </div>
              <div className="rounded-2xl border border-lime-300 bg-lime-50/60 p-5">
                <h3 className="font-bold text-slate-900 mb-1.5">
                  3. Passport-style photo (2×2 in)
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  You supply this photo for a US passport or visa. The State
                  Department sets the size. It is{" "}
                  <strong className="text-slate-900">not</strong> a DMV
                  submission rule.
                </p>
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2">
              US driver’s license photo: what to expect at the DMV
            </h3>
            <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5 mb-8 max-w-3xl">
              <li>
                Staff photograph you in person, so you do not choose the size or
                background.
              </li>
              <li>
                Many DMVs ask you to remove glasses. Rules differ by state.
              </li>
              <li>
                Smile rules differ too. The Colorado DMV, for example, announced
                in 2022 that residents can smile for licence, ID and permit
                photos.
              </li>
              <li>
                Ask the clerk about retake rules if you dislike the result.
              </li>
            </ul>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {[
                "Take off your glasses before you reach the camera.",
                "Wear a darker top against the light backdrop.",
                "Style your hair away from your eyes and eyebrows.",
                "Look at the camera with a relaxed face.",
              ].map((tip) => (
                <div
                  key={tip}
                  className="flex items-start gap-2 bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-700"
                >
                  <span className="text-lime-700 font-bold" aria-hidden="true">
                    ✓
                  </span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-200 p-5 mb-10">
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Find your state’s official rules
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                Always read your own state DMV’s page before your visit. These
                official pages show how states publish their rules:
              </p>
              <ul className="space-y-1.5 text-sm list-disc pl-5">
                <li>
                  <a
                    href="https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/driver-license-id-card-online-renewal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lime-700 underline"
                  >
                    California DMV: renew your driver’s license or ID
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lime-700 underline"
                  >
                    California DMV: REAL ID
                  </a>
                </li>
                <li>
                  <a
                    href="https://dmv.colorado.gov/press-release/say-cheese-coloradans-can-now-smile-for-driver-license-photos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lime-700 underline"
                  >
                    Colorado DMV: smiling allowed in licence photos
                  </a>
                </li>
              </ul>
              <p className="text-sm text-slate-600 mt-3">
                Need a photo to support your application?{" "}
                <Link
                  href="/usa-driver-license-photo-editor"
                  className="text-lime-700 underline font-semibold"
                >
                  Try our US driver license photo editor
                </Link>
                .
              </p>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-1">
              US passport-style photo (2×2 in) specifications
            </h3>
            <p className="text-sm text-slate-600 mb-3 max-w-3xl">
              Use these specifications for US passport and visa photos. See the{" "}
              <a
                href="https://travel.state.gov/content/travel/en/passports/how-apply/photos.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lime-700 underline"
              >
                State Department photo rules
              </a>{" "}
              or make one with our{" "}
              <Link
                href="/us-passport-photo-editor"
                className="text-lime-700 underline font-semibold"
              >
                US passport photo maker
              </Link>
              .
            </p>
            <div className="rounded-2xl border border-slate-200 overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[32rem] text-left text-xs sm:text-sm">
                  <caption className="sr-only">
                    US passport-style 2×2 inch photo specifications
                  </caption>
                  <thead className="bg-slate-900 text-white">
                    <tr>
                      {SPEC_TABLE_HEAD.map((h) => (
                        <th
                          key={h}
                          scope="col"
                          className="p-3 sm:p-4 font-bold"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {usSpecs.map((row, idx) => (
                      <tr
                        key={row.req}
                        className={
                          idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                        }
                      >
                        <th
                          scope="row"
                          className="p-3 sm:p-4 font-bold text-slate-900"
                        >
                          {row.req}
                        </th>
                        <td className="p-3 sm:p-4 text-slate-700 font-medium">
                          {row.spec}
                        </td>
                        <td className="p-3 sm:p-4 text-lime-800 font-semibold">
                          <span aria-hidden="true">✓ </span>
                          {row.pix}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              <strong>Heads up:</strong> The State Department does not accept
              passport photos changed with software, phone apps, filters or AI.
              Take your photo against a plain white wall, and use the tool to
              crop and size it.
            </div>
          </div>
        </section>

        {/* ── UK ── */}
        <section
          id="uk"
          className="scroll-mt-16 py-12 lg:py-16 bg-slate-50 border-b border-slate-200"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-bold text-lime-700 block mb-1">
                🇬🇧 United Kingdom
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                UK Driving Licence Photo Requirements
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                The DVLA asks for a passport-type photo. You follow the same
                rules for a provisional licence, a full licence and a photocard
                renewal. See our{" "}
                <Link
                  href="/uk"
                  className="text-lime-700 underline font-semibold"
                >
                  UK passport photo requirements
                </Link>{" "}
                for the full passport rules.
              </p>
            </div>

            <div
              id="specs"
              className="scroll-mt-16 rounded-2xl border border-slate-200 overflow-hidden mb-10 bg-white"
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[32rem] text-left text-xs sm:text-sm">
                  <caption className="sr-only">
                    UK driving licence photo specifications
                  </caption>
                  <thead className="bg-slate-900 text-white">
                    <tr>
                      {SPEC_TABLE_HEAD.map((h) => (
                        <th
                          key={h}
                          scope="col"
                          className="p-3 sm:p-4 font-bold"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {ukSpecs.map((row, idx) => (
                      <tr
                        key={row.req}
                        className={
                          idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                        }
                      >
                        <th
                          scope="row"
                          className="p-3 sm:p-4 font-bold text-slate-900"
                        >
                          {row.req}
                        </th>
                        <td className="p-3 sm:p-4 text-slate-700 font-medium">
                          {row.spec}
                        </td>
                        <td className="p-3 sm:p-4 text-lime-800 font-semibold">
                          <span aria-hidden="true">✓ </span>
                          {row.pix}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              <div className="bg-lime-50/60 border border-lime-200 rounded-2xl p-5 sm:p-6">
                <h3 className="text-base font-bold text-slate-900 mb-3">
                  <span aria-hidden="true">✓ </span>What your photo must show
                </h3>
                <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
                  <li>Your full head and upper shoulders, facing forward.</li>
                  <li>A plain expression with your mouth closed.</li>
                  <li>Both eyes open and clear of hair.</li>
                  <li>
                    Even light with no shadows on your face or behind you.
                  </li>
                  <li>Nobody and nothing else in the frame.</li>
                </ul>
              </div>
              <div className="bg-rose-50/60 border border-rose-200 rounded-2xl p-5 sm:p-6">
                <h3 className="text-base font-bold text-slate-900 mb-3">
                  <span aria-hidden="true">✕ </span>What the DVLA rejects
                </h3>
                <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
                  <li>
                    Hats and head coverings, unless for religious or medical
                    reasons.
                  </li>
                  <li>
                    Sunglasses, tinted lenses and frames that cover your eyes.
                  </li>
                  <li>Filters, skin smoothing and other retouching.</li>
                  <li>Photos cut down by hand from a larger picture.</li>
                  <li>Red eye, blur, glare and heavy shadows.</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-slate-600 mt-6">
              <strong className="text-slate-900">Provisional licence?</strong>{" "}
              You use the same photo size, background and expression rules as a
              full licence.
            </p>
          </div>
        </section>

        {/* ── INDIA ── */}
        <section
          id="india"
          className="scroll-mt-16 py-12 lg:py-16 bg-white border-b border-slate-200"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-bold text-lime-700 block mb-1">
                🇮🇳 India
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                India Driving Licence Photo for Sarathi Parivahan
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                Sarathi Parivahan is the official portal for driving licence
                services in India. For online learner licence and driving
                licence applications, you upload a JPEG photo and a signature
                image. Pixel and file-size limits differ by form and state, so
                read the limits on the upload screen before you submit.
              </p>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-3">
              How the Sarathi photo upload works
            </h3>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                {
                  t: "Open Sarathi and pick your state",
                  d: "Start on the official Sarathi Parivahan site and choose your state before you pick a service.",
                },
                {
                  t: "Choose learner or driving licence",
                  d: "Pick the service you need. A learner licence and a permanent driving licence use separate forms.",
                },
                {
                  t: "Prepare your photo and signature",
                  d: "Make a clear 35×45 mm photo with your face centred and eyes open. Prepare a separate signature image.",
                },
                {
                  t: "Match the file limit shown",
                  d: "Compress each JPEG to the size and dimensions on the upload screen for your form.",
                },
                {
                  t: "Upload with your documents",
                  d: "Upload the photo and signature alongside the identity, age and address documents the form asks for.",
                },
                {
                  t: "Fix upload errors",
                  d: "If the portal reports invalid dimensions or size, resize the file and upload it again.",
                },
              ].map((step, i) => (
                <li
                  key={step.t}
                  className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-5"
                >
                  <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-sm shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">
                      {step.t}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed mt-1">
                      {step.d}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <h3 className="text-lg font-bold text-slate-900 mb-3">
              Photo tips for Sarathi uploads
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-sm text-slate-700">
              {[
                "Face the camera with your head and shoulders in frame.",
                "Use a plain, light background with no shadows.",
                "Keep your face sharp, evenly lit and free of glare.",
                "Save the file as a JPEG, not PNG or HEIC.",
                "Check state-specific instructions before you pay.",
                "Keep the original photo in case you need to resize again.",
              ].map((tip) => (
                <li
                  key={tip}
                  className="flex items-start gap-2 bg-slate-50 border border-slate-200 rounded-xl p-3"
                >
                  <span className="text-lime-700 font-bold" aria-hidden="true">
                    ✓
                  </span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 mb-6">
              <strong>Check before you upload.</strong> Published size limits
              for Sarathi vary between sources, so rely on the figures shown on
              the portal for your state and form.
            </div>

            <p className="text-sm text-slate-600">
              Official sources:{" "}
              <a
                href="https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lime-700 underline"
              >
                Sarathi Parivahan service portal
              </a>{" "}
              ·{" "}
              <a
                href="https://parivahan.gov.in/parivahan//en/content/driving-licence-0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lime-700 underline"
              >
                Parivahan driving licence information
              </a>
              .
            </p>
          </div>
        </section>

        {/* ── COMPARISON ── */}
        <section
          id="compare"
          className="scroll-mt-16 py-12 lg:py-16 bg-slate-50 border-b border-slate-200"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-8">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Driving Licence Photo Rules Compared: US, UK and India
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2">
                The biggest difference is who takes the photo. Use this table to
                see what applies to you.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[44rem] text-left text-xs sm:text-sm">
                  <caption className="sr-only">
                    Driving licence photo rules compared for the US, UK and
                    India
                  </caption>
                  <thead className="bg-slate-900 text-white">
                    <tr>
                      {[
                        "Country",
                        "Who takes the photo",
                        "Photo size",
                        "Glasses",
                        "Smiling",
                        "Official source",
                      ].map((h) => (
                        <th
                          key={h}
                          scope="col"
                          className="p-3 sm:p-4 font-bold"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {comparisonRows.map((row, idx) => (
                      <tr
                        key={row.country}
                        className={
                          idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                        }
                      >
                        <th
                          scope="row"
                          className="p-3 sm:p-4 font-bold text-slate-900"
                        >
                          {row.country}
                        </th>
                        <td className="p-3 sm:p-4 text-slate-700">{row.who}</td>
                        <td className="p-3 sm:p-4 text-slate-700">
                          {row.size}
                        </td>
                        <td className="p-3 sm:p-4 text-slate-700">
                          {row.glasses}
                        </td>
                        <td className="p-3 sm:p-4 text-slate-700">
                          {row.smile}
                        </td>
                        <td className="p-3 sm:p-4 text-slate-700">
                          {row.source}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ── SIZES BY COUNTRY ── */}
        <section
          id="sizes"
          className="scroll-mt-16 py-12 lg:py-16 bg-slate-50 border-b border-slate-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Driving Licence Photo Sizes by Country
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Authorities set different sizes. Pick your country to format
                your photo.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {supportedDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-lime-500 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-2xl" aria-hidden="true">
                        {doc.flag}
                      </span>
                      <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                        {doc.size}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1.5">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {doc.note}
                    </p>
                  </div>
                  <div className="pt-4 mt-3 border-t border-slate-100">
                    <a
                      href={doc.link}
                      className="inline-flex items-center justify-between w-full min-h-[44px] text-xs font-bold text-lime-700 hover:text-lime-800 transition-colors"
                    >
                      <span>Make this photo</span>
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/passport-photo-online"
                className="inline-flex items-center gap-2 text-sm font-bold text-lime-700 hover:underline"
              >
                <span>See all countries in the Photo Maker Studio</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="py-12 lg:py-16 bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                How to Make Your Driving Licence Photo
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Go from a phone portrait to a sized digital file and a print
                sheet in three steps.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
              {[
                {
                  src: "https://res.cloudinary.com/dipzpwbbk/image/upload/f_auto,q_auto,w_600/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg",
                  alt: "Head position and size measured on a portrait photo",
                  step: "Step 1",
                  title: "Measure your head",
                  desc: "The tool finds your face and checks your chin-to-crown height against the standard.",
                },
                {
                  src: "https://res.cloudinary.com/dipzpwbbk/image/upload/f_auto,q_auto,w_600/v1779008017/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_photo_eyp4a3.jpg",
                  alt: "Driving licence photo cropped to size on a plain light background",
                  step: "Step 2",
                  title: "Crop to size",
                  desc: "Your photo gets the exact country size on a plain light background, exported at 300 DPI.",
                },
                {
                  src: "https://res.cloudinary.com/dipzpwbbk/image/upload/f_auto,q_auto,w_600/v1779076959/MakePassportPhoto_ph2uog.jpg",
                  alt: "4x6 inch print sheet with several identical photos",
                  step: "Step 3",
                  title: "Print or upload",
                  desc: "Use the digital file for online forms, or print the 4×6 inch sheet at a kiosk or at home.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden hover:border-lime-400 transition-colors"
                >
                  <div className="aspect-[3/4] relative bg-slate-100 overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="p-4 sm:p-5">
                    <span className="text-[11px] font-black text-lime-700 bg-lime-100 px-2 py-0.5 rounded">
                      {item.step}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-2 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <a
                href="#tool"
                className="inline-flex items-center justify-center bg-lime-700 hover:bg-lime-800 text-white font-bold text-sm px-7 py-3.5 rounded-xl shadow-sm transition-all"
              >
                Create my photo now →
              </a>
            </div>
          </div>
        </section>

        {/* ── GLASSES & SMILING ── */}
        <section className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div id="glasses" className="scroll-mt-16">
              <div className="max-w-2xl mb-6">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Can You Wear Glasses in Your Driving Licence Photo?
                </h2>
                <p className="text-sm text-slate-600 mt-2">
                  Take them off whenever you can. Here is how the US and UK
                  rules compare.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <h3 className="font-bold text-slate-900 text-base">
                      🇺🇸 US DMV
                    </h3>
                    <span className="text-xs font-semibold text-rose-800 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded">
                      Usually removed
                    </span>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-600 list-disc pl-5">
                    <li>
                      Many DMVs ask you to remove glasses for every licence
                      photo.
                    </li>
                    <li>
                      Rules differ by state, so check your DMV website first.
                    </li>
                    <li>
                      Ask about a medical exemption if you cannot remove them.
                    </li>
                    <li>US passport-style photos do not allow glasses.</li>
                  </ul>
                </div>
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <h3 className="font-bold text-slate-900 text-base">
                      🇬🇧 UK DVLA
                    </h3>
                    <span className="text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded">
                      Only if you must
                    </span>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-600 list-disc pl-5">
                    <li>Remove your glasses unless you have to wear them.</li>
                    <li>Never wear sunglasses or tinted lenses.</li>
                    <li>
                      Keep frames, glare, reflections and shadows off your eyes.
                    </li>
                    <li>
                      Take your source photo without glasses to avoid glare.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div id="smile" className="scroll-mt-16">
              <div className="max-w-2xl mb-6">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Can You Smile on a Driving Licence Photo?
                </h2>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-3 text-sm text-slate-700 leading-relaxed">
                    <p>
                      <strong>In the US, it depends on your state.</strong> Some
                      DMVs allow a natural smile, and others ask for a neutral
                      face. Ask your DMV before your appointment, and keep your
                      expression relaxed.
                    </p>
                    <p>
                      <strong>In the UK, no.</strong> The DVLA follows passport
                      rules, which ask for a plain expression with your mouth
                      closed.
                    </p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm space-y-2">
                    <div className="font-bold text-slate-900">
                      Expression checklist
                    </div>
                    <div className="text-slate-600">
                      <span
                        className="text-lime-700 font-bold"
                        aria-hidden="true"
                      >
                        ✓{" "}
                      </span>
                      Mouth closed
                    </div>
                    <div className="text-slate-600">
                      <span
                        className="text-lime-700 font-bold"
                        aria-hidden="true"
                      >
                        ✓{" "}
                      </span>
                      Eyes open, looking at the lens
                    </div>
                    <div className="text-slate-600">
                      <span
                        className="text-lime-700 font-bold"
                        aria-hidden="true"
                      >
                        ✓{" "}
                      </span>
                      Face relaxed
                    </div>
                    <div className="text-slate-600">
                      <span
                        className="text-rose-700 font-bold"
                        aria-hidden="true"
                      >
                        ✕{" "}
                      </span>
                      No raised eyebrows or smirks
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CHANGE PHOTO ── */}
        <section
          id="change-photo"
          className="scroll-mt-16 py-12 lg:py-16 bg-white border-b border-slate-200"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-8">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                How to Change Your Driving Licence Photo
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2">
                In the UK, you change your photo by renewing your licence, and
                you can do it at any time. You do not have to wait for your
                10-year renewal date.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-8">
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-black text-lime-800 bg-lime-100 px-3 py-1 rounded-full">
                      Online
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      £14 fee
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Renew online on GOV.UK
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    For Great Britain residents who are not disqualified from
                    driving. You can use your passport photo or upload a new
                    one.
                  </p>
                  <ol className="space-y-3 text-sm text-slate-700">
                    {[
                      "Open the GOV.UK “Change the photo on your driving licence” page.",
                      "Sign in or create an account. You may need to prove your identity with photo ID.",
                      "Use your passport photo or upload the file you made with PixPassport.",
                      "Pay the £14 fee by card.",
                    ].map((s, i) => (
                      <li key={s} className="flex items-start gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="text-xs text-slate-500 mt-4">
                    You cannot renew online if your name or title has changed,
                    or if you hold a 5-year bus or lorry licence.
                  </p>
                </div>
                <div className="pt-5 mt-4 border-t border-slate-200">
                  <a
                    href="https://www.gov.uk/renew-photo-driving-licence"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-lime-700 hover:underline"
                  >
                    Visit the GOV.UK renewal service ↗
                  </a>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-black text-slate-700 bg-slate-200 px-3 py-1 rounded-full">
                      By post
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      £17 fee
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Renew by post with a D1 pack
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    Use this route if you cannot renew online, for example after
                    a name change.
                  </p>
                  <ol className="space-y-3 text-sm text-slate-700">
                    {[
                      "Pick up a D1 pack from a Post Office branch that handles DVLA photocard renewals.",
                      "Print your PixPassport 4×6 sheet and cut out one 35×45 mm photo.",
                      "Include your photocard, your paper counterpart if you have one, and a £17 cheque or postal order.",
                      "Post everything to DVLA. Your licence should arrive within 3 weeks.",
                    ].map((s, i) => (
                      <li key={s} className="flex items-start gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <p className="pt-5 mt-4 border-t border-slate-200 text-xs text-slate-500">
                  Renewal is free if you are over 70. Northern Ireland uses the
                  Driver &amp; Vehicle Agency (DVA), not the DVLA.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
              <div className="rounded-2xl border border-slate-200 p-5">
                <h3 className="font-bold text-slate-900 mb-1">🇺🇸 In the US</h3>
                <p>
                  Your state DMV controls photo updates. Most states retake your
                  photo at the counter when you renew or replace your licence.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-5">
                <h3 className="font-bold text-slate-900 mb-1">🇮🇳 In India</h3>
                <p>
                  Start your renewal on the Sarathi Parivahan portal and follow
                  the photo instructions for your state.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── PHOTO TIPS ── */}
        <section
          id="photo-tips"
          className="scroll-mt-16 py-12 lg:py-16 bg-slate-50 border-b border-slate-200"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                How to Take a Driving Licence Photo at Home
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Follow these six rules before you upload your photo, then run it
                through our{" "}
                <Link
                  href="/passport-photo-checker"
                  className="text-lime-700 underline font-semibold"
                >
                  free passport photo checker
                </Link>
                .
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {[
                {
                  icon: "🪟",
                  title: "Face natural daylight",
                  desc: "Stand facing a large window. Soft daylight lights both sides of your face without flash glare.",
                },
                {
                  icon: "📏",
                  title: "Stand 1.5 metres away",
                  desc: "Ask a friend to hold the phone 1.5 m (5 ft) away. Arm’s-length selfies distort your face.",
                },
                {
                  icon: "📷",
                  title: "Hold the camera at eye level",
                  desc: "Keep the lens level with your eyes. Tilting up or down changes your face shape.",
                },
                {
                  icon: "👕",
                  title: "Wear a dark, plain top",
                  desc: "Choose navy, black or green. White and pale tops blend into a light background.",
                },
                {
                  icon: "💇",
                  title: "Keep hair off your face",
                  desc: "Tuck hair behind your ears so your eyes, eyebrows and jawline stay visible.",
                },
                {
                  icon: "👓",
                  title: "Take off your glasses",
                  desc: "Remove glasses to avoid glare, reflections and frame shadows.",
                },
              ].map((tip) => (
                <div
                  key={tip.title}
                  className="bg-white p-5 rounded-2xl border border-slate-200"
                >
                  <div className="text-3xl mb-3" aria-hidden="true">
                    {tip.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">
                    {tip.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {tip.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MISTAKES ── */}
        <section
          id="mistakes"
          className="scroll-mt-16 py-12 lg:py-16 bg-white border-b border-slate-200"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Common Reasons Driving Licence Photos Get Rejected
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                A rejected photo delays your application. Avoid these six
                mistakes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {[
                {
                  title: "Using an old photo",
                  why: "Authorities want a recent likeness. The UK asks for a photo from the last month.",
                  fix: "Take a fresh portrait before you create your file.",
                },
                {
                  title: "Smiling when the rules say neutral",
                  why: "UK photos need a closed mouth, and some US states ask for a neutral face.",
                  fix: "Relax your face and keep your lips gently closed.",
                },
                {
                  title: "Glare on glasses",
                  why: "Reflections and frame shadows hide your eyes.",
                  fix: "Remove your glasses before you take the source photo.",
                },
                {
                  title: "Wearing a white or cream top",
                  why: "A light top blends into a light background.",
                  fix: "Wear a darker, plain top for clear contrast.",
                },
                {
                  title: "Shadows on your face or the wall",
                  why: "Overhead light casts shadows under your chin and behind you.",
                  fix: "Face a window and stand a step away from the wall.",
                },
                {
                  title: "Wrong size or file limit",
                  why: "Online portals, such as Sarathi, reject files outside their size limits.",
                  fix: "Size your photo with PixPassport, then check the limit on the portal.",
                },
              ].map((m) => (
                <div
                  key={m.title}
                  className="bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-6 flex flex-col justify-between gap-3"
                >
                  <div>
                    <h3 className="font-bold text-slate-900 text-base mb-1.5">
                      <span className="text-rose-600" aria-hidden="true">
                        ✕{" "}
                      </span>
                      {m.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {m.why}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl border border-lime-300 p-3 text-sm text-lime-900">
                    <span className="font-bold text-lime-700">Fix: </span>
                    {m.fix}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section
          id="faq"
          className="scroll-mt-16 py-12 lg:py-16 bg-slate-50 border-b border-slate-200"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Driving Licence Photo FAQ
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group bg-white border border-slate-200 rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-3 p-4 sm:p-5 cursor-pointer list-none text-sm sm:text-base font-bold text-slate-900 select-none focus-visible:outline-2 focus-visible:outline-lime-700">
                    <h3 className="pr-2 text-sm sm:text-base font-bold">
                      {faq.question}
                    </h3>
                    <span
                      className="w-7 h-7 rounded-full bg-slate-100 group-open:bg-lime-700 group-open:text-white text-slate-600 flex items-center justify-center shrink-0 transition-colors"
                      aria-hidden="true"
                    >
                      <svg
                        className="w-4 h-4 transition-transform duration-200 group-open:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOURCES ── */}
        <section
          className="py-10 bg-white border-b border-slate-200"
          aria-labelledby="sources"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-slate-600">
            <h2
              id="sources"
              className="font-bold text-slate-900 text-base mb-4"
            >
              Official sources we checked
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <h3 className="font-semibold text-slate-800 mb-1.5">
                  🇺🇸 United States
                </h3>
                <ul className="space-y-1.5 list-disc pl-5">
                  <li>
                    <a
                      href="https://travel.state.gov/content/travel/en/passports/how-apply/photos.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lime-700 underline"
                    >
                      US State Department passport photo rules
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://dmv.colorado.gov/press-release/say-cheese-coloradans-can-now-smile-for-driver-license-photos"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lime-700 underline"
                    >
                      Colorado DMV photo announcement
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lime-700 underline"
                    >
                      California DMV REAL ID
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1.5">
                  🇬🇧 United Kingdom
                </h3>
                <ul className="space-y-1.5 list-disc pl-5">
                  <li>
                    <a
                      href="https://www.gov.uk/renew-photo-driving-licence"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lime-700 underline"
                    >
                      GOV.UK: change the photo on your driving licence
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.gov.uk/photos-for-passports"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lime-700 underline"
                    >
                      GOV.UK: passport photo rules
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://nidirect.gov.uk/node/2614"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lime-700 underline"
                    >
                      nidirect: certifying a licence photo
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1.5">
                  🇮🇳 India
                </h3>
                <ul className="space-y-1.5 list-disc pl-5">
                  <li>
                    <a
                      href="https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lime-700 underline"
                    >
                      Sarathi Parivahan portal
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://parivahan.gov.in/parivahan//en/content/driving-licence-0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lime-700 underline"
                    >
                      Parivahan driving licence page
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-6 leading-relaxed">
              Requirements vary by state and licensing authority and can change.
              Confirm the details with your own DMV, DVLA or Sarathi portal
              before you apply. Last reviewed {REVIEWED_ON}.
            </p>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="bg-slate-900 text-white py-14 sm:py-20 border-t-4 border-lime-500">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Make Your Driving Licence Photo Online
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Upload one portrait. Download a sized digital file and a 4×6 inch
              print sheet for the US, UK or India.
            </p>
            <div className="pt-2">
              <a
                href="#tool"
                className="inline-flex items-center justify-center gap-2 bg-lime-600 hover:bg-lime-500 text-white font-bold text-base px-8 sm:px-9 py-4 rounded-xl shadow-lg transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span>Make My Driving Photo</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
