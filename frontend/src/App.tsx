import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// ページコンポーネントのインポート
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import Progress from "./pages/Progress";
import Setting from "./pages/Setting";
import { Header } from "./components/Header"; // Header コンポーネントのインポート
import Footer from "./components/Footer";
import ProfileSetting from "./components/ProfileSetting";
// @ts-ignore
import NotFound from "./pages/NotFound";  // NotFound コンポーネントのインポート

// 📌 ここでコンテキストを正しくインポート！
import { FontSizeProvider } from "./context/FontSizeContext";

// 必要なCSSのインポート
import './pages/Home.css'
import './components/Header.css'; // Header コンポーネントの CSS
import "./App.css"; // App 全体のスタイル

const App: React.FC = () => {
  const [userPoints, setUserPoints] = useState<number>(0); // ユーザーのポイントを管理

  return (
      <FontSizeProvider> {/* フォントサイズのプロバイダーを最上位に移動 */}
        <Router>
          <div>
            {/* ヘッダーにポイントを渡す */}
            <Header points={userPoints} />
            {/* メインコンテンツ */}
            <main className="app-main">
              <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route
                    path="/todo"
                    element={<Todo setUserPoints={setUserPoints} userPoints={userPoints} />} // TodoにsetUserPointsとuserPointsを渡す
                />
                <Route path="/setting" element={<Setting />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/profile-setting" element={<ProfileSetting />} />
                {/* 404 ページ */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            {/* フッター */}
            <Footer />
          </div>
        </Router>
      </FontSizeProvider>
  );
};

export default App;
