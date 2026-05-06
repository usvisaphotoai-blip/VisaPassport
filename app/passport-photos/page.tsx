import { getFilteredSpecs } from "@/lib/specs";
import MasterDirectory from "../components/MasterDirectory";
import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Official Passport Photo Sizes & Requirements by Country | PixPassport",
  description: "Browse the complete database of 2026 passport photo requirements for over 50 countries. Find dimensions, background rules, and creates compliant photos instantly.",
  keywords: ["passport photo size database", "passport photo requirements by country", "global passport photo standards"],
  alternates: {
    canonical: "https://www.pixpassport.com/passport-photos",
  },
};

export default function PassportDirectoryPage() {
  // Show 1 unique entry per country for a clean directory
  const passportSpecs = Array.from(new Map(getFilteredSpecs().map(s => [s.country, s])).values());

  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs />
      <main>
        <MasterDirectory 
          title="Passport Photo Directory"
        subtitle="Select your destination country to view official biometric requirements and create a compliant passport photo in seconds."
        specs={passportSpecs}
        type="passport"
      />

      {/* Cross-Links Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-slate-100">
          <Link href="/visa-photo" className="group p-6 bg-emerald-50 rounded-2xl border border-emerald-100 hover:shadow-lg hover:border-emerald-200 transition-all">
            <span className="text-2xl mb-3 block">🌐</span>
            <span className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 block mb-1">Visa Photo Directory</span>
            <p className="text-xs text-slate-500">Looking for visa photos instead? View all visa specs</p>
          </Link>
          <Link href="/tool" className="group p-6 bg-blue-50 rounded-2xl border border-blue-100 hover:shadow-lg hover:border-blue-200 transition-all">
            <span className="text-2xl mb-3 block">📸</span>
            <span className="text-sm font-bold text-slate-900 group-hover:text-blue-700 block mb-1">Create Photo Now</span>
            <p className="text-xs text-slate-500">Upload & get a compliant passport photo instantly</p>
          </Link>
          <Link href="/visa-photo-validator" className="group p-6 bg-purple-50 rounded-2xl border border-purple-100 hover:shadow-lg hover:border-purple-200 transition-all">
            <span className="text-2xl mb-3 block">✅</span>
            <span className="text-sm font-bold text-slate-900 group-hover:text-purple-700 block mb-1">Free Validator</span>
            <p className="text-xs text-slate-500">Check your photo for free before you pay</p>
          </Link>
          <Link href="/blog" className="group p-6 bg-amber-50 rounded-2xl border border-amber-100 hover:shadow-lg hover:border-amber-200 transition-all">
            <span className="text-2xl mb-3 block">📖</span>
            <span className="text-sm font-bold text-slate-900 group-hover:text-amber-700 block mb-1">Photo Guides</span>
            <p className="text-xs text-slate-500">Expert tips and compliance guides</p>
          </Link>
        </div>
      </section>
      </main>
    </div>
  );
}
