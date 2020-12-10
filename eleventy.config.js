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
     */
    const contain = require('markdown-it-container')
    const changeClass = t => {
        return {
            render: (tokens, idx) => {
                const type = tokens[idx].type;
                if (`container_${t}_open` === type) {
                    return `<div class="admonition-${t}">`
                }
                else return `</div>`
            }
        }
    }
    const md = require('markdown-it')({
            html: true, // For parity w/ 11ty default setting
            xhtmlOut: true, // Why not validate
            typographer: true, // Slightly nicer typography
        })
        // This adds anchors to headings so they can be linked to
        .use(require('markdown-it-anchor'))
        // This allows inserting a table of contents w/
        .use(require('markdown-it-toc-done-right'), {
            listType: 'ul',
        })
        // These enable admonitions similar to asciidoc
        .use(contain, 'note', changeClass('note'))
        .use(contain, 'tip', changeClass('tip'))
        .use(contain, 'warning', changeClass('warning'))
        .use(contain, 'important', changeClass('important'))

    conf.setLibrary("md", md)

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
