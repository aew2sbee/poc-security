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