// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWRZ2pvnqSLlY1mON6sVrBEYSJ_Hx_Ph0",
  authDomain: "notes-54611.firebaseapp.com",
  projectId: "notes-54611",
  storageBucket: "notes-54611.firebasestorage.app",
  messagingSenderId: "508356585859",
  appId: "1:508356585859:web:d58df0a8de7ac81d376eb6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Firebase services
var auth = firebase.auth();
var db = firebase.firestore();

// Register user
function register() {
  auth.createUserWithEmailAndPassword(
    document.getElementById("email").value,
    document.getElementById("password").value
  )
  .then(function () {
    alert("Registered successfully");
  })
  .catch(function (error) {
    alert(error.message);
  });
}

// Login user
function login() {
  auth.signInWithEmailAndPassword(
    document.getElementById("email").value,
    document.getElementById("password").value
  )
  .then(function () {
    alert("Logged in successfully");
  })
  .catch(function (error) {
    alert(error.message);
  });
}

// Logout user
function logout() {
  auth.signOut().then(function () {
    alert("Logged out");
  });
}

// Add note
function addNote() {
  var user = auth.currentUser;

  if (!user) {
    alert("Login required");
    return;
  }

  db.collection("notes").add({
    text: document.getElementById("note").value,
    uid: user.uid,
    time: firebase.firestore.FieldValue.serverTimestamp()
  });

  document.getElementById("note").value = "";
}

// Load notes for logged-in user
auth.onAuthStateChanged(function (user) {
  var noteList = document.getElementById("noteList");
  noteList.innerHTML = "";

  if (user) {
    db.collection("notes")
      .where("uid", "==", user.uid)
      .onSnapshot(function (snapshot) {
        noteList.innerHTML = "";
        snapshot.forEach(function (doc) {
          var li = document.createElement("li");
          li.textContent = doc.data().text;
          noteList.appendChild(li);
        });
      });
  }
});
