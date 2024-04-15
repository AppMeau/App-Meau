import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, APP_ID } from "@env";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  // The value of `databaseURL` depends on the location of the database
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  appId: APP_ID,
};

export const firebase = initializeApp(firebaseConfig);
