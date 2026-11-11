/**
 * Photo-use options for the US driver's license photo tool.
 * Shared by the tool (client) and /preview/[id] (server) so the preview can show the user's choice.
 */

export interface PhotoUse {
  id: string;
  label: string;
  hint: string;
  group: "Purpose" | "State";
  keywords: string;
}

export const purposeUses: PhotoUse[] = [
  {
    id: "idp",
    label: "AAA International Driving Permit (IDP)",
    hint: "AAA asks for 2 identical 2×2 photos signed on the back. Your 4×6 sheet prints 4 copies.",
    group: "Purpose",
    keywords: "idp international driving permit aaa travel abroad iadp",
  },
  {
    id: "mail-renewal",
    label: "Mail-in / out-of-state license renewal",
    hint: "Only some states accept a mailed photo (e.g. Texas, Ohio military). Check your state's form first.",
    group: "Purpose",
    keywords: "mail renewal out of state military replace duplicate",
  },
  {
    id: "real-id",
    label: "REAL ID or driver's license application",
    hint: "Most DMVs take the card photo on-site. Use this to preview your look or for forms that ask for a 2×2 photo.",
    group: "Purpose",
    keywords: "real id star driver license dl dmv new application renewal",
  },
  {
    id: "cdl",
    label: "Commercial Driver's License (CDL)",
    hint: "Same 2×2 in format. Bring the printed photo only if your agency's checklist asks for one.",
    group: "Purpose",
    keywords: "cdl commercial truck trucking",
  },
  {
    id: "permit",
    label: "Learner's permit / junior license",
    hint: "Same 2×2 in, white-background format. Most states photograph new drivers at the office.",
    group: "Purpose",
    keywords: "learner permit junior teen instruction provisional",
  },
  {
    id: "state-id",
    label: "State ID card (non-driver)",
    hint: "Same 2×2 in, white-background format as a driver's license photo.",
    group: "Purpose",
    keywords: "state id identification card non driver",
  },
];

export const US_STATES: [string, string][] = [
  ["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"], ["AR", "Arkansas"], ["CA", "California"],
  ["CO", "Colorado"], ["CT", "Connecticut"], ["DE", "Delaware"], ["DC", "District of Columbia"],
  ["FL", "Florida"], ["GA", "Georgia"], ["HI", "Hawaii"], ["ID", "Idaho"], ["IL", "Illinois"],
  ["IN", "Indiana"], ["IA", "Iowa"], ["KS", "Kansas"], ["KY", "Kentucky"], ["LA", "Louisiana"],
  ["ME", "Maine"], ["MD", "Maryland"], ["MA", "Massachusetts"], ["MI", "Michigan"], ["MN", "Minnesota"],
  ["MS", "Mississippi"], ["MO", "Missouri"], ["MT", "Montana"], ["NE", "Nebraska"], ["NV", "Nevada"],
  ["NH", "New Hampshire"], ["NJ", "New Jersey"], ["NM", "New Mexico"], ["NY", "New York"],
  ["NC", "North Carolina"], ["ND", "North Dakota"], ["OH", "Ohio"], ["OK", "Oklahoma"], ["OR", "Oregon"],
  ["PA", "Pennsylvania"], ["RI", "Rhode Island"], ["SC", "South Carolina"], ["SD", "South Dakota"],
  ["TN", "Tennessee"], ["TX", "Texas"], ["UT", "Utah"], ["VT", "Vermont"], ["VA", "Virginia"],
  ["WA", "Washington"], ["WV", "West Virginia"], ["WI", "Wisconsin"], ["WY", "Wyoming"],
];

export const stateRules = [
  { state: "California", agency: "DMV", url: "https://www.dmv.ca.gov/", smile: "Natural smile OK" },
  { state: "New York", agency: "DMV", url: "https://dmv.ny.gov/", smile: "Natural smile OK" },
  { state: "Texas", agency: "DPS", url: "https://www.dps.texas.gov/section/driver-license", smile: "Natural smile OK" },
  { state: "Florida", agency: "FLHSMV", url: "https://www.flhsmv.gov/", smile: "Natural smile OK" },
  { state: "Illinois", agency: "Secretary of State", url: "https://www.ilsos.gov/", smile: "Natural smile OK" },
  { state: "New Jersey", agency: "MVC", url: "https://www.nj.gov/mvc/", smile: "Natural smile OK" },
  { state: "Ohio", agency: "BMV", url: "https://www.bmv.ohio.gov/", smile: "Not specified – neutral safest" },
  { state: "Pennsylvania", agency: "PennDOT", url: "https://www.dmv.pa.gov/", smile: "Not specified – neutral safest" },
  { state: "Virginia", agency: "DMV", url: "https://www.dmv.virginia.gov/", smile: "Neutral required" },
  { state: "North Carolina", agency: "DMV", url: "https://www.ncdot.gov/dmv/", smile: "Neutral required" },
];

export const stateUses: PhotoUse[] = US_STATES.map(([code, name]) => {
  const rule = stateRules.find((r) => r.state === name);
  const expression = rule ? ` Expression: ${rule.smile.toLowerCase()}.` : "";
  return {
    id: `state-${code.toLowerCase()}`,
    label: `${name} driver's license`,
    hint: `${name} usually photographs you at the office. Use this for mail-in renewals, IDP forms or to preview your photo.${expression}`,
    group: "State",
    keywords: `${code.toLowerCase()} ${name.toLowerCase()} dmv`,
  };
});

export const photoUses: PhotoUse[] = [...purposeUses, ...stateUses];

export const DEFAULT_DL_USE_LABEL = "US Driver's License";

/** Label for a `use` id from the tool, or a generic driver's license label when missing/unknown. */
export function getDriverLicenseUseLabel(useId: string | undefined): string {
  return photoUses.find((u) => u.id === useId)?.label ?? DEFAULT_DL_USE_LABEL;
}
