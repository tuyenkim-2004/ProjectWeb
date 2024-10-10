const tbody = document.getElementById('tbody');

function addProduct() {
    tbody. innerHTML =
    `<tr>
<td class="productInfor">
    <div class="container">
        <div class="container col-1">
            <input type="checkbox" class="checkbox">
        </div> 
            <img src="/projectWeb//images/img_faceWash/img_1.webp" alt="" class="img-produc">
        <div class="container">
            <div>
                <p class="productName">${product.name}</p>
                <p class="productDelete">xóa</p>
            </div>
        </div>        
    </div>
</td>
<td class="productPrice">${product.price}</td>
<td class="productQuan">${product.quanlity}</td>
<td class="productTotalPrice">${product.price * product.quanlity}</td>
</tr>`
}



