
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.73907724dd3243c8bc0e50d7a6422104',
  appName: 'speechflow-journey-builder',
  webDir: 'dist',
  server: {
    url: 'https://73907724-dd32-43c8-bc0e-50d7a6422104.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#2563eb',
      showSpinner: true,
      spinnerColor: '#ffffff'
    },
    StatusBar: {
      style: 'default',
      backgroundColor: '#2563eb'
    }
  }
};

export default config;
