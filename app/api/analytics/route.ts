import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import AnalyticsSession from "@/models/AnalyticsSession";
import AnalyticsEvent from "@/models/AnalyticsEvent";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, type, url, metadata, duration } = body;

    if (!sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    await connectToDatabase();

    // The x-vercel-ip-country header helps get standard country codes natively on Vercel
    const country = req.headers.get("x-vercel-ip-country") || "Unknown";
    const userAgent = req.headers.get("user-agent") || "Unknown";

    // Upsert the session
    let session = await AnalyticsSession.findOne({ sessionId });
    if (!session) {
      session = new AnalyticsSession({
        sessionId,
        country,
        userAgent,
        firstSeenAt: new Date(),
        lastSeenAt: new Date(),
        pageViews: type === "page_view" ? 1 : 0,
      });
    } else {
      session.lastSeenAt = new Date();
      if (type === "page_view") {
        session.pageViews += 1;
      }
      
      // Update duration if provided (e.g. from beacon or heartbeat)
      if (duration && typeof duration === "number") {
        session.duration = Math.max(session.duration, duration);
      }
    }
    await session.save();

    // Log the event
    if (type) {
      await AnalyticsEvent.create({
        sessionId,
        eventType: type, // 'page_view', 'razorpay_open'
        url: url || "",
        metadata,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics Error:", error);
    return NextResponse.json(
      { error: "Failed to record analytics" },
      { status: 500 }
    );
  }
}
