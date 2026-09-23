import type { Metadata, Viewport } from "next";
import USADMVPictureClient from "./USADMVPictureClient";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "USA DMV Picture Maker – Real ID Photo Guidelines & Online Creator",
  description:
    "Prepare your USA DMV picture before your appointment. Learn official DMV photo rules, what to wear, hairstyle and background guidelines, and create compliant 2×2 inch Real ID pictures online.",
  keywords: [
  
  ],
  alternates: {
    canonical: "https://www.pixpassport.com/usa-dmv-picture",
    languages: {
      en: "https://www.pixpassport.com/usa-dmv-picture",
      "x-default": "https://www.pixpassport.com/usa-dmv-picture",
    },
  },
  openGraph: {
    title: "USA DMV Picture Maker – Real ID Photo Guidelines & Online Creator",
    description:
      "Get a flattering and 100% compliant DMV picture. Learn state DMV photo guidelines, what colors to wear, glasses rules, and format your photo online in seconds.",
    url: "https://www.pixpassport.com/usa-dmv-picture",
    siteName: "PixPassport",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1784690540/us-hero.webp",
        width: 1200,
        height: 630,
        alt: "USA DMV Picture Guidelines and Online Creator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "USA DMV Picture Maker – Real ID Guidelines & Creator",
    description:
      "Prepare your USA DMV picture with official Real ID dimensions (2×2 in / 600×600 px), plain background, and no-glasses compliance.",
    images: ["https://res.cloudinary.com/dipzpwbbk/image/upload/v1784690540/us-hero.webp"],
  },
};

export default function USADMVPicturePage() {
  const faqs = [
    {
      question: "Can I smile in my USA DMV picture?",
      answer:
        "Most state motor vehicle departments allow a natural, relaxed expression with a subtle, closed-mouth smile. Avoid a wide open-mouth smile or bared teeth, since these disrupt the facial landmarks that state biometric software measures. Keep your eyes open and look straight at the camera for the cleanest result.",
    },
    {
      question: "What color should I wear for my DMV picture?",
      answer:
        "Wear a solid dark or rich color such as navy, emerald, burgundy, or charcoal. These shades create clean contrast against the DMV's white or light grey backdrop. Skip white, cream, and pale pastels, since they blend into the background and wash out your photo.",
    },
    {
      question: "Are eyeglasses allowed in DMV driver's license pictures?",
      answer:
        "No. Federal Real ID standards ban eyeglasses, sunglasses, and tinted lenses in every state's driver's license photo. Take your glasses off before the picture to prevent glare and flash reflections across your eyes.",
    },
    {
      question: "How should I style my hair for a DMV picture?",
      answer:
        "Pull your hair away from your face so both eyes, both eyebrows, your cheeks, and your full jawline stay visible. Skip tall updos, wide buns, or voluminous styles that push past the top or sides of the 2×2 inch frame.",
    },
    {
      question: "Can I use an online tool to format my DMV picture?",
      answer:
        "Yes. PixPassport analyzes your portrait, swaps in a compliant solid white background, crops your head to the required 50–69% height ratio, and hands you a high-resolution digital file plus a 4×6 print sheet you can print for under $0.50 at most pharmacies.",
    },
    {
      question: "Do all states use the same DMV photo rules?",
      answer:
        "Core rules stay consistent nationwide because Real ID is a federal standard: no glasses, a plain background, and a neutral expression. Some states add small extras, like requiring you to remove hats even for religious coverings during the actual in-office photo, so check your local DMV page if you're unsure.",
    },
    {
      question: "Can I upload this photo for an online license renewal?",
      answer:
        "Many states now accept a self-submitted photo for online renewal, as long as it meets the same 2×2 inch, plain-background, no-glasses standard used in-office. Check your state DMV's renewal portal for its exact upload size and file-type requirements before you submit.",
    },
    {
      question: "What happens if my DMV photo gets rejected at the counter?",
      answer:
        "A clerk will simply ask you to retake it on the spot using their in-office camera, so a rejection rarely means a wasted trip. Preparing a compliant look in advance, correct attire, hair off your face, no glasses, still saves you time and avoids a second appointment for a fully digital renewal.",
    },
    {
      question: "Do children need a different photo for a state ID?",
      answer:
        "Children follow the same 2×2 inch, plain-background format as adults, with no other person visible in the frame. Younger kids can have help getting positioned, but the final crop must show only the child's face, centered and clearly visible.",
    },
    {
      question: "How often do I need a new DMV picture?",
      answer:
        "You typically need a new photo each time you renew your license or state ID, generally every 4 to 8 years depending on your state. Some states also require a fresh photo after a name change, a lost card replacement, or a REAL ID upgrade.",
    },
    {
      question: "Can I wear a hat or head covering in my DMV picture?",
      answer:
        "Head coverings worn for religious or medical reasons are usually allowed, but your full face from chin to hairline must stay visible with no shadow across it. Fashion hats, caps, and hoods are not permitted in any state.",
    },
    {
      question: "Will a visible tattoo, piercing, or scar cause a problem?",
      answer:
        "No. DMV photos capture your natural appearance, so visible tattoos, piercings, and scars are perfectly fine and require no special handling. The only rule is that nothing covers or obscures your facial features.",
    },
  ];

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "USA DMV Picture Maker",
      url: "https://www.pixpassport.com/usa-dmv-picture",
      description:
        "Online tool and guide to prepare compliant USA DMV and Real ID pictures with official biometric specifications.",
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
      name: "USA DMV Picture – Real ID Guidelines & Online Maker",
      url: "https://www.pixpassport.com/usa-dmv-picture",
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
          name: "USA DMV Picture",
          item: "https://www.pixpassport.com/usa-dmv-picture",
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
      <USADMVPictureClient faqs={faqs} />
    </>
  );
}