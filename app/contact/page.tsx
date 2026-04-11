import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact USVisaPhotoAI support team.",
};

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Contact Us</h1>
          <p className="mt-3 text-gray-500">We are here to help with your photo validation queries.</p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl shadow-slate-200/50 rounded-2xl border border-slate-100 overflow-hidden">
            <div className="p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-2 uppercase tracking-wide">Business Information</h3>
                  <div className="text-gray-600 leading-relaxed bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <p className="font-bold text-slate-900 text-lg mb-1">USVisaPhotoAI</p>
                    <p>khadda kushinagar,</p>
                    <p>Uttar Pradesh, India 274802</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-2 uppercase tracking-wide">Email Support</h3>
                  <div className="text-gray-600 leading-relaxed bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <p className="mb-2">For support, questions, or refund requests, please email us directly at:</p>
                    <a href="mailto:usvisaphotoai@gmail.com" className="font-bold text-lime-600 hover:text-lime-700 text-lg transition-colors">
                      usvisaphotoai@gmail.com
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50 mt-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Link href="/" className="text-sm font-medium text-lime-600 hover:text-lime-700 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
