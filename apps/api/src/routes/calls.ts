import { Router } from "express";
import { prisma } from "@revenue-reception/database";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const organizationId = req.query.organizationId as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    if (!organizationId) {
      res.status(400).json({ error: "organizationId required" });
      return;
    }

    const [calls, total] = await Promise.all([
      prisma.call.findMany({
        where: { organizationId },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          appointment: true,
          smsMessages: true,
        },
      }),
      prisma.call.count({ where: { organizationId } }),
    ]);

    res.json({
      calls,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Calls list error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const call = await prisma.call.findUnique({
      where: { id: req.params.id },
      include: {
        appointment: true,
        smsMessages: true,
        usageRecord: true,
      },
    });

    if (!call) {
      res.status(404).json({ error: "Call not found" });
      return;
    }

    res.json(call);
  } catch (error) {
    console.error("Call detail error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as callsRouter };
