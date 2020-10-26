const bundles = require('./bundles');

module.exports = async () => {
  console.log('Compiling modern and legacy script bundles...');
  await bundles();

  console.log('Assets ready!');
};
