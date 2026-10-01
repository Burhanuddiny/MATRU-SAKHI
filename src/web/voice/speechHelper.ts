/**
 * Speech Helper: Web Speech API synthesis & recognition with guaranteed audio audibility,
 * AudioContext hardware unlock, voice fallbacks, and Chrome keepalive.
 */

import { LanguageCode } from '../../shared/types.js';

export const LOCALE_MAP: Record<LanguageCode, string> = {
  hi: 'hi-IN',
  mr: 'mr-IN',
  bn: 'bn-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  kn: 'kn-IN',
  en: 'en-IN',
};

class SpeechHelper {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private recognition: any = null;
  private isListening = false;
  private audioContext: AudioContext | null = null;
  private keepAliveTimer: any = null;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // Pre-load voices and handle async population in Chromium
      this.loadVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.loadVoices();
      };
    }
  }

  private loadVoices() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        this.voices = window.speechSynthesis.getVoices();
      } catch (_) {
        this.voices = [];
      }
    }
  }

  /**
   * Unlock device audio hardware on user gesture (click/tap).
   * Plays a pleasant, gentle 2-note chime to confirm sound is working,
   * resumes Web Audio Context, and unfreezes window.speechSynthesis.
   */
  public unlockAudio(playChime: boolean = true): void {
    if (typeof window === 'undefined') return;

    // 1. Resume / initialize Web Audio Context
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        if (!this.audioContext || this.audioContext.state === 'closed') {
          this.audioContext = new AudioCtx();
        }
        if (this.audioContext.state === 'suspended') {
          this.audioContext.resume();
        }

        if (playChime && this.audioContext) {
          this.playWarmChime(this.audioContext);
        }
      }
    } catch (e) {
      console.warn('AudioContext unlock notice:', e);
    }

    // 2. Unfreeze window.speechSynthesis in Chrome
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.resume();
      } catch (_) {}
    }
  }

  /**
   * Gentle two-tone acoustic chime confirming audio output
   */
  private playWarmChime(ctx: AudioContext): void {
    try {
      const now = ctx.currentTime;

      // Note 1: 523.25 Hz (C5)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now);
      gain1.gain.setValueAtTime(0.08, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.35);

      // Note 2: 659.25 Hz (E5)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(659.25, now + 0.12);
      gain2.gain.setValueAtTime(0.08, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.5);
    } catch (_) {}
  }

  /**
   * Speak text out loud with robust voice matching, volume enforcement,
   * Chrome keepalive timer, and error fallback.
   */
  public speak(
    text: string,
    language: LanguageCode,
    onStart?: () => void,
    onEnd?: () => void
  ): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    this.stopSpeaking();
    this.unlockAudio(false);

    const targetLang = LOCALE_MAP[language] || 'hi-IN';
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = targetLang;
    utterance.volume = 1.0; // Full volume
    utterance.rate = 0.94; // Gentle and comfortable speed for rural clarity
    utterance.pitch = 1.05; // Friendly warm pitch

    // Reload voices if empty
    if (this.voices.length === 0) {
      this.loadVoices();
    }

    // Try finding the best regional voice
    if (this.voices.length > 0) {
      const langPrefix = targetLang.split('-')[0].toLowerCase();
      const matchedVoice = this.voices.find(
        (v) =>
          v.lang.toLowerCase() === targetLang.toLowerCase() ||
          v.lang.toLowerCase().startsWith(langPrefix) ||
          (language === 'hi' && v.name.toLowerCase().includes('hindi')) ||
          (language === 'mr' && v.name.toLowerCase().includes('marathi')) ||
          (language === 'bn' && v.name.toLowerCase().includes('bengali')) ||
          (language === 'ta' && v.name.toLowerCase().includes('tamil')) ||
          (language === 'te' && v.name.toLowerCase().includes('telugu')) ||
          (language === 'kn' && v.name.toLowerCase().includes('kannada'))
      );

      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }
    }

    // Chrome Bug Workaround: keepalive resume ping every 5 seconds
    this.clearKeepAlive();
    this.keepAliveTimer = setInterval(() => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.resume();
      } else {
        this.clearKeepAlive();
      }
    }, 5000);

    let hasStarted = false;

    utterance.onstart = () => {
      hasStarted = true;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.clearKeepAlive();
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e: any) => {
      console.warn('SpeechSynthesis initial error:', e.error || e);
      this.clearKeepAlive();
      this.currentUtterance = null;

      // Fallback Strategy: if regional voice pack was missing on this device,
      // retry with system default voice or English/Hindi fallback so audio is never silent!
      if (!hasStarted && (e.error === 'language-unavailable' || e.error === 'voice-unavailable' || e.error === 'synthesis-failed')) {
        console.info('Retrying speech with generic fallback voice...');
        try {
          const fallbackUtterance = new SpeechSynthesisUtterance(text);
          fallbackUtterance.volume = 1.0;
          fallbackUtterance.rate = 0.95;
          fallbackUtterance.lang = 'en-IN'; // widely supported fallback in India
          fallbackUtterance.onstart = () => {
            if (onStart) onStart();
          };
          fallbackUtterance.onend = () => {
            if (onEnd) onEnd();
          };
          window.speechSynthesis.speak(fallbackUtterance);
          return;
        } catch (_) {}
      }

      if (onEnd) onEnd();
    };

    this.currentUtterance = utterance;

    try {
      // Ensure speech synthesis is active and not paused in Chrome
      window.speechSynthesis.resume();
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('speechSynthesis.speak call exception:', err);
      if (onEnd) onEnd();
    }
  }

  private clearKeepAlive() {
    if (this.keepAliveTimer) {
      clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }
  }

  public stopSpeaking(): void {
    this.clearKeepAlive();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (_) {}
    }
    this.currentUtterance = null;
  }

  public startListening(
    language: LanguageCode,
    onResult: (transcript: string, isFinal: boolean) => void,
    onError: (err: any) => void
  ): boolean {
    if (typeof window === 'undefined') return false;

    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) return false;

    try {
      this.stopListening();

      const rec = new SpeechRec();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = LOCALE_MAP[language] || 'hi-IN';

      rec.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          if (item.isFinal) {
            finalTranscript += item[0].transcript;
          } else {
            interimTranscript += item[0].transcript;
          }
        }

        if (finalTranscript.trim()) {
          onResult(finalTranscript.trim(), true);
        } else if (interimTranscript.trim()) {
          onResult(interimTranscript.trim(), false);
        }
      };

      rec.onerror = (event: any) => {
        if (event.error !== 'no-speech') {
          onError(event.error);
        }
      };

      rec.onend = () => {
        this.isListening = false;
      };

      rec.start();
      this.recognition = rec;
      this.isListening = true;
      return true;
    } catch (err) {
      console.warn('Speech recognition failed to start:', err);
      onError(err);
      return false;
    }
  }

  public stopListening(): void {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (_) {}
      this.recognition = null;
    }
    this.isListening = false;
  }

  public isListeningActive(): boolean {
    return this.isListening;
  }
}

export const speechHelper = new SpeechHelper();
