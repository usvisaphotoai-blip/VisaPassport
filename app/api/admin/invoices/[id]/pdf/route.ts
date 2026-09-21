import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Invoice from "@/models/Invoice";
import Payment from "@/models/Payment";
import { verifyAdminSession } from "@/lib/admin-auth";
import { generateInvoicePdfBuffer } from "@/lib/pdf-invoice";
import { generateInvoiceForPayment } from "@/lib/invoice-generator";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAdminSession();
    if (!auth.authorized) {
      return auth.errorResponse;
    }

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
        ],
      });
    }

    // Auto-generate invoice if payment ID was passed and invoice not yet created
    if (!invoice && (id.startsWith("pay_") || isObjectId)) {
      const payment = await Payment.findOne({
        $or: [
          ...(isObjectId ? [{ _id: id }] : []),
          { gatewayPaymentId: id },
        ],
      });

      if (payment && payment.status === "captured") {
        const genResult = await generateInvoiceForPayment(payment.gatewayPaymentId || payment._id.toString(), {
          actor: auth.userEmail || "admin",
        });
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
        "pdfMetadata.generatedAt": new Date(),
      },
    }).exec().catch((err) => console.error("Error updating PDF metadata:", err));

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
    console.error("[API INVOICE PDF DOWNLOAD] Error:", error);
    return new NextResponse("Failed to generate PDF invoice: " + error.message, {
      status: 500,
    });
  }
}
