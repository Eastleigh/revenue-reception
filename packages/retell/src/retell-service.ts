import Retell from "retell-sdk";
import type { VoiceProvider, CreateAgentParams, AgentConfig } from "./types";

export class RetellService implements VoiceProvider {
  private client: Retell;

  constructor(apiKey?: string) {
    const key = apiKey || process.env.RETELL_API_KEY;
    if (!key) {
      throw new Error("RETELL_API_KEY is required");
    }
    this.client = new Retell({ apiKey: key });
  }

  async createAgent(params: CreateAgentParams): Promise<AgentConfig> {
    const agent = await this.client.agent.create({
      agent_name: params.agentName,
      response_engine: {
        type: "retell-llm",
        llm_id: "",
      },
      voice_id: params.voiceId || "eleven_multilingual_v2",
      webhook_url: params.webhookUrl,
      begin_message: params.beginMessage || "Hello! Thank you for calling. How can I help you today?",
      language: params.language || "en-US",
    });

    return {
      agentId: agent.agent_id,
      agentName: agent.agent_name || params.agentName,
      voiceId: agent.voice_id,
      status: "active",
      webhookUrl: params.webhookUrl,
    };
  }

  async updateAgent(agentId: string, params: Partial<CreateAgentParams>): Promise<AgentConfig> {
    const agent = await this.client.agent.update(agentId, {
      agent_name: params.agentName,
      voice_id: params.voiceId,
      webhook_url: params.webhookUrl,
      language: params.language,
    });

    return {
      agentId: agent.agent_id,
      agentName: agent.agent_name || "",
      voiceId: agent.voice_id,
      status: "active",
      webhookUrl: params.webhookUrl,
    };
  }

  async deleteAgent(agentId: string): Promise<void> {
    await this.client.agent.delete(agentId);
  }

  async getAgent(agentId: string): Promise<AgentConfig> {
    const agent = await this.client.agent.retrieve(agentId);

    return {
      agentId: agent.agent_id,
      agentName: agent.agent_name || "",
      voiceId: agent.voice_id,
      status: "active",
    };
  }

  async listAgents(): Promise<AgentConfig[]> {
    const agents = await this.client.agent.list();

    return agents.map((agent) => ({
      agentId: agent.agent_id,
      agentName: agent.agent_name || "",
      voiceId: agent.voice_id,
      status: "active",
    }));
  }
}
