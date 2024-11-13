// FirebaseContext.tsx
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, doc, getFirestore } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDdPeQABhLChtsrZ06mPW8BY3rT8ZsiQFU",
    authDomain: "olx-clone-1b6a4.firebaseapp.com",
    projectId: "olx-clone-1b6a4",
    storageBucket: "olx-clone-1b6a4.firebasestorage.app",
    messagingSenderId: "721810415248",
    appId: "1:721810415248:web:edd3d0b65eeb71836ac215"
  };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const storage = getStorage()

export const imageRef = ref(storage,'images');

export const db = getFirestore(app);
export const productRef = doc(collection(db, "pro"));


// Initialize Firebase

