module.exports = conf => {
    require('./plugins/loader')(conf)
    require('./filters/loader')(conf)
    require('./shortcodes/loader')(conf)
    require('./collections/loader')(conf)
}
