import type { Metadata } from "next";
import Link from "next/link";
import CountryPhotoGuide, { GUIDE_OG_IMAGE, type GuideSection } from "@/app/components/CountryPhotoGuide";

/*
 * KEYWORD MAP
 * Primary:   irish passport photo requirements
 * Secondary: ireland passport photo size · irish passport photo online · irish passport photo pixels
 *            · irish passport photo glasses · irish passport photo at home
 *
 * INTENT: informational first (the visitor wants the rules and numbers), transactional second
 * (the tool at TOOL_HREF makes a compliant photo). The page answers the rules in the first screen,
 * then offers the tool in the hero, after "Get a digital photo", and at the bottom.
 *
 * FACT LEDGER (checked 2026-11-22). Every rule maps to the Department of Foreign Affairs photo
 * guidelines (DFA_URL, canonical ireland.ie page; pose section read via the api.ireland.ie copy):
 *   - taken in the last 6 months (ICAO requirement); can't reuse a previous passport photo
 *   - online (Passport Book or Passport Card): digital photo; paper form (Passport Book only): printed photo
 *   - printed: min 35 x 45 mm, max 38 x 50 mm; canonical page: close-up of face and top of shoulders,
 *     face 70-80% of the frame. api.ireland.ie copy: "head to mid torso, visible space around head and shoulders"
 *     (the two versions differ, so the page states both and tells readers to leave space)
 *   - printed quality: photo-quality paper, high resolution, sharp, correctly exposed, no ink marks/creases,
 *     not enhanced, reverse white and unglazed; B&W recommended, colour accepted
 *   - digital: not scanned, colour, >= 715 x 951 px, JPEG, no compression artefacts,
 *     not enhanced, no barrel distortion, <= 9 MB
 *   - background: completely plain light grey, white or cream with enough contrast; no objects (doors, plants)
 *   - neutral expression, no smile, mouth closed, head not tilted, look straight into camera
 *   - glasses: frames must not cover eyes, no glare, no dark glasses/sunglasses
 *   - head covering for religious or medical reasons only, full facial features visible; no uniforms or insignia
 *   - no shadows on face or behind head; no red eye; good colour balance and natural skin tones; hair not over eyes
 *   - babies: lie on plain white surface; nobody else in photo (no hands/arms); no soothers; cropping tool newborn-36 months
 *   - online: someone else takes it, no selfie, no zoom; or photo shop (USB/email); or photo-booth code (Photo Me, IDstation)
 *   - passport prints in black and white; submit colour; sideways uploads are rotated for you
 *   - paper: 4 identical photos; witness writes form number (section 9) on back of 2, signs and stamps
 * CALCULATED: inch conversions.
 * NOT CLAIMED: head height in mm or % of digital photo, DPI minimum, file-name rules (competitor tool settings only).
 */
const SITE = "https://www.pixpassport.com";
const PAGE_URL = `${SITE}/ireland-passport-photo-requirements`;
const TOOL_HREF = "/passport-photo-online?type=ireland-passport";
const TITLE = "Irish Passport Photo Requirements: Size, Pixels, Rules";
const H1 = "Irish Passport Photo Requirements: Size, Background and Online Rules";
const DESCRIPTION =
  "Irish passport photo rules: 35×45 mm to 38×50 mm printed, face 70–80%, at least 715×951 px JPEG up to 9 MB online, plain light background, glasses, babies.";
const DATE = "2026-11-22";
const DFA_URL = "https://www.ireland.ie/en/dfa/passports/photo-guidelines/";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "irish passport photo requirements",
    "ireland passport photo requirements",
    "irish passport photo size",
    "irish passport photo online",
    "irish passport photo pixels",
    "irish passport photo glasses",
    "irish passport photo at home",
  ],
  alternates: { canonical: PAGE_URL, languages: { en: PAGE_URL, "x-default": PAGE_URL } },
  openGraph: {
    title: "Irish Passport Photo Requirements",
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "PixPassport",
    locale: "en_US",
    type: "article",
    publishedTime: DATE,
    modifiedTime: DATE,
    images: [{ url: GUIDE_OG_IMAGE, width: 1200, height: 630, alt: "Irish passport photo requirements" }],
  },
  twitter: { card: "summary_large_image", title: "Irish Passport Photo Requirements", description: DESCRIPTION, images: [GUIDE_OG_IMAGE] },
};

const link = "text-lime-800 font-semibold underline";
const buttonClass =
  "inline-flex items-center justify-center bg-amber-700 hover:bg-amber-800 text-white text-sm font-bold px-6 py-3 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-700 no-underline";

const sections: GuideSection[] = [
  {
    id: "size",
    nav: "Size",
    title: "Irish Passport Photo Size: Printed and Digital",
    intro: "The size depends on how you apply. Paper forms need printed photos; online applications need a digital file.",
    blocks: [
      {
        type: "table",
        caption: "Irish passport photo size",
        head: ["", "Printed photo (paper form)", "Digital photo (online)"],
        rows: [
          ["Size", "Minimum 35 × 45 mm, maximum 38 × 50 mm", "At least 715 px wide × 951 px high"],
          ["In inches (calculated)", "1.38 × 1.77 in to 1.50 × 1.97 in", "—"],
          ["Face size", "A close-up of your face and the top of your shoulders, with your face 70–80% of the frame", "Follow the same pose and visuals rules as a printed photo"],
          ["File or paper", "Photo-quality paper at high resolution, reverse white and unglazed", "JPEG, colour, no larger than 9 MB"],
          ["Colour", "Black and white recommended, colour accepted", "Colour"],
        ],
      },
      {
        type: "paragraphs",
        items: [
          <>
            The Department of Foreign Affairs describes the framing in two ways. Its printed-photo size rule asks for a
            close-up of your face and the top of your shoulders, with your face 70–80% of the frame. Its pose guidance for
            digital and printed photos asks for head to mid torso with visible space between your head and shoulders and the
            edge of the photo. Don&apos;t crop tightly, and leave a little space around your head and shoulders.
          </>,
          <>
            The minimum digital size, 715 × 951 px, is a slightly different shape from 35 × 45 mm (our calculation). Never
            stretch a photo to fit. Crop it and keep it at least 715 px wide and 951 px high.
          </>,
        ],
      },
    ],
  },
  {
    id: "digital",
    nav: "Digital specs",
    title: "Digital Photo Specs for Passport Online",
    intro: "You need a digital photo to apply online for a Passport Book or a Passport Card. It must meet all of these:",
    blocks: [
      {
        type: "list",
        items: [
          "Not a scanned photo. Passport Online only accepts digital photos.",
          "In colour. Your passport photo is printed in black and white, so you submit a colour photo and it is converted during the application.",
          "At least 715 pixels wide and 951 pixels high.",
          "JPEG format, with no compression, loss or compression artefacts.",
          "No larger than 9 MB.",
          "Not digitally enhanced or changed, and no barrel or other distortion.",
        ],
      },
      {
        type: "paragraphs",
        items: [
          <>
            If you upload a photo that is sideways or upside down, the Passport Service rotates it for you. If the website says
            the photo is the wrong size or format, check these six points.
          </>,
        ],
      },
    ],
  },
  {
    id: "rules",
    nav: "Photo rules",
    title: "Background, Expression, Glasses and Head Coverings",
    intro: "These pose and visuals rules apply to both digital and printed photos.",
    blocks: [
      {
        type: "cards",
        cols: 3,
        items: [
          {
            title: "Background",
            body: "Completely plain light grey, white or cream, with enough contrast against you. No objects such as door panels or plants in view.",
          },
          {
            title: "Expression and pose",
            body: "Neutral expression: don't smile and keep your mouth closed. Look straight into the camera and don't tilt your head up, down, left or right.",
          },
          {
            title: "Glasses",
            body: "You can wear glasses if the frames don't cover any part of your eyes and there is no glare on the lenses. Dark glasses and sunglasses are not allowed.",
          },
          {
            title: "Head coverings",
            body: "Allowed for religious or medical reasons only, and your full facial features must be visible. No other head accessories. No uniforms, civil or military, or clothing with insignia.",
          },
          {
            title: "Lighting and focus",
            body: "In focus, with balanced light that is not too dark or too light. Good colour balance and natural skin tones. No shadows on your face or behind your head, and no red eye.",
          },
          {
            title: "Recent and unedited",
            body: "Taken in the last 6 months. You can't reuse your previous passport photo. Don't use photo software or filters to change the image.",
          },
        ],
      },
      {
        type: "paragraphs",
        items: [
          <>
            Not sure yours passes? Our{" "}
            <Link href="/passport-photo-checker" className={link}>free passport photo checker</Link> looks at it before you
            apply.
          </>,
        ],
      },
    ],
  },
  {
    id: "get-digital-photo",
    nav: "Get a digital photo",
    title: "How to Get a Digital Irish Passport Photo",
    intro: "There are three ways to get a digital photo for your online application.",
    blocks: [
      {
        type: "cards",
        cols: 3,
        items: [
          {
            title: "Take it yourself",
            body: "Use a smartphone, tablet or computer, with someone helping you. You can't take a selfie, and don't use the zoom function. If the photo isn't good enough, the Passport Service contacts you for a new one.",
          },
          {
            title: "Use a photo booth code",
            body: "Use a participating photo booth (Photo Me or IDstation) before you apply. You get a code to add the photo to your application. This service is provided in Ireland and the UK.",
          },
          {
            title: "Go to a photo provider",
            body: "A photographer or pharmacy can give you a digital photo by email or on a USB key before you apply.",
          },
        ],
      },
      {
        type: "paragraphs",
        items: [
          <>
            Taking it yourself and want it cropped to the right size?{" "}
            <Link href={TOOL_HREF} className={buttonClass}>Make my Irish passport photo →</Link>
          </>,
        ],
      },
    ],
  },
  {
    id: "paper",
    nav: "Paper form",
    title: "Printed Photos for a Paper Application",
    intro: "A paper form is for a Passport Book. A Passport Card has to be applied for online.",
    blocks: [
      {
        type: "list",
        items: [
          "Include 4 identical photos, no more than 6 months old.",
          "Your witness writes the form number (Section 9 of the form) on the back of two of the four photos, then signs and stamps the back of those two.",
          "If that isn't done, you'll be asked to submit a new form and new photos.",
          "Print on photo-quality paper at a high resolution, in sharp focus and correctly exposed.",
          "No ink marks or creases, and no digital enhancements or changes.",
          "The back of each photo must be white and unglazed.",
        ],
      },
      {
        type: "paragraphs",
        items: [
          <>
            Printing several at once? Put them on a sheet with the{" "}
            <Link href="/passport-photo-template-4x6" className={link}>4×6 photo template</Link>.
          </>,
        ],
      },
    ],
  },
  {
    id: "babies",
    nav: "Babies and children",
    title: "Irish Passport Photos for Babies and Young Children",
    blocks: [
      {
        type: "list",
        items: [
          "If a baby or young child can't support themselves, photograph them lying down on a plain, white surface.",
          "Nobody else can be in the photo, so no hands or arms holding the child.",
          "Soothers and pacifiers can't be in the photo because they can obscure facial features.",
          "Try to keep the child's expression natural, not smiling and with their mouth not open.",
          "If the system struggles to find a newborn to 36-month-old's face, it may prompt you to use a cropping tool to frame their face by hand. The face doesn't need to sit perfectly inside the oval.",
        ],
      },
    ],
  },
  {
    id: "take-at-home",
    nav: "Take it at home",
    title: "How to Take an Irish Passport Photo at Home",
    intro: "For an online application you can take the photo yourself, as long as someone else presses the button.",
    blocks: [
      {
        type: "list",
        ordered: true,
        items: [
          "Stand in front of a completely plain light grey, white or cream wall, with no doors, plants or other objects in view.",
          "Face a window or soft light so there are no shadows on your face or the wall behind you.",
          "Ask someone to take the photo. Selfies aren't accepted, and don't use the zoom function.",
          "Leave visible space around your head and shoulders, and take off sunglasses. Keep hair off your eyes.",
          "Look straight at the camera with a neutral expression and your mouth closed.",
          "Save it as a JPEG of at least 715 × 951 px, under 9 MB, without filters or retouching.",
        ],
      },
      {
        type: "paragraphs",
        items: [
          <>
            The Department suggests a photo booth or photo provider if the website keeps rejecting a photo you took at home.
            Or let our <Link href={TOOL_HREF} className={link}>Irish passport photo tool</Link> crop and check it for you.
          </>,
        ],
      },
    ],
  },
  {
    id: "rejections",
    nav: "Why photos are rejected",
    title: "Why Irish Passport Photos Get Rejected",
    intro: "The Department says poor quality photographs are the main reason it has to reject passport applications. The common problems are:",
    blocks: [
      {
        type: "list",
        items: [
          "A selfie, or a photo taken with the zoom function.",
          "A scanned photo, or a file over 9 MB, under 715 × 951 px or not a JPEG.",
          "A smile, an open mouth or a tilted head.",
          "Glare on glasses, frames covering the eyes, or sunglasses.",
          "Shadows on the face or behind the head, red eye, or poor lighting.",
          "A background that isn't completely plain, or one with objects in view.",
          "A photo older than 6 months, or your previous passport photo.",
          "Digital enhancements, filters or software edits.",
        ],
      },
      {
        type: "paragraphs",
        items: [
          <>
            Applications with a rejected photo are delayed while you send a new one. If you have a disability that stops you
            meeting the photo rules, contact the Passport Service for advice.
          </>,
        ],
      },
    ],
  },
];

const faqs = [
  {
    q: "What size is an Irish passport photo?",
    a: "A printed Irish passport photo must be at least 35 × 45 mm and no larger than 38 × 50 mm. For an online application, the digital photo must be at least 715 pixels wide and 951 pixels high.",
  },
  {
    q: "What size should a digital Irish passport photo be?",
    a: "At least 715 × 951 pixels, in colour, saved as a JPEG of no more than 9 MB. It must not be a scan of a printed photo, compressed so much it shows artefacts, distorted or digitally enhanced.",
  },
  {
    q: "How big should my face be in an Irish passport photo?",
    a: "For printed photos, the Department asks for a close-up of your face and the top of your shoulders, with your face 70–80% of the frame. Its pose guidance also asks for head to mid torso with visible space around your head and shoulders, so don't crop tightly.",
  },
  {
    q: "What background colour does an Irish passport photo need?",
    a: "A completely plain light grey, white or cream background with enough contrast against you, and no objects such as door panels or plants in view.",
  },
  {
    q: "Can I wear glasses in my Irish passport photo?",
    a: "Yes. Transparent glasses are fine if the frames don't cover any part of your eyes and there is no glare or shadow on the lenses. Sunglasses and dark glasses are not allowed.",
  },
  {
    q: "Can I wear a head covering in my Irish passport photo?",
    a: "Only for religious or medical reasons, and your full facial features must be visible. Other head accessories can't be worn.",
  },
  {
    q: "Can I smile in an Irish passport photo?",
    a: "No. Keep a neutral expression with your mouth closed, and look straight at the camera.",
  },
  {
    q: "Can I take my own Irish passport photo with my phone?",
    a: "Yes, for an online application, but someone else has to take it. Selfies aren't accepted, and you shouldn't use the zoom function. If you submit a selfie, you'll be asked for another photo, which delays your application.",
  },
  {
    q: "Can I use my old passport photo?",
    a: "No. The International Civil Aviation Organisation requires passport photos to be taken within the last 6 months, so you need a new photo.",
  },
  {
    q: "Will my photo be in colour on my Irish passport?",
    a: "No. The photo on your passport is black and white. You submit a colour photo and it is converted during the application.",
  },
  {
    q: "Can I scan a paper photo to upload it?",
    a: "No. The online service only accepts digital photos, and scanned photos are not permitted.",
  },
  {
    q: "How many photos do I need for a paper Irish passport application?",
    a: "Four identical photos, no more than 6 months old. Your witness writes the form number on the back of two of them, then signs and stamps those two.",
  },
  {
    q: "How do I take a passport photo of a baby?",
    a: "Lay the baby on a plain, white surface. No hands or arms can be in the photo, and soothers aren't allowed.",
  },
];

export default function IrelandPassportPhotoRequirementsPage() {
  return (
    <CountryPhotoGuide
      pageUrl={PAGE_URL}
      title={TITLE}
      description={DESCRIPTION}
      h1={H1}
      flag="🇮🇪"
      datePublished={DATE}
      dateModified={DATE}
      breadcrumb={[{ label: "Passport Photos", href: "/passport-photos" }, { label: "Ireland" }]}
      quickAnswer={
        <p>
          <strong>Quick answer:</strong> a printed Irish passport photo is <strong>35 × 45 mm minimum, 38 × 50 mm maximum</strong>,
          with your face 70–80% of the frame. For an online application, use a <strong>JPEG of at least 715 × 951 pixels</strong>,
          up to 9 MB. Use a completely plain light grey, white or cream background, keep a neutral expression with your mouth
          closed, and take it within the last 6 months.
        </p>
      }
      heroNotes={[
        <>Glasses are allowed if the frames don&apos;t cover your eyes and there is no glare. Selfies aren&apos;t accepted.</>,
        <>Your passport photo is printed in black and white, but you submit a colour photo.</>,
      ]}
      cta={{ href: TOOL_HREF, label: "Make my Irish passport photo →", note: "Free preview. Cropped to the Irish size before you pay." }}
      specCards={[
        { label: "Printed size", value: "35 × 45 mm", note: "Up to 38 × 50 mm" },
        { label: "Digital minimum", value: "715 × 951 px", note: "Online applications" },
        { label: "File", value: "JPEG ≤ 9 MB", note: "Colour, unedited" },
        { label: "Background", value: "Plain light", note: "Grey, white or cream" },
      ]}
      diagram={{ widthMm: 35, heightMm: 45, label: "Irish passport photo, minimum 35 mm wide by 45 mm high" }}
      sections={sections}
      faqs={faqs}
      faqTitle="Irish Passport Photo FAQs"
      sources={[{ href: DFA_URL, label: "Department of Foreign Affairs: passport photo guidelines", note: "every rule on this page" }]}
      sourcesNote="Checked on 22 November 2026. Inch conversions and the digital-photo shape comparison are our calculations. Rules change, so confirm on the Department's page before you apply."
      related={[
        { href: TOOL_HREF, label: "Irish passport photo tool" },
        { href: "/passport-photo-template-4x6", label: "4×6 passport photo template" },
        { href: "/uk", label: "UK passport photo" },
        { href: "/passport-photo-checker", label: "Free passport photo checker" },
      ]}
      bottomCta={{
        title: "Make an Irish Passport Photo Now",
        text: "Upload a photo someone took of you. We crop it to the Irish size, set a plain background and give you a digital file plus a print sheet.",
        label: "Make my Irish photo →",
        href: TOOL_HREF,
      }}
    />
  );
}