import { allSpecs } from "@/lib/specs";
import MasterDirectory from "../components/MasterDirectory";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Official Visa Photo Requirements & Sizes | International Visa Portal",
  description: "Explore official visa photo specifications for over 50 countries. Our database includes technical requirements for DS-160, eVisas, and consular submissions.",
  keywords: ["visa photo requirements", "visa photo size index", "ds-160 photo standards", "eVisa photo database"],
};

export default function VisaDirectoryPage() {
  // Show ALL countries, but de-duplicate by country name so we have 1 entry per nation
  const uniqueSpecs = Array.from(new Map(allSpecs.map(s => [s.country, s])).values());
  const displaySpecs = uniqueSpecs;

  return (
    <main className="min-h-screen bg-white">
      <MasterDirectory 
        title="Visa Photo Directory"
        subtitle="Technical photo specifications for international visas. Select your country to ensure your digital upload or consular photo is 100% compliant."
        specs={displaySpecs}
        type="visa"
      />
    </main>
  );
}
