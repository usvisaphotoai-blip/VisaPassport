import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbsFr from "../../components/BreadcrumbsFr";
import FaqSectionFr from "../../components/FaqSectionFr";
import StickyCTAFr from "../../components/StickyCTAFr";

const PAGE_URL = "https://www.pixpassport.com/fr/guides/how-to-take-passport-photo-at-home";

export const metadata: Metadata = {
  title: "Faire sa photo d'identité soi-même avec son téléphone",
  description: "Comment faire sa photo d'identité à la maison avec un smartphone : lumière, fond, distance, réglages et erreurs à éviter pour une photo acceptée en mairie.",
  keywords: ["faire sa photo d'identité soi-même", "photo d'identité maison", "photo identité avec son téléphone", "photo identité smartphone", "photo passeport maison"],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      fr: PAGE_URL,
    },
  },
  openGraph: { title: "Faire sa photo d'identité soi-même à la maison | PixPassport", description: "Le guide pas à pas pour réussir sa photo d'identité avec un smartphone.", url: PAGE_URL, siteName: "PixPassport", locale: "fr_FR", type: "article", images: [{ url: "https://www.pixpassport.com/og-image.jpg", width: 1200, height: 630, alt: "Photo d'identité à la maison" }] },
  twitter: {
    card: "summary_large_image",
    title: "Faire sa photo d'identité soi-même à la maison | PixPassport",
    description: "Le guide pas à pas pour réussir sa photo d'identité avec un smartphone.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
  },
};

const howToFaqs = [
  { q: "Une photo d'identité faite à la maison est-elle acceptée ?", a: "Oui pour le passeport, la carte d'identité, les visas et la carte Vitale, à condition qu'elle respecte les normes (35×45 mm, fond clair uni non blanc, expression neutre, tête nue) et qu'elle soit imprimée sur papier photo de bonne qualité. Le permis de conduire et le titre de séjour exigent en revanche un code ePhoto délivré par une cabine agréée." },
  { q: "Quel téléphone utiliser ?", a: "Tout smartphone récent suffit. Utilisez l'objectif principal (pas la caméra frontale ni le mode portrait), en qualité maximale." },
  { q: "Peut-on faire sa photo d'identité en selfie ?", a: "C'est possible, mais un selfie à bout de bras déforme le visage (nez plus gros, oreilles masquées). Demandez plutôt à quelqu'un de vous photographier, ou posez le téléphone sur un support et utilisez le retardateur." },
  { q: "Quelle distance entre le sujet et l'appareil ?", a: "Environ 1 à 1,5 mètre, avec un léger zoom si nécessaire. De trop près, les proportions du visage sont déformées." },
  { q: "Comment imprimer sa photo d'identité ?", a: "Imprimez la planche 10×15 cm fournie par PixPassport sur papier photo brillant, chez vous, sur une borne photo ou en pharmacie, puis découpez une photo de 35×45 mm. N'imprimez pas sur du papier ordinaire : la mairie le refusera." },
];

const steps = [
  { num: "01", title: "Préparez l'éclairage", desc: "Placez-vous face à une fenêtre, en lumière du jour indirecte. Évitez le soleil direct, les néons au plafond et le flash, qui créent des ombres et des reflets.", icon: "💡" },
  { num: "02", title: "Choisissez un fond clair et uni", desc: "Un mur uni gris clair ou bleu clair est idéal (pas blanc pour un document français). Restez à environ 1 m du mur pour éviter l'ombre de votre tête. Si votre mur ne convient pas, l'outil remplacera le fond.", icon: "🖼️" },
  { num: "03", title: "Positionnez-vous", desc: "Tête droite, regard dans l'objectif, expression neutre, bouche fermée, yeux ouverts. Dégagez le front et les yeux, retirez casquette ou bonnet. Lunettes tolérées seulement sans reflet ni verres teintés.", icon: "😐" },
  { num: "04", title: "Prenez la photo", desc: "Faites-vous photographier à 1-1,5 m, objectif à hauteur des yeux. Mode photo standard (pas portrait ni beauté), sans filtre. Cadrez du haut des épaules à un peu au-dessus de la tête. Prenez plusieurs clichés.", icon: "📸" },
  { num: "05", title: "Vérifiez et recadrez avec PixPassport", desc: "Importez votre meilleure photo : l'outil remplace le fond, cadre le visage entre 32 et 36 mm au format 35×45 mm et vérifie la conformité avant le téléchargement.", icon: "✅" },
  { num: "06", title: "Imprimez la planche", desc: "Imprimez la planche 10×15 cm sur papier photo brillant, puis découpez la photo au format exact. Elle doit dater de moins de six mois le jour du dépôt.", icon: "🖨️" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Faire sa photo d'identité soi-même à la maison",
      description: "Guide pas à pas pour réussir sa photo d'identité avec un smartphone.",
      inLanguage: "fr-FR",
      url: PAGE_URL,
      mainEntityOfPage: PAGE_URL,
      image: "https://www.pixpassport.com/og-image.jpg",
      datePublished: "2026-05-17",
      dateModified: "2026-10-06",
      author: { "@type": "Organization", name: "PixPassport" },
      publisher: { "@type": "Organization", name: "PixPassport", logo: { "@type": "ImageObject", url: "https://www.pixpassport.com/logo.png" } },
    },
    {
      "@type": "HowTo",
      name: "Faire sa photo d'identité soi-même à la maison",
      inLanguage: "fr-FR",
      step: steps.map((st, i) => ({ "@type": "HowToStep", position: i + 1, name: st.title, text: st.desc })),
    },
  ],
};

export default function HowToTakePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbsFr items={[{ label: "Guides", href: "/fr/guides" }, { label: "Photo d'identité à la maison", href: "/fr/guides/how-to-take-passport-photo-at-home" }]} />
      <article className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">Faire sa photo d&apos;identité soi-même à la maison</h1>
          <p className="text-lg text-slate-600 mb-4 leading-relaxed">
            Pas besoin de photomaton : avec un smartphone, une fenêtre et un mur clair, vous pouvez faire une photo
            d&apos;identité acceptée pour votre passeport, votre carte d&apos;identité ou votre visa. Suivez ces six
            étapes pour obtenir une photo conforme aux normes ANTS du premier coup.
          </p>
          <p className="text-slate-600 mb-10 leading-relaxed">
            Avant de commencer, vérifiez les règles de{" "}
            <Link href="/fr/guides/passport-photo-size" className="text-lime-600 hover:underline">taille</Link> et de{" "}
            <Link href="/fr/guides/passport-photo-background" className="text-lime-600 hover:underline">couleur de fond</Link>{" "}
            de votre document. Pour le permis de conduire ou le titre de séjour, un{" "}
            <Link href="/fr/ephoto-ants" className="text-lime-600 hover:underline">code ePhoto</Link> reste obligatoire.
          </p>

          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-5 items-start bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="shrink-0 w-12 h-12 bg-lime-100 rounded-xl flex items-center justify-center text-2xl">{step.icon}</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black text-lime-600">ÉTAPE {step.num}</span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 mb-1">{step.title}</h2>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">📱 Réglages recommandés du smartphone</h2>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {[
              { label: "Mode", value: "Photo standard" },
              { label: "Flash", value: "Désactivé" },
              { label: "Résolution", value: "Maximum" },
              { label: "HDR", value: "Désactivé" },
              { label: "Filtre", value: "Aucun" },
              { label: "Ratio", value: "4:3" },
              { label: "Objectif", value: "Principal (pas selfie)" },
              { label: "Retardateur", value: "3 ou 10 s si seul" },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-xl p-3 border border-slate-200">
                <p className="text-[10px] font-bold text-slate-400 uppercase">{s.label}</p>
                <p className="text-sm font-bold text-slate-900">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-lime-50 border border-lime-200 rounded-2xl p-6 text-center mt-8">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Prêt à créer votre photo ?</h3>
            <p className="text-sm text-slate-600 mb-4">Importez votre photo et obtenez un résultat conforme aux normes ANTS en 30 secondes.</p>
            <Link href="/fr/passport-photo-online?type=france-passport" className="inline-flex items-center px-6 py-3 bg-lime-600 text-white rounded-xl font-bold text-sm hover:bg-lime-700 transition-all shadow-lg">Commencer →</Link>
          </div>
        </div>
      </article>
      <FaqSectionFr faqs={howToFaqs} title="Questions fréquentes — Photo d'identité à la maison" />
      <StickyCTAFr />
    </>
  );
}
