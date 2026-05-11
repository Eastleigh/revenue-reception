import type { CrmProvider, CrmContact, CrmCallData, CrmSyncResult } from "../types";

export class HubSpotProvider implements CrmProvider {
  private apiKey: string;
  private baseUrl = "https://api.hubapi.com";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async syncContact(contact: CrmContact): Promise<CrmSyncResult> {
    try {
      const response = await fetch(`${this.baseUrl}/crm/v3/objects/contacts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          properties: {
            firstname: contact.firstName,
            lastname: contact.lastName || "",
            phone: contact.phone,
            email: contact.email || "",
            leadsource: contact.source || "RevenueReception AI",
          },
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        return { success: false, error };
      }

      const data = (await response.json()) as { id?: string };
      return { success: true, externalId: data.id };
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
      });

      if (contactResult.success && contactResult.externalId) {
        await fetch(`${this.baseUrl}/crm/v3/objects/calls`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            properties: {
              hs_call_body: callData.callSummary,
              hs_call_duration: String(callData.callDuration * 1000),
              hs_call_recording_url: callData.callRecordingUrl || "",
              hs_call_status: "COMPLETED",
            },
            associations: [
              {
                to: { id: contactResult.externalId },
                types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 194 }],
              },
            ],
          }),
        });
      }

      return contactResult;
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/crm/v3/objects/contacts?limit=1`, {
        headers: { Authorization: `Bearer ${this.apiKey}` },
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}
