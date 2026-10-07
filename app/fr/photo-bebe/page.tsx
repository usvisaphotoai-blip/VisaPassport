import type { Metadata } from "next";
import Link from "next/link";
import HeroSectionFr from "../components/HeroSectionFr";
import RequirementsFr from "../components/RequirementsFr";
import StickyCTAFr from "../components/StickyCTAFr";
import BreadcrumbsFr from "../components/BreadcrumbsFr";
import FaqSectionFr from "../components/FaqSectionFr";
import RelatedGuidesFr from "../components/RelatedGuidesFr";

const PAGE_URL = "https://www.pixpassport.com/fr/photo-bebe";

export const metadata: Metadata = {
  title: "Photo d'identité bébé : passeport et CNI | PixPassport",
  description: "Photo d'identité de bébé à la maison : normes ANTS, astuces pour un nourrisson (allongé, fond gris clair, sans tétine) et recadrage 35×45 mm automatique.",
  keywords: ["photo identité bébé", "photo passeport bébé", "photo cni bébé", "photo identité nourrisson", "photo passeport enfant", "photo identité enfant"],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      fr: PAGE_URL,
    },
  },
  openGraph: {
    title: "Photo d'identité bébé : passeport et CNI | PixPassport",
    description: "Réussir la photo d'identité de votre bébé à la maison, aux normes ANTS, et la recadrer automatiquement au format 35×45 mm.",
    url: PAGE_URL, siteName: "PixPassport", locale: "fr_FR", type: "website",
    images: [{ url: "https://www.pixpassport.com/og-image.jpg", width: 1200, height: 630, alt: "Photo d'identité bébé" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo d'identité bébé : passeport et CNI | PixPassport",
    description: "Réussir la photo d'identité de votre bébé à la maison, aux normes ANTS.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
  },
};

const ctaHref = "/fr/passport-photo-online?type=france-passport";

const babyFaqs = [
  { q: "À partir de quel âge faut-il une photo d'identité pour un bébé ?", a: "Dès la naissance, si vous demandez un passeport ou une carte d'identité pour votre enfant, par exemple pour un voyage. La photo doit respecter les mêmes normes que pour un adulte et dater de moins de six mois : chez un nourrisson, le visage change vite." },
  { q: "Mon bébé doit-il avoir les yeux ouverts sur la photo ?", a: "Oui, c'est préférable : les yeux doivent être ouverts et visibles. L'administration se montre plus tolérante sur l'expression et le regard des tout-petits, mais une photo yeux fermés risque d'être refusée. Photographiez juste après une sieste ou un repas, quand bébé est éveillé et calme." },
  { q: "Peut-on voir la main du parent sur la photo ?", a: "Non. Le bébé doit être seul sur la photo : ni main, ni bras, ni épaule d'un adulte visibles. Allongez-le sur un drap plutôt que de le tenir, ou recouvrez son siège auto d'un tissu uni de couleur claire." },
  { q: "La tétine ou le doudou sont-ils autorisés ?", a: "Non. Pas de tétine, de jouet, de bonnet ni de bandeau. La tête doit être nue et le visage entièrement dégagé, du sommet du crâne au menton." },
  { q: "Quel fond utiliser pour la photo d'identité d'un bébé ?", a: "Un fond uni gris clair ou bleu clair, comme pour un adulte. Le fond blanc est refusé en France. Si vous n'avez qu'un drap blanc ou coloré, PixPassport remplace automatiquement l'arrière-plan par un fond gris clair conforme." },
  { q: "Le bébé doit-il être présent en mairie ?", a: "Oui, l'enfant doit être présent lors du dépôt de la demande de passeport ou de carte d'identité, accompagné du parent qui exerce l'autorité parentale. Les empreintes digitales ne sont relevées qu'à partir de 12 ans." },
  { q: "Combien coûtent le passeport et la carte d'identité d'un bébé ?", a: "Le passeport d'un enfant de moins de 15 ans coûte 17 € (timbre fiscal) et il est valable 5 ans. La carte d'identité est gratuite, sauf en cas de perte ou de vol (25 €)." },
];

const tips = [
  { n: "01", title: "Allongez bébé sur un drap clair", desc: "Étalez un drap uni gris clair ou bleu clair bien tendu sur un lit ou un tapis, et allongez bébé sur le dos. Le drap sert de fond : pas besoin de le tenir." },
  { n: "02", title: "Photographiez d'au-dessus", desc: "Tenez le téléphone parallèle au visage, à hauteur de son nez, sans angle. Cadrez large (de la poitrine au-dessus de la tête) : l'outil recadrera ensuite." },
  { n: "03", title: "Lumière du jour, sans flash", desc: "Placez-vous près d'une fenêtre, sans soleil direct. Le flash crée des yeux rouges et des ombres ; évitez aussi votre propre ombre sur le bébé." },
  { n: "04", title: "Choisissez le bon moment", desc: "Après la sieste ou le biberon, quand bébé est éveillé et calme. Une deuxième personne peut attirer son regard vers l'objectif avec un bruit ou un jouet hors champ." },
  { n: "05", title: "Prenez plusieurs photos", desc: "Utilisez le mode rafale et gardez la photo où les yeux sont ouverts, la bouche fermée ou presque, et la tête droite." },
  { n: "06", title: "Recadrez avec PixPassport", desc: "Importez la meilleure photo : l'outil remplace le fond, cadre le visage au format 35×45 mm et vérifie la conformité avant que vous ne payiez." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "SoftwareApplication", name: "PixPassport — Photo d'identité bébé", applicationCategory: "PhotographyApplication", operatingSystem: "All", inLanguage: "fr-FR", offers: { "@type": "Offer", price: "6.99", priceCurrency: "EUR" } },
    {
      "@type": "HowTo",
      name: "Faire la photo d'identité d'un bébé à la maison",
      inLanguage: "fr-FR",
      step: tips.map((t, i) => ({ "@type": "HowToStep", position: i + 1, name: t.title, text: t.desc })),
    },
  ],
};

export default function PhotoBebePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbsFr items={[{ label: "Photo d'identité bébé", href: "/fr/photo-bebe" }]} />
      <HeroSectionFr
        title="Photo d'identité bébé pour le passeport et la CNI"
        subtitle="Faite à la maison, aux normes ANTS"
        description="Pas besoin d'emmener un nourrisson au photomaton : prenez la photo chez vous, allongé sur un drap clair. PixPassport remplace le fond, recadre le visage au format 35×45 mm et vérifie la conformité."
        ctaHref={ctaHref}
        ctaText="Créer la photo de mon bébé →"
        showImage={true}
        imageAlt="Photo d'identité de bébé recadrée au format 35×45 mm sur fond gris clair"
      />

      <RequirementsFr countryName="photo bébé (France)" specs={[
        { label: "Dimensions", value: "35 × 45 mm", detail: "Même format qu'un adulte" },
        { label: "Arrière-plan", value: "Gris clair", detail: "Uni, sans ombre — blanc refusé" },
        { label: "Enfant seul", value: "Obligatoire", detail: "Aucune main ni bras d'adulte" },
        { label: "Tête nue", value: "Sans bonnet", detail: "Ni tétine, ni jouet, ni bandeau" },
        { label: "Yeux", value: "Ouverts", detail: "Visage de face, tête droite" },
        { label: "Ancienneté", value: "< 6 mois", detail: "Le visage d'un bébé change vite" },
      ]} />

      <section className="max-w-5xl mx-auto px-4 py-12 text-gray-800">
        <h2 className="text-3xl font-bold mb-6">Comment faire une photo d&apos;identité de bébé à la maison</h2>
        <p className="mb-8">
          Les photomatons sont pensés pour des adultes assis : impossible d&apos;y obtenir une photo nette d&apos;un
          nourrisson. La méthode la plus simple consiste à photographier votre bébé allongé, d&apos;au-dessus, puis à
          laisser l&apos;outil faire le recadrage. Comptez cinq minutes.
        </p>
        <ol className="relative mb-8">
          {tips.map((t, i) => (
            <li key={t.n} className="relative pl-16 pb-8 last:pb-0">
              {i !== tips.length - 1 && (
                <span className="absolute left-[23px] top-12 bottom-0 w-px bg-lime-200" aria-hidden="true" />
              )}
              <span className="absolute left-0 top-0 w-12 h-12 bg-lime-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {t.n}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-1 pt-1">{t.title}</h3>
              <p className="text-slate-600 leading-relaxed">{t.desc}</p>
            </li>
          ))}
        </ol>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Les erreurs qui font refuser une photo de bébé</h2>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Main ou bras d&apos;un parent visible dans le cadre</li>
          <li>Tétine, doudou, bonnet ou bandeau</li>
          <li>Fond blanc, drap à motifs ou plis marqués qui créent des ombres</li>
          <li>Yeux fermés ou tête tournée sur le côté</li>
          <li>Photo floue, prise au flash ou avec le zoom numérique</li>
          <li>Photo de plus de six mois : un nourrisson change très vite</li>
        </ul>
        <p className="mb-4">
          Notre outil signale la plupart de ces problèmes avant le téléchargement. L&apos;aperçu est gratuit : vous ne
          payez que si la photo vous convient.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Passeport ou carte d&apos;identité pour un bébé : les démarches</h2>
        <p className="mb-4">
          La photo est la même pour le{" "}
          <Link href="/fr/photo-passeport" className="text-lime-600 hover:underline">passeport</Link> et la{" "}
          <Link href="/fr/photo-carte-identite" className="text-lime-600 hover:underline">carte d&apos;identité</Link>{" "}
          : une seule planche suffit si vous faites les deux demandes ensemble. La démarche se déroule en trois étapes :
        </p>
        <ol className="list-decimal pl-6 mb-4 space-y-2">
          <li>Pré-demande en ligne sur le site de l&apos;ANTS, faite par un parent exerçant l&apos;autorité parentale.</li>
          <li>Rendez-vous dans une mairie équipée d&apos;un dispositif de recueil, en présence du bébé, avec la photo papier 35×45 mm.</li>
          <li>Retrait du titre dans la même mairie.</li>
        </ol>
        <p className="mb-4">
          Le passeport d&apos;un enfant de moins de 15 ans coûte 17&nbsp;€ et reste valable 5 ans ; la carte
          d&apos;identité est gratuite. Pensez à refaire une photo récente pour chaque demande.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Et pour un enfant plus grand ?</h2>
        <p>
          Dès que l&apos;enfant tient assis, photographiez-le assis devant un mur uni de couleur claire, à hauteur de
          ses yeux. Les règles sont celles d&apos;un adulte : expression neutre, bouche fermée, regard vers
          l&apos;objectif. Voir notre guide{" "}
          <Link href="/fr/guides/how-to-take-passport-photo-at-home" className="text-lime-600 hover:underline">photo d&apos;identité à la maison</Link>{" "}
          et les{" "}
          <Link href="/fr/photo-identite" className="text-lime-600 hover:underline">normes de la photo d&apos;identité</Link>.
        </p>
      </section>

      <FaqSectionFr faqs={babyFaqs} title="Questions fréquentes — Photo d'identité bébé" />
      <RelatedGuidesFr />
      <StickyCTAFr ctaHref={ctaHref} ctaText="Créer la photo de mon bébé" />
    </>
  );
}
