import { formatCurrency } from "@/lib/currency-formatter";

// App theme: Tailwind lime-600 / lime-700. Inline styles are the light theme;
// the <style> block in the shell swaps them for dark mode via the class names.
const BRAND = {
  primary: "#65a30d", // lime-600
  primaryDark: "#4d7c0f", // lime-700
  primarySoft: "#f7fee7", // lime-50
  primaryLight: "#d9f99d", // lime-200
  text: "#0f172a",
  muted: "#64748b",
  border: "#e5e7eb",
  bg: "#f4f5f2",
  card: "#ffffff",
  success: "#15803d",
};

const DARK = {
  bg: "#0b0f0a",
  card: "#161b15",
  soft: "#1d2a14",
  border: "#2a3326",
  text: "#f1f5f9",
  muted: "#a3aab5",
  link: "#a3e635", // lime-400
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

// Dark-mode overrides. Apple Mail / iOS / Outlook (mac, iOS) honour the media query;
// Outlook.com uses the [data-ogsc]/[data-ogsb] attributes. Gmail ignores both and
// auto-inverts, which works because nothing relies on light-only colours.
const DARK_CSS = `
:root{color-scheme:light dark;supported-color-schemes:light dark;}
@media (prefers-color-scheme: dark){
  .e-bg{background:${DARK.bg}!important;}
  .e-card{background:${DARK.card}!important;border-color:${DARK.border}!important;}
  .e-soft{background:${DARK.soft}!important;border-color:${DARK.border}!important;}
  .e-t{color:${DARK.text}!important;}
  .e-m{color:${DARK.muted}!important;}
  .e-l{color:${DARK.link}!important;}
  .e-bd{border-color:${DARK.border}!important;}
}
[data-ogsb] .e-bg{background:${DARK.bg}!important;}
[data-ogsb] .e-card{background:${DARK.card}!important;}
[data-ogsb] .e-soft{background:${DARK.soft}!important;}
[data-ogsc] .e-t{color:${DARK.text}!important;}
[data-ogsc] .e-m{color:${DARK.muted}!important;}
[data-ogsc] .e-l{color:${DARK.link}!important;}
@media (max-width:480px){ .e-pad{padding:20px 18px!important;} }
`;

const link = (href: string, label: string) =>
  `<a href="${href}" class="e-l" style="color:${BRAND.primaryDark};font-weight:600;text-decoration:none;">${label}</a>`;

// Table-based "bulletproof" button so Outlook keeps the padding.
const primaryButton = (href: string, label: string) => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
    <td align="center" bgcolor="${BRAND.primary}" style="border-radius:10px;background:${BRAND.primary};">
      <a href="${href}" style="display:block;padding:13px 20px;font-family:${FONT};font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:10px;">${label}</a>
    </td>
  </tr></table>`;

const card = (inner: string, opts: { soft?: boolean; pad?: string } = {}) => {
  const bg = opts.soft ? BRAND.primarySoft : BRAND.card;
  const border = opts.soft ? BRAND.primaryLight : BRAND.border;
  return `<tr><td style="padding:0 0 12px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="${opts.soft ? "e-soft" : "e-card"}" bgcolor="${bg}" style="background:${bg};border:1px solid ${border};border-radius:14px;"><tr><td class="e-pad" style="padding:${opts.pad || "24px"};">${inner}</td></tr></table></td></tr>`;
};

const row = (label: string, value: string, top = false) => {
  const line = top ? `border-top:1px solid ${BRAND.border};` : "";
  return `<tr><td class="e-m e-bd" style="padding:6px 0;${line}color:${BRAND.muted};font-size:13px;">${label}</td><td class="e-t e-bd" style="padding:6px 0;${line}text-align:right;font-size:13px;font-weight:${top ? 800 : 600};color:${BRAND.text};">${value}</td></tr>`;
};

/** Compact support line shown in every customer email after payment. */
export function renderSupportBlock(appUrl: string) {
  return card(`
    <p class="e-t" style="margin:0 0 4px;font-size:14px;font-weight:700;color:${BRAND.text};">Photo rejected? Just reply to this email.</p>
    <p class="e-m" style="margin:0;font-size:13px;line-height:1.55;color:${BRAND.muted};">If your ICAO-standard photo is rejected by the authorities, or the crop/background isn't right, reply to this email and we'll fix or redo it for free. You can also write to ${link(`mailto:${SUPPORT_EMAIL}?subject=Help%20with%20my%20photo`, SUPPORT_EMAIL)} · ${link(`${appUrl}/contact`, "Contact us")}. We usually reply within 15 minutes to 1 hour.</p>
  `, { soft: true, pad: "16px 20px" });
}

export function renderEmailShell(appUrl: string, body: string, preheader = "") {
  const logo = getEmailLogoUrl(appUrl);
  const sep = `<span class="e-m" style="color:${BRAND.muted};">&nbsp;·&nbsp;</span>`;
  const footLink = (href: string, label: string) =>
    `<a href="${href}" class="e-m" style="color:${BRAND.muted};text-decoration:none;">${label}</a>`;
  return `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light dark" />
<meta name="supported-color-schemes" content="light dark" />
<title>PixPassport</title>
<style>${DARK_CSS}</style>
</head>
<body class="e-bg" style="margin:0;padding:0;background:${BRAND.bg};-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${preheader}&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="e-bg" bgcolor="${BRAND.bg}" style="background:${BRAND.bg};font-family:${FONT};color:${BRAND.text};">
  <tr><td align="center" style="padding:24px 12px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">
      <tr><td style="padding:0 4px 14px;">
        <a href="${appUrl}" style="text-decoration:none;">
          <img src="${logo}" alt="PixPassport" width="22" height="22" style="display:inline-block;vertical-align:middle;width:22px;height:22px;border-radius:6px;border:0;" />
          <span class="e-t" style="display:inline-block;vertical-align:middle;margin-left:6px;font-size:15px;font-weight:800;letter-spacing:-0.3px;color:${BRAND.text};">Pix<span style="color:${BRAND.primary};">Passport</span></span>
        </a>
      </td></tr>
      ${body}
      <tr><td align="center" style="padding:8px 16px 0;">
        <p style="margin:0 0 6px;font-size:12px;">
          ${link(appUrl, "pixpassport.com")}${sep}${link("https://pixpassport.uk/", "pixpassport.uk")}${sep}${footLink(`${appUrl}/faq`, "FAQ")}${sep}${footLink(`${appUrl}/refund-policy`, "Refund Policy")}
        </p>
        <p class="e-m" style="margin:0;font-size:11px;line-height:1.5;color:${BRAND.muted};">You're receiving this because you purchased a photo on PixPassport.<br/>© ${new Date().getFullYear()} PixPassport</p>
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
  const specLine = [
    hasMm ? `${spec.width_mm}×${spec.height_mm} mm` : null,
    `${spec.width_px}×${spec.height_px} px`,
    `${bg} background`,
    `${spec.dpi || 300} DPI JPEG`,
  ].filter(Boolean).join(" · ");

  // Hero + the exact (unwatermarked) file the customer downloads, in one card.
  const main = card(`
    <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:0.6px;text-transform:uppercase;color:${BRAND.primary};">✓ Payment successful</p>
    <h1 class="e-t" style="margin:0 0 4px;font-size:22px;line-height:1.3;font-weight:800;letter-spacing:-0.4px;color:${BRAND.text};">Your ${p.documentName} photo is ready</h1>
    <p class="e-m" style="margin:0 0 18px;font-size:14px;line-height:1.5;color:${BRAND.muted};">${p.countryName} compliant · ${specLine}</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 18px;">
      <tr><td align="center" class="e-soft" bgcolor="${BRAND.primarySoft}" style="padding:20px;background:${BRAND.primarySoft};border-radius:12px;">
        <a href="${p.photoUrl}" style="text-decoration:none;">
          <img src="${p.photoUrl}" alt="Your ${p.documentName} photo" width="170" style="display:block;width:100%;max-width:170px;height:auto;border-radius:4px;border:4px solid #ffffff;" />
        </a>
      </td></tr>
    </table>
    ${primaryButton(p.photoUrl, "⬇&nbsp; Download photo")}
    <p class="e-m" style="margin:14px 0 0;font-size:13px;line-height:1.6;text-align:center;color:${BRAND.muted};">
      ${link(p.previewLink, "View online")} (available for 7 days)${p.originalUrl ? ` · ${link(p.originalUrl, "Original upload")}` : ""}
    </p>
    <p class="e-m" style="margin:6px 0 0;font-size:12px;line-height:1.5;text-align:center;color:${BRAND.muted};">Upload it to the official ${p.countryName} portal${hasMm ? ` or print it at ${spec.width_mm}×${spec.height_mm} mm` : ""}.</p>
  `);

  const invoice = p.invoice ? card(`
    <p class="e-t" style="margin:0 0 8px;font-size:14px;font-weight:700;color:${BRAND.text};">Receipt</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row("Invoice", p.invoice.invoiceNumber)}
      ${row("Item", p.documentName)}
      ${row("Method", p.invoice.paymentMethod || "UPI / Card")}
      ${row("Paid", `<span style="color:${BRAND.success};font-size:11px;font-weight:700;">● PAID</span>&nbsp; ${formatCurrency(p.invoice.total, p.invoice.currency)}`, true)}
    </table>
    <p class="e-m" style="margin:10px 0 0;font-size:12px;color:${BRAND.muted};">${p.invoiceAttached ? "📎 Tax invoice PDF attached." : "Tax invoice PDF available for your records."}${p.invoiceDownloadUrl ? ` ${link(p.invoiceDownloadUrl, "Download PDF")}` : ""}</p>
  `, { pad: "18px 20px" }) : "";

  return renderEmailShell(
    p.appUrl,
    main + invoice + renderSupportBlock(p.appUrl),
    `Your ${p.documentName} photo is ready to download.`
  );
}
