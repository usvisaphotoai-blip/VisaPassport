import Link from "next/link";
import type { OfficialSource } from "@/lib/document-specs";
import type { FaqItem, RelatedLink } from "@/lib/regional-content";

export function QuickAnswer({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <aside aria-labelledby="quick-answer" className="rounded-2xl border border-lime-200 bg-lime-50 p-5 sm:p-6">
      <h2 id="quick-answer" className="text-sm font-black uppercase tracking-wider text-lime-800 mb-3">
        Quick answer
      </h2>
      <ul className="space-y-2 text-[15px] leading-relaxed text-slate-800">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-700" />
            <span className="min-w-0 break-words" dangerouslySetInnerHTML={{ __html: inlineMarkdown(item) }} />
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function FaqList({ items }: { items: FaqItem[] }) {
  if (!items.length) return null;
  return (
    <section aria-labelledby="faq" className="mt-12">
      <h2 id="faq" className="text-2xl font-black text-slate-900 mb-4">
        Frequently asked questions
      </h2>
      <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-5 sm:px-6">
        {items.map((f) => (
          <details key={f.question} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-900">
              <h3 className="text-base">{f.question}</h3>
              <span aria-hidden="true" className="text-xl text-lime-700 transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{f.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function OfficialSources({
  sources,
  lastVerified,
  lastVerifiedLabel,
}: {
  sources: OfficialSource[];
  lastVerified?: string;
  lastVerifiedLabel?: string;
}) {
  if (!sources.length) return null;
  return (
    <section aria-labelledby="official-sources" className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
      <h2 id="official-sources" className="text-lg font-black text-slate-900 mb-1">
        Official sources
      </h2>
      {lastVerified && (
        <p className="text-sm text-slate-600 mb-4">
          Last verified: <time dateTime={lastVerified}>{lastVerifiedLabel ?? lastVerified}</time>
        </p>
      )}
      <ul className="space-y-2 text-sm">
        {sources.map((s) => (
          <li key={s.url}>
            <a href={s.url} rel="noopener" className="font-semibold text-lime-800 underline underline-offset-2 hover:text-lime-900">
              {s.label}
            </a>
            {s.edition && <span className="text-slate-500"> ({s.edition})</span>}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        This page explains photo rules only. It is not legal advice. Always follow the instructions for your own form or
        application, and check the official page on the day you file, because agencies can change their rules.
      </p>
    </section>
  );
}

export function RelatedPages({ links }: { links: RelatedLink[] }) {
  if (!links.length) return null;
  return (
    <nav aria-labelledby="related-pages" className="mt-12">
      <h2 id="related-pages" className="text-xl font-black text-slate-900 mb-4">
        Related pages
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="block h-full rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-lime-500">
              <span className="block font-bold text-slate-900">{l.label}</span>
              {l.desc && <span className="mt-1 block text-sm text-slate-600">{l.desc}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Bold (**x**) and links ([x](/y)) only: enough for quick-answer bullets, nothing that needs a parser */
export function inlineMarkdown(text: string): string {
  const escaped = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return escaped
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\((\/[^)\s]*|#[^)\s]+|https:\/\/[^)\s]+)\)/g, '<a href="$2" class="font-semibold text-lime-800 underline underline-offset-2">$1</a>');
}

/** Plain text for schema and meta: strips the inline Markdown above */
export function plainText(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}
