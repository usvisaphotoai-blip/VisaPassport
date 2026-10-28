import type { Metadata, Viewport } from "next";
import Link from "next/link";
import SingaporeHero from "@/app/components/SingaporeHero";
import FaqAccordion from "@/app/components/FaqAccordion";
import SingaporeRelatedLinks from "@/app/components/SingaporeRelatedLinks";
import SingaporeBreadcrumb from "@/app/components/SingaporeBreadcrumb";
import {
  ICA_FACTS,
  ICA_SOURCES,
  SG_OG_IMAGE,
  SG_TOOL_HREF,
  buildSingaporeJsonLd,
  toJsonLd,
} from "@/lib/singapore-photo";

/*
 * KEYWORD MAP
 * Primary:   passport photo singapore
 * Secondary: passport picture singapore · singapore visa photo size · sg passport photo size
 *            · singapore ic photo · take passport photo singapore
 *
 * Intent: TOOL-FIRST. The visitor wants to make a compliant photo now.
 * Heading logic: H1 = primary keyword + action. Each H2 owns one secondary keyword.
 * H3 = items inside an H2. H4 = sub-tips inside an H3.
 *
 * NOTE: this page now targets the broad "passport photo singapore" term. Keep
 * /singapore-ica-photo focused on rules (background, pose, glasses) and link to it
 * from here so the two pages do not compete for the same query.
 * If you want the cleanest setup, move this page to /passport-photo-singapore and
 * 301 the old URL to it. Only PAGE_URL below needs to change.
 */
const PAGE_URL = "https://www.pixpassport.com/resize-passport-photo-singapore";
const TITLE = "Passport Photo Singapore – Make ICA Size Photo Online (400×514 px)";
const DESCRIPTION =
  "Make a Singapore passport photo online: 35×45 mm, 400×514 px, under 8 MB. Upload, preview free, and download an ICA-ready passport picture plus 4×6 print sheet.";
const DATE_MODIFIED = "2026-10-27";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "passport photo singapore",
    "passport picture singapore",
    "singapore visa photo size",
    "sg passport photo size",
    "singapore ic photo",
    "take passport photo singapore",
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "en-SG": PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Passport Photo Singapore – ICA Size, Made Online",
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "PixPassport",
    locale: "en_SG",
    type: "website",
    images: [{ ...SG_OG_IMAGE, alt: "Singapore passport photo at ICA size, 35×45 mm" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Passport Photo Singapore – ICA Size, Made Online",
    description: DESCRIPTION,
    images: [SG_OG_IMAGE.url],
  },
};

/* ───────────── Content ───────────── */

const jumpLinks = [
  { href: "#how-it-works", label: "Make your photo" },
  { href: "#sg-passport-photo-size", label: "Photo size" },
  { href: "#visa-and-ic-photo", label: "Visa & IC photo" },
  { href: "#take-passport-photo", label: "Take it yourself" },
  { href: "#rejections", label: "Avoid rejection" },
  { href: "#faq", label: "FAQ" },
];

const specCards = [
  { label: "Upload size", value: "400 × 514 px", note: "ICA e-Service" },
  { label: "Print size", value: "35 × 45 mm", note: "Passport photo" },
  { label: "File limit", value: ICA_FACTS.maxFileSize, note: "Per photo" },
  { label: "Shape", value: "35:45 (7:9)", note: "Portrait" },
];

const steps = [
  {
    title: "Upload a clear photo",
    desc: "Use a sharp original from your camera roll. Avoid screenshots and photos forwarded through chat apps.",
    icon: "📸",
  },
  {
    title: "Auto-crop to Singapore size",
    desc: "The tool centres your head and shoulders in the 35:45 passport shape, so nothing is stretched.",
    icon: "✂️",
  },
  {
    title: "Preview for free",
    desc: "Check the framing before you pay. Your whole head and the top of your shoulders should be in view.",
    icon: "👀",
  },
  {
    title: "Download and submit",
    desc: `Get a JPEG well under ICA's ${ICA_FACTS.maxFileSize} limit, plus a 4×6 inch sheet to print.`,
    icon: "⬇️",
  },
];

const takeTips = [
  {
    title: "Lighting",
    desc: "Face a window in daylight so light falls evenly on your face. Avoid lamps from the side, which cast shadows.",
  },
  {
    title: "Background",
    desc: "Stand a short distance in front of a plain white wall or sheet, so no shadow lands behind you.",
  },
  {
    title: "Camera position",
    desc: "Hold the phone at eye level, about an arm's length away. Ask someone to take it, as selfies distort faces.",
  },
  {
    title: "Pose",
    desc: "Look straight at the lens with a neutral expression and your mouth closed. Keep your head level.",
  },
];

const rejectionReasons = [
  { title: "Screenshots", desc: "A screenshot loses detail and often adds a border or status bar." },
  { title: "Chat-app copies", desc: "Messaging apps compress photos. Use the original file from your camera roll." },
  { title: "Beauty filters", desc: "ICA does not allow altered or enhanced photos, so never smooth skin or reshape your face." },
  { title: "Stretched images", desc: "Forcing a landscape photo into 400 × 514 px without cropping distorts your face." },
  { title: "Upscaled low-res photos", desc: "Enlarging a small image makes it blurry. Start from a photo larger than 400 × 514 px." },
  { title: "Wrong shape", desc: "Any ratio other than 35:45 changes the proportions of your face when resized." },
];

const faqGroups = [
  {
    heading: "Singapore passport photo size and format",
    faqs: [
      {
        q: "What is the Singapore passport photo size?",
        a: `The printed photo is 35 × 45 mm. For uploads through ICA's e-Service, ICA recommends ${ICA_FACTS.uploadPx}. The file can be ${ICA_FACTS.fileTypes}, up to ${ICA_FACTS.maxFileSize}.`,
      },
      {
        q: "What is the SG passport photo size in pixels?",
        a: "Use 400 × 514 px for ICA uploads. You will also see 413 × 531 px, which is 35 × 45 mm at 300 DPI for printing. Both share the same 7:9 shape, so a photo cropped correctly for one fits the other.",
      },
      {
        q: "Can I upload a HEIC photo from my iPhone?",
        a: "Yes. ICA accepts JPG, JPEG, HEIC, HEIF and PNG files for e-Service uploads. Converting to JPG is still useful if another form only accepts JPG.",
      },
      {
        q: "My photo file is too large. How do I make it smaller?",
        a: "ICA accepts files up to 8 MB. Scaling the photo to 400 × 514 px brings almost any photo well under that limit without visible loss of quality.",
      },
    ],
  },
  {
    heading: "Making and taking your photo",
    faqs: [
      {
        q: "How do I make a passport photo online in Singapore?",
        a: "Upload a clear photo, let the tool crop it to the 35:45 shape and scale it to 400 × 514 px, preview it for free, then download the digital file and a 4×6 inch print sheet.",
      },
      {
        q: "Can I take my own passport picture in Singapore with a phone?",
        a: "Yes, as long as it meets ICA's photo guidelines. Use even daylight, a plain white background and a neutral expression, then crop and resize it with the tool. Don't retouch it.",
      },
      {
        q: "Is it OK to edit my passport picture while resizing it?",
        a: "Only crop and resize. ICA states that photos must not be altered or enhanced, so skip filters, retouching and skin smoothing.",
      },
      {
        q: "Will resizing make my photo blurry?",
        a: "Not if you start from a larger original. Scaling down keeps the photo sharp. Scaling a small or heavily compressed image up is what causes blur.",
      },
    ],
  },
  {
    heading: "Visa and identity card photos",
    faqs: [
      {
        q: "What is the Singapore visa photo size?",
        a: "Singapore visa applications generally ask for a passport-style photo, and ICA's passport specification is 35 × 45 mm or 400 × 514 px for uploads. Requirements can differ by application, so check the instructions on your specific form or ask your sponsor.",
      },
      {
        q: "Can I use this for a Singapore IC photo?",
        a: "A Singapore IC photo is submitted to ICA, so start from the same 35:45 shape and plain white background. Photo rules can vary by service, so confirm on the ICA page for your application before you upload.",
      },
    ],
  },
];

const allFaqs = faqGroups.flatMap((g) => g.faqs);

const jsonLd = buildSingaporeJsonLd({
  url: PAGE_URL,
  name: TITLE,
  description: DESCRIPTION,
  dateModified: DATE_MODIFIED,
  crumbs: [{ name: "Passport Photo Singapore", url: PAGE_URL }],
  faqs: allFaqs,
  includeTool: true,
});

/* ───────────── Page ───────────── */

export default function PassportPhotoSingaporePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(jsonLd) }} />

      <SingaporeBreadcrumb trail={[{ label: "Passport Photo Singapore" }]} />

      {/* ── HERO (H1) ── */}
      <SingaporeHero
        badgeText="ICA size · 35×45 mm · 400×514 px · Under 8 MB"
        h1="Passport Photo Singapore: Make an ICA-Size Photo Online"
        subtitle="Turn any phone photo into a Singapore passport picture in under a minute. No editing app needed."
        description="Upload a photo and the tool crops it around your face, keeps the correct 35:45 shape, and gives you a digital file plus a 4×6 inch print sheet. Preview is free."
        primaryCtaText="Make My Passport Photo →"
        primaryCtaHref={SG_TOOL_HREF}
        secondaryCtaText="See Photo Size"
        secondaryCtaHref="#sg-passport-photo-size"
        imageAltAfter="Singapore passport photo cropped to 35x45 mm ICA size"
        imageAltBefore="Original phone photo before conversion to a Singapore passport picture"
      />

      {/* ── QUICK ANSWER + SPEC CARDS ── */}
      <section aria-labelledby="quick-answer" className="bg-white py-10 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="quick-answer" className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3">
            Singapore Passport Photo Requirements at a Glance
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-3xl mb-6">
            A Singapore passport photo is <strong>35 × 45 mm</strong> when printed and{" "}
            <strong>{ICA_FACTS.uploadPx}</strong> when uploaded to ICA. Save it as {ICA_FACTS.fileTypes} under{" "}
            {ICA_FACTS.maxFileSize}, with a plain background and no retouching.
          </p>

          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {specCards.map((c) => (
              <div key={c.label} className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 sm:p-5">
                <dt className="text-xs font-semibold text-emerald-800">{c.label}</dt>
                <dd className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{c.value}</dd>
                <dd className="text-xs text-slate-600 mt-0.5">{c.note}</dd>
              </div>
            ))}
          </dl>

          <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">
            {jumpLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 px-3.5 py-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* ── HOW IT WORKS (tool intent) ── */}
      <section id="how-it-works" aria-labelledby="how-heading" className="bg-slate-50 py-12 lg:py-16 border-b border-slate-200 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <h2 id="how-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How to Make a Passport Photo in Singapore Online
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Four steps from phone photo to a file ready for ICA&apos;s e-Service.
            </p>
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 list-none p-0">
            {steps.map((step, i) => (
              <li key={step.title} className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl" aria-hidden="true">{step.icon}</span>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10">
            <Link
              href={SG_TOOL_HREF}
              className="inline-flex items-center justify-center bg-lime-700 hover:bg-lime-800 text-white text-sm font-bold px-7 py-3.5 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-lime-700"
            >
              Start My Singapore Passport Photo →
            </Link>
            <p className="text-xs text-slate-500 mt-3">Free preview. Pay only when you download.</p>
          </div>
        </div>
      </section>

      {/* ── SG PASSPORT PHOTO SIZE ── */}
      <section id="sg-passport-photo-size" aria-labelledby="size-heading" className="py-12 lg:py-16 bg-white border-b border-slate-200 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="size-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
            SG Passport Photo Size: Millimetres and Pixels
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
            The Singapore passport picture has one shape, 35:45, but two common sizes depending on whether you are
            printing it or uploading it.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50">
              <h3 className="font-bold text-slate-900 text-base mb-2">Digital upload size</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Use <strong>400 × 514 px</strong>. This is the size ICA recommends for photos uploaded through its
                e-Services.
              </p>
            </div>
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50">
              <h3 className="font-bold text-slate-900 text-base mb-2">Printed photo size</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Use <strong>35 × 45 mm</strong>, which is <strong>413 × 531 px</strong> at 300 DPI. Print it on{" "}
                {ICA_FACTS.printFinish}.
              </p>
            </div>
          </div>

          <h3 className="font-bold text-slate-900 text-base mb-3">Singapore passport photo specifications</h3>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Singapore passport photo file specifications</caption>
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th scope="col" className="p-4 font-bold">Setting</th>
                  <th scope="col" className="p-4 font-bold">What to use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <th scope="row" className="p-4 font-semibold text-slate-900">Pixel size (ICA e-Service)</th>
                  <td className="p-4 text-slate-600">{ICA_FACTS.uploadPx}</td>
                </tr>
                <tr className="bg-slate-50">
                  <th scope="row" className="p-4 font-semibold text-slate-900">Print size</th>
                  <td className="p-4 text-slate-600">35 × 45 mm on {ICA_FACTS.printFinish}</td>
                </tr>
                <tr>
                  <th scope="row" className="p-4 font-semibold text-slate-900">Shape</th>
                  <td className="p-4 text-slate-600">35:45 (7:9) portrait</td>
                </tr>
                <tr className="bg-slate-50">
                  <th scope="row" className="p-4 font-semibold text-slate-900">File type</th>
                  <td className="p-4 text-slate-600">{ICA_FACTS.fileTypes}</td>
                </tr>
                <tr>
                  <th scope="row" className="p-4 font-semibold text-slate-900">Maximum file size</th>
                  <td className="p-4 text-slate-600">{ICA_FACTS.maxFileSize}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Source:{" "}
            <a href={ICA_SOURCES.photoGuidelines} target="_blank" rel="noopener noreferrer" className="underline">
              ICA photo guidelines
            </a>
            . For background, pose and lighting rules, read our{" "}
            <Link href="/singapore-ica-photo" className="text-emerald-700 font-semibold underline">
              ICA photo requirements guide
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── VISA + IC PHOTO ── */}
      <section id="visa-and-ic-photo" aria-labelledby="visa-heading" className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="visa-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Singapore Visa Photo Size and IC Photo
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mb-8 max-w-3xl">
            Both are submitted to ICA, so the passport specification is the safest place to start.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="p-6 rounded-2xl border border-slate-200 bg-white">
              <h3 className="font-bold text-slate-900 text-base mb-2">Singapore visa photo size</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Start with a 35 × 45 mm passport-style photo (400 × 514 px digital) on a plain white background.
                Visa requirements can vary by application, so check your form or ask your sponsor before you
                submit.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-slate-200 bg-white">
              <h3 className="font-bold text-slate-900 text-base mb-2">Singapore IC photo</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Use the same 35:45 shape and a plain white background, with no filters. Confirm the exact photo
                rules for your service on the{" "}
                <a href={ICA_SOURCES.photoGuidelines} target="_blank" rel="noopener noreferrer" className="underline text-emerald-700 font-semibold">
                  ICA website
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TAKE A PASSPORT PHOTO ── */}
      <section id="take-passport-photo" aria-labelledby="take-heading" className="py-12 lg:py-16 bg-white border-b border-slate-200 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="take-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            How to Take a Passport Photo in Singapore at Home
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mb-8 max-w-3xl">
            You don&apos;t need a studio. A phone, a window and a plain wall are enough. Take the photo, then let the
            tool handle the crop and size.
          </p>

          <h3 className="text-lg font-bold text-slate-900 mb-4">Four things to get right before you shoot</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {takeTips.map((t) => (
              <div key={t.title} className="p-5 rounded-2xl border border-slate-200 bg-slate-50">
                <h4 className="font-bold text-slate-900 text-sm mb-1">{t.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REJECTION REASONS ── */}
      <section id="rejections" aria-labelledby="reject-heading" className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="reject-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-8">
            Common Mistakes That Get a Singapore Passport Picture Rejected
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rejectionReasons.map((m) => (
              <div key={m.title} className="p-5 rounded-2xl border border-rose-200 bg-rose-50/50">
                <h3 className="font-bold text-slate-900 text-sm mb-1">{m.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" aria-labelledby="faq-heading" className="py-12 lg:py-16 bg-white border-b border-slate-200 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="faq-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-8">
            Passport Photo Singapore FAQs
          </h2>
          <div className="space-y-10">
            {faqGroups.map((group) => (
              <div key={group.heading}>
                <h3 className="text-lg font-bold text-slate-900 mb-4">{group.heading}</h3>
                <FaqAccordion faqs={group.faqs} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED ── */}
      <SingaporeRelatedLinks currentPath="/resize-passport-photo-singapore" />

      {/* ── BOTTOM CTA ── */}
      <section aria-labelledby="cta-heading" className="bg-slate-900 text-white py-16 lg:py-20 border-t-4 border-emerald-500">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/refund-policy"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 mb-4"
          >
            🇸🇬 Money-back guarantee if your photo is rejected
          </Link>
          <h2 id="cta-heading" className="text-3xl sm:text-4xl font-black tracking-tight mb-4 max-w-2xl mx-auto">
            Get Your Singapore Passport Photo Ready in Minutes
          </h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto mb-8">
            Upload any photo, preview the crop for free, and download your ICA-size file when it looks right.
          </p>
          <Link
            href={SG_TOOL_HREF}
            className="inline-flex items-center justify-center bg-lime-600 hover:bg-lime-500 text-white text-base font-bold px-8 py-4 rounded-xl transition-colors active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-lime-400 focus-visible:ring-offset-slate-900"
          >
            Make My Passport Photo →
          </Link>
          <p className="text-xs text-slate-400 mt-5">
            Free to preview · Digital file &amp; 4×6&quot; print sheet included
          </p>
        </div>
      </section>

      {/* ── MOBILE STICKY CTA ── */}
      <div className="h-16 sm:hidden" aria-hidden="true" />
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 px-4 py-3">
        <Link
          href={SG_TOOL_HREF}
          className="flex items-center justify-center bg-lime-700 text-white text-sm font-bold py-3 rounded-xl"
        >
          Make My Passport Photo →
        </Link>
      </div>
    </>
  );
}