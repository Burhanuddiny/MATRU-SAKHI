/**
 * Centre Screen: Card showing nearest Anganwadi / Common Service Centre with Maps directions and multilingual translations
 */

import React from 'react';
import { Centre, LanguageCode } from '../../shared/types.js';
import { I18N } from '../../shared/i18n.js';
import { ReadAloudButton } from '../components/ReadAloudButton.js';
import { MapPin, Navigation, Phone, CheckCircle2, Globe, FileText, ArrowRight } from 'lucide-react';

interface CentreScreenProps {
  centre: Centre | null;
  language: LanguageCode;
  onOpenPortal: () => void;
  onDone: () => void;
}

export const CentreScreen: React.FC<CentreScreenProps> = ({
  centre,
  language,
  onOpenPortal,
  onDone,
}) => {
  const t = I18N[language] || I18N.hi;

  const resolvedCentre = centre || {
    name: 'वार्ड आंगनवाड़ी केंद्र (Anganwadi Centre)',
    address: 'प्राथमिक स्वास्थ्य केंद्र, वार्ड नंबर ४, पिन: ४००००१',
    pincode: '400001',
    phone: '181',
    type: 'anganwadi' as const,
    mapsUrl: 'https://maps.google.com/?q=Anganwadi+Centre',
    verifiedOfficial: true,
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between py-4 px-4 max-w-lg mx-auto w-full space-y-6">
      <div className="w-full space-y-5">
        {/* Top Header with Read Aloud Voice */}
        <div className="flex items-center justify-between px-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-300">
            {t.step5CentreBadge}
          </div>
          <ReadAloudButton
            textToSpeak={`${t.stepNarrations.centre} ${resolvedCentre.name}, ${resolvedCentre.address}`}
            language={language}
          />
        </div>

        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-emerald-950/80 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full mb-1 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.verifiedOfficialBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-cinematic text-amber-50">
            {t.centreTitle}
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/70">
            {t.takeSlipToCentreSub}
          </p>
        </div>

        {/* Centre Details Card */}
        <div className="cinematic-panel rounded-3xl p-6 shadow-2xl space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-amber-500/20 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/30 shadow-md">
              <MapPin className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-amber-50 leading-snug">
                {resolvedCentre.name}
              </h3>
              <p className="text-xs sm:text-sm text-amber-200/80 mt-1 font-medium leading-relaxed">
                {resolvedCentre.address}
              </p>
              <div className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-[#251220] px-3 py-1 rounded-lg border border-amber-500/25">
                <span>{t.pincodeTag}</span>
                <span className="font-mono">{resolvedCentre.pincode}</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-3 border-t border-amber-500/20 flex flex-wrap gap-2.5">
            <a
              href={resolvedCentre.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-md active:scale-95"
            >
              <Navigation className="w-4 h-4" />
              <span>{t.viewOnMapsBtn}</span>
            </a>

            {resolvedCentre.phone && (
              <a
                href={`tel:${resolvedCentre.phone}`}
                className="flex items-center justify-center gap-2 bg-[#251220] hover:bg-[#32172b] text-amber-200 font-bold py-3 px-4 rounded-xl text-sm border border-amber-500/30 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>{t.phoneLabel} {resolvedCentre.phone}</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="w-full space-y-3">
        <button
          onClick={onOpenPortal}
          type="button"
          className="w-full bg-[#20101b] hover:bg-[#2c1525] text-amber-200 font-bold py-3.5 px-6 rounded-2xl border border-amber-500/30 shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2 text-sm sm:text-base active:scale-95"
        >
          <Globe className="w-5 h-5 text-indigo-400" />
          <span>{t.portalTour}</span>
        </button>

        <button
          onClick={onDone}
          type="button"
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-xl shadow-emerald-950/50 transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-2 border border-emerald-400/40"
        >
          <FileText className="w-6 h-6" />
          <span>{t.getSlipBtn}</span>
          <ArrowRight className="w-5 h-5 ml-1" />
        </button>
      </div>
    </div>
  );
};
