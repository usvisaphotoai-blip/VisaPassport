import type { Metadata } from "next";
import { Inter, Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthProvider from "./components/AuthProvider";
import AnalyticsTracker from "./components/AnalyticsTracker";
import ModelPreloader from "./components/ModelPreloader";
import Script from "next/script";
import { Suspense } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.usvisaphotoai.pro/"),
  title: {
    default: "USVisaPhotoAI | Instant Check for US Visa & Passport Photos",
    template: "%s | USVisaPhotoAI",
  },
  description:
    "Free DS-160 visa, passport & green card photo validator. Instantly verify 600x600px, 240KB, and full biometric compliance.",
  keywords: [
    "US visa photo",
    "us passport photo maker",
    "DS-160 photo",
    "DS-160 photo checker",
    "DS-160 photo tool",
    "DV lottery photo 2027",
    "green card photo",
    "photo compliance checker",
    "2x2 photo tool",
    'Us passport photo maker'
  ],
  authors: [{ name: "USVisaPhotoAI" }],
  creator: "USVisaPhotoAI",
  applicationName: "USVisaPhotoAI",
  publisher: "USVisaPhotoAI",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "USVisaPhotoAI | Instant Check for US Visa & Passport Photos",
    description:
      "Free online US visa, passport & green card photo validator. Instantly verify full biometric compliance.",
    url: "https://www.usvisaphotoai.pro/",
    siteName: "USVisaPhotoAI",
    images: [
      {
        url: "https://www.usvisaphotoai.pro/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "USVisaPhotoAI - Instant Visa & Passport Photo Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "USVisaPhotoAI | Instant Check for US Visa & Passport Photos",
    description:
      "Free online US visa, passport & green card photo validator. Instantly verify full biometric compliance.",
    images: ["https://www.usvisaphotoai.pro/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>


        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "USVisaPhotoAI",
              url: "https://www.usvisaphotoai.pro/",
              description: "Free US visa ds160 photo tool, passport & green card photo validator. Check 600x600px, 240KB, biometric compliance instantly.",
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "All",
              offers: {
                "@type": "Offer",
                price: "5.99",
                priceCurrency: "USD"
              }
            })
          }}
        />
      </head>

      <body
        suppressHydrationWarning
        className={`${inter.variable} ${playfair.variable} ${dmSans.variable} antialiased bg-white text-slate-900`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-blue-600 focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Skip to main content
        </a>
        <AuthProvider>
          <Suspense fallback={null}>
            <AnalyticsTracker />
          </Suspense>
          <ModelPreloader />
          <Navbar />
          <main id="main-content" className="grow">
            {children}
          </main>
          <Footer />
        </AuthProvider>

        {/* Microsoft Clarity */}
        <Script id="clarity-script" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vlwi7bea50");
          `}
        </Script>

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-CKPMYJPSCG"
          strategy="lazyOnload"
        />

        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CKPMYJPSCG');
          `}
        </Script>
      </body>
    </html>
  );
}