import type { Metadata } from "next";
import Link from "next/link";
import HeroSectionFr from "../components/HeroSectionFr";

import StickyCTAFr from "../components/StickyCTAFr";
import BreadcrumbsFr from "../components/BreadcrumbsFr";
import FaqSectionFr from "../components/FaqSectionFr";
import { fr } from "../translations";

export const metadata: Metadata = {
  title: "Photo passeport en ligne aux normes ANTS 2026 | PixPassport",
  description: "Photo passeport français depuis votre smartphone : 35×45 mm, fond gris clair, visage 32-36 mm vérifié. Fichier + planche 10×15 cm en 30 s, remboursé si refusée.",
  keywords: ["photo passeport", "photo passeport en ligne", "photo passeport normes", "photo passeport france", "photo passeport bébé", "photo passeport enfant", "taille photo passeport", "35x45"],
  alternates: {
    canonical: "https://www.pixpassport.com/fr/photo-passeport",
    languages: {
      en: "https://www.pixpassport.com/passport-photos",
      fr: "https://www.pixpassport.com/fr/photo-passeport",
      de: "https://www.pixpassport.com/de/biometrisches-passbild",
      "x-default": "https://www.pixpassport.com/passport-photos",
    },
  },
  openGraph: {
    title: "Photo Passeport en Ligne | PixPassport",
    description: "Photo passeport conforme aux normes ANTS 2026 avec vérification biométrique IA. Fond gris clair, 35×45mm.",
    url: "https://www.pixpassport.com/fr/photo-passeport",
    siteName: "PixPassport", locale: "fr_FR", type: "website",
    images: [{ url: "https://www.pixpassport.com/og-image.jpg", width: 1200, height: 630, alt: "Photo Passeport en Ligne" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Passeport en Ligne | PixPassport",
    description: "Photo passeport conforme aux normes ANTS 2026 avec vérification biométrique IA. Fond gris clair, 35×45mm.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
  },
};

const passportFaqs = [
  {
    q: "Le fond de ma photo passeport doit-il être blanc ?",
    a: "Non. En France, le fond blanc est refusé : il doit être uni et clair, de préférence gris clair ou bleu clair, sans motif ni ombre portée. PixPassport remplace automatiquement votre arrière-plan par un fond gris clair conforme.",
  },
  {
    q: "Puis-je porter des lunettes sur ma photo passeport ?",
    a: "Oui, c'est toléré pour le passeport français, à condition que les yeux restent parfaitement visibles : monture fine qui ne cache pas les yeux, verres non teintés et aucun reflet. Les lunettes de soleil sont interdites. En cas de doute, retirez-les : c'est le moyen le plus sûr d'éviter un refus en mairie.",
  },
  {
    q: "Qu'est-ce que l'e-photo et en ai-je besoin ?",
    a: "L'e-photo est un code numérique associé à votre photo, délivré par une cabine ou un photographe agréé par l'ANTS. Il est obligatoire pour le permis de conduire et le titre de séjour, mais pas pour le passeport : en mairie, une photo papier conforme reste acceptée. PixPassport fournit la photo conforme et la planche à imprimer, pas le code e-photo.",
  },
  {
    q: "Ma photo passeport a-t-elle une durée de validité ?",
    a: "Oui, une photo passeport doit dater de moins de six mois au moment du dépôt de votre dossier. Les agents de mairie vérifient systématiquement cette condition et rejettent toute photo plus ancienne.",
  },
  {
    q: "Le sourire est-il toléré sur une photo passeport ?",
    a: "Non, même un léger sourire entraîne un rejet. Gardez la bouche fermée, les sourcils détendus et le regard neutre face à l'objectif.",
  },
  {
    q: "Comment faire une photo passeport pour un bébé ?",
    a: "Allongez le bébé sur un drap uni gris clair ou bleu clair et photographiez-le d'au-dessus, en lumière naturelle. Il doit être seul sur la photo, tête nue, sans tétine ni jouet, les yeux ouverts si possible. L'administration se montre plus tolérante sur l'expression des tout-petits. PixPassport recadre ensuite la photo au format 35×45 mm.",
  },
  {
    q: "Peut-on utiliser la même photo pour le passeport et la carte d'identité ?",
    a: "Oui. Le passeport et la carte nationale d'identité suivent la même norme (35×45 mm, fond clair uni, expression neutre). Si vous déposez les deux demandes lors du même rendez-vous en mairie, une seule planche de photos suffit, tant qu'elles datent de moins de six mois.",
  },
];

const trustPoints = [
  { icon: "🎯", label: "Précision biométrique" },
  { icon: "⚡", label: "Résultat instantané" },
  { icon: "✅", label: "Conforme ANTS 2026" },
  { icon: "🔒", label: "Données protégées" },
];

const steps = [
  {
    step: "1",
    title: "Prenez une photo avec votre smartphone",
    content: "Placez-vous face à une source de lumière naturelle et diffuse, en évitant les ombres directes sur le visage. Regardez l'objectif, gardez les yeux ouverts et la tête droite. Un smartphone récent suffit : notre outil se charge ensuite de remplacer l'arrière-plan et de corriger le cadrage.",
  },
  {
    step: "2",
    title: "Téléversez votre photo sur PixPassport",
    content: "Importez le cliché depuis votre galerie ou capturez-le directement dans notre interface. Le système analyse aussitôt plus de 50 critères biométriques : hauteur du visage (32-36 mm), position des yeux, expression, présence de lunettes ou d'un couvre-chef, netteté et niveau d'éclairage.",
  },
  {
    step: "3",
    title: "Laissez l'IA corriger votre photo",
    content: "L'algorithme retire l'arrière-plan d'origine et le remplace par un fond gris clair uni, conforme aux normes ANTS (le fond blanc est refusé). Il recadre votre visage aux dimensions exactes de 35×45 mm (413×531 pixels), ajuste la luminosité et vérifie l'alignement horizontal des yeux.",
  },
  {
    step: "4",
    title: "Téléchargez votre photo conforme",
    content: "Récupérez en moins de 30 secondes un fichier numérique haute résolution et une planche d'impression 10×15 cm. Imprimez-la sur papier photo (chez vous, sur une borne photo ou en pharmacie), découpez une photo 35×45 mm et apportez-la à votre rendez-vous en mairie.",
  },
];

const rejectionReasons = [
  { title: "Fond blanc ou non uniforme", detail: "Le fond blanc est refusé en France. Une ombre derrière la tête ou un mur texturé suffit aussi à faire rejeter le dossier." },
  { title: "Visage trop petit ou trop grand", detail: "Hors de la fourchette 32-36 mm de hauteur, la photo est refusée même si le format global est correct." },
  { title: "Expression non neutre", detail: "Sourire, bouche entrouverte ou sourcils froncés comptent parmi les motifs de refus les plus fréquents." },
  { title: "Reflet ou ombre sur le visage", detail: "Un éclairage direct mal réparti crée des zones d'ombre derrière les oreilles ou sous le menton." },
  { title: "Couvre-chef ou lunettes avec reflets", detail: "La tête doit être nue. Les lunettes sont tolérées seulement si les yeux sont parfaitement visibles, sans reflet ni verres teintés." },
  { title: "Photo de plus de six mois", detail: "Même parfaitement conforme sur le plan technique, une photo trop ancienne est automatiquement refusée." },
];

const passportSpecs = [
  { label: "Dimensions", value: "35 × 45 mm", detail: "Norme ANTS, conforme ISO/IEC 19794-5" },
  { label: "Résolution", value: "413 × 531 px", detail: "300 DPI minimum pour l'impression" },
  { label: "Arrière-plan", value: "Gris clair ou bleu clair", detail: "Uni, sans ombre ni motif — le fond blanc est refusé" },
  { label: "Taille du visage", value: "32-36 mm", detail: "Du menton au sommet du crâne (70-80% du cadre)" },
  { label: "Position des yeux", value: "Centrés, ouverts", detail: "Regard direct vers l'objectif, sans mèche devant les yeux" },
  { label: "Expression", value: "Neutre", detail: "Bouche fermée, sourcils détendus, pas de sourire" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "SoftwareApplication", name: "PixPassport — Photo Passeport", applicationCategory: "PhotographyApplication", operatingSystem: "All", inLanguage: "fr-FR", offers: { "@type": "Offer", price: "6.99", priceCurrency: "EUR" } },
  ],
};

export default function PhotoPasseportPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbsFr items={[{ label: "Photo Passeport", href: "/fr/photo-passeport" }]} />
      <HeroSectionFr
        title={fr.hero.passport.title}
        subtitle={fr.hero.passport.subtitle}
        description={fr.hero.passport.description}
        ctaHref="/fr/passport-photo-online?type=france-passport"
        showImage={true}
        imageAlt="Photo passeport française 35×45 mm sur fond gris clair, conforme aux normes ANTS"
      />

      {/* Intro + trust strip — no cards, single inline row */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-4">Pourquoi passer par PixPassport pour votre photo passeport ?</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            Un logiciel de vérification biométrique contrôle chaque photo passeport que vous téléversez sur PixPassport, selon les mêmes critères que ceux appliqués par l&apos;ANTS en 2026. Notre outil supprime l&apos;arrière-plan de votre photo, applique un fond gris clair conforme, recentre votre visage et vérifie l&apos;alignement des yeux, le tout en moins de 30 secondes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-y border-slate-100 py-5">
            {trustPoints.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-bold text-slate-700">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to use — connected timeline instead of 4 boxed cards */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-green-600 uppercase tracking-wide">Guide pratique</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 mb-4">
              Comment obtenir votre photo passeport en ligne ?
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Suivez ces quatre étapes pour obtenir une photo passeport conforme aux normes ANTS 2026, sans déplacement en photomaton.
            </p>
          </div>

          <ol className="relative">
            {steps.map((item, i) => (
              <li key={item.step} className="relative pl-16 pb-10 last:pb-0">
                {i !== steps.length - 1 && (
                  <span className="absolute left-[23px] top-12 bottom-0 w-px bg-green-200" aria-hidden="true" />
                )}
                <span className="absolute left-0 top-0 flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
                  {item.step}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-2 pt-1">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.content}</p>
              </li>
            ))}
          </ol>

          <div className="mt-4 bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
            <p className="text-green-800 font-medium">
              💡 <strong>Point de vigilance :</strong> votre photo passeport doit dater de moins de six mois.
              Les agents de mairie vérifient cette condition à chaque dépôt. PixPassport horodate automatiquement
              chaque photo générée pour que vous puissiez le justifier facilement.
            </p>
          </div>
        </div>
      </section>

      {/* Specs + rejection reasons — plain lists, no card wrappers */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6 text-center">
            Normes ANTS 2026 pour la photo passeport française
          </h2>
          <p className="text-slate-600 mb-10 leading-relaxed text-center max-w-2xl mx-auto">
            Ces critères suivent les exigences de l&apos;<Link href="/fr/ephoto-ants" className="text-lime-600 hover:underline">ANTS</Link> (Agence Nationale des Titres Sécurisés) et les standards biométriques internationaux de l&apos;<Link href="/fr/photo-passeport-biometrique" className="text-lime-600 hover:underline">OACI</Link>. Pour les dimensions des autres pays, consultez notre guide sur la <Link href="/fr/guides/passport-photo-size" className="text-lime-600 hover:underline">taille des photos d&apos;identité</Link>.
          </p>

          <div className="grid md:grid-cols-2 gap-x-8 gap-y-5 mb-14">
            {passportSpecs.map((spec) => (
              <div key={spec.label} className="border-b border-slate-100 pb-4">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-slate-800">{spec.label}</span>
                  <span className="text-green-700 bg-green-50 px-2 py-0.5 rounded text-sm">{spec.value}</span>
                </div>
                <p className="text-sm text-slate-500 mt-1">{spec.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-5 text-center">
            Six raisons fréquentes de rejet, et comment les éviter
          </h3>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4 mb-12">
            {rejectionReasons.map((reason) => (
              <li key={reason.title} className="border-l-2 border-green-500 pl-4">
                <p className="font-bold text-slate-800 text-sm">{reason.title}</p>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">{reason.detail}</p>
              </li>
            ))}
          </ul>

          <div className="text-center">
            <a href="/fr/passport-photo-online?type=france-passport" className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg">
              Créer ma photo passeport conforme
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Comparison table — data belongs in a table, not cards */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6 text-center">
            PixPassport, photomaton ou photographe : que choisir ?
          </h2>
          <p className="text-slate-600 mb-8 leading-relaxed text-center max-w-2xl mx-auto">
            Chaque option a son coût et son délai. Voici comment ils se comparent pour une photo passeport conforme.
          </p>
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
                  <td className="py-3 pl-4 pr-4 font-medium">Délai</td>
                  <td className="py-3 pr-4 bg-green-50/50">30 secondes</td>
                  <td className="py-3 pr-4">5 à 15 minutes</td>
                  <td className="py-3 pr-4">Rendez-vous requis</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 pl-4 pr-4 font-medium">Prix moyen</td>
                  <td className="py-3 pr-4 bg-green-50/50">6,99 €</td>
                  <td className="py-3 pr-4">5 à 8 €</td>
                  <td className="py-3 pr-4">15 à 25 €</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 pl-4 pr-4 font-medium">Contrôle qualité avant impression</td>
                  <td className="py-3 pr-4 bg-green-50/50">Automatique, biométrique</td>
                  <td className="py-3 pr-4">Aucun</td>
                  <td className="py-3 pr-4">Visuel, humain</td>
                </tr>
                <tr>
                  <td className="py-3 pl-4 pr-4 font-medium">Disponibilité</td>
                  <td className="py-3 pr-4 bg-green-50/50">24h/24, depuis chez vous</td>
                  <td className="py-3 pr-4">Selon localisation</td>
                  <td className="py-3 pr-4">Horaires d&apos;ouverture</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* France-specific procedure — answers "comment faire son passeport" intent */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6 text-center">
            Demande de passeport en France : où intervient la photo ?
          </h2>
          <ol className="list-decimal pl-6 space-y-3 text-slate-600 leading-relaxed mb-8">
            <li>
              <strong className="text-slate-800">Pré-demande en ligne</strong> sur le site de l&apos;ANTS, puis achat du
              timbre fiscal (86&nbsp;€ pour un adulte, 42&nbsp;€ de 15 à 17 ans, 17&nbsp;€ pour un enfant de moins de 15 ans).
            </li>
            <li>
              <strong className="text-slate-800">Rendez-vous en mairie</strong> (dans n&apos;importe quelle mairie équipée
              d&apos;un dispositif de recueil, pas forcément celle de votre domicile).
            </li>
            <li>
              <strong className="text-slate-800">Photo d&apos;identité</strong> : apportez une photo papier 35×45&nbsp;mm de
              moins de six mois, ou un code e-photo si votre mairie le propose. C&apos;est l&apos;étape où la plupart des
              dossiers sont bloqués : fond blanc, visage trop petit ou sourire.
            </li>
            <li>
              <strong className="text-slate-800">Retrait du passeport</strong> dans la même mairie, généralement quelques
              semaines plus tard. Le passeport est valable 10 ans pour un adulte et 5 ans pour un mineur.
            </li>
          </ol>
          <h3 className="text-xl font-bold text-slate-900 mb-3">Photo passeport enfant et bébé</h3>
          <p className="text-slate-600 leading-relaxed">
            Les règles sont les mêmes que pour un adulte : format 35×45&nbsp;mm, fond clair uni (pas blanc), tête nue,
            enfant seul sur la photo. Pour un bébé, allongez-le sur un drap gris clair et photographiez-le d&apos;au-dessus
            : PixPassport se charge du recadrage (voir notre guide{" "}
            <Link href="/fr/photo-bebe" className="text-lime-600 hover:underline">photo d&apos;identité bébé</Link>). Même photo pour la{" "}
            <Link href="/fr/photo-carte-identite" className="text-lime-600 hover:underline">carte d&apos;identité</Link>{" "}
            si vous faites les deux demandes ensemble. Pour réussir la prise de vue, suivez notre guide{" "}
            <Link href="/fr/guides/how-to-take-passport-photo-at-home" className="text-lime-600 hover:underline">photo d&apos;identité à la maison</Link>,
            puis notre guide pour{" "}
            <Link href="/fr/imprimer-photo-identite" className="text-lime-600 hover:underline">imprimer une photo d&apos;identité</Link>{" "}
            sans la déformer.
          </p>
        </div>
      </section>

      <FaqSectionFr faqs={passportFaqs} title="Questions fréquentes — Photo passeport" />
      <StickyCTAFr ctaHref="/fr/passport-photo-online?type=france-passport" countryName="France" />
    </>
  );
}