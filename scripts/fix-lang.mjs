import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { syncCountrySitemap } from './lib/site-sitemap.mjs';

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
  // Passport Photo Biometrique (FR variant)
  {
    urls: {
      en: `${BASE_URL}/passport-photos`,
      fr: `${BASE_URL}/fr/photo-passeport-biometrique`,
      de: `${BASE_URL}/de/biometrisches-passbild`,
      'x-default': `${BASE_URL}/passport-photos`,
    },
    paths: ['/fr/photo-passeport-biometrique']
  },
  // Photo Identite (FR variant)
  {
    urls: {
      en: `${BASE_URL}/passport-photos`,
      fr: `${BASE_URL}/fr/photo-identite`,
      de: `${BASE_URL}/de/biometrisches-passbild`,
      'x-default': `${BASE_URL}/passport-photos`,
    },
    paths: ['/fr/photo-identite']
  },
  // Photo Carte Identite (FR variant)
  {
    urls: {
      en: `${BASE_URL}/passport-photos`,
      fr: `${BASE_URL}/fr/photo-carte-identite`,
      de: `${BASE_URL}/de/biometrisches-passbild`,
      'x-default': `${BASE_URL}/passport-photos`,
    },
    paths: ['/fr/photo-carte-identite']
  },
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
  }
];

function getSitemapHreflangTags(pathname) {
  const cleanPath = pathname === '/' ? '' : (pathname.endsWith('/') ? pathname.slice(0, -1) : pathname);
  
  // Find matching equivalent group
  const group = ROUTE_EQUIVALENTS.find(g => g.paths.includes(cleanPath));
  let tags = [];
  
  if (group) {
    if (group.urls.en) tags.push(`    <xhtml:link rel="alternate" hreflang="en" href="${group.urls.en}" />`);
    if (group.urls.fr) tags.push(`    <xhtml:link rel="alternate" hreflang="fr" href="${group.urls.fr}" />`);
    if (group.urls.de) tags.push(`    <xhtml:link rel="alternate" hreflang="de" href="${group.urls.de}" />`);
    if (group.urls['x-default']) tags.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${group.urls['x-default']}" />`);
  } else {
    // Standalone page
    const fullUrl = `${BASE_URL}${cleanPath}`;
    const countrySite = COUNTRY_SITES.find(s => cleanPath === `/${s.code}` || cleanPath.startsWith(`/${s.code}/`));
    if (countrySite) {
      // Country sections get their hreflang from frontmatter (scripts/lib/site-sitemap.mjs)
      return '';
    } else if (cleanPath.startsWith('/fr')) {
      tags.push(`    <xhtml:link rel="alternate" hreflang="fr" href="${fullUrl}" />`);
      tags.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${fullUrl}" />`);
    } else if (cleanPath.startsWith('/de')) {
      tags.push(`    <xhtml:link rel="alternate" hreflang="de" href="${fullUrl}" />`);
      if (cleanPath.includes('schweiz')) {
        tags.push(`    <xhtml:link rel="alternate" hreflang="de-CH" href="${fullUrl}" />`);
      }
      tags.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${fullUrl}" />`);
    } else {
      tags.push(`    <xhtml:link rel="alternate" hreflang="en" href="${fullUrl}" />`);
      tags.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${fullUrl}" />`);
    }
  }
  
  return tags.length > 0 ? '\n' + tags.join('\n') : '';
}

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

function updateSitemap() {
  if (!fs.existsSync(SITEMAP_PATH)) {
    console.log('⚠️ Sitemap not found at ' + SITEMAP_PATH);
    return;
  }
  
  let sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf-8');
  
  if (!sitemapContent.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"')) {
    sitemapContent = sitemapContent.replace(
      '<urlset ',
      '<urlset xmlns:xhtml="http://www.w3.org/1999/xhtml"\n        '
    );
  }

  // 1. Auto-discover Visa Checklist routes
  const CHECKLIST_DIR = path.join(__dirname, '../content/visa-checklist');
  const checklistUrls = ['/visa-checklist'];

  if (fs.existsSync(CHECKLIST_DIR)) {
    const countries = fs.readdirSync(CHECKLIST_DIR, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);

    for (const c of countries) {
      checklistUrls.push(`/visa-checklist/${c}`);
      const countryDir = path.join(CHECKLIST_DIR, c);
      const files = fs.readdirSync(countryDir).filter(f => f.endsWith('.md'));
      for (const f of files) {
        const slug = f.replace(/\.md$/, '');
        checklistUrls.push(`/visa-checklist/${c}/${slug}`);
      }
    }
  }

  // Inject any missing checklist URLs before closing </urlset>
  const today = new Date().toISOString().split('T')[0];
  for (const urlPath of checklistUrls) {
    const fullUrl = `${BASE_URL}${urlPath}`;
    if (!sitemapContent.includes(`<loc>${fullUrl}</loc>`)) {
      const priority = urlPath === '/visa-checklist' ? '0.9' : '0.8';
      const newEntry = `  <url>\n    <loc>${fullUrl}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
      sitemapContent = sitemapContent.replace('</urlset>', `${newEntry}</urlset>`);
    }
  }

  const parts = sitemapContent.split('<url>');
  let addedCount = 0;
  for (let i = 1; i < parts.length; i++) {
    let part = parts[i];
    const locMatch = part.match(/<loc>(.*?)<\/loc>/);
    if (locMatch) {
      const fullUrl = locMatch[1].trim();
      if (!URL.canParse(fullUrl)) {
        throw new Error(`Invalid <loc> in sitemap.xml: "${fullUrl}" (entry: ${part.slice(0, 300).trim()})`);
      }
      const urlObj = new URL(fullUrl);
      const pathname = urlObj.pathname;
      
      const hreflangTags = getSitemapHreflangTags(pathname);
      
      if (hreflangTags) {
         // Strip old xhtml:link tags to replace with complete tags
         part = part.replace(/\s*<xhtml:link[^>]*\/>/g, '');
         part = part.replace(/<\/loc>/, `</loc>${hreflangTags}`);
         addedCount++;
      }
    }
    parts[i] = part;
  }
  
  // 2. Country section pages: ready pages only, real lastmod, frontmatter hreflang
  fs.writeFileSync(SITEMAP_PATH, syncCountrySitemap(parts.join('<url>')), 'utf-8');

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

// 2. Process sitemap
updateSitemap();

console.log('✨ Postbuild complete!');
