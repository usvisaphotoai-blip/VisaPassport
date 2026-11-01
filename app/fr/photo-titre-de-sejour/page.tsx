import type { Metadata } from "next";
import Link from "next/link";
import HeroSectionFr from "../components/HeroSectionFr";
import RequirementsFr from "../components/RequirementsFr";
import BreadcrumbsFr from "../components/BreadcrumbsFr";
import FaqSectionFr from "../components/FaqSectionFr";
import RelatedGuidesFr from "../components/RelatedGuidesFr";

const PAGE_URL = "https://www.pixpassport.com/fr/photo-titre-de-sejour";

export const metadata: Metadata = {
  title: "Photo titre de séjour : code ePhoto ANEF et normes 2026",
  description: "Photo pour titre de séjour : code ePhoto à 22 caractères obligatoire sur l'ANEF, validité 6 mois, où l'obtenir, normes 35×45 mm (fond gris clair, tête nue) et motifs de refus.",
  keywords: ["photo titre de séjour", "ephoto titre de séjour", "code ephoto anef", "code photo anef", "photo carte de séjour", "photo carte de résident", "normes photo titre de séjour"],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      fr: PAGE_URL,
    },
  },
  openGraph: {
    title: "Photo titre de séjour : code ePhoto ANEF et normes 2026",
    description: "Code ePhoto obligatoire sur l'ANEF : où l'obtenir, validité, réutilisation, normes de la photo et motifs de refus.",
    url: PAGE_URL, siteName: "PixPassport", locale: "fr_FR", type: "article",
    images: [{ url: "https://www.pixpassport.com/og-image.jpg", width: 1200, height: 630, alt: "Photo titre de séjour" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo titre de séjour : code ePhoto ANEF et normes 2026",
    description: "Code ePhoto obligatoire sur l'ANEF : où l'obtenir, validité et normes de la photo.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
  },
};

const sejourFaqs = [
  { q: "Le code ePhoto est-il obligatoire pour un titre de séjour ?", a: "Oui, pour toute demande déposée en ligne sur l'ANEF (Administration numérique pour les étrangers en France). Le formulaire vous demande le code ePhoto, qui transmet votre photo et votre signature numériques." },
  { q: "Combien de caractères compte le code ePhoto ?", a: "Le code compte 22 caractères. Il figure sur la planche photo ou sur le ticket remis par la cabine ou le photographe. Saisissez-le en majuscules, sans espace." },
  { q: "Combien de temps le code ePhoto est-il valable ?", a: "Six mois à partir de la prise de vue, pour une seule demande en ligne. Passé ce délai, refaites une ePhoto." },
  { q: "Peut-on réutiliser un code ePhoto ?", a: "Oui, si la demande précédente n'a pas été traitée ou a été abandonnée. Non, si elle a été finalisée ou clôturée. Pour libérer un code bloqué, contactez le service ePhoto au 09 70 82 32 46 ou à etranger-ants@photomaton.fr." },
  { q: "Où faire sa photo de titre de séjour ?", a: "Dans une cabine ou chez un photographe portant la vignette « Agréé service en ligne ANTS », ou via une application mobile agréée par l'ANTS. Trouvez le lieu le plus proche sur le site de l'ANTS." },
  { q: "Peut-on faire la photo de titre de séjour avec son téléphone ?", a: "Seulement avec une application agréée par l'ANTS, qui délivre un code ePhoto. Une photo prise avec l'appareil du téléphone, même conforme, ne fournit pas de code : l'ANEF la refuse." },
  { q: "Combien de photos papier faut-il pour un titre de séjour ?", a: "Aucune pour une demande en ligne : le code suffit. Pour un dépôt en préfecture, prévoyez en général trois photos. Gardez aussi la planche : la préfecture peut la demander au rendez-vous." },
  { q: "Peut-on porter un voile ou un couvre-chef sur la photo ?", a: "Non. Comme pour tous les titres français, la tête reste nue : voile, foulard, turban, casquette et serre-tête sont refusés. Le visage reste entièrement dégagé." },
  { q: "Peut-on porter des lunettes sur la photo de titre de séjour ?", a: "Oui, si la monture est fine, ne masque pas les yeux et si les verres ne sont ni teintés ni colorés, sans reflet. Les retirer reste plus sûr." },
  { q: "Faut-il une photo pour valider son visa long séjour (VLS-TS) ?", a: "Non. La validation en ligne du VLS-TS ne demande pas de nouvelle photo. Un code ePhoto vous sera demandé lors de votre demande de carte de séjour." },
  { q: "Je n'ai pas accès à internet : comment faire ?", a: "Rendez-vous dans un point d'accueil numérique (PAN) de préfecture ou de sous-préfecture, souvent sur rendez-vous. Un agent vous aide à déposer la demande sur l'ANEF. Faites votre ePhoto avant d'y aller." },
];

const titles = [
  { title: "Carte de séjour temporaire", desc: "Étudiant, salarié, visiteur, vie privée et familiale : première demande et renouvellement sur l'ANEF, avec code ePhoto." },
  { title: "Carte de séjour pluriannuelle", desc: "Après un premier titre d'un an, pour 2 à 4 ans. Dépôt en ligne, code ePhoto demandé." },
  { title: "Carte de résident", desc: "Titre de 10 ans. Code ePhoto en ligne ; certains cas restent déposés en préfecture avec 3 photos papier." },
  { title: "DCEM (enfant mineur)", desc: "Document de circulation pour étranger mineur : demande en ligne avec l'ePhoto de l'enfant." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Photo titre de séjour : code ePhoto ANEF et normes 2026",
      description: "Code ePhoto obligatoire sur l'ANEF : où l'obtenir, validité, réutilisation, normes de la photo et motifs de refus.",
      inLanguage: "fr-FR",
      url: PAGE_URL,
      mainEntityOfPage: PAGE_URL,
      image: "https://www.pixpassport.com/og-image.jpg",
      datePublished: "2026-10-06",
      dateModified: "2026-10-30",
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
        title="Photo titre de séjour : code ePhoto ANEF et normes"
        subtitle="Mise à jour en octobre 2026"
        description="Sur l'ANEF, chaque demande de titre de séjour exige un code ePhoto à 22 caractères, délivré par une cabine, un photographe ou une application agréés. Découvrez où l'obtenir, combien de temps il reste valable et les normes à respecter."
        ctaHref="#ou-faire-photo-titre-sejour"
        ctaText="Où faire ma photo ↓"
        showImage={true}
        imageAlt="Photo d'identité aux normes du titre de séjour : 35×45 mm, fond gris clair, tête nue"
      />

      <RequirementsFr countryName="photo titre de séjour" specs={[
        { label: "Format", value: "ePhoto + code", detail: "Code à 22 caractères" },
        { label: "Dimensions", value: "35 × 45 mm", detail: "Visage de 32 à 36 mm" },
        { label: "Arrière-plan", value: "Gris clair", detail: "Ou bleu clair — blanc interdit" },
        { label: "Tête", value: "Nue", detail: "Voile et couvre-chef refusés" },
        { label: "Expression", value: "Neutre", detail: "Bouche fermée, yeux ouverts" },
        { label: "Validité du code", value: "6 mois", detail: "Une seule demande" },
      ]} />

      <section className="max-w-5xl mx-auto px-4 py-12 text-gray-800">
        <h2 className="text-3xl font-bold mb-6">Photo titre de séjour : l&apos;essentiel</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Demande en ligne sur l&apos;ANEF</strong> : code ePhoto obligatoire, aucune photo papier à envoyer.</li>
          <li><strong>Demande en préfecture</strong> : photos papier, en général trois.</li>
          <li><strong>Normes</strong> : 35 × 45 mm, visage de 32 à 36 mm, fond uni gris clair ou bleu clair (blanc interdit), tête nue.</li>
          <li><strong>Validité</strong> : photo et code de moins de six mois.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Code ePhoto et ANEF : comment ça marche</h2>
        <p className="mb-4">
          L&apos;ANEF (Administration numérique pour les étrangers en France) centralise la plupart des demandes de
          titre de séjour : première demande, renouvellement, carte pluriannuelle et carte de résident. Lors du
          dépôt, le formulaire vous demande le <strong>code ePhoto</strong> imprimé sur votre planche. Ce code
          permet à l&apos;administration de récupérer votre photo et votre signature numériques directement auprès
          de la cabine ou du photographe agréé. Plus de détails dans notre guide sur le{" "}
          <Link href="/fr/ephoto-ants" className="text-lime-600 hover:underline">code ePhoto</Link>.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Format</strong> : 22 caractères, à saisir en majuscules, sans espace.</li>
          <li><strong>Validité</strong> : six mois à partir de la prise de vue, pour une seule demande.</li>
          <li>
            <strong>Réutilisation</strong> : possible si la demande n&apos;a pas été traitée ou a été abandonnée,
            impossible après une demande finalisée. Pour libérer un code bloqué : 09 70 82 32 46 ou
            etranger-ants@photomaton.fr.
          </li>
        </ul>
        <p className="mb-4">
          Une photo prise chez soi, même conforme, ne fournit pas de code. PixPassport ne délivre pas de code ePhoto :
          notre outil ne convient donc pas à une demande sur l&apos;ANEF.
        </p>

        <h2 id="ou-faire-photo-titre-sejour" className="text-2xl font-semibold mt-10 mb-4 scroll-mt-24">
          Où faire sa photo de titre de séjour ?
        </h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>
            <strong>Cabine photo agréée</strong> : repérez la vignette bleue « Agréé service en ligne ANTS ». Le
            code s&apos;imprime sur la planche ; gardez-la pour votre rendez-vous en préfecture.
          </li>
          <li>
            <strong>Photographe habilité</strong> : utile pour un enfant ou si vous avez besoin d&apos;aide pour le
            cadrage.
          </li>
          <li>
            <strong>Application mobile agréée par l&apos;ANTS</strong> : elle délivre un code ePhoto depuis votre
            smartphone. Vérifiez l&apos;agrément avant de payer.
          </li>
        </ul>
        <p className="mb-4">
          Trouvez la cabine ou le photographe le plus proche sur le{" "}
          <a
            href="https://passeport.ants.gouv.fr/services/geolocaliser-les-photographes-habilites"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lime-600 hover:underline"
          >
            service de géolocalisation de l&apos;ANTS
          </a>.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Quels titres sont concernés ?</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {titles.map((t) => (
            <div key={t.title} className="border-l-2 border-lime-500 pl-4">
              <h3 className="font-bold text-slate-900 mb-1">{t.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
        <p className="mb-4">
          Certains dossiers restent déposés en préfecture, sans ePhoto : par exemple la carte de résident pour les
          apatrides ou pour les titulaires d&apos;une rente d&apos;accident du travail. Prévoyez alors trois photos
          papier conformes. Vérifiez la liste des pièces sur service-public.fr pour votre situation.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Normes de la photo de titre de séjour</h2>
        <p className="mb-4">
          Les normes sont les mêmes que pour toute{" "}
          <Link href="/fr/photo-identite" className="text-lime-600 hover:underline">photo d&apos;identité française</Link>{" "}
          :
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Format 35 × 45 mm, visage de 32 à 36 mm du menton au sommet du crâne</li>
          <li>Fond uni et clair, gris clair ou bleu clair ; le fond blanc est interdit</li>
          <li>Tête nue, visage entièrement dégagé, oreilles visibles</li>
          <li>Expression neutre, bouche fermée, yeux ouverts, regard vers l&apos;objectif</li>
          <li>Lunettes tolérées : monture fine, verres clairs, sans reflet</li>
          <li>Photo de moins de six mois, ressemblante et non retouchée</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Les motifs de refus les plus fréquents</h2>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Tête couverte (voile, foulard, casquette) : refusée pour tous les titres français</li>
          <li>Fond blanc, non uniforme ou ombre derrière la tête</li>
          <li>Visage trop petit, trop grand ou décentré</li>
          <li>Sourire, bouche ouverte ou tête inclinée</li>
          <li>Reflets sur les lunettes ou verres teintés</li>
          <li>Code ePhoto expiré (plus de six mois) ou déjà utilisé pour une demande finalisée</li>
        </ul>
        <p className="mb-4">
          Si l&apos;ANEF refuse votre photo, refaites une ePhoto en corrigeant le défaut, puis transmettez le
          nouveau code depuis votre espace personnel. Pour un visa long séjour demandé depuis l&apos;étranger,
          consultez notre page{" "}
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
