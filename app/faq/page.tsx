"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getLocalPrice } from "@/lib/currency";

const getCategories = (price: string) => [
  {
    name: "General",
    faqs: [
      { q: "What is PixPassport?", a: `PixPassport is a free online photo validation tool that checks your photos against U.S. State Department requirements for visas, passports, green cards, and the DV lottery. You get an instant PASS/FAIL report, and can pay ${price} to download a processed, compliant photo.` },
      { q: "Is the photo validation really free?", a: `Yes! Photo validation is 100% free with no account required. You only pay ${price} if you choose to download a processed, fully compliant photo. You can validate unlimited photos at no cost.` },
      { q: "How accurate is the validation?", a: "Our validation is 100% aligned with U.S. State Department specifications. We check dimensions (600×600px), file size (under 240KB), background color (pure white), face detection, eye position (56-69%), head size (50-69%), glasses detection, and expression analysis." },
      { q: "How long does validation take?", a: "Processing takes under 5 seconds per photo. You'll see your full PASS/FAIL compliance report almost instantly after uploading." },
      { q: "Can I upload multiple photos?", a: `You can validate unlimited photos for free. Each paid download covers 1 processed digital photo plus a A4 size print sheet (20 photos) for ${price}.` },
    ],
  },
  {
    name: "Photo Requirements",
    faqs: [
      { q: "What are the exact US visa photo specs?", a: "600×600 pixels, 1:1 aspect ratio, under 240KB, JPEG format, pure white background (RGB 255,255,255), eyes between 56-69% from bottom, head size 50-69% of image height, neutral expression, no glasses." },
      { q: "Can I wear glasses in my photo?", a: "No. Since November 1, 2016, the U.S. Department of State does not allow glasses in any visa, passport, or immigration photos. This includes prescription glasses, sunglasses, and tinted lenses." },
      { q: "What background color is required?", a: "A pure white background (RGB 255, 255, 255) is required. No visible patterns, shadows, textures, or other people should be in the background." },
      { q: "What expression should I have?", a: "A neutral expression with your mouth closed and both eyes open. No smiling, frowning, or exaggerated expressions." },
      { q: "What does eye position 56-69% mean?", a: "Your eyes must be positioned between 56% and 69% of the total image height, measured from the bottom edge. This ensures proper framing for biometric verification." },
      { q: "What does head size 50-69% mean?", a: "The distance from the crown of your head (top) to your chin (bottom) must be between 50% and 69% of the total image height. This ensures your face fills enough of the frame." },
    ],
  },
  {
    name: "Payment & Downloads",
    faqs: [
      { q: "How much does it cost?", a: `Photo processing and download costs a one-time fee of ${price} per photo — including auto-cropping, resizing, background removal, and file optimization.` },
      { q: "What payment methods are accepted?", a: "We accept all major credit cards, debit cards, and PayPal through our secure payment processor." },
      { q: "Can I get a refund?", a: "If your processed photo is rejected by a government agency, you are eligible for a 50% refund. Contact support@pixpassport.com with your transaction ID and rejection proof within 30 days. The 50% deduction covers non-recoverable server processing costs." },
      { q: "How long are download links valid?", a: "Download links are valid for 1 hour after they are generated. After that, they expire for security. You can generate new links from your dashboard within 24 hours." },
    ],
  },
  {
    name: "Privacy & Security",
    faqs: [
      { q: "Are my photos safe?", a: "Yes. All photos are processed securely using encrypted connections. Original photos are automatically and permanently deleted after 24 hours. We never share, sell, or use your photos for any other purpose." },
      { q: "How long do you store my photos?", a: "Original photos are auto-deleted after 24 hours. Processed photos are removed after download or within 24 hours, whichever comes first. Download links expire after 1 hour." },
      { q: "Are you GDPR compliant?", a: "Yes. We fully comply with GDPR (EU) and CCPA (California) regulations. You can request complete data deletion at any time through our privacy controls." },
      { q: "Do you use my photos for AI training?", a: "Absolutely not. Your photos are used solely for the validation and processing you requested. We never use customer photos for AI training, marketing, or any other purpose." },
    ],
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [priceStr, setPriceStr] = useState("$5.99");
  
  useEffect(() => {
    // If we passed localPrice in props, use it, else fetch on mount
    getLocalPrice(5.99).then(res => setPriceStr(res.formatted));
  }, []);

  const categories = getCategories(priceStr);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Frequently Asked Questions</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about using PixPassport for your US document photos.
          </p>
        </div>
      </section>

      {/* Category tabs + FAQs */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(i)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === i
                    ? "bg-lime-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* FAQ list */}
          <div className="space-y-3">
            {categories[activeCategory].faqs.map((faq, i) => (
              <details key={i} className="bg-white border border-gray-200 rounded-xl group">
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                  <span className="text-sm font-semibold text-slate-900 pr-4">{faq.q}</span>
                  <svg className="w-5 h-5 text-gray-400 shrink-0 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Still have questions? */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Still Have Questions?</h2>
          <p className="text-gray-600 mb-6">Can&apos;t find what you&apos;re looking for? Try the photo validator — it&apos;s free.</p>
          <Link href="/photo-validator" className="inline-block bg-lime-600 text-white hover:bg-lime-700 rounded-lg px-8 py-3 text-sm font-semibold transition-colors">
            Try Photo Validator →
          </Link>
        </div>
      </section>
    </div>
  );
}
