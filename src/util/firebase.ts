import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import Constants from 'expo-constants';
const firebaseConfig = {
  apiKey: Constants.manifest?.extra?.EXPO_PUBLIC_API_KEY,
  authDomain: Constants.manifest?.extra?.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: Constants.manifest?.extra?.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: Constants.manifest?.extra?.EXPO_PUBLIC_STORAGE_BUCKET,
  appId: Constants.manifest?.extra?.EXPO_PUBLIC_APP_ID,
};
export const firebase = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(firebase);
export const storage = getStorage(firebase);

export const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
