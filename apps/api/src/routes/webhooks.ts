import { Router } from "express";
import express from "express";
import { prisma } from "@revenue-reception/database";
import type { RetellWebhookPayload } from "@revenue-reception/retell/src/types";

const router = Router();

router.post("/retell", express.json(), async (req, res) => {
  try {
    const payload = req.body as RetellWebhookPayload;
    const { event, call } = payload;

    console.log(`Retell webhook received: ${event} for call ${call.call_id}`);

    const agent = await prisma.agent.findFirst({
      where: { retellAgentId: call.agent_id },
    });

    if (!agent) {
      console.error(`No agent found for retell agent ID: ${call.agent_id}`);
      res.status(200).json({ received: true });
      return;
    }

    const organizationId = agent.organizationId;

    switch (event) {
      case "call_started": {
        await prisma.call.upsert({
          where: { retellCallId: call.call_id },
          update: {
            callStatus: "IN_PROGRESS",
            startedAt: call.start_timestamp ? new Date(call.start_timestamp) : new Date(),
          },
          create: {
            organizationId,
            retellCallId: call.call_id,
            callerPhone: call.from_number || null,
            callStatus: "IN_PROGRESS",
            callDirection: call.direction === "outbound" ? "OUTBOUND" : "INBOUND",
            startedAt: call.start_timestamp ? new Date(call.start_timestamp) : new Date(),
          },
        });
        break;
      }

      case "call_ended": {
        const durationMs = call.duration_ms || 0;
        const durationSeconds = Math.ceil(durationMs / 1000);
        const minutesUsed = Math.ceil(durationSeconds / 60);

        const analysis = call.call_analysis;
        let leadQuality: "HOT" | "WARM" | "COLD" | "SPAM" = "WARM";
        let bookedAppointment = false;
        let callIntent: string | undefined;
        let estimatedRevenue: number | undefined;
        let transferredToHuman = false;

        if (analysis?.custom_analysis_data) {
          const customData = analysis.custom_analysis_data;
          if (customData.lead_quality) {
            leadQuality = (customData.lead_quality as string).toUpperCase() as typeof leadQuality;
          }
          if (customData.booked_appointment) {
            bookedAppointment = Boolean(customData.booked_appointment);
          }
          if (customData.call_intent) {
            callIntent = customData.call_intent as string;
          }
          if (customData.estimated_revenue) {
            estimatedRevenue = Number(customData.estimated_revenue);
          }
          if (customData.transferred_to_human) {
            transferredToHuman = Boolean(customData.transferred_to_human);
          }
        }

        if (call.disconnection_reason === "call_transfer") {
          transferredToHuman = true;
        }

        await prisma.call.upsert({
          where: { retellCallId: call.call_id },
          update: {
            callStatus: transferredToHuman ? "TRANSFERRED" : "COMPLETED",
            endedAt: call.end_timestamp ? new Date(call.end_timestamp) : new Date(),
            durationSeconds,
            transcript: call.transcript_object || null,
            recordingUrl: call.recording_url || null,
            summary: analysis?.call_summary || null,
            leadQuality,
            callIntent,
            bookedAppointment,
            estimatedRevenue,
            transferredToHuman,
          },
          create: {
            organizationId,
            retellCallId: call.call_id,
            callerPhone: call.from_number || null,
            callStatus: transferredToHuman ? "TRANSFERRED" : "COMPLETED",
            callDirection: call.direction === "outbound" ? "OUTBOUND" : "INBOUND",
            startedAt: call.start_timestamp ? new Date(call.start_timestamp) : undefined,
            endedAt: call.end_timestamp ? new Date(call.end_timestamp) : new Date(),
            durationSeconds,
            transcript: call.transcript_object || null,
            recordingUrl: call.recording_url || null,
            summary: analysis?.call_summary || null,
            leadQuality,
            callIntent,
            bookedAppointment,
            estimatedRevenue,
            transferredToHuman,
          },
        });

        await prisma.usageRecord.create({
          data: {
            organizationId,
            retellCallId: call.call_id,
            minutesUsed,
            estimatedCost: minutesUsed * 0.10,
            billingPeriod: new Date().toISOString().slice(0, 7),
          },
        });

        break;
      }

      case "call_analyzed": {
        if (call.call_analysis) {
          await prisma.call.update({
            where: { retellCallId: call.call_id },
            data: {
              summary: call.call_analysis.call_summary || undefined,
            },
          });
        }
        break;
      }
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(200).json({ received: true, error: "Processing failed" });
  }
});

router.post("/stripe", express.raw({ type: "application/json" }), async (req, res) => {
  try {
    const { BillingService } = await import("@revenue-reception/billing");
    const billing = new BillingService();
    const sig = req.headers["stripe-signature"] as string;
    const event = await billing.handleWebhookEvent(req.body, sig);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as { metadata?: { organizationId?: string }; customer?: string; subscription?: string };
        const orgId = session.metadata?.organizationId;
        if (orgId) {
          await prisma.organization.update({
            where: { id: orgId },
            data: {
              stripeCustomerId: session.customer as string,
              billingStatus: "ACTIVE",
            },
          });
        }
        break;
      }
      case "customer.subscription.deleted": {
        const sub = event.data.object as { customer?: string };
        const customerId = sub.customer as string;
        await prisma.organization.updateMany({
          where: { stripeCustomerId: customerId },
          data: { billingStatus: "CANCELED" },
        });
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object as { customer?: string };
        const cust = invoice.customer as string;
        await prisma.organization.updateMany({
          where: { stripeCustomerId: cust },
          data: { billingStatus: "PAST_DUE" },
        });
        break;
      }
    }

    res.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    res.status(400).json({ error: "Webhook processing failed" });
  }
});

export { router as webhookRouter };
