import type { Metadata } from "next";
import Link from "next/link";
import HeroSectionFr from "../components/HeroSectionFr";
import TrustStripFr from "../components/TrustStripFr";
import HowItWorksFr from "../components/HowItWorksFr";
import RequirementsFr from "../components/RequirementsFr";
import FaqSectionFr from "../components/FaqSectionFr";
import RelatedGuidesFr from "../components/RelatedGuidesFr";
import StickyCTAFr from "../components/StickyCTAFr";
import BreadcrumbsFr from "../components/BreadcrumbsFr";
import { fr } from "../translations";

export const metadata: Metadata = {
  title: "Photo d'Identité en Ligne — CNI, Permis & Documents Officiels",
  description: "Créez une photo d'identité conforme en ligne pour CNI, permis de conduire et tous documents officiels français. Vérification biométrique IA instantanée.",
  keywords: ["photo identité", "photo identité en ligne", "photo CNI", "photo permis de conduire", "photo identité conforme"],
  alternates: { canonical: "https://www.pixpassport.com/fr/photo-identite" },
  openGraph: {
    title: "Photo d'Identité en Ligne | PixPassport",
    description: "Photo d'identité conforme pour CNI et documents officiels. Vérification biométrique IA.",
    url: "https://www.pixpassport.com/fr/photo-identite", siteName: "PixPassport", locale: "fr_FR", type: "website",
    images: [{ url: "https://www.pixpassport.com/og-image.jpg", width: 1200, height: 630, alt: "Photo d'Identité en Ligne" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "SoftwareApplication", name: "PixPassport — Photo d'Identité", applicationCategory: "PhotographyApplication", operatingSystem: "All", inLanguage: "fr" },
    { "@type": "FAQPage", mainEntity: [
      { "@type": "Question", name: "Quelle taille pour une photo d'identité française ?", acceptedAnswer: { "@type": "Answer", text: "La photo d'identité française doit mesurer 35×45mm avec un visage de 32 à 36mm de hauteur." } },
      { "@type": "Question", name: "Où utiliser une photo d'identité ?", acceptedAnswer: { "@type": "Answer", text: "La photo d'identité est utilisée pour la CNI, le permis de conduire, la carte vitale, les abonnements transport et les cartes étudiantes." } },
      { "@type": "Question", name: "Puis-je faire ma photo d'identité en ligne ?", acceptedAnswer: { "@type": "Answer", text: "Oui, PixPassport vous permet de créer une photo d'identité conforme depuis chez vous en moins de 30 secondes." } },
    ]},
  ],
};

const idFaqs = [
  { q: "Quelle taille pour une photo d'identité française ?", a: "La photo d'identité française doit mesurer 35×45mm avec un visage de 32 à 36mm de hauteur. Notre outil calibre automatiquement ces dimensions." },
  { q: "Où utiliser une photo d'identité ?", a: "La photo d'identité est utilisée pour la CNI, le permis de conduire, la carte vitale, les abonnements de transport et les cartes étudiantes." },
  { q: "Puis-je faire ma photo d'identité en ligne ?", a: "Oui, PixPassport vous permet de créer une photo d'identité conforme depuis chez vous avec votre téléphone en moins de 30 secondes." },
  { q: "La photo sera-t-elle acceptée en préfecture ?", a: "Oui, nos photos sont conformes aux normes ANTS et aux exigences des préfectures françaises. Nous garantissons l'acceptation à 100%." },
  { q: "Quel format de fichier est généré ?", a: "Nous générons un fichier JPEG haute résolution optimisé pour l'impression et la soumission numérique, ainsi qu'une planche d'impression A4." },
];

const idSpecs = [
  { label: "Dimensions", value: "35 × 45 mm", detail: "Norme française" },
  { label: "Taille du visage", value: "32-36 mm", detail: "Du menton au sommet du crâne" },
  { label: "Arrière-plan", value: "Blanc ou gris clair", detail: "Uni, sans motif" },
  { label: "Expression", value: "Neutre", detail: "Bouche fermée" },
  { label: "Regard", value: "Face à l'objectif", detail: "Yeux ouverts et visibles" },
  { label: "Accessoires", value: "Interdits", detail: "Pas de lunettes ni couvre-chef" },
];

export default function PhotoIdentitePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbsFr items={[{ label: "Photo d'identité", href: "/fr/photo-identite" }]} />
      <HeroSectionFr title={fr.hero.id.title} subtitle={fr.hero.id.subtitle} description={fr.hero.id.description} ctaHref="/fr/passport-photo-online"     showBeforeAfter={true}/>
       <section className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
        <h2 className="text-3xl font-bold mb-6">
          Photo d'identité en ligne : rapide, conforme et acceptée en France
        </h2>

        <p className="mb-4">
          Créer une photo d'identité conforme est essentiel pour toutes vos démarches administratives en France.
          Que ce soit pour une carte nationale d'identité (CNI), un permis de conduire ou une carte vitale,
          les exigences sont strictes et doivent être respectées à la lettre. Grâce à PixPassport, vous pouvez
          désormais générer votre photo d'identité en ligne en quelques secondes, sans vous déplacer.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Pourquoi choisir une photo d'identité en ligne ?
        </h2>

        <p className="mb-4">
          Les cabines photo et photographes professionnels peuvent être coûteux et peu pratiques. Avec une solution
          en ligne, vous bénéficiez d'un service rapide, accessible 24h/24 et compatible avec tous les appareils.
          Notre outil utilise une intelligence artificielle avancée pour détecter automatiquement votre visage,
          ajuster les dimensions et garantir la conformité aux normes ANTS.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Normes officielles pour une photo d'identité française
        </h2>

        <ul className="list-disc pl-6 mb-4">
          <li>Format : 35 x 45 mm</li>
          <li>Visage : 32 à 36 mm (du menton au sommet du crâne)</li>
          <li>Fond : clair, uni (blanc ou gris)</li>
          <li>Expression : neutre, bouche fermée</li>
          <li>Yeux : ouverts et visibles</li>
          <li>Lunettes : interdites</li>
        </ul>

        <p className="mb-4">
          Notre outil ajuste automatiquement tous ces paramètres afin que votre photo soit acceptée par les autorités
          françaises sans risque de rejet.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Comment créer votre photo d'identité en ligne ?
        </h2>

        <h3 className="text-xl font-semibold mt-4 mb-2">1. Prenez une photo avec votre téléphone</h3>
        <p className="mb-3">
          Placez-vous face à une source de lumière naturelle avec un fond simple. Assurez-vous que votre visage est
          bien visible et centré.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">2. Importez votre image</h3>
        <p className="mb-3">
          Téléchargez votre photo sur PixPassport. L'outil analyse instantanément votre image.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">3. Téléchargez votre photo conforme</h3>
        <p className="mb-4">
          Obtenez votre photo d'identité prête à être imprimée ou utilisée en ligne pour vos démarches administratives.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Quels documents nécessitent une photo d'identité ?
        </h2>

        <p className="mb-4">
          Une photo d'identité est requise pour de nombreux documents officiels en France :
        </p>

        <ul className="list-disc pl-6 mb-4">
          <li><Link href="/fr/photo-carte-identite" className="text-lime-600 hover:underline">Carte nationale d'identité (CNI)</Link></li>
          <li><Link href="/fr/ephoto-ants" className="text-lime-600 hover:underline">Permis de conduire</Link></li>
          <li><Link href="/fr/photo-passeport" className="text-lime-600 hover:underline">Passeport</Link></li>
          <li>Carte vitale</li>
          <li>Cartes étudiantes</li>
          <li>Abonnements de transport</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Avantages de PixPassport
        </h2>

        <ul className="list-disc pl-6 mb-4">
          <li>✔ Vérification biométrique automatique</li>
          <li>✔ Conforme aux normes françaises (ANTS)</li>
          <li>✔ Rapide (moins de 30 secondes)</li>
          <li>✔ Accessible sur mobile et desktop</li>
          <li>✔ Garantie d'acceptation</li>
        </ul>

        <p>
          Avec PixPassport, vous simplifiez vos démarches administratives tout en économisant du temps et de l'argent.
          Essayez dès maintenant et obtenez votre photo d'identité conforme en quelques clics.
        </p>
      </section>
      <StickyCTAFr ctaText="Créer votre photo d'identité" />
    </>
  );
}
