# EmailJS 設定ガイド

ContactフォームからEmail送信を有効にするためのEmailJS設定手順

## 1. EmailJSアカウント作成
- https://www.emailjs.com/ にアクセス
- アカウントを作成（無料プランあり）

## 2. Email Service接続
1. Dashboard → Email Services → Add Service
2. Gmail、Outlook、Yahoo等を選択
3. メールアカウントを接続・認証

## 3. Email Template作成
1. Dashboard → Email Templates → Create New Template
2. 以下のTemplate変数を使用：

```
Subject: {{service}} - お問い合わせ from {{from_name}}

神谷様

以下のお問い合わせを受信しました：

お名前: {{from_name}}
会社名: {{company}}
メールアドレス: {{from_email}}
電話番号: {{phone}}
希望サービス: {{service}}

お問い合わせ内容:
{{message}}

---
送信日時: {{date}}
送信先: {{to_email}}
```

## 4. 設定値取得
- Public Key: Account → API Keys → Public Key
- Service ID: Email Services → 使用するサービスのID
- Template ID: Email Templates → 作成したテンプレートのID

## 5. script.js更新
以下の箇所を実際の値に置き換え：

```javascript
const PUBLIC_KEY = "your_actual_public_key";
const SERVICE_ID = "your_actual_service_id"; 
const TEMPLATE_ID = "your_actual_template_id";
```

## 6. テスト
1. サイトのContactフォームで送信テスト
2. takashi.kamiya@roc-your-world.com にメールが届くか確認

## 注意点
- 無料プランは月200回まで
- 実際のメール送信には有効なEmailJS設定が必要
- 設定未完了時は開発用メッセージが表示される