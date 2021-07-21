import {alertEmptyCart} from './alert-modal.js'

//Function validate name
export function validateFullname(userInput) {
    if(userInput != '') {
        document.querySelector('#valid-fullname').innerHTML = `<i class="fas fa-check"></i>`;
        document.querySelector('#valid-fullname').style.color = "green";
        return true;
    } else {
        document.querySelector('#valid-fullname').innerHTML = `<i class="fas fa-times"></i>`;
        document.querySelector('#valid-fullname').style.color = "red";
        return false;
    }
}

//Function validate email
export function validateEmail(userInput) {
    const emailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(userInput != '') {
        if(userInput.match(emailFormat)) {
            document.querySelector('#valid-email').innerHTML = `<i class="fas fa-check"></i>`;
            document.querySelector('#valid-email').style.color = "green";
            return true;
        } else {
            document.querySelector('#valid-email').innerHTML = `<i class="fas fa-times"></i>`;
            document.querySelector('#valid-email').style.color = "red";
            return false;
        }
    }

}

//Function validate địa chỉ
export function validateAddress(userInput) {
    if(userInput != '') {
        document.querySelector('#valid-address').innerHTML = `<i class="fas fa-check"></i>`;
        document.querySelector('#valid-address').style.color = "green";
            return true;
    } else {
        document.querySelector('#valid-address').innerHTML = `<i class="fas fa-times"></i>`;
        document.querySelector('#valid-address').style.color = "red";
        return false;
    }
}

//Function validate thành phố
export function validateCity(userInput) {
    if(userInput != '') {
        document.querySelector('#valid-city').innerHTML = `<i class="fas fa-check"></i>`;
        document.querySelector('#valid-city').style.color = "green";
            return true;
    } else {
        document.querySelector('#valid-city').innerHTML = `<i class="fas fa-times"></i>`;
        document.querySelector('#valid-city').style.color = "red";
        return false;
    }
}

//Function validate quận
export function validateState(userInput) {
    if(userInput != '') {
        document.querySelector('#valid-state').innerHTML = `<i class="fas fa-check"></i>`;
        document.querySelector('#valid-state').style.color = "green";
            return true;
    } else {
        document.querySelector('#valid-state').innerHTML = `<i class="fas fa-times"></i>`;
        document.querySelector('#valid-state').style.color = "red";
        return false;
    }
}

//Function validate zip code
export function validateZIP(userInput) {
    if(userInput != '') {
        document.querySelector('#valid-zip').innerHTML = `<i class="fas fa-check"></i>`;
        document.querySelector('#valid-zip').style.color = "green";
            return true;
    } else {
        document.querySelector('#valid-zip').innerHTML = `<i class="fas fa-times"></i>`;
        document.querySelector('#valid-zip').style.color = "red";
        return false;
    }
}

//Function in hoa ký tự đầu
export function capitalizeInput(input) {
    input.toLowerCase().replace( /\b./g, function(a){ 
        return a.toUpperCase(); 
    }); 
}

//Function kiểm tra rỗng
export function isNotEmpty() {
    let form = document.querySelector('form');

    let isNotEmpty = true;

    let fullname = form.elements["fullname"].value.trim();
    let email = form.elements["email"].value.trim();
    let address = form.elements["address"].value.trim();
    let city = form.elements["city"].value.trim();
    let state = form.elements["state"].value.trim();
    let zip = form.elements["zip"].value.trim();

    if(fullname != '' && email != '' && address != '' && city != '' && state != '' && zip != '' ) {
        return isNotEmpty;
    } else 
        return false;
}

//Function kiểm tra nếu giỏ hàng
//đang rỗng mà người dùng ấn vào thanh 
//toán
export function checkCartBeforePayment(enterPaymentBtn) {

    enterPaymentBtn.addEventListener('click', ()=> {
        let totalCost = localStorage.getItem('totalCost');
    
        if(totalCost == null || totalCost == 0) {
            //Nếu trống, thông báo cho người dùng
            enterPaymentBtn.setAttribute('data-target', '');
            alertEmptyCart();
        } else {
            //Nếu không, mở modal cho người dùng
            //nhập thôn tin
            enterPaymentBtn.setAttribute('data-target', '#checkoutModal');
        }
    });
}
