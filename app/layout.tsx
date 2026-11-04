import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthProvider from "./components/AuthProvider";
import ConditionalNavFooter from "./components/ConditionalNavFooter";
import Script from "next/script";
import { getSiteRoutes } from "@/lib/country-sites";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pixpassport.com/"),
  title: {
    default: "PixPassport | Instant Global Passport & Visa Photo Tool",
    template: "%s",
  },
  description:
    "Global passport Photo Maker, visa, and ID photo tool. Get 100% compliant biometric photos for 50+ countries including US, UK, India, and Australia. Professional-grade background normalization and cropping.",
 
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
    title: "PixPassport | Global Passport & Visa Photo Tool",
    description:
      "Create 100% compliant biometric photos for 50+ countries. Official standards for US, UK, India, and more. Instant compliance check.",
    url: "https://www.pixpassport.com/",
    siteName: "PixPassport",
    images: [
      {
        url: "https://www.pixpassport.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PixPassport - Global Biometric Photo Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PixPassport | Global Passport & Visa Photo Tool",
    description:
      "Professional official passport and visa photos for 50+ countries. 100% biometric compliance guaranteed.",
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
        <meta name="yandex-verification" content="0483efdc76375d14" />
        {/* Root <html> is shared by every locale; set the real document language before paint
            so /de and /fr pages are not announced as English to crawlers and screen readers. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var m=location.pathname.match(/^\\/(de|fr)(\\/|$)/);if(m)document.documentElement.lang=m[1]})();`,
          }}
        />
        {/* Browser translation (Chrome/Google Translate, Edge, Safari) moves React's text nodes
            into <font> wrappers; the next re-render then throws "removeChild: The node to be
            removed is not a child of this node" and the whole page becomes "Application error".
            Tolerate those mismatches instead of crashing. facebook/react#11538 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if(typeof Node!=="function"||!Node.prototype)return;var rc=Node.prototype.removeChild;Node.prototype.removeChild=function(c){if(c&&c.parentNode!==this)return c;return rc.apply(this,arguments)};var ib=Node.prototype.insertBefore;Node.prototype.insertBefore=function(n,r){if(r&&r.parentNode!==this)return ib.call(this,n,null);return ib.apply(this,arguments)}})();`,
          }}
        />
        {/* Windows has no flag emoji glyphs (🇮🇳 renders as "IN"). If the browser can
            draw color emoji but not flags, load a flag-only Twemoji font. Adapted from
            country-flag-emoji-polyfill; font is self-hosted in public/fonts. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var c=document.createElement("canvas");c.width=c.height=1;var x=c.getContext("2d",{willReadFrequently:true});if(!x)return;x.textBaseline="top";x.font='100px "Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji",sans-serif';x.scale(.01,.01);function px(t,f){x.clearRect(0,0,100,100);x.fillStyle=f;x.fillText(t,0,0);return x.getImageData(0,0,1,1).data.join(",")}function color(t){var w=px(t,"#fff"),b=px(t,"#000");return b===w&&b.indexOf("0,0,0,")!==0}if(color("\\u{1F60A}")&&!color("\\u{1F1E8}\\u{1F1ED}")){var s=document.createElement("style");s.textContent='@font-face{font-family:"Twemoji Country Flags";unicode-range:U+1F1E6-1F1FF,U+1F3F4,U+E0062-E0063,U+E0065,U+E0067,U+E006C,U+E006E,U+E0073-E0074,U+E0077,U+E007F;src:url("/fonts/TwemojiCountryFlags.woff2") format("woff2");font-display:swap}';document.head.appendChild(s)}}catch(e){}})();`,
          }}
        />
      </head>

      <body
        suppressHydrationWarning
        className={`${dmSans.variable} antialiased bg-white text-slate-900`}
      >
     
        <AuthProvider>
         
          <ConditionalNavFooter
            navbar={<Navbar />}
            footer={<Footer />}
            countrySites={getSiteRoutes()}
          >
      
            {children}
        
          </ConditionalNavFooter>
        
        </AuthProvider>

        {/* Microsoft Clarityy */}
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

        {/* Ahrefs Analytics */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="8LE7q0elmPclC0gptXqz7g"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}