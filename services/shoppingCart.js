display()
gioHang()

window.addEventListener('storage', function () {
    display()
    gioHang()
    setTimeout(()=> {
    changeQuanlity('reduce')
    changeQuanlity('increase')
    changeQuanlity('delete')
},60)
})

setTimeout(()=> {
    changeQuanlity('reduce')
    changeQuanlity('increase')
    changeQuanlity('delete')
},60)

function display () {
    const tbody = document.getElementById('tbody')
    const buy = document.getElementById('buy')

    if (localStorage.length == 0) {
        buy.style.display = 'none'
        tbody.innerHTML = ` <div class="container" id="none" style=" textDecoration: none; font-size: 20px; color: #a05139"> <b>Giỏ Hàng Trống !!!</b> - <a href = 'http://127.0.0.1:5500/projectWeb/page/home/home.html' style="textDecoration: none;">đi mua hàng</a></div>`
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

}  

function changeQuanlity (type) {
    const change = document.getElementsByClassName(type);
    for(let i = 0; i< change.length; i++) {
        change[i].addEventListener('click', function () {
            let data = JSON.parse(localStorage.getItem(`${change[i].name}`))
            if (type == "reduce") {
                if (data[1] > 1) {
                    data[1]--
                    localStorage.setItem(`${change[i].name}`, JSON.stringify(data))
                location.reload()

                } 
            } else if (type=="increase"){
                ++data[1]
                localStorage.setItem(`${change[i].name}`, JSON.stringify(data));
                location.reload()
            } else {
                localStorage.removeItem(`${change[i].name}`)
                location.reload()

            }
        })
    }
}

