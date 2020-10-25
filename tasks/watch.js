const chokidar = require('chokidar');
const {debounce} = require('lodash');
const compile = require('./compile');

(async () => {
  await compile();

  console.log('Watching source files for changes...');
  chokidar
      .watch('app/**/*', {ignoreInitial: true})
      .on('all', debounce(compile, 100));
})();
