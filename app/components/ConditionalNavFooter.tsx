"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ConditionalNavFooter({
  children,
  navbar,
  footer,
}: {
  children: React.ReactNode;
  navbar: React.ReactNode;
  footer: React.ReactNode;
}) {
  const pathname = usePathname();
  const isFrench = pathname?.startsWith("/fr");
  const isGerman = pathname?.startsWith("/de");
  const isLocalized = isFrench || isGerman;

  useEffect(() => {
    if (isFrench) document.documentElement.lang = "fr";
    else if (isGerman) document.documentElement.lang = "de";
    else document.documentElement.lang = "en";
  }, [isFrench, isGerman]);

  if (isLocalized) {
    // Localized layouts render their own Navbar / Footer
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
