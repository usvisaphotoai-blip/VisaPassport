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

// Owns: "ICA photo requirements", "ICA photo guidelines", "NRIC / IC photo", "ICA e-service photo".
// Informational intent: the rules ICA checks and why photos get rejected. The maker itself
// is promoted from the hub (/singapore-passport-photo), so this page must not target "maker".
const PAGE_URL = "https://www.pixpassport.com/singapore-ica-photo";
const TITLE = "ICA Photo Requirements Singapore: Passport, NRIC & e-Service Rules";
const DESCRIPTION =
  "What ICA requires from your photo: 400×514 px for e-Service uploads, 8 MB limit, taken in the last 3 months, no editing. Plus why passport and NRIC photos get rejected.";
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
    title: "ICA Photo Requirements for Singapore Passports & NRIC",
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "PixPassport",
    locale: "en_SG",
    type: "article",
    modifiedTime: DATE_MODIFIED,
    images: [{ ...SG_OG_IMAGE, alt: "Example of a photo that meets Singapore ICA photo requirements" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ICA Photo Requirements for Singapore Passports & NRIC",
    description: DESCRIPTION,
    images: [SG_OG_IMAGE.url],
  },
};

// Stated on ica.gov.sg (see ICA_SOURCES). Do not add rows here without an ICA source.
const officialRules = [
  { rule: "Digital size for e-Service uploads", value: `${ICA_FACTS.uploadPx} (recommended)`, source: ICA_SOURCES.photoGuidelines },
  { rule: "Accepted file types", value: ICA_FACTS.fileTypes, source: ICA_SOURCES.photoGuidelines },
  { rule: "Maximum file size", value: ICA_FACTS.maxFileSize, source: ICA_SOURCES.photoGuidelines },
  { rule: "Recency", value: `Colour photo ${ICA_FACTS.recency}`, source: ICA_SOURCES.passportApply },
  { rule: "Printed photos", value: ICA_FACTS.printFinish, source: ICA_SOURCES.photoGuidelines },
  { rule: "Editing", value: "Must not be altered or enhanced in any way, including changing facial features or using photo editing software", source: ICA_SOURCES.photoGuidelines },
  { rule: "Selfies", value: "Not recommended by ICA, as the result is usually not ideal", source: ICA_SOURCES.photoGuidelines },
];

// ICA states its rules are based on ISO and ICAO specifications; these are the ICAO-style
// points applicants are commonly asked to meet.
const icaoRules = [
  { title: "Plain white background", desc: "No patterns, objects, or shadows behind you." },
  { title: "35 × 45 mm print", desc: "The standard passport photo size used for printed copies." },
  { title: "Face the camera", desc: "Head straight and centred, both eyes open, mouth closed, neutral expression." },
  { title: "Even lighting", desc: "No shadows across the face, and no glare or reflections on glasses." },
  { title: "Face fully visible", desc: "Hair away from the eyes; religious headwear must not hide the face." },
  { title: "True skin tone", desc: "Colour photo with no filters, beauty modes, or skin smoothing." },
];

const rejectionReasons = [
  { title: "Retouched or filtered photo", desc: "Beauty filters and face-smoothing apps count as altering the photo, which ICA does not allow." },
  { title: "Old photo reused", desc: "A photo from your previous passport or IC is usually older than three months." },
  { title: "Selfie distortion", desc: "Arm's-length selfies enlarge the nose and shrink the ears. Ask someone else to take the photo." },
  { title: "Shadows or a grey wall", desc: "A shadow behind your head or an off-white wall makes the background uneven." },
  { title: "Glare on glasses", desc: "Reflections that hide your eyes are a common reason for a retake. Removing glasses avoids the problem." },
  { title: "Glossy print", desc: "For hardcopy submissions ICA asks for matte or semi-matte, non-reflective paper." },
];

const icaServices = [
  { icon: "🇸🇬", title: "Singapore passport", desc: "First-time applications and renewals through ICA's e-Service with Singpass." },
  { icon: "🪪", title: "NRIC registration", desc: "Identity card registration and re-registration for citizens and permanent residents." },
  { icon: "🏛️", title: "Permanent Residence (e-PR)", desc: "Photo upload as part of an online PR application." },
  { icon: "🎓", title: "Student's Pass", desc: "Passes for international students studying in Singapore." },
  { icon: "👨‍👩‍👧", title: "Long-Term Visit Pass", desc: "LTVP applications for spouses, children and other family members." },
  { icon: "🛂", title: "Entry visa (SAVE)", desc: "Visa applications for visitors who need one to enter Singapore." },
];

const faqs = [
  {
    q: "What are ICA's photo requirements for online applications?",
    a: `For uploads through ICA's e-Services, ICA recommends a photo of ${ICA_FACTS.uploadPx}. It accepts ${ICA_FACTS.fileTypes} files up to ${ICA_FACTS.maxFileSize}. The photo must be in colour and ${ICA_FACTS.recency}.`,
  },
  {
    q: "Where can I read the official ICA photo guidelines?",
    a: "ICA publishes them at ica.gov.sg/photo-guidelines. ICA says its passport photo requirements are based on specifications from the International Standards Organisation (ISO) and the International Civil Aviation Organisation (ICAO).",
  },
  {
    q: "Can I retouch or edit my ICA photo?",
    a: "No. ICA states that your photograph must not be altered or enhanced in any way, including modifying facial features or using photo editing software. Avoid beauty filters, skin smoothing, and face-reshaping apps.",
  },
  {
    q: "Can I use a selfie for my passport or NRIC photo?",
    a: "ICA does not recommend selfies, because the result is usually not ideal. A photo taken by someone else at eye level, about 1.5 metres away, gives a more accurate likeness.",
  },
  {
    q: "How recent must my ICA photo be?",
    a: "ICA asks for a colour photograph taken within the last three months, so a photo reused from an older passport or identity card will normally not qualify.",
  },
  {
    q: "Does ICA accept HEIC photos from an iPhone?",
    a: "Yes. ICA lists JPG, JPEG, HEIC, HEIF and PNG as accepted file types for e-Service uploads, with a maximum size of 8 MB.",
  },
  {
    q: "What happens if ICA rejects my photo?",
    a: "ICA says your application will be delayed if the photo does not meet its requirements, and that it will notify you if the photo is rejected. You will then need to submit a new photo.",
  },
];

const jsonLd = buildSingaporeJsonLd({
  url: PAGE_URL,
  name: TITLE,
  description: DESCRIPTION,
  dateModified: DATE_MODIFIED,
  crumbs: [SG_HUB, { name: "ICA Photo Requirements", url: PAGE_URL }],
  faqs,
});

export default function SingaporeIcaPhotoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(jsonLd) }} />

      <SingaporeBreadcrumb
        trail={[
          { label: "Singapore Passport Photo", href: "/singapore-passport-photo" },
          { label: "ICA Photo Requirements" },
        ]}
      />

      {/* ── HERO ── */}
      <SingaporeHero
        badgeText="🇸🇬 Immigration & Checkpoints Authority · Photo Guidelines"
        h1="ICA Photo Requirements for Singapore Passports, NRIC & Passes"
        subtitle="Every rule ICA checks, in one place, with links to the official source."
        description="ICA uses one photo standard across its e-Services. Here is what it states officially, the ICAO-based rules behind it, and the mistakes that most often get a photo rejected."
        primaryCtaText="Check My Photo →"
        primaryCtaHref={SG_TOOL_HREF}
        secondaryCtaText="Read the Rules"
        secondaryCtaHref="#official-rules"
        imageAltAfter="Photo meeting ICA requirements: plain white background, neutral expression, face centred"
        imageAltBefore="Original photo before checking against ICA photo requirements"
      />

      {/* ── DIRECT ANSWER ── */}
      <section className="bg-white py-10 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2">
              Quick Answer: What Does ICA Require?
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              ICA asks for a colour photo {ICA_FACTS.recency}. For online applications it recommends{" "}
              {ICA_FACTS.uploadPx}, in {ICA_FACTS.fileTypes} format, no larger than {ICA_FACTS.maxFileSize}. The
              photo must not be edited or enhanced. ICA bases the rest of its rules, such as the plain background,
              neutral expression and even lighting, on ISO and ICAO specifications.
            </p>
          </div>
        </div>
      </section>

      {/* ── OFFICIAL ICA RULES ── */}
      <section id="official-rules" className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              Stated by ICA
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Official ICA Photo Rules
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Each rule below is taken from ica.gov.sg. Follow the source link to check the current wording.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left text-xs sm:text-sm">
              <caption className="sr-only">Photo rules published by Singapore&apos;s Immigration &amp; Checkpoints Authority</caption>
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th scope="col" className="p-4 font-bold">Rule</th>
                  <th scope="col" className="p-4 font-bold">ICA requirement</th>
                  <th scope="col" className="p-4 font-bold">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {officialRules.map((r, i) => (
                  <tr key={r.rule} className={i % 2 ? "bg-slate-50" : undefined}>
                    <td className="p-4 font-semibold text-slate-900">{r.rule}</td>
                    <td className="p-4 text-slate-600">{r.value}</td>
                    <td className="p-4">
                      <a href={r.source} target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline">
                        ica.gov.sg
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── ICAO-BASED RULES ── */}
      <section className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              ISO / ICAO Standard
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              The Photo Standard Behind ICA&apos;s Rules
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              ICA says its requirements are based on ISO and ICAO specifications. In practice that means:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {icaoRules.map((r) => (
              <div key={r.title} className="p-5 rounded-2xl border border-slate-200 bg-slate-50">
                <h3 className="font-bold text-slate-900 text-sm mb-1">{r.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY PHOTOS GET REJECTED ── */}
      <section className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              Avoid a Delay
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Why ICA Rejects Photos
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              A rejected photo delays your application until you send a new one. These are the usual causes.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rejectionReasons.map((r) => (
              <div key={r.title} className="p-5 rounded-2xl border border-rose-200 bg-white">
                <h3 className="font-bold text-slate-900 text-sm mb-1">{r.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href={SG_TOOL_HREF}
              className="inline-flex items-center justify-center bg-lime-700 hover:bg-lime-800 text-white text-sm font-bold px-7 py-3.5 rounded-xl transition-colors"
            >
              Check My Photo Against These Rules →
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHERE THE ICA STANDARD APPLIES ── */}
      <section className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              ICA e-Services
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Applications That Use the ICA Photo Standard
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              The same photo rules apply across ICA&apos;s documents and passes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {icaServices.map((s) => (
              <div key={s.title} className="p-5 rounded-2xl border border-slate-200 bg-white">
                <div className="text-2xl mb-2" aria-hidden="true">{s.icon}</div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{s.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-600 text-center mt-8">
            Making a passport photo? Use the{" "}
            <Link href="/singapore-passport-photo" className="text-emerald-700 font-semibold underline">
              Singapore passport photo maker
            </Link>
            . Applying for a visa to visit Singapore? See the{" "}
            <Link href="/singapore-visa-photo-editor" className="text-emerald-700 font-semibold underline">
              Singapore visa photo tool
            </Link>
            .
          </p>
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
              ICA Photo Requirements FAQ
            </h2>
          </div>

          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* ── RELATED SINGAPORE TOOLS & GUIDES ── */}
      <SingaporeRelatedLinks currentPath="/singapore-ica-photo" />

      {/* ── BOTTOM CTA ── */}
      <section className="bg-slate-900 text-white py-16 lg:py-20 border-t-4 border-emerald-500">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/refund-policy"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/30"
          >
            🇸🇬 Money-back guarantee if your photo is rejected
          </Link>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 max-w-2xl mx-auto">
            Get a Photo That Meets ICA&apos;s Rules
          </h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto mb-8">
            Upload a portrait, preview it on a plain white background for free, and download it when it&apos;s right.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={SG_TOOL_HREF}
              className="inline-flex items-center justify-center bg-lime-600 hover:bg-lime-500 text-white text-base font-bold px-8 py-4 rounded-xl transition-colors active:scale-95"
            >
              Check My Photo Now →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
