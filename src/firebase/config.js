// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore } from "firebase/firestore"; //Importar firestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvlC2pE2U5mHSbIHj68yPQgmgzbgkHT-s",
  authDomain: "restaurant-app-dbd98.firebaseapp.com",
  projectId: "restaurant-app-dbd98",
  storageBucket: "restaurant-app-dbd98.firebasestorage.app",
  messagingSenderId: "144785513533",
  appId: "1:144785513533:web:fd7b35bb2ef7b76ffc9e54",
  measurementId: "G-LPFK4DWZGV"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);

const FirebaseFirestore = getFirestore(FirebaseApp);
const analytics = getAnalytics(FirebaseApp);

export {
    FirebaseApp, FirebaseFirestore
}