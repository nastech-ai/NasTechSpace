# NasTech Mobile App

React Native + Expo wrapper for the NasTech web platform.

## Quick start (Expo Go for testing)

```bash
cd mobile
npm install
npx expo start
```

Scan the QR code with **Expo Go** on your phone to preview instantly.

## Build an APK (Android)

> Requires a free [Expo EAS account](https://expo.dev/signup).

```bash
cd mobile

# 1. Install EAS CLI
npm install -g eas-cli

# 2. Log in
eas login

# 3. Link your project (one-time)
eas init

# 4. Build APK (preview — sideload directly onto phone)
npm run build:apk

# 5. Download the .apk from the Expo dashboard and install on Android
```

The `.apk` file can be installed on any Android phone (enable "Install from unknown sources").

## Build AAB for Play Store

```bash
npm run build:aab
```

## Build for iOS (App Store / TestFlight)

```bash
npm run build:ios
```

## Configure your server URL

Edit `App.js` and change `SERVER_URL` to your deployed NasTech server:

```js
const SERVER_URL = "https://your-nastech.replit.app";
```

## How it works

The mobile app is a full-screen **WebView** that loads your NasTech server.
- All cookies and sessions are shared (you stay logged in)
- Back-button navigation works on Android
- AMOLED black splash screen matches the web theme
- Error screen with Retry button if the server is unreachable
