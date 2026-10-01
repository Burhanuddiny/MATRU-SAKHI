/**
 * PictureCard: Zero-reading high-fidelity visual card with cinematic lighting
 */

import React from 'react';

interface PictureCardProps {
  title: string;
  subtitle?: string;
  badge?: string;
  icon?: React.ReactNode;
  illustrationType?: 'mother_baby' | 'rupees' | 'bank' | 'clinic' | 'ration' | 'mcp';
  amount?: number;
  highlight?: boolean;
  onClick?: () => void;
}

export const PictureCard: React.FC<PictureCardProps> = ({
  title,
  subtitle,
  badge,
  icon,
  illustrationType,
  amount,
  highlight = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-3xl p-5 sm:p-6 transition-all duration-300 ${
        onClick ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]' : ''
      } ${
        highlight
          ? 'cinematic-panel-highlight text-white'
          : 'cinematic-panel text-amber-50 hover:border-amber-400/40'
      }`}
    >
      {/* Subtle gold sheen border effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      {badge && (
        <span
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
            highlight
              ? 'bg-amber-400/20 text-amber-200 border border-amber-400/30'
              : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
          }`}
        >
          {badge}
        </span>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-5 relative z-10">
        {/* Visual Illustration */}
        <div
          className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
            highlight
              ? 'bg-gradient-to-br from-rose-500/30 to-amber-500/30 text-amber-200 border border-amber-400/30'
              : 'bg-[#2b1424] text-amber-300 border border-amber-500/20'
          }`}
        >
          {illustrationType === 'mother_baby' && (
            <svg className="w-16 h-16 fill-current text-rose-300 drop-shadow-md" viewBox="0 0 24 24">
              <path d="M12 2a4 4 0 100 8 4 4 0 000-8zm-6 18c0-3.3 2.7-6 6-6s6 2.7 6 6v1H6v-1zm12-9a3 3 0 11-6 0 3 3 0 016 0zm-2 9c0-1.8 1.1-3.3 2.7-3.8.8 1.1 1.3 2.4 1.3 3.8v1h-4v-1z" />
            </svg>
          )}

          {illustrationType === 'rupees' && (
            <div className="text-center font-bold text-amber-300">
              <span className="text-3xl sm:text-4xl">₹</span>
              <div className="text-xl sm:text-2xl font-black leading-none text-white">
                {amount?.toLocaleString('en-IN') || '5,000'}
              </div>
            </div>
          )}

          {illustrationType === 'bank' && (
            <svg className="w-14 h-14 fill-current text-amber-300 drop-shadow-md" viewBox="0 0 24 24">
              <path d="M4 10h3v7H4zm6 0h3v7h-3zm6 0h3v7h-3zM2 22h19v-3H2zm9.5-20L2 6v2h19V6z" />
            </svg>
          )}

          {illustrationType === 'clinic' && (
            <svg className="w-14 h-14 fill-current text-rose-300 drop-shadow-md" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
            </svg>
          )}

          {illustrationType === 'ration' && (
            <svg className="w-14 h-14 fill-current text-amber-300 drop-shadow-md" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1z" />
            </svg>
          )}

          {icon}
        </div>

        {/* Text Content */}
        <div className="text-center sm:text-left flex-1">
          <h2 className="text-xl sm:text-2xl font-bold font-serif-cinematic leading-tight text-amber-50">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1.5 text-sm sm:text-base leading-relaxed text-amber-200/80 font-medium">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
