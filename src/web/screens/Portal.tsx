/**
 * Portal Screen: "Dekho" guided preview of the official PMMVY portal (pmmvy.wcd.gov.in)
 */

import React, { useState } from 'react';
import { LanguageCode } from '../../shared/types.js';
import { I18N } from '../../shared/i18n.js';
import { Globe, ExternalLink, ArrowRight, Eye } from 'lucide-react';

interface PortalScreenProps {
  language: LanguageCode;
  onProceedToDone: () => void;
}

export const PortalScreen: React.FC<PortalScreenProps> = ({
  language,
  onProceedToDone,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const t = I18N[language] || I18N.hi;

  const tourSteps = [
    {
      title: 'आधिकारिक सरकारी पोर्टल (pmmvy.wcd.gov.in)',
      description: 'यह भारत सरकार का आधिकारिक PMMVY पोर्टल है जहाँ फॉर्म ऑनलाइन दर्ज होता है।',
      focusArea: 'header',
    },
    {
      title: 'नागरिक / कार्यकर्ता लॉगिन (Citizen & Staff Login)',
      description: 'यहाँ आपकी आंगनवाड़ी दीदी या आप अपने मोबाइल नंबर से लॉगिन करते हैं।',
      focusArea: 'login',
    },
    {
      title: 'आवेदन स्थिति (Track Status)',
      description: 'फॉर्म जमा होने के बाद इसी जगह से किस्त के पैसे का स्टेटस देखा जा सकता है।',
      focusArea: 'track',
    },
  ];

  const currentTour = tourSteps[activeStep];

  return (
    <div className="flex-1 flex flex-col items-center justify-between py-4 px-4 max-w-xl mx-auto w-full space-y-5">
      <div className="w-full space-y-4">
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-indigo-950/80 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full mb-1 border border-indigo-500/30">
            <Eye className="w-3.5 h-3.5 text-indigo-400" />
            <span>देखो (Dekho Mode)</span>
          </div>
          <h2 className="text-2xl font-bold font-serif-cinematic text-amber-50">
            सरकारी पोर्टल का पूर्वावलोकन
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/70">
            समझें कि आंगनवाड़ी कार्यकर्ता या सीएससी पर पोर्टल कैसे दिखता है
          </p>
        </div>

        {/* Guided Portal Mockup Viewport */}
        <div className="relative w-full rounded-3xl overflow-hidden border border-amber-500/30 bg-[#120810] shadow-2xl">
          {/* Browser Top Bar */}
          <div className="bg-[#1f0e1b] px-4 py-2.5 flex items-center justify-between text-xs text-stone-300 border-b border-amber-500/20">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            </div>
            <div className="bg-[#0e050c] px-4 py-1 rounded-full text-[11px] font-mono flex items-center gap-1.5 text-amber-200 border border-amber-500/20">
              <span className="text-emerald-400">🔒</span>
              <span>pmmvy.wcd.gov.in</span>
            </div>
            <a
              href="https://pmmvy.wcd.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-white"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Visual Portal Simulation Interface */}
          <div className="relative p-6 bg-stone-100 min-h-[260px] flex flex-col justify-between select-none">
            {/* National Banner Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-300">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-serif font-black flex items-center justify-center text-xs">
                  IN
                </div>
                <div>
                  <div className="text-[11px] font-bold text-stone-900 leading-tight">
                    महिला एवं बाल विकास मंत्रालय
                  </div>
                  <div className="text-[9px] text-stone-600">भारत सरकार</div>
                </div>
              </div>

              {/* Login Button Mock */}
              <div className="relative">
                <div className="bg-rose-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-xs">
                  Citizen Login
                </div>
                {activeStep === 1 && (
                  <span className="absolute -inset-2 rounded-xl border-2 border-rose-500 animate-ping opacity-75 pointer-events-none" />
                )}
              </div>
            </div>

            {/* Simulated Hero Section */}
            <div className="my-4 p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-sm">
                  PMMVY Portal
                </span>
                <div className="text-sm font-bold text-stone-900 mt-1">
                  मातृ वंदना योजना ऑनलाइन पंजीकरण
                </div>
                <div className="text-xs text-stone-600 mt-0.5">
                  किस्त ₹5,000 / ₹6,000 सीधे बैंक खाते में
                </div>
              </div>

              {/* Animated Tap Ring */}
              <div className="relative w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold text-xs">
                PMMVY
                <span className="absolute inset-0 rounded-full border-2 border-rose-600 animate-ping" />
              </div>
            </div>

            {/* Status Tracking Mock */}
            <div className="flex items-center justify-between pt-2 border-t border-stone-200 text-xs text-stone-700">
              <div className="relative flex items-center gap-1.5 font-medium">
                <span>📍 ट्रैक आवेदन</span>
                {activeStep === 2 && (
                  <span className="absolute -inset-2 rounded-xl border-2 border-indigo-500 animate-ping opacity-75 pointer-events-none" />
                )}
              </div>
              <div className="text-[11px] text-stone-500">हेल्पलाइन: 181</div>
            </div>
          </div>
        </div>

        {/* Tour Narration Card */}
        <div className="cinematic-panel rounded-2xl p-4 shadow-xl flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-rose-500 text-white flex items-center justify-center shrink-0 font-bold text-sm shadow-md">
            {activeStep + 1}
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-amber-100">
              {currentTour.title}
            </h4>
            <p className="text-xs text-amber-200/80 mt-0.5 leading-relaxed">
              {currentTour.description}
            </p>
          </div>
        </div>

        {/* Tour Step Buttons */}
        <div className="flex justify-center gap-2">
          {tourSteps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                idx === activeStep ? 'w-8 bg-gradient-to-r from-rose-500 to-amber-500' : 'w-2.5 bg-stone-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Done Proceed Button */}
      <div className="w-full space-y-2">
        <button
          onClick={onProceedToDone}
          type="button"
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-xl shadow-emerald-950/50 transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-2 border border-emerald-400/40"
        >
          <span>मेरी पर्ची और कोड देखें</span>
          <ArrowRight className="w-5 h-5 ml-1" />
        </button>
      </div>
    </div>
  );
};
