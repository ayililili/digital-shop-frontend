// src/firebase.ts

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDKV2tzRPxxQBwGZ_vFsyCBMGLhWwAKuYs",
  authDomain: "test-6bdc5.firebaseapp.com",
  projectId: "test-6bdc5",
  storageBucket: "test-6bdc5.firebasestorage.app",
  messagingSenderId: "581861896209",
  appId: "1:581861896209:web:0286953c22390a43fcc1b0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
