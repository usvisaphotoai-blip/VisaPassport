import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "PixPassport refund policy on photo processing and downloads.",
};

export default function RefundPolicyPage() {
  return (
    <div className="bg-white">
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Refund Policy</h1>
          <p className="mt-3 text-gray-500">Last updated: February 23, 2026</p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate prose-sm max-w-none">
          <div className="space-y-10">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">1. Photo Rejection Guarantee</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-4">
                <p className="text-sm text-blue-800 leading-relaxed">
                  If your processed photo is rejected by any government agency (e.g., for passport, visa, or ID applications), you are eligible for a <strong>50% refund</strong> of your original purchase price.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">2. Refund Request Requirements</h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                <li>You must request the refund within <strong>30 days</strong> of your original purchase.</li>
                <li>You must provide <strong>screenshot proof</strong> or an official notification indicating that the photo was rejected by the government agency.</li>
                <li>You must provide the email address used for the purchase or the transaction ID.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">3. Processing Fees and 50% Limitation</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Refunds are limited to <strong>50% of the original purchase price</strong>. This is because every photo generated incurs non-recoverable server processing, infrastructure, and AI analysis costs on our end. We retain 50% to cover the direct expenses of validating and generating the digital files.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">4. Processing Time and Method</h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                <li>Approved refunds are processed within <strong>5 to 10 business days</strong> from the date of request approval.</li>
                <li>The refund will automatically go back to the <strong>original payment method</strong> used during the transaction. We cannot issue refunds to alternate cards or accounts.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">5. Other Refund Reasons</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Because our service delivers immediate, irrevocable digital downloads, refunds for reasons other than official photo rejection (e.g., changing your mind, duplicate purchases by mistake, or finding an alternative service) are evaluated strictly on a case-by-case basis and are not guaranteed.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">6. How to Request a Refund</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                To initiate a refund request, please email our support team at <strong>usvisaphotoai@gmail.com</strong> with your transaction details and proof of photo rejection.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Link href="/" className="text-sm font-medium text-lime-600 hover:text-lime-700 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
