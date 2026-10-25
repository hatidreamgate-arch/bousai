# わが家の風水害防災ガイド

添付ワイヤーフレームをもとにした、レスポンシブ対応の静的Webサイトです。

## ローカルで確認する

```bash
npm run dev
```

ブラウザで `http://localhost:4173` を開いてください。外部パッケージのインストールは不要です。

## ページ構成

- `index.html` — トップ／かんたん診断
- `risk.html` — 私の災害リスク
- `information.html` — 防災情報の集め方
- `evacuation.html` — 避難の考え方
- `plan.html` — マイ・タイムライン作成
- `action.html` — 家庭・地域でできること

マイ・タイムラインの入力内容は、使用中のブラウザ内だけに一時保存されます。

## セキュリティ構成

- HTML、CSS、ブラウザJavaScriptだけで配信する静的サイトです。
- Node.jsまたはPHPのサーバー処理、外部パッケージ、データベースは使用していません。
- 入力した避難計画は外部へ送信せず、ブラウザの `localStorage` だけに保存します。
- Vercelの `vercel.json` でContent Security PolicyなどのHTTPセキュリティヘッダーを設定しています。
