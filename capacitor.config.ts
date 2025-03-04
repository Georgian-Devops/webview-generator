
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.a94010d697f44066876f815cf22c3805',
  appName: 'webview-generator',
  webDir: 'dist',
  server: {
    url: 'https://a94010d6-97f4-4066-876f-815cf22c3805.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    allowMixedContent: true
  },
  ios: {
    allowsLinkPreview: false
  }
};

export default config;
