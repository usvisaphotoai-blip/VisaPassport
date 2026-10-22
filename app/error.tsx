"use client";

import { useEffect } from "react";

// Replaces Next's bare "Application error" screen so a crashed page never strands the user —
// especially mid-checkout, where reloading restores the paid/download state from the server.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
    try {
      (window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.("event", "exception", {
        description: `${error?.message || "unknown"} @ ${window.location.pathname}`.slice(0, 150),
        fatal: true,
      });
    } catch {}
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 text-center">
        <h2 className="text-xl font-black text-slate-900 mb-2">Something went wrong</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-1">
          Your photo and order are saved. Reload the page to continue.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          If you already paid, reloading will show your download.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="flex-1 bg-lime-600 hover:bg-lime-700 text-white font-bold py-3.5 rounded-xl text-sm transition-colors"
          >
            Reload page
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-xl text-sm transition-colors"
          >
            Try again
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-5">
          Still stuck? Email{" "}
          <a href="mailto:support@pixpassport.com" className="underline font-semibold text-slate-700">
            support@pixpassport.com
          </a>
        </p>
      </div>
    </div>
  );
}
