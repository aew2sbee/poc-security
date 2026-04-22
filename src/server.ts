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
  res.header(
    'Content-Security-Policy',
    // script-src: nonce値が一致するスクリプトのみ実行を許可し、strict-dynamicにより信頼されたスクリプトから動的に追加されたスクリプトも許可する
    `script-src 'nonce-${nonceValue}' 'strict-dynamic';` +
      // object-src: object/embed/appletタグの読み込みを全て禁止し、プラグイン経由の攻撃を防ぐ
      `object-src 'none';` +
      // base-uri: baseタグの使用を禁止し、相対URLの書き換えによる攻撃を防ぐ
      `base-uri 'none';` +
      // report-trusted-types: Trusted Typesポリシー違反を報告する
      `report-trusted-types 'script'`,
  );
  res.render('csp', { nonce: nonceValue });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
