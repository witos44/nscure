import { Router, Request, Response } from 'express';

const router = Router();

router.post('/login', (req: Request, res: Response) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  if (password !== process.env.ADMIN_API_TOKEN) {
    return res.status(401).json({ error: 'Wrong password' });
  }

  // Optional: bisa return token / session jika perlu
  res.json({ success: true, message: 'Login successful' });
});

export default router;
