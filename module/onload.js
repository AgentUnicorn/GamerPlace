import {removeItem, manageQuantity} from './cart.js';
import { products } from './product.js';
import { cartNumbers, totalCost } from './cart.js';
import {
    filterByRange, 
    filterBySearch, 
    filterByCheckBox, 
    sort
} from './filter-sort.js'
import {
    validateFullname, 
    validateEmail, 
    validateAddress, 
    validateCity, 
    validateState, 
    validateZIP, 
    capitalizeInput, 
    isNotEmpty, 
    checkCartBeforePayment
} from './validate.js'
import {sendEmail} from './send-email.js'
import {alertInvalidField} from './alert-modal.js'

//Function render  các sản phẩm ra màn hình
export function displayAllProducts() {
    let productList = document.querySelector('#product-list');

    if(productList) {
        products.map(item => {
            productList.innerHTML += `<div class="col-lg-4 featured-item">
                                        <img ${item.img}>
                                        <p>${item.brand}</p>
                                        <h4>${item.name}</h4>
                                        <p>$${item.price}.00</p>
                                        <div class="d-flex justify-content-around">
                                            <button class="btn add-btn" >Add</button>
                                            <button class="btn-blue detail-btn">View</button>
                                        </div>
                                    </div>`
        });
    }
}

//Function hiển thị số lượng item trong giỏ hàng
export function onloadCartNumbers() {
    let productNumber = localStorage.getItem("CartNumber");
    
    if(productNumber) {
        document.getElementById('soluong').textContent = productNumber;
    }
}

//Function render các item trong giỏ hàng
export function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem("totalCost");
    cartCost = parseInt(cartCost);

    let cartContainer = document.querySelector("#cart-container");
    let totalPrice = document.querySelector("#total-price");

    if(cartItems && cartContainer) {
        cartContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            cartContainer.innerHTML += `<tr>
                                            <td>
                                                <div class="cart-info">
                                                    <img ${item.img}>
                                                    <div>
                                                        <p>${item.name}</p>
                                                        <small>Price: $${item.price}.00</small>
                                                        <br>
                                                        <span id="remove-btn">Remove<span style="display: none">${item.id}</span></span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="quantity">
                                                    <i class="fas fa-caret-left fa-2x decrease"></i>
                                                    <span>${item.inCart}</span>
                                                    <i class="fas fa-caret-right fa-2x increase"></i>
                                                </div>
                                            </td>
                                            <td>$${item.inCart * item.price}.00</td>
                                        </tr>`
        });

        totalPrice.innerHTML = '';

        totalPrice.innerHTML = `<table>
                                    <tr>
                                        <td>Total</td>
                                        <td>$${cartCost}.00</td>
                                    </tr>
                                </table>`
    }

    //Gọi function xóa item
    removeItem();
    //Gọi function chỉnh sửa số lượng trong giỏ hàng
    manageQuantity()
}

//Function đếm số lượng từng item và group theo brand
//sau đó hiển thị ra màn hình khi trang web load xong
export function loadNumberOfEachProduct() {
    let checkBox = document.querySelectorAll('.form-check-input');
    checkBox.forEach(item => {
        let itemNumber = products.filter(product => product.brand == item.value);
        item.nextElementSibling.textContent = itemNumber.length
    })
}

//Function lấy nút Add trên màn hình
//Khi user ấn vào sẽ gọi function 
//thêm vào giỏ hàng và tính toán tổng tiền 
export function onloadGetAddBtn() {
    let addBtn = document.querySelectorAll('.add-btn');

    for(let i = 0; i< addBtn.length; i++) {
        addBtn[i].addEventListener('click', () => {
            //Function đếm số lượng item
            //và thêm vào cart
            cartNumbers(products[i]);
            //Function tính toán tổng tiền
            totalCost(products[i]);
        })
    }
}

//Function gọi các chức năng sort, filter
//khi người dùng tương tác với các thanh
//công cụ sort, filter
export function onloadFilterSort() {
    //Filter by range
    let rangeFilter = document.querySelector('#rangeFilter');
    rangeFilter.addEventListener('change', () => {
        filterByRange();
        onloadGetAddBtn();
    });
    
    //Filter by search
    let searchFilter = document.querySelector('#searchFilter');
    searchFilter.addEventListener('keyup', () => {
        filterBySearch(searchFilter.value);
        onloadGetAddBtn();
    })
    
    //Filter by brand check box
    let checkBox = document.querySelectorAll('.form-check-input');
    //Khởi tạo mảng chứa các value cần tìm kiếm
    let checkedValueArray = [];
    for (let i = 0; i < checkBox.length; i++) {
        checkBox[i].addEventListener('change', () => {
            //Nếu checked
            if(checkBox[i].checked) {
                //Đẩy giá trị của ô được chọn vào mảng cần filter
                checkedValueArray.push(checkBox[i].value);
                //Gọi hàm filter và truyền mảng chứa các value cần filter
                filterByCheckBox(checkedValueArray);
            } else {
                //Nếu unchecked
                //Lấy id của value bị unchecked trong mảng chứa value cần fitler
                let idx = checkedValueArray.indexOf(checkBox[i].value);
                //Xóa đi khỏi mảng 
                checkedValueArray.splice(idx, 1);
                //Gọi hàm filter và truyền mảng chứa các value cần filter
                filterByCheckBox(checkedValueArray);
                //Nếu mảng filter rỗng, render lại tất cả sản phẩm
                if(checkedValueArray.length == 0) displayAllProducts();
            } 
            onloadGetAddBtn();
        });
    };

    //Sort
    let selectBox = document.querySelector('#select-box');
    
    selectBox.addEventListener('change', () => {
        //Lấy value khi người dùng chọn chức năng sort
        //trong thanh select. 
        let selectedValue = selectBox.options[selectBox.selectedIndex].value;
        //Nếu value = "ascending" -> tìm kiếm tăng dần
        //Nếu value = "descending" -> tìm kiếm giảm dần
        sort(selectedValue);
        onloadGetAddBtn();
    })
}

//Function kiểm tra input khi user click
//vào nút thanh toán
export function onloadCallingCheckout() {
    let enterPaymentBtn = document.querySelector('#checkout-btn');
    
    checkCartBeforePayment(enterPaymentBtn);

    //Kiểm trả người dùng nhập
    enterPaymentBtn.addEventListener('click', () => {
        let form = document.querySelector('form');
        let validate = true;

        let fullnameInput = form.elements["fullname"];
        let emailInput = form.elements["email"];
        let addressInput = form.elements["address"];
        let cityInput = form.elements["city"];
        let stateInput = form.elements["state"];
        let zipInput = form.elements["zip"];

        fullnameInput.addEventListener('keyup', () => {
            let fullname = fullnameInput.value.trim();
            if(validateFullname(fullname)) {
                capitalizeInput(fullname);
                validate = true;
            }
            else 
                validate = false;
        });

        emailInput.addEventListener('keyup', () => {
            let email = emailInput.value.trim();
            if(validateEmail(email)) {
                email = email.toLowerCase();
                validate = true;
            }
            else 
                validate = false;
        });

        addressInput.addEventListener('keyup', () => {
            let address = addressInput.value.trim();
            if(validateAddress(address)) {
                capitalizeInput(address);
                validate = true;
            }
            else 
                validate = false;
        });

        cityInput.addEventListener('keyup', () => {
            let city = cityInput.value.trim();
            if(validateCity(city)) {
                capitalizeInput(city);
                validate = true;
            }
            else 
                validate = false;
        });

        stateInput.addEventListener('keyup', () => {
            let state = stateInput.value.trim();
            if(validateState(state)) {
                capitalizeInput(state);
                validate = true;
            }
            else 
                validate = false;
        });

        zipInput.addEventListener('keyup', () => {
            let zip = zipInput.value.trim();
            if(validateZIP(zip)) {
                capitalizeInput(zip);
                validate = true;
            }
            else 
                validate = false;
        });

        
        let checkOutBtn = document.querySelector('#checkOut');
        checkOutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            //Gọi function kiểm tra rỗng
            let emptyCheck = isNotEmpty();
            // console.log(qe);
            if(validate && emptyCheck) 
                sendEmail();
            else 
                alertInvalidField();
        });
    });
}

//Function lấy nút View trên màn hình
//để khi user ấn vào của item nào sẽ đi
//đến trang thể hiện thông tin chi tiết
//của item đó
export function onloadGetDetailBtn() {
    let detailBtn = document.querySelectorAll('.detail-btn');
    
    for(let i = 0; i< detailBtn.length; i++) {
        detailBtn[i].addEventListener('click', () => {
            localStorage.setItem("itemID", i);
            window.location.href = "./product-detail.html";
        });
    }
}

//Function render các thông tin của
//sản phẩm mà người dùng nhấn vào 
//trước đó
export function displayProductDetail() {
    let itemID = localStorage.getItem("itemID");
    itemID = parseInt(itemID);

    let currentProduct = products.filter(product => product.id == itemID)[0];

    let productDetailContainer = document.querySelector('#product-detail-container');

    productDetailContainer.innerHTML = `<div class="col-lg-6 left-detail">
                                            <img ${currentProduct.img}>
                                        </div>
                                        <div class="col-lg-6 right-detail">
                                            <p>${currentProduct.brand}</p>
                                            <h1>${currentProduct.name}</h1>
                                            <h4>$${currentProduct.price}.00</h4>
                                            <input type="number" id="numberOfProduct" value="1">
                                            <button class="btn add-btn">Add To Cart</button>
                                            <h3>Product Details</h3><br>
                                            <p>Some text Some text Some text Some text Some text Some text Some text 
                                                Some text Some text Some text Some text Some text Some text Some text 
                                            </p>
                                        </div>`

    onloadGetAddBtnDetailPage(currentProduct);
}

//Function lấy các nút trong trang 
//chi tiết sản phẩm
function onloadGetAddBtnDetailPage(product) {
    let addBtn = document.querySelector('.add-btn');

    //Khi user click vào ô nhập, tự động làm trống
    //ô nhập để người dùng có thể nhập mà không
    //cần phải xóa đi valua mặc định trước đó
    let numberOfProductInput = document.querySelector('#numberOfProduct');
    numberOfProductInput.addEventListener('focus', () => {
        numberOfProductInput.value = '';
    });

    //Khi user click vào khu vực khác, nếu ô 
    //nhập trống thì sẽ hiển thị value mặc định
    //là 1, nếu là dữ liệu người dùng đã nhập vào 
    //thì giữ nguyên
    numberOfProductInput.addEventListener('blur', () => {
        if(numberOfProductInput.value == '') {
            numberOfProductInput.value = 1;
        }
    });

    //Khi user click nút Add to Cart sẽ gọi
    //function thêm vào giỏ hàng 
    //và tính toán tổng tiền
    addBtn.addEventListener('click', () => {
        //Function đếm số lượng item
        //và thêm vào cart
        cartNumbers(product);
        //Function tính toán tổng tiền
        totalCost(product);
    })

}
