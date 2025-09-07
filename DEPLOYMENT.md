# Vercel デプロイメントガイド

このプロジェクトをVercelにデプロイするための完全ガイドです。

## 🚀 デプロイ手順

### 1. GitHub 連携でプロジェクト Import

1. [Vercel Dashboard](https://vercel.com/dashboard) にログイン
2. **"New Project"** をクリック
3. **"Import Git Repository"** からGitHubリポジトリを選択
4. **Framework Preset**: Next.js (自動判定される)
5. **Root Directory**: `./` (プロジェクトルート)

### 2. ビルド設定 (Build & Output Settings)

```bash
# Build Command (デフォルトで自動設定される)
npm run build

# Output Directory (デフォルトで自動設定される)
.next

# Install Command (デフォルトで自動設定される)
npm install
```

### 3. 必須環境変数の設定

Vercel Dashboard の **Settings > Environment Variables** で以下を設定：

#### 🔐 Dify API 設定 (必須)
```bash
NEXT_PUBLIC_DIFY_API_KEY=your_dify_api_key_here
NEXT_PUBLIC_DIFY_BASE_URL=https://api.dify.ai/v1
```

#### 📝 Google Form設定 (オプション)
現在ハードコードされていますが、環境変数化する場合：
```bash
NEXT_PUBLIC_GOOGLE_FORM_URL=https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true
```

#### 🌍 サイト設定 (オプション)
```bash
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```

### 4. CLI を使用した設定 (代替方法)

```bash
# Vercel CLI インストール
npm install -g vercel

# ログイン
vercel login

# プロジェクト初期化
vercel

# 環境変数設定
vercel env add NEXT_PUBLIC_DIFY_API_KEY
vercel env add NEXT_PUBLIC_DIFY_BASE_URL

# デプロイ
vercel --prod
```

## ⚙️ 設定ファイル

### vercel.json
プロジェクトルートの `vercel.json` で詳細設定：

```json
{
  "framework": "nextjs",
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "devCommand": "next dev",
  "installCommand": "npm install",
  "functions": {
    "app/api/**/*.ts": {
      "runtime": "@vercel/node"
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, PUT, DELETE, OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Content-Type, Authorization"
        }
      ]
    }
  ]
}
```

## 🚨 よくある設定エラーと対策

### 1. 環境変数未設定エラー
```
Error: Dify API key is not configured
```
**対策**: `NEXT_PUBLIC_DIFY_API_KEY` が正しく設定されているか確認

### 2. API エンドポイントエラー  
```
Failed to get response from chatbot
```
**対策**: `NEXT_PUBLIC_DIFY_BASE_URL` と API キーの有効性を確認

### 3. 静的ファイルが読み込まれない
**対策**: `public/` フォルダ内のファイルパスが正しいか確認

## ✅ デプロイ後の動作確認チェックリスト

### 📄 ページ表示確認
- [ ] `/` (ホームページ) - サイト概要とポッドキャスト一覧
- [ ] `/dojo` (道場ページ) - "おこっちゃうんです道場"
- [ ] `/request` (エピソード募集) - Google Form埋め込み

### 🔧 機能動作確認  
- [ ] **しゅえっとくんチャット**: メッセージ送信・応答受信
- [ ] **ポッドキャスト再生**: JSON読み込み・プレイヤー操作
- [ ] **画像表示**: `/public/images/` 内のアイコン・画像
- [ ] **アコーディオン**: "このサイトについて"・"制作者の想い"の開閉
- [ ] **レスポンシブ**: モバイル・デスクトップでの表示

### 🌐 ネットワーク・API確認
- [ ] `/api/chat` エンドポイントが正常動作
- [ ] Dify APIとの通信が成功
- [ ] CORS設定が適切
- [ ] 静的ファイル配信 (画像、JSON) が正常

## 🎛️ 任意設定

### カスタムドメイン紐付け
1. Vercel Dashboard > Settings > Domains
2. カスタムドメインを追加
3. DNS設定でCNAMEまたはA recordを追加

### Password Protection (公開前)
1. Settings > Environment Variables
2. `VERCEL_PASSWORD` を設定
3. 一時的なパスワード保護が有効

### robots.txt でクローラー制御
```
User-agent: *
Disallow: /api/
Disallow: /admin/

Sitemap: https://your-domain.com/sitemap.xml
```

### Metadata・SEO最適化
`app/layout.tsx` でメタデータ設定：
```typescript
export const metadata = {
  title: 'あんぷうどり - 発達障害児のお母さんを笑顔に',
  description: 'お子さんの発達や子育てについて、AI相談とポッドキャストで支援',
  openGraph: {
    title: 'あんぷうどり',
    description: '発達障害児のお母さんを笑顔にするサイト',
    url: 'https://your-domain.com',
  }
}
```

## 🎯 Definition of Done (DoD)

デプロイ完了の条件：

### ✅ 技術要件
- [ ] main ブランチの自動デプロイが動作
- [ ] `https://<project>.vercel.app` で全ページアクセス可能
- [ ] ビルドエラーなし・TypeScript エラーなし
- [ ] 環境変数が適切に設定され、API が動作
- [ ] 静的ファイル (画像・JSON) が正常配信

### ✅ 機能要件  
- [ ] しゅえっとくんチャットが正常動作 (GPT-4o-mini)
- [ ] ポッドキャスト再生機能が動作
- [ ] アコーディオン・レスポンシブデザインが動作
- [ ] Google Form 埋め込みが表示・動作
- [ ] 全ページでフォーカスリング等のアクセシビリティが保持

### ✅ 運用要件
- [ ] Vercel Dashboard で環境変数管理が可能
- [ ] デプロイログでエラー監視が可能
- [ ] 本番URLでの動作確認が完了
- [ ] (オプション) カスタムドメイン設定完了

---

## 🆘 トラブルシューティング

### デプロイエラーが発生する場合
1. ローカルで `npm run build` が成功するか確認
2. 環境変数の typo や未設定を確認
3. Vercel Dashboard > Settings > Functions でログ確認

### API が動作しない場合  
1. Network タブで API レスポンスを確認
2. Dify API の利用制限・認証エラーを確認
3. CORS 設定が適切か確認

### 設定変更後の反映
```bash
# 再デプロイ
vercel --prod

# 環境変数確認
vercel env ls
```

---

🎉 **Happy Deploying!** 

このガイドに従って設定すれば、`あんぷうどり` サイトが Vercel で正常動作します。