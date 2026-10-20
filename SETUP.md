# Portfolio setup

This is a responsive portfolio that reads public GitHub repositories at page load. It uses plain HTML, CSS, and JavaScript and needs no build step.

## Personalize it

Edit `site-config.js` to update your name, specialty, location, email, LinkedIn URL, and featured projects. Add repository names to `featuredRepos` to place them first; leave the array empty to show recent projects. Update the profile README at the repository root with any additional bio details.

## Publish

This repository is named after your GitHub username, so enabling GitHub Pages from **Settings → Pages → Deploy from a branch → main / (root)** will publish the site at `https://singhshubham4422.github.io/`.

The portfolio refreshes from GitHub’s public API on each visit and shows up to six recently updated, non-fork public repositories. API availability and rate limits can temporarily affect that list.

The repository name matches your username, and its root `README.md` is the profile README GitHub displays on your profile.
