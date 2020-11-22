const fs = require("fs");
const path = require("path");
const util = require("util");
const readFile = util.promisify(fs.readFile);

const webpackAsset = async name => {
    const buildConf = await readFile(path.resolve(__dirname, "..", "..", "tasks", "config.json"));
    const manifestData = await readFile(
        path.resolve(__dirname, "..", "..", "site", "assets", JSON.parse(buildConf).manifestFileName)
    );
    const manifest = JSON.parse(manifestData);
    return manifest[name];
};

const webpackAssetContents = async name => {
    const assetName = await webpackAsset(name);
    const filePath = path.resolve(__dirname, "..", "..", "site", "assets", assetName);

    return readFile(filePath);
};

const webpackAssetExists = async name => {
    const assetName = await webpackAsset(name);
    return assetName !== undefined;
}

module.exports = {
    webpackAsset,
    webpackAssetContents,
    webpackAssetExists
}
