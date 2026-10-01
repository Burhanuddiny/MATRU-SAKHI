/**
 * Prepare Screen: Non-sensitive preparation sheet with multilingual translations
 */

import React, { useState } from 'react';
import { PreparationSheet, LanguageCode } from '../../shared/types.js';
import { I18N } from '../../shared/i18n.js';
import { ReadAloudButton } from '../components/ReadAloudButton.js';
import { User, MapPin, Building, ArrowRight, ShieldCheck } from 'lucide-react';

interface PrepareScreenProps {
  sheet: Partial<PreparationSheet>;
  language: LanguageCode;
  onUpdateField: (field: keyof PreparationSheet, value: string) => void;
  onFindCentre: (pincode: string) => void;
}

export const PrepareScreen: React.FC<PrepareScreenProps> = ({
  sheet,
  language,
  onUpdateField,
  onFindCentre,
}) => {
  const [localPin, setLocalPin] = useState(sheet.pincode || '400001');
  const [localName, setLocalName] = useState(sheet.motherName || 'सुनीता देवी');
  const [localBank, setLocalBank] = useState(sheet.bankName || 'State Bank of India');

  const t = I18N[language] || I18N.hi;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateField('motherName', localName);
    onUpdateField('bankName', localBank);
    onUpdateField('pincode', localPin);
    onFindCentre(localPin);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between py-4 px-4 max-w-lg mx-auto w-full space-y-6">
      <div className="w-full space-y-4">
        {/* Top Header with Read Aloud narration */}
        <div className="flex items-center justify-between px-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-300">
            {t.step4PrepareBadge}
          </div>
          <ReadAloudButton
            textToSpeak={t.stepNarrations.prepare}
            language={language}
          />
        </div>

        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-cinematic text-amber-50">
            {t.slipDetailsTitle}
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/70">
            {t.slipDetailsSubtitle}
          </p>
        </div>

        {/* Live Form */}
        <form onSubmit={handleSubmit} className="cinematic-panel rounded-3xl p-6 shadow-xl space-y-4">
          {/* Mother Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <User className="w-4 h-4 text-amber-400" />
              <span>{t.motherNameLabel}</span>
            </label>
            <input
              type="text"
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              placeholder={t.motherNamePlaceholder}
              className="w-full p-3.5 rounded-xl border border-amber-500/30 bg-[#160a12] text-amber-100 font-medium focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
            />
          </div>

          {/* Bank Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-amber-400" />
              <span>{t.bankNameLabel}</span>
            </label>
            <input
              type="text"
              value={localBank}
              onChange={(e) => setLocalBank(e.target.value)}
              placeholder={t.bankNamePlaceholder}
              className="w-full p-3.5 rounded-xl border border-amber-500/30 bg-[#160a12] text-amber-100 font-medium focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
            />
          </div>

          {/* Pincode */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{t.pincodeLabel}</span>
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={localPin}
              onChange={(e) => setLocalPin(e.target.value.replace(/\D/g, ''))}
              placeholder={t.pincodePlaceholder}
              className="w-full p-3.5 rounded-xl border border-amber-500/30 bg-[#160a12] text-amber-100 font-bold tracking-widest focus:ring-2 focus:ring-rose-500 focus:outline-hidden text-lg font-mono"
            />
          </div>

          {/* Privacy Badge */}
          <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3 flex items-start gap-2.5 text-emerald-200 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{t.privacyAssurance}</span>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-rose-500 via-amber-500 to-orange-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold py-4 rounded-2xl shadow-xl transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-2 text-base sm:text-lg border border-amber-300/30"
          >
            <span>{t.findNearestCentreBtn}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
