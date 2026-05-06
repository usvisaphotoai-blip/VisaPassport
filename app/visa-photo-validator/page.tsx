import React from "react";
import ValidatorClient from "./components/ValidatorClient";

export const metadata = {
  title: "Visa Photo Validator | Professional Biometric Analysis",
  description: "Independent embassy-grade visa photo validation system using AI biometric analysis.",
};

export default function VisaPhotoValidatorPage() {
  return (
    <main className="min-h-screen bg-slate-50/50">
      <ValidatorClient />
    </main>
  );
}
