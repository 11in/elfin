const includes = require('./11ty/index');

module.exports = function (conf) {

    includes(conf);

    return {
        dir: {
            input: "site",
            output: "dist"
        }
    }
};