import Image from "next/image";
import type { ReactNode } from "react";

const FEATURES = ["Biometric Validation", "Background Removal", "Instant Download", "Print-Ready Sheets"];

/**
 * Split hero shared by the regional hub and guide pages: badges, H1, intro, CTA and feature
 * checklist on the left, example photo on the right. Same layout as the tool landing pages.
 */
export default function RegionalHero({
  badge,
  secondaryBadge,
  h1,
  intro,
  cta,
  secondaryCta,
  meta,
  image,
  imageAlt,
}: {
  badge: string;
  secondaryBadge?: string;
  h1: string;
  intro?: string;
  cta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  meta?: ReactNode;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 lg:pt-10 lg:pb-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 bg-lime-50 border border-emerald-100 px-3 py-1 rounded-sm">
                <span className="flex h-2 w-2 rounded-full bg-lime-500 animate-pulse" aria-hidden="true" />
                <span className="text-sm font-semibold text-lime-700 tracking-wide uppercase">{badge}</span>
              </span>
              {secondaryBadge && (
                <span className="inline-flex items-center bg-white border border-slate-200 px-3 py-1 rounded-sm text-sm font-semibold text-slate-500">
                  {secondaryBadge}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-3 break-words">
              {h1}
            </h1>

            {intro && <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-7 max-w-lg">{intro}</p>}

            {(cta || secondaryCta) && (
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
                {cta && (
                  <a
                    href={cta.href}
                    className="relative group inline-flex items-center justify-center overflow-hidden bg-lime-700 hover:bg-lime-800 text-white text-sm font-semibold px-6 py-3 rounded transition-colors"
                  >
                    <span className="relative z-10 flex items-center">
                      {cta.label}
                      <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" aria-hidden="true" />
                  </a>
                )}
                {secondaryCta && (
                  <a
                    href={secondaryCta.href}
                    className="inline-flex items-center justify-center border border-slate-300 hover:border-lime-600 text-slate-800 hover:text-lime-700 text-sm font-semibold px-6 py-3 rounded transition-colors"
                  >
                    {secondaryCta.label}
                  </a>
                )}
              </div>
            )}

            <ul className="grid grid-cols-2 gap-4">
              {FEATURES.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                  <svg className="w-5 h-5 shrink-0 text-emerald-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {meta && <div className="mt-6 text-xs font-semibold text-slate-500">{meta}</div>}
          </div>

          <div className="relative mt-10 lg:mt-0 mx-auto w-full max-w-md lg:max-w-none aspect-square">
            <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-contain rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
