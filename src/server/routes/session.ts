/**
 * Session route: Mints ephemeral token / session configuration for Live API
 */

import { Router, Request, Response } from 'express';
import { ENV } from '../env.js';

export const sessionRouter = Router();

sessionRouter.post('/', async (req: Request, res: Response) => {
  try {
    // Generate session token or pass live model credentials
    const token = ENV.GEMINI_API_KEY
      ? `token_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
      : 'demo_live_token';

    res.json({
      token,
      model: ENV.LIVE_MODEL,
      status: 'active',
      audioFormat: {
        inputRate: 16000,
        outputRate: 24000,
        encoding: 'pcm_s16le',
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: 'failed_to_mint_token' });
  }
});
