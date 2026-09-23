import type { Metadata, Viewport } from "next";
import USADriverLicensePhotoClient from "./USADriverLicensePhotoClient";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "USA Driver's License Photo Editor – Online Real ID & DMV Photo Maker",
  description:
    "Online photo editor for US Driver's Licenses and Real IDs. Automatically crop to official 2×2 inch (600×600 px) size, remove background, and generate compliant print sheets for any US State DMV.",
  keywords: [
   
  ],
  alternates: {
    canonical: "https://www.pixpassport.com/usa-driver-license-photo-editor",
    languages: {
      en: "https://www.pixpassport.com/usa-driver-license-photo-editor",
      "x-default": "https://www.pixpassport.com/usa-driver-license-photo-editor",
    },
  },
  openGraph: {
    title: "USA Driver's License Photo Editor – Online Real ID & DMV Photo Maker",
    description:
      "Easily create compliant 2×2 in Real ID and US driver's license photos online. Auto-crops, removes background, and generates 4×6 print templates for local printing.",
    url: "https://www.pixpassport.com/usa-driver-license-photo-editor",
    siteName: "PixPassport",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1784690540/us-hero.webp",
        width: 1200,
        height: 630,
        alt: "USA Driver's License Photo Editor Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "USA Driver's License Photo Editor – Real ID & DMV Maker",
    description:
      "Instant online editor for 2×2 inch US driver's license and Real ID photos with automatic background removal and 300 DPI export.",
    images: ["https://res.cloudinary.com/dipzpwbbk/image/upload/v1784690540/us-hero.webp"],
  },
};

export default function USADriverLicensePhotoEditorPage() {
  const faqs = [
    {
      question: "What are the photo dimensions for a USA Driver's License and Real ID?",
      answer:
        "The standard photo size for a US Driver's License, Real ID, and State ID card is 2×2 inches (51×51 mm). In digital pixels at 300 DPI, this is exactly 600×600 pixels (up to 1200×1200 pixels). The head must take up between 50% and 69% of the photo's total height (1 inch to 1 3/8 inches from the bottom of the chin to the top of the head).",
    },
    {
      question: "Can I bring my own printed photo to the DMV?",
      answer:
        "Yes, in many states and for mail-in or online driver's license renewals, you can submit your own compliant 2×2 inch photograph. In states where the DMV camera takes your picture on-site, having your photo pre-formatted and ready ensures you have a compliant reference image and can preview your appearance before your appointment.",
    },
    {
      question: "Are eyeglasses permitted for US Driver's License and Real ID photos?",
      answer:
        "Under federal Real ID and Department of State guidelines, eyeglasses and sunglasses are strictly prohibited. Even prescription glasses must be removed to avoid lens glare and reflections that interfere with automated biometric facial recognition software.",
    },
    {
      question: "What background color is required for a US Driver's License photo?",
      answer:
        "State DMVs require a plain, smooth white or off-white background with even lighting and no visible shadows behind the head or shoulders. Our tool automatically detects and replaces your background with a compliant, uniform backdrop.",
    },
    {
      question: "Can I smile in my US Driver's License photo?",
      answer:
        "Most state DMVs allow a natural, relaxed expression or a very subtle smile with your mouth closed. Exaggerated smiles, laughing, showing teeth, or squinting are not permitted because they alter the biometric proportions of your facial features.",
    },
    {
      question: "What should I wear for a DMV or Real ID photo?",
      answer:
        "Wear everyday casual clothing in dark or vibrant colors (like navy, dark green, black, or royal blue) that contrast cleanly with the white background. Avoid wearing white shirts, camouflage patterns, uniforms, or large jewelry that obscures your neck or collarbone.",
    },
    {
      question: "How do I print my driver's license photo on 4×6 photo paper?",
      answer:
        "PixPassport generates a standard 4×6 inch print template containing 4 identical 2×2 inch photos. You can send this 4×6 file to your local Walgreens, CVS, Walmart, or Target photo kiosk for under $0.50 and cut the photos out with scissors.",
    },
    {
      question: "What is the turnaround time for generating my license photo?",
      answer:
        "Our automated AI processing engine detects your facial landmarks, crops to exact dimensions, replaces the background, and generates both digital and 4×6 print files in under 30 seconds.",
    },
  ];

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "USA Driver's License Photo Editor",
      url: "https://www.pixpassport.com/usa-driver-license-photo-editor",
      description:
        "Online tool to crop, edit, and format photos for US Driver's Licenses and Real IDs across all 50 US states.",
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
      name: "USA Driver's License Photo Editor – Real ID & DMV Standards",
      url: "https://www.pixpassport.com/usa-driver-license-photo-editor",
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
          name: "USA Driver's License Photo Editor",
          item: "https://www.pixpassport.com/usa-driver-license-photo-editor",
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
      <USADriverLicensePhotoClient faqs={faqs} />
    </>
  );
}