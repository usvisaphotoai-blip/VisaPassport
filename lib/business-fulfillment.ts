// Server-only helpers for Business cloud plan orders: request validation,
// access-period activation and the sales / welcome notification emails.

import dbConnect from "@/lib/mongodb";
import { sendEmail } from "@/lib/mail";
import BusinessOrder, { IBusinessOrder } from "@/models/BusinessOrder";
import { BUSINESS_BILLING_DAYS, BUSINESS_TYPES } from "@/lib/business-plans";

const SALES_INBOX = process.env.BUSINESS_SALES_EMAIL || "support@pixpassport.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function cleanText(v: unknown, max = 200): string {
  return typeof v === "string" ? v.replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max) : "";
}

export function isValidEmail(v: string): boolean {
  return v.length <= 254 && EMAIL_RE.test(v);
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export interface BillingInput {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  businessType: string;
  website: string;
  taxId: string;
  address: string;
}

/** Validates the pre-payment checkout form. Returns field errors or the clean billing data. */
export function parseBilling(body: Record<string, unknown>): { billing?: BillingInput; errors?: Record<string, string> } {
  const billing: BillingInput = {
    companyName: cleanText(body.companyName, 120),
    contactName: cleanText(body.contactName, 120),
    email: cleanText(body.email, 254).toLowerCase(),
    phone: cleanText(body.phone, 30),
    country: cleanText(body.country, 80),
    businessType: cleanText(body.businessType, 80),
    website: cleanText(body.website, 200),
    taxId: cleanText(body.taxId, 40),
    address: cleanText(body.address, 300),
  };
  const errors: Record<string, string> = {};
  if (billing.companyName.length < 2) errors.companyName = "Enter your business name";
  if (billing.contactName.length < 2) errors.contactName = "Enter the contact person's name";
  if (!isValidEmail(billing.email)) errors.email = "Enter a valid work email";
  if (!/^[+()\d\s-]{6,30}$/.test(billing.phone)) errors.phone = "Enter a valid phone number";
  if (billing.country.length < 2) errors.country = "Select your country";
  if (!(BUSINESS_TYPES as readonly string[]).includes(billing.businessType)) errors.businessType = "Select your business type";
  return Object.keys(errors).length ? { errors } : { billing };
}

function row(label: string, value: string | number | undefined | null) {
  if (value === undefined || value === null || value === "") return "";
  return `<tr><td style="padding:6px 12px 6px 0;color:#64748b;font-size:13px;vertical-align:top">${escapeHtml(label)}</td><td style="padding:6px 0;color:#0f172a;font-size:13px;font-weight:600">${escapeHtml(String(value))}</td></tr>`;
}

function shell(title: string, body: string) {
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
  <div style="background:#0f172a;color:#fff;padding:18px 24px;font-size:16px;font-weight:700">${escapeHtml(title)}</div>
  <div style="padding:24px">${body}</div>
  <div style="padding:14px 24px;border-top:1px solid #e2e8f0;color:#94a3b8;font-size:12px">PixPassport · support@pixpassport.com</div>
</div>`;
}

const fmtDate = (d?: Date) => (d ? new Date(d).toUTCString().slice(0, 16) : "");

/**
 * Starts the 30-day access period and sends the sales + welcome emails, exactly once per order.
 * Safe to call from verify, webhook and reconcile; only the first call does any work.
 */
export async function activateBusinessOrder(businessOrderId: string): Promise<void> {
  await dbConnect();
  const now = new Date();
  const claimed = await BusinessOrder.findOneAndUpdate(
    { _id: businessOrderId, status: "paid", adminNotifiedAt: { $exists: false } },
    {
      $set: {
        adminNotifiedAt: now,
        periodStart: now,
        periodEnd: new Date(now.getTime() + BUSINESS_BILLING_DAYS * 86_400_000),
      },
    },
    { returnDocument: "after" }
  );
  if (!claimed) return;

  await Promise.allSettled([sendSalesNewOrderEmail(claimed), sendWelcomeEmail(claimed)]);
}

async function sendSalesNewOrderEmail(o: IBusinessOrder) {
  const b = o.billing;
  const html = shell(
    `New Business plan sale – ${o.planName}`,
    `<p style="margin:0 0 14px;color:#0f172a;font-size:14px">A business customer has paid. Set up their cloud workspace once the onboarding form arrives.</p>
<table style="border-collapse:collapse">${[
      row("Plan", `${o.planName} (${o.photoLimit ? `${o.photoLimit.toLocaleString("en-US")} photos/month` : "Unlimited"})`),
      row("Amount", `${o.currency} ${o.amount}`),
      row("Razorpay payment", o.razorpayPaymentId),
      row("Business", b.companyName),
      row("Type", b.businessType),
      row("Contact", b.contactName),
      row("Email", b.email),
      row("Phone", b.phone),
      row("Country", b.country),
      row("Website", b.website),
      row("Tax ID", b.taxId),
      row("Address", b.address),
      row("Access period", `${fmtDate(o.periodStart)} → ${fmtDate(o.periodEnd)}`),
      row("Order ID", o._id.toString()),
    ].join("")}</table>`
  );
  const res = await sendEmail({ to: SALES_INBOX, subject: `💼 New ${o.planName} sale – ${b.companyName}`, html });
  if (!res.success) console.error("[BUSINESS] Sales notification failed:", res.error);
}

async function sendWelcomeEmail(o: IBusinessOrder) {
  const b = o.billing;
  const html = shell(
    `Welcome to ${o.planName}`,
    `<p style="margin:0 0 12px;color:#0f172a;font-size:14px">Hi ${escapeHtml(b.contactName)},</p>
<p style="margin:0 0 12px;color:#334155;font-size:14px;line-height:1.6">Thanks for choosing PixPassport for <strong>${escapeHtml(b.companyName)}</strong>. Your payment is confirmed and your plan is active from ${escapeHtml(fmtDate(o.periodStart))} to ${escapeHtml(fmtDate(o.periodEnd))}.</p>
<table style="border-collapse:collapse;margin:0 0 16px">${[
      row("Plan", o.planName),
      row("Photo allowance", o.photoLimit ? `${o.photoLimit.toLocaleString("en-US")} photos / month` : "Unlimited"),
      row("Amount paid", `${o.currency} ${o.amount}`),
      row("Payment ID", o.razorpayPaymentId),
    ].join("")}</table>
<p style="margin:0 0 12px;color:#334155;font-size:14px;line-height:1.6"><strong>Next step:</strong> if you haven't already, complete the workspace setup form shown after checkout (workspace name, admin and staff logins). Our team then creates your cloud workspace and emails your login details within 1 business day.</p>
<p style="margin:0;color:#334155;font-size:14px;line-height:1.6">Questions? Just reply to this email. Your tax invoice is sent in a separate email.</p>`
  );
  const res = await sendEmail({ to: b.email, subject: `Your ${o.planName} plan is active – PixPassport`, html });
  if (!res.success) console.error("[BUSINESS] Welcome email failed:", res.error);
}

export async function sendOnboardingSubmittedEmail(o: IBusinessOrder) {
  const ob = o.onboarding || {};
  const html = shell(
    `Workspace setup form – ${o.billing.companyName}`,
    `<p style="margin:0 0 14px;color:#0f172a;font-size:14px">Onboarding details submitted for a paid <strong>${escapeHtml(o.planName)}</strong> order. Create the workspace and send logins.</p>
<table style="border-collapse:collapse">${[
      row("Workspace name", ob.workspaceName),
      row("Admin", `${ob.adminName || ""} <${ob.adminEmail || ""}>`),
      row("Staff emails", (ob.teamEmails || []).join(", ")),
      row("Locations", ob.locations),
      row("Use cases", (ob.useCases || []).join(", ")),
      row("Main countries", ob.primaryCountries),
      row("Printer", ob.printerModel),
      row("Paper sizes", (ob.paperSizes || []).join(", ")),
      row("Logo URL", ob.logoUrl),
      row("Notes", ob.notes),
      row("Billing email", o.billing.email),
      row("Phone", o.billing.phone),
      row("Order ID", o._id.toString()),
      row("Payment ID", o.razorpayPaymentId),
    ].join("")}</table>`
  );
  const res = await sendEmail({ to: SALES_INBOX, subject: `🛠️ Workspace setup – ${o.billing.companyName} (${o.planName})`, html });
  if (!res.success) console.error("[BUSINESS] Onboarding notification failed:", res.error);
}
