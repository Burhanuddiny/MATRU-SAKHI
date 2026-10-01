/**
 * StepProgressBar: Visual step-progress indicator with a numbered circle track
 * Displayed at the top of the main viewport to show mothers exactly how far
 * they are in the PMMVY benefit application journey.
 */

import React from 'react';
import { Step, LanguageCode } from '../../shared/types.js';
import { Check } from 'lucide-react';

interface StepProgressBarProps {
  currentStep: Step;
  language: LanguageCode;
  onStepClick?: (step: Step) => void;
}

interface StepDefinition {
  stepNumber: number;
  id: Step;
  associatedSteps: Step[];
  labels: Record<LanguageCode, string>;
  subtitles: Record<LanguageCode, string>;
}

const JOURNEY_STEPS: StepDefinition[] = [
  {
    stepNumber: 1,
    id: 'about',
    associatedSteps: ['about'],
    labels: {
      hi: 'योजना',
      mr: 'योजना',
      bn: 'যোজনা',
      ta: 'திட்டம்',
      te: 'పథకం',
      kn: 'ಯೋಜನೆ',
      en: 'Scheme',
    },
    subtitles: {
      hi: '₹6,000 नियम',
      mr: '₹६,००० नियम',
      bn: '₹৬,০০০ নিয়ম',
      ta: '₹6,000 விவரம்',
      te: '₹6,000 వివరాలు',
      kn: '₹6,000 ವಿವರ',
      en: '₹6,000 Rules',
    },
  },
  {
    stepNumber: 2,
    id: 'eligibility',
    associatedSteps: ['eligibility', 'result'],
    labels: {
      hi: 'पात्रता',
      mr: 'पात्रता',
      bn: 'যোগ্যতা',
      ta: 'தகுதி',
      te: 'అర్హత',
      kn: 'ಅರ್ಹತೆ',
      en: 'Eligibility',
    },
    subtitles: {
      hi: 'जाँच व परिणाम',
      mr: 'तपासणी',
      bn: 'যাচাই',
      ta: 'சரிபார்ப்பு',
      te: 'పరిశీలన',
      kn: 'ಪರಿಶೀಲನೆ',
      en: 'Evaluation',
    },
  },
  {
    stepNumber: 3,
    id: 'documents',
    associatedSteps: ['documents'],
    labels: {
      hi: 'दस्तावेज़',
      mr: 'कागदपत्रे',
      bn: 'নথিপত্র',
      ta: 'ஆவணங்கள்',
      te: 'పత్రాలు',
      kn: 'ದಾಖಲೆಗಳು',
      en: 'Documents',
    },
    subtitles: {
      hi: 'चेकलिस्ट व फ़ोटो',
      mr: 'यादी',
      bn: 'তালিকা',
      ta: 'பட்டியல்',
      te: 'జాబితా',
      kn: 'ಪಟ್ಟಿ',
      en: 'Checklist',
    },
  },
  {
    stepNumber: 4,
    id: 'prepare',
    associatedSteps: ['prepare'],
    labels: {
      hi: 'पर्ची',
      mr: 'पावती',
      bn: 'বিবরণ',
      ta: 'தயாரிப்பு',
      te: 'వివరాలు',
      kn: 'ಸಿದ್ಧತೆ',
      en: 'Preparation',
    },
    subtitles: {
      hi: 'नाम व खाता',
      mr: 'नाव व खाते',
      bn: 'নাম ও ব্যাংক',
      ta: 'பெயர் விவரம்',
      te: 'పేరు వివరాలు',
      kn: 'ಹೆಸರು ವಿವರ',
      en: 'Details Slip',
    },
  },
  {
    stepNumber: 5,
    id: 'centre',
    associatedSteps: ['centre', 'portal', 'done'],
    labels: {
      hi: 'केंद्र व समाप्ति',
      mr: 'केंद्र व पावती',
      bn: 'কেন্দ্র ও স্লিপ',
      ta: 'மையம் & ரசீது',
      te: 'కేంద్రం & స్లిప్',
      kn: 'ಕೇಂದ್ರ ಮತ್ತು ಸ್ಲಿಪ್',
      en: 'Centre & Done',
    },
    subtitles: {
      hi: 'आंगनवाड़ी पर्ची',
      mr: 'अंगणवाडी मदत',
      bn: 'অঙ্গনওয়াড়ি',
      ta: 'அங்கன்வாடி',
      te: 'అంగన్‌వాడీ',
      kn: 'ಅಂಗನವಾಡಿ',
      en: 'Final Slip',
    },
  },
];

const STEP_HEADER_LABELS: Record<LanguageCode, { stepWord: string; ofWord: string }> = {
  hi: { stepWord: 'कदम', ofWord: '/' },
  mr: { stepWord: 'टप्पा', ofWord: '/' },
  bn: { stepWord: 'ধাপ', ofWord: '/' },
  ta: { stepWord: 'படி', ofWord: '/' },
  te: { stepWord: 'దశ', ofWord: '/' },
  kn: { stepWord: 'ಹಂತ', ofWord: '/' },
  en: { stepWord: 'Step', ofWord: 'of' },
};

export const StepProgressBar: React.FC<StepProgressBarProps> = ({
  currentStep,
  language,
  onStepClick,
}) => {
  // If user is on welcome screen, we do not distract them before they begin
  if (currentStep === 'welcome') {
    return null;
  }

  // Find current step index (0 to 4)
  const currentStepIndex = JOURNEY_STEPS.findIndex((s) =>
    s.associatedSteps.includes(currentStep)
  );

  const activeIndex = currentStepIndex !== -1 ? currentStepIndex : 0;
  const activeDef = JOURNEY_STEPS[activeIndex];
  const { stepWord, ofWord } = STEP_HEADER_LABELS[language] || STEP_HEADER_LABELS.hi;

  // Track progress fill percentage
  const fillPercentage = (activeIndex / (JOURNEY_STEPS.length - 1)) * 100;

  return (
    <nav
      aria-label="Application Progress"
      className="w-full max-w-2xl mx-auto mb-4 sm:mb-6 px-2 sm:px-4"
    >
      <div className="bg-[#1b0c17]/85 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-4 border border-amber-500/25 shadow-lg shadow-black/40">
        {/* Subtle Top Status Badge */}
        <div className="flex items-center justify-between mb-3 text-xs">
          <div className="inline-flex items-center gap-1.5 font-bold text-amber-200">
            <span className="bg-amber-950/80 text-amber-300 px-2 py-0.5 rounded-md border border-amber-500/30 text-[11px] font-mono">
              {stepWord} {activeDef.stepNumber} {ofWord} 5
            </span>
            <span className="font-serif-cinematic text-amber-100 hidden xs:inline">
              : {activeDef.labels[language]} ({activeDef.subtitles[language]})
            </span>
          </div>

          <div className="text-[11px] font-semibold text-emerald-400">
            {Math.round(((activeIndex + 1) / 5) * 100)}% पूर्ण
          </div>
        </div>

        {/* Numbered Circle Track */}
        <div className="relative flex items-center justify-between">
          {/* Background Connecting Track Line */}
          <div className="absolute top-4 sm:top-5 left-4 right-4 h-1 bg-stone-800 rounded-full -translate-y-1/2 z-0" />

          {/* Active Colored Progress Fill */}
          <div
            className="absolute top-4 sm:top-5 left-4 h-1 bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 rounded-full -translate-y-1/2 transition-all duration-500 ease-out z-0"
            style={{ width: `calc(${fillPercentage}% - 16px)` }}
          />

          {/* 5 Numbered Circles */}
          {JOURNEY_STEPS.map((step, idx) => {
            const isCompleted = idx < activeIndex;
            const isCurrent = idx === activeIndex;
            const isUpcoming = idx > activeIndex;

            const isClickable = Boolean(onStepClick && (isCompleted || isCurrent));

            return (
              <div
                key={step.id}
                className="relative z-10 flex flex-col items-center group"
              >
                <button
                  type="button"
                  onClick={() => {
                    if (isClickable && onStepClick) {
                      onStepClick(step.id);
                    }
                  }}
                  disabled={!isClickable}
                  aria-current={isCurrent ? 'step' : undefined}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 ${
                    isClickable ? 'cursor-pointer' : 'cursor-default'
                  } ${
                    isCompleted
                      ? 'bg-emerald-600 border-2 border-emerald-400 text-white shadow-md shadow-emerald-950/60 hover:scale-105 active:scale-95'
                      : isCurrent
                      ? 'bg-gradient-to-br from-rose-500 via-amber-500 to-orange-500 border-2 border-amber-200 ring-4 ring-amber-400/30 text-white font-black scale-110 shadow-lg shadow-rose-950/70 animate-pulse'
                      : 'bg-[#220f1d] border-2 border-amber-500/20 text-stone-400'
                  }`}
                  title={`${stepWord} ${step.stepNumber}: ${step.labels[language]}`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2.5]" />
                  ) : (
                    <span>{step.stepNumber}</span>
                  )}
                </button>

                {/* Step Label below circle */}
                <div className="mt-1.5 text-center">
                  <span
                    className={`block text-[10px] sm:text-xs font-bold leading-tight transition-colors ${
                      isCurrent
                        ? 'text-amber-200 font-extrabold'
                        : isCompleted
                        ? 'text-emerald-300/90'
                        : 'text-stone-500'
                    }`}
                  >
                    {step.labels[language]}
                  </span>
                  <span className="hidden sm:block text-[9px] text-stone-400 font-normal leading-none mt-0.5">
                    {step.subtitles[language]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
