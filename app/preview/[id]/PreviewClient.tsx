"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { getClientTimezoneCurrency } from "@/lib/currency";

import { CheckMark } from "./components/SharedUI";
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
              handlePayment={handlePayment}
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
        handlePayment={handlePayment}
        status={status === "authenticated" ? "authenticated" : status === "loading" ? "loading" : "unauthenticated"}
        guestEmail={guestEmail}
        setGuestEmail={setGuestEmail}
      />
      <FeedbackButton photoId={photoId} />
    </div>
  );
}
