fetch('http://localhost:3000/products')
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(data => {
                    // Tìm sản phẩm theo ID
                    const product = data.find(p => p.id == productId);

                    // Hiển thị thông tin sản phẩm
                    const productDetail = document.querySelector('.container_details');
                    if (product) {
                        productDetail.innerHTML = `
                            <div class="row">
                                <div class="col-lg-6 product-images">
                                    <img src="${product.image}">
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
                                                <button id="btn-reduce " type="button" onclick="reduceQty()">-</button>
                                                <input aria-label="Số lượng" type="number" id="qty-input" name="quantity" min="1" max="999"
                                                    value="1" readonly />
                                                <button id="btn-increase" type="button" onclick="increaseQty()">+</button>
                                            </div>

                                            <div class="btn-submit">
                                                <button id="sub" type="submit" class="btn btn-md btn-gray btn-cart btn_buy add_to_cart">Thêm
                                                    vào giỏ hàng</button>
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
                    } else {
                        productDetail.innerHTML = '<p>Sản phẩm không tồn tại.</p>';
                    }
                })
                .catch(error => {
                    console.error('Error fetching product:', error);
                    document.getElementById('product-detail').innerHTML = '<p>Có lỗi xảy ra khi tải sản phẩm.</p>';
                });


                function increaseQty() {
                    const qtyInput = document.getElementById('qty-input');
                    let currentQty = parseInt(qtyInput.value);
                    currentQty = Math.min(currentQty + 1, 999);
                    qtyInput.value = currentQty; 
                }
                // giảm số lượng
                function reduceQty() {
                    const qtyInput = document.getElementById('qty-input');
                    let currentQty = parseInt(qtyInput.value);
                    currentQty = Math.max(currentQty - 1, 1); // Tối thiểu là 1
                    qtyInput.value = currentQty;
                }