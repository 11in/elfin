module.exports = class Redirect {
    // Redirects are meant to be permanent
    static canonicalCode = `301`;

    // Aliases are meant to be (potentially) transient
    static aliasCode = `302`;

    // Hardcode some redirects here
    static canonical = [
        {
            from: `/here`,
            to: `/there`,
        },
    ]

    // Hardcode some aliases here
    static aliases = [
        {
            from: `/then`,
            to: `/now`,
        },
    ]

    data() {
        return {
            permalink: `/_redirects`,
            no_sitemap: true,
        };
    }

    makeLine(from, to, code) {
        return `${from}\t${to}\t${code}`;
    }

    compileEntryRows(collection, code) {
        // Sometimes these are empty!
        if (!Array.isArray(collection) || collection.length < 1) {
            return [];
        }
        return collection
            .reduce((coll, cur) => {
                const {redirect} = cur.data;

                if (Array.isArray(redirect)) {
                    redirect
                        .map(from => this.makeLine(from, cur.url, code))
                        .forEach(row => coll.push(row));
                    return coll;
                }

                if (`string` === typeof redirect) {
                    coll.push(this.makeLine(redirect, cur.url, code));
                    return coll;
                }

                // ???
                return coll;
            }, [])
    }

    buildRuleCollect(entries, hardcoded, code) {
        return this.compileEntryRows(entries, code)
            .concat(Array.isArray(hardcoded)
                ? hardcoded.map(row => this.makeLine(row.from, row.to, code))
                : []);
    }

    canonical(data) {
        return this.buildRuleCollect(
            data.collections.redirects.filter(entry => entry.data.redirect),
            Redirect.canonical,
            Redirect.canonicalCode
        );
    }

    aliases(data) {
        return this.buildRuleCollect(
            data.collections.redirects.filter(entry => entry.data.alias),
            Redirect.aliases,
            Redirect.aliasCode
        );
    }

    render(data) {
        return `${this.canonical(data).join(`\n`)}\n${this.aliases(data).join(`\n`)}`;
    }
}
