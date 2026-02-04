import { auth } from "./firebase.js";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

window.login = () => {
  signInWithEmailAndPassword(
    auth,
    loginEmail.value,
    loginPassword.value
  );
};

window.logout = () => signOut(auth);

onAuthStateChanged(auth, user => {
  loginPage.classList.toggle("hidden", !!user);
  app.classList.toggle("hidden", !user);
});
