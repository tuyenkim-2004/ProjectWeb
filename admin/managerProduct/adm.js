var apiUrl = 'http://localhost:3000/products';
var arr = [];
let currentId = 0; 
// Hàm lưu sản phẩm vào API
async function save() {
    var name = document.getElementById('prn').value;
    var price = parseFloat(document.getElementById('pre').value);
    var stock = parseInt(document.getElementById('tlq').value);
    var imageFile = document.getElementById('img').files[0];
    var imageUrl = imageFile ? URL.createObjectURL(imageFile) : '';

    if (!name || isNaN(price) || isNaN(stock)) {
        alert('Vui lòng điền đầy đủ thông tin hợp lệ!');
        return; 
    }
    currentId++;
    var product = {
        id: currentId.toString(),
        name: name,
        price: price,
        stock: stock,
        image: imageUrl,    
    };

    // Gửi yêu cầu POST để lưu sản phẩm
    var response = await fetch(apiUrl, {
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
    var response = await fetch(apiUrl);
    var products = await response.json();
    arr = products;
    show();
    updateDashboard();
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
        showPrd += "<td>" + arr[i].stock + "</td>";
        showPrd += "<td><img src='" + arr[i].image + "' width='100' height='100' style='object-fit:cover;'></td>";
        showPrd += "<td><button class='dele' onclick='dete(" + arr[i].id + ")'>Xóa</button></td>"; // Nút xóa
        showPrd += "</tr>";
    }
    document.getElementById('product-table-body').innerHTML = showPrd;
}
function updateDashboard() {
    var labels = arr.map(product => product.name);
    var stockData = arr.map(product => product.stock);

    var ctx = document.getElementById('salesChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Tổng số sản phẩm trong kho',
                data: stockData,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Số lượng',
                        font:{
                            size:16,
                            weight:'bold',
                        }
                    },
                    ticks: {
                        color: 'red' ,
                        font:{
                            size: 16,
                            weight:'bold',
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Tên sản phẩm',
                        font:{
                            size:16,
                            weight:'bold',
                            color: 'red',
                        }
                    },
                    ticks: {
                        color: 'black',
                        font:{
                            size:14,
                            weight:'bold',
                        }
                    }
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
            }
        }
    });
}
// Hàm xóa sản phẩm dựa trên ID
async function dete(id) {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
        var response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            loadProducts(); // Tải lại danh sách sp
        } else {
            var errorText = await response.text();
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
