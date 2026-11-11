import type { Metadata, Viewport } from "next";
import USADriverLicensePhotoClient from "./USADriverLicensePhotoClient";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

const PAGE_URL = "https://www.pixpassport.com/usa-driver-license-photo-editor";
const LAST_UPDATED = "2026-11-11";

export const metadata: Metadata = {
  title: "US Driver's License Photo Maker – 2×2 DMV & REAL ID Photo",
  description:
    "Make a 2×2 in (600×600 px) driver's license photo for AAA International Driving Permits, mail-in renewals and DMV prep. White background + 4×6 print sheet. Free preview.",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "en-US": PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
  openGraph: {
    title: "US Driver's License Photo Maker – 2×2 DMV & REAL ID Photo",
    description:
      "Turn a phone photo into a 2×2 inch driver's license, REAL ID or International Driving Permit photo. White background, correct head size, 4×6 print sheet.",
    url: PAGE_URL,
    siteName: "PixPassport",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.pixpassport.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "2×2 inch US driver's license photo made online with PixPassport",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "US Driver's License Photo Maker – 2×2 DMV & REAL ID Photo",
    description:
      "2×2 inch driver's license and International Driving Permit photos with a white background, correct head size and a 4×6 print sheet.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
  },
};

export default function USADriverLicensePhotoEditorPage() {
  const faqs = [
    {
      question: "What size is a US driver's license photo?",
      answer:
        "When a state or agency asks you to supply your own photo, the standard is the US passport format: 2×2 inches (51×51 mm), or 600×600 pixels for a digital file. Your head should measure 1 to 1⅜ inches (25–35 mm) from chin to crown, which is 50%–69% of the photo height, on a plain white or off-white background.",
    },
    {
      question: "Can I bring my own photo to the DMV for my driver's license?",
      answer:
        "Usually not. In most states the photo printed on your driver's license, REAL ID or state ID is taken by the DMV camera at the counter. Self-supplied 2×2 photos are mainly accepted for specific cases such as some out-of-state or military mail-in renewals (for example in Texas and Ohio) and the AAA International Driving Permit. Always check your state DMV's current instructions before sending a photo.",
    },
    {
      question: "When do I actually need my own 2×2 driver's license photo?",
      answer:
        "The most common reasons are: applying for an International Driving Permit through AAA (two identical 2×2 photos, signed on the back); renewing or replacing a license by mail while living out of state or serving in the military, where your state allows it; and practicing your pose, outfit and framing before a DMV appointment so you know how your license photo will look.",
    },
    {
      question: "Does the AAA International Driving Permit need passport photos?",
      answer:
        "Yes. The AAA paper application asks for two identical, recent passport-type photos measuring 2×2 inches, each signed on the back. Our tool produces a compliant 2×2 photo and a 4×6 print sheet with several copies, so you can print both photos in one go.",
    },
    {
      question: "Is a REAL ID photo different from a regular driver's license photo?",
      answer:
        "No. A REAL ID is a federally compliant license or ID card marked with a star, but the photo rules are set by each state and are the same as for a standard license: a front-facing, full-face photo on a plain light background with a neutral expression. REAL ID has been required for domestic flights and federal facilities since May 7, 2025.",
    },
    {
      question: "Can I wear glasses in my driver's license photo?",
      answer:
        "Most states now ask you to remove glasses for license photos, and sunglasses or tinted lenses are never allowed. Some states make a medical exception with a doctor's note. Removing glasses is the safest option because lens glare can hide your eyes and interfere with facial recognition.",
    },
    {
      question: "Can I smile in my DMV photo?",
      answer:
        "Several states, including California, New York, Texas and Florida, allow a natural closed-mouth smile, while others such as Virginia and North Carolina ask for a neutral expression. If you are unsure, keep a relaxed neutral face with your mouth closed and both eyes open; that is accepted everywhere.",
    },
    {
      question: "Can I wear a religious head covering in my license photo?",
      answer:
        "Yes. Every state allows religious head coverings as long as your full face is visible from hairline to chin and no shadows fall across it. Some states ask for a short statement or affidavit, so check your DMV's instructions before your visit.",
    },
    {
      question: "What should I wear for my driver's license photo?",
      answer:
        "Wear everyday clothing in solid, darker colors such as navy, black, burgundy or dark green that contrast with the white or light background. Avoid white or pale tops, busy patterns, uniforms, hats and large jewelry that reflects light.",
    },
    {
      question: "How do I print a 2×2 driver's license photo?",
      answer:
        "Download the 4×6 inch print sheet and order a standard 4×6 print at Walgreens, CVS, Walmart or Target, usually for under $0.50. Print at actual size (do not scale to fit), then cut out the 2×2 inch photos along the guides.",
    },
    {
      question: "How long does it take and what does it cost?",
      answer:
        "Processing takes about 30 seconds. You can preview the finished photo for free, and you only pay a one-time fee of $7.99 if you want to download the digital 2×2 photo and the 4×6 print sheet.",
    },
    {
      question: "What happens to my photo after I upload it?",
      answer:
        "Your original upload is deleted automatically within 24 hours, download links expire, and we never sell or share your images or biometric data.",
    },
  ];

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "US Driver's License Photo Maker",
      url: PAGE_URL,
      description:
        "Online tool that crops a photo to 2×2 inches (600×600 px), replaces the background with white and creates a 4×6 print sheet for US driver's license, REAL ID and International Driving Permit photos.",
      applicationCategory: "PhotographyApplication",
      operatingSystem: "Any (web browser)",
      browserRequirements: "Requires JavaScript",
      offers: {
        "@type": "Offer",
        price: "7.99",
        priceCurrency: "USD",
        url: PAGE_URL,
        availability: "https://schema.org/InStock",
      },
      publisher: { "@type": "Organization", name: "PixPassport", url: "https://www.pixpassport.com/" },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "US Driver's License Photo Maker – 2×2 DMV & REAL ID Photo",
      url: PAGE_URL,
      inLanguage: "en-US",
      dateModified: LAST_UPDATED,
      primaryImageOfPage: "https://www.pixpassport.com/us_non_imigrant.png",
      about: [
        { "@type": "Thing", name: "Driver's license photo" },
        { "@type": "Thing", name: "REAL ID" },
        { "@type": "Thing", name: "International Driving Permit" },
      ],
      isPartOf: { "@type": "WebSite", name: "PixPassport", url: "https://www.pixpassport.com/" },
      publisher: { "@type": "Organization", name: "PixPassport", url: "https://www.pixpassport.com/" },
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
          name: "US Driver's License Photo Maker",
          item: PAGE_URL,
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
      <USADriverLicensePhotoClient faqs={faqs} lastUpdated={LAST_UPDATED} />
    </>
  );
}