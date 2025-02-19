const { query } = require('./config/database'); // データベース接続をインポート

async function checkTables() {
    try {
        const tables = await query("SHOW TABLES");
        console.log("データベース内のテーブル一覧:", tables);
    } catch (error) {
        console.error("テーブル取得エラー:", error);
    }
}

checkTables();
