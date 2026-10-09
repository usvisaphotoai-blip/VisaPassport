// Post-build guard for the prerendered country sections (.next/server/app/sites/<code>).
// Fails the build when editorial placeholders reach the output. Markdown HTML comments are stripped
// before rendering (lib/country-sites.ts); React's own <!-- --> text separators are expected.
// Usage: node scripts/check-build-output.mjs   (runs from `postbuild`)
import fs from 'fs';
import path from 'path';

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

const errors = [];
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(process.cwd(), file);
  for (const needle of FORBIDDEN) {
    if (content.includes(needle)) errors.push(`${rel}: contains "${needle}"`);
  }
}

for (const e of errors) console.error(`  ✖ ${e}`);
console.log(`Build output check: ${files.length} files scanned, ${errors.length} error(s)`);
process.exit(errors.length ? 1 : 0);
