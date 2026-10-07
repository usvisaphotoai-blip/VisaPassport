import type { Metadata, Viewport } from "next";
import Link from "next/link";
import SingaporeHero from "@/app/components/SingaporeHero";
import FaqAccordion from "@/app/components/FaqAccordion";
import SingaporeRelatedLinks from "@/app/components/SingaporeRelatedLinks";
import SingaporeBreadcrumb from "@/app/components/SingaporeBreadcrumb";
import {
  ICA_FACTS,
  ICA_SOURCES,
  SG_HUB,
  SG_OG_IMAGE,
  SG_TOOL_HREF,
  buildSingaporeJsonLd,
  toJsonLd,
} from "@/lib/singapore-photo";

// Owns: "resize passport photo singapore", "convert photo to passport size singapore",
// "singapore passport photo pixels / 400x514". Technical file intent only: pixels, ratio,
// file size and format. General requirements live on /singapore-ica-photo.
const PAGE_URL = "https://www.pixpassport.com/resize-passport-photo-singapore";
const TITLE = "Resize Passport Photo for Singapore – 400×514 px Online Resizer";
const DESCRIPTION =
  "Resize or crop a photo to Singapore passport size: 400×514 px for ICA's e-Service, the 35:45 shape, and under 8 MB. Free preview, no editing app needed.";
const DATE_MODIFIED = "2026-10-07";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
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
    title: "Resize a Photo to Singapore Passport Size (400×514 px)",
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "PixPassport",
    locale: "en_SG",
    type: "website",
    images: [{ ...SG_OG_IMAGE, alt: "Photo resized to Singapore passport size" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resize a Photo to Singapore Passport Size (400×514 px)",
    description: DESCRIPTION,
    images: [SG_OG_IMAGE.url],
  },
};

const steps = [
  {
    num: "01",
    title: "Upload Your Photo",
    desc: "Use a sharp, full-resolution original, not a screenshot or a photo forwarded through a chat app.",
    icon: "📸",
  },
  {
    num: "02",
    title: "Crop to 35:45",
    desc: "The tool crops around your face to the passport shape, so nothing is stretched or squashed.",
    icon: "✂️",
  },
  {
    num: "03",
    title: "Check the Framing",
    desc: "Preview the crop for free and confirm your whole head and the top of your shoulders are in frame.",
    icon: "🛡️",
  },
  {
    num: "04",
    title: "Download",
    desc: `Get a JPEG well under ICA's ${ICA_FACTS.maxFileSize} limit, plus a 4×6 inch print sheet.`,
    icon: "⬇️",
  },
];

const cropSteps = [
  {
    title: "Keep the 35:45 shape",
    desc: "Width and height must stay in a 35:45 (7:9) ratio. Any other shape stretches or squeezes your face when it is resized.",
  },
  {
    title: "Crop before you resize",
    desc: "Cut the photo to the right shape first, then scale it down. Resizing without cropping distorts the image.",
  },
  {
    title: "Leave space around your head",
    desc: "Keep a little background above your hair and include the top of your shoulders. Don't crop into your chin or hair.",
  },
  {
    title: "Scale down, never up",
    desc: "Start from a photo larger than 400 × 514 px. Enlarging a small image makes it blurry, which can lead to rejection.",
  },
];

const fileMistakes = [
  { title: "Screenshots", desc: "A screenshot of a photo loses detail and often adds a border or status bar." },
  { title: "Chat-app copies", desc: "Photos sent through messaging apps are compressed. Use the original from your camera roll." },
  { title: "Beauty filters", desc: "ICA does not allow altered or enhanced photos, so never smooth skin or reshape your face while resizing." },
  { title: "Stretching to fit", desc: "Forcing a landscape photo into 400 × 514 px without cropping distorts your face." },
];

const faqs = [
  {
    q: "What pixel size should a Singapore passport photo be?",
    a: `For uploads through ICA's e-Service, ICA recommends ${ICA_FACTS.uploadPx}. The file can be ${ICA_FACTS.fileTypes}, up to ${ICA_FACTS.maxFileSize}.`,
  },
  {
    q: "Why do some sites say 413 × 531 pixels instead of 400 × 514?",
    a: "413 × 531 px is simply 35 × 45 mm converted at 300 DPI, the size of a printed passport photo. ICA's own recommendation for e-Service uploads is 400 × 514 px. Both use the same 7:9 shape, so a photo cropped correctly for one fits the other.",
  },
  {
    q: "How do I convert a photo to Singapore passport size?",
    a: "Crop the photo to a 35:45 shape around your head and shoulders, then scale it down to 400 × 514 px. The online resizer does both steps for you and shows a free preview before you download.",
  },
  {
    q: "Do I need to convert my iPhone HEIC photo to JPG first?",
    a: "Not for ICA. ICA accepts JPG, JPEG, HEIC, HEIF and PNG files for e-Service uploads. Converting to JPG is still useful if another form you are filling in only accepts JPG.",
  },
  {
    q: "My photo file is too large. How do I make it smaller?",
    a: "ICA accepts files up to 8 MB. Scaling the photo down to 400 × 514 px brings almost any photo well under that limit without visible loss of quality.",
  },
  {
    q: "Will resizing make my photo blurry?",
    a: "Not if you start from a larger original. Scaling down keeps the photo sharp; scaling a small or heavily compressed image up is what causes blur.",
  },
  {
    q: "Is it OK to edit my photo while resizing it?",
    a: "Only crop and resize. ICA states that photos must not be altered or enhanced, including changing facial features or using photo editing software, so skip filters, retouching and skin smoothing.",
  },
];

const jsonLd = buildSingaporeJsonLd({
  url: PAGE_URL,
  name: TITLE,
  description: DESCRIPTION,
  dateModified: DATE_MODIFIED,
  crumbs: [SG_HUB, { name: "Resize to 400 × 514 px", url: PAGE_URL }],
  faqs,
  includeTool: true,
});

export default function ResizePassportPhotoSingaporePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(jsonLd) }} />

      <SingaporeBreadcrumb
        trail={[
          { label: "Singapore Passport Photo", href: "/singapore-passport-photo" },
          { label: "Resize to 400 × 514 px" },
        ]}
      />

      {/* ── HERO ── */}
      <SingaporeHero
        badgeText="ICA e-Service Size · 400 × 514 px · Under 8 MB"
        h1="Resize Your Photo to Singapore Passport Size"
        subtitle="Crop and resize any photo to the 35:45 passport shape, with no editing app and no guesswork."
        description="Upload a photo and the resizer crops it around your face, keeps the correct 7:9 shape, and gives you a file well inside ICA's 8 MB upload limit."
        primaryCtaText="Resize My Photo Now →"
        primaryCtaHref={SG_TOOL_HREF}
        secondaryCtaText="Which Pixel Size?"
        secondaryCtaHref="#pixel-size"
        imageAltAfter="Photo cropped and resized to Singapore passport size"
        imageAltBefore="Original uncropped photo before resizing to Singapore passport size"
      />

      {/* ── DIRECT ANSWER ── */}
      <section className="bg-white py-10 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2">
              Quick Answer: How to Resize a Passport Photo for Singapore
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Crop the photo to a 35:45 shape around your head and shoulders, then scale it down to{" "}
              {ICA_FACTS.uploadPx}, the size ICA recommends for e-Service uploads. Save it as JPG, HEIC or PNG
              under {ICA_FACTS.maxFileSize}. Don&apos;t retouch it: ICA does not accept altered photos.
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
              How the Singapore Photo Resizer Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-400 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl" aria-hidden="true">{step.icon}</span>
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
              href={SG_TOOL_HREF}
              className="inline-flex items-center justify-center bg-lime-700 hover:bg-lime-800 text-white text-sm font-bold px-7 py-3.5 rounded-xl transition-colors"
            >
              Start Resizing Now →
            </Link>
          </div>
        </div>
      </section>

      {/* ── PIXEL SIZE EXPLAINER ── */}
      <section id="pixel-size" className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
            400 × 514 or 413 × 531 Pixels?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-3">
            You will see both sizes quoted online. <strong>413 × 531 px</strong> is the printed 35 × 45 mm photo
            converted at 300 DPI. <strong>400 × 514 px</strong> is the size ICA itself recommends for photos
            uploaded through its e-Services. If you are uploading to ICA, use 400 × 514 px.
          </p>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
            Both sizes share the same 7:9 shape, so the crop that matters is the same: your head and the top of
            your shoulders, centred, with a little space above your hair. Get the shape right first, and the pixel
            count is just a final scaling step.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left text-xs sm:text-sm">
              <caption className="sr-only">Singapore passport photo file specifications</caption>
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th scope="col" className="p-4 font-bold">File setting</th>
                  <th scope="col" className="p-4 font-bold">What to use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Pixel size (ICA e-Service)</td>
                  <td className="p-4 text-slate-600">{ICA_FACTS.uploadPx}</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4 font-semibold text-slate-900">Shape</td>
                  <td className="p-4 text-slate-600">35:45 (7:9) portrait</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">File type</td>
                  <td className="p-4 text-slate-600">{ICA_FACTS.fileTypes}</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4 font-semibold text-slate-900">Maximum file size</td>
                  <td className="p-4 text-slate-600">{ICA_FACTS.maxFileSize}</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Print size</td>
                  <td className="p-4 text-slate-600">35 × 45 mm, on {ICA_FACTS.printFinish}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Source:{" "}
            <a href={ICA_SOURCES.photoGuidelines} target="_blank" rel="noopener noreferrer" className="underline">
              ICA photo guidelines
            </a>
            . Background, pose and lighting rules are covered in our{" "}
            <Link href="/singapore-ica-photo" className="text-emerald-700 font-semibold underline">
              ICA photo requirements guide
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── CROP GUIDE SECTION ── */}
      <section className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              Cropping by Hand
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How to Crop a Passport Photo for Singapore
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Resizing yourself in a gallery app? Follow these four checks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {cropSteps.map((step, i) => (
              <div key={step.title} className="p-5 rounded-2xl border border-slate-200 bg-white">
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

      {/* ── FILE MISTAKES ── */}
      <section className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              Before You Resize
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              File Mistakes That Ruin a Resized Photo
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {fileMistakes.map((m) => (
              <div key={m.title} className="p-5 rounded-2xl border border-rose-200 bg-rose-50/40">
                <h3 className="font-bold text-slate-900 text-sm mb-1">{m.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
              </div>
            ))}
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
              Resizing FAQs
            </h2>
          </div>

          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* ── RELATED SINGAPORE TOOLS & GUIDES ── */}
      <SingaporeRelatedLinks currentPath="/resize-passport-photo-singapore" />

      {/* ── BOTTOM CTA BANNER ── */}
      <section className="bg-slate-900 text-white py-16 lg:py-20 border-t-4 border-emerald-500">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/refund-policy"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/30"
          >
            🇸🇬 Money-back guarantee if your photo is rejected
          </Link>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 max-w-2xl mx-auto">
            Resize Your Photo for ICA in Seconds
          </h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto mb-8">
            Upload any photo, preview the crop for free, and download your resized file when it looks right.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={SG_TOOL_HREF}
              className="inline-flex items-center justify-center bg-lime-600 hover:bg-lime-500 text-white text-base font-bold px-8 py-4 rounded-xl transition-colors active:scale-95"
            >
              Resize Singapore Photo Now →
            </Link>
          </div>
          <p className="text-xs text-slate-400 mt-5">
            Free to preview · Download digital file &amp; 4×6&quot; print sheet
          </p>
        </div>
      </section>
    </>
  );
}
