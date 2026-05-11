import { Router } from "express";
import { z } from "zod";
import { prisma } from "@revenue-reception/database";
import { INDUSTRY_TEMPLATES } from "@revenue-reception/shared";

const router = Router();

const createAgentSchema = z.object({
  organizationId: z.string(),
  agentName: z.string(),
  industryTemplate: z.string(),
  voiceId: z.string().optional(),
});

router.post("/create", async (req, res) => {
  try {
    const data = createAgentSchema.parse(req.body);

    const template = INDUSTRY_TEMPLATES[data.industryTemplate];
    if (!template) {
      res.status(400).json({ error: "Invalid industry template" });
      return;
    }

    const profile = await prisma.businessProfile.findUnique({
      where: { organizationId: data.organizationId },
    });

    let retellAgentId: string | null = null;

    try {
      const { VoiceProviderService } = await import("@revenue-reception/retell");
      const voiceService = new VoiceProviderService();

      const prompt = template.defaultPrompt
        .replace("{{business_name}}", profile?.businessName || data.agentName)
        .replace("{{service_area}}", profile?.serviceArea || "your area")
        .replace("{{business_hours}}", JSON.stringify(profile?.businessHours || {}))
        .replace("{{services_offered}}", JSON.stringify(profile?.servicesOffered || template.defaultServices));

      const agent = await voiceService.createAgent({
        agentName: data.agentName,
        prompt,
        voiceId: data.voiceId,
        webhookUrl: `${process.env.API_URL}/api/webhooks/retell`,
      });

      retellAgentId = agent.agentId;
    } catch (retellError) {
      console.warn("Retell AI not configured:", retellError);
    }

    const dbAgent = await prisma.agent.create({
      data: {
        organizationId: data.organizationId,
        agentName: data.agentName,
        industryTemplate: data.industryTemplate,
        voiceId: data.voiceId || "eleven_multilingual_v2",
        retellAgentId,
        status: retellAgentId ? "ACTIVE" : "PROVISIONING",
        webhookUrl: `${process.env.API_URL}/api/webhooks/retell`,
      },
    });

    await prisma.auditLog.create({
      data: {
        organizationId: data.organizationId,
        action: "agent.created",
        metadata: { agentId: dbAgent.id, template: data.industryTemplate },
      },
    });

    res.json({ success: true, agent: dbAgent });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: "Validation failed", details: error.errors });
      return;
    }
    console.error("Agent creation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const organizationId = req.query.organizationId as string;
    if (!organizationId) {
      res.status(400).json({ error: "organizationId required" });
      return;
    }

    const agents = await prisma.agent.findMany({
      where: { organizationId },
      orderBy: { createdAt: "desc" },
    });

    res.json({ agents });
  } catch (error) {
    console.error("Agents list error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as agentsRouter };
