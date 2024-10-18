function fetchAndDisplayProducts(url, selector) {
    fetch(url)
        .then(response => response.json())
        .then(products => {
            const productList = document.querySelector(selector);
            productList.innerHTML = ''; // Xóa nội dung cũ trước khi hiển thị sản phẩm mới
            products.forEach(product => {
                const demo = document.createElement('div'); 
                demo.classList.add('col-3');
                demo.innerHTML = `
                    <div class="card">
                        <a href="/projectWeb/page/product/productDetail/proDetail.html?id=${product.id}">
                            <img class="card-img-top" src="${product.image}" alt="${product.name} - Hình ảnh sản phẩm" style="width:100%">
                        </a>
                        <div class="card-body text-center">
                            <h4 class="card-title">${product.name}</h4>
                            <p class="card-text">${product.price} VNĐ</p>
                            <a href="#" class="btn btn-primary btn-order">Mua</a>
                            <button class="btn btn-primary btn-shopping" name="${product.id}">
                                <i class="bi bi-handbag-fill icon-shopping"></i>
                            </button>
                        </div>
                    </div>
                `;
                productList.appendChild(demo);
            });
            getOnclick(); // Gọi hàm để thiết lập sự kiện cho nút "Thêm vào giỏ"
        })
        .catch(error => {
            console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        });
}

// Fetch và hiển thị sản phẩm mới về
fetchAndDisplayProducts('http://localhost:3000/new_arrivals', '.product_1');

// Fetch và hiển thị sản phẩm bán chạy
fetchAndDisplayProducts('http://localhost:3000/best_sellers', '.product_2');

// Fetch và hiển thị tất cả sản phẩm
fetchAndDisplayProducts('http://localhost:3000/products', '.products');

// Lắng nghe sự kiện cho các danh mục sản phẩm
document.querySelectorAll('.category').forEach(function(category) {
    category.addEventListener('click', function(event) {
        event.preventDefault();
        const categoryId = this.dataset.categoryId;
        const elementMypham = document.querySelector('.mypham');
        elementMypham.style.display = 'none';

        // Lấy dữ liệu từ db.json
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(products => {
                const filteredProducts = products.filter(product => product.categoryId == categoryId);
                displayProducts(filteredProducts);
            })
            .catch(error => console.error('Error fetching data:', error));
    });
});

// Chức năng tìm kiếm sản phẩm
document.querySelector('.search-icon').addEventListener('click', function() {
    const searchTerm = document.querySelector('.search-input').value.toLowerCase();
    fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(products => {
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm)
            );
            displayProducts(filteredProducts);
        })
        .catch(error => console.error('Error fetching data:', error));
});

// Hàm hiển thị sản phẩm
function displayProducts(products) {
    const product_1 = document.querySelector('.product_1');
    const product_2 = document.querySelector('.product_2');
    const product_3 = document.querySelector('.product_3');
    product_1.innerHTML = '';
    product_2.innerHTML = '';
    product_3.innerHTML = ''; // Xóa nội dung cũ

    if (products.length === 0) {
        productList.innerHTML = '<p>Không có sản phẩm nào phù hợp với tìm kiếm của bạn.</p>';
        return; 
    }

    products.forEach(product => {
        const demo = document.createElement('div'); 
        demo.classList.add('col-3');
        demo.innerHTML = `
            <div class="card">
                <a href="/projectWeb/page/product/productDetail/proDetail.html?id=${product.id}">
                    <img class="card-img-top" src="${product.image}" alt="${product.name} - Hình ảnh sản phẩm" style="width:100%">
                </a>
                <div class="card-body text-center">
                    <h4 class="card-title">${product.name}</h4>
                    <p class="card-text">${product.price} VNĐ</p>
                    <a href="#" class="btn btn-primary btn-order">Mua</a>
                    <button class="btn btn-primary btn-shopping" name="${product.id}">
                        <i class="bi bi-handbag-fill icon-shopping"></i>
                    </button>
                </div>
            </div>
        `;
        product_1.appendChild(demo);
    });
    getOnclick(); // Gọi hàm để thiết lập sự kiện cho nút "Thêm vào giỏ"
}

// Thiết lập sự kiện cho nút "Thêm vào giỏ"
function getOnclick() {
    setTimeout(() => {
        const list = document.getElementsByClassName('btn-shopping');
        for (let i = 0; i < list.length; i++) {
            list[i].addEventListener('click', function () {
                const product_id = list[i].getAttribute('name');
                fetch(`http://localhost:3000/products/${product_id}`)
                    .then(response => response.json())
                    .then(product => {
                        changeQuanlity(product);
                    })
                    .catch(error => console.error('Error fetching product:', error));
            });
        }
    }, 100);
}

// Chức năng thay đổi số lượng sản phẩm trong giỏ hàng
function changeQuanlity(product) {
    try {
        const data = JSON.parse(localStorage.getItem(`${product.id}`));
        localStorage.setItem(`${product.id}`, JSON.stringify([`${product.id}`, ++data[1]]));
    } catch (e) {
        localStorage.setItem(`${product.id}`, JSON.stringify([product.id, 1]));
    }
    gioHang();
}

// Cập nhật giỏ hàng
function gioHang() {
    const giohang = document.getElementById('giohang');
    let total = 0;
    Object.entries(localStorage).forEach(([key, value]) => {
        total += JSON.parse(value)[1];
    });
    giohang.innerText = total === 0 ? 'Giỏ hàng' : `Giỏ hàng (${total})`;
}