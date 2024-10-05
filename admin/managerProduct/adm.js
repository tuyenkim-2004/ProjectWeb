var arr = [];

function saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(arr));
}


function loadFromLocalStorage() {
    var storedProducts = localStorage.getItem('products');
    if (storedProducts) {
        arr = JSON.parse(storedProducts);
    }
}


function save() {
    var name = document.getElementById('prn').value;
    var price = document.getElementById('pre').value;
    var total = document.getElementById('tlq').value;
    var describe = document.getElementById('mt').value;
    var imageFile = document.getElementById('img').files[0];
    var imageUrl = imageFile ? URL.createObjectURL(imageFile) : ''; 
    parseFloat(price);
    parseInt(total)
    if (!name || !price || !total || !describe) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return; 
    }

    var product = {
        name: name,
        price: price,
        total: total,
        image: imageUrl,
        describes:describe,
    };

    arr.push(product);

    
    saveToLocalStorage();

    document.getElementById('prn').value = '';
    document.getElementById('pre').value = '';
    document.getElementById('tlq').value = '';
    document.getElementById('img').value = '';
    document.getElementById('mt').value = '';

    var modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.hide();
}

function show() {
    var showPrd = '';
    for (let i in arr) {
        var n = parseInt(i) + 1;
        showPrd += "<tr>";
        showPrd += "<td>" + n + "</td>";
        showPrd += "<td>" + arr[i].name + "</td>";
        showPrd += "<td>" + arr[i].price + "</td>";
        showPrd += "<td>" + arr[i].total + "</td>";
        showPrd += "<td><img src='" + arr[i].image + "' width='50' height='50' object-fit:cover ></td>";
        showPrd += "<td>" + arr[i].describes + "</td>";
        showPrd += "<td><button class='dele' onclick='dete(" + i + ")'>Xóa</button></td>"; // Nút xóa
        showPrd += "</tr>";
    }
    document.getElementById('product-table-body').innerHTML = showPrd;
}

// Hàm xóa sản phẩm dựa trên chỉ số
function dete(index) {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
        arr.splice(index, 1);  // Xóa sản phẩm từ mảng
        saveToLocalStorage();  // Cập nhật localStorage
        show();  // Hiển thị lại danh sách sản phẩm
    }
}


window.onload = function() {
    loadFromLocalStorage();
    show();
}