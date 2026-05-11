import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-03-31.basil",
});

export interface CreateCheckoutParams {
  organizationId: string;
  priceId: string;
  customerEmail: string;
  successUrl: string;
  cancelUrl: string;
}

export interface CreatePortalParams {
  stripeCustomerId: string;
  returnUrl: string;
}

export class BillingService {
  async createCheckoutSession(params: CreateCheckoutParams): Promise<string> {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: params.customerEmail,
      line_items: [
        {
          price: params.priceId,
          quantity: 1,
        },
      ],
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      metadata: {
        organizationId: params.organizationId,
      },
    });

    return session.url || "";
  }

  async createPortalSession(params: CreatePortalParams): Promise<string> {
    const session = await stripe.billingPortal.sessions.create({
      customer: params.stripeCustomerId,
      return_url: params.returnUrl,
    });

    return session.url;
  }

  async handleWebhookEvent(payload: Buffer, signature: string): Promise<Stripe.Event> {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
    return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  }

  async getSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    return stripe.subscriptions.retrieve(subscriptionId);
  }

  async reportUsage(subscriptionItemId: string, quantity: number): Promise<void> {
    await stripe.subscriptionItems.createUsageRecord(subscriptionItemId, {
      quantity,
      timestamp: Math.floor(Date.now() / 1000),
      action: "increment",
    });
  }
}

export { stripe };
