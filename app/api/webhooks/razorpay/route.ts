import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";
import ExpertOrder from "@/models/ExpertOrder";
import PrintSheetOrder from "@/models/PrintSheetOrder";
import Order from "@/models/Order";
import Payment from "@/models/Payment";
import Dispute from "@/models/Dispute";
import { sendEmail } from "@/lib/mail";
import { renderPhotoDeliveryEmail } from "@/lib/email-templates/photo-delivery";
import { getSafeSpec } from "@/lib/specs";
import { sendGA4PurchaseEvent } from "@/lib/ga4";
import { logAuditEvent, claimEmailSend, releaseEmailClaim } from "@/lib/audit";
import { autoGenerateAndStoreInvoice } from "@/lib/invoice-automation";
import { formatCurrency, SUPPORTED_CURRENCIES } from "@/lib/currency-formatter";
import { getPaymentFailureInfo, renderPaymentFailedEmail } from "@/lib/payment-failure";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!secret) {
      console.error("Missing RAZORPAY_WEBHOOK_SECRET");
      return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    const expectedSigBuf = Buffer.from(expectedSignature, "hex");
    const signatureBuf = Buffer.from(signature, "hex");

    if (
      expectedSigBuf.length !== signatureBuf.length ||
      !crypto.timingSafeEqual(expectedSigBuf, signatureBuf)
    ) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(rawBody);

    // Handle payment.captured or order.paid
    // Razorpay often sends order.paid which contains order and payment entities
    if (event.event === "order.paid" || event.event === "payment.captured") {
      const paymentEntity = event.payload?.payment?.entity || {};
      const notes = paymentEntity.notes || {};
      const { photoId, expertOrderId } = notes;

      await dbConnect();

      if (photoId) {
        const photo = await Photo.findById(photoId);
        if (photo && photo.status !== "paid") {
          photo.status = "paid";
          photo.razorpayPaymentId = paymentEntity.id;

          const userEmail = (photo as any).guestEmail || paymentEntity.email;

          // Update or create permanent Order record
          let permanentOrder = photo.orderId ? await Order.findById(photo.orderId) : null;
          if (!permanentOrder) {
            permanentOrder = await Order.findOne({
              $or: [
                { "metadata.razorpayOrderId": paymentEntity.order_id },
                { photoId: photo._id },
              ],
            });
          }

          if (permanentOrder) {
            permanentOrder.status = "paid";
            await permanentOrder.save();
          } else {
            permanentOrder = await Order.create({
              orderNumber: `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
              userId: photo.userId,
              guestEmail: userEmail || paymentEntity.email || "customer@pixpassport.com",
              documentType: photo.documentType,
              isExpert: Boolean(photo.isExpert),
              amount: paymentEntity.amount ? paymentEntity.amount / 100 : (photo.isExpert ? 9.99 : 6.99),
              currency: paymentEntity.currency || "USD",
              status: "paid",
              photoId: photo._id,
              metadata: { razorpayOrderId: paymentEntity.order_id },
            });
          }

          photo.orderId = permanentOrder._id;
          await photo.save();

          // Update or create permanent Payment record
          let permanentPayment = await Payment.findOne({ gatewayPaymentId: paymentEntity.id });
          if (!permanentPayment && paymentEntity.order_id) {
            permanentPayment = await Payment.findOne({ gatewayOrderId: paymentEntity.order_id });
          }

          if (permanentPayment) {
            permanentPayment.status = "captured";
            permanentPayment.gatewayPaymentId = paymentEntity.id;
            permanentPayment.orderId = permanentOrder._id;
            if (paymentEntity.method) permanentPayment.method = paymentEntity.method;
            if (userEmail) permanentPayment.email = userEmail;
            await permanentPayment.save();
          } else {
            permanentPayment = await Payment.create({
              orderId: permanentOrder._id,
              photoId: photo._id,
              gateway: "razorpay",
              gatewayOrderId: paymentEntity.order_id || `order_${photo._id}`,
              gatewayPaymentId: paymentEntity.id,
              amount: paymentEntity.amount ? paymentEntity.amount / 100 : permanentOrder.amount,
              currency: paymentEntity.currency || permanentOrder.currency,
              status: "captured",
              method: paymentEntity.method,
              email: userEmail || paymentEntity.email,
              metadata: paymentEntity,
            });
          }

          // Fire GA4 Purchase Event
          if (notes.gaClientId) {
            const spec = getSafeSpec(photo.documentType);
            await sendGA4PurchaseEvent({
              clientId: notes.gaClientId,
              transactionId: paymentEntity.id,
              amount: paymentEntity.amount / 100,
              currency: paymentEntity.currency,
              items: [
                {
                  item_id: photoId,
                  item_name: `${spec.name || "Passport Photo"} ${photo.isExpert ? "(Expert Review)" : "(Standard)"}`,
                  price: paymentEntity.amount / 100,
                  quantity: 1,
                  item_category: photo.isExpert ? "Expert Edit" : "Standard Photo",
                },
              ],
            });
          }

          // Auto-generate invoice silently in background and upload to Cloudinary
          let invoiceData: any = null;
          let invoicePdfBuffer: Buffer | undefined = undefined;
          let invoiceCloudinaryUrl: string | undefined = undefined;

          try {
            const invoiceAutoRes = await autoGenerateAndStoreInvoice({
              paymentIdOrGatewayId: paymentEntity.id || permanentPayment._id.toString(),
              userEmail,
              actor: "webhook",
            });

            if (invoiceAutoRes.success && invoiceAutoRes.invoice) {
              invoiceData = invoiceAutoRes.invoice;
              invoicePdfBuffer = invoiceAutoRes.pdfBuffer;
              invoiceCloudinaryUrl = invoiceAutoRes.cloudinaryUrl;
              console.log(`[WEBHOOK] Background invoice created: ${invoiceData.invoiceNumber}, Cloudinary: ${invoiceCloudinaryUrl || "Local"}`);
            }
          } catch (invErr) {
            console.error("[WEBHOOK] Background invoice generation warning (non-fatal):", invErr);
          }

          // Bug 1 fix: atomic email claim — prevents duplicate emails from concurrent verify + webhook
          const emailTemplate = photo.isExpert ? "expert_order" : "delivery";
          const canSendEmail = await claimEmailSend(
            { photoId: photo._id.toString() },
            emailTemplate,
            "webhook"
          );

          if (!canSendEmail) {
            console.log(`[WEBHOOK] Email already claimed for photo ${photoId}, skipping duplicate`);
            return NextResponse.json({ success: true });
          }

          if (userEmail) {
            const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pixpassport.com';
            const photoDownloadUrl = photo.secureUrl || '';
            const previewLink = `${appUrl}/preview/${photoId}`;
            const spec = getSafeSpec(photo.documentType);
            const documentName = spec.name || "Passport Photo";
            const countryName = spec.country || spec.name || "Passport Photo";
            const invoicePdfDownloadUrl = invoiceCloudinaryUrl || (invoiceData ? `${appUrl}/api/invoices/${invoiceData._id}/download` : "");
            
            try {
              if (photo.isExpert) {
                const adminHtml = `
                  <h2>New Expert Edit Order (Photo Upgrade - Webhook)</h2>
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
                  });
                }

                const mailRes = await sendEmail({
                  to: userEmail,
                  bcc: 'usvisaphotoai@gmail.com',
                  subject: "Your Expert Photo Edit Order is Confirmed - PixPassport",
                  html: `
                    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; background: #f8fafc; padding: 32px 24px; border-radius: 16px;">
                      <div style="text-align: center; margin-bottom: 24px;">
                        <img src="${appUrl}/logo.png" alt="PixPassport" style="width: 54px; height: 54px; border-radius: 12px; margin-bottom: 12px; display: inline-block; object-fit: contain;" />
                        <h2 style="font-size: 22px; font-weight: 800; color: #0f172a; margin: 0 0 6px;">Your Expert Edit Order is Confirmed! 🌟</h2>
                        <p style="color: #64748b; font-size: 14px; margin: 0;">Order for ${countryName} (${documentName})</p>
                      </div>

                      <div style="background: #ffffff; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                        <p style="margin: 0 0 12px; font-size: 15px; color: #334155;">Hi there,</p>
                        <p style="margin: 0 0 16px; font-size: 14px; color: #475569; line-height: 1.6;">We have received your payment for the expert photo edit for your <strong>${countryName} (${documentName})</strong>. Our team is working on your photo now and will email it back to you as soon as it is ready.</p>
                        ${photo.originalUrl ? `<p style="margin: 0 0 12px; font-size: 13px;"><strong>Original Image:</strong> <a href="${photo.originalUrl}" style="color: #2563eb; text-decoration: underline;">View Upload</a></p>` : ''}
                      </div>

                      ${invoiceData ? `
                      <div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                        <h3 style="margin: 0 0 10px; font-size: 15px; font-weight: 700; color: #0f172a;">🧾 Payment Receipt</h3>
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
                if (mailRes.success) {
                  console.log(`[WEBHOOK] Expert emails sent successfully for photo ${photoId}`);
                  await logAuditEvent({
                    eventType: "email_sent",
                    orderId: permanentOrder?._id,
                    paymentId: permanentPayment?._id,
                    photoId: photo._id,
                    actor: "webhook",
                    metadata: {
                      recipient: userEmail,
                      subject: "Your Expert Photo Edit Order is Confirmed - PixPassport",
                      template: "expert_order",
                      invoiceNumber: invoiceData?.invoiceNumber,
                      status: "sent",
                    },
                  });
                } else {
                  console.error(`[WEBHOOK] Expert email returned failure for photo ${photoId}:`, mailRes.error);
                  await releaseEmailClaim({ photoId: photo._id.toString() }, emailTemplate);
                  await logAuditEvent({
                    eventType: "email_sent",
                    orderId: permanentOrder?._id,
                    paymentId: permanentPayment?._id,
                    photoId: photo._id,
                    actor: "webhook",
                    metadata: {
                      recipient: userEmail,
                      template: "expert_order",
                      status: "failed",
                      error: String(mailRes.error),
                    },
                  });
                }
              } else {
                const deliveryMailRes = await sendEmail({
                  to: userEmail,
                  bcc: 'usvisaphotoai@gmail.com',
                  subject: `Your ${countryName} (${documentName}) photo is ready — Download now! 🎉`,
                  html: renderPhotoDeliveryEmail({
                    appUrl,
                    countryName,
                    documentName,
                    spec,
                    photoUrl: photoDownloadUrl,
                    originalUrl: photo.originalUrl,
                    previewLink,
                    invoice: invoiceData,
                    invoiceAttached: !!invoicePdfBuffer,
                    invoiceDownloadUrl: invoicePdfDownloadUrl,
                  }),
                  attachments: invoicePdfBuffer && invoiceData ? [
                    {
                      filename: `Tax-Invoice-${invoiceData.invoiceNumber}.pdf`,
                      content: invoicePdfBuffer,
                      contentType: "application/pdf",
                    }
                  ] : undefined,
                });
                // Bug 8/9 fix: check sendEmail return value before logging "sent"
                if (deliveryMailRes.success) {
                  console.log(`[WEBHOOK] Email with invoice attached sent successfully for photo ${photoId}`);
                  await logAuditEvent({
                    eventType: "email_sent",
                    orderId: permanentOrder?._id,
                    paymentId: permanentPayment?._id,
                    photoId: photo._id,
                    actor: "webhook",
                    metadata: {
                      recipient: userEmail,
                      subject: `Your ${countryName} (${documentName}) photo is ready — Download now! 🎉`,
                      template: "delivery",
                      invoiceNumber: invoiceData?.invoiceNumber,
                      status: "sent",
                    },
                  });
                } else {
                  console.error(`[WEBHOOK] Delivery email returned failure for photo ${photoId}:`, deliveryMailRes.error);
                  await releaseEmailClaim({ photoId: photo._id.toString() }, emailTemplate);
                  await logAuditEvent({
                    eventType: "email_sent",
                    orderId: permanentOrder?._id,
                    paymentId: permanentPayment?._id,
                    photoId: photo._id,
                    actor: "webhook",
                    metadata: {
                      recipient: userEmail,
                      template: "delivery",
                      status: "failed",
                      error: String(deliveryMailRes.error),
                    },
                  });
                }
              }
            } catch (err) {
              console.error(`[WEBHOOK] Failed to send email for photo ${photoId}:`, err);
              await releaseEmailClaim({ photoId: photo._id.toString() }, emailTemplate);
              await logAuditEvent({
                eventType: "email_sent",
                orderId: permanentOrder?._id,
                paymentId: permanentPayment?._id,
                photoId: photo._id,
                actor: "webhook",
                metadata: {
                  recipient: userEmail,
                  status: "failed",
                  error: String(err),
                },
              });
            }
          }
        }
      } else if (expertOrderId) {
        const order = await ExpertOrder.findById(expertOrderId);
        if (order && order.status !== "paid") {
          order.status = "paid";
          order.razorpayPaymentId = paymentEntity.id;
          await order.save();

          const customerEmail = order.email || paymentEntity.email || "customer@pixpassport.com";

          // Permanent Order record for Expert Order
          let permanentOrder = await Order.findOne({
            $or: [
              { "metadata.expertOrderId": expertOrderId },
              { "metadata.razorpayOrderId": paymentEntity.order_id },
            ],
          });

          if (permanentOrder) {
            permanentOrder.status = "paid";
            await permanentOrder.save();
          } else {
            permanentOrder = await Order.create({
              orderNumber: `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
              guestEmail: customerEmail,
              documentType: "expert-photo-edit",
              isExpert: true,
              amount: paymentEntity.amount ? paymentEntity.amount / 100 : 9.99,
              currency: paymentEntity.currency || "USD",
              status: "paid",
              metadata: {
                expertOrderId,
                razorpayOrderId: paymentEntity.order_id,
              },
            });
          }

          // Permanent Payment record
          let permanentPayment = await Payment.findOne({ gatewayPaymentId: paymentEntity.id });
          if (permanentPayment) {
            permanentPayment.status = "captured";
            permanentPayment.orderId = permanentOrder._id;
            await permanentPayment.save();
          } else {
            permanentPayment = await Payment.create({
              orderId: permanentOrder._id,
              gateway: "razorpay",
              gatewayOrderId: paymentEntity.order_id || `expert_${expertOrderId}`,
              gatewayPaymentId: paymentEntity.id,
              amount: paymentEntity.amount ? paymentEntity.amount / 100 : permanentOrder.amount,
              currency: paymentEntity.currency || permanentOrder.currency,
              status: "captured",
              method: paymentEntity.method,
              email: customerEmail,
              metadata: paymentEntity,
            });
          }

          // Fire GA4 Purchase Event
          if (notes.gaClientId) {
            await sendGA4PurchaseEvent({
              clientId: notes.gaClientId,
              transactionId: paymentEntity.id,
              amount: paymentEntity.amount / 100,
              currency: paymentEntity.currency,
              items: [
                {
                  item_id: expertOrderId,
                  item_name: "Expert Manual Photo Edit",
                  price: paymentEntity.amount / 100,
                  quantity: 1,
                  item_category: "Expert Edit",
                },
              ],
            });
          }

          // Auto-generate invoice silently in background and upload to Cloudinary for Expert Order
          let expertInvoiceData: any = null;
          let expertInvoicePdfBuffer: Buffer | undefined = undefined;
          let expertInvoiceCloudinaryUrl: string | undefined = undefined;

          try {
            const invoiceAutoRes = await autoGenerateAndStoreInvoice({
              paymentIdOrGatewayId: paymentEntity.id || permanentPayment._id.toString(),
              userEmail: customerEmail,
              actor: "webhook",
            });

            if (invoiceAutoRes.success && invoiceAutoRes.invoice) {
              expertInvoiceData = invoiceAutoRes.invoice;
              expertInvoicePdfBuffer = invoiceAutoRes.pdfBuffer;
              expertInvoiceCloudinaryUrl = invoiceAutoRes.cloudinaryUrl;
              console.log(`[WEBHOOK] Expert background invoice created: ${expertInvoiceData.invoiceNumber}, Cloudinary: ${expertInvoiceCloudinaryUrl || "Local"}`);
            }
          } catch (invErr) {
            console.error("[WEBHOOK] Expert background invoice generation warning (non-fatal):", invErr);
          }

          const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pixpassport.com';
          const expertInvoicePdfDownloadUrl = expertInvoiceCloudinaryUrl || (expertInvoiceData ? `${appUrl}/api/invoices/${expertInvoiceData._id}/download` : "");

          // Bug 6 fix: add atomic email dedup for expert order path (was completely missing)
          const expertEmailTemplate = "expert_confirmation";
          try {
            const canSendExpertEmail = await claimEmailSend(
              { expertOrderId },
              expertEmailTemplate,
              "webhook"
            );

            if (!canSendExpertEmail) {
              console.log(`[WEBHOOK] Expert email already claimed for order ${expertOrderId}, skipping`);
              return NextResponse.json({ success: true });
            }

            const adminHtml = `
              <h2>New Expert Edit Order (Webhook Verified)</h2>
              <p><strong>Order ID:</strong> ${order._id}</p>
              <p><strong>Customer Email:</strong> ${customerEmail}</p>
              ${expertInvoiceData ? `<p><strong>Tax Invoice:</strong> ${expertInvoiceData.invoiceNumber} (${expertInvoiceData.currency} ${expertInvoiceData.total})</p>` : ''}
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
              });
            }

            // Notify Customer
            const expertMailRes = await sendEmail({
              to: customerEmail,
              bcc: 'usvisaphotoai@gmail.com',
              subject: "Your Expert Photo Edit Order is Confirmed - PixPassport",
              html: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; background: #f8fafc; padding: 32px; border-radius: 16px;">
                  <h2 style="color: #0f172a; margin: 0 0 12px;">Your Expert Edit Order is Confirmed! 🌟</h2>
                  <p>Hi there,</p>
                  <p>We have received your payment for the expert photo edit. Our team is working on your photos now and will email them back to you when they are ready.</p>
                  
                  ${expertInvoiceData ? `
                  <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; margin: 20px 0;">
                    <h3 style="margin: 0 0 8px; font-size: 15px; color: #334155;">🧾 Payment Receipt</h3>
                    <p style="margin: 0 0 12px; font-size: 13px; color: #64748b;">Invoice No: <strong>${expertInvoiceData.invoiceNumber}</strong> • Total: <strong>${expertInvoiceData.currency} ${expertInvoiceData.total}</strong> (PAID ✓)</p>
                    <p style="margin: 0 0 12px; font-size: 13px; color: #64748b;">${expertInvoicePdfBuffer ? 'Your official Tax Invoice PDF is attached to this email.' : 'Download your official Tax Invoice PDF using the button below.'}</p>
                    ${expertInvoicePdfDownloadUrl ? `<a href="${expertInvoicePdfDownloadUrl}" style="display: inline-block; background: #0f172a; color: white; padding: 10px 18px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 700;">⬇ Download Invoice PDF</a>` : ''}
                  </div>
                  ` : ''}

                  <p style="margin-top: 20px;">Thank you for choosing PixPassport!</p>
                </div>
              `,
              attachments: expertInvoicePdfBuffer && expertInvoiceData ? [
                {
                  filename: `Tax-Invoice-${expertInvoiceData.invoiceNumber}.pdf`,
                  content: expertInvoicePdfBuffer,
                  contentType: "application/pdf",
                }
              ] : undefined,
            });
            // Bug 8/9 fix: check sendEmail return value
            if (expertMailRes.success) {
              console.log(`[WEBHOOK] Emails sent successfully for expert order ${expertOrderId}`);
              await logAuditEvent({
                eventType: "email_sent",
                orderId: permanentOrder._id,
                paymentId: permanentPayment._id,
                actor: "webhook",
                metadata: {
                  recipient: customerEmail,
                  subject: "Your Expert Photo Edit Order is Confirmed - PixPassport",
                  template: "expert_confirmation",
                  invoiceNumber: expertInvoiceData?.invoiceNumber,
                  expertOrderId,
                  status: "sent",
                },
              });
            } else {
              console.error(`[WEBHOOK] Expert email returned failure for order ${expertOrderId}:`, expertMailRes.error);
              await releaseEmailClaim({ expertOrderId }, expertEmailTemplate);
              await logAuditEvent({
                eventType: "email_sent",
                orderId: permanentOrder._id,
                paymentId: permanentPayment._id,
                actor: "webhook",
                metadata: {
                  recipient: customerEmail,
                  template: "expert_confirmation",
                  expertOrderId,
                  status: "failed",
                  error: String(expertMailRes.error),
                },
              });
            }
          } catch (mailError) {
            console.error(`[WEBHOOK] Failed to send emails for expert edit ${expertOrderId}:`, mailError);
            await releaseEmailClaim({ expertOrderId }, expertEmailTemplate);
            await logAuditEvent({
              eventType: "email_sent",
              orderId: permanentOrder._id,
              paymentId: permanentPayment._id,
              actor: "webhook",
              metadata: {
                recipient: customerEmail,
                status: "failed",
                error: String(mailError),
              },
            });
          }
        }
      } else if (notes.printSheetOrderId) {
        // Backup for HD print sheet payments whose in-browser verify never ran
        const sheetOrder = await PrintSheetOrder.findById(notes.printSheetOrderId);
        if (sheetOrder && sheetOrder.status !== "paid") {
          sheetOrder.status = "paid";
          sheetOrder.razorpayPaymentId = paymentEntity.id;
          await sheetOrder.save();
        }
      }
    } else if (event.event === "payment.failed") {
      const paymentEntity = event.payload?.payment?.entity || {};
      const notes = paymentEntity.notes || {};
      const { photoId, expertOrderId } = notes;
      const failure = getPaymentFailureInfo(paymentEntity);
      const currency = String(paymentEntity.currency || "INR").toUpperCase();
      const amount = typeof paymentEntity.amount === "number"
        ? formatCurrency(paymentEntity.amount / 10 ** (SUPPORTED_CURRENCIES[currency]?.decimals ?? 2), currency)
        : undefined;
      const failureMeta = {
        razorpayPaymentId: paymentEntity.id,
        errorCode: paymentEntity.error_code,
        errorReason: paymentEntity.error_reason,
        errorSource: paymentEntity.error_source,
        errorStep: paymentEntity.error_step,
        errorDescription: paymentEntity.error_description,
        method: paymentEntity.method,
      };
      // One email per failed Razorpay payment attempt (webhooks are retried)
      const emailTemplate = `payment_failed:${paymentEntity.id || "unknown"}`;
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pixpassport.com';

      await dbConnect();

      if (photoId) {
        const photo = await Photo.findById(photoId);
        if (photo && photo.status !== "paid") {
          photo.status = "payment_failed";
          await photo.save();

          // Update permanent Order & Payment status
          if (photo.orderId) {
            await Order.findByIdAndUpdate(photo.orderId, { status: "failed" });
          }
          if (paymentEntity.order_id) {
            await Payment.findOneAndUpdate({ gatewayOrderId: paymentEntity.order_id }, { status: "failed" });
          }

          const userEmail = (photo as any).guestEmail || paymentEntity.email;
          if (userEmail && await claimEmailSend({ photoId: photo._id.toString() }, emailTemplate, "webhook")) {
            const spec = getSafeSpec(photo.documentType);
            const documentName = spec.name || "Passport Photo";
            const productLabel = spec.country && !documentName.toLowerCase().includes(spec.country.toLowerCase())
              ? `${spec.country} ${documentName}`
              : documentName;
            const subject = `Payment failed: ${failure.title} — PixPassport`;

            const mailRes = await sendEmail({
              to: userEmail,
              bcc: 'usvisaphotoai@gmail.com',
              subject,
              html: renderPaymentFailedEmail({
                failure,
                productLabel,
                retryUrl: `${appUrl}/preview/${photoId}`,
                retryLabel: "Retry payment",
                amount,
                details: [
                  ["Photo", productLabel],
                  ["Size", `${spec.width_px}×${spec.height_px} px`],
                  ...(paymentEntity.id ? [["Payment ID", String(paymentEntity.id)] as [string, string]] : []),
                ],
              }),
            });

            if (!mailRes.success) {
              await releaseEmailClaim({ photoId: photo._id.toString() }, emailTemplate);
            }
            console.log(`[WEBHOOK] Payment failed email ${mailRes.success ? "sent" : "FAILED"} for photo ${photoId} (${failure.code || "unknown reason"})`);
            await logAuditEvent({
              eventType: "email_sent",
              photoId: photo._id,
              orderId: photo.orderId,
              actor: "webhook",
              metadata: {
                recipient: userEmail,
                subject,
                template: "payment_failed",
                status: mailRes.success ? "sent" : "failed",
                ...(mailRes.success ? {} : { error: String(mailRes.error) }),
                ...failureMeta,
              },
            });
          }
        }
      } else if (expertOrderId) {
        const order = await ExpertOrder.findById(expertOrderId);
        if (order && order.status !== "paid") {
          order.status = "payment_failed";
          await order.save();

          await Order.findOneAndUpdate({ "metadata.expertOrderId": expertOrderId }, { status: "failed" });
          if (paymentEntity.order_id) {
            await Payment.findOneAndUpdate({ gatewayOrderId: paymentEntity.order_id }, { status: "failed" });
          }

          const userEmail = order.email || paymentEntity.email;
          if (userEmail && await claimEmailSend({ expertOrderId }, emailTemplate, "webhook")) {
            const subject = `Payment failed: ${failure.title} — PixPassport Expert Edit`;

            const mailRes = await sendEmail({
              to: userEmail,
              bcc: 'usvisaphotoai@gmail.com',
              subject,
              html: renderPaymentFailedEmail({
                failure,
                productLabel: "Expert Photo Edit",
                retryUrl: `${appUrl}/expert-edit`,
                retryLabel: "Retry payment",
                amount,
                details: [
                  ["Photos uploaded", String(order.photos?.length || 0)],
                  ...(paymentEntity.id ? [["Payment ID", String(paymentEntity.id)] as [string, string]] : []),
                ],
              }),
            });

            if (!mailRes.success) {
              await releaseEmailClaim({ expertOrderId }, emailTemplate);
            }
            console.log(`[WEBHOOK] Payment failed email ${mailRes.success ? "sent" : "FAILED"} for expert order ${expertOrderId} (${failure.code || "unknown reason"})`);
            await logAuditEvent({
              eventType: "email_sent",
              actor: "webhook",
              metadata: {
                recipient: userEmail,
                expertOrderId,
                subject,
                template: "expert_payment_failed",
                status: mailRes.success ? "sent" : "failed",
                ...(mailRes.success ? {} : { error: String(mailRes.error) }),
                ...failureMeta,
              },
            });
          }
        }
      }
    } else if (event.event === "refund.created" || event.event === "refund.processed" || event.event === "payment.refunded") {
      const refundEntity = event.payload?.refund?.entity || {};
      const paymentEntity = event.payload?.payment?.entity || {};
      const paymentId = refundEntity.payment_id || paymentEntity.id;

      await dbConnect();
      if (paymentId) {
        const payment = await Payment.findOne({ gatewayPaymentId: paymentId });
        if (payment) {
          payment.status = "refunded";
          await payment.save();

          if (payment.orderId) {
            await Order.findByIdAndUpdate(payment.orderId, { status: "refunded" });
          }
        }

        // Permanent Audit Event for Refund
        await logAuditEvent({
          eventType: "refund",
          paymentId: payment?._id,
          orderId: payment?.orderId,
          photoId: payment?.photoId,
          actor: "webhook",
          metadata: {
            gatewayRefundId: refundEntity.id,
            gatewayPaymentId: paymentId,
            amount: refundEntity.amount ? refundEntity.amount / 100 : undefined,
            currency: refundEntity.currency,
            reason: refundEntity.notes?.reason || "Refund processed via Razorpay",
            status: refundEntity.status || "processed",
          },
        });
        console.log(`[WEBHOOK] Processed refund for payment ${paymentId}`);
      }
    } else if (event.event?.startsWith("dispute.")) {
      const disputeEntity = event.payload?.dispute?.entity || {};
      const paymentId = disputeEntity.payment_id;

      await dbConnect();
      let payment = null;
      let order = null;
      if (paymentId) {
        payment = await Payment.findOne({ gatewayPaymentId: paymentId });
        if (payment && payment.orderId) {
          order = await Order.findById(payment.orderId);
          if (order) {
            order.status = "disputed";
            await order.save();
          }
        }
      }

      const disputeStatus = event.event === "dispute.won" ? "won" : event.event === "dispute.lost" ? "lost" : event.event === "dispute.closed" ? "closed" : "open";

      // Permanent Dispute record
      const dispute = await Dispute.create({
        orderId: order?._id,
        paymentId: payment?._id,
        gatewayDisputeId: disputeEntity.id,
        amount: disputeEntity.amount ? disputeEntity.amount / 100 : 0,
        currency: disputeEntity.currency || "USD",
        reason: disputeEntity.reason_code || disputeEntity.reason_description || "Dispute received",
        status: disputeStatus,
        evidence: disputeEntity,
      });

      // Permanent Audit Event for Dispute
      await logAuditEvent({
        eventType: "dispute",
        disputeId: dispute._id,
        orderId: order?._id,
        paymentId: payment?._id,
        photoId: payment?.photoId,
        actor: "webhook",
        metadata: {
          gatewayDisputeId: disputeEntity.id,
          event: event.event,
          status: disputeStatus,
          amount: disputeEntity.amount ? disputeEntity.amount / 100 : undefined,
          reason: disputeEntity.reason_code || disputeEntity.reason_description,
        },
      });
      console.log(`[WEBHOOK] Processed dispute ${disputeEntity.id} for payment ${paymentId}`);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Razorpay Webhook Error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
