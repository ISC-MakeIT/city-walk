// Header.tsx
interface HeaderProps {
    points: number;
}

const Header: React.FC<HeaderProps> = ({ points }) => {
    return (
        <div>
            <div className="header">日常生活アプリ</div>
            <div className='app-date'>
                <div className={"nowDay"}>今日の日付: {new Date().toLocaleDateString('ja-JP')}</div>
                <div className={"point"}>獲得ポイント数：{points}p</div>
            </div>
        </div>
    );
};

export { Header };
