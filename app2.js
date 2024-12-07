//import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, collection, getDocs, addDoc, query, where, getDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCaGWO7uKtdb5xAof_bIpzBoRzDW0v2zq4",
    authDomain: "fir-ca6ea.firebaseapp.com",
    projectId: "fir-ca6ea",
    storageBucket: "fir-ca6ea.firebasestorage.app",
    messagingSenderId: "728640167201",
    appId: "1:728640167201:web:17f5d0a6f4c98f7f227260",
    measurementId: "G-FK1W5ZM94D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Handle form submission to save post
document.getElementById("postForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const title = document.getElementById('postTitle').value;
  const content = document.getElementById('postContent').value;
  const author = document.getElementById('postAuthor').value;

  if (!title || !content || !author) {
      alert('Please provide title, content, and author!');
      return;
  }

  try {
      // Add post to Firestore
      const postRef = await db.collection("posts").add({
          title: title,
          content: content,
          author: author,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

      console.log("Post added:", postRef.id);
      // Clear the form
      document.getElementById('postTitle').value = '';
      document.getElementById('postContent').value = '';
      document.getElementById('postAuthor').value = '';

      // Redirect to index.html after post is submitted
      window.location.href = "index.html"; // Redirects to index.html
  } catch (error) {
      console.error("Error adding post: ", error);
      alert("Error adding post.");
  }
});

// Display posts on index.html
async function displayPosts() {
  const postsList = document.getElementById("postsList");
  postsList.innerHTML = ''; // Clear previous posts

  // Fetch posts from Firestore
  const postsSnapshot = await db.collection("posts").orderBy("timestamp", "desc").get();
  postsSnapshot.forEach(doc => {
      const post = doc.data();
      const postDiv = document.getElementById('posts-list')
      .innerHTML = `
          <h4>${post.title}</h4>
          <p><strong>Author:</strong> ${post.author}</p>
          <p>${post.content}</p>
          <hr>
      `;
      postsList.appendChild(postDiv);
  });
}

// Call displayPosts on page load to load existing posts
window.onload = displayPosts;

// script.js
document.getElementById('postForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevents page reload on form submission

    // Get values from the form fields
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;

    // Create a new post
    const post = createPost(title, content);

    // Add the post to the posts list
    document.getElementById('postsList').prepend(post);

    // Clear the form fields
    document.getElementById('postTitle').value = '';
    document.getElementById('postContent').value = '';
});

// Function to create a new post element
function createPost(title, content) {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    // Create the post title
    const postTitle = document.createElement('h4');
    postTitle.textContent = title;

    // Create the post content
    const postContent = document.createElement('p');
    postContent.textContent = content;

    // Append title and content to the postDiv
    postDiv.appendChild(postTitle);
    postDiv.appendChild(postContent);

    return postDiv;
}


