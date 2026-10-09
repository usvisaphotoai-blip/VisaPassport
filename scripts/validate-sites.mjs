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
  }
  const toolDocs = new Set((site.tool?.documents || []).map((d) => d.id));

  const paths = new Set(pages.map((p) => p.path));
  const resolves = (href) => paths.has(hrefToPath(href));
  const inbound = new Map(pages.map((p) => [p.path, 0]));
  const link = (href) => {
    const target = hrefToPath(href);
    if (inbound.has(target)) inbound.set(target, inbound.get(target) + 1);
  };

  // Site-wide navigation counts as inbound links
  for (const l of [...(site.nav || []), ...(site.footer?.columns || []).flatMap((c) => c.links)]) {
    if (l.href.startsWith(`/${code}`) && !resolves(l.href)) error('_site.md', `nav/footer link does not resolve: ${l.href}`);
    link(l.href);
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

    const titleLen = (data.title || '').length;
    if (titleLen > 65) error(rel, `title is ${titleLen} chars (max 65)`);
    else if (titleLen > 60) warn(rel, `title is ${titleLen} chars (aim for ≤ 60)`);
    const descLen = (data.description || '').length;
    if (descLen < 110 || descLen > 165) warn(rel, `description is ${descLen} chars (aim for 120–160)`);

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

    // Internal links
    for (const l of bodyLinks(p, code)) {
      if (!resolves(l.href)) error(rel, `broken internal link: ${l.href}`);
      else if (hrefToPath(l.href) !== p.path) link(l.href);
    }
    for (const m of cleanBody.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)) {
      if (!m[1].trim()) error(rel, `image without alt text: ${m[2]}`);
    }
    for (const slug of data.related || []) {
      const target = `/${code}/${slug}`;
      if (!paths.has(target)) error(rel, `related page not found: ${slug}`);
      else link(target);
    }
    if (data.cta?.href?.startsWith(`/${code}`) && !resolves(data.cta.href)) error(rel, `cta link does not resolve: ${data.cta.href}`);
    if (data.tool && !toolDocs.has(data.tool.doc)) error(rel, `tool.doc "${data.tool.doc}" is not in _site.md tool.documents`);

    // Home and hubs link to their direct children automatically
    if (!p.slug || data.type === 'hub') {
      const prefix = p.slug ? `${p.path}/` : `/${code}/`;
      for (const child of pages) {
        if (child.path.startsWith(prefix) && !child.path.slice(prefix.length).includes('/')) link(child.path);
      }
    }

    const faq = data.faq || [];
    if (faq.length < 3) warn(rel, `only ${faq.length} FAQ items (aim for 3+)`);
    for (const f of faq) {
      if (!f.question || !f.answer) error(rel, 'FAQ item missing question or answer');
      remember('faq', f.question, rel);
    }

    if (data.image && !data.image.alt) error(rel, 'image is missing alt text');
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
