# Portfolio setup

A single-page portfolio in plain HTML, CSS and JavaScript. It needs no build step.

## Personalize it

- **Contact links:** edit `site-config.js` and set `email` and `linkedinUrl`. Empty values keep those links hidden.
- **Content:** projects, research, experience and skills are written directly in `index.html`, so you choose exactly what appears and in what order.
- **Colors and type:** the palette and fonts are CSS variables at the top of `styles.css` (`--accent` is the green used for highlights and the contact band).

## Publish

The live site at `https://singhshubham4422.github.io/` is served from a separate repository, [`singhshubham4422.github.io`](https://github.com/singhshubham4422/singhshubham4422.github.io). GitHub only serves that root address from a repository with exactly that name. After changing the site here, copy `index.html`, `styles.css`, `main.js`, `site-config.js` and `favicon.svg` into that repository and push it.

This repository is named after your GitHub username, so its root `README.md` is the profile README GitHub displays on your profile. GitHub Pages is also turned on here, which publishes a second copy of the site at `https://singhshubham4422.github.io/singhshubham4422/`.
