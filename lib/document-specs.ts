/**
 * Single source of truth for document photo specs used by the /us and /in guide pages.
 *
 * Every number here comes from the official source listed in `sources`, read on `lastVerified`.
 * Page copy never types these numbers: Markdown uses {{spec.<id>.<key>}} tokens (see `resolveSpecTokens`),
 * the spec table and quick-answer box render from this file, and the embedded tool's labels read `toolLabel`.
 * Derived values (mm ↔ inch ↔ px) are computed, so the units can never disagree.
 *
 * Research notes, conflicts and competitor comparisons: research/<page-slug>.md
 */

export const MM_PER_INCH = 25.4;

/** Pixels for a print size at a given DPI (rounded the way photo labs and resizers do) */
export const toPx = (inches: number, dpi = 300) => Math.round(inches * dpi);
const mm = (inches: number) => inches * MM_PER_INCH;
const fmtMm = (value: number) => (Number.isInteger(Math.round(value * 10) / 10) ? String(Math.round(value)) : (Math.round(value * 10) / 10).toString());

/** Inch fractions as written by US agencies: 1.375 → "1 3/8" */
export function inchFraction(value: number): string {
  const whole = Math.floor(value);
  const eighths = Math.round((value - whole) * 8);
  if (eighths === 0) return String(whole);
  if (eighths === 8) return String(whole + 1);
  const [n, d] = eighths % 4 === 0 ? [eighths / 4, 2] : eighths % 2 === 0 ? [eighths / 2, 4] : [eighths, 8];
  return whole ? `${whole} ${n}/${d}` : `${n}/${d}`;
}

export interface OfficialSource {
  label: string;
  url: string;
  /** Form edition or document date, as printed by the issuer */
  edition?: string;
}

export interface RangeInches {
  min: number;
  max: number;
  /** What the range is measured between, in the issuer's words */
  measured: string;
}

export interface PhotoSpec {
  id: string;
  /** Short name used in tables and tool labels */
  name: string;
  authority: string;
  printInches?: { width: number; height: number };
  head?: RangeInches;
  eyes?: RangeInches;
  background: string;
  colour: string;
  paper?: string;
  photoAge: string;
  headwear: string;
  retouching: string;
  backOfPhoto?: string;
  digital?: string;
  copies: string;
  sources: OfficialSource[];
  lastVerified: string;
}

const LAST_VERIFIED_USCIS = "2026-11-12";

const USCIS_FORM_SOURCES: OfficialSource[] = [
  { label: "Form I-485 instructions", url: "https://www.uscis.gov/i-485", edition: "09/18/26" },
  { label: "Form I-765 instructions", url: "https://www.uscis.gov/i-765", edition: "08/21/25" },
  { label: "USCIS Policy Alert PA-2025-29: Photograph Reuse for Identity Documents", url: "https://www.uscis.gov/sites/default/files/document/policy-manual-updates/20251212-PhotographReuse.pdf", edition: "December 12, 2025" },
];

export const SPECS = {
  "uscis-photo": {
    id: "uscis-photo",
    name: "USCIS passport-style photo",
    authority: "U.S. Citizenship and Immigration Services (USCIS)",
    printInches: { width: 2, height: 2 },
    head: { min: 1, max: 1.375, measured: "from the top of your hair to the bottom of your chin" },
    eyes: { min: 1.125, max: 1.375, measured: "from the top of your eyes to the bottom of the photo" },
    background: "White to off-white",
    colour: "Color",
    paper: "Thin paper with a glossy finish",
    photoAge: "Taken recently (I-129F and spouse I-130 photos: within 30 days of filing)",
    headwear: "Head bare, unless you wear headwear required by your religious denomination",
    retouching: "Unmounted and unretouched (not edited or digitally enhanced)",
    backOfPhoto: "Your name and A-Number (if any), lightly in pencil or felt pen",
    digital: "USCIS sets no pixel or file-size rule for mailed photos. Form I-131 adds that a digital photo must come from a camera of at least 3.5 megapixels.",
    copies: "2 identical photos for most forms that ask for photos",
    sources: USCIS_FORM_SOURCES,
    lastVerified: LAST_VERIFIED_USCIS,
  },
} satisfies Record<string, PhotoSpec>;

export type SpecId = keyof typeof SPECS;

export function getSpec(id: string): PhotoSpec {
  const spec = (SPECS as Record<string, PhotoSpec>)[id];
  if (!spec) throw new Error(`Unknown document spec "${id}" (lib/document-specs.ts)`);
  return spec;
}

/** Display strings for a spec. Keys are what Markdown tokens can use: {{spec.uscis-photo.size}} */
export function specDisplay(spec: PhotoSpec): Record<string, string> {
  const out: Record<string, string> = {
    name: spec.name,
    authority: spec.authority,
    background: spec.background,
    colour: spec.colour,
    photoAge: spec.photoAge,
    headwear: spec.headwear,
    retouching: spec.retouching,
    copies: spec.copies,
  };
  if (spec.paper) out.paper = spec.paper;
  if (spec.backOfPhoto) out.backOfPhoto = spec.backOfPhoto;
  if (spec.digital) out.digital = spec.digital;
  if (spec.printInches) {
    const { width, height } = spec.printInches;
    out.sizeIn = `${inchFraction(width)} × ${inchFraction(height)} in`;
    out.sizeMm = `${fmtMm(mm(width))} × ${fmtMm(mm(height))} mm`;
    out.sizePx300 = `${toPx(width)} × ${toPx(height)} px`;
    out.size = `${out.sizeIn} (${out.sizeMm})`;
  }
  if (spec.head) {
    out.headIn = `${inchFraction(spec.head.min)} to ${inchFraction(spec.head.max)} in`;
    out.headMm = `${fmtMm(mm(spec.head.min))}–${fmtMm(mm(spec.head.max))} mm`;
    out.headPx300 = `${toPx(spec.head.min)}–${toPx(spec.head.max)} px`;
    out.head = `${out.headIn} (${out.headMm})`;
    out.headMeasured = spec.head.measured;
    if (spec.printInches) {
      const h = spec.printInches.height;
      out.headPct = `${Math.round((spec.head.min / h) * 100)}–${Math.round((spec.head.max / h) * 100)}%`;
    }
  }
  if (spec.eyes) {
    out.eyesIn = `${inchFraction(spec.eyes.min)} to ${inchFraction(spec.eyes.max)} in`;
    out.eyesMm = `${fmtMm(mm(spec.eyes.min))}–${fmtMm(mm(spec.eyes.max))} mm`;
    out.eyesPx300 = `${toPx(spec.eyes.min)}–${toPx(spec.eyes.max)} px`;
    out.eyes = `${out.eyesIn} (${out.eyesMm})`;
    out.eyesMeasured = spec.eyes.measured;
  }
  return out;
}

/** Short label for the embedded tool's document picker, built from the spec so it cannot drift */
export function toolLabel(id: string): { size: string; bg: string; head: string } {
  const d = specDisplay(getSpec(id));
  return { size: d.sizeIn ?? "", bg: d.background, head: d.headIn ?? "" };
}

/**
 * Replaces {{spec.<id>.<key>}} tokens with display values. Throws on an unknown spec or key,
 * so a typo fails the build instead of publishing a wrong or empty number.
 */
export function resolveSpecTokens(text: string): string {
  return text.replace(/\{\{\s*spec\.([a-z0-9-]+)\.([A-Za-z0-9]+)\s*\}\}/g, (_m, id: string, key: string) => {
    const value = specDisplay(getSpec(id))[key];
    if (value === undefined) throw new Error(`Unknown spec token {{spec.${id}.${key}}}`);
    return value;
  });
}

/** Which USCIS forms ask you to mail photos, per each form's current instructions */
export interface UscisFormPhotoRule {
  form: string;
  title: string;
  photos: string;
  who: string;
  edition: string;
  url: string;
}

export const USCIS_FORM_PHOTOS: UscisFormPhotoRule[] = [
  { form: "I-485", title: "Adjustment of status (green card)", photos: "2 identical", who: "Every applicant", edition: "09/18/26", url: "https://www.uscis.gov/i-485" },
  { form: "I-765", title: "Employment authorization (EAD)", photos: "2 identical", who: "Every applicant", edition: "08/21/25", url: "https://www.uscis.gov/i-765" },
  { form: "I-131", title: "Travel document", photos: "2 identical", who: "Refugee travel document filed from outside the U.S.; advance parole or TPS travel authorization filed from inside the U.S.", edition: "01/20/25", url: "https://www.uscis.gov/i-131" },
  { form: "I-130", title: "Petition for a relative", photos: "2 identical of you and 2 of your spouse", who: "Spouse petitions only (spouse's photos if they are in the U.S.), taken within 30 days of filing", edition: "04/01/24", url: "https://www.uscis.gov/i-130" },
  { form: "I-129F", title: "Fiancé(e) petition", photos: "1 of you and 1 of your fiancé(e)", who: "Every petitioner, taken within 30 days of filing", edition: "01/20/25", url: "https://www.uscis.gov/i-129f" },
  { form: "I-751", title: "Removing conditions on residence", photos: "2 per petitioner and dependent", who: "Only if you file from overseas under military or government orders", edition: "04/01/24", url: "https://www.uscis.gov/i-751" },
  { form: "N-400", title: "Naturalization", photos: "2 identical", who: "Only if you apply from outside the U.S. (certain military and qualifying spouses); USCIS may ask others for photos later", edition: "01/20/25", url: "https://www.uscis.gov/n-400" },
  { form: "N-600", title: "Certificate of citizenship", photos: "2 identical", who: "Only if you live outside the U.S.; in the U.S., USCIS may photograph you at an ASC", edition: "01/20/25", url: "https://www.uscis.gov/n-600" },
  { form: "I-90", title: "Replace a green card", photos: "None", who: "USCIS takes a new photo at your biometrics appointment", edition: "01/20/25", url: "https://www.uscis.gov/i-90" },
];
