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
        "content/files": "/files/",
        "content/_build": "/",
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

    return {
        dir: {
            input: "content",
            output: "dist",
            includes: "_includes",
            layouts: "_layouts",
        }
    }
};
