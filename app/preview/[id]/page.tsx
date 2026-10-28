import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";
import { reconcilePhotoPayment } from "@/lib/payment-reconcile";
import PreviewClient from "./PreviewClient";
import { getLocalPrice } from "@/lib/currency";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAllCountryDocuments, getSiteCodes, getSiteConfig } from "@/lib/country-sites";
import { resolvePreviewStrings } from "@/lib/preview-strings";

export default async function PreviewPage(props: { params: Promise<{ id: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  let photoRecord;
  try {
    await dbConnect();
    photoRecord = await Photo.findById(params.id);
  } catch (error) {
    // Invalid ID format
  }

  if (!photoRecord) {
    redirect("/passport-photo-online");
  }

  // Paid at Razorpay but never confirmed here (tab closed during checkout) — recover now
  if (photoRecord.status !== "paid" && photoRecord.razorpayOrderId && (await reconcilePhotoPayment(photoRecord))) {
    photoRecord = (await Photo.findById(params.id)) || photoRecord;
  }

  const session = await getServerSession(authOptions);
  const isPaid = photoRecord.status === "paid";

  const localPrice = await getLocalPrice(6.99);
  const expertPrice = await getLocalPrice(9.99, undefined, true);
  const downloadToken = photoRecord.downloadToken || (searchParams.token as string) || "";

  // ?from=<code> set by a content/sites section localizes the page; anything else stays English
  const from = searchParams.from as string | undefined;
  const site = from && getSiteCodes().includes(from) ? getSiteConfig(from) : null;
  const strings = resolvePreviewStrings(site?.preview);
  const siteDoc =
    site?.tool.documents.find((d) => d.id === photoRecord.documentType) ||
    (site ? (await getAllCountryDocuments(site)).find((d) => d.id === photoRecord.documentType) : undefined);

  return (
    <>
    {/* Root layout renders <html lang="en">; set the real language before paint so Chrome doesn't offer translation */}
    {site?.lang && (
      <script dangerouslySetInnerHTML={{ __html: `document.documentElement.lang=${JSON.stringify(site.lang)}` }} />
    )}
    <PreviewClient
      photoId={photoRecord._id.toString()}
      previewUrl={photoRecord.previewUrl}
      documentType={photoRecord.documentType}
      metrics={photoRecord.metrics ? JSON.parse(JSON.stringify(photoRecord.metrics)) : {}}
      localPrice={localPrice}
      expertPrice={expertPrice}
      initialIsPaid={isPaid}
      from={from}
      downloadToken={downloadToken}
      strings={strings}
      lang={site?.lang}
      documentLabel={siteDoc?.label}
      documentFlag={siteDoc?.flag}
    />
    </>
  );
}
