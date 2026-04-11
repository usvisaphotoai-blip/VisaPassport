import React from "react";
import Image from "next/image";
import { CheckIcon, CrossIcon } from "./Icons";

interface GuidePromptProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadClick: () => void;
}

const GuidePrompt: React.FC<GuidePromptProps> = ({ isOpen, onClose, onUploadClick }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      
      <div 
        className="relative w-full max-w-4xl min-h-[500px] bg-white rounded-3xl shadow-2xl shadow-indigo-200/50 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors z-20"
        >
          <CrossIcon className="w-5 h-5 text-slate-400" />
        </button>

        {/* Header */}
        <div className="w-full text-center pt-10 pb-4 px-6 shrink-0">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Upload images like these
          </h2>
        </div>

        <div className="flex flex-col md:flex-row flex-1">
          {/* Left Side: Images */}
          <div className="md:w-1/2 p-6 bg-slate-50 flex flex-col justify-center gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative group overflow-hidden rounded-2xl shadow-sm border-2 border-lime-400/30">
                <Image
                  src="/exampleboy.webp"
                  alt="Example Boy"
                  width={200}
                  height={250}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 bg-lime-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                   <CheckIcon className="w-3 h-3" /> Example
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-2xl shadow-sm border-2 border-lime-400/30">
                <Image
                  src="/examplegirl.webp"
                  alt="Example Girl"
                  width={200}
                  height={250}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 bg-lime-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                   <CheckIcon className="w-3 h-3" /> Example
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                <div className="w-4 h-4 bg-lime-100 rounded-full flex items-center justify-center">
                  <CheckIcon className="w-2.5 h-2.5 text-lime-600" />
                </div>
                Good background we change them in white background 
              </div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                <div className="w-4 h-4 bg-lime-100 rounded-full flex items-center justify-center">
                  <CheckIcon className="w-2.5 h-2.5 text-lime-600" />
                </div>
                Neutral expression & open eyes
              </div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                <div className="w-4 h-4 bg-lime-100 rounded-full flex items-center justify-center">
                  <CheckIcon className="w-2.5 h-2.5 text-lime-600" />
                </div>
                Even lighting on face
              </div>
            </div>
          </div>

          {/* Right Side: Text & Actions */}
          <div className="md:w-1/2 p-10 flex flex-col justify-center text-center md:text-left">
            <h2 className="text-3xl font-black text-slate-900 leading-tight mb-4">
              For better photo results...
            </h2>
            <p className="text-base text-slate-500 leading-relaxed font-medium mb-10">
              Upload a clear photo like the examples shown. Avoid wearing hats or glasses and ensure you have consistent lighting. 
            </p>

            <button
              onClick={onUploadClick}
              className="w-full py-4 bg-[#3b5bdb] hover:bg-[#2f4ac7] text-white font-black tracking-wide rounded-2xl shadow-lg shadow-[#3b5bdb]/30 hover:shadow-[#3b5bdb]/50 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Start Uploading Now
            </button>
            <p className="text-[10px] text-slate-400 mt-4 text-center">
              Takes less than 30 seconds to process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidePrompt;
