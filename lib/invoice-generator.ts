import dbConnect from "@/lib/mongodb";
import Payment from "@/models/Payment";
import Order from "@/models/Order";
import Photo from "@/models/Photo";
import User from "@/models/User";
import AuditEvent, { IAuditEvent } from "@/models/AuditEvent";
import Invoice, { IInvoice, IFulfillmentEvidence, IGatewayDetails } from "@/models/Invoice";
import InvoiceSequence from "@/models/InvoiceSequence";
import { getSafeSpec } from "@/lib/specs";
import { logAuditEvent } from "@/lib/audit";

export interface GenerateInvoiceOptions {
  actor?: string;
  forceRegenerate?: boolean;
}

export interface InvoiceGenerationResult {
  success: boolean;
  invoice?: IInvoice;
  isExisting?: boolean;
  error?: string;
}

/**
 * Fetch raw payment record from Razorpay API when credentials exist.
 */
async function fetchRazorpayPaymentDetails(gatewayPaymentId: string): Promise<any | null> {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret || !gatewayPaymentId.startsWith("pay_")) {
      return null;
    }

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const res = await fetch(`https://api.razorpay.com/v1/payments/${gatewayPaymentId}`, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
      next: { revalidate: 0 },
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn("[INVOICE GENERATOR] Failed to fetch Razorpay details:", err);
    return null;
  }
}

/**
 * Generates an official, sequential Invoice from a captured Payment and its associated Order/Photo records.
 * Enriches customer details directly from Razorpay (Name on Card, Contact Phone, Photo ID, RRN, Auth Code).
 * Idempotent: If an invoice already exists for the payment, it returns the existing invoice unless forceRegenerate is true.
 */
export async function generateInvoiceForPayment(
  paymentIdOrGatewayId: string,
  options: GenerateInvoiceOptions = {}
): Promise<InvoiceGenerationResult> {
  try {
    await dbConnect();

    // 1. Locate the Payment record (support MongoDB _id or Razorpay gatewayPaymentId)
    let payment: any = null;
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(paymentIdOrGatewayId);

    if (isObjectId) {
      payment = await Payment.findById(paymentIdOrGatewayId);
    }
    if (!payment) {
      payment = await Payment.findOne({
        $or: [
          { gatewayPaymentId: paymentIdOrGatewayId },
          { gatewayOrderId: paymentIdOrGatewayId },
        ],
      });
    }

    // Also fallback check photo's razorpayPaymentId if payment record not directly indexed
    if (!payment) {
      const matchedPhoto = await Photo.findOne({
        $or: [
          { razorpayPaymentId: paymentIdOrGatewayId },
          { razorpayOrderId: paymentIdOrGatewayId },
        ],
      });
      if (matchedPhoto && matchedPhoto.orderId) {
        payment = await Payment.findOne({ orderId: matchedPhoto.orderId });
      }
    }

    if (!payment) {
      return {
        success: false,
        error: `Payment record not found for reference: ${paymentIdOrGatewayId}`,
      };
    }

    // 2. Validate Payment Status
    if (payment.status !== "captured" && payment.status !== "refunded" && payment.status !== "partially_refunded") {
      return {
        success: false,
        error: `Cannot generate invoice for payment with status: ${payment.status}. Invoice can only be generated for captured/successful payments.`,
      };
    }

    const gatewayPaymentId = payment.gatewayPaymentId || `pay_${payment._id}`;

    // 3. Idempotency Check: Return existing invoice if already created (unless forceRegenerate)
    const existingInvoice = await Invoice.findOne({
      $or: [
        { paymentId: payment._id },
        { gatewayPaymentId: gatewayPaymentId },
      ],
    });

    if (existingInvoice && !options.forceRegenerate) {
      return {
        success: true,
        invoice: existingInvoice,
        isExisting: true,
      };
    }

    // 4. Fetch live Razorpay details for high-fidelity billing data
    const rzDetails = await fetchRazorpayPaymentDetails(gatewayPaymentId);

    // 5. Fetch associated Order, Photo, and User
    let order: any = null;
    if (payment.orderId) {
      order = await Order.findById(payment.orderId);
    }
    if (!order && (payment.gatewayOrderId || rzDetails?.order_id)) {
      order = await Order.findOne({
        $or: [
          { "metadata.razorpayOrderId": payment.gatewayOrderId },
          { "metadata.razorpayOrderId": rzDetails?.order_id },
        ],
      });
    }

    // Resolve Photo ID across all available sources
    const resolvedPhotoId =
      rzDetails?.notes?.photoId ||
      payment.photoId ||
      payment.metadata?.notes?.photoId ||
      order?.photoId ||
      order?.metadata?.photoId;

    let photo: any = null;
    if (resolvedPhotoId) {
      photo = await Photo.findById(resolvedPhotoId);
    }

    let user: any = null;
    const userId = order?.userId || photo?.userId;
    if (userId) {
      user = await User.findById(userId);
    }

    // 6. Resolve Customer Details from Razorpay & Models
    // Primary customer name priority: Name on Card -> User name -> Email derivation
    const cardHolderName = rzDetails?.card?.name || payment.metadata?.card?.name;
    let customerName = cardHolderName || user?.name || "";

    const customerEmail =
      rzDetails?.email ||
      rzDetails?.notes?.guestEmail ||
      payment.email ||
      order?.guestEmail ||
      photo?.guestEmail ||
      user?.email ||
      "customer@pixpassport.com";

    const customerPhone =
      rzDetails?.contact ||
      payment.contact ||
      payment.phone ||
      order?.phone;

    if (!customerName && customerEmail) {
      const localPart = customerEmail.split("@")[0];
      customerName = localPart
        .split(/[\._\-]/)
        .filter(Boolean)
        .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(" ");
    }
    if (!customerName) customerName = "Valued Customer";

    // 7. Resolve Document / Service Specifications
    const documentType = photo?.documentType || order?.documentType || "passport-photo";
    const spec = getSafeSpec(documentType);
    const countryName = spec.country || spec.name || "Standard";
    const docTitle = spec.name || "Passport Photo";
    const isExpert = Boolean(order?.isExpert || photo?.isExpert);

    const serviceTitle = isExpert
      ? `${countryName} (${docTitle}) - Expert Manual Review & Biometric Editing`
      : `${countryName} (${docTitle}) - AI Biometric Photo & Print Template`;

    const serviceDescription = isExpert
      ? `Precision biometric validation, expert manual photo review, AI background enhancement, high-resolution digital master (${spec.width_px}x${spec.height_px}px), and ready-to-cut A4 printable template.`
      : `Instant biometric compliance validation, AI background enhancement, official spec formatting (${spec.width_px}x${spec.height_px}px, ${spec.dpi || 300} DPI), and downloadable 20-photo A4 print template.`;

    // 8. Construct Detailed Gateway Evidence
    const gatewayDetails: IGatewayDetails = {
      gatewayPaymentId: gatewayPaymentId,
      gatewayOrderId: payment.gatewayOrderId || rzDetails?.order_id,
      bankRrn: rzDetails?.acquirer_data?.rrn,
      authCode: rzDetails?.acquirer_data?.auth_code,
      cardId: rzDetails?.card_id || rzDetails?.card?.id,
      cardHolderName: cardHolderName,
      cardLast4: rzDetails?.card?.last4,
      cardNetwork: rzDetails?.card?.network,
      cardType: rzDetails?.card?.type,
      cardSubType: rzDetails?.card?.sub_type,
      fee: rzDetails?.fee ? rzDetails.fee / 100 : undefined,
      tax: rzDetails?.tax ? rzDetails.tax / 100 : undefined,
      description: rzDetails?.description,
      notes: rzDetails?.notes || payment.metadata?.notes,
      contact: customerPhone,
    };

    // 9. Extract Real Fulfillment Evidence from Database Audit Events
    const queryPhotoId = photo?._id ? photo._id.toString() : (resolvedPhotoId ? String(resolvedPhotoId) : undefined);
    const queryOrderId = order?._id ? order._id.toString() : undefined;
    const queryPaymentId = payment?._id ? payment._id.toString() : undefined;

    const auditFilters: Array<Record<string, unknown>> = [];
    if (queryPhotoId) auditFilters.push({ photoId: queryPhotoId });
    if (queryOrderId) auditFilters.push({ orderId: queryOrderId });
    if (queryPaymentId) auditFilters.push({ paymentId: queryPaymentId });

    let auditEvents: IAuditEvent[] = [];
    if (auditFilters.length > 0) {
      auditEvents = await AuditEvent.find({ $or: auditFilters }).sort({ createdAt: 1 }).lean();
    }

    const processingEvent = auditEvents.find((e) => e.eventType === "processing");
    const emailEvent = auditEvents.find((e) => e.eventType === "email_sent" && e.metadata?.status === "sent");
    const downloadEvents = auditEvents.filter((e) => e.eventType === "download");

    const firstDownload = downloadEvents[0];
    const lastDownload = downloadEvents[downloadEvents.length - 1];

    const fulfillmentEvidence: IFulfillmentEvidence = {
      orderStatus: order?.status || "paid",
      paymentStatus: payment.status,
      documentType: documentType,
      photoProcessed: Boolean(photo?.secureUrl || photo?.previewUrl || processingEvent),
      photoDimensions: processingEvent?.metadata?.dimensions || `${spec.width_px}x${spec.height_px}`,
      backgroundValidated: Boolean(photo?.metrics?.backgroundValid ?? photo?.metrics?.backgroundCorrected ?? true),
      emailDelivered: Boolean(emailEvent),
      emailRecipient: emailEvent?.metadata?.recipient || customerEmail,
      emailDeliveredAt: emailEvent ? new Date(emailEvent.createdAt) : undefined,
      downloadCount: downloadEvents.length,
      firstDownloadedAt: firstDownload ? new Date(firstDownload.createdAt) : undefined,
      lastDownloadedAt: lastDownload ? new Date(lastDownload.createdAt) : undefined,
      downloadIp: lastDownload?.ipAddress || firstDownload?.ipAddress,
      downloadUserAgent: lastDownload?.userAgent || firstDownload?.userAgent,
      notes: {
        gateway: "Razorpay",
        photoId: resolvedPhotoId,
        gatewayOrderId: payment.gatewayOrderId || rzDetails?.order_id,
        gatewayPaymentId: gatewayPaymentId,
        paymentMethod: rzDetails?.method || payment.method || "card",
      },
    };

    // 10. Financial Line Items & Totals Calculation
    const paymentAmount = Number(payment.amount) || (isExpert ? 9.99 : 7.99);
    const currency = (payment.currency || order?.currency || rzDetails?.currency || "USD").toUpperCase();

    const lineItems = [
      {
        name: serviceTitle,
        description: serviceDescription,
        quantity: 1,
        unitPrice: paymentAmount,
        total: paymentAmount,
      },
    ];

    const subtotal = paymentAmount;
    const tax = 0;
    const discount = 0;
    const total = paymentAmount;

    // 11. Business Information Configuration
    const businessDetails = {
      name: process.env.BUSINESS_NAME || "PixPassport",
      email: process.env.BUSINESS_EMAIL || "support@pixpassport.com",
      address:
        process.env.BUSINESS_ADDRESS ||
        "Khadda, Kushinagar, Uttar Pradesh, India 274802",
      website: process.env.NEXT_PUBLIC_APP_URL || "https://pixpassport.com",
      taxId: process.env.BUSINESS_GSTIN || process.env.BUSINESS_TAX_ID || undefined,
    };

    // 12. Generate Atomic, Sequential Invoice Number
    const paymentDate = payment.createdAt ? new Date(payment.createdAt) : new Date();
    const invoiceYear = paymentDate.getFullYear();
    const invoiceNumber = await InvoiceSequence.getNextInvoiceNumber(invoiceYear);

    // Format payment method display (e.g., "Visa Debit" or "CARD")
    let paymentMethodDisplay = payment.method || "card";
    if (rzDetails?.card?.network) {
      paymentMethodDisplay = `${rzDetails.card.network} ${rzDetails.card.type || "Card"}`.trim();
      if (rzDetails.card.last4) {
        paymentMethodDisplay += ` (•••• ${rzDetails.card.last4})`;
      }
    }

    // 13. Create or Update Invoice Document
    let invoice: any;
    if (existingInvoice && options.forceRegenerate) {
      existingInvoice.photoId = resolvedPhotoId;
      existingInvoice.customerName = customerName;
      existingInvoice.customerEmail = customerEmail;
      existingInvoice.customerPhone = customerPhone;
      existingInvoice.customerCountry = countryName;
      existingInvoice.amount = total;
      existingInvoice.currency = currency;
      existingInvoice.subtotal = subtotal;
      existingInvoice.total = total;
      existingInvoice.lineItems = lineItems;
      existingInvoice.businessDetails = businessDetails;
      existingInvoice.gatewayDetails = gatewayDetails;
      existingInvoice.fulfillmentEvidence = fulfillmentEvidence;
      existingInvoice.paymentDate = paymentDate;
      existingInvoice.paymentMethod = paymentMethodDisplay;
      invoice = await existingInvoice.save();
    } else {
      invoice = await Invoice.create({
        invoiceNumber,
        paymentId: payment._id,
        gatewayPaymentId,
        gatewayOrderId: payment.gatewayOrderId || rzDetails?.order_id,
        orderId: order?._id,
        orderNumber: order?.orderNumber || `ORD-${payment._id}`,
        photoId: resolvedPhotoId,
        userId: userId || undefined,
        customerName,
        customerEmail,
        customerPhone,
        customerCountry: countryName,
        amount: total,
        currency,
        subtotal,
        tax,
        discount,
        total,
        status: "PAID",
        paymentGateway: "razorpay",
        paymentMethod: paymentMethodDisplay,
        paymentDate,
        invoiceDate: new Date(),
        lineItems,
        businessDetails,
        gatewayDetails,
        fulfillmentEvidence,
        pdfMetadata: {
          downloadCount: 0,
        },
      });
    }

    // 14. Record Audit Event for Invoice Generation
    await logAuditEvent({
      eventType: "processing",
      orderId: order?._id,
      paymentId: payment._id,
      photoId: photo?._id || resolvedPhotoId,
      actor: options.actor || "admin",
      metadata: {
        action: "invoice_generated",
        invoiceNumber: invoice.invoiceNumber,
        invoiceId: invoice._id.toString(),
        gatewayPaymentId,
        photoId: resolvedPhotoId,
      },
    });

    return {
      success: true,
      invoice,
      isExisting: false,
    };
  } catch (error: any) {
    console.error("[INVOICE GENERATOR] Error:", error);
    return {
      success: false,
      error: error?.message || "Failed to generate invoice",
    };
  }
}
