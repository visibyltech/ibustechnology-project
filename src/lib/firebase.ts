import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase web configuration is public client configuration. Protect data with
// Firebase Authentication and Firestore Security Rules, never with this API key.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyATbuXOAH2kAJXD4A9ckV3w6Xar4JIMyms',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'ibus-technology.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'ibus-technology',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'ibus-technology.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '457353582562',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:457353582562:web:003fb16cfd13f7b26d8bbb',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
