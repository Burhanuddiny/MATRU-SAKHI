/**
 * Captions component: Cinematic speech transcript with accessibility aria-live support
 */

import React, { useEffect, useRef } from 'react';
import { CaptionEntry } from '../../shared/types.js';
import { HeartHandshake, User, Volume2 } from 'lucide-react';

interface CaptionsProps {
  captions: CaptionEntry[];
  isSpeaking?: boolean;
}

export const Captions: React.FC<CaptionsProps> = ({ captions, isSpeaking }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [captions]);

  if (captions.length === 0) {
    return null;
  }

  // Display the last 3 captions
  const visibleCaptions = captions.slice(-3);

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="w-full max-w-2xl mx-auto px-4 py-2"
    >
      <div
        ref={scrollRef}
        className="space-y-3 max-h-48 overflow-y-auto no-scrollbar scroll-smooth"
      >
        {visibleCaptions.map((cap) => {
          const isSaheli = cap.who === 'saheli';
          return (
            <div
              key={cap.id}
              className={`flex items-start gap-3 ${
                isSaheli ? 'justify-start' : 'justify-end'
              }`}
            >
              {isSaheli && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 text-white flex items-center justify-center shrink-0 shadow-md mt-0.5 ring-1 ring-amber-300/40">
                  <HeartHandshake className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-lg text-sm sm:text-base leading-relaxed ${
                  isSaheli
                    ? 'bg-[#220f1c]/90 border border-amber-500/30 text-amber-50 font-medium'
                    : 'bg-gradient-to-r from-amber-600 to-orange-600 text-white font-medium rounded-tr-xs shadow-amber-600/30'
                }`}
              >
                <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-bold mb-1 opacity-80">
                  {isSaheli ? (
                    <>
                      <span className="text-amber-300">सहेली (Saheli)</span>
                      {isSpeaking && <Volume2 className="w-3 h-3 text-rose-400 animate-pulse" />}
                    </>
                  ) : (
                    <span className="text-amber-100">आप (You)</span>
                  )}
                </div>
                <p className="text-sm sm:text-base leading-relaxed">{cap.text}</p>
              </div>

              {!isSaheli && (
                <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-md mt-0.5 ring-1 ring-amber-400/40">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
