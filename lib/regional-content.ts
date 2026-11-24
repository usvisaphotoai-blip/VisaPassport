import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { resolveSpecTokens, type OfficialSource } from "./document-specs";

/**
 * Markdown guide pages for the regional sections (/us, /in): content/<region>/<file>.md.
 * One loader for every region, so a new region needs a config entry and a content folder, not a new lib.
 *
 * Frontmatter (all strings unless noted):
 *   title, description, slug, h1, intro, breadcrumbLabel, date, updatedAt, lastVerified (YYYY-MM-DD)
 *   spec            → id in lib/document-specs.ts; renders the spec table and resolves {{spec.<id>.<key>}} tokens
 *   quickAnswer     → string[] (3–5 bullets, tokens allowed)
 *   officialSources → [{ label, url, edition? }]
 *   related         → [{ href, label, desc? }] (3–5 contextual links)
 *   faq             → [{ question, answer }] (visible accordion + FAQPage schema; tokens allowed)
 *   tool            → { doc, title?, subtitle? } embeds the photo tool preset to `doc`
 *   draft           → boolean; drafts are not routed or listed
 */

export interface RegionConfig {
  code: string;
  /** BCP 47 tag for <html lang>, hreflang, og:locale and schema inLanguage */
  lang: string;
  ogLocale: string;
  name: string;
  hubTitle: string;
  hubDescription: string;
  author: string;
  defaultImage: string;
  /** Alt text for defaultImage, used when a page sets no imageAlt */
  defaultImageAlt?: string;
}

export const REGIONS: Record<string, RegionConfig> = {
  us: {
    code: "us",
    lang: "en-US",
    ogLocale: "en_US",
    name: "United States",
    hubTitle: "US Passport, Visa & USCIS Photo Requirements",
    hubDescription: "Photo rules for U.S. passports, green cards, work permits and other USCIS forms, checked against the official instructions.",
    author: "PixPassport US Team",
    defaultImage: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1790578095/us_passport_size_phoro_novzyr.webp",
    defaultImageAlt: "Example 2 x 2 inch (51 x 51 mm) photo on a white background, with the head height of 1 to 1 3/8 inches (25-35 mm) marked from chin to top of head",
  },
  in: {
    code: "in",
    lang: "en-IN",
    ogLocale: "en_IN",
    name: "India",
    hubTitle: "Indian Document Photo Sizes: PAN, OCI, Aadhaar & Exams",
    hubDescription: "Photo and signature sizes for Indian documents and exam forms, checked against the official portals.",
    author: "PixPassport India Team",
    defaultImage: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_visa_photo_example_whvfqt.jpg",
  },
};

export interface FaqItem {
  question: string;
  answer: string;
}
export interface RelatedLink {
  href: string;
  label: string;
  desc?: string;
}
export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface RegionalPageMeta {
  region: string;
  slug: string;
  url: string;
  title: string;
  description: string;
  h1: string;
  intro?: string;
  breadcrumbLabel: string;
  date: string;
  updatedAt: string;
  lastVerified?: string;
  author: string;
  image: string;
  imageAlt?: string;
  spec?: string;
  quickAnswer: string[];
  officialSources: OfficialSource[];
  related: RelatedLink[];
  faq: FaqItem[];
  tool?: { doc: string; title?: string; subtitle?: string };
}

export interface RegionalPage extends RegionalPageMeta {
  contentHtml: string;
  toc: TocItem[];
}

export const BASE_URL = "https://www.pixpassport.com";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/&[a-z#0-9]+;/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractToc(markdown: string): TocItem[] {
  const toc: TocItem[] = [];
  for (const m of markdown.matchAll(/^(#{2,3})\s+(.+)$/gm)) {
    const text = m[2].replace(/[*_~`]/g, "").trim();
    toc.push({ id: slugify(text), text, level: m[1].length });
  }
  return toc;
}

function compile(markdown: string): string {
  const renderer = new marked.Renderer();
  renderer.heading = function ({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    // The template renders the only <h1>; body headings start at ##
    const level = Math.max(depth, 2);
    const id = slugify(text);
    return `<h${level} id="${id}" class="scroll-mt-24">${text}</h${level}>\n`;
  };
  // Tables scroll sideways on narrow screens instead of widening the page
  renderer.table = function (token) {
    const html = marked.Renderer.prototype.table.call(this, token);
    return `<div class="table-wrapper">${html}</div>\n`;
  };
  return marked(markdown, { renderer }) as string;
}

const dirFor = (region: string) => path.join(process.cwd(), "content", region);

const iso = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : v ? String(v).slice(0, 10) : "");

function readFiles(region: string): { file: string; data: Record<string, any>; content: string }[] {
  const dir = dirFor(region);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
      return { file, data, content };
    })
    .filter(({ data }) => data.draft !== true);
}

function toMeta(region: string, file: string, data: Record<string, any>): RegionalPageMeta {
  const config = REGIONS[region];
  const slug = data.slug || file.replace(/\.md$/, "");
  const t = (s: string) => resolveSpecTokens(s);
  if (!data.title || !data.description || !data.h1) {
    throw new Error(`content/${region}/${file}: title, description and h1 are required`);
  }
  return {
    region,
    slug,
    url: `${BASE_URL}/${region}/${slug}`,
    title: data.title,
    description: data.description,
    h1: data.h1,
    intro: data.intro ? t(data.intro) : undefined,
    breadcrumbLabel: data.breadcrumbLabel || data.h1,
    date: iso(data.date),
    updatedAt: iso(data.updatedAt || data.date),
    lastVerified: data.lastVerified ? iso(data.lastVerified) : undefined,
    author: data.author || config.author,
    image: data.image || config.defaultImage,
    imageAlt: data.imageAlt || (data.image ? undefined : config.defaultImageAlt),
    spec: data.spec,
    quickAnswer: (data.quickAnswer || []).map(t),
    officialSources: data.officialSources || [],
    related: data.related || [],
    faq: (data.faq || []).map((f: FaqItem) => ({ question: t(f.question), answer: t(f.answer) })),
    tool: data.tool,
  };
}

export function getRegionalPages(region: string): RegionalPageMeta[] {
  return readFiles(region)
    .map(({ file, data }) => toMeta(region, file, data))
    .sort((a, b) => a.breadcrumbLabel.localeCompare(b.breadcrumbLabel));
}

export function getRegionalPage(region: string, slug: string): RegionalPage | null {
  const match = readFiles(region).find(({ file, data }) => (data.slug || file.replace(/\.md$/, "")) === slug);
  if (!match) return null;
  const meta = toMeta(region, match.file, match.data);
  const body = resolveSpecTokens(match.content);
  return { ...meta, contentHtml: compile(body), toc: extractToc(body) };
}

/** Typographic dates for the visible "Last verified" line: 2026-11-12 → "November 2026" */
export function monthYear(isoDate: string, lang = "en-US"): string {
  const d = new Date(`${isoDate}T12:00:00Z`);
  return d.toLocaleDateString(lang, { month: "long", year: "numeric", timeZone: "UTC" });
}
