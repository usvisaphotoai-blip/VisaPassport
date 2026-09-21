import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export interface AdminAuthResult {
  authorized: boolean;
  userEmail?: string;
  session?: Session | null;
  errorResponse?: NextResponse;
}

/**
 * Returns the normalized list of authorized admin emails.
 */
export function getAdminEmails(): string[] {
  const configuredAdminEmail = (
    process.env.ADMIN_EMAIL || "shikha5389@gmail.com"
  ).trim().toLowerCase();

  const adminEmails = process.env.ADMIN_EMAILS
    ? process.env.ADMIN_EMAILS.split(",")
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean)
    : [configuredAdminEmail];

  if (!adminEmails.includes(configuredAdminEmail)) {
    adminEmails.push(configuredAdminEmail);
  }

  return adminEmails;
}

/**
 * Validates admin authentication and authorization for API routes.
 */
export async function verifyAdminSession(): Promise<AdminAuthResult> {
  try {
    const session = await getServerSession(authOptions);
    const adminEmails = getAdminEmails();
    const userEmail = session?.user?.email?.trim().toLowerCase() || "";

    if (!session || !userEmail || !adminEmails.includes(userEmail)) {
      return {
        authorized: false,
        errorResponse: NextResponse.json(
          { error: "Unauthorized: Administrator privileges required" },
          { status: 401 }
        ),
      };
    }

    return {
      authorized: true,
      userEmail,
      session,
    };
  } catch (error) {
    console.error("[ADMIN AUTH] Error verifying admin session:", error);
    return {
      authorized: false,
      errorResponse: NextResponse.json(
        { error: "Authentication verification failed" },
        { status: 500 }
      ),
    };
  }
}
