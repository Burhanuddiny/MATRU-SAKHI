/**
 * Documents Screen: Picture checklist with camera inspection and multilingual translations
 */

import React from 'react';
import { Checklist } from '../components/Checklist.js';
import { ReadAloudButton } from '../components/ReadAloudButton.js';
import { DocumentId, LanguageCode } from '../../shared/types.js';
import { I18N } from '../../shared/i18n.js';
import { ArrowRight, ClipboardCheck } from 'lucide-react';

interface DocumentsScreenProps {
  checklist: Record<DocumentId, 'have' | 'missing' | 'unknown'>;
  language: LanguageCode;
  onToggle: (docId: DocumentId, status: 'have' | 'missing' | 'unknown') => void;
  onCameraCheck: (docId: DocumentId) => void;
  onProceedToPrepare: () => void;
}

export const DocumentsScreen: React.FC<DocumentsScreenProps> = ({
  checklist,
  language,
  onToggle,
  onCameraCheck,
  onProceedToPrepare,
}) => {
  const t = I18N[language] || I18N.hi;

  const haveCount = Object.values(checklist).filter((s) => s === 'have').length;

  return (
    <div className="flex-1 flex flex-col items-center justify-between py-4 px-4 max-w-xl mx-auto w-full space-y-6">
      {/* Top Header with Read Aloud narration */}
      <div className="w-full flex items-center justify-between px-1">
        <div className="text-xs font-semibold uppercase tracking-wider text-amber-300">
          {t.step3DocsBadge}
        </div>
        <ReadAloudButton
          textToSpeak={t.stepNarrations.documents}
          language={language}
        />
      </div>

      {/* Checklist items */}
      <div className="w-full">
        <Checklist
          checklist={checklist}
          language={language}
          onToggle={onToggle}
          onCameraCheck={onCameraCheck}
        />
      </div>

      {/* Safety Notice & Proceed Button */}
      <div className="w-full space-y-3 pt-2">
        <div className="bg-[#24121e]/80 border border-amber-500/25 rounded-2xl p-3 text-center">
          <p className="text-xs text-amber-200 font-medium">
            {t.checkWithPhotoNotice}
          </p>
        </div>

        <button
          onClick={onProceedToPrepare}
          type="button"
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-xl shadow-emerald-950/50 transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-2 border border-emerald-400/40"
        >
          <ClipboardCheck className="w-6 h-6" />
          <span>
            {t.prepareSlipButton} ({haveCount} {t.readyCountSuffix})
          </span>
          <ArrowRight className="w-5 h-5 ml-1" />
        </button>
      </div>
    </div>
  );
};
