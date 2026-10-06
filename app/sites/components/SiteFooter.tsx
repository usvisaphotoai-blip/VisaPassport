import Link from "next/link";
import type { SiteConfig } from "@/lib/country-sites";

export default function SiteFooter({ site }: { site: SiteConfig }) {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href={site.basePath} className="text-lg font-extrabold text-white">
              PixPassport {site.flag}
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{site.footer.note}</p>
          </div>
          {site.footer.columns.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">{col.heading}</p>
              <ul className="space-y-2 text-sm">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 pt-6 border-t border-slate-800 text-xs text-slate-500">
          © {new Date().getFullYear()} PixPassport. {site.ui.footerRights}
        </p>
      </div>
    </footer>
  );
}
