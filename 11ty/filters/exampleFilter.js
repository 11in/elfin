module.exports = conf => {
    conf.addFilter('example_filter', string => {
        return string.split('').reverse().join('');
    });
}
