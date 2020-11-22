module.exports = conf => {
    conf.addShortcode('asset_image', function (manifest, filename) {
        const path = require('path');

        const unHashName = (n) => {
            return n.replace(/(-[\w\d]{20})$/gm, '');
        }

        const {name: searchName, ext: dottedExt} = path.parse(filename);
        const ext = dottedExt.replace('.', '');

        // Yes, the key is an empty string.
        const images = manifest[''];

        if (undefined === images) {
            return ''; // No image manifest; no image
        }

        if (undefined === images[ext]) {
            return ''; // No images with this extension
        }

        if (Array.isArray(images[ext])) {
            const match = images[ext].find(asset => {
                const {name} = path.parse(asset);
                return searchName === unHashName(name);
            });
            return match === 'undefined'
                ? ''
                : match;
        } else if ('string' === typeof images[ext]) {
            const {name} = path.parse(images[ext]);
            return searchName === unHashName(name)
                ? images[ext]
                : '';
        }

        // Couldn't find anything
        return '';
    })
}
