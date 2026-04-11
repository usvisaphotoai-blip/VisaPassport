"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What are the exact US visa photo requirements?",
    a: "US visa photos must be 600×600 pixels, under 240KB, JPEG format, with a pure white background (RGB 255,255,255). Your eyes must be between 56-69% from the bottom edge, and your head must fill 50-69% of the image height.",
  },
  {
    q: "How does USVisaPhotoAI validate my photo?",
    a: "We run automated checks against all U.S. State Department specifications: dimensions, file size, background color, face detection, eye position, head size, glasses detection, and expression analysis — all in under 5 seconds.",
  },
  {
    q: "Is the validation really free?",
    a: "Yes! Photo validation is 100% free. You only pay $5.99 if you want to download a processed, fully compliant photo.",
  },
  {
    q: "Are my photos safe? What about privacy?",
    a: "Absolutely. All original photos are auto-deleted after 24 hours. Download links expire in 1 hour. We are fully GDPR and CCPA compliant. We never store or share your photos permanently.",
  },
  {
    q: "Can I upload multiple photos at once?",
    a: "You can validate unlimited photos for free. Each paid download covers 1 processed photo at $5.99.",
  },
  { q: "What are the exact US visa photo specs?", a: "600×600 pixels, 1:1 aspect ratio, under 240KB, JPEG format, pure white background (RGB 255,255,255), eyes between 56-69% from bottom, head size 50-69% of image height, neutral expression, no glasses." },
  { q: "Can I wear glasses in my photo?", a: "No. Since November 1, 2016, the U.S. Department of State does not allow glasses in any visa, passport, or immigration photos. This includes prescription glasses, sunglasses, and tinted lenses." },
  { q: "What background color is required?", a: "A pure white background (RGB 255, 255, 255) is required. No visible patterns, shadows, textures, or other people should be in the background." },
  { q: "What expression should I have?", a: "A neutral expression with your mouth closed and both eyes open. No smiling, frowning, or exaggerated expressions." },
  { q: "What does eye position 56-69% mean?", a: "Your eyes must be positioned between 56% and 69% of the total image height, measured from the bottom edge. This ensures proper framing for biometric verification." },
  { q: "What does head size 50-69% mean?", a: "The distance from the crown of your head (top) to your chin (bottom) must be between 50% and 69% of the total image height. This ensures your face fills enough of the frame." },
];

export default function HomeFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="hc-sec">
      <div className="hc-sec-sm">
        <div className="hc-head text-center mb-10">
          <span className="hc-label">Common Questions</span>
          <h2 className="hc-h2">Questions About US Visa & Passport Photo Requirements?</h2>
        </div>
        <div>
          {faqs.map((f, i) => (
            <div
              key={i}
              className={`hc-faq ${openFaq === i ? "hc-faq-open" : ""}`}
            >
              <button
                className="hc-faq-btn"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
              >
                <span className="hc-faq-q">{f.q}</span>
                <span className={`hc-faq-icon ${openFaq === i ? "hc-faq-open" : ""}`}>
                  +
                </span>
              </button>
              <div
                className="hc-faq-body"
                style={{ maxHeight: openFaq === i ? "300px" : "0px" }}
              >
                <p className="hc-faq-txt">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
