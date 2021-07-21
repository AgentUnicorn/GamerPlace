//Import các function cần chạy khi trang được load
import {
    displayAllProducts, 
    onloadCartNumbers, 
    displayCart, 
    loadNumberOfEachProduct, 
    onloadGetAddBtn, 
    onloadFilterSort, 
    onloadCallingCheckout,
    displayProductDetail,
    onloadGetDetailBtn
} from './module/onload.js'

//Function render các tất cả sản phẩm lên màn hình
displayAllProducts();
//Function lấy nút "Add" để người dùng có thể mua sản phẩm
onloadGetAddBtn();

//Nếu là trang products.html -> cho phép chạy function filter
if (window.location.pathname == "/html/products.html") {
    //Function load các chức năng sort, filter
    onloadFilterSort();
}

//Function đếm số lượng item theo Brand và in ra màn hình
loadNumberOfEachProduct();  
//Function hiển thị số lượng item trong cart
onloadCartNumbers();
//Function render các item trong cart
displayCart();

//Nếu là trang cart.html -> cho phép chạy function checkout
if (window.location.pathname == "/html/cart.html") {
    //Function kiểm tra giỏ hàng có trống không khi user ấn nút thanh toán
    onloadCallingCheckout();
}

//Function lấy nút "View" để user có thể xem thông tin của item
onloadGetDetailBtn();

if (window.location.pathname == "/html/product-detail.html") {
    //Function render thông tin của 1 item
    displayProductDetail()
}



