import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import {
  getAllVisaChecklistPaths,
  getAllVisaCountries,
  getVisaChecklist,
  getVisaCountry,
} from "@/lib/visa-checklist";
import { getAuditGuide } from "@/lib/visa-audit-guides";
import AiVisaChecklistAuditClient from "@/app/visa-checklist/components/AiVisaChecklistAuditClient";

const APP_URL = "https://www.pixpassport.com";

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllVisaChecklistPaths();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; checklist: string }>;
}): Promise<Metadata> {
  const { country: countrySlug, checklist: checklistSlug } = await params;
  const checklist = getVisaChecklist(countrySlug, checklistSlug);

  if (!checklist) {
    return {
      title: "Audit Not Found | PixPassport",
    };
  }

  const guide = getAuditGuide(checklistSlug);
  const title = guide?.seoTitle ?? `Free Document Audit: ${checklist.title}`;
  const description =
    guide?.seoDescription ??
    `Pre-submission document audit for ${checklist.title}. Find missing documents, bank statement discrepancies, and photo compliance issues.`;
  const url = `${APP_URL}/visa-checklist/${countrySlug}/${checklistSlug}/audit`;

  return {
    title: { absolute: `${title} | PixPassport` },
    description,
    keywords: guide?.keywords,
    openGraph: { title, description, url, type: "website", siteName: "PixPassport" },
    twitter: { card: "summary_large_image", title, description },
    alternates: {
      canonical: `${APP_URL}/visa-checklist/${countrySlug}/${checklistSlug}/audit`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function ChecklistAuditDirectPage({
  params,
}: {
  params: Promise<{ country: string; checklist: string }>;
}) {
  const { country: countrySlug, checklist: checklistSlug } = await params;
  const checklist = getVisaChecklist(countrySlug, checklistSlug);

  if (!checklist) {
    notFound();
  }

  const allCountries = getAllVisaCountries();
  const { country } = getVisaCountry(countrySlug);

  const guide = getAuditGuide(checklistSlug);
  const pageUrl = `${APP_URL}/visa-checklist/${countrySlug}/${checklistSlug}/audit`;
  const checklistUrl = `/visa-checklist/${countrySlug}/${checklistSlug}`;

  const schemas = guide
    ? [
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: guide.h1,
          url: pageUrl,
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: guide.faq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
            { "@type": "ListItem", position: 2, name: "Visa Checklists", item: `${APP_URL}/visa-checklist` },
            { "@type": "ListItem", position: 3, name: checklist.title, item: `${APP_URL}${checklistUrl}` },
            { "@type": "ListItem", position: 4, name: "Document Audit", item: pageUrl },
          ],
        },
      ]
    : [];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <AiVisaChecklistAuditClient
        initialCountry={country}
        initialChecklist={checklist}
        allCountries={allCountries}
      />
      {guide && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-800">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">{guide.h1}</h2>
          <p className="text-slate-600 leading-relaxed mb-8">{guide.intro}</p>

          <h3 className="text-xl font-black text-slate-900 mb-4">What to check in each document</h3>
          <div className="overflow-x-auto mb-10">
            <table className="w-full text-sm text-left border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="p-3 font-bold">Document</th>
                  <th className="p-3 font-bold">What to check</th>
                  <th className="p-3 font-bold">Why it matters</th>
                </tr>
              </thead>
              <tbody>
                {guide.checks.map((c) => (
                  <tr key={c.document} className="border-t border-slate-200 align-top">
                    <th scope="row" className="p-3 font-bold text-slate-900">{c.document}</th>
                    <td className="p-3 text-slate-700">{c.check}</td>
                    <td className="p-3 text-slate-600">{c.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-black text-slate-900 mb-4">Mistakes that cause delays and refusals</h3>
          <ul className="space-y-4 mb-10">
            {guide.mistakes.map((m) => (
              <li key={m.title} className="border border-slate-200 rounded-xl p-4 bg-white">
                <p className="font-bold text-slate-900 mb-1">{m.title}</p>
                <p className="text-slate-600 text-sm mb-2">{m.detail}</p>
                <p className="text-sm text-slate-800">
                  <span className="font-bold">Fix: </span>
                  {renderLinks(m.fix)}
                </p>
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-black text-slate-900 mb-4">Ready-to-submit checklist</h3>
          <ul className="space-y-2 mb-10">
            {guide.readyList.map((item) => (
              <li key={item} className="flex gap-2 text-slate-700">
                <span aria-hidden="true" className="text-emerald-600 font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-black text-slate-900 mb-4">Frequently asked questions</h3>
          <div className="space-y-3 mb-10">
            {guide.faq.map((f) => (
              <details key={f.question} className="border border-slate-200 rounded-xl bg-white p-4">
                <summary className="font-bold text-slate-900 cursor-pointer">{f.question}</summary>
                <p className="text-slate-600 mt-2 leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-6 text-sm text-slate-600">
            <p className="mb-2">
              Full requirements, fees and photo specs:{" "}
              <Link href={checklistUrl} className="font-bold text-emerald-700 underline">
                {checklist.title}
              </Link>
              . Last verified {new Date(checklist.lastUpdated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}.
            </p>
            <p className="mb-1 font-bold text-slate-700">Official sources</p>
            <ul className="list-disc pl-5 space-y-1">
              {guide.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} rel="noopener noreferrer" target="_blank" className="text-emerald-700 underline">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

function renderLinks(text: string): ReactNode[] {
  return text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    return m ? (
      <Link key={i} href={m[2]} className="text-emerald-700 underline">
        {m[1]}
      </Link>
    ) : (
      part
    );
  });
}
