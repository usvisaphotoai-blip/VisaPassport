import React, { Dispatch, SetStateAction, useEffect } from "react";
import { cx, SvgIcon } from "./SharedUI";

interface ZoomDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  previewUrl: string;
  hasPaid: boolean;
}

export default function ZoomDialog({
  isDialogOpen,
  setIsDialogOpen,
  previewUrl,
  hasPaid,
}: ZoomDialogProps) {
  // Close on Escape key
  useEffect(() => {
    if (!isDialogOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsDialogOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isDialogOpen, setIsDialogOpen]);

  if (!isDialogOpen) return null;

  return (
    <>
      <style>{`
        @keyframes zdOverlayIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes zdCardIn {
          from { opacity: 0; transform: scale(0.94) translateY(12px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
        .zd-overlay {
          animation: zdOverlayIn 200ms ease forwards;
        }
        .zd-card {
          animation: zdCardIn 260ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .zd-img-wrap::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 4px;
          background: linear-gradient(
            145deg,
            rgba(255,255,255,0.18) 0%,
            rgba(255,255,255,0.04) 40%,
            rgba(255,255,255,0.10) 100%
          );
          pointer-events: none;
          z-index: 2;
        }
        .zd-close:hover .zd-close-icon {
          transform: rotate(90deg);
        }
        .zd-close-icon {
          transition: transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="zd-overlay fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        style={{ background: "rgba(5, 5, 8, 0.96)" }}
        onClick={() => setIsDialogOpen(false)}
      >
        {/* Top bar */}
        <div
          className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: "6px",
              padding: "5px 12px",
            }}
          >
            {/* Dot */}
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#4ade80",
                boxShadow: "0 0 6px #4ade80",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
                fontFamily: "ui-monospace, 'SF Mono', monospace",
              }}
            >
              Preview
            </span>
          </div>

          {/* Close */}
          <button
            className="zd-close"
            onClick={() => setIsDialogOpen(false)}
            aria-label="Close dialog"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 180ms ease, border-color 180ms ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(255,255,255,0.13)";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(255,255,255,0.24)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(255,255,255,0.06)";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(255,255,255,0.12)";
            }}
          >
            <span className="zd-close-icon" style={{ display: "flex" }}>
              <SvgIcon
                d="M6 18L18 6M6 6l12 12"
                className="w-4 h-4"

                sw={2}
              />
            </span>
          </button>
        </div>

        {/* Card */}
        <div
          className="zd-card"
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            maxWidth: 460,
            width: "100%",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Photo frame */}
          <div
            style={{
              position: "relative",
              borderRadius: 6,
              padding: 3,
              background:
                "linear-gradient(160deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.04) 60%)",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.08), 0 40px 80px rgba(0,0,0,0.7), 0 8px 24px rgba(0,0,0,0.5)",
            }}
          >
            {/* Inner dark mat */}
            <div
              style={{
                borderRadius: 4,
                padding: 10,
                background: "#0e0e12",
                position: "relative",
              }}
            >
              {/* Image */}
              <div
                className="zd-img-wrap"
                style={{ position: "relative", lineHeight: 0 }}
                onContextMenu={(e) => e.preventDefault()}
              >
                <img
                  src={previewUrl}
                  alt="High resolution passport photo preview"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  style={{
                    display: "block",
                    maxWidth: "min(380px, 80vw)",
                    maxHeight: "70vh",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    borderRadius: 3,
                    userSelect: "none",
                    pointerEvents: hasPaid ? "auto" : "none",
                    filter: hasPaid
                      ? "none"
                      : "blur(0px)",
                  }}
                />

                {/* Watermark strip if unpaid */}
                {!hasPaid && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      pointerEvents: "none",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.18)",
                        fontFamily: "ui-monospace, monospace",
                        transform: "rotate(-30deg)",
                        userSelect: "none",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Preview Only
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Corner accents */}
            {(["tl", "tr", "bl", "br"] as const).map((pos) => (
              <span
                key={pos}
                style={{
                  position: "absolute",
                  width: 12,
                  height: 12,
                  borderColor: "rgba(255,255,255,0.35)",
                  borderStyle: "solid",
                  borderWidth: 0,
                  ...(pos === "tl"
                    ? { top: -1, left: -1, borderTopWidth: 2, borderLeftWidth: 2, borderRadius: "4px 0 0 0" }
                    : pos === "tr"
                      ? { top: -1, right: -1, borderTopWidth: 2, borderRightWidth: 2, borderRadius: "0 4px 0 0" }
                      : pos === "bl"
                        ? { bottom: -1, left: -1, borderBottomWidth: 2, borderLeftWidth: 2, borderRadius: "0 0 0 4px" }
                        : { bottom: -1, right: -1, borderBottomWidth: 2, borderRightWidth: 2, borderRadius: "0 0 4px 0" }),
                }}
              />
            ))}
          </div>

          {/* Caption row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              width: "100%",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                height: 1,
                flex: 1,
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.10))",
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.30)",
                fontFamily: "ui-monospace, 'SF Mono', monospace",
                whiteSpace: "nowrap",
              }}
            >
              {hasPaid ? "Full Resolution" : "Watermarked Preview"}
            </span>
            <span
              style={{
                height: 1,
                flex: 1,
                background:
                  "linear-gradient(to left, transparent, rgba(255,255,255,0.10))",
              }}
            />
          </div>

          {/* Hint */}
          <p
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.20)",
              margin: 0,
              fontFamily: "ui-monospace, monospace",
              letterSpacing: "0.04em",
            }}
          >
            Press Esc or click anywhere to close
          </p>
        </div>
      </div>
    </>
  );
}