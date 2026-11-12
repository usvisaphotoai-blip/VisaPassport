import type { Metadata } from "next";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { BASE_URL, REGIONS, monthYear, type RegionalPage } from "@/lib/regional-content";
import { guideToolDocs } from "@/lib/guide-tool-docs";
import SpecTable from "./SpecTable";
import SpecDiagram from "./SpecDiagram";
import UscisFormTable from "./UscisFormTable";
import GuideEmbeddedTool from "./GuideEmbeddedTool";
import { FaqList, OfficialSources, QuickAnswer, RelatedPages, plainText } from "./GuideBlocks";

/** Markdown places data-driven blocks with a paragraph of its own: {{block:specTable}} */
const BLOCK_MARKER = /<p>\{\{block:([A-Za-z]+)\}\}<\/p>/;

function renderBlock(name: string, specId: string | undefined, lang: string) {
  switch (name) {
    case "specTable":
      if (!specId) throw new Error("{{block:specTable}} needs a `spec` in frontmatter");
      return <SpecTable specId={specId} lang={lang} />;
    case "specDiagram":
      if (!specId) throw new Error("{{block:specDiagram}} needs a `spec` in frontmatter");
      return <SpecDiagram specId={specId} />;
    case "uscisFormTable":
      return <UscisFormTable />;
    default:
      throw new Error(`Unknown content block {{block:${name}}}`);
  }
}

/** Splits rendered Markdown at block markers: ["<html>", "blockName", "<html>", …] */
function splitBlocks(html: string): string[] {
  return html.split(new RegExp(BLOCK_MARKER.source, "g"));
}

export function regionalMetadata(page: RegionalPage): Metadata {
  const region = REGIONS[page.region];
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: {
      canonical: page.url,
      languages: { [region.lang]: page.url, "x-default": page.url },
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: page.url,
      siteName: "PixPassport",
      locale: region.ogLocale,
      type: "article",
      publishedTime: page.date,
      modifiedTime: page.updatedAt,
      images: [{ url: page.image, alt: page.imageAlt || page.h1 }],
    },
    twitter: { card: "summary_large_image", title: page.title, description: page.description, images: [page.image] },
  };
}

const toJsonLd = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");

export default function RegionalGuidePage({ page }: { page: RegionalPage }) {
  const region = REGIONS[page.region];
  const hubUrl = `${BASE_URL}/${region.code}`;
  const lastVerifiedLabel = page.lastVerified ? monthYear(page.lastVerified, region.lang) : undefined;

  const schemas: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: page.h1,
      description: page.description,
      image: page.image,
      inLanguage: region.lang,
      datePublished: page.date,
      dateModified: page.updatedAt,
      author: { "@type": "Organization", name: page.author, url: `${BASE_URL}/` },
      publisher: { "@type": "Organization", name: "PixPassport", logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png` } },
      mainEntityOfPage: page.url,
      ...(page.officialSources.length && { citation: page.officialSources.map((s) => s.url) }),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
        { "@type": "ListItem", position: 2, name: region.name, item: hubUrl },
        { "@type": "ListItem", position: 3, name: page.breadcrumbLabel, item: page.url },
      ],
    },
  ];
  if (page.faq.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: plainText(f.answer) } })),
    });
  }

  const parts = splitBlocks(page.contentHtml);
  const docs = page.tool ? guideToolDocs(page.region) : [];

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(s) }} />
      ))}

      <div className="bg-white border-b border-slate-200">
        <Breadcrumbs
          items={[
            { label: region.name, href: `/${region.code}` },
            { label: page.breadcrumbLabel, href: `/${region.code}/${page.slug}` },
          ]}
        />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 overflow-x-clip">
        <header>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">{page.h1}</h1>
          {page.intro && <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">{page.intro}</p>}
          <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-slate-500">
            {lastVerifiedLabel && (
              <span>
                Last verified: <time dateTime={page.lastVerified}>{lastVerifiedLabel}</time>
              </span>
            )}
            <span>
              Updated <time dateTime={page.updatedAt}>{monthYear(page.updatedAt, region.lang)}</time>
            </span>
            <span>By {page.author}</span>
          </p>
        </header>

        <div className="mt-8">
          <QuickAnswer items={page.quickAnswer} />
        </div>

        {page.tool && docs.length > 0 && (
          <div id="tool" className="mt-8 scroll-mt-24">
            <GuideEmbeddedTool docs={docs} defaultDoc={page.tool.doc} from={region.code} title={page.tool.title} subtitle={page.tool.subtitle} />
          </div>
        )}

        <article className="prose prose-slate prose-premium mt-10 max-w-none prose-headings:font-black prose-a:text-lime-800">
          {parts.map((part, i) =>
            i % 2 === 1 ? <div key={i}>{renderBlock(part, page.spec, region.lang)}</div> : part.trim() && <div key={i} dangerouslySetInnerHTML={{ __html: part }} />
          )}
        </article>

        <FaqList items={page.faq} />
        <OfficialSources sources={page.officialSources} lastVerified={page.lastVerified} lastVerifiedLabel={lastVerifiedLabel} />
        <RelatedPages links={page.related} />
      </div>
    </div>
  );
}
