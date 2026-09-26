import type { Metadata, Viewport } from "next";
import Link from "next/link";
import SingaporeHero from "@/app/components/SingaporeHero";
import FaqAccordion from "@/app/components/FaqAccordion";
import SingaporeRelatedLinks from "@/app/components/SingaporeRelatedLinks";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Singapore Passport Photo Maker Online (Free Preview) – 413x531 px",
  description:
    "Create a Singapore passport photo online with free preview. Auto-resize to 35x45mm (413x531 px), pure white background, and 100% ICA compliance for MyICA.",
  keywords: [
    "singapore passport photo maker",
    "singapore passport photo online",
    "passport photo maker singapore",
    "passport photo online singapore",
    "passport photo singapore online",
    "singapore passport photo editor",
    "make singapore passport photo online free",
    "passport size photo maker singapore",
    "singapore passport size photo maker",
    "singapore passport photo free preview",
  ],
  alternates: {
    canonical: "https://www.pixpassport.com/singapore-passport-photo",
    languages: {
      en: "https://www.pixpassport.com/singapore-passport-photo",
      "x-default": "https://www.pixpassport.com/singapore-passport-photo",
    },
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Singapore Passport Photo Maker Online (Free Preview)",
    description:
      "Make a 100% compliant Singapore passport photo online. 35x45mm (413x531 px) with a pure white background, ready for MyICA submission.",
    url: "https://www.pixpassport.com/singapore-passport-photo",
    siteName: "PixPassport",
    locale: "en_SG",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_visa_photo_example_whvfqt.jpg",
        width: 1200,
        height: 630,
        alt: "Singapore Passport Photo Maker Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Singapore Passport Photo Maker Online (Free Preview)",
    description:
      "Make a 100% compliant Singapore passport photo online for MyICA renewals and new applications.",
    images: ["https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_visa_photo_example_whvfqt.jpg"],
  },
};

const steps = [
  {
    num: "01",
    title: "Take a Photo at Home",
    desc: "Use your smartphone in good natural lighting. Wear dark clothing and keep a neutral expression.",
    icon: "📱",
  },
  {
    num: "02",
    title: "Upload to the Maker",
    desc: "Our AI detects facial landmarks, removes background clutter, and whitens it to pure white (#FFFFFF).",
    icon: "⚡",
  },
  {
    num: "03",
    title: "ICA Biometric Validation",
    desc: "Automatic checks against the 35 × 45 mm dimensions, 70%–80% face coverage, and eye level alignment.",
    icon: "🛡️",
  },
  {
    num: "04",
    title: "Download for MyICA",
    desc: "Get your high-res digital JPEG for MyICA online renewal, plus a 4×6 inch multi-photo print template.",
    icon: "🖨️",
  },
];

const whyOnline = [
  {
    title: "Skip the Photo Studio",
    desc: "A studio visit costs time and $10–$20 per set. This passport photo maker online works from any photo you already have.",
    icon: "🏪",
  },
  {
    title: "Free to Preview",
    desc: "Upload, crop, and check ICA compliance at no cost. You only pay when you download the final file.",
    icon: "🆓",
  },
  {
    title: "Edit Before You Download",
    desc: "The built-in passport photo editor lets you re-crop, brighten, or swap the portrait before exporting.",
    icon: "🖌️",
  },
];

const faqs = [
  {
    q: "What is the best Singapore passport photo maker online?",
    a: "A good Singapore passport photo maker should resize your photo to exactly 413 × 531 pixels (35 × 45 mm), whiten the background to pure white, and check the ICA head-ratio rule automatically. PixPassport does all three in one upload, so you don't need separate cropping or background-removal tools.",
  },
  {
    q: "Can I make a Singapore passport photo online for free?",
    a: "Yes. You can upload your photo, preview the resized 413 × 531 px result, and check ICA compliance at no cost. You only pay if you choose to download the watermark-free digital file and the printable 4×6 inch sheet.",
  },
  {
    q: "What is the standard Singapore passport photo size?",
    a: "The standard size is 35 mm wide by 45 mm high (3.5 × 4.5 cm). For MyICA online applications, the digital image must measure exactly 413 × 531 pixels at 300 DPI on a plain white background.",
  },
  {
    q: "How much does it cost to make a passport photo in Singapore?",
    a: "Traditional photo studios charge $10 to $20 per set and often bill extra for the digital file. This passport photo maker lets you preview for free and download a compliant digital and print-ready file for a fraction of that cost.",
  },
  {
    q: "Can I take my own passport photo with my phone?",
    a: "Yes. Modern phone cameras are sharp enough. Stand about 1.5 metres from natural window light, keep a neutral expression, and wear a dark top. Upload the photo here and the maker formats it to exact ICA standards.",
  },
  {
    q: "What should I wear for my Singapore passport photo?",
    a: "Wear dark or coloured clothing that contrasts clearly with the pure white background. Avoid white, cream, or pale shirts — they blend into the backdrop and are a common cause of rejection.",
  },
  {
    q: "Is this passport photo editor different from a regular photo app?",
    a: "Yes. A general photo editor lets you crop freely, but it won't lock the 35:45 passport ratio or check ICA's 70%–80% face-height rule. This tool applies the ratio and the compliance checks automatically, so the result is upload-ready.",
  },
  {
    q: "How long does it take to make a Singapore passport photo online?",
    a: "Under 30 seconds. Upload your image, let the tool handle the cropping and background whitening, and download your compliant file straight away.",
  },
  {
    q: "Can I use this maker for NRIC and visa photos too?",
    a: "Yes. Singapore NRIC, e-Visa (SAVE), Long-Term Visit Pass, Student's Pass, and MOM Work Pass applications all use the same 35 × 45 mm / 413 × 531 px white-background standard as the passport photo.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Singapore Passport Photo Maker",
    url: "https://www.pixpassport.com/singapore-passport-photo",
    description:
      "Online Singapore passport photo maker for 35x45mm (413x531 px) biometric photo creation and MyICA compliance verification.",
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
    name: "Singapore Passport Photo Maker Online (Free Preview)",
    url: "https://www.pixpassport.com/singapore-passport-photo",
    description:
      "Complete guide and online maker for Singapore passport photo dimensions, background rules, and ICA compliance.",
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Make a Singapore Passport Photo Online",
    description:
      "Follow these 4 steps to create an official 35x45mm (413x531 px) Singapore passport photo online with pure white background.",
    totalTime: "PT1M",
    supply: [
      {
        "@type": "HowToSupply",
        name: "Frontal smartphone portrait or digital photo",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "PixPassport Singapore Passport Photo Maker",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Take a Photo at Home",
        text: "Use your smartphone in good natural lighting. Wear dark clothing and keep a neutral expression.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Upload to the Maker",
        text: "Our AI detects facial landmarks, removes background clutter, and whitens it to pure white (#FFFFFF).",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "ICA Biometric Validation",
        text: "Automatic checks against the 35 × 45 mm dimensions, 70%–80% face coverage, and eye level alignment.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Download for MyICA",
        text: "Get your high-res digital JPEG for MyICA online renewal, plus a 4×6 inch multi-photo print template.",
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
        name: "Singapore Passport Photo",
        item: "https://www.pixpassport.com/singapore-passport-photo",
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

export default function SingaporePassportPhotoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      {/* ── Breadcrumbs ── */}
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
              Singapore Passport Photo Maker
            </li>
          </ol>
        </nav>
      </div>

      {/* ── HERO ── */}
      <SingaporeHero
        badgeText="🇸🇬 Free to Preview · 413 × 531 px (35 × 45 mm)"
        h1="Singapore Passport Photo Maker Online"
        subtitle="Make a Singapore passport photo online, free to preview, ready for MyICA in 30 seconds."
        description="Upload any photo and this passport photo maker resizes it to 413 × 531 px (35 × 45 mm), replaces the background with pure white, and checks the 70%–80% face-ratio rule for you."
        primaryCtaText="Make My Photo Now →"
        primaryCtaHref="/passport-photo-online?type=singapore-passport"
        secondaryCtaText="View Photo Requirements"
        secondaryCtaHref="#specifications"
        imageAltAfter="Compliant Singapore passport photo 35x45mm with pure white background"
        imageAltBefore="Casual selfie before Singapore passport photo maker conversion"
      />

      {/* ── DIRECT ANSWER ── */}
      <section className="bg-white py-10 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2">
              Quick Answer: How to Make a Singapore Passport Photo Online
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              To make a Singapore passport photo online, upload a portrait, crop it to the 35 × 45 mm ratio,
              and export it at 413 × 531 pixels on a pure white background with your face filling 70% to 80%
              of the frame. PixPassport is a free passport photo maker for the preview step — upload your
              photo, let the tool crop, resize, and whiten it, then download a file ready for MyICA.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4-STEP WORKFLOW ── */}
      <section className="bg-slate-50 py-12 lg:py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              Fast &amp; Simple
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Make Your Singapore Passport Photo in 4 Easy Steps
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Save time and money by making your passport size photo at home without visiting a studio.
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
              Start Singapore Photo Maker →
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY USE AN ONLINE MAKER ── */}
      <section className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              Why Go Online
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Why Use a Passport Photo Maker Instead of a Studio
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              A studio visit works, but an online maker is faster, cheaper, and lets you fix mistakes instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {whyOnline.map((item) => (
              <div key={item.title} className="p-5 rounded-2xl border border-slate-200 bg-slate-50">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPECIFICATIONS TABLE ── */}
      <section id="specifications" className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              Official Requirements
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Singapore Passport Size Photo Checklist
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Everything required by the Singapore Immigration &amp; Checkpoints Authority (ICA):
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 mb-8 bg-white">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-4 font-bold">Specification</th>
                  <th className="p-4 font-bold">Standard Requirement</th>
                  <th className="p-4 font-bold">PixPassport Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Physical Print Size</td>
                  <td className="p-4 text-slate-600">35 × 45 mm (3.5 × 4.5 cm / 1.38 × 1.77 in)</td>
                  <td className="p-4 text-emerald-700 font-medium">✓ Calibrated for 4×6&quot; sheet</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4 font-semibold text-slate-900">Digital Upload Pixels</td>
                  <td className="p-4 text-slate-600">413 × 531 pixels (300 DPI JPEG)</td>
                  <td className="p-4 text-emerald-700 font-medium">✓ Exact 413 × 531 px</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Background Color</td>
                  <td className="p-4 text-slate-600">Plain white with no shadows or patterns</td>
                  <td className="p-4 text-emerald-700 font-medium">✓ Pure white (#FFFFFF)</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4 font-semibold text-slate-900">Head Proportion</td>
                  <td className="p-4 text-slate-600">70% to 80% of photo height (25–35 mm)</td>
                  <td className="p-4 text-emerald-700 font-medium">✓ Biometrically centered (75%)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">File Size</td>
                  <td className="p-4 text-slate-600">Under 2.0 MB (recommended 150–500 KB)</td>
                  <td className="p-4 text-emerald-700 font-medium">✓ Under 300 KB</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4 font-semibold text-slate-900">Photo Recency</td>
                  <td className="p-4 text-slate-600">Taken within the last 3 months</td>
                  <td className="p-4 text-emerald-700 font-medium">✓ Instant fresh conversion</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Singapore Passport Photo Maker FAQs
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Frequently asked questions about making a passport photo online, pricing, and ICA approval.
            </p>
          </div>

          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* ── RELATED SINGAPORE TOOLS & GUIDES ── */}
      <SingaporeRelatedLinks currentPath="/singapore-passport-photo" />

      {/* ── BOTTOM CTA BANNER ── */}
      <section className="bg-slate-900 text-white py-16 lg:py-20 border-t-4 border-emerald-500">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/30">
            🇸🇬 100% ICA Acceptance Guaranteed
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 max-w-2xl mx-auto">
            Make Your Singapore Passport Photo in 30 Seconds
          </h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto mb-8">
            Upload your photo, get instant background whitening, and download your 413 × 531 px Singapore photo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/passport-photo-online?type=singapore-passport"
              className="inline-flex items-center justify-center bg-lime-600 hover:bg-lime-500 text-white text-base font-bold px-8 py-4 rounded-xl transition-colors active:scale-95"
            >
              Make Singapore Photo Now →
            </Link>
            <Link
              href="/resize-passport-photo-singapore"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold px-6 py-4 rounded-xl transition-colors"
            >
              Resize Singapore Photo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}