import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllVisaChecklistPaths,
  getAllVisaCountries,
  getVisaChecklist,
  getVisaCountry,
} from "@/lib/visa-checklist";
import AiVisaChecklistAuditClient from "@/app/visa-checklist/components/AiVisaChecklistAuditClient";

const APP_URL = "https://www.pixpassport.com";

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllVisaChecklistPaths();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; checklist: string }>;
}): Promise<Metadata> {
  const { country: countrySlug, checklist: checklistSlug } = await params;
  const checklist = getVisaChecklist(countrySlug, checklistSlug);

  if (!checklist) {
    return {
      title: "Audit Not Found | PixPassport",
    };
  }

  const title = `Free AI Document Audit: ${checklist.title}`;
  const description = `Instant AI pre-submission document audit for ${checklist.title}. Find missing clauses, bank statement discrepancies, and biometric photo compliance.`;

  return {
    title: `${title} | PixPassport`,
    description,
    alternates: {
      canonical: `${APP_URL}/visa-checklist/${countrySlug}/${checklistSlug}/audit`,
    },
    // Tool page that duplicates the checklist's keywords; keep the checklist page as the ranking URL.
    robots: { index: false, follow: true },
  };
}

export default async function ChecklistAuditDirectPage({
  params,
}: {
  params: Promise<{ country: string; checklist: string }>;
}) {
  const { country: countrySlug, checklist: checklistSlug } = await params;
  const checklist = getVisaChecklist(countrySlug, checklistSlug);

  if (!checklist) {
    notFound();
  }

  const allCountries = getAllVisaCountries();
  const { country } = getVisaCountry(countrySlug);

  return (
    <AiVisaChecklistAuditClient
      initialCountry={country}
      initialChecklist={checklist}
      allCountries={allCountries}
    />
  );
}
