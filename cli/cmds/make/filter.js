const {
  logError,
  logSuccess,
  filePath,
  makeRelative,
  makeSafe,
  getSubcommand
} = require('../../helpers')
const {
  createStub,
  insertIntoLoader
} = require('./funcs')

exports.command = 'filter <name>'
exports.desc = 'Scaffold a new filter or filter collection'
exports.builder = (yargs) => {
  return yargs
    .example([
      [`$0 ${getSubcommand(yargs)} spaceship_name`, "Creates a filter called 'spaceship_name'"],
      [`$0 ${getSubcommand(yargs)} spaceship_name --stub /home/user/file.stub`, "Creates an filter from a custom stub instead of the default"],
    ])
}
exports.handler = function (argv) {
  const {
    join
  } = require('path');
  const safeName = makeSafe(argv.name)
  const fileName = `${safeName}.js`
  const stubPath = join(__dirname, 'stubs', 'filter.stub');
  const filterDir = join(process.cwd(), '11ty', 'filters');
  const filterFile = join(filterDir, fileName);
  const filterIndex = join(filterDir, 'loader.js');

  // Create the filter file
  createStub({
      stub: stubPath,
      destination: filterFile,
      argv
    })
    .then(() => insertIntoLoader(filterIndex, `./${fileName}`, `module.exports = conf => {`))
    .then(() => logSuccess(`${argv.name} added in ${filePath(makeRelative(filterFile))}`))
    .catch(error => logError(error))
}