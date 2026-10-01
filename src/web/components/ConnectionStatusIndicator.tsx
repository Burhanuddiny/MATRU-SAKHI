/**
 * ConnectionStatusIndicator: Subtle, non-technical status color indicator
 * Displays green pulsing ring for 'Connected', yellow pulsing ring for 'Reconnecting',
 * and soft indicator for 'Offline' so users instantly understand connection health.
 */

import React from 'react';
import { LanguageCode } from '../../shared/types.js';
import { ConnectionStatus, useConnectionHealth } from '../hooks/useConnectionHealth.js';

interface ConnectionStatusIndicatorProps {
  language: LanguageCode;
  customStatus?: ConnectionStatus;
  className?: string;
}

const STATUS_LABELS: Record<ConnectionStatus, Record<LanguageCode, string>> = {
  connected: {
    hi: 'सक्रिय',
    mr: 'सक्रिय',
    bn: 'সংযুক্ত',
    ta: 'இணைக்கப்பட்டது',
    te: 'కనెక్ట్ అయింది',
    kn: 'ಸಂಪರ್ಕದಲ್ಲಿದೆ',
    en: 'Connected',
  },
  reconnecting: {
    hi: 'पुनः संपर्क...',
    mr: 'पुन्हा जोडत आहे...',
    bn: 'পুনরায় সংযোগ...',
    ta: 'மீண்டும் இணைகிறது...',
    te: 'మళ్లీ కనెక్ట్ అవుతోంది...',
    kn: 'ಮರುಸಂಪರ್ಕಿಸಲಾಗುತ್ತಿದೆ...',
    en: 'Reconnecting...',
  },
  offline: {
    hi: 'ऑफ़लाइन सेवा',
    mr: 'ऑफलाइन मोड',
    bn: 'অফলাইন মোড',
    ta: 'ஆஃப்லைன்',
    te: 'ఆఫ్‌లైన్',
    kn: 'ಆಫ್‌ಲೈನ್',
    en: 'Offline',
  },
};

const STATUS_TOOLTIPS: Record<ConnectionStatus, string> = {
  connected: 'Connected · All services working smoothly',
  reconnecting: 'Reconnecting to network · Attempting to restore connection',
  offline: 'No internet connection · Local assistant remains available',
};

export const ConnectionStatusIndicator: React.FC<ConnectionStatusIndicatorProps> = ({
  language,
  customStatus,
  className = '',
}) => {
  const detectedStatus = useConnectionHealth();
  const status = customStatus || detectedStatus;

  const label = STATUS_LABELS[status][language] || STATUS_LABELS[status].hi;
  const tooltip = STATUS_TOOLTIPS[status];

  return (
    <div
      role="status"
      aria-label={`Connection status: ${label}`}
      title={tooltip}
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium transition-all select-none ${
        status === 'connected'
          ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-500/25'
          : status === 'reconnecting'
          ? 'bg-amber-950/60 text-amber-300 border border-amber-500/35'
          : 'bg-rose-950/50 text-rose-300 border border-rose-500/25'
      } ${className}`}
    >
      {/* Status Ring / Dot */}
      {status === 'connected' && (
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      )}

      {status === 'reconnecting' && (
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-80 duration-1000"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
      )}

      {status === 'offline' && (
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
        </span>
      )}

      {/* Non-technical human label */}
      <span className="font-semibold tracking-wide">
        {label}
      </span>
    </div>
  );
};
