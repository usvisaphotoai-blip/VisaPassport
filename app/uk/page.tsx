import type { Metadata } from "next";
import Link from "next/link";
import { getAllUKPages } from "@/lib/uk-content";
import UKEmbeddedTool from "./components/UKEmbeddedTool";
import UKBeforeAfterSlider from "./components/UKBeforeAfterSlider";

const PAGE_URL = "https://www.pixpassport.com/uk";
const PAGE_TITLE = "UK Passport & Visa Photos Online – HMPO Rules | PixPassport";
const PAGE_DESCRIPTION =
  "Make UK passport, visa, BRP and driving licence photos online. Automatic 35x45mm crop, light grey background and checks against HMPO and DVLA rules.";
// Source image is 1536x1024; the OG variant is cropped to 1200x630 JPEG by Cloudinary.
const OG_IMG =
  "https://res.cloudinary.com/dipzpwbbk/image/upload/c_fill,w_1200,h_630,f_jpg,q_auto/v1784690540/uk-hero_m4cc8l.webp";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "en-GB": PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "PixPassport",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: OG_IMG,
        width: 1200,
        height: 630,
        alt: "UK passport photo before and after: selfie converted to a 35x45mm HMPO photo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [OG_IMG],
  },
};

const faqs = [
  {
    question: "What size is a UK passport photo?",
    answer:
      "A printed UK passport photo must be 45mm high and 35mm wide. Your head, from the bottom of your chin to the top of your head, must be between 29mm and 34mm high.",
  },
  {
    question: "What size must a digital UK passport photo be?",
    answer:
      "For an online application the digital photo must be at least 600 pixels wide and 750 pixels tall. The tool exports a digital JPEG that meets this size.",
  },
  {
    question: "What background colour does a UK passport photo need?",
    answer:
      "HM Passport Office asks for a plain cream or light grey background with no patterns, objects or shadows behind you. The tool replaces your background automatically.",
  },
  {
    question: "Can I wear glasses in a UK passport photo?",
    answer:
      "No. You cannot wear glasses in a UK passport photo unless you have to wear them for a medical reason, and in that case your eyes must be clearly visible with no glare.",
  },
  {
    question: "Can I take my own UK passport photo at home?",
    answer:
      "Yes. Take a photo against a plain light wall with even lighting, then upload it. The tool crops it to 35x45mm, checks it against HMPO rules and gives you a digital file and a 4x6 print sheet.",
  },
];

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "PixPassport UK Passport & Visa Photo Tool",
  url: PAGE_URL,
  description: PAGE_DESCRIPTION,
  applicationCategory: "PhotographyApplication",
  operatingSystem: "Any",
  inLanguage: "en-GB",
  image: OG_IMG,
  publisher: {
    "@type": "Organization",
    name: "PixPassport",
    url: "https://www.pixpassport.com/",
    logo: { "@type": "ImageObject", url: "https://www.pixpassport.com/logo.png" },
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.pixpassport.com/" },
    { "@type": "ListItem", position: 2, name: "UK Photo Tools", item: PAGE_URL },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

// Escape "<" so content can never close the surrounding <script> tag
const toJsonLd = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");

const officialUKSources = [
  {
    agency: "GOV.UK — HM Passport Office",
    doc: "UK Passport Photo Rules & Code",
    url: "https://www.gov.uk/photos-for-passports",
    note: "Official UK government standards for passport photos and digital photo codes.",
    badge: "HMPO",
  },
  {
    agency: "DVLA — Driver & Vehicle Licensing Agency",
    doc: "Photocard Driving Licence Renewal",
    url: "https://www.gov.uk/renew-driving-licence",
    note: "Official UK specs for photocard driving licence applications.",
    badge: "DVLA",
  },
  {
    agency: "UKVI — UK Visas & Immigration",
    doc: "Visa & BRP Biometric Standards",
    url: "https://www.gov.uk/government/organisations/uk-visas-and-immigration",
    note: "Biometric specifications for UK residency and visa approvals.",
    badge: "UKVI",
  },
  {
    agency: "International Civil Aviation Org",
    doc: "Doc 9303 Biometric Specifications",
    url: "https://www.icao.int/publications/doc-series/doc-9303",
    note: "Global biometric standard enforced across all UK travel documents.",
    badge: "ICAO",
  },
];

export default function UKIndexPage() {
  const pages = getAllUKPages();

  return (
    <div className="bg-slate-50 min-h-screen pb-10">
      {/* Gov-style top accent bar */}
      <div className="h-1 bg-lime-700 w-full" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchema) }}
      />

      {/* ── HERO SECTION ── */}
      <section className="bg-white border-b border-slate-200 py-8 lg:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Left Column: Headline & 2 CTAs */}
            <div className="flex-1 w-full text-left">
              <div className="inline-flex items-center gap-2 bg-lime-50 border border-lime-200 rounded-full px-3 py-1 mb-4">
                <span className="w-2 h-2 rounded-full bg-lime-600 animate-pulse" />
                <span className="text-xs font-extrabold text-lime-800 tracking-wide uppercase">
                  UK Biometric Photo Tool · Built to HMPO &amp; DVLA Rules
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-4xl font-black text-slate-800 leading-tight tracking-tight mb-3">
                UK Passport &amp; Visa Photos Online
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 font-normal mb-5 leading-snug">
                Create and check your UK passport, visa or driving licence photo
                in under a minute. Free to try.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-7 max-w-lg">
                Automated biometric checks against official UK government rules
                — 35x45mm sizing, background removal, face detection, eye
                position — all processed instantly.
              </p>

              {/* 2 CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3.5 mb-7">
                <a
                  href="#uk-tool"
                  className="inline-flex items-center justify-center bg-lime-700 hover:bg-lime-800 text-white text-sm sm:text-base font-bold px-4 py-3  transition-all active:scale-95 gap-2"
                >
                  <span>Upload &amp; Create Photo</span>
               
                </a>
                <Link
                  href="/uk-passport-photo-checker-online-free"
                  className="inline-flex items-center justify-center bg-white border-2 border-slate-300 hover:border-lime-600 hover:text-lime-700 text-slate-800 text-sm sm:text-base font-bold px-4 py-3  transition-all active:scale-95 gap-2"
                >
                  <span>Free UK Passport Photo Checker</span>
                </Link>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-3 mb-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="#15803d"
                    >
                      <path d="M12 2l2.9 8.9H23l-7.4 5.4 2.8 8.7L12 19.6l-6.4 5.4 2.8-8.7L2 10.9h8.1z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-slate-700 font-bold">
                  4.9 · Trusted by 17,000+ UK applicants
                </span>
              </div>
            </div>

            {/* Right Column: Before & After Slider */}
            <div className="w-full lg:w-auto flex justify-center">
              <UKBeforeAfterSlider />
            </div>
          </div>
        </div>
      </section>

    

      {/* ── MAIN EMBEDDED PHOTO GENERATOR TOOL ── */}
      <section id="uk-tool" className="max-w-7xl mx-auto px-1 sm:px-2 lg:px-4 py-6 scroll-mt-6">
        <h2 className="sr-only">UK Passport &amp; Visa Photo Maker</h2>
        <UKEmbeddedTool
         
        />
      </section>

      {/* ── EXAMPLE OUTPUT SECTION (RESPONSIVE 4-STEP FLOW PROCESS) ── */}
      <section className="bg-white border-y border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-7">
            <span className="text-xs font-black text-lime-700 uppercase tracking-widest block mb-1">
              Automatic Photo Transformation Flow
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              4-Step UK Photo Processing Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1">
              From raw camera upload to biometric verification, 35×45mm compliance, and print-ready sheet.
            </p>
          </div>

          {/* 4 Cards Grid Flow */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {/* Step 1: Normal Camera Upload */}
            <div className="group relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 hover:border-lime-500 hover:shadow-xs transition-all flex flex-col justify-between">
              <div>
                <div className="aspect-[35/45] relative bg-slate-100 overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1786116243/uk_before_image_passport_photo_d4sqnr.webp"
                    alt="Step 1: original selfie taken at home on a phone, before UK passport photo processing"
                    width={350}
                    height={450}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover  transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-black px-2 py-0.5 rounded">
                    STEP 1
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    1. Camera Upload
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    Casual selfie or home portrait photo from any phone.
                  </p>
                </div>
              </div>
              <div className="px-3 pb-3 hidden md:flex items-center text-[10px] font-bold text-lime-700">
                Next: Biometric scan →
              </div>
            </div>

            {/* Step 2: Biometric Check */}
            <div className="group relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 hover:border-lime-500 hover:shadow-xs transition-all flex flex-col justify-between">
              <div>
                <div className="aspect-[35/45] relative bg-slate-100 overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1786118128/passport_photo_biometric_check_truryq.webp"
                    alt="Step 2: biometric scan measuring chin-to-crown head height and eye position"
                    width={350}
                    height={450}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover  transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-blue-700/80 text-white text-[10px] font-black px-2 py-0.5 rounded">
                    STEP 2
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    2. Biometric Scan
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    Chin-to-crown (29–34mm) &amp; eye position AI scan.
                  </p>
                </div>
              </div>
              <div className="px-3 pb-3 hidden md:flex items-center text-[10px] font-bold text-lime-700">
                Next: HMPO Crop →
              </div>
            </div>

            {/* Step 3: UK Compliant 35x45mm Photo */}
            <div className="group relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 hover:border-lime-500 hover:shadow-xs transition-all flex flex-col justify-between">
              <div>
                <div className="aspect-[35/45] relative bg-slate-100 overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1786116374/uk_passport_photo_after_atvxmj.webp"
                    alt="Step 3: finished 35x45mm UK passport photo on a light grey background"
                    width={350}
                    height={450}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover  transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-lime-700 text-white text-[10px] font-black px-2 py-0.5 rounded">
                    STEP 3
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    3. Compliant 35×45mm
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    Light grey background, sized to HMPO rules.
                  </p>
                </div>
              </div>
              <div className="px-3 pb-3 hidden md:flex items-center text-[10px] font-bold text-lime-700">
                Next: Print sheet →
              </div>
            </div>

            {/* Step 4: Print-Ready Sheet */}
            <div className="group relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 hover:border-lime-500 hover:shadow-xs transition-all flex flex-col justify-between">
              <div>
                <div className="aspect-[35/45] relative bg-slate-100 overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1786118129/final_result_vzs9an.jpg"
                    alt="Step 4: 4x6 inch print sheet with multiple 35x45mm UK passport photos"
                    width={350}
                    height={450}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover  transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-emerald-700 text-white text-[10px] font-black px-2 py-0.5 rounded">
                    STEP 4
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    4. Print Sheet (4×6″)
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    Physical copy sheet for Boots, Snappy Snaps or home.
                  </p>
                </div>
              </div>
              <div className="px-3 pb-3 hidden md:flex items-center text-[10px] font-bold text-emerald-700">
                Ready to submit ✓
              </div>
            </div>
          </div>
        </div>
      </section>

     

           {/* ── VERIFIED OFFICIAL SOURCES (COMPACT / SMALL) ── */}
      <section className="bg-white border-y border-slate-200 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-5">
            <span className="text-[11px] font-black text-lime-700 uppercase tracking-widest block mb-0.5">
              Official Government Specifications
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Verified Against Official UK Authorities
            </h2>
            <p className="text-slate-500 text-xs max-w-md mx-auto mt-0.5">
              Rules sourced directly from HMPO, DVLA, UKVI, and ICAO publications.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
            {officialUKSources.map((src, i) => (
              <a
                key={i}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 sm:p-3.5 bg-lime-50/40 border border-lime-200/80 rounded-xl hover:border-lime-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[9px] font-black text-lime-800 bg-lime-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {src.badge}
                    </span>
                    <span className="text-[10px] text-lime-700 font-bold">↗</span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-900 leading-tight">
                    {src.agency}
                  </div>
                  <div className="text-xs font-extrabold text-lime-900 mt-0.5 mb-1 leading-tight">
                    {src.doc}
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug mt-1">
                  {src.note}
                </p>
              </a>
            ))}
          </div>

          {/* Reference profiles (new links) */}
          <p className="text-center text-[11px] text-slate-500 mt-4">
            Reference profiles:{" "}
            <a
              href="https://en.wikipedia.org/wiki/HM_Passport_Office"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lime-800 font-bold hover:underline"
            >
              HM Passport Office (Wikipedia)
            </a>
            {" · "}
            <a
              href="https://www.wikidata.org/wiki/Q5988335"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lime-800 font-bold hover:underline"
            >
              HM Passport Office (Wikidata)
            </a>
            {" · "}
            <a
              href="https://www.wikidata.org/wiki/Q5308010"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lime-800 font-bold hover:underline"
            >
              Driver and Vehicle Licensing Agency (Wikidata)
            </a>
          </p>
        </div>
      </section>

      {/* ── UK PASSPORT PHOTO SIZE & TAKING PHOTO GUIDELINES SECTION ── */}
      <section className="bg-white border-b border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8 text-slate-800">
          {/* Section 1: UK Passport Photo Size Requirements */}
          <div>
            <div className="flex items-center gap-2 mb-3">
             
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                UK Passport Photo Size &amp; Requirements
              </h2>
            </div>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Photo size must be <strong>45 millimetres (mm) high × 35 millimetres (mm) wide</strong>.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-2">
              A close-up of your head and shoulders so that your head, from the bottom of your chin to your crown is between <strong>29mm and 34mm high</strong>.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-2">
              For online applications, the digital photo must be at least <strong>600 pixels wide × 750 pixels tall</strong>.
            </p>

            {/* Helpful Crop Tool Box */}
            <div className="mt-4 p-4 rounded-xl bg-lime-50 border border-lime-200 text-lime-900 text-xs sm:text-sm font-semibold flex items-start gap-3">
              <span className="text-lg">💡</span>
              <div>
                <p className="font-bold">Automated Sizing:</p>
                <p className="text-slate-700 font-normal mt-0.5">
                  You don&apos;t need to worry about the size requirements. Our online crop tool will help you to get the correct size automatically.
                </p>
                <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs">
                  <a href="#uk-tool" className="text-lime-800 font-extrabold hover:underline">
                    Create UK Passport Photo →
                  </a>
                  <Link href="/uk-passport-photo-checker-online-free" className="text-lime-800 font-extrabold hover:underline">
                    Check UK Passport Photo →
                  </Link>
                  <Link href="/uk-passport-size-photo-maker" className="text-lime-800 font-extrabold hover:underline">
                    UK Passport Size Photo Maker →
                  </Link>
                  <Link href="/uk-passport-photo-requirements-tool" className="text-slate-600 hover:text-slate-900 underline font-medium">
                    Full UK photo requirements
                  </Link>
                  <Link href="/passport-photos" className="text-slate-600 hover:text-slate-900 underline font-medium">
                    Check photo requirements for other countries
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Take Passport Photo Guidelines */}
          <div className="pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                How to Take a UK Passport Photo at Home
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mb-4">
              First of all, you need to take a photo using a digital camera or smartphone. Please follow the passport photo guidelines to take a photo that is suitable to make passport photos:
            </p>

            <ul className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700 font-medium">
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-lime-600 font-bold shrink-0">✓</span>
                <span>Passport photo must be in colour.</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-lime-600 font-bold shrink-0">✓</span>
                <span>Plain cream or light grey background with nothing on the wall behind you.</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-lime-600 font-bold shrink-0">✓</span>
                <span>Look straight to the camera. Both ears should be visible.</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-lime-600 font-bold shrink-0">✓</span>
                <span>The photo must be with a neutral facial expression.</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-lime-600 font-bold shrink-0">✓</span>
                <span>Both eyes should be open.</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-lime-600 font-bold shrink-0">✓</span>
                <span>Mouth must be closed. No smiling.</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-lime-600 font-bold shrink-0">✓</span>
                <span>Do not wear a hat or head covering unless it is for religious or medical reasons. Full face must be visible.</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-lime-600 font-bold shrink-0">✓</span>
                <span>No other objects in background or on face (e.g. headsets or hair covering face).</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-lime-600 font-bold shrink-0">✓</span>
                <span>Do not wear glasses unless you must for a medical reason. If worn, there must be no glare and your eyes must be clearly visible.</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-lime-600 font-bold shrink-0">✓</span>
                <span>Forehead and eyebrows should be visible (do not cover with hair).</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-lime-600 font-bold shrink-0">✓</span>
                <span>No shadow on face or behind head. Even facial lighting required.</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-lime-600 font-bold shrink-0">✓</span>
                <span>Lighting on the face must be even and natural.</span>
              </li>
            </ul>
          </div>

          {/* Section 3: Lighting and Positioning */}
          <div className="pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2 mb-3">
             
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Lighting and Positioning Tips
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900 mb-1">☀️ Bright Room &amp; Plain Light Wall</p>
                <p className="text-slate-600 text-xs">Take the photo in a bright room against a plain cream or light grey wall.</p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900 mb-1">📏 Stand 1 Metre Away</p>
                <p className="text-slate-600 text-xs">Stand one metre away from the wall, otherwise there may be shadow on the wall.</p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900 mb-1">📷 Tripod at Eye Level</p>
                <p className="text-slate-600 text-xs">Use a tripod. Adjust the camera position to the eye level.</p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900 mb-1">🖼️ Leave Head Space</p>
                <p className="text-slate-600 text-xs">When adjusting camera distance, leave enough space between top of head and top border of photo.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── UK MARKDOWN GUIDES DIRECTORY (COMPACT / 70% SMALLER) ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="text-center mb-5">
          <span className="text-[11px] font-black text-lime-700 uppercase tracking-widest block mb-0.5">
            Comprehensive Knowledge Base
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            UK Passport &amp; Document Guides
          </h2>
        
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {pages.map((page) => (
            <Link
              key={page.slug}
              href={`/uk/${page.slug}`}
              className="group bg-white rounded-xl p-3.5 border border-slate-200 hover:border-lime-500 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded bg-lime-100 text-lime-800 text-[10px] font-bold uppercase">
                    {page.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    🇬🇧 UK Spec
                  </span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 group-hover:text-lime-700 transition-colors line-clamp-1 leading-snug">
                  {page.h1 || page.title}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-snug">
                  {page.description}
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400">
                <span>{page.readingTime} read</span>
                <span className="text-lime-700 group-hover:translate-x-0.5 transition-transform">
                  Read guide →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 text-center mb-5">
          UK Passport Photo FAQs
        </h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.question} className="bg-white rounded-xl p-4 border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900">{faq.question}</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
