const bundles = require('./bundles');

module.exports = async () => {
  console.log('Compiling modern and legacy script bundles...\n');
  await bundles();

  console.log('Site ready!');
};
