/**
 * Zod-validated environment configuration
 */

import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const EnvSchema = z.object({
  PORT: z.string().default('3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  GEMINI_API_KEY: z.string().optional().default(''),
  MAPS_API_KEY: z.string().optional().default(''),
  LIVE_MODEL: z.string().default('gemini-3.8-live'),
  TEXT_MODEL: z.string().default('gemini-3.8-flash'),
  GUIDE_URL: z.string().optional(),
});

export const ENV = EnvSchema.parse(process.env);
