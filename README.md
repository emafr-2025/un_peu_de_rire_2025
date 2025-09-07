# あんぷうどり

発達障害のお子さんを持つお母さんを笑顔にするためのWebサイトです。AIチャット相談とポッドキャスト配信を通じて、同じ悩みを持つ方々に寄り添います。

## 🌟 主な機能

- **しゅえっとくん**: GPT-4o-miniを活用したAI相談チャット
- **あんぷうどりカフェ**: ポッドキャスト再生・エピソード一覧
- **おこっちゃうんです道場**: コミュニケーション練習の場
- **エピソード募集**: Google Formを使った体験談投稿
- **制作者の想い**: アコーディオン形式での想い紹介

## 🚀 開発環境セットアップ

### 必要な環境変数

`.env.local` ファイルを作成し、以下を設定：

```bash
# Dify API Configuration
NEXT_PUBLIC_DIFY_API_KEY=your_dify_api_key_here
NEXT_PUBLIC_DIFY_BASE_URL=https://api.dify.ai/v1
```

### 開発サーバー起動

```bash
npm install
npm run dev
```

開発サーバーは [http://localhost:3001](http://localhost:3001) で起動します。

## 🚀 Vercel デプロイメント

本番環境への完全デプロイガイド：

**📋 [DEPLOYMENT.md](./DEPLOYMENT.md)** - 詳細なデプロイ手順

### クイックデプロイ

1. GitHubリポジトリをVercelに Import
2. 環境変数を設定：
   - `NEXT_PUBLIC_DIFY_API_KEY`
   - `NEXT_PUBLIC_DIFY_BASE_URL`
3. 自動デプロイ完了

### 動作確認チェックリスト
- [ ] `/` - ホームページ表示
- [ ] `/dojo` - 道場ページ表示  
- [ ] `/request` - エピソード募集フォーム
- [ ] しゅえっとくんチャット機能
- [ ] ポッドキャスト再生機能

## 🛠 技術スタック

- **Framework**: Next.js 15.5.2 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules + Tailwind CSS
- **AI**: Dify API (GPT-4o-mini)
- **Deployment**: Vercel
- **Audio**: HTML5 Audio API

## 📁 プロジェクト構造

```
├── app/                  # App Router pages
│   ├── api/chat/        # Dify API integration
│   ├── dojo/            # 道場ページ
│   └── request/         # エピソード募集
├── components/          # React components
├── lib/                 # Utility functions
├── public/              # Static assets
├── types/               # TypeScript definitions
└── DEPLOYMENT.md        # Vercel deployment guide
```
