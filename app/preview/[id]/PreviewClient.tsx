"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { getClientTimezoneCurrency } from "@/lib/currency";

import { CheckMark, SvgIcon } from "./components/SharedUI";
import PhotoCard from "./components/PhotoCard";
import ComplianceReport from "./components/ComplianceReport";
import UnpaidExtras from "./components/UnpaidExtras";
import OrderSummary from "./components/OrderSummary";
import ZoomDialog from "./components/ZoomDialog";
import MobileStickyCTA from "./components/MobileStickyCTA";
import FeedbackButton from "./components/FeedbackButton";
import { getSpecById } from "@/lib/specs";

import { useFaceVerification } from "./hooks/useFaceVerification";
import { usePayment, LocalPrice } from "./hooks/usePayment";

export default function PreviewClient({
  photoId,
  previewUrl,
  documentType,
  metrics,
  localPrice: initialLocalPrice,
  expertPrice: initialExpertPrice,
  initialIsPaid,
}: {
  photoId: string;
  previewUrl: string;
  documentType: string;
  metrics: any;
  localPrice: LocalPrice;
  expertPrice: LocalPrice;
  initialIsPaid?: boolean;
}) {
  const { data: session, status } = useSession();
  const [hasPaid, setHasPaid] = useState(initialIsPaid || false);
  const [guestEmail, setGuestEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [localPrice, setLocalPrice] = useState<LocalPrice>(initialLocalPrice);
  const [expertPrice, setExpertPrice] = useState<LocalPrice>(initialExpertPrice);
  const [isExpertPlan, setIsExpertPlan] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);

  // Custom Hooks
  const { verifying, checks, overallPass, canvasRef, overlayRef } =
    useFaceVerification(previewUrl, documentType);

  const { loading, handlePayment } = usePayment({
    photoId,
    localPrice: isExpertPlan ? expertPrice : localPrice,
    isExpert: isExpertPlan,
    guestEmail,
    status: status === "authenticated" ? "authenticated" : status === "loading" ? "loading" : "unauthenticated",
    session,
    setHasPaid,
  });

  const onPaymentClick = () => {
    const isEmailValid = guestEmail && guestEmail.includes("@") && guestEmail.includes(".");
    if (status !== "authenticated" && !isEmailValid) {
      setIsEmailDialogOpen(true);
      return;
    }
    handlePayment();
  };

  // Effects
  useEffect(() => {
    const tzCurrency = getClientTimezoneCurrency();
    if (
      !initialLocalPrice ||
      (tzCurrency !== initialLocalPrice.currency && tzCurrency !== "USD")
    ) {
      fetch(`/api/currency?currency=${tzCurrency}`)
        .then((r) => r.json())
        .then((d) => {
          if (d?.formatted) setLocalPrice(d);
        })
        .catch(console.error);

      fetch(`/api/currency?currency=${tzCurrency}&isExpert=true`)
        .then((r) => r.json())
        .then((d) => {
          if (d?.formatted) setExpertPrice(d);
        })
        .catch(console.error);
    }
  }, [initialLocalPrice]);

  useEffect(() => {
    const interval = setInterval(
      () => setTimeLeft((p) => (p > 0 ? p - 1 : 0)),
      1000,
    );
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)
      .toString()
      .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const handleEmailPhoto = async () => {
    const emailTo = window.prompt(
      "Enter your email address to receive the photo:",
    );
    if (!emailTo) return;
    try {
      const res = await fetch("/api/send-photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailTo,
          photoUrl: previewUrl,
          documentType,
          photoId,
        }),
      });
      alert(
        res.ok
          ? "Photo sent successfully! Check your inbox."
          : "Failed to send email. Please try again.",
      );
    } catch {
      alert("Error sending email.");
    }
  };

  const passCount = checks?.filter((c) => c.status === "PASS").length || 0;
  const showExtras = !hasPaid && !verifying;
  const spec = getSpecById(documentType);
  const productName = spec?.name || "Visa Photo";

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <div className="flex-1 flex items-start justify-center px-4 py-4 sm:py-6">
        <div className="w-full max-w-6xl">
          {/* Target Document Identity Header */}


          <div className="flex flex-col lg:flex-row gap-4">
            {/* LEFT SIDE */}
            <div className="w-full lg:w-[55%] space-y-3">
              <PhotoCard
                canvasRef={canvasRef}
                overlayRef={overlayRef}
                setIsDialogOpen={setIsDialogOpen}
                verifying={verifying}
                hasPaid={hasPaid}
                overallPass={overallPass}
                passCount={passCount}
                checks={checks}
              />
              <ComplianceReport
                verifying={verifying}
                checks={checks}
                passCount={passCount}
                spec={spec}
              />
              <UnpaidExtras
                showExtras={showExtras}
                checks={checks}
                documentType={documentType}
                spec={spec}
              />
            </div>

            {/* RIGHT SIDE: Order Summary */}
            <OrderSummary
              productName={productName}
              localPrice={localPrice}
              expertPrice={expertPrice}
              isExpertPlan={isExpertPlan}
              setIsExpertPlan={setIsExpertPlan}
              hasPaid={hasPaid}
              timeLeft={timeLeft}
              formatTime={formatTime}
              loading={loading}
              verifying={verifying}
              handlePayment={onPaymentClick}
              documentType={documentType}
              photoId={photoId}
              status={status === "authenticated" ? "authenticated" : status === "loading" ? "loading" : "unauthenticated"}
              guestEmail={guestEmail}
              setGuestEmail={setGuestEmail}
              handleEmailPhoto={handleEmailPhoto}
            />
          </div>
        </div>
      </div>

      <ZoomDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        previewUrl={previewUrl}
        hasPaid={hasPaid}
      />

      <MobileStickyCTA
        showExtras={showExtras}
        localPrice={localPrice}
        expertPrice={expertPrice}
        isExpertPlan={isExpertPlan}
        loading={loading}
        handlePayment={onPaymentClick}
        status={status === "authenticated" ? "authenticated" : status === "loading" ? "loading" : "unauthenticated"}
        guestEmail={guestEmail}
        setGuestEmail={setGuestEmail}
      />
      <FeedbackButton photoId={photoId} />

      {/* Email Prompt Dialog */}
      {isEmailDialogOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="w-12 h-12 bg-[#3b5bdb]/10 rounded-full flex items-center justify-center mb-4">
                <SvgIcon d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" className="w-6 h-6 text-[#3b5bdb]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Where should we send it?</h3>
              <p className="text-sm text-slate-500 mb-5 leading-relaxed">
                Please enter your email address so we can send you your final processed photos and receipt.
              </p>
              <input
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#3b5bdb] focus:border-transparent outline-none transition-all mb-4 font-medium"
                autoFocus
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setIsEmailDialogOpen(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-xl transition-all text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const isEmailValid = guestEmail && guestEmail.includes("@") && guestEmail.includes(".");
                    if (isEmailValid) {
                      setIsEmailDialogOpen(false);
                      handlePayment();
                    } else {
                      alert("Please enter a valid email address.");
                    }
                  }}
                  className="flex-1 bg-[#3b5bdb] hover:bg-[#2f4ac7] text-white font-bold py-3.5 rounded-xl transition-all text-sm shadow-lg shadow-[#3b5bdb]/20"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
