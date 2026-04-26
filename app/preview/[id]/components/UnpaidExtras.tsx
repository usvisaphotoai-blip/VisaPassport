import React, { useState } from "react";
import { cx, SvgIcon, CHECK_ICONS } from "./SharedUI";
import { ComplianceCheck } from "../hooks/useFaceVerification";
import { CountrySpec } from "@/lib/specs";

interface UnpaidExtrasProps {
  showExtras: boolean;
  checks: ComplianceCheck[];
  documentType: string;
  spec?: CountrySpec | undefined;
}

export default function UnpaidExtras({
  showExtras,
  checks,
  documentType,
  spec,
}: UnpaidExtrasProps) {
  const [reportEmail, setReportEmail] = useState("");
  const [sendingReport, setSendingReport] = useState(false);

  const handleSendReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportEmail) return;
    setSendingReport(true);
    try {
      const res = await fetch("/api/send-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: reportEmail, checks, documentType }),
      });
      alert(
        res.ok
          ? "Validation report safely sent to your inbox!"
          : "Failed to send the report.",
      );
    } catch {
      alert("An error occurred. Please try again.");
    } finally {
      setSendingReport(false);
      setReportEmail("");
    }
  };

  if (!showExtras) return null;

  return (
    <>
   

     



      {/* Free vs Paid */}
     
    </>
  );
}
