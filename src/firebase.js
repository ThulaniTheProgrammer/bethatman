import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA_vg-XZmA8ufOiV5eqAeJS4nR7VfYIhPk",
  authDomain: "bethatman-63a10.firebaseapp.com",
  projectId: "bethatman-63a10",
  storageBucket: "bethatman-63a10.firebasestorage.app",
  messagingSenderId: "1061216470901",
  appId: "1:1061216470901:web:72a1b15a95dc2151ee353c",
  measurementId: "G-L0DF2DP3W4"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
