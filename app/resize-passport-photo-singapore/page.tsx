import type { Metadata, Viewport } from "next";
import Link from "next/link";
import SingaporeHero from "@/app/components/SingaporeHero";
import FaqAccordion from "@/app/components/FaqAccordion";
import SingaporeRelatedLinks from "@/app/components/SingaporeRelatedLinks";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Resize Passport Photo Singapore Online (413x531 px / 35x45mm) | ICA Tool",
  description:
    "Resize passport photo for Singapore online in seconds. Crop or convert any photo to ICA 35x45mm (413x531 px) standard with pure white background & free preview.",
  keywords: [
    "resize passport photo singapore",
    "convert photo to passport size singapore",
    "crop passport photo singapore",
    "singapore passport photo 413x531",
    "passport photo size converter singapore",
    "singapore passport size photo converter",
    "singapore passport photo resizer online",
    "ica photo resizer",
    "ica passport photo crop",
    "singapore 35x45mm photo converter",
    "resize photo for myica",
    "passport photo crop tool singapore",
  ],
  alternates: {
    canonical: "https://www.pixpassport.com/resize-passport-photo-singapore",
    languages: {
      en: "https://www.pixpassport.com/resize-passport-photo-singapore",
      "x-default": "https://www.pixpassport.com/resize-passport-photo-singapore",
    },
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Resize Passport Photo Singapore Online (413x531 px / 35x45mm)",
    description:
      "Convert or crop any photo to Singapore passport size — 413x531 px (35x45mm) — with pure white background and 100% ICA compliance.",
    url: "https://www.pixpassport.com/resize-passport-photo-singapore",
    siteName: "PixPassport",
    locale: "en_SG",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_visa_photo_example_whvfqt.jpg",
        width: 1200,
        height: 630,
        alt: "Resize Passport Photo Singapore Online Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resize Passport Photo Singapore Online (413x531 px / 35x45mm)",
    description:
      "Convert or crop any photo to Singapore passport size with pure white background — free to preview.",
    images: ["https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_visa_photo_example_whvfqt.jpg"],
  },
};

const steps = [
  {
    num: "01",
    title: "Upload Your Photo",
    desc: "Take a portrait photo with your phone or upload an existing image. Any background works at this stage.",
    icon: "📸",
  },
  {
    num: "02",
    title: "Automatic Resize & Crop",
    desc: "The tool crops your photo to the 35 × 45 mm ratio, resizes it to 413 × 531 px, and whitens the background.",
    icon: "⚡",
  },
  {
    num: "03",
    title: "ICA Compliance Check",
    desc: "We verify the 70%–80% chin-to-crown head ratio, eye alignment, and shadow-free lighting automatically.",
    icon: "🛡️",
  },
  {
    num: "04",
    title: "Download & Print",
    desc: "Get a compliant 413 × 531 px JPEG for MyICA, plus a 4×6 inch print sheet with multiple copies.",
    icon: "⬇️",
  },
];

const cropSteps = [
  {
    title: "Center the face",
    desc: "Position your eyes roughly two-thirds up the frame so the crop leaves even space above the head and below the chin.",
  },
  {
    title: "Cut to a 7:9 ratio",
    desc: "Crop the image so width and height sit at a 35:45 ratio — any other ratio will stretch or squeeze your photo on printing.",
  },
  {
    title: "Check the head height",
    desc: "After cropping, your face should fill 70% to 80% of the frame height. Too tight or too loose triggers rejection.",
  },
  {
    title: "Export at 413 × 531 px",
    desc: "Save the cropped file at exactly 413 × 531 pixels, 300 DPI, as a JPEG under 2 MB for MyICA upload.",
  },
];

const faqs = [
  {
    q: "How do I resize a passport photo for Singapore?",
    a: "Crop your photo to a 35 × 45 mm ratio, position your face so it fills 70% to 80% of the frame, and export the file at exactly 413 × 531 pixels on a pure white background. Upload your photo to PixPassport and the tool resizes, crops, and whitens the background for you automatically, so you don't have to measure anything by hand.",
  },
  {
    q: "How do I convert a photo to passport size for Singapore?",
    a: "To convert any photo to Singapore passport size, the image must be resampled to 413 × 531 pixels at 300 DPI, matching the official 35 × 45 mm physical dimension. Simply upload your photo, and our converter reformats it to this exact digital size while keeping your face sharp and correctly proportioned.",
  },
  {
    q: "How do I crop a passport photo for Singapore ICA?",
    a: "Crop so the top of the head sits 3 mm to 5 mm from the top edge and the chin-to-crown measurement covers 70% to 80% of the photo's height. Manual cropping in a basic photo app rarely hits this precisely, which is why our tool detects facial landmarks and applies the crop automatically.",
  },
  {
    q: "What is the exact size to resize a Singapore passport photo to?",
    a: "The Immigration & Checkpoints Authority (ICA) requires a passport photo of 35 mm width by 45 mm height (3.5 × 4.5 cm). For MyICA e-Service uploads, resize the image to exactly 413 × 531 pixels at 300 DPI and save it as a JPEG with a plain white background.",
  },
  {
    q: "Can I resize my photo to passport size using just my phone?",
    a: "Yes. Take a well-lit, forward-facing photo from about 1.5 to 2 metres away, ideally with someone else holding the camera to avoid selfie distortion. Upload it here and the tool handles the resize, crop, and background whitening for you, no editing software needed.",
  },
  {
    q: "Why does ICA require 413 × 531 pixels specifically?",
    a: "413 × 531 pixels is the 35 × 45 mm physical passport size converted to digital pixels at 300 DPI, preserving the exact 7:9 aspect ratio. ICA's upload system checks these precise dimensions to prevent distortion when the photo is printed into the passport booklet.",
  },
  {
    q: "What background color is required when I resize the photo?",
    a: "ICA requires a plain, even, pure white (#FFFFFF) background with no shadows, patterns, or off-white tones. Shadowed or cream-colored backdrops are one of the most common reasons resized photos get rejected, so our tool replaces the background automatically during the resize step.",
  },
  {
    q: "Can I use the same resized photo for NRIC, visas, or work passes?",
    a: "Yes. Singapore NRIC, e-Visa (SAVE), Long-Term Visit Pass, Student's Pass, and MOM Employment Pass (EP/S Pass) all share the same 35 × 45 mm / 413 × 531 px white-background standard, so one correctly resized photo covers every one of these applications.",
  },
  {
    q: "What file format and size should the resized photo be?",
    a: "Save the resized photo as a JPEG (JPG) under 2 MB, ideally between 150 KB and 500 KB for faster upload. Our tool compresses the final file automatically so it meets MyICA's upload limit without losing sharpness.",
  },
  {
    q: "Is resizing my photo on this tool free?",
    a: "Yes, uploading your photo, previewing the resized 413 × 531 px result, and checking ICA compliance is completely free. You only pay if you choose to download the final watermark-free file and the printable 4×6 inch sheet.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Resize Passport Photo Singapore Tool",
    url: "https://www.pixpassport.com/resize-passport-photo-singapore",
    description:
      "Online tool to resize, convert, and crop any photo to Singapore passport size — 35x45mm (413x531 px) — for MyICA, NRIC, and visa applications.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web, iOS, Android, macOS, Windows",
    image: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_visa_photo_example_whvfqt.jpg",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "17450",
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "Offer",
      price: "6.99",
      priceCurrency: "SGD",
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Resize Passport Photo Singapore Online (413x531 px / 35x45mm)",
    url: "https://www.pixpassport.com/resize-passport-photo-singapore",
    description:
      "Guide and automated resizer for converting any photo to the official Singapore ICA passport photo size.",
    citation: [
      "https://www.ica.gov.sg/passports/passport/apply",
      "https://www.ica.gov.sg/photo-guidelines",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Resize a Photo to Passport Size for Singapore",
    description:
      "Step-by-step instructions to resize, crop, and convert any photo into a compliant 35x45mm (413x531 px) Singapore passport photo.",
    totalTime: "PT1M",
    supply: [
      {
        "@type": "HowToSupply",
        name: "Digital photograph or smartphone portrait",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "PixPassport Singapore Photo Resizer",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Take a Frontal Portrait Photo",
        text: "Stand 1.5 to 2 metres away facing natural light with a neutral expression and dark clothing.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Upload to the Resizer",
        text: "Upload your JPG, PNG, or HEIC photo to the Singapore passport photo resizer.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Automatic Crop & Resize",
        text: "The tool crops to the 35:45 ratio, resizes to 413x531 pixels, and whitens the background.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Download for MyICA or Print",
        text: "Download the compliant JPEG for online submission or the 4x6-inch print template.",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
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
        name: "Resize Passport Photo Singapore",
        item: "https://www.pixpassport.com/resize-passport-photo-singapore",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PixPassport",
    url: "https://www.pixpassport.com/",
    logo: "https://www.pixpassport.com/logo.png",
  },
];

export default function ResizePassportPhotoSingaporePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      {/* ── Breadcrumb Strip ── */}
      <div className="border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3 bg-slate-50">
        <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto">
          <ol className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500 font-medium">
            <li>
              <Link href="/" className="hover:text-emerald-700 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300">
              /
            </li>
            <li className="text-slate-900 font-semibold" aria-current="page">
              Resize Passport Photo Singapore
            </li>
          </ol>
        </nav>
      </div>

      {/* ── HERO ── */}
      <SingaporeHero
        badgeText="Resize to Exact ICA Size · 413 × 531 px (35 × 45 mm)"
        h1="Resize Passport Photo Singapore Online in 30 Seconds"
        subtitle="Convert or crop any photo to the exact Singapore passport photo size — no editing skills needed."
        description="Upload any photo and resize it to the exact 35 × 45 mm (413 × 531 px) size ICA requires for MyICA. The tool crops your face, whitens the background to pure white, and checks the 70%–80% head-ratio rule for you."
        primaryCtaText="Resize My Photo Now →"
        primaryCtaHref="/passport-photo-online?type=singapore-passport"
        secondaryCtaText="See Size Requirements"
        secondaryCtaHref="#specifications"
        imageAltAfter="Resized Singapore passport photo 413x531 px with pure white background"
        imageAltBefore="Selfie portrait before resizing to Singapore passport size"
      />

      {/* ── DIRECT ANSWER ── */}
      <section className="bg-white py-10 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2">
              Quick Answer: How to Resize a Passport Photo in Singapore
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              To resize a passport photo for Singapore, crop the image to a 35 × 45 mm ratio and export it at
              413 × 531 pixels — the exact digital size ICA requires for MyICA e-Service. Position your face so
              it fills 70% to 80% of the frame height, replace the background with pure white, and save the
              file as a JPEG under 2 MB. PixPassport automates every one of these steps: upload your photo, let
              the tool crop, resize, and whiten it, then download a file that is ready to submit.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4-STEP HOW IT WORKS SECTION ── */}
      <section className="bg-slate-50 py-12 lg:py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              Simple 4-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How to Resize a Photo to Passport Size in Singapore
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              From any smartphone photo to an ICA-approved biometric photo in under a minute.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-400 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl">{step.icon}</span>
                    <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/passport-photo-online?type=singapore-passport"
              className="inline-flex items-center justify-center bg-lime-700 hover:bg-lime-800 text-white text-sm font-bold px-7 py-3.5 rounded-xl transition-colors"
            >
              Start Resizing Now →
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY 413x531 SECTION ── */}
      <section className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
            Why Resize to 413 × 531 Pixels?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-3">
            Singapore&apos;s physical passport photo measures 35 mm by 45 mm. When you convert that measurement
            to a digital file at 300 DPI (the print resolution ICA uses), it comes out to exactly 413 × 531
            pixels. Resizing to any other pixel count keeps the file usable on screen, but it distorts the 7:9
            ratio once printed, which is why MyICA rejects photos that don&apos;t match this size precisely.
          </p>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            This is also why simple phone-gallery cropping tools fall short: they let you cut a photo to a
            rough square or rectangle, but they don&apos;t lock the 35:45 ratio or export at 300 DPI. Our
            resizer sets both automatically, so the pixel count and the physical print size always match.
          </p>
        </div>
      </section>

      {/* ── TECHNICAL SPECIFICATION MATRIX ── */}
      <section id="specifications" className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              Official Biometric Guidelines
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Singapore Passport Photo Resize Requirements (2026)
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Every photo uploaded to MyICA must be resized to match these exact parameters:
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 mb-8 bg-white">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-4 font-bold">Requirement</th>
                  <th className="p-4 font-bold">Official ICA Specification</th>
                  <th className="p-4 font-bold">PixPassport Auto-Check</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Physical Dimensions</td>
                  <td className="p-4 text-slate-600">35 mm (width) × 45 mm (height) / 3.5 × 4.5 cm</td>
                  <td className="p-4 text-emerald-700 font-medium">✓ Calibrated for 4×6&quot; sheet</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4 font-semibold text-slate-900">Digital Resize Dimensions</td>
                  <td className="p-4 text-slate-600">413 × 531 pixels (minimum 400 × 514 px)</td>
                  <td className="p-4 text-emerald-700 font-medium">✓ Exactly 413 × 531 px (JPEG)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Aspect Ratio</td>
                  <td className="p-4 text-slate-600">35:45 (7:9 portrait ratio)</td>
                  <td className="p-4 text-emerald-700 font-medium">✓ Locked 7:9 ratio</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4 font-semibold text-slate-900">Face Height (Chin to Crown)</td>
                  <td className="p-4 text-slate-600">25 mm to 35 mm (70% to 80% of total height)</td>
                  <td className="p-4 text-emerald-700 font-medium">✓ Biometrically centered (75%)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Top Clearance Margin</td>
                  <td className="p-4 text-slate-600">3 mm to 5 mm space above head</td>
                  <td className="p-4 text-emerald-700 font-medium">✓ 4 mm top clearance applied</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4 font-semibold text-slate-900">Background Tone</td>
                  <td className="p-4 text-slate-600">Plain white (#FFFFFF), shadowless, matte finish</td>
                  <td className="p-4 text-emerald-700 font-medium">✓ AI shadow removal &amp; pure white</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Digital File Size</td>
                  <td className="p-4 text-slate-600">Max 2 MB (optimal 150 KB to 500 KB)</td>
                  <td className="p-4 text-emerald-700 font-medium">✓ Compressed under 300 KB</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4 font-semibold text-slate-900">Photo Recency</td>
                  <td className="p-4 text-slate-600">Must be taken within the last 3 months</td>
                  <td className="p-4 text-emerald-700 font-medium">✓ Fresh photo formatted instantly</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CROP GUIDE SECTION ── */}
      <section className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              Precision Cropping
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How to Crop a Passport Photo for Singapore
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Cropping to passport size is more than cutting out a face. Follow these four checks:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {cropSteps.map((step, i) => (
              <div key={step.title} className="p-5 rounded-2xl border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {i + 1}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm">{step.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUPPORTED DOCUMENTS GRID ── */}
      <section className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              Government Documents
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Convert to Passport Size Photo for These Singapore Documents
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              One resized photo — 35 × 45 mm / 413 × 531 px — covers every one of these applications:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Link
              href="/singapore-passport-photo"
              className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-400 transition-colors group block"
            >
              <div className="text-2xl mb-2">🇸🇬</div>
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-emerald-700 transition-colors">
                Singapore Passport
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                ICA e-Service online renewals, first-time applications, and overseas embassy collections.
              </p>
            </Link>
            <Link
              href="/singapore-ica-photo"
              className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-400 transition-colors group block"
            >
              <div className="text-2xl mb-2">🪪</div>
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-emerald-700 transition-colors">
                Singapore NRIC (Identity Card)
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Pink and Blue IC card registrations at age 15, and 30/55 re-registration at ICA Building.
              </p>
            </Link>
            <Link
              href="/singapore-visa-photo-editor"
              className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-400 transition-colors group block"
            >
              <div className="text-2xl mb-2">🛂</div>
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-emerald-700 transition-colors">
                Singapore e-Visa (SAVE)
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Electronic tourist, business, and social visit visa applications on the ICA SAVE portal.
              </p>
            </Link>
            <div className="p-5 rounded-2xl border border-slate-200 bg-white">
              <div className="text-2xl mb-2">💼</div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">MOM Work Passes (EP / S Pass)</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Ministry of Manpower Employment Pass, S Pass, Work Permit, and Dependant&apos;s Pass (DP).
              </p>
            </div>
            <Link
              href="/singapore-ica-photo"
              className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-400 transition-colors group block"
            >
              <div className="text-2xl mb-2">🏛️</div>
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-emerald-700 transition-colors">
                Permanent Residence (e-PR)
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                ICA electronic Permanent Residency application documents and biometric profile submission.
              </p>
            </Link>
            <Link
              href="/singapore-ica-photo"
              className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-400 transition-colors group block"
            >
              <div className="text-2xl mb-2">🎓</div>
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-emerald-700 transition-colors">
                Student&apos;s Pass &amp; LTVP
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                International student passes and Long-Term Visit Pass applications via ICA e-Service.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── DO'S AND DON'TS SECTION ── */}
      <section className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              Checklist for 100% Approval
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Before You Resize: Do&apos;s and Don&apos;ts
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Avoid the most common rejection triggers before you upload your resized photo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  ✓
                </span>
                <h3 className="text-base font-bold text-emerald-950">DO: Recommended Guidelines</h3>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>
                    <strong>Look straight into camera:</strong> Keep eyes open and level, showing both ears.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>
                    <strong>Neutral expression:</strong> Keep your mouth closed naturally without smiling.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>
                    <strong>Dark clothing:</strong> Wear dark tops that contrast against the white background.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>
                    <strong>Clear facial outline:</strong> Keep hair off your eyes, eyebrows, and cheeks.
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xs">
                  ✗
                </span>
                <h3 className="text-base font-bold text-rose-950">DON&apos;T: Common Rejection Pitfalls</h3>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>
                    <strong>No white shirts:</strong> White clothing blends into the backdrop and gets rejected.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>
                    <strong>No colored contact lenses:</strong> Iris-altering lenses are banned by ICA.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>
                    <strong>No beauty filters:</strong> Avoid skin-smoothing and face-altering filters.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>
                    <strong>No photos older than 3 months:</strong> They must reflect your current appearance.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              Have Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Everything you need to know about resizing, converting, and cropping your Singapore photo.
            </p>
          </div>

          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* ── RELATED SINGAPORE TOOLS & GUIDES ── */}
      <SingaporeRelatedLinks currentPath="/resize-passport-photo-singapore" />

      {/* ── BOTTOM PROMINENT CTA BANNER ── */}
      <section className="bg-slate-900 text-white py-16 lg:py-20 border-t-4 border-emerald-500">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/30">
            🇸🇬 100% ICA Biometric Acceptance Guarantee
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 max-w-2xl mx-auto">
            Resize Your Singapore Passport Photo in 30 Seconds
          </h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto mb-8">
            Upload any photo, get instant background whitening, and download a 413 × 531 px file ready for
            MyICA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/passport-photo-online?type=singapore-passport"
              className="inline-flex items-center justify-center bg-lime-600 hover:bg-lime-500 text-white text-base font-bold px-8 py-4 rounded-xl transition-colors active:scale-95"
            >
              Resize Singapore Photo Now →
            </Link>
            <Link
              href="/singapore-passport-photo-editor"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold px-6 py-4 rounded-xl transition-colors"
            >
              Singapore Photo Editor
            </Link>
          </div>
          <p className="text-xs text-slate-400 mt-5">
            Free to preview · Download digital &amp; 4×6&quot; print sheet
          </p>
        </div>
      </section>
    </>
  );
}