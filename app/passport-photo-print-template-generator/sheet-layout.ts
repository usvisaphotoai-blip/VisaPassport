// Paper and photo presets plus the grid maths, shared by the print generator and the pages that describe its output
export type SheetSize = { name: string; detail?: string; width: number; height: number }; // mm
export type PhotoPreset = SheetSize & { flags: string; label: string };

export const PAPER_GROUPS: { label: string; sizes: Record<string, SheetSize> }[] = [
  {
    label: "Photo paper (inch)",
    sizes: {
      "3.5x5": { name: "3.5×5 in", detail: "3R · 9×13 cm", width: 88.9, height: 127 },
      "4x6": { name: "4×6 in", detail: "4R · 10×15 cm", width: 101.6, height: 152.4 },
      "5x7": { name: "5×7 in", detail: "5R · 13×18 cm", width: 127, height: 177.8 },
      "6x8": { name: "6×8 in", detail: "6R · 15×20 cm", width: 152.4, height: 203.2 },
      "8x10": { name: "8×10 in", detail: "8R · 20×25 cm", width: 203.2, height: 254 },
    },
  },
  {
    label: "Photo paper (metric)",
    sizes: {
      "9x13cm": { name: "9×13 cm", width: 90, height: 130 },
      "10x15cm": { name: "10×15 cm", width: 100, height: 150 },
      "13x18cm": { name: "13×18 cm", width: 130, height: 180 },
    },
  },
  {
    label: "A series (ISO)",
    sizes: {
      A6: { name: "A6", detail: "105×148 mm", width: 105, height: 148 },
      A5: { name: "A5", detail: "148×210 mm", width: 148, height: 210 },
      A4: { name: "A4", detail: "210×297 mm", width: 210, height: 297 },
      A3: { name: "A3", detail: "297×420 mm", width: 297, height: 420 },
    },
  },
  {
    label: "US paper",
    sizes: {
      Letter: { name: "Letter", detail: "8.5×11 in", width: 215.9, height: 279.4 },
      Legal: { name: "Legal", detail: "8.5×14 in", width: 215.9, height: 355.6 },
      Tabloid: { name: "Tabloid", detail: "11×17 in", width: 279.4, height: 431.8 },
    },
  },
];

export const PAPER_SIZES: Record<string, SheetSize> = Object.assign(
  {},
  ...PAPER_GROUPS.map((g) => g.sizes),
);

export const QUICK_PAPERS = ["4x6", "5x7", "A4", "Letter"];

export const PHOTO_SIZES: Record<string, PhotoPreset> = {
  "2x2": { name: "2×2 in", flags: "🇺🇸", label: "USA", detail: "US passport & visa, India OCI", width: 50.8, height: 50.8 },
  "35x45": { name: "35×45 mm", flags: "🇬🇧🇪🇺🇮🇳🇦🇺", label: "UK, EU, India, AU", detail: "UK, EU, India, Australia, Singapore", width: 35, height: 45 },
  "33x48": { name: "33×48 mm", flags: "🇨🇳", label: "China", detail: "China passport & visa", width: 33, height: 48 },
  "50x70": { name: "50×70 mm", flags: "🇨🇦", label: "Canada", detail: "Canada passport", width: 50, height: 70 },
  "35x50": { name: "35×50 mm", flags: "🇲🇾", label: "Malaysia", detail: "Malaysia passport", width: 35, height: 50 },
  "30x40": { name: "30×40 mm", flags: "🪪", label: "ID cards", detail: "ID cards & forms", width: 30, height: 40 },
};

export const DEFAULT_MARGIN_MM = 5;
export const DEFAULT_GAP_MM = 3;

function fitGrid(sheetW: number, sheetH: number, photo: SheetSize, margin: number, gap: number) {
  // Small epsilon so exact fits (e.g. 2 × 50.8 mm on 101.6 mm) aren't lost to float error
  const cols = Math.max(0, Math.floor((sheetW - 2 * margin + gap + 1e-6) / (photo.width + gap)));
  const rows = Math.max(0, Math.floor((sheetH - 2 * margin + gap + 1e-6) / (photo.height + gap)));
  return { sheetW, sheetH, cols, rows, max: cols * rows };
}

// Uses whichever orientation fits more photos
export function computeLayout(paper: SheetSize, photo: SheetSize, margin: number, gap: number) {
  const short = Math.min(paper.width, paper.height);
  const long = Math.max(paper.width, paper.height);
  const portrait = { ...fitGrid(short, long, photo, margin, gap), orientation: "portrait" as const };
  const landscape = { ...fitGrid(long, short, photo, margin, gap), orientation: "landscape" as const };
  return landscape.max > portrait.max ? landscape : portrait;
}
