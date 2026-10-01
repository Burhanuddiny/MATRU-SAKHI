/**
 * ReadAloudButton: One-tap voice narrator button for rural mothers
 * Reads any screen instruction aloud in her mother tongue
 */

import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { speechHelper } from '../voice/speechHelper.js';
import { LanguageCode } from '../../shared/types.js';
import { I18N } from '../../shared/i18n.js';

interface ReadAloudButtonProps {
  textToSpeak: string;
  language: LanguageCode;
  className?: string;
  label?: string;
}

export const ReadAloudButton: React.FC<ReadAloudButtonProps> = ({
  textToSpeak,
  language,
  className = '',
  label,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const t = I18N[language] || I18N.hi;

  const handleToggleSpeak = () => {
    speechHelper.unlockAudio(true);
    if (isSpeaking) {
      speechHelper.stopSpeaking();
      setIsSpeaking(false);
    } else {
      speechHelper.speak(
        textToSpeak,
        language,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  return (
    <button
      onClick={handleToggleSpeak}
      type="button"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 select-none ${
        isSpeaking
          ? 'bg-rose-600 text-white ring-2 ring-rose-400/50 shadow-rose-600/30'
          : 'bg-[#251220] hover:bg-[#32172b] text-amber-200 border border-amber-500/30'
      } ${className}`}
      title={label || t.readAloud}
      aria-label={label || t.readAloud}
    >
      {isSpeaking ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-white animate-bounce" />
          <span>सुन रही हैं...</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-amber-400" />
          <span>{label || t.readAloud}</span>
        </>
      )}
    </button>
  );
};
