const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const assetsPluginInstance = new AssetsPlugin({
    filename: 'assets.json',
    fullPath: false,
    path: path.join(__dirname, 'content', '_data'),
});

const isProd = process.env.NODE_ENV === 'production';

const configureBabelLoader = (browserlist) => {
    return {
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
                            browsers: browserlist,
                        },
                    }],
                ],
                sourceType: 'unambiguous',
                plugins: ['@babel/plugin-syntax-dynamic-import'],
            },
        },
    };
};

module.exports = [{
    name: 'modern',
    mode: process.env.NODE_ENV || 'development',
    devtool: 'source-map',
    entry: {
        modern: path.join(__dirname, 'assets', 'entry.js')
    },
    stats: 'errors-only',
    output: {
        filename: isProd ? '[name].[contenthash].mjs' : '[name].mjs',
        path: path.join(__dirname, 'content', 'assets'),
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: isProd ? '[name].[contenthash].css' : '[name].css'
        }),
        assetsPluginInstance,
    ],
    module: {
        rules: [
            configureBabelLoader([
                // The last two versions of each browser, excluding versions
                // that don't support <script type="module">.
                'last 2 Chrome versions', 'not Chrome < 60',
                'last 2 Safari versions', 'not Safari < 10.1',
                'last 2 iOS versions', 'not iOS < 10.3',
                'last 2 Firefox versions', 'not Firefox < 54',
                'last 2 Edge versions', 'not Edge < 15',
            ]),
            {
                test: /\.css$/i,
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
            }
        ]
    }
}, {
    name: 'legacy',
    mode: process.env.NODE_ENV || 'development',
    devtool: 'source-map',
    stats: 'errors-only',
    entry: {
        legacy: path.resolve('assets', 'legacy.js')
    },
    output: {
        filename: isProd ? '[name].[contenthash].js' : '[name].js',
        path: path.resolve(__dirname, 'content', 'assets'),
    },
    plugins: [
        assetsPluginInstance,
    ],
    module: {
        rules: [
            configureBabelLoader([
                '> 1%',
                'last 2 versions',
                'Firefox ESR',
            ]),
        ]
    }
}];
