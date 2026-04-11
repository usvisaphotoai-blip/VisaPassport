import type { ContentSection } from "../data/types";
import DOMPurify from "isomorphic-dompurify";

interface EUContentBodyProps {
  sections: ContentSection[];
}

export default function EUContentBody({ sections }: EUContentBodyProps) {
  return (
    <section className="eu-content">
      <div className="eu-content-in">
        {sections.map((section, si) => (
          <div key={si}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((p, pi) => (
              <p key={pi} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(p) }} />
            ))}

            {section.subSections?.map((sub, subi) => (
              <div key={subi}>
                <h3>{sub.heading}</h3>
                {sub.paragraphs.map((p, pi) => (
                  <p key={pi} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(p) }} />
                ))}

                {sub.details?.map((detail, di) => (
                  <div key={di}>
                    <h4>{detail.heading}</h4>
                    {detail.paragraphs.map((p, pi) => (
                      <p key={pi} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(p) }} />
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
