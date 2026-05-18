import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbsFr from "../../components/BreadcrumbsFr";
import FaqSectionFr from "../../components/FaqSectionFr";
import StickyCTAFr from "../../components/StickyCTAFr";

export const metadata: Metadata = {
  title: "Taille Photo Passeport : Guide Complet 2026",
  description: "Découvrez les dimensions exactes requises pour les photos passeport dans chaque pays. Guide complet avec tableaux de tailles, conseils pratiques et outil gratuit.",
  keywords: ["taille photo passeport", "dimension photo passeport", "photo 35x45", "photo 2x2 pouces", "format photo identité"],
  alternates: { canonical: "https://www.pixpassport.com/fr/guides/passport-photo-size" },
  openGraph: { title: "Taille Photo Passeport — Guide Complet | PixPassport", url: "https://www.pixpassport.com/fr/guides/passport-photo-size", locale: "fr_FR", type: "article" },
};

const sizeFaqs = [
  { q: "Quelle est la taille standard d'une photo passeport ?", a: "La taille la plus courante est 35×45mm, utilisée en France, dans l'UE et dans la majorité des pays. Les États-Unis et l'Inde utilisent 51×51mm (2×2 pouces)." },
  { q: "Quelle résolution pour une photo passeport numérique ?", a: "La résolution minimale est généralement de 300 DPI. Pour une photo 35×45mm, cela correspond à 413×531 pixels. Pour 51×51mm (US), c'est 600×600 pixels." },
  { q: "Puis-je recadrer une photo existante ?", a: "Oui, mais vous risquez de perdre en qualité. Notre outil recadre automatiquement votre photo aux bonnes dimensions tout en préservant la résolution." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", headline: "Taille Photo Passeport : Guide Complet 2026", description: "Guide des dimensions photo passeport par pays.", inLanguage: "fr", author: { "@type": "Organization", name: "PixPassport" } },
  ],
};

const sizeTable = [
  { country: "🇫🇷 France", mm: "35 × 45", px: "413 × 531", usage: "Passeport, CNI, Visa" },
  { country: "🇺🇸 États-Unis", mm: "51 × 51", px: "600 × 600", usage: "Passeport, Visa, Green Card" },
  { country: "🇬🇧 Royaume-Uni", mm: "35 × 45", px: "413 × 531", usage: "Passeport, Visa" },
  { country: "🇨🇦 Canada", mm: "35 × 45", px: "413 × 531", usage: "Passeport, Visa" },
  { country: "🇩🇪 Allemagne", mm: "35 × 45", px: "413 × 531", usage: "Passeport, Personalausweis" },
  { country: "🇮🇳 Inde", mm: "51 × 51", px: "600 × 600", usage: "Passeport, Visa, OCI" },
  { country: "🇯🇵 Japon", mm: "35 × 45", px: "413 × 531", usage: "Passeport" },
  { country: "🇨🇳 Chine", mm: "33 × 48", px: "390 × 567", usage: "Passeport, Visa" },
  { country: "🇦🇺 Australie", mm: "35 × 45", px: "413 × 531", usage: "Passeport, Visa" },
  { country: "🇧🇷 Brésil", mm: "50 × 70", px: "591 × 827", usage: "Passeport, RG" },
];

export default function PassportPhotoSizePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbsFr items={[{ label: "Guides", href: "/fr/guides" }, { label: "Taille photo passeport", href: "/fr/guides/passport-photo-size" }]} />
      <article className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">Taille Photo Passeport : Guide Complet 2026</h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">Chaque pays a ses propres exigences de dimensions pour les photos passeport. Ce guide couvre les formats les plus courants et vous aide à obtenir une photo conforme du premier coup.</p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">📏 Dimensions par pays</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700">Pays</th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700">Taille (mm)</th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700">Pixels (300 DPI)</th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700">Usage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sizeTable.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-medium">{row.country}</td>
                    <td className="px-4 py-3 font-bold text-lime-600">{row.mm}</td>
                    <td className="px-4 py-3 text-slate-500">{row.px}</td>
                    <td className="px-4 py-3 text-slate-500">{row.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">📐 Proportions et cadrage</h2>
          <p className="text-slate-600 leading-relaxed mb-4">Au-delà des dimensions extérieures, le cadrage du visage est tout aussi important :</p>
          <ul className="space-y-3 mb-8">
            {[
              "La tête doit occuper 70 à 80% de la hauteur de la photo",
              "Les yeux doivent se situer entre 56% et 69% de la hauteur depuis le bas",
              "L'espace au-dessus de la tête ne doit pas dépasser 10% de la hauteur",
              "Le visage doit être centré horizontalement",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3"><span className="w-5 h-5 bg-lime-100 rounded-full flex items-center justify-center shrink-0 mt-0.5"><span className="text-lime-600 text-xs font-bold">✓</span></span><span className="text-slate-600 text-sm">{item}</span></li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">💡 Conseils pratiques</h2>
          <div className="grid gap-4 mb-8">
            {[
              { title: "Utilisez la plus haute résolution", desc: "Réglez votre appareil photo ou téléphone sur la qualité maximale pour éviter la pixellisation lors du recadrage." },
              { title: "Ne recadrez pas vous-même", desc: "Laissez notre outil calibrer automatiquement les dimensions. Un recadrage manuel risque de ne pas respecter les proportions biométriques." },
              { title: "Vérifiez avant d'imprimer", desc: "Utilisez notre vérification de conformité gratuite pour vous assurer que votre photo sera acceptée avant de l'imprimer." },
            ].map((tip, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm mb-1">{tip.title}</h3>
                <p className="text-xs text-slate-500">{tip.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-lime-50 border border-lime-200 rounded-2xl p-6 text-center mt-12">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Créez votre photo aux bonnes dimensions</h3>
            <p className="text-sm text-slate-600 mb-4">Notre outil adapte automatiquement la taille selon le pays sélectionné.</p>
            <Link href="/fr/passport-photo-online" className="inline-flex items-center px-6 py-3 bg-lime-600 text-white rounded-xl font-bold text-sm hover:bg-lime-700 transition-all shadow-lg">
              Commencer gratuitement →
            </Link>
          </div>
        </div>
      </article>
      <FaqSectionFr faqs={sizeFaqs} title="Questions fréquentes — Taille photo passeport" />
      <StickyCTAFr />
    </>
  );
}
