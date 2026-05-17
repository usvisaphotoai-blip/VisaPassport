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

  useEffect(() => {
    document.documentElement.lang = isFrench ? "fr" : "en";
  }, [isFrench]);

  if (isFrench) {
    // French layout renders its own NavbarFr / FooterFr
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
