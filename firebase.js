import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyA1BZjAao1PFkl32vsEV2si_g4faZRr5T4",
  authDomain: "planung28-1-26.firebaseapp.com",
  projectId: "planung28-1-26",
  storageBucket: "planung28-1-26.firebasestorage.app",
  messagingSenderId: "904150697732",
  appId: "1:904150697732:web:1a76107dd4c96d5317f251"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
