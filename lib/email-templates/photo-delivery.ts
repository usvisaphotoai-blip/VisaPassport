import { formatCurrency } from "@/lib/currency-formatter";

// App theme: Tailwind lime-600 / lime-700
const BRAND = {
  primary: "#65a30d", // lime-600
  primaryDark: "#4d7c0f", // lime-700
  primaryLight: "#ecfccb", // lime-100
  primarySoft: "#f7fee7", // lime-50
  primaryText: "#3f6212", // lime-800
  text: "#0f172a",
  body: "#475569",
  muted: "#64748b",
  faint: "#94a3b8",
  border: "#e2e8f0",
  bg: "#f3f5f1",
  success: "#15803d",
};

const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

export const SUPPORT_EMAIL = "support@pixpassport.com";

export function getEmailLogoUrl(appUrl: string) {
  return `${appUrl.replace(/\/$/, "")}/logo.png`;
}

interface PhotoDeliveryEmailParams {
  appUrl: string;
  countryName: string;
  documentName: string;
  spec: {
    width_px: number | string;
    height_px: number | string;
    width_mm?: number | string;
    height_mm?: number | string;
    dpi?: number | string;
    bg_color?: string;
  };
  photoUrl: string;
  originalUrl?: string;
  previewLink: string;
  invoice?: {
    invoiceNumber: string;
    total: number;
    currency: string;
    paymentMethod?: string;
  } | null;
  invoiceAttached: boolean;
  invoiceDownloadUrl?: string;
}

// Full-width "bulletproof" button (table-based so Outlook keeps padding)
const primaryButton = (href: string, label: string) => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
    <td align="center" bgcolor="${BRAND.primary}" style="border-radius:12px;background:${BRAND.primary};">
      <a href="${href}" style="display:block;padding:15px 24px;font-family:${FONT};font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:12px;">${label}</a>
    </td>
  </tr></table>`;

const secondaryButton = (href: string, label: string) =>
  `<a href="${href}" style="display:inline-block;padding:11px 20px;border:1.5px solid ${BRAND.primary};border-radius:10px;font-size:14px;font-weight:700;color:${BRAND.primaryDark};text-decoration:none;background:#ffffff;white-space:nowrap;">${label}</a>`;

const card = (inner: string, opts: { bg?: string; border?: string; pad?: string } = {}) =>
  `<tr><td style="padding:0 0 16px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${opts.bg || "#ffffff"}" style="background:${opts.bg || "#ffffff"};border:1px solid ${opts.border || BRAND.border};border-radius:16px;"><tr><td style="padding:${opts.pad || "28px 24px"};">${inner}</td></tr></table></td></tr>`;

const sectionTitle = (title: string, subtitle?: string) =>
  `<p style="margin:0 0 ${subtitle ? "4px" : "16px"};font-size:17px;font-weight:800;color:${BRAND.text};letter-spacing:-0.2px;">${title}</p>${subtitle ? `<p style="margin:0 0 20px;font-size:13px;color:${BRAND.muted};">${subtitle}</p>` : ""}`;

const row = (label: string, value: string, opts: { color?: string; bold?: boolean; top?: boolean } = {}) => {
  const line = opts.top ? `border-top:1px solid ${BRAND.border};` : "";
  return `<tr><td style="padding:9px 0;${line}color:${BRAND.muted};font-size:14px;">${label}</td><td style="padding:9px 0;${line}text-align:right;font-size:14px;font-weight:${opts.bold ? 800 : 600};color:${opts.color || BRAND.text};">${value}</td></tr>`;
};

const chip = (label: string, value: string) => `
  <td align="center" width="33%" style="padding:0 4px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.primarySoft};border:1px solid ${BRAND.primaryLight};border-radius:10px;"><tr><td align="center" style="padding:10px 6px;">
      <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:0.6px;text-transform:uppercase;color:${BRAND.muted};">${label}</p>
      <p style="margin:3px 0 0;font-size:13px;font-weight:800;color:${BRAND.primaryText};">${value}</p>
    </td></tr></table>
  </td>`;

const step = (n: number, title: string, text: string) => `
  <tr><td valign="top" width="38" style="padding:0 0 14px;">
    <div style="width:26px;height:26px;line-height:26px;border-radius:50%;background:${BRAND.primary};color:#ffffff;font-size:13px;font-weight:800;text-align:center;">${n}</div>
  </td><td valign="top" style="padding:2px 0 14px;">
    <p style="margin:0;font-size:14px;font-weight:700;color:${BRAND.text};">${title}</p>
    <p style="margin:2px 0 0;font-size:13px;line-height:1.5;color:${BRAND.muted};">${text}</p>
  </td></tr>`;

/** Support block shown in every customer email after payment. */
export function renderSupportBlock(appUrl: string) {
  return card(`
    <p style="margin:0 0 6px;font-size:17px;font-weight:800;color:${BRAND.text};">💬 Any issue with your photo? Please contact us</p>
    <p style="margin:0 0 18px;font-size:14px;line-height:1.6;color:${BRAND.body};">Photo rejected, crop or background not right, or anything else photo-related — our team will fix or redo it for free.</p>
    <table role="presentation" cellpadding="0" cellspacing="0"><tr>
      <td style="padding:0 8px 8px 0;"><a href="mailto:${SUPPORT_EMAIL}?subject=Help%20with%20my%20photo" style="display:inline-block;padding:11px 20px;border-radius:10px;background:${BRAND.primary};font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;white-space:nowrap;">✉ Email Support</a></td>
      <td style="padding:0 0 8px;">${secondaryButton(`${appUrl}/contact`, "Contact Us")}</td>
    </tr></table>
    <p style="margin:6px 0 0;font-size:12px;line-height:1.5;color:${BRAND.muted};">Or just reply to this email · <a href="mailto:${SUPPORT_EMAIL}" style="color:${BRAND.primaryDark};font-weight:600;text-decoration:none;">${SUPPORT_EMAIL}</a> · We usually reply within 24 hours.</p>
  `, { bg: BRAND.primarySoft, border: BRAND.primaryLight });
}

export function renderEmailShell(appUrl: string, body: string, preheader = "") {
  const logo = getEmailLogoUrl(appUrl);
  return `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light only" />
<meta name="supported-color-schemes" content="light" />
<title>PixPassport</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.bg};-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${preheader}&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${BRAND.bg}" style="background:${BRAND.bg};font-family:${FONT};color:${BRAND.text};">
  <tr><td align="center" style="padding:28px 12px 32px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
      <tr><td style="padding:0 4px 20px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
          <td valign="middle">
            <a href="${appUrl}" style="text-decoration:none;">
              <img src="${logo}" alt="PixPassport" width="40" height="40" style="display:inline-block;vertical-align:middle;width:40px;height:40px;border-radius:10px;border:0;" />
              <span style="display:inline-block;vertical-align:middle;margin-left:10px;font-size:20px;font-weight:800;letter-spacing:-0.4px;color:${BRAND.text};">Pix<span style="color:${BRAND.primary};">Passport</span></span>
            </a>
          </td>
          <td align="right" valign="middle" style="font-size:12px;color:${BRAND.muted};">Passport &amp; Visa Photos</td>
        </tr></table>
      </td></tr>
      ${body}
      <tr><td align="center" style="padding:12px 16px 0;">
        <p style="margin:0 0 8px;font-size:13px;">
          <a href="${appUrl}" style="color:${BRAND.primaryDark};text-decoration:none;font-weight:700;">pixpassport.com</a>
          <span style="color:#cbd5e1;">&nbsp;·&nbsp;</span><a href="https://pixpassport.uk/" style="color:${BRAND.primaryDark};text-decoration:none;font-weight:700;">pixpassport.uk</a>
          <span style="color:#cbd5e1;">&nbsp;·&nbsp;</span><a href="${appUrl}/faq" style="color:${BRAND.muted};text-decoration:none;">FAQ</a>
          <span style="color:#cbd5e1;">&nbsp;·&nbsp;</span><a href="${appUrl}/refund-policy" style="color:${BRAND.muted};text-decoration:none;">Refund Policy</a>
          <span style="color:#cbd5e1;">&nbsp;·&nbsp;</span><a href="mailto:${SUPPORT_EMAIL}" style="color:${BRAND.muted};text-decoration:none;">Support</a>
        </p>
        <p style="margin:0;font-size:11px;line-height:1.6;color:${BRAND.faint};">You're receiving this email because you purchased a photo on PixPassport.<br/>© ${new Date().getFullYear()} PixPassport — Professional Passport &amp; Visa Photo Processing</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

export function renderPhotoDeliveryEmail(p: PhotoDeliveryEmailParams) {
  const { spec } = p;
  const hasMm = spec.width_mm && spec.width_mm !== "unspecified";
  const bg = spec.bg_color ? spec.bg_color.charAt(0).toUpperCase() + spec.bg_color.slice(1) : "White";

  const hero = card(`
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
      <div style="width:56px;height:56px;line-height:56px;border-radius:50%;background:#ffffff;color:${BRAND.primary};font-size:28px;font-weight:800;text-align:center;margin:0 auto 16px;">✓</div>
      <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${BRAND.primaryLight};">Payment Successful</p>
      <h1 style="margin:0 0 10px;font-size:26px;line-height:1.25;font-weight:800;letter-spacing:-0.5px;color:#ffffff;">Your ${p.documentName} photo is ready</h1>
      <p style="margin:0;font-size:15px;line-height:1.5;color:${BRAND.primaryLight};">Thank you for choosing PixPassport. Your compliant photo is ready to download.</p>
    </td></tr></table>
  `, { bg: BRAND.primary, border: BRAND.primary, pad: "36px 28px" });

  // The exact file the customer downloads (unwatermarked final photo), shown large.
  const photo = card(`
    ${sectionTitle(`📸 Your ${p.countryName} Photo`, "This is the exact photo you are downloading.")}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" bgcolor="${BRAND.primarySoft}" style="padding:24px;background:${BRAND.primarySoft};border-radius:14px;">
        <a href="${p.photoUrl}" style="text-decoration:none;">
          <img src="${p.photoUrl}" alt="Your ${p.documentName} photo" width="220" style="display:block;width:100%;max-width:220px;height:auto;border-radius:6px;border:6px solid #ffffff;box-shadow:0 6px 18px rgba(15,23,42,0.12);" />
        </a>
        <p style="margin:14px 0 0;"><span style="display:inline-block;padding:5px 12px;border-radius:999px;background:#ffffff;border:1px solid ${BRAND.primaryLight};font-size:12px;font-weight:700;color:${BRAND.primaryText};">✓ ${p.countryName} Compliant</span></p>
      </td></tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0 20px;"><tr>
      ${chip("Size", hasMm ? `${spec.width_mm}×${spec.height_mm} mm` : `${spec.width_px}×${spec.height_px}`)}
      ${chip("Pixels", `${spec.width_px}×${spec.height_px}`)}
      ${chip("Background", bg)}
    </tr></table>
    ${primaryButton(p.photoUrl, "⬇&nbsp; Download Your Photo")}
    <p style="margin:12px 0 0;font-size:12px;text-align:center;color:${BRAND.muted};">JPEG · ${spec.dpi || 300} DPI · sRGB</p>
  `);

  const original = p.originalUrl ? card(`
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
      <td valign="middle" width="92" style="padding-right:16px;">
        <a href="${p.originalUrl}"><img src="${p.originalUrl}" alt="Your original upload" width="76" style="display:block;width:76px;height:auto;border-radius:10px;border:1px solid ${BRAND.border};" /></a>
      </td>
      <td valign="middle">
        <p style="margin:0 0 2px;font-size:15px;font-weight:700;color:${BRAND.text};">Your original upload</p>
        <p style="margin:0 0 10px;font-size:13px;color:${BRAND.muted};">The photo you uploaded, before processing.</p>
        <a href="${p.originalUrl}" style="font-size:13px;font-weight:700;color:${BRAND.primaryDark};text-decoration:none;">⬇ Download original →</a>
      </td>
    </tr></table>
  `, { pad: "18px 20px" }) : "";

  const access = `
    <tr><td style="padding:0 0 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px dashed #bef264;border-radius:12px;background:#ffffff;"><tr><td style="padding:14px 18px;">
        <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:${BRAND.text};">🕒 Access your photo anytime within a week</p>
        <a href="${p.previewLink}" style="font-size:13px;color:${BRAND.primaryDark};font-weight:600;word-break:break-all;">${p.previewLink}</a>
      </td></tr></table>
    </td></tr>`;

  const nextSteps = card(`
    ${sectionTitle("What's next?")}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${step(1, "Download your photo", "Save the photo to your device using the button above.")}
      ${step(2, "Submit or print", `Upload it to the official ${p.countryName} application portal${hasMm ? `, or print it at ${spec.width_mm}×${spec.height_mm} mm` : ""}.`)}
      ${step(3, "Need a change?", "Reply to this email — we'll fix any issue for free.")}
    </table>
  `);

  const invoice = p.invoice ? card(`
    ${sectionTitle("🧾 Payment Receipt")}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row("Invoice number", p.invoice.invoiceNumber)}
      ${row("Item", p.documentName)}
      ${row("Payment method", p.invoice.paymentMethod || "UPI / Card")}
      ${row("Amount paid", `${formatCurrency(p.invoice.total, p.invoice.currency)} <span style="font-size:11px;font-weight:700;color:${BRAND.success};background:#dcfce7;padding:2px 8px;border-radius:999px;margin-left:4px;">PAID</span>`, { bold: true, top: true })}
    </table>
    <p style="margin:16px 0 ${p.invoiceDownloadUrl ? "14px" : "0"};font-size:12px;color:${BRAND.muted};">${p.invoiceAttached ? "📎 Your official tax invoice PDF is attached to this email." : "Download your official tax invoice PDF for your records."}</p>
    ${p.invoiceDownloadUrl ? secondaryButton(p.invoiceDownloadUrl, "⬇ Download Invoice PDF") : ""}
  `) : "";

  const feedback = `
    <tr><td align="center" style="padding:8px 16px 24px;">
      <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:${BRAND.text};">Happy with your photo? ⭐⭐⭐⭐⭐</p>
      <p style="margin:0;font-size:13px;color:${BRAND.muted};">Reply with a quick testimonial — we may feature it on our site!</p>
    </td></tr>`;

  return renderEmailShell(
    p.appUrl,
    hero + photo + original + access + renderSupportBlock(p.appUrl) + nextSteps + invoice + feedback,
    `Your ${p.documentName} photo is ready to download.`
  );
}
