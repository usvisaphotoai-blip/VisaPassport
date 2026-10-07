import Link from "next/link";

// Visible breadcrumb for the Singapore pages; mirrors the BreadcrumbList in lib/singapore-photo.ts
export default function SingaporeBreadcrumb({
  trail,
}: {
  trail: { label: string; href?: string }[];
}) {
  const items = [{ label: "Home", href: "/" }, ...trail];
  return (
    <div className="border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3 bg-slate-50">
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto">
        <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-slate-500 font-medium">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.label} className="flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden="true" className="text-slate-300">
                    /
                  </span>
                )}
                {isLast || !item.href ? (
                  <span className="text-slate-900 font-semibold" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="hover:text-emerald-700 transition-colors">
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
