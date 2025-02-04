import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ページコンポーネントのインポート
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import Progress from "./pages/Progress";
import Setting from "./pages/Setting";
import { Header } from "./components/Header";
import Footer from "./components/Footer";
import ProfileSetting from "./components/ProfileSetting";

// 📌 ここでコンテキストを正しくインポート！
import { FontSizeProvider } from "./context/FontSizeContext";

import "./App.css"; // CSS ファイルをインポート

const App: React.FC = () => {
  return (
      <FontSizeProvider> {/* ここで正しくラップする */}
        <Router>
          <div>
            {/* ヘッダー */}
            <Header />

            {/* メインコンテンツ */}
            <main className="app-main">
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/todo" element={<Todo />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/profile-setting" element={<ProfileSetting />} />
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
