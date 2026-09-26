import type { Metadata, Viewport } from "next";
import Link from "next/link";
import SingaporeHero from "@/app/components/SingaporeHero";
import FaqAccordion from "@/app/components/FaqAccordion";
import SingaporeRelatedLinks from "@/app/components/SingaporeRelatedLinks";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Singapore ICA Passport Photo Online – Requirements & Maker (413x531 px)",
  description:
    "Official Singapore ICA passport photo requirements and online maker. Format 35x45mm (413x531 px) photos on pure white background for MyICA, NRIC & e-Visas.",
  keywords: [
    "singapore ica passport photo",
    "ica singapore passport photo",
    "ica photo requirements singapore",
    "ica photo singapore",
    "ica gov sg passport photo",
    "ica singapore passport photo app",
    "ica singapore passport photo editor",
    "passport photo singapore ica",
    "myica photo upload requirements",
    "singapore passport photo ica",
    "singapore ica photo size",
    "ica photo guidelines 2026",
  ],
  alternates: {
    canonical: "https://www.pixpassport.com/singapore-ica-photo",
    languages: {
      en: "https://www.pixpassport.com/singapore-ica-photo",
      "x-default": "https://www.pixpassport.com/singapore-ica-photo",
    },
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Singapore ICA Passport Photo Online – Requirements & Maker",
    description:
      "Official Singapore ICA passport photo requirements and online maker. Format 35x45mm (413x531 px) photos for MyICA, NRIC, and visas.",
    url: "https://www.pixpassport.com/singapore-ica-photo",
    siteName: "PixPassport",
    locale: "en_SG",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_visa_photo_example_whvfqt.jpg",
        width: 1200,
        height: 630,
        alt: "Singapore ICA Passport Photo Requirements & Maker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Singapore ICA Passport Photo Online – Requirements & Maker",
    description:
      "100% compliant Singapore ICA passport photo editor. 35x45mm (413x531 px) on a pure white background.",
    images: ["https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_visa_photo_example_whvfqt.jpg"],
  },
};

const steps = [
  {
    num: "01",
    title: "Take a Front-Facing Portrait",
    desc: "Capture a clear portrait in natural light with a neutral expression and dark clothing. Any background works at this stage.",
    icon: "📸",
  },
  {
    num: "02",
    title: "Automatic ICA Formatting",
    desc: "The editor removes shadows, whitens the background to pure white (#FFFFFF), and crops to 35 × 45 mm (413 × 531 px).",
    icon: "⚡",
  },
  {
    num: "03",
    title: "ICA Biometric Validation",
    desc: "Checks the 70%–80% chin-to-crown head height (25–35 mm), eye level, and top clearance margin.",
    icon: "🛡️",
  },
  {
    num: "04",
    title: "Instant Download & Print",
    desc: "Download your 413 × 531 px JPEG ready for MyICA e-Service upload, plus a printable 4×6 inch template.",
    icon: "⬇️",
  },
];

const appVsEditor = [
  {
    title: "Use It Like an ICA Photo App",
    desc: "Open it on your phone browser, snap or upload a portrait, and get a ready-to-submit ICA photo in one pass — no installation needed.",
    icon: "📱",
  },
  {
    title: "Use It Like a Photo Editor",
    desc: "Fine-tune brightness, re-crop the frame, or swap in a different portrait before exporting your final 413 × 531 px file.",
    icon: "🖌️",
  },
];

const faqs = [
  {
    q: "What are the official Singapore ICA passport photo requirements?",
    a: "The Immigration & Checkpoints Authority (ICA) requires a color photo measuring 35 mm wide by 45 mm high (3.5 × 4.5 cm). For MyICA uploads, the digital file must be 413 × 531 pixels (minimum 400 × 514 px) at 300 DPI, saved as a JPEG, with a plain white background, 70%–80% face coverage, and taken within the last 3 months.",
  },
  {
    q: "Where can I check the official ica.gov.sg passport photo requirement?",
    a: "ICA publishes its photo specifications on ica.gov.sg under the passport and identity card application guides. Our specification table below mirrors those official figures, so you can check size, background, and head-ratio rules without leaving this page.",
  },
  {
    q: "Is there a Singapore ICA passport photo app?",
    a: "You don't need to install a separate app. PixPassport works as a browser-based Singapore ICA passport photo app — open it on your phone or computer, upload a portrait, and it resizes, whitens, and checks compliance automatically.",
  },
  {
    q: "Can I edit my ICA photo after it's generated?",
    a: "Yes. The built-in ICA singapore passport photo editor lets you re-crop the frame, adjust brightness, or swap in a different portrait before you download the final file, so you don't need a separate design tool.",
  },
  {
    q: "Why did MyICA reject my passport photo?",
    a: "The most common causes are an off-white or shadowed background, hair covering the eyebrows or eyes, a face that's too small or too large for the 25–35 mm chin-to-crown rule, a white top blending into the backdrop, or glare on eyeglasses.",
  },
  {
    q: "Can I wear religious headgear in an ICA passport photo?",
    a: "Yes. Headgear worn for religious or racial customs is accepted, provided it does not obscure any facial features. Your forehead, eyebrows, eyes, nose, mouth, and chin must all stay clearly visible, and the headgear must not cast a shadow on your face.",
  },
  {
    q: "Does ICA allow glasses in passport and identity photos?",
    a: "ICA recommends removing glasses for your photo. If you keep them on, there must be no glare or flash reflection on the lenses, and the frames must not cover any part of your eyes or eyebrows. Tinted glasses and colored contact lenses are not allowed.",
  },
  {
    q: "What is the maximum file size for a MyICA photo upload?",
    a: "MyICA accepts JPEG files up to 2.0 MB. For faster uploads, ICA recommends keeping the file between 150 KB and 500 KB at the standard 413 × 531 pixel size.",
  },
  {
    q: "Which Singapore applications use this ICA photo standard?",
    a: "Every ICA e-Service uses this same standard: Singapore passport renewals, NRIC registration and re-registration at ages 30 and 55, e-PR (Permanent Residence), Student's Pass, Long-Term Visit Pass, and e-Visa applications.",
  },
  {
    q: "How recent must my ICA passport photo be?",
    a: "Your photo must have been taken within the last 3 months so it reflects your current appearance. ICA's facial recognition checks can flag older photos reused from a previous passport or identity card, which delays your application.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Singapore ICA Passport Photo Tool",
    url: "https://www.pixpassport.com/singapore-ica-photo",
    description:
      "Online biometric editor for Singapore ICA passport photo requirements, dimensions (413x531 px / 35x45mm), and background whitening.",
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
    name: "Singapore ICA Passport Photo Online – Requirements & Maker",
    url: "https://www.pixpassport.com/singapore-ica-photo",
    description:
      "Complete requirements guide and automated editor for Singapore Immigration & Checkpoints Authority (ICA) passport and identity photos.",
    citation: [
      "https://www.ica.gov.sg/passports/passport/apply",
      "https://www.ica.gov.sg/photo-guidelines",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Create an Approved ICA Passport Photo Online",
    description:
      "Step-by-step instructions to create, crop, and validate a Singapore ICA passport photo meeting 35x45mm (413x531 px) biometric standards.",
    totalTime: "PT1M",
    supply: [
      {
        "@type": "HowToSupply",
        name: "Front-facing digital portrait",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "PixPassport Singapore ICA Photo Editor",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Take a Front-Facing Portrait",
        text: "Capture a clear portrait in natural light with a neutral expression and dark clothing. Any background works at this stage.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Automatic ICA Formatting",
        text: "The editor removes shadows, whitens the background to pure white (#FFFFFF), and crops to 35 × 45 mm (413 × 531 px).",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "ICA Biometric Validation",
        text: "Checks the 70%–80% chin-to-crown head height (25–35 mm), eye level, and top clearance margin.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Instant Download & Print",
        text: "Download your 413 × 531 px JPEG ready for MyICA e-Service upload, plus a printable 4×6 inch template.",
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
        name: "Singapore ICA Passport Photo",
        item: "https://www.pixpassport.com/singapore-ica-photo",
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

export default function SingaporeIcaPhotoPage() {
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
              Singapore ICA Passport Photo
            </li>
          </ol>
        </nav>
      </div>

      {/* ── HERO ── */}
      <SingaporeHero
        badgeText="🇸🇬 Immigration & Checkpoints Authority · ICA Standard"
        h1="Singapore ICA Passport Photo Online – Requirements & Maker"
        subtitle="Create a 100% compliant ICA passport photo for Singapore in 30 seconds."
        description="Meet every official ICA gov sg passport photo requirement: 35 × 45 mm (413 × 531 px), pure white background, and a 70%–80% chin-to-crown ratio, ready for MyICA e-Service."
        primaryCtaText="Make My ICA Photo →"
        primaryCtaHref="/passport-photo-online?type=singapore-passport"
        secondaryCtaText="View ICA Requirements"
        secondaryCtaHref="#specifications"
        imageAltAfter="ICA compliant Singapore biometric photo 413x531 px on pure white background"
        imageAltBefore="Casual portrait before ICA passport photo formatting"
      />

      {/* ── DIRECT ANSWER ── */}
      <section className="bg-white py-10 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2">
              Quick Answer: What Is the Singapore ICA Passport Photo Requirement?
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              A Singapore ICA passport photo must measure 35 mm by 45 mm and, for MyICA uploads, resize to
              exactly 413 × 531 pixels at 300 DPI. The background must be plain white, your face must fill
              70% to 80% of the frame height, and the photo must be no older than 3 months. PixPassport
              applies every one of these ICA gov sg passport photo rules automatically — upload a portrait
              and download a compliant file in under a minute.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4-STEP HOW IT WORKS ── */}
      <section className="bg-slate-50 py-12 lg:py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              Official ICA Compliance Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How to Create an Approved ICA Passport Photo
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Follow this 4-step method so your photo passes MyICA's biometric facial verification the first time.
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
              Start ICA Photo Maker →
            </Link>
          </div>
        </div>
      </section>

      {/* ── ICA SPECIFICATION MATRIX ── */}
      <section id="specifications" className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              Immigration & Checkpoints Authority Standard
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Singapore ICA Photo Requirements Matrix
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Summary of the official ica.gov.sg digital photograph requirements for 2026:
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 mb-8 bg-white">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-4 font-bold">Parameter</th>
                  <th className="p-4 font-bold">ICA Requirement</th>
                  <th className="p-4 font-bold">PixPassport Guarantee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Physical Size</td>
                  <td className="p-4 text-slate-600">35 mm (W) × 45 mm (H) / 3.5 × 4.5 cm</td>
                  <td className="p-4 text-emerald-700 font-medium">✓ Calibrated 35×45 mm</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4 font-semibold text-slate-900">Digital Resolution</td>
                  <td className="p-4 text-slate-600">413 × 531 pixels (min 400 × 514 px) @ 300 DPI</td>
                  <td className="p-4 text-emerald-700 font-medium">✓ Exact 413 × 531 px</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Background</td>
                  <td className="p-4 text-slate-600">Plain white, even lighting, shadowless</td>
                  <td className="p-4 text-emerald-700 font-medium">✓ Pure white (#FFFFFF)</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4 font-semibold text-slate-900">Head Height</td>
                  <td className="p-4 text-slate-600">25 mm to 35 mm (70%–80% of total height)</td>
                  <td className="p-4 text-emerald-700 font-medium">✓ Biometric centering (75%)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Top Head Margin</td>
                  <td className="p-4 text-slate-600">3 mm to 5 mm crown-to-top clearance</td>
                  <td className="p-4 text-emerald-700 font-medium">✓ 4 mm clearance maintained</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4 font-semibold text-slate-900">File Type &amp; Size</td>
                  <td className="p-4 text-slate-600">JPEG format, up to 2.0 MB</td>
                  <td className="p-4 text-emerald-700 font-medium">✓ Optimized JPEG (~250 KB)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Recency</td>
                  <td className="p-4 text-slate-600">Taken within the last 3 months</td>
                  <td className="p-4 text-emerald-700 font-medium">✓ Instant fresh conversion</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── APP VS EDITOR SECTION ── */}
      <section className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              One Tool, Two Ways to Use It
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              An ICA Passport Photo App and Editor in One
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              No download required — it works as both a quick photo app and a full editor, right in your browser.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {appVsEditor.map((item) => (
              <div key={item.title} className="p-6 rounded-2xl border border-slate-200 bg-white">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-slate-900 text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUPPORTED ICA SERVICES ── */}
      <section className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              MyICA e-Services
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Supported Singapore ICA e-Services &amp; Documents
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Use your compliant ICA passport photo across every Singapore online government application:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Link
              href="/singapore-passport-photo"
              className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-400 transition-colors group block"
            >
              <div className="text-2xl mb-2">🇸🇬</div>
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-emerald-700 transition-colors">
                MyICA Passport Application
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Singapore citizen passport renewals and child passport online submissions via Singpass.
              </p>
            </Link>
            <Link
              href="/resize-passport-photo-singapore"
              className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-400 transition-colors group block"
            >
              <div className="text-2xl mb-2">🪪</div>
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-emerald-700 transition-colors">
                ICA NRIC Registration
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Pink and Blue IC card registrations, age 30 and age 55 NRIC re-registrations.
              </p>
            </Link>
            <Link
              href="/resize-passport-photo-singapore"
              className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-400 transition-colors group block"
            >
              <div className="text-2xl mb-2">🏛️</div>
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-emerald-700 transition-colors">
                ICA e-PR (Permanent Residence)
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Biometric photo attachment for Singapore Permanent Residency online applications.
              </p>
            </Link>
            <Link
              href="/singapore-visa-photo-editor"
              className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-400 transition-colors group block"
            >
              <div className="text-2xl mb-2">🛂</div>
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-emerald-700 transition-colors">
                ICA SAVE Visa Portal
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Entry visa, social visit pass, and business e-Visa applications processed through ICA.
              </p>
            </Link>
            <Link
              href="/passport-photo-online?type=singapore-passport"
              className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-400 transition-colors group block"
            >
              <div className="text-2xl mb-2">🎓</div>
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-emerald-700 transition-colors">
                ICA Student&apos;s Pass (STP)
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Passholder photo for international students in Singapore universities and schools.
              </p>
            </Link>
            <Link
              href="/singapore-passport-photo-editor"
              className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-400 transition-colors group block"
            >
              <div className="text-2xl mb-2">👨‍👩‍👧</div>
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-emerald-700 transition-colors">
                ICA Long-Term Visit Pass
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                LTVP / LTVP+ applications for foreign spouses and dependants of Singapore citizens.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Singapore ICA Passport Photo FAQ
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Official answers to Singapore Immigration &amp; Checkpoints Authority photo questions.
            </p>
          </div>

          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* ── RELATED SINGAPORE TOOLS & GUIDES ── */}
      <SingaporeRelatedLinks currentPath="/singapore-ica-photo" />

      {/* ── BOTTOM CTA ── */}
      <section className="bg-slate-900 text-white py-16 lg:py-20 border-t-4 border-emerald-500">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/30">
            🇸🇬 100% ICA Biometric Approval Guarantee
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 max-w-2xl mx-auto">
            Ready to Create Your Singapore ICA Passport Photo?
          </h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto mb-8">
            Upload any portrait, get instant background whitening, and download your 413 × 531 px ICA photo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/passport-photo-online?type=singapore-passport"
              className="inline-flex items-center justify-center bg-lime-600 hover:bg-lime-500 text-white text-base font-bold px-8 py-4 rounded-xl transition-colors active:scale-95"
            >
              Make ICA Photo Now →
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