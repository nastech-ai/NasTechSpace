export const allowAnonymous = true;

export function get(context) {
  const browserAppUrl = context.requestUrl ? context.requestUrl.origin : context.browserUrl;

  return {
    ok: true,
    platform: "nastech",
    version: "1.0",
    browserAppUrl,
    expoSupport: {
      cors: true,
      auth: "session-cookie",
      apiBase: "/api",
      wsBase: null,
      notes: [
        "All /api/* endpoints support CORS (Access-Control-Allow-Origin: *).",
        "Login via POST /api/login with {username, password} to receive a session cookie.",
        "Pass the session cookie in subsequent API requests.",
        "React Native: use credentials:'include' with fetch, or a cookie-jar library such as react-native-cookies.",
        "Guest sessions: POST /api/guest_create to get a temporary session without credentials.",
        "Health check: GET /api/health — always returns {ok:true} when the server is reachable.",
        "File read/write, agent messaging, and all other APIs share this same base URL."
      ]
    }
  };
}
