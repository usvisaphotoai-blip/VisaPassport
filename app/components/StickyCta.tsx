"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Props {
  href: string;
  countryName: string;
  docName: string;
}

function readDismissed() {
  try {
    return sessionStorage.getItem("stickyCtaDismissed") === "1";
  } catch {
    return false;
  }
}

export default function StickyCta({ href, countryName, docName }: Props) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(readDismissed);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed || !visible) return null;

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem("stickyCtaDismissed", "1");
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 pointer-events-none">
      <div className="pointer-events-auto relative flex items-center justify-between w-full bg-slate-900 text-white p-2.5 pl-6 rounded-2xl shadow-2xl border border-slate-700">
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss"
          className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs shadow-md transition-colors"
        >
          ✕
        </button>
        <Link href={href} className="relative group flex items-center justify-between w-full">
          <div className="flex flex-col">
            <span className="font-bold text-sm">Create {countryName} {docName} Photo</span>
            <span className="text-[10px] text-slate-400 font-medium">No signup required</span>
          </div>
          <span className="relative bg-indigo-600 group-hover:bg-indigo-500 transition-colors px-5 py-2.5 rounded-xl text-sm font-black shadow-[0_4px_14px_0_rgb(79,70,229,0.39)]">
            Upload photo
          </span>
        </Link>
      </div>
    </div>
  );
}
