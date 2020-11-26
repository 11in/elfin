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
  } = require('fs');
  const stubPath = join(__dirname, 'stubs', 'filter.stub');
  const filterDir = join(process.cwd(), '11ty', 'filters');
  const filterFile = join(filterDir, `${argv.name}.js`);
  const filterIndex = join(filterDir, 'index.js');

  readFile(stubPath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    writeFile(filterFile, data, (err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(`${argv.name} filter created`)

      
    })
  })
}