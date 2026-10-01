/**
 * EmergencyCallModal: High-visibility simulated automated emergency call
 * Connects low-literacy rural mothers to their nearest Anganwadi centre
 * and 24x7 Government Emergency line with simplified interactive voice response (IVR).
 */

import React, { useState, useEffect, useRef } from 'react';
import { LanguageCode, Centre } from '../../shared/types.js';
import { I18N } from '../../shared/i18n.js';
import { speechHelper } from '../voice/speechHelper.js';
import {
  PhoneCall,
  PhoneOff,
  AlertTriangle,
  Volume2,
  VolumeX,
  X,
  Building2,
  Ambulance,
  HeartHandshake,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface EmergencyCallModalProps {
  isOpen: boolean;
  language: LanguageCode;
  nearestCentre?: Centre | null;
  onClose: () => void;
}

type CallPhase = 'dialing' | 'connected' | 'ended';

interface AutomatedDialogue {
  intro: string;
  medical: string;
  anganwadi: string;
  scheme: string;
}

const EMERGENCY_TEXTS: Record<LanguageCode, AutomatedDialogue> = {
  hi: {
    intro: 'नमस्ते बहन! यह आपातकालीन सहायता लाइन है। घबराइए नहीं, आपकी पूरी मदद की जाएगी। अगर आपको तुरंत एम्बुलेंस या प्रसव सहायता चाहिए तो 1 दबाएँ। नजदीकी आंगनवाड़ी दीदी से बात करने के लिए 2 दबाएँ। योजना और पर्ची सहायता के लिए 3 दबाएँ।',
    medical: 'एम्बुलेंस और मेडिकल आपातकालीन टीम को अलर्ट भेजा गया है। तुरंत 108 या 112 पर बात करें। शांत रहें और गहरी साँस लें।',
    anganwadi: 'आपके नजदीकी आंगनवाड़ी केंद्र और आशा दीदी को सूचना दे दी गई है। वे आपके प्राथमिक स्वास्थ्य केंद्र पर आपकी मदद के लिए तैयार हैं।',
    scheme: 'प्रधानमंत्री मातृ वंदना योजना सहायता केंद्र से संपर्क हो गया है। राष्ट्रीय हेल्पलाइन 14445 पर आपकी पर्ची की स्थिति देखी जा रही है।',
  },
  mr: {
    intro: 'नमस्कार ताई! ही तात्काळ शासकीय मदत सेवा आहे. काळजी करू नका, आम्ही आपल्या मदतीसाठी आहोत. प्रसूती किंवा वैद्यकीय मदतीसाठी १ दाबा. अंगणवाडी सेविकेशी बोलण्यासाठी २ दाबा. योजनेच्या मदतीसाठी ३ दाबा.',
    medical: 'रुग्णवाहिका आणि वैद्यकीय पथकाला संदेश पाठवला आहे. तातडीने १०८ किंवा ११२ वर कॉल करा.',
    anganwadi: 'आपल्या जवळच्या अंगणवाडी सेविकेला आणि आशा ताईला माहिती दिली आहे. त्या आपल्या मदतीस तयार आहेत.',
    scheme: 'मातृ वंदना योजना हेल्पलाईन १४४४५ शी संपर्क झाला आहे.',
  },
  bn: {
    intro: 'নমস্কার দিদি! এটি সরকারি জরুরি সহায়তা লাইন। কোনো চিন্তা করবেন না। জরুরি অ্যাম্বুলেন্স বা প্রসব সহায়তার জন্য ১ চাপুন। অঙ্গনওয়াড়ি কর্মীর সাথে কথা বলতে ২ চাপুন।',
    medical: 'জরুরি অ্যাম্বুলেন্সের জন্য ১০৮ বা ১১২ নম্বরে সরাসরি কথা বলুন।',
    anganwadi: 'আপনার নিকটবর্তী অঙ্গনওয়াড়ি দিদিকে জানানো হয়েছে। তিনি আপনাকে সাহায্য করবেন।',
    scheme: 'মাতৃ বন্দনা যোজনা ১৪৪৪৫ নম্বরে যোগাযোগ করা হচ্ছে।',
  },
  ta: {
    intro: 'வணக்கம் சகோதரி! இது அவசர உதவி மையம். பயப்பட வேண்டாம். ஆம்புலன்ஸ் தேவைக்கு 1 அழுத்தவும். அங்கன்வாடி ஊழியருடன் பேச 2 அழுத்தவும். திட்ட உதவிக்கு 3 அழுத்தவும்.',
    medical: 'மருத்துவ அவசர உதவிக்கு உடனடியாக 108 அல்லது 112 அழைக்கவும்.',
    anganwadi: 'அருகிலுள்ள அங்கன்வாடி மற்றும் ஆஷா ஊழியர் உங்களுக்கு உதவ தயாராக உள்ளனர்.',
    scheme: 'மாத்ரு வந்தனா உதவி எண் 14445 உடன் இணைக்கப்படுகிறது.',
  },
  te: {
    intro: 'నమస్కారం సోదరి! ఇది అత్యవసర సహాయ కేంద్రం. ఆందోళన చెందవద్దు. అంబులెన్స్ లేదా ప్రసవ సహాయం కోసం 1 నొక్కండి. అంగన్‌వాడీ కార్యకర్తతో మాట్లాడటానికి 2 నొక్కండి.',
    medical: 'వైద్య అత్యవసర సహాయం కోసం వెంటనే 108 లేదా 112 డయల్ చేయండి.',
    anganwadi: 'మీ సమీప అంగన్‌వాడీ మరియు ఆశా కార్యకర్తకు సమాచారం అందించబడింది.',
    scheme: 'మాతృ వందన యోజన 14445 హెల్ప్‌లైన్‌కు అనుసంధానించబడింది.',
  },
  kn: {
    intro: 'ನಮಸ್ಕಾರ ತಂಗಿ! ಇದು ತುರ್ತು ಸಹಾಯವಾಣಿ. ಆತಂಕಪಡಬೇಡಿ. ಆಂಬ್ಯುಲೆನ್ಸ್ ಸಹಾಯಕ್ಕಾಗಿ 1 ಒತ್ತಿರಿ. ಅಂಗನವಾಡಿ ಕಾರ್ಯಕರ್ತೆಯೊಂದಿಗೆ ಮಾತನಾಡಲು 2 ಒತ್ತಿರಿ.',
    medical: 'ತುರ್ತು ವೈದ್ಯಕೀಯ ನೆರವಿಗಾಗಿ 108 ಅಥವಾ 112 ಗೆ ಕರೆ ಮಾಡಿ.',
    anganwadi: 'ಹತ್ತಿರದ ಅಂಗನವಾಡಿ ಮತ್ತು ಆಶಾ ಕಾರ್ಯಕರ್ತೆಗೆ ಮಾಹಿತಿ ನೀಡಲಾಗಿದೆ.',
    scheme: 'ಮಾತೃ ವಂದನಾ ಸಹಾಯವಾಣಿ 14445 ಗೆ ಸಂಪರ್ಕ ಕಲ್ಪಿಸಲಾಗಿದೆ.',
  },
  en: {
    intro: 'Namaste sister! This is the Government Emergency Maternity Helpline. Please do not worry, we are right here to help you. For immediate ambulance or medical emergency, press 1. To connect with your nearest Anganwadi worker, press 2. For scheme and slip assistance, press 3.',
    medical: 'Medical emergency alert triggered. Please dial 108 or 112 immediately. Keep calm and take deep breaths.',
    anganwadi: 'Your nearest Anganwadi centre and ASHA worker have been alerted. They are available at your local Health Sub-Centre.',
    scheme: 'Connected to PMMVY National Support Desk. You can verify your slip status on toll-free 14445.',
  },
};

export const EmergencyCallModal: React.FC<EmergencyCallModalProps> = ({
  isOpen,
  language,
  nearestCentre,
  onClose,
}) => {
  const [phase, setPhase] = useState<CallPhase>('dialing');
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [activeMessage, setActiveMessage] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const ringOscillatorRef = useRef<any>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<any>(null);

  const dialogue = EMERGENCY_TEXTS[language] || EMERGENCY_TEXTS.hi;

  // Stop simulated ring tone sound
  const stopRingTone = () => {
    if (ringOscillatorRef.current) {
      try {
        ringOscillatorRef.current.stop();
        ringOscillatorRef.current.disconnect();
      } catch (_) {}
      ringOscillatorRef.current = null;
    }
  };

  // Start simulated phone ring sound via Web Audio API
  const startSimulatedRingTone = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);

      // Pulse ring pattern (0.8s on, 1.2s off)
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.1);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.8);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      ringOscillatorRef.current = osc;
    } catch (_) {
      // Audio fallback silent
    }
  };

  useEffect(() => {
    if (!isOpen) {
      stopRingTone();
      speechHelper.stopSpeaking();
      if (timerRef.current) clearInterval(timerRef.current);
      setPhase('dialing');
      setSeconds(0);
      setSelectedOption(null);
      return;
    }

    // Initialize call flow
    setPhase('dialing');
    setSeconds(0);
    setSelectedOption(null);
    setActiveMessage(dialogue.intro);

    // 1. Play simulated ringing
    startSimulatedRingTone();

    // 2. Connect after 2.4s
    const connectTimer = setTimeout(() => {
      stopRingTone();
      setPhase('connected');

      // Speak introductory guidance
      if (!isMuted) {
        speechHelper.unlockAudio(false);
        speechHelper.speak(dialogue.intro, language);
      }

      // Start call duration timer
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }, 2400);

    return () => {
      clearTimeout(connectTimer);
      stopRingTone();
      speechHelper.stopSpeaking();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, language]);

  const handleSelectOption = (opt: number) => {
    setSelectedOption(opt);
    let msg = '';
    if (opt === 1) {
      msg = dialogue.medical;
    } else if (opt === 2) {
      msg = dialogue.anganwadi;
    } else if (opt === 3) {
      msg = dialogue.scheme;
    }
    setActiveMessage(msg);

    if (!isMuted) {
      speechHelper.stopSpeaking();
      speechHelper.speak(msg, language);
    }
  };

  const handleEndCall = () => {
    stopRingTone();
    speechHelper.stopSpeaking();
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase('ended');
    setTimeout(() => {
      onClose();
    }, 400);
  };

  const toggleMute = () => {
    if (!isMuted) {
      speechHelper.stopSpeaking();
      setIsMuted(true);
    } else {
      setIsMuted(false);
      speechHelper.speak(activeMessage, language);
    }
  };

  if (!isOpen) return null;

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const centreName = nearestCentre?.name || 'प्राथमिक स्वास्थ्य केंद्र एवं आंगनवाड़ी वार्ड ४';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Emergency Assistance Call"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#2b0d1e] via-[#1a0813] to-[#0d040a] rounded-3xl border-2 border-red-500/60 shadow-2xl shadow-red-950/80 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Emergency Beacon Bar */}
        <div className="bg-red-600 px-4 py-2 flex items-center justify-between text-white font-bold text-xs uppercase tracking-wider shadow-md">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            <span>🚨 24x7 Government Maternity Emergency Line</span>
          </div>
          <button
            onClick={handleEndCall}
            className="p-1 hover:bg-red-700 rounded-full transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 flex-1 overflow-y-auto space-y-5">
          {/* Dialing Screen */}
          {phase === 'dialing' && (
            <div className="text-center py-8 space-y-4">
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping duration-1000" />
                <div className="absolute inset-0 rounded-full bg-amber-500/20 animate-pulse" />
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-600 via-rose-600 to-amber-500 flex items-center justify-center text-white shadow-xl shadow-red-900/50">
                  <PhoneCall className="w-10 h-10 animate-bounce" />
                </div>
              </div>

              <div>
                <p className="text-xs uppercase font-bold text-amber-300 tracking-wider">
                  {language === 'en' ? 'Connecting Call...' : 'कॉल लग रहा है...'}
                </p>
                <h3 className="text-lg sm:text-xl font-bold font-serif-cinematic text-white mt-1">
                  {language === 'en' ? 'Nearest Anganwadi & Emergency Line' : 'नजदीकी आंगनवाड़ी व आपातकालीन हेल्पलाइन'}
                </h3>
                <p className="text-xs text-amber-200/70 mt-1">
                  {centreName} (14445 / 112)
                </p>
              </div>
            </div>
          )}

          {/* Connected Call Screen */}
          {phase === 'connected' && (
            <div className="space-y-4">
              {/* Call Status & Timer */}
              <div className="bg-black/40 rounded-2xl p-3 border border-red-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-emerald-300">
                    {language === 'en' ? 'CALL ACTIVE' : 'कॉल सक्रिय है (सहायता चालू)'}
                  </span>
                </div>
                <div className="font-mono text-sm font-bold text-amber-200">
                  ⏱️ {formatTimer(seconds)}
                </div>
                <button
                  onClick={toggleMute}
                  type="button"
                  className="flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-500/30 cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
                  <span>{isMuted ? 'Unmute' : 'Mute'}</span>
                </button>
              </div>

              {/* Spoken Operator Voice Box */}
              <div className="bg-[#1f0d1b] border-2 border-amber-500/40 rounded-2xl p-4 relative shadow-lg">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-amber-300">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-spin duration-3000" />
                  <span>
                    {language === 'en' ? 'Automated Government Voice Guidance:' : 'आपातकालीन सहायता निर्देश (बोलकर सुनें):'}
                  </span>
                </div>
                <p className="text-sm font-medium text-amber-50 leading-relaxed">
                  {activeMessage}
                </p>
              </div>

              {/* 3 Large Accessible 1-Tap Option Cards */}
              <div className="space-y-2.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-amber-300 text-center">
                  {language === 'en' ? 'Choose assistance required (Tap any option):' : 'आवश्यक सहायता चुनें (नीचे दिए विकल्प पर छुएँ):'}
                </p>

                {/* Option 1: Immediate Medical / Ambulance 108 / 112 */}
                <button
                  onClick={() => handleSelectOption(1)}
                  type="button"
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    selectedOption === 1
                      ? 'bg-red-950/90 border-red-400 ring-2 ring-red-400/50 text-white'
                      : 'bg-black/35 hover:bg-black/55 border-red-500/30 text-rose-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shrink-0 shadow-md">
                      <Ambulance className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">
                        {language === 'en' ? '1. Immediate Medical / Ambulance' : '१. मेडिकल व प्रसव आपातकाल (Ambulance 108/112)'}
                      </h4>
                      <p className="text-[11px] text-rose-200/75 mt-0.5">
                        {language === 'en' ? 'Hospital, labour pain or emergency vehicle' : 'प्रसव पीड़ा, अस्पताल या त्वरित एम्बुलेंस'}
                      </p>
                    </div>
                  </div>
                  <a
                    href="tel:108"
                    onClick={(e) => e.stopPropagation()}
                    className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-xs"
                  >
                    Call 108
                  </a>
                </button>

                {/* Option 2: Nearest Anganwadi & ASHA Didi */}
                <button
                  onClick={() => handleSelectOption(2)}
                  type="button"
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    selectedOption === 2
                      ? 'bg-amber-950/90 border-amber-400 ring-2 ring-amber-400/50 text-white'
                      : 'bg-black/35 hover:bg-black/55 border-amber-500/30 text-amber-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-white shrink-0 shadow-md">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">
                        {language === 'en' ? '2. Nearest Anganwadi & ASHA Worker' : '२. नजदीकी आंगनवाड़ी व आशा दीदी'}
                      </h4>
                      <p className="text-[11px] text-amber-200/75 mt-0.5">
                        {centreName}
                      </p>
                    </div>
                  </div>
                  <CheckCircle2 className={`w-5 h-5 ${selectedOption === 2 ? 'text-amber-400' : 'text-stone-500'}`} />
                </button>

                {/* Option 3: PMMVY Official Scheme Helpdesk 14445 */}
                <button
                  onClick={() => handleSelectOption(3)}
                  type="button"
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    selectedOption === 3
                      ? 'bg-emerald-950/90 border-emerald-400 ring-2 ring-emerald-400/50 text-white'
                      : 'bg-black/35 hover:bg-black/55 border-emerald-500/30 text-emerald-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-md">
                      <HeartHandshake className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">
                        {language === 'en' ? '3. PMMVY ₹6,000 Scheme Support' : '३. मातृ वंदना योजना व पर्ची सहायता'}
                      </h4>
                      <p className="text-[11px] text-emerald-200/75 mt-0.5">
                        {language === 'en' ? 'Toll-free national hotline 14445' : 'राष्ट्रीय टोल-फ्री हेल्पलाइन 14445'}
                      </p>
                    </div>
                  </div>
                  <a
                    href="tel:14445"
                    onClick={(e) => e.stopPropagation()}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-xs"
                  >
                    Call 14445
                  </a>
                </button>
              </div>

              {/* Direct Real Phone Dialing Fallback */}
              <div className="bg-black/25 p-3 rounded-2xl border border-amber-500/20 text-center space-y-1.5">
                <p className="text-[11px] text-amber-200/70 font-medium">
                  {language === 'en'
                    ? 'Want to make a real phone call from your mobile SIM?'
                    : 'अपने फोन सिम से सीधे सरकारी हेल्पलाइन पर कॉल करना चाहती हैं?'}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <a
                    href="tel:14445"
                    className="inline-flex items-center gap-1 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>PMMVY: 14445</span>
                  </a>
                  <a
                    href="tel:181"
                    className="inline-flex items-center gap-1 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>महिला हेल्पलाइन: 181</span>
                  </a>
                  <a
                    href="tel:112"
                    className="inline-flex items-center gap-1 bg-red-700 hover:bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Emergency: 112</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Red End Call Bar */}
        <div className="p-4 bg-black/60 border-t border-red-500/30 flex items-center justify-center">
          <button
            onClick={handleEndCall}
            type="button"
            className="w-full max-w-xs flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold py-3 px-6 rounded-2xl shadow-xl transition-all cursor-pointer active:scale-95 text-sm sm:text-base border border-red-400/50"
          >
            <PhoneOff className="w-5 h-5" />
            <span>{language === 'en' ? 'End Emergency Call' : 'कॉल समाप्त करें (End Call)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
