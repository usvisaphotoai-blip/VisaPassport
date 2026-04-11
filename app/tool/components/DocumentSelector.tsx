import React from "react";
import { DocumentType } from "../types";
import { CheckIcon } from "./Icons";

interface DocumentSelectorProps {
  selectedDoc: string;
  setSelectedDoc: (id: string) => void;
  handleReset: () => void;
  documentTypes: DocumentType[];
}

const DocumentSelector: React.FC<DocumentSelectorProps> = ({
  selectedDoc,
  setSelectedDoc,
  handleReset,
  documentTypes,
}) => {
  return (
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-3">
        Document Type
      </p>
      <nav className="flex flex-col gap-1.5">
        {documentTypes.map((doc) => (
          <button
            key={doc.id}
            onClick={() => {
              setSelectedDoc(doc.id);
              handleReset();
            }}
            className={`relative group w-full flex flex-col px-3 py-2.5 rounded-xl text-left transition-all duration-200 border ${
              selectedDoc === doc.id
                ? "bg-white border-lime-200 shadow-sm ring-1 ring-lime-400/20"
                : "bg-transparent border-transparent hover:bg-white/50 hover:border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <p
                className={`text-xs font-bold leading-tight ${
                  selectedDoc === doc.id ? "text-slate-900" : "text-slate-600"
                }`}
              >
                {doc.label}
              </p>
              {selectedDoc === doc.id && (
                <CheckIcon className="w-3.5 h-3.5 text-lime-600 shrink-0" />
              )}
            </div>
            <p className="text-[10px] text-slate-400 mt-1 font-medium">
              {doc.size} · {doc.bg} bg
            </p>
            {selectedDoc === doc.id && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-lime-500 rounded-r-full" />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default DocumentSelector;
