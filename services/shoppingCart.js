const tbody = document.getElementById('tbody')
const buy = document.getElementById('buy')
const showpay = document.getElementById('showPay')

var productInfors = document.getElementsByClassName('productInfors')
var removeButtons = document.getElementsByClassName('remove')

var products = getLocalStorage()

showProduct()

<<<<<<< HEAD
setInterval (()=> {
    products = getLocalStorage()
    productInfors = document.getElementsByClassName('productInfors')
    removeButtons = document.getElementsByClassName('remove')
    giohang()
=======
    if (localStorage.length == 0) {
        buy.style.display = 'none'
        tbody.innerHTML = ` <div class="container" id="none" style=" textDecoration: none; font-size: 20px; color: #a05139"> <b>Giỏ Hàng Trống !!!</b> - <a href = '/projectWeb/page/home/home.html' style="textDecoration: none;">đi mua hàng</a></div>`
    }
    else {
        tbody.innerHTML = ""
        buy.style.display = 'flex'
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i)
            fetch(`http://localhost:3000/products/${JSON.parse(localStorage.key(i))}`)
                .then(Response => Response.json())
                .then(product=> {
                    const tr = document.createElement('tr')
                    tr.innerHTML = `
                  <td class="productInfor">
                      <div class="container">
                          <div class="container col-1">
                              <input type="checkbox" class="checkbox">
                          </div> 
                              <img src= ${product.image}>
                          <div class="container">
                              <div>
                                  <p class="productName">${product.name}</p>
                                  <div class = 'change'>
                                  <button class = 'reduce'  name = "${product.id}"> - </button>
                                  <button class = 'increase'  name = "${product.id}"> + </button>
                                  <button class = 'delete'  name = "${product.id}"> xóa </button>
                                  </div>
                              </div>
                          </div>        
                      </div>
                  </td>
                  <td class="productPrice">${product.price}</td>
                  <td class="productQuan">${JSON.parse(localStorage.getItem(key))[1]}</td>
                  <td class="productTotalPrice">${product.price * JSON.parse(localStorage.getItem(key))[1]}</td>        `
                tbody.appendChild(tr)
            })
        }
    }
>>>>>>> a36062befe36f5bbb61fb783f4c815800146a5ef

    showProduct()

    setCheckbox()
    productBox()
    setBuyProduct()

    addOrSubQuanyity('add')
    addOrSubQuanyity('sub')

    removeOnShow()
},500)


function removeOnShow ()  {
    for(let i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener('click', function () {
                if (confirm('xác nhận xóa hàng ???')) {
                    products.splice(i, 1)
                    setLocalStorage(products)
                }
        })
    }
}

function addOrSubQuanyity (className) {
    var buttons = document.getElementsByClassName(className);
    for(let i = 0; i< buttons.length; i++) {
        buttons[i].addEventListener('click', function () {
            update(buttons[i].value, className)
        })
    }
}

function createElement (product) {
    const productInfor = document.createElement('tr')
        productInfor.className = "productInfors"
        let product_id = Object.keys(product)[0]
        let product_name = product[product_id].name
        let product_img = product[product_id].image
        let product_price = product[product_id].price
        let product_quantity = product[product_id].quantity
        let product_totalPrice = product[product_id].price * product[product_id].quantity
        productInfor.innerHTML = `
            <td class="productInfor"  id = "${product_id}">
                <div class="container">
                    <div class="container col-1">
                        <input type="checkbox" class="checkbox" name='check' value = "${product_id}">
                    </div> 
                        <img src= ${product_img}>
                    <div class="container">
                        <div>
                            <p class="productName">${product_name}</p>
                            <div class = 'change'>
                            <button class = 'sub' value = "${product_id}"> - </button>
                            <button class = 'add' value = "${product_id}"> + </button>
                            <button class = 'remove'value = "${product_id}"> xóa </button>
                            </div>
                        </div>
                    </div>        
                </div>
            </td>
            <td class="productPrice">${product_price} VND</td>
            <td class="productQuan"        value = "${product_id}">${product_quantity }</td>
            <td class="productTotalPrice"  value = "${product_id}">${product_totalPrice} VND</td>
        `
        tbody.appendChild(productInfor)
}

function showProduct () {
    tbody.innerHTML = ""
    try {
        if (products.length == 0) {
            buy.style.display = 'none'
            tbody.innerHTML = ` <div class="container" id="none" style=" textDecoration: none; font-size: 20px; color: #a05139"> <b>Giỏ Hàng Trống !!!</b> - <a href = 'http://127.0.0.1:5500/projectWeb/page/home/home.html' style="textDecoration: none;">đi mua hàng</a></div>`
        } else {
            for (let i = 0; i < products.length; i++) {
                let product = products[i]
                createElement(product)        
           }
        }



    } catch (e) {
        console.log("   ---   You shouldn't go to this page the first time !!!   ---")
    }
}

function productBox () {
    var checkbox = document.getElementsByClassName('checkbox')
    for (let i = 0; i < checkbox.length; i++) {
        let product = products[i]
        let productId = Object.keys(product)[0]
        checkbox[i].checked = products[i][productId].checkbox;
    }
}

function setBuyProduct () {
    var hascheck = 0; 
    var quan = 0;
    var totalPrice = 0;
    for (let i = 0; i < products.length; i++) {
        let product = products[i]
        let productId = Object.keys(product)[0]
        if (products[i][productId].checkbox) {
            hascheck+=1;
            quan+= products[i][productId].quantity
            totalPrice += products[i][productId].price * products[i][productId].quantity
        }
    }
    if (hascheck == 0) {
        showpay.style.display = 'none'
    } else {
        showpay.style.display = 'flex'
        document.getElementById('hascheck').innerHTML = hascheck
        document.getElementById('quan').innerHTML = quan
        document.getElementById('totalPrice').innerHTML = totalPrice + ' VND'
    }

}

function setCheckbox () {
    var checkbox = document.getElementsByClassName('checkbox')
    for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].addEventListener('click', function () {
            let product = products[i]
            let productId = Object.keys(product)[0]
            if (products[i][productId].checkbox) {
                products[i][productId].checkbox = false;
            } else {
                products[i][productId].checkbox = true;
            }
            setLocalStorage(products)
        })
    }
}

window.addEventListener('dblclick', function () {
    alert('Bạn thao tác quá nhanh! Xin vui lòng chậm lại! Cảm Ơn')
})

// function format (value)  {
//     for (value.length) {}
// }