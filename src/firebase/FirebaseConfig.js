// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC33Pdc5rVvlYRsLorzjloQyJLSYBRLfq4',
  authDomain: 'chat-app-7e210.firebaseapp.com',
  projectId: 'chat-app-7e210',
  storageBucket: 'chat-app-7e210.appspot.com',
  messagingSenderId: '406446219953',
  databaseURL: 'https://chat-app-7e210-default-rtdb.firebaseio.com',
  appId: '1:406446219953:web:35551826ffd41b521b7890',
  measurementId: 'G-XBV815CFC4',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
