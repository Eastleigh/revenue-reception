import { Router } from "express";
import { z } from "zod";
import { prisma } from "@revenue-reception/database";

const router = Router();

const onboardingSchema = z.object({
  businessName: z.string().min(1),
  industry: z.string().min(1),
  services: z.array(z.string()),
  serviceArea: z.string(),
  businessHours: z.record(z.object({
    open: z.string().nullable(),
    close: z.string().nullable(),
  })),
  emergencyRules: z.object({
    keywords: z.array(z.string()),
    action: z.enum(["transfer_to_human", "escalate", "notify_owner"]),
  }),
  transferPhoneNumber: z.string(),
  bookingRules: z.object({
    minNoticeHours: z.number(),
    maxDaysAhead: z.number(),
    slotDurationMinutes: z.number(),
  }),
  faqContent: z.object({
    items: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })),
  }),
  organizationId: z.string(),
});

router.post("/complete", async (req, res) => {
  try {
    const data = onboardingSchema.parse(req.body);

    const profile = await prisma.businessProfile.upsert({
      where: { organizationId: data.organizationId },
      update: {
        businessName: data.businessName,
        businessHours: data.businessHours,
        serviceArea: data.serviceArea,
        servicesOffered: data.services,
        emergencyRules: data.emergencyRules,
        transferPhoneNumber: data.transferPhoneNumber,
        bookingRules: data.bookingRules,
        faqContent: data.faqContent,
      },
      create: {
        organizationId: data.organizationId,
        businessName: data.businessName,
        businessHours: data.businessHours,
        serviceArea: data.serviceArea,
        servicesOffered: data.services,
        emergencyRules: data.emergencyRules,
        transferPhoneNumber: data.transferPhoneNumber,
        bookingRules: data.bookingRules,
        faqContent: data.faqContent,
      },
    });

    await prisma.organization.update({
      where: { id: data.organizationId },
      data: { industry: data.industry },
    });

    await prisma.auditLog.create({
      data: {
        organizationId: data.organizationId,
        action: "onboarding.completed",
        metadata: { industry: data.industry },
      },
    });

    res.json({ success: true, profile });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: "Validation failed", details: error.errors });
      return;
    }
    console.error("Onboarding error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as onboardingRouter };
