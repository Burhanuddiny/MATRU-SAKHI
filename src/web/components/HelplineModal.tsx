/**
 * HelplineModal: Official Government Toll-Free Helplines with 1-Tap Dialing
 * and Voice Readout for low-literacy mothers
 */

import React from 'react';
import { LanguageCode } from '../../shared/types.js';
import { I18N } from '../../shared/i18n.js';
import { speechHelper } from '../voice/speechHelper.js';
import { PhoneCall, X, ShieldCheck, HeartHandshake, Volume2, LifeBuoy } from 'lucide-react';

interface HelplineModalProps {
  isOpen: boolean;
  language: LanguageCode;
  onClose: () => void;
}

export const HelplineModal: React.FC<HelplineModalProps> = ({
  isOpen,
  language,
  onClose,
}) => {
  if (!isOpen) return null;

  const t = I18N[language] || I18N.hi;

  const helplines = [
    {
      number: '14445',
      nameHi: 'प्रधानमंत्री मातृ वंदना योजना हेल्पलाइन',
      nameEn: 'PMMVY Official National Helpline',
      subHi: 'योजना की जानकारी, किस्त स्थिति और शिकायत निवारण (निःशुल्क)',
      subEn: 'Scheme information, instalment status & grievance (Toll-Free)',
      primary: true,
      color: 'from-amber-600 to-rose-600',
    },
    {
      number: '181',
      nameHi: 'महिला हेल्पलाइन (24x7)',
      nameEn: 'Women Helpline (24x7 Toll-Free)',
      subHi: 'किसी भी समय सहायता, परामर्श और मार्गदर्शन',
      subEn: 'Round-the-clock women support and guidance',
      primary: false,
      color: 'from-rose-600 to-pink-600',
    },
    {
      number: '104',
      nameHi: 'स्वास्थ्य परामर्श हेल्पलाइन',
      nameEn: 'National Health Advice Helpline',
      subHi: 'गर्भावस्था, पोषण, खान-पान और डॉक्टर सलाह',
      subEn: 'Pregnancy, nutrition & medical assistance',
      primary: false,
      color: 'from-emerald-600 to-teal-600',
    },
    {
      number: '112',
      nameHi: 'राष्ट्रीय आपातकालीन सेवा (Emergency)',
      nameEn: 'National Emergency Service (Police/Ambulance)',
      subHi: 'एम्बुलेंस और त्वरित आपातकालीन सहायता',
      subEn: 'Immediate emergency & ambulance assistance',
      primary: false,
      color: 'from-stone-700 to-stone-900',
    },
  ];

  const handleReadAloud = () => {
    speechHelper.unlockAudio(true);
    const textToSpeak = language === 'en'
      ? 'Official Government Helplines. For maternity scheme help, call 14445. For women helpline, call 181. For health advice, call 104. For emergency ambulance, call 112. All calls are completely free.'
      : 'सरकारी सहायता नंबर। मातृ वंदना योजना के लिए 14445 पर कॉल करें। महिला सहायता के लिए 181 पर कॉल करें। स्वास्थ्य सलाह के लिए 104 पर कॉल करें। एम्बुलेंस के लिए 112 पर कॉल करें। सभी कॉल बिल्कुल निःशुल्क हैं।';
    speechHelper.speak(textToSpeak, language);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#1c0d18] border border-amber-500/40 rounded-3xl p-5 sm:p-7 max-w-lg w-full shadow-2xl relative space-y-5 text-amber-50">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-amber-200 transition-colors cursor-pointer"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-rose-600/30">
            <LifeBuoy className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif-cinematic text-amber-100">
              {language === 'en' ? 'Official Helplines' : 'सरकारी सहायता नंबर'}
            </h3>
            <p className="text-xs text-amber-300/80 font-medium">
              {language === 'en' ? 'Toll-free numbers for direct phone assistance' : 'निःशुल्क फोन सहायता · किसी भी फ़ोन से कॉल करें'}
            </p>
          </div>
        </div>

        {/* Read Aloud Button */}
        <button
          onClick={handleReadAloud}
          type="button"
          className="w-full flex items-center justify-center gap-2 bg-[#281323] hover:bg-[#34182e] border border-amber-500/30 text-amber-200 py-2.5 px-4 rounded-xl text-xs font-bold transition-colors cursor-pointer active:scale-95"
        >
          <Volume2 className="w-4 h-4 text-amber-400" />
          <span>{language === 'en' ? 'Listen to numbers spoken aloud' : 'सभी नंबर बोलकर सुनें (Listen Aloud)'}</span>
        </button>

        {/* Helplines List */}
        <div className="space-y-3">
          {helplines.map((item) => (
            <div
              key={item.number}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                item.primary
                  ? 'bg-gradient-to-r from-amber-950/60 to-rose-950/60 border-amber-400/50 shadow-md ring-1 ring-amber-400/30'
                  : 'bg-[#220e1d] border-amber-500/20 hover:border-amber-400/30'
              }`}
            >
              <div className="flex-1 pr-2">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-amber-100">
                    {language === 'en' ? item.nameEn : item.nameHi}
                  </h4>
                  {item.primary && (
                    <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                      PMMVY
                    </span>
                  )}
                </div>
                <p className="text-xs text-amber-200/70 mt-0.5 leading-snug">
                  {language === 'en' ? item.subEn : item.subHi}
                </p>
              </div>

              {/* One-Tap Direct Dial Button */}
              <a
                href={`tel:${item.number}`}
                className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-sm text-white shadow-md transition-all active:scale-95 bg-gradient-to-r ${item.color}`}
              >
                <PhoneCall className="w-4 h-4 animate-pulse" />
                <span className="font-mono text-base tracking-wider">{item.number}</span>
              </a>
            </div>
          ))}
        </div>

        {/* Reassurance Footer */}
        <div className="pt-2 text-center text-xs text-amber-300/70 flex items-center justify-center gap-1.5 border-t border-amber-500/20">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{language === 'en' ? 'Government Toll-Free Numbers · No Balance Required' : 'भारत सरकार द्वारा अधिकृत टोल-फ्री नंबर · कोई बैलेंस नहीं कटता'}</span>
        </div>
      </div>
    </div>
  );
};
