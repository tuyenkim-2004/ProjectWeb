var apiUrl = 'http://localhost:3000/products';
var arr = [];
var currentId = 0; 
// Hàm lưu sản phẩm vào API
async function save() {
    var id = document.getElementById('productId').value; // Lấy ID sản phẩm
    var name = document.getElementById('prn').value;
    var price = parseFloat(document.getElementById('pre').value);
    var stock = parseInt(document.getElementById('tlq').value);
    var imageFile = document.getElementById('img').files[0];
    var imageUrl = imageFile ? URL.createObjectURL(imageFile) : '';

    if (!name || isNaN(price) || isNaN(stock)) {
        alert('Vui lòng điền đầy đủ thông tin hợp lệ!');
        return; 
    }

    var product = {
        name: name,
        price: price,
        stock: stock,
        image: imageUrl, 
    };

    var response;
    if (id) {
        response = await fetch(`${apiUrl}/${id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
    } else {
        const maxId = arr.reduce((max, product) => Math.max(max, parseInt(product.id)), 0);
        product.id = (maxId + 1).toString();
        response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
    }
    fetch('')
    // body string.json(product)
    arr.push(product);


    if (response.ok) {
        loadProducts(); // Tải lại danh sách sản phẩm
        resetForm(); // Đặt lại form
        var modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
        modal.hide(); // Ẩn modal
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
    for (var i in arr) {
        var n = parseInt(i) + 1;
        showPrd += "<tr>";
        showPrd += "<td>" + n + "</td>";
        showPrd += "<td>" + arr[i].name + "</td>";
        showPrd += "<td>" + arr[i].price + "</td>";
        showPrd += "<td>" + arr[i].stock + "</td>";
        showPrd += "<td><img src='" + arr[i].image + "' width='100' height='100' style='object-fit:cover;'></td>";
        showPrd += "<td><button class='dele' onclick='dete(" + arr[i].id + ")'>Xóa</button> <button class='dele' onclick='fix(" + arr[i].id + ")'>Sửa</button></td>";
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
                backgroundColor: 'rgba(255, 258, 0, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                borderRadius:7,
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
async function dete(id) {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
        try {
            var response = await fetch(`${apiUrl}/${id}`, {
                method: 'DELETE', 
            });

            if (response.ok) {
                loadProducts(); 
                alert('Xóa sản phẩm thành công!'); 
            } else {
                var errorText = await response.text();
                alert(`Lỗi khi xóa sản phẩm! Mã lỗi: ${response.status}, Thông báo: ${errorText}`);
            }
        } catch (error) {
            console.error('Có lỗi khi xóa sản phẩm:', error);
            alert('Có lỗi xảy ra khi xóa sản phẩm!');
        }
    }
}
async function fix(id) {
    try {
        var response = await fetch(`${apiUrl}/${id}`);
        if (!response.ok) {
            throw new Error(`Mã lỗi: ${response.status}`);
        }
        var product = await response.json();

        document.getElementById('productId').value = product.id; 
        document.getElementById('prn').value = product.name; 
        document.getElementById('pre').value = product.price; 
        document.getElementById('tlq').value = product.stock; 

        var modal = new bootstrap.Modal(document.getElementById('exampleModal'));
        modal.show();
    } catch (error) {
        console.error('Có lỗi khi lấy thông tin sản phẩm:', error);
        alert('Có lỗi xảy ra khi lấy thông tin sản phẩm!');
    }
}

function resetForm() {
    document.getElementById('productId').value = ''; // Đặt lại ID
    document.getElementById('prn').value = '';
    document.getElementById('pre').value = '';
    document.getElementById('tlq').value = '';
    document.getElementById('img').value = ''; // Đây có thể không hoạt động vì không thể đặt giá trị cho input type=file
    document.getElementById('mt').value = ''; // Kiểm tra ID mt có đúng không

    var modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.hide();
}


window.onload = loadProducts;