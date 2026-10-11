"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect, useRef } from "react";
import { compressImage } from "@/lib/compressImage";
import UploadArea from "@/app/passport-photo-online/components/UploadArea";
import { WarnIcon } from "@/app/passport-photo-online/components/Icons";
import { documentTypes } from "@/app/passport-photo-online/constants";
import { countryMapping } from "@/lib/external-api";
import { getCentralCountry } from "@/lib/countries-registry";
import { de } from "../translations";
import { germanSubDocLabels, germanDocLabel, germanBackgroundLabel, germanSizeLabel } from "../docLabels";

function ProcessingTextDe() {
  const [index, setIndex] = useState(0);
  const messages = de.status.processingSteps;
  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % messages.length), 2000);
    return () => clearInterval(timer);
  }, [messages.length]);
  return <span>{messages[index]}</span>;
}

const germanySubDocs = Object.entries(germanSubDocLabels).map(([id, label]) => ({ id, label }));

const baseGermany = documentTypes.find((d) => d.id === "germany-passport") || {
  size: "35×45 mm",
  bg_color: "hellgrau",
  country: "Deutschland",
  flag: "🇩🇪",
  price: 6.99,
  printSize: "A4" as const,
};

const localizedDocumentTypes = documentTypes.flatMap((doc) => {
  if (doc.id === "germany-passport") {
    return germanySubDocs.map((sub) => ({
      ...baseGermany,
      id: sub.id,
      label: sub.label,
    }));
  }
  return { ...doc, label: germanDocLabel(doc) };
});

function ToolFormDe() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type");
  const [selectedDoc, setSelectedDoc] = useState("germany-passport");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [cropMsg, setCropMsg] = useState("");
  const [guidelinesOpen, setGuidelinesOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [headerSelectorOpen, setHeaderSelectorOpen] = useState(false);
  const [headerSearchTerm, setHeaderSearchTerm] = useState("");
  const headerSelectorRef = useRef<HTMLDivElement>(null);
  const headerSearchRef = useRef<HTMLInputElement>(null);

  const term = headerSearchTerm.trim().toLowerCase();
  const headerFilteredDocs = localizedDocumentTypes.filter((doc) => {
    if (!term) return true;
    const central = getCentralCountry(doc.id) || (doc.country ? getCentralCountry(doc.country) : undefined);
    return (
      doc.label.toLowerCase().includes(term) ||
      (doc.country && doc.country.toLowerCase().includes(term)) ||
      (central && central.country_name.toLowerCase().includes(term)) ||
      (central && central.translations.de.toLowerCase().includes(term)) ||
      (central && central.country_code.toLowerCase().includes(term))
    );
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerSelectorRef.current && !headerSelectorRef.current.contains(e.target as Node)) { setHeaderSelectorOpen(false); setHeaderSearchTerm(""); }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setHeaderSelectorOpen(false); setHeaderSearchTerm(""); }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => { if (headerSelectorOpen && headerSearchRef.current) headerSearchRef.current.focus(); }, [headerSelectorOpen]);
  useEffect(() => { const saved = localStorage.getItem("selectedDocDe"); if (saved && localizedDocumentTypes.some((d) => d.id === saved)) setSelectedDoc(saved); }, []);
  useEffect(() => { if (initialType && localizedDocumentTypes.some((d) => d.id === initialType)) setSelectedDoc(initialType); }, [initialType]);
  useEffect(() => { if (selectedDoc) { try { localStorage.setItem("selectedDocDe", selectedDoc); } catch { /* storage full or blocked */ } } }, [selectedDoc]);

  useEffect(() => {
    if (!selectedFile) { setPreviewUrl(""); return; }
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  const activeDoc = localizedDocumentTypes.find((d) => d.id === selectedDoc) || localizedDocumentTypes.find((d) => d.id === "germany-passport") || localizedDocumentTypes[0];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setErrorMsg("");
    const compressed = await compressImage(file);
    setSelectedFile(compressed);
    await handleExternalProcess(compressed);
  };

  const handleExternalProcess = async (file: File) => {
    setIsUploading(true);
    setErrorMsg("");
    setCropMsg(de.status.processing);
    const countrySlug = activeDoc.id.replace(/-passport$/, "").replace(/-visa$/, "").toLowerCase();
    let countryCode = countryMapping[countrySlug] || "DE";
    if (activeDoc.id.includes("ds-160")) countryCode = "US";
    if (activeDoc.id.includes("schengen")) countryCode = "EU";
    if (activeDoc.id.startsWith("germany-")) countryCode = "DE";
    const documentType = activeDoc.id.includes("visa") ? "visa" : "passport";
    const formData = new FormData();
    formData.append("image", file);
    formData.append("country_code", countryCode);
    formData.append("document_type", documentType);
    formData.append("full_doc_id", activeDoc.id);
    formData.append("source", "pixpassport_tool");

    try {
      const res = await fetch("/api/external-process", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.details || data.error || de.errors.genericError);
      setCropMsg(de.status.redirecting);
      await new Promise((r) => setTimeout(r, 800));
      // Redirect to German preview page
      router.push(`/de/preview/${data.photoId}`);
    } catch (err: unknown) {
      // Server errors are technical and in English; show a German message instead
      console.error(err);
      setErrorMsg(de.errors.genericError);
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => { setSelectedFile(null); setErrorMsg(""); };

  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto px-3 lg:px-0 pb-6 relative w-full">
      <div className="flex flex-col lg:min-h-[calc(100vh-200px)] gap-4">
        <div className="flex-1 flex flex-col min-w-0 bg-white border-2 border-slate-200 rounded-xl p-3 lg:p-5 overflow-y-auto">
          {/* Document header selector */}
          <div className="mb-3 relative" ref={headerSelectorRef}>
            <button
              type="button"
              onClick={() => setHeaderSelectorOpen((v) => !v)}
              aria-expanded={headerSelectorOpen}
              aria-controls="doc-selector-de"
              aria-label={`${de.tool.selectDocument}: ${activeDoc.label}`}
              className={`w-full flex items-center justify-between bg-white px-3 py-2.5 rounded-lg border-2 cursor-pointer transition-colors duration-200 ${headerSelectorOpen ? "border-lime-600" : "border-slate-200 hover:border-slate-300"}`}
            >
              <div className="flex items-center gap-3">
                <div aria-hidden="true" className="w-9 h-9 flex items-center justify-center bg-slate-50 rounded-lg border border-slate-200 text-lg">{activeDoc.flag}</div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">{de.tool.activeRequirement}</span>
                  <span className="text-sm font-black text-slate-900 leading-tight">{activeDoc.label}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4 text-right">
                  <div className="hidden sm:flex flex-col">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">{de.tool.dimensions}</span>
                    <span className="text-xs font-bold text-slate-700 leading-none">{germanSizeLabel(activeDoc.size)}</span>
                  </div>
                  <div className="w-px h-8 bg-slate-200 hidden sm:block" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">{de.tool.background}</span>
                    <span className="text-xs font-bold text-lime-700 leading-none">{germanBackgroundLabel(activeDoc.bg_color)}</span>
                  </div>
                </div>
                <svg aria-hidden="true" className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${headerSelectorOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {headerSelectorOpen && (
              <>
                <div aria-hidden="true" className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] lg:hidden" onClick={() => setHeaderSelectorOpen(false)} />
                <div id="doc-selector-de" className="fixed inset-x-4 top-20 bottom-4 lg:absolute lg:inset-x-0 lg:top-full lg:bottom-auto z-[70] lg:z-50 lg:mt-1 bg-white border-2 border-slate-200 rounded-xl overflow-hidden flex flex-col">
                  <div className="p-3 lg:p-2 border-b-2 border-slate-100 bg-slate-50">
                    <div className="relative">
                      <svg aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                      <input ref={headerSearchRef} type="search" aria-label={de.tool.searchLabel} placeholder={de.tool.searchPlaceholder} value={headerSearchTerm} onChange={(e) => setHeaderSearchTerm(e.target.value)} className="w-full pl-10 pr-10 py-3 lg:py-2 text-base lg:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500/30 focus:border-lime-500 transition-all placeholder:text-slate-400" />
                      {headerSearchTerm && (
                        <button type="button" aria-label={de.buttons.clearSearch} onClick={() => setHeaderSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1">
                          <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      )}
                    </div>
                  </div>
                  <div role="listbox" aria-label={de.tool.selectDocument} className="flex-1 overflow-y-auto custom-scrollbar lg:max-h-64">
                    {headerFilteredDocs.length > 0 ? (
                      headerFilteredDocs.map((doc) => (
                        <button key={doc.id} type="button" role="option" aria-selected={selectedDoc === doc.id} onClick={() => { setSelectedDoc(doc.id); handleReset(); setHeaderSelectorOpen(false); setHeaderSearchTerm(""); }}
                          className={`relative group w-full flex flex-col px-4 py-4 lg:px-3 lg:py-2.5 text-left transition-all duration-150 border-b border-slate-50 last:border-b-0 ${selectedDoc === doc.id ? "bg-lime-50" : "bg-transparent hover:bg-slate-50"}`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {doc.flag && <span aria-hidden="true" className="text-xl lg:text-sm leading-none">{doc.flag}</span>}
                              <p className={`text-sm font-bold leading-tight ${selectedDoc === doc.id ? "text-lime-900" : "text-slate-700"}`}>{doc.label}</p>
                            </div>
                            {selectedDoc === doc.id && (<svg aria-hidden="true" className="w-4 h-4 text-lime-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>)}
                          </div>
                          <p className="text-xs text-slate-500 mt-1 font-medium ml-8 lg:ml-6">{germanSizeLabel(doc.size)} · {germanBackgroundLabel(doc.bg_color)}</p>
                        </button>
                      ))
                    ) : (
                      <div className="py-12 px-6 text-center">
                        <p className="text-sm text-slate-500 font-medium">{de.errors.noDocuments}</p>
                        <button type="button" onClick={() => setHeaderSearchTerm("")} className="text-xs text-lime-700 font-bold uppercase tracking-wider mt-3 hover:text-lime-800">{de.buttons.clearSearch}</button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Disclaimer banner */}
          <div className="mt-4 mb-4 rounded-xl border-2 border-slate-200 bg-slate-50 p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3 min-w-0">
                <div className="min-w-0">
                  <p className="mt-1 text-xs sm:text-sm leading-relaxed text-slate-800 max-w-full sm:max-w-2xl">{de.tool.noAiDisclaimer}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center justify-center rounded-md bg-lime-100 px-3 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-lime-800 text-center">{de.tool.noAiBadge}</span>
                    <span className="inline-flex items-center justify-center rounded-md bg-amber-100 px-3 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-amber-800 text-center">{de.tool.expertReview}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upload area */}
          {!selectedFile && (
            <UploadArea onFileChange={handleFileChange} guidelinesOpen={guidelinesOpen} setGuidelinesOpen={setGuidelinesOpen} locale="de" variant="flat" />
          )}

          {/* Processing state */}
          {isUploading && (
            <div className="mt-4 bg-slate-900 rounded-xl overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center p-6 gap-6">
                <div className="relative shrink-0 w-32 h-40 bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {previewUrl ? (<img src={previewUrl} alt="Ihr hochgeladenes Foto wird verarbeitet" className="w-full h-full object-cover opacity-60" />) : (
                    <div className="w-full h-full flex items-center justify-center opacity-20"><svg aria-hidden="true" width="40" height="50" viewBox="0 0 80 100" fill="none"><circle cx="40" cy="28" r="18" fill="#65a30d" /><path d="M10 90 Q10 62 40 62 Q70 62 70 90" fill="#65a30d" /></svg></div>
                  )}
                  <div className="absolute left-0 w-full h-0.5 bg-lime-400 z-10" style={{ animation: "scanPingPong 2s ease-in-out infinite" }} />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-lime-400/10 border border-lime-400/30 rounded-md mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-lime-300 uppercase tracking-widest">{de.tool.biometricEngine}</span>
                  </div>
                  <h3 className="text-lg font-black text-white mb-2" role="status" aria-live="polite">
                    <span className="inline-block" style={{ minWidth: "200px" }}>
                      {cropMsg === de.status.processing ? <ProcessingTextDe /> : cropMsg}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto sm:mx-0">{de.tool.calibrating}</p>
                  <div className="mt-4 w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-lime-500 rounded-full animate-shimmer" style={{ width: "60%" }} />
                  </div>
                </div>
              </div>
              <style>{`@keyframes scanPingPong { 0%, 100% { top: 0%; opacity: 0; } 10%, 90% { opacity: 1; } 50% { top: 100%; } } @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } } .animate-shimmer { animation: shimmer 2s infinite linear; background: #84cc16; }`}</style>
            </div>
          )}

          {/* Error */}
          {errorMsg && (
            <div role="alert" className="mt-4 flex items-start gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
              <WarnIcon className="w-5 h-5 text-red-600 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-bold text-red-900">{de.errors.validationError}</p>
                <p className="text-sm text-red-800 mt-0.5">{errorMsg}</p>
                <p className="text-sm text-red-800 mt-0.5">{de.errors.retry}</p>
                <button type="button" onClick={handleReset} className="mt-3 inline-flex rounded-lg bg-white border-2 border-red-200 px-3 py-1.5 text-sm font-bold text-red-700 hover:bg-red-100">{de.buttons.startOver}</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default function DeToolPage() {
  return (
    <div className="bg-slate-50 min-h-screen pt-4">
      {/* Outside <Suspense> so the headings are in the server-rendered HTML */}
      <div className="max-w-xl mx-auto px-4 pt-2 sm:pt-2 text-center">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Foto hochladen und Passbild erstellen
        </h1>
        <p className="mt-1.5 text-sm text-slate-600 font-normal">
          Dokument wählen, Foto hochladen – Ergebnis in 30 Sekunden kostenlos ansehen.
        </p>
      </div>
      <div className="py-4">
        <Suspense fallback={<div className="flex items-center justify-center h-64" role="status" aria-label="Wird geladen"><div className="w-8 h-8 border-4 border-lime-500 border-t-transparent rounded-full animate-spin" /></div>}>
          <ToolFormDe />
        </Suspense>
      </div>
    </div>
  );
}
