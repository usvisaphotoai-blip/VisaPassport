import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Invoice from "@/models/Invoice";
import Payment from "@/models/Payment";
import { generateInvoicePdfBuffer } from "@/lib/pdf-invoice";
import { generateInvoiceForPayment } from "@/lib/invoice-generator";

export const dynamic = "force-dynamic";

/**
 * Public/Customer endpoint for downloading official Tax Invoice PDFs.
 * Supports Invoice ID (ObjectId), invoiceNumber (e.g. INV-2026-0001),
 * or Payment ID / gateway payment ID.
 */
export async function GET(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    if (!id) {
      return new NextResponse("Missing invoice ID", { status: 400 });
    }

    await dbConnect();

    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    let invoice: any = null;

    if (isObjectId) {
      invoice = await Invoice.findById(id);
    }
    if (!invoice) {
      invoice = await Invoice.findOne({
        $or: [
          { invoiceNumber: id },
          { gatewayPaymentId: id },
          { paymentId: id },
          ...(isObjectId ? [{ orderId: id }] : []),
        ],
      });
    }

    // Auto-generate invoice if payment ID or gateway payment ID was passed and invoice not yet created
    if (!invoice && (id.startsWith("pay_") || isObjectId)) {
      const payment = await Payment.findOne({
        $or: [
          ...(isObjectId ? [{ _id: id }] : []),
          { gatewayPaymentId: id },
        ],
      });

      if (payment && payment.status === "captured") {
        const genResult = await generateInvoiceForPayment(
          payment.gatewayPaymentId || payment._id.toString(),
          { actor: "customer-download" }
        );
        if (genResult.success && genResult.invoice) {
          invoice = genResult.invoice;
        }
      }
    }

    if (!invoice) {
      return new NextResponse("Invoice not found", { status: 404 });
    }

    // Generate PDF buffer on server
    const pdfBuffer = generateInvoicePdfBuffer(invoice);

    // Update download metadata in background
    Invoice.findByIdAndUpdate(invoice._id, {
      $inc: { "pdfMetadata.downloadCount": 1 },
      $set: {
        "pdfMetadata.lastDownloadedAt": new Date(),
      },
    })
      .exec()
      .catch((err) => console.error("[INVOICE DOWNLOAD] Error updating PDF metadata:", err));

    const fileName = `PixPassport-Invoice-${invoice.invoiceNumber}.pdf`;

    return new Response(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Length": pdfBuffer.byteLength.toString(),
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
      },
    });
  } catch (error: any) {
    console.error("[API CUSTOMER INVOICE PDF DOWNLOAD] Error:", error);
    return new NextResponse("Failed to generate PDF invoice: " + error.message, {
      status: 500,
    });
  }
}
