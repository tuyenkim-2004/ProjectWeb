var apiUrl = 'http://localhost:3000/users';
var arr = [];

// Hàm tải danh sách khách hàng
async function loadCustomer() {
    try {
        var response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        var users = await response.json();
        arr = users;
        showCtm(); // Hiển thị danh sách khách hàng ngay sau khi tải
        updateDashboard(); // Cập nhật bảng điều khiển sau khi tải
    } catch (error) {
        console.error('Có vấn đề với việc gọi API:', error);
    }
}

// Hàm hiển thị khách hàng trong bảng
function showCtm() {
    var tableBody = document.getElementById('tble');
    tableBody.innerHTML = ''; // Xóa nội dung cũ

    arr.forEach(user => {
        var tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
        `;
        tableBody.appendChild(tr);
    });
}

// Hàm cập nhật bảng điều khiển (biểu đồ)
function updateDashboard() {
    // Sử dụng thuộc tính của người dùng thay vì sản phẩm
    var labels = arr.map(user => user.username); // Sử dụng tên người dùng làm nhãn
    var stockData = arr.map(user => user.roleId); // Thay đổi nếu bạn có thuộc tính khác cần hiển thị

    var ctx = document.getElementById('salesChartt').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Số lượng khách hàng theo vai trò',
                data: stockData,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                with: 20,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Số lượng',
                        font: {
                            size: 16,
                            weight: 'bold',
                        }
                    },
                    ticks: {
                        color: 'red',
                        font: {
                            size: 16,
                            weight: 'bold',
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Tên khách hàng',
                        font: {
                            size: 16,
                            weight: 'bold',
                            color: 'red',
                        }
                    },
                    ticks: {
                        color: 'black',
                        font: {
                            size: 14,
                            weight: 'bold',
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

// Gọi hàm loadCustomer khi trang được tải
document.addEventListener('DOMContentLoaded', loadCustomer);
