/**
 * AnganwadiVoiceMessage: Spoken audio letter for the Anganwadi Didi
 * Eliminates fear & intimidation: the mother simply plays this audio note at the counter
 */

import React, { useState } from 'react';
import { JourneyState, LanguageCode } from '../../shared/types.js';
import { speechHelper } from '../voice/speechHelper.js';
import { Play, Square, Volume2, HeartHandshake, CheckCircle2 } from 'lucide-react';

interface AnganwadiVoiceMessageProps {
  state: JourneyState;
  language: LanguageCode;
}

export const AnganwadiVoiceMessage: React.FC<AnganwadiVoiceMessageProps> = ({
  state,
  language,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const motherName = state.sheet.motherName || 'बहन';
  const amount = state.eligibility?.amountRupees || 5000;
  const isFirstChild = state.eligibility?.childOrder === 1;

  // Spoken letter in native language crafted with immense respect and clarity
  const messageScript: Record<LanguageCode, string> = {
    hi: `नमस्ते आंगनवाड़ी दीदी! यह पर्ची ${motherName} जी की है। यह प्रधानमंत्री मातृ वंदना योजना के तहत ₹${amount} की सहायता लेने आई हैं। इनके पास आवश्यक कागज़ात तैयार हैं। कृपया इनका फॉर्म ऑनलाइन पोर्टल पर पंजीकृत करने में सहयोग करें। धन्यवाद!`,
    mr: `नमस्कार अंगणवाडी ताई! ही पावती ${motherName} यांची आहे. त्या मातृ वंदना योजनेतून ₹${amount} चे अनुदान मिळवण्यासाठी आल्या आहेत. त्यांची आवश्यक कागदपत्रे तयार आहेत. कृपया त्यांचे फॉर्म भरण्यास मदत करावी. धन्यवाद!`,
    bn: `নমস্কার অঙ্গনওয়াড়ি দিদি! এই স্লিপটি ${motherName}-এর। উনি মাতৃ বন্দনা প্রকল্পে ₹${amount} আর্থিক সাহায্য পেতে এসেছেন। ওনার কাগজপত্র প্রস্তুত আছে। দয়া করে ওনার ফর্ম পূরণে সাহায্য করুন। ধন্যবাদ!`,
    ta: `வணக்கம் அங்கன்வாடி பணியாளர் அக்கா! இந்த சீட்டு ${motherName} அவர்களுடையது. மாத்ரு வந்தனா திட்டத்தில் ₹${amount} உதவித்தொகை பெற வந்துள்ளார். தேவையான ஆவணங்கள் தயாராக உள்ளன. தயவுசெய்து படிவத்தை நிரப்ப உதவுங்கள். நன்றி!`,
    te: `నమస్కారం అంగన్‌వాడీ అక్కా! ఈ రశీదు ${motherName} గారిది. వీరు మాతృ వందన పథకం ద్వారా ₹${amount} సహాయం పొందడానికి వచ్చారు. వీరి పత్రాలు సిద్ధంగా ఉన్నాయి. దయచేసి ఫారం నమోదు చేయడంలో సహాయం చేయండి. ధన్యవాదాలు!`,
    kn: `ನಮಸ್ಕಾರ ಅಂಗನವಾಡಿ ಅಕ್ಕ! ಈ ಚೀಟಿ ${motherName} ಅವರದ್ದು. ಮಾತೃ ವಂದನಾ ಯೋಜನೆಯಿಂದ ₹${amount} ನೆರವು ಪಡೆಯಲು ಬಂದಿದ್ದಾರೆ. ಅಗತ್ಯ ದಾಖಲೆಗಳು ಸಿದ್ಧವಾಗಿವೆ. ದಯವಿಟ್ಟು ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ನೆರವಾಗಿ. ಧನ್ಯವಾದಗಳು!`,
    en: `Hello Anganwadi Worker Didi! This slip is for ${motherName}. She is applying for the maternity benefit of ₹${amount} under PMMVY. Her documents are ready. Please assist her in completing the online registration. Thank you!`,
  };

  const textToSpeak = messageScript[language] || messageScript.hi;

  const handleTogglePlay = () => {
    if (isPlaying) {
      speechHelper.stopSpeaking();
      setIsPlaying(false);
    } else {
      speechHelper.unlockAudio(true);
      speechHelper.speak(
        textToSpeak,
        language,
        () => setIsPlaying(true),
        () => setIsPlaying(false)
      );
    }
  };

  return (
    <div className="w-full rounded-2xl bg-gradient-to-r from-amber-950/60 via-[#271223] to-rose-950/60 border border-amber-400/40 p-4 sm:p-5 shadow-xl space-y-3.5 relative overflow-hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-100 flex items-center gap-1.5">
              <span>आंगनवाड़ी कार्यकर्ता के लिए संदेश</span>
              <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full border border-rose-400/30">
                Audio Slip
              </span>
            </h4>
            <p className="text-[11px] text-amber-200/70">
              {language === 'en'
                ? 'Play this audio for the Anganwadi worker at the centre'
                : 'केंद्र पर जाकर यह ऑडियो आंगनवाड़ी कार्यकर्ता को सुनाएँ'}
            </p>
          </div>
        </div>

        {/* Big Audio Play Button */}
        <button
          onClick={handleTogglePlay}
          type="button"
          className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-lg transition-all active:scale-95 cursor-pointer ${
            isPlaying
              ? 'bg-rose-600 animate-pulse ring-2 ring-rose-400/50'
              : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500'
          }`}
        >
          {isPlaying ? (
            <>
              <Square className="w-4 h-4 fill-current" />
              <span>रोकें (Stop)</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>सुनाएँ (Play)</span>
            </>
          )}
        </button>
      </div>

      {/* Spoken Script Preview */}
      <div className="bg-black/30 rounded-xl p-3 border border-amber-500/15 text-xs text-amber-200/90 leading-relaxed italic">
        "{textToSpeak}"
      </div>
    </div>
  );
};
