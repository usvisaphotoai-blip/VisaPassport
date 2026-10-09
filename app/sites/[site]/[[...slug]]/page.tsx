import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  SITE_BASE_URL,
  filterPublishedLinks,
  flagEmoji,
  getAllCountryDocuments,
  getBreadcrumbs,
  getChildPages,
  getSiteCodes,
  getSiteConfig,
  getSitePage,
  getSitePages,
  isPublished,
  pagePath,
  type SitePageMeta,
} from "@/lib/country-sites";
import SiteEmbeddedTool from "../../components/SiteEmbeddedTool";
import SiteBeforeAfterSlider from "../../components/SiteBeforeAfterSlider";

interface PageProps {
  params: Promise<{ site: string; slug?: string[] }>;
}

// Unknown slugs must reach load() → notFound() so [site]/not-found.tsx renders inside the
// section layout; with dynamicParams = false they 404 before it and lose the navbar/footer.
export const dynamicParams = true;

export function generateStaticParams() {
  return getSiteCodes().flatMap((site) =>
    getSitePages(site).map((p) => ({ site, slug: p.slug ? p.slug.split("/") : [] }))
  );
}

async function load(params: PageProps["params"]) {
  const { site: code, slug } = await params;
  const site = getSiteConfig(code);
  const page = site ? getSitePage(code, (slug || []).join("/")) : null;
  return site && page ? { site, page } : null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = await load(params);
  if (!data) return {};
  const { site, page } = data;
  const image = page.image?.src || site.defaultImage;
  const imageAlt = page.image?.alt || page.h1;

  return {
    title: page.title,
    description: page.description,
    ...(isPublished(page) ? {} : { robots: { index: false, follow: true } }),
    alternates: {
      canonical: page.url,
      languages: { [site.lang]: page.url },
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: page.url,
      siteName: site.siteName,
      locale: site.ogLocale,
      type: page.type === "guide" ? "article" : "website",
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [image],
    },
  };
}

function PageCards({ pages, readMore }: { pages: SitePageMeta[]; readMore: string }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {pages.map((p) => (
        <li key={p.slug}>
          <Link
            href={pagePath(p.site, p.slug)}
            className="group block h-full bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-lime-500 hover:shadow-md transition-all"
          >
            <h3 className="text-base font-black text-slate-900 group-hover:text-lime-700 transition-colors">{p.breadcrumbLabel}</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{p.description}</p>
            <span className="mt-3 inline-block text-sm font-bold text-lime-700">{readMore} →</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default async function SitePageRoute({ params }: PageProps) {
  const data = await load(params);
  if (!data) notFound();
  const { site, page } = data;
  const { ui } = site;

  const all = getSitePages(site.code);
  const crumbs = getBreadcrumbs(site, page, all);
  // Draft pages are never linked: no cards, no related entries
  const published = all.filter(isPublished);
  const children =
    page.type === "home" || page.type === "hub" ? getChildPages(page, published).filter((p) => p.type !== "legal") : [];
  const related = page.related
    .map((slug) => published.find((p) => p.slug === slug))
    .filter((p): p is SitePageMeta => !!p);
  // Every page gets the tool, preset to the page's document or the section's first one
  const toolDocuments = site.tool.documents.map((d) => ({ ...d, flag: d.flag || flagEmoji(d.countryCode) }));
  const countryDocuments = await getAllCountryDocuments(site);
  const defaultDoc =
    (page.tool && toolDocuments.find((d) => d.id === page.tool!.doc)?.id) || toolDocuments[0]?.id || countryDocuments[0]?.id;
  // Legal/trust pages (about, contact, privacy, terms) are plain documents: no tool, badge or hero visual
  const isLegal = page.type === "legal";
  const hasTool = !isLegal && !!defaultDoc;

  const schemas: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.label,
        item: `${SITE_BASE_URL}${c.href}`,
      })),
    },
    page.type === "guide"
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: page.h1,
          description: page.description,
          inLanguage: site.lang,
          datePublished: page.date,
          dateModified: page.updatedAt || page.date,
          author: { "@type": "Organization", name: page.author },
          publisher: { "@type": "Organization", name: "PixPassport", url: SITE_BASE_URL },
          mainEntityOfPage: page.url,
          ...(page.image?.src ? { image: page.image.src } : {}),
        }
      : {
          "@context": "https://schema.org",
          "@type": page.type === "home" ? "WebSite" : "WebPage",
          name: page.h1,
          description: page.description,
          url: page.url,
          inLanguage: site.lang,
          publisher: { "@type": "Organization", name: "PixPassport", url: SITE_BASE_URL },
        },
  ];
  if (page.faq.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: site.lang,
      mainEntity: page.faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  const pageCta = page.cta && filterPublishedLinks(site, [page.cta], new Set(published.map((p) => pagePath(site.code, p.slug))))[0];
  const primaryCta = hasTool ? { label: ui.heroToolCta, href: "#tool" } : pageCta;
  const secondaryCta = hasTool ? pageCta : undefined;
  const badge = isLegal ? undefined : page.badge || ui.heroBadge;
  const showToc = page.toc.length > 0;

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <div className="h-1 bg-lime-700 w-full" />

      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className="bg-white border-b border-slate-200">
        <nav aria-label={ui.breadcrumbLabel} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-slate-500">
            {crumbs.map((c, i) => (
              <li key={c.href} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {i === crumbs.length - 1 ? (
                  <span aria-current="page" className="text-slate-900">
                    {c.label}
                  </span>
                ) : (
                  <Link href={c.href} className="hover:text-lime-700">
                    {c.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <header className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="flex-1 w-full text-left">
              {badge && (
                <p className="inline-flex items-center gap-2 bg-lime-50 border border-lime-200 rounded-full px-3 py-1 mb-4">
                  <span aria-hidden="true" className="w-2 h-2 rounded-full bg-lime-600 animate-pulse" />
                  <span className="text-xs font-extrabold text-lime-800 tracking-wide uppercase">{badge}</span>
                </p>
              )}

              <h1 className="text-3xl sm:text-4xl font-black text-slate-800 leading-tight tracking-tight mb-3">{page.h1}</h1>

              {(page.intro || page.description) && (
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-7 max-w-lg">{page.intro || page.description}</p>
              )}

              {(primaryCta || secondaryCta) && (
                <div className="flex flex-col sm:flex-row gap-3.5 mb-7">
                  {primaryCta && (
                    <Link
                      href={primaryCta.href}
                      className="inline-flex items-center justify-center bg-lime-700 hover:bg-lime-800 text-white text-sm sm:text-base font-bold px-4 py-3 transition-all active:scale-95 gap-2"
                    >
                      {primaryCta.label}
                    </Link>
                  )}
                  {secondaryCta && (
                    <Link
                      href={secondaryCta.href}
                      className="inline-flex items-center justify-center bg-white border-2 border-slate-300 hover:border-lime-600 hover:text-lime-700 text-slate-800 text-sm sm:text-base font-bold px-4 py-3 transition-all active:scale-95 gap-2"
                    >
                      {secondaryCta.label}
                    </Link>
                  )}
                </div>
              )}

              <p className="flex flex-wrap gap-3 text-xs font-semibold text-slate-500 mt-5">
                <span className="bg-slate-100 px-3 py-1 rounded-full">
                  {ui.by} {page.author}
                </span>
                <span className="bg-slate-100 px-3 py-1 rounded-full">
                  {ui.updated}{" "}
                  <time dateTime={page.updatedAt || page.date}>
                    {new Date(page.updatedAt || page.date).toLocaleDateString(site.lang, { timeZone: "UTC" })}
                  </time>
                </span>
                {page.readingTime && <span className="bg-slate-100 px-3 py-1 rounded-full">{page.readingTime}</span>}
              </p>
            </div>

            {!isLegal && (
            <div className="w-full lg:w-auto flex justify-center">
              {page.image?.src ? (
                <img
                  src={page.image.src}
                  alt={page.image.alt}
                  width={330}
                  height={424}
                  fetchPriority="high"
                  className="w-full max-w-[330px] rounded-sm border border-slate-200 bg-white object-cover"
                />
              ) : (
                <SiteBeforeAfterSlider
                  before={site.heroSlider?.before}
                  after={site.heroSlider?.after}
                  aspect={site.heroSlider?.aspect}
                  flag={site.flag}
                  labels={{
                    title: ui.sliderTitle,
                    before: ui.sliderBefore,
                    after: ui.sliderAfter,
                    hint: ui.sliderHint,
                    caption: ui.sliderCaption,
                  }}
                />
              )}
            </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {hasTool && (
          <div id="tool" className="max-w-7xl mx-auto px-1 sm:px-2 lg:px-4 py-2 scroll-mt-24">
            <SiteEmbeddedTool
              key={defaultDoc}
              siteCode={site.code}
              documents={toolDocuments}
              countries={countryDocuments}
              defaultDoc={defaultDoc}
              trust={site.tool.trust}
              title={page.tool?.title}
              subtitle={page.tool?.subtitle}
              ui={ui}
            />
          </div>
        )}

        {children.length > 0 && (
          <section aria-labelledby="sections" className="mt-12 max-w-6xl mx-auto">
            <h2 id="sections" className="text-2xl font-black text-slate-900 mb-5">
              {page.type === "home" ? ui.homeSectionsHeading : ui.hubListHeading}
            </h2>
            <PageCards pages={children} readMore={ui.readMore} />
          </section>
        )}

        <div className="mt-12 max-w-6xl mx-auto grid lg:grid-cols-4 gap-8">
          {showToc && (
            <aside className="lg:col-span-1 hidden lg:block">
              <div className="sticky top-24 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <nav aria-label={ui.onThisPage}>
                  <p className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">{ui.onThisPage}</p>
                  <ul className="space-y-2 text-xs font-semibold">
                    {page.toc.map((item) => (
                      <li key={item.id} className={item.level === 3 ? "pl-3 border-l border-slate-200" : ""}>
                        <a href={`#${item.id}`} className="block text-slate-600 hover:text-lime-700 transition-colors">
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                {site.tool.trust.length > 0 && (
                  <ul className="mt-6 pt-4 border-t border-slate-100 text-[11px] space-y-2">
                    {site.tool.trust.map((t) => (
                      <li key={t} className="flex items-center gap-1.5 text-lime-700 font-bold">
                        <span aria-hidden="true">✅</span> {t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </aside>
          )}

          <div className={showToc ? "min-w-0 lg:col-span-3" : "min-w-0 lg:col-span-4"}>
            <article className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-xs prose prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-a:text-lime-700 prose-a:font-bold prose-img:rounded-xl">
              <div className="rich-content" dangerouslySetInnerHTML={{ __html: page.contentHtml }} />
            </article>

            {(page.officialSources.length > 0 || page.lastVerified) && (
              <section aria-labelledby="sources" className="mt-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-sm">
                <h2 id="sources" className="text-base font-black text-slate-900 mb-3">
                  {ui.sourcesHeading}
                </h2>
                {page.officialSources.length > 0 && (
                  <ul className="space-y-1 list-disc pl-5 text-slate-700">
                    {page.officialSources.map((s) => (
                      <li key={s.url}>
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-bold text-lime-700 hover:underline">
                          {s.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                {page.lastVerified && (
                  <p className="mt-3 text-slate-600">
                    {ui.sourcesChecked}{" "}
                    <time dateTime={page.lastVerified}>
                      {new Date(page.lastVerified).toLocaleDateString(site.lang, { timeZone: "UTC" })}
                    </time>
                  </p>
                )}
              </section>
            )}

            {page.faq.length > 0 && (
              <section aria-labelledby="faq" className="mt-10 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 mb-6">
                  <span aria-hidden="true" className="text-xl">
                    ❓
                  </span>
                  <h2 id="faq" className="text-2xl font-black text-slate-900">
                    {ui.faqHeading}
                  </h2>
                </div>
                <div className="divide-y divide-slate-100">
                  {page.faq.map((item) => (
                    <details key={item.question} className="group py-4">
                      <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-slate-900 list-none">
                        <h3 className="text-base sm:text-lg">{item.question}</h3>
                        <span aria-hidden="true" className="ml-4 text-lime-700 text-xl group-open:rotate-45 transition-transform">
                          +
                        </span>
                      </summary>
                      <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {related.length > 0 && (
              <section aria-labelledby="related" className="mt-10">
                <h2 id="related" className="text-2xl font-black text-slate-900 mb-5">
                  {ui.relatedHeading}
                </h2>
                <PageCards pages={related} readMore={ui.readMore} />
              </section>
            )}

            {page.type !== "home" && ui.backLink && (
              <div className="mt-10 text-center">
                <Link
                  href={site.basePath}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-extrabold text-slate-800 hover:border-lime-500 hover:text-lime-700 transition-all shadow-xs"
                >
                  ← {ui.backLink}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
