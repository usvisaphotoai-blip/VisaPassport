import dbConnect from "@/lib/mongodb";
import Invoice from "@/models/Invoice";
import Payment from "@/models/Payment";
import Order from "@/models/Order";
import Photo from "@/models/Photo";
import InvoicesClientPage from "./InvoicesClientPage";

export const revalidate = 0;

export default async function AdminInvoicesPage() {
  await dbConnect();

  // 1. Fetch initial invoices list
  const rawInvoices = await Invoice.find()
    .sort({ paymentDate: -1, createdAt: -1 })
    .limit(50)
    .lean();

  const allInvoicesSummary = await Invoice.find()
    .select("amount currency status")
    .lean();

  const totalRevenueUSD = allInvoicesSummary
    .filter((inv) => (inv.currency === "USD" || !inv.currency) && inv.status === "PAID")
    .reduce((sum, inv) => sum + (Number(inv.amount) || 0), 0);

  const totalRevenueINR = allInvoicesSummary
    .filter((inv) => inv.currency === "INR" && inv.status === "PAID")
    .reduce((sum, inv) => sum + (Number(inv.amount) || 0), 0);

  const paidCount = allInvoicesSummary.filter((inv) => inv.status === "PAID").length;

  // 2. Fetch uninvoiced captured payments
  const existingInvoices = await Invoice.find()
    .select("paymentId gatewayPaymentId")
    .lean();

  const existingPaymentIds = new Set<string>();
  const existingGatewayPaymentIds = new Set<string>();

  for (const inv of existingInvoices) {
    if (inv.paymentId) existingPaymentIds.add(inv.paymentId.toString());
    if (inv.gatewayPaymentId) existingGatewayPaymentIds.add(inv.gatewayPaymentId);
  }

  const rawCapturedPayments = await Payment.find({ status: "captured" })
    .sort({ createdAt: -1 })
    .lean();

  const uninvoicedPaymentsRaw = rawCapturedPayments.filter((p) => {
    const pId = p._id.toString();
    const gId = p.gatewayPaymentId;
    if (existingPaymentIds.has(pId)) return false;
    if (gId && existingGatewayPaymentIds.has(gId)) return false;
    return true;
  });

  // Enrich uninvoiced payments
  const photoIds = uninvoicedPaymentsRaw.map((p) => p.photoId).filter(Boolean) as any[];
  const orderIds = uninvoicedPaymentsRaw.map((p) => p.orderId).filter(Boolean) as any[];

  const [photos, orders] = await Promise.all([
    Photo.find({ _id: { $in: photoIds } }).select("documentType isExpert").lean(),
    Order.find({ _id: { $in: orderIds } }).select("orderNumber guestEmail documentType isExpert").lean(),
  ]);

  const photoMap = photos.reduce((acc: any, ph: any) => {
    acc[ph._id.toString()] = ph;
    return acc;
  }, {});

  const orderMap = orders.reduce((acc: any, ord: any) => {
    acc[ord._id.toString()] = ord;
    return acc;
  }, {});

  const enrichedUninvoiced = uninvoicedPaymentsRaw.map((p) => {
    const ph = p.photoId ? photoMap[p.photoId.toString()] : null;
    const ord = p.orderId ? orderMap[p.orderId.toString()] : null;

    return {
      _id: p._id,
      gatewayPaymentId: p.gatewayPaymentId,
      gatewayOrderId: p.gatewayOrderId,
      orderId: p.orderId,
      orderNumber: ord?.orderNumber || `ORD-${p._id}`,
      customerEmail: p.email || ord?.guestEmail || "N/A",
      amount: p.amount,
      currency: p.currency || "USD",
      method: p.method || "card",
      status: p.status,
      documentType: ph?.documentType || ord?.documentType || "passport-photo",
      isExpert: ph?.isExpert || ord?.isExpert || false,
      createdAt: p.createdAt,
    };
  });

  // Convert to plain serializable objects for Client Component
  const initialInvoices = JSON.parse(JSON.stringify(rawInvoices));
  const initialUninvoicedPayments = JSON.parse(JSON.stringify(enrichedUninvoiced));

  const initialStats = {
    totalInvoices: allInvoicesSummary.length,
    paidCount,
    totalRevenueUSD,
    totalRevenueINR,
    uninvoicedPaymentsCount: enrichedUninvoiced.length,
  };

  return (
    <InvoicesClientPage
      initialInvoices={initialInvoices}
      initialStats={initialStats}
      initialUninvoicedPayments={initialUninvoicedPayments}
    />
  );
}
