import type { Metadata } from "next";
import Link from "next/link";
import TrustSection from "../components/TrustSection";
import Breadcrumbs from "../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "About Us - PixPassport",
  description: "Learn about PixPassport's mission, our advanced biometric AI technology, and our strict commitment to your data privacy.",
  alternates: {
    canonical: "https://www.pixpassport.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen pb-16">
      <Breadcrumbs />
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
                against the exact technical standards used by immigration agencies worldwide, including the U.S. State Department, UK HMPO, and ICAO.
                You can <Link href="/visa-photo-validator" className="text-lime-600 font-semibold hover:underline">validate your photo for free</Link> or <Link href="/tool" className="text-lime-600 font-semibold hover:underline">create a compliant photo</Link> in seconds.
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
                replacing them with a pure white (RGB 255, 255, 255) canvas. Learn more about common rejection reasons in our <Link href="/faq" className="text-lime-600 font-semibold hover:underline">FAQ</Link>.
              </p>
              <p>
                We maintain an up-to-date database of photo requirements for 50+ countries, covering passports,
                visas, and national ID documents — from <Link href="/us-visa-photo-editor" className="text-lime-600 font-semibold hover:underline">US DS-160</Link> and <Link href="/uk-passport-photo-editor" className="text-lime-600 font-semibold hover:underline">UK HMPO</Link> to <Link href="/india-passport-photo-editor" className="text-lime-600 font-semibold hover:underline">Indian</Link> and Schengen applications.
                Browse the full <Link href="/passport-photos" className="text-lime-600 font-semibold hover:underline">passport photo directory</Link> or <Link href="/visa-photo" className="text-lime-600 font-semibold hover:underline">visa photo directory</Link> for specific requirements.
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

      {/* Quick Links */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Explore More</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/tool" className="p-4 bg-gray-50 rounded-xl text-center hover:bg-lime-50 hover:border-lime-200 border border-gray-100 transition-all">
              <span className="text-2xl block mb-2">📸</span>
              <span className="text-sm font-bold text-slate-900">Create Photo</span>
            </Link>
            <Link href="/visa-photo-validator" className="p-4 bg-gray-50 rounded-xl text-center hover:bg-lime-50 hover:border-lime-200 border border-gray-100 transition-all">
              <span className="text-2xl block mb-2">✅</span>
              <span className="text-sm font-bold text-slate-900">Free Validator</span>
            </Link>
            <Link href="/blog" className="p-4 bg-gray-50 rounded-xl text-center hover:bg-lime-50 hover:border-lime-200 border border-gray-100 transition-all">
              <span className="text-2xl block mb-2">📖</span>
              <span className="text-sm font-bold text-slate-900">Blog & Guides</span>
            </Link>
            <Link href="/faq" className="p-4 bg-gray-50 rounded-xl text-center hover:bg-lime-50 hover:border-lime-200 border border-gray-100 transition-all">
              <span className="text-2xl block mb-2">❓</span>
              <span className="text-sm font-bold text-slate-900">FAQ</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50 mt-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Have Questions?</h3>
          <p className="text-gray-600 mb-6 font-medium">Read our Privacy Policy or get in touch with our team.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="bg-lime-600 px-6 py-2.5 rounded-lg text-white font-semibold hover:bg-lime-700 transition-colors">
              Contact Us
            </Link>
            <Link href="/privacy-policy" className="bg-white border border-gray-300 px-6 py-2.5 rounded-lg text-slate-700 font-semibold hover:bg-gray-50 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="bg-white border border-gray-300 px-6 py-2.5 rounded-lg text-slate-700 font-semibold hover:bg-gray-50 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
