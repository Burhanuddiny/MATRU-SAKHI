/**
 * Saheli: Main Application Entry Point with Cinematic Gradient Theme
 * Voice-first maternity companion for women using the internet for the first time
 */

import React, { useState } from 'react';
import { useJourney } from './web/journey/useJourney.js';
import { Header } from './web/components/Header.js';
import { Captions } from './web/components/Captions.js';
import { BigButton } from './web/components/BigButton.js';
import { WaveformIndicator } from './web/components/WaveformIndicator.js';
import { CameraSheet } from './web/components/CameraSheet.js';
import { ResumeModal } from './web/components/ResumeModal.js';
import { HelplineModal } from './web/components/HelplineModal.js';
import { EmergencyCallModal } from './web/components/EmergencyCallModal.js';
import { StepProgressBar } from './web/components/StepProgressBar.js';
import { WelcomeScreen } from './web/screens/Welcome.js';
import { AboutScreen } from './web/screens/About.js';
import { EligibilityScreen } from './web/screens/Eligibility.js';
import { ResultScreen } from './web/screens/Result.js';
import { DocumentsScreen } from './web/screens/Documents.js';
import { PrepareScreen } from './web/screens/Prepare.js';
import { CentreScreen } from './web/screens/Centre.js';
import { PortalScreen } from './web/screens/Portal.js';
import { DoneScreen } from './web/screens/Done.js';
import { I18N } from './shared/i18n.js';
import { DocumentId, Step } from './shared/types.js';
import { RotateCcw, ArrowLeft, Send, MessageSquare } from 'lucide-react';

export default function App() {
  const {
    state,
    dispatch,
    status,
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
  } = useJourney();

  const [typedMessage, setTypedMessage] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);
  const [isHelplineOpen, setIsHelplineOpen] = useState(false);
  const [isEmergencyCallOpen, setIsEmergencyCallOpen] = useState(false);

  const t = I18N[state.language] || I18N.hi;

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typedMessage.trim()) {
      sendUserMessage(typedMessage.trim());
      setTypedMessage('');
      setShowTextInput(false);
    }
  };

  const handleDocumentToggle = (docId: DocumentId, currentStatus: 'have' | 'missing' | 'unknown') => {
    const nextStatus = currentStatus === 'have' ? 'missing' : 'have';
    dispatch({ type: 'UPDATE_CHECKLIST', documentId: docId, status: nextStatus });
  };

  return (
    <div className="min-h-screen cinematic-bg flex flex-col justify-between text-amber-50 font-sans antialiased selection:bg-rose-500 selection:text-white relative overflow-hidden">
      {/* Top Application Header with Live Stage Indicator */}
      <Header
        currentStep={state.step}
        language={state.language}
        onLanguageChange={setLanguage}
        onResumeClick={() => setIsResumeModalOpen(true)}
        onResetClick={resetJourney}
        onStepClick={(step: Step) => setStep(step)}
        onHelplineClick={() => setIsHelplineOpen(true)}
        onEmergencyClick={() => setIsEmergencyCallOpen(true)}
      />

      {/* Main Journey Screen Viewport */}
      <main className="flex-1 flex flex-col justify-start max-w-5xl mx-auto w-full p-3 sm:p-6 relative z-10">
        {/* Visual Numbered Circle Track Step Progress Bar */}
        <StepProgressBar
          currentStep={state.step}
          language={state.language}
          onStepClick={(step) => setStep(step)}
        />

        {state.step === 'welcome' && (
          <WelcomeScreen
            status={status}
            language={state.language}
            onTap={handleBigButtonTap}
            onLanguageSelect={setLanguage}
            onDirectExplore={() => setStep('about')}
            onHelplineClick={() => setIsHelplineOpen(true)}
          />
        )}

        {state.step === 'about' && (
          <AboutScreen
            language={state.language}
            onCheckEligibility={() => setStep('eligibility')}
            onRepeat={handleRepeat}
            onViewPortal={() => setStep('portal')}
            onHelplineClick={() => setIsHelplineOpen(true)}
          />
        )}

        {state.step === 'eligibility' && (
          <EligibilityScreen
            language={state.language}
            onSubmit={(input) => {
              dispatch({
                type: 'SET_ELIGIBILITY',
                result: {
                  status: 'eligible',
                  amountRupees: input.childOrder === 1 ? 5000 : 6000,
                  reasons: ['FIRST_CHILD_ELIGIBLE'],
                  nextSteps: ['COLLECT_DOCUMENTS', 'VISIT_ANGANWADI'],
                },
                input,
              });
              setStep('result');
            }}
            onBack={handleBack}
          />
        )}

        {state.step === 'result' && (
          <ResultScreen
            eligibility={state.eligibility}
            language={state.language}
            onNext={() => setStep('documents')}
            onFindCentre={() => setStep('centre')}
          />
        )}

        {state.step === 'documents' && (
          <DocumentsScreen
            checklist={state.checklist}
            language={state.language}
            onToggle={handleDocumentToggle}
            onCameraCheck={(docId) => dispatch({ type: 'OPEN_CAMERA', documentId: docId })}
            onProceedToPrepare={() => setStep('prepare')}
          />
        )}

        {state.step === 'prepare' && (
          <PrepareScreen
            sheet={state.sheet}
            language={state.language}
            onUpdateField={(field, value) => dispatch({ type: 'FILL_SHEET_FIELD', field, value })}
            onFindCentre={async (pin) => {
              try {
                const res = await fetch(`/api/centres?pincode=${encodeURIComponent(pin)}`);
                if (res.ok) {
                  const data = await res.json();
                  if (data.centre) dispatch({ type: 'SET_CENTRE', centre: data.centre });
                }
              } catch (_) {}
              setStep('centre');
            }}
          />
        )}

        {state.step === 'centre' && (
          <CentreScreen
            centre={state.centre}
            language={state.language}
            onOpenPortal={() => setStep('portal')}
            onDone={() => {
              const code = Math.floor(100000 + Math.random() * 900000).toString();
              dispatch({ type: 'SET_RESUME_CODE', code });
              setStep('done');
            }}
          />
        )}

        {state.step === 'portal' && (
          <PortalScreen
            language={state.language}
            onProceedToDone={() => {
              const code = Math.floor(100000 + Math.random() * 900000).toString();
              dispatch({ type: 'SET_RESUME_CODE', code });
              setStep('done');
            }}
          />
        )}

        {state.step === 'done' && (
          <DoneScreen
            state={state}
            language={state.language}
            onRestart={resetJourney}
          />
        )}
      </main>

      {/* Active Sound-Wave Waveform Indicator during Conversation */}
      {state.step !== 'welcome' && (status === 'listening' || status === 'speaking' || status === 'connecting') && (
        <div className="w-full max-w-xl mx-auto px-4 pb-2 relative z-20 animate-in fade-in slide-in-from-bottom duration-300">
          <WaveformIndicator status={status} language={state.language} variant="card" />
        </div>
      )}

      {/* Live Captions Panel */}
      <div className="w-full relative z-20">
        <Captions captions={state.captions} isSpeaking={status === 'speaking'} />
      </div>

      {/* Persistent Spoken Controls Bar (Always available outside welcome) */}
      {state.step !== 'welcome' && (
        <div className="sticky bottom-0 z-30 bg-[#160a12]/95 backdrop-blur-xl border-t border-amber-500/25 px-4 py-3 print:hidden shadow-2xl">
          <div className="max-w-xl mx-auto flex items-center justify-between gap-3">
            {/* Go Back Button */}
            <button
              onClick={handleBack}
              type="button"
              className="flex items-center gap-1.5 bg-[#251220] hover:bg-[#32172b] text-amber-200 font-bold px-3.5 py-2.5 rounded-2xl border border-amber-500/30 shadow-md transition-colors cursor-pointer text-xs sm:text-sm active:scale-95"
              title={t.back}
            >
              <ArrowLeft className="w-4 h-4 text-amber-400" />
              <span>{t.back}</span>
            </button>

            {/* Central Compact Big Tactile Mic Button with ambient inline soundwave */}
            <div className="flex flex-col items-center -mt-8">
              <BigButton
                status={status}
                label=""
                onClick={handleBigButtonTap}
                compact
              />
              <div className="mt-1">
                <WaveformIndicator status={status} variant="inline" />
              </div>
            </div>

            {/* Say It Again Button */}
            <button
              onClick={handleRepeat}
              type="button"
              className="flex items-center gap-1.5 bg-[#251220] hover:bg-[#32172b] text-amber-200 font-bold px-3.5 py-2.5 rounded-2xl border border-amber-500/30 shadow-md transition-colors cursor-pointer text-xs sm:text-sm active:scale-95"
              title={t.repeat}
            >
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span>{t.repeat}</span>
            </button>

            {/* Keyboard / Text Drawer Toggle */}
            <button
              onClick={() => setShowTextInput(!showTextInput)}
              type="button"
              className="w-10 h-10 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 flex items-center justify-center transition-colors cursor-pointer border border-amber-500/30"
              title="Type message fallback"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>

          {/* Optional Text Input Drawer */}
          {showTextInput && (
            <form onSubmit={handleTextSubmit} className="max-w-xl mx-auto mt-3 flex gap-2 animate-in fade-in">
              <input
                type="text"
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
                placeholder={t.typeFallbackPlaceholder}
                className="flex-1 px-4 py-2.5 rounded-xl border border-amber-500/40 bg-[#1e0f1a] text-amber-50 text-sm focus:outline-hidden focus:ring-2 focus:ring-rose-500 shadow-inner"
                autoFocus
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm cursor-pointer shadow-md active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      )}

      {/* Camera Inspection Modal Sheet */}
      {state.activeCameraDocument && (
        <CameraSheet
          documentId={state.activeCameraDocument}
          language={state.language}
          onClose={() => dispatch({ type: 'CLOSE_CAMERA' })}
          onVerified={(res) => {
            dispatch({ type: 'SET_DOC_CHECK_RESULT', result: res });
            if (res.matchesExpected) {
              dispatch({
                type: 'UPDATE_CHECKLIST',
                documentId: state.activeCameraDocument!,
                status: 'have',
              });
            }
          }}
        />
      )}

      {/* Resume Session Modal */}
      {isResumeModalOpen && (
        <ResumeModal
          language={state.language}
          onClose={() => setIsResumeModalOpen(false)}
          onResume={resumeByCode}
        />
      )}

      {/* Official Government Helplines Modal */}
      <HelplineModal
        isOpen={isHelplineOpen}
        language={state.language}
        onClose={() => setIsHelplineOpen(false)}
      />

      {/* Simulated Automated Emergency Call Modal */}
      <EmergencyCallModal
        isOpen={isEmergencyCallOpen}
        language={state.language}
        nearestCentre={state.centre}
        onClose={() => setIsEmergencyCallOpen(false)}
      />
    </div>
  );
}
