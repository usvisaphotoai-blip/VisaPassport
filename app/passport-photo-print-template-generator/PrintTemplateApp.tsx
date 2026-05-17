"use client";

import React, { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";
import { useSearchParams } from "next/navigation";

const PAPER_SIZES = {
  "4x6": { name: "4×6 inch", width: 101.6, height: 152.4 }, // mm
  "5x7": { name: "5×7 inch", width: 127, height: 177.8 },
  "A4": { name: "A4", width: 210, height: 297 },
  "Letter": { name: "Letter", width: 215.9, height: 279.4 },
};

const PHOTO_SIZES = {
  "2x2": { name: "2×2 inch (US/India)", width: 51, height: 51 },
  "35x45": { name: "35×45 mm (Europe/UK/Aus)", width: 35, height: 45 },
};

export default function PrintTemplateApp() {
  const searchParams = useSearchParams();
  const imageUrl = searchParams.get("imageUrl") || searchParams.get("image") || searchParams.get("photoUrl") || searchParams.get("photo");
  const customWidth = searchParams.get("width");
  const customHeight = searchParams.get("height");
  const customName = searchParams.get("name");

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);
  
  const [paperSize, setPaperSize] = useState<keyof typeof PAPER_SIZES>("4x6");
  
  const [photoSizes, setPhotoSizes] = useState({
    "2x2": { name: "2×2 inch (US)", width: 51, height: 51 },
    "35x45": { name: "35×45 mm (Europe/UK/Aus)", width: 35, height: 45 },
  });
  const [photoSize, setPhotoSize] = useState<string>("2x2");
  
  const [layoutCount, setLayoutCount] = useState<number>(6);
  
  const [cropLines, setCropLines] = useState<boolean>(true);
  const [margin, setMargin] = useState<number>(10); // mm
  const [spacing, setSpacing] = useState<number>(2); // mm

  // Load initial image if passed in query params
  useEffect(() => {
    if (imageUrl) {
      const decodedUrl = decodeURIComponent(imageUrl);
      setImageSrc(decodedUrl);
      const img = new Image();
      img.crossOrigin = "anonymous"; // Avoid tainted canvas issues
      img.onload = () => setImageObj(img);
      img.src = decodedUrl;
    }
  }, [imageUrl]);

  // Load custom size if passed in query params
  useEffect(() => {
    if (customWidth && customHeight) {
      const w = parseFloat(customWidth);
      const h = parseFloat(customHeight);
      if (!isNaN(w) && !isNaN(h)) {
        // Check if it already matches one of the existing keys
        const is2x2 = Math.abs(w - 51) <= 1 && Math.abs(h - 51) <= 1;
        const is35x45 = Math.abs(w - 35) <= 1 && Math.abs(h - 45) <= 1;
        
        if (is2x2) {
          setPhotoSize("2x2");
        } else if (is35x45) {
          setPhotoSize("35x45");
        } else {
          // Dynamic custom size option matching the user's document type spec
          const label = customName ? decodeURIComponent(customName) : `${w}×${h} mm`;
          setPhotoSizes(prev => ({
            ...prev,
            "custom": { name: `${label} (${w}×${h} mm)`, width: w, height: h }
          }));
          setPhotoSize("custom");
        }
      }
    }
  }, [customWidth, customHeight, customName]);

  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle Image Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      setImageSrc(src);
      const img = new Image();
      img.onload = () => setImageObj(img);
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  // Drag and Drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const src = event.target?.result as string;
        setImageSrc(src);
        const img = new Image();
        img.onload = () => setImageObj(img);
        img.src = src;
      };
      reader.readAsDataURL(file);
    }
  };

  // Draw Canvas
  useEffect(() => {
    if (!imageObj || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPI = 300;
    const mmToPx = (mm: number) => (mm * DPI) / 25.4;

    const paper = PAPER_SIZES[paperSize];
    const photo = (photoSizes as any)[photoSize] || PHOTO_SIZES["2x2"];

    // Set canvas dimensions
    const cWidth = mmToPx(paper.width);
    const cHeight = mmToPx(paper.height);
    canvas.width = cWidth;
    canvas.height = cHeight;

    // Fill white background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, cWidth, cHeight);

    const marginPx = mmToPx(margin);
    const spacingPx = mmToPx(spacing);
    const photoWPx = mmToPx(photo.width);
    const photoHPx = mmToPx(photo.height);

    // Calculate Grid
    const availableW = cWidth - 2 * marginPx;
    const availableH = cHeight - 2 * marginPx;
    
    const cols = Math.floor((availableW + spacingPx) / (photoWPx + spacingPx));
    const rows = Math.floor((availableH + spacingPx) / (photoHPx + spacingPx));
    
    const maxPhotos = cols * rows;
    const actualCount = Math.min(layoutCount, maxPhotos);

    // Center grid
    const gridW = cols * photoWPx + (cols - 1) * spacingPx;
    const gridH = rows * photoHPx + (rows - 1) * spacingPx;
    const startX = marginPx + (availableW - gridW) / 2;
    const startY = marginPx + (availableH - gridH) / 2;

    let count = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (count >= actualCount) break;
        
        const x = startX + c * (photoWPx + spacingPx);
        const y = startY + r * (photoHPx + spacingPx);

        // Draw Image
        ctx.drawImage(imageObj, x, y, photoWPx, photoHPx);

        // Draw crop lines (thin black lines) around the image
        if (cropLines) {
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = mmToPx(0.2); // ~0.2mm thin line
          ctx.strokeRect(x, y, photoWPx, photoHPx);
        }

        count++;
      }
    }

  }, [imageObj, paperSize, photoSize, photoSizes, layoutCount, cropLines, margin, spacing]);


  // Download Handlers
  const handleDownloadJPG = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `passport-photo-sheet-${paperSize}.jpg`;
    link.href = canvasRef.current.toDataURL("image/jpeg", 1.0);
    link.click();
  };

  const handleDownloadPDF = () => {
    if (!canvasRef.current) return;
    const imgData = canvasRef.current.toDataURL("image/jpeg", 1.0);
    const paper = PAPER_SIZES[paperSize];
    // jsPDF uses mm by default
    const pdf = new jsPDF({
      orientation: paper.width > paper.height ? "landscape" : "portrait",
      unit: "mm",
      format: [paper.width, paper.height]
    });
    
    pdf.addImage(imgData, "JPEG", 0, 0, paper.width, paper.height);
    pdf.save(`passport-photo-sheet-${paperSize}.pdf`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {!imageSrc ? (
        <div 
          className="border-2 border-dashed border-slate-300 rounded-2xl p-6 sm:p-12 text-center bg-white hover:bg-slate-50 transition-colors cursor-pointer"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => document.getElementById("photo-upload")?.click()}
        >
          <div className="mx-auto w-16 h-16 bg-lime-100 text-lime-600 rounded-full flex items-center justify-center text-3xl mb-4">
            📷
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Upload your passport photo</h3>
          <p className="text-slate-500 mb-6">Drag and drop your image here, or click to browse.</p>
          <button className="bg-lime-600 hover:bg-lime-700 text-white px-6 py-3 rounded-lg font-semibold shadow-sm transition-colors">
            Select Photo
          </button>
          <input 
            type="file" 
            id="photo-upload" 
            accept="image/jpeg, image/png, image/webp" 
            className="hidden" 
            onChange={handleFileUpload} 
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 flex-col-reverse lg:flex-row">
          
          {/* Controls Sidebar */}
          <div className="lg:col-span-4 bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 order-2 lg:order-1">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-800">Layout Settings</h2>
              <button 
                onClick={() => {
                  setImageSrc(null);
                  setImageObj(null);
                }}
                className="text-sm text-slate-500 hover:text-slate-800 underline"
              >
                Change Photo
              </button>
            </div>

            <div className="space-y-6">
              {/* Paper Size */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Paper Size</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(PAPER_SIZES).map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => setPaperSize(key as any)}
                      className={`py-2 px-3 border rounded-lg text-sm font-medium transition-colors ${
                        paperSize === key ? "bg-lime-50 border-lime-600 text-lime-700" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {val.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo Size */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Target Photo Size</label>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(photoSizes).map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => setPhotoSize(key)}
                      className={`py-2 px-3 border rounded-lg text-sm font-medium transition-colors ${
                        photoSize === key ? "bg-lime-50 border-lime-600 text-lime-700" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {val.name}
                    </button>
                  ))}
                </div>
              </div>


              {/* Number of Photos */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Number of Copies</label>
                <select 
                  value={layoutCount} 
                  onChange={(e) => setLayoutCount(Number(e.target.value))}
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-slate-700 focus:ring-2 focus:ring-lime-500 focus:outline-none"
                >
                  {[2, 4, 6, 8, 10, 12, 16, 20].map(num => (
                    <option key={num} value={num}>{num} Photos</option>
                  ))}
                  <option value={99}>Fill Entire Page</option>
                </select>
              </div>

              {/* Options */}
              <div className="space-y-3 pt-2">
                <label className="flex items-center space-x-3">
                  <input 
                    type="checkbox" 
                    checked={cropLines} 
                    onChange={(e) => setCropLines(e.target.checked)}
                    className="h-5 w-5 rounded border-slate-300 text-lime-600 focus:ring-lime-500"
                  />
                  <span className="text-slate-700 font-medium">Add black crop lines</span>
                </label>
                
                <div>
                  <label className="block text-sm text-slate-600 mb-1 flex justify-between">
                    <span>Spacing between photos</span>
                    <span>{spacing} mm</span>
                  </label>
                  <input 
                    type="range" 
                    min="0" max="10" step="1"
                    value={spacing}
                    onChange={(e) => setSpacing(Number(e.target.value))}
                    className="w-full accent-lime-600"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-600 mb-1 flex justify-between">
                    <span>Page Margins</span>
                    <span>{margin} mm</span>
                  </label>
                  <input 
                    type="range" 
                    min="5" max="30" step="1"
                    value={margin}
                    onChange={(e) => setMargin(Number(e.target.value))}
                    className="w-full accent-lime-600"
                  />
                </div>
              </div>
            </div>
            
            {/* Download Buttons */}
            <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
              <button 
                onClick={handleDownloadJPG}
                className="w-full bg-lime-600 hover:bg-lime-700 text-white py-3 px-4 rounded-lg font-bold shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <span>Download as JPG</span>
              </button>
              <button 
                onClick={handleDownloadPDF}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 px-4 rounded-lg font-bold shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <span>Download as PDF</span>
              </button>
              <p className="text-xs text-center text-slate-500 mt-2">
                High resolution 300 DPI ready for printing
              </p>
            </div>
          </div>

          {/* Canvas Preview Area */}
          <div className="lg:col-span-8 bg-slate-200 rounded-2xl p-2 sm:p-8 flex items-center justify-center overflow-hidden min-h-[300px] lg:min-h-[500px] border border-slate-300 shadow-inner order-1 lg:order-2" ref={containerRef}>
            <div className="relative shadow-2xl bg-white max-w-full max-h-[80vh] overflow-hidden group">
               {/* Note: The canvas draws at 300DPI which is huge, we use CSS to scale it down for preview */}
              <canvas 
                ref={canvasRef} 
                className="w-auto h-auto max-w-full max-h-[75vh] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
