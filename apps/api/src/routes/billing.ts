import { Router } from "express";
import { z } from "zod";

const router = Router();

const checkoutSchema = z.object({
  organizationId: z.string(),
  priceId: z.string(),
  customerEmail: z.string().email(),
});

router.post("/create-checkout-session", async (req, res) => {
  try {
    const data = checkoutSchema.parse(req.body);

    const { BillingService } = await import("@revenue-reception/billing");
    const billing = new BillingService();

    const url = await billing.createCheckoutSession({
      organizationId: data.organizationId,
      priceId: data.priceId,
      customerEmail: data.customerEmail,
      successUrl: `${process.env.FRONTEND_URL}/dashboard?billing=success`,
      cancelUrl: `${process.env.FRONTEND_URL}/billing?canceled=true`,
    });

    res.json({ url });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: "Validation failed", details: error.errors });
      return;
    }
    console.error("Billing error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/portal", async (req, res) => {
  try {
    const { stripeCustomerId } = req.body;
    if (!stripeCustomerId) {
      res.status(400).json({ error: "stripeCustomerId required" });
      return;
    }

    const { BillingService } = await import("@revenue-reception/billing");
    const billing = new BillingService();

    const url = await billing.createPortalSession({
      stripeCustomerId,
      returnUrl: `${process.env.FRONTEND_URL}/dashboard`,
    });

    res.json({ url });
  } catch (error) {
    console.error("Billing portal error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as billingRouter };
