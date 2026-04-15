"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";

import type { ClientDetectionResult } from "../components/ClientFaceDetector";
import { compressImage } from "@/lib/compressImage";

// New specialized components
import Sidebar from "./components/Sidebar";
import UploadArea from "./components/UploadArea";
import ValidationReport from "./components/ValidationReport";
import ProcessingOverlay from "./components/ProcessingOverlay";
import GuidePrompt from "./components/GuidePrompt";
import { WarnIcon } from "./components/Icons";

// Constants and Types
import { documentTypes, bgColors } from "./constants";
import { Feedback } from "./types";

const ClientFaceDetector = dynamic(
  () => import("../components/ClientFaceDetector"),
  { 
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center justify-center p-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 min-h-[400px]">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-slate-600 font-sans tracking-tight">Initializing AI analysis...</p>
      </div>
    )
  }
);

function ToolForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type");
  const [selectedDoc, setSelectedDoc] = useState("general");
  const [isLocked, setIsLocked] = useState(false);
  const [selectedBg, setSelectedBg] = useState("white");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const originalFileRef = useRef<File | null>(null);  // Raw file before compression
  const [processedFile, setProcessedFile] = useState<File | null>(null);
  const [clientDetection, setClientDetection] = useState<ClientDetectionResult | null>(null);
  const [clientFeedbacks, setClientFeedbacks] = useState<Feedback[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [report, setReport] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isCropping, setIsCropping] = useState(false);
  const [cropMsg, setCropMsg] = useState("");
  const [guidelinesOpen, setGuidelinesOpen] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [modelPreloaded, setModelPreloaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem("selectedDoc");
    if (saved && documentTypes.some((d) => d.id === saved)) {
      setSelectedDoc(saved);
    }
  }, []);

  useEffect(() => {
    if (initialType && documentTypes.some((d) => d.id === initialType)) {
      setSelectedDoc(initialType);
      setIsLocked(true);
    }
  }, [initialType]);

  useEffect(() => {
    if (selectedDoc) {
      localStorage.setItem("selectedDoc", selectedDoc);
    }
  }, [selectedDoc]);

  useEffect(() => {
    // Check if user has already seen the guide
    const hasSeenGuide = localStorage.getItem("hasSeenGuide");
    if (hasSeenGuide) return;

    // Show guide modal after 6 seconds if no file is selected
    const timer = setTimeout(() => {
      if (!selectedFile && !report && !isCropping) {
        setShowGuide(true);
        localStorage.setItem("hasSeenGuide", "true");
      }
    }, 6000);
    return () => clearTimeout(timer);
  }, [selectedFile, report, isCropping]);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl("");
      return;
    }
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  // Preload detector
  useEffect(() => {
    const preload = () => import("../components/ClientFaceDetector");
    preload().catch(err => console.warn("[Preload] Detector deferred:", err));
  }, []);

  // Sync background color with country requirements
  useEffect(() => {
    const spec = documentTypes.find(d => d.id === selectedDoc);
    if (spec?.bg_color && bgColors.some(b => b.id === spec.bg_color)) {
      setSelectedBg(spec.bg_color as string);
    }
  }, [selectedDoc]);

  // Preload background removal model
  useEffect(() => {
    const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobileDevice && !modelPreloaded) {
      const timer = setTimeout(async () => {
        try {
          console.log("[Preload] Starting background removal model download...");
          const imgly = await import("@imgly/background-removal");
          await imgly.preload({ device: "gpu", model: "isnet_fp16" });
          setModelPreloaded(true);
          console.log("[Preload] Background removal model ready.");
        } catch (err) {
          console.warn("[Preload] Failed to preload model. Will retry on crop.", err);
        }
      }, 2000); 
      return () => clearTimeout(timer);
    }
  }, [modelPreloaded]);

  const activeDoc = documentTypes.find((d) => d.id === selectedDoc) || documentTypes[4];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setErrorMsg(""); setReport(null); setClientDetection(null);
    setClientFeedbacks([]); setProcessedFile(null);
    originalFileRef.current = file;
    const compressed = await compressImage(file);
    setSelectedFile(compressed);
  };

  const handleDetectionComplete = useCallback(
    async (detectedFile: File, detection: ClientDetectionResult, feedbacks: Feedback[]) => {
      setProcessedFile(detectedFile); setClientDetection(detection); setClientFeedbacks(feedbacks);
      setIsUploading(true); setErrorMsg("");

      const fileToValidate = selectedFile || detectedFile;
      const formData = new FormData();
      formData.append("image", fileToValidate);
      formData.append("type", selectedDoc);
      formData.append("clientData", JSON.stringify({
        faceCount: detection.faceCount, eyeLevelPct: detection.eyeLevelPct,
        headSizePct: detection.headSizePct, brightness: detection.brightness,
        orientationRatio: detection.orientationRatio, faceBox: detection.faceBox,
      }));
      try {
        const res = await fetch("/api/validate", { method: "POST", body: formData });
        const data = await res.json();
        if (!res.ok) throw new Error(data.details || data.error || "Validation failed");
        setReport(data);
      } catch (err: any) {
        setErrorMsg(err.message || "Server validation failed. Please try again.");
      } finally { setIsUploading(false); }
    },
    [selectedDoc, selectedFile]
  );

  const handleCrop = async () => {
    const fileToCrop = processedFile || selectedFile;
    if (!fileToCrop || !clientDetection?.faceBox || !clientDetection.eyeCenter) return;
    setIsCropping(true);
    setErrorMsg("");
    const cropStartTime = Date.now();
    const MIN_OVERLAY_MS = 5000; // User must see the overlay for at least 5 seconds

    try {
      let finalFile: File | Blob = fileToCrop;
      setCropMsg("Preparing image...");
      const compressedSource = fileToCrop;

      // Background Removal is always performed unless bypassed explicitly.
      if (selectedBg !== "original") {
        setCropMsg("Removing background...");
        const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        let removed: Blob | null = null;

        const callApiRemoveBg = async () => {
          const formData = new FormData();
          formData.append("image", compressedSource instanceof File ? compressedSource : new File([compressedSource], "photo.jpg", { type: "image/jpeg" }));
          const res = await fetch("/api/remove-bg", { method: "POST", body: formData });
          if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(`API error: ${res.status} ${data.error || ""}`);
          }
          return await res.blob();
        };

        if (isMobileDevice) {
          setCropMsg("Removing background (Cloud API)...");
          let mobileApiError: string | null = null;
          try {
            removed = await callApiRemoveBg();
          } catch (err: any) {
            mobileApiError = err.message;
            console.warn("[handleCrop] Mobile API removal failed (attempt 1):", err.message);
          }

          if (!removed && originalFileRef.current) {
            setCropMsg("Retrying with original photo...");
            try {
              const retryFormData = new FormData();
              retryFormData.append("image", originalFileRef.current);
              const retryRes = await fetch("/api/remove-bg", { method: "POST", body: retryFormData });
              if (!retryRes.ok) {
                const data = await retryRes.json().catch(() => ({}));
                throw new Error(`API error: ${retryRes.status} ${data.error || ""}`);
              }
              removed = await retryRes.blob();
              mobileApiError = null;
            } catch (retryErr: any) {
              console.warn("[handleCrop] Mobile API removal failed (attempt 2):", retryErr.message);
              mobileApiError = retryErr.message;
            }
          }

          if (!removed) {
            throw new Error(
              `Background removal API failed: ${mobileApiError || "Unknown error"}. Please try selecting 'Transparent' background or use a desktop browser.`
            );
          }
        } else {
          setCropMsg("Removing background (Local)...");
          const imgly = await import("@imgly/background-removal");
          const BG_TIMEOUT_MS = 15000;
          
          try {
            const result = await Promise.race([
              imgly.removeBackground(compressedSource, { device: "gpu", model: "isnet_fp16" }),
              new Promise<never>((_, reject) => setTimeout(() => reject(new Error("Timeout")), BG_TIMEOUT_MS))
            ]);
            if (result && result.size > 1000) {
              removed = result;
            }
          } catch (err: any) {
            console.warn(`[handleCrop] Local BG removal failed or timed out (${err.message}). Falling back to API...`);
            setCropMsg("Local model taking too long, using Cloud API...");
            try {
              removed = await callApiRemoveBg();
            } catch (apiErr: any) {
              console.warn("[handleCrop] API fallback failed:", apiErr.message);
            }
          }

          if (!removed) {
            throw new Error("Background removal failed. Please try again.");
          }
        }

        if (selectedBg === "transparent") {
          // Keep the removed background (transparent PNG blob)!
          finalFile = removed;
        } else {
          // Composite the subject onto the specified solid background color.
          const bgImg = new Image();
          const blobUrl = URL.createObjectURL(removed);
          bgImg.src = blobUrl;
          await bgImg.decode();
          URL.revokeObjectURL(blobUrl);

          const c = document.createElement("canvas");
          const cx = c.getContext("2d", { willReadFrequently: true })!;
          c.width = bgImg.width;
          c.height = bgImg.height;

          const colors: Record<string, string> = {
            white: "#ffffff",
            "light-gray": "#f3f4f6",
            "light-blue": "#eff6ff",
            blue: "#0047ab"
          };
          cx.fillStyle = colors[selectedBg] || "#ffffff";
          cx.fillRect(0, 0, c.width, c.height);
          cx.drawImage(bgImg, 0, 0);

          finalFile = await new Promise<Blob>(
            r => c.toBlob(b => r(b!), "image/jpeg", 0.98)
          );
        }
      } else {
        finalFile = compressedSource;
      }

      setCropMsg("Applying guidelines & cropping...");
      const formData = new FormData();
      const isTransparent = selectedBg === "transparent";
      const fileName = isTransparent ? "photo.png" : "photo.jpg";
      const mimeType = isTransparent ? "image/png" : "image/jpeg";
      formData.append("image", finalFile instanceof File ? finalFile : new File([finalFile], fileName, { type: mimeType }));
      formData.append("targetBackground", selectedBg);
      formData.append("type", selectedDoc);
      formData.append("faceData", JSON.stringify({
        faceBox: clientDetection.faceBox, eyeCenter: clientDetection.eyeCenter,
        chinY: clientDetection.chinY, topOfHeadY: clientDetection.topOfHeadY,
        imageDimensions: clientDetection.imageDimensions,
      }));

      const res = await fetch("/api/crop", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Crop failed");
      
      setCropMsg("Generating secure preview...");

      // Ensure user sees the processing overlay for at least 5 seconds total
      const elapsed = Date.now() - cropStartTime;
      const remaining = Math.max(0, MIN_OVERLAY_MS - elapsed);
      if (remaining > 0) {
        await new Promise(r => setTimeout(r, remaining));
      }

      setCropMsg("Redirecting to your photo...");
      await new Promise(r => setTimeout(r, 600));
      router.push(`/preview/${data.photoId}`);
    } catch (err: any) {
      const msg = err.message || "Crop failed.";
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const friendlyMsg = isMobile && (msg.includes("WebGPU") || msg.includes("GPU") || msg.includes("memory") || msg.includes("alloc"))
        ? "Background removal failed on this device. Try selecting 'Transparent' background or use a smaller photo."
        : msg;
      setErrorMsg(friendlyMsg);
      setIsCropping(false);
      setCropMsg("");
    } 
  };

  const handleReset = () => {
    setSelectedFile(null); setProcessedFile(null); setReport(null);
    setClientDetection(null); setClientFeedbacks([]); setErrorMsg(""); 
  };

  const canCrop = !!(processedFile || selectedFile) && !!clientDetection?.faceBox && !!clientDetection?.eyeCenter;

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto px-4 lg:px-0 pb-12 relative w-full">
      <div className="flex flex-col lg:flex-row lg:min-h-[calc(100vh-200px)] gap-6">
        
        {/* Floating Top Crop Button (Mobile) */}
        {canCrop && !isCropping && (
          <div className="sticky top-4 z-40 w-full flex justify-center lg:hidden -mb-4">
            <button
              onClick={handleCrop}
              className="flex items-center gap-2 bg-[#3b5bdb] text-white font-bold px-6 py-3 rounded-full shadow-lg shadow-[#3b5bdb]/30 border border-[#3b5bdb]/40 hover:bg-[#2f4ac7] active:scale-95 transition-all w-max"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Crop & Finalize
            </button>
          </div>
        )}

        {/* Sidebar Configuration */}
        <Sidebar 
          selectedDoc={selectedDoc}
          setSelectedDoc={setSelectedDoc}
          selectedBg={selectedBg}
          setSelectedBg={setSelectedBg}
          handleReset={handleReset}
          documentTypes={documentTypes}
          bgColors={bgColors}
          activeDoc={activeDoc}
          isLocked={isLocked}
        />

        {/* Main Workspace Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-gray-100 border border-white rounded-3xl p-4 lg:p-6 overflow-y-auto">
          
          {/* Selected Document Header */}
          <div className="mb-6 flex items-center justify-between bg-white/60 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-inner border border-slate-100 text-2xl">
                {activeDoc.flag}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Active Requirement</span>
                <h2 className="text-sm font-black text-slate-900 leading-none">{activeDoc.label}</h2>
              </div>
            </div>
            <div className="flex items-center gap-4 text-right">
              <div className="hidden sm:flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Dimensions</span>
                <span className="text-xs font-bold text-slate-600 leading-none">{activeDoc.size}</span>
              </div>
              <div className="w-px h-8 bg-slate-200 hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Background</span>
                <span className="text-xs font-bold text-lime-600 leading-none">{activeDoc.bg_color}</span>
              </div>
            </div>
          </div>
          
          {/* Initial State: Upload Area */}
          {!selectedFile && !report && (
            <UploadArea 
              onFileChange={handleFileChange}
              guidelinesOpen={guidelinesOpen}
              setGuidelinesOpen={setGuidelinesOpen}
              onShowGuide={() => setShowGuide(true)}
            />
          )}

          {/* AI Processing State: Face Detector */}
          {selectedFile && !report && (
            <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <ClientFaceDetector
                file={selectedFile}
                documentType={selectedDoc}
                targetBackground={selectedBg}
                onDetectionComplete={handleDetectionComplete}
                onCancel={() => setSelectedFile(null)}
              />
            </div>
          )}

          {/* Server Validation State */}
          {isUploading && (
            <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl animate-pulse mt-4">
              <div className="w-5 h-5 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin shrink-0" />
              <p className="text-sm text-blue-700 font-medium">Running final server quality checks...</p>
            </div>
          )}

          {/* Validation Results State */}
          {report && (
            <ValidationReport 
              report={report}
              activeDoc={activeDoc}
              selectedDoc={selectedDoc}
              canCrop={canCrop}
              isCropping={isCropping}
              cropMsg={cropMsg}
              handleCrop={handleCrop}
              handleReset={handleReset}
            />
          )}

          {/* error messaging */}
          {errorMsg && (
            <div className="mt-4 flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl">
              <WarnIcon className="w-5 h-5 text-red-500 shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-bold text-red-900">Validation Error</p>
                <p className="text-[11px] text-red-700 mt-0.5">{errorMsg}</p>
                <button onClick={handleReset} className="mt-2 text-[10px] font-black uppercase tracking-tighter text-red-600 hover:text-red-800 underline">Start Over</button>
              </div>
            </div>
          )}

          {/* Full-Screen Processing Overlay */}
          <ProcessingOverlay 
            isCropping={isCropping}
            setIsCropping={setIsCropping}
            cropMsg={cropMsg}
            setCropMsg={setCropMsg}
            selectedFile={selectedFile}
            previewUrl={previewUrl}
            activeDoc={activeDoc}
          />

          {/* Guide Prompt Modal */}
          <GuidePrompt 
            isOpen={showGuide} 
            onClose={() => setShowGuide(false)} 
            onUploadClick={() => {
              const input = document.getElementById("tool-photo-input");
              if (input) (input as HTMLInputElement).click();
              setShowGuide(false);
            }}
          />

        </div>
      </div>
    </div>
  );
}

export default function ToolPage() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans">

      <div className="py-8">
        <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-lime-500 border-t-transparent rounded-full animate-spin" /></div>}>
          <ToolForm />
        </Suspense>
      </div>
    </div>
  );
}