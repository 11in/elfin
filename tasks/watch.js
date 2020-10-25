const chokidar = require('chokidar');
const {debounce} = require('lodash');
const compile = require('./compile');

(async () => {
  await compile();

  console.log('Watching source files for changes...');
  chokidar
      .watch('assets/**/*', {ignoreInitial: true})
      .on('all', debounce(compile, 100));
})();
