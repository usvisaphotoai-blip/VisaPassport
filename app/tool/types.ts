export type Feedback = { 
  type: "success" | "warning" | "error"; 
  message: string 
};

export type DocumentType = {
  id: string;
  label: string;
  size: string;
  bg: string;
  country?: string;
  flag?: string;
  price?: number;
  printSize?: "A4" | "Letter";
};

export type BgColor = {
  id: string;
  label: string;
  swatch: string;
};

export type ValidationCheck = {
  name: string;
  status: "PASS" | "WARN" | "FAIL";
  detail: string;
};

export type ValidationReportData = {
  overallStatus: "PASS" | "WARN" | "FAIL";
  checks: ValidationCheck[];
  photoId?: string;
};
