# poc-security
Expressでセキュリティについて理解する

## package.jsonの作成

```bash
pnpm init -y
```

## Expressのインストール

```bash
pnpm add express
```

## 起動

```bash
npx tsx src/server.ts
```


## 検証
### 同一オリジンからのアクセス
http://localhost:3001/attacker.html

### 異なるオリジンからのアクセス
http://site.localhost:3001/attacker.html

## XSSを発生
```bash
http://localhost:3001/xss.html?message=%3Cimg%20src%20onerror=alert(%27xss%27)%3E
```
