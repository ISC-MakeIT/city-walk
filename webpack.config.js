const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // エントリーポイント (アプリケーションのメインファイル)
    entry: './src/index.js',

    // 出力設定
    output: {
        filename: 'bundle.js',  // 出力ファイル名
        path: path.resolve(__dirname, 'dist')  // 出力先ディレクトリ
    },

    // モジュールの設定
    module: {
        rules: [
            {
                test: /\.js$/,  // jsファイルを対象
                exclude: /node_modules/,  // node_modulesは除外
                use: 'babel-loader'  // Babelを使ってトランスパイル
            },
            {
                test: /\.css$/,  // CSSファイルを対象
                use: ['style-loader', 'css-loader']  // CSSを適切に読み込む
            },
            {
                test: /\.html$/,  // HTMLファイルを対象
                use: 'html-loader'  // HTMLをインポートできるようにする
            }
        ]
    },

    // プラグインの設定
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',  // 使用するHTMLテンプレート
        })
    ],

    // 開発サーバーの設定
    devServer: {
        contentBase: path.join(__dirname, 'dist'),  // 出力先
        compress: true,  // gzip圧縮を有効に
        port: 9000  // ポート番号
    }
};
