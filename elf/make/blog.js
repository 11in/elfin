const {
    DateTime
} = require("luxon");

module.exports = {
    type: 'blog',
    singular: 'post',
    template: {
        contentPath: `content/blog/{{ slug }}.md`,
        frontmatter: {
            title: `{{ title }}`,
            date: `{{ date }}`,
        }
    },
    module: {
        command: 'post <title>',
        desc: 'Make a blog post',
        builder: yargs => {
            return yargs
                .options({
                    'slug': {
                        alias: 's',
                        requiresArg: true,
                        type: 'string',
                        default: '',
                        description: "Part of the filename and also the URL",
                        defaultDescription: "A sanitized version of the title"
                    },
                    'date': {
                        alias: 'd',
                        type: 'string',
                        requiresArg: true,
                        default: DateTime.local(),
                        defaultDescription: "Current date and time",
                        description: "The date (and optionally time) in an ISO 8061 compatible format",
                        coerce: arg => DateTime.fromISO(arg)
                    },
                    'content': {
                        alias: 'c',
                        type: 'string',
                        requiresArg: true,
                        description: "The content of the entry, in markdown.",
                        default: '',
                        defaultDescription: "An empty string"
                    }
                })
        }
    }
}