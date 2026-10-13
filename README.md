# Lupin Gaming

Browser arcade hosted on GitHub Pages.

## Games
- **Star Clicker** — timed click challenge.
- **Neon Snake** — keyboard/touch snake.
- **Skybound Showdown** — endless procedurally generated platformer, room-code WebSocket multiplayer, persistent positions, and a global leaderboard.

## GitHub Pages
Repository Settings → Pages → **Deploy from a branch** → branch `main`, folder `/(root)`.

## Multiplayer service
Worker source: `workers/platformer-room.js`. The frontend expects `wss://lupin-platformer.lujinsg.workers.dev`. It uses a Cloudflare Durable Object called `GameRoom` for room state. If the service isn't deployed, solo practice remains playable; GitHub Pages alone cannot host WebSockets.

## Skybound Showdown data
The `lupin-platformer` Worker uses the separate Cloudflare D1 database `lupin-gaming-data` (binding `DB`). Tables: `player_profiles` stores best scores/distances; `player_positions` stores each player's latest reported position, score, stars, and room. The browser sends progress every few seconds; `/api/leaderboard` serves the top 25 records. The original `lupin-cloud` database is not used by this game.
