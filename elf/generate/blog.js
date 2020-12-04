

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
    }
}
