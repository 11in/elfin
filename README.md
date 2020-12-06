# Elfin 🧝

An opinionated template for building a site based on [11ty](https://11ty.dev) and [Tailwind](https://tailwindcss.com).

## What Do I Get

- Simple server w/ BrowserSync that watches changes to styles, scripts, and content
- Delivers modern JS to modern browsers, and shitty JS to shitty browsers
- Tailwind!
- Minimizes and optimizes CSS and JS
- Lossless compression of images (jpg, png, svg)
- If on Netlify, using Netlify's caching to only run asset builds if something has been updated
- A handy [CLI](https://github.com/11in/elf), if you want it

## How Do I Use It

- `npm run build` - Builds the entire site into the `dist` directory
- `npm run all:production` - Run a production build (use this when deploying).
- `npm run serve` - Builds, watches, and serves the site at https://localhost:8080

**WARNING**

> Because there are essentially two "builds" that happen here (11ty and Webpack) there is a bit of _file shuffling_ that goes on.
> **If a directory or file is in `.gitignore` then it is probably part of that shuffling and you should leave it alone.** i.e. `content/assets/`, `content/_data/assets.json`, etc.

For more information on how to use Elfin, visit the website: https://elfin.netlify.app
