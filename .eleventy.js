const includes = require('./11ty/index');

module.exports = function (conf) {

    includes(conf);

    /**
     * Copy assets into root, so that manifest records don't need modification.
     */
    conf.addPassthroughCopy({
        "site/assets": "/"
    });

    /**
     * This is necessary so that we rebuild when assets are rebuilt
     */
    conf.setUseGitIgnore(false);

    conf.setQuietMode(true);

    return {
        dir: {
            input: "site",
            output: "dist"
        }
    }
};
