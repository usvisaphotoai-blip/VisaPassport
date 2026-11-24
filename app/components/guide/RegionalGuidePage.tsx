import type { Metadata } from "next";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { BASE_URL, REGIONS, monthYear, type RegionalPage } from "@/lib/regional-content";
import { guideToolDocs } from "@/lib/guide-tool-docs";
import SpecTable from "./SpecTable";
import SpecDiagram from "./SpecDiagram";
import UscisFormTable from "./UscisFormTable";
import GuideEmbeddedTool from "./GuideEmbeddedTool";
import RegionalHero from "./RegionalHero";
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
  const tool = docs.length > 0 ? page.tool : undefined;

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

      <RegionalHero
        badge={tool ? "Free Photo Check" : "Photo Requirements"}
        secondaryBadge={`Updated ${monthYear(page.updatedAt, region.lang)}`}
        h1={page.h1}
        intro={page.intro}
        cta={{ href: "/passport-photo-online", label: "Upload Your Photo Now" }}
        image={page.image}
        imageAlt={page.imageAlt || page.h1}
        meta={
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            {lastVerifiedLabel && (
              <span>
                Last verified: <time dateTime={page.lastVerified}>{lastVerifiedLabel}</time>
              </span>
            )}
            <span>By {page.author}</span>
          </p>
        }
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 overflow-x-clip">
        <div>
          <QuickAnswer items={page.quickAnswer} />
        </div>

        {tool && (
          <div id="tool" className="mt-8 scroll-mt-24">
            <GuideEmbeddedTool docs={docs} defaultDoc={tool.doc} from={region.code} title={tool.title} subtitle={tool.subtitle} />
          </div>
        )}

        <article className="prose prose-slate prose-premium mt-10 max-w-none prose-headings:font-black prose-a:text-lime-800">
          {parts.map((part, i) =>
            i % 2 === 1 ? <div key={i}>{renderBlock(part, page.spec, region.lang)}</div> : part.trim() && <div key={i} dangerouslySetInnerHTML={{ __html: part }} />
          )}
        </article>

        {tool && (
          <a
            href="#tool"
            className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border-2 border-lime-200 bg-lime-50 p-4 sm:p-5 hover:border-lime-500 transition-colors"
          >
            <span>
              <span className="block text-base sm:text-lg font-black text-slate-900">{tool.title}</span>
              {tool.subtitle && <span className="block text-sm text-slate-600">{tool.subtitle}</span>}
            </span>
            <span className="shrink-0 text-center bg-lime-700 text-white font-bold px-5 py-2.5 rounded-lg text-sm">Upload my photo ↑</span>
          </a>
        )}

        <FaqList items={page.faq} />
        <OfficialSources sources={page.officialSources} lastVerified={page.lastVerified} lastVerifiedLabel={lastVerifiedLabel} />
        <RelatedPages links={page.related} />
      </div>
    </div>
  );
}
