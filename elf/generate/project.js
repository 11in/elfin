module.exports = {
    type: 'project',
    singular: 'project',
    template: {
        contentPath: `content/project/{{ slug }}.md`,
        frontmatter: {
            title: `{{ title }}`,
            tags: argv => argv.tags,
        }
    },
    module: {
        command: 'project <title>',
        desc: 'Make a project',
        builder: yargs => {
            return yargs
                .options({
                    tags: {
                        alias: 't',
                        type: 'array',
                    }
                })
        },
    }
}