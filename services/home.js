
// function fetchAndDisplayProducts(url, selector) {
//     fetch(url)
//         .then(response => response.json())
//         .then(products => {
//             const productList = document.querySelector(selector);
//             products.forEach(product => {
//                 const demo = document.createElement('div'); 
//                 demo.classList.add('col-3');
//                 demo.innerHTML = `
//                     <div class="card">

//                         <a href="/projectWeb/page/product/productDetail/proDetail.html?id=${product.id}">
//                             <img class="card-img-top" src="${product.image}" alt="${product.name} - Hình ảnh sản phẩm" style="width:100%">
//                         </a>
//                         <div class="card-body text-center">
//                             <h4 class="card-title">${product.name}</h4>
//                             <p class="card-text">${product.price} VNĐ</p>
//                             <a href="/projectWeb/page/payment/payment.html" class="btn btn-primary btn-order">Mua</a>
//                             <button class="btn btn-primary btn-shopping" name="${product.id}">
//                                 <i class="bi bi-handbag-fill icon-shopping"></i>
//                             </button>
//                         </div>
//                     </div>
//                 `;
                
//                 productList.appendChild(demo);
//             });
//         })
//         .catch(error => {
//             console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
//         });
// }

// // Fetch và hiển thị sản phẩm mới về
// fetchAndDisplayProducts('http://localhost:3000/new_arrivals', '.product_1');
// // Fetch và hiển thị sản phẩm bán chạy
// fetchAndDisplayProducts('http://localhost:3000/best_sellers', '.product_2');

// // Fetch và hiển thị tất cả sản phẩm
// fetchAndDisplayProducts('http://localhost:3000/products', '.products');


// document.querySelectorAll('.category').forEach(function(category) {
//     category.addEventListener('click', function(event) {
//         event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết
//         const categoryId = this.dataset.categoryId;
//         const elementMypham = document.querySelector('.mypham');
//         elementMypham.style.display = 'none'; // Ẩn phần tử

//         // Lấy dữ liệu từ db.json
//         fetch('http://localhost:3000/products')
//             .then(response => response.json())
//             .then(products => {
//                 // Lọc sản phẩm theo categoryId
//                 const filteredProducts = products.filter(product => product.categoryId == categoryId);
//                 displayProducts(filteredProducts);
//             })
//             .catch(error => console.error('Error fetching data:', error));
//     });
// });

// // DO Thanh Binh -- SHOPPING CART
// gioHang()
// window.addEventListener('storage', function () {
//    gioHang()
// })
// getOnclick()

// function displayProducts(products) {
//     const productList = document.getElementById('product-list');
//     productList.innerHTML = ''; 

//     if (products.length === 0) {
//         productList.innerHTML = '<p>Không có sản phẩm nào trong danh mục này.</p>';
//         return;
//     }

//     products.forEach(product => {
//             const demo = document.createElement('div'); 
//             demo.classList.add('col-3');
//             demo.innerHTML = `
//                 <div class="card">
//                         <a href="/projectWeb/page/product/productDetail/proDetail.html?id=${product.id}">
//                             <img class="card-img-top" src="${product.image}" alt="${product.name} - Hình ảnh sản phẩm" style="width:100%">
//                         </a>
//                         <div class="card-body text-center">
//                             <h4 class="card-title">${product.name}</h4>
//                             <p class="card-text">${product.price} VNĐ</p>
//                             <a href="/projectWeb/page/payment/payment.html" class="btn btn-primary btn-order">Mua</a>
//                             <button class="btn btn-primary btn-shopping" name=${product.id}">
//                                 <i class="bi bi-handbag-fill icon-shopping"></i>
//                             </button>
//                         </div>
//                     </div>
//             `;

//             // Thêm phần tử demo vào productList
//             productList.appendChild(demo);
//     });
// }


// function getOnclick () {
//     setTimeout (()=> {
//         var list = document.getElementsByClassName('btn-shopping')
//         for (let i = 0; i < list.length; i++) {
//             list[i].addEventListener ('click', function () {
//                 var product_id = list[i].name;
//                 fetch(`http://localhost:3000/products/${product_id}`)
//                 .then (response => response.json())
//                 .then (product=> {
//                     changeQuanlity(product)
//                 })
//                 .catch ()
//             })
//         }
//     }, 100)
// }

// function changeQuanlity (product) {
//     try {
//         var data = JSON.parse(localStorage.getItem(`${product.id}`))
//         localStorage.setItem(`${product.id}`, JSON.stringify([`${product.id}`,++data[1]]))
//     } catch (e) {
//         localStorage.setItem(`${product.id}`,JSON.stringify ([product.id, 1]))
//     }
//     gioHang()
// }

// function gioHang () {
//     const giohang = document.getElementById('giohang')
//     var total = 0
//     Object.entries(localStorage).forEach(([key, value]) => {
//         (total += JSON.parse(value)[1]);
//       });
//       if (total == 0) {
//         giohang.innerText = `Giỏ hàng`
//       } else {
//             giohang.innerText = `Giỏ hàng (${total})`
//       }
// }

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
                            <button class="btn btn-primary btn-shopping" name = "create" value ="${product.id}">
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
// DO Thanh Binh -- SHOPPING CART
newLocalStorage()
giohang()
window.addEventListener('storage', function () {
    giohang()
})

setTimeout(()=> {
    let shoppingButtons = document.getElementsByClassName('btn-shopping')
    for (let i = 0; i < shoppingButtons.length; i++) {
        let shoppingButton = shoppingButtons[i]
        shoppingButton.addEventListener('click', function () {
            add(shoppingButton.value)
            giohang()
        })
    }
    newLocalStorage()
}, 100)


function newLocalStorage () {
    setTimeout(()=>{

        let check = localStorage.getItem('products')
        if((check == null  || check == undefined)) {
            let products = []
            localStorage.setItem('products', JSON.stringify(products))
        }
    },50)
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

function giohang () {
    setTimeout(()=> {
        const giohang = document.getElementById('quantityNum')
        let total = totalQuantity()
        total === 0? giohang.innerText = ``:  giohang.innerText = total
    },50)

}

function setLocalStorage (productsData) {
    localStorage.setItem('products', JSON.stringify(productsData))
}

function getLocalStorage () {
    let productsData = localStorage.getItem('products')
    return (JSON.parse(productsData))
}

function checkProduct (product_id) {
    let products = getLocalStorage();
    for (let i = 0; i < getLocalStorage().length; i++) {
        let product = products[i]
        let productId = Object.keys(product)[0]
        if (productId == product_id) {
            return true
        }
    }
    return false;
}

function create (product_id, product_name, product_img, product_price) {
    if (checkProduct(product_id)) {
        update(product_id, 'add')
    } else {
        let product = {
            [product_id] : {
                name : product_name,
                image : product_img,
                price : product_price,
                quantity: 1,
                checkbox : false
            }
        }
        let products = getLocalStorage()
        products.push(product)
        setLocalStorage(products)
    }
    alert('Thêm vào giỏ hàng thành công !!!')
}

function update (product_id, type) {
    let products = getLocalStorage()
    for (let i = 0; i < products.length; i++) {
        let product = products[i]
        let productId = Object.keys(product)[0]
        if (productId == product_id) {
            if (type ==  "add") {
                ++products[i][productId].quantity
            } else {
                if (products[i][productId].quantity > 1)
                    --products[i][productId].quantity
                else (
                    alert('Giá trị tối thiểu là 1')
                )
            }
            setLocalStorage(products)
            break;
        }
    }
}

function add (produc_id) {
    fetch(`http://localhost:3000/products/${produc_id}`)
    .then(response=>response.json())
    .then(product=>{
        create(product.id, product.name, product.image, product.price)
    })
}

function totalQuantity () {
        let products = getLocalStorage()
        let total = 0
        for (let i = 0; i < products.length; i++) {
            let product = products[i]
            let productId = Object.keys(product)[0]
            total += products[i][productId].quantity
        }
        return total
    }

