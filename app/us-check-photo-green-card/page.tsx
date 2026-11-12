import type { Metadata, Viewport } from "next";
import PhotoCheckerTool from "@/app/components/PhotoCheckerTool";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Green Card Photo Checker – Free USCIS I-485, I-130 & I-765 Photo Test",
  description:
    "Check your green card photo free before you file. Test the 2×2 inch size, 1–1⅜ inch head height, white background and no-glasses rule used for USCIS Forms I-485, I-130, I-765 and I-131.",
  alternates: {
    canonical: "https://www.pixpassport.com/us-check-photo-green-card",
    languages: {
      en: "https://www.pixpassport.com/us-check-photo-green-card",
      "x-default": "https://www.pixpassport.com/us-check-photo-green-card",
    },
  },
  openGraph: {
    title: "Green Card Photo Checker – Free USCIS I-485, I-130 & I-765 Photo Test",
    description:
      "Avoid USCIS delays and RFEs. Check your green card photo against the official 2×2 inch size, 1–1⅜ inch head height, white background and no-glasses rule.",
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
    title: "Green Card Photo Checker – Free USCIS I-485, I-130 & I-765 Photo Test",
    description:
      "Free green card photo check. Verify the 2×2 inch size, head height, eye level and lighting against USCIS photo rules.",
    images: ["https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_visa_photo_example_whvfqt.jpg"],
  },
};

export default function USGreenCardPhotoCheckerPage() {
  const faqs = [
    {
      question: "What size and format does a US Green Card photo need?",
      answer:
        "USCIS asks for two identical 2×2 inch (51×51 mm) color passport-style photos. Your head must measure 1 to 1⅜ inches (50–69% of the frame) from chin to top of head, and your eyes must sit 1⅛ to 1⅜ inches (56–69%) up from the bottom edge. The background must be plain white or off-white. If you scan or photograph the print to check it here, keep it square.",
    },
    {
      question: "Which forms actually require this photo?",
      answer:
        "You'll need this exact 2×2 inch photo for Form I-485 (adjustment of status), I-130 (relative petition), I-765 (work permit), I-131 (advance parole), I-751 (removing conditions, when filed from overseas), and the same 2×2 inch standard is used for immigrant visa applications filed through DS-260. Diversity Visa lottery entries use a digital-only 600×600 px photo — use our DV Lottery Photo Checker for that.",
    },
    {
      question: "Can a bad photo really delay or reject my application?",
      answer:
        "Yes, and it's one of the most common reasons USCIS issues a Request for Evidence on an I-485 package. An RFE pauses your case for months while you resubmit compliant photos and wait for USCIS to re-queue the file. Photos that clearly fail the rules can also be rejected at a biometrics appointment or consular interview, adding more delay.",
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
      question: "How many photos do I need to send with my green card forms?",
      answer:
        "Most USCIS forms ask for two identical passport-style photos. Write your name and A-Number (if you have one) lightly in pencil or felt pen on the back of each photo, and put them in a small envelope or plastic bag stapled to the form so they don't get lost.",
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
        "No older than 6 months, since it needs to reflect how you look right now. Don't reuse a photo from an old passport or visa application — take a fresh one for each filing.",
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
        "Completely free, with no sign-up, no payment, and no watermark, and you can re-check as many times as you need. Your photo is sent over an encrypted connection to run the check and is never sold or shared with government agencies or advertisers.",
    },
  ];

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Green Card Photo Checker",
      url: "https://www.pixpassport.com/us-check-photo-green-card",
      description:
        "Free green card photo checker that verifies the 2×2 inch size, 50–69% head height, plain white background, and no-glasses rule for USCIS Forms I-485, I-130, I-765 and I-131.",
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
      name: "Green Card Photo Checker – Free USCIS I-485, I-130 & I-765 Photo Test",
      dateModified: "2026-10-07",
      url: "https://www.pixpassport.com/us-check-photo-green-card",
      citation: [
        "https://www.uscis.gov/forms/filing-guidance/checklist-of-required-initial-evidence-for-form-i-485-for-informational-purposes-only",
        "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/photos.html",
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
          name: "Green Card Photo Checker",
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
        lockCountry
        countryName="United States (USCIS / Green Card)"
        countryFlag="🇺🇸"
        initialDocType="passport"
        badgeText="🇺🇸 Built on USCIS & State Department Photo Rules · Free & Instant"
        title="Green Card Photo Checker"
        highlightTitle="Free USCIS Photo Test"
        subtitle="A single photo error can trigger a Request for Evidence and stall your adjustment of status or work permit. Upload your photo below and we'll check it against the 2×2 inch size, 1–1⅜ inch head height, plain white background, and strict no-glasses rule in seconds — before you file."
        specs={[
          { label: "Dimensions", value: "2 × 2 in (51 × 51 mm)" },
          { label: "Aspect Ratio", value: "1:1 Perfect Square" },
          { label: "Head Height", value: "50% – 69% (1 to 1⅜ in / 300 to 414 px)" },
          { label: "Eye Height", value: "56% – 69% from bottom edge" },
          { label: "Background", value: "Plain White / Off-White (No Shadows)" },
          { label: "Eyeglasses", value: "Strictly Prohibited (Zero Tolerance)" },
          { label: "Copies", value: "2 identical prints per form" },
          { label: "Recency", value: "Taken within last 6 months" },
        ]}
        requirements={[
          {
            icon: "📐",
            title: "Exact 2×2 Inch Square",
            desc: "We confirm your photo is a true 1:1 square that matches the printed 2×2 inch USCIS standard.",
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
            icon: "😐",
            title: "Neutral Expression Check",
            desc: "We look for a forward-facing pose, both eyes open, a closed mouth, and no head tilt.",
          },
          {
            icon: "🗓️",
            title: "Accepted Across USCIS Forms",
            desc: "The same 2×2 inch photo standard covers I-485, I-130, I-765, I-131 and I-751. Form I-90 needs no photos: USCIS takes one at biometrics.",
          },
        ]}
        requirementsHeading="What the Green Card Photo Checker Verifies"
        requirementsIntro="Each check follows the passport-style photo rules USCIS uses for immigration forms."
        stepsHeading="How to Check Your Green Card Photo"
        steps={[
          { title: "Take the Photo", desc: "Stand 4–6 feet from a plain white wall in daylight, no glasses, neutral expression." },
          { title: "Upload and Check", desc: "We measure the 2×2 inch framing, head height, eye line and background." },
          { title: "Print Two Copies", desc: "Once it passes, print two identical photos and attach them to your USCIS form." },
        ]}
        faqHeading="Green Card Photo FAQ"
        faqs={faqs}
        relatedHeading="More US Photo Checkers & Tools"
        relatedTools={[
          {
            title: "Green Card Photo Requirements",
            desc: "Form I-485 photo rules, photos per form and the December 2025 USCIS change.",
            href: "/us/green-card-photo-requirements",
            icon: "📋",
          },
          {
            title: "EAD (I-765) Photo Requirements",
            desc: "Work permit photos for first, renewal and replacement EADs.",
            href: "/us/ead-i-765-photo-requirements",
            icon: "💼",
          },
          {
            title: "USCIS Photo Requirements",
            desc: "Which USCIS forms need photos, and how many.",
            href: "/us/uscis-photo-requirements",
            icon: "🗂️",
          },
          {
            title: "DV Lottery Photo Checker",
            desc: "600×600 px digital photo check for the Diversity Visa entry.",
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
            title: "2x2 Picture Editor",
            desc: "Crop and resize photos to the exact 2×2 inch standard used for US visas and green cards.",
            href: "/2x2-picture-editor",
            icon: "✂️",
          },
          {
            title: "Visa Photo Checker",
            desc: "Check a visa photo for Schengen, India, China and more.",
            href: "/visa-photo-validator",
            icon: "🌐",
          },
        ]}
      />
    </>
  );
}