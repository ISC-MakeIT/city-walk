import React from "react";
import { useLocation } from "react-router-dom";
import "./Footer.css";

const Footer: React.FC = () => {
    const location = useLocation();

    return (
        <footer className="app-footer">
            <ul>
                <li>
                    <a href="/home" className={location.pathname === "/home" ? "active" : ""}>ホーム</a>
                </li>
                <li>
                    <a href="/todo" className={location.pathname === "/todo" ? "active" : ""}>ToDo履歴</a>
                </li>
                <li>
                    <a href="/setting" className={location.pathname === "/setting" ? "active" : ""}>設定</a>
                </li>
                <li>
                    <a href="/progress" className={location.pathname === "/progress" ? "active" : ""}>マップ</a>
                </li>
            </ul>
        </footer>
    );
};

export default Footer;