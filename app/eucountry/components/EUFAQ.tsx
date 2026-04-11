"use client";

import { useState } from "react";
import type { FAQ } from "../data/types";

interface EUFAQProps {
  faqs: FAQ[];
  title: string;
}

export default function EUFAQ({ faqs, title }: EUFAQProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="eu-sec">
      <div className="eu-sec-sm">
        <div className="eu-head" style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2 className="eu-h2">{title}</h2>
        </div>
        <div>
          {faqs.map((f, i) => (
            <div
              key={i}
              className={`eu-faq ${openFaq === i ? "eu-faq-open" : ""}`}
            >
              <button
                className="eu-faq-btn"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
              >
                <span className="eu-faq-q">{f.q}</span>
                <span className={`eu-faq-icon ${openFaq === i ? "eu-faq-open" : ""}`}>
                  +
                </span>
              </button>
              <div
                className="eu-faq-body"
                style={{ maxHeight: openFaq === i ? "500px" : "0px" }}
              >
                <p className="eu-faq-txt">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
