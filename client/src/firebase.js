import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAsz8tBFlYCP0glh39Zi9KkKtcF3AQWIsk",
    authDomain: "myproject-1573d.firebaseapp.com",
    databaseURL: "https://myproject-1573d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "myproject-1573d",
    storageBucket: "myproject-1573d.firebasestorage.app",
    messagingSenderId: "173072199430",
    appId: "1:173072199430:web:2b4fed740a5c55ee753887",
    measurementId: "G-TGVR39MQFY"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
