const filters = require('./filters/index');
const shortcodes = require('./shortcodes/index');

module.exports = conf => {
    filters(conf);
    shortcodes(conf);
    require('./collections/index')(conf);
}
