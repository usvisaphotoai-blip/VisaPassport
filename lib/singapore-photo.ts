// Shared facts + JSON-LD for the hand-built Singapore pages.
//
// Keyword ownership (keep it this way to avoid cannibalisation):
//   /singapore-passport-photo        → "singapore passport photo", maker / online / size  (hub)
//   /singapore-ica-photo             → "ICA photo requirements", ICA photo guidelines, NRIC / IC photo
//   /resize-passport-photo-singapore → resize / convert / 400x514 pixels
//   /singapore-visa-photo-editor     → Singapore visa (SAVE) photo  (programmatic [slug] page)
// /singapore-passport-photo-editor 301s to the hub (see next.config.ts).
//
// Only facts stated on ica.gov.sg go in ICA_FACTS. Re-check them before editing:
//   https://www.ica.gov.sg/photo-guidelines
//   https://www.ica.gov.sg/documents/passport/apply

const SITE = "https://www.pixpassport.com";

export const ICA_SOURCES = {
  photoGuidelines: "https://www.ica.gov.sg/photo-guidelines",
  passportApply: "https://www.ica.gov.sg/documents/passport/apply",
};

export const ICA_FACTS = {
  uploadPx: "400 × 514 pixels",
  fileTypes: "JPG, JPEG, HEIC, HEIF or PNG",
  maxFileSize: "8 MB",
  recency: "taken within the last three months",
  printFinish: "matte or semi-matte (non-reflective) paper",
};

// Used by the photo tool CTA on every Singapore page
export const SG_TOOL_HREF = "/passport-photo-online?type=singapore-passport";

export const SG_OG_IMAGE = {
  url: "https://res.cloudinary.com/dipzpwbbk/image/upload/c_fill,w_1200,h_630,g_face,f_jpg,q_auto/v1785679206/icao_visa_photo_example_whvfqt.jpg",
  width: 1200,
  height: 630,
};

export const SG_HUB = { name: "Singapore Passport Photo", url: `${SITE}/singapore-passport-photo` };

type Crumb = { name: string; url: string };
type Faq = { q: string; a: string };

/**
 * One coherent @graph per page: Organization + WebSite are referenced by @id so they
 * are the same entity on every page; WebApplication is the shared photo tool.
 */
export function buildSingaporeJsonLd({
  url,
  name,
  description,
  dateModified,
  crumbs,
  faqs,
  includeTool = false,
}: {
  url: string;
  name: string;
  description: string;
  dateModified: string;
  crumbs: Crumb[];
  faqs: Faq[];
  includeTool?: boolean;
}) {
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "PixPassport",
      url: `${SITE}/`,
      logo: `${SITE}/logo.png`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      name: "PixPassport",
      url: `${SITE}/`,
      publisher: { "@id": `${SITE}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name,
      description,
      inLanguage: "en-SG",
      dateModified,
      isPartOf: { "@id": `${SITE}/#website` },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      primaryImageOfPage: { "@type": "ImageObject", url: SG_OG_IMAGE.url },
      citation: [ICA_SOURCES.photoGuidelines, ICA_SOURCES.passportApply],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [{ name: "Home", url: `${SITE}/` }, ...crumbs].map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: c.url,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  if (includeTool) {
    graph.push({
      "@type": "WebApplication",
      "@id": `${SITE}/passport-photo-online#singapore`,
      name: "PixPassport Singapore Passport Photo Tool",
      url: `${SITE}${SG_TOOL_HREF}`,
      applicationCategory: "PhotographyApplication",
      operatingSystem: "All",
      browserRequirements: "Requires JavaScript",
      publisher: { "@id": `${SITE}/#organization` },
      offers: { "@type": "Offer", price: "6.99", priceCurrency: "SGD" },
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

// Escape "<" so content can never close the surrounding <script> tag
export function toJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
