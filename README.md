# Lupin Gaming

Browser arcade hosted on GitHub Pages.

## Games
- **Star Clicker** — timed click challenge.
- **Neon Snake** — keyboard/touch snake.
- **Skybound Showdown** — endless platformer with constrained, reachable platform spacing, room-code multiplayer, optional push-to-talk voice chat, persistent player positions, a global leaderboard, achievements, and XP levels.

## GitHub Pages
Repository Settings → Pages → **Deploy from a branch** → branch `main`, folder `/(root)`.

## Multiplayer service
Worker source: `workers/platformer-room.js`. The frontend expects `wss://lupin-platformer.lujinsg.workers.dev`. It uses a Cloudflare Durable Object called `GameRoom` for room state and WebRTC signaling. Voice chat requires microphone permission, a secure context (GitHub Pages is HTTPS), and players in the same room. Hold **Hold to talk** to transmit; incoming audio can be muted. Direct peer-to-peer voice may depend on the players' networks and STUN connectivity.

## Skybound Showdown data
The `lupin-platformer` Worker uses the separate Cloudflare D1 database `lupin-gaming-data` (binding `DB`). Tables:
- `player_profiles` — best scores/distances/stars, XP, and level.
- `player_positions` — latest saved coordinates, score, stars, and room.
- `player_achievements` — persistent achievement unlocks.

The API exposes `/api/leaderboard`, `/api/profile?playerId=...`, and `/api/progress`. XP and achievements are calculated server-side from validated progress; this is basic anti-cheat validation, not a fully cheat-proof competitive system. The original `lupin-cloud` database is not used by this game.
