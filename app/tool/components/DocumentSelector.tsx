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
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredDocs = documentTypes.filter(
    (doc) =>
      doc.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.country?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="mb-4 space-y-3">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">
          Document Type
        </p>
        <div className="relative">
          <input
            type="text"
            placeholder="Search country or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-lime-500/30 focus:border-lime-500 transition-all placeholder:text-slate-400"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <nav className="flex flex-col gap-1.5 overflow-y-auto pr-1 max-h-[calc(100vh-400px)] custom-scrollbar">
        {filteredDocs.length > 0 ? (
          filteredDocs.map((doc) => (
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
                <div className="flex items-center gap-2">
                  {doc.flag && (
                    <span className="text-sm leading-none grayscale-[0.2] group-hover:grayscale-0 transition-all">
                      {doc.flag}
                    </span>
                  )}
                  <p
                    className={`text-xs font-bold leading-tight ${
                      selectedDoc === doc.id ? "text-slate-900" : "text-slate-600"
                    }`}
                  >
                    {doc.label}
                  </p>
                </div>
                {selectedDoc === doc.id && (
                  <CheckIcon className="w-3.5 h-3.5 text-lime-600 shrink-0" />
                )}
              </div>
              <p className="text-[10px] text-slate-400 mt-1 font-medium ml-6">
                {doc.size} · {doc.bg} bg
              </p>
              {selectedDoc === doc.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-lime-500 rounded-r-full" />
              )}
            </button>
          ))
        ) : (
          <div className="py-8 px-4 text-center">
            <p className="text-xs text-slate-400 font-medium">No documents found</p>
            <button 
              onClick={() => setSearchTerm("")}
              className="text-[10px] text-lime-600 font-bold uppercase tracking-wider mt-2 hover:text-lime-700"
            >
              Clear Search
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default DocumentSelector;
