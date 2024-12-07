// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCaGWO7uKtdb5xAof_bIpzBoRzDW0v2zq4",
    authDomain: "fir-ca6ea.firebaseapp.com",
    projectId: "fir-ca6ea",
    storageBucket: "fir-ca6ea.appspot.com",
    messagingSenderId: "728640167201",
    appId: "1:728640167201:web:17f5d0a6f4c98f7f227260",
    measurementId: "G-FK1W5ZM94D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Signup function
document.getElementById('signupForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;

    if (!email || !password || !name) {
        alert("Please fill in all fields.");
        return;
    }

    if (password.length < 6) {
        alert("Password should be at least 6 characters long.");
        return;
    }

    try {
        // Create a new user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User signed up:", user);

        // Save user data in Firestore
        await writeData(name, email);
        console.log("User stored in database.");

        alert("Sign up successful! Welcome, " + user.email);
        window.location.pathname = "./post.html"; // Redirect after signup
    } catch (error) {
        console.error("Error signing up:", error.code, error.message);
        alert("Error: " + error.message);
    }
});

// Function to write data to Firestore
async function writeData(name, email) {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            name,
            email
        });
        console.log("Document written with ID:", docRef.id);
    } catch (error) {
        console.error("Error adding document:", error);
    }
}
