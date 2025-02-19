
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // コントローラーをインポート
const { query } = require('../config/database');

exports.createUser = async (name, age, sex) => {
    const sql = "INSERT INTO users (name, age, sex) VALUES (?, ?, ?)";
    const params = [name, age, sex];

    try {
        const result = await query(sql, params);
        return { id: result.insertId, name, age, sex };  // 成功時にユーザー情報を返す
    } catch (error) {
        throw new Error("Error inserting user into database");
    }
};

// ユーザー一覧を取得
router.get('/users', userController.getUsers);

// ユーザーを新規作成
router.post('/users', userController.createUser);

// ユーザー情報を更新
router.put('/users/:id', userController.updateUser);

// ユーザーを削除
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
