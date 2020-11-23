module.exports = () => {
    const isProd = process.env.NODE_ENV === 'production';

    let plugins = [
        require('postcss-import'),
        require('postcss-preset-env'),
        require('tailwindcss'),
    ];

    if (isProd) {
        plugins.push(require('cssnano'));
    }

    return {
        plugins: plugins,
    };
}
