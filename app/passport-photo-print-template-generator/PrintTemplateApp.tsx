"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import jsPDF from "jspdf";
import { useSearchParams } from "next/navigation";
import { getClientTimezoneCurrency } from "@/lib/currency";
import { trackAdsPurchaseConversion } from "@/lib/ads-conversion";
import { HD_UNLOCK_KEY } from "@/lib/print-sheet-checkout";
import {
  PRINT_SHEET_PRODUCT,
  PRINT_SHEET_PRODUCT_NAME,
  getPrintSheetPrice,
} from "@/lib/print-sheet-pricing";
import {
  type SheetSize,
  PAPER_GROUPS,
  PAPER_SIZES,
  QUICK_PAPERS,
  PHOTO_SIZES,
  DEFAULT_MARGIN_MM,
  DEFAULT_GAP_MM,
  computeLayout,
} from "./sheet-layout";

type DownloadFormat = "pdf" | "jpg" | "png";

// Custom sizes are clamped to keep the canvas a sane size
const MIN_PAPER_MM = 50;
const MAX_PAPER_MM = 500;
const MIN_PHOTO_MM = 10;
const MAX_PHOTO_MM = 150;
const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;
// Below this the print starts to look soft
const MIN_PRINT_DPI = 200;
// iOS Safari refuses canvases over ~16.7M pixels, so big sheets drop below 300 DPI
const MAX_CANVAS_PIXELS = 16_000_000;
const FOOTER_MM = 3.5;
// Free downloads and the on-screen preview; HD (paid) files use the full sheet DPI (up to 300)
const FREE_DPI = 200;
// Free downloads wait this long; paid HD downloads are instant
const FREE_DELAY_MS = 270_000;

const formatClock = (ms: number) => {
  const total = Math.ceil(ms / 1000);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
};
// Same-origin link to a customer's paid photo, as sent by the preview page
const PAID_PHOTO_LINK = /^\/api\/download\/[a-f0-9]{24}(\?|$)/i;

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

function dpiForSheet(widthMm: number, heightMm: number) {
  const sqIn = (widthMm / 25.4) * (heightMm / 25.4);
  return Math.min(300, Math.floor(Math.sqrt(MAX_CANVAS_PIXELS / sqIn)));
}

// Canvas JPEGs are tagged 72 DPI, which makes some photo viewers print them at the wrong size
async function setJpegDpi(blob: Blob, dpi: number): Promise<Blob> {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  const isJfif =
    bytes[2] === 0xff && bytes[3] === 0xe0 &&
    bytes[6] === 0x4a && bytes[7] === 0x46 && bytes[8] === 0x49 && bytes[9] === 0x46;
  if (!isJfif) return blob;
  bytes[13] = 1; // density unit: dots per inch
  bytes[14] = dpi >> 8;
  bytes[15] = dpi & 0xff;
  bytes[16] = dpi >> 8;
  bytes[17] = dpi & 0xff;
  return new Blob([bytes], { type: "image/jpeg" });
}

// PNG equivalent of setJpegDpi: inserts a pHYs chunk right after IHDR
const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
function crc32(bytes: Uint8Array) {
  let c = 0xffffffff;
  for (const b of bytes) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
async function setPngDpi(blob: Blob, dpi: number): Promise<Blob> {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  const IHDR_END = 8 + 25; // signature + IHDR chunk (length, type, 13 data bytes, crc)
  const ppm = Math.round(dpi / 0.0254);
  const chunk = new Uint8Array(21);
  const view = new DataView(chunk.buffer);
  view.setUint32(0, 9);
  chunk.set([0x70, 0x48, 0x59, 0x73], 4); // "pHYs"
  view.setUint32(8, ppm);
  view.setUint32(12, ppm);
  chunk[16] = 1; // unit: metre
  view.setUint32(17, crc32(chunk.subarray(4, 17)));
  return new Blob([bytes.subarray(0, IHDR_END), chunk, bytes.subarray(IHDR_END)], { type: "image/png" });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // Cross-origin photos would taint the canvas and block the download
    try {
      if (!/^(data|blob):/.test(src) && new URL(src, window.location.href).origin !== window.location.origin) {
        img.crossOrigin = "anonymous";
      }
    } catch {
      // Unparseable URL: let the load fail below
    }
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("load failed"));
    img.src = src;
  });
}

// Number field that lets the user type freely and only commits a clamped value on blur / Enter
function DimensionInput({
  label,
  valueMm,
  onCommit,
  min,
  max,
  unit = "mm",
}: {
  label: string;
  valueMm: number;
  onCommit: (mm: number) => void;
  min: number;
  max: number;
  unit?: "mm" | "in";
}) {
  const factor = unit === "in" ? 25.4 : 1;
  const format = (mm: number) => String(+(mm / factor).toFixed(unit === "in" ? 2 : 1));
  const [draft, setDraft] = useState(format(valueMm));
  // Re-sync the draft when the value or unit changes from outside
  const [synced, setSynced] = useState({ valueMm, unit });
  if (synced.valueMm !== valueMm || synced.unit !== unit) {
    setSynced({ valueMm, unit });
    setDraft(format(valueMm));
  }

  const commit = () => {
    const n = parseFloat(draft);
    if (isNaN(n) || n <= 0) {
      setDraft(format(valueMm));
      return;
    }
    const mm = Math.round(clamp(n * factor, min, max) * 10) / 10;
    onCommit(mm);
    setDraft(format(mm));
  };

  return (
    <label className="flex-1 min-w-0">
      <span className="block text-[10px] font-semibold text-slate-500 mb-0.5">{label}</span>
      <span className="flex items-center border border-slate-200 rounded-lg bg-white focus-within:ring-2 focus-within:ring-lime-500">
        <input
          type="number"
          inputMode="decimal"
          step={unit === "in" ? 0.1 : 1}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => e.key === "Enter" && commit()}
          className="w-full min-w-0 bg-transparent px-2 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none"
        />
        <span className="pr-2 text-[10px] font-semibold text-slate-400">{unit}</span>
      </span>
    </label>
  );
}

// Draws the full print sheet onto a canvas at the given DPI
type SheetRenderOptions = {
  image: HTMLImageElement;
  layout: ReturnType<typeof computeLayout>;
  photo: SheetSize;
  photoCount: number;
  cropLines: boolean;
  margin: number;
  spacing: number;
  dpi: number;
};

function renderSheet(canvas: HTMLCanvasElement, options: SheetRenderOptions) {
  const { image: imageObj, layout, photo, photoCount, cropLines, margin, spacing, dpi: sheetDpi } = options;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const mmToPx = (mm: number) => (mm * sheetDpi) / 25.4;
  const { sheetW, sheetH, cols, rows } = layout;

  const cWidth = Math.round(mmToPx(sheetW));
  const cHeight = Math.round(mmToPx(sheetH));
  canvas.width = cWidth;
  canvas.height = cHeight;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, cWidth, cHeight);
  ctx.imageSmoothingQuality = "high";

  const spacingPx = mmToPx(spacing);
  const photoWPx = mmToPx(photo.width);
  const photoHPx = mmToPx(photo.height);

  // Center the full grid on the sheet
  const gridW = cols * photoWPx + Math.max(0, cols - 1) * spacingPx;
  const gridH = rows * photoHPx + Math.max(0, rows - 1) * spacingPx;
  const startX = (cWidth - gridW) / 2;
  const startY = (cHeight - gridH) / 2;

  // Center-crop the source to the target aspect ratio, so photos never stretch
  const targetRatio = photo.width / photo.height;
  const srcRatio = imageObj.naturalWidth / imageObj.naturalHeight;
  const sw = srcRatio > targetRatio ? imageObj.naturalHeight * targetRatio : imageObj.naturalWidth;
  const sh = srcRatio > targetRatio ? imageObj.naturalHeight : imageObj.naturalWidth / targetRatio;
  const sx = (imageObj.naturalWidth - sw) / 2;
  const sy = (imageObj.naturalHeight - sh) / 2;

  ctx.strokeStyle = "#000000";
  ctx.lineWidth = Math.max(1, mmToPx(0.15));

  let count = 0;
  for (let r = 0; r < rows && count < photoCount; r++) {
    for (let c = 0; c < cols && count < photoCount; c++) {
      const x = startX + c * (photoWPx + spacingPx);
      const y = startY + r * (photoHPx + spacingPx);
      ctx.drawImage(imageObj, sx, sy, sw, sh, x, y, photoWPx, photoHPx);
      if (cropLines) ctx.strokeRect(x, y, photoWPx, photoHPx);
      count++;
    }
  }

  // Footer only goes where it can't overlap a photo (skipped on edge-to-edge sheets)
  const freeBelowPx = cHeight - (startY + gridH);
  if (freeBelowPx >= mmToPx(FOOTER_MM)) {
    const printDate = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const sidePx = mmToPx(Math.max(margin, 3));
    const centerY = cHeight - Math.min(freeBelowPx, mmToPx(Math.max(margin, FOOTER_MM))) / 2;
    // Use the site's web font (already loaded on the page) so the sheet matches the brand
    const fontFamily = getComputedStyle(document.body).fontFamily || "Arial, sans-serif";
    const brandFont = `700 ${mmToPx(1.9)}px ${fontFamily}`;
    const sepFont = `400 ${mmToPx(1.9)}px ${fontFamily}`;
    const metaFont = `500 ${mmToPx(1.6)}px ${fontFamily}`;
    const domains = ["pixpassport.com", "pixpassport.uk"];
    const sep = "  •  ";

    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    ctx.font = brandFont;
    const domainWidths = domains.map((d) => ctx.measureText(d).width);
    ctx.font = sepFont;
    const sepW = ctx.measureText(sep).width;

    // Lime badge: dot + "pixpassport.com • pixpassport.uk"
    const padX = mmToPx(1.3);
    const dotR = mmToPx(0.65);
    const dotGap = mmToPx(0.9);
    const pillH = mmToPx(3);
    const pillW = padX + dotR * 2 + dotGap + domainWidths[0] + sepW + domainWidths[1] + padX;
    const pillY = centerY - pillH / 2;
    ctx.beginPath();
    if (typeof ctx.roundRect === "function") {
      ctx.roundRect(sidePx, pillY, pillW, pillH, pillH / 2);
    } else {
      ctx.rect(sidePx, pillY, pillW, pillH);
    }
    ctx.fillStyle = "#f7fee7";
    ctx.fill();
    ctx.lineWidth = Math.max(1, mmToPx(0.12));
    ctx.strokeStyle = "#bef264";
    ctx.stroke();

    let x = sidePx + padX;
    ctx.beginPath();
    ctx.arc(x + dotR, centerY, dotR, 0, Math.PI * 2);
    ctx.fillStyle = "#65a30d";
    ctx.fill();
    x += dotR * 2 + dotGap;

    ctx.font = brandFont;
    ctx.fillStyle = "#3f6212";
    ctx.fillText(domains[0], x, centerY);
    x += domainWidths[0];
    ctx.font = sepFont;
    ctx.fillStyle = "#84cc16";
    ctx.fillText(sep, x, centerY);
    x += sepW;
    ctx.font = brandFont;
    ctx.fillStyle = "#3f6212";
    ctx.fillText(domains[1], x, centerY);

    // Size and date on the right, only when there's room beside the badge
    const meta = `${photo.width}×${photo.height} mm · ${printDate}`;
    ctx.font = metaFont;
    const metaRight = cWidth - sidePx;
    if (sidePx + pillW + mmToPx(3) + ctx.measureText(meta).width <= metaRight) {
      ctx.textAlign = "right";
      ctx.fillStyle = "#64748b";
      ctx.fillText(meta, metaRight, centerY);
    }
  }
}

// Error Dialog Component
function ErrorDialog({
  message,
  onRetry,
  onBack,
}: {
  message: string;
  onRetry: () => void;
  onBack: () => void;
}) {
  return (
  <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
      <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">⚠️</span>
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">
        Something went wrong
      </h3>
      <p className="text-sm text-slate-500 mb-6">{message}</p>
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-sm transition-all"
        >
          ← Back
        </button>
        <button
          onClick={onRetry}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm transition-all"
        >
          🔄 Retry
        </button>
      </div>
    </div>
  </div>
  );
}

function Toggle({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (on: boolean) => void;
}) {
  return (
    <label className="flex items-start justify-between gap-3 cursor-pointer">
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-slate-800">{label}</span>
        {hint && <span className="block text-[11px] text-slate-500 leading-snug">{hint}</span>}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative shrink-0 mt-0.5 w-10 h-6 rounded-full transition-colors cursor-pointer ${
          checked ? "bg-lime-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-4" : ""
          }`}
        />
      </button>
    </label>
  );
}

export default function PrintTemplateApp() {
  const searchParams = useSearchParams();
  const imageUrl =
    searchParams.get("imageUrl") ||
    searchParams.get("image") ||
    searchParams.get("photoUrl") ||
    searchParams.get("photo");
  const customWidth = searchParams.get("width");
  const customHeight = searchParams.get("height");
  const customName = searchParams.get("name");

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);
  const [imageLoadError, setImageLoadError] = useState<string | null>(null);
  // Paid photo link that the server says has expired (deleted after 24 hours)
  const [paidPhotoExpired, setPaidPhotoExpired] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // ?paper=A4 (any PAPER_SIZES key) lets landing pages open the tool on their paper size
  const paperParam = searchParams.get("paper");
  const [paperSize, setPaperSize] = useState<string>(
    paperParam && PAPER_SIZES[paperParam] ? paperParam : "4x6",
  );
  const [customPaper, setCustomPaper] = useState({ width: 100, height: 150 }); // mm
  const [customPaperUnit, setCustomPaperUnit] = useState<"mm" | "in">("mm");
  const [showMorePapers, setShowMorePapers] = useState(false);
  const isQuickPaper = QUICK_PAPERS.includes(paperSize);

  const [photoSize, setPhotoSize] = useState<string>("35x45");
  const [customPhoto, setCustomPhoto] = useState<SheetSize>({ name: "Custom", width: 35, height: 45 });

  const [copies, setCopies] = useState<number>(0); // 0 = fill the sheet
  const [cropLines, setCropLines] = useState<boolean>(true);
  const [margin, setMargin] = useState<number>(DEFAULT_MARGIN_MM); // mm
  const [spacing, setSpacing] = useState<number>(0); // mm

  const paper: SheetSize = useMemo(
    () =>
      paperSize === "custom"
        ? { name: "Custom", ...customPaper }
        : PAPER_SIZES[paperSize] || PAPER_SIZES["4x6"],
    [paperSize, customPaper],
  );
  const photo: SheetSize = useMemo(
    () => (photoSize === "custom" ? customPhoto : PHOTO_SIZES[photoSize] || PHOTO_SIZES["35x45"]),
    [photoSize, customPhoto],
  );
  const layout = useMemo(
    () => computeLayout(paper, photo, margin, spacing),
    [paper, photo, margin, spacing],
  );
  const photoCount = copies === 0 ? layout.max : Math.min(copies, layout.max);
  // e.g. six US 2×2 photos only fit on 4×6 edge-to-edge
  const noMarginMax = useMemo(
    () => (margin > 0 ? computeLayout(paper, photo, 0, spacing).max : 0),
    [paper, photo, margin, spacing],
  );
  const sheetDpi = dpiForSheet(layout.sheetW, layout.sheetH);

  // Source pixels per inch once the photo is cropped to the target size
  const sourceDpi = imageObj
    ? Math.round(
        Math.min(
          imageObj.naturalWidth,
          imageObj.naturalHeight * (photo.width / photo.height),
        ) / (photo.width / 25.4),
      )
    : null;

  const loadPhotoFromUrl = (url: string) => {
    setImageSrc(url);
    setImageLoadError(null);
    setPaidPhotoExpired(false);
    // Fetch once and decode the bytes, so the status we explain is the one that actually failed
    // (a second request could succeed and hide it), and ride out cold starts / blips with retries
    const fetchPhoto = async (): Promise<{ img: HTMLImageElement | null; status: number }> => {
      let status = 0;
      for (let attempt = 0; attempt < 3; attempt++) {
        if (attempt > 0) await new Promise((r) => setTimeout(r, 800 * attempt));
        try {
          const res = await fetch(url, { cache: "no-store" });
          status = res.status;
          if (res.ok) {
            const objectUrl = URL.createObjectURL(await res.blob());
            try {
              return { img: await loadImage(objectUrl), status };
            } catch {
              return { img: null, status }; // Downloaded but not a decodable image
            }
          }
          if (status < 500) break; // 4xx won't change on retry
        } catch {
          status = 0; // Network or CORS error
        }
      }
      // Cross-origin links without CORS can still be shown by an image element
      if (status === 0) {
        try {
          return { img: await loadImage(url), status };
        } catch {
          // Fall through to the error message
        }
      }
      return { img: null, status };
    };
    fetchPhoto()
      .then(({ img, status }) => {
        if (img) {
          setImageObj(img);
          return;
        }
        setImageObj(null);
        setImageSrc(null);
        // /api/download checks token and payment before expiry, so 410 means a paid order
        if (status === 410 && PAID_PHOTO_LINK.test(url)) {
          setPaidPhotoExpired(true);
          return;
        }
        setImageLoadError(
          status === 402
            ? "This photo hasn't been paid for yet. Complete your order on the preview page, then try again."
            : status === 403 || status === 404
              ? "This link is no longer valid. Open the print sheet again from your order page, or upload your photo."
              : "Failed to load your photo. Please try again or upload a new photo.",
        );
      });
  };

  // Load initial image if passed in query params (searchParams already decodes it)
  useEffect(() => {
    if (imageUrl) loadPhotoFromUrl(imageUrl);
  }, [imageUrl]);

  // Load custom size if passed in query params
  useEffect(() => {
    if (customWidth && customHeight) {
      const w = parseFloat(customWidth);
      const h = parseFloat(customHeight);
      if (!isNaN(w) && !isNaN(h) && w > 0 && h > 0) {
        // Prefer a matching preset over a one-off custom size
        const preset = Object.entries(PHOTO_SIZES).find(
          ([, p]) => Math.abs(p.width - w) <= 1 && Math.abs(p.height - h) <= 1,
        );
        if (preset) {
          setPhotoSize(preset[0]);
        } else {
          setCustomPhoto({
            name: customName || `${w}×${h} mm`,
            width: clamp(w, MIN_PHOTO_MM, MAX_PHOTO_MM),
            height: clamp(h, MIN_PHOTO_MM, MAX_PHOTO_MM),
          });
          setPhotoSize("custom");
        }
      }
    }
  }, [customWidth, customHeight, customName]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Handle Image Upload (file picker and drag & drop)
  const loadPhotoFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setUploadError("Please choose an image file (JPG, PNG or WebP).");
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      setUploadError("This image is larger than 25 MB. Please choose a smaller file.");
      return;
    }
    setUploadError(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      loadImage(src)
        .then((img) => {
          setImageSrc(src);
          setImageObj(img);
        })
        .catch(() =>
          setUploadError("This image format isn't supported by your browser. Please use a JPG or PNG."),
        );
    };
    reader.onerror = () => setUploadError("Couldn't read this file. Please try another photo.");
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    loadPhotoFile(e.target.files?.[0]);
    e.target.value = ""; // allow picking the same file again
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    loadPhotoFile(e.dataTransfer.files?.[0]);
  };

  const handleChangePhoto = () => {
    setImageSrc(null);
    setImageObj(null);
    setUploadError(null);
  };

  // Draw the on-screen preview at standard quality; downloads re-render at their own DPI
  useEffect(() => {
    if (!imageObj || !canvasRef.current) return;
    renderSheet(canvasRef.current, {
      image: imageObj,
      layout,
      photo,
      photoCount,
      cropLines,
      margin,
      spacing,
      dpi: Math.min(FREE_DPI, sheetDpi),
    });
  }, [imageObj, layout, photo, photoCount, cropLines, margin, spacing, sheetDpi]);

  // Free-download countdown: elapsed ms, kept running while the dialog is closed
  const [freeDialogOpen, setFreeDialogOpen] = useState(false);
  const [countdownMs, setCountdownMs] = useState(0);
  const timerRef = useRef<number | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  // HD unlock: one payment unlocks HD downloads for any layout for the rest of the session
  const hdPrice = useMemo(() => getPrintSheetPrice(getClientTimezoneCurrency()), []);
  const [hdUnlocked, setHdUnlocked] = useState(() => {
    try {
      return typeof window !== "undefined" && !!sessionStorage.getItem(HD_UNLOCK_KEY);
    } catch {
      return false;
    }
  });
  const [payLoading, setPayLoading] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  // Customers arriving from their paid passport photo (preview page) get HD included.
  // /api/download only serves a photo that is paid and token/session-authorised, so a
  // same-origin link to it that we're showing means the purchase was checked server-side.
  // If they swap in a different photo, normal pricing applies to that one.
  // An expired paid photo still counts: they can upload the copy they downloaded.
  const isPaidPhotoLink = !!imageUrl && PAID_PHOTO_LINK.test(imageUrl);
  const hasPaidPhoto = isPaidPhotoLink && (imageSrc === imageUrl || paidPhotoExpired);
  const hdAccess = hdUnlocked || hasPaidPhoto;

  const fileBaseName = `pixpassport.com_${photoSize === "custom" ? `${photo.width}x${photo.height}mm` : photoSize}_${paperSize === "custom" ? `${paper.width}x${paper.height}mm` : paperSize}_${photoCount}-photos`;

  const saveBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = filename;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
  };

  // Render the sheet off-screen at the requested DPI and save it in the requested format
  const executeDownload = async (format: DownloadFormat, hd: boolean) => {
    if (!imageObj) return;
    const dpi = hd ? sheetDpi : Math.min(FREE_DPI, sheetDpi);
    const canvas = document.createElement("canvas");
    renderSheet(canvas, { image: imageObj, layout, photo, photoCount, cropLines, margin, spacing, dpi });
    const name = `${fileBaseName}${hd ? `_HD-${dpi}dpi` : ""}`;

    if (format === "pdf") {
      const { sheetW, sheetH } = layout;
      const pdf = new jsPDF({
        orientation: sheetW > sheetH ? "landscape" : "portrait",
        unit: "mm",
        format: [sheetW, sheetH],
      });
      pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, sheetW, sheetH);
      pdf.save(`${name}.pdf`);
      return;
    }

    const mime = format === "png" ? "image/png" : "image/jpeg";
    const raw = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, mime, 0.95));
    if (!raw) throw new Error("toBlob failed");
    const blob = format === "png" ? await setPngDpi(raw, dpi) : await setJpegDpi(raw, dpi);
    saveBlob(blob, `${name}.${format}`);
  };

  const downloadHd = (format: DownloadFormat) => {
    if (!hdAccess || layout.max === 0) return;
    setDownloadError(null);
    uploadFinalImageToCloudinary(format);
    executeDownload(format, true).catch((err) => {
      console.warn("[Download] HD failed:", err);
      setDownloadError("Your HD file couldn't be created. Please try again.");
    });
  };

  // Upload final image to Cloudinary
  const uploadFinalImageToCloudinary = async (format: DownloadFormat) => {
    try {
      if (!canvasRef.current) return;
      const dataUrl = canvasRef.current.toDataURL("image/jpeg", 0.95);

      await fetch("/api/upload-template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: dataUrl,
          paperSize,
          photoSize,
          format,
        }),
      });
    } catch (err) {
      console.warn("[Cloudinary] Upload error:", err);
    }
  };

  const clearTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  useEffect(() => clearTimer, []);

  // The free-download countdown starts on the first open and keeps running while the
  // dialog is closed, so reopening picks up where it left off; paying skips it
  const openFreeDownload = () => {
    if (!imageObj || layout.max === 0) return;
    setDownloadError(null);
    setFreeDialogOpen(true);
    if (timerRef.current || countdownMs >= FREE_DELAY_MS) return;
    uploadFinalImageToCloudinary("jpg");
    const startedAt = Date.now();
    timerRef.current = window.setInterval(() => {
      const elapsed = Math.min(Date.now() - startedAt, FREE_DELAY_MS);
      setCountdownMs(elapsed);
      if (elapsed >= FREE_DELAY_MS) clearTimer();
    }, 250);
  };

  const downloadFree = (format: DownloadFormat) => {
    setDownloadError(null);
    executeDownload(format, false).catch((err) => {
      console.warn("[Download] Failed:", err);
      setDownloadError(
        "Your download couldn't be created. Please try again, or re-upload your photo from your device.",
      );
    });
  };

  const freeReady = countdownMs >= FREE_DELAY_MS;
  const countdownRunning = countdownMs > 0 && !freeReady;

  const unlockHd = (orderId: string) => {
    try {
      sessionStorage.setItem(HD_UNLOCK_KEY, orderId);
    } catch {
      // Private mode: stays unlocked until the page is reloaded
    }
    clearTimer();
    setHdUnlocked(true);
  };

  const loadRazorpay = () =>
    new Promise<boolean>((resolve) => {
      if ((window as any).Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const getGaClientId = () =>
    new Promise<string>((resolve) => {
      const gtag = (window as any).gtag;
      if (typeof gtag !== "function") return resolve("");
      setTimeout(() => resolve(""), 500);
      try {
        gtag("get", "G-RJFKP2ZXNX", "client_id", (id: string) => resolve(id || ""));
      } catch {
        resolve("");
      }
    });

  const handleBuyHd = async () => {
    if (payLoading || layout.max === 0) return;
    setFreeDialogOpen(false);
    setPayLoading(true);
    setPayError(null);

    try {
      if (!(await loadRazorpay())) {
        throw new Error("Payment window failed to load. Please check your connection and try again.");
      }
      const gaClientId = await getGaClientId();

      const res = await fetch("/api/print-sheet/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currency: hdPrice.currency, paperSize, photoSize, gaClientId }),
      });
      const order = await res.json();
      if (!res.ok) throw new Error(order.error || "Couldn't start the payment. Please try again.");

      const gaItem = {
        item_id: PRINT_SHEET_PRODUCT,
        item_name: PRINT_SHEET_PRODUCT_NAME,
        price: hdPrice.amount,
        quantity: 1,
        item_category: "Print Sheet",
      };
      (window as any).gtag?.("event", "begin_checkout", {
        value: hdPrice.amount,
        currency: hdPrice.currency,
        items: [gaItem],
      });

      const rzp = new (window as any).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "PixPassport",
        description: PRINT_SHEET_PRODUCT_NAME,
        image: "https://pixpassport.com/logo.png",
        theme: { color: "#65a30d" },
        modal: { ondismiss: () => setPayLoading(false) },
        handler: async (response: any) => {
          try {
            const verifyRes = await fetch("/api/print-sheet/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...response, printSheetOrderId: order.printSheetOrderId, gaClientId }),
            });
            if (!verifyRes.ok) {
              throw new Error("We couldn't confirm your payment. Please contact support with your payment ID.");
            }
            unlockHd(order.printSheetOrderId);
            (window as any).gtag?.("event", "purchase", {
              transaction_id: response.razorpay_payment_id,
              value: hdPrice.amount,
              currency: hdPrice.currency,
              items: [gaItem],
            });
            trackAdsPurchaseConversion({
              transactionId: response.razorpay_payment_id,
              value: hdPrice.amount,
              currency: hdPrice.currency,
            });
            // They paid to download, so start the PDF straight away
            executeDownload("pdf", true).catch(() =>
              setDownloadError("Payment done! Your PDF didn't start, so use the buttons below to download."),
            );
          } catch (err: any) {
            setPayError(err.message);
          } finally {
            setPayLoading(false);
          }
        },
      });
      rzp.on("payment.failed", (response: any) => {
        setPayError(`Payment failed: ${response.error?.description || "please try again."}`);
        setPayLoading(false);
      });
      rzp.open();
    } catch (err: any) {
      setPayError(err.message || "Couldn't start the payment. Please try again.");
      setPayLoading(false);
    }
  };

  // Retry handler - reload the image
  const handleRetry = () => {
    if (imageUrl) loadPhotoFromUrl(imageUrl);
  };

  // Back handler - go to previous page
  const handleBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Free download dialog (4.5-minute countdown) */}
      {freeDialogOpen && !hdAccess && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="free-download-title"
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 text-center border border-slate-100 relative overflow-hidden"
          >
            {/* Top gradient accent line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-lime-500 via-emerald-500 to-teal-500" />

            <button
              type="button"
              autoFocus
              onClick={() => setFreeDialogOpen(false)}
              aria-label="Close"
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            <h3 id="free-download-title" className="text-xl font-bold text-slate-800 mb-1">
              {freeReady ? "Free download ready" : "Free download in"}
            </h3>

            {freeReady ? (
              <div className="grid grid-cols-2 gap-2 mt-4 mb-2.5">
                {(["jpg", "pdf"] as const).map((format) => (
                  <button
                    key={format}
                    type="button"
                    onClick={() => downloadFree(format)}
                    className="py-2.5 rounded-xl border border-lime-600 bg-white text-lime-800 hover:bg-lime-50 text-sm font-black transition-colors cursor-pointer"
                  >
                    ⬇ {format.toUpperCase()}
                  </button>
                ))}
              </div>
            ) : (
              <>
                <p className="text-4xl font-black text-lime-700 tabular-nums my-3" aria-hidden>
                  {formatClock(FREE_DELAY_MS - countdownMs)}
                </p>
                <div
                  className="w-full bg-slate-100 rounded-full h-3 mb-2.5 overflow-hidden p-0.5 border border-slate-200"
                  role="progressbar"
                  aria-label="Free download countdown"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round((countdownMs / FREE_DELAY_MS) * 100)}
                >
                  <div
                    className="bg-gradient-to-r from-lime-500 to-emerald-600 h-full rounded-full transition-[width] duration-200 ease-linear"
                    style={{ width: `${(countdownMs / FREE_DELAY_MS) * 100}%` }}
                  />
                </div>
              </>
            )}

            <p className="text-xs text-slate-500 mb-5">
              Standard quality ({Math.min(FREE_DPI, sheetDpi)} DPI). You can close this window, the timer keeps running.
            </p>

            {downloadError && (
              <p role="alert" className="mb-4 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {downloadError}
              </p>
            )}

            {/* Details Badge */}
            <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600 flex items-center justify-center gap-2 border border-slate-100">
              <span className="text-lime-600 font-bold">✓</span>
              <span>
                {photoCount} photos on {paper.name} ({layout.sheetW}×{layout.sheetH} mm)
              </span>
            </div>

            {/* Upsell: skip the wait */}
            <button
              type="button"
              onClick={handleBuyHd}
              disabled={payLoading || layout.max === 0}
              className="mt-4 w-full flex items-center justify-between gap-3 rounded-xl bg-lime-700 hover:bg-lime-800 active:bg-lime-900 text-white px-4 py-3 text-left shadow-md shadow-lime-700/20 transition-all cursor-pointer disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed"
            >
              <span className="min-w-0">
                <span className="block text-sm font-black">
                  {payLoading ? "Opening secure checkout…" : "Skip the wait · Download HD sheet"}
                </span>
                <span className="block text-xs font-medium text-lime-100 mt-0.5">
                  Sharper 300 DPI print in PDF, JPG and PNG, instantly.
                </span>
              </span>
              <span className="shrink-0 bg-white text-lime-800 font-black text-sm px-2.5 py-1 rounded-lg">
                {hdPrice.formatted}
              </span>
            </button>
            <p className="sr-only" aria-live="polite">
              {freeReady ? "Free download ready" : ""}
            </p>
          </div>
        </div>
      )}

      {/* Error Dialog */}
      {imageLoadError && (
        <ErrorDialog
          message={imageLoadError}
          onRetry={handleRetry}
          onBack={handleBack}
        />
      )}
      {!imageSrc ? (
        <div className="space-y-6">
          {paidPhotoExpired && (
            <div role="status" className="flex gap-3 rounded-2xl border border-lime-300 bg-lime-50 p-4 sm:p-5">
              <span className="text-2xl leading-none" aria-hidden>🔒</span>
              <div className="min-w-0">
                <p className="text-sm sm:text-base font-black text-lime-950">
                  Your photo was deleted after 24 hours to protect your privacy
                </p>
                <p className="text-sm text-lime-900 mt-1 leading-relaxed">
                  Upload the passport photo you downloaded from your order below. Your
                  HD print sheet is still <strong>included with your order</strong>, so there&apos;s nothing to pay.
                </p>
              </div>
            </div>
          )}
          {/* Main 2-Column Hero & Upload Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Left Column: Upload Dropzone & Controls */}
              <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-2 bg-lime-50 border border-lime-200 rounded-full px-3 py-1 text-xs font-bold text-lime-800 mb-4">
                    <span className="w-2 h-2 rounded-full bg-lime-500 animate-pulse" />
                    <span>Free Print Sheet · HD 300 DPI Option</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug mb-3">
                    Upload Your Passport Photo
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 mb-6 leading-relaxed">
                    Upload a single cropped passport photo. Our generator arranges multiple copies automatically on standard photo paper with precision cutting lines.
                  </p>

                  {/* Drag and Drop Zone */}
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label="Upload your passport photo"
                    className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 ${
                      isDragging
                        ? "border-lime-600 bg-lime-100/70 scale-[1.01]"
                        : "border-lime-300 hover:border-lime-500 bg-lime-50/30 hover:bg-lime-50/60"
                    }`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById("photo-upload")?.click()}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        document.getElementById("photo-upload")?.click();
                      }
                    }}
                  >
                    <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-2xl shadow-sm border border-lime-100 text-lime-600 flex items-center justify-center text-2xl sm:text-3xl mb-4 group-hover:scale-105 transition-transform">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1">
                      Choose a passport photo to arrange
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mb-5">
                      {isDragging ? "Drop your photo to start" : "Drag & drop your file here, or click to browse"}
                    </p>
                    <button
                      type="button"
                      className="bg-lime-600 hover:bg-lime-700 active:scale-95 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md shadow-lime-600/20 transition-all inline-flex items-center gap-2 pointer-events-none"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="16" />
                        <line x1="8" y1="12" x2="16" y2="12" />
                      </svg>
                      Select Photo
                    </button>
                    <input
                      type="file"
                      id="photo-upload"
                      accept="image/jpeg, image/png, image/webp"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <p className="text-[11px] text-slate-400 font-medium mt-3">
                      Supports JPG, PNG, WebP
                    </p>
                  </div>
                  {uploadError && (
                    <p role="alert" className="mt-3 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                      {uploadError}
                    </p>
                  )}
                </div>

                {/* Feature Chips */}
                <div className="grid grid-cols-2 gap-2.5 mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                    <span className="text-lime-600 font-bold">✓</span>
                    <span>4×6 to A3, Letter & Custom</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                    <span className="text-lime-600 font-bold">✓</span>
                    <span>Automatic Crop Lines</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                    <span className="text-lime-600 font-bold">✓</span>
                    <span>HD 300 DPI: PDF, JPG & PNG</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                    <span className="text-lime-600 font-bold">✓</span>
                    <span>Free Standard Download</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Template Example Photo */}
              <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 bg-slate-50/70 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Print Sheet Preview
                      </span>
                      <span className="bg-emerald-100 text-emerald-800 text-[11px] font-extrabold px-2 py-0.5 rounded-full">
                        4×6 inch (10×15 cm)
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-lime-700">
                      300 DPI High-Res
                    </span>
                  </div>

                  {/* Photo Mockup Frame */}
                  <div className="relative rounded-xl overflow-hidden border border-slate-200/90 shadow-md bg-white group">
                    <img
                      src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679205/MakePassportPhoto_ph2uog_ryefxt.webp"
                      alt="Passport photo print template generator 4x6 sheet layout"
                      className="w-full h-auto object-contain max-h-[380px] sm:max-h-[420px] mx-auto block"
                      loading="eager"
                    />
                    {/* Badge Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 bg-slate-900/85 backdrop-blur-xs text-white px-3.5 py-2 rounded-lg flex items-center justify-between text-xs font-medium shadow-lg">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-lime-400" />
                        <span>Ready-to-print multi-photo layout</span>
                      </span>
                      <span className="font-bold text-lime-400">
                        6 Copies
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-500 text-center mt-4">
                  Print this sheet at 100% scale on 4×6 photo paper at home or any local print kiosk (Walgreens, CVS, Boots, etc.)
                </p>
              </div>

            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start">
          {/* Controls Sidebar */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 order-2 lg:order-1 shadow-xs lg:sticky lg:top-20">
            <div className="p-4 space-y-5">
              {/* Photo Size */}
              <fieldset>
                <legend className="text-sm font-black text-slate-900 mb-2">
                  <span className="text-lime-600 mr-1">1.</span> Which country is it for?
                </legend>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(PHOTO_SIZES).map(([key, val]) => {
                    const active = photoSize === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setPhotoSize(key)}
                        aria-pressed={active}
                        title={val.detail}
                        className={`flex flex-col items-start text-left rounded-xl border px-3 py-2 min-h-[64px] transition-all cursor-pointer ${
                          active
                            ? "bg-lime-50 border-lime-600 ring-1 ring-lime-600"
                            : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <span className="text-lg leading-none tracking-wider" aria-hidden>{val.flags}</span>
                        <span className={`mt-1 text-sm font-black leading-tight ${active ? "text-lime-900" : "text-slate-800"}`}>
                          {val.name}
                        </span>
                        <span className="text-[11px] text-slate-500 leading-tight truncate max-w-full">{val.label}</span>
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => setPhotoSize("custom")}
                    aria-pressed={photoSize === "custom"}
                    className={`col-span-2 flex items-center gap-2 rounded-xl border px-3 py-2 text-left transition-all cursor-pointer ${
                      photoSize === "custom"
                        ? "bg-lime-50 border-lime-600 ring-1 ring-lime-600"
                        : "bg-white border-dashed border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <span aria-hidden>✏️</span>
                    <span className="text-sm font-bold text-slate-800 truncate">
                      {customPhoto.name === "Custom"
                        ? "Other size"
                        : `${customPhoto.name} (${customPhoto.width}×${customPhoto.height} mm)`}
                    </span>
                  </button>
                </div>
                {photoSize === "custom" && (
                  <div className="mt-2 flex items-end gap-2">
                    <DimensionInput
                      label="Photo width"
                      valueMm={customPhoto.width}
                      min={MIN_PHOTO_MM}
                      max={MAX_PHOTO_MM}
                      onCommit={(width) => setCustomPhoto((p) => ({ ...p, width }))}
                    />
                    <DimensionInput
                      label="Photo height"
                      valueMm={customPhoto.height}
                      min={MIN_PHOTO_MM}
                      max={MAX_PHOTO_MM}
                      onCommit={(height) => setCustomPhoto((p) => ({ ...p, height }))}
                    />
                  </div>
                )}
              </fieldset>

              {/* Paper Size */}
              <fieldset>
                <legend className="text-sm font-black text-slate-900 mb-2">
                  <span className="text-lime-600 mr-1">2.</span> Paper you&apos;ll print on
                </legend>
                <div className="grid grid-cols-5 gap-1.5">
                  {QUICK_PAPERS.map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setPaperSize(key);
                        setShowMorePapers(false);
                      }}
                      aria-pressed={paperSize === key}
                      className={`py-2 px-1 border rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        paperSize === key
                          ? "bg-lime-50 border-lime-600 text-lime-900 ring-1 ring-lime-600"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {PAPER_SIZES[key].name.replace(" in", "")}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setShowMorePapers((v) => !v)}
                    aria-expanded={showMorePapers || !isQuickPaper}
                    className={`py-2 px-1 border rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      !isQuickPaper
                        ? "bg-lime-50 border-lime-600 text-lime-900 ring-1 ring-lime-600"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    More ▾
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5">
                  {paper.name}
                  {paper.detail ? ` · ${paper.detail}` : ""} · <strong className="text-slate-700">{layout.max} photos fit</strong>
                </p>
                {(showMorePapers || !isQuickPaper) && (
                  <div className="mt-2 space-y-2">
                    <select
                      aria-label="All paper sizes"
                      value={paperSize}
                      onChange={(e) => setPaperSize(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg p-2 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-lime-500 focus:outline-none bg-white cursor-pointer"
                    >
                      {PAPER_GROUPS.map((group) => (
                        <optgroup key={group.label} label={group.label}>
                          {Object.entries(group.sizes).map(([key, val]) => (
                            <option key={key} value={key}>
                              {val.name}{val.detail ? ` (${val.detail})` : ""}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                      <option value="custom">Custom paper size…</option>
                    </select>
                    {paperSize === "custom" && (
                      <div className="flex items-end gap-2">
                        <DimensionInput
                          label="Width"
                          unit={customPaperUnit}
                          valueMm={customPaper.width}
                          min={MIN_PAPER_MM}
                          max={MAX_PAPER_MM}
                          onCommit={(width) => setCustomPaper((p) => ({ ...p, width }))}
                        />
                        <DimensionInput
                          label="Height"
                          unit={customPaperUnit}
                          valueMm={customPaper.height}
                          min={MIN_PAPER_MM}
                          max={MAX_PAPER_MM}
                          onCommit={(height) => setCustomPaper((p) => ({ ...p, height }))}
                        />
                        <div className="flex bg-slate-100 rounded-lg p-0.5 shrink-0" role="radiogroup" aria-label="Unit">
                          {(["mm", "in"] as const).map((u) => (
                            <button
                              key={u}
                              type="button"
                              role="radio"
                              aria-checked={customPaperUnit === u}
                              onClick={() => setCustomPaperUnit(u)}
                              className={`px-2.5 py-1.5 rounded-md text-xs font-semibold cursor-pointer ${
                                customPaperUnit === u ? "bg-white text-lime-800 shadow-xs" : "text-slate-500"
                              }`}
                            >
                              {u}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {noMarginMax > layout.max && (
                  <button
                    type="button"
                    onClick={() => setMargin(0)}
                    className="mt-2 w-full text-left text-xs text-lime-900 bg-lime-50 hover:bg-lime-100 border border-lime-200 rounded-lg px-3 py-2 cursor-pointer"
                  >
                    💡 Get <strong>{noMarginMax} photos</strong> instead of {layout.max} with a borderless print →
                  </button>
                )}
              </fieldset>

              {/* Number of Photos */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-black text-slate-900">
                  <span className="text-lime-600 mr-1">3.</span> Copies
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                    <button
                      type="button"
                      aria-label="Fewer copies"
                      disabled={photoCount <= 1}
                      onClick={() => setCopies(Math.max(1, photoCount - 1))}
                      className="w-10 h-10 text-lg font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-base font-black text-slate-900" aria-live="polite">
                      {photoCount}
                    </span>
                    <button
                      type="button"
                      aria-label="More copies"
                      disabled={photoCount >= layout.max}
                      onClick={() => setCopies(photoCount + 1 >= layout.max ? 0 : photoCount + 1)}
                      className="w-10 h-10 text-lg font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                  {copies !== 0 && layout.max > 0 && (
                    <button
                      type="button"
                      onClick={() => setCopies(0)}
                      className="text-xs font-bold text-lime-700 hover:underline cursor-pointer whitespace-nowrap"
                    >
                      Fill page
                    </button>
                  )}
                </div>
              </div>

              {/* Advanced options, closed by default */}
              <details className="group border-t border-slate-100 pt-3">
                <summary className="flex items-center justify-between cursor-pointer select-none list-none text-xs font-bold text-slate-500 hover:text-slate-800 [&::-webkit-details-marker]:hidden">
                  More options
                  <span className="transition-transform group-open:rotate-180" aria-hidden>▾</span>
                </summary>
                <div className="pt-3 space-y-3">
                  <Toggle
                    label="Borderless print"
                    hint="No page margin. Only if your printer or store prints edge to edge."
                    checked={margin === 0}
                    onChange={(on) => setMargin(on ? 0 : DEFAULT_MARGIN_MM)}
                  />
                  <Toggle
                    label="Space between photos"
                    hint="Leaves a gap so cuts don't need to be exact."
                    checked={spacing > 0}
                    onChange={(on) => setSpacing(on ? DEFAULT_GAP_MM : 0)}
                  />
                  <Toggle
                    label="Crop lines"
                    hint="Thin lines to cut along."
                    checked={cropLines}
                    onChange={setCropLines}
                  />
                </div>
              </details>

              {sourceDpi !== null && sourceDpi < MIN_PRINT_DPI && (
                <p role="status" className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  <strong>Low resolution:</strong> your photo prints at about {sourceDpi} DPI and may look soft. Use the original, full-size photo if you can.
                </p>
              )}
            </div>

            {/* Action Buttons: pinned to the bottom of the screen on mobile */}
            <div className="sticky bottom-0 lg:static z-10 bg-white/95 backdrop-blur-sm border-t border-slate-100 rounded-b-2xl p-3 sm:p-4 space-y-2 shadow-[0_-4px_12px_-6px_rgba(15,23,42,0.12)] lg:shadow-none">
              {downloadError && (
                <p role="alert" className="text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {downloadError}
                </p>
              )}
              {payError && (
                <p role="alert" className="text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {payError}
                </p>
              )}

              {hdAccess ? (
                <>
                  <p className="flex items-center justify-center gap-1.5 text-xs font-bold text-lime-800 text-center">
                    <span className="w-4 h-4 shrink-0 rounded-full bg-lime-600 text-white flex items-center justify-center text-[10px]" aria-hidden>✓</span>
                    {hasPaidPhoto
                      ? `Included with your order · Highest quality (${sheetDpi} DPI)`
                      : `HD unlocked · ${sheetDpi} DPI · any layout this session`}
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {([
                      { format: "pdf", label: "PDF", hint: "Home printer" },
                      { format: "jpg", label: "JPG", hint: "Photo store" },
                      { format: "png", label: "PNG", hint: "Lossless" },
                    ] as const).map(({ format, label, hint }, i) => (
                      <button
                        key={format}
                        type="button"
                        onClick={() => downloadHd(format)}
                        disabled={layout.max === 0}
                        className={`py-2.5 px-1 rounded-xl font-bold text-sm transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                          i === 0
                            ? "bg-lime-600 hover:bg-lime-700 text-white shadow-xs"
                            : "bg-white border border-lime-600 text-lime-800 hover:bg-lime-50"
                        }`}
                      >
                        ⬇ {label}
                        <span className="block text-[10px] font-medium opacity-85">{hint}</span>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={openFreeDownload}
                    disabled={layout.max === 0}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-900 active:bg-slate-950 text-white text-sm font-black shadow-md shadow-slate-800/20 transition-all cursor-pointer disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed"
                  >
                    {countdownRunning ? `Free Download · ready in ${formatClock(FREE_DELAY_MS - countdownMs)}` : "Free Download"}
                    <span className="block text-[11px] font-medium text-slate-300">
                      JPG or PDF · {Math.min(FREE_DPI, sheetDpi)} DPI standard quality
                    </span>
                  </button>
                </>
              )}
              <p className="text-[11px] text-center text-slate-500">
                Print at <strong>100% / Actual size</strong>, &quot;Fit to page&quot; off
                {!hdAccess && " · Secure one-time payment"}
              </p>
            </div>
          </div>

          {/* Canvas Preview Area */}
          <div className="lg:col-span-8 order-1 lg:order-2 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-2">
              <p className="text-sm font-bold text-slate-800 truncate">
                {photoCount} × {photo.name} on {paper.name}
                {layout.orientation === "landscape" ? " (landscape)" : ""}
              </p>
              <button
                type="button"
                onClick={handleChangePhoto}
                className="shrink-0 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 rounded-lg px-2.5 py-1.5 cursor-pointer"
              >
                Change photo
              </button>
            </div>
            <div className="relative bg-slate-200 rounded-xl p-3 sm:p-6 flex items-center justify-center border border-slate-300 min-h-[220px]">
              {/* The canvas draws at print resolution; CSS scales it down for preview */}
              <canvas
                ref={canvasRef}
                aria-label={`Print sheet preview: ${photoCount} photos on ${paper.name} paper`}
                className="w-auto h-auto max-w-full max-h-[50vh] lg:max-h-[70vh] rounded-sm shadow-md bg-white"
              />
              {layout.max === 0 && (
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <p role="alert" className="max-w-sm text-center text-sm font-semibold text-slate-700 bg-white border border-amber-200 rounded-xl px-4 py-3 shadow-sm">
                    A {photo.width}×{photo.height} mm photo doesn&apos;t fit on {paper.name} paper. Choose bigger paper or turn on borderless print.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
