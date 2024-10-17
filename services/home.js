
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
        })
        .catch(error => {
            console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        });
}

// Fetch và hiển thị sản phẩm mới về
fetchAndDisplayProducts('http://localhost:3000/new_arrivals', '.product_1');
console.log (
fetchAndDisplayProducts('http://localhost:3000/new_arrivals', '.product_1')

)

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

// DO Thanh Binh -- SHOPPING CART
gioHang()
window.addEventListener('storage', function () {
   gioHang()
})
getOnclick()

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
                            <a href="#" class="btn btn-primary btn-order">Mua</a>
                            <button class="btn btn-primary btn-shopping" name=${product.id}">
                                <i class="bi bi-handbag-fill icon-shopping"></i>
                            </button>
                        </div>
                    </div>
            `;

            // Thêm phần tử demo vào productList
            productList.appendChild(demo);
    });
}


function getOnclick () {
    setTimeout (()=> {
        var list = document.getElementsByClassName('btn-shopping')
        for (let i = 0; i < list.length; i++) {
            list[i].addEventListener ('click', function () {
                var product_id = list[i].name;
                fetch(`http://localhost:3000/products/${product_id}`)
                .then (response => response.json())
                .then (product=> {
                    changeQuanlity(product)
                })
                .catch ()
            })
        }
    }, 100)
}

function changeQuanlity (product) {
    try {
        var data = JSON.parse(localStorage.getItem(`${product.id}`))
        localStorage.setItem(`${product.id}`, JSON.stringify([`${product.id}`,++data[1]]))
    } catch (e) {
        localStorage.setItem(`${product.id}`,JSON.stringify ([product.id, 1]))
    }
    gioHang()
}

function gioHang () {
    const giohang = document.getElementById('giohang')
    var total = 0
    Object.entries(localStorage).forEach(([key, value]) => {
        (total += JSON.parse(value)[1]);
      });
      if (total == 0) {
        giohang.innerText = `Giỏ hàng`
      } else {
            giohang.innerText = `Giỏ hàng (${total})`
      }
}

