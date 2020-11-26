module.exports = conf => {
    /**
     * This gets all items tracked by 11ty that have either a `redirect`
     * or `alias` property.
     */
    conf.addCollection('redirects', api => {
        return api
            .getAll()
            .filter(entry => {
                return entry.data.redirect || entry.data.alias;
            })
    })
}
