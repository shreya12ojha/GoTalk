import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyATs6Lr5pBWshaahW11psulWGGzzZ1eYA4",
    authDomain: "authentication-2ebd1.firebaseapp.com",
    projectId: "authentication-2ebd1",
    storageBucket: "authentication-2ebd1.appspot.com",
    messagingSenderId: "489996294996",
    appId: "1:489996294996:web:1e25b89ba28e7f6c2406c1",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const signUp = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      
      const user = userCredential.user;
      console.log('User signed up:', user);
      
      window.location.href = "chat.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error during sign-up:', errorCode, errorMessage);
    });
};


const login = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      
      const user = userCredential.user;
      console.log('User logged in:', user);
      
      window.location.href = "chat.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error during login:', errorCode, errorMessage);
    });
};


document.getElementById('sign-up-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  signUp(email, password);
});

document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});
