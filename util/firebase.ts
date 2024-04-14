import {initializeApp} from 'firebase/app'

import {API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, APP_ID} from "@env"

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    // The value of `databaseURL` depends on the location of the database
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    appId: APP_ID,
  };

export const firebase = initializeApp(firebaseConfig)