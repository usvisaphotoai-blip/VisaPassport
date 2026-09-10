import type { Metadata, Viewport } from "next";
import PhotoCheckerTool from "@/app/components/PhotoCheckerTool";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Passport Photo Checker – Free Biometric Compliance Check Online",
  description:
    "Free passport photo checker online. Check your photo against official ICAO 9303 biometric standards for 50+ countries. Instant pass/fail analysis with zero sign-up.",
  keywords: [
    "passport photo checker",
    "check passport photo online",
    "passport photo validator",
    "biometric passport photo check",
    "icao passport photo checker",
    "online passport photo test",
    "passport picture checker free",
  ],
  alternates: {
    canonical: "https://www.pixpassport.com/passport-photo-checker",
    languages: {
      en: "https://www.pixpassport.com/passport-photo-checker",
      "x-default": "https://www.pixpassport.com/passport-photo-checker",
    },
  },
  openGraph: {
    title: "Passport Photo Checker – Free Biometric Compliance Check Online",
    description:
      "Instant passport photo compliance check online. Verify dimensions, head ratios, background uniformity, and lighting for 50+ countries.",
    url: "https://www.pixpassport.com/passport-photo-checker",
    siteName: "PixPassport",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_visa_photo_example_whvfqt.jpg",
        width: 1200,
        height: 630,
        alt: "Passport Photo Checker Online Free",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Passport Photo Checker – Free Biometric Compliance Check Online",
    description:
      "Free passport photo compliance check online. Verifies dimensions, head ratios, background, and lighting for 50+ countries.",
    images: ["https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_visa_photo_example_whvfqt.jpg"],
  },
};

export default function PassportPhotoCheckerPage() {
  const faqs = [
    {
      question: "How does this passport photo checker work?",
      answer:
        "The tool analyzes your photo using advanced biometric facial landmark detection. It measures head-to-frame proportions, eye alignment, background color uniformity, and lighting gradients against the official government specifications of your selected country.",
    },
    {
      question: "Which countries does this passport photo checker support?",
      answer:
        "Over 50 countries are supported, including the United States, United Kingdom, Canada, Australia, India, China, and all Schengen European Union nations. Each country uses its specific embassy guidelines rather than generic estimates.",
    },
    {
      question: "Will my photo be accepted by the passport office if it passes?",
      answer:
        "This tool verifies all measurable biometric criteria (head height, dimensions, eye line, background uniformity, and pose) that automated passport systems test. If your photo passes all checks and is printed on quality photo paper or uploaded in digital format, it is fully compliant with official requirements.",
    },
    {
      question: "Can I check both passport and visa photos?",
      answer:
        "Yes. You can switch between Passport Photo and Visa Photo for any supported country. The tool will adjust the tested dimensions, background color rules, and head ratios accordingly.",
    },
    {
      question: "Is this photo check private and secure?",
      answer:
        "Yes. Your photo is processed in a secure, ephemeral session and is never stored permanently, sold, or shared with any third party.",
    },
    {
      question: "What are the most common reasons passport photos are rejected?",
      answer:
        "The top reasons include incorrect head size (too large or small in the frame), shadows on the background or face, wearing eyeglasses, uneven lighting or flash glare, tilted head, and smiling.",
    },
  ];

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Passport Photo Checker Online Free",
      url: "https://www.pixpassport.com/passport-photo-checker",
      description:
        "Free passport photo checker online. Checks biometric standards, head proportions, background, and dimensions for 50+ countries.",
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
      name: "Passport Photo Checker",
      url: "https://www.pixpassport.com/passport-photo-checker",
      citation: [
        "https://www.icao.int/Security/FAL/PKI/Pages/ICAO-Doc-9303.aspx",
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
          name: "Passport Photo Checker",
          item: "https://www.pixpassport.com/passport-photo-checker",
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
        lockCountry={false}
        initialDocType="passport"
        badgeText="🌍 Global ICAO Doc 9303 Compliant · 50+ Countries · Free"
        title="Passport Photo Checker"
        highlightTitle="Official Biometric Validator"
        subtitle="Validate any passport or visa photo online against official embassy & ICAO 9303 biometric specifications. Select your country to get an instant pass/fail compliance report."
        specs={[
          { label: "Global Standard", value: "ICAO Doc 9303 Compliant" },
          { label: "Country Coverage", value: "50+ Supported Countries" },
          { label: "Biometric Checks", value: "30+ Automated Parameters" },
          { label: "Landmark Precision", value: "468-Point MediaPipe Grid" },
          { label: "Validation Speed", value: "Under 3 Seconds" },
          { label: "Privacy Policy", value: "100% Ephemeral Processing" },
        ]}
        requirements={[
          {
            icon: "🌍",
            title: "50+ Country Specifications",
            desc: "Applies exact official government guidelines for your selected country, including US, UK, Canada, Australia, Schengen, and India.",
          },
          {
            icon: "📐",
            title: "Biometric Head Proportion",
            desc: "Calculates the exact chin-to-crown percentage to make sure your face satisfies embassy height standards.",
          },
          {
            icon: "🎨",
            title: "Background Uniformity",
            desc: "Scans background pixels for shadows, textures, patterns, or incorrect colors required by your destination authority.",
          },
          {
            icon: "💡",
            title: "Balanced Illumination Check",
            desc: "Identifies harsh side shadows, flash hotspots, overexposure, and uneven lighting across the face.",
          },
          {
            icon: "👁️",
            title: "Eye Visibility & Expression",
            desc: "Verifies horizontal eye line, open eyes, closed mouth, and absence of prohibited eyewear or hair obstruction.",
          },
          {
            icon: "📊",
            title: "Scored Diagnostic Report",
            desc: "Provides clear pass/fail status for every metric alongside actionable guidance to fix any identified issue.",
          },
        ]}
        faqs={faqs}
        relatedTools={[
          {
            title: "Online Photo Checker",
            desc: "Instant web-based biometric checker for all documents.",
            href: "/online-passport-photo-checker",
            icon: "⚡",
          },
          {
            title: "Australian Photo Checker",
            desc: "DFAT and APO official passport compliance checker.",
            href: "/australian-passport-photo-checker",
            icon: "🇦🇺",
          },
          {
            title: "DV Lottery Photo Checker",
            desc: "Diversity Visa 600x600 px photo validation tool.",
            href: "/diversity-visa-lottery-photo-checker",
            icon: "🎟️",
          },
          {
            title: "UK Passport Photo Checker",
            desc: "Official GOV.UK 35×45mm passport photo compliance checker.",
            href: "/uk-passport-photo-checker-online-free",
            icon: "🇬🇧",
          },
          {
            title: "Free Photo Validator",
            desc: "Validate any passport or visa photo across 50+ countries.",
            href: "/visa-photo-validator",
            icon: "🌐",
          },
          {
            title: "Passport Size Photo Maker",
            desc: "Create and crop compliant passport photos online.",
            href: "/passport-size-photo-maker",
            icon: "📸",
          },
        ]}
      />
    </>
  );
}
