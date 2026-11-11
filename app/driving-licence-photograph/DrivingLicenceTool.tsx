"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { compressImage } from "@/lib/compressImage";
import { licenceDocs, DEFAULT_LICENCE_DOC } from "./licenceDocs";

const MAX_FILE_SIZE_MB = 20;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];
const SOURCE = "driving-licence-photograph";

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
    alt: "Bad example: photo of an existing driving licence card",
    label: "Don't upload this",
    note: "No photos of your old licence or ID card",
    position: "30% center",
  },
];

const preflightChecks = [
  "Face looking straight at the camera",
  "No glasses, hats or headphones",
  "Head and top of shoulders in frame",
];

const PROCESSING_MESSAGES = [
  "Analyzing portrait & facial landmarks...",
  "Measuring head size & eye line...",
  "Removing background & evening out shadows...",
  "Cropping to your licence size...",
  "Generating printable 4×6 sheet...",
];

/** Links with href="#tool" or "#tool:<doc-id>" anywhere on the page scroll here (and preselect the doc). */
const TOOL_HASH = /^#tool(?::([\w-]+))?$/;

export default function DrivingLicenceTool() {
  const router = useRouter();

  const [selectedId, setSelectedId] = useState(DEFAULT_LICENCE_DOC.id);
  const selectedDoc = licenceDocs.find((d) => d.id === selectedId) ?? DEFAULT_LICENCE_DOC;

  // Combobox
  const [query, setQuery] = useState("");
  const [comboOpen, setComboOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const comboRef = useRef<HTMLDivElement>(null);
  const comboInputRef = useRef<HTMLInputElement>(null);

  // Upload / processing
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingIndex, setProcessingIndex] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const isProcessingRef = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Highlights / scroll
  const [highlightTool, setHighlightTool] = useState(false);
  const [highlightUpload, setHighlightUpload] = useState(false);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const toolRef = useRef<HTMLElement>(null);
  const uploadRef = useRef<HTMLDivElement>(null);
  const dropzoneRef = useRef<HTMLLabelElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredDocs = useMemo(
    () =>
      normalizedQuery
        ? licenceDocs.filter((d) =>
            `${d.label} ${d.country} ${d.size} ${d.keywords}`.toLowerCase().includes(normalizedQuery),
          )
        : licenceDocs,
    [normalizedQuery],
  );

  const flash = (set: (v: boolean) => void, ms: number) => {
    set(true);
    timers.current.push(setTimeout(() => set(false), ms));
  };

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  // Intercept in-page CTAs (#tool / #tool:<doc-id>) so every "Make my photo" link lands here
  useEffect(() => {
    const goToTool = (docId?: string) => {
      if (docId && licenceDocs.some((d) => d.id === docId)) setSelectedId(docId);
      toolRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      flash(setHighlightTool, 1600);
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest?.("a[href^='#tool']");
      if (!anchor) return;
      const match = anchor.getAttribute("href")?.match(TOOL_HASH);
      if (!match) return;
      e.preventDefault();
      history.replaceState(null, "", "#tool");
      goToTool(match[1]);
    };

    document.addEventListener("click", onClick);
    // Deep link support: /driving-licence-photograph#tool:uk-driving
    const initial = window.location.hash.match(TOOL_HASH);
    if (initial) requestAnimationFrame(() => goToTool(initial[1]));
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Sticky mobile CTA: show after scrolling a bit, hide whenever the tool is on screen
  useEffect(() => {
    const tool = toolRef.current;
    if (!tool || typeof IntersectionObserver === "undefined") return;
    let toolVisible = false;
    const update = () => setShowStickyCta(!toolVisible && window.scrollY > 700);
    const observer = new IntersectionObserver(([entry]) => {
      toolVisible = entry.isIntersecting;
      update();
    });
    observer.observe(tool);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);

  // Close combobox on outside click
  useEffect(() => {
    if (!comboOpen) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (comboRef.current && !comboRef.current.contains(e.target as Node)) {
        setComboOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [comboOpen]);

  useEffect(() => {
    if (!comboOpen) return;
    const opt = filteredDocs[activeIdx];
    if (opt) document.getElementById(`dlp-opt-${opt.id}`)?.scrollIntoView({ block: "nearest" });
  }, [activeIdx, comboOpen, filteredDocs]);

  // Processing message cycle
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

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  const selectDoc = (id: string) => {
    setSelectedId(id);
    setComboOpen(false);
    setQuery("");
    comboInputRef.current?.blur();
    requestAnimationFrame(() => {
      uploadRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      dropzoneRef.current?.focus({ preventScroll: true });
    });
    flash(setHighlightUpload, 2000);
  };

  const onComboKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!comboOpen) setComboOpen(true);
      else setActiveIdx((i) => Math.min(i + 1, filteredDocs.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (comboOpen && filteredDocs[activeIdx]) {
        e.preventDefault();
        selectDoc(filteredDocs[activeIdx].id);
      }
    } else if (e.key === "Escape") {
      setComboOpen(false);
      setQuery("");
    }
  };

  async function processFile(file: File | null = selectedFile) {
    if (!file || isProcessingRef.current) return;
    isProcessingRef.current = true;
    setErrorMsg("");
    setIsProcessing(true);

    try {
      const compressed = await compressImage(file);
      const formData = new FormData();
      formData.append("image", compressed);
      formData.append("country_code", selectedDoc.countryCode);
      formData.append("document_type", "passport");
      formData.append("full_doc_id", selectedDoc.fullDocId);
      formData.append("source", SOURCE);

      const res = await fetch("/api/external-process", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.details || data.error || "Processing failed");

      const photoRes = await fetch(`/api/photo/${data.photoId}`);
      const photoResult = await photoRes.json();
      if (!photoRes.ok || !photoResult.success) throw new Error("Failed to load generated photo details.");

      router.push(`/preview/${data.photoId}?from=${SOURCE}&use=${encodeURIComponent(selectedDoc.id)}`);
    } catch (err) {
      setErrorMsg(err instanceof Error && err.message ? err.message : "Something went wrong. Please try again.");
      setIsProcessing(false);
      isProcessingRef.current = false;
    }
  }

  const acceptFile = (file: File | undefined) => {
    if (!file) return;
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
    void processFile(file);
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const scrollToTool = () => {
    toolRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    flash(setHighlightTool, 1600);
  };

  return (
    <>
      <section
        ref={toolRef}
        id="tool"
        className="bg-slate-50 py-12 lg:py-16 border-b border-slate-200 scroll-mt-16"
        aria-labelledby="dlp-tool-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`bg-white rounded-2xl p-5 sm:p-8 lg:p-10 border shadow-md transition-all duration-500 ${
              highlightTool ? "border-lime-500 ring-4 ring-lime-200" : "border-slate-200"
            }`}
          >
            <div className="text-center mb-8 lg:mb-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-lime-100 text-lime-800 mb-3">
                <span aria-hidden="true">✂️</span> Free Preview · Pay Only If You Like It
              </span>
              <h2 id="dlp-tool-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
                Make Your Driving Licence Photo
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Pick your country, upload a photo, and we&apos;ll crop it to the right size automatically.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-10">
              {/* ── LEFT: licence + guide ── */}
              <div className="space-y-6">
                <div ref={comboRef} className="relative">
                  <label
                    id="dlp-doc-label"
                    htmlFor="dlp-doc"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                  >
                    <span className="text-lime-700 mr-1">1.</span> Country / licence type
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-lg leading-none" aria-hidden="true">
                      {comboOpen ? "🔍" : selectedDoc.flag}
                    </span>
                    <input
                      ref={comboInputRef}
                      id="dlp-doc"
                      type="text"
                      role="combobox"
                      autoComplete="off"
                      aria-autocomplete="list"
                      aria-expanded={comboOpen}
                      aria-controls="dlp-doc-list"
                      aria-activedescendant={
                        comboOpen && filteredDocs[activeIdx] ? `dlp-opt-${filteredDocs[activeIdx].id}` : undefined
                      }
                      aria-describedby="dlp-doc-hint"
                      value={comboOpen ? query : selectedDoc.label}
                      placeholder={comboOpen ? "Search: UK, India, IDP, Germany…" : undefined}
                      onFocus={() => {
                        setComboOpen(true);
                        setQuery("");
                        setActiveIdx(0);
                      }}
                      onClick={() => setComboOpen(true)}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        setActiveIdx(0);
                        setComboOpen(true);
                      }}
                      onKeyDown={onComboKeyDown}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl text-slate-900 py-3.5 pl-11 pr-24 font-semibold text-base sm:text-sm placeholder:font-normal placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:bg-white"
                    />
                    {!comboOpen && (
                      <span className="pointer-events-none absolute right-9 top-1/2 -translate-y-1/2 rounded-md bg-white border border-slate-200 px-1.5 py-0.5 text-[11px] font-bold text-slate-600">
                        {selectedDoc.size}
                      </span>
                    )}
                    <svg className={`pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 transition-transform ${comboOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>

                  {comboOpen && (
                    <ul
                      id="dlp-doc-list"
                      role="listbox"
                      aria-labelledby="dlp-doc-label"
                      className="absolute z-30 mt-1.5 w-full max-h-80 overflow-y-auto rounded-xl border border-slate-200 bg-white py-1.5 shadow-xl"
                    >
                      {filteredDocs.length === 0 ? (
                        <li className="px-4 py-3 text-sm text-slate-500">
                          No match. Choose &quot;Other country (35 × 45 mm standard)&quot;.
                        </li>
                      ) : (
                        filteredDocs.map((opt, i) => {
                          const isSelected = opt.id === selectedId;
                          return (
                            <li
                              key={opt.id}
                              id={`dlp-opt-${opt.id}`}
                              role="option"
                              aria-selected={isSelected}
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => selectDoc(opt.id)}
                              onMouseEnter={() => setActiveIdx(i)}
                              className={`mx-1.5 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                                i === activeIdx ? "bg-lime-50 text-lime-900" : "text-slate-700"
                              } ${isSelected ? "font-bold" : "font-medium"}`}
                            >
                              <span className="text-lg leading-none" aria-hidden="true">{opt.flag}</span>
                              <span className="flex-1">{opt.label}</span>
                              <span className="text-[11px] font-semibold text-slate-500 whitespace-nowrap">{opt.size}</span>
                              {isSelected && <span className="text-lime-700" aria-hidden="true">✓</span>}
                            </li>
                          );
                        })
                      )}
                    </ul>
                  )}

                  <p
                    id="dlp-doc-hint"
                    className="mt-2 flex gap-2 rounded-lg bg-lime-50 border border-lime-200 px-3 py-2 text-xs sm:text-sm text-lime-900 leading-snug"
                  >
                    <span aria-hidden="true">💡</span>
                    <span>{selectedDoc.hint}</span>
                  </p>
                </div>

                <div className={previewUrl ? "hidden lg:block" : "block"}>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Photo guide</p>
                  <div className="grid grid-cols-2 gap-3">
                    {uploadExamples.map((ex) => (
                      <figure
                        key={ex.label}
                        className={`rounded-xl overflow-hidden border-2 bg-white ${ex.ok ? "border-lime-500" : "border-rose-400"}`}
                      >
                        <div className="relative h-32 sm:h-40 lg:h-44 bg-slate-100">
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
                        <figcaption className={`px-3 py-2 text-xs sm:text-sm ${ex.ok ? "bg-lime-50 text-lime-900" : "bg-rose-50 text-rose-900"}`}>
                          <span className="block font-bold">{ex.label}</span>
                          <span className="block leading-snug">{ex.note}</span>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── RIGHT: upload ── */}
              <div className="space-y-5">
                <div
                  ref={uploadRef}
                  className={`rounded-2xl transition-all duration-500 scroll-mt-24 ${
                    highlightUpload ? "ring-4 ring-lime-300 ring-offset-4 ring-offset-white" : ""
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span id="dlp-upload-label" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      <span className="text-lime-700 mr-1">2.</span> Upload Photo
                    </span>
                    <span
                      className={`inline-flex max-w-full items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-colors ${
                        highlightUpload ? "bg-lime-600 text-white" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <span aria-hidden="true">{selectedDoc.flag}</span>
                      <span className="truncate">{selectedDoc.label} · {selectedDoc.size}</span>
                    </span>
                  </div>
                  <input
                    ref={fileInputRef}
                    id="dlp-upload"
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif"
                    onChange={(e) => acceptFile(e.target.files?.[0])}
                    className="sr-only"
                    aria-labelledby="dlp-upload-label"
                  />
                  {!previewUrl ? (
                    <label
                      ref={dropzoneRef}
                      htmlFor="dlp-upload"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          fileInputRef.current?.click();
                        }
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                      }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragOver(false);
                        acceptFile(e.dataTransfer.files?.[0]);
                      }}
                      className={`flex min-h-[220px] lg:min-h-[300px] flex-col items-center justify-center border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 ${
                        dragOver || highlightUpload
                          ? "border-lime-500 bg-lime-50/60"
                          : "border-slate-300 hover:border-lime-500 hover:bg-slate-50/80 bg-slate-50/40"
                      }`}
                    >
                      <div
                        className={`w-16 h-16 mx-auto rounded-full bg-lime-100 text-lime-700 flex items-center justify-center mb-4 ${
                          highlightUpload ? "animate-bounce" : ""
                        }`}
                        aria-hidden="true"
                      >
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                      </div>
                      <p className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                        <span className="sm:hidden">Tap to take or choose a photo</span>
                        <span className="hidden sm:inline">Click to upload or drag &amp; drop</span>
                      </p>
                      <p className="text-xs sm:text-sm text-slate-500">JPG, PNG, WEBP, or HEIC · up to {MAX_FILE_SIZE_MB} MB</p>
                      <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-lime-100 px-3 py-1 text-xs font-semibold text-lime-800">
                        <span aria-hidden="true">⚡</span> Processing starts automatically
                      </p>
                    </label>
                  ) : (
                    <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={previewUrl} alt="Your uploaded photo" className="w-full h-64 lg:h-[300px] object-contain" />
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

                {previewUrl && (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Check these, then try again</p>
                    <ul className="space-y-1.5">
                      {preflightChecks.map((c) => (
                        <li key={c} className="flex items-center gap-2 text-sm text-slate-700">
                          <span className="w-4 h-4 rounded-full bg-lime-600 text-white text-[10px] flex items-center justify-center shrink-0" aria-hidden="true">✓</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {errorMsg && (
                  <div role="alert" className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium">
                    {errorMsg}
                  </div>
                )}

                {selectedFile && (
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => processFile()}
                    className="w-full py-4 px-6 rounded-xl font-bold text-base bg-lime-700 hover:bg-lime-800 text-white shadow-lg shadow-lime-700/25 active:scale-[0.99] transition-all disabled:bg-slate-200 disabled:text-slate-500 disabled:shadow-none"
                  >
                    Try Again
                  </button>
                )}

                <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-500">
                  <span><span aria-hidden="true">👀</span> Free preview</span>
                  <span><span aria-hidden="true">🖨️</span> 4×6 print sheet included</span>
                  <span><span aria-hidden="true">🔒</span> Auto-deleted in 24 h</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STICKY MOBILE CTA ── */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] transition-transform duration-300 sm:hidden ${
          showStickyCta && !isProcessing ? "translate-y-0" : "translate-y-full"
        }`}
        aria-hidden={!showStickyCta}
      >
        <button
          type="button"
          onClick={scrollToTool}
          tabIndex={showStickyCta ? 0 : -1}
          className="w-full rounded-xl bg-lime-700 py-3 text-base font-bold text-white shadow-sm active:scale-[0.99]"
        >
          Make My Licence Photo · Free Preview
        </button>
      </div>

      {/* ── PROCESSING OVERLAY ── */}
      {isProcessing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dlp-processing-title"
        >
          <div className="bg-white rounded-3xl p-7 sm:p-9 max-w-md w-full text-center shadow-2xl border border-slate-100 flex flex-col items-center">
            <div className="relative w-20 h-20 mb-6 flex items-center justify-center" aria-hidden="true">
              <div className="absolute inset-0 rounded-full border-4 border-lime-200 animate-ping opacity-25" />
              <div className="absolute inset-0 rounded-full border-4 border-lime-500/20 border-t-lime-600 animate-spin" />
              <div className="w-12 h-12 rounded-full bg-lime-100 flex items-center justify-center text-2xl shadow-inner">
                {selectedDoc.flag}
              </div>
            </div>
            <h3 id="dlp-processing-title" className="text-xl font-black text-slate-900 mb-1">
              Formatting Your Licence Photo
            </h3>
            <p className="text-sm text-slate-500 mb-4">{selectedDoc.label} · {selectedDoc.size}</p>
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
    </>
  );
}
