var idDetail = JSON.parse(localStorage.getItem('idDetail'))

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
                        <span class="price product-price">$${product.price} VNĐ</span>
                    </div>
                    <form id="add-to-cart-form" class="wishItem">
                        <input type="hidden" id="one_variant" name="variantId" value="68561602" />
                        <div class="service_product">
                            <div class="info_servicea">
                                <img class="img-responsive" src="/projectWeb/images/icon/image_service_1_product.png"
                                    alt="">
                                <p><a href="#" title="Giao hàng toàn quốc">Giao hàng toàn quốc</a></p>
                            </div>
                            <div class="info_servicea">
                                <img class="img-responsive" src="/projectWeb/images/icon/image_service_2_product.png"
                                    alt="">
                                <p><a href="#" title="Thanh toán khi nhận hàng">Thanh toán khi nhận hàng</a></p>
                            </div>
                            <div class="info_servicea">
                                <img class="img-responsive" src="/projectWeb/images/icon/image_service_3_product.png"
                                    alt="">
                                <p><a href="#" title="Cam kết đổi/trả hàng miễn phí">Cam kết đổi/trả hàng miễn phí</a></p>
                            </div>
                            <div class="info_servicea">
                                <img class="img-responsive" src="/projectWeb/images/icon/image_service_4_product.png"
                                    alt="">
                                <p><a href="#" title="Hàng chính hãng/Bảo hành 10 năm">Hàng chính hãng/Bảo hành 10 năm</a>
                                </p>
                            </div>
                        </div>
                        <div class="inventory_quantity">
                            <span class="a-stock">Còn hàng</span>
                        </div>
                        <div class="flex-quantity" id="button">
                            <div class="qty-ant ">
                                <button id="btn-reduce " type="button" onclick= "reduceQty()">-</button>
                                <input aria-label="Số lượng" type="number" id="qty-input" name="quantity" value="1" readonly />
                                <button id="btn-increase" type="button"  onclick= "increaseQty()">+</button>
                            </div>
                            <div class="btn-submit">
                                <button id="sub" type="button" class="btn btn-md btn-gray btn-cart btn_buy add_to_cart" onclick= "addToCart()">Thêm vào giỏ hàng</button>
                            </div>
                            <div class="btn-buy">
                                <button id="buy" type="button" class="btn btn-md btn-gray btn_buy btn-buy-now "
                                    data-id="68561602" data-qty="1">Mua ngay</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        `;
    })

function increaseQty() {
    var qtyInput = document.getElementById('qty-input');
    ++qtyInput.value
}
function reduceQty() {
    var qtyInput = document.getElementById('qty-input');
    if (qtyInput.value > 1) {
        qtyInput.value--
    }
}

function addToCart () {
    var qtyInput = document.getElementById('qty-input')
    let alert = false;    
    for (let i = 0;i< qtyInput.value; i++) {
        add(idDetail, alert)
        alert = true
    }

    setTimeout(()=>{
        window.location = "http://127.0.0.1:5500/projectWeb/page/shoppingCart/shoppingCart.html"
    }, 200)
}

window.addEventListener('click', function () {
    var qtyInput = document.getElementById('qty-input').value;
})

setInterval(()=> {giohang()}, 500)