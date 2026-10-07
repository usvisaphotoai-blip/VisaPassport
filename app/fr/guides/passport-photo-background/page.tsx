import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbsFr from "../../components/BreadcrumbsFr";
import FaqSectionFr from "../../components/FaqSectionFr";
import StickyCTAFr from "../../components/StickyCTAFr";

const PAGE_URL = "https://www.pixpassport.com/fr/guides/passport-photo-background";

export const metadata: Metadata = {
  title: "Fond photo d'identité : quelle couleur choisir ? (2026)",
  description: "Fond blanc refusé, gris clair ou bleu clair accepté : les règles du fond de la photo d'identité en France et à l'étranger, et comment l'obtenir chez soi.",
  keywords: ["fond photo identité", "couleur fond photo identité", "fond blanc photo identité", "fond photo passeport", "arrière-plan photo identité"],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      fr: PAGE_URL,
    },
  },
  openGraph: { title: "Fond photo d'identité : quelle couleur choisir ? | PixPassport", description: "Pourquoi le fond blanc est refusé en France et quelles couleurs sont acceptées.", url: PAGE_URL, siteName: "PixPassport", locale: "fr_FR", type: "article", images: [{ url: "https://www.pixpassport.com/og-image.jpg", width: 1200, height: 630, alt: "Fond photo d'identité" }] },
  twitter: {
    card: "summary_large_image",
    title: "Fond photo d'identité : quelle couleur choisir ? | PixPassport",
    description: "Pourquoi le fond blanc est refusé en France et quelles couleurs sont acceptées.",
    images: ["https://www.pixpassport.com/og-image.jpg"],
  },
};

const bgFaqs = [
  { q: "Quelle couleur de fond pour une photo d'identité en France ?", a: "Un fond uni et clair : gris clair ou bleu clair. Le fond blanc est refusé pour le passeport, la carte d'identité et le permis de conduire, car il ne contraste pas assez avec le visage." },
  { q: "Pourquoi le fond blanc est-il interdit sur une photo d'identité ?", a: "Sur fond blanc, les contours du visage et des cheveux clairs se confondent avec l'arrière-plan, ce qui gêne la reconnaissance faciale utilisée par les titres biométriques. La norme française impose donc un fond clair mais pas blanc." },
  { q: "Le fond peut-il être blanc pour un visa ?", a: "Oui, pour certains pays. Les États-Unis, l'Inde et la Chine exigent un fond blanc. Une même photo ne peut donc pas toujours servir pour un visa et pour un document français." },
  { q: "Comment obtenir un fond conforme chez soi ?", a: "Placez-vous devant un mur uni de couleur claire (ou un drap gris clair bien tendu), à environ 1 mètre du mur pour éviter les ombres, face à une fenêtre. Vous pouvez aussi photographier sur n'importe quel fond : PixPassport remplace automatiquement l'arrière-plan par un fond gris clair conforme." },
  { q: "PixPassport peut-il corriger le fond automatiquement ?", a: "Oui. L'outil détoure votre visage et vos cheveux, puis applique la couleur de fond exigée par le document choisi : gris clair pour la France, blanc pour un visa américain, etc." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Fond photo d'identité : quelle couleur choisir ?",
      description: "Règles du fond de la photo d'identité en France et à l'étranger.",
      inLanguage: "fr-FR",
      url: PAGE_URL,
      mainEntityOfPage: PAGE_URL,
      image: "https://www.pixpassport.com/og-image.jpg",
      datePublished: "2026-05-17",
      dateModified: "2026-10-06",
      author: { "@type": "Organization", name: "PixPassport" },
      publisher: { "@type": "Organization", name: "PixPassport", logo: { "@type": "ImageObject", url: "https://www.pixpassport.com/logo.png" } },
    },
  ],
};

const bgRules = [
  { country: "🇫🇷 France", color: "Gris clair ou bleu clair", detail: "Uni, sans motif — blanc refusé" },
  { country: "🇺🇸 États-Unis", color: "Blanc ou blanc cassé", detail: "Passeport, visa, DS-160" },
  { country: "🇬🇧 Royaume-Uni", color: "Gris clair ou crème", detail: "Ton neutre, uni" },
  { country: "🇩🇪 Allemagne", color: "Gris clair uni", detail: "Clair et homogène" },
  { country: "🇨🇦 Canada", color: "Blanc ou très clair", detail: "Aucune ombre" },
  { country: "🇨🇳 Chine", color: "Blanc", detail: "Visa et passeport" },
  { country: "🇮🇳 Inde", color: "Blanc uni", detail: "Passeport et visa" },
];

export default function PassportPhotoBackgroundPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbsFr items={[{ label: "Guides", href: "/fr/guides" }, { label: "Fond photo d'identité", href: "/fr/guides/passport-photo-background" }]} />
      <article className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">Fond photo d&apos;identité : quelle couleur choisir ?</h1>
          <p className="text-lg text-slate-600 mb-4 leading-relaxed">
            L&apos;arrière-plan est l&apos;une des premières causes de refus d&apos;une photo d&apos;identité en mairie. Et
            contrairement à une idée reçue, <strong>le fond blanc est refusé en France</strong> : la photo de votre
            passeport, de votre carte d&apos;identité ou de votre permis doit être prise sur un fond uni gris clair ou
            bleu clair.
          </p>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Ce guide explique pourquoi, quelles couleurs sont acceptées selon le pays, et comment obtenir un fond
            conforme chez vous, sans studio.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">⬜ Pourquoi le fond blanc est refusé en France</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Les titres d&apos;identité français sont biométriques : la photo est enregistrée dans une puce et comparée
            automatiquement à votre visage. Un fond blanc réduit le contraste avec la peau et les cheveux clairs, ce
            qui fausse la détection des contours du visage. La norme impose donc un fond <strong>uni, clair et
            différent du blanc</strong>, sans motif, sans dégradé et sans ombre portée.
          </p>
          <p className="text-slate-600 leading-relaxed mb-8">
            Les mêmes règles s&apos;appliquent à toutes les{" "}
            <Link href="/fr/photo-identite" className="text-lime-600 hover:underline">photos d&apos;identité françaises</Link>
            , qu&apos;il s&apos;agisse du{" "}
            <Link href="/fr/photo-passeport" className="text-lime-600 hover:underline">passeport</Link>, de la{" "}
            <Link href="/fr/photo-carte-identite" className="text-lime-600 hover:underline">carte nationale d&apos;identité</Link>{" "}
            ou d&apos;une{" "}
            <Link href="/fr/ephoto-ants" className="text-lime-600 hover:underline">ePhoto ANTS</Link>.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">🎨 Couleur de fond selon le pays</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Si vous préparez un visa, vérifiez la couleur exigée par le pays de destination : elle diffère souvent de
            la norme française (voir aussi notre page{" "}
            <Link href="/fr/photo-visa" className="text-lime-600 hover:underline">photo visa</Link>).
          </p>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700">Pays</th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700">Couleur</th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700">Détail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bgRules.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium">{row.country}</td>
                    <td className="px-4 py-3 font-bold text-lime-600">{row.color}</td>
                    <td className="px-4 py-3 text-slate-500">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">❌ Erreurs de fond les plus fréquentes</h2>
          <div className="grid gap-3 mb-8">
            {[
              { err: "Fond blanc (pour un document français)", fix: "Choisissez un mur ou un drap gris clair ou bleu clair" },
              { err: "Ombre de la tête sur le fond", fix: "Éloignez-vous du mur d'au moins 1 m et éclairez-vous de face" },
              { err: "Fond texturé, coloré ou à motifs", fix: "Utilisez une surface lisse et unie, ou laissez l'outil remplacer le fond" },
              { err: "Objets ou meubles visibles", fix: "Dégagez complètement l'arrière-plan" },
              { err: "Reflets ou taches lumineuses", fix: "Préférez un fond mat et une lumière diffuse" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 bg-red-50/50 rounded-2xl p-4 border border-red-100/50">
                <span className="text-red-500 text-xl shrink-0">✗</span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{item.err}</h3>
                  <p className="text-xs text-slate-500 mt-1">💡 {item.fix}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-lime-50 border border-lime-200 rounded-2xl p-6 text-center mt-8">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Correction automatique du fond</h3>
            <p className="text-sm text-slate-600 mb-4">Prenez votre photo n&apos;importe où : notre outil remplace l&apos;arrière-plan par la couleur exigée (gris clair pour la France).</p>
            <Link href="/fr/passport-photo-online?type=france-passport" className="inline-flex items-center px-6 py-3 bg-lime-600 text-white rounded-xl font-bold text-sm hover:bg-lime-700 transition-all shadow-lg">
              Corriger mon arrière-plan →
            </Link>
          </div>
        </div>
      </article>
      <FaqSectionFr faqs={bgFaqs} title="Questions fréquentes — Fond de la photo d'identité" />
      <StickyCTAFr />
    </>
  );
}
