const chokidar = require('chokidar');
const {
  debounce
} = require('lodash');
const Eleventy = require('@11ty/eleventy');
const ssg = new Eleventy();
const compile = require('./compile');

(async () => {
  await compile();
  await ssg.init();
  await ssg.write();

  console.log('Watching source files for changes...');
  chokidar
    .watch('assets/**/*', {
      ignoreInitial: true
    })
    .on('all', debounce(async () => {
      await compile();
      await ssg.init();
      await ssg.write();
    }, 100));
})();