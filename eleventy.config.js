const includes = require('./11ty/loader');
const rimraf = require('rimraf');
const {
    join
} = require('path');
const cloudinary = require('@11in/cloudinary');

module.exports = function (conf) {

    /**
     * Bring in all our local exentions.
     */
    includes(conf);

    /**
     * Add plugins.
     */
    conf.namespace('cl_', () => {
        conf.addPlugin(cloudinary, {
            name: "djd6kxozp",
            transforms: [
                { dpr: "auto", responsive: true, crop: "scale", }
            ],
            defaults: {
                width: 1024
            }
        })
    });

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