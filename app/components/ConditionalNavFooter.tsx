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
  const countrySite = countrySites.find((s) => pathname === s.prefix || pathname?.startsWith(`${s.prefix}/`));
  const countryLang = countrySite?.lang;
  const isLocalized = isFrench || isGerman || !!countrySite;

  useEffect(() => {
    if (isFrench) document.documentElement.lang = "fr";
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
