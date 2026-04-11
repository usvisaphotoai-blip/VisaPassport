"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What are the common passport photo requirements?",
    a: "Requirements vary by country. Common standards include specific dimensions (e.g. 35x45mm or 600x600px), a plain background (white, off-white, or light gray), a neutral expression with mouth closed, and eyes positioned within a specific percentage of the photo height.",
  },
  {
    q: "How does the AI validate my photo for different countries?",
    a: "Our system contains a database of specifications for over 50 countries. When you select a document, the AI runs automated checks against those specific rules for dimensions, head size, eye level, background color, and lighting uniformity.",
  },
  {
    q: "Is the validation really free?",
    a: "Yes! Photo validation is 100% free for all supported countries. You only pay a small fee if you want to download the processed, fully compliant photo and home-printable sheet.",
  },
  {
    q: "Are my photos safe? What about privacy?",
    a: "Absolutely. All original photos are automatically and permanently deleted after 24 hours. Download links expire after 1 hour. We are fully GDPR and CCPA compliant and never share your data.",
  },
  {
    q: "What if my country is not listed?",
    a: "We support the top 50+ most requested countries. If yours is missing, you can use our 'Custom' mode to set your own dimensions. We are constantly adding new country specifications to our database.",
  },
  {
    q: "Can I wear glasses in my photo?",
    a: "It depends on the country. For US visas and passports, glasses are strictly prohibited. For many other countries, they are allowed if the frames don't obscure the eyes and there is no glare. We recommend removing them to ensure acceptance.",
  },
  {
    q: "What background color do I need?",
    a: "Most countries require a pure white or light gray background. Our tool includes an automatic background removal and replacement feature to ensure you meet the exact color requirement for your selected document.",
  },
];

export default function HomeFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="hc-sec">
      <div className="hc-sec-sm">
        <div className="hc-head text-center mb-10">
          <span className="hc-label">Common Questions</span>
          <h2 className="hc-h2">Frequently Asked Questions about Global Passport Photos</h2>
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
