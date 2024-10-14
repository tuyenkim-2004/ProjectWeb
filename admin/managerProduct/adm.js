const apiUrl = 'http://localhost:3000/products';
var arr = [];

// Hàm lưu sản phẩm vào API
async function save() {
    var name = document.getElementById('prn').value;
    var price = parseFloat(document.getElementById('pre').value);
    var total = parseInt(document.getElementById('tlq').value);
    var describe = document.getElementById('mt').value;
    var imageFile = document.getElementById('img').files[0];
    var imageUrl = imageFile ? URL.createObjectURL(imageFile) : '';

    if (!name || isNaN(price) || isNaN(total) || !describe) {
        alert('Vui lòng điền đầy đủ thông tin hợp lệ!');
        return; 
    }

    var product = {
        name: name,
        price: price,
        total: total,
        image: imageUrl,
        describes: describe,
    };

    // Gửi yêu cầu POST để lưu sản phẩm
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });

    if (response.ok) {
        loadProducts(); // Tải lại danh sách sản phẩm
        resetForm(); // Đặt lại form
    } else {
        alert('Lỗi khi lưu sản phẩm!');
    }
}

// Tải sản phẩm từ API
async function loadProducts() {
    const response = await fetch(apiUrl);
    const products = await response.json();
    arr = products;
    show();
}

// Hiển thị sản phẩm
function show() {
    var showPrd = '';
    for (let i in arr) {
        var n = parseInt(i) + 1;
        showPrd += "<tr>";
        showPrd += "<td>" + n + "</td>";
        showPrd += "<td>" + arr[i].name + "</td>";
        showPrd += "<td>" + arr[i].price + "</td>";
        showPrd += "<td>" + arr[i].total + "</td>";
        showPrd += "<td><img src='" + arr[i].image + "' width='50' height='50' style='object-fit:cover;'></td>";
        showPrd += "<td>" + arr[i].describes + "</td>";
        showPrd += "<td><button class='dele' onclick='dete(" + arr[i].id + ")'>Xóa</button></td>"; // Nút xóa
        showPrd += "</tr>";
    }
    document.getElementById('product-table-body').innerHTML = showPrd;
}

// Hàm xóa sản phẩm dựa trên ID
async function dete(id) {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            loadProducts(); // Tải lại danh sách sp
        } else {
            const errorText = await response.text();
            alert(`Lỗi khi xóa sản phẩm! Mã lỗi: ${response.status}, Thông báo: ${errorText}`);
        }
    }
}

// Hàm đặt lại form
function resetForm() {
    document.getElementById('prn').value = '';
    document.getElementById('pre').value = '';
    document.getElementById('tlq').value = '';
    document.getElementById('img').value = '';
    document.getElementById('mt').value = '';
    var modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.hide();
}

// Tải sản phẩm khi trang được tải
window.onload = loadProducts;
