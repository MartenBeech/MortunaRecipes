import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/firestore";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAuO6Y8zDFDf6tfQQ9lbwigARBWd0a0ufY",
  authDomain: "mortunarecipes.firebaseapp.com",
  databaseURL: "https://mortunarecipes.firebaseio.com",
  projectId: "mortunarecipes",
  storageBucket: "mortunarecipes.appspot.com",
  messagingSenderId: "672641012153",
  appId: "1:672641012153:android:ed2a9f10f25e66cd34a668",
  measurementId: "G-measurement-id",
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
