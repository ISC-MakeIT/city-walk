const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./config/database'); // `connectDB` をインポート
const userRoutes = require('./routes/userRoutes'); // userRoutes のインポート

const app = express();

app.use(cors()); // CORSの設定
app.use(express.json()); // JSONリクエストボディの処理

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// ここで '/api' プレフィックスを付けて userRoutes を設定
app.use('/api', userRoutes); // すべての /api で始まるリクエストを userRoutes にルーティング

// ✅ 修正: `connectDB()` を呼び出してからサーバー起動
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed", error);
    });
