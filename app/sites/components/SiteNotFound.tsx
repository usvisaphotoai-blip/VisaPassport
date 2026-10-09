"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SiteNotFoundCopy {
  title: string;
  body: string;
  cta: string;
  home: string;
  tool?: string;
  toolLabel?: string;
}

export default function SiteNotFound({ copy }: { copy: Record<string, SiteNotFoundCopy> }) {
  const pathname = usePathname() || "";
  const prefix = Object.keys(copy).find((p) => pathname === p || pathname.startsWith(`${p}/`));
  const t = prefix ? copy[prefix] : Object.values(copy)[0];
  if (!t) return null;

  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 py-24 text-center">
      <p className="text-sm font-black uppercase tracking-wider text-lime-700">404</p>
      <h1 className="mt-3 text-3xl sm:text-4xl font-black text-slate-900">{t.title}</h1>
      <p className="mt-4 text-slate-600">{t.body}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href={t.home}
          className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800 transition-colors"
        >
          {t.cta}
        </Link>
        {t.tool && t.toolLabel && (
          <Link
            href={t.tool}
            className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-900 hover:border-lime-500 transition-colors"
          >
            {t.toolLabel}
          </Link>
        )}
      </div>
    </section>
  );
}
