import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBz2hX2mqma4kYRlvMd9_cEyEf8cADn5EE",
  authDomain: "phero-a10-pawmart.firebaseapp.com",
  projectId: "phero-a10-pawmart",
  storageBucket: "phero-a10-pawmart.firebasestorage.app",
  messagingSenderId: "997104889012",
  appId: "1:997104889012:web:1453e57c1b4195d3b87be1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;


