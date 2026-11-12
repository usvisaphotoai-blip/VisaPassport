// <lastmod> from content changes, without needing git history at build time.
// data/sitemap-lastmod.json stores { url: { hash, lastmod } }. When a page's content fingerprint
// (scripts/lib/sitemap-sources.mjs) changes, its lastmod moves to today; otherwise it stays put.
// Markdown pages with an `updatedAt` / `updated` frontmatter date use that date instead.
// Seed or repair the manifest from git history with: node scripts/seed-sitemap-lastmod.mjs
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fingerprint, readWorkingFile, resolveSource } from './sitemap-sources.mjs';

export const MANIFEST_PATH = path.join(process.cwd(), 'data/sitemap-lastmod.json');

export const hash = (text) => crypto.createHash('sha1').update(text).digest('hex').slice(0, 16);

export function loadManifest() {
  return fs.existsSync(MANIFEST_PATH) ? JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8')) : {};
}

export function saveManifest(manifest) {
  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(sorted, null, 2) + '\n');
}

/** Explicit content date from Markdown frontmatter, if the page declares one */
export function frontmatterDate(pathname, read = readWorkingFile) {
  const src = resolveSource(pathname);
  if (!src?.markdown) return null;
  const text = read(src.files[0]);
  if (!text) return null;
  const { data } = matter(text);
  const value = data.updatedAt || data.updated || data.dateModified;
  if (!value) return null;
  const iso = value instanceof Date ? value.toISOString() : String(value);
  return /^\d{4}-\d{2}-\d{2}/.test(iso) ? iso.slice(0, 10) : null;
}

/**
 * Returns the lastmod for a URL and records it in the manifest.
 * `fallback` is the date already in the sitemap, used when the source cannot be resolved.
 */
export function lastmodFor(url, manifest, { fallback = null, today = new Date().toISOString().slice(0, 10) } = {}) {
  const pathname = new URL(url).pathname;
  const fm = frontmatterDate(pathname);
  const fp = fingerprint(pathname, readWorkingFile);
  if (fp === null) return { lastmod: fm || manifest[url]?.lastmod || fallback, resolved: false };

  const h = hash(fp);
  const known = manifest[url];
  const lastmod = fm || (known && known.hash === h ? known.lastmod : today);
  manifest[url] = { hash: h, lastmod };
  return { lastmod, resolved: true };
}
