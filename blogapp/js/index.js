let userDatabase = []
let username = document.getElementById('name')
let email = document.getElementById('email')
let password = document.getElementById('password')
let confirmPassword = document.getElementById('confirm')

function signUp() {
    let myUsername = username.value.trim()
    let myEmail = email.value.trim()
    let myPassword = password.value.trim()
    let myConfirm = confirmPassword.value.trim()

    // if (myUsername === '' || myEmail === '' || myPassword === '' || myConfirm === '') {
    //     alert('all fields are mandatory')

    // } else if (myPassword !== myConfirm) {
    //     alert('passwords do not match')

    // }else{

    // }

    if (myUsername === '' || myEmail === '' || myPassword === '' || myConfirm === '') {
        alert('all fields are mandatory')
        return

    }

    if (myPassword !== myConfirm) {
        alert('passwords do not match')
        return
    }


    let isUserExisting = false

    for (let index = 0; index < userDatabase.length; index++) {
        if (userDatabase[index].username === myUsername) {
            isUserExisting = true
            break
        }
    }

    console.log(isUserExisting);

    if (isUserExisting) {
        alert('user already exists')
        return
    }

    let userObj = {
        username: myUsername,
        email: myEmail,
        password: myPassword
    }

    userDatabase.push(userObj)
    alert('sign up successful')
    console.log(userDatabase);
    location.href = './pages/login.html'


}