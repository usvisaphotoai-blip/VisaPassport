import { Metadata } from "next";
import Link from "next/link";
import {
  PAPER_SIZES,
  PHOTO_SIZES,
  DEFAULT_MARGIN_MM,
  computeLayout,
} from "../passport-photo-print-template-generator/sheet-layout";

const PAGE_URL = "https://www.pixpassport.com/passport-photo-a4-print-template";
const GENERATOR_HREF = "/passport-photo-print-template-generator?paper=A4";
const OG_IMAGE =
  "https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679205/MakePassportPhoto_ph2uog_ryefxt.webp";
const TITLE = "Passport Size Photo Template A4 – Free PDF & Print Sheet";
const DESCRIPTION =
  "Free A4 passport size photo template (210 × 297 mm). 32 photos at 35×45 mm or 15 at 2×2 inch, with crop marks. Download the PDF or make a ready-to-print A4 sheet from your photo.";

const A4 = PAPER_SIZES.A4;

const PDFS = [
  {
    href: "/templates/a4-passport-photo-template-35x45mm.pdf",
    title: "35 × 45 mm template",
    detail: "UK, EU / Schengen, India, Australia, Nepal",
    count: computeLayout(A4, PHOTO_SIZES["35x45"], DEFAULT_MARGIN_MM, 0).max,
  },
  {
    href: "/templates/a4-passport-photo-template-2x2in.pdf",
    title: "2 × 2 inch template",
    detail: "US passport & visa, India OCI",
    count: computeLayout(A4, PHOTO_SIZES["2x2"], DEFAULT_MARGIN_MM, 0).max,
  },
];

// Same maths and defaults as the generator, so these numbers always match its output
const LAYOUTS = Object.entries(PHOTO_SIZES).map(([key, photo]) => {
  const standard = computeLayout(A4, photo, DEFAULT_MARGIN_MM, 0);
  const noMargin = computeLayout(A4, photo, 0, 0);
  return { key, photo, standard, noMargin };
});

const eu = LAYOUTS.find((l) => l.key === "35x45")!;
const us = LAYOUTS.find((l) => l.key === "2x2")!;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "passport size photo template a4",
    "print passport photo on a4 paper",
    "a4 passport photo template",
    "passport photo a4 sheet",
    "how many passport photos on a4",
    "passport size photo a4 sheet pdf",
    "a4 passport photo template pdf",
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { en: PAGE_URL, "x-default": PAGE_URL },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: PAGE_URL,
    siteName: "PixPassport",
    locale: "en_US",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "A4 passport photo print template" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const STATS = [
  { value: "210×297", label: "A4 size in mm" },
  { value: `${eu.standard.max}`, label: "35×45 mm photos" },
  { value: `${us.standard.max}`, label: "2×2 inch photos" },
  { value: "Free", label: "PDF template" },
];

const steps = [
  {
    title: "Get a passport-sized photo",
    desc: "Start from a photo that is already cropped to your country's size. If it isn't, make one with our passport photo maker first. It sets the head size and background for you.",
  },
  {
    title: "Build the A4 sheet",
    desc: "Open the print generator on A4, upload the photo and pick the photo size. It fills the sheet with as many copies as fit, adds crop lines and keeps every photo at its exact size.",
  },
  {
    title: "Print at actual size",
    desc: "Load A4 photo paper, open the PDF and set the paper size to A4. Choose 100% or 'Actual size' and turn off 'Fit to page'. Check the result with a ruler before you cut.",
  },
  {
    title: "Cut along the crop lines",
    desc: "Use a paper trimmer or a sharp craft knife and a steel ruler. Cut along the outer lines so each photo keeps its full size, with no white border left on any side.",
  },
];

const faqs = [
  {
    q: "How many passport photos fit on A4 paper?",
    a: `With a ${DEFAULT_MARGIN_MM} mm print-safe margin, an A4 sheet (210 × 297 mm) fits ${eu.standard.max} photos at 35×45 mm (${eu.standard.cols} × ${eu.standard.rows}, landscape) and ${us.standard.max} US photos at 2×2 inch (${us.standard.cols} × ${us.standard.rows}). With no margin it fits ${eu.noMargin.max} and ${us.noMargin.max}, but most home printers can't print to the edge of A4.`,
  },
  {
    q: "What is the size of A4 paper?",
    a: "A4 is 210 × 297 mm, or about 8.27 × 11.69 inches. It is the standard paper size in the UK, Europe, India, Australia and most countries outside North America.",
  },
  {
    q: "How do I print a passport photo on A4 paper?",
    a: "Make an A4 sheet in our print generator, download it as a PDF and print it on A4 photo paper at 100% / 'Actual size' with 'Fit to page' turned off. Check that one photo measures exactly 35 × 45 mm (or 2 × 2 inch), then cut along the crop lines.",
  },
  {
    q: "Why are my printed passport photos the wrong size?",
    a: "The printer scaled the page. Most print dialogs default to 'Fit to page' or 'Shrink to printable area', which makes every photo slightly smaller. Select 100% or 'Actual size' and print again. Our PDF template includes a 50 mm ruler so you can check the scale.",
  },
  {
    q: "Can I print passport photos on plain A4 paper?",
    a: "For practice and checking the layout, yes. For an application, use glossy or matte photo paper. Many passport offices reject photos printed on plain office paper because they look faded or grainy.",
  },
  {
    q: "What is the free PDF template for?",
    a: "It shows the exact A4 grid with crop marks, so you can test your printer's scaling or place photos yourself in Word, Canva or another editor. To fill the sheet with your own photo automatically, use the print generator.",
  },
  {
    q: "Can I print the A4 sheet at a print shop?",
    a: "Yes. Take the PDF on a USB stick or email it, and ask for an A4 print at 100% scale on photo paper. Tell them not to resize or fit the image to the page.",
  },
  {
    q: "Is A4 better than a 4x6 photo print?",
    a: `A4 holds many more photos (${eu.standard.max} at 35×45 mm instead of 8 on 4x6), so it is cheaper per photo when you print at home or need copies for the whole family. A 4x6 print is better when you order from a photo lab or pharmacy, because 4x6 photo prints are cheap and come out at the right size.`,
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HowTo",
      name: "How to print passport photos on A4 paper",
      step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.desc })),
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
        { "@type": "ListItem", position: 2, name: "A4 Passport Photo Template", item: PAGE_URL },
      ],
    },
  ],
};

// A4 sheet drawn to scale in mm, using the generator's layout
function A4Preview({ photoKey, label }: { photoKey: string; label: string }) {
  const photo = PHOTO_SIZES[photoKey];
  const fit = computeLayout(A4, photo, DEFAULT_MARGIN_MM, 0);
  const x0 = (fit.sheetW - fit.cols * photo.width) / 2;
  const y0 = (fit.sheetH - fit.rows * photo.height) / 2;
  return (
    <figure className="flex flex-col items-center">
      <svg
        viewBox={`0 0 ${fit.sheetW} ${fit.sheetH}`}
        className={`${fit.orientation === "landscape" ? "w-56 sm:w-64" : "w-36 sm:w-44"} h-auto drop-shadow-sm`}
        role="img"
        aria-label={label}
      >
        <rect width={fit.sheetW} height={fit.sheetH} fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        {Array.from({ length: fit.rows }).flatMap((_, r) =>
          Array.from({ length: fit.cols }).map((_, c) => (
            <g key={`${r}-${c}`}>
              <rect
                x={x0 + c * photo.width}
                y={y0 + r * photo.height}
                width={photo.width}
                height={photo.height}
                fill="#ecfccb"
                stroke="#0f172a"
                strokeWidth="0.4"
              />
              <circle
                cx={x0 + c * photo.width + photo.width / 2}
                cy={y0 + r * photo.height + photo.height * 0.4}
                r={photo.width * 0.2}
                fill="#a3e635"
              />
            </g>
          )),
        )}
      </svg>
      <figcaption className="text-xs font-semibold text-slate-600 mt-2 text-center">{label}</figcaption>
    </figure>
  );
}

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export default function PassportPhotoA4TemplatePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="bg-slate-50 min-h-screen">
        {/* Hero */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-10 text-center">
          <nav aria-label="Breadcrumb" className="mb-3 sm:mb-4">
            <ol className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
              <li><Link href="/" className="hover:text-lime-700">Home</Link></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-slate-700 truncate">A4 Passport Photo Template</li>
            </ol>
          </nav>
          <h1 className="text-[26px] sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Passport Size Photo Template for A4 Paper
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-xl mx-auto">
            A ready A4 layout with {eu.standard.max} passport photos at 35×45 mm or {us.standard.max} at 2×2 inch.
            Download the free PDF template, or turn your own photo into a print-ready A4 sheet in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <Link
              href={GENERATOR_HREF}
              className="inline-flex items-center justify-center bg-amber-700 hover:bg-amber-800 text-white font-bold px-6 py-3 rounded-lg transition-colors"
            >
              Make my A4 photo sheet
            </Link>
            <a
              href="#download"
              className="inline-flex items-center justify-center gap-2 bg-white border border-slate-300 hover:border-lime-600 text-slate-800 font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              <DownloadIcon /> Free PDF template
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8">
            {STATS.map(({ value, label }) => (
              <div key={label} className="bg-white rounded-xl px-3 py-3 sm:py-4 border border-slate-100 text-center">
                <p className="text-xl sm:text-2xl font-black text-lime-700 leading-none">{value}</p>
                <p className="text-xs text-slate-500 font-medium mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Layout */}
        <div className="bg-white py-12 sm:py-16 border-t border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4 text-center">
              How Many Passport Photos Fit on A4 Paper?
            </h2>
            <p className="text-slate-600 text-center mb-8">
              A4 paper is <strong>210 × 297 mm</strong> (8.27 × 11.69 in). The standard layout keeps a{" "}
              {DEFAULT_MARGIN_MM} mm margin on every side, because most home printers can&apos;t print to the
              edge. The sheet turns to landscape when that fits more photos.
            </p>

            <div className="flex flex-wrap items-end justify-center gap-8 sm:gap-12 mb-8">
              <A4Preview photoKey="35x45" label={`${eu.standard.max} × 35×45 mm (${eu.standard.cols} × ${eu.standard.rows})`} />
              <A4Preview photoKey="2x2" label={`${us.standard.max} × 2×2 in (${us.standard.cols} × ${us.standard.rows})`} />
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 font-bold">Photo size</th>
                    <th className="px-4 py-3 font-bold">Used for</th>
                    <th className="px-4 py-3 font-bold">With {DEFAULT_MARGIN_MM} mm margin</th>
                    <th className="px-4 py-3 font-bold">No margin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {LAYOUTS.map((l) => (
                    <tr key={l.key}>
                      <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">{l.photo.name}</td>
                      <td className="px-4 py-3">{l.photo.detail}</td>
                      <td className="px-4 py-3 font-bold text-lime-700 whitespace-nowrap">
                        {l.standard.max} ({l.standard.cols} × {l.standard.rows})
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">{l.noMargin.max}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              Printing at a photo lab instead? Use our{" "}
              <Link href="/passport-photo-template-4x6" className="text-lime-700 underline">4x6 passport photo template</Link>.
            </p>
          </div>
        </div>

        {/* Download */}
        <div id="download" className="bg-slate-50 py-12 sm:py-16 border-t border-slate-200 scroll-mt-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4 text-center">
              Download the Free A4 Passport Photo Template (PDF)
            </h2>
            <p className="text-slate-600 text-center mb-8">
              Blank A4 grids with crop marks, a head-position guide in every cell and a 50 mm ruler to check your
              printer&apos;s scale. Use them to test your printer, or to place photos yourself in Word or Canva.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {PDFS.map((p) => (
                <a
                  key={p.href}
                  href={p.href}
                  download
                  className="group flex items-start gap-4 bg-white rounded-xl border border-slate-200 hover:border-lime-600 p-5 transition-colors"
                >
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-lime-100 text-lime-800 flex items-center justify-center">
                    <DownloadIcon />
                  </span>
                  <span>
                    <span className="block font-bold text-slate-900 group-hover:text-lime-700">{p.title}</span>
                    <span className="block text-sm text-slate-600">{p.count} photos on A4 · {p.detail}</span>
                    <span className="block text-xs text-slate-400 mt-1">PDF · A4 · free</span>
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-slate-900 text-white p-6 sm:p-8 text-center">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Want the sheet filled with your photo?</h3>
              <p className="text-slate-300 mb-5 max-w-lg mx-auto">
                Upload one photo and the print generator fills an A4 sheet with exact-size copies and crop lines.
                Download it as PDF, JPG or PNG.
              </p>
              <Link
                href={GENERATOR_HREF}
                className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-6 py-3 rounded-lg transition-colors"
              >
                Open the A4 print generator
              </Link>
            </div>
          </div>
        </div>

        {/* How to print */}
        <div className="bg-white py-12 sm:py-16 border-t border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-8 text-center">
              How to Print Passport Photos on A4 Paper
            </h2>
            <ol className="space-y-6">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-lime-700 text-white font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{s.title}</h3>
                    <p className="text-slate-600">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-5">
              <h3 className="font-bold text-slate-900 mb-2">Printer settings that matter</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                <li>Paper size: <strong>A4</strong> (not Letter, which is shorter and wider)</li>
                <li>Scale: <strong>100% / Actual size</strong>. Turn off &quot;Fit to page&quot; and &quot;Shrink oversized pages&quot;</li>
                <li>Paper type: <strong>Photo paper</strong> (glossy or matte) for the best colours</li>
                <li>Quality: <strong>Best / High</strong></li>
                <li>Borderless printing: <strong>off</strong>. The template already keeps a safe margin</li>
              </ul>
            </div>

            <p className="text-slate-600 mt-8">
              Need the photo itself first? Make a compliant photo with our{" "}
              <Link href="/passport-size-photo-maker" className="text-lime-700 underline">passport size photo maker</Link>, then
              come back to print it. For more printing tips, read{" "}
              <Link href="/how-to-print-passport-photos" className="text-lime-700 underline">how to print passport photos</Link>.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-slate-50 py-12 sm:py-16 border-t border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-8 text-center">
              A4 Passport Photo Template FAQ
            </h2>
            <div className="space-y-3">
              {faqs.map((f) => (
                <details key={f.q} className="group bg-white rounded-xl border border-slate-200 p-5">
                  <summary className="cursor-pointer font-bold text-slate-900 list-none flex justify-between gap-4">
                    {f.q}
                    <span className="text-lime-700 group-open:rotate-45 transition-transform" aria-hidden>+</span>
                  </summary>
                  <p className="text-slate-600 mt-3">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
