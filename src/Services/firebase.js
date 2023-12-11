import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGvcOZ5X5FpJUyTjaMOzuMDIcAHUgUvGs",
  authDomain: "typeform-9b684.firebaseapp.com",
  projectId: "typeform-9b684",
  storageBucket: "typeform-9b684.appspot.com",
  messagingSenderId: "860593658544",
  appId: "1:860593658544:web:30c3d4e910f8a42f89f975",
  measurementId: "G-98YV148SM7",
};

const initFirebaseApp = initializeApp(firebaseConfig);

const authFirebase = getAuth(initFirebaseApp);

const dbBanco = getFirestore(initFirebaseApp);

export { authFirebase, dbBanco };
