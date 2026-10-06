// SEO checks for the Markdown country sections in content/sites/<code>.
// Usage: npm run sites:check [-- <code>]   (exits 1 when any error is found)
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SITES_DIR = path.join(process.cwd(), 'content/sites');
const only = process.argv[2];

const norm = (s = '') => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

function listMarkdown(dir, prefix = '') {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('_')) continue;
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...listMarkdown(path.join(dir, entry.name), rel));
    else if (entry.name.endsWith('.md')) out.push(rel);
  }
  return out;
}

const toSlug = (rel) => rel.replace(/\.md$/, '').replace(/(^|\/)index$/, '');

let errorCount = 0;
let warnCount = 0;

for (const code of fs.readdirSync(SITES_DIR)) {
  if (only && code !== only) continue;
  const siteDir = path.join(SITES_DIR, code);
  if (!fs.statSync(siteDir).isDirectory()) continue;

  const issues = [];
  const error = (file, msg) => issues.push({ level: 'error', file, msg });
  const warn = (file, msg) => issues.push({ level: 'warn', file, msg });

  const configPath = path.join(siteDir, '_site.md');
  if (!fs.existsSync(configPath)) {
    error('_site.md', 'missing site config');
    continue;
  }
  const site = matter(fs.readFileSync(configPath, 'utf8')).data;
  for (const key of ['country', 'lang', 'ogLocale', 'siteName', 'defaultImage', 'ui']) {
    if (!site[key]) error('_site.md', `missing "${key}"`);
  }
  const toolDocs = new Set((site.tool?.documents || []).map((d) => d.id));

  const pages = listMarkdown(siteDir).map((rel) => {
    const { data, content } = matter(fs.readFileSync(path.join(siteDir, rel), 'utf8'));
    return { rel, slug: toSlug(rel), path: `/${code}${toSlug(rel) ? `/${toSlug(rel)}` : ''}`, data, content };
  });
  const paths = new Set(pages.map((p) => p.path));
  const resolves = (href) => paths.has(href.split('#')[0].replace(/\/$/, '') || '/');
  const inbound = new Map(pages.map((p) => [p.path, 0]));
  const link = (href) => {
    const target = href.split('#')[0].replace(/\/$/, '');
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
    const { data, content, rel } = p;
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
    const body = content.replace(/```[\s\S]*?```/g, '');
    let prev = 1;
    for (const m of body.matchAll(/^(#{1,6})\s+(.+)$/gm)) {
      const level = m[1].length;
      if (level === 1) error(rel, `body contains an H1 ("${m[2]}") — the H1 comes from frontmatter`);
      else if (level > prev + 1) error(rel, `heading jumps from H${prev} to H${level}: "${m[2]}"`);
      prev = level;
    }

    // Internal links
    for (const m of body.matchAll(/\]\((\/[^)\s]+)\)/g)) {
      if (m[1].startsWith(`/${code}`)) {
        if (!resolves(m[1])) error(rel, `broken internal link: ${m[1]}`);
        else if (m[1].split('#')[0] !== p.path) link(m[1]);
      }
    }
    for (const m of body.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)) {
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
