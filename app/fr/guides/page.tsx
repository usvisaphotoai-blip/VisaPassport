import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbsFr from "../components/BreadcrumbsFr";
import { fr } from "../translations";

export const metadata: Metadata = {
  title: "Guides Photo d'Identité — Conseils et Tutoriels",
  description: "Guides complets pour des photos d'identité conformes : tailles, arrière-plans, astuces pour photos maison. Tout savoir pour réussir vos photos passeport et visa.",
  alternates: { canonical: "https://www.pixpassport.com/fr/guides" },
  openGraph: { title: "Guides Photo d'Identité | PixPassport", description: "Guides complets photo passeport et visa.", url: "https://www.pixpassport.com/fr/guides", siteName: "PixPassport", locale: "fr_FR", type: "website" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Guides Photo d'Identité",
  description: "Collection de guides pour des photos d'identité conformes.",
  url: "https://www.pixpassport.com/fr/guides",
  inLanguage: "fr",
};

const guides = [
  { href: "/fr/guides/passport-photo-size", emoji: "📐", title: fr.guides.size.title, desc: fr.guides.size.description },
  { href: "/fr/guides/passport-photo-background", emoji: "🖼️", title: fr.guides.background.title, desc: fr.guides.background.description },
  { href: "/fr/guides/how-to-take-passport-photo-at-home", emoji: "🏠", title: fr.guides.howTo.title, desc: fr.guides.howTo.description },
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
