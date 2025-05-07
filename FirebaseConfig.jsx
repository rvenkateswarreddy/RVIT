import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBY65uoxMdo4aXPNSRDuvhQWde6Kud3SRc",
  authDomain: "application-ff16b.firebaseapp.com",
  projectId: "application-ff16b",
  storageBucket: "application-ff16b.firebasestorage.app",
  messagingSenderId: "527348565981",
  appId: "1:527348565981:web:3ef3243e5c4f4d6b22d834",
  measurementId: "G-EX2K4NCX8L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
