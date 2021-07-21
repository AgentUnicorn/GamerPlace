import {getUserInput} from './user.js'
import {successNotify} from './alert-modal.js'

//Function in các sản phẩm trong 
//giỏ hàng vào email
function userCart() {
  let renderItemList = '';

  let productNumber = localStorage.getItem("CartNumber");
  productNumber = parseInt(productNumber);

  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  Object.values(cartItems).map(item => {
    renderItemList +=  `<tr>
                           <td style="text-align: left; padding-top: 20px;">${item.brand} + ${item.name}</td>
                           <td style="text-align: center; padding-top: 20px;">${item.inCart}</td>
                          <td style="text-align: right; padding-top: 20px;">$${item.price * item.inCart},00</td>
                        </tr>`

  });

  return renderItemList;
}

//Function xóa toàn bộ giỏ hàng
//sau khi người dùng thanh toán
function clearCart() {
  localStorage.removeItem('CartNumber');
  localStorage.removeItem('productsInCart');
  localStorage.removeItem('totalCost');
}

//Function gửi email cho email
//nhập từ bàn phím
export function sendEmail() {
  let currentUser = getUserInput();

  let token = "f52cd9a9-8b0d-437f-a775-cb4e0ee3361c";
  token = token.toLocaleUpperCase();

  let cartCost = localStorage.getItem("totalCost");

  Email.send({
      SecureToken : token,
      To : currentUser.email,
      From : "superslap1999@gmail.com",
      Subject : "Thank you for purchase!!",
      Body : `<div style="width: 600px; border: 1px solid red; padding: 20px">
                <div style="text-align: center;">
                    <h2>Order Confirmation</h3>
                    <p>We received your order and we we'll let you know when we ship it out.</p>
                </div>
                <hr>
                <h4>Your Order: </h5>
                <hr>
                <table style="width: 100%; padding: 20px 0">
                    <tr>
                        <th style="text-align: left;">Product</th>
                        <th style="text-align: center;">Quantity</th>
                        <th style="text-align: right;">Subtotal</th>
                    </tr>
                    ${userCart()}
                </table>
                <hr>
                <div>
                    <h4>Shipping Address</h4>
                    <p>${currentUser.address} ${currentUser.state} ${currentUser.city}</p>
                    <h4>Payment</h4>
                    Visa - 33334444 
                </div>
                <hr>
                <div style="text-align: center;">
                    <h4>Order Total</h4>
                    <h1 style="color: #ff523b;">$${cartCost},00</h1>
                </div>
            </div>`
  });
    
  //Gọi hàm thông báo thanh toán
  //thành công
  successNotify();
  //Gọi hàm xóa cart
  clearCart();
}


