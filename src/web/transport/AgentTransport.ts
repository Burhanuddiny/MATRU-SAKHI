/**
 * Unified AgentTransport interface for voice and text fallback
 */

import { JourneyState, ToolCall, ToolResult } from '../../shared/types.js';

export interface CaptionPayload {
  who: 'saheli' | 'user';
  text: string;
}

export type TransportStatus = 'connecting' | 'listening' | 'speaking' | 'closed' | 'error';

export interface AgentTransport {
  start(state: JourneyState): Promise<void>;
  stop(): void;
  sendText(text: string): Promise<void>;
  sendToolResponse(responses: ToolResult[]): Promise<void>;
  on(event: 'caption', cb: (c: CaptionPayload) => void): void;
  on(event: 'toolCall', cb: (calls: ToolCall[]) => void): void;
  on(event: 'status', cb: (s: TransportStatus) => void): void;
  getStatus(): TransportStatus;
  interrupt(): void;
}
