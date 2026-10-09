// Regenerates the country-section entries of public/sitemap.xml from page frontmatter.
// Usage: npm run sitemap:sites   (also runs from postbuild via scripts/fix-lang.mjs)
import fs from 'fs';
import path from 'path';
import { countrySitemapEntries, syncCountrySitemap } from './lib/site-sitemap.mjs';

const SITEMAP_PATH = path.join(process.cwd(), 'public/sitemap.xml');

const xml = fs.readFileSync(SITEMAP_PATH, 'utf8');
fs.writeFileSync(SITEMAP_PATH, syncCountrySitemap(xml), 'utf8');

const entries = countrySitemapEntries();
console.log(`✅ Country sections in sitemap: ${entries.length} ready pages`);
for (const e of entries) console.log(`   ${e.loc}  lastmod=${e.lastmod}${Object.keys(e.hreflang).length ? `  hreflang=${Object.keys(e.hreflang).join(',')}` : ''}`);
