module.exports = conf => {
    require('./filters/index')(conf);
    require('./shortcodes/index')(conf);
    require('./collections/index')(conf);
}
