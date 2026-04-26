import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";
import PreviewClient from "./PreviewClient";
import { getLocalPrice } from "@/lib/currency";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function PreviewPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  let photoRecord;
  try {
    await dbConnect();
    photoRecord = await Photo.findById(params.id);
  } catch (error) {
    // Invalid ID format
  }

  if (!photoRecord) {
    redirect("/tool");
  }

  const session = await getServerSession(authOptions);
  const isPaid = photoRecord.status === "paid";

  // Only redirect to dashboard if they are logged in and it's paid
  if (isPaid && session?.user) {
    redirect("/dashboard");
  }

  const localPrice = await getLocalPrice(5.99);
  const expertPrice = await getLocalPrice(9.99, undefined, true);

  return (
    <PreviewClient
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
