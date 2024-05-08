// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA91BeG6u8N1xKn_VdU1kxWcOKqqyaLpyw",
    authDomain: "sentanalysis-76c7d.firebaseapp.com",
    projectId: "sentanalysis-76c7d",
    storageBucket: "sentanalysis-76c7d.appspot.com",
    messagingSenderId: "748251602448",
    appId: "1:748251602448:web:4b1ece7f24929fa910b495",
    measurementId: "G-VTLGD0E0TM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle login
document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('login');
    loginButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent form from submitting
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Successful Login!");
                // Signed in
                const user = userCredential.user;
                // ...
                window.location.replace('webpage.html');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
    });
});

// Handle logout
const logoutButton = document.getElementById('logout');
logoutButton?.addEventListener('click', function (event) {
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location.replace('login.html'); // Redirect to login page
    }).catch((error) => {
        // An error happened.
        console.error("Logout Failed", error);
    });
});

// Handle password reset
const forgotPasswordLink = document.querySelector("a[href='forgot-password.html']");
forgotPasswordLink.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default link behavior
    const email = prompt("Please enter your email address to receive a password reset link:");
    if (email) {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Password reset email sent successfully! Please check your inbox.');
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert('Error: ' + errorMessage);
            });
    } else {
        alert('Email address is required to send a password reset link.');
    }
});
