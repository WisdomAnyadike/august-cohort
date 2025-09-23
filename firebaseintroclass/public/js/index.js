console.log(firebase);

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA886Ca58nzw6Eim89pHJdIppOfwey2CIw",
    authDomain: "augustjscohort.firebaseapp.com",
    projectId: "augustjscohort",
    storageBucket: "augustjscohort.firebasestorage.app",
    messagingSenderId: "928386534654",
    appId: "1:928386534654:web:2a7b694ac9bac6b92f29af"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();


function signUp(params) {


    let firstName = document.getElementById('firstname').value.trim()
    let lastName = document.getElementById('lastname').value.trim()
    let myMail = document.getElementById('email').value.trim()
    let myPassword = document.getElementById('password').value.trim()

    if (!firstName || !lastName) {
        alert('all fields are mandatory')
        return
    }


    loadButton(true)
    firebase.auth().createUserWithEmailAndPassword(myMail, myPassword)
        .then((userCredential) => {
            var user = userCredential.user;


            user.updateProfile({
                displayName: `${firstName} ${lastName}`,
            }).then(() => {
                console.log(user);
                alert('sign up successful')
                loadButton(false)
                window.location.href = './pages/login.html'
            }).catch((error) => {
                console.log(user);
                alert('sign up successful , update your username in settings')
                loadButton(false)
                window.location.href = './pages/login.html'
            });




        })
        .catch((error) => {
            var errorCode = error.code; // 404 500 400
            var errorMessage = error.message;
            alert(errorMessage)
            loadButton(false)
            // ..
        });

}

function loadButton(bool) {
    submitbutton.value = bool ? 'loading...' : 'Submit'
    submitbutton.disabled = bool
}



// let myOwnFirebase = {
//     auth: function (params) {
//         return {
//             createEmailAndPassword: () => {

//             }
//         }
//     }
// }

// myOwnFirebase.auth().createEmailAndPassword()