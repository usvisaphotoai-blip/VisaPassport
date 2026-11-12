import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";
import UKDocumentClient from "./UKDocumentClient";
import UKPageFinder from "../uk/components/UKPageFinder";
import { ukDocuments, ukFaqs } from "./data";

const PAGE_URL = "https://www.pixpassport.com/uk-passport-size-photo-maker";
const PAGE_TITLE = "UK Passport Size Photo Maker (35x45mm) – 15 UK ID Documents";
const PAGE_DESCRIPTION =
  "Make a 35x45mm UK passport size photo online for HMPO passports, DVLA driving licences, Railcards, Oyster, BNO and more. Ready in under a minute.";
const DATE_MODIFIED = "2026-10-07";

// Source images are 1536x1024; the OG variant is cropped to 1200x630 JPEG by Cloudinary.
const CLD = "https://res.cloudinary.com/dipzpwbbk/image/upload";
const HERO_IMG = `${CLD}/v1784690540/uk-hero_m4cc8l.webp`;
const OG_IMG = `${CLD}/c_fill,w_1200,h_630,f_jpg,q_auto/v1784690540/uk-hero_m4cc8l.webp`;
const LICENCE_IMG = `${CLD}/v1784690632/uk-driving-licence-example_wk6h56.webp`;
const MISTAKES_IMG = `${CLD}/v1784690775/uk-photo-mistakes_g0kywo.webp`;
const IMG_SIZES = "(max-width: 896px) 100vw, 896px";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "en-GB": PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "UK Passport & Document Photo Maker | PixPassport",
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "PixPassport",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: OG_IMG,
        width: 1200,
        height: 630,
        alt: "Compliant UK passport, driving licence and ID card photos made with PixPassport",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UK Passport & Document Photo Maker | PixPassport",
    description: PAGE_DESCRIPTION,
    images: [OG_IMG],
  },
};

const relatedLinks = [
  { href: "/uk", label: "UK passport photo tool", desc: "HMPO passport and visa photos with an instant compliance check." },
  { href: "/uk-passport-photo-checker-online-free", label: "Free UK passport photo checker", desc: "Test an existing photo against HMPO rules before you apply." },
  { href: "/uk/photo-for-driving-license-uk", label: "UK driving licence photo", desc: "DVLA photo rules for new and renewed licences." },
  { href: "/uk/uk-child-passport-photo", label: "UK child passport photo", desc: "Rules for babies and children, including mouth-open exceptions." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.pixpassport.com/#organization",
      name: "PixPassport",
      url: "https://www.pixpassport.com/",
      logo: "https://www.pixpassport.com/logo.png",
    },
    {
      "@type": "WebSite",
      "@id": "https://www.pixpassport.com/#website",
      name: "PixPassport",
      url: "https://www.pixpassport.com/",
      publisher: { "@id": "https://www.pixpassport.com/#organization" },
    },
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      inLanguage: "en-GB",
      dateModified: DATE_MODIFIED,
      isPartOf: { "@id": "https://www.pixpassport.com/#website" },
      breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
      primaryImageOfPage: { "@type": "ImageObject", url: HERO_IMG, width: 1536, height: 1024 },
    },
    {
      "@type": "WebApplication",
      "@id": `${PAGE_URL}#app`,
      name: "UK Passport & Document Photo Maker",
      url: PAGE_URL,
      description: PAGE_DESCRIPTION,
      applicationCategory: "PhotographyApplication",
      operatingSystem: "All",
      browserRequirements: "Requires JavaScript",
      inLanguage: "en-GB",
      publisher: { "@id": "https://www.pixpassport.com/#organization" },
      offers: {
        "@type": "Offer",
        price: "6.99",
        priceCurrency: "GBP",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: ukFaqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.pixpassport.com/" },
        { "@type": "ListItem", position: 2, name: "UK Passport Size Photo Maker", item: PAGE_URL },
      ],
    },
  ],
};

export default function UKPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Breadcrumbs items={[{ label: "UK Passport Size Photo Maker", href: "/uk-passport-size-photo-maker" }]} />
      <div className="min-h-screen bg-white pb-12 pt-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-10">
            <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              UK Passport Size Photo Maker for Passports, Licences &amp; ID Cards
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Create a compliant 35 × 45mm photo for any United Kingdom government ID, from passports and driving licences to Railcards and Oyster cards, in under a minute.
            </p>
          </header>

          <UKDocumentClient />

          <article className="mt-16 prose prose-slate max-w-none prose-headings:font-semibold prose-a:text-lime-700">
            <h2 className="text-2xl font-semibold text-slate-900 mt-0">
              UK passport and document photos, sized right the first time
            </h2>

            <figure className="my-8 rounded-xl overflow-hidden border border-slate-200">
              <Image
                src={HERO_IMG}
                alt="Collage of compliant UK passport, driving licence, and ID card photos"
                width={1536}
                height={1024}
                sizes={IMG_SIZES}
                className="w-full h-auto object-cover m-0"
              />
              <figcaption className="text-sm text-center text-slate-500 mt-2 px-4 pb-2">
                Generate compliant photos for all official UK documents instantly.
              </figcaption>
            </figure>

            <p className="text-slate-700 leading-relaxed">
              Every official document in the United Kingdom that carries a photo has its own size, background, and pose rules. Get one detail wrong and <a href="https://www.gov.uk/government/organisations/hm-passport-office" target="_blank" rel="noopener noreferrer">HMPO</a>, the <a href="https://www.gov.uk/government/organisations/driver-and-vehicle-licensing-agency" target="_blank" rel="noopener noreferrer">DVLA</a>, or your local council can reject the application outright, costing you the fee and another trip to a photo booth. This tool builds a compliant photo for fifteen UK documents from a single upload, so you crop, check, and download once instead of guessing at a printer.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900">Why the photo trips up so many applications</h2>
            <p className="text-slate-700 leading-relaxed">
              Photo booths are built for one shot, not for fifteen different documents. A background that passes for a passport photo can be too dark for a driving licence, and a crop that suits a printed 35 × 45mm card is the wrong shape for a digital Oyster upload. Each UK issuer, <a href="https://www.gov.uk/photos-for-passports" target="_blank" rel="noopener noreferrer">HMPO</a>, the <a href="https://www.gov.uk/renew-driving-licence" target="_blank" rel="noopener noreferrer">DVLA</a>, Transport for London, local councils, and the police, checks the photo before it looks at anything else in an application. Getting that one detail wrong is the single most common reason a first attempt bounces back, so it pays to solve it before you submit anything. If you already have a photo, run it through our <Link href="/uk-passport-photo-checker-online-free">free UK passport photo checker</Link> first.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900">Every UK document we support</h2>
            <p className="text-slate-700 leading-relaxed">
              Most UK identity and travel documents share the same 35 × 45mm photo format, the same size HMPO uses for the passport. A handful, like the Oyster photocard, the bus pass, and the online passport application, only need a digital upload rather than a print. The table below covers everything you can create here.
            </p>
            <div className="overflow-x-auto not-prose my-6">
              <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                <caption className="sr-only">UK documents and their required photo format</caption>
                <thead>
                  <tr className="bg-slate-50 text-left">
                    <th scope="col" className="p-3 font-semibold text-slate-900 border-b border-slate-200">Document</th>
                    <th scope="col" className="p-3 font-semibold text-slate-900 border-b border-slate-200">Photo format</th>
                  </tr>
                </thead>
                <tbody>
                  {ukDocuments.map((doc, i) => (
                    <tr key={doc.id} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                      <td className="p-3 text-slate-700 border-b border-slate-100">{doc.label}</td>
                      <td className="p-3 text-slate-700 border-b border-slate-100">{doc.size}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-semibold text-slate-900">UK passport photos: online and offline</h2>
            <p className="text-slate-700 leading-relaxed">
              HMPO runs two application routes, and each expects a different file. The <strong>online passport</strong> service uploads a digital photo directly into your application, so it checks lighting, framing, and background as a JPEG. The <strong>offline passport</strong> route, used for paper applications and renewals by post, needs a printed 35 × 45mm photo signed by a countersignatory on the back. Our tool produces both: a print-ready file for the paper form, and a correctly cropped digital file for the online portal, from the same source photo. Applying for a baby or young child? See the <Link href="/uk/uk-child-passport-photo">UK child passport photo rules</Link>.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900">Driving licence, ID cards, and BNO passports</h2>
            <p className="text-slate-700 leading-relaxed">
              A <strong>UK driving licence</strong> photo follows the same 35 × 45mm spec as the passport, which is why one good photo can usually serve both applications (our <Link href="/uk/photo-for-driving-license-uk">UK driving licence photo guide</Link> covers the DVLA specifics). The same format covers the <strong>UK BNO passport</strong> for British National (Overseas) status holders, and the <strong>UK ID or residence card</strong>, where a plain background and neutral expression matter as much as the crop itself. Uniforms, sunglasses, and heavy shadows are the most common reasons these get sent back, so the tool checks for a plain backdrop and even lighting before it exports your image.
            </p>

            <figure className="my-8 rounded-xl overflow-hidden border border-slate-200">
              <Image
                src={LICENCE_IMG}
                alt="Correct photo specifications for a UK driving licence and BNO passport"
                width={1536}
                height={1024}
                sizes={IMG_SIZES}
                className="w-full h-auto object-cover m-0"
              />
              <figcaption className="text-sm text-center text-slate-500 mt-2 px-4 pb-2">
                A compliant UK driving licence photo using standard 35 × 45mm framing.
              </figcaption>
            </figure>

            <h2 className="text-2xl font-semibold text-slate-900">Travelcards and passes: Oyster, Freedom, and Railcard</h2>
            <p className="text-slate-700 leading-relaxed">
              London&apos;s <strong>Oyster travel photocard</strong> and the <strong>Bus pass online form</strong> both take a digital upload rather than a printed photo, which makes framing the single thing that trips people up. The <strong>London Freedom pass</strong>, offered to older and disabled residents for free travel, uses the standard 35 × 45mm crop, as does the <strong>UK Railcard</strong>, needed for discounted rail fares, and the <strong>UK Leisure pass</strong>, issued by local councils for subsidised access to sports and leisure centres. Upload once, pick the pass you need, and the crop adjusts automatically.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900">Firearms, boat, and seaman&apos;s documents</h2>
            <p className="text-slate-700 leading-relaxed">
              Specialist licences are held to the same photo standard as a passport, and they&apos;re just as easy to get rejected. <strong>UK BASC firearms and shotgun licensing</strong> photos go to the police alongside your certificate application, so the pose and background rules are strict. A <strong>UK boat licence</strong> photo, required for some inland waterway and coastal licences, follows the same 35 × 45mm rule. Mariners applying for a <strong>British Seaman&apos;s card</strong> or a <strong>British Seaman&apos;s discharge book</strong> need a photo that meets Merchant Navy identification standards, which again map to the standard passport crop.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900">School cards and other everyday documents</h2>
            <p className="text-slate-700 leading-relaxed">
              Not every UK document is a government form. A <strong>UK school card</strong>, used for identification, library access, or discounted entry, still asks for a clean 35 × 45mm photo so it prints clearly on the card stock schools use. The same principles apply here as everywhere else on this list: plain background, even lighting, and a neutral expression looking straight at the camera.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900">Common mistakes that get UK photos rejected</h2>
            <ul className="text-slate-700 leading-relaxed list-disc pl-5 space-y-2">
              <li><strong>Busy or shadowed backgrounds.</strong> HMPO and the DVLA both want a plain, light-coloured background with no visible texture, furniture, or shadow behind the head.</li>
              <li><strong>Wrong file size or shape.</strong> A photo cropped for a passport at 35 × 45mm is the wrong ratio for a digital Oyster or bus pass upload, which expects a different aspect and file size.</li>
              <li><strong>Head too small or too large in the frame.</strong> HMPO expects the face to fill roughly 29-34mm of the 45mm height; too far back or too close and the photo is rejected on framing alone.</li>
              <li><strong>Glasses, hats, or heavy makeup.</strong> Tinted glasses, headwear without a religious or medical reason, and heavy shadowing across the face are among the most common reasons UK photo ID gets sent back.</li>
              <li><strong>Old photos reused across documents.</strong> A photo older than a few months, or one already used on an existing document, is often rejected for a fresh application, even if it still looks like you.</li>
            </ul>
            <p className="text-slate-700 leading-relaxed">
              Our tool checks framing, background, and proportions against the rules for whichever document you select, so these issues get caught before you download the photo, not after your application has already been submitted and rejected.
            </p>

            <figure className="my-8 rounded-xl overflow-hidden border border-slate-200">
              <Image
                src={MISTAKES_IMG}
                alt="Examples of common mistakes in UK passport photos including bad lighting, shadows, and improper cropping"
                width={1536}
                height={1024}
                sizes={IMG_SIZES}
                className="w-full h-auto object-cover m-0"
              />
              <figcaption className="text-sm text-center text-slate-500 mt-2 px-4 pb-2">
                Common rejection reasons: busy backgrounds, uneven lighting, and incorrect cropping.
              </figcaption>
            </figure>

            <h2 className="text-2xl font-semibold text-slate-900">A faster alternative to the photo booth</h2>
            <p className="text-slate-700 leading-relaxed">
              A high-street photo booth or chemist typically prints one fixed format, charges per visit, and can&apos;t adjust the crop if you decide to apply for a second document later. Uploading a photo here instead means you keep one source image and generate a compliant version for any of the fifteen UK documents above, at any time, without a second trip out. It also removes the guesswork around lighting and background that causes most booth photos to fail on a first submission.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900">How the photo maker works</h2>
            <ol className="text-slate-700 leading-relaxed list-decimal pl-5 space-y-2">
              <li><strong>Pick your document.</strong> Choose from all fifteen UK document types above, from passports to railcards.</li>
              <li><strong>Upload one photo.</strong> Drag in a phone photo or a webcam shot; no studio setup needed.</li>
              <li><strong>Download or print.</strong> The tool crops, sizes, and checks your photo against the document&apos;s rules in under a minute.</li>
            </ol>

            <h2 className="text-2xl font-semibold text-slate-900">Frequently asked questions</h2>
            <div className="not-prose divide-y divide-slate-200 border-t border-b border-slate-200 my-6">
              {ukFaqs.map((f) => (
                <details key={f.q} className="group py-4">
                  <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
                    <h3 className="text-base font-medium">{f.q}</h3>
                    <span aria-hidden="true" className="ml-4 text-lime-700 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-2 text-slate-600 text-sm leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>

            <h2 className="text-2xl font-semibold text-slate-900">Get your photo right, first time</h2>
            <p className="text-slate-700 leading-relaxed">
              Whichever UK document you&apos;re applying for, the photo rules exist to keep identification consistent, not to slow you down. Choose your document type above, upload a photo, and let the tool handle the crop, size, and background check, so your application moves forward on the first try.
            </p>
          </article>

          <UKPageFinder current="/uk-passport-size-photo-maker" />

          <nav aria-labelledby="related-uk-tools" className="mt-12">
            <h2 id="related-uk-tools" className="text-xl font-semibold text-slate-900 mb-4">Related UK photo tools</h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {relatedLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="block h-full rounded-xl border border-slate-200 p-4 hover:border-lime-500 transition-colors">
                    <span className="block font-medium text-slate-900">{l.label}</span>
                    <span className="block text-sm text-slate-600 mt-1">{l.desc}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
