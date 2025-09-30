
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
    if (!chatIndex && chatIndex !== 0) {
        alert('please try again later')
        return
    }

    database.ref(`chats/${chatIndex}`).set({
        sender: user.displayName.trim(),
        message: message,
        time: new Date().toLocaleTimeString(),
        isDeleted: false
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
    database.ref('chats').on('value', (snapshot) => {
        const data = snapshot.val() || [];
        chatIndex = data.length
        console.log(data);
        chatList.innerHTML = ''
        sendbutton.disabled = false
        data.forEach((value, i, arr) => {
            let isMe = auth.currentUser.displayName === value.sender
            let classToUse = isMe ? 'user-message' : 'chatgpt-message'
            let val = value.isDeleted ? 'disabled' : ''
            let button = isMe ? ` <button ${val} onclick="editMessage(${i},'${value.message}')"> edit </button>` : ''
            chatList.innerHTML += `<li ondblclick="deleteMessage(${isMe} , ${i} , ${value.isDeleted})" class="${classToUse}">
                                 <label> ${value.sender}: </label> <span>${value.message}</span>
                                  <p>${value.time} ${button} </p>
                                 </li>`
        });
    })
}

displayMessages()



function deleteMessage(params, index, isDeleted) {
    if (isDeleted) {
        alert('message already deleted')
        return
    }
    function runDelete() {
        let finalConfirm = confirm('are you sure?')
        if (finalConfirm) {
            database.ref(`chats/${index}`).update({ message: 'message was deleted', isDeleted: true }).then(() => {
            }).catch((err) => {
                alert(err.message)
            })
        }
    }
    if (params) {
        runDelete()
    }
}

function editMessage(i, msg) {
    let edit = prompt('Edit message', msg)
    if (edit.trim() && edit.trim() !== msg) {
        database.ref(`chats/${i}`).update({ message: edit }).then(() => {
        }).catch((err) => {
            alert(err.message)
        })
    }
}

// let arr = ['ade', 'bola', 'goke']
// arr.forEach((val) => { })