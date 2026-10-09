import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import specsData from "@/data/countries-specs.json";
import { fetchExternalCountries } from "@/lib/external-api";

/**
 * Markdown-driven country SEO sections.
 *
 * Every folder in content/sites/<code>/ is one country section served at /<code>.
 *   _site.md          → country config + UI strings (frontmatter only)
 *   index.md          → section homepage (/<code>)
 *   foo.md            → /<code>/foo
 *   guias/index.md    → /<code>/guias (hub)
 *   guias/bar.md      → /<code>/guias/bar
 *
 * Adding a country = adding a folder. No application code changes.
 */

export const SITE_BASE_URL = "https://www.pixpassport.com";
const SITES_DIR = path.join(process.cwd(), "content/sites");

export interface SiteLink {
  label: string;
  href: string;
}

export interface SiteToolDocument {
  id: string;
  label: string;
  /** Country code understood by /api/external-process (see lib/external-api.ts) */
  countryCode: string;
  documentType?: string;
  size: string;
  background: string;
  head?: string;
  flag?: string;
}

export interface SiteConfig {
  code: string;
  basePath: string;
  country: string;
  lang: string;
  ogLocale: string;
  siteName: string;
  author: string;
  defaultImage: string;
  flag: string;
  nav: SiteLink[];
  navCta?: SiteLink;
  footer: { columns: { heading: string; links: SiteLink[] }[]; note: string };
  tool: { documents: SiteToolDocument[]; trust: string[] };
  ui: Record<string, string>;
  /** Optional before/after images for the hero slider (defaults to the shared 35x45 pair) */
  heroSlider?: { before: string; after: string; aspect?: string };
  /** Overrides for the /preview/[id] copy, keyed like DEFAULT_PREVIEW_STRINGS (lib/preview-strings.ts) */
  preview?: Record<string, unknown>;
  /** Site-wide trust/legal links in the footer (about, contact, privacy, terms) */
  legalLinks: SiteLink[];
  /** Product claims from _claims.md, already referenced through {{claim:key}} */
  claims: Record<string, SiteClaim>;
}

export interface SiteClaim {
  text: string;
  short?: string;
  confirmed?: boolean;
}

export interface SiteFaqItem {
  question: string;
  answer: string;
}

export interface SiteImage {
  src?: string;
  alt: string;
  /** Art direction for a designer when no src exists yet */
  brief?: string;
}

export type SitePageType = "home" | "landing" | "guide" | "hub" | "legal";

/** draft pages render with noindex and stay out of the sitemap and every internal link */
export type SitePageStatus = "draft" | "ready";

export interface SiteSource {
  name: string;
  url: string;
}

export interface SitePageMeta {
  site: string;
  /** Path below the section root: "" for home, "guias/foo" for nested pages */
  slug: string;
  url: string;
  type: SitePageType;
  title: string;
  description: string;
  h1: string;
  intro?: string;
  breadcrumbLabel: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  date: string;
  updatedAt?: string;
  author: string;
  readingTime?: string;
  image?: SiteImage;
  imageBriefs: SiteImage[];
  tool?: { doc: string; title?: string; subtitle?: string };
  cta?: SiteLink;
  /** Small pill above the H1; falls back to ui.heroBadge */
  badge?: string;
  related: string[];
  faq: SiteFaqItem[];
  order: number;
  status: SitePageStatus;
  /** Official sources for the measurements and rules the page states */
  officialSources: SiteSource[];
  /** YYYY-MM-DD the sources were last checked */
  lastVerified?: string;
  /** This page's hreflang code when it has alternates (es-MX, es-ES…); defaults to the section lang */
  hreflang?: string;
  /** Other-language versions of this page: { en: "/passport-photo-online" } */
  alternates: Record<string, string>;
}

export interface SiteTocItem {
  id: string;
  text: string;
  level: number;
}

export interface SitePage extends SitePageMeta {
  contentHtml: string;
  toc: SiteTocItem[];
}

/** Accent-safe slug for heading anchors ("Nâo é" → "nao-e") */
export function slugifyHeading(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripInline(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/[*_~`]/g, "").trim();
}

export function getSiteCodes(): string[] {
  if (!fs.existsSync(SITES_DIR)) return [];
  return fs
    .readdirSync(SITES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(SITES_DIR, d.name, "_site.md")))
    .map((d) => d.name);
}

/** content/sites/<code>/_claims.md → the section's product claims */
function getSiteClaims(code: string): Record<string, SiteClaim> {
  const file = path.join(SITES_DIR, code, "_claims.md");
  if (!fs.existsSync(file)) return {};
  return matter(fs.readFileSync(file, "utf8")).data.siteClaims || {};
}

/** Replaces {{claim:key}} / {{claim:key.short}} in every string of a value */
function withClaims<T>(value: T, claims: Record<string, SiteClaim>): T {
  if (typeof value === "string") {
    return value.replace(/\{\{\s*claim:([\w-]+)(?:\.(\w+))?\s*\}\}/g, (match, key: string, variant?: string) => {
      const claim = claims[key] as unknown as Record<string, string> | undefined;
      return claim?.[variant || "text"] ?? match;
    }) as T;
  }
  if (Array.isArray(value)) return value.map((v) => withClaims(v, claims)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, withClaims(v, claims)])) as T;
  }
  return value;
}

export function getSiteConfig(code: string): SiteConfig | null {
  const file = path.join(SITES_DIR, code, "_site.md");
  if (!fs.existsSync(file)) return null;
  const claims = getSiteClaims(code);
  const data = withClaims(matter(fs.readFileSync(file, "utf8")).data, claims);
  return {
    code,
    basePath: `/${code}`,
    country: data.country,
    lang: data.lang,
    ogLocale: data.ogLocale,
    siteName: data.siteName,
    author: data.author,
    defaultImage: data.defaultImage,
    flag: data.flag || "",
    nav: data.nav || [],
    navCta: data.navCta,
    footer: data.footer || { columns: [], note: "" },
    tool: data.tool || { documents: [], trust: [] },
    ui: data.ui || {},
    heroSlider: data.heroSlider,
    preview: data.preview,
    legalLinks: data.legalLinks || [],
    claims,
  };
}

/** Lightweight list used by the root layout to hand localized routes their own chrome */
export function getSiteRoutes(): { prefix: string; lang: string }[] {
  return getSiteCodes()
    .map((code) => getSiteConfig(code))
    .filter((s): s is SiteConfig => !!s)
    .map((s) => ({ prefix: s.basePath, lang: s.lang }));
}

function listMarkdownFiles(dir: string, prefix = ""): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith("_")) continue;
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...listMarkdownFiles(path.join(dir, entry.name), rel));
    else if (entry.name.endsWith(".md")) out.push(rel);
  }
  return out;
}

/** "index.md" → "", "guias/index.md" → "guias", "guias/foo.md" → "guias/foo" */
function fileToSlug(rel: string): string {
  return rel.replace(/\.md$/, "").replace(/(^|\/)index$/, "");
}

export function pageUrl(site: string, slug: string): string {
  return `${SITE_BASE_URL}/${site}${slug ? `/${slug}` : ""}`;
}

export function pagePath(site: string, slug: string): string {
  return `/${site}${slug ? `/${slug}` : ""}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- untyped gray-matter frontmatter
function toMeta(site: SiteConfig, slug: string, data: Record<string, any>): SitePageMeta {
  const type: SitePageType = slug === "" ? "home" : data.type || "landing";
  return {
    site: site.code,
    slug,
    url: pageUrl(site.code, slug),
    type,
    title: data.title,
    description: data.description,
    h1: data.h1 || data.title,
    intro: data.intro,
    breadcrumbLabel: data.breadcrumbLabel || data.h1 || data.title,
    primaryKeyword: data.primaryKeyword || "",
    secondaryKeywords: data.secondaryKeywords || [],
    date: String(data.date || ""),
    updatedAt: data.updated || data.updatedAt ? String(data.updated || data.updatedAt) : undefined,
    author: data.author || site.author,
    readingTime: data.readingTime,
    image: data.image,
    imageBriefs: data.imageBriefs || [],
    tool: data.tool || undefined,
    cta: data.cta,
    badge: data.badge,
    related: data.related || [],
    faq: data.faq || [],
    order: typeof data.order === "number" ? data.order : 100,
    status: data.status === "draft" ? "draft" : "ready",
    officialSources: (data.officialSources || []).filter((s: SiteSource) => s?.name && s?.url),
    lastVerified: data.lastVerified ? String(data.lastVerified) : undefined,
    hreflang: data.hreflang,
    alternates: data.alternates || {},
  };
}

function readPageFile(site: SiteConfig, rel: string) {
  const raw = fs.readFileSync(path.join(SITES_DIR, site.code, rel), "utf8");
  const { data, content } = matter(raw);
  return { meta: toMeta(site, fileToSlug(rel), withClaims(data, site.claims)), content: withClaims(content, site.claims) };
}

export function getSitePages(code: string): SitePageMeta[] {
  const site = getSiteConfig(code);
  if (!site) return [];
  return listMarkdownFiles(path.join(SITES_DIR, code))
    .map((rel) => readPageFile(site, rel).meta)
    .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
}

/**
 * hreflang → URL for the page head. Empty when the page has no alternate-language version:
 * a lone self-reference adds nothing and risks naming the wrong region.
 * Must stay in sync with pageHreflang() in scripts/lib/site-sitemap.mjs (checked after build).
 */
export function getHreflang(site: SiteConfig, page: SitePageMeta): Record<string, string> {
  const entries = Object.entries(page.alternates);
  if (entries.length === 0) return {};
  const abs = (href: string) => (href.startsWith("http") ? href : `${SITE_BASE_URL}${href}`);
  const out: Record<string, string> = { [page.hreflang || site.lang]: page.url };
  for (const [lang, href] of entries) out[lang] = abs(href);
  if (page.alternates.en && !page.alternates["x-default"]) out["x-default"] = abs(page.alternates.en);
  return out;
}

export function isPublished(page: SitePageMeta): boolean {
  return page.status === "ready";
}

/** Paths ("/es/foto-pasaporte") of every ready page in the section */
export function getPublishedPaths(code: string): Set<string> {
  return new Set(getSitePages(code).filter(isPublished).map((p) => pagePath(code, p.slug)));
}

/** Drops nav/footer links that point into the section but not at a ready page */
export function filterPublishedLinks<T extends SiteLink>(site: SiteConfig, links: T[], published: Set<string>): T[] {
  return links.filter((l) => {
    const target = l.href.split("#")[0].split("?")[0].replace(/\/$/, "");
    if (!(target === site.basePath || target.startsWith(`${site.basePath}/`))) return true;
    return published.has(target);
  });
}

function renderMarkdown(
  content: string,
  site: SiteConfig,
  published: Set<string>
): { html: string; toc: SiteTocItem[] } {
  const toc: SiteTocItem[] = [];
  const renderer = new marked.Renderer();

  renderer.heading = function ({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    // The template renders the frontmatter H1 — a body "# " is demoted so each page keeps a single H1
    const level = depth === 1 ? 2 : depth;
    const id = slugifyHeading(text);
    if (level === 2 || level === 3) {
      toc.push({ id, text: stripInline(text.replace(/<[^>]*>/g, "")), level });
    }
    return `<h${level} id="${id}" class="scroll-mt-24">${text}</h${level}>\n`;
  };

  renderer.link = function ({ href, title, tokens }) {
    const text = this.parser.parseInline(tokens);
    // Links to draft or missing section pages render as plain text until the target is ready
    const local = href.replace(SITE_BASE_URL, "").split("#")[0].split("?")[0].replace(/\/$/, "");
    if ((local === site.basePath || local.startsWith(`${site.basePath}/`)) && !published.has(local)) return text;
    const external = /^https?:\/\//.test(href) && !href.startsWith(SITE_BASE_URL);
    const titleAttr = title ? ` title="${title}"` : "";
    return external
      ? `<a href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer">${text}</a>`
      : `<a href="${href}"${titleAttr}>${text}</a>`;
  };

  renderer.image = function ({ href, title, text }) {
    const caption = title ? `<figcaption>${title}</figcaption>` : "";
    return `<figure><img src="${href}" alt="${text}" loading="lazy" decoding="async" />${caption}</figure>`;
  };

  // Editorial notes live in HTML comments and must never reach the rendered page
  const source = content.replace(/<!--[\s\S]*?-->/g, "");
  const html = (marked(source, { renderer }) as string)
    .replace(/<table>/g, '<div class="overflow-x-auto"><table>')
    .replace(/<\/table>/g, "</table></div>");

  return { html, toc };
}

export function getSitePage(code: string, slug: string): SitePage | null {
  const site = getSiteConfig(code);
  if (!site) return null;
  const rel = listMarkdownFiles(path.join(SITES_DIR, code)).find((f) => fileToSlug(f) === slug);
  if (!rel) return null;
  const { meta, content } = readPageFile(site, rel);
  const { html, toc } = renderMarkdown(content, site, getPublishedPaths(code));
  return { ...meta, contentHtml: html, toc };
}

/** Section home → each existing ancestor page → current page */
export function getBreadcrumbs(site: SiteConfig, page: SitePageMeta, all: SitePageMeta[]): SiteLink[] {
  const crumbs: SiteLink[] = [{ label: site.ui.breadcrumbRoot || site.ui.breadcrumbHome, href: site.basePath }];
  if (!page.slug) return crumbs;
  const parts = page.slug.split("/");
  for (let i = 1; i <= parts.length; i++) {
    const slug = parts.slice(0, i).join("/");
    const match = all.find((p) => p.slug === slug);
    if (match) crumbs.push({ label: match.breadcrumbLabel, href: pagePath(site.code, slug) });
  }
  return crumbs;
}

export function getChildPages(page: SitePageMeta, all: SitePageMeta[]): SitePageMeta[] {
  const prefix = page.slug ? `${page.slug}/` : "";
  return all.filter(
    (p) => p.slug !== page.slug && p.slug.startsWith(prefix) && !p.slug.slice(prefix.length).includes("/")
  );
}

/** "US" → 🇺🇸. Photo-API codes that aren't ISO regions are mapped first. */
const API_TO_REGION: Record<string, string> = { CHE: "CH", NI: "NG" };
function toRegion(code: string): string {
  // Document variants like "BR-3*4" use their country's flag
  const base = code.toUpperCase().split("-")[0];
  return API_TO_REGION[base] || base;
}
export function flagEmoji(code: string): string {
  const region = toRegion(code);
  if (!/^[A-Z]{2}$/.test(region)) return "🌍";
  return String.fromCodePoint(...[...region].map((c) => 0x1f1a5 + c.charCodeAt(0)));
}

// Used when the photo API is unreachable at build time
const FALLBACK_API_COUNTRIES: [string, string, string][] = [
  ["DZ", "Algeria", "413x531"], ["AU", "Australia", "413x531"], ["AT", "Austria", "413x531"],
  ["BE", "Belgium", "413x531"], ["BT", "Bhutan", "413x531"], ["BG", "Bulgaria", "413x531"],
  ["CA", "Canada", "1200x1800"], ["CN", "China", "420x560"], ["HR", "Croatia", "413x531"],
  ["CZ", "Czechia", "413x531"], ["DK", "Denmark", "413x531"], ["EE", "Estonia", "1300x1600"],
  ["FI", "Finland", "500x653"], ["FR", "France", "630x810"], ["DE", "Germany", "413x531"],
  ["GR", "Greece", "413x531"], ["HU", "Hungary", "413x531"], ["IN", "India", "630x810"],
  ["ID", "Indonesia", "400x600"], ["IR", "Iran", "600x400"], ["IQ", "Iraq", "413x531"],
  ["IT", "Italy", "413x531"], ["JP", "Japan", "827x1063"], ["KZ", "Kazakhstan", "413x531"],
  ["LV", "Latvia", "413x531"], ["LT", "Lithuania", "413x531"], ["LU", "Luxembourg", "413x531"],
  ["MW", "Malawi", "413x531"], ["MT", "Malta", "413x531"], ["MX", "Mexico", "413x531"],
  ["NP", "Nepal", "413x531"], ["NL", "Netherlands", "413x531"], ["NZ", "New Zealand", "900x1200"],
  ["NI", "Nigeria", "600x800"], ["NO", "Norway", "413x531"], ["PL", "Poland", "413x531"],
  ["PT", "Portugal", "413x531"], ["RO", "Romania", "413x531"], ["EU", "Schengen Area", "630x810"],
  ["SG", "Singapore", "400x514"], ["SK", "Slovakia", "413x531"], ["SI", "Slovenia", "413x531"],
  ["KR", "South Korea", "413x531"], ["ES", "Spain", "413x531"], ["LK", "Sri Lanka", "413x531"],
  ["SE", "Sweden", "413x531"], ["CHE", "Switzerland", "413x531"], ["TJ", "Tajikistan", "413x531"],
  ["TH", "Thailand", "413x531"], ["TR", "Turkey", "591x709"], ["AE", "United Arab Emirates", "413x531"],
  ["GB", "United Kingdom", "600x750"], ["US", "United States", "600x600"],
];

/**
 * Every country the photo API can process, as passport-photo presets with names,
 * background and head size localized for the section. Sorted by localized name.
 */
export async function getAllCountryDocuments(site: SiteConfig): Promise<SiteToolDocument[]> {
  const fetched = await fetchExternalCountries();
  const countries = fetched.length
    ? fetched.map((c) => ({ code: c.country_code, name: c.country_name, px: c.dimensions }))
    : FALLBACK_API_COUNTRIES.map(([code, name, px]) => ({ code, name, px }));

  const regionNames = new Intl.DisplayNames([site.lang], { type: "region" });
  const { ui } = site;
  const bgLabel: Record<string, string> = {
    white: ui.toolBgWhite || "White",
    "light-gray": ui.toolBgLightGray || "White or light grey",
    blue: ui.toolBgBlue || "Blue",
  };
  const fmt = (n: number) => n.toLocaleString(site.lang);

  const docs = countries.map(({ code, name, px }) => {
    const region = toRegion(code);
    const spec =
      specsData.find((s) => s.id === `${name.toLowerCase().replace(/\s+/g, "-")}-passport`) ||
      specsData.find((s) => s.country === name) ||
      (code === "EU" ? specsData.find((s) => s.id === "schengen-visa") : undefined);
    const label =
      code === "EU" ? ui.toolSchengen || name : (() => {
        try {
          return regionNames.of(region) || name;
        } catch {
          return name;
        }
      })();
    const pxLabel = px.replace("x", " x ") + " px";
    return {
      id: spec?.id || `${code.toLowerCase()}-passport`,
      label,
      countryCode: code,
      documentType: code === "EU" ? "visa" : "passport",
      size: spec ? `${fmt(spec.width_mm)} x ${fmt(spec.height_mm)} mm · ${pxLabel}` : pxLabel,
      background: bgLabel[spec?.bg_color || "white"] || bgLabel.white,
      head: spec ? `${spec.head_min_pct}–${spec.head_max_pct}%` : undefined,
      flag: code === "EU" ? "🇪🇺" : flagEmoji(code),
    } satisfies SiteToolDocument;
  });

  return docs.sort((a, b) => a.label.localeCompare(b.label, site.lang));
}
