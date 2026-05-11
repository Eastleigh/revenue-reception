import { Router } from "express";
import { prisma } from "@revenue-reception/database";

const router = Router();

router.get("/metrics", async (req, res) => {
  try {
    const organizationId = req.query.organizationId as string;
    if (!organizationId) {
      res.status(400).json({ error: "organizationId required" });
      return;
    }

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [calls, appointments, usageRecords] = await Promise.all([
      prisma.call.findMany({
        where: {
          organizationId,
          createdAt: { gte: thirtyDaysAgo },
        },
      }),
      prisma.appointment.count({
        where: {
          organizationId,
          createdAt: { gte: thirtyDaysAgo },
        },
      }),
      prisma.usageRecord.findMany({
        where: {
          organizationId,
          createdAt: { gte: thirtyDaysAgo },
        },
      }),
    ]);

    const totalCalls = calls.length;
    const answeredCalls = calls.filter((c) => c.callStatus === "COMPLETED" || c.callStatus === "TRANSFERRED").length;
    const missedCalls = calls.filter((c) => c.callStatus === "MISSED").length;
    const transfers = calls.filter((c) => c.transferredToHuman).length;
    const appointmentsBooked = calls.filter((c) => c.bookedAppointment).length;

    const leadQualityBreakdown = {
      hot: calls.filter((c) => c.leadQuality === "HOT").length,
      warm: calls.filter((c) => c.leadQuality === "WARM").length,
      cold: calls.filter((c) => c.leadQuality === "COLD").length,
      spam: calls.filter((c) => c.leadQuality === "SPAM").length,
    };

    const estimatedRevenue = calls.reduce((sum, c) => sum + (c.estimatedRevenue || 0), 0);
    const minutesUsed = usageRecords.reduce((sum, r) => sum + r.minutesUsed, 0);
    const estimatedAiCost = usageRecords.reduce((sum, r) => sum + r.estimatedCost, 0);

    const roi = estimatedAiCost > 0 ? Math.round((estimatedRevenue / estimatedAiCost) * 100) / 100 : 0;

    res.json({
      totalCalls,
      answeredCalls,
      missedCalls,
      appointmentsBooked,
      missedCallsRecovered: 0,
      transfers,
      leadQualityBreakdown,
      estimatedRevenue,
      minutesUsed: Math.round(minutesUsed * 10) / 10,
      estimatedAiCost: Math.round(estimatedAiCost * 100) / 100,
      roi,
      totalAppointments: appointments,
      period: "30d",
    });
  } catch (error) {
    console.error("Dashboard metrics error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as dashboardRouter };
