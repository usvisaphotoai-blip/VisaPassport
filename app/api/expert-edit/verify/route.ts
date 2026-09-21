import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/mongodb";
import ExpertOrder from "@/models/ExpertOrder";
import { sendEmail } from "@/lib/mail";
import { autoGenerateAndStoreInvoice } from "@/lib/invoice-automation";
import { logAuditEvent, claimEmailSend, releaseEmailClaim } from "@/lib/audit";
import { formatCurrency } from "@/lib/currency-formatter";

export async function POST(req: Request) {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      expertOrderId,
    } = await req.json();

    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
      return NextResponse.json({ error: "Server missing Razorpay secret" }, { status: 500 });
    }

    // Verify signature
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generated_signature = hmac.digest("hex");

    const expectedSignBuf = Buffer.from(generated_signature, "hex");
    const signatureBuf = Buffer.from(razorpay_signature, "hex");

    if (
      expectedSignBuf.length !== signatureBuf.length ||
      !crypto.timingSafeEqual(expectedSignBuf, signatureBuf)
    ) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    await dbConnect();

    // Find the order
    const order = await ExpertOrder.findById(expertOrderId);

    if (!order) {
      return NextResponse.json({ error: "Expert Order not found" }, { status: 404 });
    }

    // Verify order linkage
    if (order.razorpayOrderId && order.razorpayOrderId !== razorpay_order_id) {
      return NextResponse.json({ error: "Payment does not match this expert order" }, { status: 400 });
    }

    // Replay attack guard
    const existingOrderWithPayment = await ExpertOrder.findOne({
      razorpayPaymentId: razorpay_payment_id,
      _id: { $ne: order._id },
    });
    if (existingOrderWithPayment) {
      return NextResponse.json({ error: "This payment has already been redeemed" }, { status: 400 });
    }

    const alreadyPaid = order.status === "paid";
    order.status = "paid";
    order.razorpayPaymentId = razorpay_payment_id;
    await order.save();

    // Always auto-generate invoice silently in background and upload to Cloudinary
    let invoiceData: any = null;
    let invoicePdfBuffer: Buffer | undefined = undefined;
    let invoiceCloudinaryUrl: string | undefined = undefined;

    try {
      const invoiceAutoRes = await autoGenerateAndStoreInvoice({
        paymentIdOrGatewayId: razorpay_payment_id,
        userEmail: order.email,
        actor: "system",
      });

      if (invoiceAutoRes.success && invoiceAutoRes.invoice) {
        invoiceData = invoiceAutoRes.invoice;
        invoicePdfBuffer = invoiceAutoRes.pdfBuffer;
        invoiceCloudinaryUrl = invoiceAutoRes.cloudinaryUrl;
        console.log(`[EXPERT VERIFY] Background invoice created: ${invoiceData.invoiceNumber}, Cloudinary: ${invoiceCloudinaryUrl || "Local"}`);
      }
    } catch (invErr) {
      console.error("[EXPERT VERIFY] Background invoice generation warning (non-fatal):", invErr);
    }

    // Idempotency check: if order was already paid, skip duplicate emails
    if (alreadyPaid) {
      return NextResponse.json({ success: true, message: "Payment verified successfully" });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://pixpassport.com";
    const invoicePdfDownloadUrl = invoiceCloudinaryUrl || (invoiceData ? `${appUrl}/api/admin/invoices/${invoiceData._id}/pdf` : "");

    // Bug 5 fix: atomic email claim — prevents duplicate emails from concurrent verify + webhook
    const expertEmailTemplate = "expert_confirmation";
    const canSendEmail = await claimEmailSend(
      { expertOrderId },
      expertEmailTemplate,
      "system"
    );

    if (!canSendEmail) {
      console.log(`[EXPERT VERIFY] Email already claimed for order ${expertOrderId}, skipping duplicate`);
      return NextResponse.json({ success: true, message: "Payment verified successfully" });
    }
    try {
      const adminHtml = `
        <h2>New Expert Edit Order</h2>
        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Customer Email:</strong> ${order.email}</p>
        ${invoiceData ? `<p><strong>Tax Invoice:</strong> ${invoiceData.invoiceNumber} (${invoiceData.currency} ${invoiceData.total})</p>` : ''}
        <p><strong>Photos to Edit:</strong></p>
        <ul>
          ${order.photos.map((url: string) => `<li><a href="${url}">${url}</a></li>`).join("")}
        </ul>
      `;

      // Notify Admin
      const adminEmail = process.env.ADMIN_EMAILS || process.env.RESEND_REPLY_TO;
      if (adminEmail) {
        await sendEmail({
          to: adminEmail,
          subject: `New Expert Edit Order: ${order._id}`,
          html: adminHtml,
        }).catch((err: any) => console.error('[EXPERT VERIFY] Admin email error (non-fatal):', err));
      }

      // Notify Customer
      const mailRes = await sendEmail({
        to: order.email,
        bcc: 'usvisaphotoai@gmail.com',
        subject: "Your Expert Photo Edit Order is Confirmed - PixPassport",
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; background: #f8fafc; padding: 32px 24px; border-radius: 16px;">
            <div style="text-align: center; margin-bottom: 24px;">
              <img src="https://res.cloudinary.com/ddxu2wqfm/image/upload/v1774782293/logo_evktxq.jpg" alt="PixPassport" style="width: 54px; height: 54px; border-radius: 12px; margin-bottom: 12px; display: inline-block; object-fit: contain;" />
              <h2 style="font-size: 22px; font-weight: 800; color: #0f172a; margin: 0 0 6px;">Your Expert Edit Order is Confirmed! 🌟</h2>
              <p style="color: #64748b; font-size: 14px; margin: 0;">Order #${order._id}</p>
            </div>

            <div style="background: #ffffff; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
              <p style="margin: 0 0 12px; font-size: 15px; color: #334155;">Hi there,</p>
              <p style="margin: 0 0 16px; font-size: 14px; color: #475569; line-height: 1.6;">We have received your payment for the expert photo edit. Our team is working on your photos now and will email them back to you when they are ready.</p>
            </div>

            ${invoiceData ? `
            <div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
              <h3 style="margin: 0 0 10px; font-size: 15px; font-weight: 700; color: #0f172a;">🧾 Tax Invoice & Payment Receipt</h3>
              <table style="width: 100%; font-size: 13px; color: #475569; margin-bottom: 12px; border-collapse: collapse;">
                <tr><td style="padding: 5px 0; color: #64748b;">Invoice Number:</td><td style="padding: 5px 0; text-align: right; font-weight: 700; color: #0f172a;">${invoiceData.invoiceNumber}</td></tr>
                <tr><td style="padding: 5px 0; color: #64748b;">Amount Paid:</td><td style="padding: 5px 0; text-align: right; font-weight: 700; color: #059669;">${formatCurrency(invoiceData.total, invoiceData.currency)} (PAID ✓)</td></tr>
                <tr><td style="padding: 5px 0; color: #64748b;">Payment Method:</td><td style="padding: 5px 0; text-align: right; font-weight: 600;">${invoiceData.paymentMethod || "UPI / Card"}</td></tr>
              </table>
              <p style="margin: 0 0 14px; font-size: 12px; color: #64748b;">${invoicePdfBuffer ? 'Your official Tax Invoice PDF is attached to this email.' : 'Download your official Tax Invoice PDF using the button below.'}</p>
              ${invoicePdfDownloadUrl ? `<div style="text-align: center;"><a href="${invoicePdfDownloadUrl}" style="display: inline-block; background: #0f172a; color: #ffffff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 12px; font-weight: 700;">⬇ Download Tax Invoice PDF</a></div>` : ''}
            </div>
            ` : ''}

            <div style="text-align: center; padding-top: 16px; border-top: 1px solid #e2e8f0;">
              <p style="font-size: 11px; color: #94a3b8; margin: 0;">PixPassport — Professional Visa Photo Processing</p>
            </div>
          </div>
        `,
        attachments: invoicePdfBuffer && invoiceData ? [
          {
            filename: `Tax-Invoice-${invoiceData.invoiceNumber}.pdf`,
            content: invoicePdfBuffer,
            contentType: "application/pdf",
          }
        ] : undefined,
      });

      // Bug 8 fix: check sendEmail return value and log accurate audit
      if (mailRes.success) {
        await logAuditEvent({
          eventType: "email_sent",
          actor: "system",
          metadata: {
            recipient: order.email,
            subject: "Your Expert Photo Edit Order is Confirmed - PixPassport",
            template: "expert_confirmation",
            invoiceNumber: invoiceData?.invoiceNumber,
            expertOrderId,
            status: "sent",
          },
        });
      } else {
        console.error(`[EXPERT VERIFY] Customer email returned failure for order ${expertOrderId}:`, mailRes.error);
        await releaseEmailClaim({ expertOrderId }, expertEmailTemplate);
        await logAuditEvent({
          eventType: "email_sent",
          actor: "system",
          metadata: {
            recipient: order.email,
            template: "expert_confirmation",
            expertOrderId,
            status: "failed",
            error: String(mailRes.error),
          },
        });
      }
    } catch (mailError) {
      console.error("Failed to send emails for expert edit:", mailError);
      await releaseEmailClaim({ expertOrderId }, expertEmailTemplate);
    }

    return NextResponse.json({ success: true, message: "Payment verified successfully" });
  } catch (error: any) {
    console.error("Expert Edit Verification Error:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
