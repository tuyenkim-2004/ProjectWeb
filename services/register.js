let users = [];

// Tải dữ liệu người dùng từ server
fetch('http://localhost:3000/users')
    .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
    })
    .then(data => {
        users = data; // Gán giá trị cho users
        console.log('Users loaded:', users); // Kiểm tra dữ liệu

        // Thêm sự kiện submit chỉ sau khi dữ liệu được tải
        const formRegister = document.getElementById('formRegister');
        formRegister.addEventListener('submit', handleRegister);
    })
    .catch(err => console.error('Fetch error:', err)); // Xử lý lỗi fetch

// Hàm xử lý đăng ký
function handleRegister(e) {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('confirm-password').value;

    // Kiểm tra người dùng đã tồn tại
    if (users.find(user => user.email === email)) {
        alert("Email đã tồn tại");
        return;
    }

    // Kiểm tra mật khẩu
    if (password !== passwordConfirm) {
        alert("Mật khẩu không khớp!");
        return;
    }

    // Tạo người dùng mới
    const newUser = {
        id: users.length + 1,
        username: name,
        email: email,
        password: password, // Lưu mật khẩu (cần mã hóa trong thực tế)
        roleId: 2,
    };

    // Thêm người dùng vào mảng và gửi lên server
    users.push(newUser);
    alert('Đăng ký thành công!');
    this.reset(); // Làm mới form

    // Gửi thông tin người dùng mới lên server
    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => console.log('User added:', data))
    .catch(error => console.error('Error:', error));
}