const {
  logError,
  logSuccess,
  filePath,
  makeRelative,
  makeSafe,
  getSubcommand,
} = require('../../helpers')
const {
  createStub,
  insertIntoLoader
} = require('./funcs')

exports.command = 'collection <name>'
exports.desc = 'Scaffold a new collection <name>'
exports.builder = (yargs) => {
  return yargs
    .example([
      [`$0 ${getSubcommand(yargs)} spaceships`, "Creates a collection called 'spaceships'"],
      [`$0 ${getSubcommand(yargs)} spaceships --glob 'spaceships/**/*.md'`, "Creates a collection called 'spaceships' that uses a specific glob"],
      [`$0 ${getSubcommand(yargs)} spaceships --stub /home/user/file.stub`, "Creates an collection from a custom stub instead of the default"],
    ])
    // If you're using a custom stub, the glob replace won't work and is pointless
    .conflicts('stub', 'glob')
    .options({
      'glob': {
        alias: 'g',
        describe: "Glob to select files for collection",
        type: 'string',
        requiresArg: true,
      },
    })
}
exports.handler = function (argv) {
  const {
    join
  } = require('path');
  const safeName = makeSafe(argv.name)
  const fileName = `${safeName}.js`
  const stubPath = join(__dirname, 'stubs', 'collection.stub');
  const collectionDir = join(process.cwd(), '11ty', 'collections');
  const collectionFile = join(collectionDir, fileName);
  const collectionIndex = join(collectionDir, 'loader.js');

  const rewriteStub = stub => {
    let content = stub
    content = content.replace(`new_collection`, safeName)

    if (argv.glob) {
      content = content.replace(`getAll()`, )
    }

    return content
  }

  // Create the collection file
  createStub({
      stub: stubPath,
      destination: collectionFile,
      argv: {
        ...argv,
        'collection_function': argv.glob ? `getFilteredByGlob('${argv.glob}')` : `getAll()`,
      }
    })
    .then(() => insertIntoLoader(collectionIndex, `./${fileName}`, `module.exports = conf => {`))
    .then(() => logSuccess(`${argv.name} added in ${filePath(makeRelative(collectionFile))}`))
    .catch(error => logError(error))
}