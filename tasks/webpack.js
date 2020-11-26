const webpack = require('webpack');
const config = require('../webpack.config');
const hashConfig = require('./hash.config');
const {join} = require('path');
const {hashElement} = require('folder-hash');
const {existsSync, readFileSync, writeFile} = require('fs');

const hashFilePath = join(__dirname, '..', 'webpack.hash');

const getHash = () => {
    if (existsSync(hashFilePath)) {
        return readFileSync(hashFilePath, 'utf-8');
    }
    return null;
}

const saveHash = (hash) => {
    writeFile(hashFilePath, hash, err => {
        if (err) {
            console.error(err);
        }
    })
}

hashElement(join(__dirname, '..'), hashConfig)
    .then(hash => {
        if (hash.hash !== getHash()) {
            console.log("Assets have changed!");
            console.log("Running webpack...");
            webpack(config, (err, stats) => {
                if (err || stats.hasErrors()) {
                    console.error(err, stats.hasErrors());
                }
                saveHash(hash.hash);
                console.log("Hash saved");
                console.log("Assets built");
            })
        } else {
            console.log("Using cached assets and skipping webpack!");
        }
    });

