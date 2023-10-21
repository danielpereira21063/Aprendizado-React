// Copied from Firebase console:
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD5KUK0olN8gyjaGbmdsq7oqazyxI3AdPE",
    authDomain: "miniblog-b3325.firebaseapp.com",
    projectId: "miniblog-b3325",
    storageBucket: "miniblog-b3325.appspot.com",
    messagingSenderId: "23937756990",
    appId: "1:23937756990:web:58ce592c0a125632e0c66f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Created here:
// Initialize database from Firestore (need to import Firestore on top)
const db = getFirestore(app);

// Export database
export { db };