let mail = document.getElementById("mail")
let password = document.getElementById("password")
let login = document.getElementById("login")
let register = document.getElementById("register")

let userListL = JSON.parse(localStorage.getItem("users")) || []
let userList = []
let userListMail = []

for (let i = 0; i < userListL.length; i++) {
    userListMail.push(userListL[i].mail)
}

let registerFunc = () => {
    if (userListMail.includes(mail.value)) {
        alert("already taken")
    } else {
        let user = {
            mail: mail.value,
            password: password.value,
            count: 0
        }
        userList.push(user)
        localStorage.setItem("users", JSON.stringify(userList))
        mail.value = ""
        password.value = ""
    }
}


let loginFunc = () => {
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].mail == mail.value && userList[i].password == password.value) {
            userList[i].count += 1
            console.log(userList[i].count)
        }
    }
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].mail !== mail.value || userList[i].password !== password.value) {
            alert("please check your mail and passwords")
        }
    }
}

if (userListL !== null) {
    userList = [...userListL]
}

login.addEventListener("click", loginFunc)
register.addEventListener("click", registerFunc)
