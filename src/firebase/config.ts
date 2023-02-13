import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdHH2IafyZHioQc0Rn6_jJ5fyNM1CrCvw",
  authDomain: "mortunarecipes.firebaseapp.com",
  projectId: "mortunarecipes",
  storageBucket: "mortunarecipes.appspot.com",
  messagingSenderId: "672641012153",
  measurementId: "G-0H0TQH3VQH",
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
