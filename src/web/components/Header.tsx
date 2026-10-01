/**
 * Header Component: Cinematic header with multilingual brand, stage indicator,
 * language picker, and high-visibility Emergency / Help Now automated call trigger
 */

import React from 'react';
import { Step, LanguageCode } from '../../shared/types.js';
import { I18N, getLanguageName } from '../../shared/i18n.js';
import {
  HeartHandshake,
  PhoneCall,
  KeyRound,
  Globe2,
  AlertCircle,
  Siren,
} from 'lucide-react';
import { ConnectionStatusIndicator } from './ConnectionStatusIndicator.js';

interface HeaderProps {
  currentStep: Step;
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onResumeClick: () => void;
  onResetClick: () => void;
  onStepClick: (step: Step) => void;
  onHelplineClick?: () => void;
  onEmergencyClick?: () => void;
}

const LANGUAGES: LanguageCode[] = ['hi', 'mr', 'bn', 'ta', 'te', 'kn', 'en'];

const STAGE_KEYS: { id: Step; key: 'start' | 'scheme' | 'check' | 'docs' | 'slip' }[] = [
  { id: 'welcome', key: 'start' },
  { id: 'about', key: 'scheme' },
  { id: 'eligibility', key: 'check' },
  { id: 'documents', key: 'docs' },
  { id: 'done', key: 'slip' },
];

const EMERGENCY_LABELS: Record<LanguageCode, string> = {
  hi: 'तुरंत सहायता',
  mr: 'तातडीची मदत',
  bn: 'জরুরি সাহায্য',
  ta: 'உடனடி உதவி',
  te: 'తక్షణ సహాయం',
  kn: 'ತುರ್ತು ನೆರವು',
  en: 'Help Now',
};

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  language,
  onLanguageChange,
  onResumeClick,
  onResetClick,
  onStepClick,
  onHelplineClick,
  onEmergencyClick,
}) => {
  const t = I18N[language] || I18N.hi;

  const currentStageIndex = (() => {
    if (currentStep === 'welcome') return 0;
    if (currentStep === 'about') return 1;
    if (currentStep === 'eligibility' || currentStep === 'result') return 2;
    if (currentStep === 'documents' || currentStep === 'prepare') return 3;
    if (currentStep === 'centre' || currentStep === 'done') return 4;
    return 0;
  })();

  const emergencyLabel = EMERGENCY_LABELS[language] || 'तुरंत सहायता';

  return (
    <header className="sticky top-0 z-40 bg-[#160a12]/90 backdrop-blur-xl border-b border-amber-500/20 px-3 sm:px-6 py-2.5 transition-all">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        {/* Brand & Logo in selected language */}
        <button
          onClick={onResetClick}
          className="flex items-center gap-2.5 text-left group focus:outline-hidden cursor-pointer shrink-0"
          title="Return to start"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-rose-500 via-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-rose-600/30 group-hover:scale-105 transition-transform ring-1 ring-amber-300/40">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-amber-50 font-serif-cinematic leading-none">
                {t.appName}
              </span>
              <span className="text-xs font-semibold text-amber-300/90 font-serif tracking-wide hidden xs:inline">
                Matru Sakhi
              </span>
              <ConnectionStatusIndicator language={language} />
            </div>
            <p className="text-[11px] text-amber-200/70 hidden sm:block font-medium tracking-wide">
              {t.tagline}
            </p>
          </div>
        </button>

        {/* Central Journey Progression Dots (visible on tablet/desktop, only after welcome) */}
        {currentStep !== 'welcome' && (
          <nav aria-label="Journey Progress" className="hidden lg:flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full border border-amber-500/20">
            {STAGE_KEYS.map((stage, idx) => {
              const isCompleted = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              const label = t.journeyStages[stage.key];
              return (
                <React.Fragment key={stage.id}>
                  <button
                    onClick={() => onStepClick(stage.id)}
                    className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold shadow-xs'
                        : isCompleted
                        ? 'text-amber-300 hover:text-white'
                        : 'text-stone-500'
                    }`}
                  >
                    <span>{label}</span>
                  </button>
                  {idx < STAGE_KEYS.length - 1 && (
                    <span className="text-stone-600 text-xs">›</span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* High-Visibility Emergency / Help Now Button */}
          {onEmergencyClick && (
            <button
              onClick={onEmergencyClick}
              type="button"
              className="relative inline-flex items-center gap-1.5 text-xs font-black bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-rose-500 text-white px-2.5 sm:px-3.5 py-1.5 rounded-xl border border-red-400 shadow-md shadow-red-950/60 transition-all cursor-pointer active:scale-95 animate-pulse"
              title="Immediate Emergency Assistance / Help Now"
              aria-label="Emergency Help Now"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <Siren className="w-3.5 h-3.5 text-white shrink-0" />
              <span className="tracking-wide font-bold">
                {emergencyLabel}
              </span>
            </button>
          )}

          {/* Helpline Quick Trigger: Opens full Toll-Free modal */}
          <button
            onClick={onHelplineClick}
            type="button"
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold bg-rose-950/70 hover:bg-rose-900/90 text-rose-300 px-3 py-1.5 rounded-xl border border-rose-500/40 transition-colors shadow-xs cursor-pointer active:scale-95"
            title="Toll-free Helplines: 14445 / 181"
          >
            <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
            <span className="font-mono font-black">14445</span>
            <span className="opacity-70">/ 181</span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <select
              aria-label="Language selection"
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
              className="appearance-none bg-[#20101b] hover:bg-[#2c1525] text-amber-100 font-bold text-xs sm:text-sm pl-7 pr-6 sm:pr-7 py-1.5 rounded-xl border border-amber-500/30 focus:outline-hidden focus:ring-2 focus:ring-rose-500 transition-colors cursor-pointer"
            >
              {LANGUAGES.map((code) => (
                <option key={code} value={code} className="bg-[#1a0b14] text-amber-50 font-sans">
                  {getLanguageName(code)}
                </option>
              ))}
            </select>
            <Globe2 className="w-3.5 h-3.5 text-amber-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            <span className="text-[10px] text-amber-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
              ▼
            </span>
          </div>

          {/* Resume Journey button with 6-digit code */}
          <button
            onClick={onResumeClick}
            type="button"
            className="hidden md:flex items-center gap-1 text-xs font-bold bg-[#251220] hover:bg-[#32172b] text-amber-200 px-2.5 py-1.5 rounded-xl border border-amber-500/30 transition-colors cursor-pointer"
            title={t.resumePrompt}
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.resumePrompt}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
