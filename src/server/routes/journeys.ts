/**
 * Journeys route: Anonymous save and resume
 */

import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { saveJourney, getJourney } from '../services/journeys.js';

export const journeysRouter = Router();

const SaveJourneySchema = z.object({
  step: z.string().default('done'),
  language: z.string().default('hi'),
  eligibility: z.any().optional(),
  checklist: z.any().optional(),
  sheet: z.any().optional(),
  pincode: z.string().optional(),
});

journeysRouter.post('/', async (req: Request, res: Response) => {
  try {
    const parsed = SaveJourneySchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: 'invalid_journey_data' });
      return;
    }

    const code = await saveJourney(parsed.data);
    res.json({ code });
  } catch (err: any) {
    res.status(500).json({ error: 'failed_to_save_journey' });
  }
});

journeysRouter.get('/:code', async (req: Request, res: Response) => {
  try {
    const code = req.params.code;
    if (!code || !/^\d{6}$/.test(code)) {
      res.status(400).json({ error: 'invalid_code' });
      return;
    }

    const journey = await getJourney(code);
    if (!journey) {
      res.status(404).json({ error: 'journey_not_found' });
      return;
    }

    res.json({ journey });
  } catch (err: any) {
    res.status(500).json({ error: 'failed_to_fetch_journey' });
  }
});
