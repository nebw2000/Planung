import { db } from "./firebase.js";
import { ref, push, onValue, remove } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const eventsRef = ref(db, "events");

window.saveEvent = () => {
  push(eventsRef, {
    name: eventName.value,
    lead: eventLead.value,
    date: eventDate.value,
    rehearsalTime: rehearsalTime.value,
    eventTime: eventTime.value,
    place: eventPlace.value,
    text: eventText.value
  });
};

onValue(eventsRef, snap => {
  eventList.innerHTML = "";
  Object.entries(snap.val() || {})
    .sort((a,b) => a[1].date.localeCompare(b[1].date))
    .forEach(([id,e]) => {
      eventList.innerHTML += `
        <div class="card">
          <h3>${e.name}</h3>
          <p>${e.date}</p>
          <p>${e.lead}</p>
          <button class="red" onclick="deleteEvent('${id}')">Löschen</button>
        </div>
      `;
    });
});

window.deleteEvent = id => remove(ref(db, "events/" + id));
