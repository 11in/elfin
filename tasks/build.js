const rimraf = require('rimraf');
const compile = require('./compile');

console.log("Clearing old assets...")
rimraf('./site/assets', {}, e => {
  if (e) {
    console.error(e)
  } else {
    console.log("All clear!");
    (async () => {

      await compile();
    })();
  }
});