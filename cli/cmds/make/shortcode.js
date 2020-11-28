const {
    logError,
    logSuccess,
    filePath,
    makeRelative
  } = require('../../helpers')
  const {
    createStub,
    insertIntoLoader
  } = require('./funcs')

exports.command = 'shortcode <name>'
exports.desc = 'Scaffold a new shortcode or shortcode collection'
exports.handler = function (argv) {
    const {
        join
      } = require('path');
      const fileName = `${argv.name}.js`
      const stubPath = join(__dirname, 'stubs', 'shortcode.stub');
      const shortcodeDir = join(process.cwd(), '11ty', 'shortcodes');
      const shortcodeFile = join(shortcodeDir, fileName);
      const shortcodeIndex = join(shortcodeDir, 'loader.js');
    
      // Create the shortcode file
      createStub(stubPath, shortcodeFile)
        .then(() => insertIntoLoader(shortcodeIndex, `./${fileName}`, `module.exports = conf => {`))
        .then(() => logSuccess(`${argv.name} added in ${filePath(makeRelative(shortcodeFile))}`))
        .catch(error => logError(error))
}