module.exports = conf => {

    /**
     * This is a basic markdown render, using the same engine used by the
     * rest of the site.
     */
    conf.addFilter('md', string => {
        return require('../shared/markdown').render(string)
    })

    /**
     * This renders the markdown "inline" which basically means "without
     * wrapping <p> tags." This should probably only be used for relatively
     * short pieces of text that can't be reasonably assumed to have
     * paragraphs, etc. Otherwise you may get odd results.
     */
    conf.addFilter('md_inline', string => {
        return require('../shared/markdown').renderInline(string)
    })
}
