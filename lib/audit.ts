import dbConnect from "@/lib/mongodb";
import AuditEvent, { AuditEventType } from "@/models/AuditEvent";

export interface LogAuditParams {
  eventType: AuditEventType;
  orderId?: any;
  paymentId?: any;
  photoId?: any;
  disputeId?: any;
  actor?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
}

/**
 * Log an immutable audit event to the permanent AuditEvent collection.
 * Non-blocking safe execution to prevent audit logging failures from interrupting primary flows.
 */
export async function logAuditEvent(params: LogAuditParams) {
  try {
    await dbConnect();
    const event = await AuditEvent.create({
      eventType: params.eventType,
      orderId: params.orderId,
      paymentId: params.paymentId,
      photoId: params.photoId ? params.photoId.toString() : undefined,
      disputeId: params.disputeId,
      actor: params.actor || "system",
      ipAddress: params.ipAddress,
      userAgent: params.userAgent,
      metadata: params.metadata || {},
    });
    return event;
  } catch (error) {
    console.error(`[AUDIT] Failed to record audit event (${params.eventType}):`, error);
    return null;
  }
}

/**
 * Extract client IP and User-Agent from Request headers
 */
export function getClientMetadata(req: Request): { ipAddress?: string; userAgent?: string } {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const ipAddress = forwardedFor ? forwardedFor.split(",")[0].trim() : realIp || undefined;
  const userAgent = req.headers.get("user-agent") || undefined;
  return { ipAddress, userAgent };
}

/**
 * Atomically claim the right to send a delivery email for a given entity.
 * Uses MongoDB findOneAndUpdate with upsert so only one concurrent caller
 * wins the claim. Returns true if this caller won, false if already claimed.
 */
export async function claimEmailSend(
  filter: { photoId?: string; orderId?: any; expertOrderId?: string },
  template: string,
  actor: string = "system"
): Promise<boolean> {
  try {
    await dbConnect();

    const query: Record<string, any> = {
      eventType: "email_sent",
      "metadata.template": template,
    };

    if (filter.photoId) {
      query.photoId = filter.photoId.toString();
    } else if (filter.expertOrderId) {
      query["metadata.expertOrderId"] = filter.expertOrderId;
    } else if (filter.orderId) {
      query.orderId = filter.orderId;
    } else {
      return true; // No identifier to dedup on — allow sending
    }

    // Atomic upsert: { new: false } returns the OLD doc (null if just inserted)
    const existing = await AuditEvent.findOneAndUpdate(
      query,
      {
        $setOnInsert: {
          eventType: "email_sent",
          photoId: filter.photoId?.toString(),
          orderId: filter.orderId,
          actor,
          metadata: {
            status: "claiming",
            template,
            expertOrderId: filter.expertOrderId,
          },
        },
      },
      { upsert: true, new: false }
    );

    // If existing is null, the document was just created — we own the claim
    return existing === null;
  } catch (err) {
    console.error("[AUDIT] claimEmailSend error (fail-open):", err);
    // Fail-open: allow sending to avoid blocking emails entirely
    return true;
  }
}

/**
 * Release an email send claim (e.g. when email send fails),
 * allowing another process to retry.
 */
export async function releaseEmailClaim(
  filter: { photoId?: string; orderId?: any; expertOrderId?: string },
  template: string
): Promise<void> {
  try {
    await dbConnect();

    const query: Record<string, any> = {
      eventType: "email_sent",
      "metadata.template": template,
      "metadata.status": "claiming",
    };

    if (filter.photoId) {
      query.photoId = filter.photoId.toString();
    } else if (filter.expertOrderId) {
      query["metadata.expertOrderId"] = filter.expertOrderId;
    } else if (filter.orderId) {
      query.orderId = filter.orderId;
    }

    await AuditEvent.deleteOne(query);
  } catch (err) {
    console.error("[AUDIT] releaseEmailClaim error:", err);
  }
}
