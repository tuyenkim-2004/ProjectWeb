// // Lấy ID sản phẩm từ localStorage
// var idDetail = JSON.parse(localStorage.getItem('idDetail'));

// // Fetch thông tin sản phẩm từ API
// fetch(`http://localhost:3000/products/${idDetail}`)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(product => {
//         const productDetail = document.querySelector('.container_details');
//         productDetail.innerHTML = `
//             <div class="row">
//                 <div class="col-lg-6 product-images">
//                     <img src="${product.image}" alt="${product.name}">
//                 </div>
//                 <div class="col-lg-6 details-pro">
//                     <h1 class="title-head">${product.name}</h1>
//                     <div class="special-price">
//                         <span class="price product-price">${product.price.toLocaleString('vi-VN')} VNĐ</span>
//                     </div>
//                     <form id="add-to-cart-form" class="wishItem">
//                         <input type="hidden" id="one_variant" name="variantId" value="${product.id}" />
//                         <div class="service_product">
//                             <div class="info_servicea">
//                                 <img class="img-responsive" src="/projectWeb/images/icon/image_service_1_product.png" alt="">
//                                 <p><a href="#" title="Giao hàng toàn quốc">Giao hàng toàn quốc</a></p>
//                             </div>
//                             <div class="info_servicea">
//                                 <img class="img-responsive" src="/projectWeb/images/icon/image_service_2_product.png" alt="">
//                                 <p><a href="#" title="Thanh toán khi nhận hàng">Thanh toán khi nhận hàng</a></p>
//                             </div>
//                             <div class="info_servicea">
//                                 <img class="img-responsive" src="/projectWeb/images/icon/image_service_3_product.png" alt="">
//                                 <p><a href="#" title="Cam kết đổi/trả hàng miễn phí">Cam kết đổi/trả hàng miễn phí</a></p>
//                             </div>
//                             <div class="info_servicea">
//                                 <img class="img-responsive" src="/projectWeb/images/icon/image_service_4_product.png" alt="">
//                                 <p><a href="#" title="Hàng chính hãng/Bảo hành 10 năm">Hàng chính hãng/Bảo hành 10 năm</a></p>
//                             </div>
//                         </div>
//                         <div class="inventory_quantity">
//                             <span class="a-stock">Còn hàng</span>
//                         </div>
//                         <div class="flex-quantity" id="button">
//                             <div class="qty-ant">
//                                 <button id="btn-reduce" type="button" onclick="reduceQty()">-</button>
//                                 <input aria-label="Số lượng" type="number" id="qty-input" name="quantity" value="1" readonly />
//                                 <button id="btn-increase" type="button" onclick="increaseQty()">+</button>
//                             </div>
//                             <div class="btn-submit">
//                                 <button id="sub" type="button" class="btn btn-md btn-gray btn-cart btn_buy add_to_cart" onclick="addToCart()">Thêm vào giỏ hàng</button>
//                             </div>
//                             <div class="btn-buy">
//                                 <button id="buy" type="button" class="btn btn-md btn-gray btn_buy btn-buy-now" onclick="buyNow()">Mua ngay</button>
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         `;
//     })
//     .catch(error => {
//         console.error('Có lỗi xảy ra:', error);
//     });

// // Hàm tăng số lượng
// function increaseQty() {
//     var qtyInput = document.getElementById('qty-input');
//     qtyInput.value = parseInt(qtyInput.value) + 1; // Tăng số lượng
// }

// //```javascript
// // Hàm giảm số lượng
// function reduceQty() {
//     var qtyInput = document.getElementById('qty-input');
//     if (qtyInput.value > 1) {
//         qtyInput.value = parseInt(qtyInput.value) - 1; // Giảm số lượng
//     }
// }

// // Hàm thêm vào giỏ hàng
// function addToCart() {
//     var qtyInput = document.getElementById('qty-input').value;
//     let alertAdded = false;    
//     for (let i = 0; i < qtyInput; i++) {
//         add(idDetail, alertAdded); // Giả sử hàm add sản phẩm vào giỏ hàng
//         alertAdded = true; // Đánh dấu đã thêm sản phẩm
//     }
//     alert('Sản phẩm đã được thêm vào giỏ hàng!');
// }

// // Hàm mua ngay
// function buyNow() {
//     var qtyInput = document.getElementById('qty-input').value;
//     let alertAdded = false;

//     for (let i = 0; i < qtyInput; i++) {
//         add(idDetail, alertAdded); // Thêm sản phẩm vào giỏ hàng
//         alertAdded = true; // Đánh dấu đã thêm sản phẩm
//     }

//     // Chuyển đến trang thanh toán
//     setTimeout(() => {
//         window.location = "/projectWeb/page/payment/payment.html"; // Chuyển đến trang thanh toán
//     }, 200);
// }

// // Hàm thêm sản phẩm vào giỏ hàng (giả định)
// function add(productId, alertAdded) {
//     console.log(`Thêm sản phẩm ID: ${productId} vào giỏ hàng`);
// }

// // Gọi hàm giohang mỗi 500ms (giả định)
// setInterval(() => { giohang(); }, 500);



// Lấy ID sản phẩm từ localStorage
var idDetail = JSON.parse(localStorage.getItem('idDetail'));

// Fetch thông tin sản phẩm từ API
fetch(`http://localhost:3000/products/${idDetail}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(product => {
        const productDetail = document.querySelector('.container_details');
        productDetail.innerHTML = `
            <div class="row">
                <div class="col-lg-6 product-images">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="col-lg-6 details-pro">
                    <h1 class="title-head">${product.name}</h1>
                    <div class="special-price">
                        <span class="price product-price">${product.price.toLocaleString('vi-VN')} VNĐ</span>
                    </div>
                    <form id="add-to-cart-form" class="wishItem">
                        <input type="hidden" id="one_variant" name="variantId" value="${product.id}" />
                        <div class="service_product">
                            <div class="info_servicea">
                                <img class="img-responsive" src="/projectWeb/images/icon/image_service_1_product.png" alt="">
                                <p><a href="#" title="Giao hàng toàn quốc">Giao hàng toàn quốc</a></p>
                            </div>
                            <div class="info_servicea">
                                <img class="img-responsive" src="/projectWeb/images/icon/image_service_2_product.png" alt="">
                                <p><a href="#" title="Thanh toán khi nhận hàng">Thanh toán khi nhận hàng</a></p>
                            </div>
                            <div class="info_servicea">
                                <img class="img-responsive" src="/projectWeb/images/icon/image_service_3_product.png" alt="">
                                <p><a href="#" title="Cam kết đổi/trả hàng miễn phí">Cam kết đổi/trả hàng miễn phí</a></p>
                            </div>
                            <div class="info_servicea">
                                <img class="img-responsive" src="/projectWeb/images/icon/image_service_4_product.png" alt="">
                                <p><a href="#" title="Hàng chính hãng/Bảo hành 10 năm">Hàng chính hãng/Bảo hành 10 năm</a></p>
                            </div>
                        </div>
                        <div class="inventory_quantity">
                            <span class="a-stock">Còn hàng</span>
                        </div>
                        <div class="flex-quantity" id="button">
                            <div class="qty-ant">
                                <button id="btn-reduce" type="button" onclick="reduceQty()">-</button>
                                <input aria-label="Số lượng" type="number" id="qty-input" name="quantity" value="1" readonly />
                                <button id="btn-increase" type="button" onclick="increaseQty()">+</button>
                            </div>
                            <div class="btn-submit">
                                <button id="sub" type="button" class="btn btn-md btn-gray btn-cart btn_buy add_to_cart" onclick="addToCart()">Thêm vào giỏ hàng</button>
                            </div>
                            <div class="btn-buy">
                                <button id="buy" type="button" class="btn btn-md btn-gray btn_buy btn-buy-now" onclick="buyNow()">Mua ngay</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        `;
    })
    .catch(error => {
        console.error('Có lỗi xảy ra:', error);
    });

// Hàm tăng số lượng
function increaseQty() {
    var qtyInput = document.getElementById('qty-input');
    qtyInput.value = parseInt(qtyInput.value) + 1; // Tăng số lượng
}

// Hàm giảm số lượng
function reduceQty() {
    var qtyInput = document.getElementById('qty-input');
    if (qtyInput.value > 1) {
        qtyInput.value = parseInt(qtyInput.value) - 1; // Giảm số lượng
    }
}

// Hàm thêm vào giỏ hàng
function addToCart() {
    var qtyInput = document.getElementById('qty-input').value;
    let alertAdded = false;    
    for (let i = 0; i < qtyInput; i++) {
        add(idDetail, alertAdded); // Giả sử hàm add sản phẩm vào giỏ hàng
        alertAdded = true; // Đánh dấu đã thêm sản phẩm
    }
    alert('Sản phẩm đã được thêm vào giỏ hàng!');
}

// Hàm mua ngay
function buyNow() {
    var qtyInput = parseInt(document.getElementById('qty-input').value);
    let alertAdded = false;

    for (let i = 0; i < qtyInput; i++) {
        add(idDetail, alertAdded); // Thêm sản phẩm vào giỏ hàng
        alertAdded = true; // Đánh dấu đã thêm sản phẩm
    }

    // Chuyển đến trang thanh toán
    setTimeout(() => {
        window.location = "/projectWeb/page/payment/payment.html"; // Chuyển đến trang thanh toán
    }, 200);
}

// Hàm thêm sản phẩm vào giỏ hàng
function add(productId, alertAdded) {
    fetch(`http://localhost:3000/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            let products = getLocalStorage();
            let existingProduct = products.find(p => Object.keys(p)[0] === productId);

            if (existingProduct) {
                existingProduct[productId].quantity += 1; // Tăng số lượng nếu sản phẩm đã có
            } else {
                let newProduct = {
                    [productId]: {
                        name: product.name,
                        image: product.image,
                        price: product.price,
                        quantity: 1,
                        checkbox: false
                    }
                };
                products.push(newProduct); // Thêm sản phẩm mới vào giỏ hàng
            }

            setLocalStorage(products); // Cập nhật localStorage
            if (!alertAdded) {
                alert('Sản phẩm đã được thêm vào giỏ hàng!');
            }
        })
        .catch(error => {
            console.error('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng:', error);
        });
}

// Hàm lấy dữ liệu từ localStorage
function getLocalStorage() {
    let productsData = localStorage.getItem('products');
    return productsData ? JSON.parse(productsData) : [];
}

// Hàm cập nhật localStorage
function setLocalStorage(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Gọi hàm giohang mỗi 500ms (giả định)
setInterval(() => { giohang(); }, 500);