// Builds the blank A4 passport photo templates offered on /passport-photo-a4-print-template.
// Grid matches the print generator's defaults (5 mm margin, no gap, best orientation).
// Usage: node scripts/gen-a4-templates.mjs
import fs from "fs";
import path from "path";
import { jsPDF } from "jspdf";

// Kept in sync with app/passport-photo-print-template-generator/sheet-layout.ts
const A4 = { width: 210, height: 297 };
const MARGIN = 5;

const TEMPLATES = [
  { file: "a4-passport-photo-template-35x45mm.pdf", w: 35, h: 45, label: "35 × 45 mm", usedFor: "UK, EU / Schengen, India, Australia, Nepal and most other countries" },
  { file: "a4-passport-photo-template-2x2in.pdf", w: 50.8, h: 50.8, label: "2 × 2 in (51 × 51 mm)", usedFor: "US passport and visa, India OCI" },
];

function fitGrid(sheetW, sheetH, w, h) {
  const cols = Math.max(0, Math.floor((sheetW - 2 * MARGIN + 1e-6) / w));
  const rows = Math.max(0, Math.floor((sheetH - 2 * MARGIN + 1e-6) / h));
  return { sheetW, sheetH, cols, rows, max: cols * rows };
}

function layout(w, h) {
  const portrait = { ...fitGrid(A4.width, A4.height, w, h), orientation: "portrait" };
  const landscape = { ...fitGrid(A4.height, A4.width, w, h), orientation: "landscape" };
  return landscape.max > portrait.max ? landscape : portrait;
}

const outDir = path.join(process.cwd(), "public/templates");
fs.mkdirSync(outDir, { recursive: true });

for (const t of TEMPLATES) {
  const l = layout(t.w, t.h);
  const doc = new jsPDF({ orientation: l.orientation, unit: "mm", format: "a4", compress: true });
  doc.setProperties({
    title: `A4 passport photo template ${t.label}`,
    subject: `${l.max} photos of ${t.label} on A4 paper`,
    author: "PixPassport",
    creator: "pixpassport.com",
  });

  const gridW = l.cols * t.w;
  const gridH = l.rows * t.h;
  const x0 = (l.sheetW - gridW) / 2;
  const y0 = (l.sheetH - gridH) / 2;

  // Header (above the crop marks); the URL only goes on the right when the grid is wide enough
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(40);
  doc.text(`A4 passport photo template · ${t.label} · ${l.max} photos (${l.cols} × ${l.rows})`, x0, y0 - 6);
  if (gridW > 200) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(110);
    doc.text("pixpassport.com/passport-photo-a4-print-template", x0 + gridW, y0 - 6, { align: "right" });
  }
  doc.setFont("helvetica", "normal");

  // Photo cells with a faint head-position guide (chin to crown ~70–80% of height)
  doc.setLineWidth(0.15);
  for (let r = 0; r < l.rows; r++) {
    for (let c = 0; c < l.cols; c++) {
      const x = x0 + c * t.w;
      const y = y0 + r * t.h;
      doc.setDrawColor(150);
      doc.rect(x, y, t.w, t.h);
      doc.setDrawColor(215);
      doc.setLineDashPattern([0.8, 0.8], 0);
      const headH = t.h * 0.75;
      const headW = headH * 0.72;
      doc.ellipse(x + t.w / 2, y + t.h * 0.12 + headH / 2, headW / 2, headH / 2);
      doc.setLineDashPattern([], 0);
      doc.setFontSize(5);
      doc.setTextColor(170);
      doc.text(t.label, x + t.w / 2, y + t.h - 1.5, { align: "center" });
    }
  }

  // Crop marks outside the grid on every cut line
  doc.setDrawColor(60);
  doc.setLineWidth(0.2);
  const tick = 2.5;
  for (let c = 0; c <= l.cols; c++) {
    const x = x0 + c * t.w;
    doc.line(x, y0 - 1 - tick, x, y0 - 1);
    doc.line(x, y0 + gridH + 1, x, y0 + gridH + 1 + tick);
  }
  for (let r = 0; r <= l.rows; r++) {
    const y = y0 + r * t.h;
    doc.line(x0 - 1 - tick, y, x0 - 1, y);
    doc.line(x0 + gridW + 1, y, x0 + gridW + 1 + tick, y);
  }

  // Footer: short instruction lines on the left, a 50 mm ruler on the right to check the scale
  const fy = y0 + gridH + 5;
  doc.setFontSize(7);
  doc.setTextColor(80);
  doc.text(`Used for: ${t.usedFor}.`, x0, fy);
  doc.text('Print at 100% / "Actual size" with scaling off. Cut along the outer lines.', x0, fy + 3);
  doc.text("Check: the ruler on the right must measure exactly 50 mm.", x0, fy + 6);
  const rx = x0 + gridW - 50;
  const ry = fy + 2.5;
  doc.setDrawColor(40);
  doc.setLineWidth(0.25);
  doc.line(rx, ry, rx + 50, ry);
  for (let i = 0; i <= 50; i += 5) doc.line(rx + i, ry, rx + i, ry - (i % 10 === 0 ? 2 : 1));
  doc.setFontSize(6);
  doc.text("0", rx, ry + 2.5, { align: "center" });
  doc.text("50 mm", rx + 50, ry + 2.5, { align: "center" });

  const buf = Buffer.from(doc.output("arraybuffer"));
  fs.writeFileSync(path.join(outDir, t.file), buf);
  console.log(`${t.file}: ${l.orientation}, ${l.cols}×${l.rows} = ${l.max} photos, ${(buf.length / 1024).toFixed(1)} KB`);
}
