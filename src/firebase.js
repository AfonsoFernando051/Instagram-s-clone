// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBNtPzlBV6BjHslm98CfFMeh3A9rc-T-dE",
    authDomain: "instagram-clone-react-9de60.firebaseapp.com",
    projectId: "instagram-clone-react-9de60",
    storageBucket: "instagram-clone-react-9de60.appspot.com",
    messagingSenderId: "152792676634",
    appId: "1:152792676634:web:4fa11dd35dafc19f5e54a3",
    measurementId: "G-WYQNY6LWDE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage();

export const teste = (email, password) => {

    createUserWithEmailAndPassword(email, password)
};

export default app