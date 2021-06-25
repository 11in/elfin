const base = require('./webpack.config.base')
const path = require('path');

module.exports = {
    ...base,

    name: 'legacy',
    entry: {
        legacy: [
            path.join(__dirname, '..', '..', 'assets', 'scripts', 'app.js'),
        ],
    },
    module: {
        rules: [
            ...base.module.rules,
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
                                        '> 1%',
                                        'last 2 versions',
                                        'Firefox ESR',
                                    ],
                                },
                            }],
                        ],
                        sourceType: 'unambiguous',
                        plugins: ['@babel/plugin-syntax-dynamic-import'],
                    },
                },
            },
        ]
    }
}
