import { Router } from "express";
import { z } from "zod";
import { prisma } from "@revenue-reception/database";

const router = Router();

const syncSchema = z.object({
  organizationId: z.string(),
  callId: z.string(),
});

router.post("/sync", async (req, res) => {
  try {
    const data = syncSchema.parse(req.body);

    const [call, integration] = await Promise.all([
      prisma.call.findUnique({ where: { id: data.callId } }),
      prisma.crmIntegration.findFirst({
        where: { organizationId: data.organizationId, status: "CONNECTED" },
      }),
    ]);

    if (!call) {
      res.status(404).json({ error: "Call not found" });
      return;
    }

    if (!integration) {
      res.status(400).json({ error: "No CRM integration configured" });
      return;
    }

    try {
      const { CrmService } = await import("@revenue-reception/crm");
      const crmService = new CrmService({
        provider: integration.provider.toLowerCase() as "gohighlevel" | "hubspot" | "webhook",
        apiKey: integration.apiKeyEncrypted || "",
        locationId: integration.locationId || undefined,
        webhookUrl: integration.webhookUrl || undefined,
      });

      const result = await crmService.syncCall({
        contactPhone: call.callerPhone || "",
        contactName: call.callerName || "Unknown",
        callSummary: call.summary || "",
        callDuration: call.durationSeconds || 0,
        callRecordingUrl: call.recordingUrl || undefined,
        leadQuality: call.leadQuality || "WARM",
        appointmentBooked: call.bookedAppointment,
        estimatedRevenue: call.estimatedRevenue || undefined,
        callIntent: call.callIntent || undefined,
      });

      if (result.success) {
        await prisma.call.update({
          where: { id: call.id },
          data: { crmSynced: true },
        });
      }

      res.json({ success: result.success, externalId: result.externalId, error: result.error });
    } catch (crmError) {
      console.error("CRM sync error:", crmError);
      res.status(500).json({ error: "CRM sync failed" });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: "Validation failed", details: error.errors });
      return;
    }
    console.error("CRM route error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/connect", async (req, res) => {
  try {
    const { organizationId, provider, apiKey, locationId, webhookUrl } = req.body;

    const integration = await prisma.crmIntegration.upsert({
      where: {
        id: req.body.integrationId || "new",
      },
      update: {
        provider: provider.toUpperCase(),
        apiKeyEncrypted: apiKey,
        locationId,
        webhookUrl,
        status: "CONNECTED",
      },
      create: {
        organizationId,
        provider: provider.toUpperCase(),
        apiKeyEncrypted: apiKey,
        locationId,
        webhookUrl,
        status: "CONNECTED",
      },
    });

    res.json({ success: true, integration });
  } catch (error) {
    console.error("CRM connect error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as crmRouter };
