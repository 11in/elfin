const {
  data
} = require('autoprefixer');
const { async } = require('regenerator-runtime');

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
  const stubPath = join(__dirname, 'stubs', 'filter.stub');
  const filterDir = join(process.cwd(), '11ty', 'filters');
  const filterFile = join(filterDir, `${argv.name}.js`);
  const filterIndex = join(filterDir, 'index.js');

  // Create the filter file
  readFile(stubPath, 'utf-8')
    .then(async fileContents => {

      try {
        await writeFile(filterFile, fileContents, {
          flag: 'wx'
        })
        console.log("Wrote new filter file")
        return
      } catch (error) {
        if (`EEXIST` === error.code) {
          return Promise.reject("Filter file already exists")
        }

        // If it's a different error, push that up the chain
        return Promise.reject(error)
      }
    })
    .then(() => {
      return readFile(filterIndex, 'utf-8')
    })
    .then(fileContents => {
      const newFilterRequire = `require('./${argv.name}.js')(conf);`;

      if (-1 !== fileContents.indexOf(newFilterRequire)) {
        return Promise.reject("Filter already included in index file")
      }

      let data = fileContents.split(`\n`)
      const line = data.indexOf(`module.exports = conf => {`);

      if (-1 === line) {
        return Promise.reject("Could not insert into filter index file")
      }

      data.splice(line + 1, 0, `\t${newFilterRequire}`)
      return data.join(`\n`)
    })
    .then(newIndexContent => {
      return writeFile(filterIndex, newIndexContent)
    })
    .then(() => console.log("Inserted new filter into loader"))
    .then(() => console.log("Filter added!"))
    .catch(error => console.error(error));
}