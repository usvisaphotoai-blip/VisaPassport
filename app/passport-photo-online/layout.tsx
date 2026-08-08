import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Passport & Visa Photos Online – 50+ Countries",
  description:
    "Create passport and visa photos online for 50+ countries. Automatic cropping, background removal and biometric photo checks.",
  
  alternates: {
    canonical: "https://www.pixpassport.com/passport-photo-online",
    languages: {
      en: "https://www.pixpassport.com/passport-photo-online",
      fr: "https://www.pixpassport.com/fr/photo-identite-en-ligne",
      de: "https://www.pixpassport.com/de/passbild-online",
      "x-default": "https://www.pixpassport.com/passport-photo-online",
    },
  },
  openGraph: {
    title: "Passport & Visa Photo Tool — Free Validator & Maker",
    description:
      "Free official-standard passport & visa photo tool. Create compliant biometric photos for 50+ countries including US, UK, India, and Schengen.",
    url: "https://www.pixpassport.com/passport-photo-online",
    siteName: "PixPassport",
    type: "website",
    images: [
      {
        url: "https://www.pixpassport.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PixPassport - Free Global Passport & Visa Photo Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Passport & Visa Photo Tool — Free Validator & Maker",
    description:
      "Free professional passport & visa photo tool for 50+ countries. Instant biometric compliance check.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
