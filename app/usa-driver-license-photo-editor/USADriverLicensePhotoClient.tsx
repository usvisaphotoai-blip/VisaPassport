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

const trustBadges = [
  { icon: "🔒", text: "Secure & Private" },
  { icon: "⚡", text: "Results in 30s" },
  { icon: "🇺🇸", text: "50 States DMV" },
  { icon: "🆓", text: "Free Validation" },
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
    title: "Biometric Validation",
    desc: "AI scans facial landmarks to check head height, eye alignment, illumination, and no-glasses compliance.",
    icon: "⚡",
  },
  {
    num: "03",
    title: "AI Crop & Background",
    desc: "Automatically crops to 2×2 inches (600×600 px) and replaces background with seamless solid white.",
    icon: "✂️",
  },
  {
    num: "04",
    title: "Affordable Pricing",
    desc: "One-time low fee starting at $2.99 with 100% government acceptance guarantee.",
    icon: "💳",
  },
  {
    num: "05",
    title: "Download & Print",
    desc: "Receive single digital JPEG and ready-to-print 4×6 inch sheet to print 4 photos for under $0.50 at Walgreens/CVS.",
    icon: "⬇️",
  },
];

const specs = [
  {
    label: "Print Dimensions",
    value: "2 × 2 in (51×51 mm)",
    detail: "Official Real ID & State DMV size",
  },
  { label: "Digital Pixels", value: "600 × 600 px", detail: "300 DPI high-resolution export" },
  { label: "Background", value: "Plain White", detail: "Uniform, shadow-free illumination" },
  {
    label: "Eye Position",
    value: "56% – 69%",
    detail: "Measured from bottom edge",
  },
  { label: "Head Size", value: "50% – 69%", detail: "1 to 1⅜ inches chin-to-crown" },
  {
    label: "Expression",
    value: "Neutral / Relaxed",
    detail: "Mouth closed, no teeth, eyes open",
  },
];

const rejectionReasons = [
  {
    num: "01",
    title: "Eyeglasses Glare & Reflections",
    why: "Federal Real ID standards strictly prohibit eyeglasses, sunglasses, and tinted lenses in driver's license photos.",
    check: "Our verification engine ensures zero-glasses compliance before export.",
  },
  {
    num: "02",
    title: "Shadows Behind Head or on Face",
    why: "Uneven lighting casts dark shadows that disrupt state DMV facial biometric recognition software.",
    check: "AI automatically removes shadows and generates a pure 255/255/255 white background.",
  },
  {
    num: "03",
    title: "Incorrect Head Proportions",
    why: "Standing too close or too far puts head height outside the mandatory 50%–69% range.",
    check: "Smart auto-framing resizes and centers your head to exact 1 to 1⅜ inch proportions.",
  },
  {
    num: "04",
    title: "Face Tilted or Off-Center",
    why: "Looking away from the camera lens or tilting your head distorts facial biometric measurements.",
    check: "Face orientation algorithms re-level and align your eye line horizontally.",
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
    icon: "👗",
    title: "Wear Contrasting Dark Colors",
    body: "Choose navy, black, burgundy, or dark green tops. Avoid white or light pastel shirts that blend into the white backdrop.",
  },
  {
    icon: "💇",
    title: "Hair Off Face & Shoulders",
    body: "Tuck hair behind your ears so both eyes, eyebrows, cheeks, and full jawline remain clearly visible.",
  },
  {
    icon: "😐",
    title: "Neutral, Forward-Facing Pose",
    body: "Look straight into the camera lens with both eyes open, mouth closed, and a natural relaxed expression.",
  },
  {
    icon: "👓",
    title: "Remove All Glasses & Hats",
    body: "Remove eyeglasses, sunglasses, hats, and headphones. Religious head coverings are allowed if full face is visible.",
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
    desc: "Full data deletion rights. We adhere to the highest global digital privacy regulations.",
  },
  {
    icon: "🗑️",
    title: "No Permanent Storage",
    desc: "We never sell or share your biometric data. Your photographs belong strictly to you.",
  },
];

const stateDmvList = [
  { id: "us-real-id", label: "USA Real ID Driver's License (Federal Standard)" },
  { id: "us-standard-dl", label: "USA Standard Driver's License (All 50 States)" },
  { id: "us-cdl", label: "Commercial Driver's License (CDL)" },
  { id: "us-permit", label: "Learner's Permit / Junior License" },
  { id: "ca-dmv", label: "California DMV Driver License" },
  { id: "ny-dmv", label: "New York DMV Driver License (NYS DMV)" },
  { id: "tx-dps", label: "Texas DPS Driver License" },
  { id: "fl-dhsmv", label: "Florida DHSMV Driver License" },
  { id: "il-sos", label: "Illinois Secretary of State (SOS)" },
  { id: "pa-penndot", label: "Pennsylvania PennDOT Photo" },
  { id: "oh-bmv", label: "Ohio BMV Driver License" },
  { id: "ga-dds", label: "Georgia DDS Driver's License" },
  { id: "nc-dmv", label: "North Carolina DMV Photo" },
  { id: "wa-dol", label: "Washington State DOL License" },
  { id: "va-dmv", label: "Virginia DMV Driver's License" },
  { id: "nj-mvc", label: "New Jersey MVC Driver License" },
  { id: "az-mvd", label: "Arizona MVD Driver License" },
  { id: "co-dmv", label: "Colorado DMV Driver License" },
  { id: "mi-sos", label: "Michigan SOS Driver License" },
  { id: "ma-rmv", label: "Massachusetts RMV Driver License" },
];

const PROCESSING_MESSAGES = [
  "Analyzing portrait & facial landmarks...",
  "Detecting eye line & biometric proportions...",
  "Removing background & evening shadows...",
  "Cropping to official 2×2 in at 300 DPI...",
  "Generating printable 4×6 sheet template...",
];

export default function USADriverLicensePhotoClient({ faqs }: { faqs: FAQ[] }) {
  const router = useRouter();

  // Slider state
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // Upload modal / tool state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState(stateDmvList[0].id);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingIndex, setProcessingIndex] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Animated processing text cycle
  useEffect(() => {
    if (!isProcessing) {
      setProcessingIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setProcessingIndex((prev) => (prev + 1) % PROCESSING_MESSAGES.length);
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
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setErrorMsg("");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/")) {
      setSelectedFile(file);
      setErrorMsg("");
    }
  };

  return (
    <div className="hcr">
      {/* ── HERO SECTION (Exact Homepage UI Layout) ── */}
      <section className="bg-white border-b border-slate-200">
        {/* Gov-style top accent bar */}
        <div className="h-1 bg-lime-700 w-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            
            {/* ── TEXT COLUMN ── */}
            <div className="flex-1 w-full">
              {/* Official badge */}
              <div className="inline-flex items-center gap-2 bg-lime-50 border border-lime-200 rounded px-3 py-1.5 mb-5">
                <span className="w-2 h-2 rounded-full bg-lime-600 inline-block" />
                <span className="text-xs font-semibold text-lime-800 tracking-wide uppercase">
                  Official USA Driver's License Photo Editor · Real ID Compliant
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-slate-900 leading-tight tracking-tight mb-3">
                USA Driver's License Photo Editor: Make 2×2 in Real ID Photos
              </h1>
              <p className="text-lg sm:text-xl text-slate-500 font-normal mb-5 leading-snug">
                Crop, remove background, and format your driver's license picture in 30 seconds
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-7 max-w-lg">
                Automated AI cropping to official 2×2 inch (600×600 px) dimensions with pure white background, centered eye line, and 50%–69% head height for all 50 US state DMVs.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-7">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(true)}
                  className="inline-flex items-center justify-center bg-lime-700 hover:bg-lime-800 text-white text-sm font-semibold px-6 py-3 rounded transition-colors cursor-pointer shadow-sm"
                >
                  Create License Photo Now →
                </button>
                <a
                  href="/visa-photo-validator"
                  className="inline-flex items-center justify-center border border-slate-300 hover:border-slate-400 text-slate-700 text-sm font-semibold px-6 py-3 rounded transition-colors"
                >
                  Free DMV Validator
                </a>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#1d4ed8">
                      <path d="M12 2l2.9 8.9H23l-7.4 5.4 2.8 8.7L12 19.6l-6.4 5.4 2.8-8.7L2 10.9h8.1z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-slate-600 font-medium">
                  4.9 · Trusted by 25,000+ drivers nationwide
                </span>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-3">
                {trustBadges.map((t, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs font-medium text-slate-700"
                  >
                    <span>{t.icon}</span>
                    <span>{t.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── BEFORE / AFTER SLIDER (Exact Homepage Slider) ── */}
            <div className="w-full lg:w-auto flex flex-col items-center gap-3">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">
                Before &amp; After
              </div>

              <div
                ref={containerRef}
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className="relative rounded overflow-hidden border border-slate-200"
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
                  alt="Before – original casual photo"
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "center top",
                    pointerEvents: "none",
                    zIndex: 0,
                  }}
                  priority
                  sizes="(max-width: 1024px) 100vw, 400px"
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
                    alt="After – compliant DMV Real ID photo"
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "center 8%",
                      pointerEvents: "none",
                    }}
                    sizes="(max-width: 1024px) 100vw, 400px"
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
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    left: "12px",
                    background: "rgba(0,0,0,0.6)",
                    color: "white",
                    padding: "3px 10px",
                    borderRadius: "3px",
                    fontSize: "11px",
                    fontWeight: 600,
                    pointerEvents: "none",
                    zIndex: 4,
                    opacity: sliderPos > 12 ? 1 : 0,
                    transition: "opacity 0.2s",
                    letterSpacing: "0.04em",
                  }}
                >
                  BEFORE
                </div>

                {/* AFTER badge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    right: "12px",
                    background: "#1d4ed8",
                    color: "white",
                    padding: "3px 10px",
                    borderRadius: "3px",
                    fontSize: "11px",
                    fontWeight: 600,
                    pointerEvents: "none",
                    zIndex: 4,
                    opacity: sliderPos < 88 ? 1 : 0,
                    transition: "opacity 0.2s",
                    letterSpacing: "0.04em",
                  }}
                >
                  COMPLIANT ✓
                </div>

                {/* Drag hint */}
                {!hasInteracted && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "48px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "rgba(0,0,0,0.55)",
                      color: "white",
                      padding: "5px 14px",
                      borderRadius: "3px",
                      fontSize: "11px",
                      fontWeight: 500,
                      pointerEvents: "none",
                      zIndex: 5,
                      whiteSpace: "nowrap",
                    }}
                  >
                    ← drag to compare →
                  </div>
                )}
              </div>

              {/* Caption */}
              <p className="text-xs text-slate-400 text-center max-w-xs">
                Processed · White background · 2×2 in crop · Print-ready
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── EXAMPLE OUTPUT SECTION (Exact Homepage Cards) ── */}
      <section className="bg-white border-b border-slate-200 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-7">
            <div className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-2">
              Example Output
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              See your driver's license photo transform
            </h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              From upload to print-ready — the complete process with official 2×2 in Real ID biometric compliance built in.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                src: "https://res.cloudinary.com/dipzpwbbk/image/upload/f_auto,q_auto,w_600/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg",
                alt: "Driver license photo with biometric measurements",
                label: "Photo Processing",
                note: "Face detection with 50%–69% head ratio measurements applied",
              },
              {
                src: "https://res.cloudinary.com/dipzpwbbk/image/upload/f_auto,q_auto,w_600/v1779008017/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_photo_eyp4a3.jpg",
                alt: "Final compliant driver license photo",
                label: "Final Output",
                note: "Official 2×2 in (600×600 px) image with pure white background",
              },
              {
                src: "https://res.cloudinary.com/dipzpwbbk/image/upload/f_auto,q_auto,w_600/v1779076959/MakePassportPhoto_ph2uog.jpg",
                alt: "4x6 print sheet for pharmacy",
                label: "Print Template",
                note: "Ready-to-print 4×6 inch sheet with 4 photos for under $0.50",
              },
            ].map((item, i) => (
              <div key={i} className="border border-slate-200 rounded overflow-hidden bg-white hover:border-lime-500 transition-colors">
                <div className="aspect-[3/4] relative bg-slate-100 overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="px-4 py-3 border-t border-slate-100">
                  <div className="text-sm font-bold text-slate-900 mb-1">{item.label}</div>
                  <div className="text-xs text-slate-500 leading-relaxed">{item.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INLINE PHOTO CROPPER TOOL SECTION ── */}
      <section className="bg-slate-50 py-12 border-b border-slate-200" id="tool">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-lime-100 text-lime-800 mb-3">
                ✂️ AI Driver's License Photo Cropper &amp; Editor
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
                Crop &amp; Format Your Driver's License Photo
              </h2>
              <p className="text-sm text-slate-600">
                Select your state DMV or license type. We'll size, crop, and format it to exact 2×2 inch Real ID specifications.
              </p>
            </div>

            <div className="max-w-xl mx-auto space-y-6">
              {/* State / Agency Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Select State Agency / License Type
                </label>
                <select
                  value={selectedDocId}
                  onChange={(e) => setSelectedDocId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl text-slate-900 py-3.5 px-4 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
                >
                  {stateDmvList.map((opt) => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Upload Dropzone */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Upload Photo
                </label>
                {!previewUrl ? (
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                      dragOver ? "border-lime-500 bg-lime-50/50 scale-[1.01]" : "border-slate-300 hover:border-lime-500 hover:bg-slate-50/80 bg-slate-50/40"
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/heic"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="w-14 h-14 mx-auto rounded-full bg-lime-100 text-lime-700 flex items-center justify-center mb-3">
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                      </svg>
                    </div>
                    <p className="text-base font-bold text-slate-900 mb-1">Click to upload or drag &amp; drop</p>
                    <p className="text-xs text-slate-500">Supports JPG, PNG, WEBP, or HEIC from any smartphone or camera</p>
                  </div>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900">
                    <img src={previewUrl} alt="Upload preview" className="w-full h-64 object-contain" />
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                      className="absolute top-3 right-3 bg-black/70 hover:bg-black text-white px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
                    >
                      ✕ Change Photo
                    </button>
                  </div>
                )}
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="button"
                disabled={!selectedFile || isProcessing}
                onClick={processFile}
                className={`w-full py-4 px-6 rounded-xl font-bold text-sm text-center transition-all flex items-center justify-center gap-2.5 ${
                  !selectedFile || isProcessing
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-lime-700 hover:bg-lime-800 text-white shadow-lg shadow-lime-700/25 active:scale-[0.99] cursor-pointer"
                }`}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white shrink-0" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span className="transition-opacity duration-200">
                      {PROCESSING_MESSAGES[processingIndex]}
                    </span>
                  </>
                ) : (
                  <>
                    <span>Generate 2×2 Driver License Photo</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS SECTION (Homepage Style) ── */}
      <section className="bg-white py-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-lime-700 uppercase tracking-widest mb-2 block">
              Step-by-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
              How to create your driver's license photo online
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
              Follow our easy 5-step automated workflow to generate an official 2×2 inch photo ready for renewal or DMV appointments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-xl border border-slate-200/80 hover:border-lime-500 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl">{s.icon}</span>
                    <span className="text-xs font-black text-lime-700 bg-lime-100 px-2 py-0.5 rounded">
                      {s.num}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KEY SPECIFICATIONS (Homepage Grid) ── */}
      <section className="bg-slate-50 py-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-lime-700 uppercase tracking-widest mb-2 block">
              Official Requirements
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
              USA Driver's License &amp; Real ID Photo Specifications
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
              Strict parameters enforced by all 50 state motor vehicle agencies and the Department of Homeland Security.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {specs.map((spec, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 text-center flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    {spec.label}
                  </span>
                  <div className="text-sm sm:text-base font-black text-slate-900 mb-1">
                    {spec.value}
                  </div>
                </div>
                <span className="text-[10px] text-slate-500">{spec.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REJECTION REASONS SECTION ── */}
      <section className="bg-white py-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-rose-700 uppercase tracking-widest mb-2 block">
              Rejection Prevention
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
              Common Reasons Driver's License Photos Get Rejected
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
              Learn what causes photos to fail DMV intake scanners and how our automated engine corrects them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rejectionReasons.map((r, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex gap-4 items-start">
                <span className="text-xs font-black px-2.5 py-1 rounded bg-rose-100 text-rose-800 shrink-0">
                  {r.num}
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">{r.title}</h3>
                  <p className="text-xs text-slate-600 mb-3 leading-relaxed">{r.why}</p>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-lime-900 flex items-center gap-2">
                    <span className="font-bold text-lime-700">✓ Fix:</span> {r.check}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO TIPS & GUIDELINES ── */}
      <section className="bg-slate-50 py-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-lime-700 uppercase tracking-widest mb-2 block">
              Photo Taking Guide
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
              How to Take a Passing Driver's License Photo
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
              Follow these simple tips with any phone or digital camera before uploading.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photoTips.map((tip, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-3xl mb-3">{tip.icon}</div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{tip.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{tip.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRIVACY & SECURITY SECTION (Homepage Style) ── */}
      <section className="bg-white py-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-lime-700 uppercase tracking-widest mb-2 block">
              Data Protection
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
              Your Privacy is Guaranteed
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
              We take privacy seriously with automatic data deletion and strict compliance with global privacy standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {privacyItems.map((item, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQS SECTION (Homepage Style) ── */}
      <section className="bg-slate-50 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-lime-700 uppercase tracking-widest mb-2 block">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white border border-slate-200 rounded-xl open:shadow-sm transition-all">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none text-sm sm:text-base font-bold text-slate-900">
                  <span className="pr-4">{faq.question}</span>
                  <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 group-open:bg-lime-700 group-open:text-white transition-colors">
                    <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODAL POPUP FOR QUICK UPLOAD (Triggered by Hero CTA) ── */}
      {isUploadModalOpen && !isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl">
            <button
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 text-lg transition-colors cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-slate-900 mb-2">Create Driver's License Photo</h3>
            <p className="text-xs text-slate-500 mb-5">
              Select your state and upload a photo to format to 2×2 in (600×600 px).
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Select State Agency / License Type
                </label>
                <select
                  value={selectedDocId}
                  onChange={(e) => setSelectedDocId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl text-slate-900 py-3 px-3.5 font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-lime-500"
                >
                  {stateDmvList.map((opt) => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {!previewUrl ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-lime-500 rounded-2xl p-6 text-center cursor-pointer bg-slate-50/60 transition-all"
                >
                  <div className="w-12 h-12 mx-auto rounded-full bg-lime-100 text-lime-700 flex items-center justify-center mb-2">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                  </div>
                  <p className="text-sm font-bold text-slate-800">Tap to upload portrait</p>
                  <p className="text-xs text-slate-500">JPG, PNG, HEIC</p>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900">
                  <img src={previewUrl} alt="Preview" className="w-full h-48 object-contain" />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white px-2.5 py-1 rounded-full text-xs"
                  >
                    ✕ Change
                  </button>
                </div>
              )}

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              <button
                type="button"
                disabled={!selectedFile || isProcessing}
                onClick={processFile}
                className={`w-full py-3.5 px-5 rounded-xl font-bold text-sm text-center transition-all flex items-center justify-center gap-2 ${
                  !selectedFile || isProcessing
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-lime-700 hover:bg-lime-800 text-white shadow-md cursor-pointer"
                }`}
              >
                {isProcessing ? "Processing..." : "Generate Driver's License Photo →"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── FULL-SCREEN ANIMATED PROCESSING DIALOG OVERLAY ── */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-md">
          <div className="bg-white rounded-3xl p-7 sm:p-9 max-w-md w-full text-center shadow-2xl border border-slate-100 flex flex-col items-center">
            {/* Animated AI processing ring */}
            <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-lime-200 animate-ping opacity-25" />
              <div className="absolute inset-0 rounded-full border-4 border-lime-500/20 border-t-lime-600 animate-spin" />
              <div className="w-12 h-12 rounded-full bg-lime-100 text-lime-700 flex items-center justify-center text-2xl shadow-inner">
                🚗
              </div>
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-2">
              Formatting License Photo
            </h3>

            {/* Dynamic Animated status badge */}
            <div className="min-h-[36px] flex items-center justify-center mb-5 w-full">
              <div className="text-xs sm:text-sm font-semibold text-lime-800 bg-lime-50 border border-lime-200/80 px-4 py-1.5 rounded-full transition-all duration-300">
                {PROCESSING_MESSAGES[processingIndex]}
              </div>
            </div>

            {/* Animated Progress Bar */}
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-4">
              <div
                className="bg-lime-600 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.min(96, (processingIndex + 1) * 22)}%` }}
              />
            </div>

            <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
              Our AI is aligning facial landmarks and generating your 2×2 inch photo and 4×6 print template.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
