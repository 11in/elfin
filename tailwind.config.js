module.exports = {
    mode: 'jit',
    purge: [
        './site/**/*.njk',
        './site/**/*.html',
        './assets/scripts/**/*.js',
    ],
    darkMode: 'media',
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
