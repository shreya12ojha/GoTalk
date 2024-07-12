var firebaseConfig = {
    apiKey: "AIzaSyCYtQ0lj4_L0sbNbEMsxaX8SI0dF_HPHJI",
    authDomain: "sunday-cb4e8.firebaseapp.com",
    databaseURL: "https://sunday-cb4e8-default-rtdb.firebaseio.com",
    projectId: "sunday-cb4e8",
    storageBucket: "sunday-cb4e8.appspot.com",
    messagingSenderId: "746339918524",
    appId: "1:746339918524:web:8172796eba0dc0d96766b9",
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  const username = prompt("Please Tell Us Your Name");
  const socket = new WebSocket('ws://localhost:3000');
  
  function sendMessage(e) {
    e.preventDefault();
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;
    messageInput.value = "";
  
    const messageObject = {
      username,
      message,
      timestamp
    };
  
    socket.send(JSON.stringify(messageObject));
    db.ref("messages/" + timestamp).set(messageObject);
  }
  
  const fetchChat = db.ref("messages/");
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
  
