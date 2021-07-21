
let uid = 0;

export function getUserInput() {
    
    let form = document.querySelector('form');

    let user = {
        uid,
        fullname: form.elements["fullname"].value,
        email: form.elements["email"].value,
        address: form.elements["address"].value,
        city: form.elements["city"].value,
        state: form.elements["state"].value,
        zip: form.elements["zip"].value
    }
    console.log(user);
    uid++
    saveUserInfo(user);
    return user;
}

function saveUserInfo(user) {
    let Users = localStorage.getItem('Users');
    Users = JSON.parse(Users);

    if(Users != null) {
        Users = {
            ...Users,
            [user.uid]: user
        }
    } else {
        Users = {
            [user.uid]: user
        }
    }

    localStorage.setItem('Users', JSON.stringify(Users));
}

