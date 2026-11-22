import type { Metadata } from "next";
import Link from "next/link";
import HeroSectionFr from "../components/HeroSectionFr";
import StickyCTAFr from "../components/StickyCTAFr";
import BreadcrumbsFr from "../components/BreadcrumbsFr";
import FaqSectionFr from "../components/FaqSectionFr";
import RelatedGuidesFr from "../components/RelatedGuidesFr";

const PAGE_URL = "https://www.pixpassport.com/fr/photo-norme-oaci";
const CHECKER_HREF = "/fr/passport-photo-online?type=france-passport";
const MAKER_HREF = "/passport-photo-checker ";

export const metadata: Metadata = {
  title: "Photo aux normes OACI : règles 2026 et vérification gratuite",
  description:
    "Photo norme OACI : ce que dit le standard (Doc 9303), les critères à respecter (visage 32-36 mm, fond uni, expression neutre) et vérification gratuite de votre photo en ligne.",
  keywords: [
    "photo norme oaci",
    "photos aux normes oaci",
    "photo oaci",
    "norme oaci photo identité",
    "photo conforme oaci",
    "vérifier photo oaci",
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      fr: PAGE_URL,
    },
  },
  openGraph: {
    title: "Photo aux normes OACI : règles et vérification gratuite | PixPassport",
    description: "Ce que dit la norme OACI pour les photos d'identité, et un outil gratuit pour vérifier la vôtre.",
    url: PAGE_URL,
    siteName: "PixPassport",
    locale: "fr_FR",
    type: "article",
    images: [{ url: "https://www.pixpassport.com/og-image.jpg", width: 1200, height: 630, alt: "Photo aux normes OACI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo aux normes OACI : règles et vérification gratuite | PixPassport",
    description: "Ce que dit la norme OACI pour les photos d'identité, et un outil gratuit pour vérifier la vôtre.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
  },
};

const criteria = [
  { label: "Format", value: "35 × 45 mm (format le plus courant, dont la France)" },
  { label: "Hauteur du visage", value: "70 à 80 % de la photo, soit 32 à 36 mm du menton au sommet du crâne" },
  { label: "Position", value: "Tête droite, face à l'objectif, centrée, épaules visibles" },
  { label: "Expression", value: "Neutre, bouche fermée, yeux ouverts et visibles" },
  { label: "Fond", value: "Uni, clair, sans motif ni ombre (en France : gris clair ou bleu clair, pas blanc)" },
  { label: "Éclairage", value: "Uniforme, sans ombre sur le visage, sans reflet ni yeux rouges" },
  { label: "Netteté et couleurs", value: "Photo nette, en couleur, sans retouche ni filtre" },
  { label: "Lunettes et couvre-chef", value: "Lunettes déconseillées (jamais teintées ni avec reflet). Couvre-chef seulement pour motif religieux ou médical, visage entièrement dégagé" },
  { label: "Ancienneté", value: "Moins de 6 mois" },
];

const steps = [
  {
    title: "Prenez la photo dans de bonnes conditions",
    desc: "Placez-vous face à une fenêtre, à un pas d'un mur clair et uni. Demandez à quelqu'un de vous photographier à hauteur des yeux, à environ un mètre. Évitez le selfie à bout de bras, qui déforme le visage.",
  },
  {
    title: "Vérifiez la conformité OACI gratuitement",
    desc: "Importez la photo dans notre vérificateur. Il mesure la hauteur du visage, le centrage, l'uniformité du fond, l'éclairage et l'expression, puis indique précisément ce qui ne va pas.",
  },
  {
    title: "Corrigez ou créez la photo finale",
    desc: "Si un critère échoue, reprenez la photo ou passez-la dans notre outil photo : il recadre au format 35 × 45 mm, ajuste la taille du visage et remplace le fond. Vous obtenez le fichier numérique et une planche à imprimer.",
  },
];

const oaciFaqs = [
  {
    q: "Qu'est-ce qu'une photo aux normes OACI ?",
    a: "C'est une photo d'identité qui respecte les règles de l'Organisation de l'Aviation Civile Internationale (OACI) pour les documents de voyage lisibles à la machine, décrites dans le Doc 9303. Ces règles portent sur le cadrage du visage, l'expression, le fond, l'éclairage et la qualité de l'image, pour que la photo fonctionne avec la reconnaissance faciale aux frontières.",
  },
  {
    q: "Quelle est la taille d'une photo norme OACI ?",
    a: "Le format le plus utilisé est 35 × 45 mm, celui de la France et de la plupart des pays européens. Le visage, du menton au sommet du crâne, doit occuper 70 à 80 % de la hauteur, soit 32 à 36 mm. Certains pays utilisent un autre format, comme 51 × 51 mm aux États-Unis.",
  },
  {
    q: "Une photo OACI doit-elle avoir un fond blanc ?",
    a: "Non. La norme OACI demande un fond uni et clair, sans préciser une seule couleur. Chaque pays fixe la sienne : la France exige un fond gris clair ou bleu clair et refuse le blanc, alors que les États-Unis ou le Royaume-Uni acceptent le blanc ou un gris très clair.",
  },
  {
    q: "Photo OACI et photo biométrique, est-ce la même chose ?",
    a: "Oui, dans la pratique. On parle de photo biométrique parce qu'elle sert à la reconnaissance faciale, et de photo aux normes OACI parce que ces règles viennent de l'OACI. Une photo d'identité française conforme est à la fois biométrique et aux normes OACI.",
  },
  {
    q: "Peut-on sourire sur une photo aux normes OACI ?",
    a: "Non. L'expression doit rester neutre, bouche fermée. Un sourire modifie les points du visage mesurés par les logiciels de reconnaissance et peut entraîner un refus.",
  },
  {
    q: "Peut-on porter des lunettes sur une photo OACI ?",
    a: "La norme les tolère si les yeux restent parfaitement visibles, sans reflet ni monture sur les yeux, et jamais avec des verres teintés. En France, il est fortement conseillé de les retirer pour éviter un refus.",
  },
  {
    q: "Comment savoir si ma photo est aux normes OACI ?",
    a: "Importez-la dans notre vérificateur gratuit. Il contrôle la taille du visage, le centrage, le fond, l'éclairage et l'expression, et vous dit quel critère corriger. La vérification est gratuite et illimitée.",
  },
  {
    q: "Une photo PixPassport suffit-elle pour l'ANTS ?",
    a: "Pour le passeport et la carte d'identité déposés en mairie, une photo papier conforme est acceptée. Pour le permis de conduire et le titre de séjour, l'ANTS exige un code ePhoto délivré par une cabine ou un photographe agréé. PixPassport fournit une photo conforme et une planche à imprimer, pas de code ePhoto.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HowTo",
      name: "Obtenir une photo aux normes OACI en 3 étapes",
      inLanguage: "fr-FR",
      step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.desc })),
    },
  ],
};

export default function PhotoNormeOaciPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbsFr items={[{ label: "Photo norme OACI", href: "/fr/photo-norme-oaci" }]} />
      <HeroSectionFr
        title="Photo aux normes OACI : les règles et une vérification gratuite"
        subtitle="Passeport, carte d'identité, visa : la norme internationale expliquée simplement"
        description="La norme OACI fixe le cadrage, le fond et l'expression de toutes les photos de passeport dans le monde. Découvrez ce qu'elle impose, puis vérifiez gratuitement si votre photo est conforme."
        ctaText="Vérifier ma photo gratuitement"
        ctaHref={CHECKER_HREF}
        showImage={true}
        imageAlt="Photo d'identité aux normes OACI avec repères de cadrage du visage"
      />

      <section className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
        <h2 className="text-3xl font-bold mb-6">Qu&apos;est-ce que la norme OACI ?</h2>
        <p className="mb-4">
          L&apos;<strong>OACI</strong> (Organisation de l&apos;Aviation Civile Internationale, ou ICAO en anglais) est
          l&apos;agence des Nations unies qui fixe les standards des documents de voyage. Son{" "}
          <strong>Doc 9303</strong> décrit les passeports lisibles à la machine et les passeports électroniques, y compris
          la photo du titulaire.
        </p>
        <p className="mb-4">
          Le but est simple : la photo doit pouvoir être comparée automatiquement à votre visage par les sas de contrôle
          aux frontières. C&apos;est pourquoi la norme encadre la taille du visage, sa position, l&apos;expression, le
          fond et la qualité de l&apos;image. Presque tous les pays l&apos;appliquent, puis ajoutent leurs propres
          précisions, comme la couleur du fond ou le format.
        </p>
        <p className="mb-4">
          Une photo aux normes OACI est donc ce qu&apos;on appelle aussi une{" "}
          <Link href="/fr/photo-passeport-biometrique" className="text-lime-600 hover:underline">photo biométrique</Link>.
          Les deux termes désignent la même chose.
        </p>

        <h2 className="text-3xl font-bold mt-10 mb-6">Les critères d&apos;une photo norme OACI</h2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-left border border-slate-200 rounded-xl overflow-hidden text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-3 font-bold text-slate-900 border-b border-slate-200">Critère</th>
                <th className="p-3 font-bold text-slate-900 border-b border-slate-200">Ce que demande la norme</th>
              </tr>
            </thead>
            <tbody>
              {criteria.map((c) => (
                <tr key={c.label} className="border-b border-slate-100 last:border-0">
                  <td className="p-3 font-semibold text-slate-900 align-top whitespace-nowrap">{c.label}</td>
                  <td className="p-3 text-slate-600">{c.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-slate-500 mb-4">
          Pour le détail des règles françaises, consultez notre page{" "}
          <Link href="/fr/photo-identite" className="text-lime-600 hover:underline">normes de la photo d&apos;identité</Link>{" "}
          et notre guide sur le{" "}
          <Link href="/fr/guides/passport-photo-background" className="text-lime-600 hover:underline">fond de la photo d&apos;identité</Link>.
        </p>

        <h2 className="text-3xl font-bold mt-10 mb-6">Obtenir une photo aux normes OACI en 3 étapes</h2>
        <ol className="space-y-6 mb-8">
          {steps.map((s, i) => (
            <li key={s.title} className="flex gap-4">
              <span className="flex-shrink-0 w-9 h-9 rounded-full bg-lime-700 text-white font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <div>
                <h3 className="text-xl font-semibold mb-1">{s.title}</h3>
                <p className="text-slate-600">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="my-10 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">Votre photo est-elle aux normes OACI ?</h3>
          <p className="text-slate-300 mb-6 max-w-xl mx-auto">
            Vérification gratuite en quelques secondes : taille du visage, centrage, fond, éclairage et expression. Sans
            inscription.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={CHECKER_HREF}
              className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-6 py-3 rounded transition-colors"
            >
              Vérifier ma photo gratuitement
            </Link>
            <Link
              href={MAKER_HREF}
              className="inline-flex items-center justify-center border border-white/30 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded transition-colors"
            >
              Créer une photo conforme
            </Link>
          </div>
          <p className="text-xs text-slate-400 mt-4">L&apos;outil de vérification est actuellement en anglais.</p>
        </div>

        <h2 className="text-3xl font-bold mt-10 mb-6">Les erreurs qui font refuser une photo OACI</h2>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Visage trop petit ou trop grand dans le cadre (hors 32 à 36 mm)</li>
          <li>Ombre sur le visage ou derrière la tête</li>
          <li>Fond blanc, coloré ou à motif (en France)</li>
          <li>Sourire, bouche ouverte ou tête inclinée</li>
          <li>Reflets sur les lunettes, cheveux sur les yeux</li>
          <li>Photo floue, retouchée ou passée dans un filtre</li>
          <li>Photo imprimée sur papier ordinaire ou de plus de 6 mois</li>
        </ul>

        <h2 className="text-3xl font-bold mt-10 mb-6">Norme OACI et règles françaises</h2>
        <p className="mb-4">
          La France applique la norme OACI pour le{" "}
          <Link href="/fr/photo-passeport" className="text-lime-600 hover:underline">passeport</Link>, la{" "}
          <Link href="/fr/photo-carte-identite" className="text-lime-600 hover:underline">carte d&apos;identité</Link>, le{" "}
          <Link href="/fr/photo-permis-de-conduire" className="text-lime-600 hover:underline">permis de conduire</Link> et le{" "}
          <Link href="/fr/photo-titre-de-sejour" className="text-lime-600 hover:underline">titre de séjour</Link>. Elle y
          ajoute deux précisions importantes : le fond doit être gris clair ou bleu clair (le blanc est refusé), et
          certaines démarches exigent un{" "}
          <Link href="/fr/ephoto-ants" className="text-lime-600 hover:underline">code ePhoto ANTS</Link> délivré par une
          cabine ou un photographe agréé.
        </p>
        <p className="mb-4">
          Pour un visa ou un passeport étranger, le format et la couleur du fond peuvent changer. Consultez notre guide de
          la{" "}
          <Link href="/fr/guides/passport-photo-size" className="text-lime-600 hover:underline">taille des photos par pays</Link>{" "}
          ou notre page <Link href="/fr/photo-visa" className="text-lime-600 hover:underline">photo visa</Link>.
        </p>
      </section>

      <FaqSectionFr faqs={oaciFaqs} title="Questions fréquentes — Photo norme OACI" />
      <RelatedGuidesFr />
      <StickyCTAFr ctaText="Vérifier ma photo gratuitement" ctaHref={CHECKER_HREF} />
    </>
  );
}
