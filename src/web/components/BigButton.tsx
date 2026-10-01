/**
 * BigButton: Cinematic radiant tactile button with pulsing soundwaves
 */

import React from 'react';
import { Mic, Volume2, Loader2, Hand } from 'lucide-react';
import { TransportStatus } from '../transport/AgentTransport.js';

interface BigButtonProps {
  status: TransportStatus;
  label: string;
  onClick: () => void;
  subLabel?: string;
  compact?: boolean;
}

export const BigButton: React.FC<BigButtonProps> = ({
  status,
  label,
  onClick,
  subLabel,
  compact = false,
}) => {
  const isListening = status === 'listening';
  const isSpeaking = status === 'speaking';
  const isConnecting = status === 'connecting';

  const buttonSizeClasses = compact
    ? 'w-18 h-18 sm:w-22 sm:h-22'
    : 'w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48';

  const getGradient = () => {
    if (isListening) return 'from-emerald-500 via-teal-500 to-green-600 shadow-emerald-500/50 ring-emerald-300/60';
    if (isSpeaking) return 'from-rose-500 via-pink-500 to-amber-500 shadow-rose-500/50 ring-rose-300/60';
    if (isConnecting) return 'from-amber-400 via-orange-400 to-amber-600 shadow-amber-500/50 ring-amber-300/60';
    return 'from-rose-600 via-amber-500 to-orange-500 shadow-rose-600/40 ring-amber-400/50';
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 select-none">
      <div className="relative flex items-center justify-center">
        {/* Soft Ambient Cinematic Aura Rings */}
        <div
          className={`absolute rounded-full pointer-events-none transition-all duration-700 ${
            compact ? 'inset-[-12px]' : 'inset-[-24px] sm:inset-[-36px]'
          } ${
            isListening
              ? 'bg-emerald-500/20 blur-xl animate-pulse'
              : isSpeaking
              ? 'bg-rose-500/25 blur-xl animate-pulse'
              : 'bg-amber-500/20 blur-2xl animate-pulse'
          }`}
        />

        {/* Ambient Expanding Ripple Rings */}
        {(isListening || isSpeaking || (!compact && status !== 'closed')) && (
          <>
            <div
              className={`absolute inset-0 rounded-full animate-ping opacity-30 ${
                isListening ? 'bg-emerald-400' : isSpeaking ? 'bg-rose-400' : 'bg-amber-400'
              }`}
              style={{ animationDuration: isListening ? '1.8s' : '2.4s' }}
            />
            <div
              className={`absolute inset-[-8px] rounded-full border border-amber-400/30 animate-pulse`}
              style={{ animationDuration: '3s' }}
            />
          </>
        )}

        {/* The Main Tactile Button */}
        <button
          onClick={onClick}
          type="button"
          aria-label={label || 'Tap to talk with Saheli'}
          className={`relative z-10 ${buttonSizeClasses} rounded-full bg-gradient-to-br ${getGradient()} text-white flex flex-col items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-hidden ring-4`}
        >
          {isConnecting ? (
            <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 animate-spin text-white drop-shadow-lg" />
          ) : isListening ? (
            <Mic className="w-14 h-14 sm:w-18 sm:h-18 animate-bounce text-white drop-shadow-lg" />
          ) : isSpeaking ? (
            <Volume2 className="w-14 h-14 sm:w-18 sm:h-18 animate-pulse text-white drop-shadow-lg" />
          ) : (
            <div className="flex flex-col items-center">
              <Hand className="w-12 h-12 sm:w-16 sm:h-16 animate-pulse text-white drop-shadow-lg -rotate-12" />
            </div>
          )}

          {/* Symmetrical Sound wave bars reacting to audio state inside button */}
          {(isListening || isSpeaking) && (
            <div className="flex items-center gap-1 mt-2 h-4 sm:h-5">
              {[0, 1, 2, 3, 4, 3, 2, 1, 0].map((h, i) => (
                <span
                  key={i}
                  className={`w-1 sm:w-1.5 bg-white rounded-full ${
                    isListening
                      ? i % 2 === 0
                        ? 'wave-bar-listening-1'
                        : 'wave-bar-listening-2'
                      : 'wave-bar-speaking'
                  }`}
                  style={{
                    animationDelay: `${i * 90}ms`,
                    height: `${6 + h * 3}px`,
                  }}
                />
              ))}
            </div>
          )}
        </button>
      </div>

      {/* Spoken Status Caption Label */}
      {label && (
        <div className="text-center max-w-sm px-2">
          <p className="text-lg sm:text-xl font-bold text-amber-50 font-serif-cinematic leading-snug tracking-wide drop-shadow-sm">
            {label}
          </p>
          {subLabel && (
            <p className="text-xs sm:text-sm text-amber-300/80 font-medium mt-1">
              {subLabel}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
