const chalk = require('chalk')
const {
  logError,
  logProgress,
  logSuccess,
  filePath,
  makeRelative
} = require('../../helpers')
const {
  createStub,
  insertIntoLoader
} = require('./funcs')

exports.command = 'filter <name>'
exports.alias = 'make filter'
exports.desc = 'Scaffold a new filter or filter collection'
exports.handler = function (argv) {
  const {
    join
  } = require('path');
  const fileName = `${argv.name}.js`
  const stubPath = join(__dirname, 'stubs', 'filter.stub');
  const filterDir = join(process.cwd(), '11ty', 'filters');
  const filterFile = join(filterDir, fileName);
  const filterIndex = join(filterDir, 'loader.js');

  // Create the filter file
  createStub(stubPath, filterFile)
    .then(() => insertIntoLoader(filterIndex, `./${fileName}`, `module.exports = conf => {`))
    .then(() => logSuccess(`${argv.name} added in ${filePath(makeRelative(filterFile))}`))
    .catch(error => logError(error))
}