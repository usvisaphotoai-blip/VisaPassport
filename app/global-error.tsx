"use client";

import { useEffect } from "react";

// Last-resort boundary for crashes in the root layout itself (Navbar, AuthProvider, …).
// Renders its own <html>/<body>, so styles are inline rather than Tailwind.
export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
    try {
      (window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.("event", "exception", {
        description: `[global] ${error?.message || "unknown"} @ ${window.location.pathname}`.slice(0, 150),
        fatal: true,
      });
    } catch {}
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif", background: "#f1f5f9", color: "#0f172a" }}>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ maxWidth: 420, width: "100%", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 28, textAlign: "center" }}>
            <h2 style={{ fontSize: 20, fontWeight: 900, margin: "0 0 8px" }}>Something went wrong</h2>
            <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6, margin: "0 0 24px" }}>
              Your photo and order are saved. Reload the page to continue. If you already paid, reloading will show your download.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{ width: "100%", background: "#65a30d", color: "#fff", fontWeight: 700, fontSize: 14, padding: "14px 0", border: 0, borderRadius: 12, cursor: "pointer" }}
            >
              Reload page
            </button>
            <p style={{ fontSize: 12, color: "#64748b", marginTop: 20 }}>
              Still stuck? Email <a href="mailto:support@pixpassport.com" style={{ color: "#334155", fontWeight: 600 }}>support@pixpassport.com</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
