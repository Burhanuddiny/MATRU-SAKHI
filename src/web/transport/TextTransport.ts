/**
 * TextTransport: REST-based agent transport calling /api/chat
 * Used for fallback, keyboard input, or when audio is not available
 */

import { AgentTransport, CaptionPayload, TransportStatus } from './AgentTransport.js';
import { JourneyState, ToolCall, ToolResult } from '../../shared/types.js';

export class TextTransport implements AgentTransport {
  private status: TransportStatus = 'closed';
  private captionListeners: ((c: CaptionPayload) => void)[] = [];
  private toolCallListeners: ((calls: ToolCall[]) => void)[] = [];
  private statusListeners: ((s: TransportStatus) => void)[] = [];
  private currentState: JourneyState | null = null;
  private conversationHistory: { role: 'user' | 'model'; parts: { text: string }[] }[] = [];

  public getStatus(): TransportStatus {
    return this.status;
  }

  public on(event: 'caption', cb: (c: CaptionPayload) => void): void;
  public on(event: 'toolCall', cb: (calls: ToolCall[]) => void): void;
  public on(event: 'status', cb: (s: TransportStatus) => void): void;
  public on(event: string, cb: any): void {
    if (event === 'caption') this.captionListeners.push(cb);
    if (event === 'toolCall') this.toolCallListeners.push(cb);
    if (event === 'status') this.statusListeners.push(cb);
  }

  private setStatus(s: TransportStatus) {
    this.status = s;
    this.statusListeners.forEach((l) => l(s));
  }

  private emitCaption(payload: CaptionPayload) {
    this.captionListeners.forEach((l) => l(payload));
  }

  private emitToolCall(calls: ToolCall[]) {
    this.toolCallListeners.forEach((l) => l(calls));
  }

  public async start(state: JourneyState): Promise<void> {
    this.currentState = state;
    this.setStatus('listening');
  }

  public stop(): void {
    this.setStatus('closed');
  }

  public interrupt(): void {
    // Interruption in text mode
    this.setStatus('listening');
  }

  public async sendText(text: string): Promise<void> {
    if (!text.trim()) return;

    this.emitCaption({ who: 'user', text });
    this.conversationHistory.push({ role: 'user', parts: [{ text }] });
    this.setStatus('speaking');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: this.conversationHistory,
          language: this.currentState?.language || 'hi',
          currentState: {
            step: this.currentState?.step,
            eligibility: this.currentState?.eligibility,
            checklist: this.currentState?.checklist,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();

      if (data.toolCalls && data.toolCalls.length > 0) {
        this.emitToolCall(data.toolCalls);
      }

      if (data.text) {
        this.conversationHistory.push({ role: 'model', parts: [{ text: data.text }] });
        this.emitCaption({ who: 'saheli', text: data.text });
      }

      this.setStatus('listening');
    } catch (err) {
      console.warn('TextTransport sendText error:', err);
      this.setStatus('listening');
    }
  }

  public async sendToolResponse(responses: ToolResult[]): Promise<void> {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: this.conversationHistory,
          toolResponses: responses,
          language: this.currentState?.language || 'hi',
          currentState: {
            step: this.currentState?.step,
            eligibility: this.currentState?.eligibility,
            checklist: this.currentState?.checklist,
          },
        }),
      });

      if (!response.ok) return;

      const data = await response.json();
      if (data.toolCalls && data.toolCalls.length > 0) {
        this.emitToolCall(data.toolCalls);
      }
      if (data.text) {
        this.conversationHistory.push({ role: 'model', parts: [{ text: data.text }] });
        this.emitCaption({ who: 'saheli', text: data.text });
      }
    } catch (err) {
      console.warn('TextTransport tool response error:', err);
    }
  }
}
