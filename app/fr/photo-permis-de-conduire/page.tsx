import type { Metadata } from "next";
import Link from "next/link";
import HeroSectionFr from "../components/HeroSectionFr";
import RequirementsFr from "../components/RequirementsFr";
import BreadcrumbsFr from "../components/BreadcrumbsFr";
import FaqSectionFr from "../components/FaqSectionFr";
import RelatedGuidesFr from "../components/RelatedGuidesFr";

const PAGE_URL = "https://www.pixpassport.com/fr/photo-permis-de-conduire";

export const metadata: Metadata = {
  title: "Photo permis de conduire : ePhoto et normes ANTS 2026",
  description: "Photo du permis de conduire : code ePhoto obligatoire pour la demande ANTS, où l'obtenir, normes de la photo (fond gris clair, 35×45 mm) et erreurs à éviter.",
  keywords: ["photo permis de conduire", "ephoto permis de conduire", "photo permis ants", "code photo permis", "photo signature permis", "photo permis normes"],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      fr: PAGE_URL,
    },
  },
  openGraph: {
    title: "Photo permis de conduire : ePhoto et normes ANTS 2026",
    description: "Code ePhoto obligatoire, où l'obtenir, normes de la photo et erreurs à éviter pour votre demande de permis.",
    url: PAGE_URL, siteName: "PixPassport", locale: "fr_FR", type: "article",
    images: [{ url: "https://www.pixpassport.com/og-image.jpg", width: 1200, height: 630, alt: "Photo permis de conduire" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo permis de conduire : ePhoto et normes ANTS 2026",
    description: "Code ePhoto obligatoire, où l'obtenir, normes de la photo et erreurs à éviter.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
  },
};

const permisFaqs = [
  { q: "Faut-il une ePhoto pour le permis de conduire ?", a: "Oui. Toutes les demandes de permis de conduire se font en ligne sur le site de l'ANTS, et elles exigent un code ePhoto : une photo numérique associée à votre signature, réalisée dans une cabine ou chez un photographe agréé. Une photo papier ou un simple fichier JPEG ne sont pas acceptés." },
  { q: "Où faire sa photo de permis de conduire ?", a: "Dans une cabine photo portant le logo « agréé ANTS » ou « e-photo » (en grande surface, gare, centre commercial) ou chez un photographe professionnel habilité. Le code à 22 caractères est imprimé sur la planche ou sur le ticket remis avec les photos." },
  { q: "Combien de temps le code ePhoto du permis est-il valable ?", a: "Six mois à partir de la prise de vue. Vous pouvez le réutiliser pour plusieurs démarches pendant cette période, par exemple une demande de passeport." },
  { q: "Puis-je utiliser une photo faite avec mon téléphone pour le permis ?", a: "Non, pas pour le permis de conduire, car le code ePhoto ne peut être généré que par une cabine ou un photographe agréé. Une photo faite au smartphone reste en revanche utilisable pour le passeport, la carte d'identité ou un visa." },
  { q: "Quelles sont les normes de la photo du permis de conduire ?", a: "Les mêmes que pour toute photo d'identité française : format 35×45 mm, visage de 32 à 36 mm, fond uni clair (gris clair ou bleu clair, jamais blanc), expression neutre, bouche fermée, tête nue, yeux ouverts et visibles. Les lunettes sont tolérées sans reflet ni verres teintés." },
  { q: "Ma photo de permis a été refusée par l'ANTS : que faire ?", a: "Le service instructeur vous indique le motif dans votre espace ANTS. Il faut refaire une ePhoto dans une cabine agréée en corrigeant le problème (souvent : ombre sur le fond, visage trop petit, reflets sur les lunettes), puis saisir le nouveau code dans votre demande." },
  { q: "Combien coûte une demande de permis de conduire ?", a: "Le renouvellement d'un permis arrivé en fin de validité est gratuit. En cas de perte ou de vol, un timbre fiscal de 25 € est demandé. Dans tous les cas, l'ePhoto réalisée en cabine reste à votre charge." },
];

const cases = [
  { title: "Première demande", desc: "Après la réussite de l'examen. L'auto-école peut faire la démarche pour vous, mais vous devez fournir le code ePhoto." },
  { title: "Renouvellement", desc: "Le permis au format carte bancaire (depuis 2013) doit être renouvelé tous les 15 ans pour les catégories A et B. Démarche administrative, sans examen." },
  { title: "Perte, vol ou détérioration", desc: "Demande de duplicata en ligne, avec un nouveau code ePhoto et un timbre fiscal en cas de perte ou de vol." },
  { title: "Échange d'un permis étranger", desc: "Pour les résidents titulaires d'un permis obtenu hors de France, sous conditions. Le code ePhoto est également demandé." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Photo permis de conduire : ePhoto et normes ANTS 2026",
      description: "Code ePhoto obligatoire, où l'obtenir, normes de la photo et erreurs à éviter pour une demande de permis de conduire.",
      inLanguage: "fr-FR",
      url: PAGE_URL,
      mainEntityOfPage: PAGE_URL,
      image: "https://www.pixpassport.com/og-image.jpg",
      datePublished: "2026-10-06",
      dateModified: "2026-10-06",
      author: { "@type": "Organization", name: "PixPassport" },
      publisher: { "@type": "Organization", name: "PixPassport", logo: { "@type": "ImageObject", url: "https://www.pixpassport.com/logo.png" } },
    },
  ],
};

export default function PhotoPermisPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbsFr items={[{ label: "Photo permis de conduire", href: "/fr/photo-permis-de-conduire" }]} />
      <HeroSectionFr
        title="Photo permis de conduire : ePhoto et normes ANTS"
        subtitle="Code ePhoto obligatoire pour toute demande de permis"
        description="La demande de permis se fait en ligne sur le site de l'ANTS et exige un code ePhoto, délivré par une cabine ou un photographe agréé. Voici où l'obtenir, les normes à respecter et les erreurs qui font refuser la photo."
        ctaHref="#ou-faire-photo-permis"
        ctaText="Où faire ma photo de permis ↓"
        showImage={true}
        imageAlt="Photo d'identité aux normes du permis de conduire : 35×45 mm, fond gris clair, expression neutre"
      />

      <RequirementsFr countryName="photo permis de conduire" specs={[
        { label: "Format", value: "ePhoto + code", detail: "Code à 22 caractères" },
        { label: "Dimensions", value: "35 × 45 mm", detail: "Visage de 32 à 36 mm" },
        { label: "Arrière-plan", value: "Gris clair", detail: "Uni, sans ombre — blanc refusé" },
        { label: "Signature", value: "Numérisée", detail: "Recueillie par la cabine" },
        { label: "Expression", value: "Neutre", detail: "Bouche fermée, tête nue" },
        { label: "Validité du code", value: "6 mois", detail: "À partir de la prise de vue" },
      ]} />

      <section className="max-w-5xl mx-auto px-4 py-12 text-gray-800">
        <h2 className="text-3xl font-bold mb-6">Pourquoi la photo du permis est différente</h2>
        <p className="mb-4">
          Depuis la dématérialisation des démarches, toutes les demandes de permis de conduire passent par le site de
          l&apos;ANTS. La photo n&apos;est plus envoyée sur papier : elle est transmise directement par la cabine ou le
          photographe agréé, avec votre signature numérisée. Vous recevez un <strong>code ePhoto</strong> que vous
          saisissez dans votre demande. Plus de détails dans notre guide sur le{" "}
          <Link href="/fr/ephoto-ants" className="text-lime-600 hover:underline">code ePhoto ANTS</Link>.
        </p>
        <p className="mb-4">
          Conséquence : une photo faite chez soi, même parfaitement conforme, ne peut pas être utilisée pour le permis.
          PixPassport ne délivre pas de code ePhoto.
        </p>

        <h2 id="ou-faire-photo-permis" className="text-2xl font-semibold mt-10 mb-4 scroll-mt-24">
          Où faire sa photo de permis de conduire ?
        </h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>
            <strong>Cabine photo agréée</strong> : repérez le logo « agréé ANTS » ou « e-photo » sur la cabine. Vous
            choisissez « permis de conduire », la cabine recueille la photo et la signature, puis imprime le code.
          </li>
          <li>
            <strong>Photographe professionnel habilité</strong> : plus cher, mais avec un contrôle humain du cadrage,
            utile pour un enfant ou une personne à mobilité réduite.
          </li>
        </ul>
        <p className="mb-4">
          Conservez la planche ou le ticket : le code reste valable six mois et peut resservir pour une autre démarche,
          comme une demande de passeport.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Pour quelles démarches ?</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {cases.map((c) => (
            <div key={c.title} className="border-l-2 border-lime-500 pl-4">
              <h3 className="font-bold text-slate-900 mb-1">{c.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Réussir sa photo de permis en cabine</h2>
        <p className="mb-4">La cabine ne corrige pas vos erreurs : vérifiez ces points avant de lancer la prise de vue.</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Réglez le siège pour que vos yeux soient à hauteur du repère.</li>
          <li>Dégagez le front et les oreilles, retirez bonnet, casquette ou foulard.</li>
          <li>Expression neutre, bouche fermée, regard droit dans l&apos;objectif.</li>
          <li>Retirez vos lunettes si elles font des reflets ; les verres teintés sont interdits.</li>
          <li>Évitez un haut blanc ou très clair qui se confond avec le fond.</li>
        </ul>
        <p className="mb-4">
          Les normes complètes sont détaillées sur notre page{" "}
          <Link href="/fr/photo-identite" className="text-lime-600 hover:underline">normes de la photo d&apos;identité</Link>{" "}
          et dans le guide sur le{" "}
          <Link href="/fr/guides/passport-photo-background" className="text-lime-600 hover:underline">fond de la photo</Link>.
        </p>

        <div className="mt-10 bg-lime-50 border border-lime-200 rounded-2xl p-6 text-center">
          <h2 className="text-lg font-bold text-slate-900 mb-2">Besoin aussi d&apos;une photo pour votre passeport ou votre CNI ?</h2>
          <p className="text-sm text-slate-600 mb-4">
            Pour ces titres, aucun code n&apos;est exigé : une photo papier conforme suffit. Créez-la depuis votre
            smartphone, aux normes ANTS, en 30 secondes.
          </p>
          <Link
            href="/fr/passport-photo-online?type=france-passport"
            className="inline-flex items-center px-6 py-3 bg-lime-600 text-white rounded-xl font-bold text-sm hover:bg-lime-700 transition-all shadow-lg"
          >
            Créer ma photo passeport ou CNI →
          </Link>
        </div>
      </section>

      <FaqSectionFr faqs={permisFaqs} title="Questions fréquentes — Photo permis de conduire" />
      <RelatedGuidesFr />
    </>
  );
}
