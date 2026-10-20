import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbsFr from "../components/BreadcrumbsFr";
import { fr } from "../translations";

export const metadata: Metadata = {
  title: "Guides photo d'identité : taille, fond, ePhoto ANTS",
  description: "Nos guides pour une photo d'identité acceptée en France : taille 35×45 mm, couleur du fond, photo faite à la maison, code ePhoto ANTS pour le permis.",
  alternates: {
    canonical: "https://www.pixpassport.com/fr/guides",
    languages: {
      en: "https://www.pixpassport.com/blog",
      fr: "https://www.pixpassport.com/fr/guides",
      de: "https://www.pixpassport.com/de/guides",
      "x-default": "https://www.pixpassport.com/blog",
    },
  },
  openGraph: { title: "Guides photo d'identité | PixPassport", description: "Taille, fond, photo à la maison, ePhoto ANTS : nos guides pour une photo acceptée en France.", url: "https://www.pixpassport.com/fr/guides", siteName: "PixPassport", locale: "fr_FR", type: "website", images: [{ url: "https://www.pixpassport.com/og-image.jpg", width: 1200, height: 630, alt: "Guides photo d'identité" }] },
  twitter: {
    card: "summary_large_image",
    title: "Guides photo d'identité | PixPassport",
    description: "Taille, fond, photo à la maison, ePhoto ANTS : nos guides pour une photo acceptée en France.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Guides photo d'identité",
  description: "Guides pour des photos d'identité conformes aux normes françaises.",
  url: "https://www.pixpassport.com/fr/guides",
  inLanguage: "fr-FR",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      "/fr/guides/passport-photo-size",
      "/fr/guides/passport-photo-background",
      "/fr/guides/how-to-take-passport-photo-at-home",
      "/fr/guides/photo-identite-france-passeport-cni-ephoto-permis-visa",
      "/fr/ephoto-ants",
      "/fr/photo-bebe",
      "/fr/photo-permis-de-conduire",
      "/fr/photo-titre-de-sejour",
    ].map((path, i) => ({ "@type": "ListItem", position: i + 1, url: `https://www.pixpassport.com${path}` })),
  },
};

const guides = [
  { href: "/fr/guides/passport-photo-size", emoji: "📐", title: fr.guides.size.title, desc: fr.guides.size.description },
  { href: "/fr/guides/passport-photo-background", emoji: "🖼️", title: fr.guides.background.title, desc: fr.guides.background.description },
  { href: "/fr/guides/how-to-take-passport-photo-at-home", emoji: "🏠", title: fr.guides.howTo.title, desc: fr.guides.howTo.description },
  { href: "/fr/guides/photo-identite-france-passeport-cni-ephoto-permis-visa", emoji: "🇫🇷", title: fr.guides.franceGuide.title, desc: fr.guides.franceGuide.description },
  { href: "/fr/imprimer-photo-identite", emoji: "🖨️", title: "Imprimer une photo d'identité au format 35×45 mm", desc: "Planche 10×15 ou A4, réglages d'impression en taille réelle et où imprimer : chez soi, en borne ou en ligne." },
  { href: "/fr/photo-bebe", emoji: "👶", title: "Photo d'identité bébé : passeport et CNI", desc: "Faire la photo d'identité d'un nourrisson à la maison : allongé sur un drap clair, sans tétine, et recadrée au format 35×45 mm." },
  { href: "/fr/photo-permis-de-conduire", emoji: "🚗", title: "Photo permis de conduire : ePhoto et normes ANTS", desc: "Code ePhoto obligatoire, où faire la photo, normes et erreurs qui font refuser la demande de permis." },
  { href: "/fr/photo-titre-de-sejour", emoji: "🏛️", title: "Photo titre de séjour : ePhoto ANEF et normes", desc: "Code ePhoto obligatoire sur l'ANEF, où l'obtenir, tête nue et motifs de refus fréquents." },
  { href: "/fr/ephoto-ants", emoji: "🔢", title: "Code ePhoto ANTS : à quoi il sert et comment l'obtenir", desc: "Obligatoire pour le permis de conduire et le titre de séjour, facultatif pour le passeport et la CNI : où l'obtenir et combien de temps il est valable." },
];

export default function GuidesIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbsFr items={[{ label: "Guides", href: "/fr/guides" }]} />
      <section className="py-16 lg:py-24 bg-gradient-to-b from-[#f8faf9] to-white">
        <div className="max-w-3xl mx-auto px-4 text-center mb-12">
          <span className="inline-block text-xs font-bold text-lime-600 uppercase tracking-widest mb-3">Ressources</span>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900">{fr.guides.index.title}</h1>
          <p className="text-slate-500 mt-3 text-lg">{fr.guides.index.subtitle}</p>
        </div>
        <div className="max-w-4xl mx-auto px-4 grid gap-6">
          {guides.map((g, i) => (
            <Link key={i} href={g.href} className="group bg-white p-8 rounded-3xl border border-slate-100 hover:border-lime-300 hover:shadow-xl transition-all duration-300 flex items-start gap-6">
              <span className="text-4xl shrink-0 group-hover:scale-110 transition-transform">{g.emoji}</span>
              <div>
                <h2 className="text-xl font-bold text-slate-900 group-hover:text-lime-600 transition-colors mb-2">{g.title}</h2>
                <p className="text-sm text-slate-500 leading-relaxed">{g.desc}</p>
                <span className="inline-flex items-center text-sm font-bold text-lime-600 mt-3 group-hover:gap-2 transition-all">Lire le guide <span className="ml-1">→</span></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
