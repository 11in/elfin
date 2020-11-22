/**
 * You probably don't want to edit this file!
 *
 * It collects things for our "primary" (modern) build. The JS is served to
 * modern browsers; the CSS is served to everyone.
 */

import './scripts/main';
import './styles/main.css';

/**
 * This is a bit of a hack that makes sure all our images are imported by
 * webpack.
 *
 * https://stackoverflow.com/a/53025624
 */
const importAll = require =>
    require.keys().reduce((acc, next) => {
        acc[next.replace("./", "")] = require(next);
        return acc;
    }, {});

importAll(
    require.context("./images", false, /\.(png|jpe?g|svg)$/)
);

