/**
 * Centres route: Find nearest Anganwadi centre by pincode
 */

import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { findNearestCentre } from '../services/centres.js';

export const centresRouter = Router();

const PincodeQuerySchema = z.object({
  pincode: z.string().regex(/^\d{6}$/, 'Pincode must be exactly 6 digits'),
});

centresRouter.get('/', async (req: Request, res: Response) => {
  try {
    const parsed = PincodeQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      res.status(400).json({ error: 'invalid_pincode', message: 'Provide a valid 6-digit Indian PIN code' });
      return;
    }

    const centre = await findNearestCentre(parsed.data.pincode);
    res.json({ centre });
  } catch (err: any) {
    console.warn('Centres route error:', err);
    res.status(500).json({ error: 'failed_to_locate_centre' });
  }
});
