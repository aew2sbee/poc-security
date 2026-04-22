import path from 'path';
import express from 'express';
import apiRouter from './routes/api';

const crypto = require('crypto');
const app = express();
const port = 3001;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use('/api', apiRouter);
app.get('/csp', (req: express.Request, res: express.Response) => {
  const nonceValue = crypto.randomBytes(16).toString('base64');
  // CSPヘッダーを設定し、nonce値が一致するスクリプトのみ実行を許可する
  // リクエストごとにnonceが変わるため、攻撃者がスクリプトを注入しても実行されない
  res.header('Content-Security-Policy', `script-src 'nonce-${nonceValue}'`);
  res.render('csp', { nonce: nonceValue });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
