/**
 * Document route: Vision-based document verification (legibility & expected document type)
 */

import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { checkDocumentWithVision } from '../services/gemini.js';

export const documentRouter = Router();

const CheckDocumentSchema = z.object({
  imageBase64: z.string().min(10).max(3 * 1024 * 1024), // Max ~2.2MB image
  mimeType: z.string().default('image/jpeg'),
  expectedDoc: z.string().min(1),
});

documentRouter.post('/check', async (req: Request, res: Response) => {
  try {
    const parsed = CheckDocumentSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: 'invalid_document_payload', issues: parsed.error.issues });
      return;
    }

    const result = await checkDocumentWithVision({
      imageBase64: parsed.data.imageBase64,
      mimeType: parsed.data.mimeType,
      expectedDoc: parsed.data.expectedDoc,
    });

    res.json(result);
  } catch (err: any) {
    console.warn('Document check route error:', err);
    res.status(500).json({ error: 'document_check_failed' });
  }
});
