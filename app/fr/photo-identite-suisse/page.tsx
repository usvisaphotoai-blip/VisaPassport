import type { Metadata } from "next";
import Link from "next/link";
import HeroSectionFr from "../components/HeroSectionFr";
import StickyCTAFr from "../components/StickyCTAFr";
import BreadcrumbsFr from "../components/BreadcrumbsFr";
import FaqSectionFr from "../components/FaqSectionFr";
import RelatedGuidesFr from "../components/RelatedGuidesFr";

const pageUrl = "https://www.pixpassport.com/fr/photo-identite-suisse";
const ctaHref = "/fr/passport-photo-online?type=switzerland-passport";

export const metadata: Metadata = {
  title: "Photo d'identité Suisse : ID, permis de conduire, visa",
  description:
    "Photo d'identité Suisse : carte d'identité avec ou sans puce (nouveau 2.11.2026), permis de conduire, permis de séjour, visa. Quand fournir sa photo et normes fedpol. Dès CHF 8.99.",
  keywords: [
    "photo identité suisse",
    "photo d'identité suisse en ligne",
    "photo permis de conduire suisse",
    "photo permis de séjour suisse",
    "photo carte d'identité suisse",
    "photo visa suisse",
  ],
  alternates: {
    canonical: pageUrl,
    languages: {
      "fr-CH": pageUrl,
      "de-CH": "https://www.pixpassport.com/de/dokumentenfoto-schweiz",
      "x-default": "https://www.pixpassport.com/de/dokumentenfoto-schweiz",
    },
  },
  openGraph: {
    title: "Photo d'identité Suisse : quel format pour quel document ?",
    description:
      "Carte d'identité, permis de conduire, permis de séjour, visa : les règles de photo pour chaque document suisse, expliquées simplement.",
    url: pageUrl,
    siteName: "PixPassport",
    locale: "fr_CH",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679205/MakePassportPhoto_ph2uog_ryefxt.webp",
        width: 600,
        height: 400,
        alt: "Planche de photos d'identité au format 35 × 45 mm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo d'identité Suisse : quel format pour quel document ?",
    description: "Les règles de photo pour les documents suisses, expliquées simplement.",
    images: ["https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679205/MakePassportPhoto_ph2uog_ryefxt.webp"],
  },
};

const documents = [
  {
    title: "Carte d'identité sans puce",
    format: "35 × 45 mm",
    ownPhoto: "Oui, sur papier",
    text: "Selon les cantons, elle se commande toujours à la commune de domicile (contrôle des habitants), avec une photo papier conforme aux critères fedpol. Certaines communes acceptent une photo numérique ou la prennent au guichet. Valable en Suisse et pour voyager en Europe, CHF 70 pour un adulte.",
  },
  {
    title: "Carte d'identité avec puce (dès le 2.11.2026)",
    format: "Saisie sur place",
    ownPhoto: "Non",
    text: "La nouvelle carte biométrique contient la photo du visage et deux empreintes digitales. Elle se demande comme le passeport, sur rendez-vous au centre cantonal de biométrie, où la photo est prise. Même prix que la carte sans puce.",
  },
  {
    title: "Passeport",
    format: "Saisie sur place",
    ownPhoto: "En général non",
    text: "Le passeport, toujours biométrique, est demandé au centre cantonal de biométrie, qui prend la photo en même temps que les empreintes digitales. Certains cantons acceptent une photo numérique annoncée lors de la demande.",
    link: { href: "/fr/photo-passeport-suisse", label: "Guide photo passeport Suisse" },
  },
  {
    title: "Permis de conduire",
    format: "35 × 45 mm",
    ownPhoto: "Oui",
    text: "Le service des automobiles de votre canton demande une photo récente selon les mêmes critères que le passeport : regard droit, fond neutre, pas de verres teintés. La photo apparaît en niveaux de gris sur le permis au format carte de crédit.",
  },
  {
    title: "Permis de séjour (B, C, Ci, L, G)",
    format: "Saisie sur place",
    ownPhoto: "Non",
    text: "La photo, la signature et, pour les ressortissants hors UE/AELE, les empreintes digitales sont saisies en personne dans un centre cantonal. Il n'est pas possible d'apporter sa propre photo.",
  },
  {
    title: "Visa",
    format: "Selon le pays",
    ownPhoto: "Oui",
    text: "Un visa Schengen suit en général le format 35 × 45 mm selon la norme OACI. D'autres pays, comme les États-Unis, exigent des dimensions différentes. Les consignes de l'ambassade ou du consulat font foi.",
    link: { href: "/fr/photo-visa", label: "Guide photo visa" },
  },
];

const checklist = [
  { title: "Format exact", detail: "35 × 45 mm sans cadre, visage de 29 à 34 mm du menton au sommet du crâne (23 mm minimum pour les enfants de moins de 11 ans)." },
  { title: "De face, expression neutre", detail: "Épaules droites, tête ni tournée ni inclinée, yeux ouverts, bouche fermée, rien qui couvre le visage." },
  { title: "Fond neutre et contrasté", detail: "Uni et neutre, bien distinct de la tête, sans ombre. Un fond trop clair qui manque de contraste est refusé." },
  { title: "Lunettes sous conditions", detail: "Admises si la monture ne cache pas les yeux et si les verres ne reflètent pas et ne sont pas teintés. Pas de lunettes de soleil ni de lunettes remontées sur la tête." },
  { title: "Tirage soigné", detail: "Photo de moins d'un an, couleur ou noir et blanc, sur papier photo lisse brillant ou semi-mat, sans pli ni coins arrondis." },
];

const faqs = [
  {
    q: "Carte d'identité avec ou sans puce : dois-je fournir une photo ?",
    a: "Pour la carte sans puce commandée à la commune, oui : vous apportez en général une photo papier conforme aux critères fedpol. Pour la carte avec puce, disponible depuis le 2 novembre 2026, non : la photo est prise au centre cantonal de biométrie, comme pour le passeport. Les deux cartes coûtent CHF 70 pour un adulte.",
  },
  {
    q: "Le format 35 × 45 mm vaut-il pour tous les documents suisses ?",
    a: "Pour le passeport, la carte d'identité et le permis de conduire, oui. Pour les permis de séjour des ressortissants étrangers, la photo est saisie en personne dans un centre cantonal : vous n'apportez pas de photo. Pour un visa, ce sont les règles du pays de destination qui s'appliquent.",
  },
  {
    q: "Puis-je faire une photo d'identité suisse avec mon téléphone ?",
    a: "Oui, pour les documents qui acceptent une photo apportée. Placez le téléphone à hauteur des yeux, tenez-vous face à une lumière douce devant un mur uni, et utilisez le fichier original plutôt qu'une capture d'écran. PixPassport recadre ensuite la photo au format 35 × 45 mm et remplace le fond.",
  },
  {
    q: "Où imprimer ma photo d'identité en Suisse ?",
    a: "Téléchargez la planche A4 fournie par PixPassport et imprimez-la sur papier photo lisse, brillant ou semi-mat, par exemple dans une borne photo en grande surface, dans un magasin photo ou chez vous. Évitez les papiers à effet perlé ou tramé, refusés par fedpol. Imprimez toujours à 100 %, sans « ajuster à la page ».",
  },
  {
    q: "Les lunettes sont-elles autorisées sur une photo d'identité suisse ?",
    a: "Oui, si la monture ne cache pas les yeux et si les verres ne reflètent pas la lumière et ne sont pas teintés. Les lunettes de soleil sont interdites, sauf verres foncés pour les personnes malvoyantes.",
  },
  {
    q: "Quelle photo faut-il pour le permis de conduire suisse ?",
    a: "Une photo récente de 35 × 45 mm, conforme aux mêmes critères que le passeport : de face, expression neutre, fond uni et neutre, sans verres teintés. Certains cantons acceptent une photo numérique lors d'une demande en ligne. Vérifiez auprès du service des automobiles de votre canton.",
  },
  {
    q: "Ai-je besoin d'une photo pour mon permis B ou C ?",
    a: "Non. Pour les permis de séjour biométriques, l'office cantonal des migrations vous convoque dans un centre de saisie, où la photo est prise sur place. Une photo apportée n'est pas utilisée.",
  },
];

const relatedLinks = [
  { label: "Photo passeport Suisse", href: "/fr/photo-passeport-suisse", emoji: "🇨🇭", desc: "Normes fedpol 35×45 mm" },
  { label: "Photo visa", href: "/fr/photo-visa", emoji: "✈️", desc: "Visa Schengen et autres" },
  { label: "Photo bébé Suisse", href: "/fr/photo-passeport-bebe-suisse", emoji: "👶", desc: "Enfants et tout-petits" },
  { label: "Photo SwissPass", href: "/fr/photo-swisspass", emoji: "🚆", desc: "Abonnement CFF" },
  { label: "Photo à la maison", href: "/fr/guides/how-to-take-passport-photo-at-home", emoji: "📱", desc: "Réussir la prise de vue" },
  { label: "Imprimer sa photo", href: "/fr/imprimer-photo-identite", emoji: "🖨️", desc: "Sans déformer le format" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Photo d'identité Suisse : carte d'identité, permis de conduire et visa",
      description: "Règles de photo pour les documents d'identité suisses et préparation en ligne.",
      inLanguage: "fr-CH",
      url: pageUrl,
      dateModified: "2026-11-10",
    },
    {
      "@type": "SoftwareApplication",
      name: "PixPassport — Photo d'identité Suisse",
      applicationCategory: "PhotographyApplication",
      operatingSystem: "All",
      inLanguage: "fr-CH",
      offers: { "@type": "Offer", price: "8.99", priceCurrency: "CHF" },
    },
  ],
};

export default function PhotoIdentiteSuissePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbsFr items={[{ label: "Photo d'identité Suisse", href: "/fr/photo-identite-suisse" }]} />
      <HeroSectionFr
        title="Photo d'identité Suisse : le bon format pour chaque document"
        subtitle="Carte d'identité avec ou sans puce · permis · visa · dès CHF 8.99"
        description="Préparez depuis votre smartphone une photo conforme pour la carte d'identité sans puce, le permis de conduire ou un visa. Pour le passeport, la nouvelle carte avec puce et les permis de séjour, c'est différent : un centre cantonal prend la photo sur place. L'autorité qui délivre le document a toujours le dernier mot."
        ctaText="Préparer ma photo d'identité"
        ctaHref={ctaHref}
        imageAlt="Photo d'identité suisse au format 35 × 45 mm sur fond clair"
      />

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4 text-center">Une photo, plusieurs règles</h2>
          <p className="text-slate-600 leading-relaxed text-center max-w-2xl mx-auto">
            Il n&apos;existe pas de photo d&apos;identité universelle. Le passeport, la carte d&apos;identité et le permis de
            conduire suivent les critères de fedpol au format 35 × 45 mm. Depuis le 2 novembre 2026, la carte
            d&apos;identité existe avec ou sans puce, et seule la version sans puce demande encore votre propre photo.
            Les permis de séjour sont saisis en personne, et les visas suivent les règles du pays de destination.
          </p>
          <p className="mt-3 text-xs text-slate-500 text-center">
            Mis à jour le <time dateTime="2026-11-10">10 novembre 2026</time> · Source : critères d&apos;acceptation des
            photos de fedpol
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-10 text-center">Quelle photo pour quel document ?</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {documents.map((d) => (
              <article key={d.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold text-slate-900">{d.title}</h3>
                  <span className="text-green-700 bg-green-50 px-2 py-0.5 rounded text-xs font-semibold whitespace-nowrap">{d.format}</span>
                </div>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Photo apportée : {d.ownPhoto}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{d.text}</p>
                {d.link && (
                  <Link href={d.link.href} className="mt-3 inline-block text-sm font-semibold text-lime-700 hover:underline">
                    {d.link.label} →
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">Cinq règles fedpol qui comptent presque toujours</h2>
          <ul className="space-y-4">
            {checklist.map((c) => (
              <li key={c.title} className="border-l-2 border-green-500 pl-4">
                <p className="font-bold text-slate-800">{c.title}</p>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">{c.detail}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-slate-600 leading-relaxed">
            Ces règles reprennent les critères d&apos;acceptation des photos de fedpol. Les consignes précises de l&apos;autorité concernée priment
            toujours. Cette page existe aussi en allemand :{" "}
            <Link href="/de/dokumentenfoto-schweiz" className="text-lime-600 hover:underline" hrefLang="de-CH" lang="de-CH">
              Dokumentenfoto Schweiz
            </Link>.
          </p>
          <div className="mt-10 text-center">
            <Link href={ctaHref} className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg">
              Créer ma photo d&apos;identité suisse
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <FaqSectionFr faqs={faqs} title="Questions fréquentes — Photo d'identité Suisse" />
      <RelatedGuidesFr links={relatedLinks} />
      <StickyCTAFr ctaHref={ctaHref} countryName="Suisse" />
    </>
  );
}
