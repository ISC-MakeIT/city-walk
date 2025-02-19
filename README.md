# Hackathon

このプロジェクトは、Hackathon イベント用の React アプリケーションです。Docker を使用して、簡単に開発環境を構築し、MySQL データベースと連携できます。

## 必要なもの

-Docker

-Git

## セットアップ手順

 ### 1. リポジトリのクローン

まず、プロジェクトのリポジトリをクローンします。

git clone <repository-url>
cd hackathon

 ### 2. 開発環境の立ち上げ

以下のコマンドで Docker コンテナをビルドし、アプリケーションを起動します。

docker-compose up --build

これにより、以下のサービスが立ち上がります。

React アプリケーション: ポート 3000 でアクセス可能

バックエンド（Express）: ポート 3001 でアクセス可能

MySQL データベース: ポート 3306 でアクセス可能

### 3. アプリケーションの確認

http://localhost:3000 にアクセスし、React アプリケーションが動作しているか確認します。

### 4. データベース接続の確認

MySQL に接続するための情報は、docker-compose.yml 内に記載されています。

ホスト名: db（コンテナ名）
ポート: 3306
データベース名: hackathon
ユーザー名: hackathon_user
パスワード: hackathon_pass

# MySQL への接続方法

## 1. MySQL コンテナに接続する

docker exec -it hackathon-db mysql -u hackathon_user -p

パスワード hackathon_pass を入力すると、MySQL にログインできます。

## 2. MySQL クライアントから接続する

mysql -h 127.0.0.1 -P 3306 -u hackathon_user -p

## 3. phpMyAdmin を利用する（オプション）

MySQL データベースをブラウザ上で管理したい場合は、phpMyAdmin を追加できます。

docker-compose.yml に以下を追加してください。

phpmyadmin:
image: phpmyadmin
restart: always
ports:
- "8080:80"
environment:
- PMA_HOST=db
- MYSQL_ROOT_PASSWORD=rootpassword
depends_on:
- db

追加後、再度 docker-compose up --build を実行し、

http://localhost:8080 にアクセスすると phpMyAdmin で MySQL を管理できます。

### 5. 開発の進め方

ソースコードは src/ ディレクトリ内にあります。React アプリケーションのソースコードを変更し、保存することで、開発サーバーが自動的に更新されます（ホットリロード）。

必要に応じて、バックエンドの MySQL データベースを操作することもできます。

新しいパッケージを追加した場合は、コンテナ内で npm install を実行して依存関係をインストールしてください。

ディレクトリ構成
```angular2html
/hackathon
├── backend/               # バックエンド（Express API）
│   ├── src/               # サーバーサイドのソースコード
│   ├── package.json       # バックエンドの依存関係とスクリプト
│   ├── Dockerfile         # バックエンドの Docker 設定
│   └── ...
├── frontend/              # フロントエンド（React アプリケーション）
│   ├── src/               # フロントエンドのソースコード
│   ├── package.json       # フロントエンドの依存関係とスクリプト
│   ├── Dockerfile         # フロントエンドの Docker 設定
│   └── ...
├── db_data/               # MySQL のデータ永続化ボリューム
├── docker-compose.yml     # Docker Compose 設定ファイル
├── README.md              # このファイル
└── .gitignore             # Git の無視設定
```
## 注意点

- docker-compose.yml で定義されたサービス（React アプリケーション、バックエンド、MySQL）を同時に起動するためには、docker-compose up --build を使用してください。

- npm install や npm run build などのコマンドは、Docker コンテナ内で実行されるため、ホスト側の環境に影響はありません。

# 質問 (FAQ)

- Q: node_modules/ がないのに依存関係はどうやってインストールされるのか？

- A: Dockerfile で npm install を実行するため、コンテナ内に依存関係がインストールされます。ローカルには node_modules を含める必要はありません。

- Q: npm run start でエラーが発生する場合は？

- A: まず、docker-compose logs を使ってエラーメッセージを確認し、必要に応じて設定を修正してください。

- Q: MySQL に接続できない場合は？

- A: 以下の手順を試してください。

### docker ps で hackathon-db が起動しているか確認する。

### docker logs hackathon-db でエラーメッセージを確認する。

### docker exec -it hackathon-db mysql -u hackathon_user -p で直接ログインを試す。

### FLUSH PRIVILEGES; を実行して権限をリロードする。

### docker-compose down && docker-compose up --build でコンテナを再構築する。

# 以上で、開発環境のセットアップが完了します！