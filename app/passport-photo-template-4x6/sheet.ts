// 4x6 inch sheet geometry, shared by the tool and the page content
export const SHEET_W_MM = 101.6;
export const SHEET_H_MM = 152.4;
export const DPI = 300;
export const STANDARD_MARGIN_MM = 4;

export const mmToPx = (mm: number) => Math.round((mm * DPI) / 25.4);

export type PhotoSizeKey = "us" | "eu" | "cn" | "my" | "ca";

export const PHOTO_SIZES: Record<
  PhotoSizeKey,
  { label: string; width: number; height: number; usedFor: string }
> = {
  us: { label: "2×2 in (51×51 mm)", width: 50.8, height: 50.8, usedFor: "US passport, US visa, Green Card, India OCI" },
  eu: { label: "35×45 mm", width: 35, height: 45, usedFor: "UK, Schengen / EU, India, Australia, Singapore, NZ" },
  cn: { label: "33×48 mm", width: 33, height: 48, usedFor: "China passport and visa" },
  my: { label: "35×50 mm", width: 35, height: 50, usedFor: "Malaysia passport, Mexico visa" },
  ca: { label: "50×70 mm", width: 50, height: 70, usedFor: "Canada passport" },
};

export type Orientation = "portrait" | "landscape";

export function fitGrid(
  size: PhotoSizeKey,
  { borderless = false, gapMm = 0, orientation = "portrait" as Orientation } = {},
) {
  const photo = PHOTO_SIZES[size];
  const margin = borderless ? 0 : STANDARD_MARGIN_MM;
  const sheetW = orientation === "portrait" ? SHEET_W_MM : SHEET_H_MM;
  const sheetH = orientation === "portrait" ? SHEET_H_MM : SHEET_W_MM;
  // Small epsilon so exact fits (e.g. 2 × 50.8 mm on 101.6 mm) aren't lost to float error
  const cols = Math.floor((sheetW - 2 * margin + gapMm + 1e-6) / (photo.width + gapMm));
  const rows = Math.floor((sheetH - 2 * margin + gapMm + 1e-6) / (photo.height + gapMm));
  return { cols, rows, max: cols * rows, margin, sheetW, sheetH };
}

// Best orientation for a size: whichever fits more copies
export function bestFit(size: PhotoSizeKey, borderless: boolean, gapMm = 0) {
  const p = fitGrid(size, { borderless, gapMm, orientation: "portrait" });
  const l = fitGrid(size, { borderless, gapMm, orientation: "landscape" });
  return l.max > p.max ? { ...l, orientation: "landscape" as Orientation } : { ...p, orientation: "portrait" as Orientation };
}
