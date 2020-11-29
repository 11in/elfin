const {
    getCollectionConfig,
    compileContent,
    writeContent
} = require('./funcs')
const {
    options,
    singular,
    template: {
        frontmatter,
        contentPath
    }
} = getCollectionConfig('blog')
const {
    logSuccess,
    filePath
} = require('../../helpers')

exports.command = `${singular} <title>`
exports.desc = `Create a new ${singular}`
exports.builder = (yargs) => {
    return yargs
        .options(options)
}
exports.handler = function (argv) {
    writeContent({
            argv,
            pathTemplate: contentPath,
            content: compileContent({
                argv,
                frontmatter,
            }),
        })
        .then(value => {
            logSuccess(`Created new ${singular} "${argv.title}" at ${filePath(value)}`)
        })
        .catch(err => console.error(err))
}