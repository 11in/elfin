module.exports = {
    functions: {
        scaffold: {},
        generators: {
            commands: [
                require('@11in/elf-generator-blog'),
                require('./elf/generate/project'),
            ]
        }
    }
}
