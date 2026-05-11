import type { CrmProvider, CrmContact, CrmCallData, CrmSyncResult, CrmConfig } from "./types";
import { GoHighLevelProvider } from "./providers/gohighlevel";
import { HubSpotProvider } from "./providers/hubspot";
import { WebhookProvider } from "./providers/webhook";

export class CrmService {
  private provider: CrmProvider;

  constructor(config: CrmConfig) {
    switch (config.provider) {
      case "gohighlevel":
        this.provider = new GoHighLevelProvider(config.apiKey, config.locationId);
        break;
      case "hubspot":
        this.provider = new HubSpotProvider(config.apiKey);
        break;
      case "webhook":
        this.provider = new WebhookProvider(config.webhookUrl || "");
        break;
      default:
        throw new Error(`Unsupported CRM provider: ${config.provider}`);
    }
  }

  async syncContact(contact: CrmContact): Promise<CrmSyncResult> {
    return this.provider.syncContact(contact);
  }

  async syncCall(callData: CrmCallData): Promise<CrmSyncResult> {
    return this.provider.syncCall(callData);
  }

  async testConnection(): Promise<boolean> {
    return this.provider.testConnection();
  }
}
