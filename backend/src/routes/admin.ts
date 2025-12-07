import { Router, Request, Response } from 'express';

const router = Router();

// Cek token
router.post('/login', (req: Request, res: Response) => {
  const { token } = req.body;
  if (token === process.env.ADMIN_API_TOKEN) {
    return res.json({ success: true });
  }
  return res.status(401).json({ error: 'Unauthorized' });
});

export default router;
