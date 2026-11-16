// Business cloud app plans. Shared by the pricing UI and the server routes;
// the server always re-prices orders from this table, never from the client.

export type BusinessPlanId = "business_starter" | "business_unlimited";

export interface BusinessPlan {
  id: BusinessPlanId;
  name: string;
  tagline: string;
  /** USD per 30-day billing period */
  priceUsd: number;
  /** Monthly processed-photo allowance; null = unlimited */
  photoLimit: number | null;
  photoLabel: string;
  seats: string;
  popular: boolean;
  features: string[];
}

export const BUSINESS_BILLING_DAYS = 30;
export const BUSINESS_PLAN_CURRENCY = "USD";
export const BUSINESS_PRODUCT = "business_cloud_plan";
export const BUSINESS_PRODUCT_NAME = "PixPassport Business Cloud Plan";

export const BUSINESS_PLANS: Record<BusinessPlanId, BusinessPlan> = {
  business_starter: {
    id: "business_starter",
    name: "Business Starter",
    tagline: "For single-location studios, copy shops and pharmacy counters.",
    priceUsd: 100,
    photoLimit: 2000,
    photoLabel: "Up to 2,000 photos / month",
    seats: "Up to 3 staff logins",
    popular: false,
    features: [
      "Up to 2,000 processed photos every month",
      "All country passport, visa & ID templates",
      "AI background cleanup, crop & biometric checks",
      "300 DPI print sheets: 4×6, 5×7, 6×8, A4, Letter & custom",
      "Digital portal-ready files for online applications",
      "Up to 3 staff logins",
      "Email support (reply within 24 hours)",
    ],
  },
  business_unlimited: {
    id: "business_unlimited",
    name: "Business Unlimited",
    tagline: "For busy studios, multi-counter chains and visa agencies.",
    priceUsd: 199,
    photoLimit: null,
    photoLabel: "Unlimited photos",
    seats: "Unlimited staff logins",
    popular: true,
    features: [
      "Unlimited processed photos",
      "Everything in Business Starter",
      "Unlimited staff logins & multiple locations",
      "Your studio name & logo on print sheets",
      "Priority processing during peak hours",
      "Priority support with onboarding call",
    ],
  },
};

export const BUSINESS_PLAN_LIST: BusinessPlan[] = [
  BUSINESS_PLANS.business_starter,
  BUSINESS_PLANS.business_unlimited,
];

export function getBusinessPlan(id: unknown): BusinessPlan | null {
  return typeof id === "string" && id in BUSINESS_PLANS
    ? BUSINESS_PLANS[id as BusinessPlanId]
    : null;
}

export const BUSINESS_TYPES = [
  "Photo studio / print shop",
  "Pharmacy / retail counter",
  "Shipping / postal counter",
  "Visa / travel agency",
  "School, university or HR office",
  "Other",
] as const;

export const BUSINESS_USE_CASES = [
  "Passport photos",
  "Visa photos",
  "Green Card / immigration",
  "Driving licence / national ID",
  "Employee / student badges",
] as const;
