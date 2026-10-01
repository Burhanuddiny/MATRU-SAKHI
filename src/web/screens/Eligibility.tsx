/**
 * Eligibility Screen: Simple, picture-driven questions with multilingual translations
 */

import React, { useState } from 'react';
import { EligibilityInput, LanguageCode, CategoryId } from '../../shared/types.js';
import { I18N } from '../../shared/i18n.js';
import { QUALIFYING_CATEGORIES } from '../../shared/scheme/pmmvy.js';
import { ReadAloudButton } from '../components/ReadAloudButton.js';
import { Check, Baby, Heart, Sparkles, ArrowLeft } from 'lucide-react';

interface EligibilityScreenProps {
  language: LanguageCode;
  onSubmit: (input: EligibilityInput) => void;
  onBack: () => void;
}

export const EligibilityScreen: React.FC<EligibilityScreenProps> = ({
  language,
  onSubmit,
  onBack,
}) => {
  const [subStep, setSubStep] = useState<'stage' | 'child' | 'category'>('stage');
  const [stage, setStage] = useState<'pregnant' | 'delivered'>('pregnant');
  const [childOrder, setChildOrder] = useState<1 | 2 | 3>(1);
  const [isGirl, setIsGirl] = useState<boolean | undefined>(undefined);
  const [selectedCategories, setSelectedCategories] = useState<CategoryId[]>(['ration_card']);

  const t = I18N[language] || I18N.hi;

  const handleStageSelect = (selectedStage: 'pregnant' | 'delivered') => {
    setStage(selectedStage);
    setSubStep('child');
  };

  const handleChildSelect = (order: 1 | 2 | 3) => {
    setChildOrder(order);
    setSubStep('category');
  };

  const handleFinalSubmit = () => {
    onSubmit({
      ageYears: 24,
      stage,
      childOrder,
      secondChildIsGirl: isGirl,
      categories: selectedCategories,
    });
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between py-4 px-4 max-w-lg mx-auto w-full space-y-6">
      {/* Top Header with Progress and Read Aloud */}
      <div className="w-full flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className={`w-8 h-2 rounded-full transition-all ${subStep === 'stage' ? 'bg-gradient-to-r from-rose-500 to-amber-500' : 'bg-emerald-500'}`} />
          <span className={`w-8 h-2 rounded-full transition-all ${subStep === 'child' ? 'bg-gradient-to-r from-rose-500 to-amber-500' : subStep === 'category' ? 'bg-emerald-500' : 'bg-stone-800'}`} />
          <span className={`w-8 h-2 rounded-full transition-all ${subStep === 'category' ? 'bg-gradient-to-r from-rose-500 to-amber-500' : 'bg-stone-800'}`} />
        </div>

        <ReadAloudButton
          textToSpeak={
            subStep === 'stage'
              ? t.step2StageTitle
              : subStep === 'child'
              ? t.childOrderTitle
              : t.qualifyingCardQuestion
          }
          language={language}
        />
      </div>

      {/* Question 1: Stage */}
      {subStep === 'stage' && (
        <div className="w-full space-y-6 animate-in fade-in">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-cinematic text-amber-50">
              {t.step2StageTitle}
            </h2>
            <p className="text-sm text-amber-200/70">
              {t.step2StageSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => handleStageSelect('pregnant')}
              type="button"
              className="p-6 rounded-3xl cinematic-panel hover:border-rose-400 hover:bg-[#281322] shadow-xl flex flex-col items-center text-center gap-3 transition-all cursor-pointer group active:scale-95"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform border border-rose-500/30">
                <Heart className="w-10 h-10 fill-current" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-amber-100">{t.pregnantTitle}</h3>
                <p className="text-xs text-amber-200/70 mt-1">{t.pregnantDesc}</p>
              </div>
            </button>

            <button
              onClick={() => handleStageSelect('delivered')}
              type="button"
              className="p-6 rounded-3xl cinematic-panel hover:border-amber-400 hover:bg-[#281322] shadow-xl flex flex-col items-center text-center gap-3 transition-all cursor-pointer group active:scale-95"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform border border-amber-500/30">
                <Baby className="w-10 h-10 fill-current" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-amber-100">{t.deliveredTitle}</h3>
                <p className="text-xs text-amber-200/70 mt-1">{t.deliveredDesc}</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Question 2: Child Order */}
      {subStep === 'child' && (
        <div className="w-full space-y-6 animate-in fade-in">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-cinematic text-amber-50">
              {t.childOrderTitle}
            </h2>
            <p className="text-sm text-amber-200/70">
              {t.childOrderSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => handleChildSelect(1)}
              type="button"
              className="p-6 rounded-3xl cinematic-panel hover:border-emerald-400 hover:bg-[#1f1a24] shadow-xl flex flex-col items-center text-center gap-3 transition-all cursor-pointer group active:scale-95"
            >
              <div className="w-20 h-20 rounded-2xl bg-emerald-950/60 text-emerald-400 flex items-center justify-center text-4xl font-black group-hover:scale-110 transition-transform border border-emerald-500/30 font-serif-cinematic">
                1
              </div>
              <div>
                <h3 className="text-lg font-bold text-amber-100">{t.firstBornChild}</h3>
                <p className="text-xs text-emerald-300 font-semibold mt-1">{t.firstBornDesc}</p>
              </div>
            </button>

            <button
              onClick={() => handleChildSelect(2)}
              type="button"
              className="p-6 rounded-3xl cinematic-panel hover:border-rose-400 hover:bg-[#281322] shadow-xl flex flex-col items-center text-center gap-3 transition-all cursor-pointer group active:scale-95"
            >
              <div className="w-20 h-20 rounded-2xl bg-rose-950/60 text-rose-400 flex items-center justify-center text-4xl font-black group-hover:scale-110 transition-transform border border-rose-500/30 font-serif-cinematic">
                2
              </div>
              <div>
                <h3 className="text-lg font-bold text-amber-100">{t.secondBornChild}</h3>
                <p className="text-xs text-rose-300 font-semibold mt-1">{t.secondBornDesc}</p>
              </div>
            </button>
          </div>

          {/* Clarification if delivered second child */}
          {stage === 'delivered' && (
            <div className="bg-[#24121e] border border-amber-500/30 rounded-2xl p-4 text-center space-y-2">
              <p className="text-xs font-semibold text-amber-200">
                {t.secondChildGirlQuestion}
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setIsGirl(true)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isGirl === true ? 'bg-rose-600 text-white shadow-md' : 'bg-[#180a14] border border-amber-500/25 text-amber-200'
                  }`}
                >
                  {t.yesGirl}
                </button>
                <button
                  onClick={() => setIsGirl(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isGirl === false ? 'bg-stone-700 text-white shadow-md' : 'bg-[#180a14] border border-amber-500/25 text-amber-200'
                  }`}
                >
                  {t.boy}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Question 3: Category */}
      {subStep === 'category' && (
        <div className="w-full space-y-5 animate-in fade-in">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold font-serif-cinematic text-amber-50">
              {t.qualifyingCardQuestion}
            </h2>
            <p className="text-xs text-amber-200/70">
              {t.qualifyingCardSubtitle}
            </p>
          </div>

          {/* Quick 1-Tap Yes Card for Simple Quick Progress */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/70 to-teal-950/70 border border-emerald-500/40 text-center space-y-2">
            <p className="text-sm font-bold text-emerald-200">
              {t.rationOrEshramPrompt}
            </p>
            <p className="text-xs text-emerald-300/80">
              {t.rationOrEshramSub}
            </p>
            <button
              onClick={() => {
                setSelectedCategories(['ration_card']);
                handleFinalSubmit();
              }}
              type="button"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>{t.yesIHaveItProceed}</span>
            </button>
          </div>

          <div className="text-center">
            <span className="text-xs text-amber-300/60 uppercase tracking-wider font-semibold">
              {t.orSelectOtherCard}
            </span>
          </div>

          <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
            {QUALIFYING_CATEGORIES.map((cat) => {
              const isSelected = selectedCategories.includes(cat.id as CategoryId);
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    if (isSelected) {
                      setSelectedCategories(selectedCategories.filter((c) => c !== cat.id));
                    } else {
                      setSelectedCategories([...selectedCategories, cat.id as CategoryId]);
                    }
                  }}
                  type="button"
                  className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-100 font-bold shadow-md'
                      : 'cinematic-panel text-amber-100 font-medium hover:border-amber-400/40'
                  }`}
                >
                  <div>
                    <div className="text-sm font-bold">
                      {language === 'en' ? cat.titleEn : cat.titleHi}
                    </div>
                    <div className="text-xs opacity-75 font-normal">
                      {cat.simpleDescription}
                    </div>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-emerald-500 text-white' : 'border border-amber-500/40'
                    }`}
                  >
                    {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={handleFinalSubmit}
            type="button"
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-4 rounded-2xl text-lg shadow-xl shadow-emerald-950/50 transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-2 border border-emerald-400/40"
          >
            <Sparkles className="w-5 h-5" />
            <span>{t.viewEligibilityResult}</span>
          </button>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex justify-between items-center w-full pt-2">
        <button
          onClick={subStep === 'stage' ? onBack : () => setSubStep(subStep === 'category' ? 'child' : 'stage')}
          type="button"
          className="text-xs font-semibold text-amber-300 bg-[#24121e] hover:bg-[#2f1828] px-4 py-2.5 rounded-xl border border-amber-500/25 transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t.back}</span>
        </button>
      </div>
    </div>
  );
};
