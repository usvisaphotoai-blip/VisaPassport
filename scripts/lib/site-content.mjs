// Shared reader for the Markdown country sections in content/sites/<code>.
// Mirrors lib/country-sites.ts closely enough for build-time checks (audit, validators, sitemap)
// without importing TypeScript into plain Node scripts.
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const BASE_URL = 'https://www.pixpassport.com';
export const SITES_DIR = path.join(process.cwd(), 'content/sites');

/** Lowercase, strip accents and punctuation, collapse whitespace */
export const norm = (s = '') =>
  String(s)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();

export const stripComments = (s = '') => s.replace(/<!--[\s\S]*?-->/g, '');

export function listMarkdown(dir, prefix = '') {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('_')) continue;
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...listMarkdown(path.join(dir, entry.name), rel));
    else if (entry.name.endsWith('.md')) out.push(rel);
  }
  return out;
}

export const toSlug = (rel) => rel.replace(/\.md$/, '').replace(/(^|\/)index$/, '');

export function getSiteCodes() {
  return fs
    .readdirSync(SITES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(SITES_DIR, d.name, '_site.md')))
    .map((d) => d.name);
}

/** content/sites/<code>/_claims.md → { key: { text, short, confirmed } } */
export function loadClaims(code) {
  const file = path.join(SITES_DIR, code, '_claims.md');
  if (!fs.existsSync(file)) return {};
  return matter(fs.readFileSync(file, 'utf8')).data.siteClaims || {};
}

/** "{{claim:deletion}}" → claim text, "{{claim:deletion.short}}" → short variant */
export function interpolateClaims(value, claims) {
  if (typeof value !== 'string') return value;
  return value.replace(/\{\{\s*claim:([\w-]+)(?:\.(\w+))?\s*\}\}/g, (match, key, variant) => {
    const claim = claims[key];
    if (!claim) return match;
    return claim[variant || 'text'] ?? match;
  });
}

export function loadSite(code) {
  const dir = path.join(SITES_DIR, code);
  const config = matter(fs.readFileSync(path.join(dir, '_site.md'), 'utf8')).data;
  const claims = loadClaims(code);
  const pages = listMarkdown(dir).map((rel) => {
    const file = path.join(dir, rel);
    const { data, content } = matter(fs.readFileSync(file, 'utf8'));
    const slug = toSlug(rel);
    const pagePath = `/${code}${slug ? `/${slug}` : ''}`;
    return {
      rel,
      file,
      slug,
      path: pagePath,
      url: `${BASE_URL}${pagePath}`,
      data,
      content,
      body: stripComments(content),
      status: data.status === 'draft' ? 'draft' : 'ready',
    };
  });
  return { code, dir, config, claims, pages };
}

/** Markdown inline → plain text */
export const plainInline = (s = '') =>
  s
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`~]/g, '')
    .replace(/<[^>]+>/g, '')
    .trim();

/**
 * The text a visitor reads on the page, in render order, as blocks:
 * intro, body headings / paragraphs / list items / table cells, then FAQ.
 */
export function visibleBlocks(page, claims = {}) {
  const blocks = [];
  const add = (kind, text) => {
    const t = plainInline(interpolateClaims(text, claims));
    if (t) blocks.push({ kind, text: t });
  };
  if (page.data.intro) add('intro', page.data.intro);

  const body = interpolateClaims(page.body.replace(/```[\s\S]*?```/g, ''), claims);
  let para = [];
  const flush = () => {
    if (para.length) add('paragraph', para.join(' '));
    para = [];
  };
  for (const raw of body.split('\n')) {
    const line = raw.trim();
    let m;
    if (!line) flush();
    else if ((m = line.match(/^(#{1,6})\s+(.+)$/))) {
      flush();
      add(`h${m[1].length}`, m[2]);
    } else if ((m = line.match(/^(?:[-*+]|\d+\.)\s+(.+)$/))) {
      flush();
      add('list', m[1]);
    } else if (line.startsWith('|')) {
      flush();
      if (/^\|[\s:|-]+\|?$/.test(line)) continue;
      for (const cell of line.split('|').map((c) => c.trim()).filter(Boolean)) add('table', cell);
    } else para.push(line);
  }
  flush();

  for (const f of page.data.faq || []) {
    add('faq-q', f.question);
    add('faq-a', f.answer);
  }
  return blocks;
}

/** Internal links in a page's Markdown body (comments excluded) */
export function bodyLinks(page, code) {
  const out = [];
  for (const m of page.body.matchAll(/(?<!!)\[([^\]]+)\]\(([^)\s]+)\)/g)) {
    if (m[2].startsWith(`/${code}`) || m[2].startsWith(`${BASE_URL}/${code}`)) {
      out.push({ text: plainInline(m[1]), href: m[2].replace(BASE_URL, '') });
    }
  }
  return out;
}

export const hrefToPath = (href) => (href.split('#')[0].split('?')[0].replace(/\/$/, '') || '/');
