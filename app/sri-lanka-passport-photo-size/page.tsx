import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/app/components/FaqAccordion";

/*
 * KEYWORD MAP
 * Primary:   sri lanka passport photo size
 * Secondary: passport size photo size sri lanka · stamp size photo sri lanka
 *            · sri lanka passport photo size in cm / inches / pixels
 *
 * Intent: INFORMATIONAL. The visitor wants the number (and the stamp vs passport answer).
 * The editor at /sri-lanka-passport-photo-editor owns the "maker" intent; this page answers
 * the size questions and sends people there with a "make it now" button.
 *
 * FACT LEDGER (checked 2026-11-22). Every claim on the page maps to one of these:
 *   DEPT-7   immigration.gov.lk/pages_e.php?id=7
 *            - from 10 Aug 2015 digital photo only, via authorized studio; printed photos not accepted
 *            - studio sends photo online, gives Studio Acknowledgement Note
 *            - only photos taken within 6 months are valid
 *            - photos conform to ICAO standards
 *            - applications through overseas missions can be made without digital photo/fingerprints
 *   DEPT-49  immigration.gov.lk/pages_e.php?id=49
 *            - eyes clearly visible, no spectacles
 *            - caps/scarves allowed if forehead and ears visible, no scarf shadow on face
 *   DEPT-PDF immigration.gov.lk/content/files/passport/requirements_for_photo_studio.pdf
 *            - plain smooth blue backdrop; camera 1.2–2.5 m from applicant
 *            - soft, uniform light; avoid strong contrast, hot spots, reflections
 *   MISSION  stockholm.embassy.gov.lk/wp-content/uploads/2026/04/Photo-1.pdf
 *            - 3.5 × 4.5 cm; plain light background (white / light blue / light grey) contrasting with face
 *            - face (forehead edge to chin) 70–80% of the photo; spectacles not accepted
 *            - eyes open, no hair obscuring face/forehead/ears; neutral, centred; sharp focus; no other people/objects
 *   MISSION2 stockholm.embassy.gov.lk/wp-content/uploads/2020/11/Passport-Application-and-Check-List.pdf
 *            - Stockholm checklist asks for 3 coloured photos (number of prints varies by mission)
 *   AT       srilankaembassy.at/citizen-services/passport/issuance-of-new-passport/
 *            - uniform lighting, no shadows on face or behind, no red eye
 *   OMAN     oman.embassy.gov.lk/?p=261
 *            - ETA application made at the mission: two recent colour photos, 3.5 × 4.5 cm or 2 × 2 in
 *
 * CALCULATED (not printed by any authority, so labelled "calculated" on the page):
 *   inches (35/25.4, 45/25.4), pixels at 300 and 600 DPI, face height 70–80% × 45 mm = 31.5–36 mm,
 *   sheet layouts (8 on 4×6 in, 30 on A4, 25 on US Letter).
 *
 * NOT CLAIMED (no source found): any official "stamp size", file-size limits for passports,
 * paper type, cost, "mouth closed", "no edits".
 */
const SITE = "https://www.pixpassport.com";
const PAGE_URL = `${SITE}/sri-lanka-passport-photo-size`;
const EDITOR_HREF = "/sri-lanka-passport-photo-editor";
const VISA_EDITOR_HREF = "/sri-lanka-visa-photo-editor";
const TITLE = "Sri Lanka Passport Photo Size: 3.5×4.5 cm, mm, Inches, px";
const H1 = "Sri Lanka Passport Photo Size: 3.5 × 4.5 cm (35 × 45 mm)";
const DESCRIPTION =
  "Sri Lanka passport photo size is 3.5 × 4.5 cm (35 × 45 mm, 1.38 × 1.77 in, 413 × 531 px). Background, face size, glasses, stamp size and print layout.";
const DATE_PUBLISHED = "2026-11-22";
const DATE_MODIFIED = "2026-11-22";
const OG_IMAGE =
  "https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg";

const SOURCES = {
  general: "https://www.immigration.gov.lk/pages_e.php?id=7",
  studioInstructions: "https://www.immigration.gov.lk/pages_e.php?id=49",
  studioRequirements: "https://www.immigration.gov.lk/content/files/passport/requirements_for_photo_studio.pdf",
  missionSpecs: "https://stockholm.embassy.gov.lk/wp-content/uploads/2026/04/Photo-1.pdf",
  missionChecklist: "https://www.stockholm.embassy.gov.lk/wp-content/uploads/2020/11/Passport-Application-and-Check-List.pdf",
  missionAustria: "https://srilankaembassy.at/citizen-services/passport/issuance-of-new-passport/",
  missionEta: "https://oman.embassy.gov.lk/?p=261",
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "sri lanka passport photo size",
    "passport size photo size sri lanka",
    "stamp size photo sri lanka",
    "sri lanka passport photo size in cm",
    "sri lanka passport photo size in inches",
    "sri lanka passport photo size in pixels",
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { en: PAGE_URL, "x-default": PAGE_URL },
  },
  openGraph: {
    title: "Sri Lanka Passport Photo Size: 3.5 × 4.5 cm",
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "PixPassport",
    locale: "en_US",
    type: "article",
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Sri Lanka passport photo at 35 × 45 mm" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Lanka Passport Photo Size: 3.5 × 4.5 cm",
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

/* ───────────── Content ───────────── */

const specCards = [
  { label: "Millimetres", value: "35 × 45 mm", note: "Width × height" },
  { label: "Centimetres", value: "3.5 × 4.5 cm", note: "Passport size" },
  { label: "Inches", value: "1.38 × 1.77 in", note: "Rounded" },
  { label: "Pixels", value: "413 × 531 px", note: "At 300 DPI" },
];

const jumpLinks = [
  { href: "#size-table", label: "Size table" },
  { href: "#stamp-vs-passport", label: "Stamp vs passport" },
  { href: "#background", label: "Background" },
  { href: "#where-you-apply", label: "In Sri Lanka or abroad" },
  { href: "#requirements", label: "Other rules" },
  { href: "#how-to-take", label: "How to take it" },
  { href: "#print-layout", label: "Print layout" },
  { href: "#measure", label: "Check your photo" },
  { href: "#faq", label: "FAQ" },
];

const sizeRows = [
  { unit: "Millimetres", width: "35 mm", height: "45 mm" },
  { unit: "Centimetres", width: "3.5 cm", height: "4.5 cm" },
  { unit: "Inches", width: "1.38 in", height: "1.77 in" },
  { unit: "Pixels at 300 DPI", width: "413 px", height: "531 px" },
  { unit: "Pixels at 600 DPI", width: "827 px", height: "1063 px" },
];

const otherRules = [
  {
    title: "No glasses",
    desc: "The Department tells registered studios that the photo must show your eyes clearly without spectacles. Sri Lanka's missions also say spectacles are not accepted.",
  },
  {
    title: "Head coverings",
    desc: "Caps and scarves are allowed, but your forehead and ears must stay visible and the scarf must not cast a shadow on your face. Missions add that a head covering must not obscure the face.",
  },
  {
    title: "Taken in the last 6 months",
    desc: "For applications in Sri Lanka, only studio photos taken within the last 6 months are valid.",
  },
  {
    title: "Eyes open, looking straight",
    desc: "Missions ask for a straight-looking, centred photo with a neutral expression, eyes open and no hair covering your face, forehead or ears.",
  },
  {
    title: "Even lighting, no red eye",
    desc: "The Department asks studios for soft, uniform light without hot spots or reflections. One mission adds no shadows on your face or behind you, and no red eye.",
  },
  {
    title: "Sharp, natural, nobody else",
    desc: "Missions ask for a sharp, clear photo with adequate brightness and contrast, and no other people or objects in the picture.",
  },
];

const takeSteps = [
  {
    title: "Lighting and distance",
    points: [
      "Stand or sit 1.2 to 2.5 metres from the camera. This is the range the Department gives its studios.",
      "Use soft, even light from the front. The Department asks for uniform light with no strong contrast, hot spots or reflections.",
      "Keep shadows off your face and off the wall behind you.",
    ],
  },
  {
    title: "Dress and head coverings",
    points: [
      "Show your forehead, ears and the edges of your face. Missions ask for no hair covering them.",
      "Take off glasses. Spectacles are not accepted.",
      "If you wear a cap or scarf, keep your forehead and ears visible and make sure it casts no shadow on your face.",
      "Pick clothes that contrast with the background. Missions ask for a background that contrasts with your face and dress.",
    ],
  },
  {
    title: "Pose and expression",
    points: [
      "Look straight at the camera with your head level, not tilted, and centred in the frame.",
      "Keep a neutral expression with your eyes open.",
      "Leave room for your shoulders and some space above your head so the photo can be cropped to 35 × 45 mm with your face at 70–80% of the height.",
    ],
  },
];

const faqs = [
  {
    q: "What is the passport size photo size in Sri Lanka?",
    a: "A Sri Lanka passport size photo is 3.5 cm wide and 4.5 cm high (35 × 45 mm). That is about 1.38 × 1.77 inches, or 413 × 531 pixels at 300 DPI (calculated). Sri Lanka's missions ask for your face to fill 70–80% of the photo.",
  },
  {
    q: "What is stamp size photo size in Sri Lanka?",
    a: "We found no official stamp size in the Department of Immigration and Emigration's pages or in the missions' photo rules. Those rules give a size only for the passport photo: 3.5 × 4.5 cm. If a form asks for a stamp size photo, look for a size in mm on the form and use that. Don't use a smaller print for a passport.",
  },
  {
    q: "What is the Sri Lanka passport photo size in pixels?",
    a: "Use 413 × 531 pixels, which is 35 × 45 mm at 300 DPI. At 600 DPI the same size is 827 × 1063 pixels. These are calculated from the printed size, not set by the Department. Both have the same 7:9 shape.",
  },
  {
    q: "Is passport size the same as 35 × 45 mm?",
    a: "Yes. Sri Lanka's missions ask for passport photos of 3.5 × 4.5 cm, which is 35 × 45 mm. That is also the printed size used for UK passports and Schengen visas.",
  },
  {
    q: "What background colour does a Sri Lanka passport photo need?",
    a: "A plain, light background that contrasts with your face and clothes. Sri Lanka's missions accept white, light blue or light grey. Studios registered with the Department of Immigration and Emigration use a plain, smooth blue backdrop.",
  },
  {
    q: "Can I give a printed photo with my passport application in Sri Lanka?",
    a: "No. Since 10 August 2015 the Department only accepts a digital photo sent online by an authorized studio, and printed photos are not accepted. The studio gives you an acknowledgement note to hand in with your application. The photo must have been taken within the last 6 months.",
  },
  {
    q: "I live outside Sri Lanka. What passport photo do I need?",
    a: "The Department says applications through Sri Lankan missions overseas can be made without the digital studio photo. Missions publish their own photo sheets, which ask for 3.5 × 4.5 cm on a plain light background. The number of prints varies by mission. For example, the Stockholm embassy's checklist asks for 3 coloured photos. Check your mission's checklist before you print.",
  },
  {
    q: "What photo size do I need for a Sri Lanka visa or ETA?",
    a: "It depends on how you apply. A Sri Lankan mission's ETA page lists two recent colour photos of 3.5 × 4.5 cm or 2 × 2 inches for applications made at the mission. For an online ETA, follow the instructions on eta.gov.lk, because the form tells you whether a photo is needed.",
  },
  {
    q: "Can I wear glasses in a Sri Lanka passport photo?",
    a: "No. The Department tells registered studios that the photo must show your eyes clearly without spectacles, and the missions' photo rules say spectacles are not accepted.",
  },
  {
    q: "Can I wear a scarf or cap in a Sri Lanka passport photo?",
    a: "Yes, if you ask for it. Your forehead and ears must stay clearly visible, and the scarf must not cast a shadow on your face. Missions also say a head covering must not obscure the face.",
  },
  {
    q: "Can I take my Sri Lanka passport photo at home?",
    a: "Not for an application in Sri Lanka, because the Department only accepts photos sent online by an authorized studio. For a mission application, follow your mission's photo sheet for size, background and face size, and check whether it accepts photos you prepared yourself.",
  },
  {
    q: "How recent must the photo be?",
    a: "For applications in Sri Lanka, only studio photos taken within the last 6 months are valid.",
  },
  {
    q: "How many passport size photos fit on a 4 × 6 inch print?",
    a: "Eight. A 4 × 6 inch (10 × 15 cm) print fits two rows of four 35 × 45 mm photos with small gaps for cutting. An A4 sheet fits up to 30. These are calculated from the photo size.",
  },
];

/* ───────────── Structured data ───────────── */

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "PixPassport",
      url: `${SITE}/`,
      logo: `${SITE}/logo.png`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      name: "PixPassport",
      url: `${SITE}/`,
      publisher: { "@id": `${SITE}/#organization` },
    },
    {
      "@type": "Article",
      "@id": `${PAGE_URL}#article`,
      headline: H1,
      description: DESCRIPTION,
      inLanguage: "en",
      datePublished: DATE_PUBLISHED,
      dateModified: DATE_MODIFIED,
      author: { "@id": `${SITE}/#organization` },
      publisher: { "@id": `${SITE}/#organization` },
      image: OG_IMAGE,
      mainEntityOfPage: PAGE_URL,
      isPartOf: { "@id": `${SITE}/#website` },
      citation: Object.values(SOURCES),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Sri Lanka Passport Photo", item: `${SITE}${EDITOR_HREF}` },
        { "@type": "ListItem", position: 3, name: "Photo Size", item: PAGE_URL },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

/* ───────────── Small pieces ───────────── */

function MakeItNow({ label = "Make my Sri Lanka photo now →" }: { label?: string }) {
  return (
    <Link
      href={EDITOR_HREF}
      className="inline-flex items-center justify-center bg-amber-700 hover:bg-amber-800 text-white text-sm font-bold px-6 py-3 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-700"
    >
      {label}
    </Link>
  );
}

/** 35 × 45 mm diagram drawn to scale (1 unit = 1 mm). Head band shows the 70–80% face zone. */
function SizeDiagram() {
  return (
    <svg viewBox="-14 -6 66 62" className="w-full max-w-[260px] h-auto" role="img" aria-labelledby="diagram-title">
      <title id="diagram-title">Sri Lanka passport photo, 35 mm wide by 45 mm high, face filling 70 to 80 percent</title>
      <rect x="0" y="0" width="35" height="45" rx="0.6" fill="#eef6ff" stroke="#0f172a" strokeWidth="0.5" />
      {/* head zone 31.5–36 mm, centred, starting ~4 mm from top */}
      <rect x="2" y="4" width="31" height="36" fill="none" stroke="#65a30d" strokeWidth="0.35" strokeDasharray="1 0.8" />
      <ellipse cx="17.5" cy="20" rx="9" ry="12" fill="#cbd5e1" />
      <path d="M4 45 C6 36 12 33 17.5 33 C23 33 29 36 31 45 Z" fill="#cbd5e1" />
      {/* width */}
      <line x1="0" y1="50" x2="35" y2="50" stroke="#475569" strokeWidth="0.3" />
      <line x1="0" y1="48.5" x2="0" y2="51.5" stroke="#475569" strokeWidth="0.3" />
      <line x1="35" y1="48.5" x2="35" y2="51.5" stroke="#475569" strokeWidth="0.3" />
      <text x="17.5" y="55" textAnchor="middle" fontSize="3.4" fill="#0f172a" fontWeight="700">
        35 mm (3.5 cm)
      </text>
      {/* height */}
      <line x1="-4" y1="0" x2="-4" y2="45" stroke="#475569" strokeWidth="0.3" />
      <line x1="-5.5" y1="0" x2="-2.5" y2="0" stroke="#475569" strokeWidth="0.3" />
      <line x1="-5.5" y1="45" x2="-2.5" y2="45" stroke="#475569" strokeWidth="0.3" />
      <text x="-7" y="22.5" textAnchor="middle" fontSize="3.4" fill="#0f172a" fontWeight="700" transform="rotate(-90 -7 22.5)">
        45 mm (4.5 cm)
      </text>
      <text x="38" y="6" fontSize="2.6" fill="#4d7c0f">face</text>
      <text x="38" y="9" fontSize="2.6" fill="#4d7c0f">70–80%</text>
    </svg>
  );
}

/** 4 × 6 in sheet (152 × 102 mm, landscape) with 8 photos at 35 × 45 mm, drawn to scale. */
function PrintLayout() {
  const gap = 3;
  const cols = 4;
  const rows = 2;
  const x0 = (152 - (cols * 35 + (cols - 1) * gap)) / 2;
  const y0 = (102 - (rows * 45 + (rows - 1) * gap)) / 2;
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push(
        <g key={`${r}-${c}`}>
          <rect x={x0 + c * (35 + gap)} y={y0 + r * (45 + gap)} width="35" height="45" fill="#eef6ff" stroke="#94a3b8" strokeWidth="0.4" />
          <ellipse cx={x0 + c * (35 + gap) + 17.5} cy={y0 + r * (45 + gap) + 20} rx="8" ry="11" fill="#cbd5e1" />
        </g>,
      );
    }
  }
  return (
    <svg viewBox="0 0 152 102" className="w-full max-w-md h-auto" role="img" aria-labelledby="layout-title">
      <title id="layout-title">Eight 35 by 45 mm passport photos on a 4 by 6 inch print</title>
      <rect x="0" y="0" width="152" height="102" fill="#ffffff" stroke="#0f172a" strokeWidth="0.6" />
      {cells}
    </svg>
  );
}

/* ───────────── Page ───────────── */

export default function SriLankaPassportPhotoSizePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      {/* ── BREADCRUMB ── */}
      <div className="border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3 bg-slate-50">
        <nav aria-label="Breadcrumb" className="max-w-5xl mx-auto">
          <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-slate-500 font-medium">
            <li><Link href="/" className="hover:text-lime-700">Home</Link></li>
            <li aria-hidden="true" className="text-slate-300">/</li>
            <li><Link href={EDITOR_HREF} className="hover:text-lime-700">Sri Lanka Passport Photo</Link></li>
            <li aria-hidden="true" className="text-slate-300">/</li>
            <li className="text-slate-900 font-semibold" aria-current="page">Photo Size</li>
          </ol>
        </nav>
      </div>

      {/* ── HERO + QUICK ANSWER ── */}
      <section aria-labelledby="page-title" className="bg-white pt-10 pb-10 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="inline-flex items-center gap-2 text-xs font-bold text-lime-800 bg-lime-50 border border-lime-200 px-3 py-1 rounded-full mb-4">
            <span aria-hidden="true">🇱🇰</span> Updated {new Date(`${DATE_MODIFIED}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}
          </p>
          <h1 id="page-title" className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl">
            {H1}
          </h1>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl">
                <strong>Quick answer:</strong> a Sri Lanka passport size photo is <strong>3.5 cm wide × 4.5 cm high</strong>{" "}
                (35 × 45 mm). That is <strong>1.38 × 1.77 inches</strong>, or <strong>413 × 531 pixels</strong> at 300 DPI.
                Sri Lanka&apos;s missions ask for your face to fill 70–80% of the photo, on a plain light background.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed max-w-2xl mt-3">
                Applying inside Sri Lanka, you don&apos;t hand in a print. A registered studio sends a digital photo to the
                Department.{" "}
                <a href="#where-you-apply" className="text-lime-800 font-semibold underline">See how it works in Sri Lanka and abroad</a>.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed max-w-2xl mt-3">
                &quot;Stamp size&quot; has no official size that we could find.{" "}
                <a href="#stamp-vs-passport" className="text-lime-800 font-semibold underline">See the difference</a>.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <MakeItNow />
                <a href="#size-table" className="text-sm font-semibold text-slate-700 underline hover:text-lime-800">
                  See all sizes
                </a>
              </div>
              <p className="text-xs text-slate-500 mt-3">Free preview. The editor crops to 35 × 45 mm and builds a print sheet.</p>
            </div>
            <div className="flex justify-center">
              <SizeDiagram />
            </div>
          </div>

          <dl className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {specCards.map((c) => (
              <div key={c.label} className="rounded-2xl border border-lime-200 bg-lime-50 p-4 sm:p-5">
                <dt className="text-xs font-semibold text-lime-800">{c.label}</dt>
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
                className="text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-lime-100 hover:text-lime-800 px-3.5 py-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-600"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* ── SIZE TABLE ── */}
      <section id="size-table" aria-labelledby="size-heading" className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="size-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
            Sri Lanka Passport Photo Size in mm, cm, Inches and Pixels
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
            The printed size is 35 × 45 mm. Every other row is the same photo written in a different unit, so use
            whichever your form or printer asks for.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Sri Lanka passport photo size in different units</caption>
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th scope="col" className="p-4 font-bold">Unit</th>
                  <th scope="col" className="p-4 font-bold">Width</th>
                  <th scope="col" className="p-4 font-bold">Height</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sizeRows.map((row, i) => (
                  <tr key={row.unit} className={i % 2 ? "bg-slate-50" : undefined}>
                    <th scope="row" className="p-4 font-semibold text-slate-900">{row.unit}</th>
                    <td className="p-4 text-slate-700">{row.width}</td>
                    <td className="p-4 text-slate-700">{row.height}</td>
                  </tr>
                ))}
                <tr className={sizeRows.length % 2 ? "bg-slate-50" : undefined}>
                  <th scope="row" className="p-4 font-semibold text-slate-900">Face (forehead edge to chin)</th>
                  <td className="p-4 text-slate-700" colSpan={2}>
                    70–80% of the photo. On a 45 mm tall photo that is about 31.5–36 mm (calculated)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-bold text-slate-900 text-base mt-8 mb-2">How we converted</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            The Department&apos;s own pages don&apos;t print the size in millimetres. The 3.5 × 4.5 cm size and the 70–80%
            face rule come from Sri Lanka&apos;s overseas missions. The inch and pixel figures are our calculations: divide
            millimetres by 25.4 for inches (35 ÷ 25.4 = 1.38 and 45 ÷ 25.4 = 1.77), then multiply inches by the DPI
            (1.378 × 300 = 413 px and 1.772 × 300 = 531 px). Measure in millimetres if you can, because the rounded inch
            figures are slightly off.
          </p>
        </div>
      </section>

      {/* ── STAMP VS PASSPORT ── */}
      <section id="stamp-vs-passport" aria-labelledby="stamp-heading" className="py-12 lg:py-16 bg-white border-b border-slate-200 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="stamp-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
            Stamp Size vs Passport Size Photo in Sri Lanka
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
            Some forms ask for a &quot;stamp size&quot; photo. In the Department of Immigration and Emigration&apos;s pages and
            the missions&apos; photo rules that we checked, the only size given for a passport photo is 3.5 × 4.5 cm.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Stamp size compared with passport size</caption>
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th scope="col" className="p-4 font-bold"></th>
                  <th scope="col" className="p-4 font-bold">Passport size</th>
                  <th scope="col" className="p-4 font-bold">Stamp size</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <th scope="row" className="p-4 font-semibold text-slate-900">Size</th>
                  <td className="p-4 text-slate-700">35 × 45 mm (3.5 × 4.5 cm)</td>
                  <td className="p-4 text-slate-700">No official size found</td>
                </tr>
                <tr className="bg-slate-50">
                  <th scope="row" className="p-4 font-semibold text-slate-900">Where the size is given</th>
                  <td className="p-4 text-slate-700">Sri Lanka&apos;s missions&apos; passport photo sheets</td>
                  <td className="p-4 text-slate-700">Only on a form that names it. Check the form</td>
                </tr>
                <tr>
                  <th scope="row" className="p-4 font-semibold text-slate-900">Use for a passport?</th>
                  <td className="p-4 text-slate-700 font-semibold">Yes</td>
                  <td className="p-4 text-rose-700 font-semibold">No. Missions ask for 3.5 × 4.5 cm</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-5 rounded-2xl border border-amber-200 bg-amber-50">
            <h3 className="font-bold text-slate-900 text-sm mb-1">If a form asks for a stamp size photo</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Look for a size in millimetres on the form or its instructions and print exactly that. If no size is given,
              ask the office that issued the form. Don&apos;t trim a passport photo down, because that cuts off part of
              your head.
            </p>
          </div>
        </div>
      </section>

      {/* ── BACKGROUND ── */}
      <section id="background" aria-labelledby="bg-heading" className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="bg-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
            Background Colour for a Sri Lanka Passport Photo
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
            The background must be plain, with nothing else in the picture, and it must contrast with your face and
            clothes.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="p-5 rounded-2xl border border-slate-200 bg-white">
              <h3 className="font-bold text-slate-900 text-base mb-2">Registered studios in Sri Lanka</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                The Department&apos;s studio requirements call for a <strong>plain, smooth blue backdrop</strong>. The
                studio takes care of this for you.
              </p>
            </div>
            <div className="p-5 rounded-2xl border border-slate-200 bg-white">
              <h3 className="font-bold text-slate-900 text-base mb-2">Sri Lankan missions abroad</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Missions ask for a <strong>plain light background: white, light blue or light grey</strong>, which must
                contrast with your face and dress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── IN SRI LANKA OR ABROAD ── */}
      <section id="where-you-apply" aria-labelledby="studio-heading" className="py-12 lg:py-16 bg-white border-b border-slate-200 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="studio-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
            In Sri Lanka or Abroad: How You Hand In the Photo
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 max-w-3xl">
            The passport photo size asked for by Sri Lanka&apos;s missions is 3.5 × 4.5 cm. What changes is how the photo
            reaches the office.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50">
              <h3 className="font-bold text-slate-900 text-base mb-2">Applying in Sri Lanka: no print</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Since 10 August 2015 the Department of Immigration and Emigration only accepts a{" "}
                <strong>digital photo sent online by an authorized studio</strong>. Printed photos are not accepted. The
                studio gives you an acknowledgement note, which you hand in with your application. Only photos taken
                within the last 6 months are valid.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50">
              <h3 className="font-bold text-slate-900 text-base mb-2">Sri Lankans abroad: check your mission</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                The Department says applications through overseas missions can be made without the digital studio photo.
                Missions publish their own photo sheets asking for <strong>3.5 × 4.5 cm</strong>, and the number of prints
                varies. The Stockholm embassy&apos;s checklist, for example, asks for 3 coloured photos. Make yours with
                our{" "}
                <Link href={EDITOR_HREF} className="text-lime-800 font-semibold underline">Sri Lanka passport photo editor</Link>.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50">
              <h3 className="font-bold text-slate-900 text-base mb-2">Visiting Sri Lanka: visa or ETA</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                A mission&apos;s ETA page lists two recent colour photos of 3.5 × 4.5 cm or 2 × 2 inches for applications
                made at the mission. For an online ETA, follow the instructions on eta.gov.lk. Our{" "}
                <Link href={VISA_EDITOR_HREF} className="text-lime-800 font-semibold underline">Sri Lanka visa photo editor</Link>{" "}
                makes the photo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── OTHER REQUIREMENTS ── */}
      <section id="requirements" aria-labelledby="req-heading" className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="req-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
            Sri Lanka Passport Photo Requirements Besides Size
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 max-w-3xl">
            These rules come from the Department of Immigration and Emigration and from Sri Lanka&apos;s missions. A photo
            can be the right size and still be rejected if it breaks one of them.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherRules.map((r) => (
              <div key={r.title} className="p-5 rounded-2xl border border-slate-200 bg-white">
                <h3 className="font-bold text-slate-900 text-sm mb-1">{r.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO TAKE ── */}
      <section id="how-to-take" aria-labelledby="take-heading" className="py-12 lg:py-16 bg-white border-b border-slate-200 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="take-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
            How to Take a Sri Lanka Passport Photo
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 max-w-3xl">
            Inside Sri Lanka an authorized studio takes the photo. These steps follow the Department&apos;s studio rules
            and the missions&apos; photo sheets, and they help if you are preparing a photo for a mission.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {takeSteps.map((s) => (
              <div key={s.title} className="p-6 rounded-2xl border border-slate-200 bg-slate-50">
                <h3 className="font-bold text-slate-900 text-base mb-3">{s.title}</h3>
                <ul className="space-y-2 text-sm text-slate-700 leading-relaxed list-disc pl-5">
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRINT LAYOUT ── */}
      <section id="print-layout" aria-labelledby="layout-heading" className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="layout-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
            Print Layout: How Many Passport Photos Fit on a Sheet
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <ul className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <li>
                  <strong>4 × 6 inch (10 × 15 cm) print:</strong> 8 photos, in two rows of four with small gaps for cutting.
                </li>
                <li>
                  <strong>A4 sheet</strong> (UK, Europe, Asia, Australia): up to 30 photos (5 across × 6 down).
                </li>
                <li>
                  <strong>US Letter sheet</strong> (US, Canada): up to 25 photos (5 across × 5 down).
                </li>
                <li>
                  <strong>Print at 100% scale.</strong> Turn off &quot;fit to page&quot; or the photos come out the wrong size.
                </li>
                <li>
                  <strong>Check the print for marks.</strong> Missions ask for photos with no ink marks or creases.
                </li>
              </ul>
              <p className="text-xs text-slate-500 mt-3">The photo counts are our calculations from the 35 × 45 mm size.</p>
              <p className="text-sm text-slate-600 mt-5">
                Have a photo already? Use the{" "}
                <Link href="/passport-photo-template-4x6" className="text-lime-800 font-semibold underline">4×6 passport photo template</Link>{" "}
                or the{" "}
                <Link href="/passport-photo-print-template-generator" className="text-lime-800 font-semibold underline">print template generator</Link>.
              </p>
            </div>
            <div className="flex justify-center">
              <PrintLayout />
            </div>
          </div>
        </div>
      </section>

      {/* ── MEASURE ── */}
      <section id="measure" aria-labelledby="measure-heading" className="py-12 lg:py-16 bg-white border-b border-slate-200 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="measure-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
            How to Check Your Photo Is the Right Size
          </h2>
          <ol className="space-y-3 text-sm text-slate-700 leading-relaxed list-decimal pl-5">
            <li>Use a ruler with millimetre marks. The print should measure 35 mm across and 45 mm down.</li>
            <li>Measure from the bottom of your chin to the top of your head. It should be about 31.5–36 mm, which is 70–80% of the height.</li>
            <li>Check there is a little space above your head, and that your shoulders show at the bottom.</li>
            <li>For a digital file, check the size in your phone&apos;s photo details: 413 × 531 px or larger with the same 7:9 shape.</li>
          </ol>
          <p className="text-sm text-slate-600 mt-5">
            Not sure? Upload it to our free{" "}
            <Link href="/passport-photo-checker" className="text-lime-800 font-semibold underline">passport photo checker</Link>.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" aria-labelledby="faq-heading" className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="faq-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-8">
            Sri Lanka Passport Photo Size FAQs
          </h2>
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* ── SOURCES ── */}
      <section aria-labelledby="sources-heading" className="py-10 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="sources-heading" className="text-lg font-bold text-slate-900 mb-3">Official sources</h2>
          <ul className="space-y-2 text-sm text-slate-600 list-disc pl-5">
            <li>
              <a href={SOURCES.general} target="_blank" rel="noopener noreferrer" className="underline">
                Department of Immigration and Emigration: general information on passports
              </a>{" "}
              (digital studio photo, 6-month rule, overseas missions)
            </li>
            <li>
              <a href={SOURCES.studioInstructions} target="_blank" rel="noopener noreferrer" className="underline">
                Instructions to registered photo studio owners
              </a>{" "}
              (no spectacles, head coverings)
            </li>
            <li>
              <a href={SOURCES.studioRequirements} target="_blank" rel="noopener noreferrer" className="underline">
                Requirements for photo studios (PDF)
              </a>{" "}
              (blue backdrop, distance, lighting)
            </li>
            <li>
              <a href={SOURCES.missionSpecs} target="_blank" rel="noopener noreferrer" className="underline">
                Embassy of Sri Lanka, Stockholm: passport photograph specifications (PDF)
              </a>{" "}
              (3.5 × 4.5 cm, background, 70–80% face)
            </li>
            <li>
              <a href={SOURCES.missionChecklist} target="_blank" rel="noopener noreferrer" className="underline">
                Embassy of Sri Lanka, Stockholm: new passport checklist (PDF)
              </a>{" "}
              (number of prints)
            </li>
            <li>
              <a href={SOURCES.missionAustria} target="_blank" rel="noopener noreferrer" className="underline">
                Embassy of Sri Lanka, Vienna: issuance of new passports
              </a>{" "}
              (lighting, red eye)
            </li>
            <li>
              <a href={SOURCES.missionEta} target="_blank" rel="noopener noreferrer" className="underline">
                Embassy of Sri Lanka, Muscat: ETA applications
              </a>{" "}
              (visa photo size)
            </li>
          </ul>
          <p className="text-xs text-slate-500 mt-4 leading-relaxed">
            The Department&apos;s pages do not print a size in millimetres, and individual missions can set their own number
            of prints. The inch, pixel and sheet figures are our calculations. We checked these sources on 22 November 2026.
            Rules change, so confirm with the office you apply to.
          </p>
        </div>
      </section>

      {/* ── RELATED ── */}
      <section aria-labelledby="related-heading" className="py-10 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="related-heading" className="text-lg font-bold text-slate-900 mb-4">Related tools</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {[
              { href: EDITOR_HREF, label: "Sri Lanka passport photo editor" },
              { href: VISA_EDITOR_HREF, label: "Sri Lanka visa photo editor" },
              { href: "/passport-photo-template-4x6", label: "4×6 passport photo template" },
              { href: "/icao-standard-photograph", label: "ICAO standard photo (35 × 45 mm)" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block p-4 rounded-xl border border-slate-200 bg-white font-semibold text-slate-800 hover:border-lime-400 hover:text-lime-800">
                  {l.label} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section aria-labelledby="cta-heading" className="bg-slate-900 text-white py-16 lg:py-20 border-t-4 border-lime-500">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="cta-heading" className="text-3xl sm:text-4xl font-black tracking-tight mb-4 max-w-2xl mx-auto">
            Make a 35 × 45 mm Sri Lanka Photo Now
          </h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto mb-8">
            Upload a phone photo. The editor crops it to 3.5 × 4.5 cm, sets a plain background and gives you a digital
            file plus a print sheet. Preview is free.
          </p>
          <Link
            href={EDITOR_HREF}
            className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-400 text-slate-900 text-base font-bold px-8 py-4 rounded-xl transition-colors active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400 focus-visible:ring-offset-slate-900"
          >
            Make my Sri Lanka photo →
          </Link>
        </div>
      </section>

      {/* ── MOBILE STICKY CTA ── */}
      <div className="h-16 sm:hidden" aria-hidden="true" />
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 px-4 py-3">
        <Link href={EDITOR_HREF} className="flex items-center justify-center bg-amber-700 text-white text-sm font-bold py-3 rounded-xl">
          Make my Sri Lanka photo →
        </Link>
      </div>
    </>
  );
}