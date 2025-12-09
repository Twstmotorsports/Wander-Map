import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDCjtEtmwysWsZFWcZgQ5JL4_RjZuCt-VI',
  authDomain: 'wandermapweb-app.firebaseapp.com',
  projectId: 'wandermapweb-app',
  storageBucket: 'wandermapweb-app.firebasestorage.app',
  messagingSenderId: '685024309542',
  appId: '1:685024309542:web:866fe3a9437fc575a211e7',
  measurementId: 'G-4T9JZYPT6Z',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);