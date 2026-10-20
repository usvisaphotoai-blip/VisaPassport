import { Metadata } from "next";
import Link from "next/link";
import ConverterApp from "./ConverterApp";
import { PRESETS, PresetKey, presetPixels } from "./presets";

const PAGE_URL = "https://www.pixpassport.com/in/photo-passport-size-converter";
const OG_IMAGE =
  "https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679205/MakePassportPhoto_ph2uog_ryefxt.webp";
const TITLE = "Photo Passport Size Converter Online Free – 3.5×4.5 cm & KB";
const DESCRIPTION =
  "Convert any photo to passport size online free. Crop to 3.5×4.5 cm or 2×2 inch at 300 DPI and reduce it to 20–50 KB for Indian exam, PAN, visa and job forms.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "photo passport size converter",
    "passport size photo converter",
    "convert photo to passport size",
    "passport size photo converter online free",
    "photo to passport size converter",
    "passport size photo in kb",
    "passport size photo 3.5 x 4.5 cm",
    "passport size photo resize",
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "en-IN": PAGE_URL,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: PAGE_URL,
    // Page-level openGraph replaces the root one, so repeat the site-wide fields
    siteName: "PixPassport",
    locale: "en_IN",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Photo passport size converter",
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

const SIZE_ROWS = (Object.keys(PRESETS) as Exclude<PresetKey, "custom">[]).map((key) => ({
  key,
  ...PRESETS[key],
  px300: presetPixels(key, 300),
  px200: presetPixels(key, 200),
}));

const faqs = [
  {
    q: "How do I convert a photo to passport size online?",
    a: "Upload your photo, pick 3.5 × 4.5 cm (or another size), drag and zoom so your face sits inside the guide, and download the JPG. The converter crops and resizes it to the exact pixel size for the DPI you choose, for free.",
  },
  {
    q: "What is the passport size photo size in India?",
    a: "The common passport size photo in India is 3.5 × 4.5 cm (35 × 45 mm), which is 413 × 531 pixels at 300 DPI. Indian visa and OCI photos, and Indian passport applications made abroad, use a square 2 × 2 inch (51 × 51 mm) photo instead.",
  },
  {
    q: "How do I reduce a passport size photo to 20 KB or 50 KB?",
    a: "Choose the limit under 'Max file size'. The converter lowers JPEG quality just enough to fit, and only reduces the pixel size if the limit can't be reached otherwise. The final size in KB is shown before you download.",
  },
  {
    q: "Do I need a photo for an Indian passport application at a Passport Seva Kendra?",
    a: "No. For passport applications in India, your photo is captured at the Passport Seva Kendra or POPSK during your appointment. You need printed or digital passport photos for forms such as visas, OCI, exams, bank accounts and ID cards, and for Indian passport applications made from abroad.",
  },
  {
    q: "What size photo do bank and government exam forms need?",
    a: "It varies by form, so always check the official notification. Many exam and job forms ask for a JPG photo of about 20–50 KB, and some give exact pixels such as 200 × 230 px. Use 'Custom size' in px together with the KB limit to match it exactly.",
  },
  {
    q: "Is this passport size photo converter free and private?",
    a: "Yes. It is completely free with no sign-up and no watermark. Your photo is processed in your own browser and is never uploaded to our servers.",
  },
  {
    q: "Can it change the photo background to white?",
    a: "This converter crops, resizes and compresses but keeps your original background. If you need a white background or a full compliance check, use our passport photo online tool first.",
  },
  {
    q: "How do I print passport size photos at home?",
    a: "Download your converted photo, then use our free 4×6 passport photo template to place 8 copies of a 3.5 × 4.5 cm photo on one 4×6 sheet. Print it at 100% scale on photo paper and cut along the crop lines.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "PixPassport — Photo Passport Size Converter",
      url: PAGE_URL,
      description: DESCRIPTION,
      applicationCategory: "MultimediaApplication",
      operatingSystem: "All",
      browserRequirements: "Requires JavaScript and a modern web browser",
      isAccessibleForFree: true,
      inLanguage: "en-IN",
      image: OG_IMAGE,
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "Convert any photo to 3.5 × 4.5 cm passport size",
        "2 × 2 inch, 2.5 × 3.5 cm, stamp size and custom sizes",
        "200, 300 and 600 DPI output",
        "Compress to 20 KB, 50 KB or any KB limit",
        "Drag, zoom and rotate crop editor",
      ],
    },
    {
      "@type": "HowTo",
      name: "How to convert a photo to passport size",
      step: [
        { "@type": "HowToStep", name: "Upload", text: "Upload a clear, front-facing photo." },
        { "@type": "HowToStep", name: "Choose the size", text: "Pick 3.5 × 4.5 cm, 2 × 2 inch or enter a custom size." },
        { "@type": "HowToStep", name: "Position", text: "Drag and zoom so the face fits inside the oval guide." },
        { "@type": "HowToStep", name: "Set KB and download", text: "Choose a max file size if your form has one, then download the JPG." },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.pixpassport.com/" },
        { "@type": "ListItem", position: 2, name: "Photo Passport Size Converter", item: PAGE_URL },
      ],
    },
  ],
};

export default function PhotoPassportSizeConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-slate-50 min-h-screen">
        {/* Hero */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6">
          <nav aria-label="Breadcrumb" className="mb-2">
            <ol className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <li><Link href="/" className="hover:text-lime-700">Home</Link></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-slate-700 truncate">Photo Passport Size Converter</li>
            </ol>
          </nav>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-2 lg:gap-6">
            <div className="min-w-0">
              <h1 className="text-[22px] sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                Photo Passport Size Converter
              </h1>
              <p className="text-slate-500 text-sm sm:text-base mt-1">
                Convert any photo to 3.5 × 4.5 cm passport size, set the DPI and
                reduce it to the KB your form needs.
              </p>
            </div>
            <ul className="flex flex-wrap gap-1.5 shrink-0" aria-label="Highlights">
              {["Free", "100% private", "300 DPI", "KB resize"].map((t) => (
                <li key={t} className="text-[11px] sm:text-xs font-bold text-lime-800 bg-lime-50 border border-lime-200 rounded-full px-2.5 py-1">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tool */}
        <ConverterApp />

        {/* Sizes */}
        <div className="bg-white py-12 sm:py-16 border-t border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4 text-center">
              Passport Size Photo Sizes in cm, Inches and Pixels
            </h2>
            <p className="text-slate-600 text-center mb-8">
              Pixel size depends on DPI. 300 DPI is the standard for printing
              and for most online applications.
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 font-bold">Size</th>
                    <th className="px-4 py-3 font-bold whitespace-nowrap">300 DPI</th>
                    <th className="px-4 py-3 font-bold whitespace-nowrap">200 DPI</th>
                    <th className="px-4 py-3 font-bold">Used for</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {SIZE_ROWS.map((r) => (
                    <tr key={r.key}>
                      <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">{r.label}</td>
                      <td className="px-4 py-3 whitespace-nowrap font-bold text-lime-700">{r.px300.w} × {r.px300.h} px</td>
                      <td className="px-4 py-3 whitespace-nowrap">{r.px200.w} × {r.px200.h} px</td>
                      <td className="px-4 py-3">{r.usedFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* How-to + SEO content */}
        <div className="bg-slate-50 py-12 sm:py-16 border-t border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 prose prose-slate">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              How to Convert a Photo to Passport Size
            </h2>
            <ol>
              <li>
                <strong>Upload a clear photo.</strong> Use a front-facing photo
                in good light with a plain, light background. A phone photo
                works fine.
              </li>
              <li>
                <strong>Choose the passport size.</strong> 3.5 × 4.5 cm is the
                standard passport size photo in India. Pick 2 × 2 inch for
                Indian visa or OCI, or enter a custom size from your form.
              </li>
              <li>
                <strong>Position your face.</strong> Drag the photo and use
                zoom so your face fills the dashed oval, with a little space
                above your head.
              </li>
              <li>
                <strong>Set the KB limit and download.</strong> If the form
                gives a maximum file size, select it. The converter shows the
                final pixel size and KB before you download the JPG.
              </li>
            </ol>

            <h2>Passport Size Photo in KB for Online Forms</h2>
            <p>
              Indian online applications often limit the photo file size as
              well as its dimensions. Bank, SSC, railway and other exam forms
              commonly ask for a photo of around 20–50 KB, while visa portals
              allow larger files. A photo straight from a phone camera is
              usually several MB, so it gets rejected.
            </p>
            <p>
              This photo passport size converter compresses the JPG to fit
              under the limit while keeping as much quality as possible. It
              only lowers the pixel size when there is no other way to reach a
              very small limit, and tells you when it does. Always follow the
              exact size in your form&apos;s official notification.
            </p>

            <h2>3.5 × 4.5 cm vs 2 × 2 Inch: Which Do You Need?</h2>
            <ul>
              <li>
                <strong>3.5 × 4.5 cm (413 × 531 px):</strong> the everyday
                passport size photo in India for application forms, exams,
                admissions, bank accounts, SIM cards and ID cards.
              </li>
              <li>
                <strong>2 × 2 inch (600 × 600 px):</strong> a square photo used
                for Indian visas, OCI cards and Indian passport applications
                made abroad through an embassy or VFS centre. It is also the
                US passport and visa size.
              </li>
              <li>
                <strong>2.5 × 3.5 cm:</strong> the photo box on PAN card
                application forms.
              </li>
            </ul>
            <p>
              Applying for an Indian passport in India? You don&apos;t need to
              bring a photo. It is taken at the Passport Seva Kendra during
              your appointment.
            </p>

            <h2>Tips for a Photo That Gets Accepted</h2>
            <ul>
              <li>Face the camera directly with a neutral expression and both eyes open.</li>
              <li>Use a plain white or light background without shadows.</li>
              <li>Don&apos;t wear sunglasses, caps or anything that covers your face.</li>
              <li>Avoid filters, beauty mode and heavy editing.</li>
              <li>
                Need a white background or a compliance check? Try our{" "}
                <Link href="/passport-photo-online">passport photo online tool</Link>{" "}
                or the <Link href="/passport-photo-checker">passport photo checker</Link>.
              </li>
            </ul>

            <h2>Print Passport Size Photos at Home</h2>
            <p>
              Once your photo is converted, put several copies on one sheet
              with the free{" "}
              <Link href="/passport-photo-template-4x6">4×6 passport photo template</Link>.
              It fits 8 photos of 3.5 × 4.5 cm on a single 4×6 print. You can
              also use the{" "}
              <Link href="/passport-photo-print-template-generator">
                passport photo print template generator
              </Link>{" "}
              for A4 sheets.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white py-14 sm:py-20 border-t border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">
              Passport Size Photo Converter FAQ
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl p-5">
                  <h3 className="font-bold text-slate-800 mb-2">{faq.q}</h3>
                  <p className="text-slate-600 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <div className="grid sm:grid-cols-2 py-8 lg:grid-cols-3 gap-3 max-w-4xl mx-auto px-4">
          {[
            { href: "/passport-photo-template-4x6", label: "Free 4x6 Passport Photo Template" },
            { href: "/passport-size-photo-maker", label: "Passport Size Photo Maker" },
            { href: "/passport-photo-online", label: "Passport Photo Online" },
            { href: "/passport-photo-checker", label: "Passport Photo Checker" },
            { href: "/passport-photo-print-template-generator", label: "Print Template (A4 / Letter)" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center justify-between gap-3 bg-white hover:bg-lime-50 border border-slate-200 hover:border-lime-200 rounded-xl px-5 py-4 text-sm font-bold text-slate-700 hover:text-lime-700 transition-colors shadow-2xs"
            >
              {label}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
