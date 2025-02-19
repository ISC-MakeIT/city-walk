const User = require('../models/userModel');

// ユーザー一覧を取得
exports.getUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// 新しいユーザーを作成
exports.createUser = async (req, res) => {
    const { name, age, sex } = req.body;

    // バリデーションチェック
    if (!name || !age || !sex) {
        return res.status(400).json({ message: "名前、年齢、性別はすべて入力してください" });
    }

    try {
        // ユーザー作成
        const newUser = await User.createUser(name, age, sex);
        res.status(201).json(newUser);  // 新しいユーザーのデータをレスポンスとして返す
    } catch (error) {
        console.error("ユーザー作成エラー:", error);
        res.status(500).json({ message: 'サーバーエラー', error: error.message });
    }
};

// ユーザー情報を更新
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, age, sex } = req.body;

    // バリデーションチェック
    if (!name || !age || !sex) {
        return res.status(400).json({ message: "名前、年齢、性別はすべて入力してください" });
    }

    try {
        const updatedUser = await User.updateUser(id, name, age, sex);  // 更新されたデータを User モデルに渡す
        res.json(updatedUser);
    } catch (error) {
        res.status(error.message === 'User not found' ? 404 : 500).json({ message: error.message });
    }
};

// ユーザーを削除
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await User.deleteUser(id);
        res.json(result);
    } catch (error) {
        res.status(error.message === 'User not found' ? 404 : 500).json({ message: error.message });
    }
};
