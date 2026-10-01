/**
 * About Screen: Highly precise, certified PMMVY 2.0 scheme guidelines & breakdown
 * Source: Ministry of Women and Child Development (MWCD), Govt. of India (Mission Shakti)
 */

import React, { useState } from 'react';
import { ReadAloudButton } from '../components/ReadAloudButton.js';
import { LanguageCode } from '../../shared/types.js';
import { I18N } from '../../shared/i18n.js';
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Calendar,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  PhoneCall,
  ExternalLink,
  Baby,
  HeartHandshake,
} from 'lucide-react';

interface AboutProps {
  language: LanguageCode;
  onCheckEligibility: () => void;
  onRepeat: () => void;
  onViewPortal?: () => void;
  onHelplineClick?: () => void;
}

export const AboutScreen: React.FC<AboutProps> = ({
  language,
  onCheckEligibility,
  onRepeat,
  onViewPortal,
  onHelplineClick,
}) => {
  const [showFaqs, setShowFaqs] = useState(false);
  const t = I18N[language] || I18N.hi;

  const isEnglish = language === 'en';

  const readAloudContent = isEnglish
    ? 'Pradhan Mantri Matru Vandana Yojana (PMMVY 2.0) by Ministry of Women and Child Development. Under Mission Shakti, mothers receive direct financial aid: For the first child, ₹5,000 in two instalments: ₹3,000 upon pregnancy registration and at least one ANC checkup within 6 months, and ₹2,000 upon birth registration and complete 14-week immunization. For a second girl child, ₹6,000 in a single instalment upon birth registration and vaccination. Additional ₹1,000 to ₹1,400 under JSY for institutional delivery. Age requirement is 18 years 7 months to 55 years. Money goes directly to the mother’s Aadhaar-linked bank account without middlemen. Registration is completely free at your nearest Anganwadi centre or on pmmvy.wcd.gov.in. National helpline is 14445.'
    : 'प्रधानमंत्री मातृ वंदना योजना २.० भारत सरकार के महिला एवं बाल विकास मंत्रालय की आधिकारिक योजना है। मिशन शक्ति के तहत: पहले बच्चे के लिए कुल ₹5,000 दो किस्तों में मिलते हैं — पहली किस्त ₹3,000 गर्भधारण पंजीकरण व पहली डॉक्टर जाँच पर, दूसरी किस्त ₹2,000 जन्म पंजीकरण व 14 सप्ताह के प्राथमिक टीकों के बाद। दूसरी संतान बालिका होने पर जन्म पंजीकरण व टीकाकरण के बाद एकमुश्त ₹6,000 सीधे बैंक खाते में मिलते हैं। सरकारी अस्पताल में प्रसव पर जननी सुरक्षा योजना से ₹1,000 से ₹1,400 अतिरिक्त मिलते हैं। आयु 18 वर्ष 7 माह से 55 वर्ष होनी चाहिए। पैसे सीधे माता के आधार-लिंक्ड बैंक खाते में आते हैं। आवेदन आंगनवाड़ी केंद्र पर 100% निःशुल्क है। राष्ट्रीय हेल्पलाइन 14445 है।';

  return (
    <div className="flex-1 flex flex-col items-center justify-between py-4 px-3 sm:px-4 max-w-2xl mx-auto w-full space-y-6">
      <div className="w-full space-y-4">
        {/* Top Header with Read Aloud */}
        <div className="flex items-center justify-between px-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-950/40 px-3 py-1 rounded-full border border-amber-500/25">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>{isEnglish ? 'PMMVY 2.0 Official Scheme Details' : 'कदम १ : योजना का सटीक सरकारी विवरण'}</span>
          </div>
          <ReadAloudButton
            textToSpeak={readAloudContent}
            language={language}
          />
        </div>

        {/* Official Ministry Emblem Header */}
        <div className="cinematic-panel rounded-3xl p-5 sm:p-6 border border-amber-500/30 text-amber-50 space-y-3 relative overflow-hidden shadow-2xl">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-300 uppercase tracking-wider bg-rose-950/60 px-2.5 py-0.5 rounded-full border border-rose-500/30 mb-1.5">
                <Building2 className="w-3 h-3 text-rose-400" />
                <span>{isEnglish ? 'Govt. of India · Ministry of Women & Child Development (MWCD)' : 'भारत सरकार · महिला एवं बाल विकास मंत्रालय'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif-cinematic text-amber-100 leading-tight">
                {isEnglish ? 'Pradhan Mantri Matru Vandana Yojana (PMMVY 2.0)' : 'प्रधानमंत्री मातृ वंदना योजना (PMMVY 2.0)'}
              </h2>
              <p className="text-xs text-amber-200/80 font-medium mt-1">
                {isEnglish
                  ? 'Mission Shakti (Samarthya) — Direct Benefit Transfer (DBT) for pregnant women and lactating mothers'
                  : 'मिशन शक्ति (सामर्थ्य) — गर्भवती व नई माताओं के पोषण, स्वास्थ्य व मजदूरी क्षतिपूर्ति हेतु सीधी आर्थिक सहायता'}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 via-amber-500 to-orange-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-rose-900/40">
              <Baby className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Precise Benefit Amount Cards */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs uppercase font-bold text-amber-300 tracking-wider flex items-center gap-1.5">
              <span>💰</span>
              <span>{isEnglish ? 'Precise Benefit Breakdown (Instalments & Conditions)' : 'सहायता राशि व किस्तों का सटीक विवरण'}</span>
            </h3>
            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-500/30">
              100% DBT
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* First Child Box: ₹5,000 (2 Instalments) */}
            <div className="bg-[#24101e] rounded-2xl p-4 sm:p-5 border border-amber-500/30 space-y-3 shadow-lg">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-2.5">
                <div>
                  <span className="text-[11px] uppercase font-bold text-amber-300 tracking-wide block">
                    {isEnglish ? 'For First Child' : 'पहला बच्चा'}
                  </span>
                  <h4 className="text-base font-bold text-white">
                    {isEnglish ? '₹5,000 in 2 Instalments' : 'कुल ₹5,000 (२ किस्तों में)'}
                  </h4>
                </div>
                <div className="text-2xl font-black font-mono text-emerald-300">
                  ₹5,000
                </div>
              </div>

              <div className="space-y-2 text-xs">
                {/* Instalment 1 */}
                <div className="bg-black/30 p-2.5 rounded-xl border border-amber-500/15">
                  <div className="flex items-center justify-between font-bold text-amber-200">
                    <span>{isEnglish ? '1st Instalment:' : '१ली किस्त:'}</span>
                    <span className="text-emerald-300 font-mono text-sm">₹3,000</span>
                  </div>
                  <p className="text-[11px] text-amber-200/75 mt-0.5 leading-snug">
                    {isEnglish
                      ? 'At pregnancy registration & at least 1 Antenatal Checkup (ANC) within 6 months of LMP.'
                      : 'गर्भावस्था पंजीकरण और LMP के 6 माह के भीतर कम से कम 1 डॉक्टर जाँच (ANC) होने पर।'}
                  </p>
                </div>

                {/* Instalment 2 */}
                <div className="bg-black/30 p-2.5 rounded-xl border border-amber-500/15">
                  <div className="flex items-center justify-between font-bold text-amber-200">
                    <span>{isEnglish ? '2nd Instalment:' : '२री किस्त:'}</span>
                    <span className="text-emerald-300 font-mono text-sm">₹2,000</span>
                  </div>
                  <p className="text-[11px] text-amber-200/75 mt-0.5 leading-snug">
                    {isEnglish
                      ? 'After child birth registration & primary immunization cycle (BCG, OPV, DPT) within 14 weeks.'
                      : 'बच्चे के जन्म पंजीकरण और 14 सप्ताह तक के प्राथमिक टीकों (BCG, OPV, DPT) के बाद।'}
                  </p>
                </div>
              </div>
            </div>

            {/* Second Child (Girl) Box: ₹6,000 Single Instalment */}
            <div className="bg-[#24101e] rounded-2xl p-4 sm:p-5 border border-rose-500/40 space-y-3 shadow-lg">
              <div className="flex items-center justify-between border-b border-rose-500/20 pb-2.5">
                <div>
                  <span className="text-[11px] uppercase font-bold text-rose-300 tracking-wide block">
                    {isEnglish ? 'For Second Child (Girl Child)' : 'दूसरी संतान (कन्या होने पर)'}
                  </span>
                  <h4 className="text-base font-bold text-white">
                    {isEnglish ? '₹6,000 in Single Instalment' : 'कुल ₹6,000 (एकमुश्त राशि)'}
                  </h4>
                </div>
                <div className="text-2xl font-black font-mono text-emerald-300">
                  ₹6,000
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="bg-rose-950/30 p-3 rounded-xl border border-rose-500/20">
                  <div className="flex items-center justify-between font-bold text-rose-200">
                    <span>{isEnglish ? 'Single Instalment (100%):' : 'एकमुश्त भुगतान:'}</span>
                    <span className="text-emerald-300 font-mono text-sm">₹6,000</span>
                  </div>
                  <p className="text-[11px] text-amber-200/80 mt-1 leading-snug">
                    {isEnglish
                      ? 'Transferred in a single lump-sum after birth registration and complete primary vaccinations of the girl child.'
                      : 'बेटी के जन्म पंजीकरण और 14 सप्ताह के टीकाकरण पूरे होने पर ₹6,000 सीधे बैंक खाते में आते हैं।'}
                  </p>
                </div>

                {/* JSY Additional note */}
                <div className="p-2.5 rounded-xl bg-black/30 border border-amber-500/15 text-[11px] text-amber-200/75">
                  <span className="font-bold text-amber-300">
                    {isEnglish ? '🏥 Additional JSY Benefit: ' : '🏥 अतिरिक्त सरकारी अस्पताल लाभ: '}
                  </span>
                  {isEnglish
                    ? 'Get ₹1,000 - ₹1,400 extra under Janani Suraksha Yojana for delivery in government hospital.'
                    : 'सरकारी अस्पताल में डिलीवरी कराने पर जननी सुरक्षा योजना (JSY) से ₹1,000 से ₹1,400 अतिरिक्त मिलते हैं।'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Precise Eligibility & Exclusion Rules */}
        <div className="bg-[#1c0d18] rounded-2xl p-4 sm:p-5 border border-amber-500/25 space-y-3 text-xs text-amber-100">
          <h4 className="text-xs uppercase font-bold text-amber-300 tracking-wider flex items-center gap-1.5">
            <span>📋</span>
            <span>{isEnglish ? 'Precise Eligibility Conditions (Rules)' : 'पात्रता के ४ मुख्य सरकारी नियम'}</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="flex items-start gap-2 bg-black/25 p-2.5 rounded-xl border border-amber-500/10">
              <span className="text-base">🎂</span>
              <div>
                <span className="font-bold text-white block">
                  {isEnglish ? 'Age Limit' : 'आयु सीमा'}
                </span>
                <span className="text-amber-200/80 text-[11px]">
                  {isEnglish ? '18 years 7 months to 55 years.' : 'कम से कम 18 वर्ष 7 माह तथा अधिकतम 55 वर्ष।'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-black/25 p-2.5 rounded-xl border border-amber-500/10">
              <span className="text-base">⏱️</span>
              <div>
                <span className="font-bold text-white block">
                  {isEnglish ? 'Application Window' : 'आवेदन समय सीमा'}
                </span>
                <span className="text-amber-200/80 text-[11px]">
                  {isEnglish
                    ? 'Within 570 days of LMP or 270 days of child birth.'
                    : 'LMP से 570 दिन अथवा बच्चे के जन्म से 270 दिन (9 माह) के भीतर।'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-black/25 p-2.5 rounded-xl border border-amber-500/10">
              <span className="text-base">💳</span>
              <div>
                <span className="font-bold text-white block">
                  {isEnglish ? 'Direct Bank Transfer' : 'सीधा बैंक खाता'}
                </span>
                <span className="text-amber-200/80 text-[11px]">
                  {isEnglish
                    ? 'Must be mother’s own Aadhaar-seeded bank account.'
                    : 'माता के नाम का आधार-लिंक्ड बैंक या डाकघर खाता अनिवार्य।'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-black/25 p-2.5 rounded-xl border border-amber-500/10">
              <span className="text-base">🌾</span>
              <div>
                <span className="font-bold text-white block">
                  {isEnglish ? 'Qualifying Categories' : 'मान्य श्रेणियाँ'}
                </span>
                <span className="text-amber-200/80 text-[11px]">
                  {isEnglish
                    ? 'Ration card, e-Shram, SC/ST, PMJAY, Divyang, PM-KISAN, or income < ₹8 Lakh.'
                    : 'राशन कार्ड, ई-श्रम, SC/ST, दिव्यांग, आयुष्मान कार्ड, या आय ₹8 लाख से कम।'}
                </span>
              </div>
            </div>
          </div>

          {/* Strict Exclusion Notice */}
          <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/30 flex items-start gap-2 text-[11px] text-rose-200">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-rose-100">
                {isEnglish ? 'Who is NOT eligible: ' : 'कौन पात्र नहीं हैं: '}
              </strong>
              {isEnglish
                ? 'Women in regular employment with Central/State Govt or PSUs, or receiving paid maternity leave under other laws.'
                : 'केंद्र या राज्य सरकार अथवा सार्वजनिक उपक्रमों में नियमित कार्यरत सरकारी कर्मचारी महिलाएँ इस योजना में पात्र नहीं हैं।'}
            </span>
          </div>
        </div>

        {/* Collapsible FAQ Section */}
        <div className="border border-amber-500/20 rounded-2xl bg-[#1e0e1a] overflow-hidden">
          <button
            onClick={() => setShowFaqs(!showFaqs)}
            type="button"
            className="w-full flex items-center justify-between p-3.5 text-xs font-bold text-amber-200 hover:text-white transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-amber-400" />
              <span>{isEnglish ? 'Frequently Asked Questions & Official Help' : 'अक्सर पूछे जाने वाले सवाल व हेल्पलाइन (FAQs)'}</span>
            </span>
            {showFaqs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showFaqs && (
            <div className="p-4 pt-1 space-y-3 text-xs text-amber-200/85 border-t border-amber-500/15">
              <div className="space-y-1">
                <p className="font-bold text-amber-100">
                  {isEnglish ? 'Q: Is there any fee for application?' : 'प्रश्न: क्या आवेदन करने की कोई फ़ीस है?'}
                </p>
                <p className="text-[11px] text-emerald-300">
                  {isEnglish
                    ? 'A: Absolutely NO. Application at your local Anganwadi centre or online is 100% FREE. Never pay anyone.'
                    : 'उत्तर: बिल्कुल नहीं! आंगनवाड़ी केंद्र या ऑनलाइन पोर्टल पर आवेदन पूरी तरह निःशुल्क है। किसी को पैसे न दें।'}
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-bold text-amber-100">
                  {isEnglish ? 'Q: Is the husband’s Aadhaar mandatory?' : 'प्रश्न: क्या पति का आधार कार्ड अनिवार्य है?'}
                </p>
                <p className="text-[11px] text-amber-200/80">
                  {isEnglish
                    ? 'A: No. Under revised guidelines, only the mother’s Aadhaar card and identity is mandatory.'
                    : 'उत्तर: नहीं। संशोधित नियमों के अनुसार केवल माता का आधार कार्ड अनिवार्य है।'}
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-bold text-amber-100">
                  {isEnglish ? 'Q: Official National Helpline?' : 'प्रश्न: आधिकारिक राष्ट्रीय हेल्पलाइन?'}
                </p>
                <p className="text-[11px] text-amber-200/80 flex items-center gap-2">
                  <span>{isEnglish ? 'Dial toll-free' : 'टोल-फ्री कॉल करें:'}</span>
                  <a href="tel:14445" className="text-amber-300 font-mono font-bold underline">14445</a>
                  <span>/</span>
                  <a href="tel:181" className="text-amber-300 font-mono font-bold underline">181</a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Action Buttons */}
      <div className="w-full space-y-3">
        <p className="text-center text-sm sm:text-base font-bold text-amber-100 font-serif-cinematic">
          {t.checkEligibilityPrompt}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Big Green Yes Button */}
          <button
            onClick={onCheckEligibility}
            type="button"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-4 px-6 rounded-2xl shadow-xl shadow-emerald-950/50 transition-all active:scale-95 cursor-pointer text-base sm:text-lg border border-emerald-400/40"
          >
            <CheckCircle2 className="w-6 h-6" />
            <span>{t.yesCheckEligibility}</span>
            <ArrowRight className="w-5 h-5 ml-1" />
          </button>

          {/* Helpline Trigger Button */}
          {onHelplineClick ? (
            <button
              onClick={onHelplineClick}
              type="button"
              className="flex items-center justify-center gap-2 bg-[#20101b] hover:bg-[#2c1525] text-rose-300 font-bold py-4 px-6 rounded-2xl border border-rose-500/30 shadow-md transition-colors cursor-pointer text-sm sm:text-base active:scale-95"
            >
              <PhoneCall className="w-5 h-5 text-rose-400" />
              <span>{isEnglish ? 'Official Helpline (14445)' : 'हेल्पलाइन (14445 / 181)'}</span>
            </button>
          ) : (
            <button
              onClick={onRepeat}
              type="button"
              className="flex items-center justify-center gap-2 bg-[#20101b] hover:bg-[#2c1525] text-amber-200 font-bold py-4 px-6 rounded-2xl border border-amber-500/30 shadow-md transition-colors cursor-pointer text-base active:scale-95"
            >
              <span>{t.repeat}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
