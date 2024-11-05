import { initializeApp } from "firebase/app";
import {
  firebaseApiKey,
  firebaseAppId,
  firebaseMessagingSenderId,
} from "../constants";

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: "snap-36ebb.firebaseapp.com",
  projectId: "snap-36ebb",
  storageBucket: "snap-36ebb.firebasestorage.app",
  messagingSenderId: firebaseMessagingSenderId,
  appId: firebaseAppId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
