import { db } from "./firebase.js";
import { ref, push, onValue, update } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

let editId = null;

const invRef = ref(db, "inventory");

window.openAddItem = () => itemPopup.classList.remove("hidden");

window.closePopups = () => {
  itemPopup.classList.add("hidden");
  editItemPopup.classList.add("hidden");
};

window.saveItem = () => {
  push(invRef, {
    name: itemName.value,
    amount: itemAmount.value,
    status: itemStatus.value
  });
  closePopups();
};

onValue(invRef, snap => {
  inventoryList.innerHTML = "";
  Object.entries(snap.val() || {}).forEach(([id,i]) => {
    inventoryList.innerHTML += `
      <tr>
        <td>${i.name}</td>
        <td>${i.amount}</td>
        <td>${i.status}</td>
        <td>
          <button onclick="editItem('${id}','${i.name}','${i.amount}','${i.status}')">
            Bearbeiten
          </button>
        </td>
      </tr>
    `;
  });
});

window.editItem = (id,n,a,s) => {
  editId = id;
  editName.value = n;
  editAmount.value = a;
  editStatus.value = s;
  editItemPopup.classList.remove("hidden");
};

window.updateItem = () => {
  update(ref(db,"inventory/"+editId),{
    name: editName.value,
    amount: editAmount.value,
    status: editStatus.value
  });
  closePopups();
};
