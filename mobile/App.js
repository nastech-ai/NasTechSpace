import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";

// ─── CONFIGURATION ────────────────────────────────────────────────────────────
// Change SERVER_URL to your deployed NasTech server address.
// For local development: http://YOUR_LOCAL_IP:5000
// For production:        https://your-nastech.replit.app
const SERVER_URL = "https://your-nastech.replit.app";

// Injected JS: passes native app flags to the web page
const INJECTED_JS = `
  (function() {
    window.__NASTECH_NATIVE__ = true;
    window.__NASTECH_PLATFORM__ = "${Platform.OS}";
    // Signal the web app we're running inside the native shell
    document.documentElement.setAttribute("data-nastech-native", "${Platform.OS}");
  })();
  true;
`;

const AMOLED = {
  bg:        "#000000",
  surface:   "#0d0d0d",
  border:    "rgba(255,255,255,0.08)",
  text:      "#f0f6ff",
  textMuted: "#9aaec8",
  accent:    "#7ddcff",
  danger:    "#ff7b8a",
};

export default function App() {
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [loadError, setLoadError]  = useState(null);
  const [loading, setLoading]      = useState(true);

  // Android hardware back button
  useEffect(() => {
    if (Platform.OS !== "android") return;
    const handler = BackHandler.addEventListener("hardwareBackPress", () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    });
    return () => handler.remove();
  }, [canGoBack]);

  function handleRetry() {
    setLoadError(null);
    setLoading(true);
    webViewRef.current?.reload();
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={AMOLED.bg}
        translucent={false}
      />

      {loadError ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠</Text>
          <Text style={styles.errorTitle}>Cannot connect</Text>
          <Text style={styles.errorBody}>
            {"Make sure your NasTech server is running and the SERVER_URL in App.js is correct.\n\n"}
            <Text style={styles.errorUrl}>{SERVER_URL}</Text>
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {loading && (
            <View style={styles.splashOverlay}>
              <Text style={styles.splashTitle}>NasTech</Text>
              <ActivityIndicator color={AMOLED.accent} size="large" style={{ marginTop: 24 }} />
            </View>
          )}

          <WebView
            ref={webViewRef}
            source={{ uri: SERVER_URL }}
            style={[styles.webview, loading && styles.hidden]}
            injectedJavaScriptBeforeContentLoaded={INJECTED_JS}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            allowsInlineMediaPlayback={true}
            mediaPlaybackRequiresUserAction={false}
            sharedCookiesEnabled={true}
            thirdPartyCookiesEnabled={true}
            allowsFullscreenVideo={true}
            pullToRefreshEnabled={false}
            overScrollMode="never"
            bounces={false}
            automaticallyAdjustContentInsets={false}
            contentInsetAdjustmentBehavior="never"
            keyboardDisplayRequiresUserAction={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            onNavigationStateChange={(state) => setCanGoBack(state.canGoBack)}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            onError={() => setLoadError(true)}
            onHttpError={(e) => {
              if (e.nativeEvent.statusCode >= 500) setLoadError(true);
            }}
            userAgent={`NasTech-Native/1.0 (${Platform.OS}; Expo ${Constants.expoVersion ?? ""})`}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: AMOLED.bg,
  },
  webview: {
    flex: 1,
    backgroundColor: AMOLED.bg,
  },
  hidden: {
    opacity: 0,
    position: "absolute",
    width: 0,
    height: 0,
  },
  splashOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: AMOLED.bg,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  splashTitle: {
    color: AMOLED.accent,
    fontSize: 38,
    fontWeight: "700",
    letterSpacing: 2,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: AMOLED.bg,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorTitle: {
    color: AMOLED.text,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  errorBody: {
    color: AMOLED.textMuted,
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    maxWidth: 280,
    marginBottom: 28,
  },
  errorUrl: {
    color: AMOLED.accent,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    fontSize: 12,
  },
  retryButton: {
    backgroundColor: AMOLED.accent,
    paddingHorizontal: 32,
    paddingVertical: 13,
    borderRadius: 999,
  },
  retryText: {
    color: "#000d18",
    fontSize: 16,
    fontWeight: "700",
  },
});
