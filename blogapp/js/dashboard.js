let userDatabase = JSON.parse(localStorage.getItem('augustJsDatabase')) || []


let currentUserIndex =localStorage.getItem('augustJsUserIndex') 

let currentUserObj = userDatabase[currentUserIndex]

function checkUserAuth(params) {
    if (!currentUserIndex) {
        window.location.href = '../pages/login.html'
    }
}

checkUserAuth()

let blogDatabase = JSON.parse(localStorage.getItem('blogDatabase')) || []

displayBlog()

let currentUser = document.getElementById('currentUser')
currentUser.innerHTML = currentUserObj.username
function postBlog() {
    if (blogtitle.value.trim() === '' || blogdescription.value.trim() === '') {
        alert('All fields are mandaratory')
    }
    else {
        let blog = {
            blogdescription: blogdescription.value.trim(),
            blogtitle: blogtitle.value.trim()
        }
        blogDatabase.push(blog)
        localStorage.setItem('blogDatabase', JSON.stringify(blogDatabase))
        displayBlog()
    }


}


function displayBlog() {
    let BlogPreview = document.getElementById('blogPreview')
    BlogPreview.innerHTML = ""


    if (blogDatabase.length === 0) {
        BlogPreview.innerHTML = 'no blogs currently available ...'
        return
    }

    for (let index = 0; index < blogDatabase.length; index++) {
        const element = blogDatabase[index];


        BlogPreview.innerHTML += ` <div id="blogCard">
        <p id="forBlogTitle">
            ${element.blogtitle}
        </p>
        <p id="forBlogDescription">
            ${element.blogdescription}
        </p>

        <button onclick="deleteBlog(${index})" > delete </button> <button onclick="editDescription(${index})"> edit </button>
    </div>`
    }

}


function logOut() {
    let confirmLogout = window.confirm('are you sure you want to logout?')
    if (confirmLogout) {
        localStorage.removeItem('augustJsUserIndex')
        window.location.href = '../pages/login.html'
    }


}



function editDescription(i) {
    let firstValue = window.prompt('please enter value you want to use to edit', blogDatabase[i].blogdescription)
    let editedValue = firstValue ? firstValue.trim() : null

    // let obj = blogDatabase[i] // {
    // blogtitle: 'shsnms' , blogdescription: 'hjksnklas'
    //}
    if (editedValue) {
        // blogDatabase.splice(i, 1, { blogtitle: obj.blogtitle, blogdescription: editedValue })
        blogDatabase[i].blogdescription = editedValue
        localStorage.setItem('blogDatabase', JSON.stringify(blogDatabase))
        displayBlog()
    }

}


function deleteBlog(i) {
    console.log(i);
    blogDatabase.splice(i, 1)
    localStorage.setItem('blogDatabase', JSON.stringify(blogDatabase))
    displayBlog()

}



// let myPromptValue = prompt('enter my name', 'users name')
// console.log(myPromptValue);


// let canLogout = window.confirm('are you sure?')
// console.log(canLogout);



// function return4(params) {
//     let num = 'a' + 'b'
//     console.log(num);
//     return num
// }

// console.log(return4());

// let newString = return4() + ' ' + 'hello'
// console.log(newString);



1 < 5 ? 5 < 1 ? console.log(25) : console.log('210') : console.log('200');

// if (condition) {
//     if (condition) {

//     } else {

//     }

// } else {

// }

let a = 25
let b = 34


let number = 4 < 7 ? 7 : 6

console.log(number);


let obj = {
    name: 'tolu',
    class: 'js2'
}

obj.class = 'js3'