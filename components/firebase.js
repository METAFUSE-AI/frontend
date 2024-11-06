// firebase.js
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Constants from "expo-constants";

const firebaseConfig = {
  apiKey: Constants.manifest.extra.firebase.api_key,
  authDomain: `${Constants.manifest.extra.firebase.project_id}.firebaseapp.com`,
  projectId: Constants.manifest.extra.firebase.project_id,
  storageBucket: Constants.manifest.extra.firebase.storage_bucket,
  messagingSenderId: Constants.manifest.extra.firebase.project_number,
  appId: Constants.manifest.extra.firebase.mobilesdk_app_id,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
