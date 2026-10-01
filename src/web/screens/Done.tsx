/**
 * Done Screen: Final bilingual preparation slip with voice narrator and multilingual translations
 */

import React from 'react';
import { JourneyState, LanguageCode } from '../../shared/types.js';
import { Slip } from '../components/Slip.js';
import { ReadAloudButton } from '../components/ReadAloudButton.js';
import { AnganwadiVoiceMessage } from '../components/AnganwadiVoiceMessage.js';
import { I18N } from '../../shared/i18n.js';
import { CheckCircle2, RotateCcw } from 'lucide-react';

interface DoneScreenProps {
  state: JourneyState;
  language: LanguageCode;
  onRestart: () => void;
}

export const DoneScreen: React.FC<DoneScreenProps> = ({
  state,
  language,
  onRestart,
}) => {
  const t = I18N[language] || I18N.hi;

  return (
    <div className="flex-1 flex flex-col items-center justify-between py-4 px-4 max-w-xl mx-auto w-full space-y-6">
      {/* Top Completion Heading */}
      <div className="w-full flex items-center justify-between px-1">
        <div className="inline-flex items-center gap-1.5 bg-emerald-950/80 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t.slipReadyBadge}</span>
        </div>
        <ReadAloudButton
          textToSpeak={`${t.stepNarrations.done} ${state.resumeCode || '582941'}`}
          language={language}
        />
      </div>

      <div className="text-center space-y-1">
        <h2 className="text-2xl sm:text-3xl font-bold font-serif-cinematic text-amber-50">
          {t.slipReadyHeading}
        </h2>
        <p className="text-xs sm:text-sm text-amber-200/70">
          {t.slipReadySubtitle}
        </p>
      </div>

      {/* Standout Feature: Audio Voice Message for Anganwadi Didi */}
      <div className="w-full">
        <AnganwadiVoiceMessage state={state} language={language} />
      </div>

      {/* The Printable Slip */}
      <div className="w-full">
        <Slip state={state} language={language} />
      </div>

      {/* Restart Button */}
      <div className="pt-2 print:hidden">
        <button
          onClick={onRestart}
          type="button"
          className="text-xs font-bold text-amber-300 bg-[#251220] hover:bg-[#32172b] px-4 py-2.5 rounded-xl border border-amber-500/30 transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
          <span>{t.startNewChatBtn}</span>
        </button>
      </div>
    </div>
  );
};
