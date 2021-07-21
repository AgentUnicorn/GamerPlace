//Function thông báo user đã 
//thanh toán thành công
export function successNotify() {
  Swal.fire({
    icon: 'success',
    title: 'Payment Success!!',
    showConfirmButton: false,
  });

  //Set timeout để tự động 
  //quay về trang chủ
  setTimeout(()=>{
    window.location.href = "../index.html";
  }, 2000);
}

//Function thông báo giỏ hàng 
//đang trống
export function alertEmptyCart() {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'You have nothing in cart to pay!!',
    showConfirmButton: true,
    confirmButtonColor: '#ff523b'
  });
}

//Function thông báo thêm vào
//giỏ hàng thành công
export function alertAddToCartSuccess() {
  Swal.fire({
    icon: 'success',
    title: 'Added to your cart!',
    timer: 1000,
    showConfirmButton: false,
  });
}

//Function thành báo có field chưa 
//hợp lệ trước khi thanh toán
export function alertInvalidField() {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Some fields is invalid. Go check again!',
    showConfirmButton: true,
    confirmButtonColor: '#ff523b'
  });
}
