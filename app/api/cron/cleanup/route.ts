import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";
import cloudinary from "@/lib/cloudinary";
import { logAuditEvent } from "@/lib/audit";

/** Days an expert-edit order keeps its photos before the cleanup deletes them (stated in the privacy policy) */
const EXPERT_EDIT_RETENTION_DAYS = 30;

/**
 * Helper to extract Cloudinary public ID from secureUrl / previewUrl
 */
function extractCloudinaryPublicId(url: string): string | null {
  if (!url || typeof url !== "string" || !url.includes("cloudinary.com")) return null;
  try {
    const match = url.match(/\/upload\/(?:v\d+\/)?([^\.]+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

/**
 * 24-HOUR EPHEMERAL PURGE CRON ENGINE
 * 
 * Architecture Policy:
 * - PERMANENT (Retained): Order, Payment, Dispute, Audit Events.
 * - 24 HOURS (Purged): Uploaded Photo, Generated Photo, Processing Files.
 *
 * Protected by CRON_SECRET header.
 * GET /api/cron/cleanup
 * Header: Authorization: Bearer <CRON_SECRET>
 */
export async function GET(req: Request) {
  try {
    // Verify cron secret
    const authHeader = req.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
    console.log(`[cron/cleanup] Starting 24h ephemeral purge for items before ${cutoff.toISOString()}...`);

    // 1. Find all photos older than 24 hours that have not yet had their binaries purged
    const expiredPhotos = await Photo.find({
      createdAt: { $lt: cutoff },
      isExpired: { $ne: true },
    }).limit(200);

    let photosPurgedCount = 0;
    const publicIdsToDelete: string[] = [];

    for (const photo of expiredPhotos) {
      // Collect Cloudinary public IDs for uploaded & generated photos
      [photo.originalUrl, photo.secureUrl, photo.previewUrl, photo.printSheetUrl].forEach((url) => {
        if (url) {
          const publicId = extractCloudinaryPublicId(url);
          if (publicId && !publicIdsToDelete.includes(publicId)) {
            publicIdsToDelete.push(publicId);
          }
        }
      });

      // Ephemeral Purge: Nullify image URLs and mark expired
      // PERMANENT Order, Payment, and Audit linkages are preserved!
      photo.secureUrl = undefined;
      photo.previewUrl = undefined;
      photo.printSheetUrl = undefined;
      photo.originalUrl = undefined;
      photo.isExpired = true;
      photo.purgedAt = new Date();
      await photo.save();

      photosPurgedCount++;
    }

    // 1b. Find expired validation images older than 24 hours
    try {
      const ValidationRecord = (await import("@/models/ValidationRecord")).default;
      const expiredValidations = await ValidationRecord.find({
        createdAt: { $lt: cutoff },
        imageUrl: { $exists: true, $ne: "" },
      }).limit(100);

      for (const valRecord of expiredValidations) {
        if (valRecord.imageUrl) {
          const publicId = extractCloudinaryPublicId(valRecord.imageUrl);
          if (publicId && !publicIdsToDelete.includes(publicId)) {
            publicIdsToDelete.push(publicId);
          }
          valRecord.imageUrl = undefined;
          await valRecord.save();
        }
      }
    } catch (valErr) {
      console.warn("[cron/cleanup] Error querying validation records:", valErr);
    }

    // 1c. Expert-edit photos are kept for 30 days so the editor can finish the order, then deleted
    let expertOrdersPurgedCount = 0;
    try {
      const ExpertOrder = (await import("@/models/ExpertOrder")).default;
      const expertCutoff = new Date(Date.now() - EXPERT_EDIT_RETENTION_DAYS * 24 * 60 * 60 * 1000);
      const expiredExpertOrders = await ExpertOrder.find({
        createdAt: { $lt: expertCutoff },
        photosPurgedAt: { $exists: false },
      })
        .select("photos")
        .limit(100);

      for (const order of expiredExpertOrders) {
        for (const url of order.photos ?? []) {
          const publicId = extractCloudinaryPublicId(url);
          if (publicId && !publicIdsToDelete.includes(publicId)) publicIdsToDelete.push(publicId);
        }
        // updateOne skips the schema's `required` check on the now-empty photos array
        await ExpertOrder.updateOne({ _id: order._id }, { $set: { photos: [], photosPurgedAt: new Date() } });
        expertOrdersPurgedCount++;
      }
    } catch (expertErr) {
      console.warn("[cron/cleanup] Error purging expert-edit photos:", expertErr);
    }

    // 2. Delete remote image assets from Cloudinary
    let cloudinaryDeletedCount = 0;
    if (publicIdsToDelete.length > 0 && process.env.CLOUDINARY_API_KEY) {
      try {
        // The Admin API accepts at most 100 public IDs per delete call
        for (let i = 0; i < publicIdsToDelete.length; i += 100) {
          const batch = publicIdsToDelete.slice(i, i + 100);
          await cloudinary.api.delete_resources(batch);
          cloudinaryDeletedCount += batch.length;
        }
        console.log(`[cron/cleanup] Purged ${cloudinaryDeletedCount} image files from Cloudinary storage.`);
      } catch (cloudErr) {
        console.warn("[cron/cleanup] Error deleting resources from Cloudinary:", cloudErr);
      }
    }

    // 3. Clean temporary processing files in scratch/ older than 24h
    let tempFilesDeleted = 0;
    try {
      const scratchDir = path.join(process.cwd(), "scratch");
      const entries = await fs.readdir(scratchDir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isFile() && !entry.name.endsWith(".js") && !entry.name.endsWith(".ts") && !entry.name.startsWith(".")) {
          const filePath = path.join(scratchDir, entry.name);
          const stats = await fs.stat(filePath);
          if (stats.mtime < cutoff) {
            await fs.unlink(filePath);
            tempFilesDeleted++;
          }
        }
      }
      if (tempFilesDeleted > 0) {
        console.log(`[cron/cleanup] Deleted ${tempFilesDeleted} temporary processing files from scratch directory.`);
      }
    } catch (fsErr) {
      // Ignore if scratch dir doesn't exist or error reading
    }

    // 4. Record permanent Audit Event documenting the 24-hour purge operation
    await logAuditEvent({
      eventType: "processing",
      actor: "system",
      metadata: {
        action: "24h_ephemeral_purge",
        photosPurgedCount,
        cloudinaryAssetsPurged: cloudinaryDeletedCount,
        processingFilesDeleted: tempFilesDeleted,
        expertOrdersPurgedCount,
        cutoffDate: cutoff.toISOString(),
        permanentDataPreserved: ["Order", "Payment", "Dispute", "AuditEvent"],
      },
    });

    console.log(
      `[cron/cleanup] 24h Purge complete. Purged: ${photosPurgedCount} photos, ${cloudinaryDeletedCount} assets, ${tempFilesDeleted} temp files. Permanent order records retained.`
    );

    return NextResponse.json({
      success: true,
      message: "24-hour ephemeral file purge completed successfully",
      photosPurgedCount,
      cloudinaryAssetsPurged: cloudinaryDeletedCount,
      processingFilesDeleted: tempFilesDeleted,
      expertOrdersPurgedCount,
      cutoffDate: cutoff.toISOString(),
      permanentRecordsPreserved: true,
    });
  } catch (error: any) {
    console.error("[cron/cleanup] Error during 24h purge:", error);
    return NextResponse.json(
      { error: "Cleanup failed", details: error.message },
      { status: 500 }
    );
  }
}
