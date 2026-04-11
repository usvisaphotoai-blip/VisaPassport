"use client";

import { useState } from "react";
import Image from "next/image";
import { photoGuidelinesData, GuidelineCategory, GuidelineExample } from "@/app/utils/guidelinesData";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function PhotoGuidelinesModal({ isOpen, onClose }: Props) {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(photoGuidelinesData[0].id);
  const [activeExampleId, setActiveExampleId] = useState<string>(photoGuidelinesData[0].examples[0].id);

  if (!isOpen) return null;

  const activeCategory = photoGuidelinesData.find(c => c.id === activeCategoryId)!;
  const activeExample = activeCategory.examples.find(e => e.id === activeExampleId)!;

  const CheckIcon = () => (
    <svg className="w-full h-full text-green-500" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );

  const CrossIcon = () => (
    <svg className="w-full h-full text-red-500" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div 
      className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 bg-black/80 transition-opacity"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div 
        className="w-full max-w-5xl h-[80vh] flex flex-col md:flex-row rounded-lg overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 bg-[#4A4A4A]"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button absolute top right */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/40 text-white rounded-full hover:bg-black/60 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* --- Sidebar (Categories) --- */}
        <div className="w-full md:w-1/3 shrink-0 bg-[#555555] overflow-x-auto md:overflow-y-auto flex flex-row md:flex-col border-b md:border-b-0 md:border-r border-[#666] scrollbar-hide">
          {photoGuidelinesData.map(category => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategoryId(category.id);
                if (category.examples.length > 0) {
                  setActiveExampleId(category.examples[0].id);
                }
              }}
              className={`text-left p-3 md:p-4 whitespace-nowrap md:whitespace-normal border-r md:border-r-0 md:border-b border-[#666] transition-colors ${
                activeCategoryId === category.id 
                  ? "bg-[#6A6A6A] text-white" 
                  : "text-[#FFCC33] hover:bg-[#606060]"
              }`}
            >
              <span className="font-medium">{category.title}</span>
            </button>
          ))}
        </div>

        {/* --- Main Content Area --- */}
        <div className="w-full md:w-2/3 flex flex-col bg-[#3A3A3A] text-white">
          
          {/* Top: Active Image & Details */}
          <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 overflow-y-auto">
            {/* Image Box */}
            <div className="relative shrink-0 w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-white rounded-md shadow flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-full flex items-center justify-center">
                <Image 
                  src={activeExample.src} 
                  alt={activeExample.description} 
                  fill
                  className={`object-cover transition-all duration-300 ${activeExample.imageClassName || ""}`} 
                />
              </div>
              
              {/* Overlay Check/Cross */}
              <div className="absolute -bottom-2 -right-2 w-14 h-14 bg-[#3A3A3A] rounded-full p-2 translate-x-1 translate-y-1">
                 {activeExample.isAcceptable ? <CheckIcon /> : <CrossIcon />}
              </div>
            </div>

            {/* Description Text */}
            <div className="flex-1 space-y-4 w-full">
              <p className="text-base sm:text-lg leading-relaxed text-center md:text-left">
                {activeExample.description}
              </p>
              {activeExample.tip && (
                <div className="mt-4 p-4 bg-[#555] rounded border border-[#666] text-sm leading-relaxed flex items-start gap-3">
                  <span className="text-xl">📷</span>
                  <p>{activeExample.tip}</p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom: Thumbnail Gallery */}
          <div className="h-24 sm:h-28 md:h-32 bg-[#555555] p-3 md:p-4 flex items-center justify-start gap-3 overflow-x-auto shadow-inner border-t border-[#666]">
            {activeCategory.examples.map(ex => (
              <button
                key={ex.id}
                onClick={() => setActiveExampleId(ex.id)}
                className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-white shadow-sm transition-all ${
                  activeExampleId === ex.id 
                    ? "ring-4 ring-[#FFCC33] z-10 scale-105" 
                    : "opacity-80 hover:opacity-100"
                }`}
              >
                <Image 
                  src={ex.src} 
                  alt="Thumbnail" 
                  fill
                  sizes="80px"
                  className={`object-cover ${ex.imageClassName || ""}`}
                />
                
                {/* Mini overlay Check/Cross */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#555] rounded-full p-0.5 z-20">
                  {ex.isAcceptable ? <CheckIcon /> : <CrossIcon />}
                </div>
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
