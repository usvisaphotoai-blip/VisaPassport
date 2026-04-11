import type { Metadata } from "next";
import Link from "next/link";
import TrustSection from "../components/TrustSection";

export const metadata: Metadata = {
  title: "About Us - PixPassport",
  description: "Learn about PixPassport's mission, our advanced biometric AI technology, and our strict commitment to your data privacy.",
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen pb-16">
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">About PixPassport</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl leading-relaxed">
            Our mission is to eliminate the stress and uncertainty of government photo compliance.
            We provide a fast, secure, and 100% accurate way to validate and process passport and visa photos from the comfort of your home.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          {/* Who We Are */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-lime-500">■</span> Who We Are
            </h2>
            <div className="prose prose-slate max-w-none text-gray-600 leading-relaxed">
              <p>
                Taking a compliant passport or visa photo shouldn't mean wasting time and money at a local pharmacy or 
                photo studio. Every year, hundreds of thousands of official applications are delayed simply because a 
                photo had a faint shadow, an incorrect head size ratio, or a background that wasn't perfectly white.
              </p>
              <p>
                Founded by technologists and frequent travelers, <strong>PixPassport</strong> was built to solve this exact problem. 
                Our platform leverages advanced artificial intelligence and biometric scanning algorithms to check your photos 
                against the exact same technical standards used by the U.S. State Department.
              </p>
            </div>
          </div>

          {/* Our Technology */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-lime-500">■</span> Our Technology
            </h2>
            <div className="prose prose-slate max-w-none text-gray-600 leading-relaxed">
              <p>
                Our proprietary AI engine instantly performs over 15 distinct biometric checks in less than five seconds. 
                When you upload a photo, our system measures your eye level, calculates your head-to-image ratio, 
                detects compliance issues like glasses or uneven lighting, and mathematically strips away messy backgrounds, 
                replacing them with a pure white (RGB 255, 255, 255) canvas.
              </p>
              <p>
                We maintain an up-to-date database of global photo requirements, specializing in the incredibly strict 
                guidelines of the US DS-160 Visa form, the DV Lottery, and US Passports.
              </p>
            </div>
          </div>

          {/* Privacy Guarantee */}
          <div className="bg-lime-50/50 border border-lime-100 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-lime-500">■</span> Our Commitment to Privacy
            </h2>
            <div className="prose prose-slate max-w-none text-gray-600 leading-relaxed">
              <p>
                We understand that handling identity documents and biometric data requires the highest level of security. 
                We have built PixPassport with a privacy-first architecture:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-lime-500">
                <li><strong>No Permanent Storage:</strong> All uploaded photos are automatically and permanently deleted from our servers within 24 hours.</li>
                <li><strong>No Model Training:</strong> We never use your face or personal photos to train our AI models.</li>
                <li><strong>Secure Downloads:</strong> Your processed, compliant photos are delivered via secure, expiring download links.</li>
                <li><strong>GDPR & CCPA Compliant:</strong> We strictly adhere to global privacy regulations. We do not sell your personal data.</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      <TrustSection />

      <section className="py-12 bg-gray-50 mt-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Have Questions?</h3>
          <p className="text-gray-600 mb-6 font-medium">Read our Privacy Policy or get in touch with our team.</p>
          <div className="flex justify-center gap-4">
            <Link href="/contact" className="bg-lime-600 px-6 py-2.5 rounded-lg text-white font-semibold hover:bg-lime-700 transition-colors">
              Contact Us
            </Link>
            <Link href="/privacy-policy" className="bg-white border border-gray-300 px-6 py-2.5 rounded-lg text-slate-700 font-semibold hover:bg-gray-50 transition-colors">
              Read completely Privacy Policy
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
