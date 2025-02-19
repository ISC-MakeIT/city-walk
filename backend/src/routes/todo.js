// backend/routes/todo.js

const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// MySQL接続設定
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'todo_db',
});

db.connect();

// タスクを追加するAPI
router.post('/add', (req, res) => {
    const { comment, scheduledDate } = req.body;

    const query = `
    INSERT INTO tasks (comment, completed, scheduled_date)
    VALUES (?, ?, ?)
  `;
    db.query(query, [comment, false, scheduledDate || null], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'タスクの追加に失敗しました' });
        }
        res.status(200).json({ message: 'タスクが追加されました' });
    });
});

// タスクを取得するAPI
router.get('/get', (req, res) => {
    const query = 'SELECT * FROM tasks ORDER BY scheduled_date, id';

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'タスクの取得に失敗しました' });
        }
        res.status(200).json(results);
    });
});

module.exports = router;
