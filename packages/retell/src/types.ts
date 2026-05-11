export interface VoiceProvider {
  createAgent(params: CreateAgentParams): Promise<AgentConfig>;
  updateAgent(agentId: string, params: Partial<CreateAgentParams>): Promise<AgentConfig>;
  deleteAgent(agentId: string): Promise<void>;
  getAgent(agentId: string): Promise<AgentConfig>;
  listAgents(): Promise<AgentConfig[]>;
}

export interface CreateAgentParams {
  agentName: string;
  prompt: string;
  voiceId?: string;
  webhookUrl?: string;
  dynamicVariables?: Record<string, string>;
  language?: string;
  beginMessage?: string;
}

export interface AgentConfig {
  agentId: string;
  agentName: string;
  voiceId: string;
  status: string;
  phoneNumber?: string;
  webhookUrl?: string;
  lastModified?: Date;
}

export interface RetellWebhookPayload {
  event: string;
  call: {
    call_id: string;
    agent_id: string;
    call_status: string;
    start_timestamp?: number;
    end_timestamp?: number;
    transcript?: string;
    transcript_object?: Array<{
      role: string;
      content: string;
      words?: Array<{ word: string; start: number; end: number }>;
    }>;
    recording_url?: string;
    call_analysis?: {
      call_summary?: string;
      user_sentiment?: string;
      call_successful?: boolean;
      custom_analysis_data?: Record<string, unknown>;
    };
    metadata?: Record<string, unknown>;
    from_number?: string;
    to_number?: string;
    direction?: string;
    disconnection_reason?: string;
    duration_ms?: number;
  };
}
