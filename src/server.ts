import path from 'path';
import express from 'express';
import apiRouter from './routes/api';
const app = express();
const port = 3001;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use('/api', apiRouter);
app.get('/csp', (req: express.Request, res: express.Response) => {
  // CSP（Content Security Policy）ヘッダーを設定し、スクリプトの実行を同一オリジンのものだけに制限する（インラインスクリプトや外部スクリプトの実行を防止）
  res.header('Content-Security-Policy', "script-src 'self'");
  res.render('csp');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
