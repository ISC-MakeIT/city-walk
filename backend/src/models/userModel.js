const db = require('../config/database'); // データベース接続をインポート

// すべてのユーザーを取得
const getAllUsers = async () => {
    try {
        const [results] = await db.promise().query('SELECT * FROM users');
        return results;
    } catch (err) {
        throw err;
    }
};

// 新しいユーザーを作成
const createUser = async (name, email, password) => {
    try {
        const [results] = await db.promise().query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, password]
        );
        return { id: results.insertId, name, email };
    } catch (err) {
        throw err;
    }
};

// ユーザーを更新
const updateUser = async (id, name, email, password) => {
    try {
        const [results] = await db.promise().query(
            'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
            [name, email, password, id]
        );
        if (results.affectedRows > 0) {
            return { id, name, email };
        } else {
            throw new Error('User not found');
        }
    } catch (err) {
        throw err;
    }
};

// ユーザーを削除
const deleteUser = async (id) => {
    try {
        const [results] = await db.promise().query(
            'DELETE FROM users WHERE id = ?',
            [id]
        );
        if (results.affectedRows > 0) {
            return { message: 'User deleted' };
        } else {
            throw new Error('User not found');
        }
    } catch (err) {
        throw err;
    }
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser };