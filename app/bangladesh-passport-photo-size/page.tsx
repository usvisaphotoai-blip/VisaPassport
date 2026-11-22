import type { Metadata } from "next";
import Link from "next/link";
import CountryPhotoGuide, { GUIDE_OG_IMAGE, type GuideSection } from "@/app/components/CountryPhotoGuide";

/*
 * KEYWORD MAP
 * Primary:   bangladesh passport photo size
 * Secondary: e-passport photo bangladesh · bangladesh passport size photo · child passport photo bangladesh
 *
 * STATUS: INDEXABLE (set by owner 2026-11-22 after checking epassport.gov.bd).
 * The portal renders with JavaScript and could not be read by our fetcher; dip.gov.bd failed TLS.
 * To publish: open https://www.epassport.gov.bd/landing/faqs in a browser, confirm the FAQ says the
 * face image is taken at enrolment, then set INDEXABLE = true and add the URL to public/sitemap.xml.
 *
 * FACT LEDGER (checked 2026-11-22):
 *   DUBAI  bcgdubai.gov.bd/?p=1055 (Consulate General of Bangladesh, Dubai) - READ
 *          - newborn first passport: "Photo: 3R size (89mm × 127 mm/ 3.5 in × 5 in) lab printed;
 *            the photo should not be older than 3 months"; 2 photos
 *          - background white, covering at least 40% of the photo
 *          - "Physical appearance (except under 5 years old) is mandatory for issue and reissue of an e-passport."
 *          - biometric enrolment (fingerprint, iris scan)
 *   FAQ    epassport.gov.bd/landing/faqs (as quoted by third-party guides; NOT read directly)
 *          - face image taken with a digital camera at enrolment; most applicants need no photo
 *          - children up to 5: parents may provide a photo that is scanned at enrolment
 * NOT CLAIMED: any adult print size (45x55 / 35x45 / 25x30 appear only in unofficial guides).
 */
const INDEXABLE = true;

const SITE = "https://www.pixpassport.com";
const PAGE_URL = `${SITE}/bangladesh-passport-photo-size`;
const TOOL_HREF = "/passport-photo-online";
const TITLE = "Bangladesh Passport Photo Size: e-Passport Photo Rules";
const H1 = "Bangladesh Passport Photo Size: What the e-Passport Needs";
const DESCRIPTION =
  "Bangladesh e-passport photo rules: adults are photographed at enrolment, newborns need 3R (89 × 127 mm) lab prints on white. Old 45×55 mm sizes explained.";
const DATE = "2026-11-22";

const SOURCES = {
  dubai: "https://bcgdubai.gov.bd/?p=1055",
  faq: "https://www.epassport.gov.bd/landing/faqs",
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "bangladesh passport photo size",
    "bangladesh passport size photo",
    "e-passport photo bangladesh",
    "bangladesh child passport photo",
    "3r photo size",
  ],
  alternates: { canonical: PAGE_URL, languages: { en: PAGE_URL, "x-default": PAGE_URL } },
  // Ternary, not `&&`: spreading the literal `false` is a type error once INDEXABLE is true
  ...(INDEXABLE ? {} : { robots: { index: false, follow: true } }),
  openGraph: {
    title: "Bangladesh Passport Photo Size: e-Passport Photo Rules",
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "PixPassport",
    locale: "en_US",
    type: "article",
    publishedTime: DATE,
    modifiedTime: DATE,
    images: [{ url: GUIDE_OG_IMAGE, width: 1200, height: 630, alt: "Bangladesh e-passport photo rules" }],
  },
  twitter: { card: "summary_large_image", title: "Bangladesh Passport Photo Size", description: DESCRIPTION, images: [GUIDE_OG_IMAGE] },
};

const link = "text-lime-800 font-semibold underline";

const sections: GuideSection[] = [
  {
    id: "adults",
    nav: "Adults",
    title: "Do Adults Need a Photo for a Bangladesh e-Passport?",
    intro: "For most adult applicants, no. Your face image is taken during biometric enrolment.",
    blocks: [
      {
        type: "paragraphs",
        items: [
          <>
            The e-passport portal&apos;s FAQ says the face image for the new passport is taken with a digital camera when you
            enrol at the passport office, so most applicants don&apos;t provide a photo with the application. You don&apos;t
            upload one during the online stage either.
          </>,
          <>
            You must appear in person. The Consulate General in Dubai, for example, says physical appearance is mandatory for
            issue and reissue of an e-passport, except for children under 5, and that enrolment includes fingerprints and an
            iris scan.
          </>,
        ],
      },
      {
        type: "callout",
        title: "Tip for the enrolment photo",
        body: "Wear clothes that stand out against a plain, light backdrop, and keep your face and ears clear. Ask the passport office or mission if it has its own dress rules.",
      },
    ],
  },
  {
    id: "children",
    nav: "Babies and children",
    title: "Bangladesh Passport Photo for a Newborn or Young Child",
    intro: "Young children don't always sit for the enrolment photo, so missions ask parents for printed photos.",
    blocks: [
      {
        type: "table",
        caption: "Newborn passport photo rules at the Consulate General of Bangladesh, Dubai",
        head: ["Rule", "What the Dubai consulate asks for"],
        rows: [
          ["Size", "3R: 89 × 127 mm (3.5 × 5 in), lab printed"],
          ["Number", "2 photos"],
          ["Background", "White, covering at least 40% of the photo"],
          ["How recent", "Not older than 3 months"],
        ],
      },
      {
        type: "paragraphs",
        items: [
          <>
            The e-passport FAQ says parents of children up to 5 may provide a photo, which is scanned during enrolment and
            should meet the rules for biometric face images. Missions set their own age limits and print sizes, so check the
            page of the office where you apply.
          </>,
        ],
      },
    ],
  },
  {
    id: "old-sizes",
    nav: "45×55 and 35×45",
    title: "What About 45 × 55 mm and 35 × 45 mm?",
    blocks: [
      {
        type: "paragraphs",
        items: [
          <>
            Many websites still list a fixed Bangladesh passport photo size, usually 45 × 55 mm or 35 × 45 mm. We couldn&apos;t
            find either size in a current official source for adult e-passport applications, because the photo is taken at
            enrolment. Treat those figures as outdated for the e-passport.
          </>,
        ],
      },
      {
        type: "table",
        caption: "Photo sizes you may see for Bangladesh",
        head: ["Size", "Where you'll see it", "Do you need it for an adult e-passport?"],
        rows: [
          ["45 × 55 mm", "Older guides for the machine-readable passport", "No, the photo is taken at enrolment"],
          ["35 × 45 mm", "International standard size, used by many visa forms", "No, but a form or visa may ask for it"],
          ["3R (89 × 127 mm)", "Dubai consulate, newborn applications", "Only for newborns where the mission asks for it"],
        ],
      },
    ],
  },
  {
    id: "other-forms",
    nav: "Visas and other forms",
    title: "Passport Size Photos for Visas and Other Forms",
    blocks: [
      {
        type: "paragraphs",
        items: [
          <>
            Visa applications, job forms and admissions often still ask for a printed passport size photo. There is no single
            Bangladesh size for these, so use the size printed on the form. If it says &quot;passport size&quot; without a
            measurement, ask the office, as many use the international 35 × 45 mm.
          </>,
          <>
            You can make a photo to the size your form asks for with our{" "}
            <Link href={TOOL_HREF} className={link}>passport photo maker</Link> and print copies with the{" "}
            <Link href="/passport-photo-template-4x6" className={link}>4×6 photo template</Link>.
          </>,
        ],
      },
    ],
  },
];

const faqs = [
  {
    q: "What is the photo size for a Bangladesh e-passport?",
    a: "Adults don't provide a printed photo. The e-passport FAQ says the face image is taken with a digital camera during enrolment at the passport office. For newborns, the Consulate General in Dubai asks for two lab-printed 3R photos (89 × 127 mm) on a white background.",
  },
  {
    q: "Do I need to bring a passport photo to the Bangladesh passport office?",
    a: "For most adults, no. Your photo, fingerprints and iris scan are taken during biometric enrolment. Parents of young children may need to bring printed photos, so check the office's own requirements.",
  },
  {
    q: "Is the Bangladesh passport photo size 45 × 55 mm?",
    a: "That size appears in older guides for the machine-readable passport. We found no current official source using it for adult e-passport applications, where the photo is taken at enrolment.",
  },
  {
    q: "What photo do I need for my baby's Bangladesh passport?",
    a: "The Consulate General in Dubai asks for two 3R lab prints (89 × 127 mm, or 3.5 × 5 inches) with a white background covering at least 40% of the photo, taken within the last 3 months. Other missions may differ.",
  },
  {
    q: "Does a child need to attend the passport office?",
    a: "The Dubai consulate says physical appearance is mandatory for issue and reissue of an e-passport, except for children under 5.",
  },
  {
    q: "What size is a passport size photo for a Bangladesh visa or job form?",
    a: "Use the size printed on the form. If it only says passport size, ask the office. Many forms use the international 35 × 45 mm.",
  },
];

export default function BangladeshPassportPhotoSizePage() {
  return (
    <CountryPhotoGuide
      pageUrl={PAGE_URL}
      title={TITLE}
      description={DESCRIPTION}
      h1={H1}
      flag="🇧🇩"
      datePublished={DATE}
      dateModified={DATE}
      breadcrumb={[{ label: "Passport Photos", href: "/passport-photos" }, { label: "Bangladesh" }]}
      quickAnswer={
        <p>
          <strong>Quick answer:</strong> for a Bangladesh e-passport, most adults <strong>don&apos;t need a printed photo</strong>.
          Your face image is taken with a digital camera during biometric enrolment at the passport office. For a newborn,
          missions ask for printed photos: the Consulate General in Dubai wants <strong>two 3R lab prints (89 × 127 mm)</strong>{" "}
          on a white background.
        </p>
      }
      heroNotes={[
        <>
          Seen &quot;45 × 55 mm&quot; elsewhere? <a href="#old-sizes" className={link}>Here&apos;s where that comes from</a>.
        </>,
      ]}
      cta={{ href: TOOL_HREF, label: "Make a photo for a form or visa →", note: "Choose the size your form asks for. Free preview." }}
      specCards={[
        { label: "Adult e-passport", value: "No photo", note: "Taken at enrolment" },
        { label: "Newborn (Dubai)", value: "3R print", note: "89 × 127 mm, 2 copies" },
        { label: "Newborn background", value: "White", note: "At least 40% of photo" },
        { label: "Visa and forms", value: "Per form", note: "Often 35 × 45 mm" },
      ]}
      sections={sections}
      faqs={faqs}
      faqTitle="Bangladesh Passport Photo FAQs"
      sources={[
        { href: SOURCES.dubai, label: "Consulate General of Bangladesh, Dubai: e-passport services", note: "newborn 3R photo, physical appearance, biometric enrolment" },
        { href: SOURCES.faq, label: "Department of Immigration and Passports: e-passport FAQ", note: "face image taken at enrolment, photos for children up to 5" },
      ]}
      sourcesNote="Checked on 22 November 2026. Missions set their own photo rules for children, so check the office where you apply."
      related={[
        { href: TOOL_HREF, label: "Passport photo maker" },
        { href: "/passport-photo-template-4x6", label: "4×6 passport photo template" },
        { href: "/icao-standard-photograph", label: "ICAO standard photo (35 × 45 mm)" },
        { href: "/passport-photo-checker", label: "Free passport photo checker" },
      ]}
      bottomCta={{
        title: "Need a Passport Size Photo for a Form?",
        text: "Upload a phone photo, pick the size your form asks for, preview it for free and download a print sheet.",
        label: "Make my photo →",
        href: TOOL_HREF,
      }}
    />
  );
}
