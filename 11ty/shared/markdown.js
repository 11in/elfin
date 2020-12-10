/**
 * Add the admonition class based on the type of container.
 */
const changeClass = t => {
    return {
        render: (tokens, idx) => {
            const type = tokens[idx].type;
            if (`container_${t}_open` === type) {
                return `<div class="admonition-${t}">`
            } else return `</div>`
        }
    }
}

const contain = require('markdown-it-container')

/**
 * Set up all our customizations for the markdown renderer before exporting it.
 */
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

module.exports = md
