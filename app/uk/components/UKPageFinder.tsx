import Link from "next/link";

/**
 * The five UK passport photo pages each own one search intent. This block sends readers to the page
 * that matches their task and tells search engines which page answers which query.
 * Keep `keyword` unique per page; it documents the page's primary keyword.
 */
export const UK_PASSPORT_PAGES = [
  {
    href: "/uk-passport-size-photo-maker",
    label: "UK passport size photo maker",
    task: "Make a new photo for a passport, driving licence, Oyster card or another UK document.",
    keyword: "uk passport size photo maker",
  },
  {
    href: "/uk-passport-photo-checker-online-free",
    label: "UK passport photo checker",
    task: "Check a photo you already have before you upload or print it.",
    keyword: "uk passport photo checker",
  },
  {
    href: "/uk-passport-photo-editor",
    label: "UK passport photo editor",
    task: "Crop, straighten or replace the background of a photo you already took.",
    keyword: "uk passport photo editor",
  },
  {
    href: "/uk-passport-photo-requirements-tool",
    label: "UK passport photo requirements",
    task: "Look up the official size, background and expression rules.",
    keyword: "uk passport photo requirements",
  },
  {
    href: "/blog/uk-digital-passport-photo",
    label: "UK digital passport photo guide",
    task: "Apply online and upload a digital photo instead of a print.",
    keyword: "uk digital passport photo",
  },
] as const;

export type UKPassportPageHref = (typeof UK_PASSPORT_PAGES)[number]["href"];

export default function UKPageFinder({ current }: { current: UKPassportPageHref }) {
  return (
    <nav aria-labelledby="uk-page-finder" className="max-w-4xl mx-auto px-4 sm:px-6 my-10">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 id="uk-page-finder" className="text-xl sm:text-2xl font-black text-slate-900 mb-1">
          Which UK passport photo page do you need?
        </h2>
        <p className="text-sm text-slate-500 mb-5">Pick the task that matches yours.</p>
        <ul className="divide-y divide-slate-100">
          {UK_PASSPORT_PAGES.map((p) => {
            const isCurrent = p.href === current;
            return (
              <li key={p.href} className="py-3 flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
                <span className="text-sm text-slate-600 sm:flex-1">{p.task}</span>
                {isCurrent ? (
                  <span className="text-sm font-bold text-slate-400" aria-current="page">
                    {p.label} (this page)
                  </span>
                ) : (
                  <Link href={p.href} className="text-sm font-bold text-lime-700 hover:text-lime-800 underline-offset-2 hover:underline">
                    {p.label} →
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
