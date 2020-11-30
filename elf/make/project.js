module.exports = {
    type: 'project',
    singular: 'project',
    template: {
        contentPath: `content/project/{{ slug }}.md`,
        frontmatter: {
            title: `{{ title }}`,
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