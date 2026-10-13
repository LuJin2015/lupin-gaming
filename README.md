# Lupin Gaming

Browser arcade hosted on GitHub Pages.

## Games
- **Star Clicker** — timed click challenge.
- **Neon Snake** — keyboard/touch snake.
- **Skybound Showdown** — 2D platformer with room-code WebSocket multiplayer.

## GitHub Pages
Repository Settings → Pages → **Deploy from a branch** → branch `main`, folder `/(root)`.

## Multiplayer service
Worker source: `workers/platformer-room.js`. The frontend expects `wss://lupin-platformer.lujinsg.workers.dev`. It uses a Cloudflare Durable Object called `GameRoom` for room state. If the service isn't deployed, solo practice remains playable; GitHub Pages alone cannot host WebSockets.
