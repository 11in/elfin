/**
 * This needs to run early, and allows us to get things from a .env file
 */
require('dotenv').config()

const includes = require('./11ty/loader');
const rimraf = require('rimraf');
const {
    join
} = require('path');

module.exports = function (conf) {

    /**
     * Set up the following:
     *  - Plugins
     *  - Filters
     *  - Shortcodes
     *  - Collections
     */
    includes(conf);

    /**
     * Copy assets into root, so that manifest records don't need modification.
     */
    conf.addPassthroughCopy({
        "content/assets": "/"
    });

    /**
     * Customize the markdown renderer.
     * This is for 11ty's rendering of md files--it won't apply to other uses
     * of markdown rendering in the project unless this same library is used
     * in those instances.
     */
    conf.setLibrary("md", require('./11ty/shared/markdown'))

    /**
     * This is necessary so that we rebuild when assets are rebuilt.
     */
    conf.setUseGitIgnore(false);

    /**
     * Less noise since we're running this through another CLI
     */
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
