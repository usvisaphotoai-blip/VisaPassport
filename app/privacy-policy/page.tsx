import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How PixPassport collects, uses, stores and deletes your photos and personal data, which providers process it, and your privacy rights.",
  alternates: {
    canonical: "https://www.pixpassport.com/privacy-policy",
    languages: {
      en: "https://www.pixpassport.com/privacy-policy",
      "x-default": "https://www.pixpassport.com/privacy-policy",
    },
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white">
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Privacy Policy</h1>
          <p className="mt-3 text-gray-500">Last updated: November 24, 2026</p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate prose-sm max-w-none">
          <div className="space-y-10">
            {/* Overview */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">1. Overview</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                PixPassport (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our photo validation and processing service at pixpassport.com.
              </p>
            </div>

            {/* Data Collection */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">2. Information We Collect</h2>
              <h3 className="text-base font-semibold text-slate-900 mt-4 mb-2">Photos You Upload</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li>Photos are uploaded only to check, crop and process them for the document you choose</li>
                <li>We check photos against official government photo specifications for over 50 countries (including the US, UK, India and Schengen)</li>
                <li>Photos are never used for AI training, marketing or any other purpose</li>
              </ul>
              <h3 className="text-base font-semibold text-slate-900 mt-4 mb-2">Account Information</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li>If you create an account: your name, email address and a securely hashed password</li>
                <li>If you sign in with Google: your name, email address and profile picture from your Google account</li>
              </ul>
              <h3 className="text-base font-semibold text-slate-900 mt-4 mb-2">Orders and Invoices</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li>Your email address, country, the product you bought, the amount and currency, and the payment reference</li>
                <li>We keep order, payment and invoice records after your photos are deleted, because we need them for accounting, tax, refunds and fraud prevention</li>
              </ul>
              <h3 className="text-base font-semibold text-slate-900 mt-4 mb-2">Payment Information</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li>Payments are processed by Razorpay</li>
                <li>We never store credit card numbers or full payment details on our servers</li>
                <li>We receive only a transaction confirmation and payment status</li>
              </ul>
              <h3 className="text-base font-semibold text-slate-900 mt-4 mb-2">Usage Data</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li>Browser type, device type and operating system</li>
                <li>Pages visited and features used</li>
                <li>IP address and approximate country, used for analytics, local pricing, security and fraud prevention</li>
                <li>Feedback and reviews you choose to send us</li>
              </ul>
            </div>

            {/* Photo Handling */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">3. Photo Handling &amp; Retention</h2>
              <div className="bg-lime-50 border border-lime-200 rounded-xl p-5 mb-4">
                <p className="text-sm font-semibold text-lime-800 mb-2">How long we keep your photos:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-lime-700">
                  <li><strong>Automatic deletion:</strong> Uploaded and processed photos are deleted by an automatic daily job once they are more than 24 hours old, so they are normally gone within 48 hours</li>
                  <li><strong>Download window:</strong> Your download link stops working 24 hours after you create the photo, so download it promptly</li>
                  <li><strong>Expert Edit orders:</strong> If you order an Expert Edit, a member of our team views and edits your photos. These photos are kept for 30 days so we can complete and fix the order, then deleted automatically</li>
                  <li><strong>No selling:</strong> Photos are never sold, and are shared only with the service providers listed below that store or deliver them for us</li>
                  <li><strong>No AI training:</strong> Photos are never used for machine learning or AI training</li>
                </ul>
              </div>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">4. Cookies</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                We use essential cookies to keep you signed in and to process your photos. We also use Google Analytics and Microsoft Clarity to understand how the site is used. Microsoft Clarity records how visitors interact with pages (such as clicks and scrolling) to help us find problems. You can block non-essential cookies in your browser settings.
              </p>
            </div>

            {/* GDPR / CCPA */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">5. GDPR &amp; CCPA Compliance</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                We comply with the General Data Protection Regulation (GDPR) for EU residents and the California Consumer Privacy Act (CCPA) for California residents. You have the right to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li><strong>Access:</strong> Request a copy of any personal data we hold about you</li>
                <li><strong>Deletion:</strong> Request deletion of your photos, account and personal data. We may keep order and invoice records where the law requires it</li>
                <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
                <li><strong>Objection:</strong> Object to any processing of your personal data</li>
                <li><strong>Correction:</strong> Request correction of inaccurate personal data</li>
              </ul>
            </div>

            {/* Security */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">6. Data Security</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                We use encrypted HTTPS connections for all uploads and downloads, store data with cloud providers that encrypt it at rest, and limit who on our team can access it. No online service can be completely secure, but we work to protect your data and delete photos quickly.
              </p>
            </div>

            {/* Third-party */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">7. Third-Party Services</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                We use these service providers, and share with each only the data it needs to do its job:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 mt-2">
                <li><strong>Razorpay:</strong> payment processing</li>
                <li><strong>Cloudinary:</strong> storing and delivering photos until they are deleted</li>
                <li><strong>MongoDB Atlas:</strong> our database for accounts, orders and photo records</li>
                <li><strong>Vercel:</strong> website hosting</li>
                <li><strong>Resend:</strong> sending emails such as receipts, invoices and your photos</li>
                <li><strong>Google:</strong> Google sign-in and Google Analytics</li>
                <li><strong>Microsoft Clarity:</strong> site usage analytics</li>
              </ul>
              <p className="text-sm text-gray-600 leading-relaxed mt-2">
                Some of these providers process data outside your country, including in the United States and India.
              </p>
            </div>

            {/* Children */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">8. Children&apos;s Privacy</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our service is not directed to children under 13. Minors applying for visas or passports should have a parent or guardian use the service on their behalf.
              </p>
            </div>

            {/* Changes */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">9. Changes to This Policy</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                We may update this policy from time to time. Significant changes will be communicated through a notice on our website. Continued use of the service after changes constitutes acceptance.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">10. Contact Us</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                For privacy-related questions, data deletion requests, or GDPR/CCPA inquiries, contact us at <a href="mailto:support@pixpassport.com" className="font-semibold text-slate-900 underline">support@pixpassport.com</a>.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mt-2">
                Business address: Khadda, Kushinagar, Uttar Pradesh, India 274802
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Policies & Links */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Related Policies & Resources</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/terms" className="group p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-lime-200 hover:bg-lime-50 transition-all">
              <span className="text-sm font-bold text-slate-900 group-hover:text-lime-700">Terms of Service</span>
              <p className="text-xs text-slate-500 mt-1">Our usage terms and conditions</p>
            </Link>
            <Link href="/refund-policy" className="group p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-lime-200 hover:bg-lime-50 transition-all">
              <span className="text-sm font-bold text-slate-900 group-hover:text-lime-700">Refund Policy</span>
              <p className="text-xs text-slate-500 mt-1">Photo rejection guarantee</p>
            </Link>
            <Link href="/contact" className="group p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-lime-200 hover:bg-lime-50 transition-all">
              <span className="text-sm font-bold text-slate-900 group-hover:text-lime-700">Contact Us</span>
              <p className="text-xs text-slate-500 mt-1">Get in touch with our team</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Back link */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center flex flex-wrap gap-4 justify-center">
          <Link href="/" className="text-sm font-medium text-lime-600 hover:text-lime-700 transition-colors">
            ← Back to Home
          </Link>
          <Link href="/about" className="text-sm font-medium text-lime-600 hover:text-lime-700 transition-colors">
            About Us
          </Link>
          <Link href="/faq" className="text-sm font-medium text-lime-600 hover:text-lime-700 transition-colors">
            FAQ
          </Link>
        </div>
      </section>
    </div>
  );
}
