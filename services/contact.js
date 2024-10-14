function subFunction() {
    // Lấy các giá trị từ các trường nhập
    const name = document.getElementById('name').value;
    const phone = document.getElementById('number_phone').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('form_control').value;
    const errorMessage = document.getElementById('error-message');
  
    // Kiểm tra xem các trường đã được điền đầy đủ chưa
    if (!name || !phone || !email || !message) {
      errorMessage.innerText = "Vui lòng điền đầy đủ thông tin vào các trường!";
      return;
    }
  
    // Kiểm tra email hợp lệ
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      errorMessage.innerText = "Email không hợp lệ!";
      return;
    }
  
    // Sau khi kiểm tra hợp lệ, bạn có thể gửi dữ liệu hoặc hiển thị thông báo thành công
    errorMessage.innerText = ""; 
    alert("Tin nhắn của bạn đã được gửi thành công!");
  
    // Xóa nội dung form sau khi gửi thành công
    document.getElementById('name').value = '';
    document.getElementById('number_phone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('form_control').value = '';
  }