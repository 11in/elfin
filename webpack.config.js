// const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
// const AssetsPlugin = require('assets-webpack-plugin');
// const assetsPluginInstance = new AssetsPlugin({
//     filename: 'assets.json',
//     fullPath: false,
//     path: path.join(__dirname, 'content', '_data'),
// });

const isProd = process.env.NODE_ENV === 'production';

module.exports = [require('./build/webpack.config.main'), require('./build/webpack.config.legacy')];

