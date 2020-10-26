const rimraf = require('rimraf');
const Eleventy = require('@11ty/eleventy');
const ssg = new Eleventy();
const compile = require('./compile');

console.log("Clearing old assets...")
rimraf('./site/assets', {}, e => {
  if (e) {
    console.error(e)
  } else {
    console.log("All clear!");
    (async () => {
      // webpack build
      await compile();

      // 11ty build
      console.log("Building site...")
      await ssg.init();
      await ssg.write();
    })();
  }
});