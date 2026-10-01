/**
 * Result Screen: Big green tick or gentle orange advisory with exact benefit amount and multilingual translations
 */

import React from 'react';
import { EligibilityResult, LanguageCode } from '../../shared/types.js';
import { I18N } from '../../shared/i18n.js';
import { ReadAloudButton } from '../components/ReadAloudButton.js';
import { InstalmentTimeline } from '../components/InstalmentTimeline.js';
import { CheckCircle2, AlertCircle, FileText, MapPin, ArrowRight } from 'lucide-react';

interface ResultScreenProps {
  eligibility: EligibilityResult | null;
  language: LanguageCode;
  onNext: () => void;
  onFindCentre: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  eligibility,
  language,
  onNext,
  onFindCentre,
}) => {
  const t = I18N[language] || I18N.hi;

  const status = eligibility?.status || 'eligible';
  const amount = eligibility?.amountRupees || 5000;
  const isEligible = status === 'eligible';
  const isConditional = status === 'conditional';

  const narrationText = isEligible
    ? `${t.eligibleBadge}. ₹${amount}. ${t.aidDirectToBankNote}`
    : isConditional
    ? t.conditionalBadge
    : t.notEligibleBadge;

  return (
    <div className="flex-1 flex flex-col items-center justify-between py-6 px-4 max-w-lg mx-auto w-full space-y-6 text-center">
      <div className="w-full space-y-5">
        {/* Top Header with Read Aloud Voice */}
        <div className="flex items-center justify-between px-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-300">
            {t.resultHeaderTitle}
          </div>
          <ReadAloudButton
            textToSpeak={narrationText}
            language={language}
          />
        </div>

        {/* Main Status Badge */}
        <div className="relative inline-flex items-center justify-center">
          <div
            className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center shadow-2xl animate-in zoom-in-75 duration-300 ${
              isEligible
                ? 'bg-emerald-950/80 text-emerald-400 ring-8 ring-emerald-500/20 border border-emerald-400/50'
                : isConditional
                ? 'bg-amber-950/80 text-amber-400 ring-8 ring-amber-500/20 border border-amber-400/50'
                : 'bg-rose-950/80 text-rose-400 ring-8 ring-rose-500/20 border border-rose-400/50'
            }`}
          >
            {isEligible ? (
              <CheckCircle2 className="w-16 h-16 sm:w-20 sm:h-20" />
            ) : isConditional ? (
              <AlertCircle className="w-16 h-16 sm:w-20 sm:h-20" />
            ) : (
              <AlertCircle className="w-16 h-16 sm:w-20 sm:h-20" />
            )}
          </div>
        </div>

        {/* Spoken Status Heading */}
        <div className="space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-cinematic text-amber-50">
            {isEligible ? t.eligibleBadge : isConditional ? t.conditionalBadge : t.notEligibleBadge}
          </h2>
          <p className="text-sm sm:text-base text-amber-200/80 font-medium max-w-sm mx-auto">
            {isEligible
              ? t.aidDirectToBankNote
              : isConditional
              ? t.conditionalBadge
              : t.notEligibleBadge}
          </p>
        </div>

        {/* Amount Card in Giant Bold Numbers */}
        {(isEligible || isConditional) && (
          <div className="space-y-4">
            <div className="cinematic-panel-highlight rounded-3xl p-6 text-white shadow-2xl space-y-2 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-300">
                {t.totalAidAmount}
              </span>
              <div className="text-4xl sm:text-5xl font-black font-serif-cinematic tracking-tight text-white drop-shadow-md">
                ₹{amount.toLocaleString('en-IN')}
              </div>
              <p className="text-xs sm:text-sm font-medium text-emerald-100/90">
                {t.aidDirectToBankNote}
              </p>
            </div>

            {/* Visual Milestone Timeline */}
            <InstalmentTimeline
              childOrder={eligibility?.childOrder || 1}
              language={language}
            />
          </div>
        )}
      </div>

      {/* Next Actions */}
      <div className="w-full space-y-3">
        <button
          onClick={onNext}
          type="button"
          className="w-full bg-gradient-to-r from-rose-500 via-amber-500 to-orange-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-xl shadow-rose-950/60 transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-2 border border-amber-300/30"
        >
          <FileText className="w-6 h-6" />
          <span>{t.viewRequiredDocsBtn}</span>
          <ArrowRight className="w-5 h-5 ml-1" />
        </button>

        <button
          onClick={onFindCentre}
          type="button"
          className="w-full bg-[#20101b] hover:bg-[#2c1525] text-amber-200 font-bold py-3.5 px-6 rounded-2xl border border-amber-500/30 shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2 text-sm sm:text-base active:scale-95"
        >
          <MapPin className="w-5 h-5 text-rose-400" />
          <span>{t.viewNearestCentreBtn}</span>
        </button>
      </div>
    </div>
  );
};
