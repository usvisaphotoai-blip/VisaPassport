import type { Metadata, Viewport } from "next";
import PhotoCheckerTool from "@/app/components/PhotoCheckerTool";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "US Green Card Photo Checker – Free USCIS & DV Photo Validator",
  description:
    "Check your Green Card photo free in seconds. We validate USCIS Form I-485, DS-260, and DV Lottery photos against the official 2×2 in / 600×600 px rule, 50–69% head height, white background, and no-glasses policy.",
  keywords: [

  ],
  alternates: {
    canonical: "https://www.pixpassport.com/us-check-photo-green-card",
    languages: {
      en: "https://www.pixpassport.com/us-check-photo-green-card",
      "x-default": "https://www.pixpassport.com/us-check-photo-green-card",
    },
  },
  openGraph: {
    title: "US Green Card Photo Checker – Free USCIS & DV Photo Validator",
    description:
      "Avoid USCIS delays and RFEs. Check your Green Card photo against the official 2×2 in / 600×600 px size, 50–69% head height, white background, and zero-glasses rule.",
    url: "https://www.pixpassport.com/us-check-photo-green-card",
    siteName: "PixPassport",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_visa_photo_example_whvfqt.jpg",
        width: 1200,
        height: 630,
        alt: "US Green Card Photo Checker and Validator Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "US Green Card Photo Checker – Free USCIS & DV Photo Validator",
    description:
      "Free instant Green Card photo check. Verify 2×2 in / 600×600 px size, head height, eye level, and lighting against official USCIS and State Department rules.",
    images: ["https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_visa_photo_example_whvfqt.jpg"],
  },
};

export default function USGreenCardPhotoCheckerPage() {
  const faqs = [
    {
      question: "What size and format does a US Green Card photo need?",
      answer:
        "USCIS and the State Department require a 2×2 inch (51×51 mm) color photo, or a 600×600 to 1200×1200 pixel digital square at 300 DPI. Your head must measure 1 to 1⅜ inches (50–69% of the frame) from chin to hairline, and your eyes must sit 1⅛ to 1⅜ inches (56–69%) up from the bottom edge. The background must read as plain white or off-white, and digital uploads must stay under 240 KB.",
    },
    {
      question: "Which forms actually require this photo?",
      answer:
        "You'll need this exact 2×2 inch photo for Form I-485 (adjustment of status), I-130 (relative petition), I-765 (work permit), I-131 (advance parole), I-90 (green card replacement), I-751 (removing conditions), and for DS-260 or the DV Lottery's DS-5501.",
    },
    {
      question: "Can a bad photo really delay or reject my application?",
      answer:
        "Yes, and it's one of the most common reasons USCIS issues a Request for Evidence on an I-485 package. An RFE pauses your case for months while you resubmit compliant photos and wait for USCIS to re-queue the file. DV Lottery entries are worse off: automated intake systems flag non-compliant photos instantly, and there's no appeal.",
    },
    {
      question: "How exactly is head height measured?",
      answer:
        "Measure straight up from the lowest point of your chin to the top of your head, hair included. On a 600×600 px photo, that span needs to fall between 300 and 414 pixels. Stand too far from the camera and your head reads under 50%; crop too tight and it exceeds 69%. Either mistake fails automated review.",
    },
    {
      question: "Can I wear glasses in the photo?",
      answer:
        "No. The State Department banned glasses entirely in November 2016, and the rule covers prescription lenses, reading glasses, blue-light filters, and tinted or photochromic lenses. A signed medical note from an eye doctor is the only exception, and it applies only in rare cases like recent surgery.",
    },
    {
      question: "What background do I need?",
      answer:
        "Use a plain white or smooth off-white wall with even lighting and no shadows. Textured walls, doors, wallpaper, colored backdrops, and shadows cast by your head or shoulders will all fail the check. Our tool scans the entire background perimeter for uniform brightness before passing your photo.",
    },
    {
      question: "Can I just use my phone camera?",
      answer:
        "Yes, any modern phone camera exceeds the 600×600 px requirement easily. Stand 4 to 6 feet from a plain white wall in bright daylight, hand the phone to someone else so it sits at eye level, keep your expression neutral, and upload the shot here to confirm proportions and lighting before you submit anything.",
    },
    {
      question: "What's the file size limit for digital uploads?",
      answer:
        "Portals like dvprogram.state.gov and the CEAC consular system need a JPEG (.jpg) in 24-bit sRGB color, capped at 240 KB, with pixel dimensions between 600×600 and 1200×1200 in a perfect square.",
    },
    {
      question: "Are religious head coverings allowed?",
      answer:
        "Yes, daily religious or medical head coverings are fine. Your full face still needs to show clearly from chin to hairline, both cheeks included, with no shadow falling across any part of it.",
    },
    {
      question: "Can I smile?",
      answer:
        "Keep a neutral expression with both eyes open and your mouth closed, facing the camera directly. A small, closed-mouth smile usually passes, but an open mouth, visible teeth, raised eyebrows, a squint, or a tilted head will trigger a rejection from automated facial recognition.",
    },
    {
      question: "How old can the photo be?",
      answer:
        "No older than 6 months, since it needs to reflect how you look right now. Reusing an old passport, visa, or prior DV Lottery photo is risky too — USCIS and the State Department cross-reference submissions and treat repeats as a red flag for fraud review.",
    },
    {
      question: "Can I edit or retouch the photo?",
      answer:
        "Don't use beautifying filters, skin smoothing, AI retouching, or any edit that changes your facial features, scars, or tattoos. Skip digital red-eye removal too — retake the shot instead. Background cleanup is fine only if it leaves your face and edges untouched.",
    },
    {
      question: "What are the rules for a baby's photo on Form I-485?",
      answer:
        "Every child, infants included, needs their own 2×2 inch photo with no hands or other people in frame. For a baby who can't sit up, lay them on a plain white sheet or strap them into a car seat draped in white fabric. Closed eyes or an open mouth are tolerated for infants, but the face must stay visible and centered.",
    },
    {
      question: "Is this checker really free?",
      answer:
        "Completely free, with no sign-up, no payment, and no watermark, and you can re-check as many times as you need. The analysis runs securely in your browser, so your photo stays private.",
    },
  ];

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "US Green Card Photo Checker & Validator Online",
      url: "https://www.pixpassport.com/us-check-photo-green-card",
      description:
        "Free US Green Card photo checker that verifies 2×2 inch (600×600 px) dimensions, 50–69% head height, 240KB file limit, plain white background, and no-glasses rule for USCIS Form I-485, DS-260, and DV Lottery.",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "US Green Card Photo Checker – Free USCIS & DV Photo Validator",
      url: "https://www.pixpassport.com/us-check-photo-green-card",
      citation: [
        "https://www.uscis.gov/forms/filing-guidance/checklist-of-required-initial-evidence-for-form-i-485-for-informational-purposes-only",
        "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/photos.html",
        "https://travel.state.gov/content/travel/en/us-visas/immigrate/diversity-visa-program-entry/diversity-visa-submit-entry1.html",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.pixpassport.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "US Green Card Photo Checker",
          item: "https://www.pixpassport.com/us-check-photo-green-card",
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <PhotoCheckerTool
        initialCountry="US"
        countryName="United States (USCIS / Green Card)"
        countryFlag="🇺🇸"
        initialDocType="visa"
        badgeText="🇺🇸 Built on Official USCIS Form I-485 & State Dept Specs · Free & Instant"
        title="US Green Card Photo Checker"
        highlightTitle="Free USCIS & DV Photo Validator"
        subtitle="A single photo error can trigger a Request for Evidence, stall your work permit, or knock you out of the DV Lottery with no appeal. Upload your photo below and we'll check it against the exact 2×2 inch (600×600 px) size, 50–69% head height, plain white background, and strict no-glasses rule in seconds — before you file."
        specs={[
          { label: "Dimensions", value: "2 × 2 in (51 × 51 mm) / 600 × 600 px" },
          { label: "Aspect Ratio", value: "1:1 Perfect Square" },
          { label: "Head Height", value: "50% – 69% (1 to 1⅜ in / 300 to 414 px)" },
          { label: "Eye Height", value: "56% – 69% from bottom edge" },
          { label: "Background", value: "Plain White / Off-White (No Shadows)" },
          { label: "Eyeglasses", value: "Strictly Prohibited (Zero Tolerance)" },
          { label: "File Size & Format", value: "Max 240 KB, JPEG (.jpg) 24-bit sRGB" },
          { label: "Recency", value: "Taken within last 6 months" },
        ]}
        requirements={[
          {
            icon: "📐",
            title: "Exact 2×2 Inch / 600×600px Framing",
            desc: "We confirm your canvas is a true 1:1 square that matches both the printed 2×2 inch and digital 600×600 pixel USCIS standards.",
          },
          {
            icon: "📏",
            title: "Head Height Between 50%–69%",
            desc: "We measure chin to hairline to make sure your head fills 1 to 1⅜ inches of the frame — not too small, not cropped too tight.",
          },
          {
            icon: "👁️",
            title: "Eye Line at 56%–69%",
            desc: "We check that your eyes land in the required biometric band from the bottom edge, matching what automated facial recognition expects.",
          },
          {
            icon: "🕶️",
            title: "Zero Tolerance for Glasses",
            desc: "We flag any eyewear — prescription, tinted, or otherwise — since it's the single most common reason photos get bounced.",
          },
          {
            icon: "🎨",
            title: "Uniform Plain White Background",
            desc: "We scan for even, shadow-free lighting and reject patterned walls, dark corners, or objects behind you.",
          },
          {
            icon: "💾",
            title: "File Size Under 240 KB",
            desc: "We verify your JPEG stays within the 240 KB cap required by digital portals like dvprogram.state.gov and CEAC.",
          },
          {
            icon: "😐",
            title: "Neutral Expression Check",
            desc: "We look for a forward-facing pose, both eyes open, a closed mouth, and no head tilt.",
          },
          {
            icon: "🗓️",
            title: "Accepted Across USCIS Forms",
            desc: "One compliant photo covers I-485, I-130, I-765, I-131, DS-260, and the Diversity Visa lottery.",
          },
        ]}
        faqs={faqs}
        relatedTools={[
          {
            title: "DV Lottery Photo Checker",
            desc: "Specialized validator for the US Diversity Visa Green Card lottery entry program.",
            href: "/diversity-visa-lottery-photo-checker",
            icon: "🎟️",
          },
          {
            title: "US Visa Photo Editor",
            desc: "Create and crop compliant 600×600 px digital photos with pure white background for DS-160.",
            href: "/us-visa-photo-editor",
            icon: "🇺🇸",
          },
          {
            title: "Passport Photo Checker",
            desc: "Universal biometric passport photo compliance validator for 50+ countries.",
            href: "/passport-photo-checker",
            icon: "🌍",
          },
          {
            title: "Online Photo Checker",
            desc: "Instant in-browser passport and visa photo test with no download needed.",
            href: "/online-passport-photo-checker",
            icon: "⚡",
          },
          {
            title: "2x2 Picture Editor",
            desc: "Crop and resize photos to the exact 2×2 inch standard used for US visas and green cards.",
            href: "/2x2-picture-editor",
            icon: "✂️",
          },
          {
            title: "Visa Photo Validator",
            desc: "Run biometric checks against official ICAO-based requirements for 50+ countries.",
            href: "/visa-photo-validator",
            icon: "🌐",
          },
        ]}
      />
    </>
  );
}