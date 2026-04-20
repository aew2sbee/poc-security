import { Router, Request, Response } from 'express';
const router = Router();

// Example API endpoint
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the API!' });
});

export default router;
