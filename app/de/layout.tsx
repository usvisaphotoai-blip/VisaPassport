import type { Metadata } from "next";
import "../globals.css";
import NavbarDe from "./components/NavbarDe";
import FooterDe from "./components/FooterDe";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pixpassport.com/"),
  title: {
    default: "PixPassport | Biometrische Passbilder & Visumfotos Online",
    template: "%s",
  },
  description:
    "Biometrische Passbilder, Visumfotos und Bewerbungsfotos online erstellen. Automatische Prüfung nach amtlichen Vorgaben für Deutschland, Österreich, die Schweiz und über 50 weitere Länder.",
  authors: [{ name: "PixPassport Team" }],
  creator: "PixPassport",
  applicationName: "PixPassport",
  publisher: "PixPassport",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    title: "PixPassport | Biometrische Passbilder & Visumfotos Online",
    description: "Biometrische Passbilder für über 50 Länder – geprüft nach den amtlichen Vorgaben für Reisepass, Personalausweis, Führerschein und Visum.",
    url: "https://www.pixpassport.com/de",
    siteName: "PixPassport",
    images: [{ url: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg", width: 1200, height: 630, alt: "PixPassport - Passfoto Online" }],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PixPassport | Biometrische Passbilder & Visumfotos Online",
    description: "Pass- und Visumfotos für über 50 Länder – online erstellt und automatisch geprüft.",
    images: ["https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg"],
  },
};

export default function DeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-slate-900 focus:shadow-lg"
      >
        Zum Inhalt springen
      </a>
      <NavbarDe />
      <main id="main-content" className="grow">
        {children}
      </main>
      <FooterDe />
    </>
  );
}
