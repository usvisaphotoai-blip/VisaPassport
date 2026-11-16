"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { trackAdsPurchaseConversion } from "@/lib/ads-conversion";
import {
  BUSINESS_BILLING_DAYS,
  BUSINESS_PLAN_LIST,
  BUSINESS_PRODUCT,
  BUSINESS_TYPES,
  BUSINESS_USE_CASES,
  BusinessPlan,
  BusinessPlanId,
  getBusinessPlan,
} from "@/lib/business-plans";

type Gtag = (...args: unknown[]) => void;
type RazorpayResponse = { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string };
type RazorpayInstance = {
  open: () => void;
  on: (event: "payment.failed", cb: (res: { error?: { description?: string } }) => void) => void;
};
type RazorpayWindow = Window & { gtag?: Gtag; Razorpay?: new (options: object) => RazorpayInstance };

const win = () => window as RazorpayWindow;

const loadRazorpay = () =>
  new Promise<boolean>((resolve) => {
    if (win().Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const getGaClientId = () =>
  new Promise<string>((resolve) => {
    const g = win().gtag;
    if (typeof g !== "function") return resolve("");
    setTimeout(() => resolve(""), 500);
    try {
      g("get", "G-RJFKP2ZXNX", "client_id", (id: string) => resolve(id || ""));
    } catch {
      resolve("");
    }
  });

const SESSION_KEY = "pixpassport_business_onboarding";
const PAPER_SIZES = ["4×6 in (4R)", "5×7 in (5R)", "6×8 in (6R)", "A4", "Letter", "Other"];
const COUNTRIES = [
  "United States", "United Kingdom", "India", "Canada", "Australia", "Germany", "France",
  "Ireland", "United Arab Emirates", "Saudi Arabia", "Singapore", "Malaysia", "Philippines",
  "Nigeria", "South Africa", "Pakistan", "Bangladesh", "Nepal", "Sri Lanka", "New Zealand",
  "Netherlands", "Spain", "Italy", "Brazil", "Mexico",
];

interface PaidSession {
  businessOrderId: string;
  onboardingToken: string;
  planName: string;
  email: string;
  contactName: string;
  companyName: string;
  submitted?: boolean;
}

interface BillingForm {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  businessType: string;
  website: string;
  taxId: string;
  address: string;
  acceptTerms: boolean;
}

interface OnboardingForm {
  workspaceName: string;
  adminName: string;
  adminEmail: string;
  teamEmails: string;
  locations: string;
  useCases: string[];
  primaryCountries: string;
  printerModel: string;
  paperSizes: string[];
  logoUrl: string;
  notes: string;
}

const EMPTY_BILLING: BillingForm = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  country: "",
  businessType: "",
  website: "",
  taxId: "",
  address: "",
  acceptTerms: false,
};

const inputCls = (err?: string) =>
  `mt-1.5 w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-lime-500/30 ${
    err ? "border-rose-400 focus:border-rose-500" : "border-slate-200 focus:border-lime-600"
  }`;

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-slate-700">
        {label}
        {optional ? <span className="ml-1 font-normal text-slate-400">(optional)</span> : <span className="ml-0.5 text-rose-500">*</span>}
      </label>
      {children}
      {error ? <p className="mt-1 text-xs font-medium text-rose-600">{error}</p> : null}
    </div>
  );
}

function CheckIcon() {
  return (
    <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-lime-500 bg-lime-100 text-[10px] font-bold text-lime-800">
      ✓
    </span>
  );
}

function StepPill({ n, label, state }: { n: number; label: string; state: "done" | "active" | "todo" }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold ${
          state === "done"
            ? "border-lime-600 bg-lime-500 text-slate-950"
            : state === "active"
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-slate-200 bg-white text-slate-400"
        }`}
      >
        {state === "done" ? "✓" : n}
      </span>
      <span className={`text-xs font-semibold ${state === "todo" ? "text-slate-400" : "text-slate-800"}`}>{label}</span>
    </div>
  );
}

export default function BusinessPricing() {
  const [planId, setPlanId] = useState<BusinessPlanId | null>(null);
  const [billing, setBilling] = useState<BillingForm>(EMPTY_BILLING);
  const [billingErrors, setBillingErrors] = useState<Record<string, string>>({});
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paid, setPaid] = useState<PaidSession | null>(null);
  const [onboarding, setOnboarding] = useState<OnboardingForm>({
    workspaceName: "",
    adminName: "",
    adminEmail: "",
    teamEmails: "",
    locations: "1",
    useCases: [],
    primaryCountries: "",
    printerModel: "",
    paperSizes: [],
    logoUrl: "",
    notes: "",
  });
  const [onboardingErrors, setOnboardingErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const checkoutRef = useRef<HTMLDivElement>(null);

  // Restore a paid-but-not-onboarded session after a page refresh
  useEffect(() => {
    let saved: PaidSession | null = null;
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      saved = raw ? (JSON.parse(raw) as PaidSession) : null;
    } catch {
      saved = null;
    }
    if (!saved?.businessOrderId || !saved.onboardingToken) return;
    const restored = saved;
    const t = setTimeout(() => {
      setPaid(restored);
      setOnboarding((o) => ({
        ...o,
        workspaceName: o.workspaceName || restored.companyName,
        adminName: o.adminName || restored.contactName,
        adminEmail: o.adminEmail || restored.email,
      }));
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const plan: BusinessPlan | null = getBusinessPlan(planId);

  const selectPlan = (id: BusinessPlanId) => {
    setPlanId(id);
    setError(null);
    requestAnimationFrame(() => checkoutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const updateBilling = <K extends keyof BillingForm>(key: K, value: BillingForm[K]) => {
    setBilling((b) => ({ ...b, [key]: value }));
    if (billingErrors[key]) setBillingErrors((e) => ({ ...e, [key]: "" }));
  };

  const validateBilling = (): Record<string, string> => {
    const e: Record<string, string> = {};
    if (billing.companyName.trim().length < 2) e.companyName = "Enter your business name";
    if (billing.contactName.trim().length < 2) e.contactName = "Enter the contact person's name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(billing.email.trim())) e.email = "Enter a valid work email";
    if (!/^[+()\d\s-]{6,30}$/.test(billing.phone.trim())) e.phone = "Enter a valid phone number";
    if (billing.country.trim().length < 2) e.country = "Select your country";
    if (!billing.businessType) e.businessType = "Select your business type";
    if (!billing.acceptTerms) e.acceptTerms = "Please accept to continue";
    return e;
  };

  const handleCheckout = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!plan || paying) return;
    setError(null);
    const errs = validateBilling();
    setBillingErrors(errs);
    if (Object.keys(errs).length) return;

    setPaying(true);
    try {
      if (!(await loadRazorpay())) throw new Error("Payment window failed to load. Please check your connection and try again.");
      const gaClientId = await getGaClientId();

      const res = await fetch("/api/business/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: plan.id, ...billing, gaClientId }),
      });
      const order = await res.json();
      if (!res.ok) {
        if (order.fields) setBillingErrors(order.fields);
        throw new Error(order.error || "Couldn't start the payment. Please try again.");
      }

      const gaItem = {
        item_id: `${BUSINESS_PRODUCT}_${plan.id}`,
        item_name: plan.name,
        price: plan.priceUsd,
        quantity: 1,
        item_category: "Business Plan",
      };
      win().gtag?.("event", "begin_checkout", { value: plan.priceUsd, currency: "USD", items: [gaItem] });

      const Razorpay = win().Razorpay;
      if (!Razorpay) throw new Error("Payment window failed to load. Please try again.");

      await new Promise<void>((resolve, reject) => {
        const rzp = new Razorpay({
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          order_id: order.orderId,
          name: "PixPassport Business",
          description: `${plan.name} – ${BUSINESS_BILLING_DAYS}-day access`,
          prefill: {
            name: billing.contactName.trim(),
            email: billing.email.trim(),
            contact: billing.phone.trim(),
          },
          notes: { company: billing.companyName.trim() },
          theme: { color: "#0f172a" },
          modal: { ondismiss: () => resolve() },
          handler: async (response: RazorpayResponse) => {
            try {
              const verifyRes = await fetch("/api/business/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...response, businessOrderId: order.businessOrderId, gaClientId }),
              });
              const data = await verifyRes.json();
              if (!verifyRes.ok) {
                throw new Error(
                  `We couldn't confirm your payment automatically. Please email support@pixpassport.com with payment ID ${response.razorpay_payment_id}.`
                );
              }
              const session: PaidSession = {
                businessOrderId: data.businessOrderId,
                onboardingToken: data.onboardingToken,
                planName: data.planName,
                email: data.email,
                contactName: data.contactName,
                companyName: data.companyName,
              };
              try {
                sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
              } catch {
                // Private mode: onboarding still works until the page is closed
              }
              win().gtag?.("event", "purchase", {
                transaction_id: response.razorpay_payment_id,
                value: plan.priceUsd,
                currency: "USD",
                items: [gaItem],
              });
              trackAdsPurchaseConversion({
                transactionId: response.razorpay_payment_id,
                value: plan.priceUsd,
                currency: "USD",
              });
              setPaid(session);
              setOnboarding((o) => ({
                ...o,
                workspaceName: o.workspaceName || session.companyName,
                adminName: o.adminName || session.contactName,
                adminEmail: o.adminEmail || session.email,
              }));
              requestAnimationFrame(() => checkoutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
              resolve();
            } catch (err) {
              reject(err);
            }
          },
        });
        rzp.on("payment.failed", (r) => reject(new Error(`Payment failed: ${r.error?.description || "please try again."}`)));
        rzp.open();
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setPaying(false);
    }
  };

  const toggleList = (key: "useCases" | "paperSizes", value: string) => {
    setOnboarding((o) => ({
      ...o,
      [key]: o[key].includes(value) ? o[key].filter((v) => v !== value) : [...o[key], value],
    }));
    if (onboardingErrors[key]) setOnboardingErrors((e) => ({ ...e, [key]: "" }));
  };

  const updateOnboarding = <K extends keyof OnboardingForm>(key: K, value: OnboardingForm[K]) => {
    setOnboarding((o) => ({ ...o, [key]: value }));
    if (onboardingErrors[key]) setOnboardingErrors((e) => ({ ...e, [key]: "" }));
  };

  const handleOnboarding = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!paid || submitting) return;
    setError(null);
    const e: Record<string, string> = {};
    if (onboarding.workspaceName.trim().length < 2) e.workspaceName = "Enter a workspace name";
    if (onboarding.adminName.trim().length < 2) e.adminName = "Enter the admin's name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(onboarding.adminEmail.trim())) e.adminEmail = "Enter a valid admin email";
    if (!onboarding.useCases.length) e.useCases = "Pick at least one";
    if (onboarding.logoUrl && !/^https:\/\/\S+$/i.test(onboarding.logoUrl.trim())) e.logoUrl = "Use an https:// link";
    setOnboardingErrors(e);
    if (Object.keys(e).length) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/business/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...onboarding,
          businessOrderId: paid.businessOrderId,
          onboardingToken: paid.onboardingToken,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.fields) setOnboardingErrors(data.fields);
        throw new Error(data.error || "Couldn't save your details. Please try again.");
      }
      const done = { ...paid, submitted: true };
      setPaid(done);
      try {
        sessionStorage.removeItem(SESSION_KEY);
      } catch {
        // ignore
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const step = paid?.submitted ? 4 : paid ? 3 : plan ? 2 : 1;

  return (
    <div>
      {/* Plan cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {BUSINESS_PLAN_LIST.map((p) => {
          const selected = planId === p.id;
          return (
            <article
              key={p.id}
              className={`relative flex flex-col rounded-2xl border bg-white p-6 sm:p-7 transition-colors ${
                selected ? "border-slate-900" : p.popular ? "border-lime-500" : "border-slate-200 hover:border-slate-300"
              }`}
            >
              {p.popular ? (
                <span className="absolute -top-3 left-6 rounded-full border border-lime-600 bg-lime-500 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wide text-slate-950">
                  Best value
                </span>
              ) : null}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{p.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{p.tagline}</p>
                </div>
              </div>
              <div className="mt-5 flex items-end gap-1.5">
                <span className="text-4xl font-extrabold tracking-tight text-slate-900">${p.priceUsd}</span>
                <span className="pb-1.5 text-sm font-medium text-slate-500">/ month</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-lg border border-lime-300 bg-lime-50 px-2.5 py-1 text-xs font-semibold text-lime-900">
                  {p.photoLabel}
                </span>
                <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
                  {p.seats}
                </span>
                {p.photoLimit ? (
                  <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
                    ≈ ${(p.priceUsd / p.photoLimit).toFixed(2)} per photo at full use
                  </span>
                ) : null}
              </div>
              <ul className="mt-5 flex-1 space-y-2.5 border-t border-slate-100 pt-5 text-sm text-slate-700">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <CheckIcon />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => selectPlan(p.id)}
                disabled={!!paid}
                className={`mt-6 inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                  selected
                    ? "bg-slate-900 text-white"
                    : p.popular
                      ? "bg-lime-500 text-slate-950 hover:bg-lime-400"
                      : "border border-slate-300 bg-white text-slate-900 hover:border-slate-900"
                }`}
              >
                {selected ? "Selected ✓" : `Choose ${p.name}`}
              </button>
            </article>
          );
        })}
      </div>

      <p className="mt-4 text-center text-xs text-slate-500">
        Prices in USD. Each payment covers {BUSINESS_BILLING_DAYS} days of access — no automatic renewal, no hidden fees. A tax invoice is emailed after payment.
      </p>

      {/* Checkout / onboarding panel */}
      <div ref={checkoutRef} id="business-checkout" className="scroll-mt-24">
        {(plan || paid) && (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-slate-200 px-5 py-4 sm:px-7">
              <StepPill n={1} label="Choose plan" state={step > 1 ? "done" : "active"} />
              <span className="hidden h-px w-6 bg-slate-200 sm:block" />
              <StepPill n={2} label="Business details & payment" state={step > 2 ? "done" : step === 2 ? "active" : "todo"} />
              <span className="hidden h-px w-6 bg-slate-200 sm:block" />
              <StepPill n={3} label="Workspace setup" state={step > 3 ? "done" : step === 3 ? "active" : "todo"} />
            </div>

            {error ? (
              <div role="alert" className="mx-5 mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800 sm:mx-7">
                {error}
              </div>
            ) : null}

            {/* Step 2: billing details + pay */}
            {!paid && plan && (
              <form onSubmit={handleCheckout} noValidate className="grid grid-cols-1 gap-6 p-5 sm:p-7 lg:grid-cols-12">
                <div className="lg:col-span-8">
                  <h3 className="text-lg font-bold text-slate-900">Your business details</h3>
                  <p className="mt-1 text-sm text-slate-600">Used for your invoice and to set up your cloud workspace.</p>

                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field id="biz-company" label="Business name" error={billingErrors.companyName}>
                      <input id="biz-company" autoComplete="organization" value={billing.companyName} onChange={(e) => updateBilling("companyName", e.target.value)} className={inputCls(billingErrors.companyName)} placeholder="e.g. Sunrise Photo Studio" />
                    </Field>
                    <Field id="biz-type" label="Business type" error={billingErrors.businessType}>
                      <select id="biz-type" value={billing.businessType} onChange={(e) => updateBilling("businessType", e.target.value)} className={inputCls(billingErrors.businessType)}>
                        <option value="">Select…</option>
                        {BUSINESS_TYPES.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </Field>
                    <Field id="biz-contact" label="Contact person" error={billingErrors.contactName}>
                      <input id="biz-contact" autoComplete="name" value={billing.contactName} onChange={(e) => updateBilling("contactName", e.target.value)} className={inputCls(billingErrors.contactName)} placeholder="Full name" />
                    </Field>
                    <Field id="biz-email" label="Work email" error={billingErrors.email}>
                      <input id="biz-email" type="email" autoComplete="email" inputMode="email" value={billing.email} onChange={(e) => updateBilling("email", e.target.value)} className={inputCls(billingErrors.email)} placeholder="you@yourbusiness.com" />
                    </Field>
                    <Field id="biz-phone" label="Phone / WhatsApp" error={billingErrors.phone}>
                      <input id="biz-phone" type="tel" autoComplete="tel" inputMode="tel" value={billing.phone} onChange={(e) => updateBilling("phone", e.target.value)} className={inputCls(billingErrors.phone)} placeholder="+1 555 123 4567" />
                    </Field>
                    <Field id="biz-country" label="Country" error={billingErrors.country}>
                      <input id="biz-country" list="biz-country-list" autoComplete="country-name" value={billing.country} onChange={(e) => updateBilling("country", e.target.value)} className={inputCls(billingErrors.country)} placeholder="Start typing…" />
                      <datalist id="biz-country-list">
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c} />
                        ))}
                      </datalist>
                    </Field>
                    <Field id="biz-website" label="Website" optional>
                      <input id="biz-website" type="url" autoComplete="url" value={billing.website} onChange={(e) => updateBilling("website", e.target.value)} className={inputCls()} placeholder="https://" />
                    </Field>
                    <Field id="biz-tax" label="GST / VAT / Tax ID" optional>
                      <input id="biz-tax" value={billing.taxId} onChange={(e) => updateBilling("taxId", e.target.value)} className={inputCls()} placeholder="For your invoice" />
                    </Field>
                    <div className="sm:col-span-2">
                      <Field id="biz-address" label="Billing address" optional>
                        <textarea id="biz-address" rows={2} autoComplete="street-address" value={billing.address} onChange={(e) => updateBilling("address", e.target.value)} className={inputCls()} placeholder="Street, city, postcode" />
                      </Field>
                    </div>
                  </div>

                  <label className="mt-5 flex items-start gap-2.5 text-sm text-slate-700">
                    <input type="checkbox" checked={billing.acceptTerms} onChange={(e) => updateBilling("acceptTerms", e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-lime-600" />
                    <span>
                      I agree to the PixPassport Terms of Service and Privacy Policy and understand this payment covers {BUSINESS_BILLING_DAYS} days of access.
                    </span>
                  </label>
                  {billingErrors.acceptTerms ? <p className="mt-1 text-xs font-medium text-rose-600">{billingErrors.acceptTerms}</p> : null}
                </div>

                {/* Order summary */}
                <aside className="lg:col-span-4">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 lg:sticky lg:top-24">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Order summary</div>
                    <div className="mt-3 flex items-start justify-between gap-3">
                      <div>
                        <div className="font-bold text-slate-900">{plan.name}</div>
                        <div className="text-xs text-slate-600">{plan.photoLabel}</div>
                      </div>
                      <div className="font-bold text-slate-900">${plan.priceUsd}.00</div>
                    </div>
                    <div className="mt-3 flex justify-between border-t border-slate-200 pt-3 text-xs text-slate-600">
                      <span>Access period</span>
                      <span className="font-semibold text-slate-800">{BUSINESS_BILLING_DAYS} days</span>
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-slate-600">
                      <span>Staff logins</span>
                      <span className="font-semibold text-slate-800">{plan.seats.replace(" staff logins", "")}</span>
                    </div>
                    <div className="mt-3 flex items-end justify-between border-t border-slate-200 pt-3">
                      <span className="text-sm font-semibold text-slate-700">Total due today</span>
                      <span className="text-2xl font-extrabold text-slate-900">${plan.priceUsd}</span>
                    </div>
                    <button
                      type="submit"
                      disabled={paying}
                      className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-slate-800 disabled:cursor-wait disabled:opacity-70"
                    >
                      {paying ? "Opening secure checkout…" : `Pay $${plan.priceUsd} securely`}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPlanId(planId === "business_starter" ? "business_unlimited" : "business_starter")}
                      className="mt-2 w-full text-center text-xs font-semibold text-slate-500 hover:text-slate-800"
                    >
                      Switch to {planId === "business_starter" ? "Business Unlimited" : "Business Starter"}
                    </button>
                    <ul className="mt-4 space-y-1.5 border-t border-slate-200 pt-4 text-xs text-slate-600">
                      <li>🔒 Secure card, UPI & wallet payments via Razorpay</li>
                      <li>🧾 Tax invoice emailed instantly</li>
                      <li>⚡ Workspace ready within 1 business day</li>
                    </ul>
                  </div>
                </aside>
              </form>
            )}

            {/* Step 3: onboarding form after payment */}
            {paid && !paid.submitted && (
              <form onSubmit={handleOnboarding} noValidate className="p-5 sm:p-7">
                <div className="rounded-xl border border-lime-300 bg-lime-50 px-4 py-3">
                  <div className="text-sm font-bold text-lime-950">Payment confirmed — {paid.planName} is active 🎉</div>
                  <p className="mt-0.5 text-xs text-lime-900">
                    Receipt and tax invoice sent to <strong>{paid.email}</strong>. Complete the setup below so we can create your cloud workspace.
                  </p>
                </div>

                <h3 className="mt-6 text-lg font-bold text-slate-900">Set up your cloud workspace</h3>
                <p className="mt-1 text-sm text-slate-600">Tell us who needs access and how you work. Takes about 2 minutes.</p>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field id="ob-workspace" label="Workspace name" error={onboardingErrors.workspaceName}>
                    <input id="ob-workspace" value={onboarding.workspaceName} onChange={(e) => updateOnboarding("workspaceName", e.target.value)} className={inputCls(onboardingErrors.workspaceName)} placeholder="Shown on your dashboard & print sheets" />
                  </Field>
                  <Field id="ob-locations" label="Number of locations / counters">
                    <input id="ob-locations" type="number" min={1} max={500} value={onboarding.locations} onChange={(e) => updateOnboarding("locations", e.target.value)} className={inputCls()} />
                  </Field>
                  <Field id="ob-admin-name" label="Admin name" error={onboardingErrors.adminName}>
                    <input id="ob-admin-name" autoComplete="name" value={onboarding.adminName} onChange={(e) => updateOnboarding("adminName", e.target.value)} className={inputCls(onboardingErrors.adminName)} />
                  </Field>
                  <Field id="ob-admin-email" label="Admin login email" error={onboardingErrors.adminEmail}>
                    <input id="ob-admin-email" type="email" autoComplete="email" value={onboarding.adminEmail} onChange={(e) => updateOnboarding("adminEmail", e.target.value)} className={inputCls(onboardingErrors.adminEmail)} />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field id="ob-team" label="Staff login emails" optional error={onboardingErrors.teamEmails}>
                      <textarea id="ob-team" rows={3} value={onboarding.teamEmails} onChange={(e) => updateOnboarding("teamEmails", e.target.value)} className={inputCls(onboardingErrors.teamEmails)} placeholder="One per line or comma-separated" />
                    </Field>
                    <p className="mt-1 text-xs text-slate-500">
                      {paid.planName.includes("Starter") ? "Business Starter includes up to 3 staff logins (including the admin)." : "Business Unlimited includes unlimited staff logins."}
                    </p>
                  </div>
                </div>

                <fieldset className="mt-5">
                  <legend className="text-xs font-semibold text-slate-700">
                    What will you create? <span className="text-rose-500">*</span>
                  </legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {BUSINESS_USE_CASES.map((u) => {
                      const on = onboarding.useCases.includes(u);
                      return (
                        <button key={u} type="button" aria-pressed={on} onClick={() => toggleList("useCases", u)} className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${on ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"}`}>
                          {u}
                        </button>
                      );
                    })}
                  </div>
                  {onboardingErrors.useCases ? <p className="mt-1 text-xs font-medium text-rose-600">{onboardingErrors.useCases}</p> : null}
                </fieldset>

                <fieldset className="mt-5">
                  <legend className="text-xs font-semibold text-slate-700">
                    Paper sizes you print on <span className="font-normal text-slate-400">(optional)</span>
                  </legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {PAPER_SIZES.map((s) => {
                      const on = onboarding.paperSizes.includes(s);
                      return (
                        <button key={s} type="button" aria-pressed={on} onClick={() => toggleList("paperSizes", s)} className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${on ? "border-lime-600 bg-lime-50 text-lime-900" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"}`}>
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field id="ob-countries" label="Countries you serve most" optional>
                    <input id="ob-countries" value={onboarding.primaryCountries} onChange={(e) => updateOnboarding("primaryCountries", e.target.value)} className={inputCls()} placeholder="e.g. US, UK, India, Schengen" />
                  </Field>
                  <Field id="ob-printer" label="Printer model" optional>
                    <input id="ob-printer" value={onboarding.printerModel} onChange={(e) => updateOnboarding("printerModel", e.target.value)} className={inputCls()} placeholder="e.g. DNP DS620, Epson L8050" />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field id="ob-logo" label="Logo link (for branded print sheets)" optional error={onboardingErrors.logoUrl}>
                      <input id="ob-logo" type="url" value={onboarding.logoUrl} onChange={(e) => updateOnboarding("logoUrl", e.target.value)} className={inputCls(onboardingErrors.logoUrl)} placeholder="https://… (Google Drive, Dropbox or your website)" />
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <Field id="ob-notes" label="Anything else we should know?" optional>
                      <textarea id="ob-notes" rows={3} value={onboarding.notes} onChange={(e) => updateOnboarding("notes", e.target.value)} className={inputCls()} placeholder="Opening hours, special document types, preferred onboarding call time…" />
                    </Field>
                  </div>
                </div>

                <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-slate-500">Order reference: <span className="font-mono">{paid.businessOrderId}</span></p>
                  <button type="submit" disabled={submitting} className="inline-flex items-center justify-center rounded-xl bg-lime-500 px-6 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-lime-400 disabled:cursor-wait disabled:opacity-70">
                    {submitting ? "Saving…" : "Submit workspace setup"}
                  </button>
                </div>
              </form>
            )}

            {/* Step 4: done */}
            {paid?.submitted && (
              <div className="p-6 text-center sm:p-10">
                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-lime-500 bg-lime-100 text-xl font-bold text-lime-800">✓</div>
                <h3 className="mt-4 text-xl font-bold text-slate-900">You&apos;re all set, {paid.contactName.split(" ")[0]}!</h3>
                <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-slate-600">
                  We&apos;ve received your workspace details for <strong>{paid.companyName}</strong>. Our team will create your PixPassport cloud workspace and email login details to the admin address within 1 business day.
                </p>
                <div className="mx-auto mt-6 grid max-w-xl grid-cols-1 gap-3 text-left sm:grid-cols-3">
                  {[
                    ["1", "Invoice", "Tax invoice sent to your email"],
                    ["2", "Workspace", "Created within 1 business day"],
                    ["3", "Logins", "Admin & staff invites emailed"],
                  ].map(([n, t, d]) => (
                    <div key={n} className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                      <div className="text-xs font-bold text-lime-700">Step {n}</div>
                      <div className="mt-0.5 text-sm font-bold text-slate-900">{t}</div>
                      <div className="mt-0.5 text-xs text-slate-600">{d}</div>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-xs text-slate-500">
                  Questions? Email <span className="font-semibold text-slate-700">support@pixpassport.com</span> with reference <span className="font-mono">{paid.businessOrderId}</span>.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
