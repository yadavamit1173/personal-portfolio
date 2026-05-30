import cors from 'cors';
import express from 'express';

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'personal-portfolio-api',
    timestamp: new Date().toISOString(),
  });
});

export default app;
