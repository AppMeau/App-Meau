git pull origin main
yarn
EXPO_TOKEN=DbpEBEd4O5E3Iui57nyWe_j13wV2xp7S_NwhJ6PL eas build --profile development --platform android --local
mv build*.apk build/appmeau.apk
