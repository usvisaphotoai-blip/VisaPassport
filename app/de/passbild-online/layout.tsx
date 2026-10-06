import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Passfoto-Generator: Foto hochladen & prüfen lassen | PixPassport",
  description: "Foto hochladen, Dokument wählen, fertig: Der Passfoto-Generator schneidet zu, ersetzt den Hintergrund und prüft biometrisch – Ergebnis kostenlos ansehen.",
  alternates: {
    canonical: "https://www.pixpassport.com/de/passbild-online",
    languages: {
      en: "https://www.pixpassport.com/passport-photo-online",
      fr: "https://www.pixpassport.com/fr/photo-identite-en-ligne",
      de: "https://www.pixpassport.com/de/passbild-online",
      "x-default": "https://www.pixpassport.com/passport-photo-online",
    },
  },
  openGraph: {
    title: "Passfoto-Generator: Foto hochladen & prüfen lassen | PixPassport",
    description: "Foto hochladen, zuschneiden lassen und biometrisch prüfen – in 30 Sekunden.",
    url: "https://www.pixpassport.com/de/passbild-online",
    siteName: "PixPassport",
    locale: "de_DE",
    type: "website",
    images: [{ url: "https://www.pixpassport.com/og-image.jpg", width: 1200, height: 630, alt: "Passfoto-Generator von PixPassport" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Passfoto-Generator | PixPassport",
    description: "Foto hochladen und biometrisch prüfen lassen – in 30 Sekunden.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
  },
};

export default function DeToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
