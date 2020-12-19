module.exports = conf => {
    conf.addPlugin(require('@11ty/eleventy-navigation'))
    require('./cloudinary')(conf)
}
