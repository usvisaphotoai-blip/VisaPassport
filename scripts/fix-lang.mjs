import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { syncCountrySitemap } from './lib/site-sitemap.mjs';
import { loadManifest, saveManifest, lastmodFor } from './lib/sitemap-lastmod.mjs';
import { MARKDOWN_REGIONS } from './lib/sitemap-sources.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NEXT_SERVER_DIR = path.join(__dirname, '../.next/server/app');
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');
const BASE_URL = 'https://www.pixpassport.com';
const SITES_DIR = path.join(__dirname, '../content/sites');

// Markdown-driven country sections (content/sites/<code>) — see lib/country-sites.ts
function getCountrySites() {
  if (!fs.existsSync(SITES_DIR)) return [];
  return fs.readdirSync(SITES_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory() && fs.existsSync(path.join(SITES_DIR, d.name, '_site.md')))
    .map(d => {
      const config = fs.readFileSync(path.join(SITES_DIR, d.name, '_site.md'), 'utf-8');
      const lang = (config.match(/^lang:\s*["']?([\w-]+)["']?\s*$/m) || [])[1] || 'en';
      return { code: d.name, lang };
    });
}

const COUNTRY_SITES = getCountrySites();

const ROUTE_EQUIVALENTS = [
  // Homepages
  {
    urls: {
      en: `${BASE_URL}/`,
      fr: `${BASE_URL}/fr`,
      de: `${BASE_URL}/de`,
      es: `${BASE_URL}/es`,
      'pt-BR': `${BASE_URL}/br`,
      'x-default': `${BASE_URL}/`,
    },
    paths: ['/', '/fr', '/de', '']
  },
  // Online Tool / Editor
  {
    urls: {
      en: `${BASE_URL}/passport-photo-online`,
      fr: `${BASE_URL}/fr/photo-identite-en-ligne`,
      de: `${BASE_URL}/de/passbild-online`,
      'x-default': `${BASE_URL}/passport-photo-online`,
    },
    paths: ['/passport-photo-online', '/fr/photo-identite-en-ligne', '/fr/passport-photo-online', '/de/passbild-online']
  },
  // Passport Photos Landing
  {
    urls: {
      en: `${BASE_URL}/passport-photos`,
      fr: `${BASE_URL}/fr/photo-passeport`,
      de: `${BASE_URL}/de/biometrisches-passbild`,
      'x-default': `${BASE_URL}/passport-photos`,
    },
    paths: ['/passport-photos', '/fr/photo-passeport', '/de/biometrisches-passbild']
  },
  // /fr/photo-identite, /fr/photo-carte-identite, /fr/photo-passeport-biometrique have no English or German
  // equivalent of their own (their heads list only themselves), so they are not grouped here.
  // Visa Photo Landing
  {
    urls: {
      en: `${BASE_URL}/visa-photo`,
      fr: `${BASE_URL}/fr/photo-visa`,
      de: `${BASE_URL}/de/visum-foto`,
      'x-default': `${BASE_URL}/visa-photo`,
    },
    paths: ['/visa-photo', '/fr/photo-visa', '/de/visum-foto']
  },
  // Blog / Guides Hub
  {
    urls: {
      en: `${BASE_URL}/blog`,
      fr: `${BASE_URL}/fr/guides`,
      de: `${BASE_URL}/de/guides`,
      'x-default': `${BASE_URL}/blog`,
    },
    paths: ['/blog', '/fr/guides', '/de/guides']
  },
  // Switzerland: passport photo (Swiss German + Swiss French)
  {
    urls: {
      'de-CH': `${BASE_URL}/de/passfoto-schweiz-online`,
      'fr-CH': `${BASE_URL}/fr/photo-passeport-suisse`,
      'x-default': `${BASE_URL}/de/passfoto-schweiz-online`,
    },
    paths: ['/de/passfoto-schweiz-online', '/fr/photo-passeport-suisse']
  },
  // Switzerland: ID / document photo (Swiss German + Swiss French)
  {
    urls: {
      'de-CH': `${BASE_URL}/de/dokumentenfoto-schweiz`,
      'fr-CH': `${BASE_URL}/fr/photo-identite-suisse`,
      'x-default': `${BASE_URL}/de/dokumentenfoto-schweiz`,
    },
    paths: ['/de/dokumentenfoto-schweiz', '/fr/photo-identite-suisse']
  },
  // Switzerland (Swiss French only): baby passport photo, SwissPass photo
  {
    urls: { 'fr-CH': `${BASE_URL}/fr/photo-passeport-bebe-suisse`, 'x-default': `${BASE_URL}/fr/photo-passeport-bebe-suisse` },
    paths: ['/fr/photo-passeport-bebe-suisse']
  },
  {
    urls: { 'fr-CH': `${BASE_URL}/fr/photo-swisspass`, 'x-default': `${BASE_URL}/fr/photo-swisspass` },
    paths: ['/fr/photo-swisspass']
  }
];

function processFile(filePath, targetLang) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  if (targetLang) {
    if (/<html([^>]*)\blang=["']en["']/i.test(content)) {
      content = content.replace(/<html([^>]*)\blang=["']en["']/gi, `<html$1lang="${targetLang}"`);
      modified = true;
    }
    if (content.includes('"lang":"en"')) {
      content = content.replace(/"lang":"en"/g, `"lang":"${targetLang}"`);
      modified = true;
    }
  }

  if (content.includes('hrefLang=')) {
    content = content.replace(/hrefLang=/g, 'hreflang=');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
   
  }
}

function walkDir(dir, targetLang) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (targetLang === '' && (file === 'fr' || file === 'de' || file === 'fr.html' || file === 'de.html') && dir === NEXT_SERVER_DIR) continue;
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath, targetLang);
    } else if (fullPath.endsWith('.html') || fullPath.endsWith('.rsc')) {
      processFile(fullPath, targetLang);
    }
  }
}

const ROOT_URL = `${BASE_URL}/`;
const UTILITY_PATHS = /^\/(admin|dashboard|login|signup|preview|api|cloudinary-gallery|cdn-cgi|expert-edit|sites)(\/|$)/;

/** Built page heads: pathname → { hreflang map, noindex } for every prerendered HTML page */
function readBuiltHeads() {
  const heads = new Map();
  const walk = (dir) => {
    if (!fs.existsSync(dir)) return;
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) { walk(full); continue; }
      if (!e.name.endsWith('.html')) continue;
      const rel = path.relative(NEXT_SERVER_DIR, full).replace(/\.html$/, '');
      if (rel.startsWith('sites/') || rel.startsWith('_') || rel.includes('[')) continue;
      const pathname = rel === 'index' ? '/' : `/${rel}`;
      const html = fs.readFileSync(full, 'utf-8');
      const head = html.split('</head>')[0];
      const hreflang = {};
      for (const [tag] of head.matchAll(/<link\b[^>]*rel="alternate"[^>]*>/gi)) {
        const lang = tag.match(/hreflang="([^"]+)"/i)?.[1];
        const href = tag.match(/href="([^"]+)"/)?.[1];
        if (lang && href) hreflang[lang] = href === BASE_URL ? ROOT_URL : href;
      }
      const robots = head.match(/<meta\b[^>]*name="robots"[^>]*content="([^"]+)"/i)?.[1] || '';
      heads.set(pathname, { hreflang, noindex: /noindex/i.test(robots) });
    }
  };
  walk(NEXT_SERVER_DIR);
  return heads;
}

/** Fallback when a page is not prerendered: language groups above, else a self-referencing tag */
function fallbackHreflang(pathname) {
  const clean = pathname === '/' ? '' : pathname.replace(/\/$/, '');
  const group = ROUTE_EQUIVALENTS.find((g) => g.paths.includes(clean));
  if (group) return { ...group.urls };
  const url = clean ? `${BASE_URL}${clean}` : ROOT_URL;
  const lang = clean === '/fr' || clean.startsWith('/fr/') ? 'fr' : clean === '/de' || clean.startsWith('/de/') ? 'de' : 'en';
  return { [lang]: url, 'x-default': url };
}

function renderUrl({ loc, hreflang, lastmod, images }) {
  const langs = Object.entries(hreflang).filter(([l]) => l !== 'x-default');
  if (hreflang['x-default']) langs.push(['x-default', hreflang['x-default']]);
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    ...langs.map(([l, h]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${h}" />`),
    ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
    ...images.map((img) => `    <image:image>\n      <image:loc>${img}</image:loc>\n    </image:image>`),
    '  </url>',
  ].join('\n');
}

/** Pages that must be listed even if nobody added them by hand: Markdown regions, repo blog posts, checklists, guides */
function discoveredPaths() {
  const out = [];
  for (const region of MARKDOWN_REGIONS) {
    const dir = path.join(__dirname, '../content', region);
    if (!fs.existsSync(dir)) continue;
    const pages = fs.readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => matter(fs.readFileSync(path.join(dir, f), 'utf-8')).data);
    const live = pages.filter((d) => d.slug && d.draft !== true);
    if (live.length) out.push({ path: `/${region}` });
    for (const d of live) out.push({ path: `/${region}/${d.slug}` });
  }
  const blogDir = path.join(__dirname, '../content/blog');
  if (fs.existsSync(blogDir)) {
    for (const f of fs.readdirSync(blogDir).filter((x) => x.endsWith('.md'))) {
      const d = matter(fs.readFileSync(path.join(blogDir, f), 'utf-8')).data;
      if (d.draft !== true) out.push({ path: `/blog/${d.slug || f.replace(/\.md$/, '')}` });
    }
  }
  const checklistDir = path.join(__dirname, '../content/visa-checklist');
  if (fs.existsSync(checklistDir)) {
    out.push({ path: '/visa-checklist' });
    for (const c of fs.readdirSync(checklistDir, { withFileTypes: true }).filter((d) => d.isDirectory())) {
      out.push({ path: `/visa-checklist/${c.name}` });
      for (const f of fs.readdirSync(path.join(checklistDir, c.name)).filter((x) => x.endsWith('.md'))) {
        out.push({ path: `/visa-checklist/${c.name}/${f.replace(/\.md$/, '')}` });
      }
    }
  }
  return out;
}

/** English guides (data/guides/<slug>.json → /guides/<slug>): published only, lastmod = dateModified */
function guideEntries() {
  const dir = path.join(__dirname, '../data/guides');
  if (!fs.existsSync(dir)) return { wanted: new Map(), prefix: `${BASE_URL}/guides` };
  const published = fs.readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => {
    const meta = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8'));
    return { url: `${BASE_URL}/guides/${f.replace(/\.json$/, '')}`, draft: meta.draft === true, lastmod: meta.dateModified || meta.datePublished };
  }).filter((g) => !g.draft);
  const wanted = new Map(published.map((g) => [g.url, g.lastmod]));
  if (published.length) wanted.set(`${BASE_URL}/guides`, published.map((g) => g.lastmod).sort().at(-1));
  return { wanted, prefix: `${BASE_URL}/guides` };
}

function updateSitemap() {
  if (!fs.existsSync(SITEMAP_PATH)) {
    console.log('⚠️ Sitemap not found at ' + SITEMAP_PATH);
    return;
  }
  const xml = fs.readFileSync(SITEMAP_PATH, 'utf-8');
  const heads = readBuiltHeads();
  const manifest = loadManifest();
  const guides = guideEntries();
  const warnings = [];

  // 1. Existing entries, deduplicated by <loc> (the root is always written with its trailing slash)
  const entries = new Map();
  for (const [, block] of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    let loc = block.match(/<loc>\s*([^<\s]+)\s*<\/loc>/)?.[1];
    if (!loc) continue;
    if (!URL.canParse(loc)) throw new Error(`Invalid <loc> in sitemap.xml: "${loc}"`);
    if (loc === BASE_URL) loc = ROOT_URL;
    const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] || null;
    const images = [...block.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map((m) => m[1].trim());
    const prev = entries.get(loc);
    if (prev) {
      // Duplicate: keep one entry, the newer lastmod, every image
      prev.lastmod = [prev.lastmod, lastmod].filter(Boolean).sort().at(-1) || null;
      prev.images = [...new Set([...prev.images, ...images])];
      warnings.push(`merged duplicate entry ${loc}`);
      continue;
    }
    entries.set(loc, { loc, lastmod, images });
  }

  // 2. Auto-discovered content pages and guides
  for (const { path: p } of discoveredPaths()) {
    const loc = `${BASE_URL}${p}`;
    if (!entries.has(loc)) entries.set(loc, { loc, lastmod: null, images: [] });
  }
  for (const loc of [...entries.keys()]) {
    if ((loc === guides.prefix || loc.startsWith(`${guides.prefix}/`)) && !guides.wanted.has(loc)) entries.delete(loc);
  }
  for (const loc of guides.wanted.keys()) if (!entries.has(loc)) entries.set(loc, { loc, lastmod: null, images: [] });

  // 3. Every hreflang target must itself be listed (if it is an indexable page)
  // (self-references are skipped: listing a page is an editorial choice, see the report of unlisted pages)
  const notListed = new Set();
  for (const [ownPath, { hreflang, noindex }] of heads) {
    const ownUrl = ownPath === '/' ? ROOT_URL : `${BASE_URL}${ownPath}`;
    if (!noindex && !entries.has(ownUrl) && !UTILITY_PATHS.test(ownPath)) notListed.add(ownUrl);
    for (const href of Object.values(hreflang)) {
      if (href === ownUrl || entries.has(href) || !href.startsWith(BASE_URL)) continue;
      const p = new URL(href).pathname;
      const built = heads.get(p === '' ? '/' : p);
      if (built && !built.noindex) entries.set(href, { loc: href, lastmod: null, images: [] });
    }
  }

  // 4. hreflang from the page head, lastmod from content changes; drop noindex and utility pages
  const out = [];
  for (const entry of entries.values()) {
    const pathname = new URL(entry.loc).pathname;
    if (COUNTRY_SITES.some((s) => pathname === `/${s.code}` || pathname.startsWith(`/${s.code}/`))) continue; // synced below
    if (UTILITY_PATHS.test(pathname)) { warnings.push(`dropped utility page ${entry.loc}`); continue; }
    const built = heads.get(pathname === '' ? '/' : pathname.replace(/\/$/, '') || '/');
    if (built?.noindex) { warnings.push(`dropped noindex page ${entry.loc}`); continue; }
    if (!built) warnings.push(`not prerendered, hreflang from fallback: ${entry.loc}`);
    const hreflang = built ? built.hreflang : fallbackHreflang(pathname);

    let lastmod;
    if (guides.wanted.has(entry.loc)) lastmod = guides.wanted.get(entry.loc);
    else {
      const r = lastmodFor(entry.loc, manifest, { fallback: entry.lastmod });
      if (!r.resolved) warnings.push(`no content source, lastmod kept: ${entry.loc}`);
      lastmod = r.lastmod;
    }
    out.push(renderUrl({ ...entry, hreflang, lastmod }));
  }

  const header = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
  const body = `${header}${out.join('\n')}\n</urlset>\n`;

  // 5. Country section pages: ready pages only, real lastmod, frontmatter hreflang
  fs.writeFileSync(SITEMAP_PATH, syncCountrySitemap(body), 'utf-8');
  saveManifest(manifest);
  for (const w of warnings) console.log(`  sitemap: ${w}`);
  const unlisted = [...notListed].filter((u) => !entries.has(u));
  if (unlisted.length) console.log(`  sitemap: ${unlisted.length} indexable prerendered pages are not listed (add them to public/sitemap.xml if they should be): ${unlisted.map((u) => u.replace(BASE_URL, '') || '/').join(' ')}`);
}

const languages = ['fr', 'de'];



// 1. Process HTML files for lang attribute
const langHomeEnPath = path.join(NEXT_SERVER_DIR, `index.html`);
processFile(langHomeEnPath, '');
walkDir(NEXT_SERVER_DIR, '');

for (const lang of languages) {
  const langDir = path.join(NEXT_SERVER_DIR, lang);
  const langHome = path.join(NEXT_SERVER_DIR, `${lang}.html`);
  
  processFile(langHome, lang);
  walkDir(langDir, lang);
}

// Country sections are prerendered under app/sites/<code> and served at /<code> via rewrites
for (const site of COUNTRY_SITES) {
  processFile(path.join(NEXT_SERVER_DIR, 'sites', `${site.code}.html`), site.lang);
  walkDir(path.join(NEXT_SERVER_DIR, 'sites', site.code), site.lang);
}

// English regional sections (app/us, app/in): <html lang> matches their en-US / en-IN hreflang
for (const [code, lang] of [['us', 'en-US'], ['in', 'en-IN']]) {
  processFile(path.join(NEXT_SERVER_DIR, `${code}.html`), lang);
  walkDir(path.join(NEXT_SERVER_DIR, code), lang);
}

// 2. Process sitemap
updateSitemap();

console.log('✨ Postbuild complete!');
