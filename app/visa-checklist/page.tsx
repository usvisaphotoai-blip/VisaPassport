import type { Metadata } from "next";
import Link from "next/link";
import { getAllVisaCountries } from "@/lib/visa-checklist";
import VisaDocumentAuditHero from "./components/VisaDocumentAuditHero";
import VisaChecklistDirectoryClient from "./components/VisaChecklistDirectoryClient";
import FaqAccordion from "@/app/components/FaqAccordion";

const APP_URL = "https://www.pixpassport.com";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Visa Document Checklist 2026: Documents by Country",
  description:
    "Free visa document checklists for the UK, US, Canada and France: documents every application needs, fees, processing times, photo specs and refusal reasons.",
  alternates: {
    canonical: `${APP_URL}/visa-checklist`,
    languages: {
      en: `${APP_URL}/visa-checklist`,
      "x-default": `${APP_URL}/visa-checklist`,
    },
  },
  openGraph: {
    title: "Visa Document Checklist 2026: Documents by Country | PixPassport",
    description:
      "The documents every visa application needs, plus fees, processing times and photo specs for the UK, US, Canada and France.",
    url: `${APP_URL}/visa-checklist`,
    siteName: "PixPassport",
    images: [
      {
        url: `${APP_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Visa document checklist 2026 - PixPassport",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visa Document Checklist 2026: Documents by Country | PixPassport",
    description:
      "The documents every visa application needs, plus fees, processing times and photo specs by country.",
    images: [`${APP_URL}/og-image.jpg`],
  },
};

const LAST_UPDATED = "2026-11-24";
const LAST_UPDATED_LABEL = "24 November 2026";

/** Documents that almost every visitor visa application asks for. Kept generic: the country checklist is the authority. */
const CORE_DOCUMENTS = [
  {
    title: "Valid passport",
    body: "Check the validity rule for your destination. Schengen: valid at least 3 months after you leave, issued in the last 10 years, with 2 blank pages. US: usually valid 6 months beyond your stay unless your country is exempt. UK: valid for your whole stay.",
  },
  {
    title: "Completed application form",
    body: "Usually filled in online: the DS-160 for the US, the GOV.UK form for the UK, the IRCC portal for Canada and France-Visas for France. Print the confirmation page if your checklist asks for it.",
  },
  {
    title: "Passport or visa photo",
    body: "Sizes differ: 35 x 45 mm for Schengen visas and 2 x 2 in (51 x 51 mm) for the US. For some visas, such as the UK visitor visa, your photo is taken with your fingerprints at the visa centre.",
  },
  {
    title: "Proof of funds",
    body: "Bank statements, commonly for the last 3 to 6 months, showing enough money for the trip. Explain any large or unusual deposits, and add a sponsor letter if someone else is paying.",
  },
  {
    title: "Proof of employment, study or business",
    body: "An employer letter confirming your job, salary and approved leave, plus recent payslips. Students add an enrolment letter; business owners add company registration and tax returns.",
  },
  {
    title: "Travel itinerary and accommodation",
    body: "Flight reservations and hotel bookings, or an invitation letter from your host. Avoid paying for non-refundable tickets before your visa is approved.",
  },
  {
    title: "Travel insurance",
    body: "Required for Schengen visas: at least €30,000 of medical cover valid across the Schengen Area for your whole stay. Not required for UK, US or Canadian visitor visas, but recommended.",
  },
  {
    title: "Ties to your home country",
    body: "Evidence that you will return: a job, property, family, studies or a return booking. This matters most for visas where officers must be satisfied you will leave on time.",
  },
  {
    title: "Cover letter",
    body: "A short letter explaining the purpose of the trip, your dates, where you will stay and who is paying. Make sure every date matches your bookings and form.",
  },
  {
    title: "Travel history and previous refusals",
    body: "Old passports and previous visas help show a good travel record. If you were ever refused a visa, declare it and include the refusal letter.",
  },
  {
    title: "Translations",
    body: "Documents not in the language your destination accepts usually need a certified translation. Check whether originals, copies or both are required.",
  },
  {
    title: "Fee receipt and appointment confirmation",
    body: "Proof that you paid the visa fee and booked your biometrics or interview appointment, if your application needs one.",
  },
];

const REFUSAL_REASONS = [
  {
    title: "Not enough funds, or unexplained deposits",
    body: "A balance that does not cover the trip, or a large deposit just before applying with no explanation.",
  },
  {
    title: "Purpose of the trip is unclear",
    body: "Vague plans, no itinerary or a cover letter that does not match the bookings make it hard to show a genuine visit.",
  },
  {
    title: "Weak ties to home",
    body: "Little evidence of a job, studies, family or property that you will return to after the trip.",
  },
  {
    title: "Inconsistent information",
    body: "Names, dates or employer details that differ between the form, bank statements, letters and bookings.",
  },
  {
    title: "Missing or unreadable documents",
    body: "A missing mandatory document, a blurry scan or a file in the wrong format can lead to delays or refusal.",
  },
  {
    title: "Not declaring past refusals",
    body: "Hiding a previous refusal or immigration problem can lead to refusal and, in some countries, a ban on future applications.",
  },
  {
    title: "Photo does not meet the rules",
    body: "Wrong size or head height, shadows, a coloured background or glasses where they are not allowed.",
  },
];

const OFFICIAL_SOURCES = [
  { label: "UK: Visit the UK as a Standard Visitor (GOV.UK)", href: "https://www.gov.uk/standard-visitor" },
  { label: "UK: Visitor visa guide to supporting documents (GOV.UK)", href: "https://www.gov.uk/government/publications/visitor-visa-guide-to-supporting-documents" },
  { label: "US: Visitor visa (U.S. Department of State)", href: "https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html" },
  { label: "Canada: Apply for a visitor visa (IRCC)", href: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/apply-visitor-visa.html" },
  { label: "France: Official visa website (France-Visas)", href: "https://france-visas.gouv.fr" },
];

const GLOBAL_FAQS = [
  {
    q: "What documents are required for a tourist visa?",
    a: "Most tourist visa applications need a valid passport, a completed application form, a photo that meets the country's rules, proof of funds such as recent bank statements, proof of employment or studies, a travel itinerary with accommodation, and evidence that you will return home. Schengen visas also need travel insurance with at least €30,000 of medical cover. The exact list depends on the country, the visa type and your nationality, so always use the checklist for your destination.",
  },
  {
    q: "How many months of bank statements do I need for a visa?",
    a: "Most embassies ask for the last 3 to 6 months of bank statements. Check the checklist for your destination and visa centre, as some ask for a specific period. The statements should show a steady balance that covers your trip, and any large or unusual deposits should be explained.",
  },
  {
    q: "Is travel insurance mandatory for a visa?",
    a: "It is mandatory for a Schengen short-stay visa, such as a France tourist visa: you need at least €30,000 of medical cover valid across the Schengen Area for the whole trip. It is not required for UK, US or Canadian visitor visas, although it is strongly recommended.",
  },
  {
    q: "How long does a visa take to process?",
    a: "It varies by country and time of year. A UK Standard Visitor visa is usually decided within 3 weeks of your biometrics appointment. A Schengen visa is usually decided within 15 days of your appointment, and can take up to 45 days. US visa timing depends mostly on the interview wait at your consulate. Each checklist above shows the current processing time.",
  },
  {
    q: "How early should I apply for a visa?",
    a: "Apply as early as the rules allow. You can apply for a Schengen visa up to 6 months before your trip and no later than 15 days before. You can apply for a UK visitor visa up to 3 months before you travel. For a US visa, check the interview wait at your consulate first, as it can be months.",
  },
  {
    q: "Should I book flights before applying for a visa?",
    a: "Use flight reservations or refundable bookings rather than paid, non-refundable tickets. Most embassies want to see your planned dates, but your visa could be refused or delayed, and the US Department of State advises not to buy tickets until you have your visa.",
  },
  {
    q: "What is the difference between a checklist and the PixPassport document audit?",
    a: "A checklist tells you which documents to prepare. The audit looks at the files you have, flags what is missing, and points out common problems such as unreadable scans, mismatched dates or names, and photos that do not meet the size rules. It is a pre-check to help you fix problems before you apply. The embassy or visa office always makes the final decision.",
  },
  {
    q: "Why do visa photos get rejected?",
    a: "The most common reasons are the wrong size or head height, shadows on the face or background, a background that is not plain and light, glasses or reflections, and photos that are too old or edited. Each country has its own rules: for example, 35 x 45 mm for Schengen visas and 2 x 2 in for US visas.",
  },
  {
    q: "Can I print or save a checklist for my appointment?",
    a: "Yes. Each country checklist has a tracker where you can tick off documents and use Print / Save PDF to take a copy to your visa application centre, such as VFS Global, TLScontact or BLS.",
  },
];

export default async function VisaChecklistHubPage() {
  const countries = getAllVisaCountries();
  const visaRows = countries.flatMap((country) =>
    (country.availableVisas ?? []).map((visa) => ({ country, visa })),
  );

  // JSON-LD: WebPage + ItemList Schema
  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Visa Document Checklist 2026: Documents by Country",
    description: "The documents every visa application needs, with fees, processing times and photo specs for the UK, US, Canada and France.",
    url: `${APP_URL}/visa-checklist`,
    dateModified: LAST_UPDATED,
    publisher: {
      "@type": "Organization",
      name: "PixPassport",
      url: APP_URL,
      logo: {
        "@type": "ImageObject",
        url: `${APP_URL}/icon.png`,
      },
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: countries.map((country, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${country.name} Visa Document Checklist`,
        url: `${APP_URL}/visa-checklist/${country.slug}`,
      })),
    },
  };

  // JSON-LD: Breadcrumbs Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: APP_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Visa Checklists",
        item: `${APP_URL}/visa-checklist`,
      },
    ],
  };

  // JSON-LD: FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: GLOBAL_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-white text-slate-900">
        {/* ── Hero ── */}
        <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-16 sm:pt-12 sm:pb-24">
          <div className="max-w-6xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-10">
              <ol className="flex items-center gap-2 text-sm text-slate-500">
                <li>
                  <Link href="/" className="hover:text-slate-900 transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-slate-300">/</li>
                <li className="text-slate-900">Visa Checklists</li>
              </ol>
            </nav>

            <VisaDocumentAuditHero />
          </div>
        </header>

        {/* ── Core documents ── */}
        <section aria-labelledby="core-documents" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-slate-100">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mb-10">
              <h2 id="core-documents" className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                Documents almost every visa application needs
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Most tourist and visitor visas ask for the same core documents. The details change by country, visa type and nationality,
                so use this list to start, then follow the checklist for your destination.
              </p>
            </div>
            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CORE_DOCUMENTS.map((doc, i) => (
                <li key={doc.title} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-5">
                  <span className="inline-flex w-7 h-7 shrink-0 items-center justify-center rounded-full bg-lime-100 text-lime-800 text-xs font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{doc.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{doc.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Why not a generic list ── */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-slate-50 border-y border-slate-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-3">
              A list tells you what to bring. We check what you have.
            </h2>
            <p className="text-slate-600 text-center max-w-xl mx-auto mb-10">
              Official requirements are free. The hard part is knowing whether your own files meet them.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white border border-slate-200">
                <p className="text-sm font-medium text-slate-500 mb-3">Generic checklist</p>
                <p className="text-lg text-slate-700 mb-4">&ldquo;Here are the documents you may need.&rdquo;</p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  You still have to guess whether your bank balance, photo size or employer letter wording is right.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-lime-300 ring-4 ring-lime-500/10">
                <p className="text-sm font-medium text-lime-700 mb-3">PixPassport audit</p>
                <p className="text-lg text-slate-900 font-medium mb-4">
                  &ldquo;Here is what you have, what&apos;s missing, and what needs fixing.&rdquo;
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Photo checks, document quality, date and name consistency, and missing items flagged before you submit.
                </p>
              </div>
            </div>
          </div>
        </section>

        <main className="px-4 sm:px-6 lg:px-8">
          {/* ── Country directory ── */}
          <section id="country-directory" className="max-w-6xl mx-auto py-16 sm:py-24 scroll-mt-20">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">Choose your destination</h2>
              <p className="text-slate-600">
                Document checklists, fees, processing times and photo specs for {countries.length} countries, with more being added.
              </p>
            </div>

            <VisaChecklistDirectoryClient countries={countries} />
          </section>

          {/* ── Fees and processing times ── */}
          {visaRows.length > 0 && (
            <section aria-labelledby="compare-visas" className="max-w-6xl mx-auto pb-16 sm:pb-20">
              <h2 id="compare-visas" className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                Visa fees and processing times by country
              </h2>
              <p className="text-slate-600 mb-6 max-w-3xl">
                A quick comparison of the visas we cover. Fees and times change, so confirm them on the official site before you pay.
              </p>
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">Visa fees, processing times and official authorities by country</caption>
                  <thead className="bg-slate-50 text-slate-700">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold">Visa</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Fee</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Processing time</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Apply through</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {visaRows.map(({ country, visa }) => (
                      <tr key={`${country.slug}/${visa.slug}`} className="align-top">
                        <th scope="row" className="px-4 py-3 font-semibold text-slate-900 min-w-48">
                          <Link href={`/visa-checklist/${country.slug}/${visa.slug}`} className="hover:text-lime-700">
                            <span aria-hidden="true">{country.flag}</span> {visa.title}
                          </Link>
                        </th>
                        <td className="px-4 py-3 text-slate-600 min-w-48">{visa.fee}</td>
                        <td className="px-4 py-3 text-slate-600 min-w-48">{visa.processingTime}</td>
                        <td className="px-4 py-3 text-slate-600 min-w-40">
                          {country.authorityUrl ? (
                            <a href={country.authorityUrl} target="_blank" rel="noopener noreferrer" className="text-lime-700 hover:text-lime-800 font-medium">
                              {country.authorityName}
                            </a>
                          ) : (
                            country.authorityName
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* ── Refusal reasons ── */}
          <section aria-labelledby="refusal-reasons" className="max-w-6xl mx-auto py-16 sm:py-20 border-t border-slate-100">
            <div className="max-w-3xl mb-10">
              <h2 id="refusal-reasons" className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                Common reasons visa applications are refused or delayed
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Most problems are avoidable. Check your documents for these before you submit.
              </p>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
              {REFUSAL_REASONS.map((reason) => (
                <li key={reason.title} className="flex gap-3">
                  <span aria-hidden="true" className="mt-0.5 text-red-600 font-bold">✕</span>
                  <div>
                    <h3 className="font-semibold text-slate-900">{reason.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{reason.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                href="/visa-checklist/audit"
                className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors"
              >
                Check my documents for these problems
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </section>

          {/* ── 4 steps ── */}
          <section className="max-w-6xl mx-auto py-16 sm:py-20 border-t border-slate-100">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-12">
              How to prepare your application
            </h2>

            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              {[
                {
                  title: "Pick your visa",
                  body: "Choose the country and visa category: tourist, student, business, work or super visa.",
                },
                {
                  title: "Check your finances",
                  body: "Six months of bank statements, explained large deposits, and recent tax returns.",
                },
                {
                  title: "Get the photo right",
                  body: "Size, head height and background must match the consulate's exact rules.",
                },
                {
                  title: "Print and submit",
                  body: "Tick off each document, save your checklist as PDF and bring it to your appointment.",
                },
              ].map((step, i) => (
                <li key={step.title}>
                  <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-slate-900 text-white text-sm font-semibold mb-4">
                    {i + 1}
                  </span>
                  <h3 className="font-semibold mb-1.5">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.body}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* ── Photo CTA ── */}
          <section className="max-w-6xl mx-auto">
            <div className="rounded-3xl bg-lime-50 border border-lime-100 px-6 py-12 sm:px-12 sm:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-xl">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                  Don&apos;t let the photo delay your visa
                </h2>
                <p className="text-slate-600">
                  Upload a selfie and get a photo cropped to your embassy&apos;s exact size, with a clean background.
                </p>
              </div>
              <Link
                href="/passport-photo-online"
                className="shrink-0 inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm py-3.5 px-6 rounded-xl transition-colors"
              >
                Make my visa photo
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section className="max-w-3xl mx-auto py-16 sm:py-24">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-10">
              Frequently asked questions
            </h2>
            <FaqAccordion faqs={GLOBAL_FAQS} />
          </section>

          {/* ── Sources ── */}
          <section aria-labelledby="official-sources" className="max-w-3xl mx-auto pb-16 sm:pb-24">
            <h2 id="official-sources" className="text-lg font-bold tracking-tight mb-3">Official sources</h2>
            <ul className="space-y-1.5 text-sm">
              {OFFICIAL_SOURCES.map((source) => (
                <li key={source.href}>
                  <a href={source.href} target="_blank" rel="noopener noreferrer" className="text-lime-700 hover:text-lime-800 font-medium">
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate-500">
              Last updated <time dateTime={LAST_UPDATED}>{LAST_UPDATED_LABEL}</time>. Visa rules, fees and processing times change.
              Always confirm the requirements on the official government website before you apply.
            </p>
          </section>
        </main>
      </div>
    </>
  );
}
