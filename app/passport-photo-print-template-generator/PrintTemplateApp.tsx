"use client";

import React, { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";
import { useSearchParams } from "next/navigation";
import { getClientTimezoneCurrency, LocalPrice } from "@/lib/currency";

const PAPER_SIZES = {
  "4x6": { name: "4×6 inch", width: 101.6, height: 152.4 }, // mm
  "5x7": { name: "5×7 inch", width: 127, height: 177.8 },
  A4: { name: "A4", width: 210, height: 297 },
  Letter: { name: "Letter", width: 215.9, height: 279.4 },
};

const PHOTO_SIZES = {
  "2x2": { name: "2×2 inch (US)", width: 51, height: 51 },
  "35x45": { name: "35×45 mm (Europe/UK/Aus/India)", width: 35, height: 45 },
};

const REVIEW_COUNTRIES = [
  { label: "United States (Passport / Visa / Green Card - 2×2 in)", value: "United States (2x2 in)" },
  { label: "United Kingdom (Passport / Visa - 35×45 mm)", value: "United Kingdom (35x45 mm)" },
  { label: "Schengen Area / Europe (Visa / ID - 35×45 mm)", value: "Schengen Area (35x45 mm)" },
  { label: "Canada (Passport - 50×70 mm / Visa)", value: "Canada (50x70 mm)" },
  { label: "Australia (Passport / Visa - 35×45 mm)", value: "Australia (35x45 mm)" },
  { label: "India (Passport / OCI / Visa - 35×45 mm or 2×2 in)", value: "India (35x45 mm / 2x2 in)" },
  { label: "Singapore (Passport / PR / IC - 35×45 mm)", value: "Singapore (35x45 mm)" },
  { label: "China (Passport / Visa - 33×48 mm)", value: "China (33x48 mm)" },
  { label: "Germany (Passbild - 35×45 mm)", value: "Germany (35x45 mm)" },
  { label: "France (Passeport / CNI - 35×45 mm)", value: "France (35x45 mm)" },
  { label: "Japan (Passport - 35×45 mm / Visa)", value: "Japan (35x45 mm)" },
  { label: "New Zealand (Passport / Visa - 35×45 mm)", value: "New Zealand (35x45 mm)" },
  { label: "Other Country / ICAO Standard", value: "Other Country (ICAO Standard)" },
];

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

  const [paperSize, setPaperSize] = useState<keyof typeof PAPER_SIZES>("5x7");

  const [photoSizes, setPhotoSizes] = useState({
    "2x2": { name: "2×2 inch (US)", width: 51, height: 51 },
    "35x45": { name: "35×45 mm (Europe/UK/Aus)", width: 35, height: 45 },
  });
  const [photoSize, setPhotoSize] = useState<string>("2x2");

  const [layoutCount, setLayoutCount] = useState<number>(6);

  const [cropLines, setCropLines] = useState<boolean>(true);
  const [margin, setMargin] = useState<number>(5); // mm
  const [spacing, setSpacing] = useState<number>(0); // mm

  // Load initial image if passed in query params
  useEffect(() => {
    if (imageUrl) {
      const decodedUrl = decodeURIComponent(imageUrl);
      setImageSrc(decodedUrl);
      setImageLoadError(null);
      const img = new Image();
      img.onload = () => {
        setImageObj(img);
        setImageLoadError(null);
      };
      img.onerror = () => {
        setImageObj(null);
        setImageSrc(null);
        setImageLoadError(
          "Failed to load your photo. Please try again or upload a new photo.",
        );
      };
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
          const label = customName
            ? decodeURIComponent(customName)
            : `${w}×${h} mm`;
          setPhotoSizes((prev) => ({
            ...prev,
            custom: { name: `${label} (${w}×${h} mm)`, width: w, height: h },
          }));
          setPhotoSize("custom");
        }
      }
    }
  }, [customWidth, customHeight, customName]);

  // Expert Photo Review State
  const [isExpertOptedIn, setIsExpertOptedIn] = useState(false); // Unchecked by default
  const [expertPrice, setExpertPrice] = useState<LocalPrice | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewEmail, setReviewEmail] = useState("");
  const [reviewCountry, setReviewCountry] = useState("United States (2x2 in)");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewMessage, setReviewMessage] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);

  // Analytics Tracker Helper
  const trackAnalyticsEvent = (eventType: string, extraData: Record<string, any> = {}) => {
    try {
      const sid = typeof window !== "undefined" ? sessionStorage.getItem("usvisa_analytics_session") : null;
      if (sid) {
        fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: sid,
            type: eventType,
            ...extraData,
          }),
        }).catch(() => {});
      }
      if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
        (window as any).gtag("event", eventType, extraData);
      }
    } catch (e) {
      console.warn("[Analytics] Tracking warning:", e);
    }
  };

  const handleCheckboxToggle = (checked: boolean) => {
    setIsExpertOptedIn(checked);
    trackAnalyticsEvent(checked ? "expert_review_checkbox_select" : "expert_review_checkbox_deselect", {
      currency: expertPrice?.currency || "USD",
      price: expertPrice?.amount || 8.0,
      placement: "above_download_buttons",
    });
  };

  const handleOpenReviewModal = () => {
    setIsReviewModalOpen(true);
    setReviewError(null);
    trackAnalyticsEvent("expert_review_modal_open", {
      currency: expertPrice?.currency || "USD",
      price: expertPrice?.amount || 8.0,
      optedInViaCheckbox: isExpertOptedIn,
    });
  };

  // Sync country selection with photo size / custom doc
  useEffect(() => {
    if (customName) {
      const decoded = decodeURIComponent(customName);
      const match = REVIEW_COUNTRIES.find((c) =>
        decoded.toLowerCase().includes(c.value.toLowerCase().split(" ")[0])
      );
      if (match) {
        setReviewCountry(match.value);
      } else {
        setReviewCountry(decoded);
      }
    } else if (photoSize === "35x45") {
      setReviewCountry("United Kingdom (35x45 mm)");
    } else {
      setReviewCountry("United States (2x2 in)");
    }
  }, [customName, photoSize]);

  // Load country-wise pricing with $8.00 base USD
  useEffect(() => {
    const tzCurrency = getClientTimezoneCurrency();
    const initialPrices: Record<string, { amount: number; formatted: string; symbol: string }> = {
      USD: { amount: 8.0, formatted: "$8.00", symbol: "$" },
      INR: { amount: 599, formatted: "₹599", symbol: "₹" },
      EUR: { amount: 6.99, formatted: "€6.99", symbol: "€" },
      GBP: { amount: 6.99, formatted: "£6.99", symbol: "£" },
      CAD: { amount: 8.99, formatted: "C$8.99", symbol: "C$" },
      AUD: { amount: 9.99, formatted: "A$9.99", symbol: "A$" },
      SGD: { amount: 6.99, formatted: "S$6.99", symbol: "S$" },
      JPY: { amount: 1100, formatted: "¥1100", symbol: "¥" },
      AED: { amount: 25, formatted: "AED 25", symbol: "AED" },
      SAR: { amount: 22, formatted: "SAR 22", symbol: "SAR" },
      BRL: { amount: 24, formatted: "R$24", symbol: "R$" },
      MXN: { amount: 89, formatted: "$89", symbol: "$" },
      PHP: { amount: 149, formatted: "₱149", symbol: "₱" },
      PKR: { amount: 799, formatted: "Rs 799", symbol: "Rs" },
      NZD: { amount: 9.99, formatted: "NZ$9.99", symbol: "NZ$" },
      CHF: { amount: 15.99, formatted: "CHF 15.99", symbol: "CHF" },
    };
    const fallback = initialPrices[tzCurrency] || initialPrices["USD"];
    setExpertPrice({
      currency: tzCurrency,
      amount: fallback.amount,
      formatted: fallback.formatted,
      symbol: fallback.symbol,
    });

    fetch(`/api/currency?currency=${tzCurrency}&basePrice=8`)
      .then((r) => r.json())
      .then((d) => {
        if (d?.formatted) setExpertPrice(d);
      })
      .catch((err) => console.warn("[Currency] Fetch error:", err));
  }, []);

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
    const printDate = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    ctx.fillStyle = "#0e7b07ff";
    ctx.font = `${mmToPx(2.8)}px Arial`;
    ctx.textBaseline = "bottom";

    // Website (left)
    ctx.textAlign = "left";
    ctx.fillText("pixpassport.com", marginPx, cHeight - mmToPx(2));

    // Date (right)
    ctx.textAlign = "right";
    ctx.fillText(
      `Printed: ${printDate}`,
      cWidth - marginPx,
      cHeight - mmToPx(2),
    );
  }, [
    imageObj,
    paperSize,
    photoSize,
    photoSizes,
    layoutCount,
    cropLines,
    margin,
    spacing,
  ]);

  // Download timer & processing state
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<"jpg" | "pdf" | null>(null);
  const [downloadSecondsLeft, setDownloadSecondsLeft] = useState(6);
  const [downloadProgress, setDownloadProgress] = useState(0);

  // Execute actual file download
  const executeDownload = (format: "jpg" | "pdf") => {
    if (!canvasRef.current) return;

    if (format === "jpg") {
      const link = document.createElement("a");
      link.download = `pixpassport.com_dimensions_${paperSize}.jpg`;
      link.href = canvasRef.current.toDataURL("image/jpeg", 1.0);
      link.click();
    } else if (format === "pdf") {
      const imgData = canvasRef.current.toDataURL("image/jpeg", 1.0);
      const paper = PAPER_SIZES[paperSize];
      const pdf = new jsPDF({
        orientation: paper.width > paper.height ? "landscape" : "portrait",
        unit: "mm",
        format: [paper.width, paper.height],
      });

      pdf.addImage(imgData, "JPEG", 0, 0, paper.width, paper.height);
      pdf.save(`pixpassport.com_dimensions_${paperSize}.pdf`);
    }
  };

  // Upload final image to Cloudinary
  const uploadFinalImageToCloudinary = async (format: "jpg" | "pdf") => {
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

  // Start 6-second processing timer before download & upload to Cloudinary
  const startDownloadWithTimer = (format: "jpg" | "pdf") => {
    if (isDownloading || !canvasRef.current) return;
    setDownloadFormat(format);
    setDownloadSecondsLeft(6);
    setDownloadProgress(0);
    setIsDownloading(true);

    // Trigger Cloudinary upload in parallel during the 6s countdown
    uploadFinalImageToCloudinary(format);
  };

  // 6-second timer effect
  useEffect(() => {
    if (!isDownloading || !downloadFormat) return;

    const DURATION_MS = 6000;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progressPercent = Math.min(100, (elapsed / DURATION_MS) * 100);
      const remainingSeconds = Math.max(0, Math.ceil((DURATION_MS - elapsed) / 1000));

      setDownloadProgress(progressPercent);
      setDownloadSecondsLeft(remainingSeconds);

      if (elapsed >= DURATION_MS) {
        clearInterval(interval);
        executeDownload(downloadFormat);

        // Brief delay before closing modal so user sees 100% completion
        setTimeout(() => {
          setIsDownloading(false);
          setDownloadFormat(null);
          setDownloadProgress(0);
          setDownloadSecondsLeft(6);
        }, 500);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isDownloading, downloadFormat, paperSize]);

  const getProcessingMessage = () => {
    if (downloadSecondsLeft >= 5) return "Preparing 300 DPI high-resolution canvas...";
    if (downloadSecondsLeft >= 3) return "Optimizing print grid & syncing to cloud...";
    if (downloadSecondsLeft >= 1) return "Calibrating print quality & layout dimensions...";
    return "Generating final file & starting download...";
  };

  // Error Dialog Component
  const ErrorDialog = ({
    message,
    onRetry,
    onBack,
  }: {
    message: string;
    onRetry: () => void;
    onBack: () => void;
  }) => (
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

  // Retry handler - reload the image
  const handleRetry = () => {
    if (imageUrl) {
      const decodedUrl = decodeURIComponent(imageUrl);
      setImageLoadError(null);
      setImageSrc(decodedUrl);
      const img = new Image();
      img.onload = () => {
        setImageObj(img);
        setImageLoadError(null);
      };
      img.onerror = () => {
        setImageObj(null);
        setImageSrc(null);
        setImageLoadError(
          "Failed to load your photo. Please try again or upload a new photo.",
        );
      };
      img.src = decodedUrl;
    }
  };

  // Back handler - go to previous page
  const handleBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && (window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleStartExpertReview = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmedEmail = (reviewEmail || "").trim();
    if (!trimmedEmail || !trimmedEmail.includes("@") || !trimmedEmail.includes(".")) {
      setReviewError("Please enter a valid email address.");
      return;
    }

    setReviewLoading(true);
    setReviewError(null);
    setReviewMessage("Preparing your photo for expert analysis...");

    try {
      // 1. Convert current photo to a File/Blob
      let photoBlob: Blob | null = null;
      if (imageSrc && imageSrc.startsWith("data:")) {
        const res = await fetch(imageSrc);
        photoBlob = await res.blob();
      } else if (imageSrc) {
        try {
          const res = await fetch(imageSrc);
          photoBlob = await res.blob();
        } catch {
          // fallback to canvas
        }
      }

      if (!photoBlob && canvasRef.current) {
        photoBlob = await new Promise<Blob | null>((resolve) => {
          canvasRef.current?.toBlob((b) => resolve(b), "image/jpeg", 0.95);
        });
      }

      if (!photoBlob) {
        throw new Error("Could not process photo image. Please try uploading your photo again.");
      }

      const photoFile = new File([photoBlob], "passport-photo.jpg", { type: "image/jpeg" });

      // 2. Load Razorpay SDK
      const isRazorpayLoaded = await initializeRazorpay();
      if (!isRazorpayLoaded) {
        throw new Error("Payment gateway failed to load. Please check your internet connection.");
      }

      // 3. Get GA Client ID
      let gaClientId = "";
      try {
        // @ts-ignore
        if (typeof window !== "undefined" && window.gtag) {
          await new Promise((resolve) => {
            // @ts-ignore
            window.gtag("get", "G-RJFKP2ZXNX", "client_id", (id: string) => {
              gaClientId = id || "";
              resolve(true);
            });
            setTimeout(resolve, 500);
          });
        }
      } catch (gaErr) {
        console.warn("[GA4] Client ID warning:", gaErr);
      }

      // 4. Create Order
      setReviewMessage("Creating secure order...");
      const formData = new FormData();
      formData.append("email", trimmedEmail);
      formData.append("image", photoFile);
      formData.append("basePrice", "8.00");
      formData.append("currency", expertPrice?.currency || "USD");
      formData.append("country", reviewCountry);
      if (gaClientId) formData.append("gaClientId", gaClientId);

      const res = await fetch("/api/expert-edit/create-order", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create order");

      setReviewMessage("Opening payment gateway...");

      // Track checkout started
      trackAnalyticsEvent("expert_review_checkout_started", {
        expertOrderId: data.expertOrderId,
        amount: (data.amount || 0) / 100,
        currency: data.currency,
        country: reviewCountry,
        optedInViaCheckbox: isExpertOptedIn,
      });

      // GA4 begin_checkout
      if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
        try {
          (window as any).gtag("event", "begin_checkout", {
            value: (data.amount || 0) / 100,
            currency: (data.currency || "USD").toUpperCase(),
            items: [
              {
                item_id: data.expertOrderId || "expert_review",
                item_name: "Expert Photo Review & Verification",
                price: (data.amount || 0) / 100,
                quantity: 1,
                item_category: "Expert Review",
              },
            ],
          });
        } catch (gaErr) {
          console.warn("[GA4] begin_checkout warning:", gaErr);
        }
      }

      // 5. Open Razorpay Checkout Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "PixPassport",
        description: `Expert Photo Review (${reviewCountry})`,
        image: "https://res.cloudinary.com/ddxu2wqfm/image/upload/v1774782293/logo_evktxq.jpg",
        order_id: data.orderId,
        handler: async function (response: any) {
          setReviewMessage("Verifying payment...");
          try {
            const verifyRes = await fetch("/api/expert-edit/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                expertOrderId: data.expertOrderId,
                gaClientId,
              }),
            });

            if (verifyRes.ok) {
              // Track completed review purchase
              trackAnalyticsEvent("expert_review_purchase_success", {
                expertOrderId: data.expertOrderId,
                amount: (data.amount || 0) / 100,
                currency: (data.currency || "USD").toUpperCase(),
                country: reviewCountry,
                optedInViaCheckbox: isExpertOptedIn,
              });

              if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
                try {
                  (window as any).gtag("event", "purchase", {
                    transaction_id: response.razorpay_payment_id || data.orderId,
                    value: (data.amount || 0) / 100,
                    currency: (data.currency || "USD").toUpperCase(),
                    items: [
                      {
                        item_id: data.expertOrderId || "expert_review",
                        item_name: "Expert Photo Review & Verification",
                        price: (data.amount || 0) / 100,
                        quantity: 1,
                        item_category: "Expert Review",
                      },
                    ],
                  });
                } catch (gaErr) {
                  console.warn("[GA4] purchase error:", gaErr);
                }
              }
              setReviewSuccess(true);
              setReviewLoading(false);
              setReviewMessage("");
            } else {
              setReviewError("Payment verification failed. Please contact our support team.");
              setReviewLoading(false);
              setReviewMessage("");
            }
          } catch (err: any) {
            setReviewError(err?.message || "Verification error occurred");
            setReviewLoading(false);
            setReviewMessage("");
          }
        },
        prefill: { email: trimmedEmail },
        theme: { color: "#84cc16" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        setReviewError("Payment failed: " + (response.error?.description || "Payment cancelled."));
        setReviewLoading(false);
        setReviewMessage("");
      });
      rzp.open();
    } catch (err: any) {
      setReviewError(err.message || "An error occurred while preparing your review order.");
      setReviewLoading(false);
      setReviewMessage("");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Download Processing Modal (6-second timer) */}
      {isDownloading && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 text-center border border-slate-100 relative overflow-hidden">
            {/* Top gradient accent line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-lime-500 via-emerald-500 to-teal-500" />

            {/* Circular Timer & Spinner */}
            <div className="relative w-20 h-20 mx-auto mb-5 flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-lime-200 border-t-lime-600 rounded-full animate-spin" />
              <div className="w-14 h-14 bg-lime-50 rounded-full flex flex-col items-center justify-center shadow-inner">
                <span className="text-xl font-black text-lime-700 leading-none">
                  {downloadSecondsLeft}s
                </span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Preparing {downloadFormat?.toUpperCase()} Template
            </h3>

            <p className="text-sm text-slate-600 mb-5 font-medium min-h-[1.5rem] transition-all duration-300">
              {getProcessingMessage()}
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-3 mb-2.5 overflow-hidden p-0.5 border border-slate-200">
              <div
                className="bg-gradient-to-r from-lime-500 to-emerald-600 h-full rounded-full transition-all duration-75 ease-out"
                style={{ width: `${downloadProgress}%` }}
              />
            </div>

            <div className="flex justify-between text-xs text-slate-400 font-semibold mb-5">
              <span>Rendering 300 DPI layout</span>
              <span>{Math.round(downloadProgress)}%</span>
            </div>

            {/* Details Badge */}
            <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600 flex items-center justify-center gap-2 border border-slate-100">
              <span className="text-lime-600 font-bold">✓</span>
              <span>
                Ready for print on {PAPER_SIZES[paperSize].name} ({PAPER_SIZES[paperSize].width}×{PAPER_SIZES[paperSize].height} mm)
              </span>
            </div>
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
        <div
          className="border-2 border-dashed border-slate-300 rounded-2xl p-6 sm:p-12 text-center bg-white hover:bg-slate-50 transition-colors cursor-pointer"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => document.getElementById("photo-upload")?.click()}
        >
          <div className="mx-auto w-16 h-16 bg-lime-100 text-lime-600 rounded-full flex items-center justify-center text-3xl mb-4">
            📷
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            Upload your passport photo
          </h3>
          <p className="text-slate-500 mb-6">
            Drag and drop your image here, or click to browse.
          </p>
          <button className="bg-lime-600 hover:bg-lime-700 text-white px-6 py-3 rounded-lg font-semibold  transition-colors">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 flex-col-reverse lg:flex-row items-start">
          {/* Controls Sidebar */}
          <div className="lg:col-span-4 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 order-2 lg:order-1 shadow-xs lg:sticky lg:top-20">
            <div className="flex justify-between items-center mb-3 border-b border-slate-100 pb-2">
              <h2 className="text-sm sm:text-base font-black text-slate-800 tracking-tight">
                Layout Settings
              </h2>
              <button
                onClick={() => {
                  setImageSrc(null);
                  setImageObj(null);
                }}
                className="text-xs text-slate-500 hover:text-slate-800 underline font-medium cursor-pointer"
              >
                Change Photo
              </button>
            </div>

            <div className="space-y-2.5">
              {/* Paper Size */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Paper Size
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {Object.entries(PAPER_SIZES).map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => setPaperSize(key as any)}
                      className={`py-1.5 px-2.5 border rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        paperSize === key
                          ? "bg-lime-50 border-lime-600 text-lime-800 shadow-2xs"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {val.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo Size */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Photo Size
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {Object.entries(photoSizes).map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => setPhotoSize(key)}
                      className={`py-1.5 px-2.5 border rounded-lg text-xs font-semibold transition-all truncate cursor-pointer ${
                        photoSize === key
                          ? "bg-lime-50 border-lime-600 text-lime-800 shadow-2xs"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {val.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of Photos */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Number of Copies
                </label>
                <select
                  value={layoutCount}
                  onChange={(e) => setLayoutCount(Number(e.target.value))}
                  className="w-full border border-slate-200 rounded-lg p-1.5 text-xs font-medium text-slate-700 focus:ring-2 focus:ring-lime-500 focus:outline-none bg-white cursor-pointer"
                >
                  {[2, 4, 6, 8, 10, 12, 16, 20].map((num) => (
                    <option key={num} value={num}>
                      {num} Photos
                    </option>
                  ))}
                  <option value={99}>Fill Entire Page</option>
                </select>
              </div>
            </div>

            {/* Optional: Expert Photo Review Opt-in (Directly Above Download Buttons) */}
        

            {/* Action Buttons: Checkout or Download */}
            <div className="mt-3.5 space-y-2">
              {isExpertOptedIn ? (
                <>
                  <div className="bg-lime-100/70 border border-lime-200 rounded-lg p-2.5 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-lime-950 block">Checkout Total</span>
                      <span className="text-[10px] text-lime-800">Print Template + 10-Min Review</span>
                    </div>
                    <span className="text-base font-black text-lime-950">
                      {expertPrice?.formatted || "$8.00"}
                    </span>
                  </div>

                  <button
                    onClick={handleOpenReviewModal}
                    className="w-full py-3 px-4 rounded-xl font-bold text-white bg-lime-600 hover:bg-lime-700 active:bg-lime-800 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm tracking-tight text-center"
                  >
                    <span>⚡ Get my photo reviewed by an expert in 10 min</span>
                    <span>•</span>
                    <span>{expertPrice?.formatted || "$8.00"}</span>
                  </button>

                  <div className="pt-1 text-center">
                    <p className="text-[11px] text-slate-500 mb-1.5">
                      Or download printable sheet without review:
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startDownloadWithTimer("jpg")}
                        disabled={isDownloading}
                        className="flex-1 py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                      >
                        Download JPG
                      </button>
                      <button
                        onClick={() => startDownloadWithTimer("pdf")}
                        disabled={isDownloading}
                        className="flex-1 py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                      >
                        Download PDF
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startDownloadWithTimer("jpg")}
                    disabled={isDownloading}
                    className={`w-full py-2.5 px-4 rounded-lg font-bold shadow-xs transition-all flex items-center justify-center gap-2 text-sm ${
                      isDownloading && downloadFormat === "jpg"
                        ? "bg-lime-700 text-white cursor-wait opacity-90"
                        : isDownloading
                          ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                          : "bg-lime-600 hover:bg-lime-700 text-white cursor-pointer"
                    }`}
                  >
                    {isDownloading && downloadFormat === "jpg" ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span>Processing JPG ({downloadSecondsLeft}s)...</span>
                      </>
                    ) : (
                      <span>Free Download as JPG</span>
                    )}
                  </button>

           

                  {/* 10-Minute Expert Review Direct Button */}
                  <button
                    type="button"
                    onClick={handleOpenReviewModal}
                    className="w-full mt-2.5 p-3 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-black text-white transition-all shadow-md hover:shadow-lg border border-slate-700/70 cursor-pointer group flex items-center justify-between gap-2.5 text-left"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-lime-400/15 border border-lime-400/30 flex items-center justify-center shrink-0 text-lime-400 text-sm font-bold group-hover:scale-105 transition-transform shadow-2xs">
                        ⚡
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-[13px] font-bold text-white leading-tight">
                          Get photo reviewed by expert
                        </div>
                        <div className="text-[10.5px] text-lime-400 font-semibold flex items-center gap-1 mt-0.5 leading-tight">
                          <span>⚡ In 10 minutes</span>
                          <span className="text-slate-500">•</span>
                          <span className="text-slate-300 font-normal">Official check</span>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 bg-lime-500 group-hover:bg-lime-400 text-slate-950 font-black text-xs px-2.5 py-1.5 rounded-lg shadow-sm transition-colors whitespace-nowrap">
                      {expertPrice?.formatted || "$8.00"}
                    </div>
                  </button>

                  <p className="text-[11px] text-center text-slate-400 mt-1">
                    High resolution 300 DPI ready for printing
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Canvas Preview Area */}
          <div
            className="lg:col-span-8 bg-slate-200 rounded-xl p-2 sm:p-6 flex items-center justify-center border border-slate-300 order-1 lg:order-2"
            ref={containerRef}
          >
            {/* Note: The canvas draws at 300DPI which is huge, we use CSS to scale it down for preview */}
            <canvas
              ref={canvasRef}
              className="w-auto h-auto max-w-full max-h-[70vh] object-contain transition-transform duration-300 group-hover:scale-[1.02] rounded-lg shadow-sm"
            />
          </div>
        </div>
      )}

      {/* Expert Photo Review Modal (Upgraded UI/UX) */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-[210] flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-lg border border-slate-100 relative my-auto overflow-hidden animate-fade-in max-h-[92vh] flex flex-col">
            {/* Top gradient accent line */}
            <div className="h-1.5 bg-gradient-to-r from-lime-500 via-emerald-500 to-teal-500 shrink-0" />

            {/* Close Button */}
            <button
              onClick={() => {
                if (!reviewLoading) {
                  setIsReviewModalOpen(false);
                  setReviewError(null);
                }
              }}
              disabled={reviewLoading}
              aria-label="Close dialog"
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full w-8 h-8 flex items-center justify-center transition-colors text-base font-bold z-20 cursor-pointer"
            >
              ✕
            </button>

            <div className="p-5 sm:p-6 overflow-y-auto">
              {reviewSuccess ? (
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-lime-100 text-lime-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-1.5">
                    Review Request Received!
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                    Your photo is now being reviewed by a certified biometric specialist for <strong>{reviewCountry}</strong> requirements.
                  </p>
                  <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 text-left text-xs text-slate-700 space-y-2 mb-5">
                    <div className="flex items-center gap-2 font-bold text-emerald-900">
                      <span>⚡ Expected delivery:</span>
                      <span className="bg-emerald-200/70 text-emerald-900 px-2 py-0.5 rounded text-[11px]">
                        Within 10 minutes
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <span>📧 Feedback & file will be sent to:</span>
                      <strong className="text-slate-900">{reviewEmail}</strong>
                    </div>
                    <p className="text-slate-500 text-[11px] leading-normal pt-1 border-t border-emerald-200/50">
                      You will receive a detailed verification report, compliance checklist, and your adjusted print-ready file.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsReviewModalOpen(false)}
                    className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3 rounded-xl transition-all shadow-md cursor-pointer text-sm"
                  >
                    Back to Generator
                  </button>
                </div>
              ) : (
                <div>
                  {/* Modal Header */}
                  <div className="mb-4 pr-7">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200 inline-flex items-center gap-1">
                        <span>⚡</span> 10-Minute Turnaround
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-lime-100 text-lime-800 px-2 py-0.5 rounded-full border border-lime-200">
                        Recommended
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                      Expert Biometric Photo Review
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Have a specialist inspect, calibrate, and verify your photo against official embassy & government guidelines before submission.
                    </p>
                  </div>

                  {/* Photo Preview & Country Selector */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 mb-3.5 flex gap-3 items-center">
                    {imageSrc && (
                      <div className="w-14 h-16 bg-white rounded-lg border border-slate-200 overflow-hidden shrink-0 shadow-2xs flex items-center justify-center">
                        <img
                          src={imageSrc}
                          alt="Photo for Review"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Applying Country / Specification
                      </label>
                      <select
                        value={reviewCountry}
                        onChange={(e) => setReviewCountry(e.target.value)}
                        className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-lg p-1.5 text-slate-800 focus:ring-2 focus:ring-lime-500 focus:outline-none cursor-pointer"
                      >
                        {REVIEW_COUNTRIES.map((c) => (
                          <option key={c.value} value={c.value}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* What our expert reviews - 4 points */}
                  <div className="mb-3.5 bg-slate-50/80 rounded-xl p-3 border border-slate-200/60">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wide">
                        What our expert checks & fixes:
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        ⚡ 10-Min Fast Delivery
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600">
                      <div className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold shrink-0">✓</span>
                        <span><strong>Dimensions & Scale:</strong> Head 50–69%, eye level & margins</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold shrink-0">✓</span>
                        <span><strong>Background & Lighting:</strong> Plain white backdrop & shadow check</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold shrink-0">✓</span>
                        <span><strong>Government Rules:</strong> Country compliance, neutral expression & glare</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold shrink-0">✓</span>
                        <span><strong>Direct Feedback:</strong> Verified print file & compliance report</span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Form */}
                  <form onSubmit={handleStartExpertReview} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Email address for delivery (Delivered in 10 min):
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={reviewEmail}
                        onChange={(e) => setReviewEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-all"
                      />
                    </div>

                    {reviewError && (
                      <div className="bg-red-50 text-red-700 text-xs p-2.5 rounded-lg border border-red-200">
                        {reviewError}
                      </div>
                    )}

                    {/* Pricing / Checkout breakdown */}
                    <div className="bg-slate-50/90 rounded-xl p-3 border border-slate-200/80 space-y-1.5">
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Passport Photo Template</span>
                        <span className="font-semibold text-emerald-700">FREE</span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-600">
                        <span>10-Minute Expert Review & Verification</span>
                        <span className="font-semibold text-slate-800">{expertPrice?.formatted || "$8.00"}</span>
                      </div>
                      <div className="pt-1.5 border-t border-slate-200 flex justify-between items-baseline">
                        <div>
                          <span className="text-xs font-bold text-slate-800 block">Total Due:</span>
                          <span className="text-[10px] text-slate-400">One-time payment • No subscription</span>
                        </div>
                        <span className="text-xl font-black text-slate-900">
                          {expertPrice?.formatted || "$8.00"}
                        </span>
                      </div>
                    </div>

                    {/* Primary Button */}
                    <button
                      type="submit"
                      disabled={reviewLoading}
                      className="w-full bg-lime-600 hover:bg-lime-700 active:bg-lime-800 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-xs sm:text-sm disabled:opacity-50 cursor-pointer"
                    >
                      {reviewLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>{reviewMessage || "Processing..."}</span>
                        </>
                      ) : (
                        <>
                          <span>Get my photo reviewed by an expert in 10 min</span>
                          <span>•</span>
                          <span>{expertPrice?.formatted || "$8.00"}</span>
                        </>
                      )}
                    </button>

                    {/* Trust Seals */}
                    <div className="flex items-center justify-center gap-3 text-[10px] text-slate-500 pt-1">
                      <span className="flex items-center gap-1">🔒 256-bit Secure</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">⚡ 10-Min Delivery</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">🛡️ Guarantee</span>
                    </div>

                    <p className="text-[10px] text-slate-400 text-center leading-tight">
                      Expert review helps identify common photo issues. Final acceptance is determined by the issuing authority.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
