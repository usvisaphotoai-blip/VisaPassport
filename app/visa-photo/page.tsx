import { allSpecs } from "@/lib/specs";
import MasterDirectory from "../components/MasterDirectory";
import { Metadata } from "next";
import Link from "next/link";

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

      {/* Cross-Links Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-slate-100">
          <Link href="/passport-photos" className="group p-6 bg-blue-50 rounded-2xl border border-blue-100 hover:shadow-lg hover:border-blue-200 transition-all">
            <span className="text-2xl mb-3 block">🛂</span>
            <span className="text-sm font-bold text-slate-900 group-hover:text-blue-700 block mb-1">Passport Photo Directory</span>
            <p className="text-xs text-slate-500">Looking for passport photos? View all passport specs</p>
          </Link>
          <Link href="/tool" className="group p-6 bg-emerald-50 rounded-2xl border border-emerald-100 hover:shadow-lg hover:border-emerald-200 transition-all">
            <span className="text-2xl mb-3 block">📸</span>
            <span className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 block mb-1">Create Photo Now</span>
            <p className="text-xs text-slate-500">Upload & get a compliant visa photo instantly</p>
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
  );
}
