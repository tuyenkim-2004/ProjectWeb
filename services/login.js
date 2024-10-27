let apiUser = 'http://localhost:3000/users';

const form = document.getElementById('formLogin');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    getUser(handleLogin);
});

function getUser(callback) {
    fetch(apiUser)
        .then(res => {
            if (!res.ok) {
                console.error('Response error:', res.statusText);
                throw new Error('Network response was not ok');
            }
            return res.json(); 
        })
        .then(users => {
            console.log('Fetched users:', users); 
            callback(users);
        }) 
        .catch(error => {
            console.error('Error fetching users:', error);
            alert('Lỗi khi tải thông tin người dùng. Vui lòng kiểm tra console để biết thêm chi tiết.');
        });
}

function handleLogin(users) {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let userFound = false;

    users.forEach(user => {
        if (user.email === email && user.password === password) {
            userFound = true;
            localStorage.setItem('loggedInUser', JSON.stringify(user)); // Đánh dấu là đã tìm thấy người dùng
            window.location.href = '/projectWeb/page/home/home.html';
            // window.location.href ='/projectWeb/page/history_order/h_order.html';
            if (user.roleId === 1) { // Giả sử roleId 1 là admin
                window.location.href = '/projectWeb/admin/managerCustomer/ctm.html'; // Đường dẫn trang admin
            } else {
                window.location.href = '/projectWeb/page/history_order/h_order.html'; // Đường dẫn trang người dùng
            }

        }
    });


    if (!userFound) {
        alert('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.');
    }
}