/**
 * Express application factory for Saheli backend
 */

import express, { Request, Response, NextFunction } from 'express';
import { sessionRouter } from './routes/session.js';
import { chatRouter } from './routes/chat.js';
import { documentRouter } from './routes/document.js';
import { centresRouter } from './routes/centres.js';
import { journeysRouter } from './routes/journeys.js';

export function createApp(): express.Application {
  const app = express();

  // JSON body parser with 5MB limit for base64 camera image uploads
  app.use(express.json({ limit: '5mb' }));

  // Basic security headers
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Permissions-Policy', 'camera=*, microphone=*');
    next();
  });

  // Health check endpoint
  app.get('/healthz', (req: Request, res: Response) => {
    res.json({ ok: true, app: 'saheli', timestamp: Date.now() });
  });

  // API Routes
  app.use('/api/session', sessionRouter);
  app.use('/api/chat', chatRouter);
  app.use('/api/document', documentRouter);
  app.use('/api/centres', centresRouter);
  app.use('/api/journeys', journeysRouter);

  // Generic error handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Unhandled server error:', err);
    res.status(500).json({ error: 'internal_server_error' });
  });

  return app;
}
