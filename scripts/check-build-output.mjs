// Post-build guard for the prerendered country sections (.next/server/app/sites/<code>).
// Fails the build when editorial placeholders reach the output, or when a page links to a section
// page that is missing or draft (noindex), or when a page's hreflang tags differ from public/sitemap.xml. Markdown HTML comments are stripped
// before rendering (lib/country-sites.ts); React's own <!-- --> text separators are expected.
// Usage: node scripts/check-build-output.mjs   (runs from `postbuild`)
import fs from 'fs';
import path from 'path';
import { BASE_URL, getSiteCodes, hrefToPath, loadSite } from './lib/site-content.mjs';

const SITEMAP = fs.readFileSync(path.join(process.cwd(), 'public/sitemap.xml'), 'utf8');
/** loc → { hreflang: href } as listed in the sitemap */
const sitemapHreflang = new Map(
  [...SITEMAP.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, block]) => [
    block.match(/<loc>(.*?)<\/loc>/)?.[1],
    Object.fromEntries([...block.matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => [m[1], m[2]])),
  ])
);
const sameMap = (a, b) => JSON.stringify(Object.entries(a).sort()) === JSON.stringify(Object.entries(b).sort());

const OUT_DIR = path.join(process.cwd(), '.next/server/app/sites');
const FORBIDDEN = ['[VERIFICAR', 'ANTES DE PUBLICAR'];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) return walk(full);
    return /\.(html|rsc)$/.test(e.name) ? [full] : [];
  });
}

const files = walk(OUT_DIR);
if (files.length === 0) {
  console.error(`✖ No prerendered country pages found in ${OUT_DIR} — run \`next build\` first.`);
  process.exit(1);
}

const sites = Object.fromEntries(
  getSiteCodes().map((code) => {
    const { pages } = loadSite(code);
    return [
      code,
      {
        pages,
        all: new Set(pages.map((p) => p.path)),
        ready: new Set(pages.filter((p) => p.status === 'ready').map((p) => p.path)),
      },
    ];
  })
);

/** .next/server/app/sites/es/foto-dni.html → "/es/foto-dni" */
const fileToPath = (file) => '/' + path.relative(OUT_DIR, file).replace(/\.html$/, '');

const errors = [];
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(process.cwd(), file);
  for (const needle of FORBIDDEN) {
    if (content.includes(needle)) errors.push(`${rel}: contains "${needle}"`);
  }
  if (!file.endsWith('.html')) continue;

  const pagePath = fileToPath(file);
  const code = pagePath.split('/')[1];
  const page = sites[code]?.pages.find((p) => p.path === pagePath);
  if (page) {
    // hreflang in <head> must match the sitemap entry (drafts have neither)
    const head = Object.fromEntries(
      [...content.matchAll(/<link\b[^>]*rel="alternate"[^>]*>/gi)]
        .map((m) => [m[0].match(/hreflang="([^"]+)"/i)?.[1], m[0].match(/href="([^"]+)"/)?.[1]])
        .filter(([lang, href]) => lang && href)
    );
    const inSitemap = sitemapHreflang.get(page.url);
    if (page.status === 'ready' && inSitemap === undefined) errors.push(`${rel}: ready page missing from sitemap.xml`);
    if (page.status === 'draft' && inSitemap !== undefined) errors.push(`${rel}: draft page listed in sitemap.xml`);
    if (inSitemap && !sameMap(head, inSitemap)) {
      errors.push(`${rel}: head hreflang ${JSON.stringify(head)} ≠ sitemap ${JSON.stringify(inSitemap)}`);
    }
  }
  // <a href> into any country section must target a ready page
  for (const m of content.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const href = m[1].replace(BASE_URL, '');
    const code = href.match(/^\/([a-z]{2})(?:[/#?]|$)/)?.[1];
    if (!code || !sites[code]) continue;
    const target = hrefToPath(href);
    if (!sites[code].all.has(target)) errors.push(`${rel}: links to missing page ${target}`);
    else if (!sites[code].ready.has(target)) errors.push(`${rel}: links to draft (noindex) page ${target}`);
  }
}

for (const e of errors) console.error(`  ✖ ${e}`);
console.log(`Build output check: ${files.length} files scanned, ${errors.length} error(s)`);
process.exit(errors.length ? 1 : 0);
