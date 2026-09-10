import type { Metadata, Viewport } from "next";
import PhotoCheckerTool from "@/app/components/PhotoCheckerTool";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "DV Lottery Photo Checker – Free Green Card Photo Validator 2026/2027",
  description:
    "Free DV Lottery photo checker for the 2026/2027 Diversity Visa program. Instantly verify the 600×600px square size, 50–69% head height, 240KB file limit, and every US Department of State requirement before you submit.",
  keywords: [
  
  ],
  alternates: {
    canonical: "https://www.pixpassport.com/diversity-visa-lottery-photo-checker",
    languages: {
      en: "https://www.pixpassport.com/diversity-visa-lottery-photo-checker",
      "x-default": "https://www.pixpassport.com/diversity-visa-lottery-photo-checker",
    },
  },
  openGraph: {
    title: "DV Lottery Photo Checker – Free Green Card Photo Validator",
    description:
      "Don't get disqualified over a photo. Check your DV Lottery entry photo against every official rule: 600×600px, 50–69% head height, 240KB, no glasses, plain white background.",
    url: "https://www.pixpassport.com/diversity-visa-lottery-photo-checker",
    siteName: "PixPassport",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_visa_photo_example_whvfqt.jpg",
        width: 1200,
        height: 630,
        alt: "Diversity Visa Lottery Photo Checker Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DV Lottery Photo Checker – Free Green Card Photo Validator",
    description:
      "Check your DV Lottery photo before you submit it. Free test against every US State Department rule: size, head height, file size, and background.",
    images: ["https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_visa_photo_example_whvfqt.jpg"],
  },
};

export default function DVLotteryPhotoCheckerPage() {
  const faqs = [
    {
      question: "Can a bad photo really disqualify my DV Lottery entry?",
      answer:
        "Yes, and it happens to a large number of entrants every cycle. The Kentucky Consular Center runs every uploaded photo through an automated check before your entry is even accepted, and entries that fail are thrown out with no warning. You typically won't find out until you check your entry status months later and see a disqualification notice, by which point the entry window has already closed. Running your photo through a checker before you submit removes almost all of that risk.",
    },
    {
      question: "What exact pixel dimensions does a DV Lottery photo need?",
      answer:
        "The photo must be a perfectly square digital image, 600 pixels wide by 600 pixels tall, saved as a JPEG. If you're scanning a printed photo instead of using a digital file, it should measure 2×2 inches (51×51mm) at 300 DPI. Rectangular crops, even ones that are only a pixel or two off from square, are rejected by the upload portal automatically.",
    },
    {
      question: "How is the head height requirement measured?",
      answer:
        "Head height is measured from the bottom of the chin straight up to the top of the head, including hair, and it needs to fill between 50% and 69% of the photo's total height — roughly 300 to 414 pixels out of the 600-pixel frame. On top of that, your eyes need to sit between 56% and 69% of the way up from the bottom edge. Photos taken too far back leave the head too small; photos cropped too tight push it over the maximum.",
    },
    {
      question: "Am I allowed to wear glasses in my DV Lottery photo?",
      answer:
        "No. Eyeglasses have been completely banned in US visa and passport photography since November 2016, and the Diversity Visa program follows that same rule with no exceptions. This includes prescription glasses, reading glasses, and tinted or photochromic lenses. If your eyes aren't fully visible without any lens between them and the camera, the photo will be flagged.",
    },
    {
      question: "What's the maximum file size for the DV Lottery upload portal?",
      answer:
        "dvprogram.state.gov caps uploads at 240 KB, and the file has to be a JPEG using 24-bit sRGB color. If your phone or camera saves images much larger than that, you'll need to compress the file without dropping the resolution below 600×600px, since aggressive compression that blurs facial detail can also cause a manual review to reject it.",
    },
    {
      question: "Can I reuse the photo I used for a previous year's entry?",
      answer:
        "No. The State Department requires that your photo be taken within the last six months, and reusing an older image — even one that was accepted in a prior DV cycle — goes against that rule. Your appearance can change enough in a year that an outdated photo also risks failing an identity check later in the immigrant visa process, so it's worth taking a fresh one each time you enter.",
    },
    {
      question: "Does the background have to be pure white?",
      answer:
        "It needs to be plain white or an off-white so light it reads as white, with even lighting and no visible shadow, texture, pattern, or other people or objects behind you. Colored walls, patterned curtains, and busy indoor backgrounds are common reasons entries fail the automated check, since the software specifically measures the uniformity of the tone behind your head and shoulders.",
    },
    {
      question: "Can I submit a photo of myself wearing a hat or head covering?",
      answer:
        "Only if it's worn daily for religious reasons, and even then your full face from the bottom of the chin to the top of the forehead needs to remain visible, with no shadow falling across your features from the covering itself. Hats, sunglasses, or headphones worn for any other reason are not permitted and will cause the photo to be rejected.",
    },
    {
      question: "Do I need a neutral expression, or can I smile?",
      answer:
        "A neutral expression with your mouth closed is what the program expects, and both eyes should be open and looking directly at the camera. A natural smile without teeth showing is tolerated by some reviewers, but a wide grin, raised eyebrows, or a tilted head can all be read as non-compliant, so the safest choice is a relaxed, straight-on expression.",
    },
    {
      question: "Can I use a selfie for my DV Lottery photo?",
      answer:
        "It's possible, but it's the riskiest option. Front-camera lenses on phones are wide-angle, which distorts the proportions of your nose and face at close range and can throw off the head-height measurement. If you do use a phone, have someone else hold it at eye level a few feet away instead of shooting an arm's-length selfie, then check the result before you upload it.",
    },
    {
      question: "Will color casts or filters get my photo rejected?",
      answer:
        "Yes. Instagram-style filters, warm or cool color grading, heavy skin-smoothing, and auto-enhance features on some phone cameras can all shift the color balance enough to fail the sRGB and lighting checks. Submit the photo as close to the unedited original as possible, taken in natural daylight rather than under colored indoor lighting.",
    },
    {
      question: "Is this DV Lottery photo checker actually free?",
      answer:
        "Yes, completely. You can upload and re-check your photo as many times as you need at no cost, with no account required and no watermark placed on your image, right up until you're confident it will pass on the official portal.",
    },
    {
      question: "Can I include my spouse or children in the same photo?",
      answer:
        "No. Every applicant listed on a DV Lottery entry, including a spouse and any unmarried children under 21, needs their own individual photo uploaded separately, even if the whole family is entering together. A group photo, or one where another person is visible in the frame, will be rejected for that applicant.",
    },
    {
      question: "What happens if the photo checker flags an issue?",
      answer:
        "You'll see which specific rule the photo failed — for example, head height outside the allowed range, a non-white background, or a file over the 240 KB limit — along with a plain-language explanation of what to change. Retake or re-edit the photo, upload it again, and repeat the check until every item comes back passing before you submit it on dvprogram.state.gov.",
    },
  ];

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Diversity Visa Lottery Photo Checker Online",
      url: "https://www.pixpassport.com/diversity-visa-lottery-photo-checker",
      description:
        "Free DV Lottery photo checker that verifies the 600×600px square size, 50–69% head height, 240KB file limit, and other US Department of State photo requirements before submission.",
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
      name: "Diversity Visa Lottery Photo Checker",
      url: "https://www.pixpassport.com/diversity-visa-lottery-photo-checker",
      citation: [
        "https://travel.state.gov/content/travel/en/us-visas/immigrate/diversity-visa-program-entry/diversity-visa-submit-entry1.html",
        "https://dvprogram.state.gov/",
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
          name: "Diversity Visa Lottery Photo Checker",
          item: "https://www.pixpassport.com/diversity-visa-lottery-photo-checker",
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
        countryName="United States (DV / Green Card)"
        countryFlag="🇺🇸"
        initialDocType="passport"
        badgeText="🇺🇸 Built on the Official DV-2027 State Dept Spec · Free & Instant"
        title="DV Lottery Photo Checker"
        highlightTitle="Free Green Card Photo Validator"
        subtitle="One bad photo is enough to get a Diversity Visa entry thrown out with no warning. Upload yours here first and see exactly whether it meets the 600×600px square size, 50–69% head height, 240KB file cap, and every other rule the dvprogram.state.gov portal checks for."
        specs={[
          { label: "Dimensions", value: "600 × 600 px (2×2 in / 51×51 mm)" },
          { label: "Aspect Ratio", value: "Square (1:1 Ratio)" },
          { label: "Head Height", value: "50% – 69% (300 – 414 px)" },
          { label: "Eye Height", value: "56% – 69% from bottom" },
          { label: "Max File Size", value: "240 KB (JPEG format)" },
          { label: "Eyewear", value: "Strictly Prohibited (No Glasses)" },
        ]}
        requirements={[
          {
            icon: "📐",
            title: "Perfect 600×600px Square",
            desc: "Confirms your file is an exact 1:1 square at 600×600 pixels — the precise canvas the dvprogram.state.gov upload form expects, with no cropping tolerance.",
          },
          {
            icon: "📏",
            title: "Head Height Between 50–69%",
            desc: "Measures chin-to-crown height in pixels and flags photos where the head is cropped too tight or the subject was photographed too far from the camera.",
          },
          {
            icon: "👁️",
            title: "Eye Line at 56–69%",
            desc: "Locates your eyes and checks their vertical position falls inside the exact biometric band the State Department's automated review looks for.",
          },
          {
            icon: "🕶️",
            title: "Zero Tolerance for Eyewear",
            desc: "Scans for glasses, sunglasses, and tinted lenses of any kind — one of the single most common reasons DV entries get disqualified.",
          },
          {
            icon: "🎨",
            title: "Plain, Evenly Lit Background",
            desc: "Checks for a solid white or off-white backdrop with no shadows, patterns, textures, or other people or objects visible behind you.",
          },
          {
            icon: "💾",
            title: "File Size Under 240 KB",
            desc: "Verifies your JPEG sits under the strict 240 KB ceiling in 24-bit sRGB color without compression artifacts that would blur facial detail.",
          },
          {
            icon: "😐",
            title: "Neutral, Forward-Facing Pose",
            desc: "Confirms a straight-on head position, both eyes open, and a relaxed expression free of exaggerated smiling or head tilt.",
          },
          {
            icon: "🗓️",
            title: "Recent, Unedited Capture",
            desc: "Reminds you the photo needs to be less than six months old and free of filters, color grading, or heavy retouching that can distort skin tone.",
          },
        ]}
        faqs={faqs}
        relatedTools={[
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
            title: "Australian Photo Checker",
            desc: "Test your image against the official DFAT and Australian Passport Office standards.",
            href: "/australian-passport-photo-checker",
            icon: "🇦🇺",
          },
          {
            title: "2x2 Picture Editor",
            desc: "Crop and resize photos to the exact 2×2 inch standard used for US visas and green cards.",
            href: "/2x2-picture-editor",
            icon: "✂️",
          },
          {
            title: "US Visa Photo Editor",
            desc: "Format 600×600 px digital photos with pure white background for DS-160.",
            href: "/us-visa-photo-editor",
            icon: "🇺🇸",
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