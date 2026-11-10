import type { Metadata } from "next";
import Link from "next/link";
import HeroSectionFr from "../components/HeroSectionFr";
import StickyCTAFr from "../components/StickyCTAFr";
import BreadcrumbsFr from "../components/BreadcrumbsFr";
import FaqSectionFr from "../components/FaqSectionFr";
import RelatedGuidesFr from "../components/RelatedGuidesFr";

const pageUrl = "https://www.pixpassport.com/fr/photo-swisspass";
// SwissPass uses ~35×45 mm with a face of 25–41 mm; the Swiss passport preset (29–34 mm) fits inside it.
const ctaHref = "/fr/passport-photo-online?type=switzerland-passport";
const updated = "2026-11-10";

export const metadata: Metadata = {
  title: "Photo SwissPass : format, téléchargement et renouvellement",
  description:
    "Photo pour votre SwissPass (abonnement général, demi-tarif) : format 35 × 45 mm, visage 25–41 mm, comment la télécharger sur swisspass.ch et quand la renouveler. Photo prête dès CHF 8.99.",
  keywords: [
    "photo swisspass",
    "photo swisspass télécharger",
    "changer photo swisspass",
    "photo abonnement général",
    "photo demi-tarif",
    "swisspass photo format",
  ],
  alternates: {
    canonical: pageUrl,
    languages: { "fr-CH": pageUrl, "x-default": pageUrl },
  },
  openGraph: {
    title: "Photo SwissPass : format, téléchargement et renouvellement",
    description:
      "Les exigences de la photo SwissPass, comment la télécharger en ligne et quand une nouvelle photo est demandée.",
    url: pageUrl,
    siteName: "PixPassport",
    locale: "fr_CH",
    type: "article",
    images: [{ url: "https://www.pixpassport.com/og-image.jpg", width: 1200, height: 630, alt: "Photo d'identité pour la carte SwissPass" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo SwissPass : format, téléchargement et renouvellement",
    description: "Exigences, téléchargement et renouvellement de la photo SwissPass.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
  },
};

const specs = [
  { label: "Format", value: "env. 35 × 45 mm", detail: "Portrait, comme une photo d'identité" },
  { label: "Hauteur du visage", value: "25–41 mm", detail: "Du menton au sommet du crâne" },
  { label: "Largeur du visage", value: "20–31 mm", detail: "D'une joue à l'autre" },
  { label: "Marge", value: "2 mm min.", detail: "Entre le visage et le bord de la photo" },
  { label: "Cadrage", value: "De face", detail: "Visage entier, regard vers l'objectif" },
  { label: "Fond", value: "Uni", detail: "Sans motif, objet ni autre personne" },
];

const renewal = [
  { age: "Jusqu'à 25 ans", every: "Tous les 5 ans" },
  { age: "Dès 25 ans", every: "Tous les 10 ans" },
];

const steps = [
  {
    title: "Préparez une photo conforme",
    text: "Prenez une photo de face devant un mur uni avec votre smartphone, puis téléversez-la sur PixPassport. L'outil la recadre au format 35 × 45 mm, centre le visage et uniformise le fond. Vous téléchargez un fichier JPG haute résolution.",
  },
  {
    title: "Connectez-vous sur swisspass.ch",
    text: "Ouvrez votre compte client SwissPass, puis la rubrique « Carte » dans le compte utilisateur.",
  },
  {
    title: "Cliquez sur « Télécharger une photo maintenant »",
    text: "Glissez votre fichier JPG dans la zone prévue ou sélectionnez-le. Ce bouton apparaît quand une photo est attendue : après l'achat d'un abonnement, lors d'un échange de carte ou quand les CFF vous demandent une nouvelle photo.",
  },
  {
    title: "Attendez la validation et la nouvelle carte",
    text: "La photo est contrôlée, puis la carte SwissPass est produite et envoyée par la poste. Pour une carte sans abonnement, l'envoi a lieu après vérification de votre identité.",
  },
];

const faqs = [
  {
    q: "Quel format doit avoir la photo SwissPass ?",
    a: "Selon la fiche des CFF, la photo mesure environ 35 × 45 mm. Le visage doit mesurer entre 25 et 41 mm de haut et entre 20 et 31 mm de large, avec au moins 2 mm entre le visage et le bord. Une photo au format passeport suisse respecte ces dimensions.",
  },
  {
    q: "Comment télécharger ma photo sur le SwissPass ?",
    a: "Connectez-vous sur swisspass.ch, ouvrez la rubrique « Carte » de votre compte utilisateur et cliquez sur « Télécharger une photo maintenant ». Glissez ensuite le fichier dans la zone prévue. Vous pouvez aussi remettre la photo à un point de vente ou appeler le Contact Center CFF au 0848 44 66 88 (CHF 0.08/min), qui peut vous envoyer un lien par SMS.",
  },
  {
    q: "Je ne vois pas le bouton pour télécharger une photo. Pourquoi ?",
    a: "Le téléchargement en ligne n'est possible que lorsqu'une commande de photo est en cours : après l'achat d'un SwissPass, lors d'un échange de carte ou quand les CFF vous demandent une nouvelle photo. Pour changer de photo sans demande de leur part, il faut commander une nouvelle carte.",
  },
  {
    q: "Combien coûte un changement de photo SwissPass ?",
    a: "Si vous changez de photo de votre propre initiative, une nouvelle carte doit être produite : comptez CHF 30. Quand les CFF vous demandent une photo récente (tous les 5 ou 10 ans), le téléchargement de la nouvelle photo fait partie du renouvellement normal.",
  },
  {
    q: "Tous les combien faut-il renouveler la photo SwissPass ?",
    a: "Tous les 5 ans jusqu'à 25 ans, puis tous les 10 ans à partir de 25 ans. Les CFF vous contactent par e-mail ou par courrier quand une nouvelle photo est nécessaire, généralement lors de l'émission d'une nouvelle carte.",
  },
  {
    q: "Pourquoi ma photo SwissPass paraît-elle retouchée ?",
    a: "Depuis octobre 2023, l'Alliance SwissPass optimise automatiquement les photos : l'arrière-plan peut être supprimé et l'exposition corrigée. Le but est de rejeter moins de photos de mauvaise qualité. Pour un résultat naturel, envoyez directement une photo nette, bien éclairée et sur fond uni.",
  },
  {
    q: "SwissPass et Swiss Travel Pass, est-ce la même chose ?",
    a: "Non. Le SwissPass est la carte rouge des résidents en Suisse, qui porte l'abonnement général, le demi-tarif ou les abonnements de communauté, avec votre photo. Le Swiss Travel Pass est un titre de transport pour les touristes résidant à l'étranger, sans photo.",
  },
  {
    q: "Puis-je porter des lunettes sur la photo SwissPass ?",
    a: "Oui, si les yeux restent bien visibles : évitez les reflets sur les verres et les verres teintés. Les lunettes de soleil sont à proscrire.",
  },
];

const relatedLinks = [
  { label: "Photo passeport Suisse", href: "/fr/photo-passeport-suisse", emoji: "🇨🇭", desc: "Normes fedpol 35×45 mm" },
  { label: "Photo d'identité Suisse", href: "/fr/photo-identite-suisse", emoji: "🪪", desc: "ID, permis, titre de séjour" },
  { label: "Photo bébé Suisse", href: "/fr/photo-passeport-bebe-suisse", emoji: "👶", desc: "Enfants et tout-petits" },
  { label: "Photo à la maison", href: "/fr/guides/how-to-take-passport-photo-at-home", emoji: "📱", desc: "Réussir la prise de vue" },
  { label: "Fond photo d'identité", href: "/fr/guides/passport-photo-background", emoji: "🖼️", desc: "Couleurs acceptées" },
  { label: "Taille photo d'identité", href: "/fr/guides/passport-photo-size", emoji: "📐", desc: "Dimensions par pays" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Photo SwissPass : format, téléchargement et renouvellement",
      description: "Exigences de la photo SwissPass, téléchargement sur swisspass.ch et règles de renouvellement.",
      inLanguage: "fr-CH",
      url: pageUrl,
      dateModified: updated,
    },
    {
      "@type": "HowTo",
      name: "Télécharger une nouvelle photo sur son SwissPass",
      step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.text })),
    },
    {
      "@type": "SoftwareApplication",
      name: "PixPassport — Photo SwissPass",
      applicationCategory: "PhotographyApplication",
      operatingSystem: "All",
      inLanguage: "fr-CH",
      offers: { "@type": "Offer", price: "8.99", priceCurrency: "CHF" },
    },
  ],
};

export default function PhotoSwissPassPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbsFr items={[{ label: "Photo SwissPass", href: "/fr/photo-swisspass" }]} />
      <HeroSectionFr
        title="Photo SwissPass : prête à télécharger en quelques minutes"
        subtitle="Format 35 × 45 mm · fichier JPG · dès CHF 8.99"
        description="Les CFF vous demandent une nouvelle photo pour votre abonnement général ou votre demi-tarif ? Préparez une photo conforme depuis votre smartphone, puis téléchargez-la directement dans votre compte sur swisspass.ch."
        ctaText="Préparer ma photo SwissPass"
        ctaHref={ctaHref}
        imageAlt="Photo d'identité au format 35 × 45 mm pour la carte SwissPass"
      />

      <section className="pb-6 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-slate-500">
            Mis à jour le <time dateTime={updated}>10 novembre 2026</time> · Sources : CFF, Alliance SwissPass
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6 text-center">Exigences de la photo SwissPass</h2>
          <p className="text-slate-600 mb-10 leading-relaxed text-center max-w-2xl mx-auto">
            Le SwissPass accepte une plage de tailles de visage plus large que le passeport. Une photo au format
            passeport suisse convient donc aussi pour votre carte.
          </p>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
            {specs.map((s) => (
              <div key={s.label} className="border-b border-slate-100 pb-4">
                <div className="flex justify-between items-start gap-4">
                  <span className="font-bold text-slate-800">{s.label}</span>
                  <span className="text-green-700 bg-green-50 px-2 py-0.5 rounded text-sm whitespace-nowrap">{s.value}</span>
                </div>
                <p className="text-sm text-slate-500 mt-1">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-10 text-center">
            Télécharger votre photo sur swisspass.ch
          </h2>
          <ol className="space-y-6">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{s.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <Link href={ctaHref} className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg">
              Créer ma photo SwissPass
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6 text-center">Quand faut-il une nouvelle photo ?</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white max-w-md mx-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="py-3 pl-4 pr-4 font-semibold text-slate-700">Âge du titulaire</th>
                  <th className="py-3 pr-4 font-semibold text-slate-700">Photo à renouveler</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                {renewal.map((r) => (
                  <tr key={r.age} className="border-b border-slate-100 last:border-0">
                    <td className="py-3 pl-4 pr-4 font-medium text-slate-800">{r.age}</td>
                    <td className="py-3 pr-4">{r.every}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-slate-600 leading-relaxed">
            Les CFF vous préviennent par e-mail ou par courrier lorsqu&apos;une photo plus récente est nécessaire,
            généralement à l&apos;émission d&apos;une nouvelle carte. Une photo trop ancienne peut poser problème lors
            d&apos;un contrôle : mieux vaut la mettre à jour dès que vous recevez la demande. Changer de photo de votre
            propre initiative implique une nouvelle carte, facturée CHF 30.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Pour les enfants, consultez aussi notre guide{" "}
            <Link href="/fr/photo-passeport-bebe-suisse" className="text-lime-600 hover:underline">photo bébé et enfant Suisse</Link>.
            Pour un document officiel, voir la{" "}
            <Link href="/fr/photo-passeport-suisse" className="text-lime-600 hover:underline">photo passeport Suisse</Link>.
          </p>
        </div>
      </section>

      <FaqSectionFr faqs={faqs} title="Questions fréquentes — Photo SwissPass" />
      <RelatedGuidesFr links={relatedLinks} />
      <StickyCTAFr ctaHref={ctaHref} countryName="SwissPass" />
    </>
  );
}
