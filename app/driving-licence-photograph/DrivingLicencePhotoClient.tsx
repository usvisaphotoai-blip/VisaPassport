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

interface DrivingDoc {
  id: string;
  label: string;
  size: string;
  countryCode: string;
  docType: string;
}

const drivingDocuments: DrivingDoc[] = [
  { id: "uk-driving", label: "UK Driving Licence 35×45 mm (DVLA)", size: "35 × 45 mm", countryCode: "GB", docType: "passport" },
  { id: "us-driving", label: "USA Driver's License & Real ID 2×2 in (DMV)", size: "2 × 2 inch", countryCode: "US", docType: "passport" },
  { id: "idp-photo", label: "International Driving Permit (IDP) 35×45 mm", size: "35 × 45 mm", countryCode: "GB", docType: "passport" },
  { id: "au-driving", label: "Australia Driver Licence 35×45 mm", size: "35 × 45 mm", countryCode: "AU", docType: "passport" },
  { id: "ca-driving", label: "Canada Driver's Licence 35×45 mm", size: "35 × 45 mm", countryCode: "CA", docType: "passport" },
  { id: "de-driving", label: "Germany Führerschein 35×45 mm", size: "35 × 45 mm", countryCode: "DE", docType: "passport" },
  { id: "fr-driving", label: "France Permis de Conduire 35×45 mm", size: "35 × 45 mm", countryCode: "FR", docType: "passport" },
  { id: "in-driving", label: "India Driving Licence (Sarathi Portal)", size: "35 × 45 mm", countryCode: "IN", docType: "passport" },
  { id: "nz-driving", label: "New Zealand Driver Licence 35×45 mm", size: "35 × 45 mm", countryCode: "NZ", docType: "passport" },
  { id: "ie-driving", label: "Ireland Driving Licence 35×45 mm (NDLS)", size: "35 × 45 mm", countryCode: "IE", docType: "passport" },
  { id: "es-driving", label: "Spain Permiso de Conducir 35×45 mm", size: "35 × 45 mm", countryCode: "ES", docType: "passport" },
  { id: "it-driving", label: "Italy Patente di Guida 35×45 mm", size: "35 × 45 mm", countryCode: "IT", docType: "passport" },
];

const trustBadges = [
  { icon: "🔒", text: "Secure & Private" },
  { icon: "⚡", text: "Results in 30s" },
  { icon: "🌍", text: "Global License Specs" },
  { icon: "🆓", text: "Free Validation" },
];

const steps = [
  {
    num: "01",
    title: "Upload Portrait",
    desc: "Upload a casual portrait or selfie taken with your phone or camera against any plain wall.",
    icon: "📤",
  },
  {
    num: "02",
    title: "AI Biometric Scan",
    desc: "Our software verifies facial landmarks, lighting uniformity, head ratios, and no-glasses compliance.",
    icon: "⚡",
  },
  {
    num: "03",
    title: "Auto-Crop & Background",
    desc: "We crop to the exact 35×45 mm or 2×2 in size and replace background with plain white/light grey.",
    icon: "✂️",
  },
  {
    num: "04",
    title: "Affordable Pricing",
    desc: "Affordable one-time fee starting at $2.99 with a 100% government acceptance guarantee.",
    icon: "💳",
  },
  {
    num: "05",
    title: "Download & Print",
    desc: "Get digital JPEG for online applications and a 4×6 print sheet with 4–8 photos for under $0.50.",
    icon: "⬇️",
  },
];

const specs = [
  {
    label: "UK / EU / AU Size",
    value: "35 × 45 mm",
    detail: "DVLA & international standard",
  },
  {
    label: "USA DMV Size",
    value: "2 × 2 in (51×51 mm)",
    detail: "Real ID & 50-state DMV standard",
  },
  {
    label: "Digital Pixels",
    value: "600×600 or 413×531 px",
    detail: "300 DPI high-resolution export",
  },
  {
    label: "Background",
    value: "Plain White / Light Grey",
    detail: "Uniform, shadow-free illumination",
  },
  {
    label: "Head Proportion",
    value: "65%–75% (or 50%–69%)",
    detail: "Official chin-to-crown ratio",
  },
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
    why: "Lens reflections and heavy frames obscure the eyes and pupils, violating biometric licensing rules.",
    check: "Automated scan checks for zero-glasses compliance before final export.",
  },
  {
    num: "02",
    title: "Shadows Behind Head or on Face",
    why: "Uneven lighting casts dark patches that fail automated biometric intake scanners.",
    check: "Our AI evens out illumination and generates a clean, uniform backdrop.",
  },
  {
    num: "03",
    title: "Head Too Small or Incorrectly Framed",
    why: "Standing at the wrong distance leaves head height outside the mandatory millimeter range.",
    check: "Intelligent auto-scaling centers and resizes your head to the exact official ratio.",
  },
  {
    num: "04",
    title: "Face Tilted or Off-Center",
    why: "Looking away from the lens or tilting your head distorts facial symmetry measurements.",
    check: "Face orientation algorithms re-align your eye line horizontally across the frame.",
  },
];

const photoTips = [
  {
    icon: "🪟",
    title: "Face a Window in Daylight",
    body: "Soft natural daytime light removes harsh shadows from your face, nose bridge, and background.",
  },
  {
    icon: "📷",
    title: "Camera at Eye Level",
    body: "Have a friend hold the camera 4–6 feet away at eye level. Avoid close-up front-camera selfies.",
  },
  {
    icon: "👗",
    title: "Wear Contrasting Dark Colors",
    body: "Choose navy, black, burgundy, or dark green tops. Skip white and light shirts that blend in.",
  },
  {
    icon: "💇",
    title: "Hair Off Face & Shoulders",
    body: "Tuck hair behind your ears so both eyes, eyebrows, cheeks, and jawline stay visible.",
  },
  {
    icon: "😐",
    title: "Neutral, Forward-Facing Pose",
    body: "Look straight into the camera lens with both eyes open, mouth closed, and relaxed expression.",
  },
  {
    icon: "👓",
    title: "Remove All Glasses & Hats",
    body: "Remove eyeglasses, sunglasses, hats, and headphones. Religious coverings allowed if face is clear.",
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

const PROCESSING_MESSAGES = [
  "Scanning portrait & biometric landmarks...",
  "Applying international driving licence standard...",
  "Removing background & balancing lighting...",
  "Cropping to official proportions at 300 DPI...",
  "Generating print-ready template...",
];

export default function DrivingLicencePhotoClient({ faqs }: { faqs: FAQ[] }) {
  const router = useRouter();

  // Slider state
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // Upload modal / tool state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState(drivingDocuments[0].id);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingIndex, setProcessingIndex] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cycling animated processing messages
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
      const doc = drivingDocuments.find((d) => d.id === selectedDocId) || drivingDocuments[0];

      const formData = new FormData();
      formData.append("image", compressed);
      formData.append("country_code", doc.countryCode);
      formData.append("document_type", doc.docType);
      formData.append("source", "driving-licence-photograph");

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

      router.push(`/preview/${data.photoId}?from=driving-licence-photograph`);
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
                  Official Driving Licence Photo Maker · DVLA &amp; DMV Compliant
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-slate-900 leading-tight tracking-tight mb-3">
                Driving Licence Photograph Maker: Online Photo Sizing &amp; Cropping
              </h1>
              <p className="text-lg sm:text-xl text-slate-500 font-normal mb-5 leading-snug">
                Crop, remove background, and format your driving licence photo in 30 seconds
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-7 max-w-lg">
                Automated AI cropping to official 35×45 mm (UK, EU, Australia, India) and 2×2 in (US DMV) dimensions with pure light/white background, centered eye line, and correct head height.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-7">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(true)}
                  className="inline-flex items-center justify-center bg-lime-700 hover:bg-lime-800 text-white text-sm font-semibold px-6 py-3 rounded transition-colors cursor-pointer shadow-sm"
                >
                  Make Driving Photo Now →
                </button>
                <a
                  href="/visa-photo-validator"
                  className="inline-flex items-center justify-center border border-slate-300 hover:border-slate-400 text-slate-700 text-sm font-semibold px-6 py-3 rounded transition-colors"
                >
                  Free License Validator
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
                  4.9 · Trusted by 32,000+ drivers globally
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
                    alt="After – compliant driving licence photo"
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
                Processed · Background removed · Sized to spec · Print-ready
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
              See your driving licence photo transform
            </h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              From casual snapshot to official compliant driving licence portrait with automatic background fix and sizing.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                src: "https://res.cloudinary.com/dipzpwbbk/image/upload/f_auto,q_auto,w_600/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg",
                alt: "Driving photo with biometric measurements",
                label: "Photo Processing",
                note: "Face detection with head ratio measurements and centering applied",
              },
              {
                src: "https://res.cloudinary.com/dipzpwbbk/image/upload/f_auto,q_auto,w_600/v1779008017/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_photo_eyp4a3.jpg",
                alt: "Final compliant driving licence photo",
                label: "Final Output",
                note: "Official 35×45 mm or 2×2 in image with clean white/grey background",
              },
              {
                src: "https://res.cloudinary.com/dipzpwbbk/image/upload/f_auto,q_auto,w_600/v1779076959/MakePassportPhoto_ph2uog.jpg",
                alt: "4x6 print sheet for local printing",
                label: "Print Template",
                note: "Ready-to-print 4×6 inch sheet with 4–8 photos for under $0.50 at kiosks",
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

      {/* ── INLINE PHOTO CREATOR TOOL SECTION ── */}
      <section className="bg-slate-50 py-12 border-b border-slate-200" id="tool">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-lime-100 text-lime-800 mb-3">
                🚗 Instant Licence Photo Maker
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
                Upload &amp; Format Your Driving Licence Photo
              </h2>
              <p className="text-sm text-slate-600">
                Select your country standard and upload your portrait. We'll size, crop, and check it against official licensing rules.
              </p>
            </div>

            <div className="max-w-xl mx-auto space-y-6">
              {/* Document purpose select */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Select Country &amp; Licence Standard
                </label>
                <select
                  value={selectedDocId}
                  onChange={(e) => setSelectedDocId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl text-slate-900 py-3.5 px-4 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
                >
                  {drivingDocuments.map((opt) => (
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
                    <span>Create Compliant Driving Photo</span>
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
              How to create your driving licence photo online
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
              Follow our easy 5-step automated workflow to generate an official compliant photo ready for renewal or appointments.
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
              Global Driving Licence Photo Specifications
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
              Strict parameters enforced by UK DVLA, US DMV, EU member states, Australia, and international permit issuers.
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
              Common Reasons Driving Licence Photos Get Rejected
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
              Learn what causes photos to fail at licensing counters and how our automated engine corrects them.
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
              How to Take a Passing Driving Licence Photo
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
              Follow these simple tips with any smartphone or digital camera before uploading.
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

            <h3 className="text-xl font-bold text-slate-900 mb-2">Create Driving Licence Photo</h3>
            <p className="text-xs text-slate-500 mb-5">
              Select your licence standard and upload a photo to format to exact official specifications.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Licence Standard
                </label>
                <select
                  value={selectedDocId}
                  onChange={(e) => setSelectedDocId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl text-slate-900 py-3 px-3.5 font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-lime-500"
                >
                  {drivingDocuments.map((opt) => (
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
                {isProcessing ? "Processing..." : "Create Driving Licence Photo →"}
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
              Formatting Driving Licence Photo
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
              Applying exact country licensing dimensions, background removal, and 300 DPI export.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
