import React, { useState } from "react"; // useStateをインポート
import { useFontSize } from "../context/FontSizeContext"; // フォントサイズを取得
import Weather from "../components/Weather";
import Todo from "../pages/Todo";  // Todo コンポーネントをインポート

const Home: React.FC = () => {
    const { fontSize } = useFontSize(); // フォントサイズを適用
    const [userPoints, setUserPoints] = useState<number>(0); // ユーザーのポイント管理

    return (
        <div style={{ fontSize: `${fontSize}px` }}>
            <Weather />
            {/* Todo コンポーネントに userPoints と setUserPoints を渡す */}
            <Todo setUserPoints={setUserPoints} userPoints={userPoints} />

        </div>
    );
};

export default Home;
