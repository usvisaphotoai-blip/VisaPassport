import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Invoice from "@/models/Invoice";
import Payment from "@/models/Payment";
import { verifyAdminSession } from "@/lib/admin-auth";
import { generateInvoicePdfBuffer } from "@/lib/pdf-invoice";
import { generateInvoiceForPayment } from "@/lib/invoice-generator";
import JSZip from "jszip";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const auth = await verifyAdminSession();
    if (!auth.authorized) {
      return auth.errorResponse;
    }

    const body = await req.json();
    const { invoiceIds, paymentIds } = body;

    const idsToProcess: string[] = Array.isArray(invoiceIds)
      ? invoiceIds
      : Array.isArray(paymentIds)
      ? paymentIds
      : [];

    if (idsToProcess.length === 0) {
      return NextResponse.json(
        { error: "Please provide an array of invoiceIds or paymentIds" },
        { status: 400 }
      );
    }

    await dbConnect();
    const zip = new JSZip();
    let includedCount = 0;

    // Process up to 50 invoices in a single ZIP download
    const targetIds = idsToProcess.slice(0, 50);

    for (const id of targetIds) {
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

      // If ID is a payment ID and no invoice yet, generate it
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

      if (invoice) {
        const pdfBuf = generateInvoicePdfBuffer(invoice);
        const fileName = `PixPassport-Invoice-${invoice.invoiceNumber}.pdf`;
        zip.file(fileName, pdfBuf);
        includedCount++;

        // Update download metadata asynchronously
        Invoice.findByIdAndUpdate(invoice._id, {
          $inc: { "pdfMetadata.downloadCount": 1 },
          $set: { "pdfMetadata.lastDownloadedAt": new Date() },
        }).exec().catch(() => {});
      }
    }

    if (includedCount === 0) {
      return NextResponse.json(
        { error: "No valid invoices found for the provided IDs" },
        { status: 404 }
      );
    }

    const zipBuffer = await zip.generateAsync({
      type: "nodebuffer",
      compression: "DEFLATE",
      compressionOptions: { level: 6 },
    });

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    const zipFileName = `PixPassport-Invoices-Export-${timestamp}.zip`;

    return new Response(new Uint8Array(zipBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${zipFileName}"`,
        "Content-Length": zipBuffer.byteLength.toString(),
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
      },
    });
  } catch (error: any) {
    console.error("[API INVOICE BULK PDF ZIP] Error:", error);
    return NextResponse.json(
      { error: "Failed to generate ZIP archive: " + error.message },
      { status: 500 }
    );
  }
}
