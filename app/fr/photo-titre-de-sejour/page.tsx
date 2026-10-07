import type { Metadata } from "next";
import Link from "next/link";
import HeroSectionFr from "../components/HeroSectionFr";
import RequirementsFr from "../components/RequirementsFr";
import BreadcrumbsFr from "../components/BreadcrumbsFr";
import FaqSectionFr from "../components/FaqSectionFr";
import RelatedGuidesFr from "../components/RelatedGuidesFr";

const PAGE_URL = "https://www.pixpassport.com/fr/photo-titre-de-sejour";

export const metadata: Metadata = {
  title: "Photo titre de séjour : ePhoto ANEF et normes 2026",
  description: "Photo pour titre de séjour sur l'ANEF : code ePhoto obligatoire, où l'obtenir, normes (35×45 mm, fond gris clair, tête nue) et motifs de refus à éviter.",
  keywords: ["photo titre de séjour", "ephoto titre de séjour", "photo anef", "code photo anef", "photo carte de séjour", "photo carte de résident"],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      fr: PAGE_URL,
    },
  },
  openGraph: {
    title: "Photo titre de séjour : ePhoto ANEF et normes 2026",
    description: "Code ePhoto obligatoire sur l'ANEF, où l'obtenir, normes de la photo et motifs de refus à éviter.",
    url: PAGE_URL, siteName: "PixPassport", locale: "fr_FR", type: "article",
    images: [{ url: "https://www.pixpassport.com/og-image.jpg", width: 1200, height: 630, alt: "Photo titre de séjour" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo titre de séjour : ePhoto ANEF et normes 2026",
    description: "Code ePhoto obligatoire sur l'ANEF, où l'obtenir et normes de la photo.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
  },
};

const sejourFaqs = [
  { q: "Faut-il un code ePhoto pour un titre de séjour ?", a: "Oui, pour les demandes déposées en ligne sur l'ANEF (Administration numérique pour les étrangers en France). Le formulaire vous demande de saisir le code ePhoto : une photo numérique associée à votre signature, réalisée dans une cabine ou chez un photographe agréé." },
  { q: "Où faire sa photo de titre de séjour ?", a: "Dans une cabine photo portant le logo « agréé ANTS » ou « e-photo », ou chez un photographe professionnel habilité. Le code à 22 caractères est imprimé sur la planche ou sur le ticket. Gardez aussi les photos papier : la préfecture peut vous en demander lors du rendez-vous." },
  { q: "Combien de temps le code ePhoto est-il valable ?", a: "Six mois à partir de la prise de vue. Si votre demande traîne ou si vous devez la refaire, vérifiez que le code n'a pas expiré." },
  { q: "Peut-on porter un voile ou un couvre-chef sur la photo de titre de séjour ?", a: "Non. Comme pour tous les titres français, la tête doit être nue : voile, foulard, turban, casquette et bonnet sont refusés. Le visage doit être entièrement dégagé, du sommet du crâne au menton." },
  { q: "Puis-je utiliser ma photo de visa pour le titre de séjour ?", a: "Rarement. La photo doit dater de moins de six mois et respecter la norme française (fond gris clair ou bleu clair, jamais blanc), alors que beaucoup de photos de visa sont sur fond blanc. Surtout, l'ANEF exige un code ePhoto, qu'une photo papier ne fournit pas." },
  { q: "Ma photo a été refusée sur l'ANEF : que faire ?", a: "Refaites une ePhoto dans une cabine agréée en corrigeant le motif indiqué (souvent : fond non uniforme, ombre, visage trop petit, reflets sur les lunettes, tête non nue) puis transmettez le nouveau code via votre espace ANEF." },
  { q: "Faut-il une photo pour la validation du visa long séjour (VLS-TS) ?", a: "Non. La validation en ligne d'un VLS-TS ne demande pas de nouvelle photo : celle du visa est déjà enregistrée. Une ePhoto ne vous sera demandée qu'au moment de demander une carte de séjour." },
];

const titles = [
  { title: "Carte de séjour temporaire", desc: "Étudiant, salarié, vie privée et familiale, passeport talent : premier titre et renouvellement sur l'ANEF." },
  { title: "Carte de séjour pluriannuelle", desc: "Après un premier titre d'un an, pour 2 à 4 ans selon votre situation." },
  { title: "Carte de résident", desc: "Titre de 10 ans. Mêmes règles photo, code ePhoto demandé lors de la demande en ligne." },
  { title: "Changement de situation", desc: "Changement de statut ou d'adresse, duplicata en cas de perte ou de vol : une nouvelle ePhoto peut être exigée." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Photo titre de séjour : ePhoto ANEF et normes 2026",
      description: "Code ePhoto obligatoire sur l'ANEF, où l'obtenir, normes de la photo et motifs de refus à éviter.",
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

export default function PhotoTitreSejourPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbsFr items={[{ label: "Photo titre de séjour", href: "/fr/photo-titre-de-sejour" }]} />
      <HeroSectionFr
        title="Photo titre de séjour : ePhoto ANEF et normes"
        subtitle="Code ePhoto obligatoire pour les demandes en ligne"
        description="Les demandes de titre de séjour se font sur l'ANEF et exigent un code ePhoto, délivré par une cabine ou un photographe agréé. Voici où l'obtenir, les normes françaises à respecter et les motifs de refus les plus fréquents."
        ctaHref="#ou-faire-photo-titre-sejour"
        ctaText="Où faire ma photo ↓"
        showImage={true}
        imageAlt="Photo d'identité aux normes du titre de séjour : 35×45 mm, fond gris clair, tête nue"
      />

      <RequirementsFr countryName="photo titre de séjour" specs={[
        { label: "Format", value: "ePhoto + code", detail: "Code à 22 caractères" },
        { label: "Dimensions", value: "35 × 45 mm", detail: "Visage de 32 à 36 mm" },
        { label: "Arrière-plan", value: "Gris clair", detail: "Uni, sans ombre — blanc refusé" },
        { label: "Tête", value: "Nue", detail: "Voile et couvre-chef refusés" },
        { label: "Expression", value: "Neutre", detail: "Bouche fermée, yeux ouverts" },
        { label: "Validité du code", value: "6 mois", detail: "À partir de la prise de vue" },
      ]} />

      <section className="max-w-5xl mx-auto px-4 py-12 text-gray-800">
        <h2 className="text-3xl font-bold mb-6">Photo et ANEF : comment ça marche</h2>
        <p className="mb-4">
          L&apos;ANEF (Administration numérique pour les étrangers en France) centralise désormais la plupart des
          demandes de titre de séjour. Au moment de constituer votre dossier, le site vous demande un{" "}
          <strong>code ePhoto</strong> : il permet de récupérer votre photo et votre signature directement auprès de
          la cabine ou du photographe agréé. Plus de détails dans notre guide sur le{" "}
          <Link href="/fr/ephoto-ants" className="text-lime-600 hover:underline">code ePhoto</Link>.
        </p>
        <p className="mb-4">
          Une photo faite chez soi, même conforme, ne fournit pas ce code : PixPassport ne peut donc pas être utilisé
          pour votre demande sur l&apos;ANEF.
        </p>

        <h2 id="ou-faire-photo-titre-sejour" className="text-2xl font-semibold mt-10 mb-4 scroll-mt-24">
          Où faire sa photo de titre de séjour ?
        </h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>
            <strong>Cabine photo agréée</strong> : logo « agréé ANTS » ou « e-photo ». Le code est imprimé sur la
            planche ; conservez aussi les photos papier pour votre rendez-vous en préfecture.
          </li>
          <li>
            <strong>Photographe professionnel habilité</strong> : utile si vous avez besoin d&apos;aide pour le
            cadrage, ou pour un enfant.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Quels titres sont concernés ?</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {titles.map((t) => (
            <div key={t.title} className="border-l-2 border-lime-500 pl-4">
              <h3 className="font-bold text-slate-900 mb-1">{t.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Les motifs de refus les plus fréquents</h2>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Tête couverte (voile, foulard, casquette) : refusé pour tous les titres français</li>
          <li>Fond non uniforme ou ombre derrière la tête</li>
          <li>Visage trop petit, trop grand ou décentré</li>
          <li>Sourire, bouche ouverte ou tête inclinée</li>
          <li>Reflets sur les lunettes ou verres teintés</li>
          <li>Code ePhoto expiré (plus de six mois)</li>
        </ul>
        <p className="mb-4">
          Les normes sont les mêmes que pour toute{" "}
          <Link href="/fr/photo-identite" className="text-lime-600 hover:underline">photo d&apos;identité française</Link>.
          Pour un visa long séjour demandé depuis l&apos;étranger, voir notre page{" "}
          <Link href="/fr/photo-visa" className="text-lime-600 hover:underline">photo visa</Link>.
        </p>

        <div className="mt-10 bg-lime-50 border border-lime-200 rounded-2xl p-6 text-center">
          <h2 className="text-lg font-bold text-slate-900 mb-2">Besoin d&apos;une photo pour un visa ou un passeport étranger ?</h2>
          <p className="text-sm text-slate-600 mb-4">
            Pour ces démarches, aucun code n&apos;est exigé. Créez une photo au format de votre pays depuis votre
            smartphone, en 30 secondes.
          </p>
          <Link
            href="/fr/passport-photo-online"
            className="inline-flex items-center px-6 py-3 bg-lime-600 text-white rounded-xl font-bold text-sm hover:bg-lime-700 transition-all shadow-lg"
          >
            Créer une photo visa ou passeport →
          </Link>
        </div>
      </section>

      <FaqSectionFr faqs={sejourFaqs} title="Questions fréquentes — Photo titre de séjour" />
      <RelatedGuidesFr />
    </>
  );
}
