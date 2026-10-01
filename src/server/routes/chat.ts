/**
 * Chat route: Handles text fallback and speech-to-text turns with tools
 */

import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { chatWithSaheli } from '../services/gemini.js';

export const chatRouter = Router();

const ChatRequestSchema = z.object({
  history: z.array(
    z.object({
      role: z.enum(['user', 'model']),
      parts: z.array(z.object({ text: z.string() })),
    })
  ).default([]),
  toolResponses: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      response: z.record(z.string(), z.unknown()),
    })
  ).optional(),
  language: z.enum(['hi', 'mr', 'bn', 'ta', 'te', 'kn', 'en']).optional(),
  currentState: z.record(z.string(), z.unknown()).optional(),
});

chatRouter.post('/', async (req: Request, res: Response) => {
  try {
    const parsed = ChatRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: 'invalid_chat_request', issues: parsed.error.issues });
      return;
    }

    const response = await chatWithSaheli(parsed.data);
    res.json(response);
  } catch (err: any) {
    console.warn('Chat route error:', err);
    res.status(500).json({ error: 'internal_chat_error' });
  }
});
