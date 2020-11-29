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
    logNotice: msg => {
        console.log(chalk.blue(`ℹ️ ${msg}`))
    },
    filePath: path => {
        return chalk.bgGreen.black(` ${path} `)
    },
    makeRelative: path => {
        return path.replace(`${process.cwd()}/`, '')
    },
    makeSafe: (string, replace = '_') => {
        return string.replace(/[^a-z0-9_]/gi, replace).toLowerCase()
    },
    getSubcommand: yargs => {
        return yargs.getContext().commands.join(' ')
    }
}