document.addEventListener('DOMContentLoaded', function() {
    const orderSummary = document.querySelector('.order-summary');
    const shippingFee = 40000;
    const qrImage = document.getElementById('qr_img');

    async function checkLoginStatus() {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));

        if (user) {
            document.getElementById('email').value = user.email || '';
            document.getElementById('phone').value = user.phone || '';
            document.getElementById('address').value = user.address || '';
            document.getElementById('note').value = user.note || '';
        } else {
            window.location.href = '/projectWeb/page/login/login.html';
        }
    }

    // Kiểm tra trạng thái đăng nhập
    checkLoginStatus();

    const products = JSON.parse(localStorage.getItem('products')) || [];

    if (products.length === 0) {
        orderSummary.innerHTML = `<p>Giỏ hàng trống!</p>`;
        return;
    }

    let totalAmount = 0;

    // Hiển thị sản phẩm trong giỏ hàng
    products.forEach(product => {
        const productId = Object.keys(product)[0];
        const productData = product[productId];
        const productTotalPrice = productData.price * productData.quantity;

        totalAmount += productTotalPrice;

        const orderItem = document.createElement('div');
        orderItem.classList.add('pr-order');
        orderItem.innerHTML = `
            <div class="pr-img">
                <img src="${productData.image}" alt="">
            </div>
            <div class="pr-name">${productData.name}</div>
            <div class="pr-price">${productTotalPrice} VND</div>
        `;
        orderSummary.appendChild(orderItem);
    });

    const subtotal = totalAmount;
    const total = subtotal + shippingFee;

    // Hiển thị tạm tính và tổng cộng
    document.querySelector('.price_tamtinh').innerText = `${subtotal} VND`;
    document.querySelector('.total_price').innerText = `${total} VND`;

    // Tạo mã QR cho tổng số tiền
    const QR = `https://img.vietqr.io/image/BIDV-5811623308-qr_only.png?amount=${total}&addInfo=ThanhToan`;
    qrImage.src = QR;

    // Ẩn mã QR mặc định
    qrImage.style.display = 'none';

    // Xử lý sự kiện cho các nút radio phương thức thanh toán
    const paymentMethods = document.querySelectorAll('input[name="method"]');
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            if (this.value === 'Tiền mặt') {
                qrImage.style.display = 'none'; // Ẩn mã QR khi chọn thanh toán tiền mặt
            } else if (this.value === 'QR code') {
                qrImage.style.display = 'block'; // Hiện mã QR khi chọn thanh toán bằng mã QR
            }
        });
    });

    // Sự kiện click cho nút "THANH TOÁN"
    const orderButton = document.querySelector('.order');
    orderButton.addEventListener('click', async function() {
        const paymentMethod = document.querySelector('input[name="method"]:checked').value;

        const orderDetails = {
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            note: document.getElementById('note').value,
            products: products.map(product => {
                const productId = Object.keys(product)[0];
                const productData = product[productId];
                return {
                    productId: productId,
                    name: productData.name,
                    price: productData.price,
                    quantity: productData.quantity
                };
            }),
            subtotal: subtotal,
            shippingFee: shippingFee,
            total: total,
            paymentMethod: paymentMethod,
            orderDate: new Date().toISOString()
        };

        try {
            const response = await fetch('http://localhost:3000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderDetails),
            });

            if (response.ok) {
                localStorage.removeItem('products');
                window.location.href = '/projectWeb/page/payment-success/payment-success.html';
            } else {
                alert('Đã xảy ra lỗi khi lưu đơn hàng.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Đã xảy ra lỗi khi gửi yêu cầu.');
        }
    });

    // Xử lý sự kiện cho nút "QUAY VỀ GIỎ HÀNG"
    document.getElementById('back-to-cart').addEventListener('click', function() {
        window.location.href = '/projectWeb/page/shoppingCart/shoppingCart.html'; // Đường dẫn đến trang giỏ hàng
    });
});