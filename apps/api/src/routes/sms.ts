import { Router } from "express";
import { z } from "zod";
import { prisma } from "@revenue-reception/database";

const router = Router();

const sendSchema = z.object({
  organizationId: z.string(),
  callId: z.string().optional(),
  recipientPhone: z.string(),
  messageBody: z.string(),
});

router.post("/send", async (req, res) => {
  try {
    const data = sendSchema.parse(req.body);

    const smsRecord = await prisma.smsMessage.create({
      data: {
        organizationId: data.organizationId,
        callId: data.callId || null,
        recipientPhone: data.recipientPhone,
        messageBody: data.messageBody,
        status: "QUEUED",
      },
    });

    try {
      const { SmsService } = await import("@revenue-reception/integrations");
      const smsService = new SmsService();
      const result = await smsService.send({
        to: data.recipientPhone,
        body: data.messageBody,
      });

      await prisma.smsMessage.update({
        where: { id: smsRecord.id },
        data: {
          status: result.success ? "SENT" : "FAILED",
          sentAt: result.success ? new Date() : null,
        },
      });

      res.json({ success: result.success, messageId: result.messageId, smsId: smsRecord.id });
    } catch (smsError) {
      console.warn("SMS service not configured:", smsError);
      res.json({ success: false, smsId: smsRecord.id, error: "SMS service not configured" });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: "Validation failed", details: error.errors });
      return;
    }
    console.error("SMS route error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as smsRouter };
