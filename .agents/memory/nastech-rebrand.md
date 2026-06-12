---
name: NasTech rebrand + AMOLED theme + Expo
description: Full rebrand, AMOLED theme, Expo APK setup, credentials, mobile polish
---

## Credentials
- Admin user: `admin` / `NasTech2024!`  (created at app/L2/admin/)
- Command to change: `node space user password admin --password "new-pass"`

## AMOLED Theme
- Core palette in `app/L0/_all/mod/_core/framework/css/colors.css` — true #000000 canvases
- Overrides + text containment in `app/L0/_all/mod/_core/framework/css/nastech-polish.css`
- Login/enter pages have INLINE `:root` style blocks — must update those separately from colors.css
- All 5 HTML pages have inline color token blocks AND meta theme-color tags — both must be updated when changing palette

**Why:** The static HTML pages (login, enter) load before the app JS and have their own inline `:root` blocks that override colors.css. Changes to colors.css alone won't affect them.

**How to apply:** When changing any color, update colors.css AND do sed replacements in login.html/enter.html inline style blocks.

## Expo Mobile App
- Location: `mobile/` directory
- Entry: `mobile/App.js` — WebView wrapper pointing to `SERVER_URL`
- Config: `mobile/app.json`, `mobile/eas.json`
- Build APK: `cd mobile && npm install && eas login && eas init && npm run build:apk`
- Change server URL in App.js before building

## Mobile CSS
- Login breakpoints: 760px (single column), 520px (compact), 400px (extra-compact)
- Global safety net (min-width:0, overflow-wrap:break-word, max-width:100%) injected at end of both pages' style blocks
- Text overflow fixes in nastech-polish.css for all app surfaces

## Key files
- `app/L0/_all/mod/_core/framework/css/colors.css` — AMOLED palette (app only)
- `app/L0/_all/mod/_core/framework/css/nastech-polish.css` — overrides + polish (app only)
- `server/pages/login.html` — standalone page with own inline CSS
- `server/pages/enter.html` — standalone page with own inline CSS
- `mobile/App.js` — Expo native shell (change SERVER_URL before APK build)
- `replit.md` — credentials + project overview

## Mobile Fix Details (learned from debugging)
- **Topbar overflow root cause**: `onscreen-menu.css` had buttons at 34px min-width with 7+ items — 386px+ minimum on a 390px phone. Fixed with `@media (max-width: 540px)` that hides all `span` text labels inside `.space-topbar-button` (keeps x-icon only), reduces buttons to 28-30px.
- **Login panel below fold**: DOM order is `intro` first, `login-panel` second. Single-column grid on mobile pushes login form below viewport. Fixed with `order: -1` on `.login-panel` at ≤760px.
- **Admin shell mobile**: `flex-direction: row` with fixed `--split-size: 380px` left pane + iframe. On phones, left pane fills screen leaving 0px for iframe. Fixed by appending `@media (max-width: 760px)` to `shell.css` that hides `.divider` and `.main-pane`, makes `.admin-pane` full-width column.
- **File locations for mobile**: `onscreen-menu.css` (topbar), `shell.css` (admin split pane), `nastech-polish.css` (global overrides).
