import { allSpecs } from "@/lib/specs";
import MasterDirectory from "../components/MasterDirectory";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Official Passport Photo Sizes & Requirements by Country | PixPassport",
  description: "Browse the complete database of 2026 passport photo requirements for over 50 countries. Find dimensions, background rules, and creates compliant photos instantly.",
  keywords: ["passport photo size database", "passport photo requirements by country", "global passport photo standards"],
};

export default function PassportDirectoryPage() {
  // Show 1 unique entry per country for a clean directoryrrrr
  const passportSpecs = Array.from(new Map(allSpecs.map(s => [s.country, s])).values());

  return (
    <main className="min-h-screen bg-white">
      <MasterDirectory 
        title="Passport Photo Directory"
        subtitle="Select your destination country to view official biometric requirements and create a compliant passport photo in seconds."
        specs={passportSpecs}
        type="passport"
      />
    </main>
  );
}
