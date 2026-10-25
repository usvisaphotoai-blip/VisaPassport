import Link from "next/link";
import GuidePhotoTool from "./GuidePhotoTool";
import { GUIDES_BASE_PATH, GUIDES_HUB, SITE_URL, formatDate, getPublishedGuides, jsonLdScript } from "@/lib/guides";

export default function GuideHub() {
  const guides = getPublishedGuides();
  const hubUrl = `${SITE_URL}${GUIDES_BASE_PATH}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${hubUrl}#webpage`,
        url: hubUrl,
        name: GUIDES_HUB.title,
        description: GUIDES_HUB.description,
        inLanguage: "en",
        isPartOf: { "@type": "WebSite", name: "PixPassport", url: SITE_URL },
        breadcrumb: { "@id": `${hubUrl}#breadcrumb` },
        mainEntity: { "@id": `${hubUrl}#itemlist` },
      },
      {
        "@type": "ItemList",
        "@id": `${hubUrl}#itemlist`,
        itemListElement: guides.map((guide, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: guide.url,
          name: guide.title,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${hubUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: GUIDES_HUB.label, item: hubUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

      <div className="bg-white text-slate-900 min-h-screen pt-3 sm:pt-6 pb-24 lg:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-4 sm:mb-6">
            <Link href="/" className="hover:text-lime-700 transition-colors">
              Home
            </Link>
            <span className="text-slate-300" aria-hidden="true">/</span>
            <span className="text-slate-900 font-bold" aria-current="page">{GUIDES_HUB.label}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-6 lg:gap-10 items-start mb-10 sm:mb-12">
            <header className="lg:pt-6">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-lime-50 border border-lime-200 text-lime-800 text-[11px] font-bold uppercase tracking-wider mb-3">
                <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-lime-600" />
                {GUIDES_HUB.eyebrow}
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
                {GUIDES_HUB.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">{GUIDES_HUB.description}</p>
              <ul className="mt-4 hidden sm:flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-semibold text-slate-600">
                <li>✓ Official sizes for 70+ documents</li>
                <li>✓ Take it at home with your phone</li>
                <li>✓ Automatic compliance check</li>
              </ul>
            </header>
            <GuidePhotoTool />
          </div>

          <section aria-labelledby="all-guides">
            <h2 id="all-guides" className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
              All guides <span className="text-sm font-semibold text-slate-400">({guides.length})</span>
            </h2>

            {guides.length === 0 ? (
              <p className="text-sm text-slate-500">New guides are on the way. Check back soon.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {guides.map((guide, i) => (
                  <article
                    key={guide.slug}
                    className={`group relative flex gap-3 sm:gap-4 rounded-lg border border-slate-200 bg-white p-3 hover:border-lime-600 hover:shadow-sm transition-all ${
                      i === 0 && guides.length > 1 ? "md:col-span-2" : ""
                    }`}
                  >
                    <div className={`shrink-0 overflow-hidden rounded-md bg-slate-100 ${i === 0 ? "w-24 h-24 sm:w-48 sm:h-32" : "w-24 h-24 sm:w-32 sm:h-24"}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={guide.image.url}
                        alt=""
                        width={384}
                        height={256}
                        loading={i === 0 ? "eager" : "lazy"}
                        decoding="async"
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="min-w-0 flex-1 flex flex-col">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] font-semibold text-slate-500 mb-1">
                        <span className="font-bold uppercase tracking-wider text-lime-800">{guide.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{guide.readingTime}</span>
                        <span aria-hidden="true" className="hidden sm:inline">·</span>
                        <time dateTime={guide.dateModified} className="hidden sm:inline">{formatDate(guide.dateModified)}</time>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-lime-700 transition-colors leading-snug line-clamp-2 mb-1">
                        <Link href={`${GUIDES_BASE_PATH}/${guide.slug}`} className="after:absolute after:inset-0">
                          {guide.title}
                        </Link>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">{guide.excerpt}</p>
                      <span aria-hidden="true" className="mt-auto pt-1.5 text-xs font-bold text-lime-700">Read guide →</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
