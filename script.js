// Replace with your Firebase Config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_BUCKET.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Check User Login Status
auth.onAuthStateChanged(user => {
    if (user) {
        console.log("User Logged In:", user.email);
        document.getElementById("loginBtn").style.display = "none";
        document.getElementById("logoutBtn").style.display = "block";

        // Show admin panel only if logged in as Naitik
        if (user.email === "pg062893@gmail.com") {
            document.getElementById("adminPanel").style.display = "block";
        }
    } else {
        console.log("User Logged Out");
        document.getElementById("loginBtn").style.display = "block";
        document.getElementById("logoutBtn").style.display = "none";
        document.getElementById("adminPanel").style.display = "none";
    }
});

// Google Login
document.getElementById("loginBtn").onclick = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(result => console.log("User Signed In:", result.user.email))
        .catch(error => console.error("Login Failed:", error));
};

// Logout Function
document.getElementById("logoutBtn").onclick = () => {
    auth.signOut()
        .then(() => console.log("User Logged Out Successfully"))
        .catch(error => console.error("Logout Failed:", error));
};

// Add Free Fire ID (Only Admin)
function addID() {
    const ffID = document.getElementById("ffID").value;
    const price = document.getElementById("price").value;

    if (ffID && price) {
        db.collection("freefireIDs").add({ ffID, price })
            .then(() => alert("ID Added Successfully!"));
    } else {
        alert("Fill all details");
    }
}

// Load Free Fire IDs
db.collection("freefireIDs").onSnapshot(snapshot => {
    const idList = document.getElementById("idList");
    idList.innerHTML = "";
    snapshot.forEach(doc => {
        let data = doc.data();
        idList.innerHTML += `
            <div>
                <p><b>ID:</b> ${data.ffID}</p>
                <p><b>Price:</b> ₹${data.price}</p>
                <p><b>Pay to:</b> 43367154273</p>
                <button onclick="alert('Pay ₹${data.price} to 43367154273 and contact admin!')">Buy Now</button>
            </div>`;
    });
});