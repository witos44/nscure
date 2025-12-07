import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import postsRoute from './routes/posts';

dotenv.config();

const app = express();

/**
 * Middleware
 */
app.use(cors());
app.use(express.json());

/**
 * Routes
 */
app.use('/api/posts', postsRoute);

// Kalau mau path admin juga aktif
app.use('/api/admin/posts', postsRoute);

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
  });
});

/**
 * Export untuk Vercel (Serverless Function)
 */
export default app;

/**
 * Mode lokal (hanya jalan saat dev di local machine)
 */
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`✅ Backend running locally on http://localhost:${PORT}`);
  });
}
