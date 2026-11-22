import type { Metadata } from "next";
import Link from "next/link";
import CountryPhotoGuide, { GUIDE_OG_IMAGE, type GuideSection } from "@/app/components/CountryPhotoGuide";

/*
 * KEYWORD MAP
 * Primary:   philippines passport photo size / passport size photo philippines
 * Secondary: passport size picture philippines in cm · dfa passport photo requirements · 4.5 x 3.5 cm
 *
 * FACT LEDGER (checked 2026-11-22):
 *   SF   pcgsanfrancisco.org/passport/ (Philippine Consulate General, San Francisco)
 *        - "Passport photo shall be taken onsite. There is no need to bring a photo."
 *        - picture, fingerprints and signature taken on site; personal appearance
 *        - light blue is the background colour for the passport photo
 *        - avoid sleeveless tops and camisoles; collared tops / higher necklines encouraged
 *        - theatrical make-up, eyelash extensions and earrings not allowed during photo capture
 *        - studs/piercings may be accepted unless they obscure the face or cast shadow
 *        - necklaces OK if no light reflection and features not obstructed
 *        - head coverings form-fitting, plain uniform colour; patterned and Taqiyah not allowed
 *   CSC  csc.gov.ph CS Form No. 100 (Revised 2023), Civil Service Commission exam application
 *        - "Philippine passport picture size (4.5 cm x 3.5 cm or 1.78" x 1.38")"
 *        - colored, white background, good quality photo paper, taken within last 3 months
 *        - shoulder level up, head and face at least 80%, name tag ~1 in (2.54 cm) below chin
 *        - bare face: no eyeglasses, no colored contact lens, no headdress; not computer enhanced
 *        - four identical pictures
 *   SEOUL seoulpe.dfa.gov.ph (2013, machine-readable passport): royal blue background. Old guidance.
 * CALCULATED: mm, inches, 300 DPI pixels, sheet counts.
 * NOT CLAIMED: any DFA print size for passports (DFA takes the photo), any universal rule for
 * other agencies (each sets its own; CSC is the example we quote).
 */
const SITE = "https://www.pixpassport.com";
const PAGE_URL = `${SITE}/philippines-passport-photo-size`;
const EDITOR_HREF = "/philippines-passport-photo-editor";
const TITLE = "Philippines Passport Size Photo: 4.5×3.5 cm and DFA Rules";
const H1 = "Philippines Passport Size Photo: 4.5 × 3.5 cm (35 × 45 mm)";
const DESCRIPTION =
  "Philippine passport size photo is 4.5 × 3.5 cm (35 × 45 mm, 1.38 × 1.77 in). Why DFA takes your passport photo on site, what to wear, and 2×2 vs passport size.";
const DATE = "2026-11-22";

const SOURCES = {
  sf: "https://pcgsanfrancisco.org/passport/",
  csc: "https://csc.gov.ph/phocadownload/userupload/erpo/forms/exam-app-forms/Annex%20A1_CS%20Form%20100_Revised%202023_CSEP_a1_edited_a1.pdf",
  seoul: "https://www.seoulpe.dfa.gov.ph/2013-11-29-06-33-23/announcement/85-machine-readable-passport",
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "philippines passport photo size",
    "passport size photo philippines",
    "passport size picture philippines in cm",
    "dfa passport photo requirements",
    "philippine passport picture size",
    "4.5 x 3.5 cm photo",
  ],
  alternates: { canonical: PAGE_URL, languages: { en: PAGE_URL, "x-default": PAGE_URL } },
  openGraph: {
    title: "Philippines Passport Size Photo: 4.5 × 3.5 cm",
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "PixPassport",
    locale: "en_US",
    type: "article",
    publishedTime: DATE,
    modifiedTime: DATE,
    images: [{ url: GUIDE_OG_IMAGE, width: 1200, height: 630, alt: "Philippine passport size photo, 4.5 × 3.5 cm" }],
  },
  twitter: { card: "summary_large_image", title: "Philippines Passport Size Photo: 4.5 × 3.5 cm", description: DESCRIPTION, images: [GUIDE_OG_IMAGE] },
};

const link = "text-lime-800 font-semibold underline";

const sections: GuideSection[] = [
  {
    id: "size",
    nav: "Size",
    title: "Philippine Passport Size Photo in cm, mm, Inches and Pixels",
    intro: (
      <>
        Philippine forms write the size height first: <strong>4.5 cm × 3.5 cm</strong>. It is a portrait photo, 3.5 cm wide
        and 4.5 cm tall.
      </>
    ),
    blocks: [
      {
        type: "table",
        caption: "Philippine passport size photo in different units",
        head: ["Unit", "Width", "Height"],
        rows: [
          ["Centimetres", "3.5 cm", "4.5 cm"],
          ["Millimetres", "35 mm", "45 mm"],
          ["Inches", "1.38 in", "1.77 in (forms often round to 1.78 in)"],
          ["Pixels at 300 DPI (calculated)", "413 px", "531 px"],
        ],
      },
      {
        type: "paragraphs",
        items: [
          <>
            The Civil Service Commission, for example, asks for a &quot;Philippine passport picture size (4.5 cm x 3.5 cm or
            1.78&quot; x 1.38&quot;)&quot;. The millimetre and pixel figures above are our conversions.
          </>,
        ],
      },
    ],
  },
  {
    id: "dfa-passport",
    nav: "DFA passport photo",
    title: "Do You Need a Photo for a Philippine Passport?",
    intro: "No. For a Philippine passport, the photo is taken when you appear for your application.",
    blocks: [
      {
        type: "paragraphs",
        items: [
          <>
            The Philippine Consulate General in San Francisco says: &quot;Passport photo shall be taken onsite. There is no
            need to bring a photo.&quot; Your picture, fingerprints and signature are captured during your personal
            appearance. Check with your DFA office or embassy, as each post publishes its own reminders.
          </>,
        ],
      },
      { type: "subheading", text: "What to wear for the DFA passport photo" },
      {
        type: "cards",
        cols: 3,
        items: [
          {
            title: "Clothing",
            body: "Avoid sleeveless tops and camisoles. Collared tops, blouses or higher necklines are encouraged. The backdrop is light blue, so pick a colour that stands out against it.",
          },
          {
            title: "Make-up and jewellery",
            body: "Theatrical make-up, eyelash extensions and earrings are not allowed during photo capture. Studs and piercings may be accepted unless they hide your face or cast shadows. Necklaces are fine if they don't reflect light or cover your face.",
          },
          {
            title: "Head coverings",
            body: "Must be form-fitting and one plain colour. Patterned head coverings and the Taqiyah are not allowed.",
          },
        ],
      },
      {
        type: "callout",
        title: "Royal blue or light blue?",
        body: (
          <>
            You may see &quot;royal blue background&quot; in older guides. That comes from 2013 embassy guidance for the old
            machine-readable passport. The current consulate guidance we read says light blue, and either way the DFA takes
            the photo, so you don&apos;t need to bring a blue-background photo.
          </>
        ),
      },
    ],
  },
  {
    id: "other-uses",
    nav: "Passport size for forms",
    title: "Passport Size Photo for Other Philippine Applications",
    intro:
      "Government exams, IDs and many forms still ask for printed passport size pictures. Each agency sets its own rules, so read your form. The Civil Service Commission's exam form is a good example of what agencies ask for:",
    blocks: [
      {
        type: "list",
        items: [
          <>Size: <strong>4.5 cm × 3.5 cm</strong> (1.78&quot; × 1.38&quot;), four identical pictures.</>,
          <>Colour photo on a <strong>white background</strong>, printed on good quality photo paper.</>,
          "Taken within the last 3 months.",
          "Close-up from shoulder level up, with the head and face filling at least 80% of the picture.",
          "Bare face: no eyeglasses, no coloured contact lenses, no headdress, and both ears showing. Not computer enhanced.",
          "A handwritten name tag about 1 inch (2.54 cm) below the chin, showing your signature over your printed full name.",
        ],
      },
      {
        type: "callout",
        title: "Check your form first",
        body: "The name tag and 80% face rule are CSC requirements. Other offices may ask for something different, such as no name tag or a 2 × 2 photo.",
      },
    ],
  },
  {
    id: "passport-vs-2x2",
    nav: "Passport size vs 2×2",
    title: "Passport Size vs 2×2 Photo in the Philippines",
    blocks: [
      {
        type: "table",
        caption: "Passport size compared with 2 by 2",
        head: ["", "Passport size", "2 × 2"],
        rows: [
          ["Size", "4.5 × 3.5 cm (35 × 45 mm)", "2 × 2 in (about 51 × 51 mm)"],
          ["Shape", "Portrait (taller than wide)", "Square"],
          ["Use", "Forms that ask for passport size", "Forms that ask for 2 × 2, such as a US visa"],
        ],
      },
      {
        type: "paragraphs",
        items: ["Don't trim a 2 × 2 photo down to passport size. The head ends up too big or off centre. Print the size the form asks for."],
      },
    ],
  },
  {
    id: "print-layout",
    nav: "Print layout",
    title: "How Many Passport Size Photos Fit on a 4R or A4 Print",
    blocks: [
      {
        type: "list",
        items: [
          <><strong>4R (4 × 6 inch):</strong> 8 passport size photos, in two rows of four with gaps for cutting.</>,
          <><strong>A4 sheet:</strong> up to 30 photos (5 across × 6 down).</>,
          <><strong>Print at 100% scale.</strong> Turn off &quot;fit to page&quot; or the photos come out the wrong size.</>,
        ],
      },
      {
        type: "paragraphs",
        items: [
          <>
            These counts are our calculations. Already have a photo? Use the{" "}
            <Link href="/passport-photo-template-4x6" className={link}>4×6 passport photo template</Link>.
          </>,
        ],
      },
    ],
  },
];

const faqs = [
  {
    q: "What is the passport size photo size in the Philippines?",
    a: "4.5 cm × 3.5 cm, written height first. That is 35 mm wide and 45 mm tall, or about 1.38 × 1.77 inches. The Civil Service Commission, for example, writes it as 4.5 cm x 3.5 cm or 1.78\" x 1.38\".",
  },
  {
    q: "Do I need to bring a photo to my DFA passport appointment?",
    a: "No. The photo is taken on site during your personal appearance, along with your fingerprints and signature. The Philippine Consulate General in San Francisco says there is no need to bring a photo.",
  },
  {
    q: "What background colour is used for the Philippine passport photo?",
    a: "The Philippine Consulate General in San Francisco says the passport photo background is light blue. You don't supply this photo yourself, because it is taken on site.",
  },
  {
    q: "Is the Philippine passport photo background royal blue?",
    a: "Royal blue appears in 2013 embassy guidance for the old machine-readable passport. The current consulate guidance we read says light blue, and the DFA takes the photo for you.",
  },
  {
    q: "What should I wear for my Philippine passport photo?",
    a: "Avoid sleeveless tops and camisoles; collared tops or higher necklines are encouraged. Theatrical make-up, eyelash extensions and earrings aren't allowed during photo capture. Head coverings must be form-fitting and a plain colour.",
  },
  {
    q: "Is passport size the same as 2×2 in the Philippines?",
    a: "No. Passport size is 4.5 × 3.5 cm and portrait. A 2 × 2 photo is 2 × 2 inches (about 51 × 51 mm) and square. Use whichever size your form asks for.",
  },
  {
    q: "What background should a passport size photo for a Philippine government form have?",
    a: "Follow the form. The Civil Service Commission, for example, asks for a coloured photo with a white background, taken within the last 3 months.",
  },
  {
    q: "How many passport size photos fit on a 4R print?",
    a: "Eight. A 4R print is 4 × 6 inches, which fits two rows of four 35 × 45 mm photos with gaps for cutting. An A4 sheet fits up to 30.",
  },
];

export default function PhilippinesPassportPhotoSizePage() {
  return (
    <CountryPhotoGuide
      pageUrl={PAGE_URL}
      title={TITLE}
      description={DESCRIPTION}
      h1={H1}
      flag="🇵🇭"
      datePublished={DATE}
      dateModified={DATE}
      breadcrumb={[{ label: "Philippines Passport Photo", href: EDITOR_HREF }, { label: "Photo Size" }]}
      quickAnswer={
        <p>
          <strong>Quick answer:</strong> a Philippine passport size photo is <strong>4.5 cm × 3.5 cm</strong> (height ×
          width), which is <strong>35 × 45 mm</strong> or about <strong>1.38 × 1.77 inches</strong>. For the passport itself
          you don&apos;t need to bring one: the DFA takes your photo on site at your appointment.
        </p>
      }
      heroNotes={[
        <>
          Need printed photos for an exam, ID or visa form? Each office sets its own rules. The Civil Service Commission,
          for example, asks for a white background.{" "}
          <a href="#other-uses" className={link}>See what forms ask for</a>.
        </>,
      ]}
      cta={{ href: EDITOR_HREF, label: "Make a passport size photo →", note: "Free preview before you pay." }}
      specCards={[
        { label: "Centimetres", value: "4.5 × 3.5 cm", note: "Height × width" },
        { label: "Millimetres", value: "35 × 45 mm", note: "Width × height" },
        { label: "Inches", value: "1.38 × 1.77 in", note: "Width × height" },
        { label: "DFA passport", value: "Taken on site", note: "No photo to bring" },
      ]}
      diagram={{ widthMm: 35, heightMm: 45, facePct: [80, 80], label: "Philippine passport size photo, 3.5 cm wide by 4.5 cm high" }}
      sections={sections}
      faqs={faqs}
      faqTitle="Philippines Passport Size Photo FAQs"
      sources={[
        { href: SOURCES.sf, label: "Philippine Consulate General, San Francisco: Philippine passport", note: "photo taken on site, light blue background, dress rules" },
        { href: SOURCES.csc, label: "Civil Service Commission: CS Form No. 100, Revised 2023 (PDF)", note: "4.5 × 3.5 cm, white background, 80% face, name tag" },
        { href: SOURCES.seoul, label: "Philippine Embassy, Seoul: machine-readable passport (2013)", note: "older royal blue guidance" },
      ]}
      sourcesNote="Checked on 22 November 2026. Millimetre, inch, pixel and sheet figures are our calculations. DFA offices and embassies publish their own reminders, so check the post where you apply."
      related={[
        { href: EDITOR_HREF, label: "Philippines passport photo editor" },
        { href: "/philippines-visa-photo-editor", label: "Philippines visa photo editor" },
        { href: "/passport-photo-template-4x6", label: "4×6 (4R) passport photo template" },
        { href: "/us-visa-photo-editor", label: "US visa photo (2×2)" },
      ]}
      bottomCta={{
        title: "Make a 4.5 × 3.5 cm Photo Now",
        text: "Upload a phone photo, preview the crop for free, and download a digital file plus a print sheet.",
        label: "Make my photo →",
        href: EDITOR_HREF,
      }}
    />
  );
}
