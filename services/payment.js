document.addEventListener('DOMContentLoaded', function() {
    const orderSummary = document.querySelector('.order-summary');
    const shippingFee = 40000;

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

    checkLoginStatus();

    const products = JSON.parse(localStorage.getItem('products')) || [];

    if (products.length === 0) {
        orderSummary.innerHTML = `<p>Giỏ hàng trống!</p>`;
        return;
    }

    let totalAmount = 0;

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

<<<<<<< HEAD
    document.querySelector('.fee_shipping span').innerText = `${shippingFee} VND`;
    document.querySelector('.tam_tinh span').innerText = `${subtotal} VND`;
    document.querySelector('.total_price span').innerText = `${total} VND`;

    // Thêm nút "THANH TOÁN"
    const orderButton = document.querySelector('.order');

    orderButton.addEventListener('click', async function() {
        // Lấy thông tin từ các trường nhập liệu
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const note = document.getElementById('note').value;
        const paymentMethod = document.querySelector('input[name="method"]:checked').value;

        // Kiểm tra nếu tất cả thông tin cần thiết đã được nhập
        if (!email || !phone || !address) {
            alert('Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        const orderDetails = {
            email: email,
            phone: phone,
            address: address,
            note: note,
=======
    // Hiển thị tạm tính và tổng cộng
    document.querySelector('.price_tamtinh').innerText = `${subtotal} VND`; // Hiển thị tạm tính
    document.querySelector('.total_price').innerText = `${total} VND`; // Hiển thị tổng cộng

    // Tạo mã QR cho tổng số tiền
    const qrImage = document.getElementById('qr_img');
    const QR = `https://img.vietqr.io/image/BIDV-5811623308-qr_only.png?amount=${total}&addInfo=ThanhToan`;
    qrImage.src = QR;

    document.getElementById('qr_code').addEventListener('change', function() {
        qrImage.style.display = this.checked ? 'block' : 'none';
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
>>>>>>> 9141d0dcbbedac6e868d83471eb75ca2cee32ffd
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
<<<<<<< HEAD
            const response = await fetch('/api/orders', {
=======
            const response = await fetch(' http://localhost:3000/orders', {
>>>>>>> 9141d0dcbbedac6e868d83471eb75ca2cee32ffd
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderDetails),
            });

            if (response.ok) {
<<<<<<< HEAD
                alert('Đơn hàng đã được lưu thành công!');
=======
                // alert('Đơn hàng đã được lưu thành công!');
                // Xóa sản phẩm trong giỏ hàng
                localStorage.removeItem('products');
>>>>>>> 9141d0dcbbedac6e868d83471eb75ca2cee32ffd
                window.location.href = '/projectWeb/page/payment-success/payment-success.html'; // Chuyển đến trang thanh toán thành công
            } else {
                alert('Đã xảy ra lỗi khi lưu đơn hàng.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Đã xảy ra lỗi khi gửi yêu cầu.');
        }
    });
});