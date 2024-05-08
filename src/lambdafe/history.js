// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs, orderBy } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function () {
    const historyButton = document.getElementById("historyButton");

    // Add click event listener to navigate to history.html
    historyButton.addEventListener("click", function () {
        window.location.href = "history.html";
    });
});

// Function to load and display the user's sentiment analysis history
async function loadHistory(uid) {
    const historyTableBody = document.querySelector('#historyTable tbody');

    // Clear any existing table rows
    historyTableBody.innerHTML = '';

    // Reference the user's sentiments collection in Firestore
    const sentimentsRef = collection(db, "users", uid, "sentiments");

    // Retrieve data from Firestore, ordering by timestamp descending
    const q = query(sentimentsRef, orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);

    // Populate the table with data rows
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const newRow = historyTableBody.insertRow();

        // Prompt
        const promptCell = newRow.insertCell(0);
        promptCell.textContent = data.sentence;

        // Sentiment
        const sentimentCell = newRow.insertCell(1);
        sentimentCell.textContent = data.sentiment;

        // Timestamp
        const timestampCell = newRow.insertCell(2);
        const timestamp = data.timestamp?.toDate() ?? new Date();
        timestampCell.textContent = timestamp.toLocaleString();
    });
}

// Monitor authentication state changes and load history data accordingly
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Load sentiment analysis history for the authenticated user
        loadHistory(user.uid);
    } else {
        // Redirect to login or show an appropriate message
        //alert("Please log in to view your sentiment analysis history.");
    }
});
