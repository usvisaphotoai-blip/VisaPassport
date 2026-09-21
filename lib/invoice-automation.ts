import dbConnect from "@/lib/mongodb";
import Invoice, { IInvoice } from "@/models/Invoice";
import { generateInvoiceForPayment } from "@/lib/invoice-generator";
import { generateInvoicePdfBuffer } from "@/lib/pdf-invoice";
import { uploadBufferToCloudinary } from "@/lib/cloudinary";
import { sendEmail } from "@/lib/mail";
import { logAuditEvent } from "@/lib/audit";

export interface ProcessInvoiceBackgroundOptions {
  paymentIdOrGatewayId: string;
  userEmail?: string;
  forceRegenerate?: boolean;
  actor?: string;
}

export interface ProcessInvoiceBackgroundResult {
  success: boolean;
  invoice?: IInvoice;
  pdfBuffer?: Buffer;
  cloudinaryUrl?: string;
  isExisting?: boolean;
  error?: string;
}

/**
 * Silently generates the official sequential tax invoice, renders the official PDF buffer,
 * uploads the PDF to Cloudinary, and saves the secure URL to the invoice record.
 */
export async function autoGenerateAndStoreInvoice(
  options: ProcessInvoiceBackgroundOptions
): Promise<ProcessInvoiceBackgroundResult> {
  try {
    await dbConnect();

    // 1. Generate or fetch official sequential Invoice
    const genResult = await generateInvoiceForPayment(options.paymentIdOrGatewayId, {
      actor: options.actor || "system",
      forceRegenerate: options.forceRegenerate,
    });

    if (!genResult.success || !genResult.invoice) {
      return {
        success: false,
        error: genResult.error || "Failed to generate invoice record",
      };
    }

    const invoice = genResult.invoice;

    // 2. If invoice already has a Cloudinary URL and not forcing regeneration, generate buffer and return
    let cloudinaryUrl = invoice.cloudinaryUrl;
    let pdfBuffer: Buffer | undefined;

    try {
      pdfBuffer = generateInvoicePdfBuffer(invoice);
    } catch (pdfErr: any) {
      console.error("[INVOICE AUTOMATION] Error rendering invoice PDF buffer:", pdfErr);
    }

    // 3. Silently upload PDF to Cloudinary if not already uploaded or if regenerating
    if (pdfBuffer && (!cloudinaryUrl || options.forceRegenerate)) {
      try {
        const publicId = `invoice-${invoice.invoiceNumber.toLowerCase()}`;
        const uploadedUrl = await uploadBufferToCloudinary(
          pdfBuffer,
          "pixpassport/invoices",
          ["pixpassport-invoice", "tax-invoice", invoice.invoiceNumber],
          "raw",
          publicId
        );

        if (uploadedUrl) {
          cloudinaryUrl = uploadedUrl;
          invoice.cloudinaryUrl = uploadedUrl;
          invoice.cloudinaryPublicId = `pixpassport/invoices/${publicId}`;
          invoice.pdfUrl = uploadedUrl;
          if (!invoice.pdfMetadata) {
            invoice.pdfMetadata = {};
          }
          invoice.pdfMetadata.generatedAt = new Date();
          await invoice.save();
          console.log(`[INVOICE AUTOMATION] Invoice ${invoice.invoiceNumber} uploaded to Cloudinary: ${uploadedUrl}`);
        }
      } catch (cloudErr: any) {
        console.error("[INVOICE AUTOMATION] Warning: Cloudinary upload failed (continuing silently):", cloudErr);
      }
    }

    return {
      success: true,
      invoice,
      pdfBuffer,
      cloudinaryUrl,
      isExisting: genResult.isExisting,
    };
  } catch (error: any) {
    console.error("[INVOICE AUTOMATION] Error processing background invoice:", error);
    return {
      success: false,
      error: error?.message || "Failed in background invoice automation",
    };
  }
}

/**
 * Sends a standalone official Tax Invoice email with the PDF attached and direct download link.
 */
export async function sendOfficialInvoiceEmail({
  invoice,
  pdfBuffer,
  cloudinaryUrl,
  recipientEmail,
}: {
  invoice: IInvoice;
  pdfBuffer?: Buffer;
  cloudinaryUrl?: string;
  recipientEmail?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const to = recipientEmail || invoice.customerEmail;
    if (!to) {
      return { success: false, error: "No recipient email provided" };
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://pixpassport.com";
    const downloadPdfUrl = cloudinaryUrl || invoice.cloudinaryUrl || `${appUrl}/api/admin/invoices/${invoice._id}/pdf`;
    const invoiceNumber = invoice.invoiceNumber;
    const customerName = invoice.customerName || "Valued Customer";
    const amountFormatted = `${invoice.currency} ${Number(invoice.total).toFixed(2)}`;

    // Generate buffer if not passed
    const bufferToSend = pdfBuffer || generateInvoicePdfBuffer(invoice);

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; background: #f8fafc; padding: 32px 24px; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <img src="https://res.cloudinary.com/ddxu2wqfm/image/upload/v1774782293/logo_evktxq.jpg" alt="PixPassport Logo" style="width: 54px; height: 54px; border-radius: 12px; margin-bottom: 12px; display: inline-block; object-fit: contain;" />
          <h1 style="font-size: 22px; font-weight: 800; color: #0f172a; margin: 0 0 6px;">Tax Invoice & Payment Receipt 🧾</h1>
          <p style="color: #64748b; font-size: 14px; margin: 0;">Official Receipt for Invoice ${invoiceNumber}</p>
        </div>

        <div style="background: #ffffff; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <p style="margin: 0 0 12px; font-size: 15px; color: #334155;">Hello <strong>${customerName}</strong>,</p>
          <p style="margin: 0 0 16px; font-size: 14px; color: #475569; line-height: 1.6;">Thank you for your payment of <strong>${amountFormatted}</strong>. Your official tax invoice has been generated and the PDF is attached to this email for your accounting and visa records.</p>

          <div style="background: #f8fafc; border-radius: 10px; padding: 16px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
            <table style="width: 100%; font-size: 13px; color: #334155; border-collapse: collapse;">
              <tr><td style="padding: 6px 0; color: #64748b;">Invoice Number:</td><td style="padding: 6px 0; text-align: right; font-weight: 700; color: #0f172a;">${invoiceNumber}</td></tr>
              <tr><td style="padding: 6px 0; color: #64748b;">Invoice Date:</td><td style="padding: 6px 0; text-align: right; font-weight: 600;">${new Date(invoice.invoiceDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td></tr>
              ${invoice.photoId ? `<tr><td style="padding: 6px 0; color: #64748b;">Photo Reference:</td><td style="padding: 6px 0; text-align: right; font-family: monospace; font-weight: 600; color: #475569;">${invoice.photoId}</td></tr>` : ''}
              <tr><td style="padding: 6px 0; color: #64748b;">Payment Method:</td><td style="padding: 6px 0; text-align: right; font-weight: 600;">${invoice.paymentMethod || "UPI / Card"}</td></tr>
              <tr><td style="padding: 6px 0; color: #64748b;">Payment Status:</td><td style="padding: 6px 0; text-align: right; font-weight: 700; color: #059669;">PAID ✓</td></tr>
              <tr style="border-top: 2px solid #e2e8f0;"><td style="padding: 10px 0 0; color: #0f172a; font-weight: 700; font-size: 14px;">Total Amount:</td><td style="padding: 10px 0 0; text-align: right; font-weight: 800; color: #059669; font-size: 16px;">${amountFormatted}</td></tr>
            </table>
          </div>

          <div style="text-align: center; margin: 20px 0 8px;">
            <a href="${downloadPdfUrl}" style="display: inline-block; background: #0f172a; color: #ffffff; padding: 12px 26px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 700; box-shadow: 0 2px 8px rgba(15,23,42,0.15);">⬇ Download Official Invoice PDF</a>
          </div>
        </div>

        <div style="text-align: center; padding-top: 16px; border-top: 1px solid #e2e8f0;">
          <p style="font-size: 11px; color: #94a3b8; margin: 0;">PixPassport — Professional Visa & Passport Biometric Solutions</p>
          <p style="font-size: 11px; color: #cbd5e1; margin: 4px 0 0;">Questions? Contact us at support@pixpassport.com</p>
        </div>
      </div>
    `;

    const mailRes = await sendEmail({
      to,
      bcc: "usvisaphotoai@gmail.com",
      subject: `Tax Invoice & Payment Receipt (${invoiceNumber}) - PixPassport`,
      html: emailHtml,
      attachments: [
        {
          filename: `invoice-${invoiceNumber}.pdf`,
          content: bufferToSend,
          contentType: "application/pdf",
        },
      ],
    });

    if (mailRes.success) {
      await logAuditEvent({
        eventType: "email_sent",
        orderId: invoice.orderId as any,
        paymentId: invoice.paymentId as any,
        photoId: invoice.photoId as any,
        actor: "system",
        metadata: {
          recipient: to,
          subject: `Tax Invoice & Payment Receipt (${invoiceNumber}) - PixPassport`,
          template: "tax_invoice",
          invoiceNumber,
          status: "sent",
        },
      });
      return { success: true };
    } else {
      return { success: false, error: String(mailRes.error) };
    }
  } catch (err: any) {
    console.error("[INVOICE EMAIL] Error sending invoice email:", err);
    return { success: false, error: err?.message };
  }
}
