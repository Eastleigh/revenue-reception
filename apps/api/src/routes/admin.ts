import { Router } from "express";
import { prisma } from "@revenue-reception/database";

const router = Router();

router.get("/organizations", async (_req, res) => {
  try {
    const organizations = await prisma.organization.findMany({
      include: {
        _count: {
          select: { calls: true, agents: true, users: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json({ organizations });
  } catch (error) {
    console.error("Admin orgs error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/usage", async (_req, res) => {
  try {
    const currentMonth = new Date().toISOString().slice(0, 7);

    const usage = await prisma.usageRecord.groupBy({
      by: ["organizationId"],
      where: { billingPeriod: currentMonth },
      _sum: { minutesUsed: true, estimatedCost: true },
    });

    res.json({ usage, period: currentMonth });
  } catch (error) {
    console.error("Admin usage error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      database: "connected",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  } catch (error) {
    res.status(500).json({ database: "disconnected", error: String(error) });
  }
});

router.get("/audit-logs", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const logs = await prisma.auditLog.findMany({
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, email: true } } },
    });

    res.json({ logs });
  } catch (error) {
    console.error("Admin audit logs error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as adminRouter };
