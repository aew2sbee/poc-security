import express, { Request, Response, NextFunction } from 'express';
const app = express();
const port = 6000;

app.use(express.static('public'));

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.end('トップページ');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
