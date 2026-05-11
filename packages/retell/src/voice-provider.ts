import type { VoiceProvider, CreateAgentParams, AgentConfig } from "./types";
import { RetellService } from "./retell-service";

export class VoiceProviderService {
  private provider: VoiceProvider;

  constructor(provider?: VoiceProvider) {
    this.provider = provider || new RetellService();
  }

  async createAgent(params: CreateAgentParams): Promise<AgentConfig> {
    return this.provider.createAgent(params);
  }

  async updateAgent(agentId: string, params: Partial<CreateAgentParams>): Promise<AgentConfig> {
    return this.provider.updateAgent(agentId, params);
  }

  async deleteAgent(agentId: string): Promise<void> {
    return this.provider.deleteAgent(agentId);
  }

  async getAgent(agentId: string): Promise<AgentConfig> {
    return this.provider.getAgent(agentId);
  }

  async listAgents(): Promise<AgentConfig[]> {
    return this.provider.listAgents();
  }
}
