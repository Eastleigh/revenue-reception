export interface BusinessHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export interface DayHours {
  open: string | null;
  close: string | null;
}

export interface EmergencyRules {
  keywords: string[];
  action: "transfer_to_human" | "escalate" | "notify_owner";
}

export interface BookingRules {
  minNoticeHours: number;
  maxDaysAhead: number;
  slotDurationMinutes: number;
}

export interface FaqContent {
  items: FaqItem[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface RetellWebhookEvent {
  event: string;
  call: RetellCallData;
}

export interface RetellCallData {
  call_id: string;
  agent_id: string;
  call_status: string;
  start_timestamp?: number;
  end_timestamp?: number;
  transcript?: string;
  recording_url?: string;
  call_analysis?: {
    call_summary?: string;
    user_sentiment?: string;
    custom_analysis_data?: Record<string, unknown>;
  };
  metadata?: Record<string, unknown>;
  from_number?: string;
  to_number?: string;
  direction?: string;
  disconnection_reason?: string;
}

export interface DashboardMetrics {
  totalCalls: number;
  answeredCalls: number;
  missedCalls: number;
  appointmentsBooked: number;
  missedCallsRecovered: number;
  transfers: number;
  leadQualityBreakdown: {
    hot: number;
    warm: number;
    cold: number;
    spam: number;
  };
  estimatedRevenue: number;
  minutesUsed: number;
  estimatedAiCost: number;
  roi: number;
}

export interface OnboardingData {
  businessName: string;
  industry: string;
  services: string[];
  serviceArea: string;
  businessHours: BusinessHours;
  emergencyRules: EmergencyRules;
  transferPhoneNumber: string;
  bookingRules: BookingRules;
  faqContent: FaqContent;
}

export interface CreateAgentRequest {
  organizationId: string;
  agentName: string;
  industryTemplate: string;
  voiceId?: string;
}
