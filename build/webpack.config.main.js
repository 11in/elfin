const base = require('./webpack.config.base')
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    ...base,

    name: 'main',
    entry: {
        main: [
            path.join(__dirname, '..', 'assets', 'scripts', 'main.js'),
            path.join(__dirname, '..', 'assets', 'styles', 'css.js'),
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, '..', 'dist'),
        compress: true,
        port: 9000,
        watchContentBase: true,
        hot: true,
        publicPath: '/',
        // stats: 'errors-only'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        exclude: [
                            /core-js/,
                            /regenerator-runtime/,
                        ],
                        presets: [
                            ['@babel/preset-env', {
                                loose: true,
                                modules: false,
                                // debug: true,
                                corejs: 3,
                                useBuiltIns: 'usage',
                                targets: {
                                    browsers: [
                                        'last 2 Chrome versions', 'not Chrome < 60',
                                        'last 2 Safari versions', 'not Safari < 10.1',
                                        'last 2 iOS versions', 'not iOS < 10.3',
                                        'last 2 Firefox versions', 'not Firefox < 54',
                                        'last 2 Edge versions', 'not Edge < 15',
                                    ],
                                },
                            }],
                        ],
                        sourceType: 'unambiguous',
                        plugins: ['@babel/plugin-syntax-dynamic-import'],
                    },
                },
            },
            {
                test: /\.?pcss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        },
                    },
                    'postcss-loader',
                ]
            },
        ]
    }
}
