const includes = require('./11ty/index');

module.exports = function (conf) {

    includes(conf);

    /**
     * Copy assets into root, so that manifest records don't need modification.
     */
    conf.addPassthroughCopy({
        "site/assets": "/"
    });

    return {
        dir: {
            input: "site",
            output: "dist"
        }
    }
};