/**
 * InstalmentTimeline: Clear pictorial breakdown of how and when the ₹5,000 - ₹6,000 is paid
 * Explains PMMVY 2.0 DBT rules in simple zero-tech language with voice narration
 */

import React from 'react';
import { LanguageCode } from '../../shared/types.js';
import { speechHelper } from '../voice/speechHelper.js';
import { IndianRupee, Calendar, CheckCircle2, Baby, ShieldCheck, Volume2 } from 'lucide-react';

interface InstalmentTimelineProps {
  childOrder: 1 | 2 | 3;
  language: LanguageCode;
}

export const InstalmentTimeline: React.FC<InstalmentTimelineProps> = ({
  childOrder,
  language,
}) => {
  const isSecondGirl = childOrder === 2;

  const handleReadAloud = () => {
    speechHelper.unlockAudio(true);
    const textToSpeak = isSecondGirl
      ? 'दूसरी बेटी के लिए जन्म पंजीकरण और संपूर्ण टीकाकरण के बाद एकमुश्त ₹6,000 आपके आधार से जुड़े बैंक खाते में भेजे जाते हैं।'
      : 'पहले बच्चे के लिए ₹5,000 दो किस्तों में मिलते हैं। पहली किस्त ₹3,000 गर्भधारण पंजीकरण और पहली स्वास्थ्य जाँच के बाद। दूसरी किस्त ₹2,000 बच्चे के जन्म पंजीकरण और १४ सप्ताह के टीकाकरण के बाद।';
    speechHelper.speak(textToSpeak, language);
  };

  return (
    <div className="w-full rounded-3xl bg-[#1e0e1a] border border-amber-500/30 p-5 sm:p-6 shadow-xl space-y-4 text-amber-50">
      <div className="flex items-center justify-between gap-2 border-b border-amber-500/20 pb-3">
        <div>
          <h3 className="text-base sm:text-lg font-bold font-serif-cinematic text-amber-100 flex items-center gap-1.5">
            <span>पैसे कब और कैसे मिलेंगे? (किस्त विवरण)</span>
          </h3>
          <p className="text-xs text-amber-300/70">
            सरकारी नियमानुसार सीधे आपके बैंक खाते में (DBT)
          </p>
        </div>

        <button
          onClick={handleReadAloud}
          type="button"
          className="flex items-center gap-1 text-xs font-bold text-amber-300 bg-[#291324] hover:bg-[#361830] px-3 py-1.5 rounded-xl border border-amber-500/30 transition-colors cursor-pointer"
        >
          <Volume2 className="w-3.5 h-3.5 text-amber-400" />
          <span>सुनें</span>
        </button>
      </div>

      {isSecondGirl ? (
        /* Second Child Girl: Single Instalment of ₹6,000 */
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/70 to-teal-950/70 border border-emerald-500/40 flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-xl shrink-0">
            ₹6,000
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-100">
              एकमुश्त सहायता (Single Instalment)
            </h4>
            <p className="text-xs text-emerald-200/80 mt-1 leading-relaxed">
              बच्ची के जन्म पंजीकरण और सभी जरूरी टीके (BCG, OPV, DPT) पूरे होने पर पूरी राशि ₹6,000 एक साथ आपके खाते में आती है।
            </p>
          </div>
        </div>
      ) : (
        /* First Child: 2 Instalments (₹3,000 + ₹2,000) */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Instalment 1 */}
          <div className="p-4 rounded-2xl bg-[#261221] border border-amber-500/25 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                १ली किस्त (1st)
              </span>
              <span className="text-lg font-black text-emerald-300 font-mono">
                ₹3,000
              </span>
            </div>
            <h4 className="text-xs font-bold text-amber-100">
              गर्भावस्था पंजीकरण व स्वास्थ्य जाँच (ANC)
            </h4>
            <p className="text-[11px] text-amber-200/70 leading-snug">
              गर्भवती होने पर आंगनवाड़ी में नाम दर्ज कराने और कम से कम 1 बार डॉक्टर जाँच (ANC) कराने पर।
            </p>
          </div>

          {/* Instalment 2 */}
          <div className="p-4 rounded-2xl bg-[#261221] border border-amber-500/25 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                २री किस्त (2nd)
              </span>
              <span className="text-lg font-black text-emerald-300 font-mono">
                ₹2,000
              </span>
            </div>
            <h4 className="text-xs font-bold text-amber-100">
              जन्म पंजीकरण व टीकाकरण (Vaccination)
            </h4>
            <p className="text-[11px] text-amber-200/70 leading-snug">
              बच्चे का जन्म प्रमाण पत्र बनने और 14 सप्ताह तक के टीके लगने के बाद।
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 text-[11px] text-amber-300/80 pt-1">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span>पैसे आने पर बैंक और आधार से जुड़े मोबाइल नंबर पर SMS आता है।</span>
      </div>
    </div>
  );
};
