import type { Metadata } from "next";
import Link from "next/link";
import { getAllCAPages } from "@/lib/ca-content";
import CAEmbeddedTool from "./components/CAEmbeddedTool";
import CABeforeAfterSlider from "./components/CABeforeAfterSlider";
import { getLocalPrice } from "@/lib/currency";

/* ------------------------------------------------------------------ */
/*  SEO                                                                */
/*  Intent:    transactional / tool hub. The informational             */
/*             "requirements" intent belongs to                        */
/*             /ca/canada-passport-photo-requirements.                 */
/*  Primary:   canada passport photo online                            */
/*  Secondary: canadian passport photo maker / checker / app,          */
/*             canada passport photo at home                           */
/* ------------------------------------------------------------------ */
const PAGE_UPDATED_ISO = "2026-11-24";
const PAGE_UPDATED_LABEL = "November 2026";

export const metadata: Metadata = {
  title: "Canada Passport Photo Online: Checker & Maker | PixPassport",
  description:
    "Check a Canada passport photo online before the studio or an upload. 50x70 mm specs, online renewal rules, and visa, PR card and citizenship guides.",
  alternates: {
    canonical: "https://www.pixpassport.com/ca",
    languages: {
      "en-CA": "https://www.pixpassport.com/ca",
      en: "https://www.pixpassport.com/ca",
      "x-default": "https://www.pixpassport.com/ca",
    },
  },
  keywords:
    "canada passport photo online, canadian passport photo maker, canada passport photo checker, canada passport photo app, canada passport photo at home, canada passport photo size 50x70mm",
  twitter: {
    card: "summary_large_image",
    title: "Canada Passport Photo Online: Checker & Maker | PixPassport",
    description:
      "Check your Canada passport photo online before the studio or an online renewal upload.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
  },
  openGraph: {
    title: "Canada Passport Photo Online: Checker & Maker | PixPassport",
    description:
      "Check framing, head size (31–36 mm) and background for a 50x70 mm Canada passport photo online, then find the right guide for passport, visa, PR card or citizenship.",
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
    digital: "1,200 × 1,800 px to 3,000 × 4,500 px, 3:2 portrait",
    visa: "Frame at least 35 × 45 mm",
  },
  {
    item: "Who takes it",
    passport: "Commercial photographer or studio, in person",
    digital: "Commercial photographer, in person (no selfies or scans)",
    visa: "Follow your application checklist",
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
    digital: "JPG, 200 KB – 5 MB, original file from the photographer",
    visa: "Print on quality photo paper",
  },
  {
    item: "Back of photo",
    passport: "Studio name, address and date taken (one photo)",
    digital: "Studio name, address and date entered in the form",
    visa: "As your application checklist asks",
  },
];

/* Which Canada photo do you need? (hub router to the guides) */
const photoTypes = [
  {
    name: "Canadian passport (mail or in person)",
    size: "50 × 70 mm print, head 31–36 mm",
    who: "Commercial photographer, 2 identical prints, stamp or details on the back",
    href: "/ca/canada-passport-photo-requirements",
    cta: "Passport photo requirements",
    external: false,
  },
  {
    name: "Passport online renewal (adults)",
    size: "JPEG, 1,200 × 1,800 px or more, head 45–50% of height",
    who: "Digital file from a commercial photographer, not a selfie or a scan",
    href: "/ca/canada-passport-photo-requirements",
    cta: "Online renewal photo rules",
    external: false,
  },
  {
    name: "Visa, study or work permit (IRCC)",
    size: "Frame at least 35 × 45 mm, head 31–36 mm",
    who: "Follow the photo instructions in your application checklist",
    href: "/ca/canada-visa-photo-requirements",
    cta: "Canada visa photo guide",
    external: false,
  },
  {
    name: "PR card",
    size: "50 × 70 mm print, or 715 × 1000 to 2000 × 2800 px online",
    who: "Commercial photographer; online uploads accept a scan of the professional print",
    href: "/ca/canada-pr-card-photo-requirements",
    cta: "PR card photo guide",
    external: false,
  },
  {
    name: "Citizenship (online grant)",
    size: "50 × 70 mm, at least 420 × 540 px, max 4 MB",
    who: "Commercial photographer; a digital file straight from them is safest",
    href: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/citizenship-application-photograph-specifications/grant-online.html",
    cta: "Official citizenship photo specs",
    external: true,
  },
];

const canDo = [
  "Practise at home: check framing, head size, centring and background before you book a studio.",
  "Check a photographer's digital file for head size, centring and background before you upload the original.",
  "See your photo laid out at 50 × 70 mm, or at 35 × 45 mm for IRCC visa and permit forms.",
  "Prepare photos for applications whose checklist lets you supply your own photo.",
];

const cantDo = [
  "Replace the commercial photographer the Passport Program, PR card and citizenship rules ask for.",
  "Make an edited photo acceptable for a passport: cropping, background changes and AI edits are all rejected.",
  "Guarantee approval. Only the government office reviewing your file decides.",
];

const renewOnline = [
  "You got your current passport at age 16 or older.",
  "It is a standard blue 5- or 10-year passport issued in the last 15 years.",
  "It expires within 6 months or has already expired.",
  "Your home and mailing address are in Canada.",
  "Your name, date and place of birth and gender identifier are unchanged.",
  "You are not travelling in the next 20 business days.",
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
    title: "Fix it, then submit the right way",
    text: "Retake if needed, then go to a studio for passport, PR card or citizenship photos.",
    img: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1786118129/final_result_vzs9an.jpg",
    alt: "Checked photo layout ready to compare with the studio photo",
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
    q: "Can I take my own Canada passport photo at home or with an app?",
    a: "Not for the photo you submit. The Passport Program says passport photos, printed or digital, must be taken in person by a commercial photographer or studio, and it rejects photos edited in any way, including cropping, background changes and AI tools. Use PixPassport at home to practise the framing and check your shot, then have the final photo taken by a studio.",
  },
  {
    q: "Can I renew my Canadian passport online with a digital photo?",
    a: "Yes, if you are eligible. Online renewal is open to eligible adults whose home and mailing address are in Canada and whose passport expires within 6 months or has expired. The digital photo must still be taken in person by a commercial photographer within the last 6 months, and it cannot be a scan of a printed photo. It must be a JPEG in a 3:2 portrait ratio, 1,200 × 1,800 to 3,000 × 4,500 pixels, 200 KB to 5 MB, with your head 45–50% of the photo height.",
  },
  {
    q: "What does the PixPassport Canada photo tool do?",
    a: "It checks a photo against Canada's size, head-height and background rules and shows it laid out at 50 × 70 mm or 35 × 45 mm. Use it to practise before a studio visit, to check the framing of a photographer's digital file before you upload the original, or for applications whose checklist lets you supply your own photo. It cannot replace a commercial photographer where one is required, and no tool can guarantee approval.",
  },
  {
    q: "What photo do I need for a Canada visa?",
    a: "For a temporary resident visa, IRCC asks for two identical photos taken in the last 6 months, on a plain white or light-coloured background. The frame should be at least 35 × 45 mm, with the head measuring 31–36 mm from chin to crown. Requirements can differ by application type, so check the form you are filling in.",
  },
  {
    q: "Does the passport photo have to be printed?",
    a: "For in-person and mail applications, yes: two identical, professionally printed photos on plain, high-quality photo paper, with the studio's name, address and the date taken on the back of one. Home printing is not accepted. A digital photo is only needed if you renew your passport online, and Canada.ca suggests asking the studio for both.",
  },
  {
    q: "What photo do I need for a PR card or citizenship?",
    a: "Both use a 50 × 70 mm photo with a 31–36 mm head, taken by a commercial photographer. For an online PR card application you upload one photo between 715 × 1000 and 2000 × 2800 pixels, up to 4 MB, and a scan of the professional print is accepted. For an online citizenship grant, the photo must be at least 420 × 540 pixels, up to 4 MB, and taken no more than 6 months before you apply.",
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
    badge: "Passport Program",
    title: "Renew a passport online",
    url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/renew-adult-passport/submit-form-fees/renew-online.html",
    note: "Who can renew online and the digital photo needed.",
  },
  {
    badge: "IRCC",
    title: "Permanent resident card photos",
    url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/permanent-residents/card/photos.html",
    note: "Print and upload rules for PR card applications.",
  },
  {
    badge: "IRCC",
    title: "Citizenship grant online photo specs",
    url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/citizenship-application-photograph-specifications/grant-online.html",
    note: "Digital photo rules for online citizenship applications.",
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
export default async function CAIndexPage() {
  // Static page: force CAD so the schema price matches what Canadian visitors are charged
  const cadPrice = await getLocalPrice(6.99, "CAD", false, true);
  const pages = getAllCAPages();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Canada Passport Photo Online: Checker & Maker",
      url: "https://www.pixpassport.com/ca",
      inLanguage: "en-CA",
      dateModified: PAGE_UPDATED_ISO,
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "PixPassport Canada Passport Photo Tool",
      url: "https://www.pixpassport.com/ca",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: cadPrice.amount.toFixed(2), priceCurrency: cadPrice.currency },
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
                Check your Canada passport photo online, before the studio or the upload
              </h1>
              <p className="mt-3 text-sm text-slate-500">
                Updated <time dateTime={PAGE_UPDATED_ISO}>{PAGE_UPDATED_LABEL}</time> · Checked
                against Canada.ca photo pages
              </p>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Canada uses a taller 50×70 mm photo than most countries. Take a practice shot at
                home with your phone and see whether the framing, head size and background are on
                track, or check a photographer&apos;s digital file before you renew online. Then
                pick the right guide for a passport, visa, PR card or citizenship photo.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href="#ca-tool"
                  className="inline-flex items-center justify-center rounded-lg bg-red-700 px-6 py-3 text-base font-bold text-white shadow-sm hover:bg-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2 transition-colors"
                >
                  Check my photo
                </a>
                <a
                  href="#which-photo"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-bold text-slate-800 hover:border-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 transition-colors"
                >
                  Which photo do I need?
                </a>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                <a href="#specs" className="underline underline-offset-4 hover:text-slate-900">
                  See all photo specifications
                </a>
              </p>

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
            The Passport Program requires photos taken in person by a commercial photographer,
            for printed photos and for the digital photo used in online renewal. It does not
            accept edited photos, including cropping, background changes or AI tools. Use this
            page to learn the specs and check your framing, then have the final photo taken by
            a studio.{" "}
            <Link href="/ca/canada-passport-photo-requirements" className="font-bold underline">
              Read the full requirements
            </Link>
          </p>
        </div>
      </section>

      {/* ───────── TOOL ───────── */}
      <section id="ca-tool" className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-8 scroll-mt-6">
        <CAEmbeddedTool />
        <p className="mt-3 text-center text-sm text-slate-600">
          Need a photo for another country or document?{" "}
          <Link href="/passport-photo-online" className="font-bold text-red-700 underline underline-offset-4 hover:text-red-800">
            Open the full passport photo tool
          </Link>
        </p>
      </section>

      {/* ───────── WHICH PHOTO (HUB ROUTER) ───────── */}
      <section id="which-photo" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-6">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          Which Canada photo do you need?
        </h2>
        <p className="mt-2 text-slate-600 max-w-2xl">
          Canada has different photo rules for passports, online renewal, IRCC visas, PR cards
          and citizenship. Find your application, then open the guide for the full rules.
        </p>
        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {photoTypes.map((t) => (
            <li key={t.name} className="flex flex-col justify-between rounded-xl border border-stone-200 bg-white p-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">{t.name}</h3>
                <p className="mt-1 text-sm font-semibold text-slate-800">{t.size}</p>
                <p className="mt-1 text-sm text-slate-600">{t.who}</p>
              </div>
              {t.external ? (
                <a
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-sm font-bold text-red-700 underline underline-offset-4 hover:text-red-800"
                >
                  {t.cta} (Canada.ca)
                </a>
              ) : (
                <Link
                  href={t.href}
                  className="mt-4 text-sm font-bold text-red-700 underline underline-offset-4 hover:text-red-800"
                >
                  {t.cta}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* ───────── WHAT THE TOOL CAN AND CAN'T DO ───────── */}
      <section className="border-t border-stone-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Canada passport photo at home: what an online checker can and can&apos;t do
          </h2>
          <p className="mt-2 text-slate-600 max-w-2xl">
            Most passport photo apps say you can do everything from home. For Canadian
            passports, PR cards and citizenship, the official rules say otherwise, so here is
            where our tool helps.
          </p>
          <div className="mt-6 grid md:grid-cols-2 gap-5">
            <div className="rounded-xl border border-stone-200 bg-white p-5">
              <h3 className="text-lg font-bold text-slate-900">Use it to</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {canDo.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span aria-hidden="true" className="font-bold text-emerald-700">✓</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-stone-200 bg-white p-5">
              <h3 className="text-lg font-bold text-slate-900">It can&apos;t</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {cantDo.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span aria-hidden="true" className="font-bold text-red-700">✕</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Renewing your passport online in 2026
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Since July 2026, online renewal is open to all eligible adults. You can renew
                online if:
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-slate-700">
                {renewOnline.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Ask the studio for a digital copy and a printed copy. If online renewal does not
                work out, you can still apply by mail or in person with the prints.
              </p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-white p-5">
              <h3 className="text-lg font-bold text-slate-900">Digital photo checklist for online renewal</h3>
              <dl className="mt-3 space-y-3 text-sm">
                <div className="flex justify-between gap-4 border-b border-stone-200 pb-2">
                  <dt className="text-slate-600">Format</dt>
                  <dd className="font-bold text-slate-900 text-right">JPEG, original file</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-stone-200 pb-2">
                  <dt className="text-slate-600">Pixels</dt>
                  <dd className="font-bold text-slate-900 text-right">1,200 × 1,800 to 3,000 × 4,500</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-stone-200 pb-2">
                  <dt className="text-slate-600">File size</dt>
                  <dd className="font-bold text-slate-900 text-right">200 KB – 5 MB</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-stone-200 pb-2">
                  <dt className="text-slate-600">Head height</dt>
                  <dd className="font-bold text-slate-900 text-right">45–50% of photo height</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-600">Taken by</dt>
                  <dd className="font-bold text-slate-900 text-right">Commercial photographer, last 6 months</dd>
                </div>
              </dl>
              <a
                href="#ca-tool"
                className="mt-5 inline-flex items-center justify-center rounded-lg bg-red-700 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2 transition-colors"
              >
                Check my photo
              </a>
            </div>
          </div>
        </div>
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
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              <Link
                href="/ca/canada-visa-photo-requirements"
                className="inline-flex font-bold text-red-700 hover:text-red-800 underline underline-offset-4"
              >
                Canada visa photo guide
              </Link>
              <Link
                href="/ca/canada-pr-card-photo-requirements"
                className="inline-flex font-bold text-red-700 hover:text-red-800 underline underline-offset-4"
              >
                PR card photo guide
              </Link>
            </div>
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
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href="#ca-tool"
            className="inline-flex items-center justify-center rounded-lg bg-red-700 px-6 py-3 text-base font-bold text-white shadow-sm hover:bg-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2 transition-colors"
          >
            Check my Canada photo
          </a>
          <Link
            href="/passport-photo-online"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-bold text-slate-800 hover:border-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 transition-colors"
          >
            Open the full photo tool
          </Link>
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