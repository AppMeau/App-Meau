import {initializeApp} from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import {API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, APP_ID} from "@env"
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyAhx8hIEcABwbOJt7LfAGMbvFzYA803urk",
    authDomain: "app-meau-f213c.firebaseapp.com",
    // The value of `databaseURL` depends on the location of the database
    projectId: "app-meau-f213c",
    storageBucket: "app-meau-f213c.appspot.com",
    appId: "1:959727693777:web:80b8566de8a37de6da7af0",
  };

export const firebase = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(firebase);
export const storage = getStorage(firebase);
