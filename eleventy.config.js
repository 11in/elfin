const includes = require('./11ty/index');
const rimraf = require('rimraf');
const {join} = require('path');

module.exports = function (conf) {

    includes(conf);

    /**
     * Copy assets into root, so that manifest records don't need modification.
     */
    conf.addPassthroughCopy({
        "content/assets": "/"
    });

    /**
     * This is necessary so that we rebuild when assets are rebuilt.
     */
    conf.setUseGitIgnore(false);

    conf.setQuietMode(true);

    /**
     * Run some cleanup after a build is made.
     */
    conf.on('afterBuild', () => {
        // Remove unneeded images.mjs files
        rimraf(join(process.cwd(), 'dist', 'images.*.mjs?(.map)'), {}, err => {
            if (err) {
                console.error(err)
            }
        });
    });

    return {
        dir: {
            input: "content",
            output: "dist",
            includes: "_includes",
            layouts: "_layouts",
        }
    }
};
