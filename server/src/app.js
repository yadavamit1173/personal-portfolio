import cors from 'cors';
import express from 'express';

import env from './config/env.js';
import { isDatabaseConnected } from './config/db.js';
import contentRoutes from './routes/contentRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

const app = express();

const allowedOrigins = [env.clientUrl, 'http://localhost:5173', 'http://localhost:5174'].filter(
  Boolean,
);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  }),
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'personal-portfolio-api',
    database: isDatabaseConnected() ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/content', contentRoutes);
app.use('/api/contact', contactRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

export default app;
