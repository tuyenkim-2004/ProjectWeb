const table = document.getElementById('table');


    /* 
                    <td class="productInfor">
                    <div class="container">
                        <div class="container col-1">
                            <input type="checkbox" class="checkbox">
                        </div> 
                            <img src="/projectWeb//images/img_faceWash/img_1.webp" alt="" id="img-produc">
                        <div class="container">
                            <div>
                                <p class="productName">name</p>
                                <p class="productdelete">xoa</p>
                            </div>
                        </div>        
                    </div>
                </td>
                <td class="productPrice">1000</td>
                <td class="productQuan">30</td>
                <td class="productTotalPrice">30000</td>
    */

function addProduct () {
    let row = document.createElement('tr')
    table.appendChild(row)
    let productInfor = document.getElementById('td')
    let productPrice = document.getElementById('td')
    let productQuan = document.getElementById('td')
    let productTotalPrice = document.getElementById('td')

    let checkbox = document.createElement('input')
    let productImg = document.createElement('img')
    let productName = document.createElement('p')
    let productdelete = document.createElement('p')

    productInfor.className = 'productInfor'
    productPrice.className = 'productPrice'
    productQuan.className = 'productQuan'
    productTotalPrice.className = 'productTotalPrice'

    checkbox.className = 'checkbox'
    productImg.className = 'img-product'
    productName.className = 'productName'
    productdelete.className = 'productdelete'

    row.appendChild(productInfor)
    row.appendChild(productPrice)
    row.appendChild(productQuan)
    row.appendChild(productTotalPrice)

    productInfor.appendChild(checkbox)
    productInfor.appendChild(productImg)
    productInfor.appendChild(productName)
    productInfor.appendChild(productdelete)
}




