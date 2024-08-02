
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDKHpQrzPqft0EcUGz_TQ9vL7HGtb8Tj-I",
  authDomain: "tripplanner-9bdad.firebaseapp.com",
  projectId: "tripplanner-9bdad",
  storageBucket: "tripplanner-9bdad.appspot.com",
  messagingSenderId: "888025058386",
  appId: "1:888025058386:web:6a31d63d837ae60f6f238b",
  measurementId: "G-WEXDEJPDB9"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)