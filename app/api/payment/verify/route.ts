import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";
import Order from "@/models/Order";
import Payment from "@/models/Payment";
import crypto from "crypto";
import { sendEmail } from "@/lib/mail";
import { renderPhotoDeliveryEmail, renderExpertOrderEmail } from "@/lib/email-templates/photo-delivery";
import { normalizeEmailLocale, localeFromReferer, localizedDocNames, localizedPreviewPath, getEmailStrings } from "@/lib/email-templates/email-i18n";
import { getSafeSpec } from "@/lib/specs";
import { logAuditEvent, claimEmailSend, releaseEmailClaim } from "@/lib/audit";
import { autoGenerateAndStoreInvoice } from "@/lib/invoice-automation";
import { formatCurrency } from "@/lib/currency-formatter";
import { sendGA4PurchaseEvent } from "@/lib/ga4";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      photoId,
      gaClientId,
      locale: bodyLocale,
    } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !photoId) {
      return NextResponse.json(
        { error: "Missing required payment verification parameters" },
        { status: 400 }
      );
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
      .update(sign.toString())
      .digest("hex");

    const expectedSignBuf = Buffer.from(expectedSign, "hex");
    const signatureBuf = Buffer.from(razorpay_signature, "hex");

    if (
      expectedSignBuf.length !== signatureBuf.length ||
      !crypto.timingSafeEqual(expectedSignBuf, signatureBuf)
    ) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    // Payment signature is valid, fetch photo and verify order linkage
    await dbConnect();
    const photo = await Photo.findById(photoId);

    if (!photo) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    // Ensure the verified order ID matches the order created for this photo
    if (photo.razorpayOrderId && photo.razorpayOrderId !== razorpay_order_id) {
      return NextResponse.json(
        { error: "Payment does not correspond to this photo order" },
        { status: 400 }
      );
    }

    // Replay attack guard: Ensure this payment ID was not already redeemed for another photo
    const existingPhotoWithPayment = await Photo.findOne({
      razorpayPaymentId: razorpay_payment_id,
      _id: { $ne: photo._id },
    });
    if (existingPhotoWithPayment) {
      return NextResponse.json(
        { error: "This payment transaction has already been redeemed" },
        { status: 400 }
      );
    }

    const existingPaymentRecord = await Payment.findOne({
      razorpayPaymentId: razorpay_payment_id,
    });
    if (
      existingPaymentRecord &&
      existingPaymentRecord.photoId &&
      existingPaymentRecord.photoId.toString() !== photo._id.toString()
    ) {
      return NextResponse.json(
        { error: "This payment transaction has already been redeemed for another order" },
        { status: 400 }
      );
    }

    // If photo is linked to a user account, enforce access control
    if (photo.userId) {
      // @ts-ignore
      if (!session || !session.user || photo.userId.toString() !== session.user.id.toString()) {
        return NextResponse.json({ error: "Unauthorized photo access" }, { status: 403 });
      }
    }

    const alreadyPaid = photo.status === "paid";
    photo.status = "paid";
    photo.razorpayPaymentId = razorpay_payment_id;
    if (!photo.downloadToken) {
      photo.downloadToken = crypto.randomBytes(24).toString("hex");
    }
    // Language the customer bought in (set at create-order; body/referer as fallback)
    const emailLocale = photo.locale
      ? normalizeEmailLocale(photo.locale)
      : bodyLocale
        ? normalizeEmailLocale(bodyLocale)
        : (localeFromReferer(req.headers.get("referer")) || "en");
    if (!photo.locale) photo.locale = emailLocale;
    await photo.save();

    const userEmail = session?.user?.email || (photo as any).guestEmail;

    // Update or create permanent Order & Payment records
    let permanentOrder = photo.orderId ? await Order.findById(photo.orderId) : null;
    if (!permanentOrder) {
      permanentOrder = await Order.findOne({
        $or: [
          { "metadata.razorpayOrderId": razorpay_order_id },
          { photoId: photo._id },
        ],
      });
    }

    if (permanentOrder) {
      permanentOrder.status = "paid";
      if (!permanentOrder.guestEmail && userEmail) {
        permanentOrder.guestEmail = userEmail;
      }
      await permanentOrder.save();
    } else {
      permanentOrder = await Order.create({
        orderNumber: `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
        userId: photo.userId || (session?.user as any)?.id || undefined,
        guestEmail: userEmail || "customer@pixpassport.com",
        documentType: photo.documentType,
        isExpert: Boolean(photo.isExpert),
        amount: photo.isExpert ? 9.99 : 6.99,
        currency: "USD",
        status: "paid",
        photoId: photo._id,
        metadata: { razorpayOrderId: razorpay_order_id },
      });
      photo.orderId = permanentOrder._id;
      await photo.save();
    }

    // Update or create permanent Payment record
    let permanentPayment = await Payment.findOne({
      $or: [
        { gatewayOrderId: razorpay_order_id },
        { orderId: permanentOrder._id },
        { gatewayPaymentId: razorpay_payment_id },
      ],
    });

    if (permanentPayment) {
      permanentPayment.status = "captured";
      permanentPayment.gatewayPaymentId = razorpay_payment_id;
      permanentPayment.orderId = permanentOrder._id;
      if (userEmail) permanentPayment.email = userEmail;
      await permanentPayment.save();
    } else {
      permanentPayment = await Payment.create({
        orderId: permanentOrder._id,
        photoId: photo._id,
        gateway: "razorpay",
        gatewayOrderId: razorpay_order_id,
        gatewayPaymentId: razorpay_payment_id,
        amount: permanentOrder.amount,
        currency: permanentOrder.currency,
        status: "captured",
        email: userEmail,
      });
    }

    // Fire GA4 Purchase Event via Measurement Protocol as server backup
    try {
      const spec = getSafeSpec(photo.documentType);
      sendGA4PurchaseEvent({
        clientId: gaClientId,
        userId: photo.userId ? photo.userId.toString() : undefined,
        transactionId: razorpay_payment_id,
        amount: Number(permanentPayment.amount) || Number(permanentOrder.amount) || 0,
        currency: permanentPayment.currency || permanentOrder.currency || "USD",
        items: [
          {
            item_id: photo._id.toString(),
            item_name: `${spec.name || "Passport Photo"} ${photo.isExpert ? "(Expert Review)" : "(Standard)"}`,
            price: Number(permanentPayment.amount) || Number(permanentOrder.amount) || 0,
            quantity: 1,
            item_category: photo.isExpert ? "Expert Edit" : "Standard Photo",
          },
        ],
      }).catch((gaErr) => console.error("[PAYMENT VERIFY] GA4 event warning:", gaErr));
    } catch (gaErr) {
      console.error("[PAYMENT VERIFY] GA4 dispatch error:", gaErr);
    }

    // Always auto-generate invoice silently in background and upload to Cloudinary
    let invoiceData: any = null;
    let invoicePdfBuffer: Buffer | undefined = undefined;
    let invoiceCloudinaryUrl: string | undefined = undefined;

    try {
      const invoiceAutoRes = await autoGenerateAndStoreInvoice({
        paymentIdOrGatewayId: permanentPayment._id.toString(),
        userEmail,
        actor: "system",
      });

      if (invoiceAutoRes.success && invoiceAutoRes.invoice) {
        invoiceData = invoiceAutoRes.invoice;
        invoicePdfBuffer = invoiceAutoRes.pdfBuffer;
        invoiceCloudinaryUrl = invoiceAutoRes.cloudinaryUrl;
        console.log(`[PAYMENT VERIFY] Background invoice created: ${invoiceData.invoiceNumber}, Cloudinary: ${invoiceCloudinaryUrl || "Local"}`);
      }
    } catch (invErr) {
      console.error("[PAYMENT VERIFY] Background invoice generation warning (non-fatal):", invErr);
    }

    // Bug 1 fix: atomic email claim — prevents duplicate emails from concurrent verify + webhook
    const emailTemplate = photo.isExpert ? "expert_order" : "delivery";
    const canSendEmail = await claimEmailSend(
      { photoId: photo._id.toString() },
      emailTemplate,
      "system"
    );

    if (!canSendEmail) {
      console.log(`[PAYMENT VERIFY] Email already claimed for photo ${photoId}, skipping duplicate`);
      return NextResponse.json({
        success: true,
        message: "Payment verified successfully",
        downloadToken: photo.downloadToken,
      });
    }

    // Fire & forget delivery + testimonial email
    console.log(`[PAYMENT VERIFY] Attempting to send email for photo ${photoId} to: ${userEmail}`);

    if (userEmail) {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pixpassport.com';
      const photoDownloadUrl = photo.secureUrl || '';
      const previewLink = `${appUrl}${localizedPreviewPath(emailLocale, String(photoId))}`;
      const spec = getSafeSpec(photo.documentType);
      const documentName = spec.name || "Passport Photo";
      const countryName = spec.country || spec.name || "Passport Photo";
      // Customer-facing names in the buyer's language (admin email stays English)
      const localNames = localizedDocNames(spec, photo.documentType, emailLocale);
      const t = getEmailStrings(emailLocale);
      const invoicePdfDownloadUrl = invoiceCloudinaryUrl || (invoiceData ? `${appUrl}/api/invoices/${invoiceData._id}/download` : "");

      try {
        if (photo.isExpert) {
          const adminHtml = `
            <h2>New Expert Edit Order (Photo Upgrade)</h2>
            <p><strong>Photo ID:</strong> ${photo._id}</p>
            <p><strong>Customer Email:</strong> ${userEmail}</p>
            <p><strong>Selected Country:</strong> ${countryName}</p>
            <p><strong>Document Type:</strong> ${documentName}</p>
            ${invoiceData ? `<p><strong>Tax Invoice:</strong> ${invoiceData.invoiceNumber} (${invoiceData.currency} ${invoiceData.total})</p>` : ''}
            <p><strong>Photos:</strong></p>
            <ul>
              ${photo.originalUrl ? `<li><strong>Original Image:</strong> <a href="${photo.originalUrl}">${photo.originalUrl}</a></li>` : ''}
              <li><strong>Processed Image:</strong> <a href="${photo.secureUrl}">${photo.secureUrl}</a></li>
            </ul>
          `;

          const adminEmail = process.env.ADMIN_EMAILS || process.env.RESEND_REPLY_TO;
          if (adminEmail) {
            await sendEmail({
            to: adminEmail,
            subject: `New Expert Edit Order: ${photo._id} (${countryName})`,
            html: adminHtml,
          }).catch((err: any) => console.error('[PAYMENT VERIFY] Admin email error (non-fatal):', err));
          }

          const mailRes = await sendEmail({
            to: userEmail,
            bcc: 'usvisaphotoai@gmail.com',
            subject: t.expertSubject,
            html: renderExpertOrderEmail({
              appUrl,
              countryName: localNames.countryName,
              documentName: localNames.documentName,
              originalUrl: photo.originalUrl,
              invoice: invoiceData,
              invoiceAttached: !!invoicePdfBuffer,
              invoiceDownloadUrl: invoicePdfDownloadUrl,
              locale: emailLocale,
            }),
            attachments: invoicePdfBuffer && invoiceData ? [
              {
                filename: `Tax-Invoice-${invoiceData.invoiceNumber}.pdf`,
                content: invoicePdfBuffer,
                contentType: "application/pdf",
              }
            ] : undefined,
          });
          // Bug 8/9 fix: check sendEmail return value; Bug 10 fix: log correct customer subject
          if (mailRes.success) {
            console.log(`[PAYMENT VERIFY] Expert emails sent successfully for photo ${photoId}`);
            await logAuditEvent({
              eventType: "email_sent",
              orderId: permanentOrder?._id,
              paymentId: permanentPayment?._id,
              photoId: photo._id,
              actor: "system",
              metadata: {
                recipient: userEmail,
                subject: t.expertSubject,
                template: "expert_order",
                locale: emailLocale,
                invoiceNumber: invoiceData?.invoiceNumber,
                status: "sent",
              },
            });
          } else {
            console.error(`[PAYMENT VERIFY] Expert email send returned failure for photo ${photoId}:`, mailRes.error);
            await releaseEmailClaim({ photoId: photo._id.toString() }, emailTemplate);
            await logAuditEvent({
              eventType: "email_sent",
              orderId: permanentOrder?._id,
              paymentId: permanentPayment?._id,
              photoId: photo._id,
              actor: "system",
              metadata: {
                recipient: userEmail,
                template: "expert_order",
                status: "failed",
                error: String(mailRes.error),
              },
            });
          }
        } else {
          const stdMailRes = await sendEmail({
            to: userEmail,
            bcc: 'usvisaphotoai@gmail.com',
            subject: t.deliverySubject(localNames.countryName, localNames.documentName),
            html: renderPhotoDeliveryEmail({
              appUrl,
              countryName: localNames.countryName,
              documentName: localNames.documentName,
              spec,
              photoUrl: photoDownloadUrl,
              originalUrl: photo.originalUrl,
              previewLink,
              invoice: invoiceData,
              invoiceAttached: !!invoicePdfBuffer,
              invoiceDownloadUrl: invoicePdfDownloadUrl,
              locale: emailLocale,
            }),
            attachments: invoicePdfBuffer && invoiceData ? [
              {
                filename: `Tax-Invoice-${invoiceData.invoiceNumber}.pdf`,
                content: invoicePdfBuffer,
                contentType: "application/pdf",
              }
            ] : undefined,
          });
          // Bug 8/9 fix: check sendEmail return value
          if (stdMailRes.success) {
            console.log(`[PAYMENT VERIFY] Email with invoice attached sent successfully for photo ${photoId}`);
            await logAuditEvent({
              eventType: "email_sent",
              orderId: permanentOrder?._id,
              paymentId: permanentPayment?._id,
              photoId: photo._id,
              actor: "system",
              metadata: {
                recipient: userEmail,
                subject: t.deliverySubject(localNames.countryName, localNames.documentName),
                template: "delivery",
                locale: emailLocale,
                invoiceNumber: invoiceData?.invoiceNumber,
                status: "sent",
              },
            });
          } else {
            console.error(`[PAYMENT VERIFY] Delivery email returned failure for photo ${photoId}:`, stdMailRes.error);
            await releaseEmailClaim({ photoId: photo._id.toString() }, emailTemplate);
            await logAuditEvent({
              eventType: "email_sent",
              orderId: permanentOrder?._id,
              paymentId: permanentPayment?._id,
              photoId: photo._id,
              actor: "system",
              metadata: {
                recipient: userEmail,
                template: "delivery",
                status: "failed",
                error: String(stdMailRes.error),
              },
            });
          }
        }
      } catch (err) {
        console.error(`[PAYMENT VERIFY] Failed to send email for photo ${photoId}:`, err);
        await releaseEmailClaim({ photoId: photo._id.toString() }, emailTemplate);
        await logAuditEvent({
          eventType: "email_sent",
          orderId: permanentOrder?._id,
          paymentId: permanentPayment?._id,
          photoId: photo._id,
          actor: "system",
          metadata: {
            recipient: userEmail,
            status: "failed",
            error: String(err),
          },
        });
      }
    } else {
      console.warn(`[PAYMENT VERIFY] No email found for photo ${photoId}, skipping gift delivery email.`);
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      downloadToken: photo.downloadToken,
    });
  } catch (error: any) {
    console.error("Payment Verification Error:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
