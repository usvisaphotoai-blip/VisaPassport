import type { Metadata } from "next";
import Link from "next/link";
import HeroSectionFr from "../components/HeroSectionFr";

import FaqSectionFr from "../components/FaqSectionFr";
import RelatedGuidesFr from "../components/RelatedGuidesFr";
import StickyCTAFr from "../components/StickyCTAFr";
import BreadcrumbsFr from "../components/BreadcrumbsFr";
import { fr } from "../translations";

export const metadata: Metadata = {
  title: "Photo d'identité : normes 2026 et photo conforme | PixPassport",
  description: "Normes de la photo d'identité en France : 35×45 mm, fond gris clair (pas blanc), tête nue, expression neutre. Créez-la en ligne pour CNI, passeport, Vitale.",
  keywords: ["photo d'identité", "photo identité", "normes photo identité", "photo identité conforme", "format photo identité", "photo identité carte vitale"],
  alternates: {
    canonical: "https://www.pixpassport.com/fr/photo-identite",
    languages: {
      fr: "https://www.pixpassport.com/fr/photo-identite",
    },
  },
  openGraph: {
    title: "Photo d'identité aux normes 2026 | PixPassport",
    description: "Normes de la photo d'identité en France et photo conforme en ligne pour CNI, passeport et carte Vitale.",
    url: "https://www.pixpassport.com/fr/photo-identite", siteName: "PixPassport", locale: "fr_FR", type: "website",
    images: [{ url: "https://www.pixpassport.com/og-image.jpg", width: 1200, height: 630, alt: "Photo d'Identité Officielle" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo d'identité aux normes 2026 | PixPassport",
    description: "Normes de la photo d'identité en France et photo conforme en ligne pour CNI, passeport et carte Vitale.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
  },
};

const idFaqs = [
  { q: "Quelle taille pour une photo d'identité française ?", a: "La photo d'identité française mesure 35 × 45 mm avec un visage de 32 à 36 mm de hauteur, du menton au sommet du crâne. Notre outil calibre automatiquement ces dimensions." },
  { q: "Le fond doit-il être blanc ou gris ?", a: "Gris clair ou bleu clair, uni et sans ombre. Le fond blanc est refusé pour les photos d'identité françaises : il manque de contraste avec le visage et fait échouer la lecture biométrique." },
  { q: "Une seule photo suffit-elle pour la CNI et le passeport ?", a: "Oui. La carte nationale d'identité et le passeport suivent la même norme : une seule planche de photos conformes suffit si vous déposez les deux demandes lors du même rendez-vous en mairie. Le permis de conduire, lui, exige un code e-photo délivré par une cabine ou un photographe agréé." },
  { q: "Comment faire une photo d'identité pour un enfant ?", a: "Les mêmes règles s'appliquent : fond uni, expression neutre, yeux ouverts. Évitez de tenir l'enfant visible dans le cadre et utilisez une lumière douce pour limiter les mouvements flous." },
  { q: "La photo sera-t-elle acceptée en mairie ?", a: "Notre outil applique les critères ANTS en vigueur : dimensions, fond gris clair, position du visage et expression neutre. Si votre photo est refusée pour un motif de conformité, nous vous remboursons." },
  { q: "Peut-on porter des lunettes ou un voile sur une photo d'identité ?", a: "Les lunettes sont tolérées si les yeux restent parfaitement visibles (monture fine, verres non teintés, sans reflet), mais il est conseillé de les retirer. La tête doit être nue : chapeaux, casquettes, foulards et voiles sont refusés sur les photos d'identité françaises." },
  { q: "Quelle photo pour la carte Vitale ?", a: "La photo de la carte Vitale suit le même format 35×45 mm sur fond clair uni. Vous pouvez la téléverser directement dans votre compte ameli : un fichier numérique conforme suffit, sans code e-photo." },
];

const idSpecs = [
  { label: "Dimensions", value: "35 × 45 mm", detail: "Norme française commune à la CNI, au passeport et au permis" },
  { label: "Taille du visage", value: "32-36 mm", detail: "Du menton au sommet du crâne" },
  { label: "Arrière-plan", value: "Gris clair ou bleu clair", detail: "Uni, sans motif ni ombre — le fond blanc est refusé" },
  { label: "Expression", value: "Neutre", detail: "Bouche fermée, sourcils détendus" },
  { label: "Regard", value: "Face à l'objectif", detail: "Yeux ouverts et entièrement visibles" },
  { label: "Tête et lunettes", value: "Tête nue", detail: "Couvre-chef interdit ; lunettes tolérées si yeux visibles, sans reflet" },
];

const commonMistakes = [
  { title: "Éclairage direct au-dessus du visage", detail: "Il crée des ombres sous le nez et le menton. Préférez une lumière naturelle diffuse, face à vous." },
  { title: "Fond blanc", detail: "Il est refusé pour les photos d'identité françaises. Choisissez un fond uni gris clair ou bleu clair." },
  { title: "Tête légèrement inclinée", detail: "Même un angle discret fausse la mesure de la hauteur du visage et peut entraîner un rejet." },
  { title: "Photo recadrée à la main", detail: "Un recadrage approximatif décale le visage du centre et modifie les proportions exigées (35 × 45 mm)." },
  { title: "Reflets sur les verres de lunettes", detail: "Ils masquent une partie des yeux et entraînent un refus. Inclinez légèrement les branches ou retirez vos lunettes." },
  { title: "Cheveux devant le front ou les yeux", detail: "Le visage doit rester entièrement dégagé, du sommet du crâne au menton." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "SoftwareApplication", name: "PixPassport — Photo d'Identité", applicationCategory: "PhotographyApplication", operatingSystem: "All", inLanguage: "fr-FR", offers: { "@type": "Offer", price: "6.99", priceCurrency: "EUR" } },
  ],
};

export default function PhotoIdentitePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbsFr items={[{ label: "Photo d'identité", href: "/fr/photo-identite" }]} />
      <HeroSectionFr
        title="Photo d'identité aux normes 2026 : format, fond et règles"
        subtitle="Le bon format, le bon fond, du premier coup"
        description="Toutes les normes de la photo d'identité en France, et une photo conforme générée depuis votre smartphone pour la CNI, le passeport ou la carte Vitale, sans passer par un photomaton."
        ctaHref="/fr/passport-photo-online?type=france-cni-passport"
        showImage={true}
        imageAlt="Photo d'identité aux normes françaises : format 35×45 mm, fond gris clair, expression neutre"
      />
      <section className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
        <h2 className="text-3xl font-bold mb-6">
          Photo d&apos;identité en ligne : rapide, conforme et acceptée en France
        </h2>

        <p className="mb-4">
          Une photo d&apos;identité conforme conditionne l&apos;acceptation de vos démarches administratives en
          France. Que vous prépariez une carte nationale d&apos;identité (CNI), un passeport ou une carte
          Vitale, les exigences restent strictes. PixPassport génère votre photo d&apos;identité en quelques
          secondes, directement depuis votre smartphone, sans déplacement.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Pourquoi choisir une photo d&apos;identité numérique plutôt qu&apos;un photomaton
        </h2>

        <p className="mb-4">
          Les cabines photo et les studios professionnels coûtent souvent plus cher qu&apos;un service en ligne et
          imposent un déplacement. Une solution numérique reste accessible 24 heures sur 24, depuis n&apos;importe
          quel appareil. Notre intelligence artificielle détecte automatiquement votre visage, ajuste les
          dimensions et applique le fond conforme aux normes ANTS en vigueur.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Normes 2026 pour une photo d&apos;identité française
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-4">
          {idSpecs.map((spec) => (
            <div key={spec.label} className="border-b border-slate-100 pb-4">
              <div className="flex justify-between items-start">
                <span className="font-bold text-slate-800">{spec.label}</span>
                <span className="text-green-700 bg-green-50 px-2 py-0.5 rounded text-sm">{spec.value}</span>
              </div>
              <p className="text-sm text-slate-500 mt-1">{spec.detail}</p>
            </div>
          ))}
        </div>

        <p className="mb-4">
          Le point le plus souvent négligé concerne la couleur de fond : contrairement à une idée reçue, le fond
          blanc est refusé pour les photos d&apos;identité françaises. Utilisez un fond uni gris clair ou bleu clair
          (voir notre guide sur le{" "}
          <Link href="/fr/guides/passport-photo-background" className="text-lime-600 hover:underline">fond de la photo d&apos;identité</Link>).
          PixPassport applique ce fond par défaut sur chaque photo générée.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Six erreurs fréquentes qui font rejeter une photo d&apos;identité
        </h2>

        <p className="mb-4">
          La plupart des rejets viennent de détails invisibles à l&apos;œil nu sur un petit écran de smartphone.
          Voici les erreurs les plus courantes et comment les éviter :
        </p>

        <ul className="space-y-3 mb-4">
          {commonMistakes.map((mistake) => (
            <li key={mistake.title} className="flex items-start gap-2">
              <span className="text-green-600 mt-1">✗</span>
              <span><strong className="text-slate-800">{mistake.title}.</strong> {mistake.detail}</span>
            </li>
          ))}
        </ul>

        <p className="mb-4">
          Notre outil détecte automatiquement la plupart de ces problèmes avant que vous ne téléchargiez le fichier
          final, ce qui évite un rejet en mairie et un nouveau rendez-vous.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Comment créer votre photo d&apos;identité en ligne
        </h2>

        <h3 className="text-xl font-semibold mt-4 mb-2">1. Prenez une photo avec votre téléphone</h3>
        <p className="mb-3">
          Placez-vous face à une source de lumière naturelle et diffuse, sur un fond simple. Gardez le visage
          droit, entièrement visible et centré dans le cadre.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">2. Importez votre image</h3>
        <p className="mb-3">
          Téléversez votre photo sur PixPassport. L&apos;outil l&apos;analyse instantanément et signale tout point
          de non-conformité.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">3. Téléchargez votre photo conforme</h3>
        <p className="mb-4">
          Récupérez votre photo d&apos;identité prête à être imprimée ou utilisée en ligne pour vos démarches
          administratives. Pour le tirage, suivez notre guide pour{" "}
          <Link href="/fr/imprimer-photo-identite" className="text-lime-600 hover:underline">imprimer une photo d&apos;identité</Link>{" "}
          en taille réelle.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Quels documents exigent une photo d&apos;identité
        </h2>

        <p className="mb-4">
          Une photo d&apos;identité conforme reste nécessaire pour de nombreux documents officiels en France :
        </p>

        <ul className="list-disc pl-6 mb-4">
          <li><Link href="/fr/photo-carte-identite" className="text-lime-600 hover:underline">Carte nationale d&apos;identité (CNI)</Link></li>
          <li><Link href="/fr/photo-permis-de-conduire" className="text-lime-600 hover:underline">Permis de conduire</Link> (code e-photo obligatoire)</li>
          <li><Link href="/fr/photo-passeport" className="text-lime-600 hover:underline">Passeport</Link></li>
          <li>Carte Vitale</li>
          <li>Carte étudiante</li>
          <li>Abonnement de transport (passe Navigo, carte de bus…)</li>
          <li><Link href="/fr/photo-visa" className="text-lime-600 hover:underline">Visa</Link> et <Link href="/fr/photo-titre-de-sejour" className="text-lime-600 hover:underline">titre de séjour</Link> (code e-photo obligatoire pour l&apos;ANEF)</li>
        </ul>

        <p className="mb-4">
          Une seule photo conforme, respectant le format 35 × 45 mm et le fond gris clair, sert généralement pour
          plusieurs de ces démarches lorsqu&apos;elles sont effectuées dans le même délai de six mois.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Ce que PixPassport vous garantit
        </h2>

        <ul className="list-disc pl-6 mb-4">
          <li>Vérification biométrique automatique avant téléchargement</li>
          <li>Fond et cadrage conformes aux normes françaises en vigueur</li>
          <li>Traitement en moins de 30 secondes</li>
          <li>Compatibilité mobile et ordinateur</li>
          <li>Garantie satisfait ou remboursé en cas de refus</li>
        </ul>

        <p>
          Avec PixPassport, vous simplifiez vos démarches administratives tout en réduisant le risque de rejet.
          Essayez dès maintenant et obtenez votre photo d&apos;identité conforme en quelques clics.
        </p>
      </section>
      <FaqSectionFr faqs={idFaqs} title="Questions fréquentes — Photo d'identité" />
      <RelatedGuidesFr />
      <StickyCTAFr ctaText="Créer votre photo d'identité" />
    </>
  );
}