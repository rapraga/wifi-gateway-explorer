
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.83338692af154a0e9e513df549c33128',
  appName: 'wifi-gateway-explorer',
  webDir: 'dist',
  server: {
    url: 'https://83338692-af15-4a0e-9e51-3df549c33128.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    allowMixedContent: true,
    androidScheme: 'https',
    permissions: [
      "android.permission.ACCESS_NETWORK_STATE",
      "android.permission.ACCESS_WIFI_STATE",
      "android.permission.CHANGE_WIFI_STATE",
      "android.permission.INTERNET",
      "android.permission.ACCESS_FINE_LOCATION",
      "android.permission.ACCESS_COARSE_LOCATION"
    ]
  }
};

export default config;
