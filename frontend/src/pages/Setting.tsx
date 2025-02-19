import React, { useState, useEffect } from "react";
import Profile from "../components/Profile";  // プロフィールコンポーネントをインポート

const Setting: React.FC = () => {
    const [fontSize, setFontSize] = useState<number>(16);
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        const savedProfile = localStorage.getItem("profile");
        if (savedProfile) {
            setProfile(JSON.parse(savedProfile));
        }

        const savedFontSize = localStorage.getItem('fontSize');
        if (savedFontSize) {
            setFontSize(parseInt(savedFontSize));
        }
    }, []);

    const handleSaveFontSize = () => {
        localStorage.setItem('fontSize', fontSize.toString());
    };

    return (
        <div style={{ padding: "20px" }}>
            <Profile profile={profile} />
            <p><a href="/profile-setting">プロフィール設定はこちらから→</a></p>
            <h1>設定ページ</h1>
            <div className="setting-section">
                <label htmlFor="font-size">文字の大きさ：</label>
                <input
                    type="range"
                    id="font-size"
                    min={12}
                    max={36}
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                />
                <span style={{ marginLeft: "10px" }}>{fontSize}px</span>
            </div>
            <button onClick={handleSaveFontSize}>完了</button>
            <div className="preview" style={{ fontSize: `${fontSize}px`, marginTop: "20px" }}>
                <p>こんにちは！これは日本語のテキストです。文字の大きさを変更してみてください。</p>
            </div>
        </div>
    );
};

export default Setting;
