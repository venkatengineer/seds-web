import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { apiRouter } from './api.js';

export function createServerApp() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Static serving for uploaded presentation decks
  const uploadDir = path.resolve(process.cwd(), 'data/uploads/ppt');
  app.use('/uploads/ppt', express.static(uploadDir, {
    setHeaders: (res, filePath) => {
      res.setHeader('Content-Disposition', `attachment; filename="${path.basename(filePath)}"`);
    }
  }));

  // API router
  app.use('/api', apiRouter);

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'orbital26-registration-engine', time: new Date().toISOString() });
  });

  return app;
}
