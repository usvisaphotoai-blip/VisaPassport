import type { Metadata, Viewport } from "next";
import DrivingLicencePhotoClient from "./DrivingLicencePhotoClient";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Driving Licence Photograph Maker – UK DVLA, US DMV & Global Sizes",
  description:
    "Create compliant driving licence photographs online in seconds. Auto-crop to official 35×45mm and 2×2 in sizes for UK DVLA, US DMV, EU, Australia, and IDP with background removal.",
  keywords: [
  
  ],
  alternates: {
    canonical: "https://www.pixpassport.com/driving-licence-photograph",
    languages: {
      en: "https://www.pixpassport.com/driving-licence-photograph",
      "x-default": "https://www.pixpassport.com/driving-licence-photograph",
    },
  },
  openGraph: {
    title: "Driving Licence Photograph Maker – UK DVLA, US DMV & Global Sizes",
    description:
      "Generate an official driving licence photo online. Perfect for UK DVLA, US DMV, EU, Australia, and international driving permits with automatic background removal.",
    url: "https://www.pixpassport.com/driving-licence-photograph",
    siteName: "PixPassport",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1784690540/uk-hero_m4cc8l.webp",
        width: 1200,
        height: 630,
        alt: "Driving Licence Photograph Maker Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Driving Licence Photograph Maker – UK DVLA, US DMV & Global Sizes",
    description:
      "Create a compliant driving licence photograph online in seconds. UK DVLA 35×45mm, US DMV 2×2 in, and EU standard templates.",
    images: ["https://res.cloudinary.com/dipzpwbbk/image/upload/v1784690540/uk-hero_m4cc8l.webp"],
  },
};

export default function DrivingLicencePhotographPage() {
  const faqs = [
    {
      question: "What size does a driving licence photograph need to be?",
      answer:
        "The required size depends on your issuing authority. For the UK DVLA and European Union countries, the driving licence photo must measure 35mm wide by 45mm tall. For the United States DMV and Real ID cards, the required size is 2×2 inches (51×51 mm / 600×600 px). For Australia, Canada, and India, 35×45mm is standard. Our online editor automatically applies the correct dimensions based on your selected country.",
    },
    {
      question: "Can I take my driving licence photo with a mobile phone?",
      answer:
        "Yes. You can easily take a photo using your smartphone. Stand about 4 to 6 feet in front of a plain wall under bright, even lighting. Have someone take the picture at eye level or use a tripod. Our tool will automatically crop to exact millimeter proportions, remove background shadows, and optimize resolution.",
    },
    {
      question: "Can I smile in my driving licence photograph?",
      answer:
        "Most licensing agencies (like the UK DVLA and US DMV) prefer a neutral facial expression with both eyes open and mouth closed. A slight, natural smile without showing teeth is often permitted, but exaggerated expressions, wide open mouths, or frowning will lead to rejection by automated facial recognition systems.",
    },
    {
      question: "Are eyeglasses allowed in driving licence photos?",
      answer:
        "For US DMV and Real ID photos, glasses are strictly prohibited. For the UK DVLA and EU licenses, everyday prescription glasses are permitted only if there is zero glare, no heavy reflections, and the frames do not cover any part of your eyes or pupils. Sunglasses and tinted lenses are completely banned.",
    },
    {
      question: "What should I wear for a driving licence photo?",
      answer:
        "Wear everyday casual clothing in darker or contrasting colors (such as navy, black, green, or burgundy) so that your shoulders stand out clearly against the light background. Avoid wearing white or cream tops that blend into the backdrop, and avoid uniforms or camouflage clothing.",
    },
    {
      question: "Can I use the same photo for my passport and driving licence?",
      answer:
        "Yes, in most jurisdictions (such as the UK, EU, and US), the biometric photo rules for driving licences and passports are identical in size and composition (35×45mm in the UK/EU and 2×2 inches in the US), as long as the photograph was taken within the past six months.",
    },
    {
      question: "How do I print my driving licence photo at home or in a pharmacy?",
      answer:
        "When you download your photo, PixPassport provides both a single high-resolution digital file (for online license renewal portals) and a 4×6 inch print template containing multiple identical photos. You can print this 4×6 sheet at any local photo kiosk (Walgreens, CVS, Boots, Tesco) or on a home photo printer on glossy photo paper.",
    },
    {
      question: "How recent does my driving licence photo need to be?",
      answer:
        "Licensing authorities require photos taken within the last 6 months to ensure an accurate, up-to-date likeness. Reusing an older photo from an expired card is one of the most common reasons renewals get delayed.",
    },
  ];

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Driving Licence Photograph Maker",
      url: "https://www.pixpassport.com/driving-licence-photograph",
      description:
        "Online tool to create compliant driving licence photographs for UK DVLA, US DMV, EU, Australia, and international permits.",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "32400",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Driving Licence Photograph Maker – UK DVLA, US DMV & Global Sizes",
      url: "https://www.pixpassport.com/driving-licence-photograph",
      description:
        "Online tool and comprehensive guide to create official driving licence photographs for UK DVLA, US DMV, EU, and international permits.",
      inLanguage: "en-US",
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
          name: "Driving Licence Photograph",
          item: "https://www.pixpassport.com/driving-licence-photograph",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Create a Compliant Driving Licence Photograph Online",
      description:
        "Step-by-step instructions to create an official driving licence photograph for UK DVLA, US DMV, or International Driving Permits.",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Select Your Licence Standard",
          text: "Choose your issuing authority such as UK DVLA (35×45 mm), US DMV (2×2 in), or International Driving Permit.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Upload a Portrait Photo",
          text: "Upload a casual selfie or portrait taken in daytime natural light against any plain wall.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Automatic AI Crop & Background Removal",
          text: "Our AI checks biometric head ratios, centers your eye line, replaces the background with compliant white or light grey, and formats to 300 DPI.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Download and Print",
          text: "Download your single digital JPEG and ready-to-print 4×6 inch multi-photo sheet to print locally for under $0.50.",
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
      <DrivingLicencePhotoClient faqs={faqs} />
    </>
  );
}
