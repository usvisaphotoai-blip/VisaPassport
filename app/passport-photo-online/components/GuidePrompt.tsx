import React from "react";
import Image from "next/image";
import { CheckIcon, CrossIcon } from "./Icons";

interface GuidePromptProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadClick: () => void;
}

const GuidePrompt: React.FC<GuidePromptProps> = ({
  isOpen,
  onClose,
  onUploadClick,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center px-3 sm:px-6 py-6 bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button (ALWAYS VISIBLE) */}
        <div className="sticky top-0 z-30 flex justify-end p-3 bg-white">
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition"
          >
            <CrossIcon className="w-5 h-5 text-red-600" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto">
          {/* Header */}
          <div className="text-center px-4 sm:px-6 pt-4 pb-2">
            <h2 className="text-xl sm:text-3xl font-black text-slate-900">
              Upload images like these
            </h2>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* LEFT */}
            <div className="md:w-1/2 p-4 sm:p-6 bg-slate-50">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[ "/exampleboy.webp", "/examplegirl.webp" ].map((src, i) => (
                  <div
                    key={i}
                    className="relative overflow-hidden rounded-xl border-2 border-lime-400/30"
                  >
                    <Image
                      src={src}
                      alt="Example"
                      width={200}
                      height={250}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-lime-500 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckIcon className="w-3 h-3" /> Example
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 mt-4 text-xs sm:text-sm">
                {[
                  "Good background we change them in white background",
                  "Neutral expression & open eyes",
                  "Even lighting on face",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-600 font-semibold">
                    <div className="w-4 h-4 bg-lime-100 rounded-full flex items-center justify-center">
                      <CheckIcon className="w-2.5 h-2.5 text-lime-600" />
                    </div>
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="md:w-1/2 p-5 sm:p-8 flex flex-col justify-center text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                For better photo results...
              </h2>

              <p className="text-sm sm:text-base text-slate-500 mb-6">
                Upload a clear photo like the examples shown. Avoid wearing hats or glasses and ensure proper lighting.
              </p>

              <button
                onClick={onUploadClick}
                className="w-full py-3 sm:py-4 bg-[#3b5bdb] hover:bg-[#2f4ac7] text-white font-bold rounded-xl shadow-md transition"
              >
                Start Uploading Now
              </button>

              <p className="text-[10px] text-slate-400 mt-3">
                Takes less than 30 seconds
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidePrompt;