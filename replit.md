# NasTech

Your private AI agent platform. Built for teams, runs anywhere.

## Login Credentials

| Role  | Username | Password       |
|-------|----------|----------------|
| Admin | `admin`  | `NasTech2024!` |

To change the password:
```bash
node space user password admin --password "your-new-password"
```

To create additional users:
```bash
node space user create alice --password "secret123" --full-name "Alice" --groups _admin
```

## Running the server

The app starts automatically via the configured workflow.

Manual start:
```bash
node space serve PORT=5000
```

## API (for Expo / React Native)

All `/api/*` endpoints support CORS `*`. Full info at:
```
GET /api/expo_check   — Returns auth guide and connection info
GET /api/health       — Always returns {ok:true} if the server is up
```

Auth flow for Expo:
1. `POST /api/login` with `{username, password}` → session cookie
2. Include cookie in subsequent requests (`credentials: 'include'` on web, cookie-jar on RN)
3. Or use `POST /api/guest_create` for anonymous access

## Mobile / Expo APK

The `mobile/` directory contains a ready-to-build Expo project.

Quick steps:
```bash
cd mobile
npm install
# Preview in Expo Go:
npx expo start
# Build APK (needs free EAS account):
npm install -g eas-cli && eas login && eas init
npm run build:apk
```

See `mobile/README.md` for full build instructions.

Before building, set your server URL in `mobile/App.js`:
```js
const SERVER_URL = "https://your-nastech.replit.app";
```

## Project structure

```
space            — CLI entry point (node space serve / user / update / supervise)
server/          — HTTP server + API endpoints
  api/           — All REST endpoints (login, health, expo_check, …)
  pages/         — Static HTML pages (login, enter, admin, index)
  router/        — CORS, routing, auth middleware
app/             — Frontend app (loaded via iframe in the admin shell)
  L0/            — Base layer (framework CSS, core modules)
  L2/            — Per-user data (created by "node space user create")
mobile/          — Expo React Native wrapper for Android/iOS APK
packaging/       — Native desktop (Electron) build toolchain
commands/        — CLI sub-commands (serve, user, update, supervise)
```

## User preferences

- AMOLED black theme throughout (true #000000 backgrounds)
- No text may overflow its container — all text auto-fits its box
- Rounded corners: 22px topbar/panels, 16px cards, 14px buttons
- NasTech branding everywhere (no "Space Agent" references)
