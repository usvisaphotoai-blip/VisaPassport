import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NEXT_SERVER_DIR = path.join(__dirname, '../.next/server/app');
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');
const BASE_URL = 'https://www.pixpassport.com';

function getRouteFromPath(fullPath, baseDir, lang) {
  let relative = path.relative(baseDir, fullPath);
  if (relative.endsWith('.html')) relative = relative.slice(0, -5);
  if (relative.endsWith('/index')) relative = relative.slice(0, -6);
  if (relative === 'index') relative = '';
  
  if (lang && relative.startsWith(`${lang}/`)) {
    relative = relative.substring(lang.length + 1);
  } else if (lang && relative === lang) {
    relative = '';
  }
  
  return `/${relative}`;
}

const validRoutes = {
  en: new Set(),
  fr: new Set(),
  de: new Set()
};

function collectRoutes(dir, targetLang) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (targetLang === '' && (file === 'fr' || file === 'de' || file === 'fr.html' || file === 'de.html') && dir === NEXT_SERVER_DIR) continue;
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      collectRoutes(fullPath, targetLang);
    } else if (fullPath.endsWith('.html')) {
      const route = getRouteFromPath(fullPath, NEXT_SERVER_DIR, targetLang);
      const cleanRoute = route === '/' ? '' : (route.endsWith('/') ? route.slice(0, -1) : route);
      validRoutes[targetLang || 'en'].add(cleanRoute);
    }
  }
}

function generateHreflangTags(cleanRoute, isSitemap = false) {
  let tags = [];
  const prefix = isSitemap ? '    <xhtml:link' : '<link';
  const tagEnd = isSitemap ? '/>' : '/>';

  const hasEn = validRoutes.en.has(cleanRoute);
  const hasFr = validRoutes.fr.has(cleanRoute);
  const hasDe = validRoutes.de.has(cleanRoute);
  
  if (hasEn) {
    tags.push(`${prefix} rel="alternate" hreflang="en" href="${BASE_URL}${cleanRoute}" ${tagEnd}`);
  }
  
  if (hasFr) {
    tags.push(`${prefix} rel="alternate" hreflang="fr" href="${BASE_URL}/fr${cleanRoute}" ${tagEnd}`);
  }
  
  if (hasDe) {
    tags.push(`${prefix} rel="alternate" hreflang="de" href="${BASE_URL}/de${cleanRoute}" ${tagEnd}`);
  }

  // Always emit x-default if any hreflang annotation is present
  if (tags.length > 0) {
    let xDefaultUrl;
    if (hasEn) {
      xDefaultUrl = `${BASE_URL}${cleanRoute}`;
    } else if (cleanRoute.startsWith('/guides') || cleanRoute === '/guides') {
      xDefaultUrl = `${BASE_URL}/blog`;
    } else if (hasDe) {
      xDefaultUrl = `${BASE_URL}/de${cleanRoute}`;
    } else if (hasFr) {
      xDefaultUrl = `${BASE_URL}/fr${cleanRoute}`;
    } else {
      xDefaultUrl = `${BASE_URL}${cleanRoute}`;
    }
    
    tags.push(`${prefix} rel="alternate" hreflang="x-default" href="${xDefaultUrl}" ${tagEnd}`);
  }
  
  if (tags.length === 0) return ''; 
  
  return isSitemap ? '\n' + tags.join('\n') : tags.join('\n') + '\n';
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

  if (filePath.endsWith('.html')) {
    const route = getRouteFromPath(filePath, NEXT_SERVER_DIR, targetLang);
    const cleanRoute = route === '/' ? '' : (route.endsWith('/') ? route.slice(0, -1) : route);
    const hreflangTags = generateHreflangTags(cleanRoute, false);

    // Only inject if no hreflang tags were rendered by Next.js metadata
    if (hreflangTags && content.includes('</head>') && !content.includes('hreflang=')) {
      content = content.replace('</head>', `${hreflangTags}</head>`);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Fixed lang attribute & injected hreflang to ${targetLang || 'en'} in: ${filePath}`);
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

  const parts = sitemapContent.split('<url>');
  let addedCount = 0;
  for (let i = 1; i < parts.length; i++) {
    let part = parts[i];
    const locMatch = part.match(/<loc>(.*?)<\/loc>/);
    if (locMatch) {
      const fullUrl = locMatch[1];
      const urlObj = new URL(fullUrl);
      const pathname = urlObj.pathname;
      
      let cleanRoute = pathname;
      if (pathname.startsWith('/fr/')) {
         cleanRoute = pathname.slice(3);
      } else if (pathname === '/fr') {
         cleanRoute = '';
      } else if (pathname.startsWith('/de/')) {
         cleanRoute = pathname.slice(3);
      } else if (pathname === '/de') {
         cleanRoute = '';
      } else {
         cleanRoute = pathname === '/' ? '' : (pathname.endsWith('/') ? pathname.slice(0, -1) : pathname);
      }
      
      const hreflangTags = generateHreflangTags(cleanRoute, true);
      
      if (hreflangTags) {
         // Strip old xhtml:link tags to replace with complete tags (including x-default)
         part = part.replace(/\s*<xhtml:link[^>]*\/>/g, '');
         part = part.replace(/<\/loc>/, `</loc>${hreflangTags}`);
         addedCount++;
      }
    }
    parts[i] = part;
  }
  
  fs.writeFileSync(SITEMAP_PATH, parts.join('<url>'), 'utf-8');
  console.log(`✅ Updated sitemap with hreflang tags for ${addedCount} translated routes!`);
}

const languages = ['fr', 'de'];

console.log('🔧 Running postbuild script: Fixing HTML lang attributes & injecting hreflang...');

// 1. Collect all valid routes first
const langHomeEn = path.join(NEXT_SERVER_DIR, `index.html`);
if (fs.existsSync(langHomeEn)) validRoutes.en.add('');
collectRoutes(NEXT_SERVER_DIR, '');

for (const lang of languages) {
  const langHome = path.join(NEXT_SERVER_DIR, `${lang}.html`);
  if (fs.existsSync(langHome)) validRoutes[lang].add('');
  
  const langDir = path.join(NEXT_SERVER_DIR, lang);
  collectRoutes(langDir, lang);
}

// 2. Process HTML files
const langHomeEnPath = path.join(NEXT_SERVER_DIR, `index.html`);
processFile(langHomeEnPath, '');
walkDir(NEXT_SERVER_DIR, '');

for (const lang of languages) {
  const langDir = path.join(NEXT_SERVER_DIR, lang);
  const langHome = path.join(NEXT_SERVER_DIR, `${lang}.html`);
  
  processFile(langHome, lang);
  walkDir(langDir, lang);
}

// 3. Process sitemap
updateSitemap();

console.log('✨ Postbuild complete!');
