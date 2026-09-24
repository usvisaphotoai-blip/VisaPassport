import type { Metadata } from "next";
import { getAllVisaCountries, getVisaChecklist, getVisaCountry } from "@/lib/visa-checklist";
import AiVisaChecklistAuditClient from "../components/AiVisaChecklistAuditClient";

const APP_URL = "https://www.pixpassport.com";

export const metadata: Metadata = {
  title: "AI Visa Document Checklist Audit | Pre-Submission Verification",
  description:
    "Free automated AI pre-submission audit for visa applications. Upload your documents, find missing files, verify bank statement consistency, and check biometric photo compliance before you apply.",
  alternates: {
    canonical: `${APP_URL}/visa-checklist/audit`,
  },
};

export default async function VisaAuditPage({
  searchParams,
}: {
  searchParams: Promise<{ country?: string; checklist?: string }>;
}) {
  const { country: countrySlug, checklist: checklistSlug } = await searchParams;

  const allCountries = getAllVisaCountries();
  const targetCountrySlug = countrySlug || "canada";
  const { country } = getVisaCountry(targetCountrySlug);

  const initialChecklist = checklistSlug
    ? getVisaChecklist(targetCountrySlug, checklistSlug)
    : country?.availableVisas && country.availableVisas.length > 0
    ? getVisaChecklist(targetCountrySlug, country.availableVisas[0].slug)
    : null;

  return (
    <AiVisaChecklistAuditClient
      initialCountry={country}
      initialChecklist={initialChecklist}
      allCountries={allCountries}
    />
  );
}
