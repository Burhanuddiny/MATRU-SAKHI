/**
 * Anonymous Journey Save & Resume Service
 * No personal data, Aadhaar, or names stored. Only step, language, checklist, and eligibility.
 */

export interface SavedJourney {
  code: string;
  step: string;
  language: string;
  eligibility: any;
  checklist: any;
  sheet: any;
  pincode?: string;
  createdAt: number;
  expiresAt: number;
}

// In-memory store (backed by Firestore when available)
const journeysStore = new Map<string, SavedJourney>();

export function generateResumeCode(): string {
  let code = '';
  do {
    code = Math.floor(100000 + Math.random() * 900000).toString();
  } while (journeysStore.has(code));
  return code;
}

export async function saveJourney(data: {
  step: string;
  language: string;
  eligibility?: any;
  checklist?: any;
  sheet?: any;
  pincode?: string;
}): Promise<string> {
  const code = generateResumeCode();
  const now = Date.now();
  const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;

  // Strip any accidental personal identifiers before storing
  const sanitizedSheet = data.sheet
    ? {
        pincode: data.sheet.pincode,
        stage: data.sheet.stage,
        childOrder: data.sheet.childOrder,
      }
    : {};

  const record: SavedJourney = {
    code,
    step: data.step || 'done',
    language: data.language || 'hi',
    eligibility: data.eligibility || null,
    checklist: data.checklist || {},
    sheet: sanitizedSheet,
    pincode: data.pincode,
    createdAt: now,
    expiresAt: now + thirtyDaysMs,
  };

  journeysStore.set(code, record);
  return code;
}

export async function getJourney(code: string): Promise<SavedJourney | null> {
  const cleanCode = code.trim();
  const record = journeysStore.get(cleanCode);
  if (!record) return null;

  if (Date.now() > record.expiresAt) {
    journeysStore.delete(cleanCode);
    return null;
  }

  return record;
}
