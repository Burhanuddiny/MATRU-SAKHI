/**
 * Slip component: Multilingual preparation slip with robust print, download & WhatsApp sharing
 */

import React, { useState } from 'react';
import { JourneyState, LanguageCode, DocumentId } from '../../shared/types.js';
import { I18N } from '../../shared/i18n.js';
import { SCHEME_DOCUMENTS } from '../../shared/scheme/pmmvy.js';
import {
  executeSlipPrint,
  triggerSlipDownload,
  getWhatsAppShareUrl,
} from '../utils/slipExporter.js';
import {
  Printer,
  Download,
  Share2,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Check,
  MessageCircle,
} from 'lucide-react';

interface SlipProps {
  state: JourneyState;
  language: LanguageCode;
}

const DOC_TITLES: Record<string, Record<LanguageCode, string>> = {
  aadhaar: {
    hi: 'आधार कार्ड (माता व पिता)',
    mr: 'आधार कार्ड (माता व पिता)',
    bn: 'আধার কার্ড (মা ও বাবা)',
    ta: 'ஆதார் அட்டை (தாய் மற்றும் தந்தை)',
    te: 'ఆధార్ కార్డు (తల్లి మరియు తండ్రి)',
    kn: 'ಆಧಾರ್ ಕಾರ್ಡ್ (ತಾಯಿ ಮತ್ತು ತಂದೆ)',
    en: 'Aadhaar Card (Mother & Father)',
  },
  bank_passbook: {
    hi: 'बैंक पासबुक (आधार से लिंक खाता)',
    mr: 'बँक पासबुक (आधार लिंक खाते)',
    bn: 'ব্যাঙ্ক পাসবই (আধার সংযুক্ত অ্যাকাউন্ট)',
    ta: 'வங்கி பாஸ்புக் (ஆதார் இணைக்கப்பட்ட கணக்கு)',
    te: 'బ్యాంక్ పాస్‌బుక్ (ఆధార్ లింక్ ఖాతా)',
    kn: 'ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ (ಆಧಾರ್ ಲಿಂಕ್ಡ್ ಖಾತೆ)',
    en: 'Bank Passbook (Aadhaar linked account)',
  },
  mcp_card: {
    hi: 'जच्चा-बच्चा कार्ड / MCP कार्ड (ममता कार्ड)',
    mr: 'माता व बाल संरक्षण कार्ड / MCP कार्ड',
    bn: 'মা ও শিশু সুরক্ষা কার্ড / MCP কার্ড',
    ta: 'தாய் சேய் நல அட்டை / MCP அட்டை',
    te: 'తల్లి బిడ్డ రక్షణ కార్డు / MCP కార్డు',
    kn: 'ತಾಯಿ ಮತ್ತು ಮಗು ರಕ್ಷಣಾ ಕಾರ್ಡ್ / MCP ಕಾರ್ಡ್',
    en: 'Mother & Child Protection (MCP) Card',
  },
  ration_card: {
    hi: 'राशन कार्ड या पात्रता प्रमाण',
    mr: 'रेशन कार्ड किंवा पात्रता पुरावा',
    bn: 'রেশন কার্ড বা যোগ্যতার প্রমাণ',
    ta: 'ரேஷன் அட்டை அல்லது தகுதி சான்று',
    te: 'రేషన్ కార్డు లేదా అర్హత పత్రం',
    kn: 'ರೇಷನ್ ಕಾರ್ಡ್ ಅಥವಾ ಅರ್ಹತಾ ಪತ್ರ',
    en: 'Ration Card or Entitlement Document',
  },
  mobile_number: {
    hi: 'आधार से जुड़ा मोबाइल नंबर',
    mr: 'आधार लिंक असलेला मोबाईल नंबर',
    bn: 'আধারের সাথে যুক্ত মোবাইল নম্বর',
    ta: 'ஆதாருடன் இணைக்கப்பட்ட மொபைல் எண்',
    te: 'ఆధార్‌తో లింక్ చేసిన మొబైల్ నంబర్',
    kn: 'ಆಧಾರ್ ಲಿಂಕ್ಡ್ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
    en: 'Aadhaar-linked Active Mobile Number',
  },
  child_birth_certificate: {
    hi: 'बच्चे का जन्म प्रमाण पत्र (यदि जन्म हो चुका है)',
    mr: 'बाळाचा जन्म दाखला (जन्म झाला असल्यास)',
    bn: 'সন্তানের জন্ম সার্টিফিকেট (যদি জন্ম হয়ে থাকে)',
    ta: 'குழந்தையின் பிறப்புச் சான்றிதழ் (பிரசவத்திற்குப் பின்)',
    te: 'బిడ్డ జనన ಧృవీకరణ పత్రం (జననం జరిగి ఉంటే)',
    kn: 'ಮಗುವಿನ ಜನನ ಪ್ರಮಾಣಪತ್ರ (ಜನನವಾಗಿದ್ದರೆ)',
    en: 'Child Birth Certificate (If already delivered)',
  },
};

export const Slip: React.FC<SlipProps> = ({ state, language }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const t = I18N[language] || I18N.hi;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handlePrint = () => {
    const success = executeSlipPrint(state, language);
    if (!success) {
      showToast(
        language === 'en'
          ? 'Slip downloaded! You can open it anytime to print.'
          : 'पर्ची डाउनलोड हो गई है! इसे खोलकर कभी भी प्रिंट करा सकती हैं।'
      );
    }
  };

  const handleDownload = () => {
    triggerSlipDownload(state, language);
    showToast(
      language === 'en'
        ? 'Official slip downloaded to your device!'
        : 'सरकारी पर्ची आपके फोन में सुरक्षित डाउनलोड हो गई है!'
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `मातृ सखी - ${t.slipTitle}`,
          text: `मातृ सखी - मातृ वंदना सहायता पर्ची। कोड: ${state.resumeCode || '123456'}। राशि: ₹${
            state.eligibility?.amountRupees || 5000
          }। नजदीकी केंद्र: ${state.centre?.name || 'आंगनवाड़ी केंद्र'}`,
        });
      } catch (err) {
        console.warn('Share error:', err);
      }
    } else {
      window.open(getWhatsAppShareUrl(state), '_blank');
    }
  };

  const amount = state.eligibility?.amountRupees || 5000;

  return (
    <div className="w-full max-w-xl mx-auto space-y-4 print:space-y-2">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="p-3 bg-emerald-900 border border-emerald-400 text-emerald-100 rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-2 animate-in fade-in duration-200">
          <Check className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Printable Paper Card */}
      <div className="bg-[#1e0f19] rounded-3xl p-6 sm:p-8 border border-amber-500/40 shadow-2xl print:bg-white print:text-black print:shadow-none print:border-black print:rounded-none space-y-5 text-amber-50">
        {/* Header Emblem & Title in selected language */}
        <div className="text-center border-b border-amber-500/30 pb-4 print:border-stone-300">
          <div className="inline-flex items-center gap-1.5 bg-rose-950/80 text-rose-300 text-xs font-bold px-3 py-1 rounded-full mb-2 border border-rose-500/30 print:bg-stone-100 print:text-stone-800">
            <ShieldCheck className="w-4 h-4 text-rose-400 print:text-stone-800" />
            <span>{t.freeGovtHelp}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif-cinematic text-amber-100 print:text-black">
            {t.maternityBenefitTitle}
          </h2>
          <p className="text-xs sm:text-sm text-amber-300/80 font-medium print:text-stone-700">
            {t.slipTitle} · मातृ सखी (Matru Sakhi)
          </p>
        </div>

        {/* 6-Digit Resume Code Box */}
        <div className="bg-[#2a1424] rounded-2xl p-4 border border-amber-500/30 text-center print:bg-stone-50 print:border-stone-300">
          <p className="text-xs uppercase font-bold tracking-wider text-amber-300 print:text-stone-700">
            {t.resumeCodeNotice}
          </p>
          <div className="text-3xl sm:text-4xl font-black font-mono tracking-widest text-amber-400 my-1 drop-shadow-sm print:text-black">
            {state.resumeCode || '582-941'}
          </div>
          <p className="text-[11px] text-amber-200/70 print:text-stone-600">
            {t.resumePrompt}
          </p>
        </div>

        {/* Benefit Amount Banner */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg print:border print:border-stone-400 print:bg-none print:text-black">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold opacity-90">
              {t.totalAidAmount}
            </div>
            <div className="text-sm font-medium opacity-90">
              Direct Bank Transfer (DBT)
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-black tracking-tight text-white print:text-black">
            ₹{amount.toLocaleString('en-IN')}
          </div>
        </div>

        {/* Non-sensitive details if provided */}
        {(state.sheet.motherName || state.sheet.pincode) && (
          <div className="bg-black/30 rounded-2xl p-4 text-xs sm:text-sm space-y-1.5 border border-amber-500/20 print:bg-white print:text-black">
            {state.sheet.motherName && (
              <div className="flex justify-between">
                <span className="text-amber-300/70 print:text-stone-600">{t.motherNameLabel}:</span>
                <span className="font-bold text-amber-100 print:text-black">{state.sheet.motherName}</span>
              </div>
            )}
            {state.sheet.bankName && (
              <div className="flex justify-between">
                <span className="text-amber-300/70 print:text-stone-600">{t.bankNameLabel}:</span>
                <span className="font-bold text-amber-100 print:text-black">{state.sheet.bankName}</span>
              </div>
            )}
            {state.sheet.pincode && (
              <div className="flex justify-between">
                <span className="text-amber-300/70 print:text-stone-600">{t.pincodeLabel}:</span>
                <span className="font-bold text-amber-100 print:text-black">{state.sheet.pincode}</span>
              </div>
            )}
          </div>
        )}

        {/* Checklist of Papers */}
        <div>
          <h3 className="text-sm font-bold text-amber-200 uppercase tracking-wider mb-2 flex items-center gap-1.5 print:text-black">
            <span>📋</span> {t.documentsTitle}
          </h3>
          <div className="space-y-2">
            {SCHEME_DOCUMENTS.map((doc) => {
              const status = state.checklist[doc.id as DocumentId] || 'unknown';
              const isReady = status === 'have';
              const docTitle = DOC_TITLES[doc.id]?.[language] || (language === 'en' ? doc.titleEn : doc.titleHi);
              return (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-2 rounded-xl bg-black/20 border border-amber-500/10 text-xs sm:text-sm print:bg-white print:border-stone-300"
                >
                  <span className="font-medium text-amber-100 print:text-black">
                    {docTitle}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 font-semibold text-xs px-2.5 py-0.5 rounded-full ${
                      isReady
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30 print:bg-stone-100 print:text-black'
                        : 'bg-amber-950/80 text-amber-300 border border-amber-500/30 print:bg-stone-100 print:text-black'
                    }`}
                  >
                    {isReady ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 print:text-black" />
                        <span>{t.readyCountSuffix}</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-3 h-3 text-amber-400 print:text-black" />
                        <span>{language === 'en' ? 'Bring with you' : 'साथ ले जाएँ'}</span>
                      </>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Centre Information */}
        {state.centre && (
          <div className="border-t border-amber-500/20 pt-3 print:border-stone-300">
            <h4 className="text-xs uppercase font-bold text-amber-300 tracking-wider mb-1 flex items-center gap-1 print:text-black">
              <MapPin className="w-3.5 h-3.5 text-rose-400 print:text-black" />
              <span>{t.step5CentreBadge}:</span>
            </h4>
            <p className="text-sm font-bold text-amber-100 print:text-black">{state.centre.name}</p>
            <p className="text-xs text-amber-300/70 mt-0.5 print:text-stone-700">{state.centre.address}</p>
          </div>
        )}

        {/* Crucial Safety Reminder Box */}
        <div className="bg-rose-950/40 border border-rose-500/40 rounded-2xl p-3.5 text-center print:border-black print:bg-stone-50">
          <p className="text-xs font-bold text-rose-300 print:text-black">
            ⚠️ {t.safetyNotice}
          </p>
        </div>
      </div>

      {/* Action Buttons: Print, Download & WhatsApp */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 print:hidden">
        {/* 1. Print Slip */}
        <button
          onClick={handlePrint}
          type="button"
          className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-rose-500 to-orange-500 hover:from-amber-600 hover:to-rose-600 text-white font-bold py-3.5 px-4 rounded-2xl shadow-xl transition-all cursor-pointer active:scale-95"
        >
          <Printer className="w-5 h-5" />
          <span>{language === 'en' ? 'Print Slip' : 'पर्ची प्रिंट करें'}</span>
        </button>

        {/* 2. Download File / PDF */}
        <button
          onClick={handleDownload}
          type="button"
          className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-[#2a1323] hover:bg-[#381830] text-emerald-300 border border-emerald-500/40 font-bold py-3.5 px-4 rounded-2xl shadow-md transition-all cursor-pointer active:scale-95"
          title="Save file to phone storage"
        >
          <Download className="w-5 h-5 text-emerald-400" />
          <span>{language === 'en' ? 'Download Slip' : 'पर्ची डाउनलोड करें'}</span>
        </button>

        {/* 3. WhatsApp Direct Share */}
        <a
          href={getWhatsAppShareUrl(state)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-2xl shadow-md transition-colors cursor-pointer active:scale-95"
          title="Send to WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
