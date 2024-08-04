// import 'dotenv/config';
export default {
  "expo": {
    "name": "appmeau",
    "slug": "appmeau",
    "owner": "app-meau",
    "version": "1.0.0",
    "scheme": "your-app-scheme",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "package": "com.appmeau.appmeau",
      "adaptiveIcon": {
        "foregroundImage": "./assets/icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      [
        "expo-font",
        { "fonts": ["node_modules/@expo-google-fonts/roboto/Roboto_400Regular.ttf",
                    "node_modules/@expo-google-fonts/roboto/Roboto_500Medium.ttf"] }
      ]
    ],
    "extra": {
      // EXPO_PUBLIC_API_KEY: process.env.EXPO_PUBLIC_API_KEY,
      // EXPO_PUBLIC_AUTH_DOMAIN: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
      // EXPO_PUBLIC_PROJECT_ID: process.env.EXPO_PUBLIC_PROJECT_ID,
      // EXPO_PUBLIC_STORAGE_BUCKET: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
      // EXPO_PUBLIC_APP_ID: process.env.EXPO_PUBLIC_APP_ID,
      
      "router": {
        "origin": false
      },
      "eas": {
        "projectId": "8af45675-5aa4-42b7-a145-e9132bb85aec"
      }
    }
  }
}
