import { Metadata } from "next";
import Link from "next/link";
import Template4x6App from "./Template4x6App";
import { PHOTO_SIZES, PhotoSizeKey, STANDARD_MARGIN_MM, SHEET_W_MM, SHEET_H_MM, bestFit } from "./sheet";

const PAGE_URL = "https://www.pixpassport.com/passport-photo-template-4x6";
const OG_IMAGE =
  "https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679205/MakePassportPhoto_ph2uog_ryefxt.webp";
const TITLE = "Free 4x6 Passport Photo Template (6x4 / 4R) – Print at Home";
const DESCRIPTION =
  "Free passport photo template 4x6 (6x4 / 4R). Upload one photo and get a 300 DPI print-ready sheet with crop lines for home, CVS or Walgreens printing.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "passport photo 4x6 template free",
    "passport photo template 4x6",
    "4x6 passport photo template",
    "4x6 passport template",
    "6x4 passport photo template",
    "4r passport photo template",
    "passport photos template",
    "passport photo print template",
    "passport photo sheet maker",
    "passport photo printing templates free",
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: PAGE_URL,
    // Page-level openGraph replaces the root one, so repeat the site-wide fields
    siteName: "PixPassport",
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Free 4x6 passport photo template",
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

const STATS = [
  { value: "4×6 in", label: "10×15 cm / 4R" },
  { value: "Up to 9", label: "Photos per Sheet" },
  { value: "300 DPI", label: "Print Quality" },
  { value: "Free", label: "JPG & PDF" },
];

// Computed from the same geometry the tool uses, so the table never drifts from the output
const LAYOUTS = (Object.keys(PHOTO_SIZES) as PhotoSizeKey[]).map((key) => ({
  key,
  ...PHOTO_SIZES[key],
  standard: bestFit(key, false),
  edge: bestFit(key, true),
}));

const faqs = [
  {
    q: "Is this 4x6 passport photo template really free?",
    a: "Yes. Uploading your photo, building the 4x6 sheet and downloading it as a 300 DPI JPG or PDF is completely free, with no sign-up and no watermark over your photos. Your photo is processed in your browser and never uploaded.",
  },
  {
    q: "How many passport photos fit on a 4x6 template?",
    a: "It depends on the photo size. With a standard print-safe margin, a 4x6 sheet fits 8 photos at 35×45 mm (UK, EU, India, Australia) in a 6x4 landscape layout, 6 at 33×48 mm (China) and 2 at 2×2 inch (US). With 'No margin' turned on, it fits 6 US 2×2 inch photos in a 2 × 3 grid.",
  },
  {
    q: "Can I fit 6 US 2x2 passport photos on a 4x6 sheet?",
    a: "Yes, but only edge-to-edge: two 2-inch photos are exactly 4 inches wide, which leaves no margin. Tick 'No margin' in the tool and order a borderless 4x6 print. If your printer or print shop adds a white border or trims the edges, keep the default print-safe layout with 2 photos instead.",
  },
  {
    q: "Is a 4x6 template the same as 6x4 or 4R?",
    a: "Yes. 4x6, 6x4 and 4R all describe the same 4 × 6 inch (about 10 × 15 cm) photo print. The only difference is portrait or landscape. The tool picks whichever orientation fits more photos, and any 4x6, 6x4 or 4R print order accepts the file.",
  },
  {
    q: "Can I print the 4x6 passport photo template at CVS or Walgreens?",
    a: "Yes. Download the JPG, upload it to the CVS or Walgreens photo website or app, and order a standard 4x6 print. Choose the option that keeps the full image instead of cropping it, so your passport photos stay at their exact size.",
  },
  {
    q: "How do I print the template at home?",
    a: "Load 4x6 photo paper in your printer, open the downloaded PDF and set the paper size to 4×6 inch. Print at 100% / actual size and turn off 'fit to page'. Only enable borderless printing if you used the edge-to-edge layout. Then cut along the thin crop lines.",
  },
  {
    q: "Do I need Canva, Photoshop or Lightroom to make a 4x6 passport photo template?",
    a: "No. Building the template in Canva, Photoshop or Lightroom means setting the canvas size, DPI, photo dimensions and spacing yourself. This tool does all of that in the browser: upload one photo and the 4x6 sheet is built at the correct size automatically.",
  },
  {
    q: "What if my photo isn't cropped to passport size yet?",
    a: "The template fits your photo without stretching, lets you zoom and move it inside each cell, and lets you remove the background and pick a solid background color. If you also need automatic head sizing or compliance checks, format it first with our passport photo online tool, then come back to make the 4x6 sheet.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "PixPassport — Free 4x6 Passport Photo Template",
      url: PAGE_URL,
      description: DESCRIPTION,
      applicationCategory: "DesignApplication",
      operatingSystem: "All",
      browserRequirements: "Requires JavaScript and a modern web browser",
      isAccessibleForFree: true,
      featureList: [
        "4x6 / 6x4 / 4R passport photo sheet",
        "2×2 in, 35×45 mm, 33×48 mm, 35×50 mm and 50×70 mm photo sizes",
        "Zoom and reposition photo inside each cell",
        "Background removal and background color selection",
        "Edge-to-edge layout for 6 US 2×2 photos",
        "Crop lines for easy cutting",
        "300 DPI JPG and PDF download",
      ],
      image: OG_IMAGE,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "HowTo",
      name: "How to make a 4x6 passport photo template",
      step: [
        { "@type": "HowToStep", name: "Upload your photo", text: "Upload one cropped passport photo." },
        { "@type": "HowToStep", name: "Choose the photo size", text: "Pick 2×2 inch, 35×45 mm or another size. The tool fills the 4x6 sheet automatically." },
        { "@type": "HowToStep", name: "Download", text: "Download the 300 DPI JPG or PDF with crop lines." },
        { "@type": "HowToStep", name: "Print and cut", text: "Print at 100% scale on 4x6 photo paper, or order a 4x6 print, then cut along the crop lines." },
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
        { "@type": "ListItem", position: 2, name: "4x6 Passport Photo Template", item: PAGE_URL },
      ],
    },
  ],
};

// Mini sheet preview, drawn to scale in mm
function SheetPreview({ size, edge, label }: { size: PhotoSizeKey; edge: boolean; label: string }) {
  const { width: w, height: h } = PHOTO_SIZES[size];
  const fit = bestFit(size, edge);
  const x0 = (fit.sheetW - fit.cols * w) / 2;
  const y0 = (fit.sheetH - fit.rows * h) / 2;
  return (
    <figure className="flex flex-col items-center">
      <svg viewBox={`0 0 ${fit.sheetW} ${fit.sheetH}`} className="w-24 sm:w-28 h-auto drop-shadow-sm" role="img" aria-label={label}>
        <rect width={fit.sheetW} height={fit.sheetH} fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
        {Array.from({ length: fit.rows }).flatMap((_, r) =>
          Array.from({ length: fit.cols }).map((_, c) => (
            <g key={`${r}-${c}`}>
              <rect x={x0 + c * w} y={y0 + r * h} width={w} height={h} fill="#ecfccb" stroke="#0f172a" strokeWidth="0.3" />
              <circle cx={x0 + c * w + w / 2} cy={y0 + r * h + h * 0.4} r={w * 0.2} fill="#a3e635" />
            </g>
          )),
        )}
      </svg>
      <figcaption className="text-xs font-semibold text-slate-600 mt-2 text-center">{label}</figcaption>
    </figure>
  );
}

export default function PassportPhotoTemplate4x6Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-slate-50 min-h-screen">
        {/* Hero */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 text-center">
          <nav aria-label="Breadcrumb" className="mb-3 sm:mb-4">
            <ol className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
              <li><Link href="/" className="hover:text-lime-700">Home</Link></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-slate-700 truncate">4x6 Passport Photo Template</li>
            </ol>
          </nav>
          <h1 className="text-[26px] sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Free 4x6 Passport Photo Template
          </h1>
          <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-xl mx-auto">
            Upload one photo and get a printable 4×6 sheet with crop lines
            for home, CVS or Walgreens printing.
          </p>
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-3 sm:mt-4" aria-label="Highlights">
            {["Free", "No sign-up", "300 DPI", "JPG & PDF"].map((t) => (
              <li key={t} className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-600">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-lime-700" aria-hidden>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Tool */}
        <Template4x6App />

        {/* Stats */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                className="bg-white rounded-xl px-3 py-3 sm:py-4 border border-slate-100 text-center"
              >
                <p className="text-xl sm:text-2xl font-black text-lime-700 leading-none">
                  {value}
                </p>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Layouts */}
        <div className="bg-white py-12 sm:py-16 border-t border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4 text-center">
              How Many Passport Photos Fit on a 4x6 Template?
            </h2>
            <p className="text-slate-600 text-center mb-8">
              A 4x6 sheet is {SHEET_W_MM} × {SHEET_H_MM} mm. The standard
              layout keeps a {STANDARD_MARGIN_MM} mm print-safe margin.
              Edge-to-edge uses the full sheet for a borderless print.
            </p>

            <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-8">
              <SheetPreview size="eu" edge={false} label="8 × 35×45 mm" />
              <SheetPreview size="us" edge={false} label="2 × 2×2 in (standard)" />
              <SheetPreview size="us" edge={true} label="6 × 2×2 in (edge-to-edge)" />
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 font-bold">Photo size</th>
                    <th className="px-4 py-3 font-bold">Used for</th>
                    <th className="px-4 py-3 font-bold">Standard</th>
                    <th className="px-4 py-3 font-bold">Edge-to-edge</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {LAYOUTS.map((l) => (
                    <tr key={l.key}>
                      <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">{l.label}</td>
                      <td className="px-4 py-3">{l.usedFor}</td>
                      <td className="px-4 py-3 font-bold text-lime-700 whitespace-nowrap">{l.standard.max} photos</td>
                      <td className="px-4 py-3 font-bold text-lime-700 whitespace-nowrap">{l.edge.max} photos</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              Need more copies on one sheet? Use{" "}
              <Link href="/passport-photo-a4-print-template" className="text-lime-700 underline">
                A4 paper
              </Link>{" "}
              instead.
            </p>
          </div>
        </div>

        {/* How-to + SEO Content */}
        <div className="bg-slate-50 py-12 sm:py-16 border-t border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 prose prose-slate">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              How to Use the Free Passport Photo Template 4x6
            </h2>
            <ol>
              <li>
                <strong>Upload your passport photo.</strong> Use a photo that
                is already cropped to the official size. If it isn&apos;t,
                format it first with our{" "}
                <Link href="/passport-photo-online">passport photo online tool</Link>.
              </li>
              <li>
                <strong>Pick the photo size.</strong> Choose 2×2 inch for the
                US, 35×45 mm for the UK, Europe, India and Australia, or one
                of the other sizes. The sheet fills automatically. Need a US
                photo first? Create one with this{" "}
                <a href="https://idphoto.us/tool/2x2-photo-maker" target="_blank" rel="noopener">
                  2x2 photo maker
                </a>
                , or confirm the{" "}
                <a href="https://idphoto.us/tool/schengen-visa-photo-size" target="_blank" rel="noopener">
                  Schengen visa photo size
                </a>{" "}
                before printing for a European visa.
              </li>
              <li>
                <strong>Choose the layout.</strong> Keep the print-safe margin
                for home printers, or tick &quot;No margin&quot; to fit 6 US
                photos on a borderless print.
              </li>
              <li>
                <strong>Download, print and cut.</strong> Save the 300 DPI JPG
                or PDF, print at 100% scale on 4x6 photo paper, then cut along
                the thin black crop lines.
              </li>
            </ol>

            <h2>A Free Passport Photos Template for Printing</h2>
            <p>
              Most passport photos template files you find online are fixed
              images or editable Canva and Photoshop documents that you have
              to resize by hand. This is a passport size photo print template
              that builds itself: upload one photo and you get a printable
              passport photo sheet at the exact official size, ready for any
              4x6 print. It&apos;s the quickest template for printing passport
              size photos at home or at a store, and it&apos;s completely free.
            </p>

            <h2>4x6, 6x4 and 4R Passport Photo Template: Same Paper</h2>
            <p>
              Searching for a 6x4 passport photo template or a 4R passport
              photo template? They are the same sheet. 4R is the name for a
              4 × 6 inch print (about 10 × 15 cm) in Asia and Australia, and
              6x4 is the same print in landscape. The template you download
              here works for any 4x6, 6x4 or 4R print order.
            </p>

            <h2>Print Your 4x6 Passport Template at CVS, Walgreens or Home</h2>
            <p>
              A 4x6 print is one of the cheapest photo products at any
              pharmacy or photo lab. That makes a 4x6 passport template the
              lowest-cost way to get physical passport photos.
            </p>
            <ul>
              <li>
                <strong>CVS or Walgreens:</strong> upload the JPG to their
                photo website or app and order a standard 4x6 print. Choose
                the option that keeps the full image instead of cropping it,
                so the photos stay at their exact size.
              </li>
              <li>
                <strong>Local photo lab:</strong> ask for a 4x6 or 4R print
                at actual size, with no borders added.
              </li>
              <li>
                <strong>Home printer:</strong> print the PDF on 4x6 glossy or
                matte photo paper at 100% / actual size, with &quot;fit to
                page&quot; turned off.
              </li>
            </ul>

            <h2>A Faster Alternative to Canva, Photoshop and Lightroom Templates</h2>
            <p>
              A Canva passport photo template, a 6x4 passport photo template
              in Photoshop or a Lightroom passport photo print template all
              need manual setup: canvas size, 300 DPI resolution, exact photo
              dimensions and even spacing. A small mistake there leads to
              photos that are the wrong size and get rejected. This passport
              photo sheet maker builds the 4x6 layout at the correct size in
              your browser, with nothing to install.
            </p>

            <h2>Tips for an Accepted Passport Photo Print</h2>
            <ul>
              <li>Use real photo paper. Plain printer paper is usually rejected.</li>
              <li>Check the printed size with a ruler before cutting.</li>
              <li>Keep colours natural, with no filters or heavy editing.</li>
              <li>Cut carefully along the crop lines and don&apos;t trim into the photo.</li>
              <li>
                Not sure your photo meets the rules? Run it through the{" "}
                <Link href="/passport-photo-checker">passport photo checker</Link>{" "}
                before printing.
              </li>
            </ul>

            <h2>More Free Passport Photo Printing Templates</h2>
            <p>
              Need a different sheet? The full{" "}
              <Link href="/passport-photo-print-template-generator">
                passport photo print template generator
              </Link>{" "}
              also creates passport photo sheets on A4, Letter and 5x7 paper,
              which fit more copies per print.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white py-14 sm:py-20 border-t border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">
              4x6 Passport Photo Template FAQ
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-xl p-5"
                >
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
            { href: "/passport-photo-print-template-generator", label: "Passport Photo Print Template (A4 / Letter)" },
            { href: "/passport-size-photo-maker", label: "Passport Size Photo Maker" },
            { href: "/in/photo-passport-size-converter", label: "Photo Passport Size Converter" },
            { href: "/passport-photo-online", label: "Passport Photo Online" },
            { href: "/passport-photo-checker", label: "Passport Photo Checker" },
            { href: "/uk-passport-size-photo-maker", label: "UK Passport Size Photo Maker" },
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
