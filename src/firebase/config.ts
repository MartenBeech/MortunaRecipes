import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { REACT_APP_FIREBASE_CONFIG } from "../../env";

const firebaseConfig = REACT_APP_FIREBASE_CONFIG;

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
