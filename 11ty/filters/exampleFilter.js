module.exports = conf => {
    conf.addFilter('exampleFilter', string => {
        return string.split('').reverse().join('');
    });
}