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

// Owns: "singapore passport photo", "singapore passport photo maker / online / size".
// ICA rule details live on /singapore-ica-photo; pixel resizing on /resize-passport-photo-singapore.
const PAGE_URL = SG_HUB.url;
const TITLE = "Singapore Passport Photo Maker Online – 35×45 mm, Free Preview";
const DESCRIPTION =
  "Make your Singapore passport photo online: white background, 35×45 mm print and a digital file for ICA's e-Service. Free preview, ready in under a minute.";
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
    title: "Singapore Passport Photo Maker Online | PixPassport",
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "PixPassport",
    locale: "en_SG",
    type: "website",
    images: [{ ...SG_OG_IMAGE, alt: "Singapore passport photo on a white background made with PixPassport" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Singapore Passport Photo Maker Online | PixPassport",
    description: DESCRIPTION,
    images: [SG_OG_IMAGE.url],
  },
};

const steps = [
  {
    num: "01",
    title: "Get Someone to Take Your Photo",
    desc: "Ask a friend to photograph you at eye level in soft daylight. ICA does not recommend selfies, which tend to distort your face.",
    icon: "📱",
  },
  {
    num: "02",
    title: "Upload to the Maker",
    desc: "The tool finds your face, crops to the 35 × 45 mm passport shape, and places you on a plain white background.",
    icon: "⚡",
  },
  {
    num: "03",
    title: "Check Before You Pay",
    desc: "Preview the result for free and check framing, lighting and expression before you download anything.",
    icon: "🛡️",
  },
  {
    num: "04",
    title: "Submit or Print",
    desc: "Upload the digital file in ICA's e-Service, or print the 4×6 inch sheet on matte or semi-matte photo paper.",
    icon: "🖨️",
  },
];

const whyOnline = [
  {
    title: "Skip the Photo Studio",
    desc: "No trip to a studio or booth. Use a photo taken at home and redo it as many times as you like.",
    icon: "🏪",
  },
  {
    title: "Free to Preview",
    desc: "Upload, crop, and check the result at no cost. You only pay when you download the final file.",
    icon: "🆓",
  },
  {
    title: "Digital File and Print Sheet",
    desc: "One purchase gives you the file for the online application and a print-ready sheet for paper forms.",
    icon: "🖌️",
  },
];

const faqs = [
  {
    q: "What size is a Singapore passport photo?",
    a: `A printed Singapore passport photo is 35 mm wide by 45 mm high. For uploads through ICA's e-Service, ICA recommends a digital photo of ${ICA_FACTS.uploadPx}.`,
  },
  {
    q: "Can I make a Singapore passport photo online for free?",
    a: "You can upload your photo, see the cropped result on a white background, and check it at no cost. You only pay if you download the watermark-free digital file and the printable 4×6 inch sheet.",
  },
  {
    q: "Can I take my own passport photo with my phone?",
    a: "Yes, but have someone else take it. ICA says it does not recommend selfies because the result is usually not ideal. Stand facing soft window light, keep a neutral expression, and keep the camera at eye level.",
  },
  {
    q: "How do I submit my photo for a Singapore passport application?",
    a: `Singapore citizens apply online by logging in to ICA's e-Service with Singpass and uploading the digital photo. ICA accepts ${ICA_FACTS.fileTypes} files up to ${ICA_FACTS.maxFileSize}. If you need a printed copy, use ${ICA_FACTS.printFinish}.`,
  },
  {
    q: "What should I wear for my Singapore passport photo?",
    a: "Wear dark or coloured clothing that stands out against the white background. White or very pale tops blend into the backdrop and make your outline hard to see.",
  },
  {
    q: "What happens if ICA rejects my passport photo?",
    a: "ICA says your application will be delayed if the photo does not meet its requirements, and it will notify you if the photo is rejected. If a photo you bought from PixPassport is rejected, our money-back guarantee applies.",
  },
  {
    q: "Can I use the same photo for my NRIC or other ICA applications?",
    a: "ICA uses one photo standard across its e-Services, so a compliant passport photo usually works for NRIC registration and other ICA applications too. Our ICA photo requirements guide covers each document in detail.",
  },
];

const jsonLd = buildSingaporeJsonLd({
  url: PAGE_URL,
  name: TITLE,
  description: DESCRIPTION,
  dateModified: DATE_MODIFIED,
  crumbs: [SG_HUB],
  faqs,
  includeTool: true,
});

export default function SingaporePassportPhotoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(jsonLd) }} />

      <SingaporeBreadcrumb trail={[{ label: "Singapore Passport Photo" }]} />

      {/* ── HERO ── */}
      <SingaporeHero
        badgeText="🇸🇬 Free to Preview · 35 × 45 mm · White Background"
        h1="Singapore Passport Photo Maker Online"
        subtitle="Make your Singapore passport photo at home, free to preview, ready for ICA's e-Service in under a minute."
        description="Upload a portrait and the maker crops it to the 35 × 45 mm passport shape, places you on a plain white background, and lets you check the result before you pay."
        primaryCtaText="Make My Photo Now →"
        primaryCtaHref={SG_TOOL_HREF}
        secondaryCtaText="See Photo Size"
        secondaryCtaHref="#photo-size"
        imageAltAfter="Finished Singapore passport photo on a plain white background"
        imageAltBefore="Casual home photo before using the Singapore passport photo maker"
      />

      {/* ── DIRECT ANSWER ── */}
      <section className="bg-white py-10 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2">
              Quick Answer: How to Make a Singapore Passport Photo Online
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Have someone photograph you against any wall, upload the photo here, and the maker crops it to
              35 × 45 mm on a plain white background. Preview it for free, then download a digital file for
              ICA&apos;s e-Service (ICA recommends {ICA_FACTS.uploadPx}) or a sheet to print. The photo must be{" "}
              {ICA_FACTS.recency}. For every rule ICA checks, see our{" "}
              <Link href="/singapore-ica-photo" className="text-emerald-700 font-semibold underline">
                ICA photo requirements guide
              </Link>
              .
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
              Make Your Singapore Passport Photo in 4 Steps
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Make your passport photo at home without visiting a studio.
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
              Start Singapore Photo Maker →
            </Link>
          </div>
        </div>
      </section>

      {/* ── PHOTO SIZE SUMMARY (full rules live on /singapore-ica-photo) ── */}
      <section id="photo-size" className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              Singapore Passport Photo Size
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Print Size vs Digital Size
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Most Singapore passport applications are made online, so the digital file matters more than the print.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 mb-6 bg-white">
            <table className="w-full text-left text-xs sm:text-sm">
              <caption className="sr-only">Singapore passport photo sizes for print and online applications</caption>
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th scope="col" className="p-4 font-bold">Format</th>
                  <th scope="col" className="p-4 font-bold">Size</th>
                  <th scope="col" className="p-4 font-bold">When you need it</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Digital upload</td>
                  <td className="p-4 text-slate-600">{ICA_FACTS.uploadPx} (ICA recommendation), up to {ICA_FACTS.maxFileSize}</td>
                  <td className="p-4 text-slate-600">Online application through ICA&apos;s e-Service with Singpass</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4 font-semibold text-slate-900">Printed photo</td>
                  <td className="p-4 text-slate-600">35 × 45 mm on {ICA_FACTS.printFinish}</td>
                  <td className="p-4 text-slate-600">Hardcopy submissions</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Background</td>
                  <td className="p-4 text-slate-600">Plain white, no shadows or patterns</td>
                  <td className="p-4 text-slate-600">Both formats</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-600">
            Need a file at an exact pixel size? Use the{" "}
            <Link href="/resize-passport-photo-singapore" className="text-emerald-700 font-semibold underline">
              Singapore photo resizer (400 × 514 px)
            </Link>
            . Source:{" "}
            <a href={ICA_SOURCES.photoGuidelines} target="_blank" rel="noopener noreferrer" className="underline">
              ICA photo guidelines
            </a>
            .
          </p>
        </div>
      </section>

      {/* ── WHY USE AN ONLINE MAKER ── */}
      <section className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              Why Go Online
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Why Use a Passport Photo Maker Instead of a Studio
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              A studio visit works, but an online maker is quicker and lets you fix mistakes straight away.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {whyOnline.map((item) => (
              <div key={item.title} className="p-5 rounded-2xl border border-slate-200 bg-white">
                <div className="text-2xl mb-2" aria-hidden="true">{item.icon}</div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
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
              Singapore Passport Photo FAQs
            </h2>
          </div>

          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* ── RELATED SINGAPORE TOOLS & GUIDES ── */}
      <SingaporeRelatedLinks currentPath="/singapore-passport-photo" />

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
            Make Your Singapore Passport Photo Now
          </h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto mb-8">
            Upload a photo, preview it on a white background for free, and download it when you&apos;re happy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={SG_TOOL_HREF}
              className="inline-flex items-center justify-center bg-lime-600 hover:bg-lime-500 text-white text-base font-bold px-8 py-4 rounded-xl transition-colors active:scale-95"
            >
              Make Singapore Photo Now →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
