import { displayCart, onloadCartNumbers } from "./onload.js";
import {alertAddToCartSuccess} from './alert-modal.js'

//Function đếm số lượng sản phẩm và lưu xuống local
//product: Object item được truyền vào
//action: hành động truyền vào, có thể là "increase"
//hoặc "decrease"
export function cartNumbers(product, action) {
    let productNumber = localStorage.getItem("CartNumber");
    productNumber = parseInt(productNumber);

    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    let numberOfProduct = 1
    //Kiểm tra xem nếu user đang ở trang 
    //chi tiết sản phẩm thì sẽ lấy dữ liệu
    //từ ô nhập và đưa vào giỏ hàng
    //Nếu không, mặc định là 1
    if (window.location.pathname == "/html/product-detail.html") {
        numberOfProduct = parseInt(document.querySelector('#numberOfProduct').value);
    }

    if(action == "decrease") {
        localStorage.setItem('CartNumber', productNumber -1);
        document.getElementById('soluong').textContent = productNumber -1;
    } else if (productNumber) {
        if(numberOfProduct > 1) {
            localStorage.setItem('CartNumber', productNumber + numberOfProduct);
            document.getElementById('soluong').textContent = productNumber + numberOfProduct;
        } else {
            localStorage.setItem('CartNumber', productNumber +1);
            document.getElementById('soluong').textContent = productNumber +1;
        }
    } else {
        if(numberOfProduct > 1) {
            localStorage.setItem('CartNumber', numberOfProduct);
            document.getElementById('soluong').textContent = numberOfProduct;
        } else {
            localStorage.setItem('CartNumber', 1);
            document.getElementById('soluong').textContent = 1;
        }
    }

    //Gọi function setItems để lưu đối tượng vật phẩm vào giỏ hàng trong local
    setItems(product, numberOfProduct);
}

//Function thêm vật phẩm vào giỏi hàng
//và lưu xuống local
//product: Object item được truyền vào
//numberOfProduct: số lượng item user
//nhập hoặc click vào(1)
export function setItems(product, numberOfProduct) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    //kiểm tra xem giỏ hàng có trống hay không?
    if(cartItems != null) {
        //Nếu không trống ->
        //Kiểm tra xem mặt hàng này có tồn tại trong giỏ hàng hay ko? ->
        //Nếu không, thêm mới
        if(cartItems[product.id] == undefined) {
            cartItems = {
                ...cartItems,
                [product.id]: product
            }
        }
        //Nếu có, tăng số lượng trong giỏ hàng lên
        cartItems[product.id].inCart += numberOfProduct;
    } else {
        //Nếu trống, thêm mới 
        product.inCart = numberOfProduct;
        cartItems = {
            [product.id]: product
        }
    }

    //Lưu trữ xuống local 
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    if (
        window.location.pathname == "/html/products.html" || 
        window.location.pathname == "/html/product-detail.html"
    ) {
        //Thông báo là thêm thành công
        alertAddToCartSuccess();    
    }
}

//Function tính total 
//product: Object item được truyền vào
//action: hành động truyền vào, có thể là "increase"
//hoặc "decrease"
export function totalCost(product, action) {
    let cartCost = localStorage.getItem("totalCost");

    let numberOfProduct = 1
    //Kiểm tra xem nếu user đang ở trang 
    //chi tiết sản phẩm thì sẽ lấy dữ liệu
    //từ ô nhập và đưa vào giỏ hàng
    //Nếu không, mặc định là 1
    if (window.location.pathname == "/html/product-detail.html") {
        numberOfProduct = parseInt(document.querySelector('#numberOfProduct').value);
    }
    
    if(action == "decrease") {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost - product.price);
    } else if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price*numberOfProduct);
    } else {
        localStorage.setItem("totalCost", product.price * numberOfProduct);
    }
}

//Function xóa item trong cart
export function removeItem() { 
    //Lấy danh sách các nút có id remove-btn
    let removeBtn = document.querySelectorAll("#remove-btn");
    //Khai báo biến id của vật phẩm
    let itemID;

    //Lấy số lượng item trong cart từ local
    let productNumber = localStorage.getItem("CartNumber");
    //Lấy danh sách item trong cart từ local
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    //Lấy tổng giá trị của cart từ local
    let cartCost = localStorage.getItem("totalCost");

    //Loop qua danh sách các nút đã lấy được
    for(let i = 0; i < removeBtn.length; i++) {
        removeBtn[i].addEventListener('click', () => {
            //Gắn itemID là id lấy được trong node con của nút có id là #remove-btn
            itemID = removeBtn[i].querySelector('span').textContent.trim();
            
            //Update số lượng item trong cart và lưu xuống local
            localStorage.setItem('CartNumber', productNumber - cartItems[itemID].inCart);
            //Update tổng giá trị của cart và lưu xuống local
            localStorage.setItem('totalCost', cartCost - (cartItems[itemID].price * cartItems[itemID].inCart));
            //Xóa item có ID là itemID ra khỏi danh sách vật phẩm
            delete cartItems[itemID];
            //Lưu danh sách item xuống local
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            //Gọi lại hàm render các item, hàm render số lượng item
            displayCart();
            onloadCartNumbers();
        })
    }
}

//Function update giá, số lượng, tổng tiền
//khi thay đổi số lượng item trong giỏ hàng
export function manageQuantity() {
    let decreaseBtn = document.querySelectorAll('.decrease');
    let increaseBtn = document.querySelectorAll('.increase');

    let currentQuantity;
    let currentItemID;

    //Lấy danh sách item trong cart từ local
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    for (let i = 0; i < decreaseBtn.length; i++) {
        decreaseBtn[i].addEventListener('click', () => {
            //Láy số lượng hiện tại
            currentQuantity = decreaseBtn[i]
            .parentElement
            .querySelector('span')
            .textContent
            .trim();

            //Lấy tên item đang chỉnh
            //sửa số lượng
            currentItemID = decreaseBtn[i]
            .parentElement
            .parentElement
            .previousElementSibling
            .querySelector('span')
            .querySelector('span')
            .textContent
            .trim();

            //Kiểm tra nếu số lượng hiện tại >1
            //thì mới cho phép giảm, chỉ được giảm
            //tối thiểu tới 1 item
            if(cartItems[currentItemID].inCart > 1) {
                cartItems[currentItemID].inCart -= 1
                cartNumbers(cartItems[currentItemID], "decrease");
                totalCost(cartItems[currentItemID], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                //Render lại
                displayCart();
            }

        })
    }
    
    for (let i = 0; i < increaseBtn.length; i++) {
        increaseBtn[i].addEventListener('click', () => {
            currentQuantity = increaseBtn[i]
            .parentElement
            .querySelector('span')
            .textContent
            .trim();

            currentItemID = increaseBtn[i]
            .parentElement
            .parentElement
            .previousElementSibling
            .querySelector('span')
            .querySelector('span')
            .textContent
            .trim();

            cartItems[currentItemID].inCart += 1
            cartNumbers(cartItems[currentItemID]);
            totalCost(cartItems[currentItemID]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        })
    }
} 