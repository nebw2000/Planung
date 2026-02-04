import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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

let currentEditId = null;

/* Login */
window.login = () => {
  signInWithEmailAndPassword(auth, email.value, password.value);
};

window.logout = () => signOut(auth);

onAuthStateChanged(auth, user => {
  if (user) {
    loginPage.classList.add("hidden");
    app.classList.remove("hidden");
    showPage("events");
    loadEvents();
    loadInventory();
  }
});

/* Navigation */
window.showPage = id => {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
};

/* Events */
window.saveEvent = () => {
  push(ref(db, "events"), {
    name: eName.value,
    lead: eLead.value,
    date: eDate.value,
    rehearsal: eRehearsal.value,
    time: eTime.value,
    place: ePlace.value,
    text: eText.value
  });
};

function loadEvents() {
  onValue(ref(db, "events"), snap => {
    eventList.innerHTML = "";
    const data = Object.entries(snap.val() || {});
    data.sort((a,b) => a[1].date.localeCompare(b[1].date));
    data.forEach(([id, e]) => {
      eventList.innerHTML += `
        <div class="event-card">
          <h3>${e.name}</h3>
          <p>${e.date}</p>
          <p>${e.lead}</p>
          <button class="btn red" onclick="deleteEvent('${id}')">Löschen</button>
        </div>
      `;
    });
  });
}

window.deleteEvent = id => {
  remove(ref(db, "events/" + id));
};

/* Inventar */
window.openItemPopup = () => itemPopup.classList.remove("hidden");
window.closePopup = () => itemPopup.classList.add("hidden");

window.saveItem = () => {
  push(ref(db, "inventory"), {
    name: iName.value,
    amount: iAmount.value,
    status: iStatus.value
  });
  closePopup();
};

function loadInventory() {
  onValue(ref(db, "inventory"), snap => {
    inventoryList.innerHTML = "";
    Object.entries(snap.val() || {}).forEach(([id, i]) => {
      inventoryList.innerHTML += `
        <tr>
          <td>${i.name}</td>
          <td>${i.amount}</td>
          <td>${i.status}</td>
          <td>
            <button class="btn blue" onclick="editItem('${id}','${i.name}','${i.amount}','${i.status}')">
              Bearbeiten
            </button>
          </td>
        </tr>
      `;
    });
  });
}

/* Bearbeiten */
window.editItem = (id, name, amount, status) => {
  currentEditId = id;
  editName.value = name;
  editAmount.value = amount;
  editStatus.value = status;
  editItemPopup.classList.remove("hidden");
};

window.updateItem = () => {
  update(ref(db, "inventory/" + currentEditId), {
    name: editName.value,
    amount: editAmount.value,
    status: editStatus.value
  });
  closeEditPopup();
};

window.closeEditPopup = () => {
  editItemPopup.classList.add("hidden");
  currentEditId = null;
};
