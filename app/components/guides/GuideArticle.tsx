import Link from "next/link";
import GuidePhotoTool from "./GuidePhotoTool";
import { GUIDES_BASE_PATH, GUIDES_HUB, SITE_URL, formatDate, getPublishedGuides, jsonLdScript, type GuideDetail } from "@/lib/guides";

const PROSE_CLASSES = `prose prose-sm sm:prose-base max-w-none prose-slate min-w-0 break-words
  prose-headings:text-slate-900 prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:scroll-mt-24
  prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3 prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-2
  prose-h3:text-base sm:prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2
  prose-p:text-slate-700 prose-p:leading-relaxed prose-li:text-slate-700 prose-li:my-0.5
  prose-a:text-lime-700 prose-a:font-semibold hover:prose-a:text-lime-800
  prose-strong:text-slate-900
  prose-blockquote:border-l-4 prose-blockquote:border-lime-500 prose-blockquote:bg-lime-50/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
  [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_table]:my-5 [&_table]:border-collapse
  [&_th]:bg-slate-100 [&_th]:px-2.5 [&_th]:py-2 [&_th]:text-left [&_th]:border [&_th]:border-slate-200 [&_th]:text-xs sm:[&_th]:text-sm [&_th]:whitespace-nowrap
  [&_td]:px-2.5 [&_td]:py-2 [&_td]:border [&_td]:border-slate-200 [&_td]:text-xs sm:[&_td]:text-sm
  [&_img]:rounded-lg [&_img]:mx-auto [&_img]:border [&_img]:border-slate-200`;

function TocLinks({ guide, compact = false }: { guide: GuideDetail; compact?: boolean }) {
  return (
    <nav aria-label="Table of contents" className={compact ? "mt-3 pt-3 border-t border-slate-200 space-y-1.5 text-sm" : "space-y-1.5 text-sm"}>
      {guide.toc.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`block text-slate-600 hover:text-lime-700 transition-colors leading-normal ${
            item.level === 3 ? "pl-4 text-xs" : "font-semibold"
          }`}
        >
          {item.text}
        </a>
      ))}
    </nav>
  );
}

export default function GuideArticle({ guide }: { guide: GuideDetail }) {
  const hubUrl = `${SITE_URL}${GUIDES_BASE_PATH}`;
  const relatedGuides = getPublishedGuides()
    .filter((g) => g.slug !== guide.slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${guide.url}#article`,
        headline: guide.title,
        description: guide.metaDescription,
        image: [guide.image.url],
        datePublished: guide.datePublished,
        dateModified: guide.dateModified,
        inLanguage: guide.locale,
        articleSection: guide.category,
        keywords: guide.keywords.join(", ") || undefined,
        author: { "@type": "Organization", name: guide.author, url: SITE_URL },
        publisher: {
          "@type": "Organization",
          name: "PixPassport",
          url: SITE_URL,
          logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": guide.url },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: GUIDES_HUB.label, item: hubUrl },
          { "@type": "ListItem", position: 3, name: guide.title, item: guide.url },
        ],
      },
      // FAQPage only describes Q&A that is rendered visibly below
      ...(guide.faq.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: guide.faq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

      <div className="bg-white text-slate-900 min-h-screen pt-3 sm:pt-6 pb-24 lg:pb-16 overflow-x-clip">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-4 sm:mb-6 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-lime-700 transition-colors shrink-0">Home</Link>
            <span className="text-slate-300 shrink-0" aria-hidden="true">/</span>
            <Link href={GUIDES_BASE_PATH} className="hover:text-lime-700 transition-colors shrink-0">{GUIDES_HUB.label}</Link>
            <span className="text-slate-300 shrink-0" aria-hidden="true">/</span>
            <span aria-current="page" className="text-slate-900 font-bold truncate">{guide.title}</span>
          </nav>

          {/* Mobile order: header → tool → content. Desktop: tool and TOC in a sticky right column. */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-x-10 gap-y-6">
            <header className="min-w-0 lg:col-start-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="bg-lime-50 border border-lime-200 text-lime-800 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">
                  {guide.category}
                </span>
                <span className="text-xs text-slate-500 font-semibold">{guide.readingTime}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3 break-words">
                {guide.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-3">{guide.excerpt}</p>
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
                <span>By <strong className="text-slate-800">{guide.author}</strong></span>
                <span aria-hidden="true">·</span>
                {guide.dateModified !== guide.datePublished ? (
                  <span>Updated <time dateTime={guide.dateModified} className="font-semibold text-slate-800">{formatDate(guide.dateModified)}</time></span>
                ) : (
                  <span>Published <time dateTime={guide.datePublished} className="font-semibold text-slate-800">{formatDate(guide.datePublished)}</time></span>
                )}
              </p>
            </header>

            <aside className="min-w-0 lg:col-start-2 lg:row-start-1 lg:row-span-2">
              <div className="lg:sticky lg:top-24 space-y-4">
                <GuidePhotoTool defaultDoc={guide.toolDocument} />
                {guide.toc.length > 0 && (
                  <div className="hidden lg:block rounded-xl border border-slate-200 bg-slate-50 p-4 max-h-[max(10rem,calc(100vh-31rem))] overflow-y-auto">
                    <p className="text-[11px] font-black text-slate-900 uppercase tracking-wider mb-3">On this page</p>
                    <TocLinks guide={guide} />
                  </div>
                )}
              </div>
            </aside>

            <div className="min-w-0 lg:col-start-1">
              {guide.toc.length > 0 && (
                <details className="lg:hidden mb-6 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 group">
                  <summary className="text-sm font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between gap-3">
                    On this page
                    <span aria-hidden="true" className="text-lime-700 group-open:rotate-180 transition-transform text-[10px]">▼</span>
                  </summary>
                  <TocLinks guide={guide} compact />
                </details>
              )}

              {guide.keyTakeaways.length > 0 && (
                <section aria-labelledby="key-takeaways" className="mb-8 rounded-lg border border-lime-200 bg-lime-50/60 p-4 sm:p-5">
                  <h2 id="key-takeaways" className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2.5">
                    Key takeaways
                  </h2>
                  <ul className="space-y-1.5 text-sm text-slate-700">
                    {guide.keyTakeaways.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden="true" className="text-lime-700 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <Link
                href={guide.makerCta.href}
                className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border-2 border-amber-200 bg-amber-50 p-4 sm:p-5 hover:border-amber-500 transition-colors"
              >
                <span>
                  <span className="block text-base sm:text-lg font-black text-slate-900">{guide.makerCta.title}</span>
                  <span className="block text-sm text-slate-600">{guide.makerCta.text}</span>
                </span>
                <span className="shrink-0 text-center bg-amber-700 text-white font-bold px-5 py-2.5 rounded-lg text-sm">
                  {guide.makerCta.buttonLabel}
                </span>
              </Link>

              <article className={PROSE_CLASSES} dangerouslySetInnerHTML={{ __html: guide.contentHtml }} />

              <a
                href="#photo-tool"
                className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border-2 border-lime-200 bg-lime-50 p-4 sm:p-5 hover:border-lime-500 transition-colors"
              >
                <span>
                  <span className="block text-base sm:text-lg font-black text-slate-900">{guide.cta.title}</span>
                  <span className="block text-sm text-slate-600">{guide.cta.text}</span>
                </span>
                <span className="shrink-0 text-center bg-lime-700 text-white font-bold px-5 py-2.5 rounded-lg text-sm">
                  Upload my photo ↑
                </span>
              </a>

              {guide.faq.length > 0 && (
                <section aria-labelledby="faq" className="mt-10 pt-8 border-t border-slate-200">
                  <h2 id="faq" className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                    Frequently asked questions
                  </h2>
                  <div className="divide-y divide-slate-200 border-y border-slate-200">
                    {guide.faq.map((item) => (
                      <details key={item.question} className="group py-3">
                        <summary className="cursor-pointer list-none flex items-start justify-between gap-3">
                          <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">{item.question}</h3>
                          <span aria-hidden="true" className="text-lime-700 font-bold text-lg leading-none group-open:rotate-45 transition-transform shrink-0">+</span>
                        </summary>
                        <p className="mt-2 text-sm text-slate-700 leading-relaxed">{item.answer}</p>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {guide.relatedLinks.length > 0 && (
                <section aria-labelledby="related-tools" className="mt-8">
                  <h2 id="related-tools" className="text-base font-bold text-slate-900 mb-3">Related tools &amp; pages</h2>
                  <ul className="flex flex-wrap gap-2">
                    {guide.relatedLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="inline-block border border-slate-200 hover:border-lime-600 rounded-md px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-lime-700 transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>

          {relatedGuides.length > 0 && (
            <section className="mt-12 pt-8 border-t border-slate-200">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">More guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {relatedGuides.map((rel) => (
                  <article key={rel.slug} className="relative bg-white border border-slate-200 rounded-lg p-4 hover:border-lime-600 transition-colors group">
                    <span className="text-[11px] font-bold text-lime-800 uppercase tracking-wider block mb-1">{rel.category}</span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-lime-700 transition-colors mb-1.5 line-clamp-2">
                      <Link href={`${GUIDES_BASE_PATH}/${rel.slug}`} className="after:absolute after:inset-0">{rel.title}</Link>
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">{rel.excerpt}</p>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
