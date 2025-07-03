// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBxyM5mJONdLxPYyU9D4fsf_SuU9Zro-YU",
    authDomain: "thridee-1d812.firebaseapp.com",
    projectId: "thridee-1d812",
    storageBucket: "thridee-1d812.firebasestorage.app",
    messagingSenderId: "248817102061",
    appId: "1:248817102061:web:9c625dda83f49615cd30e4"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

export function getFirebaseAuthMessage(code: string): string {
	return {
		"auth/user-not-found": "No account with that email.",
        "auth/invalid-credential": "Wrong email or password.",
        "auth/credential-already-in-use": "Email already registered.",
		"auth/wrong-password": "Wrong password.",
		"auth/email-already-in-use": "Email already registered.",
		"auth/invalid-email": "Invalid email address.",
		"auth/weak-password": "Password is too weak.",
	}[code] ?? "Unknown error. Please try again.";
}
