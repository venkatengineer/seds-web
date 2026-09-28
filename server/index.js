import { createServerApp } from './app.js';
import express from 'express';
import path from 'node:path';
import fs from 'node:fs';

const app = createServerApp();
const PORT = process.env.PORT || 3001;

// If dist exists, serve production client build
const distDir = path.resolve(process.cwd(), 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
      return next();
    }
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[ORBITAL 26] Registration Engine active on http://localhost:${PORT}`);
});
