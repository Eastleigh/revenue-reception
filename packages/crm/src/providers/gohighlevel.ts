import type { CrmProvider, CrmContact, CrmCallData, CrmSyncResult } from "../types";

export class GoHighLevelProvider implements CrmProvider {
  private apiKey: string;
  private locationId?: string;
  private baseUrl = "https://services.leadconnectorhq.com";

  constructor(apiKey: string, locationId?: string) {
    this.apiKey = apiKey;
    this.locationId = locationId;
  }

  async syncContact(contact: CrmContact): Promise<CrmSyncResult> {
    try {
      const response = await fetch(`${this.baseUrl}/contacts/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
          Version: "2021-07-28",
        },
        body: JSON.stringify({
          firstName: contact.firstName,
          lastName: contact.lastName || "",
          phone: contact.phone,
          email: contact.email || "",
          source: contact.source || "RevenueReception AI",
          tags: contact.tags || ["ai-receptionist-lead"],
          locationId: this.locationId,
          customFields: contact.customFields
            ? Object.entries(contact.customFields).map(([key, value]) => ({
                key,
                field_value: value,
              }))
            : undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        return { success: false, error };
      }

      const data = (await response.json()) as { contact?: { id?: string } };
      return { success: true, externalId: data.contact?.id };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }

  async syncCall(callData: CrmCallData): Promise<CrmSyncResult> {
    try {
      const contactResult = await this.syncContact({
        firstName: callData.contactName.split(" ")[0] || callData.contactName,
        lastName: callData.contactName.split(" ").slice(1).join(" "),
        phone: callData.contactPhone,
        tags: [`lead-quality-${callData.leadQuality.toLowerCase()}`],
        customFields: {
          call_summary: callData.callSummary,
          estimated_revenue: String(callData.estimatedRevenue || 0),
          appointment_booked: String(callData.appointmentBooked),
        },
      });

      return contactResult;
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/locations/${this.locationId}`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          Version: "2021-07-28",
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}
