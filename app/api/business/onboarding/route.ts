import { NextResponse } from "next/server";
import crypto from "crypto";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import BusinessOrder from "@/models/BusinessOrder";
import { BUSINESS_USE_CASES } from "@/lib/business-plans";
import { cleanText, isValidEmail, sendOnboardingSubmittedEmail } from "@/lib/business-fulfillment";

const PAPER_SIZES = ["4×6 in (4R)", "5×7 in (5R)", "6×8 in (6R)", "A4", "Letter", "Other"];

function pickList(v: unknown, allowed: readonly string[]): string[] {
  return Array.isArray(v) ? Array.from(new Set(v.filter((x): x is string => typeof x === "string" && allowed.includes(x)))) : [];
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const businessOrderId = body.businessOrderId;
    const token = cleanText(body.onboardingToken, 100);
    if (!mongoose.isValidObjectId(businessOrderId) || !token) {
      return NextResponse.json({ error: "Invalid onboarding link" }, { status: 400 });
    }

    const workspaceName = cleanText(body.workspaceName, 80);
    const adminName = cleanText(body.adminName, 120);
    const adminEmail = cleanText(body.adminEmail, 254).toLowerCase();
    const teamEmails = cleanText(body.teamEmails, 2000)
      .split(/[\s,;]+/)
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);
    const locationsNum = Number(body.locations);
    const locations = Number.isFinite(locationsNum) ? Math.min(500, Math.max(1, Math.round(locationsNum))) : 1;
    const useCases = pickList(body.useCases, BUSINESS_USE_CASES);
    const paperSizes = pickList(body.paperSizes, PAPER_SIZES);
    const primaryCountries = cleanText(body.primaryCountries, 300);
    const printerModel = cleanText(body.printerModel, 120);
    const logoUrl = cleanText(body.logoUrl, 500);
    const notes = cleanText(body.notes, 2000);

    const fields: Record<string, string> = {};
    if (workspaceName.length < 2) fields.workspaceName = "Enter a workspace name";
    if (adminName.length < 2) fields.adminName = "Enter the admin's name";
    if (!isValidEmail(adminEmail)) fields.adminEmail = "Enter a valid admin email";
    if (teamEmails.length > 100) fields.teamEmails = "Add up to 100 staff emails";
    else if (teamEmails.some((e) => !isValidEmail(e))) fields.teamEmails = "One or more staff emails look invalid";
    if (!useCases.length) fields.useCases = "Pick at least one";
    if (logoUrl && !/^https:\/\/\S+$/i.test(logoUrl)) fields.logoUrl = "Use an https:// link";
    if (Object.keys(fields).length) {
      return NextResponse.json({ error: "Please fix the highlighted fields.", fields }, { status: 400 });
    }

    await dbConnect();
    const order = await BusinessOrder.findById(businessOrderId).select("+onboardingToken");
    if (!order || order.status !== "paid") {
      return NextResponse.json({ error: "We couldn't find a paid order for this form." }, { status: 404 });
    }
    const a = Buffer.from(order.onboardingToken);
    const b = Buffer.from(token);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return NextResponse.json({ error: "Invalid onboarding link" }, { status: 403 });
    }

    order.onboarding = {
      workspaceName,
      adminName,
      adminEmail,
      teamEmails: Array.from(new Set(teamEmails)),
      locations,
      useCases,
      primaryCountries,
      printerModel,
      paperSizes,
      logoUrl,
      notes,
      submittedAt: new Date(),
    };
    order.onboardingStatus = "submitted";
    await order.save();

    await sendOnboardingSubmittedEmail(order).catch((err) =>
      console.error("[BUSINESS] Onboarding email error:", err)
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[BUSINESS] Onboarding error:", error);
    return NextResponse.json({ error: "Couldn't save your details. Please try again." }, { status: 500 });
  }
}
