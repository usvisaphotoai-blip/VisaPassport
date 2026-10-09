// SEO and content-quality checks for the Markdown country sections in content/sites/<code>.
// Usage: npm run sites:check [-- <code>]   (exits 1 when any error is found)
//
// Sections with `qualityGate: true` in _site.md (es) treat the content-quality rules as errors;
// other sections get them as warnings so they can be brought up to the same bar gradually.
import {
  bodyLinks,
  getSiteCodes,
  hrefToPath,
  interpolateClaims,
  loadSite,
  norm,
  visibleBlocks,
} from './lib/site-content.mjs';

const only = process.argv[2];

let errorCount = 0;
let warnCount = 0;

// Text that must never be rendered (editorial placeholders)
const PLACEHOLDER_RE = /\[VERIFICAR|ANTES DE PUBLICAR/i;
// A measurement: "35 x 45 mm", "3x4", "600 x 600 píxeles", "240 KB", "2 pulgadas", "300 ppp"
const SPEC_RE =
  /\b\d+(?:[.,]\d+)?\s*[x×]\s*\d+(?:[.,]\d+)?\b|\b\d+(?:[.,]\d+)?\s*(?:mm|cm|px|kb|mb|ppp|dpi|pulgadas?|p[ií]xeles)\b/i;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const YEAR_RE = /\b20(2[0-6])\b/;
const STOPWORDS = new Set('a al con de del el en la las lo los o para por que se su sus tu tus un una y'.split(' '));
const countPhrase = (words, phrase) => {
  let n = 0;
  for (let i = 0; i + phrase.length <= words.length; i++) {
    if (phrase.every((w, j) => words[i + j] === w)) n++;
  }
  return n;
};
// Acceptance guarantees are never allowed, in pages or in _site.md
const GUARANTEE_RE = /garant[ií]a|garantiza|100\s*%|aprobada seguro|aceptaci[oó]n asegurada/i;
// Product claims that must come from _claims.md ({{claim:key}}), never typed into a page
const CLAIM_PATTERNS = [
  ['deletion24h', /\b24\s*(h|horas)\b/i],
  ['freePreview', /sin coste|\bgratis\b|gratuit[ao]/i],
  ['paidDownload', /\bpagas?\b[^.]{0,40}\b(descarga|cuando)/i],
  ['printSheet', /hoja (lista )?para imprimir|hoja con varias copias|hoja de impresi[oó]n/i],
  ['requirementChecks', /comprobaciones de requisitos/i],
  ['refundIfRejected', /reembolso si\b|te devolvemos/i],
];

/** Every string a visitor can see that comes from page frontmatter */
function renderedFrontmatter(data) {
  const out = [data.title, data.description, data.h1, data.intro, data.breadcrumbLabel, data.badge];
  out.push(data.image?.alt, data.cta?.label, data.tool?.title, data.tool?.subtitle);
  for (const f of data.faq || []) out.push(f.question, f.answer);
  return out.filter((s) => typeof s === 'string');
}

function* allStrings(value) {
  if (typeof value === 'string') yield value;
  else if (Array.isArray(value)) for (const v of value) yield* allStrings(v);
  else if (value && typeof value === 'object') for (const v of Object.values(value)) yield* allStrings(v);
}

for (const code of getSiteCodes()) {
  if (only && code !== only) continue;
  const { config: site, claims, pages } = loadSite(code);
  const gate = !!site.qualityGate;

  const issues = [];
  const error = (file, msg) => issues.push({ level: 'error', file, msg });
  const warn = (file, msg) => issues.push({ level: 'warn', file, msg });
  /** Content-quality rule: error on gated sections, warning elsewhere */
  const quality = (file, msg) => (gate ? error : warn)(file, msg);

  for (const key of ['country', 'lang', 'ogLocale', 'siteName', 'defaultImage', 'ui']) {
    if (!site[key]) error('_site.md', `missing "${key}"`);
  }
  for (const s of allStrings(site)) {
    if (PLACEHOLDER_RE.test(s)) quality('_site.md', `placeholder text would be rendered: "${s.slice(0, 80)}"`);
    if (GUARANTEE_RE.test(s)) quality('_site.md', `acceptance-guarantee wording: "${s.slice(0, 80)}"`);
    for (const m of s.matchAll(/\{\{\s*claim:([\w-]+)/g)) {
      if (!claims[m[1]]) error('_site.md', `unknown claim {{claim:${m[1]}}} (define it in _claims.md)`);
    }
  }
  const usedClaims = new Set([...allStrings(site)].flatMap((s) => [...s.matchAll(/\{\{\s*claim:([\w-]+)/g)].map((m) => m[1])));
  const toolDocs = new Set((site.tool?.documents || []).map((d) => d.id));

  const paths = new Set(pages.map((p) => p.path));
  // Only ready pages are published: drafts are noindex and never linked (lib/country-sites.ts)
  const published = new Set(pages.filter((p) => p.status === 'ready').map((p) => p.path));
  const aliases = site.linkAliases || {};
  const inbound = new Map(pages.filter((p) => p.status === 'ready').map((p) => [p.path, 0]));
  const link = (href) => {
    const target = hrefToPath(href);
    if (inbound.has(target)) inbound.set(target, inbound.get(target) + 1);
  };
  /** Internal link check shared by nav, body, related and CTA links. Returns true when it will render. */
  const checkTarget = (file, href, where, fromReady = true) => {
    const target = hrefToPath(href);
    if (aliases[target]) {
      error(file, `${where} uses ${target}; the real route is ${aliases[target]}`);
      return false;
    }
    if (!paths.has(target)) {
      error(file, `${where} points to a missing page: ${href} (remove the link and keep the text)`);
      return false;
    }
    if (!published.has(target)) {
      if (fromReady) warn(file, `${where} → ${target} is draft; it renders as plain text / is hidden until that page is ready`);
      return false;
    }
    return true;
  };

  // Site-wide navigation counts as inbound links
  const siteLinks = [...(site.nav || []), ...(site.footer?.columns || []).flatMap((c) => c.links)];
  for (const l of siteLinks.filter((l, i) => siteLinks.findIndex((o) => o.href === l.href) === i)) {
    if (l.href.startsWith(`/${code}`) && checkTarget('_site.md', l.href, 'nav/footer link')) link(l.href);
  }

  const seen = { title: new Map(), description: new Map(), h1: new Map(), primaryKeyword: new Map(), faq: new Map() };
  const remember = (kind, value, file) => {
    const key = norm(value);
    if (!key) return;
    if (seen[kind].has(key)) error(file, `duplicate ${kind} (also in ${seen[kind].get(key)}): "${value}"`);
    else seen[kind].set(key, file);
  };

  for (const p of pages) {
    const { data, body, rel } = p;
    for (const key of ['title', 'description', 'h1', 'primaryKeyword', 'date']) {
      if (!data[key]) error(rel, `missing frontmatter "${key}"`);
    }
    remember('title', data.title, rel);
    remember('description', data.description, rel);
    remember('h1', data.h1, rel);
    remember('primaryKeyword', data.primaryKeyword, rel);

    // ── Title, description, H1 ────────────────────────────────────────────
    const titleLen = (data.title || '').length;
    if (titleLen < 30 || titleLen > 60) quality(rel, `title is ${titleLen} chars (must be 30–60)`);
    const descLen = (data.description || '').length;
    if (descLen < 70 || descLen > 155) quality(rel, `meta description is ${descLen} chars (must be 70–155)`);
    for (const key of ['title', 'h1']) {
      const y = String(data[key] || '').match(YEAR_RE);
      if (y) quality(rel, `${key} contains a year (${y[0]}) — it dates the page`);
    }
    // The same keyword phrase twice in one field reads as stuffing
    const phrases = [data.primaryKeyword, ...(data.secondaryKeywords || [])].filter(Boolean).map((k) => norm(k).split(' '));
    for (const key of ['title', 'description', 'h1']) {
      const words = norm(data[key]).split(' ');
      for (const ph of phrases) {
        if (ph.length > 1 && countPhrase(words, ph) > 1) quality(rel, `${key} repeats "${ph.join(' ')}"`);
      }
    }

    const kw = norm(data.primaryKeyword);
    if (kw && !norm(data.title).includes(kw) && !norm(data.h1).includes(kw)) {
      warn(rel, `primary keyword "${data.primaryKeyword}" is not in the title or H1`);
    }

    // Single H1 (from frontmatter) and no skipped heading levels in the body
    const cleanBody = body.replace(/```[\s\S]*?```/g, '');
    let prev = 1;
    for (const m of cleanBody.matchAll(/^(#{1,6})\s+(.+)$/gm)) {
      const level = m[1].length;
      if (level === 1) error(rel, `body contains an H1 ("${m[2]}") — the H1 comes from frontmatter`);
      else if (level > prev + 1) error(rel, `heading jumps from H${prev} to H${level}: "${m[2]}"`);
      prev = level;
    }

    // Internal links (only links on ready pages count towards inbound links)
    const anchors = new Map();
    for (const l of bodyLinks(p, code)) {
      if (checkTarget(rel, l.href, `link "${l.text}"`, p.status === 'ready') && p.status === 'ready' && hrefToPath(l.href) !== p.path) link(l.href);
      const key = `${hrefToPath(l.href)}|${norm(l.text)}`;
      if (anchors.has(key)) quality(rel, `two links to ${hrefToPath(l.href)} use the same anchor "${l.text}" — vary the anchor or drop one`);
      anchors.set(key, true);
    }
    for (const m of cleanBody.matchAll(/(?<!!)\[[^\]]+\]\((#[^)\s]+)\)/g)) {
      if (m[1] !== '#tool') warn(rel, `in-page link ${m[1]}: the tool anchor is #tool`);
    }
    for (const m of cleanBody.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)) {
      if (!m[1].trim()) error(rel, `image without alt text: ${m[2]}`);
    }
    // A body "Preguntas frecuentes" section would sit next to the template FAQ (from frontmatter)
    for (const m of cleanBody.matchAll(/^#{2,3}\s+(.*preguntas frecuentes.*|.*perguntas frequentes.*)$/gim)) {
      quality(rel, `body heading "${m[1]}" duplicates the FAQ section — put questions in the faq frontmatter`);
    }
    for (const l of bodyLinks(p, code)) {
      if (/\/(#|$)/.test(l.href.replace(/^\/[a-z]{2}\/?$/, ''))) quality(rel, `link ${l.href} has a trailing slash (canonical URLs have none)`);
    }

    // ── Keyword density in the visible copy ───────────────────────────────
    const bodyWords = visibleBlocks(p, claims)
      .filter((b) => !b.kind.startsWith('faq'))
      .flatMap((b) => norm(b.text).split(' ').filter(Boolean));
    for (const ph of phrases) {
      const n = countPhrase(bodyWords, ph);
      const density = bodyWords.length ? (n * ph.length) / bodyWords.length : 0;
      if (n > 5 || (n > 1 && density > 0.02)) {
        quality(rel, `"${ph.join(' ')}" appears ${n}× in body text (${(density * 100).toFixed(1)}% of ${bodyWords.length} words; max 5× / 2%)`);
      }
    }
    for (const slug of data.related || []) {
      const target = `/${code}/${slug}`;
      if (checkTarget(rel, target, 'related', p.status === 'ready') && p.status === 'ready') link(target);
    }
    if (data.cta?.href?.startsWith(`/${code}`)) checkTarget(rel, data.cta.href, 'cta', p.status === 'ready');
    if (data.cta?.href?.startsWith('#') && data.cta.href !== '#tool') {
      error(rel, `cta href ${data.cta.href} does not match an anchor (the tool is #tool)`);
    }
    if (data.tool && !toolDocs.has(data.tool.doc)) error(rel, `tool.doc "${data.tool.doc}" is not in _site.md tool.documents`);

    // Home and hubs link to their ready direct children automatically
    if (p.status === 'ready' && (!p.slug || data.type === 'hub')) {
      const prefix = p.slug ? `${p.path}/` : `/${code}/`;
      for (const child of pages.filter((c) => c.status === 'ready')) {
        if (child.path.startsWith(prefix) && !child.path.slice(prefix.length).includes('/')) link(child.path);
      }
    }

    const faq = data.faq || [];
    if (faq.length < 3 && data.type !== 'legal') warn(rel, `only ${faq.length} FAQ items (aim for 3+)`);
    for (const f of faq) {
      if (!f.question || !f.answer) error(rel, 'FAQ item missing question or answer');
      remember('faq', f.question, rel);
    }

    if (data.type !== 'legal' && !data.image?.alt) quality(rel, 'image.alt is missing');
    if (data.image?.alt) {
      const alt = data.image.alt;
      const kwCount = Math.max(0, ...phrases.map((ph) => countPhrase(norm(alt).split(' '), ph)));
      if (alt.length > 125) quality(rel, `image.alt is ${alt.length} chars (keep it ≤ 125 and descriptive)`);
      if (kwCount > 1 || (alt.match(/,/g) || []).length > 2) quality(rel, `image.alt looks keyword-stuffed: "${alt}"`);
      if (norm(alt) === norm(data.primaryKeyword)) quality(rel, 'image.alt is just the primary keyword — describe the image');
    }
    for (const brief of data.imageBriefs || []) {
      if (!brief.alt) error(rel, 'imageBriefs entry is missing alt text');
    }
    if (data.image && !data.image.src) warn(rel, `hero image pending — brief: "${data.image.alt}"`);

    // ── Publication status, placeholders and sources ──────────────────────
    if (data.status !== undefined && !['draft', 'ready'].includes(data.status)) {
      error(rel, `status must be "draft" or "ready" (got "${data.status}")`);
    } else if (data.status === undefined) quality(rel, 'missing frontmatter "status" (draft | ready)');

    for (const s of [...renderedFrontmatter(data), body]) {
      const m = interpolateClaims(s, claims).match(PLACEHOLDER_RE);
      if (m) quality(rel, `placeholder "${m[0]}" would be rendered (keep editorial notes inside <!-- -->)`);
    }

    // ── hreflang ──────────────────────────────────────────────────────────
    if (data.hreflang && !/^[a-z]{2}(-[A-Z]{2})?$/.test(data.hreflang)) error(rel, `hreflang "${data.hreflang}" is not a valid code (es, es-MX…)`);
    for (const [lang, href] of Object.entries(data.alternates || {})) {
      if (!/^([a-z]{2}(-[A-Z]{2})?|x-default)$/.test(lang)) error(rel, `alternates key "${lang}" is not a valid hreflang code`);
      if (!/^(\/|https:\/\/www\.pixpassport\.com\/)/.test(href)) error(rel, `alternates.${lang} must be a site path or https://www URL: ${href}`);
      else if (p.status === 'ready') warn(rel, `alternate ${lang} → ${href}: that page must link back with hreflang="${data.hreflang || site.lang}"`);
    }

    // ── Product claims and guarantees ─────────────────────────────────────
    for (const s of [...renderedFrontmatter(data), body]) {
      const g = s.match(GUARANTEE_RE);
      if (g) quality(rel, `acceptance-guarantee wording "${g[0]}" — PixPassport cannot promise acceptance`);
      for (const [key, re] of CLAIM_PATTERNS) {
        const m = s.match(re);
        if (m) quality(rel, `hardcoded product claim "${m[0]}" — use {{claim:${key}}} from _claims.md`);
      }
      for (const m of s.matchAll(/\{\{\s*claim:([\w-]+)/g)) {
        if (!claims[m[1]]) error(rel, `unknown claim {{claim:${m[1]}}} (define it in _claims.md)`);
        else if (p.status === 'ready') usedClaims.add(m[1]);
      }
    }

    const sources = data.officialSources || [];
    if (!Array.isArray(sources)) error(rel, 'officialSources must be a list of { name, url }');
    for (const s of Array.isArray(sources) ? sources : []) {
      if (!s?.name || !s?.url) error(rel, 'officialSources entry needs both "name" and "url"');
      else if (!/^https:\/\//.test(s.url)) error(rel, `officialSources url must be https: ${s.url}`);
    }
    if (data.lastVerified && !DATE_RE.test(String(data.lastVerified))) {
      error(rel, `lastVerified must be YYYY-MM-DD (got "${data.lastVerified}")`);
    }
    const specText = visibleBlocks(p, claims).find((b) => SPEC_RE.test(b.text));
    if (specText && (!sources.length || !data.lastVerified)) {
      const msg = `states measurements ("${specText.text.match(SPEC_RE)[0]}") without officialSources + lastVerified`;
      if (p.status === 'ready') quality(rel, msg);
      else warn(rel, `${msg} — keep as draft until sourced`);
    }
  }

  for (const [target, count] of inbound) {
    if (count === 0 && target !== `/${code}`) error(target, 'orphan page: nothing links to it');
  }

  for (const key of usedClaims) {
    if (claims[key] && claims[key].confirmed !== true) warn('_claims.md', `claim "${key}" is live but not confirmed yet`);
  }

  // Cannibalization: another page's title targeting this page's exact primary keyword
  for (const p of pages) {
    const kw = norm(p.data.primaryKeyword);
    if (!kw) continue;
    for (const other of pages) {
      if (other === p) continue;
      if (norm(other.data.title).includes(kw) && !norm(other.data.primaryKeyword).includes(kw)) {
        warn(other.rel, `title contains "${p.data.primaryKeyword}", the primary keyword of ${p.rel}`);
      }
    }
  }

  console.log(`\n${site.flag || ''} ${code} (${site.lang}) — ${pages.length} pages`);
  for (const i of issues) {
    console.log(`  ${i.level === 'error' ? '✖' : '⚠'} ${i.file}: ${i.msg}`);
    if (i.level === 'error') errorCount++;
    else warnCount++;
  }
  if (issues.length === 0) console.log('  ✓ no issues');
}

console.log(`\n${errorCount} error(s), ${warnCount} warning(s)`);
process.exit(errorCount > 0 ? 1 : 0);
