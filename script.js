// Get username and room from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
const room = urlParams.get('room');

getCookie("username");
if (username) {
    console.log("Welcome back, " + username);
} else {
    console.log("Hello, new user");
}

// Ensure username and room are present
if (!username || !room) {
  alert("Username and room are required");
  window.location.href = "index.html";
}

const firebaseConfig = {
  apiKey: "AIzaSyDEPpKnOfxVRaShsostDY___apdL-Ht9O0",
  authDomain: "monday-8c2d0.firebaseapp.com",
  databaseURL: "https://monday-8c2d0-default-rtdb.firebaseio.com",
  projectId: "monday-8c2d0",
  storageBucket: "monday-8c2d0.appspot.com",
  messagingSenderId: "701988976288",
  appId: "1:701988976288:web:3774fd6c7ab5481977fbc5",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const socket = new WebSocket('ws://localhost:3000/ws?room=' + room);

function sendMessage(e) {
  e.preventDefault();
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;
  messageInput.value = "";


  const messageObject = {
    room,
    username,
    message,
    timestamp
  };

  socket.send(JSON.stringify(messageObject));
  db.ref(`rooms/${room}/messages/` + timestamp).set(messageObject);
}

const fetchChat = db.ref(`rooms/${room}/messages/`);
fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  displayMessage(messages);
});

document.getElementById("message-form").addEventListener("submit", sendMessage);

socket.onmessage = function (event) {
  const messages = JSON.parse(event.data);
  displayMessage(messages);
};

function displayMessage(messages) {
  const message = `<li class=${
    messages.username === 'System' ? 'system' : username === messages.username ? "sent" : "receive"
  }><span>${messages.username}: </span>${messages.message}</li>`;
  document.getElementById("messages").innerHTML += message;
  document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
}

window.onload = function() {
  document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
};

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

setCookie("username", "exampleUser", 1);

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp * 1000); // Convert to milliseconds
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  };
  return date.toLocaleDateString(undefined, options);
}

socket.onmessage = function(event) {
  const msg = JSON.parse(event.data);
  displayMessage(msg);
};
