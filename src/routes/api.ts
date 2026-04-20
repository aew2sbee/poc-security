import { Router, Request, Response } from 'express';
const router = Router();

// Example API endpoint
router.get('/', (req: Request, res: Response) => {
  let message = req.query.message as string | "";

  if (!message || message === "") {
    res.status(400);
    message = '文字列が空です';
  }
  res.send({ message });
});
router.post('/', (req: Request, res: Response) => {
  const body = req.body;
  console.log(body);
  res.end();
});

export default router;
