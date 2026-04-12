"use client";

import { useState } from "react";

interface FAQ {
  q: string;
  a: string;
}

const defaultFaqs: FAQ[] = [
  {
    q: "Is the validation really free?",
    a: "Yes! Photo validation is 100% free for all supported countries. You only pay a small fee if you want to download the processed, fully compliant photo and home-printable sheet.",
  },
  {
    q: "Are my photos safe? What about privacy?",
    a: "Absolutely. All original photos are automatically and permanently deleted after 24 hours. Download links expire after 1 hour. We are fully GDPR and CCPA compliant.",
  },
];

const passportFaqs: FAQ[] = [
  {
    q: "What is a biometric passport photo?",
    a: "A biometric photo is designed for facial recognition systems. It requires specific head sizing (usually 70-80% of the frame), neutral expressions, and no shadows to ensure it can be digitally scanned by border control.",
  },
  {
    q: "Can I print these at home?",
    a: "Yes. Our tool generates a standard 4x6 inch (10x15cm) printable sheet containing multiple copies of your passport photo, perfectly sized and ready for any photo printer.",
  },
  ...defaultFaqs
];

const visaFaqs: FAQ[] = [
  {
    q: "Will this work for my DS-160 digital upload?",
    a: "Yes. Our tool is specifically optimized for US DS-160 and other global eVisa portals. We ensure the file size is under the KB limit and the resolution meets the mandatory pixel requirements.",
  },
  {
    q: "What is a 'Consular Quality Alert'?",
    a: "This is a warning given by embassy portals when a photo has poor lighting or incorrect background color. Our AI pre-validates your photo to ensure you never see this alert.",
  },
  ...defaultFaqs
];

export default function HomeFAQ({ type, customFaqs }: { type?: "passport" | "visa", customFaqs?: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const displayFaqs = customFaqs || (type === "visa" ? visaFaqs : (type === "passport" ? passportFaqs : defaultFaqs));

  return (
    <section className="hc-sec">
      <div className="hc-sec-sm">
        <div className="hc-head text-center mb-10">
          <span className="hc-label">Common Questions</span>
          <h2 className="hc-h2">Frequently Asked Questions</h2>
        </div>
        <div>
          {displayFaqs.map((f, i) => (
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
