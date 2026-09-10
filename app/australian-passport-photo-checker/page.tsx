import type { Metadata, Viewport } from "next";
import PhotoCheckerTool from "@/app/components/PhotoCheckerTool";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Australian Passport Photo Checker – Free DFAT & APO Photo Test",
  description:
    "Free Australian passport photo checker. Verify the 35×45mm size, 32–36mm face height, plain white background, and every official DFAT and Australian Passport Office rule before you apply.",
  keywords: [
    "australian passport photo checker",
    "australia passport photo requirements",
    "apo passport photo size",
    "dfat photo checker",
    "australian passport photo online free",
    "check australian passport photo",
    "immiaccount photo requirements",
    "australian passport photo rejected",
  ],
  alternates: {
    canonical: "https://www.pixpassport.com/australian-passport-photo-checker",
    languages: {
      en: "https://www.pixpassport.com/australian-passport-photo-checker",
      "x-default": "https://www.pixpassport.com/australian-passport-photo-checker",
    },
  },
  openGraph: {
    title: "Australian Passport Photo Checker – Free DFAT & APO Photo Test",
    description:
      "Check your Australian passport or visa photo before you submit it. Free test against the 35×45mm size, 32–36mm face height, and background rules the APO enforces.",
    url: "https://www.pixpassport.com/australian-passport-photo-checker",
    siteName: "PixPassport",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_visa_photo_example_whvfqt.jpg",
        width: 1200,
        height: 630,
        alt: "Australian Passport Photo Checker Online Free",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Australian Passport Photo Checker – Free DFAT & APO Photo Test",
    description:
      "Free Australian passport photo test. Checks 35×45mm size, 32–36mm face height, and background against official APO standards.",
    images: ["https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_visa_photo_example_whvfqt.jpg"],
  },
};

export default function AustralianPassportPhotoCheckerPage() {
  const faqs = [
    {
      question: "What size does an Australian passport photo need to be?",
      answer:
        "Every Australian passport photo needs to measure exactly 35mm wide by 45mm tall. If you're uploading a digital file rather than a printed photo, that translates to a minimum of 413 × 531 pixels at 300 DPI, saved as a JPEG. Anything smaller, or cropped to a different ratio, will be knocked back at the printing or upload stage.",
    },
    {
      question: "What is the 32–36mm face height rule the APO enforces?",
      answer:
        "The Australian Passport Office measures the distance from the bottom of your chin straight up to the top of your head — including hair — and requires that measurement to sit between 32mm and 36mm within the 45mm-tall frame. Stand too close to the camera and your face fills more than 36mm; stand too far back and it falls under 32mm. Either way, the photo is rejected before it even reaches a human reviewer.",
    },
    {
      question: "Am I allowed to wear glasses in an Australian passport photo?",
      answer:
        "Generally, no. Since mid-2016 the Australian Government has banned eyeglasses in passport photos, including ordinary prescription lenses and reading glasses, so that automated SmartGate systems at airports can read your eyes without any interference. The only exception is a documented medical condition, and in that case you'll need a signed certificate from a doctor or optometrist submitted alongside your application.",
    },
    {
      question: "What background does the Australian Passport Office require?",
      answer:
        "The background has to be plain white or a very light, neutral color, lit evenly with no visible shadow, texture, or pattern anywhere behind you. A shadow cast onto the wall from overhead lighting or a nearby object is consistently one of the top reasons the APO sends photos back, so it's worth checking the backdrop as carefully as your framing.",
    },
    {
      question: "Does this checker also work for ImmiAccount visa photos?",
      answer:
        "Yes. The Department of Home Affairs applies the same 35×45mm dimensions and 32–36mm face height rule to visa photos uploaded through ImmiAccount as the Australian Passport Office uses for passport applications, so a photo that passes this check is set up correctly for either submission.",
    },
    {
      question: "What expression and head position does the photo need?",
      answer:
        "A neutral expression with your mouth closed is expected, along with both eyes open and looking directly at the camera. Your head should be facing forward without a tilt, and your shoulders should sit level and square to the camera rather than angled off to one side.",
    },
    {
      question: "Can children's passport photos follow the same rules?",
      answer:
        "Mostly, yes, though the APO does allow a little more flexibility for infants and very young children who can't hold a neutral expression or sit unsupported. A parent's hands or another support can be present in the frame as long as they're not visible in the final photo, and the same 35×45mm size and background requirements still apply.",
    },
    {
      question: "How recent does my Australian passport photo need to be?",
      answer:
        "Your photo should have been taken within the last six months and needs to be a genuine likeness of how you currently look, including your hairstyle and any facial hair. Reusing an old photo, or one that's been retouched to change your appearance, is treated the same way as submitting a non-compliant image.",
    },
    {
      question: "Can I take my Australian passport photo with a phone camera?",
      answer:
        "Yes, a recent phone camera has more than enough resolution. Position yourself around 1.5 meters from a plain, evenly lit wall, have someone else hold the phone at eye level rather than shooting a selfie, and avoid using flash directly on your face, since that's a common cause of the glare and shadow issues that lead to rejection.",
    },
    {
      question: "What happens if the checker flags my photo?",
      answer:
        "You'll be shown exactly which rule the photo failed — whether that's the face height being outside 32–36mm, a background that isn't plain white, or glasses being detected — along with a plain explanation of what to fix. You can then retake the photo or adjust it and upload the new version to check again, at no cost and with no limit on attempts.",
    },
    {
      question: "Is this Australian passport photo checker free to use?",
      answer:
        "Yes, completely free with unlimited checks. There's no account to create, no card details to enter, and no watermark added to your image — you can keep testing revisions until you're confident it will pass at the post office or through ImmiAccount.",
    },
    {
      question: "Does the tool store or share my uploaded photo?",
      answer:
        "No. Your photo is processed only for the length of time it takes to generate your compliance report and is not saved to a permanent database or shared with the Australian Passport Office, the Department of Home Affairs, or any other third party.",
    },
    {
      question: "Can I check a photo booth photo instead of a phone photo?",
      answer:
        "Yes. Photograph the printed strip clearly under good lighting, or scan it if a scanner is available, then upload that image the same way you would a digital shot. The checker measures proportions and background tone the same way regardless of whether the original image came from a photo booth, a professional studio, or your own camera.",
    },
    {
      question: "Why do so many Australian passport applications get sent back over photos?",
      answer:
        "Because the tolerances are tight and unforgiving — a face height that's a couple of millimetres outside 32–36mm, a background with a faint shadow, or glasses left on by habit are all enough to fail the check on their own, and none of them are obvious to the naked eye when you're taking the photo yourself. Running the photo through a checker before you print or upload it catches these issues while they're still easy to fix.",
    },
  ];

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Australian Passport Photo Checker Online Free",
      url: "https://www.pixpassport.com/australian-passport-photo-checker",
      description:
        "Free online Australian passport photo checker that verifies the 35×45mm size, 32–36mm chin-to-crown face height, plain white background, and other APO and DFAT requirements.",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "AUD",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Australian Passport Photo Checker",
      url: "https://www.pixpassport.com/australian-passport-photo-checker",
      citation: [
        "https://www.passports.gov.au/getting-passport-how-it-works/photo-guidelines",
        "https://immi.homeaffairs.gov.au/",
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
          name: "Australian Passport Photo Checker",
          item: "https://www.pixpassport.com/australian-passport-photo-checker",
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
        initialCountry="AU"
        countryName="Australia"
        countryFlag="🇦🇺"
        initialDocType="passport"
        badgeText="🇦🇺 Built on Official DFAT & APO Rules · Free & Instant"
        title="Australian Passport Photo Checker"
        highlightTitle="Free DFAT & APO Compliance Test"
        subtitle="Post offices and ImmiAccount both apply the same strict rulebook, and a photo that misses it by even a millimetre gets sent back. Upload yours here first to confirm the 35×45mm size, 32–36mm face height, background, and expression all meet the Australian Passport Office standard before you pay for a printed submission or lodge it online."
        specs={[
          { label: "Dimensions", value: "35 × 45 mm" },
          { label: "Face Height", value: "32 – 36 mm (chin to crown)" },
          { label: "Background", value: "Plain White (Shadow-free)" },
          { label: "Eyeglasses", value: "Strictly Prohibited" },
          { label: "Digital Size", value: "Min 413 × 531 px (300 DPI)" },
          { label: "Expression", value: "Neutral, mouth closed" },
        ]}
        requirements={[
          {
            icon: "📐",
            title: "Exact 35×45 mm Frame",
            desc: "Confirms your printed or digital photo matches the precise APO dimensions before it's rejected for being off by even a fraction of a millimetre.",
          },
          {
            icon: "📏",
            title: "32–36 mm Chin-to-Crown",
            desc: "Maps facial landmarks to check your head height falls within the mandatory range, catching the too-close and too-far mistakes that account for most fails.",
          },
          {
            icon: "🎨",
            title: "Plain White Background",
            desc: "Scans for even lighting and flags shadows, tinted walls, or texture behind you — the single most common reason the APO sends photos back.",
          },
          {
            icon: "🕶️",
            title: "No Eyeglasses (APO Ban)",
            desc: "Detects any eyewear in the frame to enforce the Australian Government's strict no-glasses policy used for SmartGate biometric matching.",
          },
          {
            icon: "😐",
            title: "Neutral Facial Expression",
            desc: "Checks that your mouth is closed, both eyes are open and facing the camera, and your head isn't tilted or turned off-center.",
          },
          {
            icon: "🖥️",
            title: "ImmiAccount & APO Ready",
            desc: "Prepares your file format and proportions for direct upload to both the passport renewal portal and Department of Home Affairs visa applications.",
          },
          {
            icon: "🗓️",
            title: "Current Likeness Reminder",
            desc: "Flags the six-month freshness expectation so you're not submitting an outdated photo that no longer matches your appearance.",
          },
          {
            icon: "🎯",
            title: "Clear Fix Guidance",
            desc: "Every flagged issue comes with a plain-language explanation of the cause, so you know exactly what to adjust before your next attempt.",
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
            title: "DV Lottery Photo Checker",
            desc: "Validate 600×600 px digital requirements for the US Green Card lottery.",
            href: "/diversity-visa-lottery-photo-checker",
            icon: "🎟️",
          },
          {
            title: "Australia Passport Photo Maker",
            desc: "Crop, fix background, and generate compliant 35×45mm Australian photos.",
            href: "/australia-passport-photo-editor",
            icon: "🇦🇺",
          },
          {
            title: "UK Passport Photo Checker",
            desc: "Official GOV.UK 35×45mm passport photo compliance checker.",
            href: "/uk-passport-photo-checker-online-free",
            icon: "🇬🇧",
          },
          {
            title: "Visa Photo Validator",
            desc: "Global validator built on ICAO standards for 50+ countries.",
            href: "/visa-photo-validator",
            icon: "🌐",
          },
        ]}
      />
    </>
  );
}