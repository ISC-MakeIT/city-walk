# ベースイメージとして Node.js を使用
FROM node:18 AS build

# 作業ディレクトリを設定
WORKDIR /app

# package.json と package-lock.json を最初にコピーして依存関係をインストール
# これにより依存関係が変わらない限りキャッシュを使うためビルドが速くなる
COPY package.json package-lock.json ./
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# ポート3001を公開
EXPOSE 3001

# 開発環境の場合（npm run devを実行）
CMD ["npm", "run", "start"]
