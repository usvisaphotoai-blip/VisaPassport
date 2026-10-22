"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { compressImage } from "@/lib/compressImage";
import "@/app/home.css";

interface FAQ {
  question: string;
  answer: string;
}

const MAX_FILE_SIZE_MB = 20;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];

const trustBadges = [
  { icon: "🔒", text: "Secure & Private" },
  { icon: "⚡", text: "Results in 30s" },
  { icon: "🇺🇸", text: "All 50 States" },
  { icon: "👀", text: "Free Preview" },
];

const steps = [
  {
    num: "01",
    title: "Upload Portrait",
    desc: "Upload a casual portrait or selfie taken with your smartphone, tablet, or digital camera.",
    icon: "📤",
  },
  {
    num: "02",
    title: "Biometric Check",
    desc: "AI scans facial landmarks to check head height, eye alignment, lighting, and glasses glare.",
    icon: "⚡",
  },
  {
    num: "03",
    title: "AI Crop & Background",
    desc: "Automatically crops to 2×2 inches (600×600 px) and replaces the background with solid white.",
    icon: "✂️",
  },
  {
    num: "04",
    title: "Preview for Free",
    desc: "Review your finished photo before paying. One-time fee only if you're happy with the result.",
    icon: "👀",
  },
  {
    num: "05",
    title: "Download & Print",
    desc: "Get a digital JPEG plus a 4×6 inch sheet with 4 photos to print for under $0.50 at Walgreens or CVS.",
    icon: "⬇️",
  },
];

const specs = [
  {
    label: "Print Size",
    value: "2 × 2 in (51 × 51 mm)",
    detail: "Standard US ID photo size",
  },
  { label: "Digital Size", value: "600 × 600 px", detail: "300 DPI high-resolution export" },
  { label: "Background", value: "Plain White", detail: "Uniform, shadow-free lighting" },
  {
    label: "Eye Position",
    value: "56% – 69%",
    detail: "Measured from the bottom edge",
  },
  { label: "Head Size", value: "50% – 69%", detail: "1 to 1⅜ in chin to crown" },
  {
    label: "Expression",
    value: "Neutral / Relaxed",
    detail: "Mouth closed, both eyes open",
  },
];

const rejectionReasons = [
  {
    num: "01",
    title: "Eyeglasses Glare & Reflections",
    why: "Lens glare hides your eyes and is one of the most common reasons ID photos are rejected. Many states ask you to remove glasses entirely.",
    check: "Our checker flags glasses and glare before you download.",
  },
  {
    num: "02",
    title: "Shadows Behind Head or on Face",
    why: "Uneven lighting casts dark shadows that interfere with DMV facial recognition software.",
    check: "AI removes the background and replaces it with pure 255/255/255 white.",
  },
  {
    num: "03",
    title: "Incorrect Head Proportions",
    why: "Standing too close or too far puts your head height outside the required 50%–69% range.",
    check: "Smart auto-framing resizes and centers your head to exact 1 to 1⅜ inch proportions.",
  },
  {
    num: "04",
    title: "Face Tilted or Off-Center",
    why: "Looking away from the lens or tilting your head distorts facial biometric measurements.",
    check: "Face alignment re-levels your eye line horizontally.",
  },
];

const photoTips = [
  {
    icon: "🪟",
    title: "Face a Window in Daylight",
    body: "Soft natural daytime light removes harsh shadows from your face, nose bridge, and the wall behind you.",
  },
  {
    icon: "📷",
    title: "Camera at Eye Level",
    body: "Have a friend hold the camera 4–6 feet away at eye level. Avoid close-up front-camera selfies that distort facial features.",
  },
  {
    icon: "👕",
    title: "Wear Contrasting Dark Colors",
    body: "Choose navy, black, burgundy, or dark green tops. Avoid white or light pastel shirts that blend into the white backdrop.",
  },
  {
    icon: "💇",
    title: "Hair Off Your Face",
    body: "Tuck hair behind your ears so both eyes, eyebrows, cheeks, and your full jawline remain clearly visible.",
  },
  {
    icon: "😐",
    title: "Neutral, Forward-Facing Pose",
    body: "Look straight into the camera lens with both eyes open, mouth closed, and a natural relaxed expression.",
  },
  {
    icon: "👓",
    title: "Remove Glasses & Hats",
    body: "Remove eyeglasses, sunglasses, hats, and headphones. Religious head coverings are allowed if your full face is visible.",
  },
];

const privacyItems = [
  {
    icon: "⏱️",
    title: "24-Hour Auto-Delete",
    desc: "All original photos are automatically and permanently deleted from our servers after 24 hours.",
  },
  {
    icon: "🔗",
    title: "Expiring Download Links",
    desc: "Download URLs are encrypted and expire after 1 hour. No permanent public access.",
  },
  {
    icon: "🛡️",
    title: "GDPR & CCPA Compliant",
    desc: "Full data deletion rights. We follow strict global digital privacy regulations.",
  },
  {
    icon: "🗑️",
    title: "No Data Selling",
    desc: "We never sell or share your biometric data. Your photographs belong strictly to you.",
  },
];

const relatedTools = [
  {
    href: "/us-passport-photo-editor",
    title: "US Passport Photo",
    desc: "2×2 in photo for US passport applications and renewals.",
  },
  {
    href: "/us-visa-photo-editor",
    title: "US Visa Photo",
    desc: "600×600 px digital photo for DS-160 and visa applications.",
  },
  {
    href: "/visa-photo-validator",
    title: "Free Photo Checker",
    desc: "Check an existing photo against official ID requirements.",
  },
  {
    href: "/passport-photo-print-template-generator",
    title: "4×6 Print Template",
    desc: "Turn any ID photo into a printable 4×6 inch sheet.",
  },
];

const uploadExamples = [
  {
    ok: true,
    src: "https://res.cloudinary.com/dipzpwbbk/image/upload/f_auto,q_auto,w_560/v1792647649/upload_photo_like_this_kcbxop.webp",
    alt: "Good example: front-facing portrait with neutral expression and shoulders visible",
    label: "Upload like this",
    note: "Face forward, head and shoulders visible",
    position: "center 25%",
  },
  {
    ok: false,
    src: "https://res.cloudinary.com/dipzpwbbk/image/upload/f_auto,q_auto,w_560/v1792647649/dont_upload_this_plz_m6xkvj.webp",
    alt: "Bad example: photo of an existing driver's license card",
    label: "Don't upload this",
    note: "No photos of your old license or ID card",
    position: "30% center",
  },
];

const exampleOutputs = [
  {
    src: "https://res.cloudinary.com/dipzpwbbk/image/upload/f_auto,q_auto,w_600/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg",
    alt: "Driver's license photo with head-size and eye-line measurements overlaid",
    label: "1. Photo Processing",
    note: "Face detection with 50%–69% head-height measurements applied",
  },
  {
    src: "https://res.cloudinary.com/dipzpwbbk/image/upload/f_auto,q_auto,w_600/v1779008017/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_photo_eyp4a3.jpg",
    alt: "Final 2×2 inch driver's license photo on a white background",
    label: "2. Final Photo",
    note: "2×2 in (600×600 px) image with a pure white background",
  },
  {
    src: "https://res.cloudinary.com/dipzpwbbk/image/upload/f_auto,q_auto,w_600/v1779076959/MakePassportPhoto_ph2uog.jpg",
    alt: "4×6 inch print sheet with four 2×2 inch driver's license photos",
    label: "3. Print Sheet",
    note: "Ready-to-print 4×6 inch sheet with 4 photos for under $0.50",
  },
];

const stateDmvList = [
  { id: "us-real-id", label: "REAL ID Driver's License" },
  { id: "us-standard-dl", label: "Standard Driver's License (All 50 States)" },
  { id: "us-cdl", label: "Commercial Driver's License (CDL)" },
  { id: "us-permit", label: "Learner's Permit / Junior License" },
  { id: "ca-dmv", label: "California DMV" },
  { id: "ny-dmv", label: "New York DMV (NYS DMV)" },
  { id: "tx-dps", label: "Texas DPS" },
  { id: "fl-dhsmv", label: "Florida DHSMV" },
  { id: "il-sos", label: "Illinois Secretary of State (SOS)" },
  { id: "pa-penndot", label: "Pennsylvania PennDOT" },
  { id: "oh-bmv", label: "Ohio BMV" },
  { id: "ga-dds", label: "Georgia DDS" },
  { id: "nc-dmv", label: "North Carolina DMV" },
  { id: "wa-dol", label: "Washington State DOL" },
  { id: "va-dmv", label: "Virginia DMV" },
  { id: "nj-mvc", label: "New Jersey MVC" },
  { id: "az-mvd", label: "Arizona MVD" },
  { id: "co-dmv", label: "Colorado DMV" },
  { id: "mi-sos", label: "Michigan SOS" },
  { id: "ma-rmv", label: "Massachusetts RMV" },
];

const PROCESSING_MESSAGES = [
  "Analyzing portrait & facial landmarks...",
  "Detecting eye line & biometric proportions...",
  "Removing background & evening shadows...",
  "Cropping to 2×2 in at 300 DPI...",
  "Generating printable 4×6 sheet template...",
];

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  eyebrowClass = "text-lime-700",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  eyebrowClass?: string;
}) {
  return (
    <div className="text-center mb-10">
      <span className={`text-xs font-bold uppercase tracking-widest mb-2 block ${eyebrowClass}`}>
        {eyebrow}
      </span>
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">{title}</h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}

export default function USADriverLicensePhotoClient({ faqs }: { faqs: FAQ[] }) {
  const router = useRouter();

  // Slider state
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // Tool state
  const [selectedDocId, setSelectedDocId] = useState(stateDmvList[0].id);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingIndex, setProcessingIndex] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [highlightTool, setHighlightTool] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toolRef = useRef<HTMLElement>(null);

  // Animated processing text cycle
  useEffect(() => {
    if (!isProcessing) {
      setProcessingIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setProcessingIndex((prev) => Math.min(prev + 1, PROCESSING_MESSAGES.length - 1));
    }, 1800);
    return () => clearInterval(interval);
  }, [isProcessing]);

  // Slider drag calculations
  const calcPos = useCallback((clientX: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pct = ((clientX - rect.left) / rect.width) * 100;
      setSliderPos(Math.min(97, Math.max(3, pct)));
      setHasInteracted(true);
    });
  }, []);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      calcPos(e.clientX);
    },
    [calcPos],
  );

  useEffect(() => {
    if (!isDragging) return;
    const move = (e: MouseEvent) => calcPos(e.clientX);
    const up = () => setIsDragging(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [isDragging, calcPos]);

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(true);
      calcPos(e.touches[0].clientX);
    },
    [calcPos],
  );

  useEffect(() => {
    if (!isDragging) return;
    const el = containerRef.current;
    if (!el) return;
    const move = (e: TouchEvent) => {
      e.preventDefault();
      calcPos(e.touches[0].clientX);
    };
    const end = () => setIsDragging(false);
    el.addEventListener("touchmove", move, { passive: false });
    el.addEventListener("touchend", end);
    return () => {
      el.removeEventListener("touchmove", move);
      el.removeEventListener("touchend", end);
    };
  }, [isDragging, calcPos]);

  const onSliderKeyDown = (e: React.KeyboardEvent) => {
    const delta = e.key === "ArrowLeft" ? -5 : e.key === "ArrowRight" ? 5 : 0;
    if (!delta) return;
    e.preventDefault();
    setHasInteracted(true);
    setSliderPos((p) => Math.min(97, Math.max(3, p + delta)));
  };

  // Upload handlers
  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  const scrollToTool = () => {
    toolRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setHighlightTool(true);
    setTimeout(() => setHighlightTool(false), 1600);
  };

  const acceptFile = (file: File | undefined) => {
    if (!file) return;
    // Some browsers report an empty type for HEIC, so fall back to the extension
    const isHeic = /\.(heic|heif)$/i.test(file.name);
    if (!ACCEPTED_TYPES.includes(file.type) && !isHeic) {
      setErrorMsg("Please upload a JPG, PNG, WEBP, or HEIC image.");
      return;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setErrorMsg(`That file is too large. Please upload an image under ${MAX_FILE_SIZE_MB} MB.`);
      return;
    }
    setSelectedFile(file);
    setErrorMsg("");
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const processFile = async () => {
    if (!selectedFile) return;
    setErrorMsg("");
    setIsProcessing(true);

    try {
      const compressed = await compressImage(selectedFile);

      const formData = new FormData();
      formData.append("image", compressed);
      formData.append("country_code", "US");
      formData.append("document_type", "passport");
      formData.append("source", "usa-driver-license-photo-editor");

      const res = await fetch("/api/external-process", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.details || data.error || "Processing failed");

      const photoRes = await fetch(`/api/photo/${data.photoId}`);
      const photoResult = await photoRes.json();
      if (!photoRes.ok || !photoResult.success) {
        throw new Error("Failed to load generated photo details.");
      }

      router.push(`/preview/${data.photoId}?from=usa-driver-license-photo-editor`);
    } catch (err) {
      setErrorMsg(err instanceof Error && err.message ? err.message : "Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    acceptFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div className="hcr">
      {/* ── HERO ── */}
      <section className="bg-white border-b border-slate-200">
        <div className="h-1 bg-lime-700 w-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
          {/* Breadcrumb (mirrors BreadcrumbList schema) */}
          <nav aria-label="Breadcrumb" className="mb-5 text-xs text-slate-500">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-lime-700 hover:underline">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-slate-700 font-medium">
                USA Driver&apos;s License Photo Editor
              </li>
            </ol>
          </nav>

          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* ── TEXT COLUMN ── */}
            <div className="flex-1 w-full">
              <div className="inline-flex items-center gap-2 bg-lime-50 border border-lime-200 rounded px-3 py-1.5 mb-5">
                <span className="w-2 h-2 rounded-full bg-lime-600 inline-block" aria-hidden="true" />
                <span className="text-xs font-semibold text-lime-800 tracking-wide uppercase">
                  DMV &amp; REAL ID Photo Tool · All 50 States
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight tracking-tight mb-3">
                USA Driver&apos;s License Photo Editor: Make 2×2 in REAL ID Photos
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 mb-6 leading-snug max-w-xl">
                Crop, remove the background, and format your driver&apos;s license picture in 30 seconds — 600×600 px, pure white background, correct head size.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-7">
                <button
                  type="button"
                  onClick={scrollToTool}
                  className="inline-flex items-center justify-center bg-lime-700 hover:bg-lime-800 text-white text-base font-semibold px-7 py-3.5 rounded transition-colors cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 focus-visible:ring-offset-2"
                >
                  Create License Photo Now →
                </button>
                <Link
                  href="/visa-photo-validator"
                  className="inline-flex items-center justify-center border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 text-base font-semibold px-7 py-3.5 rounded transition-colors"
                >
                  Check My Photo Free
                </Link>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex gap-0.5" aria-hidden="true">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b">
                      <path d="M12 2l2.9 8.9H23l-7.4 5.4 2.8 8.7L12 19.6l-6.4 5.4 2.8-8.7L2 10.9h8.1z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-slate-600 font-medium">
                  <span className="sr-only">Rated 4.9 out of 5 · </span>
                  <span aria-hidden="true">4.9 · </span>Trusted by 25,000+ drivers nationwide
                </span>
              </div>

              {/* Trust badges */}
              <ul className="flex flex-wrap gap-2.5">
                {trustBadges.map((t) => (
                  <li
                    key={t.text}
                    className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs font-medium text-slate-700"
                  >
                    <span aria-hidden="true">{t.icon}</span>
                    <span>{t.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── BEFORE / AFTER SLIDER ── */}
            <div className="w-full lg:w-auto flex flex-col items-center gap-3">
              <div
                ref={containerRef}
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                onKeyDown={onSliderKeyDown}
                role="slider"
                tabIndex={0}
                aria-label="Before and after comparison. Use left and right arrow keys to compare."
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(sliderPos)}
                className="relative rounded overflow-hidden border border-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 focus-visible:ring-offset-2"
                style={{
                  aspectRatio: "1 / 1",
                  width: "100%",
                  maxWidth: "380px",
                  touchAction: "none",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  cursor: isDragging ? "ew-resize" : "col-resize",
                }}
              >
                {/* BEFORE layer */}
                <Image
                  src="/us_non_imigrant_before.webp"
                  alt="Before: original casual photo with a busy background"
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "center top",
                    pointerEvents: "none",
                    zIndex: 0,
                  }}
                  priority
                  sizes="(max-width: 1024px) 100vw, 380px"
                />

                {/* AFTER layer */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 1,
                    clipPath: `inset(0 0 0 ${sliderPos}%)`,
                    willChange: "clip-path",
                    pointerEvents: "none",
                  }}
                >
                  <Image
                    src="/us_non_imigrant.png"
                    alt="After: 2×2 inch driver's license photo on a white background"
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "center 8%",
                      pointerEvents: "none",
                    }}
                    sizes="(max-width: 1024px) 100vw, 380px"
                  />
                </div>

                {/* Divider */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: `${sliderPos}%`,
                    width: "2px",
                    background: "white",
                    transform: "translateX(-50%)",
                    zIndex: 2,
                    pointerEvents: "none",
                    boxShadow: "0 0 6px rgba(0,0,0,0.3)",
                    willChange: "left",
                  }}
                />

                {/* Handle */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: `${sliderPos}%`,
                    transform: `translate(-50%, -50%) scale(${isDragging ? 1.1 : 1})`,
                    width: "44px",
                    height: "44px",
                    background: "white",
                    border: "2px solid #e2e8f0",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "2px",
                    zIndex: 3,
                    pointerEvents: "none",
                    willChange: "left, transform",
                    transition: "transform 0.1s",
                  }}
                >
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>

                {/* BEFORE badge */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-3 left-3 z-[4] pointer-events-none rounded-sm bg-black/60 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-white transition-opacity"
                  style={{ opacity: sliderPos > 12 ? 1 : 0 }}
                >
                  BEFORE
                </div>

                {/* AFTER badge */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-3 right-3 z-[4] pointer-events-none rounded-sm bg-lime-700 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-white transition-opacity"
                  style={{ opacity: sliderPos < 88 ? 1 : 0 }}
                >
                  AFTER ✓
                </div>

                {/* Drag hint */}
                {!hasInteracted && (
                  <div
                    aria-hidden="true"
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[5] pointer-events-none whitespace-nowrap rounded-sm bg-black/55 px-3.5 py-1 text-[11px] font-medium text-white"
                  >
                    ← drag to compare →
                  </div>
                )}
              </div>

              <p className="text-xs text-slate-500 text-center max-w-xs">
                White background · 2×2 in crop · Print-ready
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PHOTO TOOL ── */}
      <section
        ref={toolRef}
        id="tool"
        className="bg-slate-50 py-12 border-b border-slate-200 scroll-mt-20"
        aria-labelledby="tool-heading"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`bg-white rounded-2xl p-6 sm:p-10 border shadow-md transition-all duration-500 ${
              highlightTool ? "border-lime-500 ring-4 ring-lime-200" : "border-slate-200"
            }`}
          >
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-lime-100 text-lime-800 mb-3">
                <span aria-hidden="true">✂️</span> Free Preview · Pay Only If You Like It
              </span>
              <h2 id="tool-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
                Crop &amp; Format Your Driver&apos;s License Photo
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Choose your license type, upload a photo, and we&apos;ll size it to 2×2 inches automatically.
              </p>
            </div>

            <div className="max-w-xl mx-auto space-y-6">
              {/* State / license type */}
              <div>
                <label
                  htmlFor="dl-license-type"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                >
                  <span className="text-lime-700 mr-1">1.</span> State / License Type
                </label>
                <select
                  id="dl-license-type"
                  value={selectedDocId}
                  onChange={(e) => setSelectedDocId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl text-slate-900 py-3.5 px-4 font-semibold text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
                >
                  {stateDmvList.map((opt) => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                  ))}
                </select>
                <p className="mt-1.5 text-xs text-slate-500">
                  All states use the same 2×2 in (600×600 px) format.
                </p>
              </div>

              {/* Upload */}
              <div>
                <span id="dl-upload-label" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  <span className="text-lime-700 mr-1">2.</span> Upload Photo
                </span>
                <input
                  ref={fileInputRef}
                  id="dl-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif"
                  onChange={(e) => acceptFile(e.target.files?.[0])}
                  className="sr-only"
                  aria-labelledby="dl-upload-label"
                />
                {!previewUrl && (
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {uploadExamples.map((ex) => (
                      <figure
                        key={ex.label}
                        className={`rounded-xl overflow-hidden border-2 bg-white ${
                          ex.ok ? "border-lime-500" : "border-rose-400"
                        }`}
                      >
                        <div className="relative h-32 sm:h-40 bg-slate-100">
                          <Image
                            src={ex.src}
                            alt={ex.alt}
                            fill
                            sizes="(max-width: 640px) 50vw, 280px"
                            className="object-cover"
                            style={{ objectPosition: ex.position }}
                            loading="lazy"
                            unoptimized
                          />
                          <span
                            aria-hidden="true"
                            className={`absolute top-2 left-2 w-7 h-7 rounded-full flex items-center justify-center text-sm font-black text-white shadow ${
                              ex.ok ? "bg-lime-600" : "bg-rose-600"
                            }`}
                          >
                            {ex.ok ? "✓" : "✕"}
                          </span>
                        </div>
                        <figcaption
                          className={`px-3 py-2 text-xs sm:text-sm ${
                            ex.ok ? "bg-lime-50 text-lime-900" : "bg-rose-50 text-rose-900"
                          }`}
                        >
                          <span className="block font-bold">{ex.label}</span>
                          <span className="block leading-snug">{ex.note}</span>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                )}
                {!previewUrl ? (
                  <label
                    htmlFor="dl-upload"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        fileInputRef.current?.click();
                      }
                    }}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    className={`block border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 ${
                      dragOver ? "border-lime-500 bg-lime-50/50" : "border-slate-300 hover:border-lime-500 hover:bg-slate-50/80 bg-slate-50/40"
                    }`}
                  >
                    <div className="w-14 h-14 mx-auto rounded-full bg-lime-100 text-lime-700 flex items-center justify-center mb-3" aria-hidden="true">
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                      </svg>
                    </div>
                    <p className="text-base font-bold text-slate-900 mb-1">
                      <span className="sm:hidden">Tap to take or choose a photo</span>
                      <span className="hidden sm:inline">Click to upload or drag &amp; drop</span>
                    </p>
                    <p className="text-xs text-slate-500">JPG, PNG, WEBP, or HEIC · up to {MAX_FILE_SIZE_MB} MB</p>
                  </label>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={previewUrl} alt="Your uploaded photo" className="w-full h-64 object-contain" />
                    <button
                      type="button"
                      onClick={clearFile}
                      className="absolute top-3 right-3 bg-black/70 hover:bg-black text-white px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
                    >
                      ✕ Change Photo
                    </button>
                  </div>
                )}
              </div>

              {errorMsg && (
                <div role="alert" className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium">
                  {errorMsg}
                </div>
              )}

              <button
                type="button"
                disabled={!selectedFile || isProcessing}
                onClick={processFile}
                className={`w-full py-4 px-6 rounded-xl font-bold text-base text-center transition-all flex items-center justify-center gap-2.5 ${
                  !selectedFile || isProcessing
                    ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                    : "bg-lime-700 hover:bg-lime-800 text-white shadow-lg shadow-lime-700/25 active:scale-[0.99] cursor-pointer"
                }`}
              >
                <span>{selectedFile ? "Generate 2×2 License Photo" : "Upload a photo to continue"}</span>
                {selectedFile && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                )}
              </button>

              <p className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
                <span aria-hidden="true">🔒</span> Photos are auto-deleted after 24 hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXAMPLE OUTPUT ── */}
      <section className="bg-white border-b border-slate-200 py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow="Example Output"
            title="What you get: digital photo + print sheet"
            subtitle="From upload to print-ready, with 2×2 in head-size and eye-line checks built in."
          />

          <div className="grid sm:grid-cols-3 gap-5">
            {exampleOutputs.map((item) => (
              <figure key={item.label} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                <div className="aspect-[3/4] relative bg-slate-100 overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-contain"
                    loading="lazy"
                    unoptimized
                  />
                </div>
                <figcaption className="px-4 py-3 border-t border-slate-100">
                  <div className="text-sm font-bold text-slate-900 mb-1">{item.label}</div>
                  <div className="text-sm text-slate-600 leading-relaxed">{item.note}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-slate-50 py-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Step-by-Step"
            title="How to make a driver's license photo online"
            subtitle="Five quick steps to an official-size 2×2 inch photo for your renewal or DMV appointment."
          />

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {steps.map((s) => (
              <li key={s.num} className="bg-white p-6 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl" aria-hidden="true">{s.icon}</span>
                  <span className="text-xs font-black text-lime-700 bg-lime-100 px-2 py-0.5 rounded">
                    {s.num}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── SPECIFICATIONS ── */}
      <section className="bg-white py-14 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Photo Requirements"
            title="USA Driver's License & REAL ID Photo Specifications"
            subtitle="The standard 2×2 inch format accepted by state DMVs for license and ID photos."
          />

          <div className="grid gap-8 lg:grid-cols-[minmax(0,380px)_1fr] items-center">
            <figure className="w-full max-w-sm mx-auto">
              <div className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-white">
                <Image
                  src="https://res.cloudinary.com/dipzpwbbk/image/upload/f_auto,q_auto,w_760/v1790578095/us_passport_size_phoro_novzyr.webp"
                  alt="2×2 inch (51×51 mm) driver's license photo size diagram showing a 1 to 1⅜ inch head height"
                  fill
                  sizes="(max-width: 1024px) 90vw, 380px"
                  className="object-contain"
                  loading="lazy"
                  unoptimized
                />
              </div>
              <figcaption className="mt-2 text-center text-xs sm:text-sm text-slate-500">
                2×2 in photo with 1 to 1⅜ in head height
              </figcaption>
            </figure>

            <dl className="grid grid-cols-2 gap-4">
              {specs.map((spec) => (
                <div key={spec.label} className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-center">
                  <dt className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    {spec.label}
                  </dt>
                  <dd className="text-base sm:text-lg font-black text-slate-900 mb-1">{spec.value}</dd>
                  <dd className="text-xs sm:text-sm text-slate-600">{spec.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── REJECTION REASONS ── */}
      <section className="bg-slate-50 py-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Avoid Rejection"
            eyebrowClass="text-rose-700"
            title="Common Reasons Driver's License Photos Get Rejected"
            subtitle="What causes photos to fail DMV checks, and how our tool fixes each one."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {rejectionReasons.map((r) => (
              <div key={r.num} className="bg-white p-6 rounded-2xl border border-slate-200 flex gap-4 items-start">
                <span className="text-xs font-black px-2.5 py-1 rounded bg-rose-100 text-rose-800 shrink-0">
                  {r.num}
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">{r.title}</h3>
                  <p className="text-sm text-slate-600 mb-3 leading-relaxed">{r.why}</p>
                  <p className="p-3 bg-lime-50 rounded-xl border border-lime-200 text-sm text-lime-900 leading-relaxed">
                    <span className="font-bold text-lime-700">✓ Fix:</span> {r.check}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO TIPS ── */}
      <section className="bg-white py-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Photo Taking Guide"
            title="How to Take a Driver's License Photo at Home"
            subtitle="Follow these tips with any phone or digital camera before uploading."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {photoTips.map((tip) => (
              <div key={tip.title} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="text-3xl mb-3" aria-hidden="true">{tip.icon}</div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{tip.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{tip.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={scrollToTool}
              className="inline-flex items-center justify-center bg-lime-700 hover:bg-lime-800 text-white text-base font-semibold px-7 py-3.5 rounded transition-colors cursor-pointer shadow-sm"
            >
              Got your photo? Format it now →
            </button>
          </div>
        </div>
      </section>

      {/* ── PRIVACY ── */}
      <section className="bg-slate-50 py-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Data Protection"
            title="Your Privacy Is Protected"
            subtitle="Automatic data deletion and strict compliance with global privacy standards."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {privacyItems.map((item) => (
              <div key={item.title} className="bg-white p-6 rounded-2xl border border-slate-200">
                <div className="text-3xl mb-3" aria-hidden="true">{item.icon}</div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white py-14 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Common Questions" title="Driver's License Photo FAQ" />

          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group bg-white border border-slate-200 rounded-xl open:shadow-sm open:border-lime-300 transition-all">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden text-sm sm:text-base font-bold text-slate-900 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500">
                  <h3 className="pr-4">{faq.question}</h3>
                  <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 group-open:bg-lime-700 group-open:text-white transition-colors" aria-hidden="true">
                    <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <div className="px-5 pb-5 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED TOOLS ── */}
      <section className="bg-slate-50 py-14 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="More Tools" title="Other US Photo Tools" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="block bg-white p-5 rounded-xl border border-slate-200 hover:border-lime-500 hover:shadow-sm transition-all"
              >
                <div className="text-base font-bold text-slate-900 mb-1">{tool.title} →</div>
                <p className="text-sm text-slate-600 leading-relaxed">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-lime-700 py-12 px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Ready for your DMV appointment?
        </h2>
        <p className="text-lime-50 text-sm sm:text-base mb-6 max-w-lg mx-auto">
          Get a 2×2 inch driver&apos;s license photo and a 4×6 print sheet in about 30 seconds. Preview it free.
        </p>
        <button
          type="button"
          onClick={scrollToTool}
          className="inline-flex items-center justify-center bg-white hover:bg-lime-50 text-lime-800 text-base font-bold px-8 py-3.5 rounded shadow-sm transition-colors cursor-pointer"
        >
          Create License Photo Now →
        </button>
      </section>

      {/* ── PROCESSING OVERLAY ── */}
      {isProcessing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dl-processing-title"
        >
          <div className="bg-white rounded-3xl p-7 sm:p-9 max-w-md w-full text-center shadow-2xl border border-slate-100 flex flex-col items-center">
            <div className="relative w-20 h-20 mb-6 flex items-center justify-center" aria-hidden="true">
              <div className="absolute inset-0 rounded-full border-4 border-lime-200 animate-ping opacity-25" />
              <div className="absolute inset-0 rounded-full border-4 border-lime-500/20 border-t-lime-600 animate-spin" />
              <div className="w-12 h-12 rounded-full bg-lime-100 text-lime-700 flex items-center justify-center text-2xl shadow-inner">
                🚗
              </div>
            </div>

            <h3 id="dl-processing-title" className="text-xl font-black text-slate-900 mb-2">
              Formatting Your License Photo
            </h3>

            <div className="min-h-[36px] flex items-center justify-center mb-5 w-full" aria-live="polite">
              <div className="text-xs sm:text-sm font-semibold text-lime-800 bg-lime-50 border border-lime-200/80 px-4 py-1.5 rounded-full">
                {PROCESSING_MESSAGES[processingIndex]}
              </div>
            </div>

            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-4">
              <div
                className="bg-lime-600 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((processingIndex + 1) / PROCESSING_MESSAGES.length) * 90}%` }}
              />
            </div>

            <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
              This usually takes under 30 seconds. Please keep this page open.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
