const {webpackAsset, webpackAssetContents} = require("../tools/manifest");

module.exports = conf => {
    conf.addAsyncShortcode('assetName', webpackAsset)
    conf.addAsyncShortcode('assetContent', webpackAssetContents)
    conf.addAsyncShortcode('assetTag', async function (type, asset, attrs) {
        const name = await webpackAsset(asset);
        if (name) {
            switch (type) {
                case 'style':
                case 'css':
                    return `<link rel="stylesheet" ${attrs} href=${name} />`
                case 'script':
                case 'js':
                    return `<script ${attrs} src="${name}"></script>`
            }
        }

        return ``;
    })
}
