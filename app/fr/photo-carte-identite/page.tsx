import type { Metadata } from "next";
import Link from "next/link";
import HeroSectionFr from "../components/HeroSectionFr";

import RequirementsFr from "../components/RequirementsFr";

import StickyCTAFr from "../components/StickyCTAFr";
import BreadcrumbsFr from "../components/BreadcrumbsFr";
import FaqSectionFr from "../components/FaqSectionFr";
import RelatedGuidesFr from "../components/RelatedGuidesFr";

export const metadata: Metadata = {
  title: "Photo carte d'identité : normes CNI 2026 et photo en ligne",
  description: "Normes de la photo de carte d'identité : 35×45 mm, visage de 32 à 36 mm, fond gris clair ou bleu clair (blanc interdit), tête nue. Règles, enfants, prix et FAQ.",
  keywords: ["photo carte d'identité", "photo CNI", "normes photo carte d'identité", "photo carte nationale d'identité", "photo carte identité enfant", "photo identité 35x45", "fond photo carte d'identité"],
  alternates: {
    canonical: "https://www.pixpassport.com/fr/photo-carte-identite",
    languages: {
      fr: "https://www.pixpassport.com/fr/photo-carte-identite",
    },
  },
  openGraph: {
    title: "Photo carte d'identité : normes CNI 2026 et photo en ligne", description: "35×45 mm, visage de 32 à 36 mm, fond gris clair ou bleu clair, tête nue : toutes les normes de la photo CNI.",
    url: "https://www.pixpassport.com/fr/photo-carte-identite", siteName: "PixPassport", locale: "fr_FR", type: "website",
    images: [{ url: "https://www.pixpassport.com/og-image.jpg", width: 1200, height: 630, alt: "Photo carte d'identité aux normes CNI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo carte d'identité : normes CNI 2026",
    description: "35×45 mm, visage de 32 à 36 mm, fond gris clair ou bleu clair, tête nue : toutes les normes de la photo CNI.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
  },
};

const cniFaqs = [
  { q: "Quelle est la taille d'une photo de carte d'identité ?", a: "La photo mesure 35 × 45 mm. Le visage, du menton au sommet du crâne (cheveux exclus), mesure entre 32 et 36 mm, soit 70 à 80 % de la hauteur de la photo." },
  { q: "Le fond blanc est-il accepté pour la carte d'identité ?", a: "Non. Le fond blanc est interdit. Choisissez un fond uni et clair, par exemple gris clair ou bleu clair, sans motif ni ombre." },
  { q: "Peut-on porter des lunettes sur la photo de CNI ?", a: "Oui, mais elles ne sont pas obligatoires. Si vous les gardez, la monture doit être fine et ne pas masquer les yeux, et les verres ne doivent être ni teintés ni colorés, sans reflet." },
  { q: "Peut-on sourire sur la photo de carte d'identité ?", a: "Non. Gardez une expression neutre, la bouche fermée et les yeux ouverts, en regardant l'objectif." },
  { q: "Combien de photos faut-il fournir pour une CNI ?", a: "Une seule photo papier, à apporter au rendez-vous en mairie." },
  { q: "Peut-on utiliser la même photo pour le passeport et la CNI ?", a: "Oui. Les normes sont identiques. Si vous demandez les deux titres à moins de six mois d'intervalle, la même photo convient." },
  { q: "Qui peut prendre la photo de carte d'identité ?", a: "Selon service-public.fr, la photo doit être prise par un professionnel habilité ou dans une cabine utilisant un système agréé. En métropole, la mairie ne prend généralement pas la photo au guichet." },
  { q: "Faut-il un code ePhoto pour la carte d'identité ?", a: "Non. Pour la CNI, vous apportez une photo papier au rendez-vous. Le code ePhoto concerne surtout le permis de conduire et les titres de séjour demandés en ligne." },
  { q: "Combien de temps une photo d'identité est-elle valable ?", a: "La photo doit dater de moins de six mois et vous ressembler au jour du dépôt de la demande." },
  { q: "Combien coûte une carte d'identité ?", a: "La carte d'identité est gratuite, en première demande comme en renouvellement. En cas de perte ou de vol, vous payez un timbre fiscal de 25 €." },
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
        title="Photo carte d'identité : normes CNI et photo en ligne"
        subtitle="Toutes les règles de la carte nationale d'identité, vérifiées en octobre 2026"
        description="Format 35 × 45 mm, visage de 32 à 36 mm, fond gris clair ou bleu clair, tête nue. Préparez une photo aux normes depuis votre smartphone en 30 secondes."
        ctaHref="/fr/passport-photo-online?type=france-cni-passport"
        showImage={true}
        imageAlt="Photo pour carte nationale d'identité française, 35×45 mm sur fond gris clair"
      />

      <RequirementsFr countryName="France (CNI)" specs={[
        { label: "Dimensions", value: "35 × 45 mm", detail: "Format officiel CNI" },
        { label: "Visage", value: "32-36 mm", detail: "Menton au sommet du crâne" },
        { label: "Arrière-plan", value: "Gris clair", detail: "Ou bleu clair — blanc interdit" },
        { label: "Expression", value: "Neutre", detail: "Bouche fermée, yeux ouverts" },
        { label: "Tête", value: "Nue", detail: "Ni chapeau, ni foulard, ni serre-tête" },
        { label: "Ancienneté", value: "< 6 mois", detail: "Photo ressemblante" },
      ]} />
      {/* SEO CONTENT BLOCK */}
      <section className="max-w-5xl mx-auto px-4 py-12 text-gray-800">
        <h2 className="text-3xl font-bold mb-6">
          Photo de carte d&apos;identité : les normes en bref
        </h2>

        <p className="mb-4">
          La photo de carte nationale d&apos;identité (CNI) suit les mêmes normes que la photo de passeport. Le
          ministère de l&apos;Intérieur les fixe par l&apos;arrêté du 5 février 2009, d&apos;après la norme
          internationale ISO/IEC 19794-5. Une seule erreur de cadrage, de fond ou d&apos;expression suffit pour que la
          mairie refuse votre photo. Voici les règles à respecter, tirées de la fiche officielle de service-public.fr.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left border border-gray-200 rounded-lg text-sm">
            <tbody>
              <tr className="border-b border-gray-200"><th className="p-3 bg-gray-50 font-semibold">Format</th><td className="p-3">35 × 45 mm, en couleur de préférence</td></tr>
              <tr className="border-b border-gray-200"><th className="p-3 bg-gray-50 font-semibold">Visage</th><td className="p-3">32 à 36 mm du menton au sommet du crâne (70 à 80 % de la photo)</td></tr>
              <tr className="border-b border-gray-200"><th className="p-3 bg-gray-50 font-semibold">Fond</th><td className="p-3">Uni et clair (gris clair, bleu clair) ; blanc interdit</td></tr>
              <tr className="border-b border-gray-200"><th className="p-3 bg-gray-50 font-semibold">Expression</th><td className="p-3">Neutre, bouche fermée, yeux ouverts, regard face à l&apos;objectif</td></tr>
              <tr className="border-b border-gray-200"><th className="p-3 bg-gray-50 font-semibold">Tête</th><td className="p-3">Nue : ni chapeau, ni foulard, ni serre-tête</td></tr>
              <tr className="border-b border-gray-200"><th className="p-3 bg-gray-50 font-semibold">Lunettes</th><td className="p-3">Facultatives ; monture fine, verres clairs, sans reflet</td></tr>
              <tr><th className="p-3 bg-gray-50 font-semibold">Ancienneté</th><td className="p-3">Moins de 6 mois ; photo ressemblante au jour du dépôt</td></tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Les normes de la photo CNI en détail
        </h2>

        <h3 className="text-xl font-semibold mt-4 mb-2">Format et cadrage</h3>
        <p className="mb-3">
          La photo mesure 35 mm de large sur 45 mm de haut. Votre visage occupe 32 à 36 mm, du bas du menton au
          sommet du crâne, sans compter les cheveux. Centrez la tête, gardez-la droite et laissez apparaître le haut
          des épaules. Un visage trop petit, trop grand ou décentré entraîne un refus.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">Fond et éclairage</h3>
        <p className="mb-3">
          Choisissez un fond uni et clair : gris clair ou bleu clair. <strong>Le fond blanc est interdit.</strong>{" "}
          Le fond ne doit présenter ni motif, ni objet, ni ombre. Éclairez votre visage de face et de manière
          uniforme, sans reflet sur la peau ni ombre derrière la tête.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">Expression et regard</h3>
        <p className="mb-3">
          Regardez l&apos;objectif, la bouche fermée, avec une expression neutre. Gardez les yeux ouverts et bien
          visibles : aucune mèche ne doit les cacher. Ne souriez pas et n&apos;inclinez pas la tête.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">Lunettes, couvre-chef et accessoires</h3>
        <p className="mb-4">
          Vous pouvez retirer vos lunettes : rien ne vous oblige à les porter. Si vous les gardez, choisissez une
          monture fine qui ne masque pas les yeux, avec des verres ni teintés ni colorés, sans reflet. La tête reste
          nue : chapeau, casquette, foulard, voile et serre-tête sont refusés.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Où faire sa photo de carte d&apos;identité ?
        </h2>
        <p className="mb-4">
          Selon service-public.fr, la photo doit être prise <strong>par un professionnel habilité ou dans une cabine
          utilisant un système agréé</strong> par le ministère de l&apos;Intérieur. En métropole, la mairie ne prend
          généralement pas la photo au guichet : vous l&apos;apportez au rendez-vous. Pour un passeport ou une CNI,
          aucun code ePhoto n&apos;est demandé, contrairement au{" "}
          <Link href="/fr/photo-permis-de-conduire" className="text-lime-600 hover:underline">permis de conduire</Link>{" "}
          et au{" "}
          <Link href="/fr/photo-titre-de-sejour" className="text-lime-600 hover:underline">titre de séjour</Link>.
        </p>
        <p className="mb-4">
          PixPassport vous aide à préparer une photo aux bonnes dimensions : l&apos;outil cadre votre visage entre
          32 et 36 mm, applique un fond gris clair et contrôle l&apos;expression. Avant de l&apos;utiliser pour votre
          CNI, vérifiez auprès de votre mairie qu&apos;elle accepte une photo réalisée en ligne.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Photo de carte d&apos;identité pour un enfant ou un bébé
        </h2>
        <p className="mb-4">
          Les enfants suivent les mêmes normes que les adultes. L&apos;enfant apparaît seul, tête nue, sur un fond
          clair et uni, sans tétine, jouet ni main visible. Pour un bébé, allongez-le sur un drap gris clair et
          photographiez-le d&apos;en haut. Retrouvez nos astuces dans le guide{" "}
          <Link href="/fr/photo-bebe" className="text-lime-600 hover:underline">photo d&apos;identité bébé</Link>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Les motifs de refus les plus fréquents
        </h2>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Fond blanc, coloré ou non uniforme</li>
          <li>Ombre sur le visage ou derrière la tête</li>
          <li>Visage trop petit, trop grand ou décentré</li>
          <li>Sourire, bouche ouverte ou tête inclinée</li>
          <li>Reflets sur les lunettes ou verres teintés</li>
          <li>Photo de plus de six mois, floue ou retouchée</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Demander sa carte d&apos;identité en 3 étapes
        </h2>
        <ol className="list-decimal pl-6 mb-4 space-y-2">
          <li>
            <strong>Pré-demande en ligne (facultative)</strong> : remplissez-la sur le site de l&apos;ANTS et notez
            le numéro ou le QR code obtenu.
          </li>
          <li>
            <strong>Rendez-vous en mairie</strong> : apportez votre photo papier de moins de six mois et vos
            justificatifs. L&apos;agent relève vos empreintes digitales.
          </li>
          <li>
            <strong>Retrait de la carte</strong> : récupérez votre CNI dans la mairie du dépôt dès réception du SMS.
          </li>
        </ol>
        <p className="mb-4">
          La carte d&apos;identité au format carte bancaire reste valable 10 ans. Les cartes délivrées à des
          majeurs entre le 2 janvier 2004 et le 31 décembre 2013 restent valables 15 ans, sans changement de la date
          imprimée. La carte est gratuite ; seul un timbre fiscal de 25 € s&apos;applique en cas de perte ou de vol.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Préparer votre photo CNI avec PixPassport
        </h2>
        <ol className="list-decimal pl-6 mb-4 space-y-2">
          <li><strong>Prenez la photo</strong> : face à un mur clair, à la lumière du jour, téléphone à hauteur des yeux.</li>
          <li><strong>Importez l&apos;image</strong> : l&apos;outil détecte votre visage et le cadre au format 35 × 45 mm.</li>
          <li><strong>Téléchargez le résultat</strong> : une photo sur fond gris clair et une planche 10 × 15 cm à imprimer.</li>
        </ol>
        <p>
          La même photo convient pour votre{" "}
          <Link href="/fr/photo-passeport" className="text-lime-600 hover:underline">passeport</Link> si vous le
          demandez dans les six mois.
        </p>
      </section>
      <FaqSectionFr faqs={cniFaqs} title="Questions fréquentes — Photo carte d'identité" />
      <RelatedGuidesFr />
      <StickyCTAFr ctaHref="/fr/passport-photo-online?type=france-cni-passport" ctaText="Préparer ma photo CNI" />
    </>
  );
}
