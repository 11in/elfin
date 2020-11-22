/**
 * Given a filename, this will return the hash name + path if the requested file exists.
 *
 * @param manifest
 * @param filename
 * @return {null|string}
 */
const locateAsset = (manifest, filename) => {
    const path = require('path');

    const unHashName = (n) => {
        return n.replace(/(-[\w\d]{20})$/gm, '');
    }

    const {name: searchName, ext: dottedExt} = path.parse(filename);
    const ext = dottedExt.replace('.', '');

    // Yes, the key is an empty string.
    const images = manifest[''];

    if (undefined === images) {
        return null; // No image manifest; no image
    }

    if (undefined === images[ext]) {
        return null; // No images with this extension
    }

    if (Array.isArray(images[ext])) {
        const match = images[ext].find(asset => {
            const {name} = path.parse(asset);
            return searchName === unHashName(name);
        });
        return match === 'undefined'
            ? null
            : match;
    } else if ('string' === typeof images[ext]) {
        const {name} = path.parse(images[ext]);
        return searchName === unHashName(name)
            ? images[ext]
            : null;
    }

    // Couldn't find anything
    return null;
}


module.exports = conf => {
    conf.addShortcode('asset_image', function (manifest, filename) {
        const match = locateAsset(manifest, filename);

        if (null === match) {
            return '';
        }

        return match;
    });

    conf.addAsyncShortcode('asset_inline', (manifest, filename) => {
        const match = locateAsset(manifest, filename);

        if (null === match) {
            return new Promise(resolve => {
                resolve('');
            });
        }

        const {join} = require('path');
        const {readFile} = require('fs');

        const fullPath = join(process.cwd(), 'content', 'assets', match);

        return new Promise(resolve => {
            readFile(fullPath, 'utf8', (err, data) => {
                if (err) {
                    resolve('');
                } else {
                    resolve(data);
                }
            })
        });
    })
}
