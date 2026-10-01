/**
 * WaveformIndicator: Visual sound-wave waveform indicator using CSS animations
 * Reacts to microphone and conversation audio status in real-time
 */

import React from 'react';
import { TransportStatus } from '../transport/AgentTransport.js';
import { Mic, Volume2, Radio } from 'lucide-react';
import { LanguageCode } from '../../shared/types.js';
import { I18N } from '../../shared/i18n.js';

interface WaveformIndicatorProps {
  status: TransportStatus;
  variant?: 'inline' | 'card' | 'bar';
  language?: LanguageCode;
  showStatusLabel?: boolean;
}

// 19-bar symmetrical acoustic frequency spectrum representation
const SPECTRUM_BARS = [
  { baseHeight: 8, animType: 1, delay: 0 },
  { baseHeight: 14, animType: 2, delay: 100 },
  { baseHeight: 22, animType: 3, delay: 200 },
  { baseHeight: 32, animType: 1, delay: 80 },
  { baseHeight: 40, animType: 2, delay: 250 },
  { baseHeight: 46, animType: 3, delay: 120 },
  { baseHeight: 52, animType: 1, delay: 300 },
  { baseHeight: 48, animType: 2, delay: 70 },
  { baseHeight: 54, animType: 3, delay: 190 }, // Center peak
  { baseHeight: 52, animType: 1, delay: 140 },
  { baseHeight: 48, animType: 2, delay: 260 },
  { baseHeight: 44, animType: 3, delay: 60 },
  { baseHeight: 38, animType: 1, delay: 310 },
  { baseHeight: 30, animType: 2, delay: 110 },
  { baseHeight: 22, animType: 3, delay: 220 },
  { baseHeight: 16, animType: 1, delay: 90 },
  { baseHeight: 12, animType: 2, delay: 170 },
  { baseHeight: 8, animType: 3, delay: 50 },
  { baseHeight: 6, animType: 1, delay: 280 },
];

export const WaveformIndicator: React.FC<WaveformIndicatorProps> = ({
  status,
  variant = 'card',
  language = 'hi',
  showStatusLabel = true,
}) => {
  const isListening = status === 'listening';
  const isSpeaking = status === 'speaking';
  const isConnecting = status === 'connecting';
  const isIdle = status === 'closed' || status === 'error';

  // Gradient selection matching cinematic theme and status
  const getBarGradient = (index: number) => {
    if (isListening) {
      // Dynamic Emerald -> Saffron -> Gold
      return index % 2 === 0
        ? 'bg-gradient-to-t from-emerald-500 via-teal-400 to-amber-300 shadow-sm shadow-emerald-400/30'
        : 'bg-gradient-to-t from-teal-500 via-emerald-400 to-amber-200 shadow-sm shadow-teal-400/30';
    }
    if (isSpeaking) {
      // Radiant Rose -> Crimson -> Amber
      return index % 2 === 0
        ? 'bg-gradient-to-t from-rose-600 via-pink-500 to-amber-300 shadow-sm shadow-rose-500/40'
        : 'bg-gradient-to-t from-pink-600 via-rose-400 to-orange-300 shadow-sm shadow-pink-500/40';
    }
    if (isConnecting) {
      return 'bg-gradient-to-t from-amber-500 via-orange-400 to-amber-200';
    }
    // Idle/closed
    return 'bg-gradient-to-t from-amber-500/30 to-amber-400/15';
  };

  const getAnimationClass = (animType: number) => {
    if (isListening) {
      if (animType === 1) return 'wave-bar-listening-1';
      if (animType === 2) return 'wave-bar-listening-2';
      return 'wave-bar-listening-3';
    }
    if (isSpeaking) return 'wave-bar-speaking';
    if (isConnecting) return 'wave-bar-connecting';
    return 'wave-bar-idle';
  };

  const t = I18N[language] || I18N.hi;

  const getStatusText = () => {
    if (isListening) return t.listening;
    if (isSpeaking) return t.speaking;
    if (isConnecting) return t.processing;
    return t.tapToTalk;
  };

  if (variant === 'inline') {
    // Compact 7-bar inline wave for headers, buttons, or pill bars
    return (
      <div
        className="flex items-center gap-1 h-6 px-2 select-none"
        aria-label={getStatusText()}
        title={getStatusText()}
      >
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <span
            key={i}
            className={`w-1 rounded-full transition-all duration-300 ${getBarGradient(i)} ${getAnimationClass(
              (i % 3) + 1
            )}`}
            style={{
              animationDelay: `${i * 120}ms`,
              minHeight: isIdle ? '4px' : '8px',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`w-full max-w-xl mx-auto rounded-3xl p-4 sm:p-5 transition-all duration-500 relative overflow-hidden select-none ${
        isListening
          ? 'bg-[#181a17]/90 border border-emerald-500/40 shadow-xl shadow-emerald-950/40 ring-1 ring-emerald-400/20'
          : isSpeaking
          ? 'bg-[#20101b]/90 border border-rose-500/40 shadow-xl shadow-rose-950/40 ring-1 ring-rose-400/20'
          : isConnecting
          ? 'bg-[#1f1610]/90 border border-amber-500/40 shadow-lg'
          : 'cinematic-panel border-amber-500/20'
      }`}
    >
      {/* Background Soft Soundwave Halo Glow */}
      {(isListening || isSpeaking) && (
        <div
          className={`absolute inset-0 pointer-events-none blur-2xl opacity-25 animate-soundwave-halo ${
            isListening ? 'bg-emerald-500' : 'bg-rose-500'
          }`}
        />
      )}

      {/* Header Info Row */}
      {showStatusLabel && (
        <div className="flex items-center justify-between gap-2 mb-3.5 relative z-10">
          <div className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                isListening
                  ? 'bg-emerald-500 text-white animate-pulse'
                  : isSpeaking
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-amber-500/20 text-amber-300'
              }`}
            >
              {isListening ? (
                <Mic className="w-3.5 h-3.5" />
              ) : isSpeaking ? (
                <Volume2 className="w-3.5 h-3.5" />
              ) : (
                <Radio className="w-3.5 h-3.5" />
              )}
            </div>

            <span
              className={`text-xs sm:text-sm font-bold tracking-wide ${
                isListening
                  ? 'text-emerald-300'
                  : isSpeaking
                  ? 'text-rose-300'
                  : 'text-amber-200/80'
              }`}
            >
              {getStatusText()}
            </span>
          </div>

          {/* Real-time Indicator Tag */}
          <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-full border border-white/10 text-[11px] font-medium text-amber-200/90">
            <span
              className={`w-2 h-2 rounded-full ${
                isListening
                  ? 'bg-emerald-400 animate-ping'
                  : isSpeaking
                  ? 'bg-rose-400 animate-ping'
                  : 'bg-stone-500'
              }`}
            />
            <span className="font-mono text-[10px] tracking-wider uppercase">
              {isListening ? 'LIVE AUDIO' : isSpeaking ? 'SAHELI' : 'STANDBY'}
            </span>
          </div>
        </div>
      )}

      {/* Main Symmetrical Visual Waveform Array */}
      <div className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2 h-14 sm:h-16 px-2">
        {SPECTRUM_BARS.map((bar, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center h-full w-1.5 sm:w-2"
          >
            <div
              className={`w-full rounded-full transition-all duration-300 ${getBarGradient(
                index
              )} ${getAnimationClass(bar.animType)}`}
              style={{
                animationDelay: `${bar.delay}ms`,
                minHeight: isIdle ? '6px' : `${Math.max(8, bar.baseHeight * 0.3)}px`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Subtle Bottom Helper Caption */}
      <div className="mt-2.5 flex items-center justify-between text-[11px] text-amber-200/60 font-medium px-1 relative z-10">
        <span>{t.soundwaveLabel}</span>
        <span>
          {isListening
            ? t.soundwaveSpeakPrompt
            : isSpeaking
            ? t.soundwaveListenPrompt
            : t.soundwaveIdlePrompt}
        </span>
      </div>
    </div>
  );
};
