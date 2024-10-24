var idDetail = JSON.parse(localStorage.getItem('idDetail'));

fetch(`http://localhost:3000/products/${idDetail}`)
    .then(response => response.json())
    .then(product => {
        const productDetail = document.querySelector('.container_details');
        productDetail.innerHTML = `
            <div class="row">
                <div class="col-lg-6 product-images">
                    <img src="${product.image}" alt="Sữa rửa mặt Senka">
                </div>
                <div class="col-lg-6 details-pro">
                    <h1 class="title-head">${product.name}</h1>
                    <div class="special-price">
                        <span class="price product-price">${product.price} VNĐ</span>
                    </div>
                    <form id="add-to-cart-form" class="wishItem">
                        <input type="hidden" id="one_variant" name="variantId" value="68561602" />
                        <div class="service_product">
                            <!-- Các dịch vụ -->
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
    });

function increaseQty() {
    var qtyInput = document.getElementById('qty-input');
    qtyInput.value = parseInt(qtyInput.value) + 1; // Tăng số lượng
}

function reduceQty() {
    var qtyInput = document.getElementById('qty-input');
    if (qtyInput.value > 1) {
        qtyInput.value = parseInt(qtyInput.value) - 1; // Giảm số lượng
    }
}

function addToCart() {
    var qtyInput = document.getElementById('qty-input').value;
    let alert = false;    
    for (let i = 0; i < qtyInput; i++) {
        add(idDetail, alert); // Giả sử hàm add thêm sản phẩm vào giỏ hàng
        alert = true; // Đánh dấu đã thêm sản phẩm
    }
}

function buyNow() {
    var qtyInput = document.getElementById('qty-input').value;
    let alert = false;

    for (let i = 0; i < qtyInput; i++) {
        add(idDetail, alert); // Thêm sản phẩm vào giỏ hàng
        alert = true; // Đánh dấu đã thêm sản phẩm
    }

    // Chuyển đến trang thanh toán
    setTimeout(() => {
        window.location = "/projectWeb/page/payment/payment.html"; // Chuyển đến trang thanh toán
    }, 200);
}

window.addEventListener('click', function () {
    // Mã này có thể được bỏ qua nếu không cần thiết
});

setInterval(() => { giohang(); }, 500);