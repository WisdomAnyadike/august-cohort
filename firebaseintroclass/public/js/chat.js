
const firebaseConfig = {
    apiKey: "AIzaSyA886Ca58nzw6Eim89pHJdIppOfwey2CIw",
    authDomain: "augustjscohort.firebaseapp.com",
    databaseURL: "https://augustjscohort-default-rtdb.firebaseio.com",
    projectId: "augustjscohort",
    storageBucket: "augustjscohort.firebasestorage.app",
    messagingSenderId: "928386534654",
    appId: "1:928386534654:web:2a7b694ac9bac6b92f29af"
};


const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
var database = firebase.database();
let chatIndex


function checkUser() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log(user);
            var uid = user.uid;
        } else {
            window.location.href = 'login.html'
        }
    });
}

checkUser()

function submitMessage() {
    let user = auth.currentUser
    let message = document.getElementById('input-message').value.trim()
    console.log(user);

    if (!user) {
        alert('unauthorized')
        return
    }

    if (!message) {
        alert('please attach a message')
        return
    }

    database.ref(`chats/${chatIndex}`).set({
        sender: user.displayName.trim(),
        message: message,
        time: new Date().toLocaleTimeString()
    }).then(() => {
        document.getElementById('input-message').value = ''
    }).catch((err) => {
        alert(err.message)
    })



}


function displayMessages(params) {
    let chatList = document.getElementById('chat-history-list')
    let sendbutton = document.getElementById('sendbutton')
    chatList.innerHTML = 'loading...'
    sendbutton.disabled = true

    let message = document.getElementById('input-message')
    var starCountRef = database.ref('chats');



    starCountRef.on('value', (snapshot) => {
        const data = snapshot.val() || [];
        chatIndex = data.length

        console.log(data);
        chatList.innerHTML = ''
        sendbutton.disabled = false
       
        data.forEach(({ sender, message, time }, i) => {
            let classToUse = auth.currentUser.displayName === sender ? 'user-message' : 'chatgpt-message' 


            chatList.innerHTML += `  <li class="${classToUse}">

         <label> ${sender}: </label>   <span>${message}</span>
         <p>${time} </p>
        </li>`
        });

    }).then(() => {
        
    }).catch((err) => {
        alert(err.message)
    })
}

displayMessages()