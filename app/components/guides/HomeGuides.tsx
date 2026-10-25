import Link from "next/link";
import { GUIDES_BASE_PATH, getPublishedGuides } from "@/lib/guides";

const MAX_GUIDES = 6;

/** Latest published guides for the homepage; renders nothing until at least one guide exists. */
export default function HomeGuides() {
  const guides = getPublishedGuides().slice(0, MAX_GUIDES);
  if (guides.length === 0) return null;

  return (
    <section aria-labelledby="home-guides" className="bg-white py-10 sm:py-14 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-lime-700 mb-1">Guides</p>
            <h2 id="home-guides" className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Passport &amp; Visa Photo Guides
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Official requirements, common rejection reasons and how to get it right the first time.
            </p>
          </div>
          <Link
            href={GUIDES_BASE_PATH}
            className="inline-flex items-center gap-1 text-sm font-bold text-lime-700 hover:text-lime-800 shrink-0"
          >
            View all guides <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {guides.map((guide) => (
            <article
              key={guide.slug}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white hover:border-lime-400 hover:shadow-md transition-all"
            >
              <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={guide.image.url}
                  alt=""
                  width={640}
                  height={360}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 mb-1.5">
                  <span className="font-bold uppercase tracking-wider text-lime-800">{guide.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{guide.readingTime}</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-lime-700 transition-colors leading-snug line-clamp-2 mb-1.5">
                  <Link href={`${GUIDES_BASE_PATH}/${guide.slug}`} className="after:absolute after:inset-0">
                    {guide.title}
                  </Link>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">{guide.excerpt}</p>
                <span aria-hidden="true" className="mt-auto pt-3 text-xs font-bold text-lime-700">Read guide →</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
