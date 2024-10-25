var apiUrl = 'http://localhost:3000/users';
var arr = [];
var trafficChart;

async function loadCustomer() {
    try {
        var response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        var users = await response.json();
        arr = users;
        showCtm(); 
        createChart(arr); // Chỉ cần gọi một lần
    } catch (error) {
        console.error('Có vấn đề với việc gọi API:', error);
    }
}

function showCtm() {
    var tableBody = document.getElementById('tble');
    tableBody.innerHTML = ''; 
    arr.forEach(user => {
        var tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${'*'.repeat(user.password.length)}</td>
            <td><button class='deleteUser' onclick='deleteUser(${user.id})'>Xóa</button></td>
        `;
        tableBody.appendChild(tr);
    });
}

async function deleteUser(id) {
    if (confirm('Bạn có chắc chắn muốn xoá tài khoản này chứ?')) {
        try {
            var response = await fetch(`${apiUrl}/${id}`, {
                method: 'DELETE', 
            });
            if (response.ok) {
                loadCustomer();
                alert('Xoá tài khoản thành công!');
            } else {
                var errorText = await response.text();
                alert(`Lỗi khi xóa sản phẩm! Mã lỗi: ${response.status}, Thông báo: ${errorText}`);
            }
        } catch (error) {
            console.error('Có lỗi khi xoá tài khoản:', error);
            alert('Có lỗi khi xoá tài khoản!');
        }
    }
}

function createChart(users) {
    var ctx = document.getElementById('trafficChart').getContext('2d');

    // Tạo dữ liệu giả cho lưu lượng truy cập (giả sử là số lượt đăng nhập trong ngày)
    let labels = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
    let datasets = users.map(user => ({
        label: user.username, // Sử dụng tên tài khoản làm nhãn
        data: Array.from({length: 12}, () => Math.floor(Math.random() * 100)), // Dữ liệu lưu lượng truy cập ngẫu nhiên
        borderColor: getRandomColor(), // Màu ngẫu nhiên cho mỗi tài khoản
        borderWidth: 2,
        fill: false
    }));

    // Xóa biểu đồ cũ nếu có
    if (trafficChart) {
        trafficChart.destroy();
    }

    // Tạo biểu đồ
    trafficChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Thời gian trong ngày'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Lưu lượng truy cập (số lượt)'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

// Hàm tạo màu ngẫu nhiên cho các đường biểu đồ
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Chỉ cần gọi một sự kiện DOMContentLoaded
document.addEventListener('DOMContentLoaded', loadCustomer);
