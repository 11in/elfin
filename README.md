# Elfin 🧝

An opinionated template for building a site based on [11ty](https://11ty.dev) and [Tailwind](https://tailwindcss.com).

## What Do I Get

- Fast dev with a simple local server (like every other framework)
- Delivers modern JS to modern browsers, and shitty JS to shitty browsers
- Tailwind! 2.0!
- Minimizes and optimizes CSS and JS
- Lossless compression of images (jpg, png, svg) used in CSS or JS
- Used webpack's cache to speed up builds (if you're on Netlify, it automatically caches the cache there!)
- A handy [CLI](https://github.com/11in/elf), if you want it

## How Do I Use It

- `npm run build` - Builds the entire site into the `dist` directory
- `npm run deploy` - Run a production build (use this when deploying).
- `npm run dev` - Builds, watches, and serves the site at https://localhost:900

**WARNING**

> Because there are essentially two "builds" that happen here (11ty and Webpack) there is a bit of _file shuffling_ that goes on.
> **If a directory or file is in `.gitignore` then it is probably part of that shuffling and you should leave it alone.** i.e. `content/_build/`, etc.

For more information on how to use Elfin, visit the website: https://elfin.netlify.app
