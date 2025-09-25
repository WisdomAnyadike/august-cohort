

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


function checkUser() {
    let userImage = document.getElementById('userImage')
    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log(user);
            var uid = user.uid;
            usersName.innerHTML = user.displayName || 'User'
            console.log(user.photoURL);
            userImage.src = user.photoURL || 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg'
        } else {
            window.location.href = 'login.html'
        }
    });
}

checkUser()

function logUserOut() {
    let toLogout = confirm('are you sure you want to log out?')
    if (toLogout) {
        firebase.auth().signOut().then(() => {
            window.location.href = '../pages/login.html'
        }).catch((error) => {
            alert(error.message)
        });
    }

}

console.log('hmmmm');




