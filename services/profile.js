let apiUser = 'http://localhost:3000/users';
let currentUserId = 1; // Giả sử bạn đã xác định ID người dùng hiện tại

// Fetch thông tin người dùng
function fetchUserInfo() {
    fetch(apiUser)
        .then(res => {
            if (!res.ok) {
                console.error('Response error:', res.statusText);
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(users => {
            const user = users.find(u => u.id === currentUserId); // Tìm người dùng theo ID
            if (user) {
                document.getElementById('full-name').textContent = user.username; // Cập nhật tên người dùng
                document.getElementById('email').textContent = user.email; // Cập nhật email
                document.getElementById('phone').textContent = user.phone; // Cập nhật số điện thoại
            } else {
                console.error('User not found');
                alert('Không tìm thấy thông tin người dùng.');
            }
        })
        .catch(error => {
            console.error('Error fetching user info:', error);
            alert('Lỗi khi tải thông tin người dùng.');
        });
}

// Gọi hàm để fetch thông tin người dùng khi trang được tải
fetchUserInfo();