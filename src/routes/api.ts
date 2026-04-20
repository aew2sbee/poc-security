import { Router, Request, Response } from 'express';
const router = Router();

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
