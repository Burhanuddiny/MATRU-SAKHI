/**
 * Core type definitions for Saheli - PMMVY Maternity Companion
 */

export type Step =
  | 'welcome'
  | 'about'
  | 'eligibility'
  | 'result'
  | 'documents'
  | 'prepare'
  | 'centre'
  | 'portal'
  | 'done';

export type LanguageCode = 'hi' | 'mr' | 'bn' | 'ta' | 'te' | 'kn' | 'en';

export type DocumentId =
  | 'aadhaar'
  | 'bank_passbook'
  | 'mcp_card'
  | 'ration_card'
  | 'mobile_number'
  | 'child_birth_certificate';

export type CategoryId =
  | 'ration_card'
  | 'sc_st'
  | 'disability'
  | 'bpl_card'
  | 'ayushman_pmjay'
  | 'eshram'
  | 'kisan_samman'
  | 'mgnrega'
  | 'income_under_8lakh'
  | 'anganwadi_asha'
  | 'nfsa_ration';

export type ReasonCode =
  | 'FIRST_CHILD_ELIGIBLE'
  | 'SECOND_CHILD_GIRL_ELIGIBLE'
  | 'SECOND_CHILD_GIRL_ONLY_AFTER_BIRTH'
  | 'AGE_CHECK_AT_CENTRE'
  | 'AGE_OUT_OF_RANGE'
  | 'NO_QUALIFYING_CATEGORY'
  | 'THIRD_OR_LATER_CHILD_NOT_ELIGIBLE'
  | 'SECOND_CHILD_BOY_NOT_ELIGIBLE'
  | 'REGISTRATION_WINDOW_CLOSED';

export type NextStepCode =
  | 'VISIT_ANGANWADI'
  | 'COLLECT_DOCUMENTS'
  | 'OPEN_BANK_ACCOUNT'
  | 'UPDATE_AADHAAR_MOBILE'
  | 'WAIT_FOR_DELIVERY';

export interface EligibilityInput {
  ageYears: number;
  stage: 'pregnant' | 'delivered';
  childOrder: 1 | 2 | 3; // 3 means third or later
  secondChildIsGirl?: boolean; // only meaningful when stage is 'delivered'
  daysSinceBirth?: number;
  categories: CategoryId[]; // qualifying categories she said yes to
}

export interface EligibilityResult {
  status: 'eligible' | 'conditional' | 'not_eligible';
  amountRupees: number; // 5000, 6000, or 0
  reasons: ReasonCode[]; // machine codes; explained gently in her language
  nextSteps: NextStepCode[];
  childOrder?: 1 | 2 | 3;
}

export interface PreparationSheet {
  motherName?: string;
  guardianName?: string;
  villageOrTown?: string;
  pincode?: string;
  bankName?: string;
  stage?: 'pregnant' | 'delivered';
  childOrder?: number;
  category?: string;
}

export interface Centre {
  name: string;
  address: string;
  pincode: string;
  phone?: string;
  type: 'anganwadi' | 'csc' | 'health_centre';
  mapsUrl: string;
  verifiedOfficial: boolean;
}

export interface ToolCall {
  id: string;
  name: string;
  args: Record<string, unknown>;
}

export interface ToolResult {
  id: string;
  name: string;
  response: Record<string, unknown>;
}

export interface CaptionEntry {
  id: string;
  who: 'saheli' | 'user';
  text: string;
  timestamp: number;
}

export interface JourneyState {
  step: Step;
  language: LanguageCode;
  eligibility: EligibilityResult | null;
  eligibilityInput: Partial<EligibilityInput>;
  checklist: Record<DocumentId, 'have' | 'missing' | 'unknown'>;
  sheet: Partial<PreparationSheet>;
  centre: Centre | null;
  resumeCode: string | null;
  captions: CaptionEntry[];
  busy: boolean;
  activeCameraDocument: DocumentId | null;
  lastDocumentCheckResult: {
    legible: boolean;
    matchesExpected: boolean;
    advice: string;
    detectedDocName?: string;
  } | null;
}
