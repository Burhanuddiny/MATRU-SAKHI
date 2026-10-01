/**
 * Welcome Screen: Precise, aesthetic, and direct landing page
 * Clean typography hierarchy, zero-pill metadata discipline, and clear user pathways.
 */

import React from 'react';
import { BigButton } from '../components/BigButton.js';
import { WaveformIndicator } from '../components/WaveformIndicator.js';
import { TransportStatus } from '../transport/AgentTransport.js';
import { LanguageCode } from '../../shared/types.js';
import { I18N, getLanguageName } from '../../shared/i18n.js';
import { speechHelper } from '../voice/speechHelper.js';
import { DailyMaternityTip } from '../components/DailyMaternityTip.js';
import { ArrowRight, Volume2, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface WelcomeProps {
  status: TransportStatus;
  language: LanguageCode;
  onTap: () => void;
  onLanguageSelect: (lang: LanguageCode) => void;
  onQuickPrompt?: (text: string) => void;
  onDirectExplore?: () => void;
  onHelplineClick?: () => void;
}

const LANGUAGES: LanguageCode[] = ['hi', 'mr', 'bn', 'ta', 'te', 'kn', 'en'];

const WELCOME_CONTENT: Record<
  LanguageCode,
  {
    kicker: string;
    heading: string;
    subtitle: string;
    guarantees: string[];
    listenAloud: string;
    exploreScheme: string;
  }
> = {
  hi: {
    kicker: 'भारत सरकार · प्रधानमंत्री मातृ वंदना योजना',
    heading: 'माँ और बच्चे के लिए ₹6,000 सरकारी मदद',
    subtitle: 'कोई जटिल फॉर्म नहीं। बस बोलकर अपनी पात्रता जानें और अपनी आंगनवाड़ी पर्ची पाएं।',
    guarantees: ['₹6,000 सीधे बैंक खाते में', 'बिना किसी बिचौलिए', '100% निःशुल्क सरकारी सहायता'],
    listenAloud: 'बोलकर सुनें',
    exploreScheme: 'योजना देखें व पात्रता जाँचें',
  },
  mr: {
    kicker: 'भारत सरकार · मातृ वंदना योजना',
    heading: 'आई आणि बाळासाठी ₹६,००० सरकारी मदत',
    subtitle: 'कोणताही कठीण फॉर्म नाही. फक्त बोलून पात्रता तपासा आणि अंगणवाडी पावती मिळवा.',
    guarantees: ['₹६,००० थेट बँक खात्यात', 'दलालांशिवाय', '१००% मोफत सरकारी मदत'],
    listenAloud: 'ऐकून घ्या',
    exploreScheme: 'योजना व पात्रता तपासा',
  },
  bn: {
    kicker: 'ভারত সরকার · মাতৃ বন্দনা যোজনা',
    heading: 'মা ও শিশুর জন্য ₹৬,০০০ সরকারি সাহায্য',
    subtitle: 'কোনো জটিল ফর্ম নেই। মুখে বলে যোগ্যতা যাচাই করুন ও অঙ্গনওয়াড়ি স্লিপ পান।',
    guarantees: ['₹৬,০০০ সরাসরি ব্যাংক অ্যাকাউন্টে', 'দালাল ছাড়া', 'সম্পূর্ণ বিনামূল্যে'],
    listenAloud: 'শুনে নিন',
    exploreScheme: 'যোজনা ও যোগ্যতা দেখুন',
  },
  ta: {
    kicker: 'இந்திய அரசு · மாத்ரு வந்தனா திட்டம்',
    heading: 'தாய் & குழந்தைக்கு ₹6,000 அரசு உதவி',
    subtitle: 'எளிய வழிகாட்டுதல். பேசி உங்கள் தகுதியை அறிந்து அங்கன்வாடி சீட்டு பெறுங்கள்.',
    guarantees: ['₹6,000 நேரடி வங்கி வரவு', 'இடைத்தரகர் இல்லை', '100% இலவச சேவை'],
    listenAloud: 'கேட்கவும்',
    exploreScheme: 'திட்டம் & தகுதி பார்க்க',
  },
  te: {
    kicker: 'భారత ప్రభుత్వం · మాతృ వందన యోజన',
    heading: 'తల్లి & బిడ్డ కోసం ₹6,000 ప్రభుత్వ సహాయం',
    subtitle: 'సులభమైన విధానం. మాట్లాడి మీ అర్హత తెలుసుకొని అంగన్‌వాడీ స్లిప్ పొందండి.',
    guarantees: ['₹6,000 నేరుగా బ్యాంక్ ఖాతాలో', 'మధ్యవర్తులు లేరు', '100% ఉచిత సేవ'],
    listenAloud: 'వినండి',
    exploreScheme: 'పథకం & అర్హత చూడండి',
  },
  kn: {
    kicker: 'ಭಾರತ ಸರ್ಕಾರ · ಮಾತೃ ವಂದನಾ ಯೋಜನೆ',
    heading: 'ತಾಯಿ ಮತ್ತು ಮಗುವಿಗೆ ₹6,000 ಸರ್ಕಾರಿ ನೆರವು',
    subtitle: 'ಯಾವುದೇ ಕಷ್ಟದ ಫಾರ್ಮ್ ಇಲ್ಲ. ಮಾತನಾಡಿ ಅರ್ಹತೆ ತಿಳಿದು ಅಂಗನವಾಡಿ ಸ್ಲಿಪ್ ಪಡೆಯಿರಿ.',
    guarantees: ['₹6,000 ನೇರ ಬ್ಯಾಂಕ್ ಜಮೆ', 'ಮಧ್ಯವರ್ತಿಗಳಿಲ್ಲ', '100% ಉಚಿತ ಸೇವೆ'],
    listenAloud: 'ಆಲಿಸಿ',
    exploreScheme: 'ಯೋಜನೆ & ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ',
  },
  en: {
    kicker: 'Government of India · PMMVY Maternity Scheme',
    heading: '₹6,000 Maternity Aid for Mother & Baby',
    subtitle: 'No complex paperwork. Just speak to check your eligibility and generate your Anganwadi slip.',
    guarantees: ['₹6,000 Direct to Bank DBT', 'Zero Middlemen', '100% Free Service'],
    listenAloud: 'Listen Aloud',
    exploreScheme: 'Check Eligibility & Details',
  },
};

export const WelcomeScreen: React.FC<WelcomeProps> = ({
  status,
  language,
  onTap,
  onLanguageSelect,
  onDirectExplore,
}) => {
  const t = I18N[language] || I18N.hi;
  const content = WELCOME_CONTENT[language] || WELCOME_CONTENT.hi;

  const isActiveAudio = status === 'listening' || status === 'speaking' || status === 'connecting';

  const getStatusLabel = () => {
    if (status === 'listening') return t.listening;
    if (status === 'speaking') return t.speaking;
    if (status === 'connecting') return t.processing;
    return t.tapToTalk;
  };

  const handleTestAudio = () => {
    speechHelper.unlockAudio(true);
    const audioText = `${content.heading}। ${content.subtitle}`;
    speechHelper.speak(audioText, language);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-start py-4 sm:py-6 px-4 max-w-xl mx-auto w-full text-center relative select-none">
      {/* Subtle Atmospheric Ambient Glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-96 h-96 cinematic-glow-ruby pointer-events-none opacity-60" />

      {/* 1. Precise Hero Section */}
      <header className="space-y-2.5 mb-5 relative z-10 max-w-lg mx-auto">
        <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wider text-amber-300/80 uppercase font-mono">
          <span>{content.kicker}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-amber-50 font-serif-cinematic tracking-tight leading-tight">
          {content.heading}
        </h1>

        <p className="text-xs sm:text-sm text-amber-200/80 font-normal leading-relaxed max-w-md mx-auto">
          {content.subtitle}
        </p>

        {/* 3 Core Scheme Guarantees: Clean Unboxed Typography (Zero-Pill Discipline) */}
        <div className="pt-1 flex items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-amber-300/80 font-medium flex-wrap">
          {content.guarantees.map((item, idx) => (
            <React.Fragment key={item}>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{item}</span>
              </span>
              {idx < content.guarantees.length - 1 && (
                <span className="text-amber-500/40 select-none" aria-hidden="true">
                  ·
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </header>

      {/* 2. Focused Talking Companion Area */}
      <section className="my-2 relative z-10 flex flex-col items-center w-full">
        <BigButton
          status={status}
          label={getStatusLabel()}
          subLabel={t.tapToSpeakSub}
          onClick={onTap}
        />

        {/* Dynamic Waveform appears ONLY during active speech/listening */}
        {isActiveAudio && (
          <div className="w-full max-w-md mt-4 animate-in fade-in zoom-in-95 duration-200">
            <WaveformIndicator
              status={status}
              language={language}
              variant="card"
              showStatusLabel
            />
          </div>
        )}
      </section>

      {/* 3. Direct, Balanced Navigation Actions */}
      <nav aria-label="Quick Actions" className="flex items-center justify-center gap-2.5 my-3 relative z-10 flex-wrap">
        {onDirectExplore && !isActiveAudio && (
          <button
            onClick={onDirectExplore}
            type="button"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 hover:from-rose-500 hover:to-amber-500 px-5 py-2.5 rounded-full shadow-lg shadow-rose-950/50 hover:shadow-rose-900/60 transition-all cursor-pointer active:scale-95 border border-amber-300/30"
          >
            <span>{content.exploreScheme}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={handleTestAudio}
          type="button"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-200 hover:text-white bg-[#22101e] hover:bg-[#2e1529] px-4 py-2.5 rounded-full border border-amber-500/25 transition-all cursor-pointer active:scale-95 shadow-sm"
          title={content.listenAloud}
        >
          <Volume2 className="w-4 h-4 text-amber-400" />
          <span>{content.listenAloud}</span>
        </button>
      </nav>

      {/* 4. Daily Maternity Tip Card */}
      {!isActiveAudio && (
        <DailyMaternityTip language={language} className="my-3 w-full" />
      )}

      {/* 5. Clean Segmented Language Switcher */}
      <footer className="w-full mt-4 pt-4 border-t border-amber-500/15 relative z-10 space-y-2">
        <p className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-amber-300/70">
          {t.chooseLanguage}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {LANGUAGES.map((code) => {
            const isSelected = code === language;
            return (
              <button
                key={code}
                onClick={() => onLanguageSelect(code)}
                type="button"
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md shadow-rose-600/30 scale-105 border border-amber-300/40'
                    : 'bg-[#1a0c16] hover:bg-[#261220] text-amber-200 border border-amber-500/20'
                }`}
              >
                {getLanguageName(code)}
              </button>
            );
          })}
        </div>

        {/* Quiet Reassurance */}
        <p className="text-[11px] text-amber-300/60 pt-1.5 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t.freeGovtHelp}</span>
        </p>
      </footer>
    </div>
  );
};
