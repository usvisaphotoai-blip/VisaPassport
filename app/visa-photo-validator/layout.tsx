import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Passport Photo & Visa Validator | Instant Biometric Check",
  description:
    "Check your passport, visa, or ID photo for 100% biometric compliance. Our free official-standard global photo validator gives an instant PASS/FAIL report for 50+ countries.",
  keywords: [
    "passport photo validator",
    "visa photo checker",
    "free passport photo compliance check",
    "AI biometric photo check",
    "validate passport photo online",
    "US visa photo validator",
    "UK passport photo checker",
    "Schengen visa photo check",
    "global passport photo validation",
    "ICAO photo checker",
  ],
  alternates: {
    canonical: "https://www.pixpassport.com/visa-photo-validator",
  },
};

export default function ValidatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
