# Lupin Gaming

A browser-game collection built for GitHub Pages.

## Play locally or deploy

- **Home / game library:** [index.html](./index.html)
- **Star Clicker:** [games/star-clicker.html](./games/star-clicker.html)
- **Neon Snake:** [games/snake.html](./games/snake.html)

To publish with GitHub Pages, open **Settings → Pages**, select **Deploy from a branch**, choose **main** and **/(root)**, then save. The site will be available at `https://lujin2015.github.io/lupin-gaming/` after Pages finishes building.

## Current features

- Responsive dark arcade landing page
- Star Clicker: 15-second score challenge
- Neon Snake: keyboard and on-screen controls
- Personal best scores saved in the current browser with `localStorage`
- Small hidden palette easter egg on the home page: press **Shift + Alt + L**

## Roadmap

Accounts, global leaderboards and multiplayer require a shared backend. They are **not connected yet**; browser-local scores are not global and can be reset by clearing site data. The next step is to connect a Cloudflare Worker and D1 database with server-validated score submissions before enabling shared rankings.

## Development

These games use plain HTML, CSS and JavaScript; no build step or package installation is required.
