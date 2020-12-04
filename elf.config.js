module.exports = {
    functions: {
        scaffold: {},
        generators: {
            commands: [
                require('./elf/generate/blog'),
                require('./elf/generate/project'),
            ]
        }
    }
}
