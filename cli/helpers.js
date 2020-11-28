const chalk = require("chalk")

module.exports = {
    logError: error => {
        console.log(chalk.bgRed.white(`⚠️ Oh No!`))
        console.error(error)
    },
    logProgress: msg => {
        console.log(chalk.green(msg))
    },
    logSuccess: msg => {
        console.log(``)
        console.log(chalk.blue(`✅ ${msg}`))
    },
    filePath: path => {
        return chalk.bgGreen.black(` ${path} `)
    },
    makeRelative: path => {
        return path.replace(`${process.cwd()}/`, '')
    }
}