import type { Metadata } from "next";
import Link from "next/link";
import HeroSectionFr from "../components/HeroSectionFr";
import StickyCTAFr from "../components/StickyCTAFr";
import BreadcrumbsFr from "../components/BreadcrumbsFr";
import FaqSectionFr from "../components/FaqSectionFr";
import RelatedGuidesFr from "../components/RelatedGuidesFr";

const pageUrl = "https://www.pixpassport.com/fr/photo-passeport-suisse";
const ctaHref = "/fr/passport-photo-online?type=switzerland-passport";
const heroImage =
  "https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg";
const updated = "2026-11-10";

export const metadata: Metadata = {
  title: "Photo passeport Suisse 2026 : format 35×45 mm et normes fedpol",
  description:
    "Photo passeport et carte d'identité suisse : 35 × 45 mm, visage 29–34 mm, lunettes admises sous conditions. Nouvelle carte avec puce dès le 2.11.2026 : quand fournir sa photo. Dès CHF 8.99.",
  keywords: [
    "photo passeport suisse",
    "photo carte d'identité suisse",
    "format photo passeport suisse",
    "photo passeport suisse lunettes",
    "carte d'identité biométrique suisse photo",
    "normes photo fedpol",
  ],
  alternates: {
    canonical: pageUrl,
    languages: {
      "fr-CH": pageUrl,
      "de-CH": "https://www.pixpassport.com/de/passfoto-schweiz-online",
      "x-default": "https://www.pixpassport.com/de/passfoto-schweiz-online",
    },
  },
  openGraph: {
    title: "Photo passeport Suisse : format et normes fedpol 2026",
    description:
      "35 × 45 mm, visage de 29 à 34 mm, règles sur les lunettes et la nouvelle carte d'identité avec puce : tout ce qu'il faut savoir avant votre demande.",
    url: pageUrl,
    siteName: "PixPassport",
    locale: "fr_CH",
    type: "article",
    images: [{ url: heroImage, width: 843, height: 671, alt: "Exemple de photo passeport suisse sur fond neutre et uniforme" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo passeport Suisse : format et normes fedpol 2026",
    description: "Format, lunettes, enfants, nouvelle carte avec puce : la photo de passeport suisse expliquée simplement.",
    images: [heroImage],
  },
};

// Fees incl. postage, per fedpol / cantonal sites (Geneva, Vaud), checked November 2026.
const documents = [
  { doc: "Passeport (toujours avec puce)", where: "Centre cantonal de biométrie", photo: "Prise sur place", adult: "145", minor: "65" },
  { doc: "Carte d'identité avec puce (dès le 2.11.2026)", where: "Centre cantonal de biométrie", photo: "Prise sur place", adult: "70", minor: "35" },
  { doc: "Carte d'identité sans puce", where: "Commune de domicile (selon le canton)", photo: "À fournir sur papier", adult: "70", minor: "35" },
  { doc: "Passeport + carte d'identité", where: "Centre cantonal de biométrie", photo: "Prise sur place", adult: "158", minor: "78" },
];

const specs = [
  { label: "Format", value: "35 × 45 mm", detail: "Sans cadre ni bordure" },
  { label: "Hauteur du visage", value: "29–34 mm", detail: "Du menton au sommet du crâne (adultes)" },
  { label: "Enfants de moins de 11 ans", value: "23 mm min.", detail: "Hauteur minimale du visage" },
  { label: "Ancienneté", value: "1 an max.", detail: "La photo ne doit pas dater de plus d'un an" },
  { label: "Couleur", value: "Couleur ou N/B", detail: "Reproduite en niveaux de gris sur le document" },
  { label: "Papier", value: "Brillant ou semi-mat", detail: "Lisse, sans effet perlé ni tramé, coins non arrondis" },
];

const requirements = [
  {
    title: "De face, épaules droites",
    detail: "Assis droit face à l'appareil, tête ni tournée ni inclinée, nez sur l'axe central. Les deux yeux ouverts, à la même hauteur.",
  },
  {
    title: "Expression neutre, bouche fermée",
    detail: "Pas de sourire. Aucune main, aucun objet ni aucune autre personne ne doit couvrir une partie du visage.",
  },
  {
    title: "Lunettes : oui, sous conditions",
    detail: "La monture ne doit pas cacher les yeux, les verres ne doivent pas refléter la lumière ni être teintés. Lunettes de soleil interdites, sauf verres foncés pour les personnes malvoyantes.",
  },
  {
    title: "Tête découverte",
    detail: "Pas de couvre-chef, de bandeau, de serre-tête voyant ni de lunettes remontées sur la tête. Exception pour motif médical ou religieux attesté : visage visible au moins du menton à la naissance des cheveux.",
  },
  {
    title: "Lumière homogène, fond neutre",
    detail: "Photo nette et contrastée, sans ombre sur le visage ni derrière la tête. Fond uni et neutre, bien distinct de la tête : un fond trop clair qui manque de contraste est refusé.",
  },
  {
    title: "Teint naturel, sans retouche",
    detail: "Pas de reflet sur la peau, pas d'yeux rouges, pas de pixels visibles. La tenue en uniforme n'est pas admise.",
  },
];

const rejections = [
  "Surexposition ou manque de contraste",
  "Visage trop petit",
  "Bouche ouverte, expression non neutre",
  "Prise de vue non frontale ou regard de côté",
  "Yeux fermés ou cheveux sur le visage",
  "Ombre ou reflet sur le visage",
  "Monture qui cache les yeux, reflets sur les verres",
  "Autre personne ou objet sur la photo",
  "Fond non neutre ou ombre en arrière-plan",
  "Photo floue ou pixellisée",
  "Couvre-chef, bandeau ou serre-tête",
  "Coins arrondis, pli ou salissure",
];

const steps = [
  {
    step: "1",
    title: "Placez votre smartphone à hauteur des yeux",
    content:
      "Posez le téléphone sur un support ou demandez à quelqu'un de vous photographier à environ 1,5 m. Évitez le selfie à bout de bras, qui déforme les proportions du visage.",
  },
  {
    step: "2",
    title: "Mettez-vous devant un mur uni",
    content:
      "Tenez-vous à quelques pas d'un mur uni de teinte neutre, face à une fenêtre ou à une lumière douce. Retirez les lunettes qui reflètent la lumière et dégagez le visage.",
  },
  {
    step: "3",
    title: "Téléversez la photo sur PixPassport",
    content:
      "Choisissez le modèle « Suisse – passeport ». L'outil recadre au format 35 × 45 mm, place le visage entre 29 et 34 mm, remplace le fond par un fond neutre uni et signale les défauts (ombres, flou, yeux fermés).",
  },
  {
    step: "4",
    title: "Imprimez sur papier photo lisse",
    content:
      "Vous recevez le fichier haute résolution et une planche A4. Imprimez-la à 100 % sur papier photo brillant ou semi-mat (borne photo, magasin photo), puis découpez à angles droits.",
  },
];

const faqs = [
  {
    q: "Quelle est la taille d'une photo de passeport suisse ?",
    a: "Selon les critères de fedpol, la photo mesure 35 × 45 mm, sans cadre. La hauteur du visage, du menton au sommet du crâne, doit être comprise entre 29 et 34 mm. Pour les enfants de moins de 11 ans, elle doit être d'au moins 23 mm. Les cheveux peuvent exceptionnellement dépasser le bord de la photo.",
  },
  {
    q: "Ai-je besoin d'apporter une photo pour mon passeport suisse ?",
    a: "En général non. Le passeport suisse est toujours biométrique : la photo est prise au centre cantonal de biométrie, en même temps que les empreintes digitales. Certains cantons acceptent une photo numérique, à condition de l'annoncer lors de la demande. Une photo papier reste nécessaire surtout pour la carte d'identité sans puce demandée à la commune.",
  },
  {
    q: "Qu'est-ce qui change avec la carte d'identité avec puce du 2 novembre 2026 ?",
    a: "Depuis le 2 novembre 2026, vous pouvez choisir une carte d'identité biométrique avec puce (photo du visage et deux empreintes digitales). Elle se demande comme le passeport, au centre cantonal de biométrie, où la photo est prise sur place. La carte sans puce reste disponible et peut, selon les cantons, toujours être demandée à la commune avec une photo papier. Le prix est le même pour les deux cartes.",
  },
  {
    q: "Puis-je porter des lunettes sur la photo de passeport suisse ?",
    a: "Oui, à condition que la monture ne cache pas les yeux, que les verres ne reflètent pas la lumière et qu'ils ne soient pas teintés. Les lunettes de soleil sont interdites, sauf pour les personnes malvoyantes, qui peuvent porter des verres foncés. Les lunettes remontées sur la tête ne sont pas admises.",
  },
  {
    q: "La photo peut-elle être en noir et blanc ?",
    a: "Oui. Les critères de fedpol admettent les photos en couleur comme en noir et blanc, car la photo est reproduite en niveaux de gris sur le document. Elle doit être imprimée sur un papier photo lisse, brillant ou semi-mat, sans pli ni coins arrondis.",
  },
  {
    q: "La photo peut-elle dater de plus d'un an ?",
    a: "Non. La photo ne doit pas dater de plus d'un an et doit correspondre à votre apparence actuelle. Pour les enfants, une photo très récente est préférable, car leur visage change vite.",
  },
  {
    q: "Comment faire la photo d'un bébé ou d'un jeune enfant ?",
    a: "Allongez le bébé sur un drap uni de teinte neutre et photographiez-le d'au-dessus, en lumière naturelle, sans tétine ni jouet et sans autre personne visible. Pour les enfants en bas âge, fedpol admet des écarts sur le regard, l'expression et la taille de la tête. La hauteur du visage doit toutefois atteindre au moins 23 mm.",
  },
  {
    q: "Combien coûtent le passeport et la carte d'identité suisses ?",
    a: "Frais de port inclus : passeport CHF 145 pour un adulte et CHF 65 pour un mineur, carte d'identité CHF 70 (adulte) et CHF 35 (mineur), offre combinée CHF 158 (adulte) et CHF 78 (mineur). Le passeport et la carte sont valables 10 ans pour les adultes et 5 ans pour les mineurs. Vérifiez le tarif auprès de votre canton avant le rendez-vous.",
  },
  {
    q: "Combien coûte une photo de passeport suisse avec PixPassport ?",
    a: "La photo numérique et la planche à imprimer coûtent CHF 8.99. Vous voyez le résultat gratuitement avant de payer. Une photo chez un photographe en Suisse romande coûte généralement entre CHF 20 et CHF 35.",
  },
];

const relatedLinks = [
  { label: "Photo d'identité Suisse", href: "/fr/photo-identite-suisse", emoji: "🇨🇭", desc: "ID, permis, titre de séjour" },
  { label: "Photo visa", href: "/fr/photo-visa", emoji: "✈️", desc: "Visa Schengen et autres" },
  { label: "Photo bébé Suisse", href: "/fr/photo-passeport-bebe-suisse", emoji: "👶", desc: "Enfants et tout-petits" },
  { label: "Photo SwissPass", href: "/fr/photo-swisspass", emoji: "🚆", desc: "Abonnement CFF" },
  { label: "Photo à la maison", href: "/fr/guides/how-to-take-passport-photo-at-home", emoji: "📱", desc: "Réussir la prise de vue" },
  { label: "Imprimer sa photo", href: "/fr/imprimer-photo-identite", emoji: "🖨️", desc: "Sans déformer le format" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Photo passeport Suisse 2026 : format 35×45 mm et normes fedpol",
      description: "Guide des critères fedpol pour la photo du passeport et de la carte d'identité suisses, mis à jour pour la carte d'identité avec puce.",
      inLanguage: "fr-CH",
      url: pageUrl,
      dateModified: updated,
      primaryImageOfPage: { "@type": "ImageObject", contentUrl: heroImage, caption: "Exemple de photo passeport suisse" },
      citation: "fedpol, Critères d'acceptation des photos pour passeports et cartes d'identité (2026)",
    },
    {
      "@type": "HowTo",
      name: "Préparer une photo de passeport suisse avec un smartphone",
      step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.content })),
    },
    {
      "@type": "SoftwareApplication",
      name: "PixPassport — Photo passeport Suisse",
      applicationCategory: "PhotographyApplication",
      operatingSystem: "All",
      inLanguage: "fr-CH",
      offers: { "@type": "Offer", price: "8.99", priceCurrency: "CHF" },
    },
  ],
};

export default function PhotoPasseportSuissePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbsFr items={[{ label: "Photo passeport Suisse", href: "/fr/photo-passeport-suisse" }]} />
      <HeroSectionFr
        title="Photo passeport Suisse : le bon format, sans mauvaise surprise"
        subtitle="35 × 45 mm · critères fedpol 2026 · dès CHF 8.99"
        description="Les critères de fedpol fixent la photo du passeport et de la carte d'identité suisses : 35 × 45 mm, visage de 29 à 34 mm, de face, sur un fond neutre et uni. Découvrez quand vous devez fournir votre photo, notamment depuis l'arrivée de la carte d'identité avec puce, et préparez-la depuis votre smartphone."
        ctaText="Préparer ma photo suisse"
        ctaHref={ctaHref}
        imageAlt="Photo passeport suisse au format 35 × 45 mm sur fond neutre et uniforme"
      />

      <section className="pb-6 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="rounded-xl border-2 border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
            <strong>Nouveau depuis le 2 novembre 2026 :</strong> la carte d&apos;identité existe aussi avec puce. Comme
            pour le passeport, la photo est alors prise au centre cantonal de biométrie. Une photo papier reste
            nécessaire pour la carte d&apos;identité <em>sans puce</em> demandée à la commune.
          </p>
          <p className="mt-3 text-xs text-slate-500">
            Mis à jour le <time dateTime={updated}>10 novembre 2026</time> · Source : critères d&apos;acceptation des
            photos de fedpol
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4 text-center">
            Quel document, et faut-il fournir une photo ?
          </h2>
          <p className="text-slate-600 mb-8 leading-relaxed text-center max-w-2xl mx-auto">
            Le lieu de la demande détermine si vous apportez votre photo ou si elle est prise sur place.
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="py-3 pl-4 pr-4 font-semibold text-slate-700">Document</th>
                  <th className="py-3 pr-4 font-semibold text-slate-700">Où le demander</th>
                  <th className="py-3 pr-4 font-semibold text-slate-700">Photo</th>
                  <th className="py-3 pr-4 font-semibold text-slate-700 whitespace-nowrap">Adulte</th>
                  <th className="py-3 pr-4 font-semibold text-slate-700 whitespace-nowrap">Mineur</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                {documents.map((d) => (
                  <tr key={d.doc} className="border-b border-slate-100 last:border-0">
                    <td className="py-3 pl-4 pr-4 font-medium text-slate-800">{d.doc}</td>
                    <td className="py-3 pr-4">{d.where}</td>
                    <td className={`py-3 pr-4 ${d.photo.startsWith("À fournir") ? "font-semibold text-green-700" : ""}`}>{d.photo}</td>
                    <td className="py-3 pr-4 whitespace-nowrap">CHF {d.adult}</td>
                    <td className="py-3 pr-4 whitespace-nowrap">CHF {d.minor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-500 leading-relaxed">
            Émoluments frais de port inclus. Validité : 10 ans pour les adultes, 5 ans pour les mineurs. Certains
            cantons acceptent une photo numérique pour le passeport s&apos;il est annoncé lors de la demande. Les
            pratiques varient : vérifiez auprès de votre canton (Genève, Vaud, Fribourg, Neuchâtel, Valais, Jura, Berne).
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6 text-center">
            Normes fedpol pour la photo de passeport suisse
          </h2>
          <p className="text-slate-600 mb-10 leading-relaxed text-center max-w-2xl mx-auto">
            L&apos;Office fédéral de la police (fedpol) publie les critères d&apos;acceptation des photos pour les
            passeports et cartes d&apos;identité, alignés sur la norme OACI 9303. Les mêmes règles s&apos;appliquent aux
            deux documents.
          </p>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-5 mb-14">
            {specs.map((spec) => (
              <div key={spec.label} className="border-b border-slate-200 pb-4">
                <div className="flex justify-between items-start gap-4">
                  <span className="font-bold text-slate-800">{spec.label}</span>
                  <span className="text-green-700 bg-green-50 px-2 py-0.5 rounded text-sm whitespace-nowrap">{spec.value}</span>
                </div>
                <p className="text-sm text-slate-500 mt-1">{spec.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-5 text-center">Six critères d&apos;une photo acceptée</h3>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            {requirements.map((r) => (
              <li key={r.title} className="border-l-2 border-green-500 pl-4">
                <p className="font-bold text-slate-800 text-sm">{r.title}</p>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">{r.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4 text-center">
            Les 12 motifs de refus de la planche fedpol
          </h2>
          <p className="text-slate-600 mb-8 leading-relaxed text-center max-w-2xl mx-auto">
            Ces défauts figurent sur la planche photo officielle. PixPassport contrôle la plupart d&apos;entre eux
            avant que vous imprimiez.
          </p>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {rejections.map((r) => (
              <li key={r} className="flex gap-3 text-sm text-slate-700">
                <span className="text-red-500 font-bold" aria-hidden="true">✕</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-green-600 uppercase tracking-wide">Avec votre smartphone</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 mb-4">
              Votre photo de passeport suisse en quatre étapes
            </h2>
          </div>
          <ol className="relative">
            {steps.map((item, i) => (
              <li key={item.step} className="relative pl-16 pb-10 last:pb-0">
                {i !== steps.length - 1 && (
                  <span className="absolute left-[23px] top-12 bottom-0 w-px bg-green-200" aria-hidden="true" />
                )}
                <span className="absolute left-0 top-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
                  {item.step}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-2 pt-1">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.content}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 text-center">
            <Link href={ctaHref} className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg">
              Créer ma photo passeport suisse
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6 text-center">Photo d&apos;un bébé ou d&apos;un enfant</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Pour les enfants de moins de 11 ans, le visage doit mesurer au moins 23 mm du menton au sommet du crâne.
            Pour les tout-petits, fedpol admet des écarts sur le regard vers l&apos;objectif, l&apos;expression neutre et
            la taille de la tête.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Allongez le bébé sur un drap uni, photographiez-le d&apos;au-dessus en lumière naturelle, sans tétine, sans
            jouet et sans main d&apos;adulte visible. Le passeport d&apos;un mineur coûte CHF 65 et reste valable 5 ans.
            Plus de conseils dans notre guide{" "}
            <Link href="/fr/photo-passeport-bebe-suisse" className="text-lime-600 hover:underline">photo passeport bébé Suisse</Link>.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6 text-center">
            PixPassport, photomaton ou photographe ?
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 pl-4 pr-4 text-slate-500 font-semibold text-sm uppercase">Critère</th>
                  <th className="py-3 pr-4 text-green-700 font-bold bg-green-50">PixPassport</th>
                  <th className="py-3 pr-4 text-slate-700 font-semibold">Photomaton</th>
                  <th className="py-3 pr-4 text-slate-700 font-semibold">Photographe</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                <tr className="border-b border-slate-100">
                  <td className="py-3 pl-4 pr-4 font-medium">Prix indicatif</td>
                  <td className="py-3 pr-4 bg-green-50/50">CHF 8.99</td>
                  <td className="py-3 pr-4">CHF 10 à 20</td>
                  <td className="py-3 pr-4">CHF 20 à 35</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 pl-4 pr-4 font-medium">Délai</td>
                  <td className="py-3 pr-4 bg-green-50/50">Quelques secondes</td>
                  <td className="py-3 pr-4">Selon disponibilité</td>
                  <td className="py-3 pr-4">Sur rendez-vous</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 pl-4 pr-4 font-medium">Essais illimités</td>
                  <td className="py-3 pr-4 bg-green-50/50">Oui, aperçu gratuit</td>
                  <td className="py-3 pr-4">Non</td>
                  <td className="py-3 pr-4">Limité</td>
                </tr>
                <tr>
                  <td className="py-3 pl-4 pr-4 font-medium">Disponibilité</td>
                  <td className="py-3 pr-4 bg-green-50/50">24h/24, depuis chez vous</td>
                  <td className="py-3 pr-4">Gares, grandes surfaces</td>
                  <td className="py-3 pr-4">Heures d&apos;ouverture</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-8 text-slate-600 leading-relaxed">
            Pour le permis de conduire, le titre de séjour (permis B, C, L ou G) ou un visa, consultez notre guide{" "}
            <Link href="/fr/photo-identite-suisse" className="text-lime-600 hover:underline">photo d&apos;identité Suisse</Link>.
            Cette page existe aussi en allemand :{" "}
            <Link href="/de/passfoto-schweiz-online" className="text-lime-600 hover:underline" hrefLang="de-CH" lang="de-CH">
              Passfoto Schweiz
            </Link>.
          </p>
        </div>
      </section>

      <FaqSectionFr faqs={faqs} title="Questions fréquentes — Photo passeport Suisse" />
      <RelatedGuidesFr links={relatedLinks} />
      <StickyCTAFr ctaHref={ctaHref} countryName="Suisse" />
    </>
  );
}
