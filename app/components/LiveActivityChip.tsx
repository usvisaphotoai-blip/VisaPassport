"use client";

import { useState, useEffect } from "react";

export default function LiveActivityChip() {
  const [count, setCount] = useState(85432);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedCount = localStorage.getItem("globalLiveCount");
    if (storedCount) {
      setCount(parseInt(storedCount, 10));
    }

    const updateCounter = () => {
      setCount((prev) => {
        const next = prev + Math.floor(Math.random() * 3) + 1;
        localStorage.setItem("globalLiveCount", next.toString());
        return next;
      });
      const nextInterval = Math.floor(Math.random() * 4000) + 2000;
      setTimeout(updateCounter, nextInterval);
    };

    const initialTimeout = setTimeout(updateCounter, 2000);
    return () => clearTimeout(initialTimeout);
  }, []);

  if (!isClient) {
    return (
      <div className="flex justify-center bg-slate-900 py-1.5 px-4 font-mono text-xs font-semibold text-white tracking-wider sm:text-sm">
        <span className="opacity-0">Live: 85,432 approvals</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 bg-slate-900 py-1.5 px-4 text-xs font-semibold text-white tracking-wider sm:text-sm">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span>
      </span>
      <span>
        Live: <span className="text-lime-400 tabular-nums">{count.toLocaleString()}</span> compliant photos processed
      </span>
    </div>
  );
}
