const chalk = require('chalk')
const {logError, logProgress, logSuccess} = require('../../helpers')

exports.command = 'filter <name>'
exports.alias = 'make filter'
exports.desc = 'Scaffold a new filter or filter collection'
exports.handler = function (argv) {
  const {
    join
  } = require('path');
  const {
    readFile,
    writeFile
  } = require('fs/promises');
  const fileName = `${argv.name}.js`
  const stubPath = join(__dirname, 'stubs', 'filter.stub');
  const filterDir = join(process.cwd(), '11ty', 'filters');
  const filterFile = join(filterDir, fileName);
  const filterIndex = join(filterDir, 'loader.js');

  // Create the filter file
  readFile(stubPath, 'utf-8')
    .then(async fileContents => {

      try {
        await writeFile(filterFile, fileContents, {
          flag: 'wx'
        })
        logProgress(`Wrote ${fileName}`)
        return
      } catch (error) {
        if (`EEXIST` === error.code) {
          return Promise.reject(`${fileName} already exists`)
        }

        // If it's a different error, push that up the chain
        return Promise.reject(error)
      }
    })
    .then(() => {
      return readFile(filterIndex, 'utf-8')
    })
    .then(fileContents => {
      const newFilterRequire = `require('./${fileName}')(conf);`;

      if (-1 !== fileContents.indexOf(newFilterRequire)) {
        return Promise.reject(`${fileName} already included in loader`)
      }

      let data = fileContents.split(`\n`)
      const line = data.indexOf(`module.exports = conf => {`);

      if (-1 === line) {
        return Promise.reject("Could not insert into filter loader")
      }

      data.splice(line + 1, 0, `\t${newFilterRequire}`)
      return data.join(`\n`)
    })
    .then(newIndexContent => {
      return writeFile(filterIndex, newIndexContent)
    })
    .then(() => logProgress(`Inserted require statement into loader`))
    .then(() => logSuccess(`${argv.name} added!`))
    .catch(error => logError(error))
}