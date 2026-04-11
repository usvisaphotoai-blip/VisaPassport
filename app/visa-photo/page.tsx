import { allSpecs } from "@/lib/specs";
import MasterDirectory from "../components/MasterDirectory";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Official Visa Photo Sizes & Biometric Requirements by Country | PixPassport",
  description: "Worldwide visa photo requirement database. Find official specs for US Visa (DS-160), UK Visa, Schengen Visa, India Visa, and 50+ other countries.",
  keywords: ["visa photo requirements by country", "visa photo size guide", "ds-160 photo size", "international visa photo database"],
};

export default function VisaDirectoryPage() {
  // Filter for specs that at least mention visa in their ID or name
  // Or handle countries that don't have a specific visa ID by showing their standard spec
  const visaSpecs = allSpecs.filter(s => 
    s.id.includes("visa") || 
    s.name.toLowerCase().includes("visa")
  );

  // If we want a full directory even for countries where we only have 'passport' defined,
  // we can use the full list but label as visa in the component.
  // For now, let's use the explicit ones + some fallbacks if needed.
  // Actually, let's show all countries but filtered for the "Visa" context.
  
  return (
    <main className="min-h-screen bg-white">
      <MasterDirectory 
        title="Visa Photo Directory"
        subtitle="Global database of official biometric visa photo specifications. Find your destination country and create a compliant visa photo instantly."
        specs={allSpecs} // Show all countries, the component will handle the visa-silo linking
        type="visa"
      />
    </main>
  );
}
