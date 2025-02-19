import React from 'react';
import { Link } from 'react-router-dom'; // リダイレクト用

const NotFound: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>404 - ページが見つかりません</h1>
            <p>ご指定のページは存在しないか、移動した可能性があります。</p>
            <p>
                <Link to="/home" style={{ textDecoration: 'none', color: '#007bff' }}>
                    ホームページへ戻る
                </Link>
            </p>
        </div>
    );
};

export default NotFound;
