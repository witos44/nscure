import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import postsRoute from './routes/posts';
import adminRoute from './routes/admin';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/posts', postsRoute);
app.use('/api/admin', adminRoute);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// === MODE DEPLOY / SERVERLESS VERCEL ===
export default app;

// === MODE LOKAL ===
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`✅ Backend running locally on http://localhost:${PORT}`);
  });
}
