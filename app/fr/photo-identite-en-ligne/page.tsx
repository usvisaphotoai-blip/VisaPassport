import type { Metadata } from "next";
import Link from "next/link";
import HeroSectionFr from "../components/HeroSectionFr";

import FaqSectionFr from "../components/FaqSectionFr";
import StickyCTAFr from "../components/StickyCTAFr";
import BreadcrumbsFr from "../components/BreadcrumbsFr";
import { fr } from "../translations";

export const metadata: Metadata = {
  title: "Photo d'identité en ligne avec votre smartphone | PixPassport",
  description:
    "Votre photo d'identité en ligne sans photomaton : une photo au smartphone, le fond gris clair et le format 35×45 mm ANTS appliqués. Aperçu gratuit, dès 6,99 €.",
 
  alternates: {
    canonical: "https://www.pixpassport.com/fr/photo-identite-en-ligne",
    languages: {
      en: "https://www.pixpassport.com/passport-photo-online",
      fr: "https://www.pixpassport.com/fr/photo-identite-en-ligne",
      de: "https://www.pixpassport.com/de/passbild-online",
      "x-default": "https://www.pixpassport.com/passport-photo-online",
    },
  },
  openGraph: {
    title: "Photo d'identité en ligne avec votre smartphone | PixPassport",
    description:
      "Photo d'identité en ligne sans photomaton : fond gris clair, format 35×45 mm ANTS, planche à imprimer.",
    url: "https://www.pixpassport.com/fr/photo-identite-en-ligne",
    siteName: "PixPassport",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://www.pixpassport.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Photo d'Identité en Ligne",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo d'identité en ligne avec votre smartphone | PixPassport",
    description:
      "Photo d'identité en ligne sans photomaton : fond gris clair, format 35×45 mm ANTS, planche à imprimer.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
  },
};

const onlineFaqs = [
  {
    q: "Une photo prise chez moi peut-elle remplacer le photomaton ?",
    a: "Oui pour le passeport, la carte d'identité, les visas et la carte Vitale : une photo conforme imprimée suffit. Le permis de conduire et le titre de séjour exigent en revanche un code e-photo délivré par une cabine ou un photographe agréé.",
  },
  {
    q: "Le format change-t-il selon le pays de destination ?",
    a: "Oui. La France, le Canada, l'Inde et l'espace Schengen imposent chacun des dimensions et des fonds différents. PixPassport détecte le pays choisi et adapte automatiquement le format, la résolution et la couleur de fond.",
  },
  {
    q: "Quel fichier reçois-je après le traitement ?",
    a: "Un fichier JPEG haute résolution (413 × 531 px minimum, 300 DPI) optimisé pour l'impression et le téléversement en ligne, accompagné d'une planche d'impression prête pour un tirage en pharmacie ou chez un imprimeur.",
  },
  {
    q: "Combien de temps prend le traitement en ligne ?",
    a: "Moins de 30 secondes entre le téléversement de votre photo et la réception du fichier conforme, contre 10 à 20 minutes en moyenne dans un photomaton en libre-service.",
  },
  {
    q: "Peut-on faire une photo d'identité en ligne gratuitement ?",
    a: "La vérification de conformité et l'aperçu de votre photo sont gratuits, sans inscription. Le téléchargement du fichier haute résolution et de la planche d'impression est payant (dès 6,99 €, paiement unique, sans abonnement), soit moins qu'un photomaton ou un photographe.",
  },
  {
    q: "Où imprimer ma photo d'identité ?",
    a: "Imprimez la planche 10×15 cm fournie sur papier photo brillant : chez vous avec une imprimante photo, sur une borne photo en grande surface, en pharmacie ou via un service de tirage en ligne. Découpez ensuite une photo au format exact 35×45 mm.",
  },
  {
    q: "Que se passe-t-il si ma photo est refusée malgré tout ?",
    a: "PixPassport propose une garantie satisfait ou remboursé. Si votre dossier est rejeté pour un motif lié à la photo, contactez notre support avec la notification de refus pour obtenir un remboursement ou une nouvelle photo gratuite.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "PixPassport — Photo d'Identité en Ligne",
      applicationCategory: "PhotographyApplication",
      operatingSystem: "All",
      inLanguage: "fr-FR",
      offers: { "@type": "Offer", price: "6.99", priceCurrency: "EUR" },
    },
  ],
};

export default function PhotoIdentiteEnLignePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbsFr
        items={[
          {
            label: "Photo d'identité en ligne",
            href: "/fr/photo-identite-en-ligne",
          },
        ]}
      />
      <HeroSectionFr
        title="Photo d'identité en ligne pour passeport, visa et carte d'identité"
        subtitle="Un fichier conforme en 30 secondes, sans déplacement"
        description="Téléversez une photo prise depuis votre smartphone : notre IA ajuste le fond, le cadrage et la luminosité selon les normes du document et du pays choisis."
        ctaHref="/fr/passport-photo-online"
        showImage={true}
        imageAlt="Selfie pris au smartphone transformé en photo d'identité conforme sur fond gris clair"
      />
      <div className="mx-auto max-w-6xl px-6 py-16 text-slate-800">
        <article>
          <header className="mb-10">
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Faire une <strong>photo d&apos;identité en ligne</strong> remplace
              aujourd&apos;hui la majorité des usages du photomaton. Notre outil
              transforme une photo prise au smartphone en portrait officiel,
              accepté par les administrations françaises et par de nombreuses
              ambassades. Vous évitez le déplacement en cabine ou en studio et
              recevez un fichier numérique prêt à imprimer ou à téléverser sur
              les portails officiels, en quelques clics.
            </p>
          </header>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">
              Comment faire une photo d&apos;identité en ligne en 3 étapes
            </h2>
            <p className="mb-4 leading-relaxed">
              Notre algorithme analyse votre visage, ajuste le cadrage et
              corrige la luminosité pour respecter les exigences officielles du
              document choisi.
            </p>
            <ol className="mb-4 list-decimal space-y-2 pl-6 leading-relaxed">
              <li>
                Prenez une photo avec votre téléphone, sur un fond neutre et
                sous une lumière naturelle diffuse.
              </li>
              <li>
                Téléversez le cliché sur notre plateforme : le recadrage et le
                fond conforme s&apos;appliquent automatiquement.
              </li>
              <li>
                Téléchargez votre photo d&apos;identité numérique, prête à
                imprimer chez vous, en pharmacie, ou à intégrer directement dans
                un formulaire en ligne (voir comment{" "}
                <Link href="/fr/imprimer-photo-identite" className="text-lime-700 underline">imprimer une photo d&apos;identité</Link>{" "}
                au bon format).
              </li>
            </ol>
            <p className="leading-relaxed">
              Le résultat respecte des dimensions exactes (35 × 45 mm pour la
              France), sans reflet, sans ombre et sans accessoire non
              autorisé.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">
              Ce qui a changé dans les normes ANTS
            </h2>
            <p className="mb-4 leading-relaxed">
              Les règles de l&apos;ANTS (Agence Nationale des Titres Sécurisés)
              sont souvent mal connues. Le fond blanc, que beaucoup pensent
              obligatoire, est en réalité refusé : il manque de contraste avec
              le visage et perturbe la lecture biométrique. Utilisez un{" "}
              <strong>fond uni gris clair ou bleu clair</strong>, sans motif ni
              ombre portée. PixPassport applique ce fond par défaut sur chaque
              photo générée (voir les{" "}
              <Link href="/fr/photo-identite" className="text-lime-700 underline">normes de la photo d&apos;identité</Link>).
            </p>
            <p className="mb-4 leading-relaxed">
              Autre point souvent négligé : le permis de conduire et le titre
              de séjour exigent un{" "}
              <Link href="/fr/ephoto-ants" className="text-lime-700 underline">code e-photo</Link>,
              délivré uniquement par une cabine ou un photographe agréé, distinct
              d&apos;une simple photo numérique. Pour le passeport et la carte
              d&apos;identité, une photo papier conforme reste acceptée lors du
              rendez-vous en mairie.
            </p>
            <p className="leading-relaxed">
              Pour une{" "}
              <Link href="/fr/photo-carte-identite" className="text-lime-700 underline">carte nationale d&apos;identité</Link>,
              les mêmes règles de
              cadrage s&apos;appliquent : distance interoculaire correcte,
              menton dégagé, absence de verres teintés et arrière-plan
              homogène. Contrairement à un photomaton classique, dont le
              résultat dépend de la luminosité de la cabine, un traitement
              numérique applique un correctif identique à chaque photo, ce qui
              réduit nettement le taux de rejet en préfecture.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">
              Photo passeport biométrique : ce que la puce vérifie
            </h2>
            <p className="mb-4 leading-relaxed">
              Depuis l&apos;introduction des passeports électroniques, la photo
              passeport biométrique répond à des critères liés à la
              reconnaissance faciale. L&apos;image est encodée dans une puce et
              comparée automatiquement au visage du voyageur lors des contrôles
              aux frontières.
            </p>
            <p className="leading-relaxed">
              Une photo biométrique valide exige une netteté parfaite, une
              absence totale d&apos;ombre sur le visage et un contraste
              suffisant entre le sujet et l&apos;arrière-plan. Notre traitement
              d&apos;image ajuste ces paramètres pour que la photo passe les
              systèmes de lecture automatique, en France comme à
              l&apos;étranger.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">
              Photo visa : les exigences varient selon le pays
            </h2>
            <p className="mb-4 leading-relaxed">
              Chaque pays impose ses propres critères pour une photo visa.
              Voici les formats les plus recherchés :
            </p>
            <ul className="mb-4 space-y-3 leading-relaxed">
              <li>
                <strong>Visa Inde</strong> : format 2 × 2 pouces (51 × 51 mm),
                fond blanc pur exigé (contrairement à la France) et visage
                occupant 60 % du cadre. Les autorités indiennes contrôlent
                strictement la luminosité et la netteté.
              </li>
              <li>
                <strong>Visa Canada</strong> : format 35 × 45 mm, fond blanc ou
                très clair uni, photo de moins de six mois. Attention, le
                passeport canadien utilise lui un format différent (50 × 70 mm).
              </li>
              <li>
                <strong>Visa Schengen</strong> : format 35 × 45 mm, identique à
                la{" "}
                <Link href="/fr/photo-passeport" className="text-lime-700 underline">photo passeport français</Link>,
                avec un fond clair uni et une expression neutre obligatoire.
              </li>
            </ul>
            <p className="leading-relaxed">
              Retrouvez tous les formats sur notre page{" "}
              <Link href="/fr/photo-visa" className="text-lime-700 underline">photo visa</Link>.
              Un sélecteur de pays intégré ajuste automatiquement le format, la
              résolution et la couleur de fond attendue, qu&apos;il
              s&apos;agisse d&apos;un visa touristique, étudiant ou
              professionnel.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">
              Photo en ligne ou photomaton : ce qui différencie les deux
            </h2>
            <p className="mb-4 leading-relaxed">
              Le traitement en ligne présente des avantages concrets face au
              photomaton traditionnel :
            </p>
            <ul className="mb-4 list-disc space-y-2 pl-6 leading-relaxed">
              <li>
                Disponibilité immédiate, 24 heures sur 24, sans file
                d&apos;attente.
              </li>
              <li>
                Coût réduit par rapport à une cabine photo ou à un studio.
              </li>
              <li>
                Contrôle qualité automatique qui détecte les photos non
                conformes avant impression.
              </li>
              <li>
                Fichier réutilisable pour plusieurs démarches : passeport,
                visa, permis de conduire ou carte d&apos;identité.
              </li>
            </ul>
            <p className="leading-relaxed">
              Un photomaton reste dépendant de l&apos;éclairage de la cabine et
              de la qualité de l&apos;appareil installé. Un traitement
              numérique applique un correctif homogène à chaque photo, ce qui
              réduit le taux de rejet en mairie ou en ambassade — sauf pour
              les démarches exigeant spécifiquement une e-photo d&apos;un
              professionnel agréé. Pour réussir votre cliché, suivez notre guide{" "}
              <Link href="/fr/guides/how-to-take-passport-photo-at-home" className="text-lime-700 underline">faire sa photo d&apos;identité à la maison</Link>.
            </p>
          </section>
        </article>
      </div>
      <FaqSectionFr
        faqs={onlineFaqs}
        title="Questions fréquentes — Photo d'identité en ligne"
      />
      <StickyCTAFr ctaText="Créer votre photo d'identité en ligne" />
    </>
  );
}