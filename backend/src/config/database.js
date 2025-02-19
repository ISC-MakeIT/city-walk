const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
    connectionLimit: 10,
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "password",
    database: process.env.DB_NAME || "hackathon",
    port: process.env.DB_PORT || 3306
};

const pool = mysql.createPool(dbConfig);

// ✅ 接続確認用の関数
const connectDB = async () => {
    let connection;
    try {
        connection = await pool.getConnection();
        console.log("Connected to the MySQL database");
        connection.release();
    } catch (err) {
        console.error("Error connecting to the database:", err.message);
        throw err;
    }
};

const query = async (sql, params = []) => {
    try {
        if (!sql) throw new Error("SQL クエリが提供されていません。");
        if (!Array.isArray(params)) throw new Error("params は配列である必要があります。");

        const [results] = await pool.execute(sql, params);
        return results;
    } catch (err) {
        console.error("Database query error:", err.message);
        return { error: err.message };
    }
};

module.exports = { pool, query, connectDB };
