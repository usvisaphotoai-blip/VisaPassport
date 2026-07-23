import type { Metadata } from "next";
import Link from "next/link";
import HeroSectionFr from "../components/HeroSectionFr";

import FaqSectionFr from "../components/FaqSectionFr";
import StickyCTAFr from "../components/StickyCTAFr";
import BreadcrumbsFr from "../components/BreadcrumbsFr";
import { fr } from "../translations";

export const metadata: Metadata = {
  title: "Photo d'Identité en Ligne — Générateur Biométrique 30s | PixPassport",
  description:
    "Générez votre photo d'identité en ligne depuis chez vous. Fond supprimé, recadrage biométrique IA automatique pour CNI, permis et documents officiels.",
  keywords: [
    "photo identité en ligne",
    "générateur photo identité",
    "photo CNI en ligne",
    "photo permis de conduire en ligne",
    "photo identité biométrique",
  ],
  alternates: {
    canonical: "https://www.pixpassport.com/fr/photo-identite-en-ligne",
    languages: {
      en: "https://www.pixpassport.com/make-passport-photo-online-free",
      fr: "https://www.pixpassport.com/fr/photo-identite-en-ligne",
      "x-default": "https://www.pixpassport.com/make-passport-photo-online-free",
    },
  },
  openGraph: {
    title: "Photo d'Identité en Ligne — Générateur Biométrique | PixPassport",
    description:
      "Générez votre photo d'identité en ligne. Fond supprimé, recadrage biométrique IA automatique.",
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
    title: "Photo d'Identité en Ligne | PixPassport",
    description:
      "Générez votre photo d'identité en ligne. Fond supprimé, recadrage biométrique IA automatique.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "PixPassport — Photo d'Identité en Ligne",
      applicationCategory: "PhotographyApplication",
      operatingSystem: "All",
      inLanguage: "fr",
      offers: { "@type": "Offer", price: "6.99", priceCurrency: "EUR" },
    },
  ],
};

const idFaqs = [
  {
    q: "Quelle taille pour une photo d'identité française ?",
    a: "La photo d'identité française doit mesurer 35×45mm avec un visage de 32 à 36mm de hauteur. Notre outil calibre automatiquement ces dimensions.",
  },
  {
    q: "Où utiliser une photo d'identité ?",
    a: "La photo d'identité est utilisée pour la CNI, le permis de conduire, la carte vitale, les abonnements de transport et les cartes étudiantes.",
  },
  {
    q: "Puis-je faire ma photo d'identité en ligne ?",
    a: "Oui, PixPassport vous permet de créer une photo d'identité conforme depuis chez vous avec votre téléphone en moins de 30 secondes.",
  },
  {
    q: "La photo sera-t-elle acceptée en préfecture ?",
    a: "Oui, nos photos sont conformes aux normes ANTS et aux exigences des préfectures françaises. Nous garantissons l'acceptation à 100%.",
  },
  {
    q: "Quel format de fichier est généré ?",
    a: "Nous générons un fichier JPEG haute résolution optimisé pour l'impression et la soumission numérique, ainsi qu'une planche d'impression A4.",
  },
];

const idSpecs = [
  { label: "Dimensions", value: "35 × 45 mm", detail: "Norme française" },
  {
    label: "Taille du visage",
    value: "32-36 mm",
    detail: "Du menton au sommet du crâne",
  },
  {
    label: "Arrière-plan",
    value: "Blanc ou gris clair",
    detail: "Uni, sans motif",
  },
  { label: "Expression", value: "Neutre", detail: "Bouche fermée" },
  {
    label: "Regard",
    value: "Face à l'objectif",
    detail: "Yeux ouverts et visibles",
  },
  {
    label: "Accessoires",
    value: "Interdits",
    detail: "Pas de lunettes ni couvre-chef",
  },
];

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
        title=" Photo d&apos;identité en ligne passeport, carte d&apos;identité et visa aux normes officielles"
        subtitle={fr.hero.id.subtitle}
        description={fr.hero.id.description}
        ctaHref="/fr/passport-photo-online"
        showImage={true}
      />
      <main className="mx-auto max-w-6xl px-6 py-16 text-slate-800">
        <article>
          <header className="mb-10">
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Vous cherchez une <strong>photo d&apos;identité en ligne</strong>{" "}
              rapide et conforme ? Notre outil transforme n&apos;importe quelle
              photo en portrait officiel accepté par les administrations
              françaises et les ambassades du monde entier. Fini les
              déplacements en photomaton ou en studio : réalisez votre{" "}
              <strong>photo passeport en ligne</strong> en quelques clics,
              depuis votre smartphone ou votre ordinateur, et recevez un fichier
              numérique prêt à imprimer ou à téléverser sur les portails
              officiels.
            </p>
          </header>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">
              Comment faire une photo d&apos;identité en ligne en 3 étapes
            </h2>
            <p className="mb-4 leading-relaxed">
              <strong>Faire une photo d&apos;identité en ligne</strong> n&apos;a
              jamais été aussi simple. Notre algorithme d&apos;intelligence
              artificielle analyse votre visage, ajuste le cadrage et corrige
              automatiquement la luminosité pour respecter les exigences
              officielles.
            </p>
            <ol className="mb-4 list-decimal space-y-2 pl-6 leading-relaxed">
              <li>
                Prenez une photo avec votre téléphone, sur un fond neutre et une
                lumière naturelle.
              </li>
              <li>
                Téléversez le cliché sur notre plateforme : le recadrage et le
                fond blanc s&apos;appliquent automatiquement.
              </li>
              <li>
                Téléchargez votre{" "}
                <strong>photo d&apos;identité numérique</strong>, prête à
                imprimer chez vous ou en pharmacie, ou à intégrer directement
                dans un formulaire en ligne.
              </li>
            </ol>
            <p className="leading-relaxed">
              Le résultat est une photo aux dimensions exactes (35 x 45 mm),
              sans reflet, sans ombre et sans accessoire non autorisé.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">
              Photo passeport français : les normes à respecter
            </h2>
            <p className="mb-4 leading-relaxed">
              La <strong>photo passeport français</strong> obéit à des règles
              strictes fixées par le ministère de l&apos;Intérieur. Le visage
              doit occuper 70 à 80 % de la hauteur du cadre, les yeux doivent
              rester ouverts et l&apos;expression neutre. Le fond doit être
              clair et uni, sans motif ni ombre portée.
            </p>
            <p className="mb-4 leading-relaxed">
              Nos <strong>photos passeport français</strong> respectent
              scrupuleusement ce cahier des charges. Chaque cliché est comparé à
              un référentiel de contrôle qualité avant validation, ce qui
              garantit des photos conformes dès le premier envoi.
            </p>
            <p className="leading-relaxed">
              Pour une carte nationale d&apos;identité, les mêmes règles de
              cadrage s&apos;appliquent. Beaucoup d&apos;usagers cherchent une{" "}
              <strong>photo d&apos;identité conforme ANTS</strong>, capable de
              passer sans rejet la vérification automatique de l&apos;Agence
              nationale des titres sécurisés. Notre outil applique directement
              les critères ANTS : distance interoculaire, position du menton,
              absence de lunettes teintées et arrière-plan homogène.
              Contrairement à un <strong>photomaton</strong> classique, dont le
              résultat dépend de la luminosité de la cabine, notre service
              numérique aux normes ANTS élimine tout risque de rejet lié à un
              mauvais éclairage. Vous évitez ainsi les allers-retours en
              préfecture pour un dossier refusé faute de photo conforme.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">
              Photo passeport biométrique : ce qui change
            </h2>
            <p className="mb-4 leading-relaxed">
              Depuis l&apos;introduction des passeports électroniques, la{" "}
              <strong>photo passeport biométrique</strong> doit répondre à des
              critères supplémentaires liés à la reconnaissance faciale.
              L&apos;image est encodée dans une puce électronique et comparée
              automatiquement au visage du voyageur lors des contrôles aux
              frontières.
            </p>
            <p className="leading-relaxed">
              Une <strong>photo d&apos;identité biométrique</strong> valide
              exige une netteté parfaite, une absence totale d&apos;ombre sur le
              visage et un contraste suffisant entre le sujet et
              l&apos;arrière-plan. Notre traitement d&apos;image ajuste
              automatiquement ces paramètres pour que votre photo soit acceptée
              par les systèmes de lecture automatique, en France comme à
              l&apos;étranger.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">
              Photo visa : les exigences varient selon le pays
            </h2>
            <p className="mb-4 leading-relaxed">
              Chaque pays impose ses propres critères pour une{" "}
              <strong>photo visa</strong>. Voici les spécificités les plus
              recherchées :
            </p>
            <ul className="mb-4 space-y-3 leading-relaxed">
              <li>
                <strong>Photo visa Inde</strong> : le format requis est
                généralement 2 x 2 pouces (51 x 51 mm), avec un fond blanc et 60
                % du cadre occupé par le visage. Les autorités indiennes
                appliquent des vérifications strictes sur la luminosité et la
                netteté du cliché.
              </li>
              <li>
                <strong>Photo visa Canada</strong> : le format standard est 50 x
                70 mm, sur fond clair uni, et la photo doit dater de moins de
                six mois. Notre outil génère automatiquement une photo aux
                bonnes dimensions, avec le nom et la date de naissance
                imprimables si le formulaire l&apos;exige.
              </li>
              <li>
                <strong>Photo visa Schengen</strong> : les pays de l&apos;espace
                Schengen exigent un format 35 x 45 mm, identique à la photo
                passeport français, avec un fond gris clair ou blanc et une
                expression neutre obligatoire.
              </li>
            </ul>
            <p className="leading-relaxed">
              Grâce à un sélecteur de pays intégré, notre plateforme adapte
              automatiquement le format, la résolution et le fond de chaque
              photo, qu&apos;il s&apos;agisse d&apos;un visa touristique,
              étudiant ou professionnel.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">
              Pourquoi choisir une photo d&apos;identité numérique plutôt
              qu&apos;un photomaton
            </h2>
            <p className="mb-4 leading-relaxed">
              La photo d&apos;identité numérique présente plusieurs avantages
              concrets face au photomaton traditionnel :
            </p>
            <ul className="mb-4 list-disc space-y-2 pl-6 leading-relaxed">
              <li>
                Disponibilité immédiate, 24 heures sur 24, sans file
                d&apos;attente.
              </li>
              <li>
                Coût réduit par rapport à une cabine photo ou un studio
                photographe.
              </li>
              <li>
                Contrôle qualité automatique qui détecte les photos non
                conformes avant impression.
              </li>
              <li>
                Fichier réutilisable pour plusieurs démarches : passeport, visa,
                permis de conduire ou carte d&apos;identité.
              </li>
            </ul>
            <p className="leading-relaxed">
              Un photomaton reste dépendant de l&apos;éclairage de la cabine et
              de la qualité de l&apos;appareil installé. Une solution numérique
              applique un traitement homogène à chaque photo, ce qui réduit
              fortement le taux de rejet en préfecture ou en ambassade.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">
              Questions fréquentes
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="mb-1 font-semibold text-slate-900">
                  Une photo d&apos;identité en ligne est-elle acceptée partout ?
                </h3>
                <p className="leading-relaxed text-slate-600">
                  Oui, à condition qu&apos;elle respecte le format et les normes
                  du pays ou de l&apos;administration concernée. Notre outil
                  génère un fichier conforme aux standards ICAO utilisés par la
                  majorité des pays.
                </p>
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-slate-900">
                  Combien de temps faut-il pour obtenir sa photo ?
                </h3>
                <p className="leading-relaxed text-slate-600">
                  Le traitement est instantané. Vous téléchargez votre photo
                  d&apos;identité numérique en moins de deux minutes.
                </p>
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-slate-900">
                  Puis-je imprimer moi-même ma photo passeport en ligne ?
                </h3>
                <p className="leading-relaxed text-slate-600">
                  Oui, le fichier fourni respecte les dimensions officielles et
                  peut être imprimé à domicile, en pharmacie ou chez un
                  photographe.
                </p>
              </div>
            </div>
          </section>
        </article>
      </main>
      <FaqSectionFr
        faqs={idFaqs}
        title="Questions fréquentes — Photo d'identité"
      />
      <StickyCTAFr ctaText="Créer votre photo d'identité" />
    </>
  );
}
