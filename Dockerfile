# ベースイメージとして Node.js を使用
FROM node:18 AS build

# 作業ディレクトリを設定
WORKDIR /app

# package.json と package-lock.json をコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# React アプリの開発サーバーを起動
CMD ["npm", "run", "start"]

# コンテナのポートを公開
EXPOSE 3000
