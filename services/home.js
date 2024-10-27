

function fetchAndDisplayProducts(url, selector) {
    fetch(url)
        .then(response => response.json())
        .then(products => {
            const productList = document.querySelector(selector);
            products.forEach(product => {
                const demo = document.createElement('div'); 
                demo.classList.add('col-3');
                demo.innerHTML = `
                    <div class="card">
                        <a onclick="goToDetail(${product.id})" href="/projectWeb/page/product/productDetail/proDetail.html?id=${product.id}">
                            <img class="card-img-top" src="${product.image}" alt="${product.name} - Hình ảnh sản phẩm" style="width:100%">
                        </a>
                        <div class="card-body text-center">
                            <h4 class="card-title">${product.name}</h4>
                            <p class="card-text">${product.price} VNĐ</p>
                            <a href="#" class="btn btn-primary btn-order" data-id="${product.id}">Mua</a>
                            <button class="btn btn-primary btn-shopping" name="create" value="${product.id}">
                                <i class="bi bi-handbag-fill icon-shopping"></i>
                            </button>
                        </div>
                    </div>
                `;
                productList.appendChild(demo);
            });

            // Add event listeners for the "Mua" buttons
            const buyButtons = productList.querySelectorAll('.btn-order');
            buyButtons.forEach(button => {
                button.addEventListener('click', function(event) {
                    event.preventDefault(); // Prevent the default anchor behavior
                    const productId = this.getAttribute('data-id');
                    add(productId, true); // Add to cart and redirect
                });
            });
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

document.querySelectorAll('.category').forEach(function(category) {
    category.addEventListener('click', function(event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết
        const categoryId = this.dataset.categoryId;
        const elementMypham = document.querySelector('.mypham');
        elementMypham.style.display = 'none'; // Ẩn phần tử

        // Lấy dữ liệu từ db.json
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(products => {
                // Lọc sản phẩm theo categoryId
                const filteredProducts = products.filter(product => product.categoryId == categoryId);
                displayProducts(filteredProducts);
            })
            .catch(error => console.error('Error fetching data:', error));
    });
});

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; 

    if (products.length === 0) {
        productList.innerHTML = '<p>Không có sản phẩm nào trong danh mục này.</p>';
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
                    <a href="#" class="btn btn-primary btn-order" data-id="${product.id}">Mua</a>
                    <button class="btn btn-primary btn-shopping" name=${product.id}">
                        <i class="bi bi-handbag-fill icon-shopping"></i>
                    </button>
                </div>
            </div>
        `;

        // Thêm phần tử demo vào productList
        productList.appendChild(demo);

        // Add event listener for the "Mua" button in the filtered products
        demo.querySelector('.btn-order').addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor behavior
            const productId = product.id;
            add(productId, true); // Add to cart and redirect
        });
    });
}

// DO Thanh Binh -- SHOPPING CART
newLocalStorage();
giohang();
window.addEventListener('storage', function () {
    giohang();
});

setTimeout(() => {
    let shoppingButtons = document.getElementsByClassName('btn-shopping');
    for (let i = 0; i < shoppingButtons.length; i++) {
        let shoppingButton = shoppingButtons[i];
        shoppingButton.addEventListener('click', function () {
            add(shoppingButton.value, false);
            giohang();
        });
    }
    newLocalStorage();
}, 100);

function newLocalStorage() {
    setTimeout(() => {
        let check = localStorage.getItem('products');
        if (check == null || check == undefined) {
            let products = [];
            localStorage.setItem('products', JSON.stringify(products));
        }
    }, 50);
}

function giohang() {
    setTimeout(() => {
        const giohang = document.getElementById('quantityNum');
        let total = totalQuantity();
        total === 0 ? giohang.innerText = `` : giohang.innerText = total;
    }, 50);
}

function setLocalStorage(productsData) {
    localStorage.setItem('products', JSON.stringify(productsData));
}

function getLocalStorage() {
    let productsData = localStorage.getItem('products');
    return (JSON.parse(productsData));
}

function checkProduct(product_id) {
    let products = getLocalStorage();
    for (let i = 0; i < getLocalStorage().length; i++) {
        let product = products[i];
        let productId = Object.keys(product)[0];
        if (productId == product_id) {
            return true;
        }
    }
    return false;
}

function create(product_id, product_name, product_img, product_price, boolean) {
    if (checkProduct(product_id)) {
        update(product_id, 'add');
    } else {
        let product = {
            [product_id]: {
                name: product_name,
                image: product_img,
                price: product_price,
                quantity: 1,
                checkbox: false
            }
        };
        let products = getLocalStorage();
        products.push(product);
        setLocalStorage(products);
    }
    if (!boolean) {
        alert('Thêm vào giỏ hàng thành công !!!');
    }
}

function update(product_id, type) {
    let products = getLocalStorage();
    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        let productId = Object.keys(product)[0];
        if (productId == product_id) {
            if (type == "add") {
                ++products[i][productId].quantity;
            } else {
                if (products[i][productId].quantity > 1)
                    --products[i][productId].quantity;
                else alert('Giá trị tối thiểu là 1');
            }
            setLocalStorage(products);
            break;
        }
    }
}

function add(produc_id, boolean) {
    fetch(`http://localhost:3000/products/${produc_id}`)
        .then(response => response.json())
        .then(product => {
            create(product.id, product.name, product.image, product.price, boolean);
            if (boolean) {
                // Redirect to payment page after adding to cart
                window.location.href = '/projectWeb/page/payment/payment.html';
            }
        });
}

function totalQuantity() {
    let products = getLocalStorage();
    let total = 0;
    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        let productId = Object.keys(product)[0];
        total += products[i][productId].quantity;
    }
    return total;
}

function goToDetail(idDetail) {
    localStorage.setItem('idDetail', idDetail);
}