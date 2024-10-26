
        let isLoggedIn = localStorage.getItem('loggedInUser') !== null; 

        if (isLoggedIn) {
            document.getElementById('logged-in-header').classList.remove('d-none');
            document.getElementById('logged-out-header').classList.add('d-none');
        } else {
            document.getElementById('logged-out-header').classList.remove('d-none');
            document.getElementById('logged-in-header').classList.add('d-none');
        }

        // Đăng xuất
        document.getElementById('logout')?.addEventListener('click', () => {
            localStorage.removeItem('loggedInUser'); // Xóa thông tin người dùng
            window.location.reload(); 
        });