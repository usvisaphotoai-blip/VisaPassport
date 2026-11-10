import type { Metadata } from "next";
import Link from "next/link";
import HeroSectionFr from "../components/HeroSectionFr";
import StickyCTAFr from "../components/StickyCTAFr";
import BreadcrumbsFr from "../components/BreadcrumbsFr";
import FaqSectionFr from "../components/FaqSectionFr";
import RelatedGuidesFr from "../components/RelatedGuidesFr";

const pageUrl = "https://www.pixpassport.com/fr/photo-passeport-bebe-suisse";
const ctaHref = "/fr/passport-photo-online?type=switzerland-passport";
const updated = "2026-11-10";

export const metadata: Metadata = {
  title: "Photo passeport bébé Suisse : règles fedpol et conseils 2026",
  description:
    "Photo de passeport ou de carte d'identité pour bébé en Suisse : visage de 23 mm minimum, écarts admis pour les tout-petits, quand la photo est prise au centre de biométrie et quand l'apporter. Dès CHF 8.99.",
  keywords: [
    "photo passeport bébé suisse",
    "photo carte d'identité bébé suisse",
    "passeport bébé suisse",
    "photo identité enfant suisse",
    "carte d'identité enfant suisse photo",
  ],
  alternates: {
    canonical: pageUrl,
    languages: { "fr-CH": pageUrl, "x-default": pageUrl },
  },
  openGraph: {
    title: "Photo passeport bébé Suisse : règles et conseils",
    description:
      "Les règles fedpol pour la photo d'un bébé ou d'un enfant, et comment réussir la prise de vue à la maison.",
    url: pageUrl,
    siteName: "PixPassport",
    locale: "fr_CH",
    type: "article",
    images: [{ url: "https://www.pixpassport.com/og-image.jpg", width: 1200, height: 630, alt: "Photo d'identité de bébé pour un document suisse" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo passeport bébé Suisse : règles et conseils",
    description: "Règles fedpol pour la photo d'un bébé et conseils pour la prise de vue.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
  },
};

// Fees incl. postage (fedpol / Geneva), checked November 2026. Minors: validity 5 years.
const documents = [
  { doc: "Passeport", where: "Centre cantonal de biométrie", photo: "Prise sur place", price: "65" },
  { doc: "Carte d'identité avec puce", where: "Centre cantonal de biométrie", photo: "Prise sur place", price: "35" },
  { doc: "Carte d'identité sans puce", where: "Commune de domicile (selon le canton)", photo: "À fournir sur papier", price: "35" },
  { doc: "Passeport + carte d'identité", where: "Centre cantonal de biométrie", photo: "Prise sur place", price: "78" },
];

const rules = [
  { label: "Format", value: "35 × 45 mm", detail: "Le même que pour les adultes" },
  { label: "Visage (moins de 11 ans)", value: "23 mm min.", detail: "Du menton au sommet du crâne" },
  { label: "Écarts admis", value: "Tout-petits", detail: "Regard, expression neutre et taille de la tête" },
  { label: "Seul sur la photo", value: "Obligatoire", detail: "Aucune main, aucun objet, aucune autre personne" },
  { label: "Fond", value: "Uni et neutre", detail: "Sans ombre, bien distinct de la tête" },
  { label: "Ancienneté", value: "1 an max.", detail: "Une photo très récente est conseillée" },
];

const tips = [
  {
    title: "Allongez bébé sur un drap uni",
    text: "Posez un drap uni de teinte neutre sur un lit ou au sol, sans plis visibles. Couchez bébé sur le dos et photographiez-le directement d'au-dessus, téléphone parallèle au drap.",
  },
  {
    title: "Utilisez la lumière du jour",
    text: "Placez-vous près d'une fenêtre, sans soleil direct. Évitez le flash, qui crée des reflets et des yeux rouges, et vérifiez qu'aucune ombre (la vôtre ou celle du téléphone) ne tombe sur le visage.",
  },
  {
    title: "Pas de tétine, pas de jouet, pas de main",
    text: "Retirez tétine, doudou, bonnet et bandeau. Si vous devez tenir la tête, faites-le depuis l'arrière, hors du cadre : aucune main d'adulte ne doit être visible.",
  },
  {
    title: "Prenez une rafale",
    text: "Utilisez le mode rafale quand bébé est calme, idéalement après la tétée ou au réveil. Choisissez la photo où les yeux sont ouverts et la tête bien droite.",
  },
  {
    title: "Pour un enfant plus grand",
    text: "Asseyez-le sur une chaise devant un mur uni, téléphone à hauteur de ses yeux. Bouche fermée, regard vers l'objectif. Un jeu « statue » aide souvent les 3–6 ans à rester immobiles.",
  },
];

const faqs = [
  {
    q: "Faut-il apporter une photo pour le passeport de mon bébé ?",
    a: "En général non. Le passeport suisse est toujours biométrique : vous vous présentez avec votre bébé au centre cantonal de biométrie, où la photo est prise sur place. Les empreintes digitales ne sont relevées qu'à partir de 12 ans. Une photo papier est surtout utile pour une carte d'identité sans puce demandée à la commune.",
  },
  {
    q: "Quelles sont les règles photo pour un bébé ?",
    a: "Le format reste de 35 × 45 mm. Pour les enfants de moins de 11 ans, le visage doit mesurer au moins 23 mm du menton au sommet du crâne. Pour les tout-petits, fedpol admet des écarts sur le regard vers l'objectif, l'expression neutre et la taille de la tête. Le bébé doit être seul sur la photo, sans tétine, jouet ni main visible.",
  },
  {
    q: "Mon bébé doit-il avoir les yeux ouverts ?",
    a: "C'est fortement conseillé, car les deux yeux doivent en principe être ouverts et visibles. Pour un nouveau-né, les centres et les communes se montrent toutefois plus tolérants : fedpol admet des écarts pour les enfants en bas âge. Photographiez bébé quand il est éveillé et calme.",
  },
  {
    q: "Les deux parents doivent-ils être présents ?",
    a: "Cela dépend du canton et de la situation familiale. À Genève par exemple, un seul parent suffit si les parents sont mariés et vivent à la même adresse ; les deux doivent être présents s'ils ont des domiciles différents. Si un seul parent détient l'autorité parentale, sa présence est obligatoire. Vérifiez auprès de votre canton.",
  },
  {
    q: "Combien coûtent le passeport et la carte d'identité d'un enfant ?",
    a: "Frais de port inclus : passeport CHF 65, carte d'identité CHF 35 (avec ou sans puce) et offre combinée CHF 78. Les documents d'un mineur sont valables 5 ans. À partir de 7 ans, l'enfant signe lui-même son document.",
  },
  {
    q: "Puis-je utiliser une photo de mon bébé prise avec mon téléphone ?",
    a: "Oui, pour les documents qui acceptent une photo apportée, comme la carte d'identité sans puce dans de nombreuses communes. PixPassport recadre la photo au format 35 × 45 mm et uniformise le fond. Imprimez ensuite la planche sur papier photo lisse, brillant ou semi-mat.",
  },
];

const relatedLinks = [
  { label: "Photo passeport Suisse", href: "/fr/photo-passeport-suisse", emoji: "🇨🇭", desc: "Normes fedpol 35×45 mm" },
  { label: "Photo d'identité Suisse", href: "/fr/photo-identite-suisse", emoji: "🪪", desc: "ID, permis, titre de séjour" },
  { label: "Photo SwissPass", href: "/fr/photo-swisspass", emoji: "🚆", desc: "Abonnement CFF" },
  { label: "Photo bébé (France)", href: "/fr/photo-bebe", emoji: "👶", desc: "Normes ANTS" },
  { label: "Imprimer sa photo", href: "/fr/imprimer-photo-identite", emoji: "🖨️", desc: "Sans déformer le format" },
  { label: "Fond photo d'identité", href: "/fr/guides/passport-photo-background", emoji: "🖼️", desc: "Couleurs acceptées" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Photo passeport bébé Suisse : règles fedpol et conseils 2026",
      description: "Règles fedpol pour la photo d'un bébé ou d'un enfant et conseils de prise de vue.",
      inLanguage: "fr-CH",
      url: pageUrl,
      dateModified: updated,
    },
    {
      "@type": "HowTo",
      name: "Photographier un bébé pour un document d'identité suisse",
      step: tips.map((t, i) => ({ "@type": "HowToStep", position: i + 1, name: t.title, text: t.text })),
    },
  ],
};

export default function PhotoPasseportBebeSuissePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbsFr
        items={[
          { label: "Photo passeport Suisse", href: "/fr/photo-passeport-suisse" },
          { label: "Bébé et enfant", href: "/fr/photo-passeport-bebe-suisse" },
        ]}
      />
      <HeroSectionFr
        title="Photo passeport bébé Suisse : règles et conseils"
        subtitle="Visage de 23 mm min. · écarts admis pour les tout-petits"
        description="Pour un bébé ou un enfant, les critères de fedpol sont un peu assouplis. Découvrez quand la photo est prise au centre de biométrie, quand vous devez l'apporter, et comment réussir la photo de votre bébé à la maison."
        ctaText="Préparer la photo de mon enfant"
        ctaHref={ctaHref}
        imageAlt="Photo d'identité d'un enfant au format 35 × 45 mm sur fond neutre"
      />

      <section className="pb-6 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="rounded-xl border-2 border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
            <strong>À savoir :</strong> pour le passeport et la carte d&apos;identité avec puce, votre bébé est
            photographié au centre cantonal de biométrie : inutile d&apos;apporter une photo. Une photo papier reste
            nécessaire pour la <strong>carte d&apos;identité sans puce</strong> demandée à la commune.
          </p>
          <p className="mt-3 text-xs text-slate-500">
            Mis à jour le <time dateTime={updated}>10 novembre 2026</time> · Source : critères d&apos;acceptation des
            photos de fedpol
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
            Documents d&apos;identité pour enfant : où, quelle photo, quel prix ?
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="py-3 pl-4 pr-4 font-semibold text-slate-700">Document</th>
                  <th className="py-3 pr-4 font-semibold text-slate-700">Où le demander</th>
                  <th className="py-3 pr-4 font-semibold text-slate-700">Photo</th>
                  <th className="py-3 pr-4 font-semibold text-slate-700 whitespace-nowrap">Prix mineur</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                {documents.map((d) => (
                  <tr key={d.doc} className="border-b border-slate-100 last:border-0">
                    <td className="py-3 pl-4 pr-4 font-medium text-slate-800">{d.doc}</td>
                    <td className="py-3 pr-4">{d.where}</td>
                    <td className={`py-3 pr-4 ${d.photo.startsWith("À fournir") ? "font-semibold text-green-700" : ""}`}>{d.photo}</td>
                    <td className="py-3 pr-4 whitespace-nowrap">CHF {d.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-500 leading-relaxed">
            Frais de port inclus. Validité 5 ans pour les mineurs. Empreintes digitales à partir de 12 ans ; signature
            de l&apos;enfant à partir de 7 ans. Les règles de présence des parents varient selon le canton.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6 text-center">
            Règles fedpol pour la photo d&apos;un enfant
          </h2>
          <p className="text-slate-600 mb-10 leading-relaxed text-center max-w-2xl mx-auto">
            Les critères sont les mêmes que pour les adultes, avec deux différences : un visage plus petit est admis
            avant 11 ans, et des écarts sont tolérés pour les enfants en bas âge.
          </p>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
            {rules.map((r) => (
              <div key={r.label} className="border-b border-slate-200 pb-4">
                <div className="flex justify-between items-start gap-4">
                  <span className="font-bold text-slate-800">{r.label}</span>
                  <span className="text-green-700 bg-green-50 px-2 py-0.5 rounded text-sm whitespace-nowrap">{r.value}</span>
                </div>
                <p className="text-sm text-slate-500 mt-1">{r.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-10 text-center">
            Réussir la photo de bébé à la maison
          </h2>
          <ol className="space-y-6">
            {tips.map((t, i) => (
              <li key={t.title} className="flex gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{t.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{t.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <Link href={ctaHref} className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg">
              Recadrer la photo de mon bébé
              <span aria-hidden="true">→</span>
            </Link>
            <p className="mt-3 text-sm text-slate-500">CHF 8.99 · aperçu gratuit avant paiement</p>
          </div>
          <p className="mt-10 text-slate-600 leading-relaxed">
            Pour les règles complètes adultes et enfants, consultez notre guide{" "}
            <Link href="/fr/photo-passeport-suisse" className="text-lime-600 hover:underline">photo passeport Suisse</Link>.
            Votre enfant a un abonnement de transport ? Voir aussi la{" "}
            <Link href="/fr/photo-swisspass" className="text-lime-600 hover:underline">photo SwissPass</Link>, à renouveler
            tous les 5 ans jusqu&apos;à 25 ans.
          </p>
        </div>
      </section>

      <FaqSectionFr faqs={faqs} title="Questions fréquentes — Photo passeport bébé Suisse" />
      <RelatedGuidesFr links={relatedLinks} />
      <StickyCTAFr ctaHref={ctaHref} countryName="Suisse" />
    </>
  );
}
