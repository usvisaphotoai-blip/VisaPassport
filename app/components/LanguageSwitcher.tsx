"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useRouter, usePathname } from "next/navigation";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: new (options: { pageLanguage: string; autoDisplay: boolean }, elementId: string) => unknown;
      };
    };
  }
}

const languages = [
  { code: "en", short: "EN", name: "English" },
  { code: "de", short: "DE", name: "Deutsch" },
  { code: "fr", short: "FR", name: "Français" },
  { code: "es", short: "ES", name: "Español" },
  { code: "it", short: "IT", name: "Italiano" },
  { code: "pt", short: "PT", name: "Português" },
  { code: "nl", short: "NL", name: "Nederlands" },
  { code: "pl", short: "PL", name: "Polski" },
  { code: "zh-CN", short: "ZH", name: "中文 (简体)" },
  { code: "ja", short: "JA", name: "日本語" },
  { code: "ko", short: "KO", name: "한국어" },
  { code: "ar", short: "AR", name: "العربية" },
  { code: "hi", short: "HI", name: "हिन्दी" },
];

const getGoogtransCookie = () => {
  const parts = `; ${document.cookie}`.split("; googtrans=");
  return parts.length === 2 ? parts.pop()?.split(";").shift() ?? null : null;
};

const clearGoogleTranslateCookies = () => {
  document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname + ";";
};

// The cookie format is /sourceLang/targetLang
const setGoogleTranslateCookie = (lang: string) => {
  document.cookie = `googtrans=/en/${lang}; path=/; domain=${window.location.hostname}`;
  document.cookie = `googtrans=/en/${lang}; path=/`; // Also set without domain
};

const hardNavigate = (href: string) => {
  window.location.href = href;
};

// Cookie only changes via a full reload, so there is nothing to subscribe to
const subscribeNoop = () => () => {};

type Props = {
  /** Which way the menu opens. Use "up" when the switcher sits near the bottom of a container. */
  placement?: "down" | "up";
};

export default function LanguageSwitcher({ placement = "down" }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const googtrans = useSyncExternalStore(subscribeNoop, getGoogtransCookie, () => null);

  const isDeRoute = pathname === "/de" || pathname.startsWith("/de/");
  const isFrRoute = pathname === "/fr" || pathname.startsWith("/fr/");
  const cookieLang = googtrans?.split("/").pop();
  const currentLang = isDeRoute ? "de" : isFrRoute ? "fr" : cookieLang || "en";
  const current = languages.find((l) => l.code === currentLang) ?? languages[0];

  // Only load Google Translate script if non-native translation cookie is active
  useEffect(() => {
    if (!googtrans || isDeRoute || isFrRoute) return;
    if (document.getElementById("google-translate-script")) return;

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false },
        "google_translate_hidden_element"
      );
    };
    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, [googtrans, isDeRoute, isFrRoute]);

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleLanguageChange = (lang: string) => {
    setOpen(false);
    if (lang === currentLang) return;

    if (lang === "de") {
      clearGoogleTranslateCookies();
      router.push("/de");
    } else if (lang === "fr") {
      clearGoogleTranslateCookies();
      router.push("/fr");
    } else if (lang === "en") {
      clearGoogleTranslateCookies();
      // Google Translate rewrites the DOM, so a hard load is needed to fully undo it
      if (googtrans) hardNavigate("/");
      else router.push("/");
    } else {
      setGoogleTranslateCookie(lang);
      // Navigate to home page to avoid translating the native localized pages
      if (isDeRoute || isFrRoute) hardNavigate("/");
      else window.location.reload();
    }
  };

  return (
    <div ref={rootRef} className="relative notranslate" translate="no">
      {/* Hidden element required by Google Translate */}
      <div id="google_translate_hidden_element" className="hidden"></div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${current.name}`}
        className={`flex items-center gap-1.5 rounded-full px-2.5 py-2 text-sm font-semibold transition-colors ${
          open ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
        }`}
      >
        <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />
        </svg>
        {current.short}
        <svg className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`absolute left-1/2 -translate-x-1/2 w-52 z-50 transition-all duration-150 ${
          placement === "up" ? "bottom-full pb-2" : "top-full pt-3"
        } ${open ? "visible opacity-100 translate-y-0" : "invisible opacity-0 " + (placement === "up" ? "translate-y-1" : "-translate-y-1")}`}
      >
        <ul
          role="listbox"
          aria-label="Select language"
          className="max-h-72 overflow-y-auto bg-white rounded-2xl shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5 p-1.5"
        >
          {languages.map((l) => {
            const selected = l.code === currentLang;
            return (
              <li key={l.code} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => handleLanguageChange(l.code)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                    selected ? "bg-lime-50 text-lime-800 font-semibold" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className={`w-7 text-[11px] font-bold tracking-wide ${selected ? "text-lime-700" : "text-slate-400"}`}>{l.short}</span>
                  <span className="flex-1">{l.name}</span>
                  {selected && (
                    <svg className="w-4 h-4 text-lime-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
