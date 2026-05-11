export const PLANS = {
  STARTER: {
    name: "Starter",
    price: 297,
    minutesIncluded: 300,
    agents: 1,
    features: ["Basic dashboard", "Call logging", "AI receptionist"],
  },
  GROWTH: {
    name: "Growth",
    price: 497,
    minutesIncluded: 750,
    agents: 3,
    features: [
      "CRM integration",
      "SMS follow-up",
      "Calendar booking",
      "Advanced analytics",
      "Priority support",
    ],
  },
  AGENCY: {
    name: "Agency",
    price: 997,
    minutesIncluded: 2000,
    agents: 10,
    features: [
      "5 client accounts",
      "White-label dashboard",
      "Multi-location support",
      "API access",
      "Dedicated account manager",
    ],
  },
} as const;

export const OVERAGE_RATE_PER_MINUTE = 0.15;

export const INDUSTRIES = [
  "hvac",
  "plumbing",
  "roofing",
  "dental",
  "medspa",
  "psw_homecare",
  "law_firm",
  "insurance",
] as const;

export const TRANSFER_RULES = [
  "emergency_request",
  "angry_caller",
  "high_value_job",
  "complex_question",
  "caller_asks_for_human",
  "low_confidence",
] as const;

export const LEAD_QUALITY_LABELS = {
  HOT: "Hot Lead",
  WARM: "Warm Lead",
  COLD: "Cold Lead",
  SPAM: "Spam",
} as const;
