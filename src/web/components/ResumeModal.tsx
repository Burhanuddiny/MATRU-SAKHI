/**
 * ResumeModal component: Enter or speak 6-digit code with cinematic styling
 */

import React, { useState } from 'react';
import { X, KeyRound, Loader2 } from 'lucide-react';
import { LanguageCode } from '../../shared/types.js';
import { I18N } from '../../shared/i18n.js';

interface ResumeModalProps {
  language: LanguageCode;
  onClose: () => void;
  onResume: (code: string) => Promise<boolean>;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  language,
  onClose,
  onResume,
}) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = I18N[language] || I18N.hi;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError('कृपया पूरा ६ अंकों का कोड दर्ज करें');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const success = await onResume(code);
      if (!success) {
        setError('यह कोड नहीं मिला। कृपया कोड दोबारा जांचें।');
      } else {
        onClose();
      }
    } catch (_) {
      setError('सत्र प्राप्त करने में त्रुटि हुई');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="cinematic-panel rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-amber-500/40 shadow-2xl relative text-amber-50">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-amber-200 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center mx-auto border border-amber-500/30">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold font-serif-cinematic text-amber-100">
            {t.resumePrompt}
          </h2>
          <p className="text-xs text-amber-200/70">
            अपनी पिछली पर्ची का 6-अंकों का कोड दर्ज करें
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              placeholder="123456"
              className="w-full text-center text-3xl font-mono font-bold tracking-widest py-3 px-4 rounded-2xl border border-amber-500/40 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/40 outline-hidden bg-[#10060e] text-amber-300 shadow-inner"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-xs text-rose-400 font-semibold text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading || code.length !== 6}
            className="w-full bg-gradient-to-r from-rose-500 via-amber-500 to-orange-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold py-3.5 rounded-2xl shadow-lg transition-all cursor-pointer disabled:opacity-40 flex items-center justify-center gap-2 border border-amber-300/30 active:scale-95"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <span>शुरू करें (Continue)</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
