import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Passport & Visa Photo Tool — Free Validator & Maker for 50+ Countries",
  description:
    "Free AI-powered passport & visa photo tool. Validate and create compliant biometric photos for US, UK, India, Schengen, Australia, and 50+ countries instantly.",
  keywords: [
    "passport photo tool",
    "visa photo maker",
    "biometric photo tool",
    "passport photo validator",
    "online passport photo",
    "visa photo editor",
    "UK passport photo maker",
    "India passport photo tool",
    "Schengen visa photo maker",
    "AI visa photo checker",
    "passport photo size validator",
  ],
  alternates: {
    canonical: "https://www.pixpassport.com/tool",
  },
  openGraph: {
    title: "Passport & Visa Photo Tool — Free Validator & Maker",
    description:
      "Free AI-powered passport & visa photo tool. Create compliant biometric photos for 50+ countries including US, UK, India, and Schengen.",
    url: "https://www.pixpassport.com/tool",
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
      "Free AI-powered passport & visa photo tool for 50+ countries. Instant biometric compliance check.",
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
