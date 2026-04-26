import React from "react";

export const cx = (...c: (string | false | undefined)[]) =>
  c.filter(Boolean).join(" ");

export const CHECK_ICONS = {
  PASS: "M4.5 12.75l6 6 9-13.5",
  WARN: "M12 9v2m0 4h.01",
  FAIL: "M6 18L18 6M6 6l12 12",
};

export const CHECK_COLORS = {
  PASS: { bg: "bg-lime-50 border-lime-100", icon: "text-lime-500" },
  WARN: { bg: "bg-amber-50 border-amber-100", icon: "text-amber-500" },
  FAIL: { bg: "bg-red-50 border-red-100", icon: "text-red-500" },
};

export const SvgIcon = ({
  d,
  className = "w-4 h-4",
  sw = 2,
}: {
  d: string;
  className?: string;
  sw?: number;
}) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={sw}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

export const CheckMark = ({ className }: { className?: string }) => (
  <SvgIcon 
    d={CHECK_ICONS.PASS} 
    className={cx("w-4 h-4 shrink-0 text-lime-500", className)} 
    sw={2.5} 
  />
);


export const DOWNLOAD_ICON =
  "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3";

export const DownloadBtn = ({ href, download, className, children }: any) => (
  <a
    href={href}
    download={download}
    className={cx(
      "w-full font-bold py-3 px-4 rounded-xl transition-all text-sm tracking-wide flex items-center justify-center gap-2",
      className,
    )}
  >
    <SvgIcon d={DOWNLOAD_ICON} className="w-5 h-5" /> {children}
  </a>
);
