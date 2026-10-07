import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbsFr from "../../components/BreadcrumbsFr";
import FaqSectionFr from "../../components/FaqSectionFr";
import StickyCTAFr from "../../components/StickyCTAFr";

export const metadata: Metadata = {
  title: "Taille photo d'identité : 35×45 mm et formats par pays",
  description: "Quelle taille pour une photo d'identité ? 35×45 mm en France, visage de 32 à 36 mm, 413×531 pixels. Tableau des dimensions par pays pour passeport, CNI et visa.",
  keywords: ["taille photo d'identité", "format photo identité", "dimension photo identité", "taille photo passeport", "photo 35x45", "photo identité en pixels"],
  alternates: {
    canonical: "https://www.pixpassport.com/fr/guides/passport-photo-size",
    languages: {
      fr: "https://www.pixpassport.com/fr/guides/passport-photo-size",
    },
  },
  openGraph: { title: "Taille photo d'identité : 35×45 mm et formats par pays | PixPassport", description: "Dimensions officielles de la photo d'identité en France et tableau par pays.", url: "https://www.pixpassport.com/fr/guides/passport-photo-size", siteName: "PixPassport", locale: "fr_FR", type: "article", images: [{ url: "https://www.pixpassport.com/og-image.jpg", width: 1200, height: 630, alt: "Taille photo d'identité" }] },
  twitter: {
    card: "summary_large_image",
    title: "Taille photo d'identité : 35×45 mm et formats par pays | PixPassport",
    description: "Dimensions officielles de la photo d'identité en France et tableau par pays.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
  },
};

const sizeFaqs = [
  { q: "Quelle est la taille d'une photo d'identité en France ?", a: "35 mm de large sur 45 mm de haut, avec un visage mesurant entre 32 et 36 mm du menton au sommet du crâne (hors cheveux). C'est le même format pour le passeport, la carte d'identité et le permis de conduire." },
  { q: "Quelle est la taille standard d'une photo passeport dans le monde ?", a: "Le format 35×45 mm domine en France, dans l'Union européenne et dans la majorité des pays. Les États-Unis et l'Inde utilisent plutôt le format 2×2 pouces, soit 51×51 mm." },
  { q: "Quelle résolution choisir pour une photo passeport numérique ?", a: "Visez au minimum 300 DPI. Pour un format 35×45 mm, cela donne 413×531 pixels. Pour un format 2×2 pouces (États-Unis), comptez 600×600 pixels." },
  { q: "Puis-je recadrer moi-même une photo existante ?", a: "Vous le pouvez, mais un recadrage manuel dégrade souvent la netteté et fausse les proportions du visage. Un outil automatisé calcule les dimensions exactes sans perte de qualité." },
  { q: "La taille de la photo change-t-elle selon le document ?", a: "En France, non : passeport, CNI et permis de conduire partagent le même format 35×45 mm. À l'étranger, chaque pays fixe sa propre norme, d'où l'intérêt de vérifier le format photo identité avant l'envoi." },
  { q: "Combien de pixels pour une photo d'identité 35×45 mm ?", a: "Au minimum 413×531 pixels, ce qui correspond à 300 DPI. Pour une impression nette, mieux vaut un fichier plus grand, par exemple 827×1063 pixels (600 DPI)." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Taille photo d'identité : 35×45 mm et formats par pays",
      description: "Dimensions de la photo d'identité en France et tableau des formats par pays, avec résolution numérique.",
      inLanguage: "fr-FR",
      url: "https://www.pixpassport.com/fr/guides/passport-photo-size",
      mainEntityOfPage: "https://www.pixpassport.com/fr/guides/passport-photo-size",
      image: "https://www.pixpassport.com/og-image.jpg",
      datePublished: "2026-05-17",
      dateModified: "2026-10-06",
      author: { "@type": "Organization", name: "PixPassport" },
      publisher: { "@type": "Organization", name: "PixPassport", logo: { "@type": "ImageObject", url: "https://www.pixpassport.com/logo.png" } },
    },
  ],
};

const sizeTable = [
  { country: "🇫🇷 France", mm: "35 × 45", px: "413 × 531", usage: "Passeport, CNI, permis, titre de séjour" },
  { country: "🇺🇸 États-Unis", mm: "51 × 51 (2×2 po)", px: "600 × 600", usage: "Passeport, Visa, Green Card" },
  { country: "🇬🇧 Royaume-Uni", mm: "35 × 45", px: "413 × 531", usage: "Passeport, Visa" },
  { country: "🇨🇦 Canada", mm: "50 × 70 (passeport) · 35 × 45 (visa)", px: "591 × 827 · 413 × 531", usage: "Passeport, Visa" },
  { country: "🇩🇪 Allemagne", mm: "35 × 45", px: "413 × 531", usage: "Passeport, Personalausweis" },
  { country: "🇮🇳 Inde", mm: "51 × 51 (2×2 po)", px: "600 × 600", usage: "Passeport, Visa, OCI" },
  { country: "🇯🇵 Japon", mm: "35 × 45", px: "413 × 531", usage: "Passeport" },
  { country: "🇨🇳 Chine", mm: "33 × 48", px: "390 × 567", usage: "Passeport, Visa" },
  { country: "🇦🇺 Australie", mm: "35 × 45", px: "413 × 531", usage: "Passeport, Visa" },
  { country: "🇧🇷 Brésil", mm: "50 × 70", px: "591 × 827", usage: "Passeport, RG" },
];

export default function PassportPhotoSizePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbsFr items={[{ label: "Guides", href: "/fr/guides" }, { label: "Taille photo d'identité", href: "/fr/guides/passport-photo-size" }]} />
      <article className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">Taille photo d&apos;identité et passeport : 35×45 mm et formats par pays</h1>
          <p className="text-lg text-slate-600 mb-4 leading-relaxed">
            En France, une photo d&apos;identité mesure <strong>35 mm de large sur 45 mm de haut</strong>, avec un
            visage de 32 à 36 mm du menton au sommet du crâne. Ce format est commun au{" "}
            <Link href="/fr/photo-passeport" className="text-lime-600 hover:underline">passeport</Link>, à la{" "}
            <Link href="/fr/photo-carte-identite" className="text-lime-600 hover:underline">carte d&apos;identité</Link>{" "}
            et au permis de conduire. À l&apos;étranger, la taille varie selon le pays, et une erreur de quelques
            millimètres suffit à faire rejeter votre dossier. Ce guide réunit les dimensions exactes par pays, la
            résolution numérique attendue et les erreurs de cadrage les plus fréquentes, pour que vous obteniez
            une photo conforme dès le premier envoi.
          </p>
          <p className="text-slate-600 mb-10 leading-relaxed">
            Deux formats dominent la planète : le 35×45 mm, utilisé en France et dans la majorité des pays
            européens, et le 2×2 pouces (51×51 mm), la norme américaine reprise par plusieurs pays d&apos;Asie du
            Sud. Connaître le bon format photo identité avant de photographier évite un recadrage approximatif et
            un rejet administratif.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">📏 Taille de la photo d&apos;identité par pays</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700">Pays</th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700">Taille (mm)</th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700">Pixels (300 DPI)</th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700">Usage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sizeTable.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-medium">{row.country}</td>
                    <td className="px-4 py-3 font-bold text-lime-600">{row.mm}</td>
                    <td className="px-4 py-3 text-slate-500">{row.px}</td>
                    <td className="px-4 py-3 text-slate-500">{row.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">🌍 35×45 mm ou 2×2 pouces : comment les distinguer</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Le format 35×45 mm mesure le rectangle exact imprimé sur le papier photo : 3,5 cm de large sur 4,5 cm
            de haut, un standard hérité des normes européennes et repris par l&apos;OACI pour la reconnaissance
            faciale internationale. Le format 2×2 pouces, lui, dessine un carré de 5,08 cm de côté, utilisé pour
            le passeport, le visa et la carte verte américaine, ainsi que pour la plupart des démarches indiennes.
          </p>
          <p className="text-slate-600 leading-relaxed mb-8">
            Confondre les deux formats est l&apos;erreur la plus commune chez les voyageurs qui préparent plusieurs
            documents à la fois. Une photo passeport conforme pour la France ne l&apos;est pas automatiquement
            pour un visa américain : vérifiez toujours le format exigé par l&apos;administration destinataire avant
            de faire tirer votre photo.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">📐 Proportions et cadrage du visage</h2>
          <p className="text-slate-600 leading-relaxed mb-4">Au-delà des dimensions extérieures, le cadrage du visage compte tout autant :</p>
          <ul className="space-y-3 mb-10">
            {[
              "La tête occupe 70 à 80 % de la hauteur totale de la photo",
              "Les yeux se situent entre 56 % et 69 % de la hauteur depuis le bas",
              "L'espace au-dessus de la tête ne dépasse pas 10 % de la hauteur",
              "Le visage reste centré horizontalement, sans inclinaison",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3"><span className="w-5 h-5 bg-lime-100 rounded-full flex items-center justify-center shrink-0 mt-0.5"><span className="text-lime-600 text-xs font-bold">✓</span></span><span className="text-slate-600 text-sm">{item}</span></li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">💻 Quelle résolution pour une photo d&apos;identité numérique ?</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            La dimension photo passeport en millimètres ne suffit pas pour un envoi en ligne : les administrations
            exigent aussi une résolution minimale, généralement 300 DPI. Concrètement, un fichier 35×45 mm doit
            mesurer au moins 413×531 pixels, et un fichier 2×2 pouces au moins 600×600 pixels. En dessous de ce
            seuil, l&apos;impression sort floue et le fichier numérique risque un rejet automatique lors de la
            vérification biométrique.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">💡 Trois conseils pour ne pas se tromper</h2>
          <div className="grid gap-4 mb-8">
            {[
              { title: "Photographiez en haute résolution", desc: "Réglez votre smartphone sur la qualité maximale : un recadrage précis a besoin de pixels en réserve." },
              { title: "Ne recadrez jamais à la main", desc: "Un générateur de photo passeport calcule les proportions biométriques exactes ; un recadrage manuel les fausse presque toujours." },
              { title: "Vérifiez le format avant d'imprimer", desc: "Contrôlez la conformité de votre photo avant de la faire tirer, pour éviter un aller-retour en pharmacie." },
            ].map((tip, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm mb-1">{tip.title}</h3>
                <p className="text-xs text-slate-500">{tip.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-lime-50 border border-lime-200 rounded-2xl p-6 text-center mt-12">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Créez votre photo d&apos;identité numérique aux bonnes dimensions</h3>
            <p className="text-sm text-slate-600 mb-4">Notre générateur de photo passeport adapte automatiquement la taille et la résolution selon le pays choisi.</p>
            <Link href="/fr/passport-photo-online?type=france-passport" className="inline-flex items-center px-6 py-3 bg-lime-600 text-white rounded-xl font-bold text-sm hover:bg-lime-700 transition-all shadow-lg">
              Commencer gratuitement →
            </Link>
          </div>
        </div>
      </article>
      <FaqSectionFr faqs={sizeFaqs} title="Questions fréquentes — Taille photo d'identité" />
      <StickyCTAFr />
    </>
  );
}