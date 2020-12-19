const path = require('path')

module.exports = {
    cache: {
        type: 'filesystem',
        cacheDirectory: path.resolve(__dirname, '..', '.webpack')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '..', 'content', 'assets'),
        publicPath: "/",
    },
    mode: process.env.NODE_ENV || 'development',
    devtool: 'eval-cheap-module-source-map',
    stats: 'errors-only',
}
