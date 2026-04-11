import type { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "USVisaPhotoAI | Free US Visa & Passport Photo Tool",
  description:
    "Free online US visa ds160, passport & green card photo validator. Instantly verify 600x600px, 240KB, and full biometric compliance. Fix issues before you apply.",
  keywords: [
    "US visa photo online",
    "passport photo maker online",
    "DS-160 photo maker",
    "DV lottery photo 2027",
    "green card photo validation",
    "AI passport photo",
    "2x2 biometric photo tool",
    "how to take US visa photo at home",
    "fix DS-160 illumination error",
    "print 2x2 US visa photo at CVS",
    "fix visa photo online",
  ],
  alternates: {
    canonical: "https://www.usvisaphotoai.pro",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "USVisaPhotoAI",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "5.99",
        "priceCurrency": "USD",
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "3000"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What are the exact US visa photo requirements?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "US visa photos must be 600×600 pixels, under 240KB, JPEG format, with a pure white background (RGB 255,255,255). Your eyes must be between 56-69% from the bottom edge, and your head must fill 50-69% of the image height."
          }
        },
        {
          "@type": "Question",
          "name": "How does USVisaPhotoAI validate my photo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We run automated checks against all U.S. State Department specifications: dimensions, file size, background color, face detection, eye position, head size, glasses detection, and expression analysis — all in under 5 seconds."
          }
        },
        {
          "@type": "Question",
          "name": "Is the validation really free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Photo validation is 100% free. You only pay $5.99 if you want to download a processed, fully compliant photo."
          }
        },
        {
          "@type": "Question",
          "name": "Are my photos safe? What about privacy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. All original photos are auto-deleted after 24 hours. Download links expire in 1 hour. We are fully GDPR and CCPA compliant. We never store or share your photos permanently."
          }
        },
        {
          "@type": "Question",
          "name": "Can I upload multiple photos at once?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can validate unlimited photos for free. Each paid download covers 1 processed photo at $5.99."
          }
        }
      ]
    }
  ]
};

import HomeHero from "./components/HomeHero";
import HomeSections from "./components/HomeSections";
import HomeFAQ from "./components/HomeFAQ";
import "./home.css";

import { getLocalPrice } from "@/lib/currency";

export default async function Home() {
  const localPrice = await getLocalPrice(5.99);
  const priceDisplay = localPrice?.formatted ?? "$5.99";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="hcr">
        <HomeHero />
        <HomeSections price={priceDisplay} />
        <HomeFAQ />
      </div>
    </>
  );
}
