// Duplicate-text audit for a Markdown country section (default: es).
// Reports text a visitor reads on 2+ pages, after lowercasing and stripping accents/punctuation:
//   1. identical sentences / paragraphs / list items of 8+ words
//   2. shared runs of 8+ consecutive words (catches near-identical blocks such as step lists)
//   3. identical H2/H3 headings
// Claim placeholders ({{claim:x}}) are expanded first, so the audit sees what is rendered.
// Text rendered by the layout (footer, disclaimer, tool UI) is not page copy and is not scanned.
//
// Usage: node scripts/audit-duplicates.mjs [code] [--json] [--strict]
//   --strict  exit 1 when any 8+ word duplicate remains (headings alone don't fail)
import { loadSite, norm, visibleBlocks } from './lib/site-content.mjs';

const args = process.argv.slice(2);
const code = args.find((a) => !a.startsWith('--')) || 'es';
const asJson = args.includes('--json');
const strict = args.includes('--strict');
const MIN_WORDS = 8;

const { pages, claims } = loadSite(code);
const words = (s) => norm(s).split(' ').filter(Boolean);

// 1. Exact sentence / block duplicates
const exact = new Map(); // normalized text → { sample, files:Set }
const remember = (text, file) => {
  const key = words(text).join(' ');
  if (key.split(' ').length < MIN_WORDS) return;
  if (!exact.has(key)) exact.set(key, { sample: text, files: new Set() });
  exact.get(key).files.add(file);
};

// 2. Shingles over each page's visible text stream
const shingleFiles = new Map(); // 8-gram → Set(files)
const streams = new Map(); // file → tokens

// 3. Headings
const headings = new Map();

for (const page of pages) {
  const blocks = visibleBlocks(page, claims);
  const tokens = [];
  for (const b of blocks) {
    if (b.kind === 'h2' || b.kind === 'h3') {
      const key = norm(b.text);
      if (!headings.has(key)) headings.set(key, { sample: b.text, files: new Set() });
      headings.get(key).files.add(page.rel);
    }
    remember(b.text, page.rel);
    for (const sentence of b.text.split(/(?<=[.!?…:])\s+/)) remember(sentence, page.rel);
    tokens.push(...words(b.text));
  }
  streams.set(page.rel, tokens);
  for (let i = 0; i + MIN_WORDS <= tokens.length; i++) {
    const gram = tokens.slice(i, i + MIN_WORDS).join(' ');
    if (!shingleFiles.has(gram)) shingleFiles.set(gram, new Set());
    shingleFiles.get(gram).add(page.rel);
  }
}

// Merge consecutive shared 8-grams into maximal runs per page
const runs = new Map(); // run text → Set(files)
for (const [file, tokens] of streams) {
  let start = -1;
  let files = new Set();
  const close = (end) => {
    if (start < 0) return;
    const text = tokens.slice(start, end + MIN_WORDS).join(' ');
    if (!runs.has(text)) runs.set(text, new Set());
    for (const f of files) runs.get(text).add(f);
    start = -1;
    files = new Set();
  };
  for (let i = 0; i + MIN_WORDS <= tokens.length; i++) {
    const shared = shingleFiles.get(tokens.slice(i, i + MIN_WORDS).join(' '));
    if (shared.size > 1) {
      if (start < 0) start = i;
      for (const f of shared) files.add(f);
    } else close(i - 1);
  }
  close(tokens.length - MIN_WORDS);
}
// Drop runs fully contained in a longer run shared by the same files
const runList = [...runs.entries()]
  .map(([text, files]) => ({ text, files: [...files].sort(), count: files.size }))
  .sort((a, b) => b.text.length - a.text.length);
const dedupedRuns = runList.filter(
  (r, i) => !runList.slice(0, i).some((o) => o.text.includes(r.text) && r.files.every((f) => o.files.includes(f)))
);

const exactDupes = [...exact.values()]
  .filter((d) => d.files.size > 1)
  .map((d) => ({ text: d.sample, files: [...d.files].sort(), count: d.files.size }));
const headingDupes = [...headings.values()]
  .filter((d) => d.files.size > 1)
  .map((d) => ({ text: d.sample, files: [...d.files].sort(), count: d.files.size }));

const result = {
  site: code,
  pages: pages.length,
  exactDuplicates: exactDupes,
  sharedRuns: dedupedRuns,
  duplicateHeadings: headingDupes,
  summary: {
    exactDuplicates: exactDupes.length,
    sharedRuns: dedupedRuns.length,
    sharedRunWords: dedupedRuns.reduce((n, r) => n + r.text.split(' ').length * r.count, 0),
    duplicateHeadings: headingDupes.length,
  },
};

if (asJson) {
  console.log(JSON.stringify(result, null, 2));
} else {
  const cell = (s) => String(s).replace(/\|/g, '\\|');
  const table = (title, rows) => {
    console.log(`\n### ${title} (${rows.length})\n`);
    if (!rows.length) return console.log('None.');
    console.log('| Duplicate text | Files | Count |\n|---|---|---|');
    for (const r of rows) console.log(`| ${cell(r.text)} | ${r.files.join(', ')} | ${r.count} |`);
  };
  console.log(`# Duplicate-text audit: /${code} (${pages.length} pages)`);
  table('Identical sentences or blocks (8+ words)', exactDupes);
  table('Shared runs of 8+ consecutive words', dedupedRuns);
  table('Identical H2/H3 headings', headingDupes);
  console.log(
    `\nSummary: ${result.summary.exactDuplicates} identical blocks, ${result.summary.sharedRuns} shared runs ` +
      `(${result.summary.sharedRunWords} duplicated words), ${result.summary.duplicateHeadings} repeated headings`
  );
}

if (strict && (exactDupes.length || dedupedRuns.length)) process.exit(1);
