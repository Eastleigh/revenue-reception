import type { CrmProvider, CrmContact, CrmCallData, CrmSyncResult } from "../types";

export class WebhookProvider implements CrmProvider {
  private webhookUrl: string;

  constructor(webhookUrl: string) {
    this.webhookUrl = webhookUrl;
  }

  async syncContact(contact: CrmContact): Promise<CrmSyncResult> {
    try {
      const response = await fetch(this.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "contact.created",
          data: contact,
          timestamp: new Date().toISOString(),
          source: "revenue-reception-ai",
        }),
      });

      if (!response.ok) {
        return { success: false, error: `Webhook returned ${response.status}` };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }

  async syncCall(callData: CrmCallData): Promise<CrmSyncResult> {
    try {
      const response = await fetch(this.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "call.completed",
          data: callData,
          timestamp: new Date().toISOString(),
          source: "revenue-reception-ai",
        }),
      });

      if (!response.ok) {
        return { success: false, error: `Webhook returned ${response.status}` };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(this.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: "connection.test", timestamp: new Date().toISOString() }),
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}
