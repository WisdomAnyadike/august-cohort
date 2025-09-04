let userDatabase = JSON.parse(localStorage.getItem('augustJsDatabase')) || []

let currentUserIndex = Number(localStorage.getItem('augustJsUserIndex'))

let currentUserObj = userDatabase[currentUserIndex]


console.log(currentUserIndex);
console.log(currentUserObj);


let currentUser = document.getElementById('currentUser')
currentUser.innerHTML = currentUserObj.username