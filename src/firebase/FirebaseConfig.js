// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'Api-Key',
  authDomain: 'ur.firebaseapp.com',
  projectId: 'ur',
  storageBucket: 'ur.appspot.com',
  messagingSenderId: 'ur',
  databaseURL: 'Database-Url',
  appId: '1:ur:web:ur',
  measurementId: 'G-ur',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
