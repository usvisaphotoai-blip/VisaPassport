import type { Metadata } from "next";
import Link from "next/link";
import HeroSectionFr from "../components/HeroSectionFr";
import FaqSectionFr from "../components/FaqSectionFr";
import StickyCTAFr from "../components/StickyCTAFr";
import BreadcrumbsFr from "../components/BreadcrumbsFr";
import RelatedGuidesFr from "../components/RelatedGuidesFr";

const PAGE_URL = "https://www.pixpassport.com/fr/imprimer-photo-identite";
const TITLE = "Imprimer une photo d'identité au format 35×45 mm | PixPassport";
const DESCRIPTION =
  "Impression photo d'identité 35×45 mm chez soi, en borne ou en ligne : planche 10×15 ou A4 prête à imprimer, réglages en taille réelle et erreurs à éviter.";
const DATE_MODIFIED = "2026-10-20";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
    languages: {
      fr: PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
  openGraph: {
    title: TITLE,
    description:
      "Planche de photos d'identité prête à imprimer : format 35×45 mm, fond conforme ANTS, tirage 10×15 ou A4.",
    url: PAGE_URL,
    siteName: "PixPassport",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://www.pixpassport.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Imprimer une photo d'identité au format 35×45 mm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "Planche de photos d'identité prête à imprimer : format 35×45 mm, fond conforme ANTS, tirage 10×15 ou A4.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
  },
};

const printFaqs = [
  {
    q: "Peut-on imprimer une photo d'identité chez soi ?",
    a: "Oui, à condition d'utiliser du papier photo (brillant ou satiné) et une imprimante capable d'un rendu photo net, sans traces ni bandes. Imprimez en « taille réelle » (100 %) pour que la photo mesure exactement 35 × 45 mm. Une impression sur papier ordinaire est en revanche refusée en mairie.",
  },
  {
    q: "Comment imprimer une photo au format identité sans la déformer ?",
    a: "Utilisez une planche déjà mise en page au bon format, puis désactivez l'option « Ajuster à la page » ou « Remplir le cadre » dans la boîte de dialogue d'impression. Choisissez l'échelle 100 % et le bon format de papier (10×15 cm ou A4). Mesurez ensuite une photo à la règle : elle doit faire 35 mm de large et 45 mm de haut.",
  },
  {
    q: "Combien de photos d'identité tiennent sur un tirage 10×15 ?",
    a: "Une planche 10×15 cm (4×6 pouces) contient six photos au format 35 × 45 mm, disposées sur deux colonnes et trois rangées, avec une marge de sécurité pour la découpe. Un seul tirage photo suffit donc pour plusieurs démarches.",
  },
  {
    q: "Où imprimer une photo d'identité pas cher ?",
    a: "Le moyen le plus économique est de faire imprimer la planche 10×15 sur une borne photo en grande surface, en magasin photo ou via un service de tirage en ligne : vous payez le prix d'un seul tirage pour six photos d'identité, souvent bien moins cher qu'une séance de photomaton.",
  },
  {
    q: "Quelle imprimante photo d'identité choisir ?",
    a: "Une imprimante jet d'encre photo ou une petite imprimante à sublimation thermique au format 10×15 cm suffit. L'essentiel est une impression nette en 300 DPI sur papier photo, sans bandes ni dominante de couleur. Une imprimante laser ou de bureau sur papier ordinaire ne convient pas.",
  },
  {
    q: "Peut-on imprimer des photos format identité sur une feuille A4 ?",
    a: "Oui, à condition d'utiliser une feuille A4 de papier photo et d'imprimer à l'échelle 100 %. La planche A4 fournie par PixPassport regroupe plusieurs photos 35 × 45 mm : il suffit de les découper. Pour une seule démarche, un tirage 10×15 en borne revient souvent moins cher.",
  },
  {
    q: "Peut-on imprimer une photo d'identité gratuitement ?",
    a: "La préparation de l'aperçu et la vérification de conformité sont gratuites sur PixPassport. Le fichier haute résolution et la planche sans filigrane sont payants (dès 6,99 €, paiement unique). L'impression elle-même est gratuite si vous disposez déjà d'une imprimante photo et de papier photo.",
  },
  {
    q: "Une photo d'identité imprimée suffit-elle pour le permis de conduire ?",
    a: "Non. Le permis de conduire et le titre de séjour se demandent en ligne avec un code e-photo, délivré uniquement par une cabine ou un photographe agréé ANTS. Une photo imprimée convient en revanche pour le passeport, la carte d'identité (lors du rendez-vous en mairie), de nombreux visas et les dossiers papier.",
  },
  {
    q: "Quelle résolution faut-il pour imprimer une photo d'identité ?",
    a: "Visez 300 DPI à la taille finale, soit au minimum 413 × 531 pixels pour une photo 35 × 45 mm. En dessous, l'image risque d'être floue ou pixellisée une fois imprimée. Les fichiers fournis par PixPassport respectent cette résolution.",
  },
  {
    q: "Ma photo imprimée a un fond légèrement différent de l'écran, est-ce grave ?",
    a: "Une légère variation est normale entre l'écran et le papier. L'important est que le fond reste uni, clair et sans ombre, et qu'il ne soit pas blanc pur pour un document français. Si le fond ressort trop sombre ou coloré, désactivez les corrections automatiques de l'imprimante ou de la borne.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": PAGE_URL,
  url: PAGE_URL,
  name: TITLE,
  description: DESCRIPTION,
  inLanguage: "fr-FR",
  datePublished: "2026-10-20",
  dateModified: DATE_MODIFIED,
  author: { "@type": "Organization", name: "PixPassport", url: "https://www.pixpassport.com/fr" },
  publisher: { "@type": "Organization", name: "PixPassport", url: "https://www.pixpassport.com/fr" },
  isPartOf: { "@type": "WebSite", name: "PixPassport", url: "https://www.pixpassport.com/fr" },
};

const printOptions = [
  {
    where: "Imprimante photo à domicile",
    paper: "Papier photo 10×15 ou A4",
    delay: "Immédiat",
    tip: "Idéal si vous avez déjà le matériel",
  },
  {
    where: "Borne photo (grande surface, magasin photo)",
    paper: "Tirage 10×15 cm",
    delay: "Quelques minutes",
    tip: "Le meilleur rapport qualité-prix",
  },
  {
    where: "Service de tirage en ligne",
    paper: "Tirage 10×15 cm",
    delay: "Livraison en 2 à 5 jours",
    tip: "Pratique si vous n'êtes pas pressé",
  },
  {
    where: "Imprimeur, reprographie",
    paper: "Papier photo A4",
    delay: "Sur place",
    tip: "Utile pour imprimer plusieurs planches",
  },
];

export default function ImprimerPhotoIdentitePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbsFr
        items={[
          {
            label: "Imprimer une photo d'identité",
            href: "/fr/imprimer-photo-identite",
          },
        ]}
      />
      <HeroSectionFr
        title="Imprimer une photo d'identité au bon format, chez vous ou en borne"
        subtitle="Une planche 35 × 45 mm prête à imprimer en moins d'une minute"
        description="Transformez une photo prise au smartphone en planche de photos d'identité conformes ANTS, puis imprimez-la sur papier photo 10×15 ou A4, sans passer par le photomaton."
        ctaText="Préparer ma photo à imprimer"
        ctaHref="/fr/passport-photo-online?type=france-passport"
        showImage={true}
        imageAlt="Planche de photos d'identité au format 35 × 45 mm prête à imprimer sur papier photo"
      />
      <div className="mx-auto max-w-6xl px-6 py-16 text-slate-800">
        <article>
          <header className="mb-10">
            <p className="mb-4 text-sm text-slate-500">
              Mis à jour le{" "}
              <time dateTime={DATE_MODIFIED}>20 octobre 2026</time> · Par
              l&apos;équipe PixPassport
            </p>
            <p className="text-lg leading-relaxed text-slate-600">
              Vous avez déjà une photo de vous et souhaitez simplement{" "}
              <strong>imprimer une photo en format identité</strong> ? La
              difficulté n&apos;est pas l&apos;impression elle-même, mais
              d&apos;obtenir une photo exactement au format 35 × 45 mm, avec
              un visage à la bonne taille et un fond accepté par
              l&apos;administration. Ce guide explique comment{" "}
              <strong>imprimer une photo au format identité</strong> sans
              déformation, où réaliser l&apos;
              <strong>impression photo d&apos;identité</strong> à moindre coût
              et quels réglages vérifier avant de lancer l&apos;impression.
            </p>
          </header>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">
              Le format d&apos;une photo d&apos;identité imprimée en France
            </h2>
            <p className="mb-4 leading-relaxed">
              Pour le passeport, la carte nationale d&apos;identité et la
              plupart des démarches françaises, la photo imprimée doit
              respecter des dimensions précises. Une photo simplement
              recadrée « à l&apos;œil » est l&apos;une des premières causes de
              refus au guichet.
            </p>
            <div className="mb-6 overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th scope="col" className="border border-slate-200 p-3 font-semibold text-slate-900">Critère</th>
                    <th scope="col" className="border border-slate-200 p-3 font-semibold text-slate-900">Exigence</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-200 p-3">Dimensions de la photo</td>
                    <td className="border border-slate-200 p-3">35 mm de large × 45 mm de haut</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 p-3">Hauteur du visage</td>
                    <td className="border border-slate-200 p-3">32 à 36 mm, du menton au sommet du crâne</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 p-3">Fond</td>
                    <td className="border border-slate-200 p-3">Uni et clair (gris clair ou bleu clair), blanc interdit</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 p-3">Support</td>
                    <td className="border border-slate-200 p-3">Papier photo de bonne qualité, sans pliure ni trace</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 p-3">Résolution conseillée</td>
                    <td className="border border-slate-200 p-3">300 DPI, soit 413 × 531 pixels minimum</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 p-3">Ancienneté</td>
                    <td className="border border-slate-200 p-3">Moins de 6 mois</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="leading-relaxed">
              Les autres pays utilisent parfois des formats différents (2 × 2
              pouces pour les États-Unis, 50 × 70 mm pour le passeport
              canadien). Consultez notre guide sur la{" "}
              <Link href="/fr/guides/passport-photo-size" className="text-lime-700 underline">taille de la photo d&apos;identité par pays</Link>{" "}
              avant d&apos;imprimer une photo pour un visa.
            </p>

            <h3 className="mb-2 mt-8 text-xl font-semibold text-slate-900">
              Imprimer une photo passeport
            </h3>
            <p className="leading-relaxed">
              La photo du passeport français suit exactement les mêmes règles
              que celle de la carte d&apos;identité : 35 × 45 mm, fond clair
              uni, visage de 32 à 36 mm. L&apos;impression photo passeport se
              fait donc avec la même planche, et une seule série de photos
              suffit si vous déposez les deux demandes lors du même
              rendez-vous. Détails et motifs de refus sur notre page{" "}
              <Link href="/fr/photo-passeport" className="text-lime-700 underline">photo passeport</Link>.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">
              Comment imprimer une photo en format identité en 4 étapes
            </h2>
            <p className="mb-6 leading-relaxed">
              La méthode la plus fiable consiste à préparer d&apos;abord un
              fichier conforme, puis à imprimer une planche déjà mise en page.
              Vous évitez ainsi tout recadrage manuel approximatif.
            </p>

            <h3 className="mb-2 text-xl font-semibold text-slate-900">
              1. Préparer une photo conforme aux normes
            </h3>
            <p className="mb-6 leading-relaxed">
              Prenez une photo de face, sous une lumière naturelle diffuse,
              puis téléversez-la sur{" "}
              <Link href="/fr/passport-photo-online" className="text-lime-700 underline">notre outil en ligne</Link>.
              Le fond est remplacé par un gris clair conforme, le visage est
              centré et mis à l&apos;échelle pour atteindre 32 à 36 mm à
              l&apos;impression. Besoin d&apos;aide pour le cliché ? Suivez
              notre guide pour{" "}
              <Link href="/fr/guides/how-to-take-passport-photo-at-home" className="text-lime-700 underline">faire sa photo d&apos;identité à la maison</Link>.
            </p>

            <h3 className="mb-2 text-xl font-semibold text-slate-900">
              2. Télécharger la planche prête à imprimer
            </h3>
            <p className="mb-6 leading-relaxed">
              Après validation, vous recevez votre photo numérique en haute
              résolution et une planche A4 prête à imprimer. Un générateur de
              planches vous permet aussi de choisir un tirage 10×15 cm (4×6),
              13×18 cm (5×7) ou A4 selon l&apos;endroit où vous imprimez.
            </p>

            <h3 className="mb-2 text-xl font-semibold text-slate-900">
              3. Imprimer en taille réelle sur papier photo
            </h3>
            <p className="mb-6 leading-relaxed">
              C&apos;est l&apos;étape la plus importante pour{" "}
              <strong>imprimer une photo au format identité</strong>{" "}
              correctement : l&apos;échelle doit rester à 100 %. Les réglages
              détaillés sont présentés plus bas.
            </p>

            <h3 className="mb-2 text-xl font-semibold text-slate-900">
              4. Découper et contrôler les dimensions
            </h3>
            <p className="leading-relaxed">
              Découpez la photo avec un massicot ou des ciseaux bien
              aiguisés, en suivant les repères de coupe. Vérifiez à la règle :
              35 mm de large, 45 mm de haut. Ne collez rien et n&apos;agrafez
              pas la photo, l&apos;agent la fixera lui-même au dossier si
              nécessaire.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">
              Impression photo d&apos;identité : où imprimer votre planche ?
            </h2>
            <p className="mb-6 leading-relaxed">
              Une fois la planche téléchargée, plusieurs solutions
              s&apos;offrent à vous. Toutes donnent un résultat conforme tant
              que l&apos;impression se fait sur papier photo et sans
              redimensionnement.
            </p>
            <div className="mb-8 overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th scope="col" className="border border-slate-200 p-3 font-semibold text-slate-900">Lieu d&apos;impression</th>
                    <th scope="col" className="border border-slate-200 p-3 font-semibold text-slate-900">Format</th>
                    <th scope="col" className="border border-slate-200 p-3 font-semibold text-slate-900">Délai</th>
                    <th scope="col" className="border border-slate-200 p-3 font-semibold text-slate-900">Pour qui ?</th>
                  </tr>
                </thead>
                <tbody>
                  {printOptions.map((o) => (
                    <tr key={o.where}>
                      <td className="border border-slate-200 p-3 font-medium">{o.where}</td>
                      <td className="border border-slate-200 p-3">{o.paper}</td>
                      <td className="border border-slate-200 p-3">{o.delay}</td>
                      <td className="border border-slate-200 p-3">{o.tip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="mb-2 text-xl font-semibold text-slate-900">
              Imprimer sa photo d&apos;identité chez soi
            </h3>
            <p className="mb-4 leading-relaxed">
              Une imprimante jet d&apos;encre récente donne de très bons
              résultats sur papier photo. Avant de lancer l&apos;impression,
              vérifiez le niveau d&apos;encre : une cartouche presque vide
              crée des bandes ou des dominantes de couleur qui peuvent faire
              refuser la photo.
            </p>
            <h4 className="mb-2 text-lg font-semibold text-slate-900">
              Quel papier choisir ?
            </h4>
            <p className="mb-6 leading-relaxed">
              Privilégiez un papier photo brillant ou satiné d&apos;au moins
              180 g/m². Le papier mat convient aussi s&apos;il est conçu pour
              la photo. Évitez le papier ordinaire : il absorbe l&apos;encre,
              rend l&apos;image terne et n&apos;est pas accepté.
            </p>
            <h4 className="mb-2 text-lg font-semibold text-slate-900">
              Quelle imprimante photo d&apos;identité utiliser ?
            </h4>
            <p className="mb-6 leading-relaxed">
              Inutile d&apos;acheter une imprimante dédiée : toute imprimante
              jet d&apos;encre photo ou petite imprimante à sublimation
              thermique 10×15 cm convient. Une imprimante laser de bureau, en
              revanche, ne donne pas un rendu photo suffisant pour une photo
              d&apos;identité.
            </p>

            <h3 className="mb-2 text-xl font-semibold text-slate-900">
              Imprimer en borne photo ou en magasin
            </h3>
            <p className="mb-4 leading-relaxed">
              Les bornes photo des grandes surfaces et des magasins photo
              impriment une planche 10×15 en quelques minutes depuis une clé
              USB ou votre smartphone. Choisissez le format 10×15 cm et
              sélectionnez l&apos;option « sans recadrage » ou « image
              entière » si la borne la propose.
            </p>
            <h4 className="mb-2 text-lg font-semibold text-slate-900">
              Pourquoi c&apos;est la solution la plus économique
            </h4>
            <p className="mb-6 leading-relaxed">
              Une planche 10×15 contient six photos d&apos;identité : vous
              payez le prix d&apos;un seul tirage pour plusieurs démarches
              (passeport, carte d&apos;identité, carte de transport, dossier
              scolaire…).
            </p>

            <h3 className="mb-2 text-xl font-semibold text-slate-900">
              Imprimer une photo d&apos;identité en ligne
            </h3>
            <p className="leading-relaxed">
              Les services de tirage en ligne livrent vos photos à domicile.
              Téléversez la planche telle quelle, au format 10×15, et
              désactivez toute option d&apos;amélioration automatique ou de
              recadrage « intelligent » qui modifierait les proportions.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">
              Les bons réglages pour imprimer une photo au format identité
            </h2>
            <p className="mb-6 leading-relaxed">
              La plupart des photos d&apos;identité mal imprimées le sont à
              cause de la boîte de dialogue d&apos;impression, pas du fichier.
              Voici les réglages à vérifier sur ordinateur comme sur
              smartphone.
            </p>

            <h3 className="mb-2 text-xl font-semibold text-slate-900">
              Échelle et mise en page
            </h3>
            <ul className="mb-6 list-disc space-y-2 pl-6 leading-relaxed">
              <li>
                Échelle : <strong>100 %</strong> ou « Taille réelle ».
              </li>
              <li>
                Désactivez « Ajuster à la page », « Remplir le cadre » et
                « Impression sans bordure ».
              </li>
              <li>
                Format du papier identique à celui de la planche (10×15 cm ou
                A4).
              </li>
            </ul>

            <h3 className="mb-2 text-xl font-semibold text-slate-900">
              Qualité et couleurs
            </h3>
            <ul className="mb-6 list-disc space-y-2 pl-6 leading-relaxed">
              <li>Type de papier : « Papier photo » (brillant ou satiné).</li>
              <li>Qualité : « Élevée » ou « Photo ».</li>
              <li>
                Désactivez les retouches automatiques (yeux rouges,
                amélioration des couleurs) qui peuvent altérer le fond.
              </li>
            </ul>

            <h3 className="mb-2 text-xl font-semibold text-slate-900">
              Imprimer depuis un smartphone
            </h3>
            <h4 className="mb-2 text-lg font-semibold text-slate-900">
              Sur iPhone (AirPrint)
            </h4>
            <p className="mb-4 leading-relaxed">
              Ouvrez la planche dans l&apos;app Fichiers plutôt que dans
              Photos, qui a tendance à recadrer l&apos;image. Choisissez
              « Imprimer », puis le bon format de papier.
            </p>
            <h4 className="mb-2 text-lg font-semibold text-slate-900">
              Sur Android
            </h4>
            <p className="leading-relaxed">
              Utilisez le service d&apos;impression de votre fabricant ou
              l&apos;application de l&apos;imprimante. Dans les options,
              sélectionnez le format de papier et l&apos;ajustement « Taille
              réelle » ou « Aucun ».
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">
              Erreurs fréquentes qui font refuser une photo imprimée
            </h2>
            <h3 className="mb-2 text-xl font-semibold text-slate-900">
              Une photo trop petite ou étirée
            </h3>
            <p className="mb-4 leading-relaxed">
              Une impression « ajustée à la page » agrandit ou réduit la
              photo de quelques millimètres, suffisamment pour sortir des
              tolérances. Mesurez toujours la photo après impression.
            </p>
            <h3 className="mb-2 text-xl font-semibold text-slate-900">
              Un fond blanc ou irrégulier
            </h3>
            <p className="mb-4 leading-relaxed">
              Le fond blanc est refusé pour les documents français. Un fond
              avec des ombres ou des dégradés l&apos;est aussi. Consultez nos
              conseils sur le{" "}
              <Link href="/fr/guides/passport-photo-background" className="text-lime-700 underline">fond de la photo d&apos;identité</Link>.
            </p>
            <h3 className="mb-2 text-xl font-semibold text-slate-900">
              Une impression de mauvaise qualité
            </h3>
            <p className="mb-4 leading-relaxed">
              Grain, flou, traces d&apos;encre ou couleurs délavées rendent
              la photo inutilisable par les systèmes de lecture biométrique.
              Si le résultat ne vous semble pas net, réimprimez en borne
              photo.
            </p>
            <h3 className="mb-2 text-xl font-semibold text-slate-900">
              Une photo imprimée pour une démarche qui exige un code e-photo
            </h3>
            <p className="leading-relaxed">
              Le permis de conduire et le titre de séjour se demandent avec
              un{" "}
              <Link href="/fr/ephoto-ants" className="text-lime-700 underline">code e-photo ANTS</Link>,
              et non avec une photo papier. Pour le{" "}
              <Link href="/fr/photo-passeport" className="text-lime-700 underline">passeport</Link>{" "}
              et la{" "}
              <Link href="/fr/photo-carte-identite" className="text-lime-700 underline">carte d&apos;identité</Link>,
              une photo imprimée conforme reste acceptée lors du rendez-vous
              en mairie.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">
              Pourquoi imprimer sa photo d&apos;identité plutôt que passer par le photomaton ?
            </h2>
            <ul className="mb-4 list-disc space-y-2 pl-6 leading-relaxed">
              <li>
                Vous choisissez la photo qui vous plaît, sans limite
                d&apos;essais.
              </li>
              <li>
                Vous conservez le fichier numérique et pouvez réimprimer
                une planche quand vous en avez besoin, tant que la photo a
                moins de six mois.
              </li>
              <li>
                Une seule planche fournit plusieurs photos pour toute la
                famille de démarches.
              </li>
              <li>
                La conformité (fond, cadrage, taille du visage) est vérifiée
                avant l&apos;impression, et non après.
              </li>
            </ul>
            <p className="leading-relaxed">
              Pour en savoir plus sur les règles générales, consultez notre
              page dédiée à la{" "}
              <Link href="/fr/photo-identite" className="text-lime-700 underline">photo d&apos;identité aux normes ANTS</Link>{" "}
              ou notre service de{" "}
              <Link href="/fr/photo-identite-en-ligne" className="text-lime-700 underline">photo d&apos;identité en ligne</Link>.
            </p>
          </section>
        </article>
      </div>
      <FaqSectionFr
        faqs={printFaqs}
        title="Questions fréquentes — Imprimer une photo d'identité"
      />
      <RelatedGuidesFr />
      <StickyCTAFr ctaText="Préparer ma photo d'identité à imprimer" />
    </>
  );
}
