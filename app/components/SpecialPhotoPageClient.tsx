"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { compressImage } from "@/lib/compressImage";

interface DocumentItem {
  id: string;
  label: string;
  size: string;
  type: string;
}

interface FAQItem {
  q: string;
  a: string;
}

export interface SpecialPhotoPageProps {
  countryCode: string;
  heroTitle: string;
  heroSubtitle: string;
  documents: DocumentItem[];
  contentHtml: string;
  faqs: FAQItem[];
  slug?: string;
  breadcrumbLabel?: string;
  relatedLinks?: { href: string; label: string }[];
  heroImages?: { before: string; after: string };
  heroSpecs?: string[];
  heroBadge?: string;
}

const DEFAULT_RELATED_LINKS = [
  { href: "/us-passport-photo-editor", label: "US Passport Photo Editor" },
  { href: "/us-visa-photo-editor", label: "US Visa Photo Editor" },
  { href: "/indian-passport-size-photograph", label: "Indian Passport Size Photo" },
  { href: "/ca", label: "Canada Visa Size Photo" },
  { href: "/uk-passport-photo-checker-online-free", label: "UK Photo Checker" },
  { href: "/digital-visa-photo-specs-2026", label: "Digital Visa Specs 2026" },
];

const TRUST_ITEMS = [
  {
    title: "Privacy first",
    desc: "Encrypted uploads, never sold",
    icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  },
  {
    title: "ICAO compliant",
    desc: "Meets 9303 biometric standards",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    title: "Instant result",
    desc: "AI processing in under 10 seconds",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    title: "Free preview",
    desc: "Check before you pay anything",
    icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  },
];

const HOW_IT_WORKS = [
  { title: "Upload any photo", desc: "A clear selfie or phone photo taken against any wall." },
  { title: "AI fixes it instantly", desc: "Background turned white, face centred and cropped to size." },
  { title: "Download or print", desc: "Get a digital file and a print-ready sheet in seconds." },
];

const PROCESSING_STEPS = [
  "Uploading photo",
  "Detecting face",
  "Whitening background",
  "Cropping to size",
];

const ACCEPTED_TYPES = "image/jpeg,image/png,image/webp,image/heic,image/heif";

// Downscale before upload — the output is only 630 × 810 px, so ~1 MB is plenty and uploads much faster
const UPLOAD_MAX_BYTES = 1 * 1024 * 1024;

function CheckIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function SpecialPhotoPageClient({
  countryCode,
  heroTitle,
  heroSubtitle,
  documents,
  contentHtml,
  faqs,
  slug,
  breadcrumbLabel,
  relatedLinks = DEFAULT_RELATED_LINKS,
  heroImages,
  heroSpecs,
  heroBadge = "Official size · 2026 rules",
}: SpecialPhotoPageProps) {
  const router = useRouter();
  const [selectedDoc, setSelectedDoc] = useState(documents[0]?.id);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [showStickyCta, setShowStickyCta] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadCardRef = useRef<HTMLDivElement>(null);

  const activeDoc = documents.find((d) => d.id === selectedDoc);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  // Advance the visual step list while the request is in flight
  useEffect(() => {
    if (!isProcessing) return;
    setProcessingStep(0);
    const timers = [1000, 2500, 4500].map((ms, i) => setTimeout(() => setProcessingStep(i + 1), ms));
    return () => timers.forEach(clearTimeout);
  }, [isProcessing]);

  // Mobile sticky CTA only when the upload card is off-screen
  useEffect(() => {
    const el = uploadCardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setShowStickyCta(!entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const processFile = useCallback(
    async (file: File) => {
      setErrorMsg("");
      setIsProcessing(true);

      try {
        const compressed = await compressImage(file, { maxBytes: UPLOAD_MAX_BYTES });

        const formData = new FormData();
        formData.append("image", compressed);
        formData.append("country_code", countryCode);
        formData.append("document_type", activeDoc?.type || "passport");
        formData.append("source", "special-photo-page");

        const res = await fetch("/api/external-process", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.details || data.error || "Processing failed");

        // The preview page loads the photo server-side, so go straight there
        setProcessingStep(PROCESSING_STEPS.length);
        router.push(`/preview/${data.photoId}?from=special-photo-page`);
      } catch (err) {
        setErrorMsg((err instanceof Error && err.message) || "Something went wrong. Please try again.");
        setIsProcessing(false);
      }
    },
    [countryCode, activeDoc?.type, router]
  );

  // Selecting a photo starts processing immediately — no extra click
  const acceptFile = (file: File | undefined) => {
    if (!file || isProcessing) return;
    if (!file.type.startsWith("image/") && !/\.(heic|heif)$/i.test(file.name)) {
      setErrorMsg("Please choose an image file (JPG, PNG, WEBP or HEIC).");
      return;
    }
    setSelectedFile(file);
    processFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    acceptFile(e.target.files?.[0]);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    acceptFile(e.dataTransfer.files?.[0]);
  };

  const openPicker = () => {
    if (!isProcessing) fileInputRef.current?.click();
  };

  const scrollToUploadAndPick = () => {
    uploadCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    openPicker();
  };

  const progressPct = Math.min(95, 15 + processingStep * 22);

  return (
    <div className="min-h-screen bg-white">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={ACCEPTED_TYPES}
        className="hidden"
      />

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 sm:pb-12 lg:pb-14">
          <nav aria-label="Breadcrumb" className="mb-5 sm:mb-8">
            <ol className="flex items-center gap-2 text-xs text-slate-500">
              <li><Link href="/" className="hover:text-lime-700">Home</Link></li>
              <li aria-hidden>/</li>
              <li className="text-slate-900 font-medium truncate" aria-current="page">{breadcrumbLabel || countryCode}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 lg:items-center">
            {/* LEFT — copy + upload */}
            <div className="lg:col-span-7 min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-lime-700 mb-3">
                {heroBadge}
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-3 sm:mb-4">
                {heroTitle}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4 sm:mb-5">
                {heroSubtitle}
              </p>

              {heroSpecs && heroSpecs.length > 0 && (
                <ul className="flex flex-wrap gap-x-4 gap-y-1.5 mb-6">
                  {heroSpecs.map((s) => (
                    <li key={s} className="inline-flex items-center gap-1.5 text-sm text-slate-700">
                      <CheckIcon className="w-3.5 h-3.5 text-lime-600 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              )}

              {/* Upload card */}
              <div ref={uploadCardRef} className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5">
                {documents.length > 1 && (
                  <div className="mb-4">
                    <p className="text-xs font-medium text-slate-500 mb-2">Photo for</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2" role="radiogroup" aria-label="Photo type">
                      {documents.map((doc) => {
                        const active = doc.id === selectedDoc;
                        return (
                          <button
                            key={doc.id}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            disabled={isProcessing}
                            onClick={() => setSelectedDoc(doc.id)}
                            className={`flex sm:block items-center justify-between gap-2 text-left rounded-lg border px-3 py-2 transition-colors disabled:opacity-60
                              ${active ? "border-lime-600 bg-lime-50" : "border-slate-200 hover:border-slate-300"}`}
                          >
                            <span className={`block text-sm font-medium ${active ? "text-lime-900" : "text-slate-800"}`}>{doc.label}</span>
                            <span className={`block text-xs ${active ? "text-lime-700" : "text-slate-500"}`}>{doc.size}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {isProcessing ? (
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 flex items-start gap-4" aria-live="polite">
                    {previewUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={previewUrl} alt="Your uploaded photo" className="w-16 h-20 sm:w-20 sm:h-24 rounded-md object-cover shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-base font-semibold text-slate-900">Creating your photo…</p>
                      <p className="text-xs text-slate-500 mb-3">Usually under 10 seconds. Keep this page open.</p>
                      <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden mb-3">
                        <div className="h-full rounded-full bg-lime-600 transition-[width] duration-700" style={{ width: `${progressPct}%` }} />
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                        {PROCESSING_STEPS.map((step, i) => {
                          const done = i < processingStep;
                          const current = i === processingStep;
                          return (
                            <li key={step} className={`flex items-center gap-2 text-xs sm:text-sm ${done || current ? "text-slate-800" : "text-slate-400"}`}>
                              {done ? (
                                <CheckIcon className="w-3.5 h-3.5 text-lime-600 shrink-0" />
                              ) : current ? (
                                <span className="w-3.5 h-3.5 rounded-full border-2 border-lime-600 border-t-transparent animate-spin shrink-0" />
                              ) : (
                                <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-300 shrink-0" />
                              )}
                              {step}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                ) : errorMsg && selectedFile ? (
                  <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 flex items-start gap-4" role="alert">
                    {previewUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={previewUrl} alt="Your uploaded photo" className="w-16 h-20 rounded-md object-cover shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-rose-700">We couldn&apos;t process this photo</p>
                      <p className="text-sm text-rose-600 mt-0.5 mb-3 break-words">{errorMsg}</p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => processFile(selectedFile)}
                          className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
                        >
                          Try again
                        </button>
                        <button
                          type="button"
                          onClick={() => { setSelectedFile(null); setErrorMsg(""); openPicker(); }}
                          className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm font-medium hover:border-slate-500 transition-colors"
                        >
                          Use another photo
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`rounded-lg border-2 border-dashed px-4 py-6 sm:py-8 text-center cursor-pointer transition-colors
                      ${dragOver ? "border-lime-600 bg-lime-50" : "border-slate-300 hover:border-lime-500"}`}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={openPicker}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openPicker(); } }}
                    role="button"
                    tabIndex={0}
                    aria-label="Upload your photo"
                  >
                    <span className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 rounded-lg bg-lime-700 hover:bg-lime-800 text-white text-base font-semibold transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      Upload your photo
                    </span>
                    <p className="text-sm text-slate-500 mt-3">
                      <span className="hidden sm:inline">or drag &amp; drop · </span>starts automatically
                    </p>
                    <p className="text-xs text-slate-400 mt-1">JPG · PNG · WEBP · HEIC</p>
                    {errorMsg && <p className="text-sm text-rose-600 mt-3" role="alert">{errorMsg}</p>}
                  </div>
                )}

                <p className="text-xs text-slate-500 text-center mt-3">
                  Free preview · Pay only to download · Photos kept private
                </p>
              </div>
            </div>

            {/* RIGHT — before / after */}
            {heroImages && (
              <div className="lg:col-span-5">
                <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto lg:max-w-none">
                  <figure>
                    <div className="relative aspect-[35/45] rounded-lg overflow-hidden bg-slate-200 border border-slate-200">
                      <Image
                        src={heroImages.before}
                        alt="Original home photo before conversion"
                        fill
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 190px, 220px"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="mt-2 text-xs font-medium text-slate-500 text-center">Your photo</figcaption>
                  </figure>
                  <figure>
                    <div className="relative aspect-[35/45] rounded-lg overflow-hidden bg-white border-2 border-lime-600">
                      <Image
                        src={heroImages.after}
                        alt="Final compliant passport size photo"
                        fill
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 190px, 220px"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="mt-2 text-xs font-medium text-lime-700 text-center">
                      Ready photo{activeDoc?.size ? ` · ${activeDoc.size.split(" (")[0]}` : ""}
                    </figcaption>
                  </figure>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <ol className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8">
          {HOW_IT_WORKS.map((s, i) => (
            <li key={s.title} className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full bg-lime-100 text-lime-800 text-sm font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <div>
                <p className="text-sm sm:text-base font-semibold text-slate-900">{s.title}</p>
                <p className="text-sm text-slate-500 mt-0.5 leading-snug">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ─── TRUST ────────────────────────────────────────────────────────── */}
      <section className="border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4">
          {TRUST_ITEMS.map(({ title, desc, icon }, i) => (
            <div
              key={title}
              className={`flex items-start gap-3 py-5 px-2 sm:px-4
                ${i % 2 === 1 ? "border-l border-slate-200" : ""}
                ${i >= 2 ? "border-t lg:border-t-0 border-slate-200" : ""}
                ${i === 2 ? "lg:border-l" : ""}`}
            >
              <svg className="w-5 h-5 text-lime-700 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
              </svg>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900">{title}</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-snug">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── RICH CONTENT ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 lg:py-16">
        <article className="rich-content">
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />

          {/* Mid-page CTA */}
          <div className="my-10 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-base sm:text-lg font-semibold text-slate-900">Ready to make your photo?</p>
              <p className="text-sm text-slate-500 mt-0.5">Upload a selfie — we start processing right away.</p>
            </div>
            <button
              type="button"
              onClick={scrollToUploadAndPick}
              className="shrink-0 px-5 py-2.5 rounded-lg bg-lime-700 hover:bg-lime-800 text-white text-sm font-semibold transition-colors"
            >
              Upload photo
            </button>
          </div>

          {/* FAQ */}
          {faqs && faqs.length > 0 && (
            <div className="mt-10 sm:mt-12">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-5 sm:mb-6">
                Frequently asked questions
              </h2>
              <div className="divide-y divide-slate-200 border-y border-slate-200">
                {faqs.map((item) => (
                  <details key={item.q} className="group">
                    <summary className="py-4 font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center gap-4">
                      <span className="text-sm sm:text-base">{item.q}</span>
                      <svg
                        className="w-4 h-4 shrink-0 text-slate-500 transition-transform group-open:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="pb-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                      <p>{item.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Related tools */}
          <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-200">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-5 sm:mb-6">
              Related Photo Tools
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
              {relatedLinks
                .filter((l) => l.href !== `/${slug}`)
                .map((l) => (
                  <Link key={l.href} href={l.href} className="text-xs font-semibold text-slate-700 hover:text-lime-700 bg-slate-50 p-3 rounded-lg border border-slate-200 transition-colors block text-center">
                    {l.label}
                  </Link>
                ))}
            </div>
          </div>
        </article>
      </div>

      {/* Sticky mobile CTA — only when the upload card is scrolled away */}
      {showStickyCta && !isProcessing && (
        <div
          className="lg:hidden fixed bottom-0 inset-x-0 z-20 bg-white border-t border-slate-200 p-3"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <button
            type="button"
            onClick={scrollToUploadAndPick}
            className="w-full py-3 px-6 rounded-lg text-base font-semibold bg-lime-700 text-white"
          >
            Upload photo — free preview
          </button>
        </div>
      )}
    </div>
  );
}
