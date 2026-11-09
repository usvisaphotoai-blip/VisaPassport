import type { Metadata } from "next";
import Link from "next/link";
import { getAllCAPages } from "@/lib/ca-content";
import CAEmbeddedTool from "./components/CAEmbeddedTool";
import CABeforeAfterSlider from "./components/CABeforeAfterSlider";

/* ------------------------------------------------------------------ */
/*  SEO                                                                */
/*  Primary:   canada passport photo                                   */
/*  Secondary: canada passport photo specification / specs,            */
/*             canada passport pic, photo for canada visa              */
/* ------------------------------------------------------------------ */
export const metadata: Metadata = {
  title: "Canada Passport Photo: 50x70 mm Specs & Online Tool | PixPassport",
  description:
    "Canada passport photo size, specifications and a free online checker. See the 50x70 mm rules, face-size range and what to know about a photo for a Canada visa.",
  alternates: {
    canonical: "https://www.pixpassport.com/ca",
    languages: {
      "en-CA": "https://www.pixpassport.com/ca",
      en: "https://www.pixpassport.com/ca",
      "x-default": "https://www.pixpassport.com/ca",
    },
  },
  keywords:
    "canada passport photo, canada passport photo specification, canada passport photo specs, canada passport pic, photo for canada visa, canada passport photo size 50x70mm",
  twitter: {
    card: "summary_large_image",
    title: "Canada Passport Photo: Size, Specs & Online Tool | PixPassport",
    description:
      "Check your Canada passport photo size and specs, or prepare a photo for a Canada visa.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
  },
  openGraph: {
    title: "Canada Passport Photo: Size, Specs & Online Tool | PixPassport",
    description:
      "Canada passport photo size (50x70 mm), specifications and a photo for Canada visa applications, explained in plain language.",
    url: "https://www.pixpassport.com/ca",
    siteName: "PixPassport Canada",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "https://www.pixpassport.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Canada passport photo size and specifications",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */
const quickFacts = [
  { value: "50 × 70 mm", label: "Passport photo size" },
  { value: "31–36 mm", label: "Chin to crown" },
  { value: "6 months", label: "Max age of photo" },
  { value: "2 photos", label: "Needed per application" },
];

const specRows = [
  {
    item: "Photo size",
    passport: "50 mm wide × 70 mm high",
    digital: "At least 1,200 × 1,800 px, 3:2 portrait",
    visa: "Frame at least 35 × 45 mm",
  },
  {
    item: "Face height (chin to crown)",
    passport: "31–36 mm",
    digital: "45–50% of photo height",
    visa: "31–36 mm",
  },
  {
    item: "Background",
    passport: "Plain white or light-coloured",
    digital: "Plain white or light-coloured",
    visa: "Plain white or light-coloured",
  },
  {
    item: "Colour",
    passport: "Colour or black and white",
    digital: "Colour or black and white",
    visa: "Colour or black and white",
  },
  {
    item: "How recent",
    passport: "Within 6 months of applying",
    digital: "Within 6 months of applying",
    visa: "Within 6 months of applying",
  },
  {
    item: "File / print",
    passport: "Professional print on photo paper",
    digital: "JPG, 200 KB – 5 MB, straight from the camera",
    visa: "Print on quality photo paper",
  },
];

const steps = [
  {
    title: "Upload a photo",
    text: "Use a clear, front-facing photo from any phone.",
    img: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1786116243/uk_before_image_passport_photo_d4sqnr.webp",
    alt: "Original selfie before it is checked",
  },
  {
    title: "We check face size and position",
    text: "The tool measures chin-to-crown height and centring.",
    img: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1786118128/passport_photo_biometric_check_truryq.webp",
    alt: "Face measurement overlay on a passport photo",
  },
  {
    title: "Get the 50×70 mm layout",
    text: "See your photo framed to Canada's size and head-height range.",
    img: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1786116374/uk_passport_photo_after_atvxmj.webp",
    alt: "Passport photo cropped to 50x70 mm",
  },
  {
    title: "Download or print",
    text: "Save a digital file or a print sheet for the lab.",
    img: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1786118129/final_result_vzs9an.jpg",
    alt: "Print-ready photo sheet",
  },
];

const doList = [
  "Face the camera squarely, shoulders level and centred.",
  "Keep a neutral expression: eyes open, mouth closed, no smile or frown.",
  "Use even light with no shadows on your face, ears, shoulders or the wall.",
  "Wear clothes that contrast with the background, so avoid white tops.",
  "Keep hair off your face so its edges are visible.",
  "Glasses are fine if your eyes are clear and there is no glare.",
];

const dontList = [
  "Sunglasses or tinted lenses, even prescription ones.",
  "Hats or head coverings, unless worn daily for religious or medical reasons.",
  "Shadows, flash reflections or red-eye.",
  "Hands in the shot (especially for children's photos).",
  "A tilted head or a face that is off-centre.",
  "Filters, retouching or AI edits.",
];

const faqs = [
  {
    q: "What is the Canada passport photo size?",
    a: "Canadian passport photos are 50 mm wide by 70 mm high (2 × 2¾ inches), which is taller than the common 35×45 mm format. The face must measure 31–36 mm from chin to crown.",
  },
  {
    q: "What are the Canada passport photo specifications?",
    a: "Beyond size, the photo must be sharp, evenly lit and shadow-free, with a plain white or light-coloured background, a neutral expression and your face centred and square to the camera. It must be no more than 6 months old, and you submit 2 identical copies.",
  },
  {
    q: "Can I take my own Canada passport pic at home?",
    a: "For a standard passport application, the Passport Program says the photo must be taken by a commercial photographer or studio and printed professionally. It also rejects photos that have been edited in any way, including cropping, background changes and AI tools. Use PixPassport to learn the framing and check your shot, then have the final photo taken by a studio.",
  },
  {
    q: "What photo do I need for a Canada visa?",
    a: "For a temporary resident visa, IRCC asks for two identical photos taken in the last 6 months, on a plain white or light-coloured background. The frame should be at least 35 × 45 mm, with the head measuring 31–36 mm from chin to crown. Requirements can differ by application type, so check the form you are filling in.",
  },
  {
    q: "Does the passport photo have to be printed?",
    a: "For in-person and mail applications, yes: two professionally printed photos on plain, high-quality photo paper. Home printing is not accepted. A digital photo is only needed if you renew your passport online.",
  },
  {
    q: "Can I wear glasses or a head covering?",
    a: "Non-tinted glasses are accepted if your eyes are clearly visible and there is no glare. Head coverings are accepted if worn daily for religious or medical reasons, as long as your full face is visible and the covering casts no shadows.",
  },
];

const officialSources = [
  {
    badge: "Passport Program",
    title: "Passport photo requirements",
    url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/photos.html",
    note: "Size, quality, expression and digital photo rules.",
  },
  {
    badge: "IRCC",
    title: "Temporary resident visa photo specifications",
    url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/temporary-resident-visa-application-photograph-specifications.html",
    note: "Photo size and head size for visa applications.",
  },
  {
    badge: "ICAO",
    title: "Doc 9303 travel document standard",
    url: "https://www.icao.int/publications/doc-series/doc-9303",
    note: "The international standard behind neutral expressions.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function CAIndexPage() {
  const pages = getAllCAPages();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "PixPassport Canada Passport Photo Tool",
      url: "https://www.pixpassport.com/ca",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "9.99", priceCurrency: "CAD" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.pixpassport.com/" },
        { "@type": "ListItem", position: 2, name: "Canada passport photo", item: "https://www.pixpassport.com/ca" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <div className="bg-stone-50 text-slate-800 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="h-1 bg-red-700 w-full" aria-hidden="true" />

      {/* ───────── HERO ───────── */}
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="flex-1 w-full">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
                Canada passport photo: size, specs and an online checker
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Canada uses a taller 50×70 mm photo than most countries. Upload yours to see
                whether the framing, face size and background are on track, or read the full
                Canada passport photo specifications below.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href="#ca-tool"
                  className="inline-flex items-center justify-center rounded-lg bg-red-700 px-6 py-3 text-base font-bold text-white shadow-sm hover:bg-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2 transition-colors"
                >
                  Check my photo
                </a>
                <a
                  href="#specs"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-bold text-slate-800 hover:border-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 transition-colors"
                >
                  See photo specifications
                </a>
              </div>

              <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 border-t border-stone-200 pt-6">
                {quickFacts.map((f) => (
                  <div key={f.label}>
                    <dt className="text-xs text-slate-500">{f.label}</dt>
                    <dd className="text-lg font-extrabold text-slate-900">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="w-full lg:w-auto flex justify-center">
              <CABeforeAfterSlider />
            </div>
          </div>
        </div>
      </section>

      {/* ───────── HONEST NOTICE ───────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div
          role="note"
          className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950 leading-relaxed"
        >
          <p className="font-bold">Applying for a Canadian passport? Read this first.</p>
          <p className="mt-1">
            The Passport Program requires photos taken in person by a commercial photographer
            and professionally printed. It does not accept edited photos, including cropping,
            background changes or AI tools. Use this page to learn the specs and check your
            framing, then have the final photo taken by a studio.{" "}
            <Link href="/ca/canada-passport-photo-requirements" className="font-bold underline">
              Read the full requirements
            </Link>
          </p>
        </div>
      </section>

      {/* ───────── TOOL ───────── */}
      <section id="ca-tool" className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-8 scroll-mt-6">
        <CAEmbeddedTool />
      </section>

      {/* ───────── HOW IT WORKS ───────── */}
      <section className="bg-white border-y border-stone-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            How the Canada passport pic tool works
          </h2>
          <p className="mt-2 text-slate-600 max-w-2xl">
            Four quick steps from a phone photo to a layout sized for Canada.
          </p>

          <ol className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((s, i) => (
              <li key={s.title} className="flex flex-col">
                <div className="relative aspect-[50/70] overflow-hidden rounded-lg bg-stone-100 border border-stone-200">
                  <img
                    src={s.img}
                    alt={s.alt}
                    width={500}
                    height={700}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-3 text-sm font-bold text-slate-900">
                  {i + 1}. {s.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600 leading-snug">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────── SPECS TABLE ───────── */}
      <section id="specs" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-6">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          Canada passport photo specifications
        </h2>
        <p className="mt-2 text-slate-600 max-w-2xl">
          The Canada passport photo specs at a glance, with the matching rules for online
          renewal and for a photo for a Canada visa.
        </p>

        <div className="mt-6 overflow-x-auto rounded-xl border border-stone-200 bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <caption className="sr-only">
              Canada passport, digital passport and visa photo specifications compared
            </caption>
            <thead className="bg-stone-100 text-slate-700">
              <tr>
                <th scope="col" className="px-4 py-3 font-bold">Spec</th>
                <th scope="col" className="px-4 py-3 font-bold">Passport (print)</th>
                <th scope="col" className="px-4 py-3 font-bold">Passport (online renewal)</th>
                <th scope="col" className="px-4 py-3 font-bold">Visa (TRV)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {specRows.map((r) => (
                <tr key={r.item}>
                  <th scope="row" className="px-4 py-3 font-semibold text-slate-900">{r.item}</th>
                  <td className="px-4 py-3 text-slate-700">{r.passport}</td>
                  <td className="px-4 py-3 text-slate-700">{r.digital}</td>
                  <td className="px-4 py-3 text-slate-700">{r.visa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Source: Passport Program and IRCC photo pages on Canada.ca. Rules for other
          applications (PR card, citizenship, permits) can differ, so always check the form
          you are using.
        </p>

        {/* Do / Don't */}
        <div className="mt-10 grid md:grid-cols-2 gap-5">
          <div className="rounded-xl border border-stone-200 bg-white p-5">
            <h3 className="text-lg font-bold text-slate-900">What a good Canada passport pic looks like</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {doList.map((t) => (
                <li key={t} className="flex gap-2">
                  <span aria-hidden="true" className="font-bold text-emerald-700">✓</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-5">
            <h3 className="text-lg font-bold text-slate-900">What gets photos rejected</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {dontList.map((t) => (
                <li key={t} className="flex gap-2">
                  <span aria-hidden="true" className="font-bold text-red-700">✕</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────── PHOTO FOR CANADA VISA ───────── */}
      <section className="bg-white border-y border-stone-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Photo for a Canada visa
            </h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              A visa photo is smaller than a passport photo. IRCC asks for two identical photos
              taken within the last six months, with a frame of at least 35 × 45 mm and a head
              measuring 31–36 mm from chin to crown.
            </p>
            <p className="mt-3 text-slate-600 leading-relaxed">
              Your face should sit in the middle of the frame, square to the camera, with the
              tops of your shoulders showing and a plain white or light background behind you.
              Digital photos must not be altered.
            </p>
            <Link
              href="/ca/canada-passport-photo-requirements"
              className="mt-5 inline-flex font-bold text-red-700 hover:text-red-800 underline underline-offset-4"
            >
              Visa and PR photo guide
            </Link>
          </div>
          <div className="rounded-xl bg-stone-50 border border-stone-200 p-5">
            <h3 className="text-lg font-bold text-slate-900">Passport vs visa photo</h3>
            <dl className="mt-3 space-y-3 text-sm">
              <div className="flex justify-between gap-4 border-b border-stone-200 pb-2">
                <dt className="text-slate-600">Passport</dt>
                <dd className="font-bold text-slate-900">50 × 70 mm</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-stone-200 pb-2">
                <dt className="text-slate-600">Visa (TRV)</dt>
                <dd className="font-bold text-slate-900">35 × 45 mm minimum</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-600">Head height (both)</dt>
                <dd className="font-bold text-slate-900">31–36 mm</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          Canada passport photo questions
        </h2>
        <div className="mt-6 divide-y divide-stone-200 rounded-xl border border-stone-200 bg-white">
          {faqs.map((f) => (
            <details key={f.q} className="group p-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 rounded">
                <span>{f.q}</span>
                <span aria-hidden="true" className="text-slate-400 transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ───────── OFFICIAL SOURCES ───────── */}
      <section className="bg-white border-y border-stone-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold text-slate-900">Where these rules come from</h2>
          <p className="mt-1 text-sm text-slate-600">
            Every spec on this page is taken from the official sources below.
          </p>
          <ul className="mt-5 grid sm:grid-cols-3 gap-3">
            {officialSources.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full rounded-xl border border-stone-200 p-4 hover:border-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 transition-colors"
                >
                  <span className="text-xs font-bold text-red-700">{s.badge}</span>
                  <span className="mt-1 block text-sm font-bold text-slate-900">{s.title}</span>
                  <span className="mt-1 block text-sm text-slate-600">{s.note}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── GUIDES ───────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">More Canada photo guides</h2>
        <p className="mt-1 text-sm text-slate-600">
          Passport, visa, PR card and citizenship photo rules explained step by step.
        </p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {pages.map((page) => (
            <Link
              key={page.slug}
              href={`/ca/${page.slug}`}
              className="group flex flex-col justify-between rounded-xl border border-stone-200 bg-white p-4 hover:border-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 transition-colors"
            >
              <div>
                <span className="text-xs font-semibold text-red-700">{page.category}</span>
                <h3 className="mt-1 text-sm font-bold text-slate-900 line-clamp-2">
                  {page.h1 || page.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600 line-clamp-2">{page.description}</p>
              </div>
              <span className="mt-4 text-xs font-semibold text-slate-500">
                {page.readingTime} read
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-sm">
          <Link href="/passport-photos" className="text-slate-600 underline underline-offset-4 hover:text-slate-900">
            Photo requirements for other countries
          </Link>
        </p>
      </section>
    </div>
  );
}