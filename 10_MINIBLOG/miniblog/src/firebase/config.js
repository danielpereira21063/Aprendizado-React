import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyD5KUK0olN8gyjaGbmdsq7oqazyxI3AdPE",
    authDomain: "miniblog-b3325.firebaseapp.com",
    projectId: "miniblog-b3325",
    storageBucket: "miniblog-b3325.appspot.com",
    messagingSenderId: "23937756990",
    appId: "1:23937756990:web:58ce592c0a125632e0c66f"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };