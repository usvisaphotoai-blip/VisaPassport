"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { documentTypes } from "@/app/passport-photo-online/constants";
import { processPhotoForDocument } from "@/lib/processPhoto";

const POPULAR_IDS = ["us-passport", "uk-passport", "india-passport", "canada-passport", "schengen-visa", "australia-passport", "us-visa"];
const FALLBACK_DOC = "us-passport";
const STAGES = ["Uploading your photo…", "Detecting face & head size…", "Fixing background & lighting…", "Almost done…"];

const normalize = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

interface Props {
  /** Document id to preselect (e.g. "uk-passport"); otherwise the visitor's last choice is used */
  defaultDoc?: string;
  title?: string;
  /** Analytics source passed to the processing pipeline */
  source?: string;
}

export default function GuidePhotoTool({ defaultDoc, title = "Make your passport photo now", source = "guide_embedded_tool" }: Props) {
  const router = useRouter();
  const [selectedDoc, setSelectedDoc] = useState(
    defaultDoc && documentTypes.some((d) => d.id === defaultDoc) ? defaultDoc : FALLBACK_DOC,
  );
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [stage, setStage] = useState(-1);
  const [errorMsg, setErrorMsg] = useState("");
  const [showStickyBar, setShowStickyBar] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isProcessing = stage >= 0;
  const activeDoc = documentTypes.find((d) => d.id === selectedDoc) || documentTypes[0];

  const groups = useMemo(() => {
    const q = normalize(query.trim());
    const match = (d: (typeof documentTypes)[number]) => !q || normalize(`${d.label} ${d.country ?? ""} ${d.size}`).includes(q);
    const popular = POPULAR_IDS.map((id) => documentTypes.find((d) => d.id === id)).filter((d): d is (typeof documentTypes)[number] => !!d);
    const rest = documentTypes.filter((d) => !POPULAR_IDS.includes(d.id)).sort((a, b) => a.label.localeCompare(b.label));
    return [
      { key: "popular", heading: "Popular", items: popular.filter(match) },
      { key: "all", heading: "All countries", items: rest.filter(match) },
    ].filter((g) => g.items.length > 0);
  }, [query]);

  // Share the choice with the main photo tool; a guide-specific default wins
  useEffect(() => {
    if (defaultDoc) return;
    try {
      const saved = localStorage.getItem("selectedDoc");
      // Read after hydration; reading during render would mismatch the server HTML
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved && documentTypes.some((d) => d.id === saved)) setSelectedDoc(saved);
    } catch { /* storage blocked */ }
  }, [defaultDoc]);

  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus();
    const onPointer = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Mobile sticky bar: only once the visitor has scrolled past the tool
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      setShowStickyBar(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isProcessing) return;
    const timer = setInterval(() => setStage((s) => Math.min(s + 1, STAGES.length - 1)), 2200);
    return () => clearInterval(timer);
  }, [isProcessing]);

  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }, [previewUrl]);

  const selectDoc = (id: string) => {
    setSelectedDoc(id);
    setOpen(false);
    setQuery("");
    try { localStorage.setItem("selectedDoc", id); } catch { /* storage blocked */ }
  };

  const processFile = async (file: File | undefined) => {
    if (!file || isProcessing) return;
    if (!file.type.startsWith("image/") && !/\.(heic|heif)$/i.test(file.name)) {
      setErrorMsg("Please choose an image file (JPG, PNG or HEIC).");
      return;
    }
    setErrorMsg("");
    setPreviewUrl(URL.createObjectURL(file));
    setStage(0);
    try {
      const photoId = await processPhotoForDocument(file, activeDoc.id, source);
      router.push(`/preview/${photoId}`);
    } catch (err) {
      setErrorMsg(err instanceof Error && err.message ? err.message : "Processing failed. Please try again.");
      setStage(-1);
      setPreviewUrl("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const scrollToTool = () => rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      <section
        ref={rootRef}
        id="photo-tool"
        aria-labelledby="photo-tool-title"
        className="scroll-mt-24 rounded-xl border-2 border-lime-600 bg-white shadow-sm overflow-visible"
      >
        <div className="flex items-center justify-between gap-2 rounded-t-[10px] bg-lime-700 px-4 py-2.5">
          <h2 id="photo-tool-title" className="text-sm sm:text-base lg:text-sm font-extrabold text-white leading-tight">{title}</h2>
          <span className="shrink-0 rounded bg-white/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">Free check</span>
        </div>

        <div className="p-3 sm:p-4 space-y-3">
          {/* Step 1: document */}
          <div ref={pickerRef} className="relative">
            <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">1 · Country &amp; document</p>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              disabled={isProcessing}
              aria-haspopup="listbox"
              aria-expanded={open}
              className={`w-full flex items-center gap-3 rounded-lg border-2 bg-white px-3 py-2 text-left transition-colors disabled:opacity-60 ${
                open ? "border-lime-600" : "border-slate-200 hover:border-lime-500"
              }`}
            >
              <span className="text-xl leading-none" aria-hidden="true">{activeDoc.flag}</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold text-slate-900">{activeDoc.label}</span>
                <span className="block truncate text-[11px] text-slate-500">{activeDoc.size}</span>
              </span>
              <svg className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {open && (
              <div className="absolute inset-x-0 top-full z-40 mt-1 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">
                <div className="border-b border-slate-100 p-2">
                  <input
                    ref={searchRef}
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search country…"
                    aria-label="Search country or document"
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-base sm:text-sm focus:border-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-600/20"
                  />
                </div>
                <div role="listbox" aria-label="Documents" className="max-h-64 overflow-y-auto overscroll-contain">
                  {groups.length === 0 && <p className="px-3 py-6 text-center text-sm text-slate-500">No match. Try another country.</p>}
                  {groups.map((group) => (
                    <div key={group.key}>
                      <p className="sticky top-0 bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">{group.heading}</p>
                      {group.items.map((doc) => (
                        <button
                          key={doc.id}
                          type="button"
                          role="option"
                          aria-selected={doc.id === selectedDoc}
                          onClick={() => selectDoc(doc.id)}
                          className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm hover:bg-lime-50 ${
                            doc.id === selectedDoc ? "bg-lime-50 font-bold text-lime-900" : "text-slate-700"
                          }`}
                        >
                          <span className="text-base leading-none" aria-hidden="true">{doc.flag}</span>
                          <span className="min-w-0 flex-1 truncate">{doc.label}</span>
                          <span className="hidden shrink-0 text-[11px] text-slate-400 sm:inline">{doc.size.split(" (")[0]}</span>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Step 2: upload */}
          <div>
            <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">2 · Upload a photo</p>
            {isProcessing ? (
              <div className="flex items-center gap-3 rounded-lg border-2 border-lime-200 bg-lime-50 p-3" role="status" aria-live="polite">
                {previewUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={previewUrl} alt="" className="h-16 w-14 shrink-0 rounded-md object-cover" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-900">{STAGES[stage]}</p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-lime-100">
                    <div className="h-full rounded-full bg-lime-600 transition-all duration-700" style={{ width: `${((stage + 1) / STAGES.length) * 90}%` }} />
                  </div>
                </div>
              </div>
            ) : (
              <label
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  processFile(e.dataTransfer.files?.[0]);
                }}
                className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-3 py-5 text-center transition-colors ${
                  dragOver ? "border-lime-600 bg-lime-50" : "border-slate-300 bg-slate-50 hover:border-lime-500 hover:bg-lime-50/50"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.heic,.heif"
                  className="sr-only"
                  onChange={(e) => processFile(e.target.files?.[0])}
                />
                <span className="inline-flex items-center gap-2 rounded-lg bg-amber-700 px-5 py-2.5 text-sm font-bold text-white shadow-sm">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0-12l-4 4m4-4l4 4" />
                  </svg>
                  Upload photo
                </span>
                <span className="text-xs text-slate-500">
                  <span className="hidden sm:inline">or drag &amp; drop · </span>JPG, PNG or HEIC
                </span>
              </label>
            )}
          </div>

          {errorMsg && (
            <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">{errorMsg}</p>
          )}

          <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[11px] font-semibold text-slate-500">
            <li>✓ Size &amp; background fixed</li>
            <li>✓ Checked against official rules</li>
            <li>🔒 Secure upload</li>
          </ul>
        </div>
      </section>

      {/* Mobile sticky CTA */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur transition-transform duration-300 lg:hidden ${
          showStickyBar && !isProcessing ? "translate-y-0" : "translate-y-full"
        }`}
        aria-hidden={!showStickyBar}
      >
        <button
          type="button"
          onClick={scrollToTool}
          tabIndex={showStickyBar ? 0 : -1}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-lime-700 py-3 text-sm font-bold text-white"
        >
          <span aria-hidden="true">{activeDoc.flag}</span>
          <span className="truncate">Upload photo · {activeDoc.label}</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </>
  );
}
