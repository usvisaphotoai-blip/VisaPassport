// Photo sizes and file-size targets, shared by the converter and the page content

export type PresetKey = "35x45" | "51x51" | "25x35" | "20x25" | "custom";
export type Unit = "mm" | "cm" | "in" | "px";

export const PRESETS: Record<
  Exclude<PresetKey, "custom">,
  { label: string; usedFor: string; widthMm: number; heightMm: number }
> = {
  "35x45": { label: "3.5 × 4.5 cm", usedFor: "Standard passport size photo for Indian forms, exams and ID", widthMm: 35, heightMm: 45 },
  "51x51": { label: "2 × 2 inch", usedFor: "Indian passport abroad (VFS), Indian visa, OCI, US visa", widthMm: 50.8, heightMm: 50.8 },
  "25x35": { label: "2.5 × 3.5 cm", usedFor: "PAN card application and small ID forms", widthMm: 25, heightMm: 35 },
  "20x25": { label: "2 × 2.5 cm", usedFor: "Stamp size photo", widthMm: 20, heightMm: 25 },
};

export const DPI_OPTIONS = [200, 300, 600] as const;

// Max output size in KB; 0 = no limit
export const KB_OPTIONS = [0, 20, 50, 100, 200, 500, 1024] as const;

const UNIT_TO_MM: Record<Exclude<Unit, "px">, number> = { mm: 1, cm: 10, in: 25.4 };

export const mmToPx = (mm: number, dpi: number) => Math.round((mm / 25.4) * dpi);

export function presetPixels(key: Exclude<PresetKey, "custom">, dpi: number) {
  const p = PRESETS[key];
  return { w: mmToPx(p.widthMm, dpi), h: mmToPx(p.heightMm, dpi) };
}

export function customPixels(w: number, h: number, unit: Unit, dpi: number) {
  if (unit === "px") return { w: Math.round(w), h: Math.round(h) };
  return { w: mmToPx(w * UNIT_TO_MM[unit], dpi), h: mmToPx(h * UNIT_TO_MM[unit], dpi) };
}
