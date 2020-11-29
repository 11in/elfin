const { DateTime } = require("luxon");
const { string } = require("yargs");

module.exports = {
    collections: [{
        type: 'blog',
        singular: 'post',
        // These are used to generate the content
        template: {
            contentPath: `content/blog/{{ slug }}.md`,
            frontmatter: {
                title: `{{ title }}`,
                date: `{{ date }}`,
            }
        },
        // Passed directly to yargs options argument for the `make` function.
        // This allows you to customize what is required to generate an entry in this collection
        options: {
            // 'title': {
            //     alias: 't',
            //     demandOption: true,
            //     type: 'string',
            //     requiresArg: true,
            //     description: "Title of the post"
            // },
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
        }
    }]
}