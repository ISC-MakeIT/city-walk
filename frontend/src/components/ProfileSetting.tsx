import React, { useState } from "react";
import axios from "axios";

const ProfileSetting: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [age, setAge] = useState<number>(0);
    const [sex, setSex] = useState<string>("");
    const [error, setError] = useState<string>(""); // エラーメッセージを管理

    // 保存ボタンがクリックされたときの処理
    const handleSave = async () => {
        if (!name || age <= 0 || !sex) {
            setError("すべてのフィールドを正しく入力してください");
            return; // 不正な入力の場合は保存処理を行わない
        }

        try {
            const response = await axios.post("http://localhost:3001/api/users", {
                name,
                age,
                sex
            });
            if (response.status === 201) {
                alert("プロフィールが保存されました");
                // フォームをリセット
                setName("");
                setAge(0);
                setSex("");
                setError(""); // エラーメッセージのクリア
            } else {
                console.error("エラーレスポンス:", response);
                alert("保存に失敗しました");
            }
        } catch (error) {
            console.error("プロフィール保存エラー:", error);
            // @ts-ignore
            setError("保存に失敗しました。詳細: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div>
            <h1>プロフィール設定</h1>
            {error && <p style={{ color: "red" }}>{error}</p>} {/* エラーメッセージの表示 */}
            <p>名前:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="名前を入力"
                />
            </p>
            <p>年齢:
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    min={1}
                    placeholder="年齢を入力"
                />
            </p>
            <p>性別:
                <select value={sex} onChange={(e) => setSex(e.target.value)}>
                    <option value="">選択してください</option>
                    <option value="男性">男性</option>
                    <option value="女性">女性</option>
                    <option value="その他">それ以外</option>
                </select>
            </p>
            <div>
                <button onClick={handleSave} disabled={!name || age <= 0 || !sex}>保存</button>
            </div>
        </div>
    );
};

export default ProfileSetting;
