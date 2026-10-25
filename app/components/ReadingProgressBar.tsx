"use client";

import { useEffect, useState } from "react";

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setProgress(Math.min(100, (window.scrollY / scrollHeight) * 100));
      }
    };
    // Coalesce scroll events to one update per frame
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1.5 z-50 pointer-events-none" aria-hidden="true">
      <div
        className="h-full w-full origin-left bg-lime-500 shadow-[0_0_10px_rgba(132,204,22,0.5)]"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}
