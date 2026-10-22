"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ConditionalNavFooter({
  children,
  navbar,
  footer,
  countrySites = [],
}: {
  children: React.ReactNode;
  navbar: React.ReactNode;
  footer: React.ReactNode;
  countrySites?: { prefix: string; lang: string }[];
}) {
  const pathname = usePathname();
  const isFrench = pathname === "/fr" || pathname?.startsWith("/fr/");
  const isGerman = pathname === "/de" || pathname?.startsWith("/de/");
  // Country sections are prerendered at their internal route (/sites/es/…, reached through rewrites),
  // so match that too — otherwise the static HTML ships the global English navbar and footer.
  const countrySite = countrySites.find((s) =>
    [s.prefix, `/sites${s.prefix}`].some((p) => pathname === p || pathname?.startsWith(`${p}/`))
  );
  const countryLang = countrySite?.lang;
  const isLocalized = isFrench || isGerman || !!countrySite;

  useEffect(() => {
    // Pages localized by query string (e.g. /preview/[id]?from=es) declare their language on a
    // [data-page-lang] element. A wrong lang="en" makes Chrome offer to translate the page, and
    // browser translation is what crashes React mid-checkout.
    const pageLang = document.querySelector<HTMLElement>("[data-page-lang]")?.dataset.pageLang;
    if (pageLang) document.documentElement.lang = pageLang;
    else if (isFrench) document.documentElement.lang = "fr";
    else if (isGerman) document.documentElement.lang = "de";
    else if (countryLang) document.documentElement.lang = countryLang;
    else document.documentElement.lang = "en";
  }, [isFrench, isGerman, countryLang]);

  const isGallery = pathname === "/cloudinary-gallery" || pathname?.startsWith("/cloudinary-gallery");
  const isAdmin = pathname === "/admin" || pathname?.startsWith("/admin/") || pathname?.startsWith("/admin");

  if (isLocalized || isGallery || isAdmin) {
    // Localized layouts, standalone gallery, and admin portal render without global navbar/footer
    return <>{children}</>;
  }

  return (
    <>
      {navbar}
      <main id="main-content" className="grow">
        {children}
      </main>
      {footer}
    </>
  );
}
