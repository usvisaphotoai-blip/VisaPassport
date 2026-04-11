import { DocumentType, BgColor } from "./types";

export const documentTypes: DocumentType[] = [
  { id: "us-visa", label: "US Visa (DS-160)", size: "600×600", bg: "White" },
  { id: "dv-lottery", label: "DV Lottery 2027", size: "600×600", bg: "White" },
  { id: "us-passport", label: "US Passport", size: "600×600", bg: "White" },
  { id: "green-card", label: "Green Card", size: "2×2 in", bg: "White" },
  { id: "general", label: "General Verification", size: "Any", bg: "Any" },
];

export const bgColors: BgColor[] = [
  { id: "white", label: "Pure White", swatch: "bg-white border-gray-300" },
  { id: "light-gray", label: "Light Gray", swatch: "bg-gray-200 border-gray-300" },
  { id: "light-blue", label: "Light Blue", swatch: "bg-blue-100 border-blue-200" },
  { id: "transparent", label: "Transparent", swatch: "bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABZJREFUeNpi2rV7928bExPT/////wMEGABoCBAMc2jMkgAAAABJRU5ErkJggg==')] border-gray-300" },
];
