// Firebase bağlantısı
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBJfAzlMVWWtn19ldJ6uZZLFVNE2wt5Jyw",
  authDomain: "akilli-tahta-3f5e8.firebaseapp.com",
  projectId: "akilli-tahta-3f5e8",
 storageBucket: "akilli-tahta-3f5e8.appspot.com",
  messagingSenderId: "378982949385",
  appId: "1:378982949385:web:9a204b6894ad3648370ed8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Giriş
window.login = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      localStorage.setItem("userRole", role);
      if (role === "student") {
        window.location.href = "student-individual.html";
      } else if (role === "teacher") {
        window.location.href = "teacher-dashboard.html";
      }
    })
    .catch((error) => {
      document.getElementById("status").innerText = "Giriş başarısız: " + error.message;
    });
};

// Kayıt
window.signup = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      localStorage.setItem("userRole", role);
      document.getElementById("status").innerText = "Kayıt başarılı, giriş yapabilirsiniz.";
    })
    .catch((error) => {
      document.getElementById("status").innerText = "Kayıt başarısız: " + error.message;
    });
};
