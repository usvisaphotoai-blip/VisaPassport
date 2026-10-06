/**
 * Turns a Razorpay `payment.failed` payment entity into a customer-friendly
 * reason + fix steps, and renders the "payment failed" email.
 *
 * Razorpay fields used: error_reason, error_description, error_source,
 * error_step, method, card.international.
 * https://razorpay.com/docs/errors/payments/
 */

export interface PaymentFailureInfo {
  /** Short headline, e.g. "International payments are not enabled on your card" */
  title: string;
  /** One or two sentences explaining what happened */
  explanation: string;
  /** Concrete steps the customer can take */
  fixes: string[];
  /** Raw Razorpay reason code, shown small for support reference */
  code?: string;
}

const RETRY_OTHER_METHOD = "Try a different card, or pay with UPI, net banking or a wallet.";

const REASONS: Record<string, Omit<PaymentFailureInfo, "code">> = {
  international_transaction_not_allowed: {
    title: "International payments are not enabled on your card",
    explanation: "Your bank blocked this payment because international / online foreign transactions are turned off for your card.",
    fixes: [
      "Open your bank app or net banking and enable \"International transactions\" (sometimes called \"Overseas usage\" or \"Foreign transactions\") for this card.",
      "If you can't find the setting, call the number on the back of your card and ask them to allow international online payments.",
      RETRY_OTHER_METHOD,
    ],
  },
  authentication_failed: {
    title: "3D Secure / OTP verification failed",
    explanation: "The card security check (3D Secure, OTP or bank password) was not completed successfully, so your bank declined the payment.",
    fixes: [
      "Retry and enter the OTP or password from your bank carefully before it expires.",
      "Make sure your phone can receive SMS from your bank, and that pop-ups are not blocked in your browser.",
      "If your card is not enrolled for 3D Secure (Visa Secure / Mastercard Identity Check), ask your bank to enable it.",
    ],
  },
  incorrect_otp: {
    title: "Incorrect OTP entered",
    explanation: "The one-time password entered during card verification did not match.",
    fixes: [
      "Retry the payment and enter the latest OTP sent by your bank.",
      "Request a new OTP if the old one has expired.",
    ],
  },
  payment_timed_out: {
    title: "The payment timed out",
    explanation: "The payment was not completed in time, so it was cancelled automatically. If money was debited, it will be refunded by your bank automatically within 5–7 working days.",
    fixes: [
      "Retry the payment and complete the OTP / UPI approval within a few minutes.",
      "Use a stable internet connection.",
    ],
  },
  payment_cancelled: {
    title: "The payment was cancelled",
    explanation: "The payment window was closed or the payment was cancelled before it was completed.",
    fixes: ["Retry the payment and complete all steps without closing the window."],
  },
  insufficient_funds: {
    title: "Insufficient balance",
    explanation: "Your bank declined the payment because there wasn't enough balance or available credit.",
    fixes: ["Check your balance or credit limit and retry.", RETRY_OTHER_METHOD],
  },
  card_declined: {
    title: "Your card was declined by the bank",
    explanation: "Your bank declined this payment without giving a specific reason.",
    fixes: [
      "Contact your bank to confirm the card is active and allowed for online payments.",
      "Check that online / e-commerce transactions are enabled for your card in your bank app.",
      RETRY_OTHER_METHOD,
    ],
  },
  card_not_supported: {
    title: "This card type is not supported",
    explanation: "The card network or card type you used could not be accepted for this payment.",
    fixes: [RETRY_OTHER_METHOD],
  },
  expired_card: {
    title: "Your card has expired",
    explanation: "The card used for this payment is past its expiry date.",
    fixes: ["Use a valid, non-expired card.", RETRY_OTHER_METHOD],
  },
  incorrect_card_details: {
    title: "Incorrect card details",
    explanation: "The card number, expiry date or CVV entered did not match your bank's records.",
    fixes: ["Re-enter your card number, expiry date and CVV carefully and retry."],
  },
  incorrect_cvv: {
    title: "Incorrect CVV",
    explanation: "The 3-digit (or 4-digit) security code entered was incorrect.",
    fixes: ["Retry and enter the CVV printed on the back of your card."],
  },
  transaction_limit_exceeded: {
    title: "Transaction limit exceeded",
    explanation: "This payment exceeds the daily or per-transaction limit set on your card or account.",
    fixes: [
      "Increase your online transaction limit in your bank app, or contact your bank.",
      RETRY_OTHER_METHOD,
    ],
  },
  payment_risk_check_failed: {
    title: "The payment was flagged by a security check",
    explanation: "This payment was blocked by an automated fraud-prevention check. This sometimes happens with new cards or unusual locations.",
    fixes: [
      "Retry once more — these checks are sometimes temporary.",
      RETRY_OTHER_METHOD,
      "If it keeps failing, reply to this email and we'll help you complete the order.",
    ],
  },
  bank_technical_error: {
    title: "Your bank had a temporary technical issue",
    explanation: "Your bank's servers could not process the payment right now. This is not a problem with your card.",
    fixes: ["Wait a few minutes and retry.", RETRY_OTHER_METHOD],
  },
  gateway_technical_error: {
    title: "Temporary payment network issue",
    explanation: "The payment network had a temporary problem processing this payment.",
    fixes: ["Wait a few minutes and retry.", RETRY_OTHER_METHOD],
  },
  server_error: {
    title: "Temporary payment network issue",
    explanation: "The payment could not be processed due to a temporary technical problem.",
    fixes: ["Wait a few minutes and retry.", RETRY_OTHER_METHOD],
  },
  upi_request_expired: {
    title: "UPI request expired",
    explanation: "The UPI collect request was not approved in your UPI app in time.",
    fixes: ["Retry and approve the request in your UPI app (GPay, PhonePe, Paytm, etc.) within a few minutes."],
  },
};

// Aliases Razorpay uses for the same underlying cause
const ALIASES: Record<string, string> = {
  international_transactions_not_allowed: "international_transaction_not_allowed",
  card_not_enabled_for_international_transactions: "international_transaction_not_allowed",
  authentication_error: "authentication_failed",
  payment_authentication_failed: "authentication_failed",
  otp_incorrect: "incorrect_otp",
  payment_expired: "payment_timed_out",
  payment_cancelled_by_user: "payment_cancelled",
  insufficient_balance: "insufficient_funds",
  payment_declined: "card_declined",
  card_expired: "expired_card",
  invalid_card_number: "incorrect_card_details",
  card_number_invalid: "incorrect_card_details",
  invalid_cvv: "incorrect_cvv",
  amount_exceeds_limit: "transaction_limit_exceeded",
  limit_exceeded: "transaction_limit_exceeded",
  bank_server_error: "bank_technical_error",
  gateway_error: "gateway_technical_error",
};

/** Keyword fallback over error_description when error_reason is missing/unknown. */
function matchDescription(desc: string): string | undefined {
  const d = desc.toLowerCase();
  if (/international|foreign|overseas|cross.?border/.test(d)) return "international_transaction_not_allowed";
  if (/3d ?secure|3ds|authenticat|otp|password/.test(d)) return /incorrect|wrong|invalid/.test(d) && /otp/.test(d) ? "incorrect_otp" : "authentication_failed";
  if (/insufficient|balance/.test(d)) return "insufficient_funds";
  if (/expired card|card.*expired/.test(d)) return "expired_card";
  if (/cvv/.test(d)) return "incorrect_cvv";
  if (/limit/.test(d)) return "transaction_limit_exceeded";
  if (/timed? ?out|expired/.test(d)) return "payment_timed_out";
  if (/cancel/.test(d)) return "payment_cancelled";
  if (/risk|fraud|suspicious/.test(d)) return "payment_risk_check_failed";
  if (/declin/.test(d)) return "card_declined";
  if (/not supported/.test(d)) return "card_not_supported";
  if (/bank.*(down|unavailable|technical)/.test(d)) return "bank_technical_error";
  return undefined;
}

export function getPaymentFailureInfo(paymentEntity: any): PaymentFailureInfo {
  const rawReason = String(paymentEntity?.error_reason || "").toLowerCase().trim();
  const description = String(paymentEntity?.error_description || "");

  let key = ALIASES[rawReason] || (REASONS[rawReason] ? rawReason : undefined);
  if (!key && description) key = matchDescription(description);

  // Generic card decline on an international card → most likely international txns disabled
  if (key === "card_declined" && paymentEntity?.card?.international === true) {
    key = "international_transaction_not_allowed";
  }

  if (key) return { ...REASONS[key], code: rawReason || undefined };

  // Unknown — still tell the customer what Razorpay told us, if anything
  return {
    title: "Your bank could not complete the payment",
    explanation: description
      ? `Reason from the payment network: "${description}"`
      : "The payment was declined before it could be completed. No money has been charged, or if it was, it will be refunded automatically.",
    fixes: [
      "Check that online and international transactions are enabled for your card in your bank app.",
      "Complete the 3D Secure / OTP step if your bank asks for it.",
      RETRY_OTHER_METHOD,
    ],
    code: rawReason || undefined,
  };
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

export interface PaymentFailedEmailOptions {
  failure: PaymentFailureInfo;
  /** e.g. "India Passport Photo" or "Expert Photo Edit" */
  productLabel: string;
  retryUrl: string;
  retryLabel: string;
  /** Extra rows for the details table */
  details: Array<[string, string]>;
  /** Formatted amount, e.g. "₹299.00" */
  amount?: string;
  supportEmail?: string;
}

/**
 * Email-client-safe HTML (tables + solid colours; no flex / gradients,
 * which Outlook and some Gmail apps drop). Deliberately contains no photo:
 * the customer hasn't paid, so we never send the image itself.
 */
export function renderPaymentFailedEmail(opts: PaymentFailedEmailOptions): string {
  const { failure, productLabel, retryUrl, retryLabel, details, amount } = opts;
  const supportEmail = opts.supportEmail || "support@pixpassport.com";
  const rows = (amount ? [["Amount", amount] as [string, string]] : []).concat(details);

  return `
<div style="background:#f1f5f9;padding:24px 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;border:1px solid #e2e8f0;">
    <tr><td style="padding:28px 28px 8px;text-align:center;">
      <img src="https://res.cloudinary.com/ddxu2wqfm/image/upload/v1774782293/logo_evktxq.jpg" alt="PixPassport" width="48" height="48" style="border-radius:10px;display:inline-block;" />
      <h1 style="font-size:20px;line-height:1.3;color:#0f172a;margin:14px 0 6px;">Your payment didn't go through</h1>
      <p style="font-size:14px;color:#64748b;margin:0;">${escapeHtml(productLabel)} — no charge was made, your order is saved.</p>
    </td></tr>

    <tr><td style="padding:20px 28px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fef2f2;border:1px solid #fecaca;border-radius:10px;">
        <tr><td style="padding:16px 18px;">
          <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:#b91c1c;text-transform:uppercase;letter-spacing:.04em;">Why it failed</p>
          <p style="margin:0 0 6px;font-size:16px;font-weight:700;color:#7f1d1d;">${escapeHtml(failure.title)}</p>
          <p style="margin:0;font-size:14px;line-height:1.55;color:#7f1d1d;">${escapeHtml(failure.explanation)}</p>
        </td></tr>
      </table>
    </td></tr>

    <tr><td style="padding:20px 28px 0;">
      <p style="margin:0 0 8px;font-size:15px;font-weight:700;color:#0f172a;">How to fix it</p>
      <ol style="margin:0;padding-left:20px;font-size:14px;line-height:1.6;color:#334155;">
        ${failure.fixes.map((f) => `<li style="margin-bottom:6px;">${escapeHtml(f)}</li>`).join("")}
      </ol>
    </td></tr>

    <tr><td style="padding:24px 28px;text-align:center;">
      <a href="${retryUrl}" style="display:inline-block;background:#1e40af;color:#ffffff;padding:13px 28px;border-radius:8px;text-decoration:none;font-size:15px;font-weight:700;">${escapeHtml(retryLabel)}</a>
      <p style="margin:10px 0 0;font-size:12px;color:#64748b;">Or open: <a href="${retryUrl}" style="color:#2563eb;word-break:break-all;">${retryUrl}</a></p>
    </td></tr>

    ${rows.length ? `
    <tr><td style="padding:0 28px 20px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;color:#475569;border-top:1px solid #e2e8f0;">
        ${rows.map(([k, v]) => `<tr><td style="padding:8px 0 0;">${escapeHtml(k)}</td><td style="padding:8px 0 0;text-align:right;font-weight:600;color:#0f172a;">${escapeHtml(v)}</td></tr>`).join("")}
      </table>
    </td></tr>` : ""}

    <tr><td style="padding:16px 28px 24px;border-top:1px solid #e2e8f0;text-align:center;">
      <p style="margin:0 0 4px;font-size:13px;color:#475569;">Still stuck? Just reply to this email or write to <a href="mailto:${supportEmail}" style="color:#2563eb;">${supportEmail}</a> — we usually respond within a few hours.</p>
      <p style="margin:0 0 4px;font-size:12px;color:#64748b;">If money was deducted, your bank will reverse it automatically within 5–7 working days.</p>
      ${failure.code ? `<p style="margin:8px 0 0;font-size:11px;color:#94a3b8;">Reference: ${escapeHtml(failure.code)}</p>` : ""}
    </td></tr>
  </table>
</div>`;
}
