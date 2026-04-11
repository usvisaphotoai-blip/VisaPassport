import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";

/**
 * Cron endpoint to clean up photos older than 24 hours.
 * Protected by CRON_SECRET header to prevent unauthorized access.
 * 
 * Call with: GET /api/cron/cleanup
 * Header: Authorization: Bearer <CRON_SECRET>
 * 
 * For Vercel Cron, configure in vercel.json:
 * { "crons": [{ "path": "/api/cron/cleanup", "schedule": "0 0 * * *" }] }
 */
export async function GET(req: Request) {
  try {
    // Verify cron secret
    const authHeader = req.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    // Delete all photos older than 24 hours
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const result = await Photo.deleteMany({
      createdAt: { $lt: cutoff },
    });

    console.log(`[cron/cleanup] Deleted ${result.deletedCount} photos older than 24 hours`);

    return NextResponse.json({
      success: true,
      deleted: result.deletedCount,
      cutoffDate: cutoff.toISOString(),
    });
  } catch (error: any) {
    console.error("[cron/cleanup] Error:", error);
    return NextResponse.json(
      { error: "Cleanup failed", details: error.message },
      { status: 500 }
    );
  }
}
