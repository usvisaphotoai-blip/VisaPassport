// Writes data/countries-specs-lite.json: countries-specs.json without the long-form
// HTML content fields. lib/specs.ts imports the lite file because it is bundled into
// client components, and the content fields are ~98% of the source file's size.
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_FIELDS = ["passportcontent", "visacontent"];

const specs = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "countries-specs.json"), "utf8"));
const lite = specs.map((spec) => {
  const copy = { ...spec };
  for (const field of CONTENT_FIELDS) delete copy[field];
  return copy;
});

const out = path.join(DATA_DIR, "countries-specs-lite.json");
const json = JSON.stringify(lite, null, 2) + "\n";
if (!fs.existsSync(out) || fs.readFileSync(out, "utf8") !== json) {
  fs.writeFileSync(out, json);
  console.log(`Wrote ${path.relative(process.cwd(), out)} (${lite.length} specs)`);
}
