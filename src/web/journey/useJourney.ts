/**
 * useJourney: Master hook orchestrating journey state, transports, and tool execution
 */

import { useReducer, useEffect, useRef, useState, useCallback } from 'react';
import { journeyReducer, INITIAL_JOURNEY_STATE } from './reducer.js';
import { dispatchToolCall } from './dispatcher.js';
import { AgentTransport, TransportStatus } from '../transport/AgentTransport.js';
import { LiveTransport } from '../voice/LiveTransport.js';
import { TextTransport } from '../transport/TextTransport.js';
import { speechHelper } from '../voice/speechHelper.js';
import { I18N } from '../../shared/i18n.js';
import { LanguageCode, DocumentId, Step } from '../../shared/types.js';

export function useJourney() {
  const [state, dispatch] = useReducer(journeyReducer, INITIAL_JOURNEY_STATE);
  const [transportMode, setTransportMode] = useState<'voice' | 'text'>('voice');
  const [status, setStatus] = useState<TransportStatus>('closed');
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const transportRef = useRef<AgentTransport | null>(null);

  // Initialize transport instance
  const getTransport = useCallback((): AgentTransport => {
    if (!transportRef.current) {
      const transport = transportMode === 'voice' ? new LiveTransport() : new TextTransport();

      transport.on('status', (newStatus) => {
        setStatus(newStatus);
        dispatch({ type: 'SET_BUSY', busy: newStatus === 'speaking' || newStatus === 'connecting' });
      });

      transport.on('caption', (cap) => {
        dispatch({ type: 'ADD_CAPTION', caption: cap });
      });

      transport.on('toolCall', async (calls) => {
        const responses = [];
        for (const call of calls) {
          const res = await dispatchToolCall(call, state, dispatch);
          responses.push(res);
        }
        if (responses.length > 0) {
          transport.sendToolResponse(responses);
        }
      });

      transportRef.current = transport;
    }
    return transportRef.current;
  }, [transportMode, state]);

  // Start or trigger audio/transport
  const startJourney = useCallback(async () => {
    try {
      const transport = getTransport();
      await transport.start(state);
    } catch (err) {
      console.warn('Failed to start voice transport, switching to text mode:', err);
      setTransportMode('text');
      const textTransport = new TextTransport();
      transportRef.current = textTransport;
      await textTransport.start(state);
    }
  }, [getTransport, state]);

  // Handle tap on BigButton
  const handleBigButtonTap = useCallback(() => {
    // Unlock device audio hardware immediately within synchronous user gesture
    speechHelper.unlockAudio(true);

    const transport = getTransport();
    if (status === 'closed') {
      startJourney();
    } else if (status === 'speaking') {
      // Barge-in: interrupt speech
      transport.interrupt();
    } else if (status === 'listening') {
      // Prompt user or start talking
      transport.sendText('नमस्ते');
    }
  }, [getTransport, status, startJourney]);

  // Send spoken or typed text
  const sendUserMessage = useCallback(
    async (text: string) => {
      const transport = getTransport();
      await transport.sendText(text);
    },
    [getTransport]
  );

  // Repeat last message spoken by Saheli
  const handleRepeat = useCallback(() => {
    const lastSaheliCaption = [...state.captions].reverse().find((c) => c.who === 'saheli');
    if (lastSaheliCaption) {
      const transport = getTransport();
      if (transport instanceof LiveTransport) {
        transport.speakMessage(lastSaheliCaption.text, state.language);
      }
    } else {
      sendUserMessage('फिर से बताएं');
    }
  }, [state.captions, state.language, getTransport, sendUserMessage]);

  // Go back to previous step
  const handleBack = useCallback(() => {
    const stepOrder: Step[] = [
      'welcome',
      'about',
      'eligibility',
      'result',
      'documents',
      'prepare',
      'centre',
      'portal',
      'done',
    ];
    const currentIndex = stepOrder.indexOf(state.step);
    if (currentIndex > 0) {
      const prevStep = stepOrder[currentIndex - 1];
      dispatch({ type: 'SET_STEP', step: prevStep });
    }
  }, [state.step]);

  // Language change
  const setLanguage = useCallback((lang: LanguageCode) => {
    speechHelper.unlockAudio(false);
    dispatch({ type: 'SET_LANGUAGE', language: lang });
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
    if (status === 'speaking' || status === 'listening') {
      const greeting = I18N[lang]?.greetingVoice || 'नमस्ते!';
      speechHelper.speak(greeting, lang);
    }
  }, [status]);

  // Step change
  const setStep = useCallback((step: Step) => {
    dispatch({ type: 'SET_STEP', step });
  }, []);

  // Resume previous session by code
  const resumeByCode = useCallback(async (code: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/journeys/${encodeURIComponent(code)}`);
      if (!res.ok) return false;
      const data = await res.json();
      if (data && data.journey) {
        const j = data.journey;
        dispatch({
          type: 'RESTORE_JOURNEY',
          state: {
            step: j.step || 'done',
            language: (j.language as LanguageCode) || 'hi',
            eligibility: j.eligibility,
            checklist: j.checklist || INITIAL_JOURNEY_STATE.checklist,
            sheet: j.sheet || {},
            resumeCode: j.code,
          },
        });
        return true;
      }
      return false;
    } catch (_) {
      return false;
    }
  }, []);

  // Reset journey
  const resetJourney = useCallback(() => {
    if (transportRef.current) {
      transportRef.current.stop();
      transportRef.current = null;
    }
    setStatus('closed');
    dispatch({ type: 'RESET_JOURNEY' });
  }, []);

  return {
    state,
    dispatch,
    status,
    transportMode,
    setTransportMode,
    startJourney,
    handleBigButtonTap,
    sendUserMessage,
    handleRepeat,
    handleBack,
    setLanguage,
    setStep,
    isResumeModalOpen,
    setIsResumeModalOpen,
    resumeByCode,
    resetJourney,
  };
}
