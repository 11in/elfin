

module.exports = {
    functions: {
        scaffold: {},
        make: {
            commands: [
                require('./elf/make/blog'),
                require('./elf/make/project'),
            ]
        }
    }
}