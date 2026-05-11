export interface CrmProvider {
  syncContact(contact: CrmContact): Promise<CrmSyncResult>;
  syncCall(callData: CrmCallData): Promise<CrmSyncResult>;
  testConnection(): Promise<boolean>;
}

export interface CrmContact {
  firstName: string;
  lastName?: string;
  phone: string;
  email?: string;
  source?: string;
  tags?: string[];
  customFields?: Record<string, string>;
}

export interface CrmCallData {
  contactPhone: string;
  contactName: string;
  callSummary: string;
  callDuration: number;
  callRecordingUrl?: string;
  leadQuality: string;
  appointmentBooked: boolean;
  estimatedRevenue?: number;
  callIntent?: string;
}

export interface CrmSyncResult {
  success: boolean;
  externalId?: string;
  error?: string;
}

export interface CrmConfig {
  provider: "gohighlevel" | "hubspot" | "salesforce" | "webhook";
  apiKey: string;
  locationId?: string;
  webhookUrl?: string;
}
