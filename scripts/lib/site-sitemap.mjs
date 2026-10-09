// Sitemap entries for the Markdown country sections, generated from page frontmatter.
//   - only status: ready pages (indexable, self-canonical, prerendered → 200)
//   - <lastmod> = frontmatter `updated`, else the file's last git commit date, else `date`; never the build date
//   - no <changefreq> / <priority> (ignored by Google)
//   - hreflang only when the page declares `alternates`; must match the page head (lib/country-sites.ts → getHreflang)
import { execFileSync } from 'child_process';
import path from 'path';
import { BASE_URL, getSiteCodes, loadSite } from './site-content.mjs';

function gitLastModified(file) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', path.relative(process.cwd(), file)], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null;
  } catch {
    return null;
  }
}

export function pageLastmod(page) {
  const updated = page.data.updated || page.data.updatedAt;
  if (updated) return String(updated).slice(0, 10);
  return gitLastModified(page.file) || String(page.data.date || '').slice(0, 10) || null;
}

const absolute = (href) => (href.startsWith('http') ? href : `${BASE_URL}${href}`);

/**
 * hreflang → URL for a page, or {} when it has no alternate-language version.
 * Self uses the page's `hreflang` (es-MX, es-ES…) or the section's `lang`; `en` doubles as x-default.
 */
export function pageHreflang(page, site) {
  const alternates = page.data.alternates || {};
  if (Object.keys(alternates).length === 0) return {};
  const out = { [page.data.hreflang || site.lang]: page.url };
  for (const [lang, href] of Object.entries(alternates)) out[lang] = absolute(href);
  if (alternates.en && !alternates['x-default']) out['x-default'] = absolute(alternates.en);
  return out;
}

export function countrySitemapEntries() {
  const entries = [];
  for (const code of getSiteCodes()) {
    const { config, pages } = loadSite(code);
    for (const page of pages.filter((p) => p.status === 'ready')) {
      entries.push({ code, loc: page.url, lastmod: pageLastmod(page), hreflang: pageHreflang(page, config) });
    }
  }
  return entries;
}

function renderEntry({ loc, lastmod, hreflang }) {
  const links = Object.entries(hreflang).map(
    ([lang, href]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}" />`
  );
  return ['  <url>', `    <loc>${loc}</loc>`, ...links, ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []), '  </url>'].join('\n');
}

/** True when a sitemap URL belongs to a country section (/br, /es/…) */
export function isCountryUrl(loc, codes = getSiteCodes()) {
  const pathname = new URL(loc).pathname.replace(/\/$/, '');
  return codes.some((code) => pathname === `/${code}` || pathname.startsWith(`/${code}/`));
}

/** Replaces every country-section <url> in a sitemap with freshly generated entries */
export function syncCountrySitemap(xml) {
  const codes = getSiteCodes();
  const kept = xml.replace(/\s*<url>[\s\S]*?<\/url>/g, (block) => {
    const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1];
    return loc && isCountryUrl(loc, codes) ? '' : block;
  });
  const fresh = countrySitemapEntries().map(renderEntry).join('\n');
  return kept.replace(/\s*<\/urlset>\s*$/, `\n${fresh}\n</urlset>\n`);
}
