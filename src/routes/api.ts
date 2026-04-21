import { Router, Request, Response } from 'express';
const router = Router();

const ALLOW_ORIGIN_LIST = [
  'http://localhost:3001',
  'http://site.localhost:3001',
];

router.use((req: Request, res: Response, next: Function) => {

  // CORSを許可するオリジンを http://localhost:3001 に限定する
  // （リクエスト元 → リクエスト先）
  // OK： http://localhost:3001 → このAPI … オリジンが一致するため許可
  // NG： http://site.localhost:3001 → このAPI … オリジンが異なるため拒否
  // 旧：res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  // ------------------------------------------
  // 複数のオリジンを許可する場合、リクエストのオリジンが許可リストに含まれているかを確認し、該当するオリジンをレスポンスヘッダーに設定する
  const origin = req.headers.origin;
  if (origin && ALLOW_ORIGIN_LIST.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (req.method === 'OPTIONS') {
    // X-Tokenヘッダーを許可する
    res.header('Access-Control-Allow-Headers', 'X-Token');
  }
  next();
});

// Example API endpoint
router.get('/', (req: Request, res: Response) => {
  // レスポンスヘッダーに現在の日時（ISO形式）を「X-timestamp」として付与する
  res.setHeader('X-timestamp', new Date().toISOString());
  let message = req.query.message as string | '';
  // リクエストヘッダーから「x-language」の値を取得する（文字列またはデフォルト値'ja'として扱う）
  const lang = req.headers['x-language'] as string | 'ja';

  // messageが空または未指定の場合、ステータス400（Bad Request）を返し、言語に応じたエラーメッセージを設定する
  if (!message || message === '') {
    res.status(400);
    if (lang === 'en') {
      message = 'The string is empty';
    } else {
      message = '文字列が空です';
    }
  }
  res.send({ message });
});

router.post('/', (req: Request, res: Response) => {
  const body = req.body;
  console.log(body);
  res.end();
});

export default router;
