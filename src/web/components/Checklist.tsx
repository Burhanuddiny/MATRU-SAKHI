/**
 * Checklist component: Visual picture checklist for required PMMVY documents with multilingual translations
 */

import React from 'react';
import { DocumentId, LanguageCode } from '../../shared/types.js';
import { SCHEME_DOCUMENTS } from '../../shared/scheme/pmmvy.js';
import { CheckCircle2, Circle, Camera } from 'lucide-react';
import { I18N } from '../../shared/i18n.js';

interface ChecklistProps {
  checklist: Record<DocumentId, 'have' | 'missing' | 'unknown'>;
  language: LanguageCode;
  onToggle: (docId: DocumentId, currentStatus: 'have' | 'missing' | 'unknown') => void;
  onCameraCheck: (docId: DocumentId) => void;
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
    te: 'బిడ్డ జనన ధృవీకరణ పత్రం (జననం జరిగి ఉంటే)',
    kn: 'ಮಗುವಿನ ಜನನ ಪ್ರಮಾಣಪತ್ರ (ಜನನವಾಗಿದ್ದರೆ)',
    en: 'Child Birth Certificate (If already delivered)',
  },
};

export const Checklist: React.FC<ChecklistProps> = ({
  checklist,
  language,
  onToggle,
  onCameraCheck,
}) => {
  const t = I18N[language] || I18N.hi;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-3.5">
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-amber-50 font-serif-cinematic">
            {t.documentsTitle}
          </h2>
          <p className="text-xs text-amber-300/70">
            {language === 'mr'
              ? 'आपल्याकडे असलेली कागदपत्रे निवडा'
              : language === 'bn'
              ? 'আপনার কাছে থাকা কাগজপত্রে টিক দিন'
              : language === 'ta'
              ? 'உங்களிடம் உள்ள ஆவணங்களை டிக் செய்யவும்'
              : language === 'te'
              ? 'మీ వద్ద ఉన్న పత్రాలను ఎంచుకోండి'
              : language === 'kn'
              ? 'ನಿಮ್ಮ ಬಳಿ ಇರುವ ದಾಖಲೆಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ'
              : language === 'en'
              ? 'Tick the documents you have ready'
              : 'जो कागज़ आपके पास हैं, उन पर टिक करें'}
          </p>
        </div>
        <span className="text-xs font-semibold text-rose-300 bg-rose-950/70 px-3 py-1 rounded-full border border-rose-500/30">
          {t.documentsTitle}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {SCHEME_DOCUMENTS.map((doc) => {
          const docId = doc.id as DocumentId;
          const status = checklist[docId] || 'unknown';
          const isHave = status === 'have';

          const title = DOC_TITLES[docId]?.[language] || (language === 'en' ? doc.titleEn : doc.titleHi);

          return (
            <div
              key={doc.id}
              className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md ${
                isHave
                  ? 'bg-emerald-950/40 border-emerald-500/40'
                  : 'cinematic-panel hover:border-amber-400/40'
              }`}
            >
              {/* Document Identity & Visual Hint */}
              <div
                onClick={() => onToggle(docId, status)}
                className="flex items-start gap-3.5 flex-1 cursor-pointer select-none"
              >
                <div className="mt-0.5 shrink-0">
                  {isHave ? (
                    <CheckCircle2 className="w-7 h-7 text-emerald-400 fill-emerald-950/60" />
                  ) : (
                    <Circle className="w-7 h-7 text-amber-500/50" />
                  )}
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-amber-100 leading-snug">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300/80 mt-0.5">
                    {language === 'en' ? doc.descriptionEn : doc.descriptionHi}
                  </p>
                </div>
              </div>

              {/* Camera Verification Button */}
              <button
                onClick={() => onCameraCheck(docId)}
                type="button"
                className="self-stretch sm:self-center flex items-center justify-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-rose-500/20 hover:from-amber-500/30 hover:to-rose-500/30 text-amber-200 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl border border-amber-500/40 transition-colors shadow-xs cursor-pointer active:scale-95"
                title={t.takePhoto}
              >
                <Camera className="w-4 h-4 text-amber-400" />
                <span>{t.takePhoto}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
