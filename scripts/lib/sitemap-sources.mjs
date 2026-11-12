// Maps a sitemap URL to the content that renders it, so <lastmod> can follow real content changes.
// `fingerprint(pathname, read)` returns a string that changes when (and only when) the page's own content
// changes, or null when the source is unknown. `read(relPath)` returns a file's text (working tree or a git
// revision, see scripts/seed-sitemap-lastmod.mjs), or null when the file does not exist.
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();

/** Markdown sections rendered by app/<region>/[slug] from content/<region>/<slug>.md */
export const MARKDOWN_REGIONS = ['uk', 'ca', 'us', 'in'];

// Parsed data files are memoized: the seed script fingerprints many URLs against the same revision
const parsed = new Map();
const json = (text) => {
  if (!text) return null;
  if (parsed.has(text)) return parsed.get(text);
  let value = null;
  try {
    value = JSON.parse(text);
  } catch {
    value = null;
  }
  if (parsed.size > 300) parsed.clear();
  parsed.set(text, value);
  return value;
};

/** Same slug normalization as lib/slug-utils.ts → getShortId */
export function shortId(id) {
  return id
    .replace('-passport', '')
    .replace('-visa', '')
    .replace('ds-160', 'us')
    .replace('united-states', 'us')
    .replace('united-kingdom', 'uk')
    .replace('united-arab-emirates', 'uae')
    .replace('icao-/-eu', 'icao')
    .replace('icao-eu', 'icao');
}

const countryBase = (country) => shortId(country.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''));

/** Files that belong to a static app route directory (its page plus co-located modules, not child routes) */
function routeDirFiles(dir, list) {
  const entries = list(dir);
  if (!entries) return null;
  if (!entries.some((e) => e.name === 'page.tsx' && !e.dir)) return null;
  return entries.filter((e) => !e.dir && /\.(tsx?|css|json|md)$/.test(e.name)).map((e) => `${dir}/${e.name}`).sort();
}

/** content/<region>/<slug>.md, or the file whose frontmatter `slug:` is <slug> (the loaders key pages by frontmatter) */
function markdownBySlug(dir, slug) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return null;
  if (fs.existsSync(path.join(abs, `${slug}.md`))) return `${dir}/${slug}.md`;
  const match = fs.readdirSync(abs).find((f) => {
    if (!f.endsWith('.md')) return false;
    const head = fs.readFileSync(path.join(abs, f), 'utf8').slice(0, 2000);
    return new RegExp(`^slug:\\s*["']?${slug.replace(/[-]/g, '\\-')}["']?\\s*$`, 'm').test(head);
  });
  return match ? `${dir}/${match}` : null;
}

/** Lists a working-tree directory as [{ name, dir }] */
export function listWorkingDir(rel) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs) || !fs.statSync(abs).isDirectory()) return null;
  return fs.readdirSync(abs, { withFileTypes: true }).map((d) => ({ name: d.name, dir: d.isDirectory() }));
}

/**
 * Resolves a pathname to its source. Returns { files: [rel...] } for whole-file sources or
 * { files, pick: (contents) => string } when the page is one entry inside a shared data file.
 */
export function resolveSource(pathname, list = listWorkingDir) {
  const clean = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
  const parts = clean.split('/').filter(Boolean);

  if (clean === '/') return { files: ['app/page.tsx'] };

  // Markdown sections: /uk/<slug>, /ca/<slug>, /us/<slug>, /in/<slug>
  if (parts.length === 2 && MARKDOWN_REGIONS.includes(parts[0])) {
    const md = markdownBySlug(`content/${parts[0]}`, parts[1]);
    if (md) return { files: [md], markdown: true };
  }

  // Blog posts: repo-backed posts (content/blog) or the bundled JSON fallback
  if (parts[0] === 'blog' && parts.length === 2) {
    const md = `content/blog/${parts[1]}.md`;
    if (fs.existsSync(path.join(ROOT, md))) return { files: [md], markdown: true };
    return {
      files: ['data/blog-posts.json'],
      pick: ([text]) => {
        const post = (json(text) || []).find((p) => p.slug === parts[1]);
        return post ? JSON.stringify(post) : null;
      },
    };
  }

  if (parts[0] === 'de' && parts[1] === 'guides' && parts.length === 3) {
    return { files: [`content/de/guides/${parts[2]}.md`] };
  }

  if (parts[0] === 'visa-checklist' && parts.length === 3) {
    return { files: [`content/visa-checklist/${parts[1]}/${parts[2]}.md`] };
  }
  if (parts[0] === 'visa-checklist' && parts.length === 2) {
    return { files: [`content/visa-checklist/${parts[1]}/country.json`] };
  }

  // Static app routes (app/<path>/page.tsx)
  const dirFiles = routeDirFiles(`app/${parts.join('/')}`, list);
  if (dirFiles) return { files: dirFiles };

  // Root-level dynamic pages (app/[slug]): tool, money and special pages, then country specs
  if (parts.length === 1) {
    const slug = parts[0];
    for (const file of ['data/tool-seo-pages.json', 'data/money-pages.json', 'data/special-photo-pages.json']) {
      const raw = fs.readFileSync(path.join(ROOT, file), 'utf8');
      if ((json(raw) || []).some((p) => p.slug === slug)) {
        return {
          files: [file],
          pick: ([text]) => {
            const entry = (json(text) || []).find((p) => p.slug === slug);
            return entry ? JSON.stringify(entry) : null;
          },
        };
      }
    }
    const m = slug.match(/^(.+)-(passport|visa)-photo-editor$/);
    if (m) {
      const [, base, intent] = m;
      // The other intent's long-form copy and SEO overrides do not render on this URL
      const other = intent === 'visa' ? 'passport' : 'visa';
      // passportcontent, passport_title, passportMetaDescription, visa_h1, visaKeywords…
      const keep = (key) => !key.toLowerCase().startsWith(other);
      return {
        files: ['data/countries-specs.json'],
        pick: ([text]) => {
          const entries = (json(text) || []).filter((s) => countryBase(s.country) === base || shortId(s.id) === base);
          if (!entries.length) return null;
          return JSON.stringify(entries.map((e) => Object.fromEntries(Object.entries(e).filter(([k]) => keep(k)))));
        },
      };
    }
  }

  return null;
}

/** Content fingerprint for a pathname: the joined source text (or picked entry), or null if unknown */
export function fingerprint(pathname, read, list = listWorkingDir) {
  const src = resolveSource(pathname, list);
  if (!src) return null;
  const contents = src.files.map((f) => read(f));
  if (contents.every((c) => c === null)) return null;
  if (src.pick) return src.pick(contents);
  return src.files.map((f, i) => `${f}\n${contents[i] ?? ''}`).join('\n\u0000\n');
}

export const readWorkingFile = (rel) => {
  const abs = path.join(ROOT, rel);
  return fs.existsSync(abs) ? fs.readFileSync(abs, 'utf8') : null;
};
