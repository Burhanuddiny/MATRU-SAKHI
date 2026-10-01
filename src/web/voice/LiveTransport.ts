/**
 * LiveTransport: Voice-first transport for Gemini Live API & browser speech synthesis/recognition
 * with immediate greeting audio, instant unblocking, and robust error recovery
 */

import { AgentTransport, CaptionPayload, TransportStatus } from '../transport/AgentTransport.js';
import { JourneyState, ToolCall, ToolResult } from '../../shared/types.js';
import { speechHelper } from './speechHelper.js';
import { I18N } from '../../shared/i18n.js';

export class LiveTransport implements AgentTransport {
  private status: TransportStatus = 'closed';
  private captionListeners: ((c: CaptionPayload) => void)[] = [];
  private toolCallListeners: ((calls: ToolCall[]) => void)[] = [];
  private statusListeners: ((s: TransportStatus) => void)[] = [];
  private currentState: JourneyState | null = null;
  private ws: WebSocket | null = null;
  private isVoiceSynthesizing = false;
  private chatHistory: { role: 'user' | 'model'; parts: { text: string }[] }[] = [];

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
    speechHelper.unlockAudio(true);
    this.setStatus('connecting');

    // Trigger immediate greeting in mother tongue so voice is audible within milliseconds
    const lang = state.language || 'hi';
    const greeting = I18N[lang]?.greetingVoice || 'नमस्ते बहन! मैं सहेली हूँ। सरकारी योजना से ₹6,000 तक की सहायता पाने के लिए मैं आपकी पूरी मदद करूँगी।';
    
    this.emitCaption({ who: 'saheli', text: greeting });
    this.chatHistory.push({ role: 'model', parts: [{ text: greeting }] });
    this.speakMessage(greeting, lang);
  }

  public stop(): void {
    this.interrupt();
    speechHelper.stopListening();
    if (this.ws) {
      try {
        this.ws.close();
      } catch (_) {}
      this.ws = null;
    }
    this.setStatus('closed');
  }

  public interrupt(): void {
    speechHelper.stopSpeaking();
    this.isVoiceSynthesizing = false;
    this.setStatus('listening');
  }

  public speakMessage(text: string, lang = this.currentState?.language || 'hi'): void {
    this.setStatus('speaking');
    this.isVoiceSynthesizing = true;
    speechHelper.unlockAudio(false);

    speechHelper.speak(
      text,
      lang,
      () => {
        this.setStatus('speaking');
      },
      () => {
        this.isVoiceSynthesizing = false;
        this.setStatus('listening');
        // Once Saheli finishes speaking, open microphone for the mother's response
        if (this.currentState) {
          speechHelper.startListening(
            this.currentState.language,
            (transcript, isFinal) => {
              if (isFinal) {
                this.interrupt();
                this.sendText(transcript);
              }
            },
            () => {}
          );
        }
      }
    );
  }

  public async sendText(text: string): Promise<void> {
    if (!text.trim()) return;

    this.emitCaption({ who: 'user', text });
    this.chatHistory.push({ role: 'user', parts: [{ text }] });
    this.setStatus('speaking');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: this.chatHistory,
          language: this.currentState?.language || 'hi',
          currentState: {
            step: this.currentState?.step,
            eligibility: this.currentState?.eligibility,
            checklist: this.currentState?.checklist,
            sheet: this.currentState?.sheet,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Chat error ${response.status}`);
      }

      const data = await response.json();

      if (data.toolCalls && data.toolCalls.length > 0) {
        this.emitToolCall(data.toolCalls);
      }

      if (data.text) {
        this.chatHistory.push({ role: 'model', parts: [{ text: data.text }] });
        this.emitCaption({ who: 'saheli', text: data.text });
        this.speakMessage(data.text, data.language || this.currentState?.language || 'hi');
      } else {
        this.setStatus('listening');
      }
    } catch (err) {
      console.warn('LiveTransport sendText error:', err);
      this.setStatus('listening');
    }
  }

  public async sendToolResponse(responses: ToolResult[]): Promise<void> {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: this.chatHistory,
          toolResponses: responses,
          language: this.currentState?.language || 'hi',
          currentState: {
            step: this.currentState?.step,
            eligibility: this.currentState?.eligibility,
            checklist: this.currentState?.checklist,
            sheet: this.currentState?.sheet,
          },
        }),
      });

      if (!response.ok) return;
      const data = await response.json();

      if (data.toolCalls && data.toolCalls.length > 0) {
        this.emitToolCall(data.toolCalls);
      }

      if (data.text) {
        this.chatHistory.push({ role: 'model', parts: [{ text: data.text }] });
        this.emitCaption({ who: 'saheli', text: data.text });
        this.speakMessage(data.text, data.language || this.currentState?.language || 'hi');
      }
    } catch (err) {
      console.warn('sendToolResponse error:', err);
    }
  }
}
