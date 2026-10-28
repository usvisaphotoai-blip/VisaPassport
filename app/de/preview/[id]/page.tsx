import type { Metadata } from "next";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";
import { reconcilePhotoPayment } from "@/lib/payment-reconcile";
import PreviewClientDe from "./PreviewClientDe";
import { getLocalPrice } from "@/lib/currency";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Per-user order page: keep it out of search results
export const metadata: Metadata = {
  title: "Ihr Foto – Vorschau & Bestellung | PixPassport",
  robots: { index: false, follow: false },
};

export default async function DePreviewPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  let photoRecord;
  try {
    await dbConnect();
    photoRecord = await Photo.findById(params.id);
  } catch {
    // ignore
  }

  if (!photoRecord) {
    redirect("/de/passbild-online");
  }

  // Paid at Razorpay but never confirmed here (tab closed during checkout) — recover now
  if (photoRecord.status !== "paid" && photoRecord.razorpayOrderId && (await reconcilePhotoPayment(photoRecord))) {
    photoRecord = (await Photo.findById(params.id)) || photoRecord;
  }

  const session = await getServerSession(authOptions);
  const isPaid = photoRecord.status === "paid";

  if (isPaid && session?.user) {
    redirect("/dashboard");
  }

  const localPrice = await getLocalPrice(6.99);
  const expertPrice = await getLocalPrice(9.99, undefined, true);

  return (
    <PreviewClientDe
      photoId={photoRecord._id.toString()}
      previewUrl={photoRecord.previewUrl}
      documentType={photoRecord.documentType}
      metrics={photoRecord.metrics ? JSON.parse(JSON.stringify(photoRecord.metrics)) : {}}
      localPrice={localPrice}
      expertPrice={expertPrice}
      initialIsPaid={isPaid}
    />
  );
}
