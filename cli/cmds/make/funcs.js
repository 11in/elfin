const {
    stringify
} = require('gray-matter')
const {
    join,
    parse,
} = require('path')
const {
    writeFile,
    mkdir,
} = require('fs/promises')
const {
    render
} = require('mustache')
const {
    makeSafe,
    logNotice,
    filePath,
    logError,
    makeRelative
} = require('../../helpers')

module.exports = {
    getCollectionConfig: collection => {
        const {
            collections
        } = require(join(process.cwd(), 'cli.config'))
        const config = collections.find(row => collection === row.type)
        if (!config) {
            throw new Error(`No configuration found for ${collection}`)
        }
        return config;
    },
    compileContent: ({
        argv,
        frontmatter
    }) => {
        let processed = {};
        for (const [key, value] of Object.entries(frontmatter)) {
            processed[key] = render(value, argv)
        }
        return stringify(argv.content, processed)
    },
    writeContent: ({
        argv,
        content,
        pathTemplate,
    }) => {

        if (!argv.slug) {
            const safeTitle = makeSafe(argv.title, '-')
            logNotice(`No slug provided, using ${filePath(safeTitle)}`)
            argv.slug = safeTitle
        }

        const writePath = join(process.cwd(), render(pathTemplate, argv))

        const {
            dir
        } = parse(writePath)

        return mkdir(dir)
            .catch(err => {
                if ('EEXIST' === err.code) {
                    return Promise.resolve
                }

                throw err
            })
            .then(() => {
                return writeFile(writePath, content, {
                    flag: 'wx'
                })
            })
            .catch(err => {
                if ('EEXIST' === err.code) {
                    logError(`${writePath} already exists!`)
                }
                throw err
            })
            .then(() => {
                return makeRelative(writePath)
            })
    }
}