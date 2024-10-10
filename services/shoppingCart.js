const tbody = document.getElementById('tbody');

function addProduct() {
    let row = document.createElement('tr')

    let productInfor = document.createElement('td')
    let productPrice = document.createElement('td')
    let productQuan = document.createElement('td')
    let productTotalPrice = document.createElement('td')

    let containerBig = document.createElement('div')
    let containerSmall = document.createElement('div')
    let divCheck = document.createElement('div')
    let divSmall = document.createElement('div')

    let checkbox = document.createElement('input')
    let productImg = document.createElement('img')
    let productName = document.createElement('p')
    let productDelete = document.createElement('p')

    tbody.appendChild(row)

    row.appendChild(productInfor)
    row.appendChild(productPrice)
    row.appendChild(productQuan)
    row.appendChild(productTotalPrice)

    productInfor.appendChild(containerBig)

    containerBig.appendChild(divCheck)
    containerBig.appendChild(productImg)
    containerBig.appendChild(containerSmall)

    divCheck.appendChild(checkbox)

    containerSmall.appendChild(divSmall)

    divSmall.appendChild(productName)
    divSmall.appendChild(productDelete)

    productInfor.className = 'productInfor'
    productPrice.className = 'productPrice'
    productQuan.className = 'productQuan'
    productTotalPrice.className = 'productTotalPrice'

    containerBig.className = 'container'
    divCheck.className = 'container col-1'
    containerSmall.className = 'container'

    checkbox.className = 'checkbox'
    checkbox.type = 'checkbox';
    productImg.className = 'img-product'
    productName.className = 'productName'
    productDelete.className = 'productDelete'

    productName.innerHTML = '???'
    productDelete.innerHTML = 'xóa'

    productImg.alt = 'none'

    productPrice.innerHTML = 100
    productQuan.innerHTML = 100
    productTotalPrice.innerHTML = 100
}


// console.log(addProduct())
// console.log(addProduct())
// console.log(addProduct())


