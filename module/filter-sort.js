import { products } from "./product.js";

//Function render 1 mảng chứa item bất kỳ
//sau khi user sử dụng chức năng sort hoặc
//filter
export function displayProductAfterFilter(products) {
    let productList = document.querySelector('#product-list');
    productList.innerHTML = '';

    //Nếu không tìm thấy thấy
    //in ra thông báo not found
    if(products == '') {
        productList.innerHTML =    `<div style="width: 100%; text-align: center; padding: 20px 0">
                                        <h2>Không tìm thấy sản phẩm</h2>
                                        <img src="https://i.ibb.co/YWhhQJk/notfound.png" alt="notfound" border="0">
                                    </div>`;
    } else {
        products.forEach(item => {
            productList.innerHTML +=   `<div class="col-lg-4 featured-item">
                                            <img ${item.brand}/${item.img}>
                                            <p>${item.brand}</p>
                                            <h4>${item.name}</h4>
                                            <p>$${item.price},00</p>
                                            <div class="d-flex justify-content-around">
                                                <button class="btn add-btn" >Thêm</button>
                                                <button class="btn-blue detail-btn">Xem</button>
                                            </div>
                                        </div>`
        });
    }
};

//Function filter item bằng thanh kéo 
export function filterByRange() {
    let rangeValue = document.querySelector('#rangeValue');

    let filteredProducts = products.filter(e => e.price<rangeFilter.value);

    rangeValue.textContent = rangeFilter.value
    //Render mảng sau khi được filter
    displayProductAfterFilter(filteredProducts);
}

//Function filter item bằng dữ liệu user nhập vào
export function filterBySearch(searchValue) {
    searchValue = searchValue.trim().replace(/ /g,'').toLowerCase();

    let filteredProducts = [];

    products.forEach(item => {
        let brandAndName = item.brand.toLocaleLowerCase() + item.name.trim().replace(/ /g,'').toLocaleLowerCase();
        if(brandAndName.includes(searchValue)){
            filteredProducts.push(item);
        };
    })
    //Render mảng sau khi được filter
    displayProductAfterFilter(filteredProducts);
}

//Function filter item bằng checkbox
export function filterByCheckBox(checkedValueArray) {
    //Filter các item trong mảng products giống với các item trong mảng chứa value cần filter 
    let filteredProducts = products.filter(item => checkedValueArray.includes(item.brand));
    //Render mảng sau khi được filter
    displayProductAfterFilter(filteredProducts);
}

//Function sort tăng giảm
export function sort(action) {
    if(action == "ascending") {
        let sortedProducts = products.sort((a, b) => a.price - b.price);
        displayProductAfterFilter(sortedProducts);
    } else {
        let sortedProducts = products.sort((a, b) => b.price - a.price);
        displayProductAfterFilter(sortedProducts);
    }
}


