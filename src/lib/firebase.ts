import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCWIz6u1R1jCby5lB49YB9H6YUKGYCAJKA",
  authDomain: "express-plumbing-sandbox.firebaseapp.com",
  projectId: "express-plumbing-sandbox",
  storageBucket: "express-plumbing-sandbox.firebasestorage.app",
  messagingSenderId: "807015980847",
  appId: "1:807015980847:web:bb6cda1ff8862d1231cbda",
  measurementId: "G-BJWEZD8974"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

export default app

