/**
 * Pure reducer for Saheli journey state
 */

import { JourneyState, Step, LanguageCode, DocumentId, EligibilityResult, Centre, PreparationSheet, CaptionEntry } from '../../shared/types.js';

export type JourneyAction =
  | { type: 'SET_LANGUAGE'; language: LanguageCode }
  | { type: 'SET_STEP'; step: Step }
  | { type: 'SET_ELIGIBILITY'; result: EligibilityResult; input?: Partial<JourneyState['eligibilityInput']> }
  | { type: 'UPDATE_CHECKLIST'; documentId: DocumentId; status: 'have' | 'missing' | 'unknown' }
  | { type: 'FILL_SHEET_FIELD'; field: keyof PreparationSheet; value: string }
  | { type: 'SET_CENTRE'; centre: Centre }
  | { type: 'SET_RESUME_CODE'; code: string }
  | { type: 'ADD_CAPTION'; caption: Omit<CaptionEntry, 'id' | 'timestamp'> }
  | { type: 'SET_BUSY'; busy: boolean }
  | { type: 'OPEN_CAMERA'; documentId: DocumentId }
  | { type: 'CLOSE_CAMERA' }
  | { type: 'SET_DOC_CHECK_RESULT'; result: JourneyState['lastDocumentCheckResult'] }
  | { type: 'RESET_JOURNEY' }
  | { type: 'RESTORE_JOURNEY'; state: Partial<JourneyState> };

export const INITIAL_CHECKLIST: Record<DocumentId, 'have' | 'missing' | 'unknown'> = {
  aadhaar: 'unknown',
  bank_passbook: 'unknown',
  mcp_card: 'unknown',
  ration_card: 'unknown',
  mobile_number: 'unknown',
  child_birth_certificate: 'unknown',
};

export const INITIAL_JOURNEY_STATE: JourneyState = {
  step: 'welcome',
  language: 'hi',
  eligibility: null,
  eligibilityInput: {},
  checklist: { ...INITIAL_CHECKLIST },
  sheet: {},
  centre: null,
  resumeCode: null,
  captions: [],
  busy: false,
  activeCameraDocument: null,
  lastDocumentCheckResult: null,
};

export function journeyReducer(state: JourneyState, action: JourneyAction): JourneyState {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, language: action.language };

    case 'SET_STEP':
      return { ...state, step: action.step };

    case 'SET_ELIGIBILITY':
      return {
        ...state,
        eligibility: action.result,
        eligibilityInput: { ...state.eligibilityInput, ...action.input },
      };

    case 'UPDATE_CHECKLIST':
      return {
        ...state,
        checklist: {
          ...state.checklist,
          [action.documentId]: action.status,
        },
      };

    case 'FILL_SHEET_FIELD':
      return {
        ...state,
        sheet: {
          ...state.sheet,
          [action.field]: action.value,
        },
      };

    case 'SET_CENTRE':
      return { ...state, centre: action.centre };

    case 'SET_RESUME_CODE':
      return { ...state, resumeCode: action.code };

    case 'ADD_CAPTION': {
      const newCaption: CaptionEntry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        who: action.caption.who,
        text: action.caption.text,
        timestamp: Date.now(),
      };
      // Keep last 15 captions to prevent unbounded memory
      const nextCaptions = [...state.captions, newCaption].slice(-15);
      return { ...state, captions: nextCaptions };
    }

    case 'SET_BUSY':
      return { ...state, busy: action.busy };

    case 'OPEN_CAMERA':
      return { ...state, activeCameraDocument: action.documentId, lastDocumentCheckResult: null };

    case 'CLOSE_CAMERA':
      return { ...state, activeCameraDocument: null };

    case 'SET_DOC_CHECK_RESULT':
      return { ...state, lastDocumentCheckResult: action.result };

    case 'RESET_JOURNEY':
      return { ...INITIAL_JOURNEY_STATE, language: state.language };

    case 'RESTORE_JOURNEY':
      return {
        ...state,
        ...action.state,
      };

    default:
      return state;
  }
}
