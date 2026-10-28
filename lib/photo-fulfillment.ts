import crypto from "crypto";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";
import Order from "@/models/Order";
import Payment from "@/models/Payment";
import AuditEvent from "@/models/AuditEvent";
import Invoice from "@/models/Invoice";
import { sendEmail } from "@/lib/mail";
import { renderPhotoDeliveryEmail, renderExpertOrderEmail } from "@/lib/email-templates/photo-delivery";
import { EmailLocale, normalizeEmailLocale, localizedDocNames, localizedPreviewPath, getEmailStrings } from "@/lib/email-templates/email-i18n";
import { getSafeSpec } from "@/lib/specs";
import { logAuditEvent, claimEmailSend, releaseEmailClaim, countFailedEmailSends } from "@/lib/audit";
import { autoGenerateAndStoreInvoice } from "@/lib/invoice-automation";
import { sendGA4PurchaseEvent } from "@/lib/ga4";
import { withKeyedLock } from "@/lib/keyed-lock";

const PLACEHOLDER_EMAILS = ["guest@pixpassport.com", "customer@pixpassport.com"];
/** Stop retrying an email after this many logged failures (bad address, provider rejection) */
const MAX_EMAIL_FAILURES = 3;
/** Never move these back to paid / captured on a late or replayed event */
const FINAL_ORDER_STATUSES = ["refunded", "partially_refunded", "disputed"];
const FINAL_PAYMENT_STATUSES = ["refunded", "partially_refunded"];

export interface FulfillPhotoPaymentOptions {
  photoId: string;
  razorpayPaymentId: string;
  razorpayOrderId?: string;
  /** "system" (browser verify), "webhook", or "reconcile" — recorded on audit events */
  actor: string;
  /** Razorpay payment entity when known (webhook / reconcile) — gives real amount, method, email */
  paymentEntity?: any;
  sessionUserId?: string;
  sessionEmail?: string;
  gaClientId?: string;
  /** Fallback language when the photo has none stored */
  localeHint?: string;
}

export interface FulfillPhotoPaymentResult {
  success: boolean;
  downloadToken?: string;
  error?: string;
}

/**
 * Single, idempotent fulfillment path for a captured photo payment:
 * mark photo paid → Order/Payment records → tax invoice → delivery email.
 *
 * Browser verify, the Razorpay webhook and the reconcile job all call this. Each step is
 * safe to repeat (invoice is per-payment idempotent, email is guarded by an atomic claim),
 * so whichever path runs first fulfills and later runs only fill in anything that was missed.
 * Calls for the same photo are serialized within the process.
 */
export async function fulfillPhotoPayment(opts: FulfillPhotoPaymentOptions): Promise<FulfillPhotoPaymentResult> {
  if (!mongoose.isValidObjectId(opts.photoId)) return { success: false, error: "Invalid photo id" };
  return withKeyedLock(`photo:${opts.photoId}`, () => fulfill(opts));
}

async function fulfill(opts: FulfillPhotoPaymentOptions): Promise<FulfillPhotoPaymentResult> {
  const { photoId, razorpayPaymentId, actor, paymentEntity } = opts;
  const razorpayOrderId: string | undefined = opts.razorpayOrderId || paymentEntity?.order_id;
  const tag = `[FULFILL:${actor}]`;

  await dbConnect();

  // 1. Atomic unpaid → paid transition; only the winner fires the GA4 purchase event
  const transitioned = await Photo.findOneAndUpdate(
    { _id: photoId, status: { $ne: "paid" } },
    { $set: { status: "paid", razorpayPaymentId } },
    { returnDocument: "after" }
  );
  const firstToMarkPaid = Boolean(transitioned);
  const photo: any = transitioned || (await Photo.findById(photoId));
  if (!photo) return { success: false, error: "Photo not found" };

  // Persist the download token right away — the buyer can download even if a later step fails
  if (!photo.downloadToken) photo.downloadToken = crypto.randomBytes(24).toString("hex");
  if (!photo.locale) photo.locale = normalizeEmailLocale(opts.localeHint || paymentEntity?.notes?.locale);
  if (photo.isModified()) await photo.save();
  const done = { success: true, downloadToken: photo.downloadToken as string };

  // Steps 2–6 must never turn a captured payment into a "verification failed" for the buyer;
  // anything that fails here is completed by the webhook or the reconcile job.
  try {
    await completeFulfillment({ opts, photo, firstToMarkPaid, razorpayOrderId, tag });
  } catch (err) {
    console.error(`${tag} Post-payment processing failed for photo ${photoId} (will be retried):`, err);
  }
  return done;
}

async function completeFulfillment({
  opts,
  photo,
  firstToMarkPaid,
  razorpayOrderId,
  tag,
}: {
  opts: FulfillPhotoPaymentOptions;
  photo: any;
  firstToMarkPaid: boolean;
  razorpayOrderId?: string;
  tag: string;
}) {
  const { razorpayPaymentId, actor, paymentEntity } = opts;
  const photoKey = photo._id.toString();
  const emailLocale: EmailLocale = normalizeEmailLocale(photo.locale);
  const emailTemplate = photo.isExpert ? "expert_order" : "delivery";

  const isRealEmail = (e?: string) => Boolean(e && !PLACEHOLDER_EMAILS.includes(e.toLowerCase()));
  const userEmail: string | undefined =
    [opts.sessionEmail, photo.guestEmail, paymentEntity?.email].find(isRealEmail) || undefined;

  // Repeat calls (webhook after verify, reconcile) stop early once everything is done
  if (!firstToMarkPaid) {
    const [claimed, invoiced, failures] = await Promise.all([
      AuditEvent.exists({ eventType: "email_sent", photoId: photoKey, "metadata.template": emailTemplate, "metadata.status": { $ne: "failed" } }),
      Invoice.exists({ gatewayPaymentId: razorpayPaymentId }),
      countFailedEmailSends({ photoId: photoKey }, emailTemplate),
    ]);
    const emailDone = Boolean(claimed) || !userEmail || failures >= MAX_EMAIL_FAILURES;
    if (invoiced && emailDone) return;
  }

  const amountUnit = paymentEntity?.currency === "JPY" ? 1 : 100;
  const entityAmount = typeof paymentEntity?.amount === "number" ? paymentEntity.amount / amountUnit : undefined;

  // 2. Permanent Order record — the order this payment was made on comes first
  // (photo.orderId is only the latest checkout, which may not be the one that got paid)
  let permanentOrder: any = razorpayOrderId ? await Order.findOne({ "metadata.razorpayOrderId": razorpayOrderId }) : null;
  if (!permanentOrder && photo.orderId) permanentOrder = await Order.findById(photo.orderId);
  if (!permanentOrder) permanentOrder = await Order.findOne({ photoId: photo._id }).sort({ createdAt: -1 });

  if (permanentOrder) {
    if (!FINAL_ORDER_STATUSES.includes(permanentOrder.status)) permanentOrder.status = "paid";
    if (userEmail && !isRealEmail(permanentOrder.guestEmail)) permanentOrder.guestEmail = userEmail;
    if (permanentOrder.isModified()) await permanentOrder.save();
  } else {
    permanentOrder = await Order.create({
      orderNumber: `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      userId: photo.userId || opts.sessionUserId || undefined,
      guestEmail: userEmail || "customer@pixpassport.com",
      documentType: photo.documentType,
      isExpert: Boolean(photo.isExpert),
      amount: entityAmount ?? (photo.isExpert ? 9.99 : 6.99),
      currency: paymentEntity?.currency || "USD",
      status: "paid",
      photoId: photo._id,
      metadata: { razorpayOrderId },
    });
  }
  if (!photo.orderId || firstToMarkPaid) {
    photo.orderId = permanentOrder._id;
    if (photo.isModified()) await photo.save();
  }

  // 3. Permanent Payment record — most specific match first
  let permanentPayment: any = await Payment.findOne({ gatewayPaymentId: razorpayPaymentId });
  if (!permanentPayment && razorpayOrderId) {
    permanentPayment = await Payment.findOne({ gatewayOrderId: razorpayOrderId, gatewayPaymentId: { $in: [null, ""] } });
  }
  if (!permanentPayment) {
    permanentPayment = await Payment.findOne({
      orderId: permanentOrder._id,
      gatewayPaymentId: { $in: [null, ""] },
      ...(razorpayOrderId ? { gatewayOrderId: razorpayOrderId } : {}),
    });
  }

  if (permanentPayment) {
    if (!FINAL_PAYMENT_STATUSES.includes(permanentPayment.status)) permanentPayment.status = "captured";
    permanentPayment.gatewayPaymentId = razorpayPaymentId;
    permanentPayment.orderId = permanentOrder._id;
    if (!permanentPayment.photoId) permanentPayment.photoId = photo._id;
    if (paymentEntity?.method) permanentPayment.method = paymentEntity.method;
    if (userEmail) permanentPayment.email = userEmail;
    if (permanentPayment.isModified()) await permanentPayment.save();
  } else {
    // No checkout record for this charge (legacy order, or a second capture on one order)
    permanentPayment = await Payment.create({
      orderId: permanentOrder._id,
      photoId: photo._id,
      gateway: "razorpay",
      gatewayOrderId: razorpayOrderId || `order_${photo._id}`,
      gatewayPaymentId: razorpayPaymentId,
      amount: entityAmount ?? permanentOrder.amount,
      currency: paymentEntity?.currency || permanentOrder.currency,
      status: "captured",
      method: paymentEntity?.method,
      email: userEmail,
      metadata: paymentEntity ? { notes: paymentEntity.notes } : undefined,
    });
  }

  const spec = getSafeSpec(photo.documentType);

  // 4. Server-side GA4 purchase (once per photo)
  if (firstToMarkPaid) {
    const value = Number(permanentPayment.amount) || Number(permanentOrder.amount) || 0;
    sendGA4PurchaseEvent({
      clientId: opts.gaClientId || paymentEntity?.notes?.gaClientId,
      userId: photo.userId ? photo.userId.toString() : undefined,
      transactionId: razorpayPaymentId,
      amount: value,
      currency: permanentPayment.currency || permanentOrder.currency || "USD",
      items: [
        {
          item_id: photoKey,
          item_name: `${spec.name || "Passport Photo"} ${photo.isExpert ? "(Expert Review)" : "(Standard)"}`,
          price: value,
          quantity: 1,
          item_category: photo.isExpert ? "Expert Edit" : "Standard Photo",
        },
      ],
    }).catch((gaErr) => console.error(`${tag} GA4 event warning:`, gaErr));
  }

  // 5. Tax invoice (idempotent per payment)
  let invoiceData: any = null;
  let invoicePdfBuffer: Buffer | undefined;
  let invoiceCloudinaryUrl: string | undefined;
  try {
    const invoiceAutoRes = await autoGenerateAndStoreInvoice({
      paymentIdOrGatewayId: permanentPayment._id.toString(),
      userEmail,
      actor,
    });
    if (invoiceAutoRes.success && invoiceAutoRes.invoice) {
      invoiceData = invoiceAutoRes.invoice;
      invoicePdfBuffer = invoiceAutoRes.pdfBuffer;
      invoiceCloudinaryUrl = invoiceAutoRes.cloudinaryUrl;
    } else {
      console.error(`${tag} Invoice generation failed for photo ${photoKey}:`, invoiceAutoRes.error);
    }
  } catch (invErr) {
    console.error(`${tag} Invoice generation error (non-fatal):`, invErr);
  }

  const documentName = spec.name || "Passport Photo";
  const countryName = spec.country || spec.name || "Passport Photo";

  if (photo.isExpert) {
    await notifyExpertAdmin(photo, { userEmail, countryName, documentName, invoiceData, actor, tag });
  }

  // 6. Delivery email — atomic claim prevents duplicates across verify / webhook / reconcile
  if (!userEmail) {
    console.warn(`${tag} No customer email for photo ${photoKey}, skipping delivery email.`);
    return;
  }
  if ((await countFailedEmailSends({ photoId: photoKey }, emailTemplate)) >= MAX_EMAIL_FAILURES) {
    console.error(`${tag} ${emailTemplate} email for photo ${photoKey} failed ${MAX_EMAIL_FAILURES} times, not retrying.`);
    return;
  }
  if (!(await claimEmailSend({ photoId: photoKey }, emailTemplate, actor))) return;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://pixpassport.com";
  const previewLink = `${appUrl}${localizedPreviewPath(emailLocale, photoKey)}`;
  // Customer-facing names in the buyer's language (admin email stays English)
  const localNames = localizedDocNames(spec, photo.documentType, emailLocale);
  const t = getEmailStrings(emailLocale);
  const invoicePdfDownloadUrl = invoiceCloudinaryUrl || (invoiceData ? `${appUrl}/api/invoices/${invoiceData._id}/download` : "");
  const attachments = invoicePdfBuffer && invoiceData ? [
    {
      filename: `Tax-Invoice-${invoiceData.invoiceNumber}.pdf`,
      content: invoicePdfBuffer,
      contentType: "application/pdf",
    },
  ] : undefined;

  const failEmail = async (error: unknown) => {
    console.error(`${tag} ${emailTemplate} email failed for photo ${photoKey}:`, error);
    await releaseEmailClaim({ photoId: photoKey }, emailTemplate);
    await logAuditEvent({
      eventType: "email_sent",
      orderId: permanentOrder?._id,
      paymentId: permanentPayment?._id,
      photoId: photo._id,
      actor,
      metadata: { recipient: userEmail, template: emailTemplate, status: "failed", error: String(error) },
    });
  };

  try {
    let subject: string;
    let html: string;

    if (photo.isExpert) {
      subject = t.expertSubject;
      html = renderExpertOrderEmail({
        appUrl,
        countryName: localNames.countryName,
        documentName: localNames.documentName,
        originalUrl: photo.originalUrl,
        invoice: invoiceData,
        invoiceAttached: !!invoicePdfBuffer,
        invoiceDownloadUrl: invoicePdfDownloadUrl,
        locale: emailLocale,
      });
    } else {
      subject = t.deliverySubject(localNames.countryName, localNames.documentName);
      html = renderPhotoDeliveryEmail({
        appUrl,
        countryName: localNames.countryName,
        documentName: localNames.documentName,
        spec,
        photoUrl: photo.secureUrl || "",
        originalUrl: photo.originalUrl,
        previewLink,
        invoice: invoiceData,
        invoiceAttached: !!invoicePdfBuffer,
        invoiceDownloadUrl: invoicePdfDownloadUrl,
        locale: emailLocale,
      });
    }

    const mailRes = await sendEmail({
      to: userEmail,
      bcc: "usvisaphotoai@gmail.com",
      subject,
      html,
      attachments,
    });

    if (!mailRes.success) {
      await failEmail(mailRes.error);
      return;
    }

    console.log(`${tag} ${emailTemplate} email sent for photo ${photoKey}`);
    await logAuditEvent({
      eventType: "email_sent",
      orderId: permanentOrder?._id,
      paymentId: permanentPayment?._id,
      photoId: photo._id,
      actor,
      metadata: {
        recipient: userEmail,
        subject,
        template: emailTemplate,
        locale: emailLocale,
        invoiceNumber: invoiceData?.invoiceNumber,
        status: "sent",
      },
    });
  } catch (err) {
    await failEmail(err);
    return;
  }
}

/** Expert orders: notify the editing team once (own claim, independent of the customer email). */
async function notifyExpertAdmin(photo: any, info: { userEmail?: string; countryName: string; documentName: string; invoiceData: any; actor: string; tag: string }) {
  const { userEmail, countryName, documentName, invoiceData, actor, tag } = info;
  const photoKey = photo._id.toString();
  const adminEmail = process.env.ADMIN_EMAILS || process.env.RESEND_REPLY_TO;
  if (adminEmail && (await claimEmailSend({ photoId: photoKey }, "expert_admin_notice", actor))) {
    const adminRes = await sendEmail({
      to: adminEmail,
      subject: `New Expert Edit Order: ${photo._id} (${countryName})`,
      html: `
        <h2>New Expert Edit Order (Photo Upgrade)</h2>
        <p><strong>Photo ID:</strong> ${photo._id}</p>
        <p><strong>Customer Email:</strong> ${userEmail || "(none on file)"}</p>
        <p><strong>Selected Country:</strong> ${countryName}</p>
        <p><strong>Document Type:</strong> ${documentName}</p>
        ${invoiceData ? `<p><strong>Tax Invoice:</strong> ${invoiceData.invoiceNumber} (${invoiceData.currency} ${invoiceData.total})</p>` : ""}
        <p><strong>Photos:</strong></p>
        <ul>
          ${photo.originalUrl ? `<li><strong>Original Image:</strong> <a href="${photo.originalUrl}">${photo.originalUrl}</a></li>` : ""}
          <li><strong>Processed Image:</strong> <a href="${photo.secureUrl}">${photo.secureUrl}</a></li>
        </ul>
      `,
    }).catch((err: any) => ({ success: false, error: err }));
    if (adminRes.success) {
      await logAuditEvent({
        eventType: "email_sent",
        photoId: photo._id,
        actor,
        // not "sent": invoice dispute evidence treats status "sent" as delivery to the customer
        metadata: { recipient: adminEmail, template: "expert_admin_notice", status: "admin_notified" },
      });
    } else {
      console.error(`${tag} Admin email error (non-fatal):`, adminRes.error);
      await releaseEmailClaim({ photoId: photoKey }, "expert_admin_notice");
    }
  }
}
