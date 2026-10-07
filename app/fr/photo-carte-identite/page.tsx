import type { Metadata } from "next";
import Link from "next/link";
import HeroSectionFr from "../components/HeroSectionFr";

import RequirementsFr from "../components/RequirementsFr";

import StickyCTAFr from "../components/StickyCTAFr";
import BreadcrumbsFr from "../components/BreadcrumbsFr";
import FaqSectionFr from "../components/FaqSectionFr";
import RelatedGuidesFr from "../components/RelatedGuidesFr";

export const metadata: Metadata = {
  title: "Photo carte d'identité (CNI) en ligne | PixPassport",
  description: "Photo pour carte d'identité depuis votre smartphone : 35×45 mm, fond gris clair (pas blanc), visage 32-36 mm. Planche 10×15 cm à imprimer, remboursé si refusée.",
  keywords: ["photo carte d'identité", "photo CNI", "photo carte nationale d'identité", "photo carte identité enfant", "photo CNI normes", "photo carte identité en ligne"],
  alternates: {
    canonical: "https://www.pixpassport.com/fr/photo-carte-identite",
    languages: {
      fr: "https://www.pixpassport.com/fr/photo-carte-identite",
    },
  },
  openGraph: {
    title: "Photo carte d'identité (CNI) en ligne | PixPassport", description: "Photo pour carte d'identité française aux normes ANTS : 35×45 mm, fond gris clair, depuis votre smartphone.",
    url: "https://www.pixpassport.com/fr/photo-carte-identite", siteName: "PixPassport", locale: "fr_FR", type: "website",
    images: [{ url: "https://www.pixpassport.com/og-image.jpg", width: 1200, height: 630, alt: "Photo Carte d'Identité en Ligne" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Carte d'Identité en Ligne | PixPassport",
    description: "Photo pour carte d'identité française aux normes ANTS : 35×45 mm, fond gris clair, depuis votre smartphone.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
  },
};

const cniFaqs = [
  { q: "Quelles sont les dimensions d'une photo pour la CNI ?", a: "La photo pour la carte nationale d'identité doit mesurer 35×45mm avec un visage de 32 à 36mm de hauteur, du menton au sommet du crâne." },
  { q: "Quelle est la différence entre photo passeport et photo CNI ?", a: "Aucune : en France, les exigences sont identiques (35×45 mm, fond uni gris clair ou bleu clair, expression neutre, tête nue). La même photo peut servir pour les deux documents si vous les demandez ensemble." },
  { q: "Le fond de la photo de carte d'identité peut-il être blanc ?", a: "Non. Le fond blanc est refusé pour la carte nationale d'identité. Il doit être uni et clair, de préférence gris clair ou bleu clair. PixPassport applique automatiquement un fond gris clair conforme." },
  { q: "Peut-on porter des lunettes sur la photo de CNI ?", a: "Oui, si les yeux sont parfaitement visibles : monture fine, verres non teintés, aucun reflet. Il reste conseillé de les retirer pour éviter tout refus. La tête doit en revanche être nue." },
  { q: "Combien coûte une carte d'identité ?", a: "La première demande et le renouvellement d'une carte d'identité sont gratuits. Un timbre fiscal de 25 € est demandé uniquement en cas de perte ou de vol. Seule la photo reste à votre charge." },
  { q: "La photo est-elle compatible avec le nouveau format de CNI ?", a: "Oui, notre outil génère des photos conformes aux normes du nouveau format de carte d'identité française au format carte bancaire, en vigueur depuis 2021." },
  { q: "Combien de photos sont incluses dans la planche d'impression ?", a: "La planche d'impression A4 contient plusieurs photos au format exact 35×45mm, prêtes à être découpées pour votre demande de CNI." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "SoftwareApplication", name: "PixPassport — Photo Carte d'Identité", applicationCategory: "PhotographyApplication", operatingSystem: "All", inLanguage: "fr-FR", offers: { "@type": "Offer", price: "6.99", priceCurrency: "EUR" } },
  ],
};

export default function PhotoCarteIdentitePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbsFr items={[{ label: "Photo Carte d'Identité", href: "/fr/photo-carte-identite" }]} />
      <HeroSectionFr
        title="Photo Carte d'Identité en Ligne"
        subtitle="Aux normes de la carte nationale d'identité française"
        description="Photo conforme aux exigences de la CNI française : format 35×45 mm, fond gris clair uni, visage cadré entre 32 et 36 mm. Prête en 30 secondes depuis votre smartphone."
        ctaHref="/fr/passport-photo-online?type=france-cni-passport"
        showImage={true}
        imageAlt="Photo pour carte nationale d'identité française, 35×45 mm sur fond gris clair"
      />

      <RequirementsFr countryName="France (CNI)" specs={[
        { label: "Dimensions", value: "35 × 45 mm", detail: "Format officiel CNI" },
        { label: "Visage", value: "32-36 mm", detail: "Hauteur menton-crâne" },
        { label: "Arrière-plan", value: "Gris clair", detail: "Uni, sans ombre — blanc refusé" },
        { label: "Expression", value: "Neutre", detail: "Bouche fermée" },
        { label: "Regard", value: "Face objectif", detail: "Yeux ouverts" },
        { label: "Format CNI", value: "Nouveau format", detail: "Compatible 2021+" },
      ]} />
      {/* SEO CONTENT BLOCK */}
      <section className="max-w-5xl mx-auto px-4 py-12 text-gray-800">
        <h2 className="text-3xl font-bold mb-6">
          Photo carte d'identité conforme en ligne (CNI France)
        </h2>

        <p className="mb-4">
          La photo carte d'identité est un élément indispensable pour toute demande de carte nationale d'identité (CNI) en France.
          Les autorités françaises imposent des règles strictes concernant le format, le cadrage et la qualité de la photo.
          Une image non conforme peut entraîner un refus immédiat de votre dossier. Grâce à PixPassport, vous pouvez créer une
          photo CNI en ligne parfaitement conforme aux normes officielles, en quelques secondes seulement.
        </p>

        <p className="mb-4">
          Notre solution utilise une intelligence artificielle avancée pour analyser votre visage, ajuster automatiquement
          le cadrage biométrique et corriger l'arrière-plan. Vous obtenez ainsi une photo carte d'identité prête à être
          utilisée pour vos démarches administratives, sans avoir besoin de vous déplacer chez un photographe.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Normes officielles pour une photo CNI en France
        </h2>

        <p className="mb-4">
          Pour être acceptée, une photo carte nationale d'identité doit respecter des critères précis définis par l'administration française.
          Ces exigences garantissent une identification fiable et sécurisée.
        </p>

        <ul className="list-disc pl-6 mb-4">
          <li>Dimensions obligatoires : 35 × 45 mm</li>
          <li>Hauteur du visage : entre 32 et 36 mm</li>
          <li>Fond : uni et clair (gris clair ou bleu clair), sans ombre — le blanc est refusé</li>
          <li>Expression : neutre, bouche fermée</li>
          <li>Regard : droit face à l'objectif</li>
          <li>Tête nue : couvre-chefs interdits ; lunettes tolérées si les yeux restent visibles, sans reflet</li>
          <li>Photo récente : moins de six mois, non retouchée</li>
        </ul>

        <p className="mb-4">
          Avec PixPassport, toutes ces règles sont appliquées automatiquement. Vous évitez ainsi les erreurs fréquentes
          qui peuvent retarder votre demande de CNI.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Photo CNI en ligne : une solution rapide et économique
        </h2>

        <p className="mb-4">
          Faire une photo d'identité traditionnelle peut être contraignant : déplacement, attente, coût élevé.
          Les cabines photo ne garantissent pas toujours une conformité parfaite, ce qui peut entraîner des refus.
          En optant pour une solution en ligne, vous simplifiez votre processus et gagnez du temps.
        </p>

        <ul className="list-disc pl-6 mb-4">
          <li>✔ Disponible 24h/24 depuis votre smartphone</li>
          <li>✔ Résultat en moins de 30 secondes</li>
          <li>✔ Conforme aux normes ANTS</li>
          <li>✔ Téléchargement immédiat</li>
          <li>✔ Impression facile à domicile</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Comment créer votre photo carte d'identité en ligne ?
        </h2>

        <h3 className="text-xl font-semibold mt-4 mb-2">
          1. Prenez une photo de qualité
        </h3>
        <p className="mb-3">
          Utilisez votre téléphone dans un environnement bien éclairé avec un fond simple. Assurez-vous que votre visage
          est bien visible et centré, sans ombres ni reflets.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">
          2. Importez votre image
        </h3>
        <p className="mb-3">
          Téléchargez votre photo sur PixPassport. L'outil détecte automatiquement votre visage et ajuste le cadrage
          selon les normes françaises.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">
          3. Téléchargez votre photo conforme
        </h3>
        <p className="mb-4">
          Recevez instantanément votre photo carte d'identité prête à être imprimée ou utilisée pour votre demande officielle.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Nouvelle carte d'identité française : ce qu'il faut savoir
        </h2>

        <p className="mb-4">
          Depuis 2021, la France délivre une nouvelle carte nationale d'identité au format carte bancaire, valable 10 ans.
          Elle intègre une puce contenant votre photo et vos empreintes digitales. La demande se fait en trois étapes :
          pré-demande en ligne sur le site de l'ANTS, rendez-vous dans une mairie équipée d'un dispositif de recueil
          (avec votre photo papier 35×45 mm de moins de six mois), puis retrait de la carte dans la même mairie.
        </p>

        <p className="mb-4">
          Pour un enfant, les règles sont les mêmes : il doit être seul sur la photo, tête nue, sur fond clair uni
          (astuces pour les tout-petits dans notre guide <Link href="/fr/photo-bebe" className="text-lime-600 hover:underline">photo d&apos;identité bébé</Link>).
          PixPassport recadre automatiquement la photo au bon format, que ce soit pour un adulte ou un mineur. Si vous
          demandez aussi un <Link href="/fr/photo-passeport" className="text-lime-600 hover:underline">passeport</Link>,
          la même photo convient.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Pourquoi choisir PixPassport pour votre photo CNI ?
        </h2>

        <ul className="list-disc pl-6 mb-4">
          <li>✔ Technologie IA avancée pour un cadrage parfait</li>
          <li>✔ Conforme aux normes officielles françaises</li>
          <li>✔ Utilisable pour CNI et <Link href="/fr/photo-passeport" className="text-lime-600 hover:underline">passeport</Link></li>
          <li>✔ Interface simple et rapide</li>
          <li>✔ Garantie d'acceptation</li>
        </ul>

        <p>
          Ne prenez aucun risque avec votre demande de carte d'identité. Utilisez PixPassport pour créer une photo CNI
          conforme en ligne et simplifiez vos démarches administratives dès aujourd'hui.
        </p>
      </section>
      <FaqSectionFr faqs={cniFaqs} title="Questions fréquentes — Photo carte d'identité" />
      <RelatedGuidesFr />
      <StickyCTAFr ctaHref="/fr/passport-photo-online?type=france-cni-passport" ctaText="Créer votre photo CNI" />
    </>
  );
}
