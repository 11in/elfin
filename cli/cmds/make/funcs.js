const {
    data
} = require('autoprefixer')
const chalk = require('chalk')
const {
    readFile,
    writeFile
} = require('fs/promises')
const {
    basename
} = require('path')
const {
    logProgress,
    filePath,
    makeRelative,
} = require('../../helpers')

module.exports = {
    createStub: (stubPath, destPath) => {
        const destFilename = basename(destPath)
        const stubFilename = basename(stubPath)
        return readFile(stubPath, 'utf-8')
            .then(async content => {
                try {
                    await writeFile(destPath, content, {
                        flag: 'wx',
                    })
                    logProgress(`Wrote ${filePath(destFilename)}`)
                    return Promise.resolve
                } catch (error) {
                    if (`EEXIST` === error.code) {
                        return Promise.reject(`${destFilename} already exists`)
                    }

                    // If it's a different error, push that up the chain
                    return Promise.reject(error)
                }
            })
            .catch(err => {
                if ('ENOENT' === err.code) {
                    return Promise.reject(`${filePath(stubFilename)} stub could not be found!`)
                }

                return Promise.reject(error)
            })
    },
    insertIntoLoader: (loaderPath, confPath, insertAfter) => {
        const confRequire = `require('${confPath}')(conf);`
        const confRequireFile = basename(confPath);

        return readFile(loaderPath, 'utf-8')
            .then(content => {
                if (-1 !== content.indexOf(confRequire)) {
                    return Promise.reject(`${confRequireFile} already in loader`)
                }

                let rows = content.split(`\n`)
                const line = rows.indexOf(insertAfter)

                if (-1 === line) {
                    return Promise.reject(`Unable to find "insert after" line in leader`)
                }

                rows.splice(line + 1, 0, `\t${confRequire}`)
                return rows.join(`\n`)
            })
            .then(async updated => {
                try {
                    await writeFile(loaderPath, updated, {
                        flag: 'w',
                    })
                    logProgress(`Updated ${filePath(makeRelative(loaderPath))}`)
                    return Promise.resolve
                } catch (error) {
                    Promise.reject(error)
                }
            })
    }
}