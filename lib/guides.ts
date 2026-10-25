import fs from "fs";
import path from "path";
import { Marked } from "marked";
import type { Metadata } from "next";

/**
 * File-driven English guides at /guides/<slug>, one JSON file per guide: data/guides/<slug>.json
 *
 * Adding a file is all it takes: the page is statically generated, listed on the /guides hub
 * and added to public/sitemap.xml by scripts/fix-lang.mjs at postbuild. Set "draft": true to keep
 * a guide off the hub and sitemap and mark it noindex.
 */

export const SITE_URL = "https://www.pixpassport.com";
export const GUIDES_BASE_PATH = "/guides";
export const GUIDES_HUB = {
  label: "Guides",
  title: "Passport & Visa Photo Guides",
  metaTitle: "Passport & Visa Photo Guides | PixPassport",
  description:
    "Step-by-step guides to passport and visa photo sizes, official requirements, and how to take and print a compliant photo at home.",
  eyebrow: "Official requirements & how-tos",
};

const GUIDES_DIR = path.join(process.cwd(), "data/guides");
const DEFAULT_IMAGE =
  "https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg";
const WORDS_PER_MINUTE = 200;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
// Ids of the headings GuideArticle renders itself; content headings must not reuse them
const RESERVED_IDS = ["key-takeaways", "faq", "related-tools"];

export interface GuideFaq {
  question: string;
  answer: string;
}

export interface GuideTocItem {
  id: string;
  text: string;
  level: number;
}

export interface GuideImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface GuideCta {
  title: string;
  text: string;
  buttonLabel: string;
  href: string;
}

export interface GuideLink {
  label: string;
  href: string;
}

export interface GuideMeta {
  slug: string;
  url: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  keywords: string[];
  category: string;
  author: string;
  datePublished: string;
  dateModified: string;
  readingTime: string;
  image: GuideImage;
  draft: boolean;
  featured: boolean;
}

export interface GuideDetail extends GuideMeta {
  contentHtml: string;
  toc: GuideTocItem[];
  keyTakeaways: string[];
  faq: GuideFaq[];
  cta: GuideCta;
  relatedLinks: GuideLink[];
  /** Document id preselected in the embedded photo tool, e.g. "uk-passport" */
  toolDocument?: string;
}

/** Markdown may be written as one string or as an array of paragraphs/lines (easier to edit in JSON). */
type MarkdownText = string | string[];

interface GuideSectionInput {
  heading: string;
  content?: MarkdownText;
  subsections?: { heading: string; content?: MarkdownText }[];
}

/** Shape of data/guides/<slug>.json. title, metaDescription and datePublished are required. */
interface GuideInput {
  title?: string;
  metaTitle?: string;
  metaDescription?: string;
  excerpt?: string;
  keywords?: string[];
  category?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
  image?: Partial<GuideImage> | string;
  draft?: boolean;
  featured?: boolean;
  intro?: MarkdownText;
  sections?: GuideSectionInput[];
  keyTakeaways?: string[];
  faq?: GuideFaq[];
  cta?: Partial<GuideCta>;
  relatedLinks?: GuideLink[];
  toolDocument?: string;
}

const DEFAULT_CTA: GuideCta = {
  title: "Make your passport photo online",
  text: "Upload a selfie and get a compliant passport or visa photo in seconds, checked against official rules.",
  buttonLabel: "Create my photo →",
  href: "/passport-photo-online",
};

function toMarkdown(text: MarkdownText | undefined): string {
  if (!text) return "";
  return Array.isArray(text) ? text.join("\n\n") : text;
}

function sectionsToMarkdown(input: GuideInput): string {
  const parts = [toMarkdown(input.intro)];
  for (const section of input.sections ?? []) {
    parts.push(`## ${section.heading}`, toMarkdown(section.content));
    for (const sub of section.subsections ?? []) {
      parts.push(`### ${sub.heading}`, toMarkdown(sub.content));
    }
  }
  return parts.filter(Boolean).join("\n\n");
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** marked escapes text as HTML entities; the TOC is rendered by React, which escapes again. */
function decodeEntities(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

/** Renders markdown, giving every h2/h3 a unique anchor id and collecting them for the table of contents. */
function renderMarkdown(markdown: string): { html: string; toc: GuideTocItem[] } {
  const toc: GuideTocItem[] = [];
  const usedIds = new Map<string, number>(RESERVED_IDS.map((id) => [id, 1]));

  const md = new Marked({
    gfm: true,
    renderer: {
      heading({ tokens, depth }) {
        const html = this.parser.parseInline(tokens);
        if (depth !== 2 && depth !== 3) return `<h${depth}>${html}</h${depth}>\n`;
        const text = decodeEntities(html).trim();
        const base = slugify(text) || "section";
        const count = usedIds.get(base) ?? 0;
        usedIds.set(base, count + 1);
        const id = count ? `${base}-${count + 1}` : base;
        toc.push({ id, text, level: depth });
        return `<h${depth} id="${id}" class="scroll-mt-24">${html}</h${depth}>\n`;
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const external = /^https?:\/\//.test(href) && !href.startsWith(SITE_URL);
        const titleAttr = title ? ` title="${escapeAttr(title)}"` : "";
        const rel = external ? ` target="_blank" rel="noopener noreferrer"` : "";
        return `<a href="${escapeAttr(href)}"${titleAttr}${rel}>${text}</a>`;
      },
    },
  });

  return { html: md.parse(markdown) as string, toc };
}

function readingTime(markdown: string): string {
  const words = markdown.replace(/[#>*_`|\-[\]()]/g, " ").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min read`;
}

function normalizeImage(image: GuideInput["image"], title: string): GuideImage {
  const img = typeof image === "string" ? { url: image } : image ?? {};
  return {
    url: img.url || DEFAULT_IMAGE,
    alt: img.alt || title,
    width: img.width || 1200,
    height: img.height || 630,
  };
}

/** Lengths beyond which Google usually truncates the result snippet; warn, don't fail. */
function warnOnSeoLengths(where: string, metaTitle: string, metaDescription: string) {
  if (metaTitle.length > 60) console.warn(`[guides] ${where}: metaTitle is ${metaTitle.length} chars (aim for ≤ 60)`);
  if (metaDescription.length > 160 || metaDescription.length < 70) {
    console.warn(`[guides] ${where}: metaDescription is ${metaDescription.length} chars (aim for 70–160)`);
  }
}

function readGuide(slug: string): GuideDetail | null {
  if (!SLUG_RE.test(slug)) return null;
  const file = path.join(GUIDES_DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;

  const where = `data/guides/${slug}.json`;
  let input: GuideInput;
  try {
    input = JSON.parse(fs.readFileSync(file, "utf8")) as GuideInput;
  } catch (error) {
    throw new Error(`${where}: invalid JSON: ${(error as Error).message}`);
  }

  const { title, metaDescription, datePublished } = input;
  if (!title) throw new Error(`${where}: "title" is required`);
  if (!metaDescription) throw new Error(`${where}: "metaDescription" is required`);
  // A missing date would default to the build date and change on every deploy
  if (!datePublished || !ISO_DATE_RE.test(datePublished)) {
    throw new Error(`${where}: "datePublished" is required as YYYY-MM-DD`);
  }
  const dateModified = input.dateModified || datePublished;
  if (!ISO_DATE_RE.test(dateModified) || dateModified < datePublished) {
    throw new Error(`${where}: "dateModified" must be YYYY-MM-DD and not before datePublished`);
  }

  const metaTitle = input.metaTitle || `${title} | PixPassport`;
  warnOnSeoLengths(where, metaTitle, metaDescription);

  const markdown = sectionsToMarkdown(input);
  const { html, toc } = renderMarkdown(markdown);

  return {
    slug,
    url: `${SITE_URL}${GUIDES_BASE_PATH}/${slug}`,
    title,
    metaTitle,
    metaDescription,
    excerpt: input.excerpt || metaDescription,
    keywords: input.keywords ?? [],
    category: input.category || "Guide",
    author: input.author || "PixPassport Team",
    datePublished,
    dateModified,
    readingTime: readingTime(markdown),
    image: normalizeImage(input.image, title),
    draft: input.draft === true,
    featured: input.featured === true,
    contentHtml: html,
    toc,
    keyTakeaways: input.keyTakeaways ?? [],
    faq: input.faq ?? [],
    cta: { ...DEFAULT_CTA, ...input.cta },
    relatedLinks: input.relatedLinks ?? [],
    toolDocument: input.toolDocument,
  };
}

export function getGuide(slug: string): GuideDetail | null {
  return readGuide(slug);
}

/** Every guide, drafts included (drafts still render, as noindex). */
export function getAllGuideSlugs(): string[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  return fs
    .readdirSync(GUIDES_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""))
    .filter((slug) => SLUG_RE.test(slug));
}

/** Published guides for the hub and related links: featured first, then newest first. */
export function getPublishedGuides(): GuideMeta[] {
  return getAllGuideSlugs()
    .map(readGuide)
    .filter((g): g is GuideDetail => g !== null && !g.draft)
    .sort((a, b) => Number(b.featured) - Number(a.featured) || b.datePublished.localeCompare(a.datePublished));
}

export function formatDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(date);
}

/** JSON-LD for a <script> tag; escapes "<" so content can never close the script element. */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function buildHubMetadata(): Metadata {
  const url = `${SITE_URL}${GUIDES_BASE_PATH}`;
  return {
    title: GUIDES_HUB.metaTitle,
    description: GUIDES_HUB.description,
    alternates: { canonical: url },
    openGraph: {
      title: GUIDES_HUB.metaTitle,
      description: GUIDES_HUB.description,
      url,
      siteName: "PixPassport",
      locale: "en_US",
      type: "website",
      images: [{ url: DEFAULT_IMAGE, width: 1200, height: 630, alt: GUIDES_HUB.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: GUIDES_HUB.metaTitle,
      description: GUIDES_HUB.description,
      images: [DEFAULT_IMAGE],
    },
  };
}

export function buildGuideMetadata(guide: GuideDetail): Metadata {
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    keywords: guide.keywords,
    authors: [{ name: guide.author }],
    alternates: { canonical: guide.url },
    ...(guide.draft && { robots: { index: false, follow: true } }),
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: guide.url,
      siteName: "PixPassport",
      locale: "en_US",
      type: "article",
      publishedTime: guide.datePublished,
      modifiedTime: guide.dateModified,
      authors: [guide.author],
      section: guide.category,
      tags: guide.keywords,
      images: [{ url: guide.image.url, width: guide.image.width, height: guide.image.height, alt: guide.image.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.metaTitle,
      description: guide.metaDescription,
      images: [guide.image.url],
    },
  };
}
