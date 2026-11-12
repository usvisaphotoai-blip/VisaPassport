// Rebuilds data/sitemap-lastmod.json from git history: for every <loc> in public/sitemap.xml, finds the
// newest commit that changed that page's own content (not just its data file) and records that date.
// Uncommitted edits are then picked up by the normal postbuild run (lastmod = build date).
// Usage: node scripts/seed-sitemap-lastmod.mjs [--dry]
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fingerprint, resolveSource } from './lib/sitemap-sources.mjs';
import { hash, saveManifest, frontmatterDate } from './lib/sitemap-lastmod.mjs';

const dry = process.argv.includes('--dry');
const git = (args) => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });

const sitemap = fs.readFileSync(path.join(process.cwd(), 'public/sitemap.xml'), 'utf8');
const locs = [...new Set([...sitemap.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]))];

const showCache = new Map();
const readAt = (rev) => (file) => {
  const key = `${rev}:${file}`;
  if (!showCache.has(key)) {
    let text = null;
    try {
      text = execFileSync('git', ['show', key], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] });
    } catch {
      text = null;
    }
    showCache.set(key, text);
  }
  return showCache.get(key);
};

const commitsCache = new Map();
function commitsFor(files) {
  const key = files.join('|');
  if (!commitsCache.has(key)) {
    const out = git(['log', '--format=%H %cs', '--', ...files]).trim();
    commitsCache.set(key, out ? out.split('\n').map((l) => { const [sha, date] = l.split(' '); return { sha, date }; }) : []);
  }
  return commitsCache.get(key);
}

const manifest = {};
const unresolved = [];
for (const url of locs) {
  const pathname = new URL(url).pathname;
  const src = resolveSource(pathname);
  if (!src) { unresolved.push(url); continue; }
  const commits = commitsFor(src.files);
  if (!commits.length) { unresolved.push(url); continue; }

  // Walk newest → oldest; the page last changed at the newest commit whose fingerprint differs from its predecessor
  const fps = commits.map((c) => fingerprint(pathname, readAt(c.sha)));
  const headFp = fps[0];
  if (headFp === null) { unresolved.push(url); continue; }
  let lastmod = commits.at(-1).date;
  for (let i = 0; i < commits.length - 1; i++) {
    if (fps[i] !== fps[i + 1]) { lastmod = commits[i].date; break; }
  }
  const fm = frontmatterDate(pathname, readAt('HEAD'));
  manifest[url] = { hash: hash(headFp), lastmod: fm || lastmod };
}

if (dry) {
  for (const [url, { lastmod }] of Object.entries(manifest)) console.log(lastmod, url.replace('https://www.pixpassport.com', ''));
} else {
  saveManifest(manifest);
}
console.log(`Seeded ${Object.keys(manifest).length} URLs; unresolved (lastmod left as in sitemap): ${unresolved.length}`);
for (const u of unresolved) console.log('  ?', u);
