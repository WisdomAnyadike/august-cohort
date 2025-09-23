console.log(firebase);


const firebaseConfig = {
    apiKey: "AIzaSyA886Ca58nzw6Eim89pHJdIppOfwey2CIw",
    authDomain: "augustjscohort.firebaseapp.com",
    projectId: "augustjscohort",
    storageBucket: "augustjscohort.firebasestorage.app",
    messagingSenderId: "928386534654",
    appId: "1:928386534654:web:2a7b694ac9bac6b92f29af"
};


const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();


function logIn(params) {
    let myMail = document.getElementById('email').value.trim()
    let myPassword = document.getElementById('password').value.trim()
    loadButton(true)
    firebase.auth().signInWithEmailAndPassword(myMail, myPassword)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            console.log(user);
            alert('log in successful')
            loadButton(false)
            window.location.href = 'dashboard.html'
        })
        .catch((error) => {
            var errorCode = error.code; // 404 500 400
            var errorMessage = error.message;
            alert(errorMessage)
            loadButton(false)
        });
}

function loadButton(bool) {
    submitbutton.value = bool ? 'loading...' : 'Submit'
    submitbutton.disabled = bool
}






