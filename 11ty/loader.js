module.exports = conf => {
    require('./filters/loader')(conf);
    require('./shortcodes/loader')(conf);
    require('./collections/loader')(conf);
}
