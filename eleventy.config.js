/**
 * This needs to run early, and allows us to get things from a .env file
 */
require('dotenv').config()

module.exports = function (conf) {

    /**
     * Set up the following:
     *  - Plugins
     *  - Filters
     *  - Shortcodes
     *  - Collections
     */
    require('./11ty/loader')(conf);

    /**
     * Copy assets into root
     */
    conf.addPassthroughCopy({
        "site/files": "/files/",
        "site/_build": "/",
    });

    /**
     * Customize the markdown renderer.
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

    return {
        dir: {
            input: "site",
            output: "dist",
            includes: "_includes",
            layouts: "_layouts",
        }
    }
};
