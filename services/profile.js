 const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

        if (loggedInUser) {
            // Cập nhật thông tin lên HTML
            document.getElementById("full-name").innerText = loggedInUser.username;
            document.getElementById("email").innerText = loggedInUser.email;
            document.getElementById("phone").innerText = loggedInUser.phone;
        } else {
            // Nếu không có thông tin người dùng, chuyển hướng về trang đăng nhập
            window.location.href = '/projectWeb/page/login/login.html';
        }