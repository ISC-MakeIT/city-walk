const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// タスクを追加
router.post('/add', todoController.addTodo);

// タスクを取得
router.get('/get', todoController.getTodos);

// タスクを完了（ポイント加算）
router.post('/complete', todoController.completeTodo);

// ユーザーのポイントを取得
router.get('/user-points/:userId', todoController.getUserPoints);

module.exports = router;
