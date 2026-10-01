/**
 * Tool registry: unified definitions for client-side dispatcher and Gemini function calls
 */
import { z } from 'zod';

export const SetLanguageSchema = z.object({
  code: z.enum(['hi', 'mr', 'bn', 'ta', 'te', 'kn', 'en']).describe('Language code detected from user speech or chosen'),
});

export const ShowStepSchema = z.object({
  step: z.enum([
    'welcome',
    'about',
    'eligibility',
    'result',
    'documents',
    'prepare',
    'centre',
    'portal',
    'done',
  ]).describe('The journey screen to display matching current conversation context'),
});

export const GetSchemeInfoSchema = z.object({
  topic: z.enum(['benefit', 'who', 'documents', 'how_to_apply', 'when']).describe('Topic to retrieve authoritative PMMVY scheme facts for'),
});

export const CheckEligibilitySchema = z.object({
  ageYears: z.number().int().min(10).max(100).describe('Mother’s age in years'),
  stage: z.enum(['pregnant', 'delivered']).describe('Whether currently pregnant or already delivered'),
  childOrder: z.union([z.literal(1), z.literal(2), z.literal(3)]).describe('1 for first child, 2 for second, 3 for third or later'),
  secondChildIsGirl: z.boolean().optional().describe('Only if delivered second child: true if baby is female, false if male'),
  daysSinceBirth: z.number().optional().describe('If delivered, approximate days since birth'),
  categories: z.array(z.string()).describe('List of socio-economic qualifying categories (e.g. ration_card, sc_st, eshram, etc.)'),
});

export const UpdateChecklistSchema = z.object({
  documentId: z.enum(['aadhaar', 'bank_passbook', 'mcp_card', 'ration_card', 'mobile_number', 'child_birth_certificate']),
  status: z.enum(['have', 'missing', 'unknown']),
});

export const CheckDocumentPhotoSchema = z.object({
  expected: z.enum(['aadhaar', 'bank_passbook', 'mcp_card', 'ration_card', 'mobile_number', 'child_birth_certificate']).describe('Document type the user is holding up to the camera'),
});

export const FillSheetFieldSchema = z.object({
  field: z.enum(['motherName', 'guardianName', 'villageOrTown', 'pincode', 'bankName']).describe('Non-sensitive field to note down on her Anganwadi preparation slip'),
  value: z.string().min(1).max(100).describe('Spoken value to write down'),
});

export const FindNearestCentreSchema = z.object({
  pincode: z.string().regex(/^\d{6}$/, 'Must be a 6-digit Indian PIN code').describe('6-digit postal PIN code of the user'),
});

export const OpenOfficialPortalSchema = z.object({});

export const SaveAndFinishSchema = z.object({});

export interface ToolDefinition<TSchema extends z.ZodTypeAny = z.ZodTypeAny> {
  name: string;
  description: string;
  schema: TSchema;
}

export const TOOL_REGISTRY: Record<string, ToolDefinition> = {
  set_language: {
    name: 'set_language',
    description: 'Switch the screen language and user interface to her mother tongue (Hindi, Marathi, Bengali, Tamil, Telugu, Kannada, English).',
    schema: SetLanguageSchema,
  },
  show_step: {
    name: 'show_step',
    description: 'Transition the visual screen to match what Saheli is talking about (welcome, about, eligibility, result, documents, prepare, centre, portal, done).',
    schema: ShowStepSchema,
  },
  get_scheme_info: {
    name: 'get_scheme_info',
    description: 'Fetch certified facts about PMMVY government maternity benefits (amounts, rules, required documents).',
    schema: GetSchemeInfoSchema,
  },
  check_eligibility: {
    name: 'check_eligibility',
    description: 'Evaluate whether she qualifies for PMMVY using the verified government rules engine. Never guess or hallucinate eligibility.',
    schema: CheckEligibilitySchema,
  },
  update_checklist: {
    name: 'update_checklist',
    description: 'Mark a document as ready (have) or missing on her visual picture checklist.',
    schema: UpdateChecklistSchema,
  },
  check_document_photo: {
    name: 'check_document_photo',
    description: 'Open the camera to verify that a document held up by the mother is genuine, correct, and legible. Never records sensitive ID numbers.',
    schema: CheckDocumentPhotoSchema,
  },
  fill_sheet_field: {
    name: 'fill_sheet_field',
    description: 'Visibly fill in a non-sensitive field on her Anganwadi preparation slip as she speaks.',
    schema: FillSheetFieldSchema,
  },
  find_nearest_centre: {
    name: 'find_nearest_centre',
    description: 'Find the nearest Anganwadi centre or Common Service Centre (CSC) given her 6-digit PIN code.',
    schema: FindNearestCentreSchema,
  },
  open_official_portal: {
    name: 'open_official_portal',
    description: 'Demonstrate the official government portal pmmvy.wcd.gov.in in guided Dekho preview mode.',
    schema: OpenOfficialPortalSchema,
  },
  save_and_finish: {
    name: 'save_and_finish',
    description: 'Generate her anonymous 6-digit resume code and display the completed preparation slip for the Anganwadi worker.',
    schema: SaveAndFinishSchema,
  },
};
