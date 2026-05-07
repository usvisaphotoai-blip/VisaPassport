"use client";

import { useEffect, useState } from "react";

interface TOCPageHeading {
  id: string;
  text: string;
  level: number;
}

export default function TocSidebar({ headings }: { headings: TOCPageHeading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-10% 0% -80% 0%" }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Offset for sticky headers
        behavior: "smooth",
      });
    }
  };

  if (!headings.length) return null;

  return (
    <div className="sticky top-28 space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1.5 h-6 bg-lime-500 rounded-full" />
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">
            On This Page
          </h4>
        </div>
        <nav className="space-y-1">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={`block text-sm py-2 px-3 rounded-lg transition-all border-l-2 ${
                activeId === heading.id
                  ? "text-lime-700 bg-lime-50 border-lime-600 font-bold"
                  : "text-slate-500 border-transparent hover:text-slate-900 hover:bg-slate-50"
              } ${heading.level === 3 ? "ml-4" : ""}`}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>

      <div className="p-6 bg-slate-950 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-lime-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
        <h4 className="font-bold text-xl mb-3 relative z-10">DS-160 Portal Error?</h4>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed relative z-10 font-medium">
          Fix hair edges, remove background shadows, and validate 600x600 size instantly.
        </p>
        <a 
          href="/passport-photo-online" 
          className="relative z-10 flex items-center justify-center w-full bg-lime-500 text-slate-950 font-bold py-3.5 rounded-2xl hover:bg-lime-400 transition-colors shadow-lg shadow-lime-500/20 text-sm"
        >
          Check Photo Free →
        </a>
      </div>
    </div>
  );
}
