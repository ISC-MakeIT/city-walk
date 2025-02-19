const { query } = require('../config/database'); // 1行目でquery関数をインポート

// タスクを追加
exports.addTodo = async (req, res) => {
    const { comment, point_value } = req.body;
    if (!comment || !point_value) {
        return res.status(400).json({ message: 'タスクのコメントとポイント値が必要です' });
    }

    try {
        // タスクをデータベースに追加
        const result = await query('INSERT INTO todos (comment, point_value) VALUES (?, ?)', [comment, point_value]);

        res.status(201).json({ message: 'タスク追加成功', todoId: result.insertId });
    } catch (error) {
        console.error("タスク追加エラー:", error);
        res.status(500).json({ message: 'サーバーエラー', error: error.message });
    }
};

// タスクを完了し、ユーザーにポイントを加算
exports.completeTodo = async (req, res) => {
    const { userId, todoId } = req.body;
    if (!userId || !todoId) {
        return res.status(400).json({ message: 'ユーザーIDとタスクIDが必要です' });
    }

    try {
        // タスクのポイント値を取得
        const [todo] = await query('SELECT point_value, completed FROM todos WHERE id = ?', [todoId]);
        if (!todo || todo.length === 0) {
            return res.status(404).json({ message: 'タスクが見つかりません' });
        }

        // すでにタスクが完了している場合
        if (todo[0].completed === 1) {
            return res.status(400).json({ message: 'このタスクはすでに完了しています' });
        }

        const pointValue = todo[0].point_value;

        // タスクを完了状態に更新
        await query('UPDATE todos SET completed = 1 WHERE id = ?', [todoId]);

        // ユーザーのポイントを加算
        await query('UPDATE users SET points = points + ? WHERE id = ?', [pointValue, userId]);

        res.json({ message: 'タスク完了 & ポイント加算成功', addedPoints: pointValue });
    } catch (error) {
        console.error("タスク完了エラー:", error);
        res.status(500).json({ message: 'サーバーエラー', error: error.message });
    }
};
