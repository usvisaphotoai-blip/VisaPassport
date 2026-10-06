import type { Metadata } from "next";
import Link from "next/link";
import { getAllGermanGuides, formatGermanDate } from "@/lib/de-guides";

export const metadata: Metadata = {
  title: "Ratgeber zu Passbild, Visumfoto & Bewerbungsfoto | PixPassport",
  description:
    "Anleitungen, amtliche Vorgaben und Praxistipps rund um biometrische Passbilder, Visumfotos und Bewerbungsfotos – für Deutschland, Österreich und die Schweiz.",
  keywords: [
    "Passbild Ratgeber",
    "Biometrisches Passbild Anleitung",
    "Visum Foto Vorgaben",
    "Bewerbungsfoto Tipps",
    "Passfoto Schablone Deutschland",
  ],
  alternates: {
    canonical: "https://www.pixpassport.com/de/guides",
    languages: {
      en: "https://www.pixpassport.com/blog",
      fr: "https://www.pixpassport.com/fr/guides",
      de: "https://www.pixpassport.com/de/guides",
      "x-default": "https://www.pixpassport.com/blog",
    },
  },
  openGraph: {
    title: "Ratgeber zu Passbild, Visumfoto & Bewerbungsfoto | PixPassport",
    description: "Schritt-für-Schritt-Anleitungen und behördliche Vorgaben für Pass- und Visumfotos.",
    url: "https://www.pixpassport.com/de/guides",
    siteName: "PixPassport",
    locale: "de_DE",
    type: "website",
  },
};

export default function GermanGuidesHubPage() {
  const guides = getAllGermanGuides();
  const featuredGuide = guides[0];
  const remainingGuides = guides.slice(1);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "PixPassport Ratgeber: Passbild & Visumfoto",
    description: "Informationen und Anleitungen zu biometrischen Passbildern und Visumfotos.",
    url: "https://www.pixpassport.com/de/guides",
    isPartOf: {
      "@type": "WebSite",
      name: "PixPassport",
      url: "https://www.pixpassport.com/de",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Startseite",
          item: "https://www.pixpassport.com/de",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Ratgeber",
          item: "https://www.pixpassport.com/de/guides",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-white text-slate-900 min-h-screen pt-8 pb-24 relative">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Brotkrümelnavigation" className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8">
            <Link href="/de" className="hover:text-lime-700 transition-colors">
              Startseite
            </Link>
            <span className="text-slate-300" aria-hidden="true">/</span>
            <span className="text-slate-900 font-bold" aria-current="page">Ratgeber</span>
          </nav>

          {/* Header Hero */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-lime-50 border border-lime-200 text-lime-800 text-xs font-bold uppercase tracking-wider mb-6 ">
              <span aria-hidden="true" className="w-2 h-2 rounded-full bg-lime-600" />
              Amtliche Vorgaben &amp; Praxistipps 2026
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              Ratgeber für{" "}
              <span className="text-lime-700">
                Passbilder &amp; Visumfotos
              </span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed font-normal">
              Alles über Maße, Schablonen und behördliche Vorgaben für Deutschland, die USA und weitere Länder – plus Tipps für Ihr Bewerbungsfoto.
            </p>
          </div>

          {/* Featured Guide (Hero Card) */}
          {featuredGuide && (
            <div className="mb-16">
              <div className="group relative bg-white border-2 border-slate-200 hover:border-lime-600 rounded-xl overflow-hidden transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-lime-100 text-lime-800 px-3 py-1 rounded-md text-xs font-extrabold uppercase tracking-wide">
                        {featuredGuide.category}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                        <span aria-hidden="true">⏱️</span> {featuredGuide.readingTime}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-lime-700 transition-colors leading-snug mb-4">
                      <Link href={`/de/guides/${featuredGuide.slug}`}>
                        {featuredGuide.title}
                      </Link>
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                      {featuredGuide.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <div aria-hidden="true" className="w-10 h-10 rounded-full bg-lime-100 text-lime-800 font-black flex items-center justify-center text-sm border border-lime-200">
                        PX
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{featuredGuide.author}</p>
                        <p className="text-xs text-slate-500 font-medium"><time dateTime={featuredGuide.date}>{formatGermanDate(featuredGuide.date)}</time></p>
                      </div>
                    </div>
                    <Link
                      href={`/de/guides/${featuredGuide.slug}`}
                      aria-hidden="true"
                      tabIndex={-1}
                      className="inline-flex items-center gap-2 bg-lime-700 hover:bg-lime-800 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all"
                    >
                      Weiterlesen →
                    </Link>
                  </div>
                </div>
                <div className="lg:col-span-5 bg-slate-100 min-h-[280px] lg:min-h-full relative overflow-hidden flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featuredGuide.image}
                    alt=""
                    width={700}
                    height={560}
                    decoding="async"
                    className="w-full h-full object-cover transform "
                  />
                </div>
              </div>
            </div>
          )}

          {/* Grid of Remaining Guides */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <span aria-hidden="true" className="w-3 h-3 rounded-full bg-lime-600" />
              Weitere Ratgeber
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingGuides.map((guide) => (
                <article
                  key={guide.slug}
                  className="group bg-white border-2 border-slate-200 hover:border-lime-600 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300"
                >
                  <div>
                    <div className="h-48 overflow-hidden relative bg-slate-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={guide.image}
                        alt=""
                        width={400}
                        height={192}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover "
                      />
                      <div className="absolute top-4 left-4 bg-white border-2 border-slate-200 text-lime-800 text-xs font-bold px-3 py-1 rounded-md">
                        {guide.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mb-3">
                        <span><span aria-hidden="true">⏱️ </span>{guide.readingTime}</span>
                        <span aria-hidden="true">•</span>
                        <time dateTime={guide.date}>{formatGermanDate(guide.date)}</time>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-lime-700 transition-colors leading-snug mb-3 line-clamp-2">
                        <Link href={`/de/guides/${guide.slug}`}>{guide.title}</Link>
                      </h3>
                      <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed mb-6">
                        {guide.description}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-0">
                    <Link
                      href={`/de/guides/${guide.slug}`}
                      aria-hidden="true"
                      tabIndex={-1}
                      className="inline-flex items-center text-sm font-bold text-lime-700 hover:text-lime-800 transition-colors gap-1 group-hover:translate-x-1 duration-200"
                    >
                      Weiterlesen <span className="text-lg">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Bottom Conversion CTA Box */}
          <div className="rounded-xl border-2 border-lime-200 bg-lime-50 p-8 sm:p-12 text-slate-900 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-black mb-3">
                Bereit für Ihr Passbild?
              </h2>
              <p className="text-slate-600 font-medium text-base sm:text-lg">
                Erstellen Sie Ihr biometrisches Passbild oder Visumfoto direkt online – mit dem Smartphone, automatischer Prüfung und Geld-zurück-Garantie.
              </p>
            </div>
            <Link
              href="/de/passbild-online"
              className="bg-lime-700 hover:bg-lime-800 text-white font-bold px-6 py-3.5 rounded-lg text-base transition-all whitespace-nowrap shrink-0"
            >
              Passbild erstellen →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
