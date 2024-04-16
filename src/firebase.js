import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "djawara-barbershop.firebaseapp.com",
    projectId: "djawara-barbershop",
    storageBucket: "djawara-barbershop.appspot.com",
    messagingSenderId: "403794689793",
    appId: "1:403794689793:web:71639d3f658fc0ee66e500",
    measurementId: "G-7SWKN9EWDY"
};

export const app = initializeApp(firebaseConfig);