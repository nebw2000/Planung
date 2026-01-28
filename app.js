import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyA1BZjAao1PFkl32vsEV2si_g4faZRr5T4",
  authDomain: "planung28-1-26.firebaseapp.com",
  projectId: "planung28-1-26",
  storageBucket: "planung28-1-26.firebasestorage.app",
  messagingSenderId: "904150697732",
  appId: "1:904150697732:web:1a76107dd4c96d5317f251"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

window.login = () => {
  signInWithEmailAndPassword(
    auth,
    email.value,
    password.value
  );
};

window.logout = () => signOut(auth);

onAuthStateChanged(auth, user => {
  if (user) {
    loginPage.classList.add("hidden");
    app.classList.remove("hidden");
    loadEvents();
    loadInventory();
  } else {
    loginPage.classList.remove("hidden");
    app.classList.add("hidden");
  }
});

window.saveEvent = () => {
  push(ref(db, "events"), {
    date: eventDate.value,
    name: eventName.value,
    lead: eventLead.value,
    text: eventText.value
  });
  closePopups();
};

function loadEvents() {
  onValue(ref(db, "events"), snap => {
    eventList.innerHTML = "";
    const data = Object.values(snap.val() || {});
    data.sort((a,b) => a.date.localeCompare(b.date));
    data.forEach(e => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <h3>${e.name}</h3>
        <p>${e.date}</p>
        <p>${e.lead}</p>
        <p>${e.text}</p>
      `;
      eventList.appendChild(div);
    });
  });
}

window.saveItem = () => {
  push(ref(db, "inventory"), {
    name: itemName.value,
    amount: itemAmount.value
  });
  closePopups();
};

function loadInventory() {
  onValue(ref(db, "inventory"), snap => {
    inventoryList.innerHTML = "";
    Object.values(snap.val() || {}).forEach(i => {
      const li = document.createElement("li");
      li.textContent = `${i.name} (${i.amount})`;
      inventoryList.appendChild(li);
    });
  });
}

window.openNav = () => nav.classList.remove("hidden");
window.openEventPopup = () => eventPopup.classList.remove("hidden");
window.openItemPopup = () => itemPopup.classList.remove("hidden");

window.showHome = () => {
  inventoryPage.classList.add("hidden");
  eventList.classList.remove("hidden");
  closePopups();
};

window.showInventory = () => {
  eventList.classList.add("hidden");
  inventoryPage.classList.remove("hidden");
  closePopups();
};

window.closePopups = () => {
  nav.classList.add("hidden");
  eventPopup.classList.add("hidden");
  itemPopup.classList.add("hidden");
};
