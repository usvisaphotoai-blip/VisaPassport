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
  metadataBase: new URL("https://www.pixpassport.com/"),
  title: {
    default: "PixPassport | Instant Global Passport & Visa Photo Tool",
    template: "%s | PixPassport",
  },
  description:
    "Official-standard global passport, visa, and ID photo tool. Get 100% compliant biometric photos for 50+ countries including US, UK, India, and Australia. AI-powered background removal and cropping.",
  keywords: [
    "PixPassport",
    "online passport photo maker",
    "visa photo editor",
    "official biometric photo",
 
    "UK passport photo generator",
    "global passport photo maker",
    "Schengen visa photo check",
    "Australia passport photo online",
   
   
    "biometric compliance checker",
    
  ],
  authors: [{ name: "PixPassport Team" }],
  creator: "PixPassport",
  applicationName: "PixPassport",
  publisher: "PixPassport",
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
    title: "PixPassport | Official Global Passport & Visa Photo Tool",
    description:
      "Create 100% compliant biometric photos for 50+ countries. Official standards for US, UK, India, and more. Instant AI check.",
    url: "https://www.pixpassport.com/",
    siteName: "PixPassport",
    images: [
      {
        url: "https://www.pixpassport.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PixPassport - Official Global Biometric Photo Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PixPassport | Official Global Passport & Visa Photo Tool",
    description:
      "AI-powered official passport and visa photos for 50+ countries. 100% biometric compliance guaranteed.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
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
              name: "PixPassport",
              url: "https://www.pixpassport.com/",
              description: "Free global passport, visa, and ID photo validator. Instantly verify biometric compliance for any country's requirements.",
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
            })(window, document, "clarity", "script", "wa9yv2frb2");
          `}
        </Script>

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-RJFKP2ZXNX"
          strategy="lazyOnload"
        />

        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RJFKP2ZXNX');
          `}
        </Script>
      </body>
    </html>
  );
}